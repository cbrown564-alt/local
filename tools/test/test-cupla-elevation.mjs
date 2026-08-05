#!/usr/bin/env node
/**
 * Pins the Cúpla elevation (moves 1–4 of
 * research/concepts/cupla/cupla-elevation-brief.md) and the repairs carried
 * into the same passes from the 25 July review and the 31 July audit.
 *
 * Runs against the built pages, not the source, so a template that stops
 * rendering the frontage — the way the restructure quietly did — fails here.
 * It is a static check, not a browser one: the Puppeteer suites were retired on
 * 4 August 2026, so every claim below is a fact about the delivered HTML, the
 * stylesheet, or the provenance record. Requires `pnpm build` first; `pnpm test`
 * runs the build ahead of it.
 */
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
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

// ── Move 4 — the frontage is home, with its disclosure chain intact ────────
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
  "the phone stack no longer places the frontage between the wordmark and the offer",
  /grid-template-areas:\s*"head"\s*"figure"\s*"body";/.test(styles),
);
check(
  "the phone rule no longer renders the frontage uncropped",
  /\.cp-frontage img \{ flex: 0 0 auto; height: auto; aspect-ratio: 1536 \/ 1024; \}/.test(styles),
);
// The third link in the disclosure chain: the case study carries the concept's
// opening screen, so its Sources & limits block has to say what is in it.
const caseStudyPath = path.join(projectRoot, "dist", "transformations", "cupla", "index.html");
if (existsSync(caseStudyPath)) {
  const caseStudy = textOf(readFileSync(caseStudyPath, "utf8"));
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
} else {
  check("the cupla case study did not build", false);
}

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
const english = ["Menu", "Home", "Our story", "At the counter", "Coffee", "Morning bakes", "Brunch bowls", "Today", "Scone", "Cake", "Toast", "Tea", "Granola", "Filter", "Flat White", "bowl of the day"];

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

if (failures.length > 0) {
  console.error("Cúpla elevation checks failed:");
  for (const failure of failures) console.error(`  - ${failure}`);
  process.exit(1);
}

console.log("Cúpla elevation checks passed.");
