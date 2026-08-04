import fs from "node:fs";
import path from "node:path";
import QRCode from "qrcode";
import puppeteer from "puppeteer-core";
import { findChrome } from "../lib/chrome.mjs";
import { oneSheets, oneSheetUrl } from "../../src/site/data/onesheets.ts";

const root = path.resolve(import.meta.dirname, "..", "..");
const base = process.env.PRINT_BASE ?? "http://127.0.0.1:4321";
const slug = process.argv[2];

if (!oneSheets[slug]) {
  console.error(`Usage: node tools/print/print-onesheet.mjs <slug>\nKnown slugs: ${Object.keys(oneSheets).join(", ")}`);
  process.exit(1);
}

// The same source the artwork prints. Both read src/site/data/onesheets.ts so
// the QR cannot encode one destination while the page shows another.
const sheet = { ...oneSheets[slug], url: oneSheetUrl(slug).href };
const qrPath = path.join(root, sheet.qr);
const outputPath = path.join(root, sheet.output);
fs.mkdirSync(path.dirname(qrPath), { recursive: true });
fs.mkdirSync(path.dirname(outputPath), { recursive: true });

await QRCode.toFile(qrPath, sheet.url, {
  type: "svg",
  errorCorrectionLevel: "H",
  margin: 2,
  color: { dark: "#132029", light: "#ffffff" },
});

const route = new URL(sheet.route, base).href;
const alive = await fetch(route).then((response) => response.ok).catch(() => false);
if (!alive) {
  throw new Error(`${route} is not serving. Run: pnpm dev`);
}

const browser = await puppeteer.launch({
  executablePath: findChrome(),
  headless: "new",
  args: ["--hide-scrollbars", "--force-color-profile=srgb"],
});

try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1123, height: 1588, deviceScaleFactor: 1 });
  await page.goto(route, { waitUntil: "networkidle0", timeout: 60000 });
  await page.emulateMediaType("print");
  await page.evaluate(() => document.fonts.ready);
  const metrics = await page.$$eval(".onesheet-page", (pages) =>
    pages.map((item) => ({
      clientWidth: item.clientWidth,
      clientHeight: item.clientHeight,
      scrollWidth: item.scrollWidth,
      scrollHeight: item.scrollHeight,
    })),
  );
  if (metrics.length !== 2) throw new Error(`expected 2 A4 pages, found ${metrics.length}`);
  for (const [index, metric] of metrics.entries()) {
    if (metric.scrollWidth > metric.clientWidth + 1 || metric.scrollHeight > metric.clientHeight + 1) {
      throw new Error(`page ${index + 1} overflows its A4 bounds: ${JSON.stringify(metric)}`);
    }
  }
  await page.pdf({
    path: outputPath,
    format: "A4",
    preferCSSPageSize: true,
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });
  console.log(`${path.relative(root, outputPath)} — ${Math.round(fs.statSync(outputPath).size / 1024)} KB, ${metrics.length} pages`);
} finally {
  await browser.close();
}
