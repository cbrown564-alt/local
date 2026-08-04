import fs from "node:fs";
import path from "node:path";
import QRCode from "qrcode";
import puppeteer from "puppeteer-core";
import { findChrome } from "../lib/chrome.mjs";
import { oneSheets, oneSheetUrl } from "../../src/site/data/onesheets.ts";
import { transformations } from "../../src/site/data/transformations.ts";
import { siteDetails } from "../../src/site/data/site.ts";

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

  /* A printed URL cannot be revised after the run, so the destination is
     checked against the artwork rather than assumed (docs/adr/0002). The QR
     written above encodes sheet.url by construction; what this catches is the
     page embedding a different or stale QR file, and the printed text drifting
     from what the QR actually encodes — the exact failure that let `?src=` and
     `?source=` diverge unnoticed.

     The optical scan from the printed sheet stays a human gate. This proves
     the artwork is right; only a phone proves the paper is. */
  const printed = await page.evaluate(() => ({
    qrSrc: document.querySelector(".onesheet-cta img")?.getAttribute("src") ?? "",
    qrAlt: document.querySelector(".onesheet-cta img")?.getAttribute("alt") ?? "",
    text: document.body.innerText,
  }));
  const expectedQrSrc = `/${path.relative("public", sheet.qr)}`;
  if (printed.qrSrc !== expectedQrSrc) {
    throw new Error(`the sheet embeds ${printed.qrSrc || "no QR"}, but this run wrote ${expectedQrSrc}`);
  }
  const display = oneSheetUrl(slug).display;
  if (!printed.text.includes(display)) {
    throw new Error(`the sheet never prints its own destination (${display}) in readable text`);
  }
  if (!printed.qrAlt.includes(display)) {
    throw new Error(`the QR's alt text does not name ${display}`);
  }
  /* innerText is rendered text, so the uppercased kickers arrive as "DUNDRUM",
     and "Cúpla" has to survive comparison with the slug "cupla". */
  const flatten = (value) =>
    value.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();
  const printedText = flatten(printed.text);
  const business = transformations.find((item) => item.slug === slug);
  if (!business) throw new Error(`${slug} is not a published transformation`);
  /* Matched on the distinctive part of the name rather than the full string:
     a sheet may legitimately print a shorter trading name than the portfolio
     record holds (the Enniskeen sheet says "Hotel Enniskeen" where the record
     says "Enniskeen Country House Hotel"). What must not happen is a sheet
     handed to one owner naming a different business. */
  const nameToken = slug.split("-").sort((a, b) => b.length - a.length)[0];
  if (!printedText.includes(flatten(nameToken))) {
    throw new Error(`the sheet never names ${business.name} — no "${nameToken}" in its text`);
  }
  if (!printedText.includes(flatten(business.town))) {
    throw new Error(`the sheet does not name its town (${business.town})`);
  }
  if (!printed.text.includes(siteDetails.email)) {
    throw new Error("the sheet carries no contact route");
  }
  if (!/independent concept study/i.test(printed.text) || !/not commissioned/i.test(printed.text)) {
    throw new Error("the sheet does not disclose that it is uncommissioned");
  }
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
