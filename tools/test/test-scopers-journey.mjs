import assert from "node:assert/strict";
import puppeteer from "puppeteer-core";
import { findChrome } from "../lib/chrome.mjs";

const base = process.env.SHOT_BASE ?? "http://127.0.0.1:4321";
const home = new URL("/concepts/scopers/", base).href;
const supper = new URL("/concepts/scopers/supper-club/", base).href;

const browser = await puppeteer.launch({
  executablePath: findChrome(),
  headless: "new",
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});

try {
  const page = await browser.newPage();
  const consoleErrors = [];
  page.on("console", (message) => {
    if (message.type() === "error" || message.type() === "warning") {
      consoleErrors.push(message.text());
    }
  });
  page.on("pageerror", (error) => consoleErrors.push(error.message));

  const pinHour = (target, hour) =>
    target.evaluateOnNewDocument((value) => {
      Date.prototype.getHours = function getHours() {
        return value;
      };
    }, hour);

  await page.setViewport({ width: 1265, height: 800, deviceScaleFactor: 1 });
  await pinHour(page, 12);
  await page.goto(home, { waitUntil: "networkidle0", timeout: 60_000 });

  const desktop = await page.evaluate(() => {
    const heroImage = document.querySelector(".sc-hero-plate img");
    const heroRect = document.querySelector(".sc-hero-plate")?.getBoundingClientRect();
    const h1Rect = document.querySelector(".sc-hero-overlay h1")?.getBoundingClientRect();
    return {
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
      heroImageTop: heroImage?.getBoundingClientRect().top,
      heroBeforeH1: heroRect && h1Rect ? heroRect.top < h1Rect.top : false,
      heroHeight: heroRect?.height ?? 0,
      robots: document
        .querySelector('meta[name="robots"]')
        ?.getAttribute("content"),
      stripFacebook: document.querySelector(".sc-strip a[href*='facebook']")?.textContent?.trim(),
    };
  });

  assert.equal(desktop.scrollWidth, desktop.clientWidth, "desktop must not overflow");
  assert.ok(desktop.heroHeight >= 200, "the hero plate must dominate the first screen");
  assert.ok(
    desktop.heroImageTop !== undefined && desktop.heroImageTop < 200,
    "food imagery must lead the first screen",
  );
  assert.equal(desktop.robots, "noindex, nofollow");
  assert.match(desktop.stripFacebook ?? "", /Facebook/i, "hours handoff must stay on Facebook");

  const visibleDayPart = () =>
    page.evaluate(() => {
      const frame = document.querySelector(
        ".sc-hero-visual[data-sc-daypart] [data-daypart]:not([hidden])",
      );
      return {
        id: frame?.dataset.daypart ?? null,
        caption: document
          .querySelector("[data-sc-daypart-caption]")
          ?.textContent?.trim(),
      };
    });

  const midday = await visibleDayPart();
  assert.equal(midday.id, "midday", "the hero must show the burger at midday before any script runs");

  await pinHour(page, 21);
  await page.goto(home, { waitUntil: "networkidle0", timeout: 60_000 });
  const evening = await visibleDayPart();
  assert.equal(evening.id, "evening", "an evening visit must swap to the supper-club plate");

  const elevation = await page.evaluate(() => {
    const captionQuote = document.querySelector(".sc-caption-quote blockquote");
    const captionFig = document.querySelector(".sc-caption-quote figcaption");
    const scarcity = document.querySelector(".sc-counter-scarcity")?.textContent?.trim();
    const banner = document.querySelector(".mm-concept-banner")?.textContent?.replace(/\s+/g, " ").trim();
    const mapCaption = document.querySelector(".sc-map figcaption")?.textContent?.trim();
    const timelineMarkers = [
      ...document.querySelectorAll(".sc-timeline-marker"),
    ].map((node) => node.textContent.trim());
    const counterCells = document.querySelectorAll(".sc-counter-cell").length;
    const heroFrame = document.querySelector(".sc-hero-frame[data-steam] .sc-steam");
    const larderAnchor = document.querySelector(".sc-larder-anchor")?.textContent?.replace(/\s+/g, " ").trim();
    const counterPhoto = Boolean(document.querySelector(".sc-counter-photo img"));
    return {
      paulQuote: captionQuote?.textContent?.trim(),
      paulCaption: captionFig?.textContent?.replace(/\s+/g, " ").trim(),
      paulSize: captionQuote
        ? parseFloat(getComputedStyle(captionQuote).fontSize)
        : 0,
      scarcity,
      banner,
      mapCaption,
      timelineMarkers,
      counterCells,
      hasSteam: Boolean(heroFrame),
      larderAnchor,
      counterPhoto,
    };
  });

  assert.match(
    elevation.paulQuote ?? "",
    /carrots like you've never tasted them before/i,
    "Paul's caption must appear verbatim",
  );
  assert.match(elevation.paulCaption ?? "", /Paul Cunningham/);
  assert.match(elevation.paulCaption ?? "", /Instagram/);
  assert.ok(elevation.paulSize >= 26, `Paul's caption at ${elevation.paulSize}px is just a paragraph`);
  assert.match(
    elevation.scarcity ?? "",
    /baked this morning/i,
    "the counter must carry the honest scarcity line",
  );
  assert.match(elevation.banner ?? "", /AI-generated/i);
  assert.match(elevation.mapCaption ?? "", /indicative/i);
  assert.match(elevation.mapCaption ?? "", /not a survey/i);
  assert.equal(elevation.counterCells, 4, "the counter must show four signature dishes");
  assert.match(
    elevation.larderAnchor ?? "",
    /carrots like you've never tasted them before/i,
    "the zero-waste trace must be anchored on the carrot caption",
  );
  assert.ok(elevation.counterPhoto, "the counter photograph band must stay in place");
  assert.ok(
    elevation.timelineMarkers.includes("2021") &&
      elevation.timelineMarkers.includes("July 2022"),
    `the chef timeline must keep documented dates: ${elevation.timelineMarkers.join(" · ")}`,
  );

  await page.emulateMediaFeatures([
    { name: "prefers-reduced-motion", value: "reduce" },
  ]);
  await pinHour(page, 12);
  await page.goto(home, { waitUntil: "networkidle0", timeout: 60_000 });
  const reducedMotion = await page.evaluate(() => ({
    steam: getComputedStyle(document.querySelector(".sc-steam-wisp")).animationName,
    club: getComputedStyle(document.querySelector(".sc-club")).animationName,
  }));
  assert.equal(reducedMotion.steam, "none", "steam must respect prefers-reduced-motion");
  assert.equal(reducedMotion.club, "none", "entrance motion must respect prefers-reduced-motion");

  await page.emulateMediaFeatures([
    { name: "prefers-reduced-motion", value: "no-preference" },
  ]);
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1, isMobile: true });
  await page.goto(home, { waitUntil: "networkidle0", timeout: 60_000 });

  const phone = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
    heroVisible: Boolean(document.querySelector(".sc-hero-plate img")),
  }));
  assert.equal(phone.scrollWidth, phone.clientWidth, "390px layout must not overflow");
  assert.equal(phone.heroVisible, true, "the appetite hero must survive on phones");

  await page.goto(supper, { waitUntil: "networkidle0", timeout: 60_000 });
  const invite = await page.evaluate(() => ({
    seal: Boolean(document.querySelector(".sc-invite-seal")),
    date: document.querySelector(".sc-invite-date")?.textContent?.trim(),
    secret: document.querySelector(".sc-invite-secret strong")?.textContent?.trim(),
    nextDate: document.querySelector(".sc-night-book-meta")?.textContent?.trim(),
    courseCount: document.querySelectorAll(".sc-night-course-list ol li").length,
  }));
  assert.equal(invite.seal, true, "the invitation must carry the wax-seal badge");
  assert.match(invite.date ?? "", /26 August 2026/, "the date must be the invitation's hero");
  assert.match(invite.secret ?? "", /revealed to guests the week before/i);
  assert.match(invite.nextDate ?? "", /26 August 2026/);
  assert.ok(invite.courseCount >= 10, "the sample course list must survive");

  assert.deepEqual(consoleErrors, [], "browser console must stay clean");

  console.log(
    "Scopers journey passed: appetite-first hero, day-part swap, Paul caption, zero-waste trace, counter scarcity, larder map, chef timeline and supper-club invitation verified.",
  );
} finally {
  await browser.close();
}
