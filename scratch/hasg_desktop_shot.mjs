import puppeteer from "puppeteer-core";
import { findChrome } from "../tools/lib/chrome.mjs";
import path from "node:path";

/**
 * Scratch study for the desktop chassis on /how-a-site-goes-together/:
 * the scroll-driven build at 1440px (browser-window chassis), the settled
 * exploded plate under reduced motion, and a phone-width pass to confirm
 * the phone chassis still shows there. Needs `pnpm preview` running — set
 * the port below to wherever it bound.
 */

const port = process.env.PREVIEW_PORT ?? "4321";
const url = `http://localhost:${port}/how-its-made/`;

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

const settle = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const scrollToBeat = async (page, n) => {
  await page.evaluate((beat) => {
    const build = document.querySelector("[data-hasg-live]");
    const rect = build.getBoundingClientRect();
    const total = rect.height - window.innerHeight;
    const seg = total / 6;
    window.scrollTo({ top: rect.top + window.scrollY + seg * beat + 2, behavior: "auto" });
  }, n);
  await settle(1600); // the arriving layer's gesture, plus the note crossfade
};

try {
  // Desktop, motion allowed: the build assembles a browser window.
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  await page.goto(url, { waitUntil: "networkidle0" });
  await page.evaluate(async () => {
    if (document.fonts?.ready) await document.fonts.ready;
  });
  await scrollToBeat(page, 3);
  await page.screenshot({ path: path.resolve("scratch/hasg_desktop_beat3.png"), type: "png" });
  await scrollToBeat(page, 5);
  await page.screenshot({ path: path.resolve("scratch/hasg_desktop_beat5.png"), type: "png" });

  // Big screen: the stage should fill the canvas, not float in it.
  const wide = await browser.newPage();
  await wide.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 });
  await wide.goto(url, { waitUntil: "networkidle0" });
  await wide.evaluate(async () => {
    if (document.fonts?.ready) await document.fonts.ready;
  });
  await scrollToBeat(wide, 5);
  await wide.screenshot({ path: path.resolve("scratch/hasg_wide_beat5.png"), type: "png" });

  // Desktop, reduced motion: the settled exploded plate, browser-window form.
  const still = await browser.newPage();
  await still.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  await still.emulateMediaFeatures([
    { name: "prefers-reduced-motion", value: "reduce" },
  ]);
  await still.goto(url, { waitUntil: "networkidle0" });
  await still.evaluate(async () => {
    if (document.fonts?.ready) await document.fonts.ready;
  });
  const exploded = await still.$("[data-hasg-static]");
  if (exploded) {
    await exploded.screenshot({
      path: path.resolve("scratch/hasg_desktop_exploded.png"),
      type: "png",
    });
  }

  // Phone: the phone chassis still builds there.
  const phone = await browser.newPage();
  await phone.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
  await phone.goto(url, { waitUntil: "networkidle0" });
  await phone.evaluate(async () => {
    if (document.fonts?.ready) await document.fonts.ready;
  });
  await scrollToBeat(phone, 3);
  await phone.screenshot({ path: path.resolve("scratch/hasg_phone_beat3.png"), type: "png" });

  console.log("done");
} finally {
  await browser.close();
}
