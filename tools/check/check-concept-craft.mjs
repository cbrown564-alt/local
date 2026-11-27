#!/usr/bin/env node
/**
 * Static craft & structural guard for concept packs in src/concepts/.
 *
 * Enforces objective mechanical invariants learned from Waves 1–5 without
 * imposing a single layout template:
 *   1. mm:enquiry events must dispatch on `window`, never `document`.
 *   2. Elements combining a `*-wrap` rail class with a second class must not
 *      have that second class override width with `width: 100%`.
 *   3. Concept headers wrapping a single `.xx-wrap` / `.xx-header-inner` child
 *      must override concept-shell.css's `header { display: flex }` (with
 *      `display: block` or `display: grid`) or give the inner wrapper explicit
 *      `width` so flex item sizing does not shrink-wrap the header.
 *   4. Hero `h1` rules in styles.css should declare an explicit `font-family`
 *      so they never silently inherit global.css's fallback display font.
 *
 * Also prints a non-blocking portfolio typography diversity report (serif vs.
 * sans-serif display faces, `<mark>` vs. `<em>` headline emphasis).
 *
 * See docs/concept-craft-standards.md and .cursor/rules/concept-craft.mdc.
 */
import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { projectRoot } from "../lib/public-slugs.mjs";

const conceptsRoot = path.join(projectRoot, "src", "concepts");
const strictAll = process.argv.includes("--all");

const stripCssComments = (css) => css.replace(/\/\*[\s\S]*?\*\//g, "");
const stripCodeComments = (src) =>
  src
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/(^|[^:])\/\/.*$/gm, "$1");

const parseCssBlocks = (css) => {
  const cleaned = stripCssComments(css);
  const blocks = [];
  const re = /([^{}@]+)\{([^{}]+)\}/g;
  let match;
  while ((match = re.exec(cleaned)) !== null) {
    const selectors = match[1]
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    blocks.push({ selectors, body: match[2] });
  }
  return blocks;
};

const slugs = readdirSync(conceptsRoot, { withFileTypes: true })
  .filter((entry) => entry.isDirectory() && !entry.name.startsWith("_"))
  .map((entry) => entry.name)
  .filter((slug) => existsSync(path.join(conceptsRoot, slug, "home.astro")))
  .sort();

const errors = [];
const warnings = [];
const stats = {
  total: 0,
  serif: 0,
  sans: 0,
  monoOrUnknown: 0,
  withMark: 0,
  withEm: 0,
  plain: 0,
};

for (const slug of slugs) {
  const dir = path.join(conceptsRoot, slug);
  const homePath = path.join(dir, "home.astro");
  const cssPath = path.join(dir, "styles.css");
  const relCss = path.relative(projectRoot, cssPath);

  const homeRaw = readFileSync(homePath, "utf8");
  const home = stripCodeComments(homeRaw);
  const css = existsSync(cssPath) ? readFileSync(cssPath, "utf8") : "";
  const cssBlocks = css ? parseCssBlocks(css) : [];

  // 1. Check mm:enquiry event target across all .astro files in the concept folder
  for (const file of readdirSync(dir).filter((f) => f.endsWith(".astro"))) {
    const full = path.join(dir, file);
    const content = stripCodeComments(readFileSync(full, "utf8"));
    if (
      /document\.dispatchEvent\s*\([^)]*mm:enquiry/.test(content) ||
      (/new\s+CustomEvent\s*\(\s*["']mm:enquiry["']/.test(content) &&
        /document\.dispatchEvent\s*\(/.test(content) &&
        !/window\.dispatchEvent\s*\(/.test(content))
    ) {
      errors.push({
        file: path.relative(projectRoot, full),
        rule: "enquiry-dispatch-target",
        message:
          'Dispatches `mm:enquiry` on `document` instead of `window`. Use `window.dispatchEvent(...)` so ConceptLayout catches it.',
      });
    }
  }

  // 2. Check for `width: 100%` on a secondary class paired with a `*-wrap` rail class
  if (cssBlocks.length > 0) {
    const wrapClassPairs = new Set();
    for (const m of home.matchAll(/class="([^"]+)"/g)) {
      const classes = m[1].trim().split(/\s+/);
      const hasWrap = classes.some((c) => /(?:^|-)wrap$/.test(c));
      if (!hasWrap || classes.length < 2) continue;
      for (const cls of classes) {
        if (!/(?:^|-)wrap$/.test(cls)) wrapClassPairs.add(cls);
      }
    }
    for (const cls of wrapClassPairs) {
      const escaped = cls.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const exactSelRe = new RegExp(`^\\.${escaped}$`);
      const clobbersWidth = cssBlocks.some(
        (b) =>
          b.selectors.some((s) => exactSelRe.test(s)) &&
          /(?:^|;)\s*width\s*:\s*100%\s*(?:;|$)/.test(b.body),
      );
      if (clobbersWidth) {
        errors.push({
          file: relCss,
          rule: "wrap-width-override",
          message: `Selector \`.${cls}\` sets \`width: 100%\` on an element that also carries a \`*-wrap\` rail class, breaking horizontal alignment.`,
        });
      }
    }
  }

  // 3. Check for <header class="xx-header"> wrapping a single inner container
  //    without overriding concept-shell.css's `header { display: flex }`
  const headerMatch = home.match(/<header\b[^>]*class="([^"]+)"[^>]*>([\s\S]*?)<\/header>/i);
  if (headerMatch && cssBlocks.length > 0) {
    const headerClasses = headerMatch[1].trim().split(/\s+/);
    const innerHtml = headerMatch[2].trim();
    const startsWithSingleWrapper =
      /^<div\b[^>]*class="[^"]*(?:wrap|inner|grid)[^"]*"[^>]*>/i.test(innerHtml);
    if (startsWithSingleWrapper) {
      const hasDisplayOverride = headerClasses.some((cls) => {
        const escaped = cls.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const selRe = new RegExp(`(?:^|\\s)\\.${escaped}$`);
        return cssBlocks.some(
          (b) =>
            b.selectors.some((s) => selRe.test(s)) &&
            /(?:^|;)\s*display\s*:\s*(?:block|grid)\b/.test(b.body),
        );
      });
      // Also accept if the inner wrapper itself explicitly sets width: min(...) or width: 100%
      const innerClassMatch = innerHtml.match(/^<div\b[^>]*class="([^"]+)"/i);
      const innerClasses = innerClassMatch ? innerClassMatch[1].trim().split(/\s+/) : [];
      const innerHasExplicitWidth = innerClasses.some((cls) => {
        const escaped = cls.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const selRe = new RegExp(`(?:^|\\s)\\.${escaped}$`);
        return cssBlocks.some(
          (b) =>
            b.selectors.some((s) => selRe.test(s)) &&
            /(?:^|;)\s*width\s*:\s*(?:min\(|100%)/.test(b.body),
        );
      });

      if (!hasDisplayOverride && !innerHasExplicitWidth) {
        errors.push({
          file: relCss,
          rule: "header-flex-shrink",
          message: `<header class="${headerMatch[1]}"> wraps a single inner container without \`display: block\` (or explicit inner \`width\`), causing concept-shell.css to shrink-wrap it.`,
        });
      }
    }
  }

  // 4. Typography & H1 emphasis stats + font-family check
  const h1Match = home.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i);
  if (h1Match) {
    stats.total++;
    const h1Inner = h1Match[1];
    const hasMark = /<mark\b/i.test(h1Inner);
    const hasEm = /<em\b/i.test(h1Inner);
    if (hasMark) stats.withMark++;
    else if (hasEm) stats.withEm++;
    else stats.plain++;

    // Find H1 font-family in CSS
    const h1Blocks = cssBlocks.filter((b) =>
      b.selectors.some((s) => /\bh1\b/.test(s) && !/\bh1\s+(?:em|mark|span)\b/.test(s)),
    );
    let declaredFont = null;
    for (const b of h1Blocks) {
      const fm = b.body.match(/font-family\s*:\s*([^;]+)/i);
      if (fm) {
        declaredFont = fm[1].trim();
        break;
      }
    }

    if (!declaredFont && cssBlocks.length > 0 && h1Blocks.length > 0) {
      const target = strictAll ? errors : warnings;
      target.push({
        file: relCss,
        rule: "h1-explicit-font",
        message:
          "Hero `h1` rule does not explicitly declare `font-family` and may silently inherit `global.css`'s fallback display font.",
      });
    }

    // Resolve CSS custom property if var(--...)
    let resolvedFont = declaredFont || "";
    const varMatch = resolvedFont.match(/var\(\s*(--[a-z0-9-]+)\s*\)/i);
    if (varMatch) {
      const varRe = new RegExp(`${varMatch[1]}\\s*:\\s*([^;]+);`);
      const vm = css.match(varRe);
      if (vm) resolvedFont = vm[1].trim();
    }
    if (!resolvedFont) {
      const displayVar =
        css.match(/--[a-z0-9-]*(?:display|serif|head)[a-z0-9-]*\s*:\s*([^;]+);/i) ||
        css.match(/--[a-z0-9-]*sans[a-z0-9-]*\s*:\s*([^;]+);/i);
      if (displayVar) resolvedFont = displayVar[1].trim();
    }

    if (/\bsans-serif\b/i.test(resolvedFont)) {
      stats.sans++;
    } else if (/\bserif\b/i.test(resolvedFont)) {
      stats.serif++;
    } else {
      stats.monoOrUnknown++;
    }
  }
}

if (warnings.length > 0) {
  console.warn(`Concept craft warnings (${warnings.length}):`);
  for (const w of warnings) {
    console.warn(`  [warn:${w.rule}] ${w.file}: ${w.message}`);
  }
  console.warn("");
}

if (errors.length > 0) {
  console.error(`Concept craft check failed (${errors.length} defect${errors.length === 1 ? "" : "s"}):\n`);
  for (const e of errors) {
    console.error(`  [error:${e.rule}] ${e.file}\n    ${e.message}\n`);
  }
  process.exit(1);
}

const serifPct = stats.total ? Math.round((stats.serif / stats.total) * 100) : 0;
const sansPct = stats.total ? Math.round((stats.sans / stats.total) * 100) : 0;

console.log(
  `Concept craft check passed (${slugs.length} concepts · 0 defects${warnings.length ? `, ${warnings.length} legacy h1-font warnings` : ""}).`,
);
console.log(
  `Typography mix (${stats.total} H1s): ${stats.serif} serif (${serifPct}%), ${stats.sans} sans-serif (${sansPct}%)${stats.monoOrUnknown ? `, ${stats.monoOrUnknown} other` : ""} · emphasis: ${stats.withMark} <mark>, ${stats.withEm} <em>, ${stats.plain} plain.`,
);
if (serifPct > 72) {
  console.log(
    `Advisory: serif H1 share is ${serifPct}% — consider highlighted sans-serif headlines on upcoming modern trades/venues (see docs/concept-craft-standards.md).`,
  );
}
