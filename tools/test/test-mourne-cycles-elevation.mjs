#!/usr/bin/env node
/**
 * Pins the Mourne Cycles flagship rebuild (8 August 2026, on top of moves
 * 1–5 of research/concepts/mourne-cycles/mourne-cycles-elevation-brief.md).
 *
 * Runs against the built pages, not the source, so a template that stops
 * rendering the booking widget fails here. Requires `pnpm build` first —
 * `pnpm test` runs the build ahead of it.
 *
 * The sharp checks are the absences and the honesty carries:
 *
 *  - No route may be a placeholder: the archived review's "limited demo"
 *    critique ends with six real pages, and every nav href must resolve to
 *    one of them.
 *  - The booking widget must stay honest: the composed-email mechanism
 *    carries service + day, and the "shop confirms every slot" copy must
 *    survive — no availability is ever implied.
 *  - Illustrative labels stay glued to the figures they defend (hire
 *    prices, scheme figures) — the brief's standing highest-risk content.
 *  - No ownership names: the Companies House directors are public record
 *    but the studio dataset records ownership unverified, so "Mackin" may
 *    not appear on any guest page (move 6's gate).
 */
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { projectRoot } from "../lib/public-slugs.mjs";

const routes = ["", "bikes", "workshop", "hire", "cycle-to-work", "trails"];
const pages = Object.fromEntries(
  routes.map((route) => [
    route || "home",
    path.join(projectRoot, "dist", "concepts", "mourne-cycles", route, "index.html"),
  ]),
);
const caseStudyPath = path.join(
  projectRoot,
  "dist",
  "transformations",
  "mourne-cycles",
  "index.html",
);

for (const file of [...Object.values(pages), caseStudyPath]) {
  if (!existsSync(file)) {
    console.error(`Missing ${path.relative(projectRoot, file)} — run \`pnpm build\` first.`);
    process.exit(1);
  }
}

const failures = [];
const check = (label, condition) => {
  if (!condition) failures.push(label);
};

const load = (file) => {
  const html = readFileSync(file, "utf8");
  const flat = html.replace(/\s+/g, " ");
  /** Markup without inline scripts, for attribute checks that would
   *  otherwise match the concept shell's own selector strings. */
  const markup = html.replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/\s+/g, " ");
  const text = html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ");
  return { html, flat, markup, text };
};

const docs = Object.fromEntries(
  Object.entries(pages).map(([name, file]) => [name, load(file)]),
);
const caseStudy = load(caseStudyPath);

/* Completeness: six real routes, no placeholders, nav resolves. */
const navHrefs = [
  "/concepts/mourne-cycles/bikes/",
  "/concepts/mourne-cycles/workshop/",
  "/concepts/mourne-cycles/hire/",
  "/concepts/mourne-cycles/cycle-to-work/",
  "/concepts/mourne-cycles/trails/",
];
for (const href of navHrefs) {
  check(`home nav carries ${href}`, docs.home.flat.includes(`href="${href}"`));
}
check(
  "no placeholder links on any route",
  Object.values(docs).every((doc) => !doc.markup.includes("data-concept-placeholder")),
);
check("mobile disclosure menu ships", docs.home.flat.includes('class="mc-menu"'));

/* Kinetic type: accessible label preserved, split spans aria-hidden. */
check(
  "hero kinetic heading keeps its accessible label",
  docs.home.flat.includes('data-kinetic="ride"') &&
    docs.home.flat.includes('aria-label="Mourne Cycles"'),
);
check(
  "kinetic splitter ships its char and word spans",
  docs.home.flat.includes("mc-kin-char") && docs.home.flat.includes("mc-kin-word"),
);

/* Ridgeline: real data sampled at build time, canvas aria-hidden, disclosed. */
check(
  "trails page carries the ridgeline with a sampled profile",
  docs.trails.flat.includes("data-ridgeline") && docs.trails.flat.includes("data-profile="),
);
check(
  "ridgeline canvas is aria-hidden",
  docs.trails.flat.includes('class="mc-ridge-canvas" aria-hidden="true"'),
);
check(
  "ridgeline is disclosed as indicative",
  docs.trails.text.includes("Indicative, not a survey"),
);

/* Booking widget: mechanism present, honesty copy intact, fallback links. */
check(
  "workshop page carries the booking widget",
  docs.workshop.flat.includes("data-mc-booking") && docs.workshop.flat.includes("data-mc-day-input"),
);
check(
  "booking states the shop confirms every slot",
  docs.workshop.text.includes("we confirm every slot") ||
    docs.workshop.text.includes("The shop confirms scope, price and the slot itself"),
);
check(
  "no-JS fallback keeps phone and email handoffs",
  docs.workshop.flat.includes("tel:+442843727272") &&
    docs.workshop.flat.includes("mailto:mournecycles@gmail.com"),
);
check(
  "booking copy never implies live availability",
  !docs.workshop.text.match(/real-time|live availability|instant booking/i),
);

/* Illustrative labels glued to the figures they defend. */
check(
  "hire figures sit under an indicative label",
  docs.hire.text.includes("Prices indicative") && docs.hire.text.includes("from £20 / day"),
);
check(
  "scheme figures sit under a worked-example label",
  docs["cycle-to-work"].text.includes("Worked example") &&
    docs["cycle-to-work"].text.includes("£1,200 bike package"),
);

/* Case study: stale era wording gone, new honesty recorded. */
check(
  "case study no longer describes the Trek trail hero",
  !caseStudy.text.includes("Trek trail hero"),
);
check(
  "case study records the SRTM-derived ridgeline",
  caseStudy.text.includes("SRTM"),
);
check(
  "case study links at least one concept route",
  caseStudy.flat.includes('href="/concepts/mourne-cycles/"'),
);

/* Ownership gate: public record, but unverified in the dataset — no names. */
check(
  "no ownership names on any guest page",
  Object.values(docs).every((doc) => !doc.text.includes("Mackin")),
);

if (failures.length) {
  console.error(`\nMourne Cycles elevation pin failed: ${failures.length} check(s).`);
  for (const failure of failures) console.error(`  - ${failure}`);
  process.exit(1);
}
console.log("Mourne Cycles elevation pin: all checks passed.");
