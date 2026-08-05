#!/usr/bin/env node
/**
 * The rebuild canvas is decoration. This check holds it to that.
 *
 * Wherever a `RebuildStage` canvas appears in the built HTML, the page must
 * still carry the thing the canvas is drawing over: both images with their real
 * alt text, and a manual comparison control the reader can work by hand. The
 * canvas itself must be `aria-hidden`. A page that loses any of those has
 * stopped being a comparison with an animation over it and become an animation.
 *
 * See `docs/sensory-system-plan.md`, phase 1 — "Check".
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const DIST = new URL("../../dist/", import.meta.url).pathname;

function htmlFiles(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) out.push(...htmlFiles(path));
    else if (entry.endsWith(".html")) out.push(path);
  }
  return out;
}

/** Attributes of the one `<canvas …>` tag, or null. */
function buildCanvas(html) {
  return html.match(/<canvas[^>]*data-rebuild-canvas[^>]*>/i)?.[0] ?? null;
}

/** `alt="…"` of the tag containing `marker`, or null if absent or empty. */
function altFor(html, marker) {
  const tag = html.match(new RegExp(`<img[^>]*${marker}[^>]*>`, "i"))?.[0];
  if (!tag) return null;
  const alt = tag.match(/\salt="([^"]*)"/i)?.[1];
  return alt && alt.trim() ? alt.trim() : null;
}

let failures = 0;
let checked = 0;

for (const file of htmlFiles(DIST)) {
  const html = readFileSync(file, "utf8");
  const canvas = buildCanvas(html);
  if (!canvas) continue;

  const page = relative(DIST, file);
  checked += 1;
  const fail = (message) => {
    console.error(`✗ ${page}: ${message}`);
    failures += 1;
  };

  if (!/aria-hidden/i.test(canvas)) {
    fail("the build canvas is not aria-hidden — it is decorative and must be");
  }
  // The images are the meaning. They stay in the DOM for search, print, no-JS
  // and any reader who never sees the canvas at all.
  if (!altFor(html, "data-rebuild-before")) {
    fail("the before image is missing or has no alt text");
  }
  if (!altFor(html, "data-rebuild-after")) {
    fail("the after image is missing or has no alt text");
  }
  // Reduced motion and no-JS get no build at all, so the handle is the only
  // way those readers ever see both sides.
  if (!/class="comparison-control"/.test(html)) {
    fail("the manual compare control is missing");
  }
  if (!/data-divider/.test(html)) {
    fail("the drag handle is missing");
  }
}

if (checked === 0) {
  console.error(
    "✗ no page in dist/ carries a rebuild canvas — run `pnpm build` first, or the stage has been removed from every surface",
  );
  process.exit(1);
}

if (failures > 0) {
  console.error(`\n${failures} problem(s) across ${checked} page(s).`);
  process.exit(1);
}

console.log(`✓ rebuild stage: ${checked} page(s) keep both images, their alt text and the manual compare`);
