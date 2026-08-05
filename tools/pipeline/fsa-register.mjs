#!/usr/bin/env node
/**
 * Dated trading evidence, at census scale, for every food-handling business.
 *
 * Step 2 of the verification method asks for evidence with a visible date, and
 * warns that OpenStreetMap-only records carry none at all. The Food Standards
 * Agency's hygiene-rating register answers exactly that question for a large
 * share of a seaside town's trade — cafés, takeaways, pubs, hotels, guest
 * houses, bakeries, butchers, convenience shops — because an inspection is a
 * dated visit by an environmental health officer to premises that were open.
 *
 * That makes an FHRS record the strongest single source available here: it is
 * first-hand, dated, official, and free of a search engine's guesswork. Its
 * limits matter just as much, and callers must respect both:
 *
 *   - **Presence proves trading as of the inspection date, not today.** A 2019
 *     rating is evidence of 2019. This tool reports the date; it never says
 *     "open".
 *   - **Absence proves nothing whatever.** A shoe shop, solicitor or barber
 *     never appears, because they handle no food. Absence must never be read
 *     as a closure.
 *   - **A name match is not an identity match.** Matching is by name *and*
 *     location, and every match is scored and reported so a human can reject
 *     it. See step 4: disambiguate before accepting.
 *
 *   node tools/pipeline/fsa-register.mjs --out fsa-matches.json
 */
import { readFileSync, writeFileSync } from "node:fs";
import { setTimeout as delay } from "node:timers/promises";
import { censusClass, TRADING } from "./census-class.mjs";

const args = process.argv.slice(2);
const arg = (name, fallback) => {
  const i = args.indexOf(name);
  return i === -1 ? fallback : args[i + 1];
};
const outFile = arg("--out");
if (!outFile) {
  console.error("usage: fsa-register.mjs --out <fsa-matches.json>");
  process.exit(1);
}

const AUTHORITY_ID = 145; // Newry, Mourne and Down
const API = "https://api.ratings.food.gov.uk";

async function fetchPage(pageNumber) {
  const res = await fetch(
    `${API}/Establishments?localAuthorityId=${AUTHORITY_ID}&pageNumber=${pageNumber}&pageSize=200`,
    { headers: { "x-api-version": "2", accept: "application/json" } },
  );
  if (!res.ok) throw new Error(`FSA ${res.status} on page ${pageNumber}`);
  return res.json();
}

const establishments = [];
let page = 1;
for (;;) {
  const body = await fetchPage(page);
  establishments.push(...body.establishments);
  process.stderr.write(`\rfetched ${establishments.length}/${body.meta.totalCount}`);
  if (establishments.length >= body.meta.totalCount || !body.establishments.length) break;
  page++;
  await delay(200);
}
process.stderr.write("\n");

/** Great-circle distance in metres. */
function distance(a, b) {
  const R = 6_371_000;
  const toRad = (d) => (d * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLon = toRad(b.lon - a.lon);
  const h = Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

const norm = (value = "") =>
  value.normalize("NFKD").replace(/[’‘]/g, "'").replace(/&amp;/g, "&")
    .replace(/[^a-zA-Z0-9]+/g, " ").trim().toLowerCase();

/** Words that carry no identifying weight when comparing two business names. */
const STOP = new Set(["the", "and", "ltd", "limited", "co", "company", "newcastle",
  "dundrum", "down", "ni", "northern", "ireland", "restaurant", "cafe", "bar",
  "shop", "store", "s"]);
const tokens = (name) => new Set(norm(name).split(" ").filter((t) => t && !STOP.has(t)));

/**
 * Name similarity as the share of the *larger* token set that is shared, so
 * "Quinn's" still matches "QUINNS BAR AND RESTAURANT" — the generic words are
 * stopped out — while a name that is merely a subset of another does not.
 * Dividing by the smaller set scored "Harbour House" against "Harbour Shop" at
 * 1.0 and called it a confident identity match on two different premises.
 */
function similarity(a, b) {
  const A = tokens(a);
  const B = tokens(b);
  if (!A.size || !B.size) return 0;
  let shared = 0;
  for (const token of A) {
    if (B.has(token)) { shared++; continue; }
    // Catch plural/possessive variants: quinn / quinns.
    for (const other of B) {
      if (other.length > 3 && (other.startsWith(token) || token.startsWith(other))
        && Math.abs(other.length - token.length) <= 2) { shared++; break; }
    }
  }
  return shared / Math.max(A.size, B.size);
}

const rows = JSON.parse(
  readFileSync(new URL("../../src/site/data/businesses.json", import.meta.url), "utf8"),
).filter((row) => censusClass(row) === TRADING);

/**
 * Address agreement, independent of both name and coordinates. Roughly a third
 * of the register carries no geocode at all — Arley House B&B among them — and
 * a franchised shop can trade under a name the census never recorded, so
 * "12 Main Street BT33 0LU" is often the only thing the two records share.
 * Returns "postcode+number", "postcode", or null.
 */
function addressAgreement(row, e) {
  const rowPostcode = norm(row.postcode || row.address).match(/bt\d{1,2} ?\d[a-z]{2}/)?.[0]?.replace(" ", "");
  const ePostcode = norm(e.PostCode || "").replace(/\s/g, "");
  if (!rowPostcode || !ePostcode || rowPostcode !== ePostcode) return null;
  const number = (text = "") => text.match(/\b(\d{1,4})[a-z]?\b/)?.[1] ?? null;
  const rowNumber = number(row.address);
  const eNumber = number(e.AddressLine1 || "");
  return rowNumber && eNumber && rowNumber === eNumber ? "postcode+number" : "postcode";
}

const matches = [];
for (const row of rows) {
  const candidates = [];
  for (const e of establishments) {
    const geocoded = e.geocode && e.geocode.latitude && e.geocode.longitude;
    const score = similarity(row.name, e.BusinessName);
    const address = addressAgreement(row, e);
    // A weak name still earns a look when the address agrees exactly; a strong
    // name still earns one when there is no address to compare.
    if (score < 0.5 && address !== "postcode+number") continue;
    const metres = (geocoded && typeof row.lat === "number")
      ? distance({ lat: row.lat, lon: row.lon },
        { lat: Number(e.geocode.latitude), lon: Number(e.geocode.longitude) })
      : null;
    // Without coordinates on either side, fall back to the town in the address.
    const townMatch = [e.AddressLine1, e.AddressLine2, e.AddressLine3, e.AddressLine4]
      .some((line) => line && norm(line).includes(norm(row.town)));
    if (metres !== null && metres > 1500) continue;
    if (metres === null && !townMatch && !address) continue;
    // The register uses 1901-01-01 as a placeholder for premises registered but
    // never yet inspected. Carrying it through would date trading evidence to
    // the Edwardian era; it means "no inspection date", so say that.
    const rawDate = e.RatingDate ? e.RatingDate.slice(0, 10) : null;
    const ratingDate = rawDate === "1901-01-01" ? null : rawDate;

    // After stop-words, a two-word name can collapse to one token: "Donard
    // Bar" and "The Donard" both reduce to {donard} and scored a confident
    // identity match on two premises a hundred metres apart. One shared token
    // is a lead, not an identification.
    const thin = Math.min(tokens(row.name).size, tokens(e.BusinessName).size) < 2
      && norm(row.name) !== norm(e.BusinessName);

    candidates.push({
      fhrsId: e.FHRSID,
      businessName: e.BusinessName,
      businessType: e.BusinessType,
      address: [e.AddressLine1, e.AddressLine2, e.AddressLine3, e.PostCode].filter(Boolean).join(", "),
      ratingValue: e.RatingValue,
      ratingDate,
      ...(ratingDate ? {} : { ratingNote: "registered, no inspection date published" }),
      metres: metres === null ? null : Math.round(metres),
      nameScore: Number(score.toFixed(2)),
      ...(address ? { addressAgreement: address } : {}),
      // Exact name plus close-by is safe to accept, and so is a same-postcode
      // same-street-number premises whose name is at least half shared — that
      // is how a SPAR franchise appears under the franchisee's name. Anything
      // weaker is a lead a human has to confirm, which is what step 4 is for.
      confidence: (score >= 0.99 && (metres === null || metres <= 400) && !thin)
        || (address === "postcode+number" && score >= 0.5) ? "high"
        : score >= 0.75 && (metres === null || metres <= 800) ? "medium"
        : address === "postcode" && score >= 0.5 ? "medium" : "low",
    });
  }
  if (!candidates.length) continue;
  candidates.sort((a, b) => b.nameScore - a.nameScore || (a.metres ?? 1e9) - (b.metres ?? 1e9));
  matches.push({ town: row.town, name: row.name, category: row.category, candidates });
}

writeFileSync(outFile, `${JSON.stringify({
  source: "Food Standards Agency FHRS register, Newry Mourne and Down",
  fetchedOn: new Date().toISOString().slice(0, 10),
  establishmentsInAuthority: establishments.length,
  tradingRowsChecked: rows.length,
  matches,
}, null, 1)}\n`);

const byConfidence = matches.reduce((acc, m) => {
  const best = m.candidates[0].confidence;
  acc[best] = (acc[best] ?? 0) + 1;
  return acc;
}, {});
const recent = matches.filter((m) => (m.candidates[0].ratingDate ?? "") >= "2024-01-01").length;
console.log(JSON.stringify({
  tradingRows: rows.length,
  matched: matches.length,
  byConfidence,
  "inspected since 2024": recent,
}, null, 2));
