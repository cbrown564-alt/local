#!/usr/bin/env node
/**
 * Generates bespoke 1200x630 Open Graph preview cards under public/media/og/<slug>.jpg
 * for every concept registered in src/site/data/og-images.ts (conceptOgCards).
 *
 * Pass `--all` to regenerate existing cards; by default captures only missing cards.
 * Run after `pnpm exec astro build` so `pnpm preview` serves the compiled routes.
 */

import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import puppeteer from "puppeteer-core";

const PORT = 4391;
const BASE = `http://127.0.0.1:${PORT}`;
const OUT_DIR = path.resolve("public/media/og");
fs.mkdirSync(OUT_DIR, { recursive: true });

const forceAll = process.argv.includes("--all");
const ogSrc = fs.readFileSync("src/site/data/og-images.ts", "utf8");
const cardSlugs = [...ogSrc.matchAll(/"([a-z0-9-]+)":\s*"\/media\/og\/[a-z0-9-]+\.jpg"/g)].map((m) => m[1]);
const toCapture = forceAll
  ? cardSlugs
  : cardSlugs.filter((slug) => !fs.existsSync(path.join(OUT_DIR, `${slug}.jpg`)));

if (toCapture.length === 0) {
  console.log(`All ${cardSlugs.length} concept OG cards already exist (pass --all to regenerate).`);
  process.exit(0);
}

console.log(`Capturing ${toCapture.length} concept OG cards...`);

const srv = spawn("pnpm", ["preview", "--host", "127.0.0.1", "--port", String(PORT)], {
  stdio: ["ignore", "ignore", "pipe"],
});
srv.stderr.on("data", (d) => process.stderr.write(d));

const waitUp = async () => {
  for (let i = 0; i < 60; i++) {
    try {
      const r = await fetch(`${BASE}/concepts/${toCapture[0]}/`);
      if (r.ok) return;
    } catch {}
    await new Promise((r) => setTimeout(r, 250));
  }
  throw new Error("Astro preview server did not start in time (run `pnpm exec astro build` first)");
};

let browser;
try {
  await waitUp();
  const executablePath = [
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Chromium.app/Contents/MacOS/Chromium",
  ].find((p) => fs.existsSync(p));
  browser = await puppeteer.launch({ executablePath, headless: true, args: ["--no-sandbox"] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });

  for (const slug of toCapture) {
    await page.goto(`${BASE}/concepts/${slug}/`, { waitUntil: "networkidle0" });
    await page.evaluate(() => {
      const banner = document.querySelector(".mm-concept-banner");
      if (banner) banner.style.display = "none";

      const rawTitle = document.title || "";
      const cleanName = rawTitle.split(/[—–|]/)[0]?.trim() || "Concept preview";

      const strip = document.createElement("div");
      strip.style.cssText = [
        "position:fixed",
        "left:0",
        "right:0",
        "bottom:0",
        "z-index:99999",
        "display:flex",
        "align-items:center",
        "justify-content:space-between",
        "padding:10px 22px",
        "background:rgba(15, 22, 41, 0.94)",
        "color:#ffffff",
        "font-family:system-ui,-apple-system,sans-serif",
        "font-size:13px",
        "letter-spacing:0.01em",
        "border-top:1px solid rgba(255,255,255,0.22)",
      ].join(";");
      strip.innerHTML = `<span><strong>${cleanName}</strong></span><span style="opacity:0.86">Independent website concept by Mourne Made</span>`;
      document.body.appendChild(strip);
    });
    await new Promise((r) => setTimeout(r, 120));
    const dest = path.join(OUT_DIR, `${slug}.jpg`);
    await page.screenshot({ path: dest, type: "jpeg", quality: 84 });
    console.log(`OG card saved: public/media/og/${slug}.jpg`);
  }
} finally {
  if (browser) await browser.close();
  srv.kill("SIGTERM");
}
