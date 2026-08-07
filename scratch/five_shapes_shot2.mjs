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
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  await page.goto(url, { waitUntil: "networkidle0" });
  await page.evaluate(async () => {
    if (document.fonts?.ready) await document.fonts.ready;
  });
  for (const [selector, name] of [
    [".wwlf-index", "fs_strip"],
    ["#counter", "fs_counter"],
    ["#product", "fs_product"],
    ["#trade", "fs_trade"],
    [".fvs-misfit", "fs_misfit"],
    [".wwlf-purpose", "fs_purpose"],
  ]) {
    const el = await page.$(selector);
    if (el) await el.screenshot({ path: path.resolve(`scratch/${name}.png`), type: "png" });
  }
  console.log("done");
} finally {
  await browser.close();
}
