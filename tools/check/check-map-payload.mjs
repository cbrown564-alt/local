#!/usr/bin/env node
/**
 * Guard the emitted `/the-map/` HTML in dist/.
 *
 * Ensures that the directory and map page delivers a complete, accessible experience:
 * 1. Contains the map container and sidebar explorer controls.
 * 2. Contains both town selection triggers (Newcastle & Dundrum).
 * 3. Includes the civic update/correction form.
 * 4. Ensures no forbidden wording tropes ("most local businesses", etc.).
 *
 * Run: `node tools/check/check-lights-payload.mjs`
 */
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "..",
);

const distFile = path.join(projectRoot, "dist/the-map/index.html");

if (!existsSync(distFile)) {
  console.log("Directory & map payload check: dist/the-map/index.html not built yet.");
  process.exit(0);
}

const html = readFileSync(distFile, "utf8");
const errors = [];

/* --- 1. Forbidden phrasing checks --- */
const forbiddenPhrases = [
  /\bmost local businesses\b/i,
  /\bmost have no website\b/i,
  /\bmost have a website\b/i,
];

for (const pattern of forbiddenPhrases) {
  if (pattern.test(html)) {
    errors.push(`HTML contains forbidden phrase matching ${pattern}`);
  }
}

/* --- 2. Required layout elements --- */
if (!html.includes('id="leaflet-map"')) {
  errors.push("Missing #leaflet-map element in dist/the-map/index.html");
}

if (!html.includes('data-town-btn="Newcastle"') || !html.includes('data-town-btn="Dundrum"')) {
  errors.push("Missing town toggle buttons for Newcastle or Dundrum");
}

if (!html.includes("data-business-list")) {
  errors.push("Missing business list sidebar container");
}

if (!html.includes("data-business-profile")) {
  errors.push("Missing mini-profile container");
}

if (!html.includes("data-correction-form")) {
  errors.push("Missing correction/update form");
}

if (errors.length > 0) {
  console.error("Directory & map payload check failed:");
  for (const err of errors) console.error(`  - ${err}`);
  process.exit(1);
}

console.log(
  "Directory & map payload check passed: Leaflet map container, town toggles, sidebar explorer, and update form verified.",
);
