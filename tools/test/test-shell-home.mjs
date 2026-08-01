import assert from "node:assert/strict";
import puppeteer from "puppeteer-core";
import { findChrome } from "../lib/chrome.mjs";

// Pins the homepage shell's hero reveal sweep, added in the 1 August 2026
// shell elevation (docs/shell-elevation-brief.md): the featured comparison
// arrives fully "before", sweeps once to the settled split, stays
// interactive afterwards, and renders settled with no motion when
// prefers-reduced-motion is set. Also pins the claim-door link.

const base = process.env.SHOT_BASE ?? "http://127.0.0.1:4321";
const route = new URL("/", base).href;

const browser = await puppeteer.launch({
  executablePath: findChrome(),
  headless: "new",
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});

const readState = (page) =>
  page.evaluate(() => {
    const comparison = document.querySelector(".home-hero [data-comparison]");
    const input = comparison?.querySelector('input[type="range"]');
    return {
      sweep: comparison?.hasAttribute("data-comparison-sweep") ?? null,
      state: comparison?.getAttribute("data-comparison-sweep-state") ?? null,
      split: comparison?.style.getPropertyValue("--comparison-split") ?? null,
      value: input?.value ?? null,
    };
  });

try {
  const page = await browser.newPage();
  const consoleErrors = [];
  page.on("console", (message) => {
    if (message.type() !== "error") return;
    // The Vercel analytics script 404s in local preview; same exemption as
    // test-reviewed-concept-journeys.mjs.
    if (/Failed to load resource/i.test(message.text())) return;
    consoleErrors.push(message.text());
  });
  page.on("pageerror", (error) => consoleErrors.push(error.message));

  await page.setViewport({ width: 1265, height: 710, deviceScaleFactor: 1 });
  await page.goto(route, { waitUntil: "domcontentloaded", timeout: 60_000 });

  // The claim door: quiet link from the hero to the public transformations.
  const claim = await page.evaluate(() => {
    const link = document.querySelector(".home-hero-claim");
    return link ? { href: link.getAttribute("href"), text: link.textContent.trim() } : null;
  });
  assert.ok(claim, "homepage hero must carry the claim-door link");
  assert.equal(claim.href, "/transformations/");
  assert.match(claim.text, /yours/i);

  // The sweep arms at full "before" immediately after load.
  const initial = await readState(page);
  assert.equal(initial.sweep, true, "hero comparison must opt into the sweep");
  assert.ok(
    initial.state === "armed" || initial.state === "running",
    `sweep must arm on load, got state "${initial.state}"`,
  );

  // While running, the split is still somewhere above the settled 50%.
  await page.waitForFunction(
    () =>
      document
        .querySelector(".home-hero [data-comparison]")
        ?.getAttribute("data-comparison-sweep-state") === "running",
    { timeout: 10_000 },
  );
  const running = await readState(page);
  const runningSplit = Number.parseFloat(running.split);
  assert.ok(
    runningSplit > 55,
    `sweep must visibly travel from full "before", got split ${running.split}`,
  );

  // It settles exactly at the input's resting value and stays interactive.
  await page.waitForFunction(
    () =>
      document
        .querySelector(".home-hero [data-comparison]")
        ?.getAttribute("data-comparison-sweep-state") === "settled",
    { timeout: 10_000 },
  );
  const settled = await readState(page);
  assert.equal(settled.value, "50", "settled range value must be the resting split");
  assert.equal(settled.split, "50%", "settled CSS split must be the resting split");

  await page.evaluate(() => {
    const input = document.querySelector(".home-hero [data-comparison] input[type=\"range\"]");
    input.value = "25";
    input.dispatchEvent(new Event("input", { bubbles: true }));
  });
  const dragged = await readState(page);
  assert.equal(dragged.split, "25%", "comparison must stay interactive after the sweep");
  assert.equal(
    dragged.state,
    "interrupted",
    "user takeover after settling must mark the sweep interrupted",
  );

  // Reduced motion: settled from the first paint, no travel.
  const reducedPage = await browser.newPage();
  await reducedPage.emulateMediaFeatures([
    { name: "prefers-reduced-motion", value: "reduce" },
  ]);
  await reducedPage.setViewport({ width: 1265, height: 710, deviceScaleFactor: 1 });
  await reducedPage.goto(route, { waitUntil: "domcontentloaded", timeout: 60_000 });
  await new Promise((resolve) => setTimeout(resolve, 2_600));
  const reduced = await readState(reducedPage);
  assert.equal(
    reduced.state,
    "settled",
    "reduced motion must render the settled state immediately",
  );
  assert.equal(reduced.split, "50%", "reduced motion must not travel from full \"before\"");

  assert.deepEqual(consoleErrors, [], `console errors on the homepage: ${consoleErrors.join("; ")}`);

  console.log("Homepage shell: hero sweep and claim door verified.");
} finally {
  await browser.close();
}
