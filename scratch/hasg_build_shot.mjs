import puppeteer from "puppeteer-core";
import { findChrome } from "../tools/lib/chrome.mjs";
import path from "node:path";

/**
 * Scratch study for the scroll-driven /how-a-site-goes-together/ build:
 * the pinned stage at each scroll window (empty, five layers landing,
 * settled), the walk-again vignettes, the stop, and the reduced-motion
 * plate. Needs `pnpm preview` running on :4321.
 */

const url = "http://localhost:4321/how-a-site-goes-together/";

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

const shot = async (page, name) => {
  await page.screenshot({ path: path.resolve(`scratch/${name}.png`), type: "png" });
  console.log(name);
};

try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  await page.goto(url, { waitUntil: "networkidle0" });
  await page.evaluate(async () => {
    if (document.fonts?.ready) await document.fonts.ready;
  });
  await settle(400);
  await shot(page, "hasgb_hero");

  /* Scroll through the build one window at a time. */
  const windows = await page.evaluate(() => {
    const build = document.querySelector("[data-hasg-live]");
    const rect = build.getBoundingClientRect();
    const top = rect.top + window.scrollY;
    const seg = (rect.height - window.innerHeight) / 6;
    return { top, seg };
  });
  for (let n = 0; n <= 5; n++) {
    await page.evaluate(
      ({ top, seg, n }) => window.scrollTo({ top: top + seg * n + 2, behavior: "auto" }),
      { ...windows, n },
    );
    await settle(1000); // let the gesture land
    await shot(page, `hasgb_beat${n}`);
  }

  /* The vignettes and the stop. */
  await page.evaluate(() => {
    document.querySelector(".hgv")?.scrollIntoView({ block: "start" });
  });
  await settle(1100); // first-sight replay
  await shot(page, "hasgb_vignette1");
  await page.evaluate(() => {
    document.querySelectorAll(".hgv")[3]?.scrollIntoView({ block: "center" });
  });
  await settle(1100);
  await shot(page, "hasgb_vignette4");
  await page.evaluate(() => {
    document.querySelector("#the-stop")?.scrollIntoView({ block: "start" });
  });
  await settle(500);
  await shot(page, "hasgb_stop");

  /* Reduced motion: the settled plate must carry the argument. */
  const calm = await browser.newPage();
  await calm.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  await calm.emulateMediaFeatures([
    { name: "prefers-reduced-motion", value: "reduce" },
  ]);
  await calm.goto(url, { waitUntil: "networkidle0" });
  await settle(400);
  await calm.evaluate(() => {
    document.querySelector("[data-hasg-static]")?.scrollIntoView({ block: "center" });
  });
  await settle(300);
  await shot(calm, "hasgb_plate_calm");

  /* Mobile: the build stage. */
  const mobile = await browser.newPage();
  await mobile.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
  await mobile.goto(url, { waitUntil: "networkidle0" });
  await settle(400);
  await mobile.evaluate(() => {
    const build = document.querySelector("[data-hasg-live]");
    const rect = build.getBoundingClientRect();
    const seg = (rect.height - window.innerHeight) / 6;
    window.scrollTo({ top: rect.top + window.scrollY + seg * 2 + 2, behavior: "auto" });
  });
  await settle(1000);
  await shot(mobile, "hasgb_mobile_beat2");
} finally {
  await browser.close();
}
