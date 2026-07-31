#!/usr/bin/env node
/**
 * Fail the build when studio/meta narration slips into guest-facing concept
 * copy. Honesty belongs in ConceptLayout banner notes, research/, and code
 * comments — not in page body, captions, alts, or footers.
 */
import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { projectRoot } from "../lib/public-slugs.mjs";

const conceptsRoot = path.join(projectRoot, "src", "concepts");
const extensions = new Set([".astro", ".ts", ".tsx"]);

/** Phrases that mean the page is talking about itself as a concept/demo. */
const banned = [
  /\bthis concept\b/i,
  /\bthis prototype\b/i,
  /\bthis screen demonstrates\b/i,
  /\bfor design evaluation\b/i,
  /\bgenerated illustration\b/i,
  /\bnot a photograph of\b/i,
  /\billustrative flavour\b/i,
  /\billustrative queue\b/i,
  /\billustrative structure\b/i,
  /\billustrative sample\b/i,
  /\billustrative concept\b/i,
  /\billustrative worked\b/i,
  /\billustrative placeholder\b/i,
  /\billustrative range\b/i,
  /\billustrative artwork\b/i,
  /\bread here, not downloaded\b/i,
  /\bproposed update slot\b/i,
  /\bresearch file\b/i,
  /\bfrom their public website\b/i,
  /\btheir public website\b/i,
  /\bprototype handoff\b/i,
  /\babout this concept\b/i,
  /\bindependent concept by mourne made\b/i,
  /\bmourne made\b/i,
];

const stripComments = (source) =>
  source
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/(^|[^:])\/\/.*$/gm, "$1");

const walk = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "_shell") return [];
      return walk(full);
    }
    if (!extensions.has(path.extname(entry.name))) return [];
    return [full];
  });

const findings = [];

for (const file of walk(conceptsRoot)) {
  const relative = path.relative(projectRoot, file);
  const scanned = stripComments(readFileSync(file, "utf8"));
  const lines = scanned.split(/\r?\n/);

  for (const [index, line] of lines.entries()) {
    // bannerNote is intentional honesty chrome — leave it alone.
    if (/\bbannerNote\s*=/.test(line)) continue;

    for (const pattern of banned) {
      if (!pattern.test(line)) continue;
      findings.push({
        file: relative,
        line: index + 1,
        text: line.trim().slice(0, 160),
        pattern: pattern.source,
      });
    }
  }
}

if (findings.length > 0) {
  console.error(
    "Guest-facing concept copy still narrates the website/concept itself.\n" +
      "Speak as the business. Studio voice belongs only in ConceptLayout banners,\n" +
      "research/, and code comments.\n",
  );
  for (const hit of findings) {
    console.error(`${hit.file}:${hit.line}: /${hit.pattern}/\n  ${hit.text}\n`);
  }
  process.exit(1);
}

console.log(
  `Concept guest-voice check passed (${walk(conceptsRoot).length} files).`,
);
