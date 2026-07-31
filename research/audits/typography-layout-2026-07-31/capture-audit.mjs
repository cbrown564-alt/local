import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { findChrome } from "../../../../tools/lib/chrome.mjs";

const require = createRequire(import.meta.url);
const puppeteer = require("puppeteer-core");

const BASE = "http://127.0.0.1:4321";
const OUT = path.dirname(new URL(import.meta.url).pathname);
const SCREENSHOTS = path.join(OUT, "screenshots");

const SLUGS = [
  "donard-veterinary",
  "mourne-cycles",
  "hotel-enniskeen",
  "castle-farm",
];

fs.mkdirSync(SCREENSHOTS, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: findChrome(),
  headless: true,
  defaultViewport: { width: 1280, height: 800, deviceScaleFactor: 2 },
});

for (const slug of SLUGS) {
  const url = `${BASE}/concepts/${slug}/`;
  const page = await browser.newPage();

  await page.goto(url, { waitUntil: "networkidle2", timeout: 30000 });
  await page.evaluate(() => document.fonts?.ready);

  await page.screenshot({
    path: path.join(SCREENSHOTS, `${slug}-desktop-hero.png`),
    type: "png",
  });

  await page.screenshot({
    path: path.join(SCREENSHOTS, `${slug}-desktop-full.png`),
    type: "png",
    fullPage: true,
  });

  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
  await page.goto(url, { waitUntil: "networkidle2", timeout: 30000 });
  await page.evaluate(() => document.fonts?.ready);

  await page.screenshot({
    path: path.join(SCREENSHOTS, `${slug}-mobile-hero.png`),
    type: "png",
  });

  await page.close();
  console.log(`Captured ${slug}`);
}

await browser.close();
console.log("Done.");
