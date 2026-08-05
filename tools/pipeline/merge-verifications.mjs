#!/usr/bin/env node
/**
 * Merges a staging JSONL of verification records into
 * `research/pipeline/verifications.json`.
 *
 * The verification pass is long — hundreds of businesses, four checks each —
 * so it has to survive being interrupted and resumed. Findings are appended
 * one JSON object per line as they are made, and folded in here. Re-running is
 * safe: a record replaces an earlier one for the same town+name, using the
 * same key and alias table as the normaliser, so a business re-checked later
 * updates rather than duplicating.
 *
 *   node tools/pipeline/merge-verifications.mjs --in staging.jsonl [--as-of 2026-08-05]
 */
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);
const arg = (name, fallback) => {
  const i = args.indexOf(name);
  return i === -1 ? fallback : args[i + 1];
};
const inFile = arg("--in");
if (!inFile) {
  console.error("usage: merge-verifications.mjs --in <staging.jsonl> [--as-of <date>]");
  process.exit(1);
}

const file = path.resolve(import.meta.dirname, "..", "..", "research", "pipeline", "verifications.json");
const data = JSON.parse(readFileSync(file, "utf8"));

const norm = (value = "") =>
  value.normalize("NFKD").replace(/[’‘]/g, "'").replace(/&amp;/g, "&")
    .replace(/[^a-zA-Z0-9]+/g, " ").trim().toLowerCase();
const aliases = new Map([
  ["bao and bento", "bao bento"],
  ["chinese sea palace", "sea palace"],
  ["tonn ruray", "tonn ruray cafe"],
  ["the tool centre", "tool centre"],
  ["the avoca hotel", "avoca restaurant and hotel"],
]);
const key = (record) => {
  const n = norm(record.name);
  return `${record.town}|${aliases.get(n) || n}`;
};

const REQUIRED = ["town", "name", "verifiedOn", "tradingStatus", "tradingEvidence", "digitalPresence", "sources", "shortlist"];

const incoming = readFileSync(inFile, "utf8")
  .split("\n").map((line) => line.trim()).filter(Boolean)
  .map((line, i) => {
    let record;
    try { record = JSON.parse(line); }
    catch (error) { throw new Error(`line ${i + 1}: ${error.message}`); }
    const missing = REQUIRED.filter((field) => record[field] === undefined);
    if (missing.length) throw new Error(`line ${i + 1} (${record.name}): missing ${missing.join(", ")}`);
    // The method is explicit that unconfirmed facts stay unconfirmed. A record
    // claiming a status with neither a source nor an explicit first-hand basis
    // is exactly the inference the method forbids, so it fails here.
    if (!record.sources.length && !record.basis) {
      throw new Error(`line ${i + 1} (${record.name}): no sources and no stated basis`);
    }
    return record;
  });

const merged = new Map(data.records.map((record) => [key(record), record]));
let added = 0;
let updated = 0;
for (const record of incoming) {
  if (merged.has(key(record))) updated++; else added++;
  merged.set(key(record), record);
}

data.records = [...merged.values()].sort((a, b) =>
  a.town.localeCompare(b.town) || a.name.localeCompare(b.name));
data.asOf = arg("--as-of", data.asOf);
writeFileSync(file, `${JSON.stringify(data, null, 1)}\n`);

const tally = data.records.reduce((acc, r) => {
  acc[r.tradingStatus] = (acc[r.tradingStatus] ?? 0) + 1;
  return acc;
}, {});
console.log(JSON.stringify({ added, updated, total: data.records.length, byStatus: tally }, null, 2));
