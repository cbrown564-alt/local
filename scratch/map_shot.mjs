import puppeteer from "puppeteer-core";
import { findChrome } from "../tools/lib/chrome.mjs";
import path from "node:path";

const htmlPath = "http://localhost:4321/";
const outPath = path.resolve("scratch/map_check.png");

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
  defaultViewport: { width: 1440, height: 900, deviceScaleFactor: 2 },
});

try {
  const page = await browser.newPage();
  await page.goto(htmlPath, { waitUntil: "networkidle0" });

  await page.evaluate(async () => {
    if (document.fonts?.ready) await document.fonts.ready;
  });

  const mapElement = await page.$(".town-map-svg");
  if (mapElement) {
    await mapElement.screenshot({ path: outPath, type: "png" });
    console.log(`Saved screenshot to ${outPath}`);
  } else {
    console.error("Could not find .town-map-svg element");
  }
} finally {
  await browser.close();
}
