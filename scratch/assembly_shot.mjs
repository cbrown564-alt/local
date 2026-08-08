import puppeteer from "puppeteer-core";
import { findChrome } from "../tools/lib/chrome.mjs";
import path from "node:path";

/**
 * The scratch study for /how-a-site-goes-together/, committed with the
 * change per the brief ("the study happens in scratch capture scripts
 * committed with the change"). The control was resolved to the house reel,
 * so the study is the beat geometry, the gestures, and the exploded plate —
 * and the two open questions:
 *
 *  1. Does five beats on a reel read as construction or as slideshow?
 *     (hasg_beat*.png — the chassis stays fixed, one layer per beat.)
 *  2. Hero fan: mid-build stages or the exploded plate?
 *     (hasg_top.png vs hasg_exploded.png — mid-build argues the page's verb;
 *     the exploded plate already lives below as the settled state.)
 *
 * Needs `pnpm preview` running (or `pnpm dev`) on :4321.
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

try {
  // Desktop, motion allowed: hero, then each beat as the reel builds.
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  await page.goto(url, { waitUntil: "networkidle0" });
  await page.evaluate(async () => {
    if (document.fonts?.ready) await document.fonts.ready;
  });
  await settle(900); // let beat 1's gesture land
  await page.screenshot({ path: path.resolve("scratch/hasg_top.png"), type: "png" });

  const reel = await page.$("[data-hasg-live]");
  if (reel) {
    // Bring the reel to the top of the viewport once — page-level scroll
    // only; the horizontal snap scroller is untouched.
    await page.evaluate(() => {
      document.querySelector("[data-hasg-live]")?.scrollIntoView({ block: "start" });
      window.scrollBy(0, -12);
    });
    await settle(400);
    const waitForBeat = async (wanted) => {
      for (let tries = 0; tries < 40; tries += 1) {
        const state = await page.evaluate(() => ({
          current: document.querySelector(".hasg-reel-slide.is-current")?.dataset.beat,
          scrollLeft: Math.round(
            document.querySelector(".hasg-reel-scroller")?.scrollLeft ?? -1,
          ),
        }));
        if (state.current === wanted) {
          // is-current leads the smooth scroll — wait for the scroll to
          // settle too, so the screenshot shows the landed stage.
          if (waitForBeat.prevLeft === state.scrollLeft) return;
          waitForBeat.prevLeft = state.scrollLeft;
        }
        await settle(150);
      }
      const state = await page.evaluate(() => ({
        current: document.querySelector(".hasg-reel-slide.is-current")?.dataset.beat,
        scrollLeft: Math.round(document.querySelector(".hasg-reel-scroller")?.scrollLeft ?? -1),
        nextDisabled: document.querySelector("[data-hasg-next]")?.disabled,
      }));
      throw new Error(`the reel never reached ${wanted} (${JSON.stringify(state)})`);
    };
    for (let beat = 1; beat <= 5; beat += 1) {
      // Wait for the scroller and is-current to agree on this beat before
      // shooting — and shoot the viewport, not the element: puppeteer's
      // element screenshot scrolls the element into view, which yanks the
      // snap scroller back to beat 1.
      await waitForBeat(`beat-${beat}`);
      await settle(900); // the arriving layer's gesture
      const slide = await page.$(".hasg-reel-slide.is-current");
      const box = await slide?.boundingBox();
      if (box) {
        await page.screenshot({
          path: path.resolve(`scratch/hasg_beat${beat}.png`),
          type: "png",
          clip: box,
          /* captureBeyondViewport resizes the emulated viewport to fit the
             clip — the reel's slides are vw-sized, so the resize re-fires
             the observer and the reel drifts mid-study. */
          captureBeyondViewport: false,
        });
      }
      if (beat < 5) {
        await page.evaluate(() => document.querySelector("[data-hasg-next]").click());
      }
    }
  }

  const stop = await page.$("#the-stop");
  if (stop) await stop.screenshot({ path: path.resolve("scratch/hasg_stop.png"), type: "png" });
  const checklist = await page.$(".wwlf-checklist");
  if (checklist) {
    await checklist.screenshot({ path: path.resolve("scratch/hasg_checklist.png"), type: "png" });
  }
  const close = await page.$(".wwlf-close");
  if (close) await close.screenshot({ path: path.resolve("scratch/hasg_close.png"), type: "png" });

  // Desktop, reduced motion: the settled state — the exploded plate is the
  // poster, and the answer to "what does no-JS / no-motion get?".
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
    await exploded.screenshot({ path: path.resolve("scratch/hasg_exploded.png"), type: "png" });
  }
  await still.screenshot({ path: path.resolve("scratch/hasg_top_still.png"), type: "png" });

  // Phone: the hero fan, one beat mid-reel, and the stop.
  const phone = await browser.newPage();
  await phone.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
  await phone.goto(url, { waitUntil: "networkidle0" });
  await phone.evaluate(async () => {
    if (document.fonts?.ready) await document.fonts.ready;
  });
  await settle(900);
  await phone.screenshot({ path: path.resolve("scratch/hasg_top_phone.png"), type: "png" });
  await phone.evaluate(() => {
    document.querySelector("[data-hasg-live]")?.scrollIntoView({ block: "start" });
  });
  await settle(400);
  await phone.evaluate(() => document.querySelector("[data-hasg-next]").click());
  await phone.evaluate(() => document.querySelector("[data-hasg-next]").click());
  for (let tries = 0; tries < 40; tries += 1) {
    const current = await phone.evaluate(
      () => document.querySelector(".hasg-reel-slide.is-current")?.dataset.beat,
    );
    if (current === "beat-3") break;
    await settle(150);
  }
  await settle(850);
  const phoneSlide = await phone.$(".hasg-reel-slide.is-current");
  const phoneBox = await phoneSlide?.boundingBox();
  if (phoneBox) {
    await phone.screenshot({
      path: path.resolve("scratch/hasg_beat3_phone.png"),
      type: "png",
      clip: phoneBox,
      captureBeyondViewport: false,
    });
  }
  const phoneStop = await phone.$("#the-stop");
  if (phoneStop) {
    await phoneStop.screenshot({ path: path.resolve("scratch/hasg_stop_phone.png"), type: "png" });
  }

  console.log("done");
} finally {
  await browser.close();
}
