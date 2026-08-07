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
  const hero = await page.$(".fvs-hero");
  if (hero) await hero.screenshot({ path: path.resolve("scratch/fs_hero.png"), type: "png" });
  await page.screenshot({ path: path.resolve("scratch/fs_hero_full.png"), type: "png" });

  const phone = await browser.newPage();
  await phone.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
  await phone.goto(url, { waitUntil: "networkidle0" });
  await phone.evaluate(async () => {
    if (document.fonts?.ready) await document.fonts.ready;
  });
  const heroPhone = await phone.$(".fvs-hero");
  if (heroPhone)
    await heroPhone.screenshot({ path: path.resolve("scratch/fs_hero_phone.png"), type: "png" });
  console.log("done");
} finally {
  await browser.close();
}
