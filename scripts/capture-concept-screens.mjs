// Captures the matched "before" and "after" screenshots for a transformation
// comparison, using the system Chrome in headless mode (no browser download).
//
// Usage:
//   pnpm build && pnpm preview   (in another terminal, serves 127.0.0.1:4321)
//   node scripts/capture-concept-screens.mjs <slug>
//   node scripts/capture-concept-screens.mjs <slug>/<asset>   # Milestone 2 second surface
//
// Output (landing): public/images/<slug>-before.jpg and <slug>-after.jpg
// Output (second):  public/images/<slug>-<asset>-after.jpg
//                   and optional <slug>-<asset>-before.jpg when a before URL exists
// at 2530x1420 (1265x710 viewport at 2x for crisp comparison rendering).
// Cookie and consent banners on the current site are left visible on purpose:
// the capture records the page as a first-time visitor meets it.

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { findChrome } from "./lib/chrome.mjs";

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
  // First-website showcases: the "before" capture is the business's own primary
  // public presence (its social page), met as a first-time visitor without an
  // account meets it — login walls and app prompts left visible on purpose.
  "scopers": { before: "https://www.facebook.com/p/Scopers-Dundrum-Co-Down-100083029315116/", beforeBudgetMs: 8000 },
  "cupla": { before: "https://www.facebook.com/p/C%C3%BApla-61565293502528/", beforeBudgetMs: 8000 },
  "tool-centre": { before: "https://www.facebook.com/Toolcentreplanthire/", beforeBudgetMs: 8000 },
  "kent-amusements": { before: "https://www.facebook.com/kentamusementsnewcastle/", beforeBudgetMs: 8000 },
  "newcastle-chamber": { before: "https://www.facebook.com/newcastlechamberofcommerce/", beforeBudgetMs: 8000 },
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
  "mourne-cycles/hire": {
    conceptPath: "/concepts/mourne-cycles/hire/",
    before: "https://www.mourne-cycles.co.uk/",
    beforeBudgetMs: 12000,
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
};

const key = process.argv[2];
const known = { ...Object.fromEntries(Object.keys(CONCEPTS).map((s) => [s, "landing"])), ...Object.fromEntries(Object.keys(SECOND_ASSETS).map((s) => [s, "second"])) };
if (!key || !known[key]) {
  console.error(`Usage: node scripts/capture-concept-screens.mjs <slug|slug/asset>\nKnown: ${Object.keys(known).join(", ")}`);
  process.exit(1);
}

const chrome = findChrome();

// sharp is not hoisted by pnpm; resolve it from Astro's dependency store.
const require = createRequire(import.meta.url);
const pnpmDir = path.resolve(import.meta.dirname, "..", "node_modules", ".pnpm");
const sharpDir = fs.readdirSync(pnpmDir).find((d) => d.startsWith("sharp@"));
const sharp = require(path.join(pnpmDir, sharpDir, "node_modules", "sharp"));

const outDir = path.resolve(import.meta.dirname, "..", "public", "images");
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
  await capture(conceptUrl, `${outBase}-after`);
}
