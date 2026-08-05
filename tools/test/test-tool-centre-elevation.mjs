#!/usr/bin/env node
/**
 * Pins The Tool Centre elevation (moves 1–3 of
 * research/concepts/tool-centre/tool-centre-elevation-brief.md).
 *
 * Runs against the built pages, not the source, so a template that stops
 * rendering the counter band fails here. Requires `pnpm build` first —
 * `pnpm test` runs the build ahead of it.
 *
 * Two of these checks are absences, and they are the sharp ones.
 *
 * The first defends the rate story. This shop's whole public offer is "day rate
 * on request", and every figure the concept shows is a suggestion the counter
 * has never seen. So no £ figure may appear anywhere near the hire desk board,
 * every figure on the hire list must sit under the same one-sentence
 * disclaimer, and that sentence must be word-for-word identical on the desk,
 * the sheet and the case study — the inconsistency the publication record
 * flagged on 26 July 2026, and the kind an owner catches first.
 *
 * The second defends a voice the page does not have. Move 1's harvest was run
 * on 5 August 2026 and failed (research/concepts/tool-centre/voice-harvest.md):
 * nothing reachable was a customer's actual words, and the one promising
 * listing publishes an AI review summary. While `customerVoice` in record.ts is
 * null, no quotation, blockquote, rating or owner name may exist on either
 * route. The moment it is filled, the same block starts demanding attribution
 * and a read date instead. Neither state is allowed to be silent.
 */
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { projectRoot } from "../lib/public-slugs.mjs";

const pages = {
  home: path.join(projectRoot, "dist", "concepts", "tool-centre", "index.html"),
  hireList: path.join(
    projectRoot,
    "dist",
    "concepts",
    "tool-centre",
    "hire-list",
    "index.html",
  ),
};
const caseStudyPath = path.join(projectRoot, "dist", "transformations", "tool-centre", "index.html");
const recordPath = path.join(projectRoot, "src", "concepts", "tool-centre", "record.ts");
const harvestPath = path.join(
  projectRoot,
  "research",
  "concepts",
  "tool-centre",
  "voice-harvest.md",
);

for (const file of [...Object.values(pages), caseStudyPath, recordPath, harvestPath]) {
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
    .replace(/&#8211;/g, "–")
    .replace(/&#8212;/g, "—")
    .replace(/&#8230;/g, "…")
    .replace(/\s+/g, " ");
  return { html, flat, text };
};

const home = load(pages.home);
const hireList = load(pages.hireList);
const caseStudy = load(caseStudyPath);
const routes = { home, "hire list": hireList };
const record = readFileSync(recordPath, "utf8");

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
    .replace(/&amp;/g, "&")
    .replace(/&#8211;/g, "–")
    .replace(/&#8212;/g, "—")
    .replace(/\s+/g, " ")
    .trim();

// ---------------------------------------------------------------------------
// Move 3 — one rate story, told the same way three times.
// ---------------------------------------------------------------------------
const INDICATIVE = "No rate here is the shop's own — call the counter for today's rate and terms.";

for (const [name, page] of Object.entries(routes)) {
  check(
    `the indicative-rates sentence is missing from the ${name} page`,
    page.text.includes(INDICATIVE),
  );
}
check(
  "the case study does not use the same indicative-rates wording as the pages",
  caseStudy.text.includes(INDICATIVE),
);
/* Wording drift is the failure this pins: three surfaces each explaining the
   rates in their own words is how the honesty debt reappeared last time. */
const sourcesLimits = block(caseStudy.flat, "Sources &amp; limits", "</section>");
check("the case study Sources & limits block is missing", sourcesLimits.length > 0);
check(
  "the case study Sources & limits block no longer carries the indicative-rates sentence",
  visible(sourcesLimits).includes(INDICATIVE),
);
check(
  "the case study still claims no day-rate figures are published anywhere",
  !/Day-rate figures are deliberately not invented/i.test(visible(sourcesLimits)),
);

/* The desk board asks. A figure on it would contradict "day rate on request"
   in the same panel, so the rule is absolute rather than a matter of labelling. */
const desk = block(home.flat, 'class="tc-desk"', "</article>");
check("the hire desk board is missing", desk.length > 0);
const deskFigure = visible(desk).match(/£\s?\d/);
check(
  `a price reached the hire desk board (matched "${deskFigure?.[0]}")`,
  !deskFigure,
);
check(
  "the hire desk board no longer asks callers to ring for the rate",
  (visible(desk).match(/Day rate on request/g) ?? []).length === 4,
);
check(
  "the hire desk board does not carry the indicative-rates sentence",
  visible(desk).includes(INDICATIVE),
);

/* Every £ figure on the hire list sits inside a category card, and every card
   is labelled. A figure outside a labelled card is a figure with no disclaimer. */
const cards = [...hireList.flat.matchAll(/<article class="tc-hl-cat">[\s\S]*?<\/article>/g)].map(
  (match) => match[0],
);
check(`the hire list is missing its four category cards (found ${cards.length})`, cards.length === 4);
const figuresOnPage = (hireList.text.match(/£\s?\d/g) ?? []).length;
const figuresInCards = cards.reduce(
  (total, card) => total + (visible(card).match(/£\s?\d/g) ?? []).length,
  0,
);
check(
  `a price on the hire list sits outside a labelled category card (${figuresOnPage} on the page, ${figuresInCards} in cards)`,
  figuresOnPage > 0 && figuresOnPage === figuresInCards,
);
for (const card of cards) {
  const heading = visible(card).slice(0, 60);
  check(
    `a hire-list card is not labelled as suggested ("${heading}")`,
    /class="tc-hl-cat-note">Suggested</.test(card),
  );
  check(
    `a hire-list card states weekend terms instead of asking ("${heading}")`,
    visible(card).includes("Weekend and week rates — ask at the counter"),
  );
}

/* Terms this shop has never published. Each of these shipped on 22 July 2026
   as though it were the shop's own condition. */
const notTheShopsTerms = [
  /1\.5\s?×/,
  /\bdamage waiver\b/i,
  /fuel is the hirer's responsibility/i,
  /rates confirmed at counter/i,
  /\bdeposit\b(?!\s+they want)/i,
];
for (const [name, page] of Object.entries(routes)) {
  for (const pattern of notTheShopsTerms) {
    const hit = page.text.match(pattern);
    check(
      `a term the shop has not published reached the ${name} page (/${pattern.source}/ matched "${hit?.[0]}")`,
      !hit,
    );
  }
}
check(
  "the hire-list sidebar states conditions instead of asking questions",
  visible(block(hireList.flat, 'class="tc-hl-conditions"', "</div>")).includes(
    "What to ask when you ring",
  ),
);

/* Move 4's gate, landed empty. Filling `confirmedHire` from anywhere but the
   shop is the failure this guards; while it is empty the sheet says so. */
check(
  "the confirmed-rates gate has been removed from the record",
  /export const confirmedHire: HireCategory\[\] = \[\];/.test(record),
);
check(
  "the hire list does not say what the sheet is",
  hireList.text.includes("A suggested sheet, offered for the counter to correct"),
);

// ---------------------------------------------------------------------------
// Move 2 — one counter, two names, on every screen.
// ---------------------------------------------------------------------------
const CLAIM =
  "The Tool Centre on Main Street and Tool Centre Plant Hire on Facebook are one shop.";
for (const [name, page] of Object.entries(routes)) {
  const counter = block(page.flat, 'class="tc-counter"', "</section>");
  check(`the counter band is missing from the ${name} page`, counter.length > 0);
  check(
    `the counter band does not resolve the two names on the ${name} page`,
    visible(counter).includes(CLAIM),
  );
  check(
    `the counter band does not carry the one address on the ${name} page`,
    /One counter, one number, one address: 107 Main Street, Newcastle, Co\. Down, BT33 0AE/.test(
      visible(counter),
    ),
  );
  /* The shape is the argument: shelf, then the counter, then yard. Reordering
     them turns the essence back into a headline. */
  const order = ["tc-counter-side--shelf", "tc-counter-bridge", "tc-counter-side--yard"].map(
    (marker) => counter.indexOf(marker),
  );
  check(
    `the counter no longer sits between the shelf and the yard on the ${name} page`,
    order.every((index) => index >= 0) && order[0] < order[1] && order[1] < order[2],
  );
  check(
    `the counter band does not name which side trades under which name on the ${name} page`,
    visible(counter).includes("Trading as The Tool Centre") &&
      visible(counter).includes("Trading as Tool Centre Plant Hire"),
  );
  check(
    `the ask — the shop's actual mechanism — is missing from the ${name} page`,
    visible(counter).includes(
      "Ring and ask. The rate, the stock and the day it is free are all one question.",
    ),
  );

  /* The disambiguation is permanent, not good practice: search buries this
     shop under the same-named Newcastle-upon-Tyne ones on every query. */
  check(`"Co. Down" is missing from the ${name} page`, /Co\. Down/.test(page.text));
  check(`the Mournes are missing from the ${name} page`, /Mournes/.test(page.text));
  for (const name_ of ["The Tool Centre", "Tool Centre Plant Hire"]) {
    check(
      `"${name_}" is missing from the ${name} page`,
      page.text.includes(name_),
    );
  }
  const tyne = page.text.match(/Tyne|Tyneside|Northumberland/i);
  check(
    `something from the same-named English shops reached the ${name} page ("${tyne?.[0]}")`,
    !tyne,
  );

  /* Nav that goes nowhere was the old page's other defect: three of five header
     links and two rail cells were inert placeholders. */
  check(
    `a placeholder link survives on the ${name} page`,
    !/<a\b[^>]*data-concept-placeholder/.test(page.html),
  );
}

// ---------------------------------------------------------------------------
// Move 1 — the voice slot, whichever state it is in.
// ---------------------------------------------------------------------------
const voiceIsEmpty = /export const customerVoice: CustomerVoice \| null = null;/.test(record);
check(
  "the voice slot has been deleted rather than filled or left empty",
  voiceIsEmpty || /export const customerVoice: CustomerVoice \| null = \{/.test(record),
);
check(
  "the failed harvest is no longer written up in research",
  readFileSync(harvestPath, "utf8").includes("the harvest failed"),
);

if (voiceIsEmpty) {
  /* Nothing may stand in for the sentence that was not found: no blockquote,
     no rating, no anonymous praise, no owner named from an AI review summary. */
  const noVoiceYet = [
    /<blockquote/i,
    /\b\d(\.\d)?\s?(out of 5|stars?|★)/i,
    /★/,
    /\bgoogle review/i,
    /\bcustomers say\b/i,
    /\breviewers?\b/i,
    /\bfive[- ]star\b/i,
  ];
  for (const [name, page] of Object.entries(routes)) {
    for (const pattern of noVoiceYet) {
      const hit = page.html.match(pattern);
      check(
        `a voice the harvest never found reached the ${name} page (/${pattern.source}/ matched "${hit?.[0]}")`,
        !hit,
      );
    }
  }
} else {
  /* Filled: the Kent pattern applies in full — verbatim, attributed, dated,
     and inside a blockquote so it can never read as the shop's own words. */
  const quote = record.match(/quote:\s*\n?\s*"((?:[^"\\]|\\.)*)"/)?.[1]?.replace(/\\"/g, '"');
  check("the filled voice slot has no quotation in it", Boolean(quote));
  const who = record.match(/who:\s*\n?\s*"((?:[^"\\]|\\.)*)"/)?.[1];
  const source = record.match(/source:\s*\n?\s*"((?:[^"\\]|\\.)*)"/)?.[1];
  for (const [name, page] of Object.entries(routes)) {
    check(
      `the quotation is not carried verbatim on the ${name} page`,
      Boolean(quote) && page.text.includes(quote),
    );
    check(
      `the quotation is not attributed on the ${name} page`,
      Boolean(who) && page.text.includes(who),
    );
    check(
      `the quotation does not carry where it was published and when it was read on the ${name} page`,
      Boolean(source) && page.text.includes(source) && /read \d{1,2} \w+ 20\d\d/i.test(source),
    );
    check(
      `the quotation is not inside a blockquote on the ${name} page`,
      /<blockquote/i.test(page.html),
    );
    const rating = page.text.match(/\b\d(\.\d)?\s?(out of 5|stars?|★)/i);
    check(
      `a star rating the record does not hold reached the ${name} page ("${rating?.[0]}")`,
      !rating,
    );
  }
  check(
    "the case study does not record where the quotation came from",
    /review/i.test(visible(sourcesLimits)),
  );
}

// ---------------------------------------------------------------------------
// The arc stays empty, and the mark stays concept work.
// ---------------------------------------------------------------------------
const arcClaims = [
  /\bsince \d{4}\b/i,
  /\bestablished \d{4}\b/i,
  /\bfamily[- ]run\b/i,
  /\b(for|over) \d+ years\b/i,
  /\bfounded\b/i,
  /\bgenerations?\b/i,
];
for (const [name, page] of Object.entries(routes)) {
  for (const pattern of arcClaims) {
    const hit = page.text.match(pattern);
    check(
      `an arc claim the record does not hold reached the ${name} page (/${pattern.source}/ matched "${hit?.[0]}")`,
      !hit,
    );
  }
  /* No stock, service or accreditation beyond the verified list. */
  const notStocked = [
    /\bdelivery\b(?!,)/i,
    /\bservicing\b/i,
    /\baccount\b/i,
    /\bloyalty\b/i,
    /\bkey cutting\b/i,
    /\bpaint mixing\b/i,
  ];
  for (const pattern of notStocked) {
    const hit = page.text.match(pattern);
    check(
      `a service outside the verified list reached the ${name} page (/${pattern.source}/ matched "${hit?.[0]}")`,
      !hit,
    );
  }
}
check(
  "the case study no longer frames the mark as concept work rather than the shop's badge",
  /concept work suggested by the shop's own Facebook badge, not the badge itself/.test(
    visible(sourcesLimits),
  ),
);

// ---------------------------------------------------------------------------
// The swap test, as far as a static check can run it: strip these and the page
// has to stop working for any other tool shop in Ireland.
// ---------------------------------------------------------------------------
const anchors = [
  ["the Main Street address", /107 Main Street/],
  ["the counter number", /028 4372 5010/],
  ["the directory hours", /Mon–Sat 9–5 · Sun 10–4/],
  ["the second trading name", /Tool Centre Plant Hire/],
  ["the Calor dealership", /Calor/],
  ["the two-names claim", /are one shop/],
];
for (const [label, pattern] of anchors) {
  check(`the home page no longer carries ${label}`, pattern.test(home.text));
}

if (failures.length > 0) {
  console.error(`The Tool Centre elevation: ${failures.length} check(s) failed.\n`);
  for (const failure of failures) console.error(`  ✗ ${failure}`);
  process.exit(1);
}

console.log("The Tool Centre elevation: all checks passed.");
