// Captures the matched "before" and "after" screenshots for a transformation
// comparison, using the system Chrome in headless mode (no browser download).
//
// Usage:
//   pnpm build && pnpm preview   (in another terminal, serves 127.0.0.1:4321)
//   node tools/capture/capture-concept-screens.mjs <slug>
//   node tools/capture/capture-concept-screens.mjs <slug>/<asset>   # Milestone 2 second surface
//
// Output (landing): public/images/<slug>-before.jpg and <slug>-after.jpg
// Output (second):  public/images/<slug>-<asset>-after.jpg
//                   and optional <slug>-<asset>-before.jpg when a before URL exists
// at 2530x1420 (1265x710 viewport at 2x for crisp comparison rendering).
// Cookie and consent banners on the current site are left visible on purpose:
// the capture records the page as a first-time visitor meets it.
// A second asset with `scrollTo` is captured with a puppeteer pass instead of
// the CLI: the page settles, the subject scrolls into the viewport and any
// in-view effects paint — use it for rAF-driven theatre the one-shot CLI
// screenshot cannot advance.

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import puppeteer from "puppeteer-core";
import { findChrome } from "../lib/chrome.mjs";

// beforeBudgetMs controls how much virtual time elapses before the live site
// is shot. Sites with rotating hero carousels advance through slides as that
// budget grows, so a long budget lands on an arbitrary — and often
// unflattering — slide. Pick the shortest budget that still loads the hero,
// verify it is stable across runs, and keep the first slide: the comparison
// must show the business at its own chosen best, not at a bad moment.
const CONCEPTS = {
  "castle-farm": { before: "https://www.castlefarmni.com/", beforeBudgetMs: 12000 },
  "hotel-enniskeen": { before: "https://www.enniskeenhotel.co.uk/", beforeBudgetMs: 4000 },
  "mourne-cycles": { before: "https://www.mourne-cycles.co.uk/", beforeBudgetMs: 12000 },
  "donard-veterinary": { before: "https://donardveterinaryclinic.co.uk/", beforeBudgetMs: 6000 },
  "bucks-head": { before: "https://thebucksheaddundrum.co.uk/", beforeBudgetMs: 6000 },
  "painted-earth": { before: "https://www.paintedearthgifts.com/", beforeBudgetMs: 5000 },
  // First-website showcases: the "before" capture is the business's own primary
  // public presence (its social page), met as a first-time visitor without an
  // account meets it — login walls and app prompts left visible on purpose.
  "scopers": { before: "https://www.facebook.com/p/Scopers-Dundrum-Co-Down-100083029315116/", beforeBudgetMs: 8000 },
  "cupla": { before: "https://www.facebook.com/p/C%C3%BApla-61565293502528/", beforeBudgetMs: 8000 },
  "tool-centre": { before: "https://www.facebook.com/Toolcentreplanthire/", beforeBudgetMs: 8000 },
  "kent-amusements": { before: "https://www.facebook.com/kentamusementsnewcastle/", beforeBudgetMs: 8000 },
  "newcastle-chamber": { before: "https://www.facebook.com/newcastlechamberofcommerce/", beforeBudgetMs: 8000 },
  "bear-necessities": { before: "https://www.facebook.com/Bearnecessitiespartyvenue", beforeBudgetMs: 8000 },
  "arley-house": { before: "http://www.arleyhousedundrum.co.uk/", beforeBudgetMs: 6000 },
  "armstrong-opticians": { before: "https://www.facebook.com/Armstrongopticians", beforeBudgetMs: 8000 },
  "irelands-appliance-centre": { before: "https://www.irelandsappliances.com/", beforeBudgetMs: 6000 },
  "villa-vinci": { before: "https://www.villavinci.co.uk/", beforeBudgetMs: 6000 },
  "conlyn-house": { before: "http://conlynhouse.com/", beforeBudgetMs: 6000 },
  "binghams-menswear": { before: "http://www.binghamsmenswear.co.uk/", beforeBudgetMs: 6000 },
  "cafe-mauds": { before: "https://www.facebook.com/cafemaudsnewcastle/", beforeBudgetMs: 8000 },
  "cocos-adventure-playground": { before: "https://www.cocosplayground.co.uk/", beforeBudgetMs: 6000 },
  "marine-wellness": { before: "https://www.facebook.com/marinebeauty.haven", beforeBudgetMs: 8000 },
};

// Milestone 2 second surfaces. Key is "<slug>/<asset>". conceptPath is the local
// preview path; before is optional — omit for companion-only captures (typical
// for first-website showcases and print-faithful flats with no honest before).
const SECOND_ASSETS = {
  "hotel-enniskeen/rooms": {
    conceptPath: "/concepts/hotel-enniskeen/rooms/",
    before: "https://www.enniskeenhotel.co.uk/",
    beforeBudgetMs: 4000,
  },
  "hotel-enniskeen/dine": {
    conceptPath: "/concepts/hotel-enniskeen/dine/",
  },
  "mourne-cycles/hire": {
    conceptPath: "/concepts/mourne-cycles/hire/",
    before: "https://www.mourne-cycles.co.uk/",
    beforeBudgetMs: 12000,
  },
  // Companion-only: the live site has no separate workshop or trails pages,
  // so there is no honest before to pair these against.
  "mourne-cycles/workshop": {
    conceptPath: "/concepts/mourne-cycles/workshop/",
  },
  // The ridgeline draw is rAF-driven, which one-shot CLI capture barely
  // advances, and the CLI scrolls to a fragment before the hero image grows
  // the page, landing the frame above the theatre. So this still is taken
  // with a real browser pass: chromeFlags forces reduced motion (motion.ts
  // paints the designed settled frame — full skyline, marker on the massif —
  // on the first frame) and scrollTo puts that theatre in the viewport after
  // the page has settled. It records exactly what a reduced-motion visitor
  // meets.
  "mourne-cycles/trails": {
    conceptPath: "/concepts/mourne-cycles/trails/",
    scrollTo: "#mc-ridgeline",
    scrollOffset: -60,
    chromeFlags: ["--force-prefers-reduced-motion"],
  },
  "donard-veterinary/appointments": {
    conceptPath: "/concepts/donard-veterinary/appointments/",
    before: "https://donardveterinaryclinic.co.uk/",
    beforeBudgetMs: 6000,
  },
  "bucks-head/menus": {
    conceptPath: "/concepts/bucks-head/menus/",
    before: "https://thebucksheaddundrum.co.uk/",
    beforeBudgetMs: 6000,
  },
  "scopers/supper-club": {
    conceptPath: "/concepts/scopers/supper-club/",
  },
  "cupla/menu": {
    conceptPath: "/concepts/cupla/menu/",
  },
  "tool-centre/hire-list": {
    conceptPath: "/concepts/tool-centre/hire-list/",
  },
  "kent-amusements/attractions": {
    conceptPath: "/concepts/kent-amusements/attractions/",
  },
  "newcastle-chamber/members": {
    conceptPath: "/concepts/newcastle-chamber/members/",
  },
  "painted-earth/originals": {
    conceptPath: "/concepts/painted-earth/originals/",
  },
};

const key = process.argv[2];
const known = { ...Object.fromEntries(Object.keys(CONCEPTS).map((s) => [s, "landing"])), ...Object.fromEntries(Object.keys(SECOND_ASSETS).map((s) => [s, "second"])) };
if (!key || !known[key]) {
  console.error(`Usage: node tools/capture/capture-concept-screens.mjs <slug|slug/asset>\nKnown: ${Object.keys(known).join(", ")}`);
  process.exit(1);
}

const chrome = findChrome();

// sharp is not hoisted by pnpm; resolve it from Astro's dependency store.
const require = createRequire(import.meta.url);
const pnpmDir = path.resolve(import.meta.dirname, "..", "..", "node_modules", ".pnpm");
const sharpDir = fs.readdirSync(pnpmDir).find((d) => d.startsWith("sharp@"));
const sharp = require(path.join(pnpmDir, sharpDir, "node_modules", "sharp"));

const conceptSlug = key.includes("/") ? key.split("/")[0] : key;
const outDir = path.resolve(
  import.meta.dirname,
  "..",
  "..",
  "public",
  "media",
  "concepts",
  conceptSlug,
);
fs.mkdirSync(outDir, { recursive: true });
const previewBase = "http://127.0.0.1:4321";

async function capture(url, outName, budgetMs = 12000) {
  const tmp = path.join(outDir, `${outName}.tmp.png`);
  execFileSync(chrome, [
    "--headless=new",
    "--disable-gpu",
    "--hide-scrollbars",
    "--force-device-scale-factor=2",
    "--window-size=1265,710",
    `--virtual-time-budget=${budgetMs}`,
    `--screenshot=${tmp}`,
    url,
  ], { stdio: "pipe" });
  const out = path.join(outDir, `${outName}.jpg`);
  await sharp(tmp).jpeg({ quality: 82, mozjpeg: true }).toFile(out);
  fs.unlinkSync(tmp);
  const kb = Math.round(fs.statSync(out).size / 1024);
  console.log(`${outName}.jpg — ${kb} KB from ${url}`);
}

// For surfaces whose subject is rAF-driven or below the fold: a real browser
// pass that waits for the page to settle, scrolls the subject into the
// viewport and shoots the same 1265×710 @2x frame as the CLI path.
async function captureScrolled(url, outName, { scrollTo, scrollOffset = 0, chromeFlags = [] }) {
  const browser = await puppeteer.launch({
    executablePath: chrome,
    headless: "new",
    args: chromeFlags,
  });
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1265, height: 710, deviceScaleFactor: 2 });
    await page.goto(url, { waitUntil: "networkidle0", timeout: 30000 });
    await page.evaluate(
      (selector, offset) => {
        document.querySelector(selector).scrollIntoView({ block: "start", behavior: "instant" });
        window.scrollBy(0, offset);
      },
      scrollTo,
      scrollOffset,
    );
    // Let the scroll land and any in-view effects paint their first frame.
    await new Promise((resolve) => setTimeout(resolve, 900));
    const tmp = path.join(outDir, `${outName}.tmp.png`);
    await page.screenshot({ path: tmp });
    const out = path.join(outDir, `${outName}.jpg`);
    await sharp(tmp).jpeg({ quality: 82, mozjpeg: true }).toFile(out);
    fs.unlinkSync(tmp);
    const kb = Math.round(fs.statSync(out).size / 1024);
    console.log(`${outName}.jpg — ${kb} KB from ${url} (scrolled to ${scrollTo})`);
  } finally {
    await browser.close();
  }
}

if (known[key] === "landing") {
  const conceptUrl = `${previewBase}/concepts/${key}/`;
  const alive = await fetch(conceptUrl).then((r) => r.ok).catch(() => false);
  if (!alive) throw new Error(`${conceptUrl} is not serving. Run: pnpm build && pnpm preview`);

  await capture(CONCEPTS[key].before, `${key}-before`, CONCEPTS[key].beforeBudgetMs);
  await capture(conceptUrl, `${key}-after`);
} else {
  const asset = SECOND_ASSETS[key];
  const outBase = key.replace("/", "-");
  const conceptUrl = `${previewBase}${asset.conceptPath}`;
  const alive = await fetch(conceptUrl).then((r) => r.ok).catch(() => false);
  if (!alive) throw new Error(`${conceptUrl} is not serving. Run: pnpm build && pnpm preview`);

  if (asset.before) {
    await capture(asset.before, `${outBase}-before`, asset.beforeBudgetMs ?? 8000);
  }
  if (asset.scrollTo) {
    await captureScrolled(conceptUrl, `${outBase}-after`, asset);
  } else {
    await capture(conceptUrl, `${outBase}-after`);
  }
}
