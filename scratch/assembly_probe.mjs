import puppeteer from "puppeteer-core";
import { findChrome } from "../tools/lib/chrome.mjs";

const url = "http://localhost:4321/how-a-site-goes-together/";

const browser = await puppeteer.launch({
  executablePath: findChrome(),
  headless: true,
  args: ["--no-sandbox", "--disable-dev-shm-usage", "--no-zygote", "--single-process"],
});

const settle = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  await page.goto(url, { waitUntil: "networkidle0" });
  await settle(600);

  const info = await page.evaluate(() => ({
    docBehavior: getComputedStyle(document.documentElement).scrollBehavior,
    bodyBehavior: getComputedStyle(document.body).scrollBehavior,
    bodyOverflowY: getComputedStyle(document.body).overflowY,
    htmlOverflowY: getComputedStyle(document.documentElement).overflowY,
    docHeight: document.documentElement.scrollHeight,
    innerHeight: window.innerHeight,
    scrollingElement: document.scrollingElement?.tagName,
  }));
  console.log("page:", JSON.stringify(info));

  await page.evaluate(() => window.scrollTo(0, 800));
  await settle(300);
  console.log("after scrollTo(0,800):", await page.evaluate(() => window.scrollY));

  await page.evaluate(() => {
    document.querySelector("[data-hasg-live]")?.scrollIntoView({ block: "start" });
  });
  await settle(800);
  console.log("after live.scrollIntoView:", await page.evaluate(() => window.scrollY));
} finally {
  await browser.close();
}
