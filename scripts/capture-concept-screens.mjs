// Captures the matched "current" and "concept" screenshots for a transformation
// comparison, using the system Chrome in headless mode (no browser download).
//
// Usage:
//   pnpm build && pnpm preview   (in another terminal, serves 127.0.0.1:4321)
//   node scripts/capture-concept-screens.mjs <slug>
//
// Output: public/images/<slug>-current.jpg and public/images/<slug>-concept.jpg
// at 2530x1420 (1265x710 viewport at 2x for crisp comparison rendering).
// Cookie and consent banners on the current site are left visible on purpose:
// the capture records the page as a first-time visitor meets it.

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

// currentBudgetMs controls how much virtual time elapses before the live site
// is shot. Sites with rotating hero carousels advance through slides as that
// budget grows, so a long budget lands on an arbitrary — and often
// unflattering — slide. Pick the shortest budget that still loads the hero,
// verify it is stable across runs, and keep the first slide: the comparison
// must show the business at its own chosen best, not at a bad moment.
const CONCEPTS = {
  "castle-farm": { current: "https://www.castlefarmni.com/", currentBudgetMs: 12000 },
  "hotel-enniskeen": { current: "https://www.enniskeenhotel.co.uk/", currentBudgetMs: 4000 },
  "mourne-cycles": { current: "https://www.mourne-cycles.co.uk/", currentBudgetMs: 12000 },
  "donard-veterinary": { current: "https://donardveterinaryclinic.co.uk/", currentBudgetMs: 6000 },
  "bucks-head": { current: "https://thebucksheaddundrum.co.uk/", currentBudgetMs: 6000 },
  // First-website showcases: the "current" capture is the business's own primary
  // public presence (its social page), met as a first-time visitor without an
  // account meets it — login walls and app prompts left visible on purpose.
  "scopers": { current: "https://www.facebook.com/p/Scopers-Dundrum-Co-Down-100083029315116/", currentBudgetMs: 8000 },
  "cupla": { current: "https://www.facebook.com/p/C%C3%BApla-61565293502528/", currentBudgetMs: 8000 },
};

const slug = process.argv[2];
if (!CONCEPTS[slug]) {
  console.error(`Usage: node scripts/capture-concept-screens.mjs <slug>\nKnown slugs: ${Object.keys(CONCEPTS).join(", ")}`);
  process.exit(1);
}

const chrome = [
  process.env.CHROME_PATH,
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  "/usr/bin/google-chrome",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
].find((p) => p && fs.existsSync(p));
if (!chrome) throw new Error("Chrome not found; set CHROME_PATH");

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

const conceptUrl = `${previewBase}/concepts/${slug}/`;
const alive = await fetch(conceptUrl).then((r) => r.ok).catch(() => false);
if (!alive) throw new Error(`${conceptUrl} is not serving. Run: pnpm build && pnpm preview`);

await capture(CONCEPTS[slug].current, `${slug}-current`, CONCEPTS[slug].currentBudgetMs);
await capture(conceptUrl, `${slug}-concept`);
