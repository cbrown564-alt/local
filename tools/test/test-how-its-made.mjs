#!/usr/bin/env node
/**
 * Pins /how-its-made/, from research/how-a-site-goes-together-brief.md
 * structure and research/owner-voice-on-the-three-pages.md guest voice.
 *
 * The failure modes this guards:
 *  - a refactor shipping the grey layout fully assembled, with the narration
 *    as captions — a diagram pretending to be a construction (per-vignette
 *    part counts pin that stepping back removes a part);
 *  - the scroll-driven build losing its stage — the pinned live region must
 *    ship hidden beside the plate, with one annotation note per part, the
 *    build-order ticks, and a replay ask per vignette;
 *  - a second expressive beat slipping in — beats 1–5 carry no register
 *    styling, and the page carries exactly one drawn beat, at the stop;
 *  - the no-JS document quietly rotting — the exploded plate must contain
 *    the full argument (five narration lines as text, the stop as the final
 *    entry, the part markers on the drawing);
 *  - owner-voice honesty — light disclosure up top, no method-step lecture.
 *
 * Runs against the built page, not the source. Requires `pnpm build` first —
 * `pnpm test` runs the build ahead of it.
 */
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { projectRoot } from "../lib/public-slugs.mjs";

const pagePath = path.join(projectRoot, "dist", "how-its-made", "index.html");

if (!existsSync(pagePath)) {
  console.error("Missing dist/how-its-made/index.html — run `pnpm build` first.");
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
    .replace(/&lsquo;/g, "‘")
    .replace(/&ldquo;|&#8220;/g, "“")
    .replace(/&rdquo;|&#8221;/g, "”")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#8211;/g, "–")
    .replace(/&#8212;/g, "—")
    .replace(/&#183;/g, "·")
    .replace(/\s+/g, " ");

const text = flatten(html);

const failures = [];
const check = (label, condition) => {
  if (!condition) failures.push(label);
};

/* --- server-render both states: the exploded plate carries the argument;
   the live build is mounted over it by JS, hidden until then. The bundled
   page script quotes the same selectors, so anchor every slice on the
   markup itself (class + attribute), never the bare attribute name. */
const staticStart = html.indexOf('<div class="hgx" data-hasg-static>');
const liveStart = html.indexOf('<div class="hasg-build" data-hasg-live');
check("the exploded plate is missing", staticStart > 0);
check(
  "the live build is missing",
  liveStart > staticStart,
);
check(
  "the exploded plate must ship visible (no-JS gets the drawing)",
  staticStart > 0 && !html.slice(staticStart, staticStart + 80).includes("hidden"),
);
check(
  "the live build must ship hidden (JS mounts it over the plate)",
  liveStart > 0 && html.slice(liveStart, liveStart + 120).includes("hidden"),
);

/* --- the beats run in build order. */
const EXPECTED_ORDER = ["beat-1", "beat-2", "beat-3", "beat-4", "beat-5"];
const beatOrder = [...html.matchAll(/data-beat="(beat-\d)"/g)].map((match) => match[1]);
check(
  `the beats no longer run in build order (${beatOrder.join(" ")})`,
  JSON.stringify(beatOrder) === JSON.stringify(EXPECTED_ORDER),
);

/* --- stepping back removes a layer: the vignette for beat N holds layers
   1..N and no more — the construction cannot ship pre-assembled. */
const slideStarts = [...html.matchAll(/data-beat="beat-\d"/g)].map((match) => match.index);
const liveEnd = html.indexOf('id="the-stop"');
const slideSlices = slideStarts.map((start, i) =>
  html.slice(start, slideStarts[i + 1] ?? liveEnd),
);
for (const [i, slice] of slideSlices.entries()) {
  const layers = [...slice.matchAll(/data-layer="(\d)"/g)].map((match) => Number(match[1]));
  const expected = Array.from({ length: i + 1 }, (_, k) => k + 1);
  check(
    `beat-${i + 1}: expected layers ${expected.join(",")} seated (found ${layers.join(",") || "none"})`,
    JSON.stringify(layers) === JSON.stringify(expected),
  );
  const fresh = slice.match(/hasg-layer--fresh/g) ?? [];
  check(
    `beat-${i + 1}: expected exactly one arriving layer (found ${fresh.length})`,
    fresh.length === 1,
  );
}

/* --- the live build: one note per window (the empty page, then one per
   layer), five build-order ticks, and a replay ask per vignette. */
const notes = html.match(/data-note="\d"/g) ?? [];
check(
  `the build should carry six notes — the empty page and five layers (found ${notes.length})`,
  notes.length === 6,
);
const ticks = html.match(/data-tick="\d"/g) ?? [];
check(
  `the build should carry five build-order ticks (found ${ticks.length})`,
  ticks.length === 5,
);
const replays = html.match(/data-replay="\d"/g) ?? [];
check(
  `each vignette should carry a replay ask (found ${replays.length})`,
  replays.length === 5,
);
check(
  "the replay asks lost their labels",
  (html.match(/aria-label="Replay part \d arriving/g) ?? []).length === 5,
);

/* --- the gestures are the tactile part: the studio's four verbs, all used. */
const gestures = new Set([...html.matchAll(/hasg-g--(\w+)(?:"| )/g)].map((match) => match[1]));
for (const gesture of ["seat", "slide", "unfold", "light"]) {
  check(`the "${gesture}" gesture left the page`, gestures.has(gesture));
}

/* --- rule 3: no register styling anywhere in the grey — no blue goal beat,
   no theatre art — and exactly one drawn beat, at the stop. */
check("a colour beat (is-goal) slipped into the grey", !/is-goal/.test(html));
check("a drawn scene (has-art) slipped into the grey", !/has-art/.test(html));
const drawn = [...html.matchAll(/data-drawn-beat/g)];
check(
  `the page must carry exactly one drawn beat (found ${drawn.length})`,
  drawn.length === 1,
);
check(
  "the one drawn beat must sit inside the stop",
  drawn.length === 1 && liveEnd > 0 && drawn[0].index > liveEnd,
);
const brassFaces = html.match(/swap-plate-face/g) ?? [];
check(
  `the nameplate face should appear once (found ${brassFaces.length})`,
  brassFaces.length === 1,
);

/* --- the exploded plate: the no-JS document holds the full argument. */
const staticSlice = html.slice(staticStart, liveStart);
const staticText = flatten(staticSlice);

const NARRATIONS = [
  "Before it is anything, a site is somewhere a visitor can arrive — and most arrive with one question. Open now? Where? Is this the right place?",
  "The biggest name on the site is yours. Suppliers get one confident line.",
  "What you sell, as it is read on a phone — a page, not a file.",
  "Two fields — the date and the number of people — placed in front of your worries, with the thing you'd say in ten seconds at the counter on the first screen instead of in the footer.",
  "The page keeps what doesn't go stale, and hands today to the source that is always fresh.",
];
for (const [i, narration] of NARRATIONS.entries()) {
  check(
    `beat-${i + 1}: the narration line left the exploded plate`,
    staticText.includes(narration),
  );
  /* ...and the narration is real DOM text in reading order, not aria
     theatre: the flattened page text (tags and attributes stripped) must
     carry it too. */
  check(
    `beat-${i + 1}: the narration must be visible text, not an attribute`,
    text.includes(narration),
  );
}
check(
  "the stop is no longer the exploded key's final entry",
  staticText.includes(
    "Up to here, every good site is the same site — past here, it has to be yours.",
  ),
);
/* The plate draws the chassis twice — phone below the wide breakpoint, the
   browser window at and above it — and each carries its own numbered
   markers, one per layer. */
const desktopWrapAt = staticSlice.indexOf("hgx-frame-wrap--desktop");
const phoneMarkers = staticSlice.slice(0, desktopWrapAt).match(/class="hasg-marker"/g) ?? [];
const desktopMarkers = staticSlice.slice(desktopWrapAt).match(/class="hasg-marker"/g) ?? [];
check(
  `the exploded plate should number five layers per chassis (phone ${phoneMarkers.length}, desktop ${desktopMarkers.length})`,
  phoneMarkers.length === 5 && desktopMarkers.length === 5,
);
const keyItems = staticSlice.match(/hgx-key-item/g) ?? [];
check(
  `the exploded key should hold six entries — five layers and the stop (found ${keyItems.length})`,
  keyItems.length === 6,
);
for (const id of EXPECTED_ORDER) {
  check(
    `the exploded key lost its #${id} anchor (strip links must resolve without JS)`,
    staticSlice.includes(`id="${id}"`),
  );
}

/* --- guest-facing beats get names, not T-ids. */
const NAMES = [
  "A door that opens, and a first screen that answers",
  "The name on the fascia",
  "The stock, readable",
  "An action with a mechanism, and the reason to use it",
  "The honest handoff",
];
for (const name of NAMES) {
  check(`the beat "${name}" left the page`, text.includes(name));
}
for (const question of [
  "open now? where? right place?",
  "whose shop is this?",
  "what do they sell — readable here?",
  "can i ask about the 14th?",
  "is this still true today?",
]) {
  check(`the strip no longer carries "${question}"`, text.includes(question));
}
for (const selfCheck of [
  "Does your first screen say whether you're open now, and where you are — with no account in the way?",
  "Is your own name the biggest one on the page?",
  "Can someone read what you sell on a phone, without opening a file?",
  "Can someone ask about a date on the page itself — and is your best reason the first thing they read?",
  "Does your site say what is current today — and where the always-fresh version lives?",
]) {
  check(`the checklist no longer asks "${selfCheck.slice(0, 40)}…"`, text.includes(selfCheck));
}

/* --- the quiet cross-references: each beat names the fault it prevents,
   linked to the walk where a public walk exists. */
for (const fault of [
  "the login at the door",
  "the dead end",
  "“are you open?” left unanswered",
  "the supplier's name in the biggest type",
  "the menu locked in a file",
  "the bell with no clapper",
  "your worries in front of their question",
  "the best thing about you in the footer",
  "the stopped clock",
]) {
  check(`the fault "${fault}" left the page`, text.includes(fault));
}
for (const anchor of ["#t1", "#t4", "#t5", "#t7", "#t10"]) {
  check(
    `the cross-link to /where-it-fails/${anchor} is missing`,
    html.includes(`href="/where-it-fails/${anchor}"`),
  );
}

/* --- owner voice: H1, light honesty, no method lecture. */
check("the H1 left the page", text.includes("How it’s made."));
check(
  "the drawn-build disclosure is missing or reworded",
  text.includes("grey blocks, no business names"),
);
check(
  "the stop's narration is missing or reworded",
  text.includes("every good site is the same site") && text.includes("it has to be yours"),
);
check(
  "the method-step lecture should be gone",
  !/step 4 of the studio's research method/.test(text) &&
    !/What this is for/.test(text),
);
check(
  "the checklist's discipline is missing or reworded",
  text.includes("Check your own site against the five parts.") &&
    text.includes("a part a visitor is already missing"),
);

/* --- the handover and the close. */
check("the handover to /why-its-yours/ is missing", html.includes('href="/why-its-yours/"'));
check(
  "the handover to /transformations/ is missing",
  html.includes('href="/transformations/"'),
);
check("the close does not lead to /request/", html.includes('href="/request/"'));

if (failures.length > 0) {
  console.error(`How-its-made: ${failures.length} check(s) failed.\n`);
  for (const failure of failures) console.error(`  ✗ ${failure}`);
  process.exit(1);
}

console.log("How-its-made: all checks passed.");
