import assert from "node:assert/strict";
import puppeteer from "puppeteer-core";
import { findChrome } from "./lib/chrome.mjs";

const base = process.env.SHOT_BASE ?? "http://127.0.0.1:4321";
const route = new URL("/concepts/hotel-enniskeen/", base).href;

const parseRgb = (value) => {
  const channels = value.match(/[\d.]+/g)?.slice(0, 3).map(Number);
  if (!channels || channels.length !== 3) {
    throw new Error(`Could not parse colour "${value}".`);
  }
  return channels;
};

const luminance = (value) =>
  parseRgb(value)
    .map((channel) => channel / 255)
    .map((channel) =>
      channel <= 0.04045
        ? channel / 12.92
        : ((channel + 0.055) / 1.055) ** 2.4,
    )
    .reduce(
      (total, channel, index) =>
        total + channel * [0.2126, 0.7152, 0.0722][index],
      0,
    );

const contrast = (foreground, background) => {
  const lighter = Math.max(luminance(foreground), luminance(background));
  const darker = Math.min(luminance(foreground), luminance(background));
  return (lighter + 0.05) / (darker + 0.05);
};

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

  await page.setViewport({ width: 1265, height: 710, deviceScaleFactor: 1 });
  await page.goto(route, { waitUntil: "networkidle0", timeout: 60_000 });

  const desktop = await page.evaluate(() => {
    const booking = document.querySelector(".enk-booking");
    const bookingRect = booking?.getBoundingClientRect();
    const bookingCentre = bookingRect
      ? {
          x: bookingRect.x + bookingRect.width / 2,
          y: bookingRect.y + bookingRect.height / 2,
        }
      : null;
    const top = bookingCentre
      ? document.elementFromPoint(bookingCentre.x, bookingCentre.y)
      : null;
    return {
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
      bookingBottom: bookingRect?.bottom,
      bookingVisibleHeight: bookingRect
        ? Math.min(bookingRect.bottom, innerHeight) - Math.max(bookingRect.top, 0)
        : 0,
      bookingCoveredByBanner: Boolean(top?.closest(".mm-concept-banner")),
      viewportHeight: innerHeight,
      robots: document
        .querySelector('meta[name="robots"]')
        ?.getAttribute("content"),
    };
  });
  assert.equal(desktop.scrollWidth, desktop.clientWidth, "desktop must not overflow");
  // The in-flow studio banner changed the old “whole hero ≤ 710px” geometry.
  // The durable requirement is that the Bookin1 control stays visible and usable.
  assert.ok(
    desktop.bookingVisibleHeight >= 48,
    "desktop availability control must remain visible in the first viewport",
  );
  assert.equal(
    desktop.bookingCoveredByBanner,
    false,
    "desktop availability control must not sit under the studio disclosure",
  );
  assert.ok(
    desktop.bookingBottom <= desktop.viewportHeight,
    "desktop availability control must remain inside the first viewport",
  );
  assert.equal(desktop.robots, "noindex, nofollow");

  await page.emulateMediaFeatures([
    { name: "prefers-reduced-motion", value: "reduce" },
  ]);
  await page.reload({ waitUntil: "networkidle0" });
  const reducedMotion = await page.evaluate(() =>
    [
      ".enk-kicker",
      ".enk-story h1",
      ".enk-lede",
      ".enk-actions",
      ".enk-booking",
    ].map((selector) => ({
      selector,
      animationName: getComputedStyle(
        document.querySelector(selector),
      ).animationName,
    })),
  );
  assert.deepEqual(
    reducedMotion.map(({ animationName }) => animationName),
    reducedMotion.map(() => "none"),
    "reduced motion must remove every first-screen entrance",
  );

  await page.emulateMediaFeatures([
    { name: "prefers-reduced-motion", value: "no-preference" },
  ]);
  await page.setViewport({
    width: 390,
    height: 844,
    deviceScaleFactor: 1,
    isMobile: true,
    hasTouch: true,
  });
  await page.goto(route, { waitUntil: "networkidle0", timeout: 60_000 });

  const phone = await page.evaluate(() => {
    const label = document.querySelector(".enk-booking label");
    const labelStyle = getComputedStyle(label);
    const bookingStyle = getComputedStyle(
      document.querySelector(".enk-booking"),
    );
    return {
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
      labelColor: labelStyle.color,
      labelBackground: bookingStyle.backgroundColor,
      arrivalRequired: document
        .querySelector('input[name="arrive"]')
        ?.hasAttribute("required"),
    };
  });
  assert.equal(
    phone.scrollWidth,
    phone.clientWidth,
    "390px layout must not overflow horizontally",
  );
  assert.ok(
    contrast(phone.labelColor, phone.labelBackground) >= 4.5,
    "small booking labels must meet 4.5:1 contrast",
  );
  assert.equal(phone.arrivalRequired, true, "arrival must be required");

  // The studio banner owns the first tab stops. Reach the concept brand next and
  // check its focus treatment rather than assuming it is document-first.
  const TAB_BUDGET = 8;
  let reachedBrand = false;
  const tabStops = [];
  for (let i = 0; i < TAB_BUDGET && !reachedBrand; i += 1) {
    await page.keyboard.press("Tab");
    const stop = await page.evaluate(() => ({
      reached: document.activeElement?.classList?.contains("enk-brand-link") ?? false,
      label: document.activeElement?.className || document.activeElement?.tagName || "?",
    }));
    tabStops.push(stop.label);
    reachedBrand = stop.reached;
  }
  // Without this the run would assert against whatever the last Tab happened to
  // land on and report a confusing class mismatch instead of the real fault.
  assert.ok(
    reachedBrand,
    `the concept brand link was not reachable within ${TAB_BUDGET} tab stops: ${tabStops.join(" → ")}`,
  );
  const focus = await page.evaluate(() => {
    const active = document.activeElement;
    const style = getComputedStyle(active);
    return {
      className: active?.className,
      outlineColor: style.outlineColor,
      outlineStyle: style.outlineStyle,
      outlineWidth: style.outlineWidth,
      boxShadow: style.boxShadow,
    };
  });
  assert.match(String(focus.className), /enk-brand-link/);
  assert.equal(focus.outlineStyle, "solid");
  assert.ok(parseFloat(focus.outlineWidth) >= 3);
  assert.notEqual(focus.boxShadow, "none", "focus needs a two-tone outer ring");

  await page.select('select[name="nights"]', "3");
  await page.$eval('input[name="arrive"]', (input) => {
    input.value = "";
    input.dispatchEvent(new Event("input", { bubbles: true }));
  });

  const client = await page.createCDPSession();
  await client.send("Page.enable");
  const requestedDestinations = [];
  client.on("Page.frameRequestedNavigation", ({ url }) => {
    if (url.includes("bookin1.com")) requestedDestinations.push(url);
  });

  await page.click('.enk-booking button[type="submit"]');
  await new Promise((resolve) => setTimeout(resolve, 250));
  const failure = await page.evaluate(() => {
    const input = document.querySelector('input[name="arrive"]');
    const error = document.querySelector("[data-enk-arrival-error]");
    return {
      url: location.href,
      ariaInvalid: input?.getAttribute("aria-invalid"),
      activeName: document.activeElement?.getAttribute("name"),
      errorHidden: error?.hidden,
      errorText: error?.textContent?.trim(),
      nights: document.querySelector('select[name="nights"]')?.value,
    };
  });
  assert.equal(failure.url, route, "invalid submit must stay on the concept");
  assert.equal(requestedDestinations.length, 0);
  assert.equal(failure.ariaInvalid, "true");
  assert.equal(failure.activeName, "arrive");
  assert.equal(failure.errorHidden, false);
  assert.match(failure.errorText, /arrival date/i);
  assert.equal(failure.nights, "3", "recovery must preserve the nights choice");

  const arrival = new Date(Date.now() + 30 * 86_400_000)
    .toISOString()
    .slice(0, 10);
  await page.$eval(
    'input[name="arrive"]',
    (input, value) => {
      input.value = value;
      input.dispatchEvent(new Event("input", { bubbles: true }));
    },
    arrival,
  );
  const recovered = await page.evaluate(() => ({
    ariaInvalid: document
      .querySelector('input[name="arrive"]')
      ?.getAttribute("aria-invalid"),
    errorHidden: document.querySelector("[data-enk-arrival-error]")?.hidden,
  }));
  assert.equal(recovered.ariaInvalid, null);
  assert.equal(recovered.errorHidden, true);

  await page.click('.enk-booking button[type="submit"]');
  await new Promise((resolve) => setTimeout(resolve, 500));
  assert.equal(
    requestedDestinations.at(-1),
    `https://www.bookin1.com/bookingEngine/index.jsp?ID=ecs&hotelCode=ecs#/hotel/ecs/results?date=${arrival}&los=3`,
    "successful recovery must request the exact Bookin1 date/los destination",
  );
  assert.deepEqual(consoleErrors, [], "browser console must stay clean");

  await client.detach();
  await page.close();
  console.log(
    "Enniskeen journey passed: responsive, accessible failure/recovery and Bookin1 destination verified.",
  );
} finally {
  await browser.close();
}
