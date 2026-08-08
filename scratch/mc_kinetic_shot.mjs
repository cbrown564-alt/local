import puppeteer from "puppeteer-core";
import { findChrome } from "../tools/lib/chrome.mjs";
import fs from "node:fs";

/** Phase-3 kinetic study: the hero ride-in mid-flight and settled, the
 *  reduced-motion settled state, and the lean effect while scrolling.
 *  Needs `pnpm preview` on :4321. Output: scratch/mc_kinetic/. */

const out = "scratch/mc_kinetic";
fs.mkdirSync(out, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: findChrome(),
  headless: true,
  args: ["--no-sandbox", "--disable-dev-shm-usage", "--hide-scrollbars"],
});
const settle = (ms) => new Promise((r) => setTimeout(r, ms));

try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  await page.goto("http://localhost:4321/concepts/mourne-cycles/", { waitUntil: "networkidle0" });
  await page.screenshot({ path: `${out}/hero-mid.png` });
  await settle(2600);
  await page.screenshot({ path: `${out}/hero-settled.png` });

  // Lean: scroll fast and catch the section h2 mid-skew.
  await page.evaluate(() => window.scrollTo({ top: 0 }));
  await settle(300);
  await page.evaluate(() => window.scrollBy({ top: 1400, behavior: "instant" }));
  await settle(120);
  await page.screenshot({ path: `${out}/lean-scrolling.png` });
  await settle(1200);
  await page.screenshot({ path: `${out}/lean-settled.png` });

  // Reduced motion: hero must be fully readable immediately.
  const reduced = await browser.newPage();
  await reduced.setViewport({ width: 1440, height: 900 });
  await reduced.emulateMediaFeatures([
    { name: "prefers-reduced-motion", value: "reduce" },
  ]);
  await reduced.goto("http://localhost:4321/concepts/mourne-cycles/", { waitUntil: "networkidle0" });
  await settle(400);
  await reduced.screenshot({ path: `${out}/hero-reduced.png` });

  console.log("done");
} finally {
  await browser.close();
}
