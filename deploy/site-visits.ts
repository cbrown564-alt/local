/**
 * Cookieless visit counts: one row per day, page and source, written by the
 * Worker as it serves each page. Nothing identifies a visitor — no cookie, no
 * tracking script, no IP address or browser string is stored — so the site
 * needs no consent banner.
 *
 * A source is where a visitor came from to that page: the link's `source`
 * query (or `utm_source` / `from`), else the site that linked to it, else
 * `direct`. `site` is a step from one of our own pages to another.
 */

export interface Visit {
  day: string;
  path: string;
  source: string;
}

const OWN = new Set(["mournemade.co.uk", "www.mournemade.co.uk"]);

// Crawlers, monitors, link-unfurlers and identifiable email-link scanners.
// A real browser's document navigation does not match this.
const AUTOMATED =
  /bot|crawl|spider|slurp|preview|monitor|facebookexternalhit|facebot|curl\/|wget|python|headless|lighthouse|bytespider|gptbot|chatgpt-user|claudebot|claude-user|perplexity|applebot|bingbot|googlebot|google-safety|adsbot|mediapartners-google|ia_archiver|semrush|ahrefs|mj12bot|dotbot|petalbot|yandex|duckassist|oai-searchbot|amazonbot|ccbot|meta-externalagent|linkedinbot|whatsapp|telegrambot|discordbot|slackbot|pinterest|embedly|iframely|outlook-ios|microsoft-office|safelinks|proofpoint|pfpt|barracuda|mimecast|symantec|fireeye|urlscan|bitsight|zerofox|superhuman|safelinking|protection\.outlook|office365|skypeuripreview/i;

const ALIAS: Record<string, string> = {
  "lnkd.in": "linkedin.com",
  "l.facebook.com": "facebook.com",
  "lm.facebook.com": "facebook.com",
  "t.co": "x.com",
  "twitter.com": "x.com",
  "com.google.android.gm": "gmail",
  "mail.google.com": "gmail",
};

/** A source as it is stored: lower case letters, digits, dots, dashes and underscores, at most 40. */
export const sourceLabel = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9._-]/g, "")
    .slice(0, 40);

/** Paths are stored without a query, with a trailing slash (except `/`), at most 200 characters. */
export function normalisePath(pathname: string): string {
  let path = pathname === "/index.html" ? "/" : pathname;
  if (path.length > 1 && path.endsWith("/index.html")) path = path.slice(0, -"/index.html".length) + "/";
  if (path.length > 1 && !path.endsWith("/")) path += "/";
  return path.slice(0, 200);
}

export function visitDay(now: number): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/London",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(now));
}

function isPrefetch(request: Request): boolean {
  const purpose = [
    request.headers.get("Purpose"),
    request.headers.get("Sec-Purpose"),
    request.headers.get("X-Purpose"),
    request.headers.get("X-moz"),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  return /\bprefetch\b|\bprerender\b/.test(purpose);
}

function isDocumentGet(request: Request): boolean {
  if (request.method !== "GET") return false;
  if (isPrefetch(request)) return false;
  const dest = request.headers.get("Sec-Fetch-Dest");
  if (dest) return dest.toLowerCase() === "document";
  const accept = request.headers.get("Accept") ?? "";
  return accept.includes("text/html");
}

/**
 * Where a page request came from. `source` is what its visit counts as.
 */
export function sourceOf(request: Request): string {
  const url = new URL(request.url);
  const tagged = sourceLabel(
    url.searchParams.get("source") ?? url.searchParams.get("utm_source") ?? url.searchParams.get("from") ?? "",
  );
  let linked = "";
  try {
    const referrer = request.headers.get("Referer");
    const host = referrer ? new URL(referrer).hostname.replace(/^www\./, "") : "";
    if (OWN.has(host) || OWN.has(`www.${host}`)) return tagged || "site";
    linked = host ? sourceLabel(ALIAS[host] ?? ALIAS[`www.${host}`] ?? host) : "";
  } catch {
    // An unreadable referrer counts as direct if no tag is present.
  }
  return tagged || linked || "direct";
}

/** The visit a page request counts as, or null when it is not a person loading one of the site's pages. */
export function visitOf(request: Request, response: Response, now: number): Visit | null {
  if (!isDocumentGet(request) || response.status !== 200) return null;
  if (!response.headers.get("Content-Type")?.includes("text/html")) return null;
  if (AUTOMATED.test(request.headers.get("User-Agent") ?? "")) return null;
  const path = normalisePath(new URL(request.url).pathname);
  if (path === "/api/" || path.startsWith("/api/")) return null;
  return { day: visitDay(now), path, source: sourceOf(request) };
}

export async function countVisit(db: D1Database, visit: Visit): Promise<void> {
  await db
    .prepare(
      "INSERT INTO site_visits (day, path, source, visits) VALUES (?, ?, ?, 1) ON CONFLICT (day, path, source) DO UPDATE SET visits = visits + 1",
    )
    .bind(visit.day, visit.path, visit.source)
    .run();
}
