import assert from "node:assert/strict";
import puppeteer from "puppeteer-core";
import { findChrome } from "../lib/chrome.mjs";

const base = process.env.SHOT_BASE ?? "http://127.0.0.1:4321";
const route = "/concepts/dundrum-inn/";
const browser = await puppeteer.launch({
  executablePath: findChrome(),
  headless: true,
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});

async function inspect(page, label) {
  const runtimeErrors = [];
  page.on("console", (message) => {
    if (message.type() === "error") runtimeErrors.push(`console: ${message.text()}`);
  });
  page.on("pageerror", (error) => runtimeErrors.push(`page: ${error.message}`));

  const response = await page.goto(new URL(route, base).href, {
    waitUntil: "networkidle0",
    timeout: 60_000,
  });
  assert.ok(response && response.status() < 400, `${label}: route returned ${response?.status()}`);
  await new Promise((resolve) => setTimeout(resolve, 150));

  const facts = await page.evaluate(() => {
    const visible = (element) => {
      const rect = element.getBoundingClientRect();
      const style = getComputedStyle(element);
      return rect.width > 1 && rect.height > 1 && style.display !== "none";
    };
    return {
      documentWidth: Math.max(document.documentElement.scrollWidth, document.body.scrollWidth),
      viewportWidth: document.documentElement.clientWidth,
      daypart: document.querySelector("#di-hero-visual")?.dataset.daypart,
      heroSources: [...document.querySelectorAll(".di-hero-visual source")].map((source) => source.srcset),
      mapVisible: visible(document.querySelector(".di-place-plate")),
      mapCaption: document.querySelector(".di-place figcaption")?.textContent?.trim(),
      todayDate: document.querySelector("#di-date")?.textContent?.trim(),
      openState: document.querySelector("#di-state")?.textContent?.trim(),
      todayRows: document.querySelectorAll(".di-hours-row[data-today]").length,
      hours: JSON.parse(document.querySelector("#di-hours")?.dataset.hours ?? "[]"),
      eventDate: document.querySelector("#di-event-card")?.dataset.eventDate,
      eventHref: document.querySelector("#di-event-card a")?.href,
      keyNames: [...document.querySelectorAll(".di-key strong")].map((element) => element.textContent?.trim()),
      bookingAction: document.querySelector("#booking")?.action,
      bookingTarget: document.querySelector("#booking")?.target,
      bookingInputs: [...document.querySelectorAll("#booking input, #booking select")].map((element) => element.id),
    };
  });

  assert.ok(facts.documentWidth <= facts.viewportWidth + 1, `${label}: horizontal overflow`);
  assert.equal(facts.heroSources.length, 2, `${label}: hero does not expose day and blue-hour sources`);
  assert.equal(facts.mapVisible, true, `${label}: place plate is not visible`);
  assert.match(facts.mapCaption ?? "", /not a survey/i);
  assert.ok(facts.todayDate, `${label}: Today panel has no date`);
  assert.ok(facts.openState, `${label}: opening state did not resolve`);
  assert.equal(facts.todayRows, 1, `${label}: Today panel did not mark one current day`);
  assert.equal(facts.hours.length, 7, `${label}: expected seven published bar-hour rows`);
  assert.deepEqual(facts.keyNames, [
    "The King",
    "The Savage",
    "The McLatchie",
    "The Patterson",
    "Murlough Cottage",
  ]);
  assert.match(facts.eventDate ?? "", /^2026-08-02$/);
  assert.match(facts.eventHref ?? "", /dundruminn\.com\/events-parties\/events/);
  assert.match(facts.bookingAction ?? "", /^https:\/\/dundruminn\.com\/?$/);
  assert.equal(facts.bookingTarget, "_blank");
  assert.deepEqual(facts.bookingInputs, ["di-in", "di-out", "di-adults", "di-children"]);
  assert.deepEqual(runtimeErrors, [], `${label}: browser errors`);
}

try {
  for (const viewport of [
    { width: 1265, height: 710 },
    { width: 1100, height: 710 },
    { width: 390, height: 844, isMobile: true, hasTouch: true },
  ]) {
    const page = await browser.newPage();
    await page.setViewport(viewport);
    await inspect(page, `${viewport.width}px`);
    await page.close();
  }

  const reducedPage = await browser.newPage();
  await reducedPage.emulateMediaFeatures([
    { name: "prefers-reduced-motion", value: "reduce" },
  ]);
  await reducedPage.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await reducedPage.goto(new URL(route, base).href, { waitUntil: "networkidle0", timeout: 60_000 });
  assert.equal(
    await reducedPage.$eval("#di-hero-visual", (element) => element.dataset.daypart),
    "day",
    "reduced motion should keep the stable daytime hero frame",
  );
  await reducedPage.close();
} finally {
  await browser.close();
}

console.log("Dundrum Inn journey: 3 viewports + reduced-motion check passed.");
