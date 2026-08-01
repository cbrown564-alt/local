#!/usr/bin/env node
/**
 * Ensures every public transformation slug and the fixed route cards have a
 * committed Open Graph JPEG under public/media/og/.
 */

import fs from "node:fs";
import path from "node:path";
import { projectRoot, readPublicTransformationSlugs, readTransformationCandidateSlugs } from "../lib/public-slugs.mjs";

const ogDir = path.join(projectRoot, "public", "media", "og");
const fixed = ["studio", "home", "request", "transformations"];
const publicSlugs = readPublicTransformationSlugs();
const candidateSlugs = readTransformationCandidateSlugs();
const required = [...fixed, ...publicSlugs];
const optionalMissing = candidateSlugs
  .filter((slug) => !publicSlugs.includes(slug))
  .filter((slug) => !fs.existsSync(path.join(ogDir, `${slug}.jpg`)));

const missing = required.filter((name) => !fs.existsSync(path.join(ogDir, `${name}.jpg`)));

if (missing.length > 0) {
  console.error("Open Graph asset check failed. Missing share cards:\n");
  for (const name of missing) {
    console.error(`  - public/media/og/${name}.jpg`);
  }
  console.error(
    "\nRegenerate with `pnpm dev` running, then:\n  node tools/capture/capture-og-cards.mjs\n",
  );
  process.exit(1);
}

console.log(`Open Graph asset check passed (${required.length} required cards).`);
if (optionalMissing.length > 0) {
  console.log(
    `Note: ${optionalMissing.length} non-public candidate(s) lack share cards — ` +
      `concept pages fall back to studio.jpg: ${optionalMissing.join(", ")}`,
  );
}
