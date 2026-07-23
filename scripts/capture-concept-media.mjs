// Captures the matched media set for a transformation comparison: a clean
// "before" and "after" opening-screen still, plus a ~10-second demo clip
// of each page being visited (hero hold, scroll, key hover interaction).
//
// Usage:
//   pnpm build && pnpm preview   (in another terminal, serves 127.0.0.1:4321)
//   node scripts/capture-concept-media.mjs <slug> [both|before|after] [both|video|still]
//   node scripts/capture-concept-media.mjs <slug> reel
//
// Arg 2 (target) picks which side(s) to capture; arg 3 (what) picks the medium.
// Use `video` to add demo clips without overwriting verified committed stills.
//
// Output:
//   public/images/<slug>-before.jpg / <slug>-after.jpg  (2530x1420, 2x stills)
//   public/videos/<slug>-before.mp4 / <slug>-after.mp4  (1264x710, H.264, ~10s)
//   public/videos/<slug>-reel.mp4                         (1920x1080, H.264, <80s)
//   public/images/<slug>-reel-poster.jpg                 (1920x1080)
//
// Consent, sign-up and auto-expanded chat overlays are dismissed before any
// capture — the comparison judges the page a business designed, not the legal
// chrome or widgets stacked on top of it. Policy, choreography and per-site
// notes: MEDIA_CAPTURE.md.

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { createRequire } from "node:module";
import puppeteer from "puppeteer-core";
import { findChrome } from "./lib/chrome.mjs";

const VIEW = { width: 1265, height: 710 };
const REEL_VIEW = { width: 1920, height: 1080 };
const REEL_TRANSITION_SECONDS = 0.45;

// Per-site capture plan. `dismiss` steps run before the generic overlay pass
// and accept either a CSS selector or exact visible text; `hide` selectors are
// removed with injected CSS when a widget cannot be dismissed by clicking.
// `beforeHover`/`afterHover` is the interaction shown near the end of the demo
// (a CSS selector or `text=Visible Label`, or an array tried in order; dropdown
// menus and primary CTAs read best). `scrollStops` are viewport-height
// multiples, clamped to the page's real scroll range; keep the demo ~10s.
//
// `before: null` marks a first-website concept: its only public presence is a
// gated social page (a Facebook login/cookie wall — see the *-before.jpg
// stills), which is neither meaningful nor permissible to auto-drive. These
// capture an AFTER demo only; the before stays the honest static still.
const AFTER_HOVER = [".button", "a.button", ".button-secondary", "nav a", "header a"];
const CONCEPTS = {
  "castle-farm": {
    before: "https://www.castlefarmni.com/",
    settleMs: 6000,
    beforeHover: ["text=SHOP", "nav a", "header a"],
    afterHover: AFTER_HOVER,
  },
  "hotel-enniskeen": {
    before: "https://www.enniskeenhotel.co.uk/",
    settleMs: 4000,
    beforeHover: "text=STAY WITH US",
    afterHover: AFTER_HOVER,
  },
  "mourne-cycles": {
    before: "https://www.mourne-cycles.co.uk/",
    settleMs: 6000,
    beforeHover: "text=SHOWROOM",
    afterHover: AFTER_HOVER,
  },
  "donard-veterinary": {
    before: "https://donardveterinaryclinic.co.uk/",
    settleMs: 5000,
    beforeHover: "text=Pet Services",
    afterHover: AFTER_HOVER,
    // The PetsApp chat panel auto-expands over the hero as a cross-origin
    // iframe with variable timing (styled-components hashes, no clickable
    // close from outside). Hide the widget by its stable iframe title; the
    // launcher bubble goes with it, which is the accepted last resort.
    hide: ['iframe[title="petsapp-chat"]'],
  },
  "bucks-head": {
    before: "https://thebucksheaddundrum.co.uk/",
    settleMs: 5000,
    beforeHover: "text=MENUS",
    afterHover: AFTER_HOVER,
  },
  // First-website concepts — after demo only (before is a gated social still).
  "scopers": { before: null, afterHover: AFTER_HOVER },
  "cupla": { before: null, afterHover: AFTER_HOVER },
  "tool-centre": { before: null, afterHover: AFTER_HOVER },
  "kent-amusements": { before: null, afterHover: AFTER_HOVER },
  "newcastle-chamber": { before: null, afterHover: AFTER_HOVER },
};

// A reel is a sequence of independently recorded segments. Browser segments
// use the same small vocabulary for every business; cards and split screens
// are assembled by the same ffmpeg pass. Leading `goto` steps prepare a clean,
// settled page before recording, so a slow network does not become part of
// the film. Later `goto` and `click` steps remain visible.
const REELS = {
  "hotel-enniskeen": {
    posterSegment: "after-home",
    segments: [
      {
        id: "open-card",
        type: "card",
        duration: 3,
        eyebrow: "Independent concept study",
        title: "Enniskeen Country House Hotel, Newcastle",
        detail: "By Mourne & Main · not commissioned by the hotel",
      },
      {
        id: "before-home",
        type: "browser",
        side: "before",
        caption: "The current visit opens on an archive-style house mark and a seven-item blue menu.",
        steps: [
          { action: "goto", url: "https://www.enniskeenhotel.co.uk/", settleMs: 4000 },
          { action: "hold", seconds: 3.2 },
          { action: "hover", target: "text=STAY WITH US", seconds: 2.2 },
        ],
      },
      {
        id: "before-rooms",
        type: "browser",
        side: "before",
        caption: "Finding the rooms means moving through the old navigation and long page.",
        steps: [
          { action: "goto", url: "https://www.enniskeenhotel.co.uk/Rooms.html", settleMs: 3500 },
          { action: "hold", seconds: 2.2 },
          { action: "scroll", to: 0.72, unit: "page", durationMs: 1100, seconds: 1.5 },
        ],
      },
      {
        id: "before-booking",
        type: "browser",
        side: "before",
        caption: "Booking leaves the hotel site for the existing Bookin1 engine.",
        steps: [
          { action: "goto", url: "https://www.enniskeenhotel.co.uk/", settleMs: 3500 },
          { action: "click", target: "text=BOOK NOW", seconds: 4.2, navigation: true },
        ],
      },
      {
        id: "turn-card",
        type: "card",
        duration: 3,
        eyebrow: "What changes",
        title: "The same hotel. Its own photographs. Its own booking engine.",
        detail: "A clearer route into the stay—without throwing away what already works.",
      },
      {
        id: "after-home",
        type: "browser",
        side: "after",
        caption: "The concept lets the Shimna Valley make the first impression.",
        steps: [
          { action: "goto", url: "/concepts/hotel-enniskeen/", settleMs: 1600 },
          { action: "hold", seconds: 4.3 },
          { action: "hover", target: ".enk-booking button", seconds: 1.2 },
        ],
      },
      {
        id: "after-booking",
        type: "browser",
        side: "after",
        caption: "Dates pass into the hotel's own Bookin1 results route.",
        steps: [
          { action: "goto", url: "/concepts/hotel-enniskeen/", settleMs: 1200 },
          { action: "click", target: ".enk-booking button", seconds: 5.2, navigation: true },
        ],
      },
      {
        id: "after-rooms",
        type: "browser",
        side: "after",
        caption: "Stay gives each published room detail its own place and photograph.",
        steps: [
          { action: "goto", url: "/concepts/hotel-enniskeen/rooms/", settleMs: 1200 },
          { action: "hold", seconds: 2 },
          { action: "scroll", to: 0.52, unit: "page", durationMs: 1000, seconds: 2 },
        ],
      },
      {
        id: "after-dine",
        type: "browser",
        side: "after",
        caption: "Dine brings the Oak Restaurant, Mourne Honey tea and Brandy Pad together.",
        steps: [
          { action: "goto", url: "/concepts/hotel-enniskeen/dine/", settleMs: 1200 },
          { action: "hold", seconds: 1.9 },
          { action: "scroll", to: 0.5, unit: "page", durationMs: 1000, seconds: 1.9 },
        ],
      },
      {
        id: "after-estate",
        type: "browser",
        side: "after",
        caption: "The estate page makes the twelve acres and Shimna trail part of the stay.",
        steps: [
          { action: "goto", url: "/concepts/hotel-enniskeen/estate/", settleMs: 1200 },
          { action: "hold", seconds: 1.9 },
          { action: "scroll", to: 0.48, unit: "page", durationMs: 1000, seconds: 1.9 },
        ],
      },
      {
        id: "after-things-to-do",
        type: "browser",
        side: "after",
        caption: "Things to do turns the Mournes, the coast and the hotel’s own trail into a day plan.",
        steps: [
          { action: "goto", url: "/concepts/hotel-enniskeen/things-to-do/", settleMs: 1200 },
          { action: "hold", seconds: 1.9 },
          { action: "scroll", to: 0.5, unit: "page", durationMs: 1000, seconds: 1.9 },
        ],
      },
      {
        id: "split-heroes",
        type: "split",
        duration: 4,
        caption: "Before and after: the same hotel, with a clearer opening story.",
        left: { type: "image", path: "/images/hotel-enniskeen-before.jpg" },
        right: { type: "image", path: "/images/hotel-enniskeen-after.jpg" },
      },
      {
        id: "split-booking",
        type: "split",
        duration: 4,
        caption: "Both routes keep Bookin1; the concept makes the handoff visible and direct.",
        left: { type: "segment", id: "before-booking" },
        right: { type: "segment", id: "after-booking" },
      },
      {
        id: "end-card",
        type: "card",
        duration: 4,
        eyebrow: "Independent concept · not commissioned",
        title: "See the complete case study",
        detail: "mourneandmain.co.uk/transformations/hotel-enniskeen/ · Free before-and-after for local businesses",
      },
    ],
  },
};

const slug = process.argv[2];
const only = process.argv[3] && process.argv[3] !== "both" ? process.argv[3] : null;
const what = process.argv[4] ?? "both"; // both | video | still
if (
  !CONCEPTS[slug]
  || !["before", "after", "reel", null].includes(only)
  || !["both", "video", "still"].includes(what)
  || (only === "reel" && !REELS[slug])
) {
  console.error(`Usage: node scripts/capture-concept-media.mjs <slug> [both|before|after|reel] [both|video|still]\nKnown slugs: ${Object.keys(CONCEPTS).join(", ")}`);
  process.exit(1);
}

const chromePath = findChrome();

const require = createRequire(import.meta.url);
const ffmpeg = require("ffmpeg-static");
// sharp is not hoisted by pnpm; resolve it from Astro's dependency store.
const pnpmDir = path.resolve(import.meta.dirname, "..", "node_modules", ".pnpm");
const sharpDir = fs.readdirSync(pnpmDir).find((d) => d.startsWith("sharp@"));
const sharp = require(path.join(pnpmDir, sharpDir, "node_modules", "sharp"));

const imageDir = path.resolve(import.meta.dirname, "..", "public", "images");
const videoDir = path.resolve(import.meta.dirname, "..", "public", "videos");
fs.mkdirSync(videoDir, { recursive: true });
const previewBase = "http://127.0.0.1:4321";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ---------------------------------------------------------------------------
// Overlay dismissal
// ---------------------------------------------------------------------------

// Known consent-manager accept/close controls, tried before text matching.
const CMP_SELECTORS = [
  "#onetrust-accept-btn-handler",
  ".cc-dismiss", ".cc-allow", ".cc-btn.cc-dismiss",
  ".cky-btn-accept", ".cmplz-accept", "#hs-eu-confirmation-button",
  "#cookie_action_close_header", "#rcc-confirm-button",
  '[aria-label="dismiss cookie message"]',
];

// Visible-text candidates in priority order: refuse marketing/tracking where a
// refusal is offered, otherwise accept, otherwise close the surface.
const TEXT_TIERS = [
  ["decline", "reject all", "reject", "necessary only", "no thanks", "not now", "maybe later"],
  ["accept all", "accept", "allow all", "i consent", "i agree", "agree", "got it", "ok"],
  ["close", "dismiss", "×", "✕", "x"],
];

// Clicks one overlay control in this frame; returns a description or null.
// Runs in page context: candidates must sit inside an overlay-like ancestor
// (fixed/sticky, dialog, or cookie/newsletter-ish class) so page content and
// navigation are never clicked by mistake.
async function clickOverlayControl(frame, tiers) {
  return frame.evaluate((tiersIn) => {
    const overlayish = (el) => {
      for (let n = el; n && n !== document.body; n = n.parentElement) {
        const cs = getComputedStyle(n);
        if (cs.position === "fixed" || cs.position === "sticky") return true;
        if (n.getAttribute("role") === "dialog" || n.hasAttribute("aria-modal")) return true;
        if (/(cookie|consent|gdpr|privacy|popup|pop-up|lightbox|modal|overlay|newsletter|signup|sign-up|subscribe)/i
          .test(`${n.className} ${n.id}`)) return true;
      }
      return false;
    };
    const visible = (el) => {
      const r = el.getBoundingClientRect();
      if (r.width < 8 || r.height < 8) return false;
      if (r.bottom < 0 || r.top > innerHeight || r.right < 0 || r.left > innerWidth) return false;
      const cs = getComputedStyle(el);
      return cs.visibility !== "hidden" && cs.display !== "none" && Number(cs.opacity) > 0.05;
    };
    const controls = [...document.querySelectorAll('button, a, [role="button"], input[type="button"], input[type="submit"]')];
    for (const tier of tiersIn) {
      for (const el of controls) {
        if (!visible(el) || !overlayish(el)) continue;
        const label = (el.innerText || el.value || el.getAttribute("aria-label") || "").trim().toLowerCase();
        if (tier.includes(label)) {
          el.click();
          return `clicked "${label}"`;
        }
      }
      // aria-labelled close icons ("Close", "Close dialog", Wix "Close pop-up")
      if (tier.includes("close")) {
        for (const el of controls) {
          if (!visible(el) || !overlayish(el)) continue;
          const aria = (el.getAttribute("aria-label") || "").toLowerCase();
          if (aria.startsWith("close") || aria.startsWith("dismiss")) {
            el.click();
            return `clicked aria "${aria}"`;
          }
        }
      }
    }
    return null;
  }, tiers);
}

async function dismissOverlays(page, site) {
  const actions = [];
  // Coordinate clicks for close controls that live in a cross-origin iframe
  // or shadow DOM and cannot be resolved by selector or text.
  for (const [x, y] of site.dismissClick ?? []) {
    try {
      await page.mouse.click(x, y);
      actions.push(`clicked (${x},${y})`);
      await sleep(700);
    } catch { /* nothing there this run */ }
  }
  for (const step of site.dismiss ?? []) {
    try {
      if (step.startsWith("text=")) {
        const wanted = step.slice(5).toLowerCase();
        const did = await clickOverlayControl(page.mainFrame(), [[wanted]]);
        if (did) actions.push(did);
      } else if (await page.$(step)) {
        await page.click(step);
        actions.push(`clicked ${step}`);
      }
      await sleep(700);
    } catch { /* overlay may already be gone */ }
  }
  for (let pass = 0; pass < 4; pass++) {
    let did = null;
    for (const frame of page.frames()) {
      for (const sel of CMP_SELECTORS) {
        try {
          const el = await frame.$(sel);
          if (el) { await el.evaluate((n) => n.click()); did = `clicked ${sel}`; break; }
        } catch { /* cross-origin or detached frame */ }
      }
      if (did) break;
      try { did = await clickOverlayControl(frame, TEXT_TIERS); } catch { /* ignore */ }
      if (did) break;
    }
    if (!did) break;
    actions.push(did);
    await sleep(900);
  }
  for (const sel of site.hide ?? []) {
    await page.evaluate((s) => {
      const style = document.createElement("style");
      style.textContent = `${s} { display: none !important; }`;
      document.head.append(style);
    }, sel);
    actions.push(`hid ${sel}`);
  }
  console.log(`  overlays: ${actions.length ? actions.join("; ") : "none found"}`);
}

// ---------------------------------------------------------------------------
// Demo choreography — keep total inside 9.5–10.5s (see MEDIA_CAPTURE.md)
// ---------------------------------------------------------------------------

async function animScroll(page, top, ms) {
  await page.evaluate(({ top: t, ms: m }) => new Promise((res) => {
    const el = document.scrollingElement || document.documentElement;
    const max = el.scrollHeight - innerHeight;
    const target = Math.max(0, Math.min(t, max));
    const start = window.scrollY;
    const t0 = performance.now();
    const ease = (p) => (p < 0.5 ? 4 * p * p * p : 1 - (-2 * p + 2) ** 3 / 2);
    const step = (now) => {
      const p = Math.min(1, (now - t0) / m);
      window.scrollTo(0, start + (target - start) * ease(p));
      p < 1 ? requestAnimationFrame(step) : res();
    };
    requestAnimationFrame(step);
  }), { top, ms });
}

async function hoverTarget(page, spec) {
  if (!spec) return false;
  // Accept a single spec or an ordered list; hover the first that resolves.
  for (const one of [spec].flat()) {
    const wanted = one.startsWith("text=") ? one.slice(5).toLowerCase() : null;
    const point = await page.evaluate(({ sel, text }) => {
      const visible = (el) => {
        const r = el.getBoundingClientRect();
        return r.width > 8 && r.height > 8 && r.top >= 0 && r.bottom <= innerHeight && r.left >= 0;
      };
      const pool = text
        ? [...document.querySelectorAll("a, button, [role='button'], li, span")]
          .filter((el) => (el.innerText || "").trim().toLowerCase() === text)
        : [...document.querySelectorAll(sel)];
      const el = pool.find(visible);
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
    }, { sel: wanted ? "" : one, text: wanted });
    if (point) {
      await page.mouse.move(point.x, point.y, { steps: 14 });
      return true;
    }
  }
  return false;
}

const DEMO_MS = 10000;

async function runDemoScript(page, hoverSpec, scrollStops) {
  const started = Date.now();
  // Clamp the scripted stops to what the page can actually scroll and drop
  // stops that collapse together — concept opening screens are short, and a
  // no-op scroll reads as dead air in the clip.
  const maxScroll = await page.evaluate(
    () => (document.scrollingElement || document.documentElement).scrollHeight - innerHeight,
  );
  const targets = (scrollStops ?? [0.85, 1.7])
    .map((stop) => Math.min(Math.round(stop * VIEW.height), maxScroll))
    .filter((top, i, all) => top > 60 && all.indexOf(top) === i);

  await sleep(2000); // hero hold: carousels and entrance animations play
  for (const top of targets) {
    await animScroll(page, top, 700);
    await sleep(1450);
  }
  if (targets.length) {
    await animScroll(page, 0, 900);
    await sleep(500);
  }
  if (await hoverTarget(page, hoverSpec)) await sleep(1600);
  await page.mouse.move(VIEW.width / 2, VIEW.height * 0.7, { steps: 10 });
  // Pad short pages (single-screen concepts with no scroll) out to a
  // consistent ~10s on a held final frame.
  await sleep(Math.min(6800, Math.max(500, DEMO_MS - (Date.now() - started))));
}

// ---------------------------------------------------------------------------
// Recording
// ---------------------------------------------------------------------------

async function recordDemo(page, outName, hoverSpec, scrollStops) {
  const frameDir = fs.mkdtempSync(path.join(os.tmpdir(), `demo-${outName}-`));
  const frames = [];
  const cdp = await page.createCDPSession();
  cdp.on("Page.screencastFrame", (ev) => {
    const file = path.join(frameDir, `f-${String(frames.length).padStart(5, "0")}.jpg`);
    fs.writeFileSync(file, Buffer.from(ev.data, "base64"));
    frames.push({ file, ts: ev.metadata.timestamp ?? Date.now() / 1000 });
    cdp.send("Page.screencastFrameAck", { sessionId: ev.sessionId }).catch(() => {});
  });
  await cdp.send("Page.startScreencast", { format: "jpeg", quality: 85, maxWidth: 1280, maxHeight: 720, everyNthFrame: 1 });
  const t0 = Date.now();
  await runDemoScript(page, hoverSpec, scrollStops);
  const wallSeconds = (Date.now() - t0) / 1000;
  const endTs = Date.now() / 1000;
  await cdp.send("Page.stopScreencast");
  await cdp.detach();
  if (frames.length < 10) throw new Error(`only ${frames.length} screencast frames captured`);

  // concat demuxer: real per-frame durations preserve the pacing of holds.
  // Screencast frames arrive only on visual change, so a static closing hold
  // exists solely as the last frame's duration — measure it from the wall
  // clock (frame timestamps and Date.now() share the epoch).
  const lines = ["ffconcat version 1.0"];
  for (let i = 0; i < frames.length; i++) {
    const next = i + 1 < frames.length ? frames[i + 1].ts : Math.min(endTs, frames[i].ts + 7.5);
    lines.push(`file '${frames[i].file.replaceAll("\\", "/")}'`);
    lines.push(`duration ${Math.max(0.016, next - frames[i].ts).toFixed(4)}`);
  }
  lines.push(`file '${frames.at(-1).file.replaceAll("\\", "/")}'`);
  const listFile = path.join(frameDir, "list.txt");
  fs.writeFileSync(listFile, lines.join("\n"));

  const out = path.join(videoDir, `${outName}.mp4`);
  execFileSync(ffmpeg, [
    "-y", "-f", "concat", "-safe", "0", "-i", listFile,
    "-vf", "crop=trunc(iw/2)*2:trunc(ih/2)*2,fps=30",
    "-c:v", "libx264", "-crf", "22", "-preset", "medium",
    "-pix_fmt", "yuv420p", "-movflags", "+faststart", "-an",
    out,
  ], { stdio: "pipe" });
  fs.rmSync(frameDir, { recursive: true, force: true });
  const kb = Math.round(fs.statSync(out).size / 1024);
  console.log(`  ${outName}.mp4 — ${kb} KB, ${frames.length} frames over ${wallSeconds.toFixed(1)}s`);
}

async function captureStill(page, outName) {
  const png = await page.screenshot({ type: "png" });
  const out = path.join(imageDir, `${outName}.jpg`);
  await sharp(png).jpeg({ quality: 82, mozjpeg: true }).toFile(out);
  const kb = Math.round(fs.statSync(out).size / 1024);
  console.log(`  ${outName}.jpg — ${kb} KB`);
}

async function captureTarget(browser, site, url, outName, hoverSpec) {
  console.log(`${outName} <- ${url}`);
  const page = await browser.newPage();
  await page.setViewport({ ...VIEW, deviceScaleFactor: 2 });
  await page.goto(url, { waitUntil: "networkidle2", timeout: 90000 });
  await sleep(site.settleMs ?? 4000);
  await dismissOverlays(page, site);
  await sleep(800);
  if (what !== "video") await captureStill(page, outName);
  if (what !== "still") {
    await page.setViewport({ ...VIEW, deviceScaleFactor: 1 });
    await animScroll(page, 0, 200);
    await sleep(700);
    await recordDemo(page, outName, hoverSpec, site.scrollStops);
  }
  await page.close();
}

// ---------------------------------------------------------------------------
// Flagship reel
// ---------------------------------------------------------------------------

const rootDir = path.resolve(import.meta.dirname, "..");
const reelFontFiles = {
  display: path.join(
    rootDir,
    "node_modules",
    "@fontsource-variable",
    "antonio",
    "files",
    "antonio-latin-wght-normal.woff2",
  ),
  body: path.join(
    rootDir,
    "node_modules",
    "@fontsource-variable",
    "atkinson-hyperlegible-next",
    "files",
    "atkinson-hyperlegible-next-latin-wght-normal.woff2",
  ),
};

const toDataUrl = (file) =>
  `data:font/woff2;base64,${fs.readFileSync(file).toString("base64")}`;
const reelFonts = {
  display: toDataUrl(reelFontFiles.display),
  body: toDataUrl(reelFontFiles.body),
};

const escapeHtml = (value) => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;");

const reelFontCss = `
  @font-face {
    font-family: "Antonio Reel";
    src: url("${reelFonts.display}") format("woff2");
    font-style: normal;
    font-weight: 100 700;
  }
  @font-face {
    font-family: "Atkinson Reel";
    src: url("${reelFonts.body}") format("woff2");
    font-style: normal;
    font-weight: 200 800;
  }
`;

async function renderHtmlFrame(browser, html, out, { transparent = false } = {}) {
  const page = await browser.newPage();
  await page.setViewport({ ...REEL_VIEW, deviceScaleFactor: 1 });
  await page.setContent(html, { waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({
    path: out,
    type: "png",
    omitBackground: transparent,
  });
  await page.close();
}

async function renderCardFrame(browser, segment, out) {
  const html = `<!doctype html>
    <html lang="en"><head><meta charset="utf-8"><style>
      ${reelFontCss}
      * { box-sizing: border-box; }
      html, body { width: 1920px; height: 1080px; margin: 0; overflow: hidden; }
      body {
        display: grid;
        place-items: center;
        background:
          linear-gradient(135deg, rgba(35,72,90,.34), transparent 44%),
          #132029;
        color: #f4f8fa;
        font-family: "Atkinson Reel", "Segoe UI", sans-serif;
      }
      body::before, body::after {
        content: "";
        position: fixed;
        height: 3px;
        background: #e0c14d;
      }
      body::before { width: 420px; left: 0; top: 104px; }
      body::after { width: 620px; right: 0; bottom: 104px; }
      main { width: 1500px; }
      .mark {
        display: flex;
        align-items: center;
        gap: 18px;
        margin: 0 0 52px;
        color: #e0c14d;
        font-size: 25px;
        font-weight: 700;
        letter-spacing: .12em;
        text-transform: uppercase;
      }
      .mark::before { content: ""; width: 50px; height: 5px; background: currentColor; }
      h1 {
        max-width: 1450px;
        margin: 0;
        font-family: "Antonio Reel", "Arial Narrow", sans-serif;
        font-size: 132px;
        font-weight: 600;
        letter-spacing: -.025em;
        line-height: .96;
      }
      .detail {
        max-width: 1280px;
        margin: 56px 0 0;
        color: #c9d9e1;
        font-size: 34px;
        line-height: 1.35;
      }
      .wordmark {
        position: fixed;
        right: 90px;
        top: 72px;
        color: #fff;
        font-family: "Antonio Reel", "Arial Narrow", sans-serif;
        font-size: 30px;
        font-weight: 650;
        letter-spacing: -.015em;
        text-transform: uppercase;
      }
      .wordmark span { color: #e0c14d; }
    </style></head><body>
      <div class="wordmark">Mourne <span>&amp;</span> Main</div>
      <main>
        <p class="mark">${escapeHtml(segment.eyebrow)}</p>
        <h1>${escapeHtml(segment.title)}</h1>
        <p class="detail">${escapeHtml(segment.detail)}</p>
      </main>
    </body></html>`;
  await renderHtmlFrame(browser, html, out);
}

async function renderCaptionFrame(browser, segment, out) {
  const split = segment.type === "split";
  const side = segment.side
    ? segment.side[0].toUpperCase() + segment.side.slice(1)
    : "Before / After";
  const html = `<!doctype html>
    <html lang="en"><head><meta charset="utf-8"><style>
      ${reelFontCss}
      * { box-sizing: border-box; }
      html, body { width: 1920px; height: 1080px; margin: 0; overflow: hidden; background: transparent; }
      body { font-family: "Atkinson Reel", "Segoe UI", sans-serif; color: #f4f8fa; }
      .caption {
        position: absolute;
        left: 130px;
        right: 130px;
        bottom: 0;
        height: 126px;
        display: flex;
        align-items: center;
        gap: 24px;
      }
      .label {
        flex: 0 0 auto;
        padding: 8px 13px 7px;
        border: 1px solid ${split ? "#e0c14d" : segment.side === "after" ? "#9bc5d9" : "#c9d9e1"};
        color: ${split ? "#e0c14d" : segment.side === "after" ? "#b9dbea" : "#f4f8fa"};
        font-size: 18px;
        font-weight: 760;
        letter-spacing: .1em;
        line-height: 1;
        text-transform: uppercase;
      }
      p { margin: 0; font-size: 36px; font-weight: 520; line-height: 1.12; }
      .split-labels {
        position: absolute;
        top: 36px;
        left: 130px;
        right: 130px;
        display: ${split ? "flex" : "none"};
        justify-content: space-between;
        pointer-events: none;
      }
      .split-labels span {
        padding: 7px 12px;
        background: rgba(19,32,41,.88);
        color: #fff;
        font-size: 18px;
        font-weight: 760;
        letter-spacing: .1em;
        text-transform: uppercase;
      }
    </style></head><body>
      <div class="split-labels"><span>Before</span><span>After</span></div>
      <div class="caption">
        <span class="label">${escapeHtml(side)}</span>
        <p>${escapeHtml(segment.caption)}</p>
      </div>
    </body></html>`;
  await renderHtmlFrame(browser, html, out, { transparent: true });
}

function writeFrameConcat(frameDir, frames, endTs) {
  const lines = ["ffconcat version 1.0"];
  for (let i = 0; i < frames.length; i++) {
    const next = i + 1 < frames.length
      ? frames[i + 1].ts
      : Math.max(endTs, frames[i].ts + 0.05);
    lines.push(`file '${frames[i].file.replaceAll("\\", "/")}'`);
    lines.push(`duration ${Math.max(0.016, next - frames[i].ts).toFixed(4)}`);
  }
  lines.push(`file '${frames.at(-1).file.replaceAll("\\", "/")}'`);
  const listFile = path.join(frameDir, "frames.ffconcat");
  fs.writeFileSync(listFile, lines.join("\n"));
  return listFile;
}

async function recordReelFrames(page, segment, workDir, runSteps) {
  const frameDir = path.join(workDir, `frames-${segment.id}`);
  fs.mkdirSync(frameDir);
  const frames = [];
  const cdp = await page.createCDPSession();
  cdp.on("Page.screencastFrame", (event) => {
    const file = path.join(frameDir, `f-${String(frames.length).padStart(6, "0")}.jpg`);
    fs.writeFileSync(file, Buffer.from(event.data, "base64"));
    frames.push({ file, ts: event.metadata.timestamp ?? Date.now() / 1000 });
    cdp.send("Page.screencastFrameAck", { sessionId: event.sessionId }).catch(() => {});
  });
  await cdp.send("Page.startScreencast", {
    format: "jpeg",
    quality: 90,
    maxWidth: REEL_VIEW.width,
    maxHeight: REEL_VIEW.height,
    everyNthFrame: 1,
  });
  const started = Date.now();
  await runSteps();
  await sleep(180);
  const endTs = Date.now() / 1000;
  await cdp.send("Page.stopScreencast");
  await cdp.detach();
  if (!frames.length) throw new Error(`${segment.id}: Chrome emitted no screencast frames`);
  return {
    frameDir,
    frames,
    endTs,
    seconds: Math.max(0.1, (Date.now() - started) / 1000),
  };
}

function targetPoint(page, spec) {
  return page.evaluate((target) => {
    const visible = (element) => {
      const rect = element.getBoundingClientRect();
      const style = getComputedStyle(element);
      return rect.width > 8
        && rect.height > 8
        && rect.bottom > 0
        && rect.top < innerHeight
        && rect.right > 0
        && rect.left < innerWidth
        && style.display !== "none"
        && style.visibility !== "hidden";
    };
    const text = target.startsWith("text=") ? target.slice(5).trim().toLowerCase() : null;
    const candidates = text
      ? [...document.querySelectorAll("a, button, [role='button'], input[type='submit']")]
        .filter((element) => {
          const label = (element.innerText || element.value || element.getAttribute("aria-label") || "")
            .trim()
            .toLowerCase();
          return label === text || label.includes(text);
        })
      : [...document.querySelectorAll(target)];
    const element = candidates.find(visible);
    if (!element) return null;
    if (element instanceof HTMLAnchorElement) element.removeAttribute("target");
    const rect = element.getBoundingClientRect();
    return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
  }, spec);
}

async function clickTarget(page, spec, expectsNavigation) {
  const point = await targetPoint(page, spec);
  if (!point) return false;
  const navigation = expectsNavigation
    ? page.waitForNavigation({ waitUntil: "domcontentloaded", timeout: 25000 }).catch(() => null)
    : Promise.resolve(null);
  await page.mouse.click(point.x, point.y);
  if (expectsNavigation) await Promise.race([navigation, sleep(25000)]);
  return true;
}

const reelUrl = (value) =>
  value.startsWith("/") ? `${previewBase}${value}` : value;

async function reelGoto(page, value, settleMs, site) {
  const url = reelUrl(value);
  await page.goto(url, { waitUntil: "networkidle2", timeout: 90000 });
  await sleep(settleMs ?? 1200);
  await dismissOverlays(page, site);
  await sleep(300);
}

async function runReelStep(page, step, site, segmentId) {
  if (step.action === "hold") {
    await sleep(step.seconds * 1000);
    return;
  }
  if (step.action === "scroll") {
    const max = await page.evaluate(
      () => Math.max(0, (document.scrollingElement || document.documentElement).scrollHeight - innerHeight),
    );
    const top = step.unit === "page" ? max * step.to : REEL_VIEW.height * step.to;
    await animScroll(page, top, step.durationMs ?? 900);
    await sleep((step.seconds ?? 0.8) * 1000);
    return;
  }
  if (step.action === "hover") {
    if (!(await hoverTarget(page, step.target))) {
      throw new Error(`${segmentId}: hover target not found: ${step.target}`);
    }
    await sleep((step.seconds ?? 1) * 1000);
    return;
  }
  if (step.action === "click") {
    if (!(await clickTarget(page, step.target, step.navigation))) {
      throw new Error(`${segmentId}: click target not found: ${step.target}`);
    }
    await sleep((step.seconds ?? 1) * 1000);
    return;
  }
  if (step.action === "goto") {
    await reelGoto(page, step.url, step.settleMs, site);
    return;
  }
  throw new Error(`${segmentId}: unsupported action ${step.action}`);
}

async function encodeBrowserSegment(browser, page, segment, workDir, site) {
  const steps = [...segment.steps];
  if (steps[0]?.action !== "goto") {
    throw new Error(`${segment.id}: browser segments must begin with goto`);
  }
  const prepare = steps.shift();
  await reelGoto(page, prepare.url, prepare.settleMs, site);
  const capture = await recordReelFrames(
    page,
    segment,
    workDir,
    async () => {
      for (const step of steps) await runReelStep(page, step, site, segment.id);
    },
  );
  const raw = path.join(workDir, `${segment.id}-raw.mp4`);
  execFileSync(ffmpeg, [
    "-y", "-f", "concat", "-safe", "0",
    "-i", writeFrameConcat(capture.frameDir, capture.frames, capture.endTs),
    "-vf", "scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,fps=30",
    "-c:v", "libx264", "-crf", "20", "-preset", "medium",
    "-pix_fmt", "yuv420p", "-an", raw,
  ], { stdio: "pipe" });

  const overlay = path.join(workDir, `${segment.id}-caption.png`);
  await renderCaptionFrame(browser, segment, overlay);
  const output = path.join(workDir, `${segment.id}.mp4`);
  execFileSync(ffmpeg, [
    "-y", "-i", raw, "-i", overlay,
    "-filter_complex",
    "[0:v]scale=1660:934:force_original_aspect_ratio=decrease,"
      + "pad=1660:934:(ow-iw)/2:(oh-ih)/2:color=white,"
      + "pad=1920:1080:130:20:color=#132029[framed];"
      + "[framed][1:v]overlay=0:0:format=auto,format=yuv420p[v]",
    "-map", "[v]", "-c:v", "libx264", "-crf", "20", "-preset", "medium",
    "-pix_fmt", "yuv420p", "-an", output,
  ], { stdio: "pipe" });
  console.log(`  ${segment.id} — ${capture.seconds.toFixed(1)}s, ${capture.frames.length} frames`);
  return { id: segment.id, path: output, seconds: capture.seconds };
}

async function encodeCardSegment(browser, segment, workDir) {
  const frame = path.join(workDir, `${segment.id}.png`);
  const output = path.join(workDir, `${segment.id}.mp4`);
  await renderCardFrame(browser, segment, frame);
  execFileSync(ffmpeg, [
    "-y", "-loop", "1", "-framerate", "30", "-i", frame,
    "-t", String(segment.duration), "-vf", "format=yuv420p",
    "-c:v", "libx264", "-crf", "18", "-preset", "medium",
    "-pix_fmt", "yuv420p", "-an", output,
  ], { stdio: "pipe" });
  console.log(`  ${segment.id} — ${segment.duration.toFixed(1)}s`);
  return { id: segment.id, path: output, seconds: segment.duration };
}

function resolveSplitInput(input, completed) {
  if (input.type === "segment") {
    const segment = completed.find((item) => item.id === input.id);
    if (!segment) throw new Error(`split source segment not found: ${input.id}`);
    return { ...input, path: segment.path };
  }
  if (input.type === "image") {
    return {
      ...input,
      path: path.join(rootDir, "public", input.path.replace(/^[/\\]+/, "")),
    };
  }
  throw new Error(`unsupported split input: ${input.type}`);
}

async function encodeSplitSegment(browser, segment, completed, workDir) {
  const left = resolveSplitInput(segment.left, completed);
  const right = resolveSplitInput(segment.right, completed);
  const overlay = path.join(workDir, `${segment.id}-caption.png`);
  const output = path.join(workDir, `${segment.id}.mp4`);
  await renderCaptionFrame(browser, segment, overlay);
  const args = ["-y"];
  for (const input of [left, right]) {
    if (input.type === "image") {
      args.push("-loop", "1", "-framerate", "30", "-t", String(segment.duration), "-i", input.path);
    } else {
      args.push("-i", input.path);
    }
  }
  args.push(
    "-i", overlay,
    "-filter_complex",
    "[0:v]scale=960:1080:force_original_aspect_ratio=increase,crop=960:1080[left];"
      + "[1:v]scale=960:1080:force_original_aspect_ratio=increase,crop=960:1080[right];"
      + "[left][right]hstack=inputs=2,"
      + "scale=1660:934:force_original_aspect_ratio=decrease,"
      + "pad=1660:934:(ow-iw)/2:(oh-ih)/2:color=white,"
      + "pad=1920:1080:130:20:color=#132029[framed];"
      + "[framed][2:v]overlay=0:0:format=auto,format=yuv420p[v]",
    "-map", "[v]", "-t", String(segment.duration),
    "-c:v", "libx264", "-crf", "20", "-preset", "medium",
    "-pix_fmt", "yuv420p", "-an", output,
  );
  execFileSync(ffmpeg, args, { stdio: "pipe" });
  console.log(`  ${segment.id} — ${segment.duration.toFixed(1)}s`);
  return { id: segment.id, path: output, seconds: segment.duration };
}

function validateReel(reel) {
  const ids = new Set();
  const actions = new Set(["goto", "hold", "scroll", "hover", "click"]);
  for (const segment of reel.segments) {
    if (!segment.id || ids.has(segment.id)) throw new Error(`invalid or duplicate reel segment id: ${segment.id}`);
    ids.add(segment.id);
    if (!["card", "browser", "split"].includes(segment.type)) {
      throw new Error(`${segment.id}: unsupported segment type ${segment.type}`);
    }
    for (const step of segment.steps ?? []) {
      if (!actions.has(step.action)) throw new Error(`${segment.id}: unsupported action ${step.action}`);
    }
  }
  if (!ids.has(reel.posterSegment)) throw new Error(`poster segment not found: ${reel.posterSegment}`);
}

function assembleReel(segments, out) {
  const args = ["-y"];
  for (const segment of segments) args.push("-i", segment.path);
  const filters = [];
  let previous = "[0:v]";
  let elapsed = segments[0].seconds;
  for (let index = 1; index < segments.length; index++) {
    const next = `[xf${index}]`;
    const offset = Math.max(0, elapsed - REEL_TRANSITION_SECONDS);
    filters.push(
      `${previous}[${index}:v]xfade=transition=fade:duration=${REEL_TRANSITION_SECONDS}`
      + `:offset=${offset.toFixed(3)}${next}`,
    );
    previous = next;
    elapsed += segments[index].seconds - REEL_TRANSITION_SECONDS;
  }
  filters.push(`${previous}fps=30,format=yuv420p[final]`);
  execFileSync(ffmpeg, [
    ...args,
    "-filter_complex", filters.join(";"),
    "-map", "[final]",
    "-c:v", "libx264", "-crf", "24", "-preset", "slow",
    "-maxrate", "1400k", "-bufsize", "2800k",
    "-pix_fmt", "yuv420p", "-movflags", "+faststart", "-an", out,
  ], { stdio: "pipe" });
  return elapsed;
}

async function captureReel(browser, reelSlug, site) {
  const reel = REELS[reelSlug];
  validateReel(reel);
  const workDir = fs.mkdtempSync(path.join(os.tmpdir(), `reel-${reelSlug}-`));
  const completed = [];
  console.log(`${reelSlug}-reel: ${reel.segments.length} segments`);
  try {
    for (const segment of reel.segments) {
      if (segment.type === "card") {
        completed.push(await encodeCardSegment(browser, segment, workDir));
      } else if (segment.type === "split") {
        completed.push(await encodeSplitSegment(browser, segment, completed, workDir));
      } else {
        const page = await browser.newPage();
        await page.setViewport({ ...REEL_VIEW, deviceScaleFactor: 1 });
        try {
          completed.push(await encodeBrowserSegment(browser, page, segment, workDir, site));
        } finally {
          await page.close();
        }
      }
    }
    const out = path.join(videoDir, `${reelSlug}-reel.mp4`);
    const seconds = assembleReel(completed, out);
    const posterSource = completed.find((segment) => segment.id === reel.posterSegment);
    const poster = path.join(imageDir, `${reelSlug}-reel-poster.jpg`);
    execFileSync(ffmpeg, [
      "-y", "-ss", "1", "-i", posterSource.path,
      "-frames:v", "1", "-q:v", "2", poster,
    ], { stdio: "pipe" });
    const mb = fs.statSync(out).size / (1024 * 1024);
    console.log(`  ${path.basename(out)} — ${seconds.toFixed(1)}s, ${mb.toFixed(2)} MB`);
    console.log(`  ${path.basename(poster)} — ${Math.round(fs.statSync(poster).size / 1024)} KB`);
    if (seconds >= 80) throw new Error(`reel is ${seconds.toFixed(1)}s; target is under 80s`);
    if (mb > 12) throw new Error(`reel is ${mb.toFixed(2)} MB; target is at most 12 MB`);
  } finally {
    fs.rmSync(workDir, { recursive: true, force: true });
  }
}

const site = CONCEPTS[slug];
const conceptUrl = `${previewBase}/concepts/${slug}/`;
if (only !== "before") {
  const alive = await fetch(conceptUrl).then((r) => r.ok).catch(() => false);
  if (!alive) throw new Error(`${conceptUrl} is not serving. Run: pnpm build && pnpm preview`);
}

const browser = await puppeteer.launch({
  executablePath: chromePath,
  headless: "new",
  args: ["--hide-scrollbars", "--mute-audio", "--force-color-profile=srgb", "--disable-gpu"],
});
try {
  if (only === "reel") {
    await captureReel(browser, slug, site);
  } else if (only !== "after") {
    if (site.before) await captureTarget(browser, site, site.before, `${slug}-before`, site.beforeHover);
    else console.log(`${slug}-before: skipped (first-website concept — no live site to demo)`);
  }
  if (only !== "reel" && only !== "before") {
    await captureTarget(browser, site, conceptUrl, `${slug}-after`, site.afterHover);
  }
} finally {
  await browser.close();
}
