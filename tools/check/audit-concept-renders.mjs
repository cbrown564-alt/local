#!/usr/bin/env node
/**
 * Headless Chromium layout & craft audit for built concept pages in dist/.
 *
 * Usage:
 *   pnpm audit:renders                                 # audit all concepts in dist/
 *   pnpm audit:renders mourne-windows the-yellow-heifer # audit specific slugs
 *   pnpm audit:renders mourne-windows --capture=.scratch/review
 *   pnpm audit:renders --check-og                      # also assert public/media/og/<slug>.jpg > 10KB
 *
 * Checks per concept:
 *   - 0px horizontal overflow at desktop (1440x900) and mobile (390x844)
 *   - 0 uncaught pageerror exceptions
 *   - Symmetric desktop header inner rail (|left - right| <= 2px) when centred
 *   - Non-colliding solid/bordered <mark> highlight line boxes on <h1>
 */
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import puppeteer from "puppeteer-core";
import { projectRoot } from "../lib/public-slugs.mjs";

const distDir = path.join(projectRoot, "dist");
const conceptsDist = path.join(distDir, "concepts");

if (!fs.existsSync(conceptsDist)) {
  console.error("dist/concepts/ not found. Run `pnpm build` first.");
  process.exit(1);
}

const args = process.argv.slice(2);
const checkOg = args.includes("--check-og");
const captureArg = args.find((a) => a.startsWith("--capture="));
const captureDir = captureArg ? path.resolve(projectRoot, captureArg.slice("--capture=".length)) : null;
const explicitSlugs = args.filter((a) => !a.startsWith("--"));

const slugs = explicitSlugs.length
  ? explicitSlugs
  : fs
      .readdirSync(conceptsDist, { withFileTypes: true })
      .filter((e) => e.isDirectory() && fs.existsSync(path.join(conceptsDist, e.name, "index.html")))
      .map((e) => e.name)
      .sort();

if (captureDir) fs.mkdirSync(captureDir, { recursive: true });

const mime = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
  ".json": "application/json",
};

const server = http.createServer((req, res) => {
  const urlPath = (req.url || "/").split("?")[0];
  let filePath = path.join(distDir, urlPath);
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, "index.html");
  }
  if (!fs.existsSync(filePath)) {
    res.writeHead(404);
    res.end("Not found");
    return;
  }
  const ext = path.extname(filePath).toLowerCase();
  res.writeHead(200, { "Content-Type": mime[ext] || "application/octet-stream" });
  fs.createReadStream(filePath).pipe(res);
});

await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const port = server.address().port;

const chromePaths = [
  process.env.CHROME_PATH,
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
  "/usr/bin/chromium",
  "/usr/bin/google-chrome",
].filter(Boolean);
const executablePath = chromePaths.find((p) => fs.existsSync(p));
if (!executablePath) {
  console.error("Chrome/Chromium executable not found. Set CHROME_PATH to run audit:renders.");
  server.close();
  process.exit(1);
}

const browser = await puppeteer.launch({ executablePath, headless: "new" });
const page = await browser.newPage();

const failures = [];

for (const slug of slugs) {
  const pageErrors = [];
  const onPageError = (err) => pageErrors.push(err.message);
  page.on("pageerror", onPageError);

  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  const resp = await page.goto(`http://127.0.0.1:${port}/concepts/${slug}/`, {
    waitUntil: "networkidle2",
    timeout: 30000,
  });
  await page.evaluate(async () => {
    await document.fonts.ready;
  });

  const desktop = await page.evaluate(() => {
    const overflow = Math.max(0, document.documentElement.scrollWidth - window.innerWidth);
    const header = document.querySelector("body.concept-page header");
    let headerSkew = 0;
    if (header) {
      const inner = header.firstElementChild;
      if (inner && header.children.length === 1) {
        const r = inner.getBoundingClientRect();
        const rightGap = Math.max(0, window.innerWidth - r.right);
        headerSkew = Math.round(Math.abs(r.left - rightGap));
      }
    }
    const mark = document.querySelector("h1 mark");
    let markOverlap = false;
    if (mark) {
      const cs = getComputedStyle(mark);
      const hasBoxFill =
        cs.backgroundColor !== "rgba(0, 0, 0, 0)" && cs.backgroundColor !== "transparent";
      const rects = Array.from(mark.getClientRects()).filter((r) => r.width > 2 && r.height > 2);
      if (hasBoxFill && rects.length > 1) {
        for (let i = 1; i < rects.length; i++) {
          if (rects[i].top < rects[i - 1].bottom - 1) {
            markOverlap = true;
            break;
          }
        }
      }
    }
    return { overflow, headerSkew, markOverlap };
  });

  if (captureDir) {
    await page.screenshot({
      path: path.join(captureDir, `${slug}.jpg`),
      type: "jpeg",
      quality: 86,
    });
  }

  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 });
  await new Promise((r) => setTimeout(r, 80));
  const mobileOverflow = await page.evaluate(() =>
    Math.max(0, document.documentElement.scrollWidth - window.innerWidth),
  );

  page.off("pageerror", onPageError);

  const issues = [];
  if (!resp || resp.status() >= 400) issues.push(`HTTP ${resp?.status() ?? "ERR"}`);
  if (pageErrors.length) issues.push(`pageerror: ${pageErrors[0]}`);
  if (desktop.overflow > 0) issues.push(`desktop overflow ${desktop.overflow}px`);
  if (mobileOverflow > 0) issues.push(`mobile overflow ${mobileOverflow}px`);
  if (desktop.headerSkew > 2) issues.push(`header rail skew ${desktop.headerSkew}px`);
  if (desktop.markOverlap) issues.push(`h1 <mark> line-box vertical overlap`);

  if (checkOg) {
    const ogPath = path.join(projectRoot, "public", "media", "og", `${slug}.jpg`);
    if (!fs.existsSync(ogPath) || fs.statSync(ogPath).size < 10_000) {
      issues.push("missing/small OG card");
    }
  }

  if (issues.length) {
    failures.push({ slug, issues });
    console.error(`FAIL  ${slug.padEnd(28)} | ${issues.join("; ")}`);
  } else {
    console.log(`PASS  ${slug.padEnd(28)} | desktop=0px mobile=0px skew=${desktop.headerSkew}px`);
  }
}

await browser.close();
server.close();

if (failures.length) {
  console.error(`\nRender audit failed: ${failures.length}/${slugs.length} concepts had defects.`);
  process.exit(1);
}

console.log(`\nRender audit passed (${slugs.length}/${slugs.length} concepts).`);
