#!/usr/bin/env node
/**
 * Pins the Kent Amusements elevation (moves 1–5 of
 * research/concepts/kent-amusements/kent-amusements-elevation-brief.md).
 *
 * Runs against the built pages, not the source, so a template that stops
 * rendering the arc fails here. Requires `pnpm build` first — `pnpm test` runs
 * the build ahead of it.
 *
 * The sharpest check is the first one, and it is an absence. On 25 July 2026
 * this concept published invented opening hours on its attractions board; the
 * brief pinned that failure as a standing test rather than a memory, so no
 * time of day may appear on either page — not in the season panel, not in the
 * arc, and not inside the quoted 1960s memory, whose shift hours are elided
 * for exactly that reason.
 *
 * The other checks defend the two borrowed voices. This arcade has no
 * first-party sentence anywhere on the open web, so the page speaks through
 * the BBC memory archive and the Avoca Hotel's listing. Both must stay quoted,
 * attributed and dated, and the memories must stay unmistakably of their era.
 */
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { projectRoot } from "../lib/public-slugs.mjs";

const pages = {
  home: path.join(projectRoot, "dist", "concepts", "kent-amusements", "index.html"),
  attractions: path.join(
    projectRoot,
    "dist",
    "concepts",
    "kent-amusements",
    "attractions",
    "index.html",
  ),
};
const caseStudyPath = path.join(projectRoot, "dist", "transformations", "kent-amusements", "index.html");

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
  /** Markup wraps freely; compare structure on collapsed whitespace. */
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
    .replace(/&#8230;/g, "…")
    .replace(/\s+/g, " ");
  return { html, flat, text };
};

const home = load(pages.home);
const atx = load(pages.attractions);
const caseStudy = load(caseStudyPath);

const block = (flat, startMarker, endMarker) => {
  const start = flat.indexOf(startMarker);
  if (start < 0) return "";
  const end = endMarker ? flat.indexOf(endMarker, start) : -1;
  return flat.slice(start, end > start ? end : undefined);
};
const visible = (markup) =>
  markup
    .replace(/<[^>]+>/g, " ")
    .replace(/&#39;/g, "'")
    .replace(/&#8230;/g, "…")
    .replace(/\s+/g, " ")
    .trim();

// ---------------------------------------------------------------------------
// The claims gate, pinned. 25 July 2026: this concept published "School
// holidays 10 am – 9 pm" as fact with no source behind it.
// ---------------------------------------------------------------------------
const timeOfDay = [
  /\b\d{1,2}([.:]\d{2})?\s?[ap]\.?m\.?\b/i,
  /\b\d{1,2}\s?o'clock\b/i,
  /\bopen(?:s|ing)?\s+(?:until|till|til)\b/i,
  /\bclos(?:es|ing)\s+at\b/i,
  /\b\d{1,2}\s?[–-]\s?\d{1,2}\s?[ap]m\b/i,
];
for (const [name, page] of Object.entries({ home, attractions: atx })) {
  for (const pattern of timeOfDay) {
    const hit = page.text.match(pattern);
    check(
      `a time of day reached the ${name} page (/${pattern.source}/ matched "${hit?.[0]}")`,
      !hit,
    );
  }
}

// ---------------------------------------------------------------------------
// Moves 1–2 — two-stop timeline with three quote ticks. Memories stay framed
// as their era; Avoca stays attributed; no duplicate remember strip.
// ---------------------------------------------------------------------------
const MEMORY =
  "You had to work long hours … but we didn't care, it was summer and we hadn't a care in the world";
const summers = block(home.flat, 'class="ka-summers"', 'class="ka-afternoon"');
check("the fifty-summers band is missing", summers.length > 0);
check("the timeline is missing", /class="ka-timeline"/.test(summers));
check(
  "the duplicate remember strip is still on the home page",
  !/class="ka-remember"/.test(home.flat),
);
check(
  "the promenade plate is not in the first viewport, ahead of the timeline",
  home.flat.indexOf('class="ka-hero-plate"') < home.flat.indexOf('class="ka-summers"'),
);

const memoryTick = block(summers, 'class="ka-memory', "</figure>");
check("the change-booth memory tick is missing", memoryTick.length > 0);
check(
  "the change-booth memory is not quoted verbatim",
  visible(memoryTick).includes(MEMORY),
);
check(
  "the memory is not marked as a memory of its era",
  visible(memoryTick).includes("A memory of the late 1960s"),
);
check(
  "the memory does not name who is speaking or when",
  visible(memoryTick).includes(
    "A summer worker at Kent Amusements, dishing out the change in the late 1960s",
  ),
);
check(
  "the memory does not carry its archive and read date",
  /BBC Your Place and Mine · Newcastle memory archive · read 4 August 2026/.test(
    visible(memoryTick),
  ),
);
check(
  "the memory does not disclose that its shift hours are elided",
  visible(memoryTick).includes("quoted with its shift hours left out"),
);
check(
  "the BBC archive is not linked so the owner can read the rest",
  memoryTick.includes("bbc.co.uk/northernireland/yourplaceandmine/down/A781698.shtml"),
);
check(
  "the memory is not inside a blockquote",
  /<blockquote>/.test(memoryTick),
);

const AVOCA_QUOTE =
  "Newcastle County Down's premier family entertainment centre. Amusement arcade and one of NI's only homes to indoor Dodgem Cars.";
for (const [name, page] of Object.entries({ home, attractions: atx })) {
  const avoca = block(page.flat, 'class="ka-avoca', "</figure>");
  check(`the Avoca description is missing from the ${name} page`, avoca.length > 0);
  check(
    `the Avoca description is not quoted verbatim on the ${name} page`,
    visible(avoca).includes(AVOCA_QUOTE),
  );
  check(
    `the Avoca description is not attributed on the ${name} page`,
    visible(avoca).includes("The Avoca Hotel's activities page") &&
      visible(avoca).includes("their words, not ours"),
  );
  check(
    `the Avoca description does not carry its read date on the ${name} page`,
    visible(avoca).includes("Read 5 August 2026"),
  );
  check(
    `the Avoca description is not inside a blockquote on the ${name} page`,
    /<blockquote>/.test(avoca),
  );
  const withoutQuote = page.text.split(AVOCA_QUOTE).join(" ");
  check(`the page adopts "premier" in its own voice on the ${name} page`, !/\bpremier\b/i.test(withoutQuote));
  check(
    `the page adopts the indoor-dodgems scarcity claim in its own voice on the ${name} page`,
    !/\bonly\b.{0,40}\bindoor\b/i.test(withoutQuote),
  );
}

for (const when of ["1968", "2026"]) {
  check(
    `arc entry missing: ${when}`,
    new RegExp(`class="ka-arc-when">${when}<`).test(summers),
  );
}
check(
  "the dull middle stops are still on the timeline",
  !/Over fifty summers|November 2025|Companies House NI688147/.test(visible(summers)),
);
const arcSources = summers.match(/class="ka-arc-source">([^<]+)</g) ?? [];
check(
  `every arc entry must carry a dated source (found ${arcSources.length} of 2)`,
  arcSources.length === 2 &&
    arcSources.every((entry) => /(4 August 2026|March 2026|1968)/.test(entry)),
);
const arcEntries = summers.match(/class="ka-arc-entry[\s"]/g) ?? [];
check(
  `the band holds an entry with no source (${arcEntries.length} entries, ${arcSources.length} sources)`,
  arcEntries.length === arcSources.length,
);
check("the jukebox end of the line is missing", /jukebox/i.test(visible(summers)));
check("the VR end of the line is missing", /VR zone/.test(visible(summers)));
check(
  "the opening year is not marked as an estimate from the late-1960s archive",
  /c\. 1968|late-1960s BBC archive/i.test(visible(summers)),
);
check(
  "the VR entry is not attributed to the March 2026 review",
  visible(summers).includes("TripAdvisor review, March 2026"),
);

const ticks = [...summers.matchAll(/ka-timeline-tick/g)];
check(`the timeline is missing its three quote ticks (found ${ticks.length})`, ticks.length === 3);
check(
  "the jukebox memory is not quoted on the timeline",
  visible(summers).includes("used to hang out at the Kent Cafe playing the juke-box"),
);
check(
  "the jukebox memory is not attributed to the archive",
  visible(summers).includes("BBC Your Place and Mine"),
);
for (const [name, page] of Object.entries({ home, attractions: atx })) {
  const cafeHits = (page.text.match(/Kent Cafe/g) ?? []).length;
  const insideQuote = visible(summers).includes("Kent Cafe") && name === "home" ? 1 : 0;
  check(
    `the Kent Cafe is named outside the quoted memory on the ${name} page (${cafeHits} mentions)`,
    cafeHits === insideQuote,
  );
}

// ---------------------------------------------------------------------------
// Move 3 — the afternoon staged in the order it happens, verified only.
// ---------------------------------------------------------------------------
const afternoon = block(home.flat, 'class="ka-afternoon"', 'class="ka-season-band"');
check("the staged afternoon is missing", afternoon.length > 0);
check(
  "the afternoon storyboard strips are missing",
  afternoon.includes("kent-amusements-afternoon-storyboard-01-03.png") &&
    afternoon.includes("kent-amusements-afternoon-storyboard-04-06.png"),
);
check(
  "the afternoon storyboard disclosure is missing",
  visible(afternoon).includes("AI-generated image · indicative journey, not a survey"),
);
check(
  "the removed journey-path visual is still on the page",
  !/ka-journey-path/.test(afternoon),
);
const stepNames = [...afternoon.matchAll(/class="ka-visit-name">([^<]+)</g)].map((m) => m[1]);
check(
  `the afternoon is not the six verified steps in order (got ${JSON.stringify(stepNames)})`,
  stepNames.join(" | ") ===
    "The promenade | The change | The floor | The dodgems | The VR | Back out to the sea",
);
const stepNumbers = [...afternoon.matchAll(/class="ka-visit-num">([^<]+)</g)].map((m) => m[1]);
check(
  "the steps are not numbered 01 to 06",
  stepNumbers.join("") === "010203040506",
);
/* Step 02 is the hinge between the sixties memory and this afternoon; the VR
   beat shares the same comic highlight so both ends of the machines-change
   line read as marked. */
check(
  "the change step is not marked as the hinge",
  /class="[^"]*ka-visit-step--hinge[^"]*"[\s\S]{0,200}The change/.test(afternoon),
);
check(
  "the VR step does not share the hinge highlight",
  /class="[^"]*ka-visit-step--hinge[^"]*"[\s\S]{0,200}The VR/.test(afternoon),
);

// The closed inventory. Every one of these was invented by an earlier draft or
// is simply not in the record; none may appear on either page.
const notInTheRecord = [
  /\btokens?\b/i,
  /\bticket machines?\b/i,
  /\b2p\b/i,
  /\bpenny (?:pusher|falls)\b/i,
  /\bparty (?:room|package)/i,
  /\bloyalty card\b/i,
  /£\d/,
  /\bprices?\b/i,
  /\bbowling\b/i,
  /\bsoft play\b/i,
  /\bDundalk\b/i,
];
for (const [name, page] of Object.entries({ home, attractions: atx })) {
  for (const pattern of notInTheRecord) {
    const hit = page.text.match(pattern);
    check(
      `something outside the record reached the ${name} page (/${pattern.source}/ matched "${hit?.[0]}")`,
      !hit,
    );
  }
}

// ---------------------------------------------------------------------------
// Move 4 — the season panel. The ritual is the information; no empty rows, no
// time, and one honest handoff to the channel that owns today's answer.
// ---------------------------------------------------------------------------
const RITUAL =
  "Hours change with the season — the arcade posts them on Facebook as they change. Family offers are posted there when they run.";
for (const [name, page] of Object.entries({ home, attractions: atx })) {
  const season = block(page.flat, 'class="ka-season', 'class="ka-rail"');
  check(`the season panel is missing from the ${name} page`, season.length > 0);
  check(
    `the season panel does not state the ritual on the ${name} page`,
    visible(season).includes(RITUAL),
  );
  check(
    `the season panel does not explain why Facebook is the freshest source on the ${name} page`,
    visible(season).includes("because the arcade updates it itself"),
  );
  check(
    `the season panel does not hand off to the arcade's own page on the ${name} page`,
    season.includes("facebook.com/kentamusementsnewcastle"),
  );
  /* The three apologetic rows are the thing this panel replaced. Rows appear
     only when `confirmedHours` in record.ts is filled from a published source,
     and each row carries its own source when it does. */
  const rows = [...season.matchAll(/class="ka-season-row-label"/g)].length;
  const rowSources = [...season.matchAll(/class="ka-season-row-source"/g)].length;
  check(
    `an hours row on the ${name} page has no source (${rows} rows, ${rowSources} sources)`,
    rows === rowSources,
  );
  check(
    `the apologetic empty rows are back on the ${name} page`,
    !/Seasonal — check Facebook|See Facebook/.test(page.text),
  );
}

// ---------------------------------------------------------------------------
// The swap test, as far as a static check can run it: strip the name and the
// promenade and the page has to stop working for any other arcade.
// ---------------------------------------------------------------------------
const anchors = [
  ["the late-1960s memory", /late 1960s/i],
  ["the fifty-summers claim", /fifty summers/i],
  ["the Central Promenade", /Central Promenade/],
  ["the 2026 VR zone", /VR zone/],
  ["the BBC memory archive", /BBC Your Place and Mine/],
];
for (const [label, pattern] of anchors) {
  check(`the home page no longer carries ${label}`, pattern.test(home.text));
}

// ---------------------------------------------------------------------------
// Standing constraints that outlive the moves.
// ---------------------------------------------------------------------------
/* The 2023 CC BY-SA exterior photograph was withdrawn on 26 July 2026 and
   stays withdrawn. Move 5 uses two generated illustrative plates instead; the
   light plate remains the no-JavaScript and reduced-motion default. */
for (const [name, page] of Object.entries({ home, attractions: atx })) {
  const images = [...page.html.matchAll(/<img\b[^>]*>/gi)].map((m) => m[0]);
  const plate = block(page.flat, 'class="ka-promenade-plate"', "</figure>");
  check(
    `the promenade plate is missing from the ${name} page`,
    images.some((image) => image.includes("kent-amusements-promenade-day.png")),
  );
  check(
    `the lit promenade plate is missing from the ${name} page`,
    images.some((image) => image.includes("kent-amusements-promenade-dusk.png")),
  );
  check(
    `the light plate is not the no-JavaScript default on the ${name} page`,
    /data-ka-plate="light"(?![^>]*\bhidden\b)/.test(plate) &&
      /data-ka-plate="lit"[^>]*\bhidden\b/.test(plate),
  );
  check(
    `the generated plate disclosure is missing from the ${name} page`,
    page.text.includes("AI-generated image · indicative, not a survey"),
  );
  check(
    `the withdrawn 2023 exterior photograph is referenced on the ${name} page`,
    !page.html.includes("kent-amusements-exterior-2023"),
  );
  /* Nav that goes nowhere was the old page's other defect: four header links
     pointed at one screen and two rail cells were inert placeholders. */
  /* The shell's own script names the attribute to disable such links, so look
     for it on an anchor rather than anywhere in the document. */
  check(
    `a placeholder link survives on the ${name} page`,
    !/<a\b[^>]*data-concept-placeholder/.test(page.html),
  );
}

// The case study has to carry the same read dates and the same limits.
check(
  "the case study does not record the BBC memory archive as a source",
  caseStudy.text.includes("BBC Your Place and Mine"),
);
check(
  "the case study does not name the elided shift hours as a limit",
  /shift hours/.test(caseStudy.text),
);
/* Pin the Sources & limits block itself — a change-note mention must not
   greenwash a stale honesty paragraph that still denies any frontage image. */
const sourcesLimits = block(caseStudy.flat, "Sources &amp; limits", "</section>");
check(
  "the case study Sources & limits block is missing",
  sourcesLimits.length > 0,
);
check(
  "the case study Sources & limits block does not record the generated promenade plate boundary",
  /generated illustrative/i.test(visible(sourcesLimits)) &&
    /indicative, not a survey/i.test(visible(sourcesLimits)),
);
check(
  "the case study Sources & limits block still denies any frontage depiction",
  !/Neither screen carries any photograph or illustration|promenade-at-dusk plate proposed|no depiction of the frontage/i.test(
    visible(sourcesLimits),
  ),
);

if (failures.length > 0) {
  console.error(`Kent Amusements elevation: ${failures.length} check(s) failed.\n`);
  for (const failure of failures) console.error(`  ✗ ${failure}`);
  process.exit(1);
}

console.log("Kent Amusements elevation: all checks passed.");
