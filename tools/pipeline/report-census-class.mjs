#!/usr/bin/env node
/**
 * Prints how every census row was classified, so the rules in
 * `census-class.mjs` can be read and argued with rather than trusted.
 *
 *   node tools/pipeline/report-census-class.mjs            summary
 *   node tools/pipeline/report-census-class.mjs --list      every row, by class
 *   node tools/pipeline/report-census-class.mjs --class "Needs review"
 */
import { readFileSync } from "node:fs";
import { censusClass, TRADING } from "./census-class.mjs";

const rows = JSON.parse(
  readFileSync(new URL("../../src/site/data/businesses.json", import.meta.url), "utf8"),
);

const args = process.argv.slice(2);
const wanted = args.includes("--class") ? args[args.indexOf("--class") + 1] : null;
const list = args.includes("--list") || wanted;

const lit = (row) =>
  row.websiteStatus === "HTTPS website" || row.websiteStatus === "HTTP website";
const placeable = (row) => typeof row.lat === "number" && typeof row.lon === "number";

const byClass = new Map();
for (const row of rows) {
  const cls = censusClass(row);
  if (!byClass.has(cls)) byClass.set(cls, []);
  byClass.get(cls).push(row);
}

if (list) {
  for (const [cls, group] of [...byClass].sort((a, b) => b[1].length - a[1].length)) {
    if (wanted && cls !== wanted) continue;
    console.log(`\n=== ${cls} (${group.length}) ===`);
    for (const row of [...group].sort((a, b) => a.town.localeCompare(b.town) || a.name.localeCompare(b.name))) {
      const flags = [lit(row) ? "lit" : "dark", placeable(row) ? "mapped" : "unmapped"];
      console.log(`  ${row.town.padEnd(10)} ${flags.join("/").padEnd(14)} ${row.name}`);
    }
  }
  process.exit(0);
}

console.log(`Census rows: ${rows.length}\n`);
console.log("Class                        rows    lit   dark  mapped");
for (const [cls, group] of [...byClass].sort((a, b) => b[1].length - a[1].length)) {
  console.log(
    `  ${cls.padEnd(26)}${String(group.length).padStart(4)}` +
      `${String(group.filter(lit).length).padStart(7)}` +
      `${String(group.filter((r) => !lit(r)).length).padStart(7)}` +
      `${String(group.filter(placeable).length).padStart(8)}`,
  );
}

const trading = byClass.get(TRADING) ?? [];
const mapped = trading.filter(placeable);
console.log(`\nThe publishable universe — ${TRADING}`);
console.log(`  total                ${trading.length}`);
console.log(`  lit                  ${trading.filter(lit).length}`);
console.log(`  dark                 ${trading.filter((r) => !lit(r)).length}`);
console.log(`  placeable on a map   ${mapped.length}`);
console.log(`    of those, dark     ${mapped.filter((r) => !lit(r)).length}`);

// Independently confirmed means a joined verification object, not a leftover
// Verified-looking dataConfidence string after a rename orphaned the join.
const unconfirmed = mapped.filter((r) => !lit(r) && !r.verification);
console.log(`\nDark, mapped, trading — but never independently confirmed: ${unconfirmed.length}`);
console.log("This is the number the verification round has to reduce (no verification object).");
if (unconfirmed.length) {
  for (const row of unconfirmed) {
    console.log(`  - ${row.town}: ${row.name}`);
  }
}
