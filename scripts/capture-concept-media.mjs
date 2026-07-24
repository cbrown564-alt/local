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
import { JOURNEYS, MOBILE_USER_AGENT, MOBILE_VIEW, countJourney, getJourney } from "./lib/journeys.mjs";

const VIEW = { width: 1265, height: 710 };
const REEL_VIEW = { width: 1920, height: 1080 };
const REEL_TRANSITION_SECONDS = 0.45;

// Journey films — the fairness rule (MEDIA_CAPTURE.md, and the reason this mode
// exists) is that pacing is fixed and the only variable is how many steps an
// errand takes. Every step on both sides holds for exactly the same time, taps
// get the same indicator, and page-load time is never recorded: a navigating
// tap is filmed for JOURNEY_TAP_SECONDS, the wait for the next page happens off
// camera, and the destination is then filmed for the same dwell as any other
// step. Without that the live site would look slow simply because it is on a
// real host while the concept is served from localhost.
const JOURNEY_DWELL_SECONDS = 2.4;
const JOURNEY_TAP_SECONDS = 1;
const JOURNEY_SCROLL_MS = 900;

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
  "dundrum-inn": {
    before: "https://dundruminn.com/",
    settleMs: 4500,
    beforeHover: ["text=BOOK NOW", "text=BOOK", "nav a", "header a"],
    afterHover: AFTER_HOVER,
  },
  "groves-chemist": {
    beforeStill: "https://groveschemist.com/",
    afterHover: AFTER_HOVER,
  },
  "tonn-ruray": {
    before: "https://www.tonnruray.com/",
    settleMs: 5000,
    dismissClick: [[914, 76]],
    beforeHover: ["text=BOOK NOW", "nav a", "header a"],
    afterHover: AFTER_HOVER,
  },
  "kelly-mcevoy-brown": {
    before: "https://www.kmbni.com/",
    settleMs: 4500,
    beforeHover: ["text=PROJECTS", "nav a", "header a"],
    afterHover: AFTER_HOVER,
  },
  "bettys-butters": {
    before: "https://www.bettysbetterbutters.com/",
    settleMs: 4000,
    beforeHover: ["text=OUR STORE", "nav a", "header a"],
    afterHover: AFTER_HOVER,
  },
  "douglas-cromie": {
    beforeStillHtml: `
      <main style="box-sizing:border-box;width:1265px;height:710px;padding:96px 112px;background:#e8e6df;color:#292c2c;font-family:Arial,sans-serif;display:flex;align-items:center">
        <div style="max-width:760px;border-left:8px solid #c28a3d;padding-left:34px">
          <p style="margin:0 0 22px;font-size:18px;letter-spacing:.16em;text-transform:uppercase;color:#6d7270">Before · domain check · 24 July 2026</p>
          <h1 style="margin:0 0 22px;font-size:54px;line-height:1.04;font-weight:500">No page answers at douglasandcromie.co.uk</h1>
          <p style="margin:0;font-size:25px;line-height:1.45;color:#555b58">The domain does not resolve. This muted card stands in for the failed address; the dealer's live stock remains on a third-party marketplace.</p>
        </div>
      </main>`,
    afterHover: AFTER_HOVER,
  },
  "donard-hotel": {
    beforeStill: "http://donardhotel.com/",
    afterHover: AFTER_HOVER,
  },
  "newcastle-dental": {
    beforeStill: "http://newcastlefamilydentalcare.com/",
    afterHover: AFTER_HOVER,
  },
  "hugh-mccanns": {
    before: "https://www.hughmccanns.com/",
    settleMs: 4500,
    beforeHover: ["text=CONTACT", "text=ENQUIRE", "nav a", "header a"],
    afterHover: AFTER_HOVER,
  },
  // Internal concept only. Trading was unconfirmed on 24 July 2026, so this
  // is intentionally not registered as a public transformation case study.
  "murdock-brothers": {
    beforeStill: "https://murdocksoilcoalandgas.co.uk/",
    afterHover: AFTER_HOVER,
  },
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
// use the same small vocabulary for every business; cards and comparison wipes
// are assembled by the same ffmpeg pass. Leading `goto` steps prepare a clean,
// settled page before recording, so a slow network does not become part of
// the film. Later `goto` and `click` steps remain visible.
const REELS = {
  "hotel-enniskeen": {
    posterSegment: "after-home",
    outreachSegmentIds: [
      "open-card",
      "before-home",
      "before-booking",
      "turn-card",
      "after-home",
      "after-rooms",
      "after-booking",
      "swipe-heroes",
      "end-card",
    ],
    segments: [
      {
        id: "open-card",
        type: "card",
        duration: 4,
        eyebrow: "Independent concept · not commissioned",
        title: "Enniskeen Country House Hotel",
        detail: "A guest-first website concept by Mourne Made · Newcastle, County Down",
      },
      {
        id: "before-home",
        type: "browser",
        side: "before",
        captionStyle: "proof",
        chapter: "Current site",
        caption: "Seven equal choices appear before the valley has made the case for staying.",
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
        captionStyle: "proof",
        chapter: "Current rooms",
        caption: "Room details are published, but they sit behind the old navigation and a long page.",
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
        captionStyle: "proof",
        chapter: "Current booking",
        caption: "Bookin1 already handles availability. That working handoff stays.",
        steps: [
          { action: "goto", url: "https://www.enniskeenhotel.co.uk/", settleMs: 3500 },
          { action: "click", target: "text=BOOK NOW", seconds: 3.5, navigation: true },
        ],
      },
      {
        id: "turn-card",
        type: "card",
        cardStyle: "proof",
        duration: 4,
        eyebrow: "Keep what works",
        title: "Keep the hotel. Make the stay easier to choose.",
        detail: "Its photographs and booking engine remain. The new site changes how guests reach them.",
      },
      {
        id: "after-home",
        type: "browser",
        side: "after",
        captionStyle: "editorial",
        chapter: "01 · Arrive",
        caption: "The valley answers the first question: why stay here?",
        steps: [
          { action: "goto", url: "/concepts/hotel-enniskeen/", settleMs: 1600 },
          { action: "hold", seconds: 6.7 },
          { action: "hover", target: ".enk-booking button", seconds: 1.5 },
        ],
      },
      {
        id: "after-rooms",
        type: "browser",
        side: "after",
        captionStyle: "editorial",
        chapter: "02 · Choose",
        caption: "Room character, views and practical details appear before the decision.",
        steps: [
          { action: "goto", url: "/concepts/hotel-enniskeen/rooms/", settleMs: 1200 },
          { action: "hold", seconds: 4.2 },
          { action: "scroll", to: 0.52, unit: "page", durationMs: 1200, seconds: 3.3 },
        ],
      },
      {
        id: "after-dine",
        type: "browser",
        side: "after",
        captionStyle: "editorial",
        chapter: "03 · Dine",
        caption: "Afternoon tea, the Oak Restaurant and the Brandy Pad become part of the stay.",
        steps: [
          { action: "goto", url: "/concepts/hotel-enniskeen/dine/", settleMs: 1200 },
          { action: "hold", seconds: 4 },
          { action: "scroll", to: 0.5, unit: "page", durationMs: 1100, seconds: 2.9 },
        ],
      },
      {
        id: "after-estate",
        type: "browser",
        side: "after",
        captionStyle: "quiet",
        chapter: "04 · Wander",
        caption: "Twelve wooded acres, with the Shimna trail from the door.",
        steps: [
          { action: "goto", url: "/concepts/hotel-enniskeen/estate/", settleMs: 1200 },
          { action: "hold", seconds: 3.6 },
          { action: "scroll", to: 0.48, unit: "page", durationMs: 1000, seconds: 2.7 },
        ],
      },
      {
        id: "after-things-to-do",
        type: "browser",
        side: "after",
        captionStyle: "quiet",
        chapter: "05 · Explore",
        caption: "Routes into the Mournes and along the coast begin at the house.",
        steps: [
          { action: "goto", url: "/concepts/hotel-enniskeen/things-to-do/", settleMs: 1200 },
          { action: "hold", seconds: 3.6 },
          { action: "scroll", to: 0.5, unit: "page", durationMs: 1000, seconds: 2.7 },
        ],
      },
      {
        id: "after-booking",
        type: "browser",
        side: "after",
        captionStyle: "editorial",
        chapter: "06 · Book",
        caption: "Choose dates while the stay is still fresh in mind.",
        steps: [
          { action: "goto", url: "/concepts/hotel-enniskeen/", settleMs: 1200 },
          { action: "click", target: ".enk-booking button", seconds: 5.6, navigation: true },
        ],
      },
      {
        id: "swipe-heroes",
        type: "swipe",
        duration: 6,
        transitionDuration: 1.2,
        transitionOffset: 2,
        captionStyle: "proof",
        chapter: "Before → after",
        caption: "Seven equal choices become one clear path into the stay.",
        before: { type: "image", path: "/images/hotel-enniskeen-before.jpg" },
        after: { type: "image", path: "/images/hotel-enniskeen-after.jpg" },
      },
      {
        id: "end-card",
        type: "card",
        duration: 5,
        eyebrow: "Independent concept · not commissioned",
        title: "See every page and the complete comparison",
        detail: "mournemade.co.uk/transformations/hotel-enniskeen/ · Free before-and-after for local businesses",
      },
    ],
  },
};

const slug = process.argv[2];
const only = process.argv[3] && process.argv[3] !== "both" ? process.argv[3] : null;
const what = process.argv[4] ?? "both"; // both | video | still
if (
  !CONCEPTS[slug]
  || !["before", "after", "reel", "journey", null].includes(only)
  || !["both", "video", "still"].includes(what)
  || (only === "reel" && !REELS[slug])
  || (only === "journey" && !JOURNEYS[slug])
) {
  console.error(`Usage: node scripts/capture-concept-media.mjs <slug> [both|before|after|reel|journey] [both|video|still]\nKnown slugs: ${Object.keys(CONCEPTS).join(", ")}`);
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
  await sharp(png).jpeg({ quality: 78, mozjpeg: true }).toFile(out);
  const kb = Math.round(fs.statSync(out).size / 1024);
  console.log(`  ${outName}.jpg — ${kb} KB`);
}

async function captureTarget(browser, site, url, outName, hoverSpec, captureWhat = what) {
  console.log(`${outName} <- ${url}`);
  const page = await browser.newPage();
  await page.setViewport({ ...VIEW, deviceScaleFactor: 2 });
  await page.goto(url, { waitUntil: "networkidle2", timeout: 90000 });
  await sleep(site.settleMs ?? 4000);
  await dismissOverlays(page, site);
  await sleep(800);
  if (captureWhat !== "video") await captureStill(page, outName);
  if (captureWhat !== "still") {
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
  const cardStyle = segment.cardStyle === "proof" ? "proof" : "studio";
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
        top: 58px;
        min-width: 126px;
        padding: 9px 29px 9px 10px;
        display: grid;
        background: #132029;
        color: #f4f8fa;
        font-family: "Antonio Reel", "Arial Narrow", sans-serif;
        font-size: 27px;
        font-weight: 700;
        letter-spacing: .01em;
        line-height: .76;
        text-transform: uppercase;
      }
      .wordmark i {
        position: absolute;
        inset: 0 0 0 auto;
        width: 18px;
        background: #e0c14d;
      }
      body.proof {
        background: #f1eadb;
        color: #15291f;
      }
      body.proof::before {
        width: 8px;
        height: 660px;
        left: 150px;
        top: 210px;
        background: #c9973b;
      }
      body.proof::after {
        width: 520px;
        height: 3px;
        right: 0;
        bottom: 104px;
        background: #c9973b;
      }
      body.proof main {
        width: 1450px;
        padding-left: 94px;
      }
      body.proof .mark { color: #8b651e; }
      body.proof .mark::before { display: none; }
      body.proof h1 {
        max-width: 1360px;
        color: #15291f;
        font-size: 120px;
      }
      body.proof .detail {
        max-width: 1250px;
        color: #3a4e3d;
      }
      body.proof .wordmark { background: #15291f; color: #f1eadb; }
    </style></head><body class="${cardStyle}">
      <div class="wordmark"><b>Mourne</b><b>Made</b><i></i></div>
      <main>
        <p class="mark">${escapeHtml(segment.eyebrow)}</p>
        <h1>${escapeHtml(segment.title)}</h1>
        <p class="detail">${escapeHtml(segment.detail)}</p>
      </main>
    </body></html>`;
  await renderHtmlFrame(browser, html, out);
}

async function renderCaptionFrame(browser, segment, out) {
  const side = segment.side
    ? segment.side[0].toUpperCase() + segment.side.slice(1)
    : "Before / After";
  const style = ["editorial", "quiet", "proof"].includes(segment.captionStyle)
    ? segment.captionStyle
    : "editorial";
  const label = segment.chapter ?? side;
  const caption = segment.side === "before"
    ? segment.beforeCaption ?? segment.caption
    : segment.side === "after"
      ? segment.afterCaption ?? segment.caption
      : segment.caption;
  const html = `<!doctype html>
    <html lang="en"><head><meta charset="utf-8"><style>
      ${reelFontCss}
      * { box-sizing: border-box; }
      html, body { width: 1920px; height: 1080px; margin: 0; overflow: hidden; background: transparent; }
      body { font-family: "Atkinson Reel", "Segoe UI", sans-serif; color: #f4f8fa; }
      .veil { display: none; }
      .caption {
        position: absolute;
        left: 130px;
        right: 130px;
        bottom: 0;
        height: 146px;
        display: grid;
        grid-template-columns: 210px 1fr;
        align-items: center;
        gap: 24px;
      }
      .label {
        flex: 0 0 auto;
        color: ${style === "editorial" ? "#e0c14d" : segment.side === "after" ? "#9bc5d9" : "#c9d9e1"};
        font-size: 18px;
        font-weight: 760;
        letter-spacing: .12em;
        line-height: 1;
        text-transform: uppercase;
      }
      p {
        margin: 0;
        max-width: 1320px;
        font-size: 38px;
        font-weight: 520;
        letter-spacing: -.012em;
        line-height: 1.12;
      }
      body.proof .caption { grid-template-columns: 250px 1fr; }
      body.proof .label {
        display: inline-flex;
        width: fit-content;
        padding: 9px 13px 8px;
        border: 1px solid currentColor;
      }
      body.proof p { font-size: 35px; }
      body.quiet .veil {
        display: block;
        position: absolute;
        left: 130px;
        right: 130px;
        bottom: 0;
        height: 238px;
        background: linear-gradient(to top, rgba(13,23,29,.96), rgba(13,23,29,0));
      }
      body.quiet .caption {
        bottom: 32px;
        height: auto;
        grid-template-columns: auto 1fr;
        gap: 20px;
        padding-left: 46px;
      }
      body.quiet .label {
        padding: 8px 11px 7px;
        border: 1px solid rgba(255,255,255,.72);
        color: #fff;
        font-size: 15px;
      }
      body.quiet p {
        font-family: Georgia, "Times New Roman", serif;
        font-size: 35px;
        font-weight: 500;
        letter-spacing: -.01em;
        text-shadow: 0 2px 18px rgba(0,0,0,.55);
      }
    </style></head><body class="${style}">
      <div class="veil"></div>
      <div class="caption">
        <span class="label">${escapeHtml(label)}</span>
        <p>${escapeHtml(caption)}</p>
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
          // Collapse whitespace before comparing: a link like
          // `À la carte <span>evenings</span>` reports its innerText across two
          // lines. The journey audit matches the same way, so a target that
          // resolves for one consumer resolves for both.
          const label = (element.innerText || element.value || element.getAttribute("aria-label") || "")
            .replace(/\s+/g, " ")
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

function resolveComparisonInput(input, completed) {
  if (input.type === "segment") {
    const segment = completed.find((item) => item.id === input.id);
    if (!segment) throw new Error(`comparison source segment not found: ${input.id}`);
    return { ...input, path: segment.path };
  }
  if (input.type === "image") {
    return {
      ...input,
      path: path.join(rootDir, "public", input.path.replace(/^[/\\]+/, "")),
    };
  }
  throw new Error(`unsupported comparison input: ${input.type}`);
}

async function encodeSwipeSegment(browser, segment, completed, workDir) {
  const before = resolveComparisonInput(segment.before, completed);
  const after = resolveComparisonInput(segment.after, completed);
  const overlay = path.join(workDir, `${segment.id}-caption.png`);
  const output = path.join(workDir, `${segment.id}.mp4`);
  await renderCaptionFrame(browser, segment, overlay);
  const args = ["-y"];
  for (const input of [before, after]) {
    if (input.type === "image") {
      args.push("-loop", "1", "-framerate", "30", "-t", String(segment.duration), "-i", input.path);
    } else {
      args.push("-i", input.path);
    }
  }
  args.push("-i", overlay);
  const transitionDuration = segment.transitionDuration ?? 1.2;
  const transitionOffset = segment.transitionOffset ?? 2;
  const beforeDuration = transitionOffset + transitionDuration;
  const afterDuration = segment.duration - transitionOffset;
  args.push(
    "-filter_complex",
    "[0:v]scale=1660:934:force_original_aspect_ratio=increase,crop=1660:934,"
      + "pad=1660:934:(ow-iw)/2:(oh-ih)/2:color=white,"
      + "pad=1920:1080:130:20:color=#132029[before-framed];"
      + `[before-framed]trim=duration=${beforeDuration},setpts=PTS-STARTPTS[before];`
      + "[1:v]scale=1660:934:force_original_aspect_ratio=increase,crop=1660:934,"
      + "pad=1660:934:(ow-iw)/2:(oh-ih)/2:color=white,"
      + "pad=1920:1080:130:20:color=#132029[after-framed];"
      + `[after-framed]trim=duration=${afterDuration},setpts=PTS-STARTPTS[after];`
      + `[before][after]xfade=transition=wipeleft:duration=${transitionDuration}`
      + `:offset=${transitionOffset}[comparison];`
      + "[comparison][2:v]overlay=0:0:format=auto,format=yuv420p[v]",
    "-map", "[v]", "-t", String(segment.duration),
    "-c:v", "libx264", "-crf", "20", "-preset", "medium",
    "-pix_fmt", "yuv420p", "-an", output,
  );
  execFileSync(ffmpeg, args, { stdio: "pipe" });
  console.log(`  ${segment.id} — ${segment.duration.toFixed(1)}s`);
  return { id: segment.id, path: output, seconds: segment.duration };
}

// ---------------------------------------------------------------------------
// Journey films — see scripts/lib/journeys.mjs for the step definitions and the
// no-real-booking rule they enforce.
// ---------------------------------------------------------------------------

// A neutral ripple at the touch point, injected identically on both sides so
// neither looks more responsive than the other.
async function showTap(page, point) {
  await page.evaluate(({ x, y }) => {
    const dot = document.createElement("div");
    dot.style.cssText = `position:fixed;left:${x}px;top:${y}px;width:26px;height:26px;`
      + "margin:-13px 0 0 -13px;border-radius:50%;background:rgba(17,24,47,.28);"
      + "border:2px solid rgba(17,24,47,.65);z-index:2147483647;pointer-events:none;"
      + "animation:mm-tap 700ms ease-out forwards;";
    const style = document.createElement("style");
    style.textContent = "@keyframes mm-tap{from{transform:scale(.35);opacity:1}"
      + "to{transform:scale(2.4);opacity:0}}";
    document.head.append(style);
    document.body.append(dot);
    setTimeout(() => { dot.remove(); style.remove(); }, 900);
  }, point);
}

async function journeyGoto(page, url) {
  const target = url.startsWith("/") ? `${previewBase}${url}` : url;
  for (let attempt = 1; ; attempt++) {
    try {
      await page.goto(target, { waitUntil: "networkidle2", timeout: 90000 });
      break;
    } catch (error) {
      if (attempt === 3) throw error;
      await sleep(attempt * 5000);
    }
  }
}

// One recording of the page as it stands, for a fixed number of seconds.
async function recordJourneyClip(page, id, workDir, seconds, act) {
  const capture = await recordReelFrames(page, { id }, workDir, async () => {
    if (act) await act();
    await sleep(seconds * 1000);
  });
  const out = path.join(workDir, `${id}.mp4`);
  execFileSync(ffmpeg, [
    "-y", "-f", "concat", "-safe", "0",
    "-i", writeFrameConcat(capture.frameDir, capture.frames, capture.endTs),
    "-vf", `scale=${MOBILE_VIEW.width}:${MOBILE_VIEW.height}:force_original_aspect_ratio=increase,`
      + `crop=${MOBILE_VIEW.width}:${MOBILE_VIEW.height},fps=30`,
    "-c:v", "libx264", "-crf", "20", "-preset", "medium",
    "-pix_fmt", "yuv420p", "-an", out,
  ], { stdio: "pipe" });
  return { path: out, seconds: capture.seconds };
}

// Every step becomes one or two clips of fixed length. Load time is never
// filmed, so both sides are paced identically whatever their hosting.
async function recordJourneyStep(page, step, index, side, workDir, site) {
  const id = `${side.key}-${String(index).padStart(2, "0")}-${step.id}`;
  const clips = [];

  if (step.action === "goto") {
    await journeyGoto(page, step.url);
    await sleep(step.settleMs ?? 1500);
    await dismissOverlays(page, site);
    await sleep(400);
    clips.push(await recordJourneyClip(page, id, workDir, JOURNEY_DWELL_SECONDS));
  } else if (step.action === "hold") {
    clips.push(await recordJourneyClip(page, id, workDir, JOURNEY_DWELL_SECONDS));
  } else if (step.action === "scroll") {
    clips.push(await recordJourneyClip(page, id, workDir, JOURNEY_DWELL_SECONDS, async () => {
      const max = await page.evaluate(
        () => Math.max(0, (document.scrollingElement || document.documentElement).scrollHeight - innerHeight),
      );
      const top = step.unit === "page" ? max * step.to : MOBILE_VIEW.height * step.to;
      await animScroll(page, top, JOURNEY_SCROLL_MS);
    }));
  } else if (step.action === "fill") {
    const point = await targetPoint(page, step.target);
    if (!point) throw new Error(`${id}: no field ${step.target}`);
    clips.push(await recordJourneyClip(page, id, workDir, JOURNEY_DWELL_SECONDS, async () => {
      await showTap(page, point);
      const handle = await page.$(step.target);
      const tag = await handle.evaluate((el) => el.tagName);
      if (tag === "SELECT") await page.select(step.target, step.value);
      else {
        await handle.evaluate((el, v) => {
          el.value = v;
          el.dispatchEvent(new Event("input", { bubbles: true }));
          el.dispatchEvent(new Event("change", { bubbles: true }));
        }, step.value);
      }
    }));
  } else if (step.action === "tap") {
    const point = await targetPoint(page, step.target);
    if (!point) throw new Error(`${id}: no visible target ${step.target}`);
    // The tap itself, filmed for a fixed beat on both sides.
    const navigation = step.navigation
      ? page.waitForNavigation({ waitUntil: "domcontentloaded", timeout: 45000 }).catch(() => null)
      : null;
    clips.push(await recordJourneyClip(page, id, workDir, JOURNEY_TAP_SECONDS, async () => {
      await showTap(page, point);
      await page.mouse.click(point.x, point.y);
    }));
    if (step.navigation) {
      await navigation; // off camera: hosting speed is not what this compares
      await sleep(2200);
      await dismissOverlays(page, site);
      await sleep(400);
      clips.push(await recordJourneyClip(page, `${id}-landed`, workDir, JOURNEY_DWELL_SECONDS));
    }
  } else if (step.action === "measure") {
    return []; // audit-only
  } else {
    throw new Error(`${id}: unsupported action ${step.action}`);
  }
  return clips;
}

// The concat list lives beside the source clips in the work directory, never
// beside the finished file — public/videos/ holds delivery media only.
function concatClips(clips, out, workDir) {
  const list = clips.map((clip) => `file '${clip.path.replaceAll("\\", "/")}'`).join("\n");
  const listFile = path.join(workDir, `${path.basename(out, ".mp4")}-concat.txt`);
  fs.writeFileSync(listFile, list);
  execFileSync(ffmpeg, [
    "-y", "-f", "concat", "-safe", "0", "-i", listFile,
    "-c:v", "libx264", "-crf", "20", "-preset", "medium",
    "-pix_fmt", "yuv420p", "-an", out,
  ], { stdio: "pipe" });
  return clips.reduce((total, clip) => total + clip.seconds, 0);
}

async function captureJourneySide(browser, errand, sideName, side, workDir, site) {
  const page = await browser.newPage();
  await page.setViewport({ ...MOBILE_VIEW, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  await page.setUserAgent(MOBILE_USER_AGENT);
  const key = `${errand.id}-${sideName}`;
  const clips = [];
  try {
    let index = 0;
    for (const step of side.steps) {
      index += 1;
      clips.push(...await recordJourneyStep(page, step, index, { key }, workDir, site));
    }
  } finally {
    await page.close();
  }
  const out = path.join(workDir, `${key}.mp4`);
  const seconds = concatClips(clips, out, workDir);
  const counts = countJourney(side);
  console.log(`  ${key} — ${seconds.toFixed(1)}s, ${counts.taps} tap(s)`);
  return { path: out, seconds, ...counts };
}

// The side-by-side edit. Both phones are framed and labelled by one stylesheet,
// so neither side can be flattered by its presentation.
async function renderJourneyOverlay(browser, errand, before, after, out) {
  const column = (title, subtitle, counts, tone) => `
    <div class="col ${tone}">
      <p class="who">${escapeHtml(title)}</p>
      <p class="sub">${escapeHtml(subtitle)}</p>
      <p class="count"><b>${counts.taps}</b> ${counts.taps === 1 ? "tap" : "taps"}</p>
    </div>`;
  const html = `<!doctype html>
    <html lang="en"><head><meta charset="utf-8"><style>
      ${reelFontCss}
      * { box-sizing: border-box; }
      html, body { width: 1920px; height: 1080px; margin: 0; overflow: hidden; background: transparent; }
      body { font-family: "Atkinson Reel", "Segoe UI", sans-serif; color: #f4f8fa; }
      .errand {
        position: absolute; top: 44px; left: 0; right: 0; text-align: center;
      }
      .errand .eyebrow {
        margin: 0 0 8px; color: #e0c14d; font-size: 19px; font-weight: 760;
        letter-spacing: .16em; text-transform: uppercase;
      }
      .errand h2 {
        margin: 0; font-family: "Antonio Reel", "Arial Narrow", sans-serif;
        font-size: 52px; font-weight: 600; letter-spacing: -.02em;
      }
      .cols {
        position: absolute; bottom: 40px; left: 0; right: 0;
        display: grid; grid-template-columns: 1fr 1fr; width: 1120px; margin: 0 auto;
      }
      .col { text-align: center; }
      .who {
        margin: 0 0 6px; font-size: 27px; font-weight: 700; letter-spacing: -.01em;
      }
      .sub { margin: 0 0 10px; color: #c9d9e1; font-size: 19px; }
      .count { margin: 0; font-size: 21px; letter-spacing: .04em; color: #9bc5d9; }
      .count b {
        font-family: "Antonio Reel", "Arial Narrow", sans-serif;
        font-size: 34px; color: #e0c14d;
      }
      .wordmark {
        position: fixed; right: 74px; top: 46px; min-width: 116px;
        padding: 8px 26px 8px 9px; display: grid; background: #132029; color: #f4f8fa;
        font-family: "Antonio Reel", "Arial Narrow", sans-serif; font-size: 24px;
        font-weight: 700; line-height: .76; text-transform: uppercase;
      }
      .wordmark i { position: absolute; inset: 0 0 0 auto; width: 16px; background: #e0c14d; }
    </style></head><body>
      <div class="wordmark"><b>Mourne</b><b>Made</b><i></i></div>
      <div class="errand">
        <p class="eyebrow">${escapeHtml(errand.endsAt)}</p>
        <h2>${escapeHtml(errand.label)}</h2>
      </div>
      <div class="cols">
        ${column("Their site today", "thebucksheaddundrum.co.uk", before, "before")}
        ${column("The concept", "same brand · same booking engine", after, "after")}
      </div>
    </body></html>`;
  await renderHtmlFrame(browser, html, out, { transparent: true });
}

async function encodeJourneyComparison(browser, errand, before, after, workDir) {
  const overlay = path.join(workDir, `${errand.id}-overlay.png`);
  await renderJourneyOverlay(browser, errand, before, after, overlay);
  const out = path.join(workDir, `${errand.id}-compare.mp4`);
  const duration = Math.max(before.seconds, after.seconds);
  // Freeze whichever side finishes first on its last frame, so the pair stays
  // in step without either being sped up or slowed down.
  // Phones are sized to leave the lower band free for the labels; at full
  // height they overrun the tap counts.
  const phone = (input, label) =>
    `[${input}:v]scale=-2:718,tpad=stop_mode=clone:stop_duration=${duration.toFixed(2)},`
    + `trim=duration=${duration.toFixed(2)},setpts=PTS-STARTPTS,`
    + `pad=356:734:(ow-iw)/2:8:color=#e6ecef[${label}]`;
  execFileSync(ffmpeg, [
    "-y", "-i", before.path, "-i", after.path, "-i", overlay,
    "-filter_complex",
    `${phone(0, "l")};${phone(1, "r")};`
      + "[l][r]hstack=inputs=2[pair];"
      + "[pair]pad=1920:1080:(ow-iw)/2:172:color=#132029[stage];"
      + "[stage][2:v]overlay=0:0:format=auto,format=yuv420p[v]",
    "-map", "[v]", "-t", duration.toFixed(2),
    "-c:v", "libx264", "-crf", "22", "-preset", "medium",
    "-pix_fmt", "yuv420p", "-an", out,
  ], { stdio: "pipe" });
  console.log(`  ${errand.id} comparison — ${duration.toFixed(1)}s`);
  return { id: errand.id, path: out, seconds: duration };
}

async function captureJourney(browser, journeySlug, site) {
  const journey = getJourney(journeySlug);
  const workDir = fs.mkdtempSync(path.join(os.tmpdir(), `journey-${journeySlug}-`));
  console.log(`${journeySlug}-journey: ${journey.errands.length} errands`);
  try {
    const sides = { before: [], after: [] };
    const comparisons = [];
    for (const errand of journey.errands) {
      const before = await captureJourneySide(browser, errand, "before", errand.before, workDir, site);
      const after = await captureJourneySide(browser, errand, "after", errand.after, workDir, site);
      sides.before.push(before);
      sides.after.push(after);
      comparisons.push(await encodeJourneyComparison(browser, errand, before, after, workDir));
    }

    // The portrait pair: both errands, one side each.
    for (const sideName of ["before", "after"]) {
      const out = path.join(videoDir, `${journeySlug}-journey-${sideName}.mp4`);
      const seconds = concatClips(sides[sideName], out, workDir);
      const mb = fs.statSync(out).size / (1024 * 1024);
      console.log(`  ${path.basename(out)} — ${seconds.toFixed(1)}s, ${mb.toFixed(2)} MB`);
    }

    // The combined edit, opened and closed by the studio's own cards.
    const cards = journey.filmCards ?? {};
    const opening = await encodeCardSegment(browser, { ...cards.open, id: "journey-open" }, workDir);
    const closing = await encodeCardSegment(browser, { ...cards.end, id: "journey-end" }, workDir);
    const out = path.join(videoDir, `${journeySlug}-journey.mp4`);
    const seconds = assembleReel([opening, ...comparisons, closing], out);
    const mb = fs.statSync(out).size / (1024 * 1024);
    const poster = path.join(imageDir, `${journeySlug}-journey-poster.jpg`);
    execFileSync(ffmpeg, [
      "-y", "-ss", "2", "-i", comparisons[0].path,
      "-frames:v", "1", "-q:v", "2", poster,
    ], { stdio: "pipe" });
    console.log(`  ${path.basename(out)} — ${seconds.toFixed(1)}s, ${mb.toFixed(2)} MB`);
    console.log(`  ${path.basename(poster)} — ${Math.round(fs.statSync(poster).size / 1024)} KB`);
    if (seconds > 60) throw new Error(`journey edit is ${seconds.toFixed(1)}s; target is at most 60s`);
    if (mb > 8) throw new Error(`journey edit is ${mb.toFixed(2)} MB; target is at most 8 MB`);
  } finally {
    fs.rmSync(workDir, { recursive: true, force: true });
  }
}

function validateReel(reel) {
  const ids = new Set();
  const actions = new Set(["goto", "hold", "scroll", "hover", "click"]);
  for (const segment of reel.segments) {
    if (!segment.id || ids.has(segment.id)) throw new Error(`invalid or duplicate reel segment id: ${segment.id}`);
    ids.add(segment.id);
    if (!["card", "browser", "swipe"].includes(segment.type)) {
      throw new Error(`${segment.id}: unsupported segment type ${segment.type}`);
    }
    if (segment.type === "swipe") {
      const transitionDuration = segment.transitionDuration ?? 1.2;
      const transitionOffset = segment.transitionOffset ?? 2;
      if (
        transitionDuration <= 0
        || transitionOffset < 0
        || transitionOffset + transitionDuration >= segment.duration
      ) {
        throw new Error(`${segment.id}: transition must leave time to hold both complete views`);
      }
    }
    for (const step of segment.steps ?? []) {
      if (!actions.has(step.action)) throw new Error(`${segment.id}: unsupported action ${step.action}`);
    }
  }
  if (!ids.has(reel.posterSegment)) throw new Error(`poster segment not found: ${reel.posterSegment}`);
  for (const id of reel.outreachSegmentIds ?? []) {
    if (!ids.has(id)) throw new Error(`outreach segment not found: ${id}`);
  }
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
      } else if (segment.type === "swipe") {
        completed.push(await encodeSwipeSegment(browser, segment, completed, workDir));
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
    if (reel.outreachSegmentIds?.length) {
      const outreachSegments = reel.outreachSegmentIds.map((id) =>
        completed.find((segment) => segment.id === id),
      );
      if (outreachSegments.some((segment) => !segment)) {
        throw new Error("outreach reel references an incomplete segment");
      }
      const outreachOut = path.join(videoDir, `${reelSlug}-outreach-reel.mp4`);
      const outreachSeconds = assembleReel(outreachSegments, outreachOut);
      const outreachMb = fs.statSync(outreachOut).size / (1024 * 1024);
      console.log(`  ${path.basename(outreachOut)} — ${outreachSeconds.toFixed(1)}s, ${outreachMb.toFixed(2)} MB`);
      if (outreachSeconds < 45 || outreachSeconds > 55) {
        throw new Error(`outreach reel is ${outreachSeconds.toFixed(1)}s; target is 45–55s`);
      }
      if (outreachMb > 10) throw new Error(`outreach reel is ${outreachMb.toFixed(2)} MB; target is at most 10 MB`);
    }
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

// The journey film drives the live booking flow. Refuse to run at all if the
// step definitions have drifted from the no-real-booking rule.
if (only === "journey") getJourney(slug);

const browser = await puppeteer.launch({
  executablePath: chromePath,
  headless: "new",
  args: ["--hide-scrollbars", "--mute-audio", "--force-color-profile=srgb", "--disable-gpu"],
});
try {
  if (only === "reel") {
    await captureReel(browser, slug, site);
  } else if (only === "journey") {
    await captureJourney(browser, slug, site);
  } else if (only !== "after") {
    if (site.before) {
      await captureTarget(browser, site, site.before, `${slug}-before`, site.beforeHover);
    } else if (site.beforeStill && what !== "video") {
      await captureTarget(browser, site, site.beforeStill, `${slug}-before`, site.beforeHover, "still");
    } else if (site.beforeStillHtml && what !== "video") {
      const dataUrl = `data:text/html;charset=utf-8,${encodeURIComponent(site.beforeStillHtml)}`;
      await captureTarget(browser, site, dataUrl, `${slug}-before`, site.beforeHover, "still");
    } else {
      console.log(`${slug}-before: skipped (no live site to demo)`);
    }
  }
  if (only !== "reel" && only !== "journey" && only !== "before") {
    await captureTarget(browser, site, conceptUrl, `${slug}-after`, site.afterHover);
  }
} finally {
  await browser.close();
}
