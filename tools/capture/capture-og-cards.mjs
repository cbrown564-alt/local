#!/usr/bin/env node
/**
 * Capture 1200×630 Open Graph share cards from dev-only workbench routes into
 * public/media/og/. Requires `pnpm dev` on the default port.
 *
 *   node tools/capture/capture-og-cards.mjs
 *   node tools/capture/capture-og-cards.mjs donard-veterinary   # one slug only
 */

import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import puppeteer from "puppeteer-core";
import { findChrome } from "../lib/chrome.mjs";
import { projectRoot, readTransformationCandidateSlugs } from "../lib/public-slugs.mjs";

const root = projectRoot;
const base = process.env.OG_CAPTURE_BASE ?? "http://127.0.0.1:4321";
const outDir = path.join(root, "public", "media", "og");
const slugArg = process.argv[2];

const fixedCards = [
  { name: "studio", route: "/workbench/og/studio/" },
  { name: "home", route: "/workbench/og/home/" },
  { name: "request", route: "/workbench/og/request/" },
  { name: "transformations", route: "/workbench/og/transformations/" },
];

const slugCards = readTransformationCandidateSlugs().map((slug) => ({
  name: slug,
  route: `/workbench/og/${slug}/`,
}));

const allCards = [...fixedCards, ...slugCards];
const cards = slugArg
  ? allCards.filter((card) => card.name === slugArg)
  : allCards;

if (slugArg && cards.length === 0) {
  console.error(
    `Unknown card: ${slugArg}\nKnown: ${allCards.map((card) => card.name).join(", ")}`,
  );
  process.exit(1);
}

fs.mkdirSync(outDir, { recursive: true });

const require = createRequire(import.meta.url);
const pnpmDir = path.resolve(root, "node_modules", ".pnpm");
const sharpDir = fs.readdirSync(pnpmDir).find((entry) => entry.startsWith("sharp@"));
const sharp = require(path.join(pnpmDir, sharpDir, "node_modules", "sharp"));

const probe = await fetch(new URL(fixedCards[0].route, base).href)
  .then((response) => response.ok)
  .catch(() => false);
if (!probe) {
  throw new Error(`${base}${fixedCards[0].route} is not serving. Run: pnpm dev`);
}

const browser = await puppeteer.launch({
  executablePath: findChrome(),
  headless: "new",
  args: ["--hide-scrollbars", "--force-color-profile=srgb"],
});

try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });

  for (const card of cards) {
    const url = new URL(card.route, base).href;
    await page.goto(url, { waitUntil: "networkidle0", timeout: 60000 });
    await page.evaluate(() => document.fonts.ready);

    const metrics = await page.$eval(".og-card", (element) => ({
      clientWidth: element.clientWidth,
      clientHeight: element.clientHeight,
      scrollWidth: element.scrollWidth,
      scrollHeight: element.scrollHeight,
    }));

    if (
      metrics.scrollWidth > metrics.clientWidth + 1
      || metrics.scrollHeight > metrics.clientHeight + 1
    ) {
      throw new Error(`${card.name} overflows the 1200×630 canvas: ${JSON.stringify(metrics)}`);
    }

    const tmp = path.join(outDir, `${card.name}.tmp.png`);
    const out = path.join(outDir, `${card.name}.jpg`);
    await page.screenshot({
      path: tmp,
      type: "png",
      clip: { x: 0, y: 0, width: 1200, height: 630 },
    });
    await sharp(tmp)
      .jpeg({ quality: 88, mozjpeg: true })
      .toFile(out);
    fs.unlinkSync(tmp);

    const kb = Math.round(fs.statSync(out).size / 1024);
    console.log(`${path.relative(root, out)} — ${kb} KB`);
  }
} finally {
  await browser.close();
}

console.log(`Captured ${cards.length} share card(s).`);
