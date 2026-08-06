#!/usr/bin/env node
/**
 * Pins the Painted Earth elevation (moves 1–3 of
 * research/concepts/painted-earth/painted-earth-elevation-brief.md).
 *
 * Runs against the built pages, not the source, so a template that stops
 * rendering the makers' roll fails here. Requires `pnpm build` first —
 * `pnpm test` runs the build ahead of it.
 *
 * This concept's lever is blocked: the catalogue's photography spans 92
 * makers with no recorded licence, so recognition has to work without a
 * single photograph. The sharp checks are therefore about names and words.
 *
 * The makers' roll is only as honest as its source. Every name and count on
 * the page must come from the dated 26 July 2026 snapshot, the catalogue date
 * must travel with the roll as data freshness, and no studio re-check stamp
 * may stand beside it — "as of 26 July 2026" is guest-useful; "re-checked
 * 27 July" is an audit trail, and the audit trail lives in research/.
 *
 * The voice checks defend two verbatim sentences: the gallery's own words and
 * one named visitor review. The gallery page publishes no review dates, so
 * the page must not invent one — attribution stays at who spoke and where.
 *
 * The workshop check defends the whole workshop truth: the four real records,
 * the hand-run waiting-list sentence as found, and a proposal that is
 * labelled as a proposal. The finding is effort, not failure.
 */
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { projectRoot } from "../lib/public-slugs.mjs";

const pages = {
  home: path.join(projectRoot, "dist", "concepts", "painted-earth", "index.html"),
  originals: path.join(
    projectRoot,
    "dist",
    "concepts",
    "painted-earth",
    "originals",
    "index.html",
  ),
  availableDetail: path.join(
    projectRoot,
    "dist",
    "concepts",
    "painted-earth",
    "originals",
    "rossglass-to-mournes",
    "index.html",
  ),
  soldDetail: path.join(
    projectRoot,
    "dist",
    "concepts",
    "painted-earth",
    "originals",
    "cutie-the-puffin",
    "index.html",
  ),
};
const contentPath = path.join(projectRoot, "src", "concepts", "painted-earth", "content.ts");
const snapshotPath = path.join(
  projectRoot,
  "research",
  "concepts",
  "painted-earth",
  "painted-earth-catalogue-2026-07-26.json",
);
const harvestPath = path.join(
  projectRoot,
  "research",
  "concepts",
  "painted-earth",
  "voice-harvest.md",
);
const caseStudyPath = path.join(
  projectRoot,
  "dist",
  "transformations",
  "painted-earth",
  "index.html",
);

for (const file of [...Object.values(pages), caseStudyPath, contentPath, snapshotPath, harvestPath]) {
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
    .replace(/&rsquo;/g, "’")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&ldquo;|&#8220;/g, "“")
    .replace(/&rdquo;|&#8221;/g, "”")
    .replace(/&#8211;/g, "–")
    .replace(/&#8212;/g, "—")
    .replace(/&#8230;/g, "…")
    .replace(/\s+/g, " ");
  return { html, flat, text };
};

const home = load(pages.home);
const originals = load(pages.originals);
const availableDetail = load(pages.availableDetail);
const soldDetail = load(pages.soldDetail);
const caseStudy = load(caseStudyPath);
const routes = { home, originals, "available detail": availableDetail, "sold detail": soldDetail };
const content = readFileSync(contentPath, "utf8");
const snapshot = JSON.parse(readFileSync(snapshotPath, "utf8"));

const block = (flat, startMarker, endMarker) => {
  const start = flat.indexOf(startMarker);
  if (start < 0) return "";
  const end = endMarker ? flat.indexOf(endMarker, start) : -1;
  return flat.slice(start, end > start ? end : undefined);
};

// ---------------------------------------------------------------------------
// Move 1 — the makers' roll, from the dated snapshot and nothing else.
// ---------------------------------------------------------------------------
const snapshotCounts = snapshot.makersTop20;
const snapshotSampleNames = new Set(snapshot.sampleProducts.map((product) => product.maker));
const snapshotNames = new Set([...Object.keys(snapshotCounts), ...snapshotSampleNames]);
/* The shop's own label is a vendor in the data, not a maker. */
snapshotNames.delete("Painted Earth");

const makerEntries = [
  ...content.matchAll(/\{ name: "((?:[^"\\]|\\.)*)", pieces: (null|\d+) \}/g),
].map((match) => ({ name: match[1].replace(/\\'/g, "'"), pieces: match[2] === "null" ? null : Number(match[2]) }));

check(
  `the roll should name the makers the record holds (found ${makerEntries.length}, record holds ${snapshotNames.size})`,
  makerEntries.length === snapshotNames.size,
);
for (const maker of makerEntries) {
  check(
    `a maker on the roll is not in the dated snapshot ("${maker.name}")`,
    snapshotNames.has(maker.name),
  );
  if (maker.pieces !== null) {
    check(
      `the piece count beside ${maker.name} does not match the snapshot (${maker.pieces} vs ${snapshotCounts[maker.name]})`,
      snapshotCounts[maker.name] === maker.pieces,
    );
  } else {
    check(
      `${maker.name} carries a count the snapshot does not record`,
      !(maker.name in snapshotCounts),
    );
  }
  check(
    `a maker from the record is missing from the home page ("${maker.name}")`,
    home.text.includes(maker.name),
  );
  const href = `https://www.paintedearthgifts.com/collections/vendors?q=${encodeURIComponent(maker.name)}`;
  check(
    `a maker on the roll does not link to their live collection ("${maker.name}")`,
    home.flat.includes(`href="${href}"`),
  );
}

const roll = block(home.flat, 'class="pe-makers"', 'class="pe-place-route"');
check("the makers' roll section is missing from the home page", roll.length > 0);
check(
  "the catalogue date does not travel with the roll",
  /as of 26 July 2026/.test(home.text),
);
check(
  "the 92-maker total is missing from the home page",
  /Ninety-two makers/.test(home.text) && home.text.includes("92"),
);
for (const stamp of [/· read \d/i, /shown as/i, /re-?checked/i]) {
  const hit = home.text.match(stamp);
  check(
    `a studio audit stamp reached the home page (/${stamp.source}/ matched "${hit?.[0]}")`,
    !hit,
  );
}

// ---------------------------------------------------------------------------
// Move 1's voice — the gallery's own sentence and one named visitor review.
// ---------------------------------------------------------------------------
const GALLERY_WORDS =
  "Our lightfilled upstairs gallery space has added a new dimension to Painted Earth. It is the perfect canvas to showcase our Artist and Craftspeople.";
const VISITOR_QUOTE = "A beautiful gallery - a splendid space of calm and inspiration!";

check(
  "the gallery's own sentence is not carried verbatim on the home page",
  home.text.includes(GALLERY_WORDS),
);
check(
  "the visitor review is not carried verbatim on the home page",
  home.text.includes(VISITOR_QUOTE),
);
check(
  "the visitor review is not inside a blockquote on the home page",
  /<blockquote/i.test(home.html),
);
check(
  "the visitor review lost its light attribution (who and where)",
  home.text.includes("Joanna") && home.text.includes("On our gallery page"),
);
/* The gallery page publishes no review dates, so a year inside this
   blockquote would be invented. The read date stays in research/. */
const reviewBlock = block(home.flat, "<blockquote", "</blockquote>");
check("the visitor review blockquote is missing", reviewBlock.length > 0);
check(
  "an invented review date sits inside the visitor review",
  !/\b20\d\d\b/.test(reviewBlock),
);
check(
  "the harvest is not written up in research",
  readFileSync(harvestPath, "utf8").includes(VISITOR_QUOTE),
);
check(
  "the case study does not record where the quotations came from",
  /gallery/i.test(caseStudy.text) && /6 August 2026/.test(caseStudy.text),
);

// ---------------------------------------------------------------------------
// No photography until it is licensed — on every route.
// ---------------------------------------------------------------------------
for (const [name, page] of Object.entries(routes)) {
  check(
    `raster imagery reached the ${name} page`,
    !/<img\b/i.test(page.html) && !/\.(jpe?g|png|webp|avif)\b/i.test(page.html),
  );
  /* A tile that stands for a maker's product record — a shelf card, a product
     hero, a recovery preview, a route card — must say the drawing is a
     placeholder, so the record belongs to the maker and the drawing to
     nobody. Scene tiles (the arrival panel, the place cards) carry their own
     descriptive labels and are covered by the page-wide footer disclosure. */
  const recordContexts = [
    ...page.flat.matchAll(/<li class="pe-artwork[^"]*"[\s\S]*?<\/li>/g),
    ...page.flat.matchAll(/<section class="pe-product-layout">[\s\S]*?<\/section>/g),
    ...page.flat.matchAll(/<div class="pe-recovery-preview">[\s\S]*?<\/div>/g),
    ...page.flat.matchAll(/<ul class="pe-route-list"[\s\S]*?<\/ul>/g),
  ].map((match) => match[0]);
  check(`the ${name} page has no product-record tiles at all`, recordContexts.length > 0);
  for (const context of recordContexts) {
    const figures = [...context.matchAll(/<figure class="pe-art[^"]*">[\s\S]*?<\/figure>/g)];
    check(`a product-record tile is missing from its context on the ${name} page`, figures.length > 0);
    for (const figure of figures) {
      check(
        `a product-record tile on the ${name} page lost its placeholder label`,
        /<figcaption>[^<]*Placeholder[^<]*<\/figcaption>/.test(figure[0]),
      );
    }
  }
}

// ---------------------------------------------------------------------------
// Move 2 — the handover staged, with only the shop's published terms.
// ---------------------------------------------------------------------------
const handover = block(home.flat, 'class="pe-handover"', 'class="pe-workshops"');
check("the handover section is missing from the home page", handover.length > 0);
check(
  "the handover is still told as logistics rather than a moment",
  /An original is not posted/.test(home.text) && /collected/i.test(home.text),
);
check(
  "the handover lost the room it happens in",
  home.text.includes("98 Main Street") && /April 2025/.test(home.text),
);

const PUBLISHED_TERMS = [
  /free gift wrap on every order/i,
  /next-day dispatch monday to friday/i,
  /shipping quote/i,
  /no returns on original art/i,
];
for (const [name, page] of [
  ["home", home],
  ["originals", originals],
]) {
  for (const term of PUBLISHED_TERMS) {
    check(
      `a published fulfilment term is missing from the ${name} page (/${term.source}/)`,
      term.test(page.text),
    );
  }
}
check(
  "the originals shelf no longer frames fulfilment as the handover",
  originals.text.includes("The handover"),
);
/* Click-and-collect is not a service the shop offers. If it ever appears on a
   guest page it must be a labelled proposal — today it does not appear. */
for (const [name, page] of Object.entries(routes)) {
  const hit = page.text.match(/click[- ]and[- ]collect/i);
  check(
    `click-and-collect reached the ${name} page without its proposal label ("${hit?.[0]}")`,
    !hit,
  );
}

// ---------------------------------------------------------------------------
// Move 3 — the waiting list, named. Four records are the whole truth.
// ---------------------------------------------------------------------------
const WORKSHOPS = [
  { title: "Gel Monoprinting", tutor: "Jenny Bailie", date: "26 March 2026", price: "£30" },
  { title: "Needle felting", tutor: "Deirdre McClorey", date: "4 June 2026", price: "£50" },
  { title: "Painting", tutor: "Gemma Marie Blakely", date: "2 July 2026", price: "£50" },
  { title: "Needle felting", tutor: "Deirdre McClorey", date: "6 August 2026", price: "£50" },
];
const workshops = block(home.flat, 'class="pe-workshops"', "</section>");
check("the workshop section is missing from the home page", workshops.length > 0);
const workshopRows = [...workshops.matchAll(/<li>/g)];
check(
  `the workshop section should hold exactly the four real records (found ${workshopRows.length})`,
  workshopRows.length === 4,
);
for (const record of WORKSHOPS) {
  for (const field of [`${record.title} with ${record.tutor}`, record.date, record.price]) {
    check(
      `a real workshop record is missing or altered ("${field}")`,
      home.text.includes(field),
    );
  }
}
check(
  "every workshop is not shown as fully booked",
  (home.text.match(/Fully booked/g) ?? []).length === 4,
);
check(
  "the hand-run waiting-list sentence is not carried verbatim",
  home.text.includes("Currently sold out, get in touch to join our waiting list."),
);
check(
  "the waiting-list answer is not labelled as a proposal",
  /Proposal:/.test(home.text),
);
const inventedProgramme = home.text.match(/regular programme|next workshop|booking (is )?now open|places available/i);
check(
  `an availability claim beyond the four records reached the page ("${inventedProgramme?.[0]}")`,
  !inventedProgramme,
);

// ---------------------------------------------------------------------------
// The swap test, as far as a static check can run it: strip these and the
// page has to stop working for any gift shop in Ireland.
// ---------------------------------------------------------------------------
const anchors = [
  ["the maker total", /Ninety-two makers/],
  ["the Main Street address", /98 Main Street/],
  ["a named artist", /Gary Murray/],
  ["a named maker", /Piera Cirefice/],
  ["the waiting list", /waiting list/i],
  ["the catalogue date", /26 July 2026/],
  ["the upstairs gallery", /upstairs gallery/i],
];
for (const [label, pattern] of anchors) {
  check(`the home page no longer carries ${label}`, pattern.test(home.text));
}

if (failures.length > 0) {
  console.error(`Painted Earth elevation: ${failures.length} check(s) failed.\n`);
  for (const failure of failures) console.error(`  ✗ ${failure}`);
  process.exit(1);
}

console.log("Painted Earth elevation: all checks passed.");
