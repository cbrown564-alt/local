import puppeteer from "puppeteer-core";
import { findChrome } from "../tools/lib/chrome.mjs";
import fs from "node:fs";

/** Phase-4 ridgeline study: mid-draw frame, settled frame with the walking
 *  marker and metre readout, and the reduced-motion settled paint.
 *  Needs `pnpm preview` on :4321. Output: scratch/mc_ridgeline/. */

const out = "scratch/mc_ridgeline";
fs.mkdirSync(out, { recursive: true });
const browser = await puppeteer.launch({
  executablePath: findChrome(),
  headless: true,
  args: ["--no-sandbox", "--disable-dev-shm-usage", "--hide-scrollbars"],
});
const settle = (ms) => new Promise((r) => setTimeout(r, ms));

const scrollToRidge = async (page) => {
  await page.evaluate(() => {
    document.querySelector("[data-ridgeline]")?.scrollIntoView({ block: "center", behavior: "instant" });
  });
};

try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto("http://localhost:4321/concepts/mourne-cycles/trails/", { waitUntil: "networkidle0" });
  await scrollToRidge(page);
  await settle(900);
  await page.screenshot({ path: `${out}/ridge-mid.png` });
  await settle(3200);
  const readout = await page.evaluate(() => document.querySelector("[data-ridge-readout]")?.textContent);
  await page.screenshot({ path: `${out}/ridge-settled.png` });
  console.log("readout:", readout);

  const reduced = await browser.newPage();
  await reduced.setViewport({ width: 1440, height: 900 });
  await reduced.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
  await reduced.goto("http://localhost:4321/concepts/mourne-cycles/trails/", { waitUntil: "networkidle0" });
  await scrollToRidge(reduced);
  await settle(700);
  await reduced.screenshot({ path: `${out}/ridge-reduced.png` });
  console.log("done");
} finally {
  await browser.close();
}
