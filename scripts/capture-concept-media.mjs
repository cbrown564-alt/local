// Captures the matched media set for a transformation comparison: a clean
// "current" and "concept" opening-screen still, plus a ~10-second demo clip
// of each page being visited (hero hold, scroll, key hover interaction).
//
// Usage:
//   pnpm build && pnpm preview   (in another terminal, serves 127.0.0.1:4321)
//   node scripts/capture-concept-media.mjs <slug> [current|concept]
//
// Output:
//   public/images/<slug>-current.jpg / <slug>-concept.jpg  (2530x1420, 2x stills)
//   public/videos/<slug>-current.mp4 / <slug>-concept.mp4  (1264x710, H.264, ~10s)
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

const VIEW = { width: 1265, height: 710 };

// Per-site capture plan. `dismiss` steps run before the generic overlay pass
// and accept either a CSS selector or exact visible text; `hide` selectors are
// removed with injected CSS when a widget cannot be dismissed by clicking.
// `hover` is the interaction shown near the end of the demo (dropdown menus
// and primary calls-to-action read best). `scrollStops` are viewport-height
// multiples; keep the demo inside 9.5–10.5 seconds.
const CONCEPTS = {
  "castle-farm": {
    current: "https://www.castlefarmni.com/",
    settleMs: 6000,
    currentHover: "nav a, header a",
    conceptHover: ".button, a.button",
  },
  "hotel-enniskeen": {
    current: "https://www.enniskeenhotel.co.uk/",
    settleMs: 4000,
    currentHover: "text=STAY WITH US",
    conceptHover: ".button, a.button",
  },
  "mourne-cycles": {
    current: "https://www.mourne-cycles.co.uk/",
    settleMs: 6000,
    currentHover: "text=SHOWROOM",
    conceptHover: ".button, a.button",
  },
  "donard-veterinary": {
    current: "https://donardveterinaryclinic.co.uk/",
    settleMs: 5000,
    currentHover: "text=Pet Services",
    conceptHover: ".button, a.button",
  },
  "bucks-head": {
    current: "https://thebucksheaddundrum.co.uk/",
    settleMs: 5000,
    currentHover: "text=MENUS",
    conceptHover: ".button, a.button",
  },
};

const slug = process.argv[2];
const only = process.argv[3];
if (!CONCEPTS[slug]) {
  console.error(`Usage: node scripts/capture-concept-media.mjs <slug> [current|concept]\nKnown slugs: ${Object.keys(CONCEPTS).join(", ")}`);
  process.exit(1);
}

const chromePath = [
  process.env.CHROME_PATH,
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  "/usr/bin/google-chrome",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
].find((p) => p && fs.existsSync(p));
if (!chromePath) throw new Error("Chrome not found; set CHROME_PATH");

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
  const wanted = spec.startsWith("text=") ? spec.slice(5).toLowerCase() : null;
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
  }, { sel: wanted ? "" : spec, text: wanted });
  if (!point) return false;
  await page.mouse.move(point.x, point.y, { steps: 14 });
  return true;
}

async function runDemoScript(page, hoverSpec, scrollStops) {
  const stops = scrollStops ?? [0.85, 1.7];
  await sleep(2200); // hero hold: carousels and entrance animations play
  for (const stop of stops) {
    await animScroll(page, Math.round(stop * VIEW.height), 700);
    await sleep(1600);
  }
  await animScroll(page, 0, 900);
  await sleep(500);
  const hovered = await hoverTarget(page, hoverSpec);
  await sleep(hovered ? 1700 : 1100);
  await page.mouse.move(VIEW.width / 2, VIEW.height * 0.7, { steps: 10 });
  await sleep(600);
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
  await cdp.send("Page.stopScreencast");
  await cdp.detach();
  if (frames.length < 10) throw new Error(`only ${frames.length} screencast frames captured`);

  // concat demuxer: real per-frame durations preserve the pacing of holds.
  const lines = ["ffconcat version 1.0"];
  for (let i = 0; i < frames.length; i++) {
    const next = i + 1 < frames.length ? frames[i + 1].ts : frames[i].ts + 0.6;
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
  await captureStill(page, outName);
  await page.setViewport({ ...VIEW, deviceScaleFactor: 1 });
  await animScroll(page, 0, 200);
  await sleep(700);
  await recordDemo(page, outName, hoverSpec, site.scrollStops);
  await page.close();
}

const site = CONCEPTS[slug];
const conceptUrl = `${previewBase}/concepts/${slug}/`;
if (only !== "current") {
  const alive = await fetch(conceptUrl).then((r) => r.ok).catch(() => false);
  if (!alive) throw new Error(`${conceptUrl} is not serving. Run: pnpm build && pnpm preview`);
}

const browser = await puppeteer.launch({
  executablePath: chromePath,
  headless: "new",
  args: ["--hide-scrollbars", "--mute-audio", "--force-color-profile=srgb", "--disable-gpu"],
});
try {
  if (only !== "concept") await captureTarget(browser, site, site.current, `${slug}-current`, site.currentHover);
  if (only !== "current") await captureTarget(browser, site, conceptUrl, `${slug}-concept`, site.conceptHover);
} finally {
  await browser.close();
}
