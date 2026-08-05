#!/usr/bin/env node
/**
 * Step 1 of the four-step verification in `docs/RESEARCH_METHOD.md`, run
 * mechanically over many domains at once.
 *
 * The method asks, for each candidate site: does it resolve, does HTTPS work,
 * where does it redirect, what built it, when was it last touched, and can a
 * customer actually book or order on it? Those are all answerable from the
 * response itself, so they should never be answered by hand — and the second
 * round's finding that listed domains go dead (DNS failures, refused TLS,
 * Wix "ConnectYourDomain" 404s, silent redirects to a different business)
 * means each of those outcomes has to be distinguished, not collapsed into
 * "didn't load".
 *
 * What this tool does NOT do is steps 2–4: dated trading evidence, hunting
 * for missed sites, and disambiguating same-named businesses. A live site is
 * not proof of a live business, and a dead domain is not proof of a closure.
 * Output here is evidence for a verification record, never a record itself.
 *
 *   node tools/pipeline/probe-sites.mjs --in urls.json --out probes.json
 *
 * Input is a JSON array of { key, url } objects. Output preserves `key` so
 * callers can rejoin to whatever they asked about.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { lookup } from "node:dns/promises";
import { setTimeout as delay } from "node:timers/promises";

const args = process.argv.slice(2);
const arg = (name, fallback) => {
  const i = args.indexOf(name);
  return i === -1 ? fallback : args[i + 1];
};

const inFile = arg("--in");
const outFile = arg("--out");
const concurrency = Number(arg("--concurrency", "8"));
const timeoutMs = Number(arg("--timeout", "15000"));
if (!inFile || !outFile) {
  console.error("usage: probe-sites.mjs --in <urls.json> --out <probes.json>");
  process.exit(1);
}

/**
 * Builder/CMS fingerprints. The generator meta is the cleanest signal but
 * plenty of builders omit it, so each entry also carries markup patterns.
 */
const BUILDERS = [
  { name: "Wix", patterns: [/wix\.com/i, /_wixCssStates/i, /X-Wix-/i] },
  { name: "Squarespace", patterns: [/squarespace/i, /static1\.squarespace\.com/i] },
  { name: "WordPress", patterns: [/wp-content/i, /wp-includes/i, /generator" content="WordPress/i] },
  { name: "Shopify", patterns: [/cdn\.shopify\.com/i, /Shopify\.theme/i] },
  { name: "GoDaddy Website Builder", patterns: [/img1\.wsimg\.com/i, /godaddy/i] },
  { name: "Weebly", patterns: [/weebly/i] },
  { name: "Webflow", patterns: [/webflow/i] },
  { name: "Duda", patterns: [/duda(one|mobile)?/i, /irp\.cdn-website\.com/i] },
  { name: "Square Online", patterns: [/squareup\.com/i, /square-web/i] },
];

/**
 * Evidence that a customer can transact, not merely read a brochure.
 *
 * Every pattern must match a real endpoint — a host in an href/src, or a live
 * cart route — never a bare product name. Squarespace ships
 * `hide-opentable-icons` in the body class of every site it builds, which read
 * as an OpenTable booking integration on three brochure sites before these
 * patterns were tightened to require the domain.
 */
const BOOKING = [
  { name: "direct-book", patterns: [/\bdirect-book\.com/i] },
  { name: "Booking.com widget", patterns: [/\/\/[\w.-]*booking\.com/i] },
  { name: "ResDiary", patterns: [/\/\/[\w.-]*resdiary\.com/i] },
  { name: "OpenTable", patterns: [/\/\/[\w.-]*opentable\.(com|co\.uk)/i] },
  { name: "SevenRooms", patterns: [/\/\/[\w.-]*sevenrooms\.com/i] },
  { name: "Eviivo", patterns: [/\/\/[\w.-]*eviivo\.com/i] },
  { name: "Little Hotelier", patterns: [/\/\/[\w.-]*littlehotelier\.com/i] },
  { name: "Freetobook", patterns: [/\/\/[\w.-]*freetobook\.com/i] },
  { name: "SuperControl", patterns: [/\/\/[\w.-]*supercontrol\.co\.uk/i] },
  { name: "Treatwell", patterns: [/\/\/[\w.-]*treatwell\.co\.uk/i] },
  { name: "Fresha", patterns: [/\/\/[\w.-]*fresha\.com/i] },
  { name: "Phorest", patterns: [/\/\/[\w.-]*phorest\.(com|me)/i] },
  { name: "Calendly", patterns: [/\/\/[\w.-]*calendly\.com/i] },
  { name: "Shopify cart", patterns: [/\/cart\/add/i, /Shopify\.theme/i] },
  { name: "WooCommerce", patterns: [/add-to-cart=/i, /\bwc-ajax=/i, /woocommerce-cart/i] },
  { name: "Stripe", patterns: [/\/\/js\.stripe\.com/i] },
  { name: "PayPal", patterns: [/\/\/[\w.-]*paypal\.com\/(sdk|cgi-bin)/i] },
  { name: "Deliveroo/JustEat/Uber", patterns: [/\/\/[\w.-]*(deliveroo\.co\.uk|just-?eat\.co\.uk|ubereats\.com)/i] },
];

/**
 * "Parked or broken" pages return HTTP 200, so status alone cannot detect
 * them. Each of these was seen in the second-round liveness probe.
 */
const DEAD_MARKERS = [
  { name: "Wix ConnectYourDomain", patterns: [/ConnectYourDomain/i] },
  { name: "Domain for sale / parked", patterns: [/this domain (is|may be) for sale/i, /buy this domain/i, /parked (free )?(at|by|courtesy)/i] },
  { name: "Default host placeholder", patterns: [/index of \//i, /welcome to nginx/i, /apache2 (ubuntu|debian) default page/i, /future home of something quite cool/i] },
  { name: "Suspended", patterns: [/account (has been )?suspended/i, /site (is )?temporarily unavailable/i] },
  { name: "Coming soon", patterns: [/coming soon/i, /under construction/i, /site is being built/i] },
];

const match = (table, haystack) =>
  table.filter((entry) => entry.patterns.some((p) => p.test(haystack))).map((entry) => entry.name);

/** Years asserted by the page: a copyright footer and any dated content. */
function dateSignals(html, text) {
  const copyright = [...html.matchAll(/(?:©|&copy;|copyright)\s*(?:20\d{2}\s*[-–—]\s*)?(20\d{2})/gi)]
    .map((m) => Number(m[1]));
  const timeTags = [...html.matchAll(/datetime="(20\d{2})-\d{2}/gi)].map((m) => Number(m[1]));
  const meta = [...html.matchAll(/(?:article:(?:published|modified)_time|dateModified|datePublished)"?[^>]{0,40}?(20\d{2})-\d{2}/gi)]
    .map((m) => Number(m[1]));
  // Dates written for humans, e.g. "12 March 2026" or "March 2026".
  const prose = [...text.matchAll(/\b(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\.?\s+(20\d{2})\b/gi)]
    .map((m) => Number(m[1]));
  const content = [...timeTags, ...meta, ...prose];
  return {
    copyrightYear: copyright.length ? Math.max(...copyright) : null,
    latestContentYear: content.length ? Math.max(...content) : null,
  };
}

function fingerprint(html, headers) {
  const generator = html.match(/<meta[^>]+name=["']generator["'][^>]+content=["']([^"']+)/i)?.[1] ?? null;
  const title = html.match(/<title[^>]*>([\s\S]{0,300}?)<\/title>/i)?.[1]?.replace(/\s+/g, " ").trim() ?? null;
  const text = html.replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
  const haystack = `${html}\n${headers}`;
  return {
    title,
    generator,
    builders: match(BUILDERS, haystack),
    booking: match(BOOKING, haystack),
    deadMarkers: match(DEAD_MARKERS, `${title ?? ""}\n${text.slice(0, 4000)}`),
    ...dateSignals(html, text),
    textLength: text.length,
    // A page with almost no prose is a placeholder or a splash, whatever it
    // returns. Recorded so "brochure-only" can be told from "empty".
    thin: text.length < 400,
  };
}

async function fetchOnce(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      redirect: "follow",
      signal: controller.signal,
      headers: {
        // Some hosts serve a challenge page or refuse outright without these.
        "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36",
        accept: "text/html,application/xhtml+xml",
        "accept-language": "en-GB,en;q=0.9",
      },
    });
    const html = (await res.text()).slice(0, 400_000);
    const headers = [...res.headers].map(([k, v]) => `${k}: ${v}`).join("\n");
    return {
      ok: true,
      status: res.status,
      finalUrl: res.url,
      redirected: res.url !== url,
      server: res.headers.get("server") ?? null,
      ...fingerprint(html, headers),
    };
  } catch (error) {
    // Distinguishing these is the point: ENOTFOUND is a dead domain, ECONNREFUSED
    // on 443 is a host that never set HTTPS up, a timeout is neither.
    const cause = error.cause ?? {};
    return {
      ok: false,
      error: error.name === "AbortError" ? "timeout" : (cause.code ?? error.code ?? error.message),
    };
  } finally {
    clearTimeout(timer);
  }
}

async function probe({ key, url }) {
  const host = (() => {
    try { return new URL(url.includes("://") ? url : `https://${url}`).hostname; }
    catch { return null; }
  })();
  if (!host) return { key, url, dns: "invalid-url" };

  let dns = null;
  try {
    const { address } = await lookup(host);
    dns = address;
  } catch (error) {
    // No A record: nothing else is worth trying.
    return { key, url, host, dns: error.code ?? "lookup-failed", verdict: "dead: DNS does not resolve" };
  }

  const https = await fetchOnce(`https://${host}${new URL(url.includes("://") ? url : `https://${url}`).pathname}`);
  const http = https.ok ? null : await fetchOnce(`http://${host}`);

  const live = https.ok ? https : http?.ok ? http : null;
  const verdict = (() => {
    if (!live) return `dead: no response (https ${https.error}${http ? `, http ${http.error}` : ""})`;
    if (live.status >= 500) return `dead: server error ${live.status}`;
    if (live.status >= 400) return `dead: ${live.status}${live.deadMarkers.length ? ` (${live.deadMarkers[0]})` : ""}`;
    if (live.deadMarkers.length) return `dead: ${live.deadMarkers.join(", ")}`;
    if (live.thin) return "needs review: page has almost no content";
    if (!https.ok) return "live, HTTP only: no working HTTPS";
    return live.booking.length ? "live, transactional" : "live, brochure-only";
  })();

  return {
    key, url, host, dns,
    https: https.ok ? { status: https.status, finalUrl: https.finalUrl } : { error: https.error },
    http: http ? (http.ok ? { status: http.status, finalUrl: http.finalUrl } : { error: http.error }) : null,
    ...(live ? {
      title: live.title, generator: live.generator, builders: live.builders,
      booking: live.booking, server: live.server,
      copyrightYear: live.copyrightYear, latestContentYear: live.latestContentYear,
      redirected: live.redirected, finalUrl: live.finalUrl, textLength: live.textLength,
    } : {}),
    verdict,
  };
}

const targets = JSON.parse(readFileSync(inFile, "utf8"));
const results = [];
let cursor = 0;
async function worker() {
  while (cursor < targets.length) {
    const target = targets[cursor++];
    results.push(await probe(target));
    process.stderr.write(`\r${results.length}/${targets.length}`);
    await delay(120);
  }
}
await Promise.all(Array.from({ length: concurrency }, worker));
process.stderr.write("\n");

results.sort((a, b) => String(a.key).localeCompare(String(b.key)));
writeFileSync(outFile, `${JSON.stringify(results, null, 1)}\n`);
const tally = results.reduce((acc, r) => {
  const bucket = r.verdict.split(":")[0];
  acc[bucket] = (acc[bucket] ?? 0) + 1;
  return acc;
}, {});
console.log(JSON.stringify(tally, null, 2));
