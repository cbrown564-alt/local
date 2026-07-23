import puppeteer from "puppeteer-core";
import { findChrome } from "./lib/chrome.mjs";

const base = process.env.SHOT_BASE ?? "http://127.0.0.1:4321";
const browser = await puppeteer.launch({
  executablePath: findChrome(),
  headless: true,
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});

try {
  const index = await browser.newPage();
  await index.setViewport({ width: 375, height: 812, deviceScaleFactor: 1 });
  const indexMedia = [];
  index.on("request", (request) => {
    if (request.resourceType() === "image") indexMedia.push(request.url());
  });
  await index.goto(new URL("/transformations/", base).href, {
    waitUntil: "networkidle0",
    timeout: 60_000,
  });
  const currentImages = await index.$$eval("img", (images) =>
    images.map((image) => image.currentSrc).filter(Boolean),
  );
  const comparisonRequests = indexMedia.filter((url) =>
    /\/images\/.+-(?:before|after)(?:-\d+)?\.(?:jpe?g|webp)$/i.test(url),
  );

  if (!currentImages.some((url) => /-640\.webp$/i.test(url))) {
    throw new Error("The phone viewport did not select a 640px WebP source.");
  }
  if (comparisonRequests.length >= 20) {
    throw new Error(`Lazy comparison media loaded too eagerly (${comparisonRequests.length} requests).`);
  }

  const detail = await browser.newPage();
  await detail.setViewport({ width: 375, height: 812, deviceScaleFactor: 1 });
  const videoRequests = [];
  detail.on("request", (request) => {
    if (/\.(?:mp4|webm)(?:$|\?)/i.test(request.url())) videoRequests.push(request.url());
  });
  await detail.goto(new URL("/transformations/donard-veterinary/", base).href, {
    waitUntil: "networkidle0",
    timeout: 60_000,
  });

  const initialButton = await detail.$eval("[data-motion-toggle]", (button) => ({
    pressed: button.getAttribute("aria-pressed"),
    label: button.textContent?.trim(),
  }));
  if (videoRequests.length) {
    throw new Error(`Video was requested before consent: ${videoRequests.join(", ")}`);
  }
  if (initialButton.pressed !== "false" || !initialButton.label?.includes("Play demos")) {
    throw new Error("Motion control did not start in its explicit opt-in state.");
  }

  await detail.click("[data-motion-toggle]");
  await new Promise((resolve) => setTimeout(resolve, 1_500));
  if (!videoRequests.some((url) => /\.webm(?:$|\?)/i.test(url))) {
    throw new Error("Clicking Play demos did not request a WebM clip.");
  }

  console.log(JSON.stringify({
    indexImageRequests: indexMedia.length,
    comparisonImageRequests: comparisonRequests.length,
    phoneSources: [...new Set(currentImages.filter((url) => /\/images\//.test(url)))],
    videoRequestsBeforeClick: 0,
    videoRequestsAfterClick: videoRequests,
  }, null, 2));
} finally {
  await browser.close();
}
