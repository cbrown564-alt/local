import fs from "node:fs";
import path from "node:path";
import puppeteer from "puppeteer-core";
import { findChrome } from "./lib/chrome.mjs";

const base = process.env.SHOT_BASE ?? "http://127.0.0.1:4321";
const out = path.resolve(process.env.SHOT_OUT ?? "outputs/responsive");
const chrome = findChrome();

const allPages = [
  ["home", "/"],
  ["transformations", "/transformations/"],
  ["about", "/about/"],
  ["request", "/request/"],
  ["privacy", "/privacy/"],
  ["transformation-donard", "/transformations/donard-veterinary/"],
  ["concept-donard", "/concepts/donard-veterinary/"],
  ["concept-enniskeen", "/concepts/hotel-enniskeen/"],
];
const pageFilter = process.env.SHOT_PAGE;
const pages = pageFilter
  ? allPages.filter(([pageName]) => pageName === pageFilter)
  : allPages;

if (!pages.length) {
  throw new Error(`No responsive capture page named "${pageFilter}".`);
}

const viewports = [
  ["phone", 375, 812],
  ["tablet-portrait", 768, 1024],
  ["tablet-landscape", 1024, 768],
  ["desktop", 1440, 900],
];

fs.mkdirSync(out, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: chrome,
  headless: true,
  args: [
    "--no-sandbox",
    "--disable-dev-shm-usage",
    "--disable-site-isolation-trials",
    "--hide-scrollbars",
    "--no-zygote",
    "--single-process",
  ],
});

for (const [pageName, pagePath] of pages) {
  for (const [viewportName, width, height] of viewports) {
    const page = await browser.newPage();
    await page.setViewport({ width, height, deviceScaleFactor: 1 });
    await page.goto(new URL(pagePath, base).href, { waitUntil: "networkidle0", timeout: 60_000 });
    await page.evaluate(async () => document.fonts?.ready);
    await page.evaluate(async () => {
      for (const image of document.querySelectorAll('img[loading="lazy"]')) {
        image.scrollIntoView({ block: "center" });
        await Promise.race([
          image.decode().catch(() => {}),
          new Promise((resolve) => setTimeout(resolve, 5_000)),
        ]);
      }
      window.scrollTo(0, 0);
    });
    await page.waitForNetworkIdle({ idleTime: 250, timeout: 10_000 }).catch(() => {});
    const target = path.join(out, `${pageName}-${viewportName}.png`);
    await page.screenshot({ path: target, fullPage: true });
    console.log(`wrote ${target}`);
    await page.close();
  }
}

await browser.close();
