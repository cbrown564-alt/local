#!/usr/bin/env node
/**
 * Pins the Castle Farm elevation (moves 1–6 of
 * research/concepts/castle-farm/castle-farm-elevation-brief.md).
 *
 * Runs against the built page, not the source, so a template that stops
 * rendering the round fails here. It is a static check, not a browser one:
 * the Puppeteer suites were retired on 4 August 2026, and every claim below is
 * a fact about the delivered HTML. Requires `pnpm build` first — `pnpm test`
 * runs the build ahead of it.
 *
 * The town lookup is asserted statically on purpose. Its index is built from
 * the `data-cf-town` / `data-cf-day` pairs the page renders, so checking those
 * pairs in the built HTML is checking what the lookup can answer — and it is
 * the same check that catches an invented town, which is the honesty risk the
 * brief actually names. Move 5's phone-width label review stays a visual
 * gate; this file pins that the plate and its indicative disclosure ship.
 */
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { projectRoot } from "../lib/public-slugs.mjs";

const builtPath = path.join(projectRoot, "dist", "concepts", "castle-farm", "index.html");
const sourcePath = path.join(projectRoot, "src", "concepts", "castle-farm", "home.astro");
const roundPath = path.join(projectRoot, "src", "concepts", "castle-farm", "round.ts");
const stylesPath = path.join(projectRoot, "src", "concepts", "castle-farm", "styles.css");

if (!existsSync(builtPath)) {
  console.error(`Missing ${path.relative(projectRoot, builtPath)} — run \`pnpm build\` first.`);
  process.exit(1);
}

const html = readFileSync(builtPath, "utf8");
const source = readFileSync(sourcePath, "utf8");
const round = readFileSync(roundPath, "utf8");
const styles = readFileSync(stylesPath, "utf8");
/** Markup wraps freely; compare on collapsed whitespace. */
const flat = html.replace(/\s+/g, " ");
/** What a visitor actually reads: no scripts, styles, comments or entities.
 *  Copy assertions run on this so a code comment can never satisfy — or
 *  falsely trip — a claim about the page. */
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

// Move 1 — the farm says its own sentence, on the first screen, with its
// source and read date, and both dates stand beside it.
const hero = section('class="cf-hero"', 'class="cf-round"');
const heroText = hero.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
check("hero section not found", hero.length > 0);
check(
  '"Let us worry about digging it up." is not on the first screen',
  heroText.includes("Let us worry about digging it up."),
);
check(
  "the farm's sentence is not attributed with its source",
  /href="https:\/\/www\.castlefarmni\.com\/"/.test(hero) && /castlefarmni\.com/.test(heroText),
);
check(
  "the farm's sentence does not carry its read date",
  heroText.includes("read 4 August 2026"),
);
check(
  "the hundreds-of-years date is not on the first screen",
  /hundreds of years/i.test(heroText),
);
check("the 2008 date is not on the first screen", heroText.includes("2008"));
check(
  "the castle-grounds provenance is missing",
  /ancestors lived in the castle grounds/i.test(heroText),
);

// Move 1 — the cropped-produce wordmark is retired. It was nobody's mark, so
// it must not return in markup or stylesheet.
check(
  "the cropped produce photograph is back in use as a wordmark",
  !html.includes("castle-farm-produce.jpg") && !/farm-wordmark/.test(html),
);
check("wordmark cropping survives in styles.css", !/farm-wordmark/.test(styles));
check("the name is not set in type", /class="cf-brand-name">Castle Farm</.test(flat));

// Move 2 — the round is on the page: both published cutoffs, every delivery
// day, and the town lists the lookup answers from.
for (const cutoff of [
  ["Sunday, 3pm", "Tuesday, Wednesday and Thursday deliveries"],
  ["Wednesday, 3pm", "Friday and Saturday deliveries"],
]) {
  check(`cutoff missing: ${cutoff[0]}`, text.includes(cutoff[0]));
  check(`cutoff coverage missing: ${cutoff[1]}`, text.includes(`for ${cutoff[1]}`));
}
check(
  "the cutoff panel invents a pressure timer",
  !/order in the next|hours left|hurry|closing soon|don't miss/i.test(text),
);

for (const day of ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]) {
  check(`delivery day missing: ${day}`, new RegExp(`class="cf-day-name">${day}<`).test(flat));
}

/** The fixed sample from the brief's test list, corrected to the schedule the
 *  record actually holds: the published Tuesday list names Dundrum once, so
 *  the page claims Tuesday for it and nothing more. Castlewellan is the town
 *  the schedule really does name twice. */
const townSample = [
  ["Dundrum", ["Tuesday"]],
  ["Castlewellan", ["Tuesday", "Wednesday"]],
  ["Kilkeel", ["Wednesday"]],
  ["Portaferry", ["Thursday"]],
  ["Bangor", ["Tuesday"]],
  ["Larne", ["Friday"]],
];
const townDays = new Map();
for (const match of html.matchAll(/data-cf-town="([^"]+)" data-cf-day="([^"]+)"/g)) {
  if (!townDays.has(match[1])) townDays.set(match[1], []);
  townDays.get(match[1]).push(match[2]);
}
for (const [town, days] of townSample) {
  const found = townDays.get(town) ?? [];
  check(
    `${town} should be on the round on ${days.join(", ")} (page says: ${found.join(", ") || "not listed"})`,
    found.length === days.length && days.every((day) => found.includes(day)),
  );
}
check(
  "a town not on the published round would be answered with an invented day",
  !townDays.has("Holywood") && !townDays.has("Ballynahinch"),
);
check(
  "the lookup does not decline honestly for a town the schedule omits",
  source.includes("We do not list "),
);
check(
  "the lookup indexes something other than the towns the page publishes",
  source.includes('querySelectorAll("[data-cf-town]")'),
);
check(
  "the lists no longer say the farm publishes more towns than are shown",
  (text.match(/and more/g) ?? []).length >= 3,
);

// Move 2 — the published numbers, once each, beside their source.
for (const [label, value] of [
  ["Minimum order, local areas", "£40"],
  ["Minimum order, outlying postcodes", "£76"],
  ["Delivery, added at checkout", "£4"],
]) {
  check(`published figure missing: ${label} ${value}`, text.includes(label));
  const occurrences = (text.match(new RegExp(`${value}(?![0-9])`, "g")) ?? []).length;
  check(`${value} appears ${occurrences} times; it must appear exactly once`, occurrences === 1);
}
const termsBlock = section('class="cf-terms"', "</section>");
check(
  "the figures are not adjacent to the delivery source link",
  /href="https:\/\/www\.castlefarmni\.com\/pages\/delivery-schedule"/.test(termsBlock) &&
    /read 4 August 2026/.test(termsBlock.replace(/<[^>]+>/g, " ")),
);
check(
  "the £45 box price is quoted without a verified read date beside it",
  !text.includes("£45"),
);

// Move 2 — the round data lives in one module, with its read date.
check("the round data module is missing its read date", /ROUND_READ_ON = "4 August 2026"/.test(round));
check(
  "the page reads round data from somewhere other than ./round",
  /from "\.\/round"/.test(source),
);

// Move 3 — the farm and the neighbours, in the farm's own two-source shape.
for (const item of [
  "Mourne Aberdeen Angus beef",
  "Free-range Mourne lamb",
  "Gloucestershire Old Spot pork",
  "Free-range eggs",
  "Potatoes and vegetables",
]) {
  check(`stock missing: ${item}`, text.includes(item));
}
check("the 300-ewe flock is missing", /300-ewe/.test(text));
check(
  "the neighbours are named individually, which the record does not support",
  text.includes("Other small local producers and businesses in the area"),
);
check(
  "the farm's own aim is not quoted",
  text.includes("keeping money circulating in the local economy"),
);
for (const dish of ["Beef bourguignon", "Shepherd's cottage pie", "Goulash"]) {
  check(`recipe pairing missing: ${dish}`, text.includes(dish));
}
check(
  "recipe dishes are not linked to the live blog",
  (html.match(/href="https:\/\/www\.castlefarmni\.com\/blogs\/news"/g) ?? []).length >= 3,
);

// Move 4 — the week's table is the theatre, with its disclosure chain.
check(
  "the week's table plate is missing from the first screen",
  hero.includes("castle-farm-weekly-table-illustration.png"),
);
check(
  "the retired mixed-box still is back in the first screen",
  !hero.includes("castle-farm-weekly-box-faithful.webp"),
);
check(
  "the table plate has no visible disclosure",
  /possible week'?s table|painted plate/i.test(heroText),
);
check(
  "the table plate has no alt boundary",
  /weekly table|Angus|yoghurt|yogurt/i.test(hero),
);

// Move 5 — the delivery-round plate ships with its indicative disclosure.
check(
  "the delivery-round plate is missing",
  html.includes("castle-farm-delivery-round-plate.png"),
);
check(
  "the delivery-round plate has no indicative disclosure",
  /indicative,\s*not a survey/i.test(text),
);
check(
  "the delivery-round plate has no alt that names the four day-loops",
  /castle-farm-delivery-round-plate\.png"\s+alt="[^"]*Tuesday, Wednesday, Thursday and Friday/i.test(
    html,
  ),
);

// Move 6 — every control is honest. No placeholders, no basket, and every
// commerce route resolves to the live store.
/* The shared shell ships one script that neutralises placeholder anchors on
   every concept, so look for a control wearing the attribute, not the word. */
check("placeholder controls survive", !/<a[^>]*data-concept-placeholder/.test(html));
check("the inert basket survives", !/Basket/i.test(text) && !/concept-basket/.test(html));
check("the inert basket styling survives", !/concept-basket/.test(styles));
check(
  "the dead category rail survives",
  !/Box deals/i.test(text) && !/Fruit &amp; veg/i.test(html) && !/Butchery/i.test(text),
);

const externalLinks = [...html.matchAll(/href="(https?:\/\/[^"]+)"/g)].map((match) => match[1]);
const offSite = externalLinks.filter(
  (href) => !href.startsWith("https://www.castlefarmni.com/") && !href.startsWith("https://fonts."),
);
check(
  `every off-site route must reach castlefarmni.com (found: ${[...new Set(offSite)].join(", ")})`,
  offSite.length === 0,
);
check(
  "the page has no route into the live store",
  externalLinks.some((href) => href.startsWith("https://www.castlefarmni.com/")),
);
check(
  "produce CTAs do not reach the live box listings",
  externalLinks.includes("https://www.castlefarmni.com/collections/meal-deal-boxes"),
);
check(
  "terms do not reach the live delivery schedule",
  externalLinks.includes("https://www.castlefarmni.com/pages/delivery-schedule"),
);
check(
  "the page must not take an order itself",
  !/<form[^>]*\baction=/.test(html) && !/fetch\(|XMLHttpRequest|mailto:/.test(html),
);
check(
  "the lookup hard-codes the phone instead of reading the page data",
  source.includes('data-cf-phone={PHONE}') && source.includes('getAttribute("data-cf-phone")'),
);

// The swap test, as far as a file can carry it: strip the name and the round,
// and nothing generic should be left standing.
const anchors = [
  "Castle Farm",
  "Dundrum",
  "Mournes",
  "castle",
  "2008",
  "Aberdeen Angus",
  "Old Spot",
  "Portaferry",
  "Annalong",
  "Carrickfergus",
];
const missingAnchors = anchors.filter((anchor) => !text.includes(anchor));
check(
  `the page is not anchored to this farm; missing: ${missingAnchors.join(", ")}`,
  missingAnchors.length === 0,
);

if (failures.length > 0) {
  console.error("Castle Farm elevation checks failed:");
  for (const failure of failures) console.error(`  - ${failure}`);
  process.exit(1);
}

console.log("Castle Farm elevation checks passed.");
