import puppeteer from "puppeteer-core";
import { findChrome } from "../tools/lib/chrome.mjs";
import path from "node:path";

const htmlPath = `file://${path.resolve("dist/index.html")}`;
const outPath = "/Users/cobro/.gemini/antigravity/brain/50e5334f-ee14-47db-b040-6464dbdbada3/map_screenshot.png";

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

  const mapElement = await page.$(".home-map");
  if (mapElement) {
    await mapElement.screenshot({ path: outPath, type: "png" });
    console.log(`Saved screenshot to ${outPath}`);
  } else {
    console.error("Could not find .home-map element");
  }
} finally {
  await browser.close();
}
