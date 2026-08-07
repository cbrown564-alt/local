import puppeteer from "puppeteer-core";
import { findChrome } from "../tools/lib/chrome.mjs";
import path from "node:path";

const url = "http://localhost:4321/five-shapes/";

const browser = await puppeteer.launch({
  executablePath: findChrome(),
  headless: true,
  args: [
    "--no-sandbox",
    "--disable-dev-shm-usage",
    "--disable-site-isolation-trials",
    "--hide-scrollbars",
    "--no-zygote",
    "--single-process",
    "--allow-file-access-from-files",
  ],
});

try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto(url, { waitUntil: "networkidle0" });
  await page.evaluate(async () => {
    if (document.fonts?.ready) await document.fonts.ready;
  });

  // The hero fan, then each plate's drawn frame at full size. The reel is a
  // horizontal scroller — scroll each slide into view before shooting, or the
  // clip catches whatever is parked in the viewport instead.
  const hero = await page.$(".fvs-hero");
  if (hero) await hero.screenshot({ path: path.resolve("scratch/fs_hero.png"), type: "png" });
  for (const id of ["place", "counter", "product", "care", "trade"]) {
    // Drive the reel the way a visitor does — the strip link pages the
    // scroller (smooth), then we clip the frame from document coordinates
    // ourselves, because ElementHandle.screenshot's own scroll-into-view
    // fights the snap and lands on the wrong slide.
    await page.evaluate((plateId) => {
      document.querySelector(`[data-fvs-page="${plateId}"]`)?.click();
    }, id);
    await new Promise((resolve) => setTimeout(resolve, 900));
    const frame = await page.$(`#${id} .fsp-frame-wrap`);
    if (!frame) continue;
    const box = await frame.evaluate((e) => {
      const r = e.getBoundingClientRect();
      return {
        x: r.left + window.scrollX,
        y: r.top + window.scrollY,
        width: r.width,
        height: r.height,
      };
    });
    await page.screenshot({ path: path.resolve(`scratch/fs_art_${id}.png`), clip: box, type: "png" });
  }
  console.log("done");
} finally {
  await browser.close();
}
