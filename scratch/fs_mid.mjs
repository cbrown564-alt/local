import puppeteer from "puppeteer-core";
import { findChrome } from "../tools/lib/chrome.mjs";
import path from "node:path";
const browser = await puppeteer.launch({
  executablePath: findChrome(),
  headless: true,
  args: ["--no-sandbox","--disable-dev-shm-usage","--hide-scrollbars","--no-zygote","--single-process"],
});
try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1000, height: 800, deviceScaleFactor: 1 });
  await page.goto("http://localhost:4321/five-shapes/", { waitUntil: "networkidle0" });
  await page.evaluate(async () => { if (document.fonts?.ready) await document.fonts.ready; });
  const el = await page.$("#care");
  if (el) await el.screenshot({ path: path.resolve("scratch/fs_care_mid.png"), type: "png" });
  console.log("done");
} finally { await browser.close(); }
