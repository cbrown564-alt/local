import assert from "node:assert/strict";
import puppeteer from "puppeteer-core";
import { findChrome } from "./lib/chrome.mjs";

const base = process.env.SHOT_BASE ?? "http://127.0.0.1:4321";
const home = new URL("/concepts/bucks-head/", base).href;
const menus = new URL("/concepts/bucks-head/menus/", base).href;
const engine =
  "https://booking.resdiary.com/widget/Standard/TheBucksHeadRestaurantwithRooms/50459";
const menuPanels = [
  "panel-alacarte",
  "panel-bar",
  "panel-sunday",
  "panel-dessert",
  "panel-drinks",
];

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
  const consoleDefects = [];
  page.on("console", (message) => {
    if (message.type() === "error" || message.type() === "warning") {
      consoleDefects.push(message.text());
    }
  });
  page.on("pageerror", (error) => consoleDefects.push(error.message));

  await page.setViewport({ width: 1265, height: 710, deviceScaleFactor: 1 });
  await page.goto(home, { waitUntil: "networkidle0", timeout: 60_000 });

  const desktop = await page.evaluate(() => {
    const image = document.querySelector(".bh-panel img")?.getBoundingClientRect();
    const booking = document
      .querySelector(".bh-booking")
      ?.getBoundingClientRect();
    return {
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
      imageWidth: image?.width,
      imageHeight: image?.height,
      bookingWidth: booking?.width,
      brand: document.querySelector(".bh-brand-name")?.textContent?.trim(),
      kicker: document.querySelector(".bh-kicker")?.textContent?.trim(),
      robots: document
        .querySelector('meta[name="robots"]')
        ?.getAttribute("content"),
    };
  });
  assert.equal(desktop.scrollWidth, desktop.clientWidth, "desktop must not overflow");
  assert.equal(desktop.brand, "The Bucks Head");
  assert.match(desktop.kicker, /Buck's Head/);
  assert.equal(desktop.robots, "noindex, nofollow");
  assert.ok(desktop.imageWidth >= 500 && desktop.imageHeight >= 400);
  assert.ok(
    desktop.bookingWidth / desktop.imageWidth <= 0.6,
    "the booking card must leave most of the photograph visible",
  );

  // The studio banner is in document flow, not a fixed footer. Fail only when
  // a control stays covered by `.mm-concept-banner` at every scroll position.
  const trapped = await page.evaluate(() => {
    // Controls are keyed by their position in the document, not by their label.
    // Keying on `textContent` collapsed same-named controls — two "Book a
    // table" links became one entry, so a permanently covered control could be
    // marked reachable by its twin elsewhere on the page.
    const controls = [...document.querySelectorAll("main a[href], main button, main input, main select")];
    const describe = (el, index) => {
      const label = (el.textContent || el.getAttribute("name") || el.tagName)
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, 40);
      return `#${index} ${el.tagName.toLowerCase()}${label ? ` "${label}"` : ""}`;
    };

    const probe = () => {
      const out = [];
      for (const [index, el] of controls.entries()) {
        const r = el.getBoundingClientRect();
        if (r.width === 0 || r.height === 0) continue;
        const cy = r.y + r.height / 2;
        if (cy < 0 || cy > window.innerHeight) continue;
        const top = document.elementFromPoint(r.x + r.width / 2, cy);
        if (top && top.tagName.toLowerCase() === "astro-dev-toolbar") continue;
        out.push({ index, covered: Boolean(top?.closest(".mm-concept-banner")) });
      }
      return out;
    };

    const reachable = new Set();
    const seen = new Set();
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    for (const y of [0, Math.round(maxScroll / 2), maxScroll]) {
      window.scrollTo({ top: y, behavior: "instant" });
      for (const entry of probe()) {
        seen.add(entry.index);
        if (!entry.covered) reachable.add(entry.index);
      }
    }
    window.scrollTo({ top: 0, behavior: "instant" });
    return [...seen]
      .filter((index) => !reachable.has(index))
      .map((index) => describe(controls[index], index));
  });
  assert.deepEqual(
    trapped,
    [],
    `controls permanently trapped under the disclosure: ${trapped.join(", ")}`,
  );

  await page.setViewport({
    width: 390,
    height: 844,
    deviceScaleFactor: 1,
    isMobile: true,
    hasTouch: true,
  });
  await page.goto(home, { waitUntil: "networkidle0", timeout: 60_000 });

  const phone = await page.evaluate(() => {
    const image = document.querySelector(".bh-panel img")?.getBoundingClientRect();
    const booking = document
      .querySelector(".bh-booking")
      ?.getBoundingClientRect();
    return {
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
      imageTop: image?.top,
      imageVisible:
        Math.min(image?.bottom ?? 0, innerHeight) - Math.max(image?.top ?? 0, 0),
      bookingTop: booking?.top,
      dateRequired: document
        .querySelector('input[name="date"]')
        ?.hasAttribute("required"),
    };
  });
  assert.equal(
    phone.scrollWidth,
    phone.clientWidth,
    "390px home must not overflow horizontally",
  );
  assert.ok(phone.imageTop < 844, "real subject proof must enter the first screen");
  assert.ok(
    phone.imageVisible >= 120,
    "a clear strip of the real subject photograph must be visible in the first screen",
  );
  assert.ok(phone.bookingTop < 844, "the booking card must enter the first screen");
  assert.equal(phone.dateRequired, true, "date must be required");

  await page.click('.bh-booking button[type="submit"]');
  const invalid = await page.evaluate(() => {
    const input = document.querySelector('input[name="date"]');
    return {
      url: location.href,
      valid: input?.validity.valid,
      activeName: document.activeElement?.getAttribute("name"),
      party: document.querySelector('select[name="partySize"]')?.value,
    };
  });
  assert.equal(invalid.url, home, "missing date must stay on the concept");
  assert.equal(invalid.valid, false);
  assert.equal(invalid.activeName, "date");
  assert.equal(invalid.party, "2", "validation must preserve party size");

  const externalRequests = [];
  await page.setRequestInterception(true);
  page.on("request", (request) => {
    if (request.isNavigationRequest() && request.url().startsWith(engine)) {
      externalRequests.push(request.url());
      request.abort();
      return;
    }
    request.continue();
  });
  await page.$eval('input[name="date"]', (input) => {
    input.value = "2026-08-01";
    input.dispatchEvent(new Event("input", { bubbles: true }));
  });
  await page.select('select[name="partySize"]', "4");
  await page.click('.bh-booking button[type="submit"]');
  await new Promise((resolve) => setTimeout(resolve, 250));
  assert.equal(
    externalRequests.at(-1),
    `${engine}?date=2026-08-01&partySize=4`,
    "recovery must request the exact ResDiary date and party",
  );

  for (const panelId of menuPanels) {
    await page.goto(`${menus}#${panelId}`, {
      waitUntil: "networkidle0",
      timeout: 60_000,
    });
    const state = await page.evaluate(() => ({
      hash: location.hash,
      active: document.querySelector(".bh-menu-panel[data-active='true']")?.id,
      selected: document
        .querySelector(".bh-tab[aria-selected='true']")
        ?.getAttribute("aria-controls"),
      visible: Array.from(document.querySelectorAll(".bh-menu-panel"))
        .filter((panel) => getComputedStyle(panel).display !== "none")
        .map((panel) => panel.id),
      tabStops: Array.from(document.querySelectorAll(".bh-tab")).filter(
        (tab) => tab.tabIndex === 0,
      ).length,
    }));
    assert.equal(state.hash, `#${panelId}`);
    assert.equal(state.active, panelId);
    assert.equal(state.selected, panelId);
    assert.deepEqual(state.visible, [panelId]);
    assert.equal(state.tabStops, 1, "exactly one tab may be in the tab order");
  }

  const menuPresentation = await page.evaluate(() => {
    const notice = document
      .querySelector(".bh-menu-notice")
      ?.getBoundingClientRect();
    const firstPrice = document
      .querySelector(".bh-menu-panel[data-active='true'] .bh-dish-price")
      ?.getBoundingClientRect();
    const sublabel = document.querySelector(".bh-tab:not([aria-selected='true']) span");
    const tablist = document.querySelector(".bh-tabs");
    return {
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
      noticeBottom: notice?.bottom,
      firstPriceTop: firstPrice?.top,
      sublabelColor: getComputedStyle(sublabel).color,
      tabBackground: getComputedStyle(tablist).backgroundColor,
      heroBackground: getComputedStyle(
        document.querySelector(".bh-menus-hero"),
      ).backgroundColor,
    };
  });
  assert.equal(
    menuPresentation.scrollWidth,
    menuPresentation.clientWidth,
    "390px menus must not overflow horizontally",
  );
  assert.ok(
    menuPresentation.noticeBottom < menuPresentation.firstPriceTop,
    "the illustrative-menu warning must precede prices",
  );
  assert.ok(
    contrast(
      menuPresentation.sublabelColor,
      menuPresentation.tabBackground === "rgba(0, 0, 0, 0)"
        ? menuPresentation.heroBackground
        : menuPresentation.tabBackground,
    ) >= 4.5,
    "unselected tab sublabels must meet 4.5:1 contrast",
  );

  await page.focus("#tab-sunday");
  await page.keyboard.press("ArrowRight");
  let keyboardState = await page.evaluate(() => ({
    active: document.querySelector(".bh-menu-panel[data-active='true']")?.id,
    focused: document.activeElement?.id,
    hash: location.hash,
  }));
  assert.deepEqual(keyboardState, {
    active: "panel-dessert",
    focused: "tab-dessert",
    hash: "#panel-dessert",
  });

  await page.keyboard.press("Home");
  keyboardState = await page.evaluate(() => ({
    active: document.querySelector(".bh-menu-panel[data-active='true']")?.id,
    focused: document.activeElement?.id,
    hash: location.hash,
  }));
  assert.deepEqual(keyboardState, {
    active: "panel-alacarte",
    focused: "tab-alacarte",
    hash: "#panel-alacarte",
  });

  await page.keyboard.press("End");
  await page.goBack({ waitUntil: "domcontentloaded" });
  const historyState = await page.evaluate(() => ({
    active: document.querySelector(".bh-menu-panel[data-active='true']")?.id,
    hash: location.hash,
  }));
  assert.deepEqual(historyState, {
    active: "panel-alacarte",
    hash: "#panel-alacarte",
  });

  await page.emulateMediaFeatures([
    { name: "prefers-reduced-motion", value: "reduce" },
  ]);
  await page.goto(home, { waitUntil: "networkidle0", timeout: 60_000 });
  const reducedMotion = await page.evaluate(() =>
    [".bh-book", ".bh-cta", ".bh-booking button"].map((selector) => {
      const style = getComputedStyle(document.querySelector(selector));
      return {
        animationName: style.animationName,
        transitionDuration: style.transitionDuration,
      };
    }),
  );
  assert.ok(
    reducedMotion.every(
      ({ animationName, transitionDuration }) =>
        animationName === "none" && parseFloat(transitionDuration) <= 0.001,
    ),
    "reduced motion must remove nonessential movement",
  );

  assert.deepEqual(consoleDefects, [], "local concept console must stay clean");
  await page.close();
  console.log(
    "Buck's Head journey passed: responsive proof, validation, exact handoff, menu routing, history, keyboard and contrast verified.",
  );
} finally {
  await browser.close();
}
