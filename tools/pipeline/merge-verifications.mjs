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
// Keep in sync with normalize-businesses.mjs — corrected names must key to the
// verification-record name or a re-merge orphans the earlier finding.
const aliases = new Map([
  ["bao and bento", "bao bento"],
  ["chinese sea palace", "sea palace"],
  ["tonn ruray", "tonn ruray cafe"],
  ["the tool centre", "tool centre"],
  ["the avoca hotel", "avoca restaurant and hotel"],
  ["art gallery and picture framing", "art gallery and picture framining"],
  ["base coffee company", "base coffee"],
  ["simon brien bradley", "bradley"],
  ["bu trading", "bu"],
  ["bundle baby", "bundle baby nursery store"],
  ["newcastle car and truck wash", "car and truck wash"],
  ["castle corrigs house", "castlecorrigs house bed and breakfast"],
  ["coco s adventure playground", "cocos"],
  // Cookie Jar Unit 4 and Cookie Jar at 121 Main Street are distinct FSA
  // premises — do not alias them together.
  ["crystal clean", "cryral clean"],
  ["deja vu", "deja vu hair company"],
  ["dominic mcinerney solicitors", "dominic mcinerney"],
  ["donard dental laboratories", "donard dental laboratory"],
  ["first4floors", "first 4 floors"],
  ["fish farm", "fish and farm"],
  ["funland newcastle", "fun land"],
  ["the gadget xchange", "gadget exchange"],
  // Hale's (20 Main Street shop) and Hales Fruit Wholesale (Dundrum Road)
  // stay distinct census rows even when they share a company name.
  ["herrons country fried chicken", "herron s fried chicken"],
  ["hillen architects", "hillen"],
  ["home instead care agency", "home instead care agecy"],
  ["hugh mccann s cafe bar", "hugh mccanns"],
  ["joyland amusement centres", "joyland"],
  ["keown nugent solicitors ltd", "keown nugent solicitor"],
  ["lindsay graham estate agents", "lindsay graham"],
  ["p t maguire limited", "maguires"],
  ["marine wellness", "marine sports"],
  ["cafe mauds", "mauds cafe"],
  ["mcclure s funeral service", "mcclure s funeral services"],
  ["mccomb 4x4", "mccombs 4x4"],
  ["mccready footwear", "mccready shoe style"],
  ["p j mcgloin optician", "mcgloin"],
  ["mckeevers chemists", "mckeever s"],
  ["michael f curran", "michael f curren solicitor"],
  ["morelli s ice cream", "morelli"],
  ["mourne magic house riverside luxury in newcastle", "mourne magic house"],
  ["macken s bar restaurant", "n macken"],
  ["fix auto newcastle ni", "newcastle accident repair"],
  ["lower limb clinic", "newcastle footcare"],
  ["nikis kitchen cafe", "niki s kitchen cafe"],
  ["no 9 experts in hair beauty", "no 9 hair and beauty"],
  ["nutty chef sandwich bar", "nutty chef"],
  ["o hares", "o hare s pub"],
  ["pacha restaurant", "pacha"],
  ["paulies gym", "paulie s gym"],
  ["peak financial solutions trading style of peak fs ltd", "peak financial solutions"],
  ["piccolo kitchen ltd", "piccolo kitchen"],
  ["pizza umami ltd", "pizza umami"],
  ["pretty woman boutique limited", "pretty woman"],
  ["primal effect coffee", "primal coffee"],
  ["railway street cafe brew bar", "railway street cafe and brew bar"],
  ["the ritz", "ritz"],
  ["salir restaurant", "salis"],
  ["savoy cafe", "savoy"],
  ["scott paints supplies", "scott paints"],
  ["seamus delaney law", "seamus delaney solicitors"],
  ["the shimna cafe", "shimna cafe"],
  ["shimna taxis ltd", "shimna taxis"],
  ["small s butchers deli ltd", "smalls"],
  ["specsxpress opticians", "specs xpress"],
  ["spudz co", "spuds and co"],
  ["stephen morgan funeral directors", "stephen morgan funeral director"],
  ["sucos shake n juice", "sucos juice bar"],
  ["ireland s appliance centre", "the appliance centre"],
  ["the bonbon", "the bon bon"],
  ["rock pool", "the rock pool"],
  ["the studio makeup beauty", "the studio"],
  ["medicare thorntons pharmacy", "thornton s pharmacy"],
  ["thumbelina toy shop", "thumbelina"],
  ["toals bookmakers", "toals"],
  ["turkish kebab pizza house", "turkish kebab and pizza"],
  ["wadsworth of newcastle", "wadsworth"],
  ["the wool shop", "wool shop"],
  ["zenith hair consultants", "zenith"],
  ["morellis", "morelli"],
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
