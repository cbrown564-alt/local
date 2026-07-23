import puppeteer from "puppeteer-core";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { findChrome } from "./lib/chrome.mjs";

const BASE = process.env.SHOT_BASE ?? "http://127.0.0.1:4321";
const OUT = path.resolve(process.env.SHOT_OUT ?? "outputs/home-alts");

const pages = [
  { slug: "a-product-stage", path: "/prototypes/home/product/" },
  { slug: "b-bay-opening", path: "/prototypes/home/bay/" },
  { slug: "c-promenade-window", path: "/prototypes/home/window/" },
];

await mkdir(OUT, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: findChrome(),
  headless: true,
  args: ["--no-sandbox", "--disable-dev-shm-usage", "--hide-scrollbars"],
  defaultViewport: { width: 1440, height: 900, deviceScaleFactor: 2 },
});

for (const pageInfo of pages) {
  const page = await browser.newPage();
  await page.goto(new URL(pageInfo.path, BASE).href, {
    waitUntil: "networkidle0",
    timeout: 60000,
  });
  await page.evaluate(async () => {
    // @ts-ignore
    if (document.fonts?.ready) await document.fonts.ready;
  });
  // Hide prototype chrome for clean mockup shots
  await page.addStyleTag({
    content: `
      .home-alt-nav, .site-header, .skip-link { display: none !important; }
      .alt-a-hero, .alt-b-hero, .alt-c-hero { min-height: 100vh !important; }
      .alt-a-frame, .alt-b-content, .alt-c-frame { min-height: 100vh !important; }
    `,
  });
  // Wait for hero images
  await page.evaluate(async () => {
    const imgs = [...document.querySelectorAll("img")].slice(0, 4);
    await Promise.all(
      imgs.map((img) =>
        img.complete
          ? Promise.resolve()
          : new Promise((resolve) => {
              img.addEventListener("load", resolve, { once: true });
              img.addEventListener("error", resolve, { once: true });
            })
      )
    );
  });
  await new Promise((r) => setTimeout(r, 400));

  const heroPath = path.join(OUT, `${pageInfo.slug}-hero.png`);
  await page.screenshot({ path: heroPath, type: "png" });
  console.log(`wrote ${heroPath}`);

  const fullPath = path.join(OUT, `${pageInfo.slug}-full.png`);
  await page.screenshot({ path: fullPath, type: "png", fullPage: true });
  console.log(`wrote ${fullPath}`);

  await page.close();
}

await browser.close();
console.log("done");
