#!/usr/bin/env node
/**
 * Generates bespoke 1200x630 Open Graph preview cards for the 19 Wave 1 & Wave 2
 * NMDDC concepts under public/media/og/<slug>.jpg.
 *
 * Each card captures the concept's real rendered hero at 1200x630 (with the top
 * studio banner hidden during capture and replaced by a clean bottom attribution
 * footer bar so the independent-concept disclosure travels inside WhatsApp /
 * iMessage / social link previews).
 */

import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import puppeteer from "puppeteer-core";

const PORT = 4391;
const BASE = `http://127.0.0.1:${PORT}`;
const OUT_DIR = path.resolve("public/media/og");
fs.mkdirSync(OUT_DIR, { recursive: true });

const CONCEPTS = [
  { slug: "flagstaff-lodge", name: "Flagstaff Lodge", town: "Newry" },
  { slug: "the-lobster-pot", name: "The Lobster Pot", town: "Strangford" },
  { slug: "yew-wood-cottage", name: "Yew Wood Cottage", town: "Jonesborough" },
  { slug: "old-school-house-rostrevor", name: "The Old School House", town: "Rostrevor" },
  { slug: "millers-close", name: "Millers Close", town: "Castlewellan" },
  { slug: "crossgar-dental", name: "Crossgar Dental Practice", town: "Crossgar" },
  { slug: "bridgend-studios", name: "Bridgend Studios", town: "Crossgar" },
  { slug: "belleek-country-house", name: "Belleek Country House", town: "Belleeks" },
  { slug: "mulberry-tree-seaforde", name: "The Mulberry Tree", town: "Seaforde" },
  { slug: "ballymote-house", name: "Ballymote House", town: "Downpatrick" },
  { slug: "slieve-croob-camping", name: "Slieve Croob Camping", town: "Dromara" },
  { slug: "saintfield-nursery", name: "Saintfield Nursery Centre", town: "Saintfield" },
  { slug: "mourne-windows", name: "Mourne Windows & Doors", town: "Hilltown" },
  { slug: "digitech-repairs", name: "DigiTech Repairs", town: "Ballykinlar" },
  { slug: "the-rostrevor-inn", name: "The Rostrevor Inn", town: "Rostrevor" },
  { slug: "the-oaks-saintfield", name: "The Oaks", town: "Saintfield" },
  { slug: "kilmorey-arms-hotel", name: "Kilmorey Arms Hotel", town: "Kilkeel" },
  { slug: "the-bridge-bar-newry", name: "The Bridge Bar", town: "Newry" },
  { slug: "carrick-little-glamping", name: "Carrick Little Glamping", town: "Annalong" },
];

const srv = spawn("pnpm", ["preview", "--host", "127.0.0.1", "--port", String(PORT)], {
  stdio: ["ignore", "ignore", "pipe"],
});
srv.stderr.on("data", (d) => process.stderr.write(d));

const waitUp = async () => {
  for (let i = 0; i < 60; i++) {
    try {
      const r = await fetch(`${BASE}/concepts/mourne-windows/`);
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

  for (const c of CONCEPTS) {
    await page.goto(`${BASE}/concepts/${c.slug}/`, { waitUntil: "networkidle0" });
    await page.evaluate(({ name, town }) => {
      const banner = document.querySelector(".mm-concept-banner");
      if (banner) banner.style.display = "none";

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
      strip.innerHTML = `<span><strong>${name}</strong> · ${town}</span><span style="opacity:0.86">Independent website concept by Mourne Made</span>`;
      document.body.appendChild(strip);
    }, c);
    await new Promise((r) => setTimeout(r, 140));
    const dest = path.join(OUT_DIR, `${c.slug}.jpg`);
    await page.screenshot({ path: dest, type: "jpeg", quality: 86 });
    console.log(`OG card saved: public/media/og/${c.slug}.jpg`);
  }
} finally {
  if (browser) await browser.close();
  srv.kill("SIGTERM");
}
