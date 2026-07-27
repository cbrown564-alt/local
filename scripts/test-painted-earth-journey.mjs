import fs from "node:fs";
import path from "node:path";
import puppeteer from "puppeteer-core";
import { findChrome } from "./lib/chrome.mjs";

const base = process.env.SHOT_BASE ?? "http://127.0.0.1:4321";
const root = path.resolve(import.meta.dirname, "..");
const output = path.join(root, "output", "painted-earth");
fs.mkdirSync(output, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: findChrome(),
  headless: true,
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});

const failures = [];
const checks = [];

function check(condition, message) {
  checks.push(message);
  if (!condition) failures.push(message);
}

async function openPage(route, viewport) {
  const page = await browser.newPage();
  await page.setViewport(viewport);
  const runtimeErrors = [];
  const failedRequests = [];
  page.on("console", (message) => {
    if (message.type() === "error") runtimeErrors.push(message.text());
  });
  page.on("pageerror", (error) => runtimeErrors.push(error.message));
  page.on("requestfailed", (request) => {
    failedRequests.push(`${request.url()} (${request.failure()?.errorText ?? "failed"})`);
  });
  const response = await page.goto(new URL(route, base).href, {
    waitUntil: "networkidle0",
    timeout: 60_000,
  });
  const externalFontFailuresOnly = failedRequests.length > 0
    && failedRequests.every((request) => (
      request.includes("fonts.googleapis.com")
      || request.includes("fonts.gstatic.com")
    ));
  check(
    response?.status() === 200 || response?.status() === 304,
    `${route} returns 200/304 at ${viewport.width}px (received ${response?.status() ?? "no response"})`,
  );
  check(
    runtimeErrors.length === 0
      || (externalFontFailuresOnly && runtimeErrors.every((error) => error.includes("ERR_NETWORK_ACCESS_DENIED"))),
    `${route} has no console errors at ${viewport.width}px`
      + (runtimeErrors.length ? ` (${runtimeErrors.join(" | ")})` : ""),
  );
  check(
    failedRequests.length === 0
      || failedRequests.every((request) => request.includes("fonts.googleapis.com") || request.includes("fonts.gstatic.com")),
    `${route} has no unexpected failed requests at ${viewport.width}px`
      + (failedRequests.length ? ` (${failedRequests.join(" | ")})` : ""),
  );
  const widths = await page.evaluate(() => ({
    document: document.documentElement.scrollWidth,
    viewport: document.documentElement.clientWidth,
  }));
  check(widths.document <= widths.viewport + 1, `${route} has no horizontal overflow at ${viewport.width}px`);
  return page;
}

try {
  const desktop = { width: 1265, height: 710, deviceScaleFactor: 1 };
  const phone = { width: 390, height: 844, deviceScaleFactor: 1, isMobile: true, hasTouch: true };

  const homeDesktop = await openPage("/concepts/painted-earth/", desktop);
  check(
    await homeDesktop.$eval("h1", (element) => element.textContent?.trim()) === "What are you looking for?",
    "arrival leads with the conventional shopping question",
  );
  check(
    await homeDesktop.$$eval(".pe-place-list a", (links) => links.length) === 5,
    "arrival retains five optional place routes",
  );
  await homeDesktop.screenshot({ path: path.join(output, "home-desktop.png"), fullPage: true });
  await homeDesktop.close();

  const homePhone = await openPage("/concepts/painted-earth/", phone);
  await homePhone.screenshot({ path: path.join(output, "home-phone.png"), fullPage: true });
  await homePhone.close();

  const shelfDesktop = await openPage("/concepts/painted-earth/originals/?place=Mournes", desktop);
  check(
    await shelfDesktop.$eval('#pe-filter-form select[name="place"]', (element) => element.value) === "Mournes",
    "place route arrives with a removable Mournes filter",
  );
  check(
    (await shelfDesktop.$eval("#pe-result-count", (element) => element.textContent))?.includes("2 of 8"),
    "Mournes filter updates the result count",
  );
  await shelfDesktop.select('#pe-filter-form select[name="price"]', "400");
  await shelfDesktop.waitForFunction(() => !document.querySelector("#pe-empty")?.hasAttribute("hidden"));
  check(
    await shelfDesktop.$eval("#pe-empty", (element) => !element.hidden),
    "impossible filter combination exposes a recovery state",
  );
  await shelfDesktop.click("[data-clear-filters]");
  await shelfDesktop.waitForFunction(() => document.querySelector("#pe-empty")?.hasAttribute("hidden"));
  check(
    (await shelfDesktop.$eval("#pe-result-count", (element) => element.textContent))?.includes("8 of 8"),
    "clear filters restores all example records",
  );
  await shelfDesktop.screenshot({ path: path.join(output, "originals-desktop.png"), fullPage: true });
  await shelfDesktop.close();

  const shelfPhone = await openPage("/concepts/painted-earth/originals/", phone);
  await shelfPhone.click(".pe-refine-button");
  await shelfPhone.waitForSelector("#pe-filter-dialog[open]");
  await shelfPhone.click('#pe-filter-dialog-form input[value="sold"]');
  await shelfPhone.click('#pe-filter-dialog-form button[type="submit"]');
  await shelfPhone.waitForFunction(() => document.querySelector("#pe-result-count")?.textContent?.includes("2 of 8"));
  check(
    (await shelfPhone.$$eval("[data-artwork]:not([hidden])", (cards) => cards.length)) === 2,
    "mobile filter drawer can isolate sold-work recovery records",
  );
  await shelfPhone.screenshot({ path: path.join(output, "originals-phone.png"), fullPage: true });
  await shelfPhone.close();

  const available = await openPage(
    "/concepts/painted-earth/originals/rossglass-to-mournes/",
    desktop,
  );
  const availableLinks = await available.$$eval(".pe-choice-row a", (links) => links.map((link) => link.href));
  check(
    availableLinks.some((href) => href.includes("paintedearthgifts.com/products/rossglass-to-mournes")),
    "available artwork hands off to the live product page",
  );
  check(
    availableLinks.some((href) => href.includes("paintedearthgifts.com/pages/contact-us")),
    "available artwork offers the live shipping-quote contact route",
  );
  await available.close();

  const sold = await openPage(
    "/concepts/painted-earth/originals/cutie-the-puffin/",
    phone,
  );
  check(
    await sold.$$eval(".pe-recovery-actions a", (links) => links.length) === 3,
    "sold artwork provides same-range, live-gallery and contact recovery routes",
  );
  await sold.close();
} finally {
  await browser.close();
}

console.log(`Painted Earth journey: ${checks.length - failures.length}/${checks.length} checks passed.`);
for (const failure of failures) console.error(`- ${failure}`);
if (failures.length) process.exitCode = 1;
