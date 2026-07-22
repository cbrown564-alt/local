import fs from "node:fs";
import path from "node:path";
import puppeteer from "puppeteer-core";

const base = process.env.SHOT_BASE ?? "http://127.0.0.1:4321";
const out = path.resolve(process.env.SHOT_OUT ?? "outputs/responsive");
const chrome = [
  process.env.CHROME_PATH,
  "/usr/bin/google-chrome-stable",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
].find((candidate) => candidate && fs.existsSync(candidate));

if (!chrome) throw new Error("Chrome not found. Set CHROME_PATH to run responsive captures.");

const pages = [
  ["home", "/"],
  ["transformations", "/transformations/"],
  ["about", "/about/"],
  ["request", "/request/"],
];

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
    const target = path.join(out, `${pageName}-${viewportName}.png`);
    await page.screenshot({ path: target, fullPage: true });
    console.log(`wrote ${target}`);
    await page.close();
  }
}

await browser.close();
