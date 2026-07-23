// Build-day journey audit: walks each errand on a phone-sized viewport, on the
// live site and on the concept, screenshotting every step.
//
// This is the evidence the case study's numbers are read from. It runs against
// the live site on the day of the build, because these sites change — the Buck's
// Head grew a ResDiary widget between one verification pass and the next.
//
// Usage:
//   pnpm build && pnpm preview          (concept side is served from preview)
//   node scripts/audit-journey.mjs bucks-head
//
// Output: research-renders/<slug>-journey/<date>/
//   <errand>-<side>-NN-<step>.png       one frame per step
//   summary.json                        counts, measurements, step notes
//   README.md                           the tap table, ready to read
//
// The no-real-booking rule is enforced in scripts/lib/journeys.mjs, not here:
// the walk stops at the booking engine's date/party/time stage on both sides.

import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import puppeteer from "puppeteer-core";
import { findChrome } from "./lib/chrome.mjs";
import { MOBILE_USER_AGENT, MOBILE_VIEW, countJourney, getJourney } from "./lib/journeys.mjs";

const slug = process.argv[2];
if (!slug) {
  console.error("Usage: node scripts/audit-journey.mjs <slug>");
  process.exit(1);
}

// `strips` regenerates the one-sheet's thumbnails from evidence already on
// disk. Print artwork can then be reworked without walking someone else's live
// site again.
const stripsOnly = process.argv[3] === "strips";

const journey = getJourney(slug);
const root = path.resolve(import.meta.dirname, "..");
const previewBase = "http://127.0.0.1:4321";
const today = new Date().toISOString().slice(0, 10);
const outDir = path.join(root, "research-renders", `${slug}-journey`, today);
fs.mkdirSync(outDir, { recursive: true });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const resolveUrl = (value) => (value.startsWith("/") ? `${previewBase}${value}` : value);

// sharp is not hoisted by pnpm; resolve it from Astro's dependency store.
const require = createRequire(import.meta.url);
const pnpmDir = path.resolve(root, "node_modules", ".pnpm");
const sharp = require(path.join(
  pnpmDir,
  fs.readdirSync(pnpmDir).find((dir) => dir.startsWith("sharp@")),
  "node_modules",
  "sharp",
));
const imageDir = path.resolve(root, "public", "images");

// Steps flagged `strip: true` also become print-ready thumbnails, so the
// one-sheet's journey strip is the audit's own frames rather than a redrawing
// of them.
async function writeStripFrame(pngPath, outName) {
  const out = path.join(imageDir, `${outName}.jpg`);
  await sharp(pngPath).resize({ width: 420 }).jpeg({ quality: 84, mozjpeg: true }).toFile(out);
  return path.basename(out);
}

if (stripsOnly) {
  let written = 0;
  for (const errand of journey.errands) {
    for (const sideName of ["before", "after"]) {
      let index = 0;
      let stripIndex = 0;
      for (const step of errand[sideName].steps) {
        if (step.action === "measure") continue;
        index += 1;
        if (!step.strip) continue;
        stripIndex += 1;
        const frame = path.join(
          outDir,
          `${errand.id}-${sideName}-${String(index).padStart(2, "0")}-${step.id}.png`,
        );
        if (!fs.existsSync(frame)) throw new Error(`missing evidence frame: ${frame}`);
        const name = await writeStripFrame(frame, `${slug}-journey-${errand.id}-${sideName}-${stripIndex}`);
        console.log(`  ${name} <- ${path.basename(frame)}`);
        written += 1;
      }
    }
  }
  console.log(`${written} strip thumbnail(s) from ${path.relative(root, outDir)}`);
  process.exit(0);
}

const alive = await fetch(resolveUrl(journey.conceptHome)).then((r) => r.ok).catch(() => false);
if (!alive) throw new Error(`${resolveUrl(journey.conceptHome)} is not serving. Run: pnpm build && pnpm preview`);

// Resolve a CSS selector or `text=Visible Label` to a visible element's centre.
//
// `requireInView` is used for taps: a control the visitor cannot see is not one
// tap away, so the journey definition has to spell out the scroll that reaches
// it. Measurements deliberately allow off-screen targets — how far down the page
// a control sits is exactly what they record.
function locate(page, spec, { requireInView = false } = {}) {
  return page.evaluate(({ target, mustBeInView }) => {
    const visible = (el) => {
      const r = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      return r.width > 6 && r.height > 6
        && cs.visibility !== "hidden" && cs.display !== "none" && Number(cs.opacity) > 0.05;
    };
    const inView = (el) => {
      const r = el.getBoundingClientRect();
      return r.bottom > 0 && r.top < innerHeight;
    };
    const text = target.startsWith("text=") ? target.slice(5).trim().toLowerCase() : null;
    const pool = text
      ? [...document.querySelectorAll("a, button, [role='button'], li, span, div")].filter((el) => {
        const label = (el.innerText || el.getAttribute("aria-label") || "").replace(/\s+/g, " ").trim().toLowerCase();
        return label === text;
      })
      : [...document.querySelectorAll(target)];
    const shown = pool.filter(visible);
    const el = shown.find(inView) ?? (mustBeInView ? null : shown[0]);
    if (!el) return null;
    // Keep the walk in one tab. The menus link to PDFs with target="_blank";
    // letting them open a second tab leaves this one occluded, and Chrome then
    // never paints a screenshot frame for it.
    el.closest("a")?.removeAttribute("target");
    const r = el.getBoundingClientRect();
    return {
      x: r.left + r.width / 2,
      y: r.top + r.height / 2,
      top: r.top + window.scrollY,
      viewportTop: r.top,
      height: r.height,
    };
  }, { target: spec, mustBeInView: requireInView });
}

async function shoot(page, name) {
  const file = path.join(outDir, `${name}.png`);
  await page.screenshot({ path: file, type: "png" });
  return path.basename(file);
}

// A PDF handed to a phone: how big is the sheet, and how far must it shrink?
// PostScript points are 1/72 in; CSS pixels are 1/96 in, so a 595 pt A4 page is
// 794 CSS px wide and cannot fit a 390 px screen without scaling down.
async function pdfFacts(url) {
  if (!/\.pdf(\?|$)/i.test(url)) return { url, isPdf: false };
  const response = await fetch(url);
  const bytes = Buffer.from(await response.arrayBuffer());
  const text = bytes.toString("latin1");
  const box = text.match(/MediaBox\s*\[\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)/);
  const widthPt = box ? Number(box[3]) - Number(box[1]) : null;
  const heightPt = box ? Number(box[4]) - Number(box[2]) : null;
  const widthCssPx = widthPt ? Math.round((widthPt / 72) * 96) : null;
  return {
    url,
    isPdf: true,
    contentType: response.headers.get("content-type"),
    kilobytes: Math.round(bytes.length / 1024),
    pages: (text.match(/\/Type\s*\/Page[^s]/g) || []).length || null,
    widthPt,
    heightPt,
    widthCssPx,
    // Fit-to-width scale on the phone the audit walked.
    fitScale: widthCssPx ? Number((MOBILE_VIEW.width / widthCssPx).toFixed(2)) : null,
  };
}

async function pageFacts(page) {
  return page.evaluate(() => ({
    url: location.href,
    title: document.title,
    scrollHeight: (document.scrollingElement || document.documentElement).scrollHeight,
    viewportHeight: innerHeight,
  }));
}

async function walk(browser, errand, sideName, side) {
  const page = await browser.newPage();
  await page.setViewport({ ...MOBILE_VIEW, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  await page.setUserAgent(MOBILE_USER_AGENT);

  const frames = [];
  const measurements = {};
  let index = 0;
  let stripIndex = 0;
  console.log(`\n${errand.id} · ${sideName}${side.live ? " (live site)" : ""}`);

  try {
    for (const step of side.steps) {
      if (step.action === "goto") {
        // This walks someone else's small-business site. Retry gently on a
        // dropped connection rather than re-running the whole audit at them.
        for (let attempt = 1; ; attempt++) {
          try {
            await page.goto(resolveUrl(step.url), { waitUntil: "networkidle2", timeout: 90000 });
            break;
          } catch (error) {
            if (attempt === 3) throw error;
            console.log(`  retrying ${step.url} after ${error.message.split(" at ")[0]}`);
            await sleep(attempt * 5000);
          }
        }
        await sleep(step.settleMs ?? 1500);
      } else if (step.action === "tap") {
        const point = await locate(page, step.target, { requireInView: true });
        if (!point) {
          throw new Error(
            `${errand.id}/${sideName}/${step.id}: ${step.target} is not on screen — `
            + "add the scroll the visitor would need before counting this tap",
          );
        }
        const navigation = step.navigation
          ? page.waitForNavigation({ waitUntil: "domcontentloaded", timeout: 30000 }).catch(() => null)
          : Promise.resolve(null);
        await page.mouse.click(point.x, point.y);
        await navigation;
        await sleep((step.seconds ?? 1.5) * 1000);
      } else if (step.action === "fill") {
        const handle = await page.$(step.target);
        if (!handle) throw new Error(`${errand.id}/${sideName}/${step.id}: no field ${step.target}`);
        const tag = await handle.evaluate((el) => el.tagName);
        if (tag === "SELECT") await page.select(step.target, step.value);
        else await handle.evaluate((el, v) => { el.value = v; el.dispatchEvent(new Event("input", { bubbles: true })); }, step.value);
        await sleep((step.seconds ?? 0.8) * 1000);
      } else if (step.action === "scroll") {
        await page.evaluate(({ to, unit, ms }) => new Promise((done) => {
          const el = document.scrollingElement || document.documentElement;
          const max = Math.max(0, el.scrollHeight - innerHeight);
          const target = unit === "page" ? max * to : innerHeight * to;
          const start = window.scrollY;
          const t0 = performance.now();
          const ease = (p) => (p < 0.5 ? 4 * p * p * p : 1 - (-2 * p + 2) ** 3 / 2);
          const tick = (now) => {
            const p = Math.min(1, (now - t0) / ms);
            window.scrollTo(0, start + (target - start) * ease(p));
            p < 1 ? requestAnimationFrame(tick) : done();
          };
          requestAnimationFrame(tick);
        }), { to: step.to, unit: step.unit ?? "page", ms: step.durationMs ?? 1000 });
        await sleep((step.seconds ?? 1) * 1000);
      } else if (step.action === "hold") {
        await sleep((step.seconds ?? 1) * 1000);
      } else if (step.action === "measure") {
        if (step.pdf) {
          measurements[`${sideName}.pdf`] = await pdfFacts(page.url());
        }
        for (const [key, target] of Object.entries(step.targets ?? {})) {
          const point = await locate(page, target);
          const facts = await pageFacts(page);
          measurements[`${sideName}.${key}`] = point
            ? {
              target,
              documentTop: Math.round(point.top),
              screensDown: Number((point.top / facts.viewportHeight).toFixed(2)),
              pageHeight: facts.scrollHeight,
              viewportHeight: facts.viewportHeight,
            }
            : { target, found: false };
        }
        continue; // no visible effect, so no frame of its own
      } else {
        throw new Error(`${errand.id}/${sideName}/${step.id}: unsupported action ${step.action}`);
      }

      index += 1;
      const name = `${errand.id}-${sideName}-${String(index).padStart(2, "0")}-${step.id}`;
      const facts = await pageFacts(page);
      const file = await shoot(page, name);
      let strip = null;
      if (step.strip) {
        stripIndex += 1;
        strip = await writeStripFrame(
          path.join(outDir, file),
          `${slug}-journey-${errand.id}-${sideName}-${stripIndex}`,
        );
      }
      frames.push({
        step: step.id,
        action: step.action,
        counted: step.action === "tap",
        screen: Boolean(step.screen),
        note: step.note ?? null,
        file,
        strip,
        ...facts,
      });
      console.log(`  ${String(index).padStart(2, "0")} ${step.action.padEnd(6)} ${step.id}${step.action === "tap" ? "  ← tap" : ""}`);
    }
  } finally {
    await page.close();
  }

  return { ...countJourney(side), live: Boolean(side.live), frames, measurements };
}

const browser = await puppeteer.launch({
  executablePath: findChrome(),
  headless: "new",
  // Chrome's PDF viewer is slow to paint its first frame, and the menu errand
  // ends on one; the default 30 s protocol timeout trips on that screenshot.
  protocolTimeout: 180000,
  args: ["--hide-scrollbars", "--mute-audio", "--force-color-profile=srgb", "--disable-gpu"],
});

const summary = { slug, date: today, viewport: MOBILE_VIEW, errands: [] };
try {
  for (const errand of journey.errands) {
    const before = await walk(browser, errand, "before", errand.before);
    const after = await walk(browser, errand, "after", errand.after);
    summary.errands.push({ id: errand.id, label: errand.label, endsAt: errand.endsAt, before, after });
  }
} finally {
  await browser.close();
}

fs.writeFileSync(path.join(outDir, "summary.json"), `${JSON.stringify(summary, null, 2)}\n`);

const lines = [
  `# ${slug} journey audit — ${today}`,
  "",
  `Walked at ${MOBILE_VIEW.width}×${MOBILE_VIEW.height}, the live site and the concept, one errand at a time.`,
  "Both sides of the booking errand stop at the same place: the pub's own ResDiary widget,",
  "ready to choose a time. No personal details were entered and no reservation was made.",
  "",
  "| Errand | Side | Taps | Screens | Scrolls | Ends at |",
  "| --- | --- | ---: | ---: | ---: | --- |",
];
for (const errand of summary.errands) {
  for (const side of ["before", "after"]) {
    const data = errand[side];
    lines.push(
      `| ${errand.label} | ${side === "before" ? "Live site" : "Concept"} `
      + `| ${data.taps} | ${data.screens} | ${data.scrolls} | ${errand.endsAt} |`,
    );
  }
}
lines.push("", "## Measurements", "");
for (const errand of summary.errands) {
  for (const side of ["before", "after"]) {
    for (const [key, value] of Object.entries(errand[side].measurements)) {
      if (value.isPdf) {
        lines.push(
          `- **${errand.id} · ${key}** — ${value.pages}-page PDF, ${value.kilobytes} KB, `
          + `${value.widthPt}×${value.heightPt} pt (A4) = ${value.widthCssPx} CSS px wide. `
          + `Fitting it to a ${MOBILE_VIEW.width} px screen scales it to ${Math.round(value.fitScale * 100)} %.`,
        );
      } else if (value.found === false) {
        lines.push(`- **${errand.id} · ${key}** — \`${value.target}\` not present on the first screen.`);
      } else if (value.isPdf === false) {
        lines.push(`- **${errand.id} · ${key}** — not a PDF (${value.url}).`);
      } else {
        lines.push(
          `- **${errand.id} · ${key}** — \`${value.target}\` begins ${value.documentTop} px down `
          + `(${value.screensDown} screens) of a ${value.pageHeight} px page.`,
        );
      }
    }
  }
}
lines.push("", "## Steps", "");
for (const errand of summary.errands) {
  lines.push(`### ${errand.label}`, "");
  for (const side of ["before", "after"]) {
    lines.push(`**${side === "before" ? "Live site" : "Concept"}**`, "");
    for (const frame of errand[side].frames) {
      lines.push(`- \`${frame.file}\`${frame.counted ? " · **tap**" : ""}${frame.note ? ` — ${frame.note}` : ""}`);
    }
    lines.push("");
  }
}
fs.writeFileSync(path.join(outDir, "README.md"), `${lines.join("\n")}\n`);

console.log(`\nEvidence: ${path.relative(root, outDir)}`);
for (const errand of summary.errands) {
  console.log(
    `  ${errand.label}: live ${errand.before.taps} taps / ${errand.before.screens} screens`
    + ` → concept ${errand.after.taps} taps / ${errand.after.screens} screens`,
  );
}
