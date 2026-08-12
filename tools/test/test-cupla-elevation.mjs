#!/usr/bin/env node
/**
 * Pins the Cúpla elevation (moves 1–4 of
 * research/concepts/cupla/cupla-elevation-brief.md) and the repairs carried
 * into the same passes from the 25 July review and the 31 July audit.
 *
 * Static checks run against the built pages, stylesheet, provenance record and
 * one-sheet source. The brief's phone-fold and caption hit-test pins then run
 * in headless Chrome against the built home route — a single focused probe, not
 * the retired journey suite. Requires `pnpm build` first; `pnpm test` runs the
 * build ahead of it. Needs system Chrome (`CHROME_PATH` or the usual install
 * locations via `tools/lib/chrome.mjs`).
 */
import { createReadStream, existsSync, readFileSync, statSync } from "node:fs";
import http from "node:http";
import path from "node:path";
import puppeteer from "puppeteer-core";
import { findChrome } from "../lib/chrome.mjs";
import { blockMediaRequests } from "../lib/block-media-requests.mjs";
import { projectRoot } from "../lib/public-slugs.mjs";

const homePath = path.join(projectRoot, "dist", "concepts", "cupla", "index.html");
const menuPath = path.join(projectRoot, "dist", "concepts", "cupla", "menu", "index.html");
const stylesPath = path.join(projectRoot, "src", "concepts", "cupla", "styles.css");
const provenancePath = path.join(projectRoot, "research", "image-provenance.md");
const visualisation = path.join(
  projectRoot, "public", "media", "concepts", "cupla", "cupla-faithful-visualisation.jpg",
);

for (const built of [homePath, menuPath]) {
  if (!existsSync(built)) {
    console.error(`Missing ${path.relative(projectRoot, built)} — run \`pnpm build\` first.`);
    process.exit(1);
  }
}

const home = readFileSync(homePath, "utf8");
const menu = readFileSync(menuPath, "utf8");
const styles = readFileSync(stylesPath, "utf8");
const provenance = readFileSync(provenancePath, "utf8");

/** Everything a visitor never reads: inline styles, the shell's own script,
 *  and the document head. Left in, they turn CSS decimals into "time claims"
 *  and the placeholder-stripping script into a placeholder. */
const bodyOf = (html) =>
  html
    .slice(Math.max(html.indexOf("<body"), 0))
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ");
/** Markup wraps freely; compare on collapsed whitespace. */
const flat = (html) => html.replace(/\s+/g, " ");
/** Visible text only, for the copy assertions. */
const textOf = (html) => flat(bodyOf(html)).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");

const homeFlat = flat(bodyOf(home));
const homeText = textOf(home);
const menuText = textOf(menu);

const failures = [];
const check = (label, condition) => {
  if (!condition) failures.push(label);
};

// ── Move 1 — the café's own three words do the structuring ─────────────────
check("the brand lockup no longer carries the café's three words", homeText.includes("Brews · Bakes · Bowls"));
check(
  "the day band is not led by the café's three words",
  homeText.includes("Brews, bakes and bowls — the counter changes as the day does."),
);
for (const [ga, en] of [["Caife", "Coffee"], ["Bácús", "Morning bakes"], ["Babhlaí", "Brunch bowls"]]) {
  check(`the three words are not paired on the home route: ${ga} · ${en}`, homeText.includes(ga) && homeText.includes(en));
  check(`the menu no longer names its column: ${ga}`, menuText.includes(ga));
}

// ── Move 2 — the pair is staged, from the three verified facts only ─────────
const pairStart = homeFlat.indexOf('id="cp-pair"');
const pair = pairStart > -1 ? homeFlat.slice(pairStart, homeFlat.indexOf("</section>", pairStart)) : "";
const pairText = textOf(pair);
check("the story block is missing", pair.length > 0);
check("the story block does not head with the essence", pairText.includes("Everything here comes in twos."));
for (const fact of [
  "the Irish for twins",
  "Twin owners",
  "opened the café in 2024",
  "Est. 2024",
  "on the door at 105 Main Street",
]) {
  check(`the story block is missing a verified fact: ${fact}`, pairText.includes(fact));
}
check(
  "the story block does not keep framing the bilingual treatment as drawn from the café's own name and branding",
  pairText.includes("as they do in the café's own name and branding"),
);
// The record holds no owner names, no photograph and no sentence of either
// twin's. Anything below would be invented biography.
const biography = [
  /\bmy (brother|sister|twin)\b/i,
  /\bwe (grew up|trained|studied|left|returned|dreamed|always wanted)\b/i,
  /\bafter (years|a career|working)\b/i,
  /\bborn (and raised|in)\b/i,
  /\bour (mother|father|mum|dad|granny|grandmother|grandfather|family recipe)\b/i,
  /\b(founder|owner)s? (,|named|called)\b/i,
  /\bsays\b/i,
  /\bquote\b/i,
];
for (const pattern of biography) {
  check(`invented biography in the story block: ${pattern}`, !pattern.test(pairText));
}

// ── Move 3 — the day in two beats, and the honest handoff ──────────────────
const dayStart = homeFlat.indexOf('id="cp-day"');
const day = dayStart > -1 ? homeFlat.slice(dayStart, homeFlat.indexOf("</section>", dayStart)) : "";
const dayText = textOf(day);
check("the day band is missing", day.length > 0);
check('the morning beat is missing', /id="cp-maidin"/.test(day) && dayText.includes("Maidin"));
check('the lunch beat is missing', /id="cp-lon"/.test(day) && dayText.includes("Lón"));
check(
  "the day band does not hand today's counter and hours to the feed",
  dayText.includes("What's on the counter today") && dayText.includes("today's hours") && dayText.includes("@cuplabrewbar"),
);
check(
  "the day band does not label the menu a sample",
  dayText.includes("sample of what the counter holds, not today's list"),
);
// Two beats, not three: a third would invent a service the record does not hold.
const beatCount = (day.match(/class="cp-beat"/g) ?? []).length;
check(`the day must stay at two beats (found ${beatCount})`, beatCount === 2);
check("prices have leaked onto the home route", !homeText.includes("£"));

// ── The standing scan — no hour, schedule or day's-special claim anywhere ───
// Hours live on Instagram and the concept states the handoff, never a time.
const timeClaims = [
  // A clock reading, but not a sterling price on the sample menu card.
  /(?<![£\d])\b\d{1,2}[:.]\d{2}\b/,
  /\b\d{1,2}\s?(?:am|pm)\b/i,
  /\b(?:mon|tues|wednes|thurs|fri|satur|sun)day\b/i,
  /\bopen(?:s|ing)?\s+(?:at|from|until|till|'?til)\b/i,
  /\bopening hours\b/i,
  /\bwe (?:open|close)\b/i,
  /\bclosed\b/i,
  /\bserved (?:from|until)\b/i,
  /\bdaily special\b/i,
];
for (const [route, text] of [["home", homeText], ["menu", menuText]]) {
  for (const pattern of timeClaims) {
    check(`a time-of-day or opening-hours claim reached the ${route} route: ${pattern}`, !pattern.test(text));
  }
}

// ── Move 4 — the essence film leads, the frontage proves, both disclosed ───
// The hero figure and the Our story figure swapped places on 10 August 2026.
// The disclosure obligation did not move with them: whichever figure holds the
// hero has to carry a caption that survives the fold and the fixed chrome, and
// the frontage keeps its full alt → caption → case-study chain wherever it sits.
check(
  "the essence film no longer leads the hero",
  /<figure class="cp-essence-hero">[\s\S]*?essence-twin-pour\.mp4/.test(homeFlat),
);
check(
  "the hero film lost its visible generated-origin caption",
  /AI-generated film · two flat whites poured together, an illustration of the counter rather than a recording of it/.test(
    homeFlat.replace(/\s+/g, " "),
  ),
);
check(
  "the frontage no longer sits in the Our story section",
  /<section class="cp-pair"[\s\S]*?<figure class="cp-frontage">[\s\S]*?cupla-faithful-visualisation/.test(homeFlat),
);
check("the frontage visualisation is missing from public/", existsSync(visualisation));
check(
  "the frontage visualisation no longer renders on the home route",
  home.includes("cupla-faithful-visualisation.jpg"),
);
check(
  "the frontage alt text does not disclose its generated origin",
  /alt="Faithful AI-generated visualisation of Cúpla's[^"]*"/.test(home),
);
check(
  "the frontage alt text does not name the fascia and the Est. 2024 decal",
  /alt="[^"]*CÚPLA fascia[^"]*Est\. 2024 decal[^"]*"/.test(home),
);
check(
  "the visible caption does not disclose the generated origin and its reference",
  /<figcaption>\s*AI-generated visualisation · the shopfront at 105 Main Street, drawn from a photograph of the premises taken in August 2024\s*<\/figcaption>/.test(
    homeFlat.replace(/\s+/g, " "),
  ),
);
check(
  "the studio banner no longer carries the generated-imagery note",
  homeText.includes("The shopfront image is an AI-generated visualisation."),
);
// The caption is a sibling in the page flow, directly after the image: the
// phone failure this move repairs was a disclosure painted over by fixed
// chrome, and a rect test certified it for two review rounds.
check(
  "the caption is not in the page flow immediately after the image",
  /<\/picture>\s*<figcaption>/.test(homeFlat),
);
check(
  "the phone stack no longer places the hero figure between the wordmark and the offer",
  /grid-template-areas:\s*"head"\s*"figure"\s*"body";/.test(styles),
);
// Freed from the hero's fixed grid area, the frontage sizes to its own aspect
// ratio at every width, so the fascia can no longer be cropped out by a tall
// window — the defect the old flex/height:0 pair existed to bound.
check(
  "the frontage is no longer rendered uncropped at its natural height",
  /\.cp-frontage img \{ display: block; width: 100%; height: auto; \}/.test(styles),
);
// The third link in the disclosure chain: the case study carries the concept's
// opening screen, so its Sources & limits block has to say what is in it.
const caseStudyPath = path.join(projectRoot, "dist", "transformations", "cupla", "index.html");
if (existsSync(caseStudyPath)) {
  const caseStudyHtml = readFileSync(caseStudyPath, "utf8");
  const caseStudy = textOf(caseStudyHtml);
  check(
    "the case study does not disclose the generated shopfront",
    caseStudy.includes("AI-generated visualisation, faithful to a photograph of the premises taken in August 2024"),
  );
  check(
    "the case study still claims the concept introduces no photography",
    !caseStudy.includes("The concept introduces no photography"),
  );
  check(
    "the case study does not source the café's three words",
    caseStudy.includes("read 21 July 2026"),
  );
  check(
    "the case study second-surface label still carries the Menu/p> typo",
    !caseStudyHtml.includes("Menu/p>") && /second-surface-label">\s*Menu\s*<\/p>/.test(caseStudyHtml),
  );
} else {
  check("the cupla case study did not build", false);
}

const onesheetPath = path.join(projectRoot, "src", "workbench", "print", "cupla-onesheet.astro");
const onesheet = readFileSync(onesheetPath, "utf8");
check(
  "the one-sheet no longer labels the menu a sample awaiting Irish review",
  onesheet.includes("sample menu, Irish review pending")
    && onesheet.includes("labelled sample")
    && onesheet.includes("sterling prices are for design reading only"),
);
check(
  "the one-sheet still claims no unpublished prices or zero invented menu items",
  !onesheet.includes("price you have not published") && !onesheet.includes("invented menu items"),
);

check(
  "the provenance record does not carry the visualisation as in use",
  /`cupla-faithful-visualisation\.jpg` — \*\*in use/.test(provenance),
);
check(
  "the provenance record does not carry a rights position for the reference photograph",
  /cupla-faithful-visualisation[\s\S]{0,1600}?rights position/i.test(provenance),
);

// ── Carried repairs ────────────────────────────────────────────────────────
// A focus ring that reads on both the oat and the petrol grounds.
check(
  "the two-tone focus ring is gone from the stylesheet",
  /body\.concept-page\.concept-cupla :focus-visible \{[^}]*outline: 3px solid #ffffff;[^}]*box-shadow: 0 0 0 3px var\(--focus-ink\);/.test(
    styles.replace(/\s+/g, " ").replace(/ \{/g, " {"),
  ) || (/body\.concept-page\.concept-cupla :focus-visible/.test(styles) && /--focus-ink/.test(styles)),
);
// The strikethrough shelf: no placeholder link survives on either route.
for (const [route, html] of [["home", home], ["menu", menu]]) {
  check(`a placeholder link survives on the ${route} route`, !/data-concept-placeholder/.test(bodyOf(html)));
}
// The corrected gloss, pinned by name.
check('the "Babhla Blasta" gloss is not corrected to tasty', menuText.includes("Babhla Blasta Tasty bowl"));
check('the "Savoury bowl" gloss has returned', !menuText.includes("Savoury bowl"));
// The sample label travels with the prices, at any scroll position.
check(
  "the sample label is no longer sticky above the menu columns",
  /\.cp-menu-provisional \{[^}]*position: sticky;/.test(styles),
);
check("the sample label is missing from the menu", menuText.includes("Sample menu — check Instagram"));
// Dead weight the last two reviews named.
for (const dead of [".cp-card", ".cp-offer", "cp-rise", ".cp-rail", ".cp-counter"]) {
  check(`dead CSS survives in styles.css: ${dead}`, !styles.includes(dead));
}

// ── Irish is a truth surface ───────────────────────────────────────────────
/**
 * Walk the built markup keeping a stack of `lang` values, so every text node
 * can be judged against the language it is actually announced in.
 */
const VOID = new Set(["area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "source", "track", "wbr"]);
const textByLang = (html) => {
  const chunks = [];
  const stack = [];
  let current = "en";
  const token = /<!--[\s\S]*?-->|<(\/)?([a-zA-Z0-9-]+)((?:"[^"]*"|'[^']*'|[^'">])*)(\/)?>|([^<]+)/g;
  let match;
  while ((match = token.exec(html)) !== null) {
    const [, closing, tag, attrs = "", selfClosing, text] = match;
    if (text !== undefined) {
      const trimmed = text.replace(/\s+/g, " ").trim();
      if (trimmed) chunks.push({ lang: current, text: trimmed });
      continue;
    }
    if (!tag) continue;
    const name = tag.toLowerCase();
    if (name === "script" || name === "style") {
      const close = html.indexOf(`</${name}`, token.lastIndex);
      if (close > -1) token.lastIndex = close;
      continue;
    }
    if (closing) {
      if (stack.length > 0) current = stack.pop();
      continue;
    }
    if (VOID.has(name) || selfClosing) continue;
    stack.push(current);
    const lang = /\blang="([^"]*)"/.exec(attrs);
    if (lang) current = lang[1].toLowerCase().startsWith("ga") ? "ga" : "en";
  }
  return chunks;
};

/** Irish that must never be announced in an English voice. */
const irish = [
  "Fáilte", "isteach", "biachlár", "Biachlár", "Ag an gcuntar", "Ár scéal", "Caife", "Bácús",
  "Babhlaí", "Babhla", "Maidin", "Lón", "Féach ar an mbiachlár", "ar an bpríomhshráid",
  "Dún Droma", "Speisialtachtaí", "Scóna", "Cáca Milis", "Tósta", "Tae", "Gránóla",
  "an Lae", "Blasta", "Bán", "Scagtha",
];
/** English that must never be announced in an Irish voice. */
const english = [
  "Menu", "Home", "Our story", "At the counter", "Coffee", "Morning bakes", "Brunch bowls",
  "Today", "Scone", "Cake", "Toast", "Tea", "Granola", "Filter", "Flat White", "bowl of the day",
  "Instagram",
];

for (const [route, html] of [["home", home], ["menu", menu]]) {
  const chunks = textByLang(bodyOf(html));
  for (const chunk of chunks) {
    if (chunk.lang === "ga") {
      for (const word of english) {
        if (new RegExp(`\\b${word}\\b`, "i").test(chunk.text)) {
          check(`English announced as Irish on the ${route} route: "${chunk.text}" (${word})`, false);
        }
      }
      continue;
    }
    for (const word of irish) {
      if (new RegExp(`(^|[\\s(·—-])${word}\\b`).test(chunk.text)) {
        check(`Irish without lang="ga" on the ${route} route: "${chunk.text}" (${word})`, false);
      }
    }
  }
}

// ── The swap test, as far as a file can carry it ───────────────────────────
const anchors = ["Cúpla", "105 Main Street", "Dundrum", "Co. Down", "cuplabrewbar", "twins", "2024"];
for (const [route, text] of [["home", homeText], ["menu", menuText]]) {
  const missing = anchors.filter((anchor) => !text.includes(anchor));
  check(
    `the ${route} route is not anchored to this café; missing: ${missing.join(", ")}`,
    // The menu card carries the address and the name rather than the founding.
    missing.filter((item) => !(route === "menu" && ["twins", "2024"].includes(item))).length === 0,
  );
}
// The disambiguation the verification record asks for, on every route.
for (const [route, text] of [["home", homeText], ["menu", menuText]]) {
  check(`Co. Down is missing from the ${route} route`, text.includes("Co. Down"));
}

// ── Move 4 geometry — the brief's phone-fold and caption hit-test pins ─────
const distRoot = path.join(projectRoot, "dist");
const mimeByExt = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".jpg": "image/jpeg",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".jpeg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json",
  ".mjs": "text/javascript; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

const serveDist = () =>
  new Promise((resolve, reject) => {
    const server = http.createServer((req, res) => {
      const url = new URL(req.url ?? "/", "http://127.0.0.1");
      let rel = decodeURIComponent(url.pathname);
      if (rel.endsWith("/")) rel += "index.html";
      // Strip the leading slash so resolve/join cannot treat the URL path as
      // absolute and walk away from distRoot (classic POSIX path trap).
      rel = rel.replace(/^\/+/, "");
      const filePath = path.resolve(distRoot, rel);
      if (
        (filePath !== distRoot && !filePath.startsWith(distRoot + path.sep))
        || !existsSync(filePath)
        || statSync(filePath).isDirectory()
      ) {
        res.writeHead(404).end("Not found");
        return;
      }
      res.writeHead(200, { "Content-Type": mimeByExt[path.extname(filePath)] ?? "application/octet-stream" });
      createReadStream(filePath).pipe(res);
    });
    server.once("error", reject);
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      if (!address || typeof address === "string") {
        reject(new Error("Could not bind the Cúpla geometry probe server."));
        return;
      }
      resolve({ server, base: `http://127.0.0.1:${address.port}` });
    });
  });

const measureHome = async (page) =>
  page.evaluate(() => {
    const wordmark = document.querySelector(".cp-hero h1");
    const image = document.querySelector(".cp-essence-hero video");
    const caption = document.querySelector(".cp-essence-hero figcaption");
    if (!wordmark || !image || !caption) {
      return { ok: false, reason: "missing wordmark, hero film or caption" };
    }
    const word = wordmark.getBoundingClientRect();
    const img = image.getBoundingClientRect();
    const cap = caption.getBoundingClientRect();
    const hit = document.elementFromPoint(cap.left + cap.width / 2, cap.top + cap.height / 2);
    return {
      ok: true,
      viewportHeight: window.innerHeight,
      wordmarkTop: word.top,
      wordmarkBottom: word.bottom,
      imageTop: img.top,
      imageBottom: img.bottom,
      captionTop: cap.top,
      captionBottom: cap.bottom,
      hitCaption: Boolean(hit && caption.contains(hit)),
    };
  });

/* The frontage now sits below the fold, so its disclosure cannot be pinned to
   the first viewport — but the original defect was a caption painted over by
   fixed chrome, which below-fold content is no less exposed to. Scroll it into
   view and hit-test it there. */
const measureFrontageCaption = async (page) => {
  await page.evaluate(() => {
    /* "instant", not the default: global.css sets scroll-behavior: smooth, and
       a smooth scroll is still animating when the rects are read. */
    document.querySelector(".cp-frontage figcaption")?.scrollIntoView({
      block: "center",
      behavior: "instant",
    });
  });
  return page.evaluate(() => {
    const image = document.querySelector(".cp-frontage img");
    const caption = document.querySelector(".cp-frontage figcaption");
    if (!image || !caption) return { ok: false, reason: "missing frontage image or caption" };
    const img = image.getBoundingClientRect();
    const cap = caption.getBoundingClientRect();
    const hit = document.elementFromPoint(cap.left + cap.width / 2, cap.top + cap.height / 2);
    return {
      ok: true,
      /* Uncropped: the rendered box keeps the source 3:2, so the fascia and the
         Est. 2024 decal are both still in frame. */
      ratio: img.height > 0 ? img.width / img.height : 0,
      captionBelowImage: cap.top >= img.bottom - 1,
      hitCaption: Boolean(hit && caption.contains(hit)),
    };
  });
};

let chromePath;
try {
  chromePath = findChrome();
} catch (error) {
  check(`Chrome is required for the Cúpla geometry pins: ${error instanceof Error ? error.message : error}`, false);
}

if (chromePath) {
  const { server, base } = await serveDist();
  const homeUrl = new URL("/concepts/cupla/", base).href;
  {
    const probe = await fetch(homeUrl);
    if (!probe.ok) {
      await new Promise((resolve) => server.close(resolve));
      throw new Error(
        `Cúpla geometry probe server returned HTTP ${probe.status} for ${homeUrl} — dist static serve is broken`,
      );
    }
    await probe.arrayBuffer();
  }
  const launchArgs = [
    "--hide-scrollbars",
    "--force-color-profile=srgb",
    // CI runners often have tiny /dev/shm; without this Chrome dies mid-session
    // and surfaces it as ConnectionClosedError on newPage/goto.
    "--disable-dev-shm-usage",
    // Hero film decode/autoplay has crashed GHA Chrome mid-goto ("Navigating
    // frame was detached" → Connection closed). Geometry pins only need the
    // video element's CSS box; media requests are aborted separately.
    "--disable-gpu",
    "--disable-extensions",
    "--mute-audio",
    "--autoplay-policy=user-gesture-required",
    ...(process.env.CI || process.env.CHROME_NO_SANDBOX === "1"
      ? ["--no-sandbox", "--disable-setuid-sandbox"]
      : []),
  ];

  const isTransientBrowserError = (error) => {
    const message = error instanceof Error ? error.message : String(error);
    const name = error instanceof Error ? (error.name ?? "") : "";
    return /Connection closed|Target closed|Navigating frame was detached|LifecycleWatcher|ProtocolError|Protocol error|net::ERR|Timeout|Session closed|Browser disconnected|ConnectionClosed/i.test(
      `${name} ${message}`,
    );
  };

  const launchBrowser = () =>
    puppeteer.launch({
      executablePath: chromePath,
      headless: "new",
      args: launchArgs,
    });

  const settleHome = async (page) => {
    // puppeteer-core supports load/domcontentloaded/networkidle0/2 — not Playwright's "commit".
    await page.goto(homeUrl, { waitUntil: "domcontentloaded", timeout: 60000 });
    await page.waitForSelector(".cp-hero h1, .cp-essence-hero", { timeout: 15000 });
    try {
      await page.evaluate(() => document.fonts.ready);
    } catch {
      // fonts.ready can reject if the document navigates mid-wait; ignore.
    }
  };

  /** Open a fresh page and navigate; retry goto with a new page before giving up. */
  const openHome = async (activeBrowser, viewport) => {
    let lastError;
    for (let navAttempt = 1; navAttempt <= 3; navAttempt++) {
      const page = await activeBrowser.newPage();
      await page.setViewport(viewport);
      try {
        await blockMediaRequests(page);
        await settleHome(page);
        return page;
      } catch (error) {
        lastError = error;
        await page.close().catch(() => {});
        console.error(
          `Cúpla geometry: goto failed (page attempt ${navAttempt}/3): ${
            error instanceof Error ? error.message : error
          }`,
        );
        if (!isTransientBrowserError(error) || navAttempt === 3) throw error;
        await new Promise((resolve) => setTimeout(resolve, 150 * navAttempt));
      }
    }
    throw lastError;
  };

  /** Phone + desktop probes. Throws only on transport/lifecycle failures. */
  const probeGeometry = async (activeBrowser) => {
    const page = await openHome(activeBrowser, { width: 390, height: 844, deviceScaleFactor: 1 });
    try {
      await page.evaluate(() => window.scrollTo(0, 0));
      const phone = await measureHome(page);
      const phoneFrontage = await measureFrontageCaption(page);

      await page.setViewport({ width: 1265, height: 710, deviceScaleFactor: 1 });
      await settleHome(page);
      await page.evaluate(() => window.scrollTo(0, 0));
      const desktop = await measureHome(page);
      const desktopFrontage = await measureFrontageCaption(page);
      return { phone, phoneFrontage, desktop, desktopFrontage };
    } finally {
      await page.close().catch(() => {});
    }
  };

  let browser;
  try {
    let geometry;
    let lastError;
    for (let attempt = 1; attempt <= 5; attempt++) {
      try {
        // Fresh browser each attempt: ConnectionClosedError means the CDP pipe
        // is dead, so retrying newPage() on the same handle cannot recover.
        if (browser) {
          await browser.close().catch(() => {});
          browser = null;
        }
        browser = await launchBrowser();
        geometry = await probeGeometry(browser);
        lastError = null;
        break;
      } catch (error) {
        lastError = error;
        console.error(
          `Cúpla geometry: browser attempt ${attempt}/5 failed: ${
            error instanceof Error ? error.message : error
          }`,
        );
        if (browser) {
          await browser.close().catch(() => {});
          browser = null;
        }
        if (!isTransientBrowserError(error) || attempt === 5) throw error;
        await new Promise((resolve) => setTimeout(resolve, 400 * attempt));
      }
    }
    if (!geometry) throw lastError;

    const { phone, phoneFrontage, desktop, desktopFrontage } = geometry;
    check(`phone geometry could not measure the home route: ${phone.reason ?? "unknown"}`, phone.ok);
    if (phone.ok) {
      check(
        `at 390×844 the wordmark is not in the first viewport (top ${phone.wordmarkTop.toFixed(1)}, bottom ${phone.wordmarkBottom.toFixed(1)})`,
        phone.wordmarkTop >= 0 && phone.wordmarkBottom <= phone.viewportHeight,
      );
      check(
        `at 390×844 the hero film does not begin above y 520 (top ${phone.imageTop.toFixed(1)})`,
        phone.imageTop >= 0 && phone.imageTop < 520,
      );
      check(
        `at 390×844 the caption is not visible without scrolling (top ${phone.captionTop.toFixed(1)}, bottom ${phone.captionBottom.toFixed(1)})`,
        phone.captionTop < phone.viewportHeight && phone.captionBottom > 0,
      );
      check("at 390×844 elementFromPoint at the caption centre does not return the caption", phone.hitCaption);
    }

    check(`phone geometry could not measure the frontage: ${phoneFrontage.reason ?? "unknown"}`, phoneFrontage.ok);
    if (phoneFrontage.ok) {
      check(
        `at 390×844 the frontage is not rendered uncropped (ratio ${phoneFrontage.ratio.toFixed(3)})`,
        Math.abs(phoneFrontage.ratio - 1536 / 1024) < 0.02,
      );
      check("at 390×844 the frontage caption does not sit below its image", phoneFrontage.captionBelowImage);
      check(
        "at 390×844 elementFromPoint at the frontage caption centre does not return the caption",
        phoneFrontage.hitCaption,
      );
    }

    check(`desktop geometry could not measure the home route: ${desktop.reason ?? "unknown"}`, desktop.ok);
    if (desktop.ok) {
      check(
        "at 1265×710 elementFromPoint at the caption centre does not return the caption",
        desktop.hitCaption,
      );
      check(
        `at 1265×710 the caption is not in the first viewport (top ${desktop.captionTop.toFixed(1)}, bottom ${desktop.captionBottom.toFixed(1)})`,
        desktop.captionTop < desktop.viewportHeight && desktop.captionBottom > 0,
      );
    }

    check(`desktop geometry could not measure the frontage: ${desktopFrontage.reason ?? "unknown"}`, desktopFrontage.ok);
    if (desktopFrontage.ok) {
      check(
        `at 1265×710 the frontage is not rendered uncropped (ratio ${desktopFrontage.ratio.toFixed(3)})`,
        Math.abs(desktopFrontage.ratio - 1536 / 1024) < 0.02,
      );
      check("at 1265×710 the frontage caption does not sit below its image", desktopFrontage.captionBelowImage);
      check(
        "at 1265×710 elementFromPoint at the frontage caption centre does not return the caption",
        desktopFrontage.hitCaption,
      );
    }
  } finally {
    if (browser) await browser.close().catch(() => {});
    await new Promise((resolve) => server.close(resolve));
  }
}

if (failures.length > 0) {
  console.error("Cúpla elevation checks failed:");
  for (const failure of failures) console.error(`  - ${failure}`);
  process.exit(1);
}

console.log("Cúpla elevation checks passed.");
