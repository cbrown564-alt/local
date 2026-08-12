#!/usr/bin/env node
/**
 * Pins the Hugh McCann's elevation (moves 1–6 of
 * research/concepts/hugh-mccanns/hugh-mccanns-elevation-brief.md).
 *
 * Runs against the built page, not the source, so a template that stops
 * rendering a destination fails here. It is a static check, not a browser one:
 * the Puppeteer suites were retired on 4 August 2026, and every claim below is
 * a fact about the delivered HTML. Requires `pnpm build` first — `pnpm test`
 * runs the build ahead of it.
 */
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { projectRoot } from "../lib/public-slugs.mjs";

const builtPath = path.join(projectRoot, "dist", "concepts", "hugh-mccanns", "index.html");
const sourcePath = path.join(projectRoot, "src", "concepts", "hugh-mccanns", "home.astro");
const stylesPath = path.join(projectRoot, "src", "concepts", "hugh-mccanns", "styles.css");
const mediaDir = path.join(projectRoot, "public", "media", "concepts", "hugh-mccanns");

if (!existsSync(builtPath)) {
  console.error(`Missing ${path.relative(projectRoot, builtPath)} — run \`pnpm build\` first.`);
  process.exit(1);
}

const html = readFileSync(builtPath, "utf8");
const source = readFileSync(sourcePath, "utf8");
const styles = readFileSync(stylesPath, "utf8");
/** Markup wraps freely; compare on collapsed whitespace. */
const flat = html.replace(/\s+/g, " ");
/** Visible text only, for the copy assertions. */
const text = flat.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");

const failures = [];
const check = (label, condition) => {
  if (!condition) failures.push(label);
};

// Move 1 — their full sentence, and the one that proves study, on the first
// screen: both inside the hero, above the enquiry panel.
const heroStart = flat.indexOf('class="hm-hero"');
const heroEnd = flat.indexOf("hm-enquire-panel");
const hero = heroStart > -1 && heroEnd > heroStart ? flat.slice(heroStart, heroEnd) : "";
const heroText = hero.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
check("hero section not found", hero.length > 0);
check(
  'the full "From Today Until Your Day, We Do." line is not on the first screen',
  heroText.includes("From Today Until Your Day, We Do."),
);
check(
  "the three-generations sentence is not on the first screen",
  heroText.includes("Passed down through three generations"),
);

// Move 1 — the pull-quote, if kept, carries its date and a source to follow.
if (flat.includes("hm-quote")) {
  const quoteStart = flat.indexOf('class="hm-quote"');
  const quote = flat.slice(quoteStart, flat.indexOf("</figure>", quoteStart));
  check("the guest quote does not carry its date", quote.includes("12.10.17"));
  check(
    "the guest quote does not carry a source the reader can follow",
    /href="https:\/\/www\.hughmccanns\.com\//.test(quote),
  );
  check(
    "the guest quote implies a review more recent than the record supports",
    !/\b(20(1[89]|2\d)|recent(ly)?|latest)\b/i.test(quote.replace(/12\.10\.17/g, "")),
  );
}

// Move 2 — the five named destinations, with their published capacities, and
// every one of them reaching the same enquiry.
const destinations = [
  ["The Loft Suite", "Up to 120 seated"],
  ["The Coast Suite", "Up to 250 seated"],
  ["The Secret Garden", "Licensed for civil ceremonies"],
  ["Little Haven", "Eight bedrooms sleeping seventeen"],
  ["The Avoca Hotel", "Day 2 wedding"],
];
for (const [name, capacity] of destinations) {
  check(`destination missing: ${name}`, text.includes(name));
  check(`published detail missing for ${name}: ${capacity}`, text.includes(capacity));
}
const placeLinks = flat.match(/class="hm-place-link" href="#enquire"/g) ?? [];
check(
  `each destination must route to the enquiry (found ${placeLinks.length} of ${destinations.length})`,
  placeLinks.length === destinations.length,
);

// Move 3 — the ritual is staged as the venue's own sequence, and it arrives at
// the date.
for (const step of [
  "The viewing",
  "The planning",
  "The ceremony",
  "The meal",
  "The reception",
  "The evening",
  "The night",
  "Day two",
]) {
  check(`sequence step missing: ${step}`, text.includes(step));
}
check(
  "the sequence does not arrive at the enquiry",
  /class="hm-step-link" href="#enquire"/.test(flat),
);

// Move 4 — no availability claim survives, in the built page or the stylesheet.
// The brief calls the season strip the page's one dishonest element; it must
// not return in any form.
const availability = [
  /hm-season/,
  /hm-month/,
  /few left/i,
  /dates open/i,
  /season guide/i,
  /availability at a glance/i,
  />\s*Taken\s*</i,
];
for (const pattern of availability) {
  check(`availability language survives in the built page: ${pattern}`, !pattern.test(html));
  check(`availability styling survives in styles.css: ${pattern}`, !pattern.test(styles));
}

// The enquiry still does its one job, and nothing else sends.
check("the enquiry no longer captures a date", /id="hm-date"/.test(html));
check(
  "the date field still looks pre-booked with a fake default",
  !/id="hm-date"[^>]*value=/.test(html),
);
check("the enquiry no longer captures a guest count", /id="hm-guests"/.test(html));
check(
  "the guest-count scale is no longer the venue's published 40–250 range",
  /min="40"[^>]*max="250"/.test(html),
);
check("the draft no longer carries the chosen date", html.includes('"Preferred date: " + dateLabel'));
check("the draft no longer carries the guest count", html.includes('"Guest count: " + guests'));

const mailtos = html.match(/mailto:[^"'`\s)]+/g) ?? [];
check(
  `the page can only draft to info@hughmccanns.com (found: ${[...new Set(mailtos)].join(", ")})`,
  mailtos.length > 0 && mailtos.every((address) => address.startsWith("mailto:info@hughmccanns.com")),
);
check(
  "the page must not post to a form backend",
  !/<form[^>]*\baction=/.test(html) && !/fetch\(|XMLHttpRequest/.test(source),
);

// Move 5 — the dusk plate is a progressive enhancement: daytime remains the
// no-JS and reduced-motion default, and both files are actually shipped.
const dayImage = path.join(mediaDir, "hugh-mccanns-faithful-room.jpg");
const duskImage = path.join(mediaDir, "hugh-mccanns-faithful-room-dusk.jpg");
check("daytime hero asset is missing", existsSync(dayImage));
check("dusk hero asset is missing", existsSync(duskImage));
check("dusk asset is not rendered in the page", html.includes("hugh-mccanns-faithful-room-dusk.jpg"));
check("day-part swap does not use the local hour", source.includes("new Date().getHours()"));
check("reduced-motion does not settle on daytime", source.includes('prefers-reduced-motion: reduce'));
// AI honesty stays on the concept banner / essence — guest captions are calm room lines.
check(
  "the AI dining-room disclosure is missing from the banner",
  text.includes("Dining-room imagery is AI-generated."),
);
check(
  "guest hero captions still use research plate language",
  !/Faithful visualisation|daytime plate|dusk plate/i.test(text),
);
check(
  "calm day/dusk captions are missing",
  text.includes("Looking through to the Mournes") && text.includes("The dining room at dusk"),
);

// Move 6 — the keepable geography plate is present with its boundary note.
const plateImage = path.join(mediaDir, "hugh-mccanns-where-your-day-happens.jpg");
check("where-your-day-happens plate is missing", existsSync(plateImage));
check("where-your-day-happens plate is not rendered", html.includes("hugh-mccanns-where-your-day-happens.jpg"));
check(
  "the plate does not carry its sketch boundary",
  text.includes("A sketch of the places — not a map"),
);
check(
  "map plate still uses research hedge language",
  !/Indicative · not a survey|An indicative sketch/i.test(text),
);
check("the plate section is missing its geography heading", text.includes("The house, the garden, the mountains, the bay."));

// The swap test, as far as a file can carry it: the page has to be anchored to
// this venue in more than its name. Every anchor below is published fact.
const anchors = [
  "Hugh McCann's",
  "Mournes",
  "Dundrum Bay",
  "Central Promenade",
  "Irish Sea",
  "BT33 0EU",
  ...destinations.map(([name]) => name),
];
const missingAnchors = anchors.filter((anchor) => !text.includes(anchor));
check(
  `the page is not anchored to this venue; missing: ${missingAnchors.join(", ")}`,
  missingAnchors.length === 0,
);

if (failures.length > 0) {
  console.error("Hugh McCann's elevation checks failed:");
  for (const failure of failures) console.error(`  - ${failure}`);
  process.exit(1);
}

console.log("Hugh McCann's elevation checks passed.");
