import puppeteer from "puppeteer-core";
import { findChrome } from "../tools/lib/chrome.mjs";
import fs from "node:fs";

/** Lean verification: scroll the home page steadily and sample the section
 *  heading's skew mid-scroll; also grab a frame with the skew visible.
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
  await settle(2600);

  // Steady scroll in Node-driven steps so velocity persists across frames.
  const samples = [];
  let shotTaken = false;
  for (let i = 0; i < 40; i += 1) {
    await page.evaluate(() => window.scrollBy(0, 28));
    const t = await page.evaluate(() => {
      const h = document.querySelector("[data-kinetic='lean']");
      return h ? h.style.transform || null : "missing";
    });
    samples.push(t);
    if (!shotTaken && t && t !== "missing") {
      await page.screenshot({ path: `${out}/lean-mid.png` });
      shotTaken = true;
    }
    await settle(16);
  }
  console.log("non-null transforms:", samples.filter(Boolean).slice(0, 8));
  await settle(1200);
  const finalT = await page.evaluate(() => {
    const h = document.querySelector("[data-kinetic='lean']");
    return h ? h.style.transform || "(none)" : "missing";
  });
  console.log("settled transform:", finalT);
} finally {
  await browser.close();
}
