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
  // Desktop: hero+strip, the first plate (marginalia), the care plate, misfit+close.
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  await page.goto(url, { waitUntil: "networkidle0" });
  await page.evaluate(async () => {
    if (document.fonts?.ready) await document.fonts.ready;
  });
  await page.screenshot({ path: path.resolve("scratch/fs_top.png"), type: "png" });
  for (const [id, name] of [
    ["place", "fs_place"],
    ["care", "fs_care"],
  ]) {
    const el = await page.$(`#${id}`);
    if (el) await el.screenshot({ path: path.resolve(`scratch/${name}.png`), type: "png" });
  }
  const close = await page.$(".wwlf-close");
  if (close) await close.screenshot({ path: path.resolve("scratch/fs_close.png"), type: "png" });

  // Phone: the same first plate as the numbered key.
  const phone = await browser.newPage();
  await phone.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
  await phone.goto(url, { waitUntil: "networkidle0" });
  await phone.evaluate(async () => {
    if (document.fonts?.ready) await document.fonts.ready;
  });
  const place = await phone.$("#place");
  if (place) await place.screenshot({ path: path.resolve("scratch/fs_place_phone.png"), type: "png" });
  console.log("done");
} finally {
  await browser.close();
}
