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

  // ── Elevation checks ──────────────────────────────────────────────────────
  // Added 31 July 2026 with the day-part hero, estate map, history band, house
  // mark, shared grade and pull-quote. These exist so the elevation cannot rot
  // quietly: each one fails loudly if the piece is removed or stops working.

  const elevation = await browser.newPage();
  const elevationErrors = [];
  elevation.on("console", (message) => {
    if (message.type() === "error" || message.type() === "warning") {
      elevationErrors.push(message.text());
    }
  });
  elevation.on("pageerror", (error) => elevationErrors.push(error.message));
  await elevation.setViewport({ width: 1265, height: 800, deviceScaleFactor: 1 });

  /** Pin the clock the swap script reads, before any page script runs. */
  const pinHour = (target, hour) =>
    target.evaluateOnNewDocument((value) => {
      Date.prototype.getHours = function getHours() {
        return value;
      };
    }, hour);

  const visibleDayPart = () =>
    elevation.evaluate(() => {
      const frame = document.querySelector(
        ".enk-visual[data-enk-daypart] [data-daypart]:not([hidden])",
      );
      return {
        id: frame?.dataset.daypart ?? null,
        declared: document.querySelectorAll("[data-daypart]").length,
        caption: document
          .querySelector("[data-enk-daypart-caption]")
          ?.textContent?.trim(),
      };
    });

  await pinHour(elevation, 12);
  await elevation.goto(route, { waitUntil: "networkidle0", timeout: 60_000 });
  const midday = await visibleDayPart();
  assert.equal(
    midday.id,
    "day",
    "the hero must show the daytime plate at midday, and before any script runs",
  );
  assert.match(
    midday.caption ?? "",
    /provisional visualisation/i,
    "every hero variant must carry the provisional-visualisation disclosure",
  );

  // The dawn and dusk generations are briefed but not yet made
  // (research/enniskeen-day-part-hero-brief.md). Assert the swap for real as
  // soon as a second variant exists rather than leaving a permanently green
  // test that never exercised it.
  if (midday.declared > 1) {
    await pinHour(elevation, 21);
    await elevation.goto(route, { waitUntil: "networkidle0", timeout: 60_000 });
    const evening = await visibleDayPart();
    assert.notEqual(
      evening.id,
      "day",
      "an evening visit must swap the hero away from the daytime plate",
    );
    assert.match(
      evening.caption ?? "",
      /provisional visualisation/i,
      "the swapped caption must keep the disclosure",
    );
    const stillOne = await elevation.evaluate(
      () =>
        document.querySelectorAll(
          ".enk-visual[data-enk-daypart] [data-daypart]:not([hidden])",
        ).length,
    );
    assert.equal(stillOne, 1, "exactly one hero variant may be visible at a time");
  }

  const home = await elevation.evaluate(() => {
    const image = document.querySelector(".enk-explore-image img");
    return {
      grade: image ? getComputedStyle(image).filter : null,
      markInHeader: Boolean(document.querySelector(".enk-brand-link .enk-mark")),
      markHidden:
        document.querySelector(".enk-mark")?.getAttribute("aria-hidden") === "true",
      favicon: document
        .querySelector('link[rel="icon"]')
        ?.getAttribute("href"),
      dropCaps: document.querySelectorAll(".enk-dropcap").length,
    };
  });
  assert.match(
    String(home.grade),
    /enk-grade/,
    "concept imagery must carry the shared grade, so the set reads as one shoot",
  );
  assert.equal(home.markInHeader, true, "the house mark must seal the header");
  assert.equal(home.markHidden, true, "the decorative mark must be hidden from AT");
  assert.equal(home.favicon, "/brand/enniskeen-mark.svg");
  assert.equal(home.dropCaps, 1, "exactly one drop cap — a page of them is a ransom note");

  // Estate page: the map and the history band.
  await elevation.goto(new URL(`${base}/concepts/hotel-enniskeen/estate/`).href, {
    waitUntil: "networkidle0",
    timeout: 60_000,
  });
  const estate = await elevation.evaluate(() => {
    const plate = document.querySelector(".enk-map-plate");
    const labelled = plate?.getAttribute("aria-labelledby")?.split(/\s+/) ?? [];
    const box = plate?.getBoundingClientRect();
    // A label drawn outside the viewBox is clipped, which silently loses a
    // named feature from the drawing.
    const clipped = plate
      ? [...plate.querySelectorAll("text")]
          .map((node) => {
            const bounds = node.getBBox();
            const shift = node.closest("g[transform]");
            const offset = shift
              ? Number(
                  /translate\(([-\d.]+)/.exec(shift.getAttribute("transform"))?.[1] ?? 0,
                )
              : 0;
            return {
              text: node.textContent.trim().slice(0, 28),
              left: bounds.x + offset,
              right: bounds.x + bounds.width + offset,
            };
          })
          .filter((label) => label.left < 21 || label.right > 779)
      : [];
    return {
      hasPlate: Boolean(plate),
      labelled,
      describedByHeading: labelled.includes("map-heading"),
      hasDescription: Boolean(plate?.querySelector("desc")?.textContent?.trim()),
      caption: document.querySelector(".enk-map figcaption")?.textContent?.trim(),
      overflows: box ? box.width > document.documentElement.clientWidth : false,
      clipped,
      timelineEntries: document.querySelectorAll(".enk-timeline li").length,
      timelineMarkers: [
        ...document.querySelectorAll(".enk-timeline-marker"),
      ].map((node) => node.textContent.trim()),
    };
  });
  assert.equal(estate.hasPlate, true, "the estate page must carry the drawn plan");
  assert.equal(
    estate.describedByHeading,
    true,
    "the plate must be named by the section heading",
  );
  assert.equal(estate.hasDescription, true, "the plate needs a text description");
  assert.deepEqual(
    estate.clipped,
    [],
    "no map label may be drawn outside the plate",
  );
  assert.equal(estate.overflows, false, "the plate must not overflow its column");
  // The drawing is not a survey and must never imply that it is.
  assert.match(
    estate.caption ?? "",
    /indicative/i,
    "the map caption must disclose that the plan is indicative",
  );
  assert.match(estate.caption ?? "", /not a survey/i);
  assert.equal(estate.timelineEntries, 4, "the history band carries four moments");
  assert.ok(
    estate.timelineMarkers.includes("Late 1890s") &&
      estate.timelineMarkers.includes("1960s"),
    `the timeline must keep the two dates the hotel actually publishes: ${estate.timelineMarkers.join(" · ")}`,
  );

  // Home: the guest pull-quote, and whether an owner could go and check it.
  await elevation.goto(route, { waitUntil: "networkidle0", timeout: 60_000 });
  const quote = await elevation.evaluate(() => {
    const figure = document.querySelector(".enk-pullquote");
    const block = figure?.querySelector("blockquote");
    return {
      text: block?.textContent?.trim(),
      cite: block?.getAttribute("cite"),
      caption: figure?.querySelector("figcaption")?.textContent?.replace(/\s+/g, " ").trim(),
      size: block ? parseFloat(getComputedStyle(block).fontSize) : 0,
    };
  });
  assert.match(
    quote.text ?? "",
    /the grounds are beautiful/i,
    "the pull-quote must be the guest's own verbatim words",
  );
  assert.ok(quote.size >= 26, `a pull-quote set at ${quote.size}px is just a paragraph`);
  assert.match(quote.caption ?? "", /Carolyn K/, "a quotation must carry its attribution");
  // A review quoted without a date and a findable source is unverifiable
  // atmosphere, which is the one thing this concept must never trade in.
  assert.match(
    quote.caption ?? "",
    /22 July 2026/,
    "the pull-quote must date the review",
  );
  assert.match(
    String(quote.cite),
    /tripadvisor/i,
    "the pull-quote must cite where the owner can go and read it",
  );

  assert.deepEqual(
    elevationErrors,
    [],
    "the elevated pages must keep the browser console clean",
  );
  await elevation.close();

  console.log(
    "Enniskeen journey passed: responsive, accessible failure/recovery, Bookin1 destination, day-part hero, graded imagery, estate plate, history band and sourced pull-quote verified.",
  );
} finally {
  await browser.close();
}
