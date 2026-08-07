#!/usr/bin/env node
/**
 * Pins the /five-shapes/ pattern book, from research/five-shapes-brief.md:
 * "Data completeness is a test: a plate missing any of the five answers
 * fails, and exampleSlugs are checked against publicTransformationSlugs."
 *
 * The failure modes this guards: a plate quietly dropping one of the five
 * questions (the parallel structure is the argument), a plate gaining a
 * second colour beat (exactly one block carries the theatre goal), and a
 * worked-example link pointing at a withdrawn concept.
 *
 * Runs against the built page, not the source. Requires `pnpm build` first —
 * `pnpm test` runs the build ahead of it.
 */
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { projectRoot, readPublicTransformationSlugs } from "../lib/public-slugs.mjs";

const pagePath = path.join(projectRoot, "dist", "five-shapes", "index.html");

if (!existsSync(pagePath)) {
  console.error("Missing dist/five-shapes/index.html — run `pnpm build` first.");
  process.exit(1);
}

const html = readFileSync(pagePath, "utf8");
const flatten = (raw) =>
  raw
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&rsquo;/g, "’")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#8211;/g, "–")
    .replace(/&#8212;/g, "—")
    .replace(/\s+/g, " ");

const text = flatten(html);

const failures = [];
const check = (label, condition) => {
  if (!condition) failures.push(label);
};

// The five plates run in the taxonomy's order: place, counter, product,
// care, trade.
const EXPECTED_ORDER = ["place", "counter", "product", "care", "trade"];
const plateOrder = [...html.matchAll(/data-plate="([a-z]+)"/g)].map((match) => match[1]);
check(
  `the plates no longer run in taxonomy order (${plateOrder.join(" ")})`,
  JSON.stringify(plateOrder) === JSON.stringify(EXPECTED_ORDER),
);

// The plates run as a horizontal snap reel — not a vertical stack like the
// fault walk — with the index strip paging into each slide.
check("the plate reel scroller is missing", html.includes('class="fvs-reel-scroller"'));
check("the plate reel track is missing", html.includes('class="fvs-reel-track"'));
for (const id of EXPECTED_ORDER) {
  check(
    `the strip no longer pages to #${id}`,
    html.includes(`href="#${id}"`) && html.includes(`data-fvs-page="${id}"`),
  );
}

// Per-plate completeness: all five questions answered, five markers tying
// the notes to the drawing, and exactly one theatre beat of colour.
const QUESTIONS = [
  "What does the customer buy?",
  "What is the first screen for?",
  "What does the action ask?",
  "What must stay current, and where does that live?",
  "What is worth staging?",
];

const plateStarts = [...html.matchAll(/data-plate="[a-z]+"/g)].map((match) => match.index);
const plateSlices = plateStarts.map((start, i) =>
  html.slice(start, plateStarts[i + 1] ?? html.length),
);

for (const [i, slice] of plateSlices.entries()) {
  const id = plateOrder[i] ?? `plate ${i + 1}`;
  const sliceText = flatten(slice);
  const notes = slice.match(/class="fsp-note"/g) ?? [];
  const markers = slice.match(/class="fsp-marker"/g) ?? [];
  const goals = slice.match(/is-goal/g) ?? [];
  check(`${id}: expected 5 margin notes (found ${notes.length})`, notes.length === 5);
  check(`${id}: expected 5 plate markers (found ${markers.length})`, markers.length === 5);
  check(
    `${id}: expected exactly one theatre beat (found ${goals.length})`,
    goals.length === 1,
  );
  for (const question of QUESTIONS) {
    check(`${id}: the plate no longer answers "${question}"`, sliceText.includes(question));
  }
}

// The fault walk's exact wording — the two pages teach one vocabulary.
for (const label of ["a place", "a counter business", "a product", "a care practice", "a trade"]) {
  check(`the shape label "${label}" left the page`, text.includes(label));
}

// Strip questions are first-class data (ownerQuestion), not parsed out of the
// plate answers — the scan path an owner uses to find themselves.
for (const question of [
  "is this where i want to wake up?",
  "what's on today, and until when?",
  "when would i open this?",
  "can they see us, and soon?",
  "do they know their stuff, and can they fix mine?",
]) {
  check(`the strip no longer carries "${question}"`, text.includes(question));
}

// The thesis and the honesty rules, stated plainly, up top.
check(
  "the opening thesis is missing or reworded",
  text.includes("There is no standard website."),
);
check(
  "the not-a-shop statement is missing or reworded",
  text.includes("nothing to pick, price or download"),
);
check(
  "the no-prevalence rule is not stated",
  text.includes("how common anything is, this page never claims"),
);

// The misfit panel is not optional — it is what stops the page reading as a
// quiz.
check(
  "the misfit panel is missing or reworded",
  text.includes("Two of these, or none of them.") && text.includes("reading aid"),
);

// The method framing, and the family cross-link.
check(
  "the step-2 method framing is missing",
  /step 2 of the studio's research method/.test(text),
);
check(
  "the cross-link to /what-we-look-for/ is missing",
  html.includes('href="/what-we-look-for/"'),
);
check("the close does not lead to /request/", html.includes('href="/request/"'));

// "We drew one of these" links point only at public transformation pages.
const publicSlugs = new Set(readPublicTransformationSlugs());
const linkedSlugs = [...html.matchAll(/href="\/transformations\/([^/"]+)\/"/g)].map(
  (match) => match[1],
);
check(
  `expected 12 worked-example links (found ${linkedSlugs.length})`,
  linkedSlugs.length === 12,
);
for (const slug of linkedSlugs) {
  check(`a worked-example link points at non-public transformation "${slug}"`, publicSlugs.has(slug));
}
const drewLeads = text.match(/We drew one of these/g) ?? [];
check(
  `the "we drew one of these" lead should travel with every plate (found ${drewLeads.length} of 5)`,
  drewLeads.length === 5,
);
const conceptLabels = text.match(/independent concepts/gi) ?? [];
check(
  `the independent-concept label should travel with every plate (found ${conceptLabels.length} of 5)`,
  conceptLabels.length === 5,
);

if (failures.length > 0) {
  console.error(`Five-shapes pattern book: ${failures.length} check(s) failed.\n`);
  for (const failure of failures) console.error(`  ✗ ${failure}`);
  process.exit(1);
}

console.log("Five-shapes pattern book: all checks passed.");
