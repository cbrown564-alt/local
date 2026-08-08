import puppeteer from "puppeteer-core";
import { findChrome } from "../tools/lib/chrome.mjs";
import fs from "node:fs";

/** Phase-2 visual review: full-page stills of the six Mourne Cycles routes.
 *  Needs `pnpm preview` running on :4321. Output: scratch/mc_review/. */

const routes = ["", "bikes", "workshop", "hire", "cycle-to-work", "trails"];
const out = "scratch/mc_review";
fs.mkdirSync(out, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: findChrome(),
  headless: true,
  args: ["--no-sandbox", "--disable-dev-shm-usage", "--hide-scrollbars"],
});

const settle = (ms) => new Promise((r) => setTimeout(r, ms));

try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  for (const route of routes) {
    const name = route === "" ? "home" : route;
    await page.goto(`http://localhost:4321/concepts/mourne-cycles/${route}${route ? "/" : ""}`, {
      waitUntil: "networkidle0",
    });
    await settle(1400);
    await page.screenshot({ path: `${out}/${name}-full.png`, fullPage: true });
    console.log(`shot ${name}`);
  }
  // Mobile pass on home + workshop: the new disclosure menu.
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 });
  for (const route of ["", "workshop"]) {
    const name = route === "" ? "home" : route;
    await page.goto(`http://localhost:4321/concepts/mourne-cycles/${route}${route ? "/" : ""}`, {
      waitUntil: "networkidle0",
    });
    await settle(1000);
    await page.screenshot({ path: `${out}/${name}-mobile.png`, fullPage: true });
    console.log(`shot ${name}-mobile`);
  }
  // Menu open state.
  await page.goto("http://localhost:4321/concepts/mourne-cycles/", { waitUntil: "networkidle0" });
  await page.click(".mc-menu summary");
  await settle(400);
  await page.screenshot({ path: `${out}/home-mobile-menu.png` });
  console.log("shot home-mobile-menu");
} finally {
  await browser.close();
}
