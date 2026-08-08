import puppeteer from "puppeteer-core";
import { findChrome } from "../tools/lib/chrome.mjs";
import fs from "node:fs";

/** Booking widget end-to-end: pick a service + day + notes, submit, and read
 *  the composed mailto from the visible result link. Also captures the
 *  calendar-open frame. Needs `pnpm preview` on :4321. */

const out = "scratch/mc_booking";
fs.mkdirSync(out, { recursive: true });
const browser = await puppeteer.launch({
  executablePath: findChrome(),
  headless: true,
  args: ["--no-sandbox", "--disable-dev-shm-usage", "--hide-scrollbars"],
});
const settle = (ms) => new Promise((r) => setTimeout(r, ms));

try {
  const page = await browser.newPage();
  page.on("pageerror", (e) => console.log("PAGEERROR:", e.message));
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto("http://localhost:4321/concepts/mourne-cycles/workshop/", { waitUntil: "networkidle0" });
  await settle(500);

  await page.evaluate(() => document.querySelector("#mc-booking")?.scrollIntoView({ block: "center", behavior: "instant" }));
  await settle(300);
  await page.click("[data-mc-day-trigger]");
  await settle(400);
  await page.screenshot({ path: `${out}/booking-cal-open.png` });

  await page.click('.mc-booking-service:nth-child(2) input');
  await page.evaluate(() => {
    const days = [...document.querySelectorAll(".mc-cal-day:not(:disabled)")];
    const target = days.find((d) => d.textContent === "15") ?? days[Math.min(14, days.length - 1)];
    target.click();
  });
  await page.type("[data-mc-notes]", "Trek hardtail, creak under load");
  await page.click(".mc-booking-submit");
  await settle(400);

  const result = await page.evaluate(() => ({
    hidden: document.querySelector("[data-mc-booking-result]")?.hidden,
    href: document.querySelector("[data-mc-booking-link]")?.getAttribute("href"),
  }));
  console.log("result hidden:", result.hidden);
  console.log("mailto:", result.href ? decodeURIComponent(result.href) : "(none)");
  await page.screenshot({ path: `${out}/booking-filled.png` });
} finally {
  await browser.close();
}
