#!/usr/bin/env node
/**
 * Pins the Kelly, McEvoy & Brown elevation (moves 1–4 of
 * research/concepts/kelly-mcevoy-brown/kelly-mcevoy-brown-elevation-brief.md).
 *
 * Runs against the built page, not the source, so a template that stops
 * rendering the plate fails here. It is a static check, not a browser one:
 * every claim below is a fact about the delivered HTML. Requires `pnpm build`
 * first — `pnpm test` runs the build ahead of it.
 *
 * The brief's two visual gates stay visual: the plate's phone-width label
 * review at 390px, and the swap test's final judgement. Everything else the
 * brief lists is pinned here, including the first triage failure — invented
 * drawing numbers — as a standing scan rather than a memory.
 */
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { projectRoot } from "../lib/public-slugs.mjs";

const builtPath = path.join(projectRoot, "dist", "concepts", "kelly-mcevoy-brown", "index.html");
const sourcePath = path.join(projectRoot, "src", "concepts", "kelly-mcevoy-brown", "home.astro");
const recordPath = path.join(projectRoot, "src", "concepts", "kelly-mcevoy-brown", "record.ts");
const stylesPath = path.join(projectRoot, "src", "concepts", "kelly-mcevoy-brown", "styles.css");
const detailsPath = path.join(projectRoot, "src", "site", "data", "transformation-details.ts");

if (!existsSync(builtPath)) {
  console.error(`Missing ${path.relative(projectRoot, builtPath)} — run \`pnpm build\` first.`);
  process.exit(1);
}

const html = readFileSync(builtPath, "utf8");
const source = readFileSync(sourcePath, "utf8");
const record = readFileSync(recordPath, "utf8");
const styles = readFileSync(stylesPath, "utf8");
const details = readFileSync(detailsPath, "utf8");
/** Markup wraps freely; compare on collapsed whitespace. */
const flat = html.replace(/\s+/g, " ");
/** What a visitor actually reads: no scripts, styles, comments or entities. */
const text = html
  .replace(/<script[\s\S]*?<\/script>/gi, " ")
  .replace(/<style[\s\S]*?<\/style>/gi, " ")
  .replace(/<!--[\s\S]*?-->/g, " ")
  .replace(/<[^>]+>/g, " ")
  .replace(/&#39;|&apos;/g, "'")
  .replace(/&amp;/g, "&")
  .replace(/&quot;/g, '"')
  .replace(/&#8217;/g, "’")
  .replace(/\s+/g, " ");

const failures = [];
const check = (label, condition) => {
  if (!condition) failures.push(label);
};

const section = (startMarker, endMarker) => {
  const start = flat.indexOf(startMarker);
  if (start < 0) return "";
  const end = endMarker ? flat.indexOf(endMarker, start) : -1;
  return flat.slice(start, end > start ? end : undefined);
};

/** The case-study block for this concept, for claims about the study itself. */
const kmbStudy = details.slice(
  details.indexOf('"kelly-mcevoy-brown":'),
  details.indexOf('"bettys-butters":'),
);

// Move 1 — the voice holds: the firm's own line is the only slogan, and the
// arc is made visible beside it rather than sitting as a bare date.
check("the firm's own line is not the h1", /<h1>Build on<br\s*\/?>experience\.<\/h1>/.test(flat));
check("the arc date is missing", text.includes("Established 1973"));
check("the fifty-three-year arc is not made visible", text.includes("Fifty-three years"));
check("the six-sector fixture is missing", text.includes("Six sectors"));

// The first triage failure, pinned as a scan: no drawing-number pattern
// anywhere on the concept or in its case study.
check("a drawing-number pattern is back on the page", !/drawing\s*(number|no\.?)/i.test(text));
check("the invented drawing-number range is back on the page", !/047|086/.test(html));
check("a drawing-number pattern is back in the case study", !/drawing/i.test(kmbStudy));

// One date and the present: 1973 is the only year string a visitor reads.
const years = [...new Set(text.match(/\b(?:19|20)\d{2}\b/g) ?? [])];
check(
  `year strings beyond 1973 are on the page: ${years.filter((year) => year !== "1973").join(", ")}`,
  years.every((year) => year === "1973"),
);

// Move 2 — the patch plate: eleven published places pinned, and only those.
const pins = [...html.matchAll(/<g\s+class="kmb-map-pin"\s+data-sector="([^"]+)"\s+data-place="([^"]+)"/g)].map(
  (match) => ({ sector: match[1], place: match[2] }),
);
const expectedPins = [
  ["Magheralin", "Ecclesiastical"],
  ["Dechomet", "Ecclesiastical"],
  ["Rathfriland", "Healthcare"],
  ["Castlewellan", "Residential"],
  ["Castlewellan", "Commercial"],
  ["Dundrum", "Education"],
  ["Newry", "Education"],
  ["Saintfield", "Commercial"],
  ["Crossmaglen", "Leisure"],
  ["Culloville", "Leisure"],
  ["Hacksballscross", "Residential"],
];
check(
  `the plate should pin eleven places (found ${pins.length})`,
  pins.length === expectedPins.length,
);
for (const [place, sector] of expectedPins) {
  check(
    `pin missing or mis-sectored: ${place} (${sector})`,
    pins.some((pin) => pin.place === place && pin.sector === sector),
  );
}

// Every pinned place is grounded in the register's own data — the firm's
// site text or a published project name, never an inference.
const registerData = source.slice(
  source.indexOf("const projects = ["),
  source.indexOf("\n---", source.indexOf("const projects = [")),
);
for (const place of [...new Set(pins.map((pin) => pin.place))]) {
  check(
    `${place} is pinned but appears nowhere in the register's project names, places or photography`,
    registerData.includes(place),
  );
}

// The two unplaced projects stand beside the plate, never on it.
const unplacedRegion = section('class="kmb-patch-unplaced"', 'class="kmb-patch-read"')
  .replace(/&amp;/g, "&")
  .replace(/&#39;|&apos;/g, "'");
const mapStart = html.lastIndexOf("<svg", html.indexOf("mm-map-plate"));
const mapSvg = html.slice(mapStart, html.indexOf("</svg>", mapStart) + 6);
for (const name of ["St Luke's Hospital Rosewood & Pinewood Villas", "Roslyn Place Apartments & Townhouses"]) {
  check(`${name} is not listed beside the plate`, unplacedRegion.includes(name));
  check(`${name} has been invented onto the plate`, !mapSvg.includes(name));
}
check(
  "the unplaced note does not say why they stand beside the plate",
  /their towns aren't named here, so they stay off the map/.test(text),
);
check(
  "unplaced aside still uses research published-place language",
  !/without a published place|on the register, not on the map/i.test(text),
);

// The plate carries a calm guest boundary, not research hedge language.
check(
  "the plate's sketch boundary is missing",
  text.includes("The patch · a sketch of where we've built"),
);
check(
  "map plate still uses research hedge language",
  !/indicative, not a survey/i.test(text),
);
check(
  "index filter still uses third-person published-portfolio language",
  !/Filter the firm's published portfolio|published portfolio/i.test(text),
);
check(
  "guest filter line is missing",
  text.includes("Browse our completed work by sector"),
);

// Move 3 — the tender ritual: five marks, each with its plain-English
// procurement weight, staged beside the firm's own enquiry route.
const evidence = section('class="kmb-evidence"', "</section>");
check("the evidence pack section is missing", evidence.length > 0);
for (const [mark, weight] of [
  ["ISO 14001", "Environmental management, certified"],
  ["Constructionline", "Pre-qualified supplier register"],
  ["SafeTCert", "Safety management, certified"],
  ["CEF", "Construction Employers Federation"],
  ["NHBC", "Warranty and standards for new homes"],
]) {
  check(`evidence pack is missing the mark: ${mark}`, evidence.includes(mark));
  check(`evidence pack is missing the weight for ${mark}`, evidence.includes(weight));
}
check(
  "the evidence pack is not staged beside the firm's own phone",
  evidence.includes("tel:+442843770011") && evidence.includes("028 4377 0011"),
);
check(
  "the evidence pack is not staged beside the firm's own email",
  evidence.includes("mailto:info@kmbni.com"),
);

// Move 4 — the register drives the map. Counts stay accurate per sector:
// register rows equal pinned plus unplaced entries for every sector.
const rows = [...html.matchAll(/<li\s+class="kmb-project"\s+data-sector="([^"]+)"/g)].map((m) => m[1]);
check(`the register no longer holds all thirteen projects (found ${rows.length})`, rows.length === 13);
const unplaced = [...unplacedRegion.matchAll(/<li\s+data-sector="([^"]+)"/g)].map((m) => m[1]);
for (const sector of ["Ecclesiastical", "Healthcare", "Education", "Residential", "Leisure", "Commercial"]) {
  const rowCount = rows.filter((s) => s === sector).length;
  const pinCount = pins.filter((pin) => pin.sector === sector).length;
  const unplacedCount = unplaced.filter((s) => s === sector).length;
  check(
    `${sector}: register (${rowCount}) disagrees with plate (${pinCount} pinned + ${unplacedCount} beside)`,
    rowCount === pinCount + unplacedCount,
  );
}
check(
  "the filter script does not drive the plate",
  source.includes("[data-patch]") && source.includes('setAttribute("data-active-sector", sector)'),
);
for (const sector of ["Ecclesiastical", "Healthcare", "Education", "Residential", "Leisure", "Commercial"]) {
  check(
    `the plate has no lit/dim rule for ${sector}`,
    styles.includes(`.kmb-patch[data-active-sector="${sector}"]`),
  );
}
check(
  "the plate's dimmed state has no reduced-motion guard",
  /prefers-reduced-motion: reduce[\s\S]*?kmb-map-pin/.test(styles),
);

// Without JavaScript the map shows every pin and the register shows every
// row: the full record is the no-JS state, not a degraded one.
check(
  "the plate does not default to the full record",
  flat.includes('<div class="kmb-patch" data-patch data-active-sector="all">'),
);
check("a pin ships hidden, which no-JS visitors could never see", !/kmb-map-pin[^>]*\shidden/.test(html));
check("the register count does not open on the full record", text.includes("13 projects"));

// The case-study afterAlt no longer mentions drawing numbers.
const afterAlt = kmbStudy.match(/"afterAlt":\s*"([^"]+)"/)?.[1] ?? "";
check("the case-study afterAlt is missing", afterAlt.length > 0);
check("the case-study afterAlt still mentions drawing numbers", !/drawing/i.test(afterAlt));

// The record module carries its read date.
check("the record data module is missing its read date", /RECORD_READ_ON = "24 July 2026/.test(record));
check("the page reads its record from somewhere other than ./record", /from "\.\/record"/.test(source));

// The swap test, as far as a file can carry it: strip the mark, the palette
// and the photographs, and the page should still only fit this firm.
const anchors = [
  "Kelly, McEvoy",
  "Build on",
  "1973",
  "Fifty-three years",
  "Magheralin",
  "Dechomet",
  "Rathfriland",
  "Castlewellan",
  "Dundrum",
  "Newry",
  "Saintfield",
  "Crossmaglen",
  "Culloville",
  "Hacksballscross",
  "Knockevin",
  "Constructionline",
];
const missingAnchors = anchors.filter((anchor) => !text.includes(anchor));
check(
  `the page is not anchored to this firm; missing: ${missingAnchors.join(", ")}`,
  missingAnchors.length === 0,
);

if (failures.length > 0) {
  console.error("Kelly, McEvoy & Brown elevation checks failed:");
  for (const failure of failures) console.error(`  - ${failure}`);
  process.exit(1);
}

console.log("Kelly, McEvoy & Brown elevation checks passed.");
