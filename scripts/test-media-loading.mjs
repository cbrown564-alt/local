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

  const reel = await browser.newPage();
  await reel.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
  await reel.setViewport({ width: 375, height: 812, deviceScaleFactor: 1 });
  const reelVideoRequests = [];
  reel.on("request", (request) => {
    if (/hotel-enniskeen-reel\.(?:mp4|webm)(?:$|\?)/i.test(request.url())) {
      reelVideoRequests.push(request.url());
    }
  });
  await reel.goto(new URL("/transformations/hotel-enniskeen/", base).href, {
    waitUntil: "networkidle0",
    timeout: 60_000,
  });
  const reelInitial = await reel.$eval("[data-reel-player]", (player) => ({
    reducedMotion: player.hasAttribute("data-reduced-motion"),
    sources: [...player.querySelectorAll("video source")].map((source) => source.getAttribute("src")),
  }));
  if (reelVideoRequests.length) {
    throw new Error(`Reel video was requested before an explicit play: ${reelVideoRequests.join(", ")}`);
  }
  if (!reelInitial.reducedMotion) {
    throw new Error("Reel player did not expose its reduced-motion state.");
  }
  if (reelInitial.sources.some(Boolean)) {
    throw new Error("Reel sources were attached before an explicit play.");
  }
  await reel.focus("[data-reel-play]");
  await reel.keyboard.press("Enter");
  await new Promise((resolve) => setTimeout(resolve, 1_500));
  if (!reelVideoRequests.some((url) => /hotel-enniskeen-reel\.webm(?:$|\?)/i.test(url))) {
    throw new Error("Starting the film by keyboard did not request the reel WebM.");
  }
  const reelPlaying = await reel.$eval("[data-reel-video]", (video) => ({
    controls: video.controls,
    paused: video.paused,
  }));
  if (!reelPlaying.controls || reelPlaying.paused) {
    throw new Error("The reel did not expose native controls and start after keyboard activation.");
  }
  await reel.focus("[data-reel-video]");
  await reel.keyboard.press("Space");
  await new Promise((resolve) => setTimeout(resolve, 250));
  const reelPaused = await reel.$eval("[data-reel-video]", (video) => video.paused);
  if (!reelPaused) {
    throw new Error("The reel did not pause from the keyboard through its native controls.");
  }

  console.log(JSON.stringify({
    indexImageRequests: indexMedia.length,
    comparisonImageRequests: comparisonRequests.length,
    phoneSources: [...new Set(currentImages.filter((url) => /\/images\//.test(url)))],
    videoRequestsBeforeClick: 0,
    videoRequestsAfterClick: videoRequests,
    reelRequestsBeforeClick: 0,
    reelRequestsAfterClick: reelVideoRequests,
    reelReducedMotion: reelInitial.reducedMotion,
    reelKeyboardPlay: true,
    reelKeyboardPause: reelPaused,
  }, null, 2));
} finally {
  await browser.close();
}
