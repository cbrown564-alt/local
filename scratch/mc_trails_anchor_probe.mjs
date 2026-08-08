/**
 * Why does /concepts/mourne-cycles/trails/#mc-ridgeline land wrong in a
 * one-shot capture? Measures the ridgeline's document offset and the scroll
 * position at DOMContentLoaded and after full settle, and reports which
 * elements changed height in between (the layout-shift suspects).
 */
import puppeteer from "puppeteer-core";
import { findChrome } from "../tools/lib/chrome.mjs";

const browser = await puppeteer.launch({
  executablePath: findChrome(),
  headless: "new",
  args: ["--force-prefers-reduced-motion", "--window-size=1265,710"],
});
const page = await browser.newPage();
await page.setViewport({ width: 1265, height: 710, deviceScaleFactor: 1 });

const measure = () =>
  page.evaluate(() => {
    const el = document.querySelector("#mc-ridgeline");
    const rect = el.getBoundingClientRect();
    return {
      scrollY: Math.round(window.scrollY),
      ridgeTop: Math.round(rect.top),
      ridgeDocTop: Math.round(rect.top + window.scrollY),
      docHeight: document.documentElement.scrollHeight,
      viewportH: window.innerHeight,
    };
  });

page.goto("http://127.0.0.1:4321/concepts/mourne-cycles/trails/#mc-ridgeline", {
  waitUntil: "domcontentloaded",
});
await new Promise((r) => setTimeout(r, 300));
console.log("at domcontentloaded+300ms:", JSON.stringify(await measure()));

await page.waitForNetworkIdle({ idleTime: 500, timeout: 20000 }).catch(() => {});
await new Promise((r) => setTimeout(r, 1500));
const settled = await measure();
console.log("after network idle + 1.5s:", JSON.stringify(settled));

// Scroll precisely and shoot what the case-study frame wants to look like.
await page.evaluate(() => {
  document.querySelector("#mc-ridgeline").scrollIntoView({ block: "start", behavior: "instant" });
  window.scrollBy(0, -60);
});
await new Promise((r) => setTimeout(r, 700));
console.log("after manual scroll:", JSON.stringify(await measure()));
await page.screenshot({ path: "scratch/mc_clipcheck/trails-scrolled.png" });
await browser.close();
console.log("wrote scratch/mc_clipcheck/trails-scrolled.png");
