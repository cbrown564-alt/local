import puppeteer from "puppeteer-core";
import { findChrome } from "../tools/lib/chrome.mjs";

/** Booking submit diagnosis: capture console/pageerror around submit, and
 *  trap the mailto via an anchor-free wrapper (replace the submit handler's
 *  navigation target by observing Location.prototype.href calls). */

const browser = await puppeteer.launch({
  executablePath: findChrome(),
  headless: true,
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});
const settle = (ms) => new Promise((r) => setTimeout(r, ms));

try {
  const page = await browser.newPage();
  page.on("pageerror", (e) => console.log("PAGEERROR:", e.message));
  page.on("console", (m) => m.type() === "error" && console.log("CONSOLE:", m.text()));
  page.on("request", (r) => r.url().startsWith("mailto:") && console.log("MAILTO REQUEST:", decodeURIComponent(r.url())));
  page.on("framenavigated", (f) => f.url().startsWith("mailto:") && console.log("MAILTO NAV:", decodeURIComponent(f.url())));

  await page.goto("http://localhost:4321/concepts/mourne-cycles/workshop/", { waitUntil: "networkidle0" });
  await settle(500);
  await page.evaluate(() => {
    const days = () => document.querySelector("[data-mc-day-input]");
    void days;
    // Spy on Location.href assignment.
    const desc = Object.getOwnPropertyDescriptor(Location.prototype, "href");
    Object.defineProperty(Location.prototype, "href", {
      get: desc.get,
      set(v) { window.__mailto = v; },
      configurable: true,
    });
  });
  await page.evaluate(() => document.querySelector("#mc-booking")?.scrollIntoView({ block: "center", behavior: "instant" }));
  await page.click(".mc-booking-submit");
  await settle(500);
  console.log("captured:", await page.evaluate(() => (window.__mailto ? decodeURIComponent(window.__mailto) : "(none)")));
} finally {
  await browser.close();
}
