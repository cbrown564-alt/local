#!/usr/bin/env node
/**
 * Guards the deploy boundary.
 *
 * Everything under public/ is copied verbatim into the deployed site with no
 * noindex and no robots.txt entry unless one is added by hand. Two internal
 * artifacts have reached production this way: the scored prospect dataset at
 * /opportunities/ (23 July 2026) and the concept imagery audit at /audits/
 * (26 July 2026). This check fails the build on the third.
 *
 * It also reports held images and videos that nothing in src/ references any
 * more. That is a note rather than a failure — an unused file is not a leak —
 * but a withdrawn image makes any "Sources & limits" copy describing it false,
 * which is how three public case studies came to carry untrue sourcing claims.
 *
 *   node tools/check/check-public-assets.mjs            # guard, quiet summary
 *   node tools/check/check-public-assets.mjs --orphans  # list unreferenced assets
 */

import fs from "node:fs";
import path from "node:path";

const PUBLIC_DIR = "public";
const SRC_DIR = "src";

/** Top-level entries allowed to ship. Add deliberately, with a reason. */
const ALLOWED_TOP_LEVEL = new Set([
  "brand", // wordmark and favicon sources
  "media", // concept, comparison, place imagery and videos
  "favicon.svg",
  "robots.txt",
]);

/**
 * Extensions that read as working documents rather than site assets. A file
 * with one of these anywhere under public/ needs an explicit exemption.
 */
const DOCUMENT_EXTENSIONS = new Set([
  ".md",
  ".html",
  ".htm",
  ".json",
  ".csv",
  ".tsv",
  ".xlsx",
  ".xls",
  ".pdf",
  ".txt",
]);

/** Documents that are deliberately public, with the reason they must be. */
const ALLOWED_DOCUMENTS = new Map([
  [
    "media/place/ATTRIBUTION.md",
    "third-party photograph credits; the CC BY-SA licences require them to travel with the images",
  ],
  ["robots.txt", "crawler directives"],
]);

const ASSET_EXTENSIONS = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".svg",
  ".gif",
  ".avif",
  ".mp4",
  ".webm",
  ".ico",
  ".woff",
  ".woff2",
]);

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

const posix = (p) => p.split(path.sep).join("/");

const failures = [];

// 1. Unexpected top-level entries.
for (const entry of fs.readdirSync(PUBLIC_DIR, { withFileTypes: true })) {
  if (ALLOWED_TOP_LEVEL.has(entry.name)) continue;
  const kind = entry.isDirectory() ? "directory" : "file";
  failures.push(
    `public/${entry.name} — unexpected top-level ${kind}. Everything here deploys. ` +
      `If it is an internal artifact, move it to research/, docs/ or src/workbench/. ` +
      `If it genuinely belongs on the site, add it to ALLOWED_TOP_LEVEL in this script.`,
  );
}

// 2. Working documents anywhere under public/.
const publicFiles = walk(PUBLIC_DIR).map((f) =>
  posix(path.relative(PUBLIC_DIR, f)),
);

for (const rel of publicFiles) {
  const ext = path.extname(rel).toLowerCase();
  if (!DOCUMENT_EXTENSIONS.has(ext)) continue;
  if (ALLOWED_DOCUMENTS.has(rel)) continue;
  failures.push(
    `public/${rel} — a ${ext} document under public/ deploys as a reachable page. ` +
      `Move it out, or add it to ALLOWED_DOCUMENTS with the reason it must be public.`,
  );
}

if (failures.length > 0) {
  console.error("Public asset check failed:\n");
  for (const failure of failures) console.error(`  - ${failure}\n`);
  process.exit(1);
}

// 3. Held assets that nothing references (reported, never fatal).
const srcFiles = walk(SRC_DIR).filter((f) =>
  /\.(astro|ts|tsx|js|mjs|css|json|md)$/.test(f),
);
const haystack = srcFiles.map((f) => fs.readFileSync(f, "utf8")).join("\n");

/** Collapse responsive derivatives onto the master they were built from. */
function logicalName(rel) {
  return rel
    .replace(/\.[a-z0-9]+$/i, "")
    .replace(/-(?:640|1265)$/, "");
}

const logical = new Map();
for (const rel of publicFiles) {
  const ext = path.extname(rel).toLowerCase();
  if (!ASSET_EXTENSIONS.has(ext)) continue;
  if (rel.startsWith("brand/")) continue; // design sources, not page assets
  const name = logicalName(rel);
  if (!logical.has(name)) logical.set(name, []);
  logical.get(name).push(rel);
}

const orphans = [...logical.entries()]
  .filter(([name]) => !haystack.includes(path.basename(name)))
  .sort(([a], [b]) => a.localeCompare(b));

const showOrphans = process.argv.includes("--orphans");

if (orphans.length > 0) {
  const fileCount = orphans.reduce((n, [, files]) => n + files.length, 0);
  if (showOrphans) {
    console.log(
      `${orphans.length} held asset(s) are not referenced from src/ (${fileCount} files including derivatives):\n`,
    );
    for (const [name, files] of orphans) {
      console.log(`  ${name}  (${files.length} file${files.length === 1 ? "" : "s"})`);
    }
    console.log(
      "\nAn unused file is not a problem in itself. It is a problem when a" +
        '\n"Sources & limits" block still describes it. Record status in' +
        "\nresearch/image-provenance.md.\n",
    );
  } else {
    console.log(
      `Public asset check passed. Note: ${orphans.length} held asset(s) unreferenced from src/ — ` +
        `run \`node tools/check/check-public-assets.mjs --orphans\` to list them.`,
    );
  }
} else {
  console.log("Public asset check passed.");
}
