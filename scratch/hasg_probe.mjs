import puppeteer from "puppeteer-core";
import { findChrome } from "/Users/cobro/code/local/tools/lib/chrome.mjs";
const browser = await puppeteer.launch({
  executablePath: findChrome(), headless: true,
  args: ["--no-sandbox","--disable-dev-shm-usage","--hide-scrollbars","--no-zygote","--single-process"],
});
const settle = (ms) => new Promise((r) => setTimeout(r, ms));
try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto("http://localhost:4321/how-a-site-goes-together/", { waitUntil: "networkidle0" });
  await settle(300);

  // 1. tick click scrolls the build to layer 3
  await page.evaluate(() => document.querySelectorAll(".hasg-tick")[2].click());
  await settle(1200);
  const tickResult = await page.evaluate(() => ({
    scrollY: Math.round(window.scrollY),
    seated: [...document.querySelectorAll("[data-hasg-live] .hasg-layer")].map((l) => ({
      n: l.dataset.layer,
      seated: l.classList.contains("is-seated"),
      play: l.classList.contains("hasg-play"),
    })),
    onNote: document.querySelector(".hasg-note.is-on")?.dataset.note,
  }));
  console.log("tick→beat3:", JSON.stringify(tickResult));

  // 2. scroll back up: layer 3 lifts off (unplay), then hides
  await page.evaluate(() => {
    const build = document.querySelector("[data-hasg-live]");
    const top = build.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + 10, behavior: "auto" });
  });
  await settle(150);
  const unplaying = await page.evaluate(() =>
    [...document.querySelectorAll("[data-hasg-live] .hasg-unplay")].map((l) => l.dataset.layer));
  await settle(900);
  const afterReverse = await page.evaluate(() => ({
    visible: [...document.querySelectorAll("[data-hasg-live] .hasg-layer")]
      .filter((l) => getComputedStyle(l).opacity !== "0").map((l) => l.dataset.layer),
    onNote: document.querySelector(".hasg-note.is-on")?.dataset.note,
  }));
  console.log("reverse unplaying:", JSON.stringify(unplaying), "after:", JSON.stringify(afterReverse));

  // 3. vignette replay re-runs the gesture
  await page.evaluate(() => {
    document.querySelector(".hgv").scrollIntoView({ block: "center" });
  });
  await settle(1100); // first-sight replay already fired
  await page.evaluate(() => document.querySelector(".hgv-replay").click());
  await settle(60);
  const replaying = await page.evaluate(() =>
    document.querySelector(".hgv .hasg-layer--fresh").classList.contains("hasg-play"));
  await settle(900);
  const replayDone = await page.evaluate(() => {
    const fresh = document.querySelector(".hgv .hasg-layer--fresh");
    return { stillPlay: fresh.classList.contains("hasg-play"), opacity: getComputedStyle(fresh).opacity };
  });
  console.log("replay started:", replaying, "after:", JSON.stringify(replayDone));

  // 4. checklist link pages the build
  await page.evaluate(() => {
    document.querySelector('.wwlf-checklist-list a[data-hasg-page="beat-4"]').click();
  });
  await settle(1400);
  const linkResult = await page.evaluate(() => ({
    onNote: document.querySelector(".hasg-note.is-on")?.dataset.note,
    hash: window.location.hash,
  }));
  console.log("checklist→beat4:", JSON.stringify(linkResult));
} finally {
  await browser.close();
}
