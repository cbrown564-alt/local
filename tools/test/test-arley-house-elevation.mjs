#!/usr/bin/env node
/**
 * Pins the Arley House elevation (the "This pass" bundle of
 * research/concepts/arley-house/arley-house-elevation-brief.md: moves 2, 3,
 * 6 and 7, plus the copy sharpening in moves 1 and 5).
 *
 * Runs against the built page, not the source, so a template that stops
 * rendering the essence, the map or the guestbook band fails here. It is a
 * static check, not a browser one: every claim below is a fact about the
 * delivered HTML (plus the source for the call-script mechanism and the
 * house grade). Requires `pnpm build` first — `pnpm test` runs the build
 * ahead of it.
 *
 * The honesty limits are stated as absences: no 2017 tariffs, rooms or
 * services, no "Always open", no check-in times, no guest-dog policy, no
 * archival place names on the map, no resurrected 2012 review names.
 */
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { projectRoot } from "../lib/public-slugs.mjs";

const builtPath = path.join(projectRoot, "dist", "concepts", "arley-house", "index.html");
const sourcePath = path.join(projectRoot, "src", "concepts", "arley-house", "home.astro");
const stylesPath = path.join(projectRoot, "src", "concepts", "arley-house", "styles.css");

if (!existsSync(builtPath)) {
  console.error(`Missing ${path.relative(projectRoot, builtPath)} — run \`pnpm build\` first.`);
  process.exit(1);
}

const html = readFileSync(builtPath, "utf8");
const source = readFileSync(sourcePath, "utf8");
const styles = readFileSync(stylesPath, "utf8");
/** Markup wraps freely; compare on collapsed whitespace. */
const flat = html.replace(/\s+/g, " ");
/** What a guest actually reads: no scripts, styles, comments or entities. */
const text = html
  .replace(/<script[\s\S]*?<\/script>/gi, " ")
  .replace(/<style[\s\S]*?<\/style>/gi, " ")
  .replace(/<!--[\s\S]*?-->/g, " ")
  .replace(/<[^>]+>/g, " ")
  .replace(/&#39;|&apos;/g, "'")
  .replace(/&amp;/g, "&")
  .replace(/&quot;/g, '"')
  .replace(/&#x2019;|&rsquo;/g, "’")
  .replace(/\s+/g, " ");

const failures = [];
const check = (label, condition) => {
  if (!condition) failures.push(label);
};

const block = (startMarker, endMarker) => {
  const start = flat.indexOf(startMarker);
  if (start < 0) return "";
  const end = endMarker ? flat.indexOf(endMarker, start) : -1;
  return flat.slice(start, end > start ? end : undefined);
};

// The one transaction, routed to the one place it has always lived.
check("the address is missing", text.includes("14 Belfast Road, Dundrum, BT33 0NG"));
check("the phone number is missing", text.includes("028 4375 0949"));
check("the phone number is not a tel: link", /href="tel:\+442843750949"/.test(html));
check("the call-script form is missing", /<form[^>]*data-ah-request/.test(html));
check(
  "the sharpened form lead is missing",
  text.includes(
    "Write the nights. Ring the house — or send the same words by email. These words are for the call; nothing is sent from here.",
  ),
);
check(
  "the form no longer drafts a call script",
  source.includes('"Hello, my name is " + name') && source.includes('"I am hoping to stay " + when'),
);
check(
  "the email handoff no longer reuses the call script",
  source.includes('mailto:info@arleyhousedundrum.co.uk?subject='),
);
const mailtos = [...html.matchAll(/mailto:([^"'`?\s)]+)/g)].map((match) => match[1]);
check(
  `the page can only draft to info@arleyhousedundrum.co.uk (found: ${[...new Set(mailtos)].join(", ")})`,
  mailtos.length > 0 && mailtos.every((address) => address === "info@arleyhousedundrum.co.uk"),
);
check(
  "the page must not post to a form backend",
  !/<form[^>]*\baction=/.test(html) && !/fetch\(|XMLHttpRequest/.test(source),
);
check(
  "the dog chip must stay a question, not a policy",
  html.includes('value="asking about a dog"') && !/dogs (are )?welcome|dog-friendly|pets (allowed|welcome)/i.test(text),
);

// Move 1 — the Intro stays furniture, punctuation intact.
check(
  "the Intro sentence lost its punctuation",
  text.includes(
    "Arley House.. a family run B&B , is perfect to explore this Area of Outstanding Natural Beauty",
  ),
);
check("the lede is missing", text.includes("Wake in Dundrum. Newcastle when you want it."));

// Move 2 — the essence made visible, naming no inventory.
const essence = block('class="ah-essence"', 'class="ah-pull"');
check("the essence section is missing", essence.length > 0);
check("the essence headline is missing", text.includes("Everything but the rooms."));
check(
  "the essence first paragraph is missing",
  text.includes(
    "The dog on the boards. Bikes at the door. The fry in the morning and the village days as they come — that is all on our page, and always will be. The one thing we have never put on it is a bedroom.",
  ),
);
check(
  "the essence second paragraph is missing",
  text.includes("The rooms are kept the way they have always been kept:") &&
    /ring the house\s*, tell us the nights you have in mind, and we will tell you what we have\./.test(text),
);
check(
  '"ring the house" in the essence is not the tel: link',
  /<a href="tel:\+442843750949">ring the house<\/a>/.test(flat),
);
check("the old welcome section survived", !text.includes("Family-run, in the village."));
check("the old cards section survived", !text.includes("Find your way around"));

// Archive-era facts stay research-only.
for (const [label, pattern] of [
  ["a 2017 tariff reached the page", /£\s*(40|60|85)\b/],
  ["an archival room description reached the page", /en-?suite|double or twin|family room/i],
  ["an archival service list reached the page", /tea, parking, wifi|laundry|Freesat|power shower|travel cot|airport pickup/i],
  ['"Always open" reached the page as hours', /always open/i],
  ["a check-in time reached the page", /check-?in|8[–-]10am/i],
]) {
  check(label, !pattern.test(text));
}

// Move 3 — the map is the promise. Pins only what Layer A or the attributed
// Visit Mourne sentence carries; the caption keeps it indicative.
const map = block('class="mm-map ah-map"', "</figure>");
check("the village map plate is missing", map.length > 0);
check("the map has no accessible description", map.includes("ah-map-desc"));
for (const label of [
  "Arley House",
  "14 Belfast Road",
  ">Dundrum<",
  "Dundrum Castle",
  "a short walk",
  "DUNDRUM BAY",
  "beaches either side",
  "Newcastle",
  "the Mournes",
]) {
  check(`map pin/label missing: ${label}`, map.includes(label));
}
check(
  "the indicative caption is missing",
  map.includes("A sketch of the village and the bay as we describe them to guests") &&
    map.includes("indicative, not a survey"),
);
for (const banned of ["Silent Valley", "Castle Ward", "Tollymore", "Royal County Down", "Murlough"]) {
  check(`archival-only place name on the map: ${banned}`, !map.includes(banned) && !text.includes(banned));
}
check(
  "the Visit Mourne pull-quote lost its attribution",
  text.includes("Visit Mourne Gullion Strangford · Arley House"),
);

// Move 7 — the guestbook band: one anchored line, a light date, the door out.
const guestbook = block('class="ah-proof"', 'class="ah-end"');
check("the guestbook band is missing", guestbook.length > 0);
check(
  "the 25 July caption is missing from the guestbook band",
  guestbook.includes("What wonderful people we had last night") && guestbook.includes("Pippen"),
);
check("the guestbook band is not dated lightly", guestbook.includes("July 2026"));
check("the guestbook band still carries a full read-stamp date", !guestbook.includes("25 July 2026"));
check(
  "the Facebook handoff is missing or mislinked",
  guestbook.includes("The days as they happen — the dog, the runs, the shows — are on") &&
    guestbook.includes("our Facebook") &&
    /<a href="https:\/\/www\.facebook\.com\/ArleyHouseDundrum" rel="noopener">/.test(guestbook),
);
check("a 2012 review name reached the page", !/\bDuke\b|PeterM/.test(text));

// Move 6 — one photographic voice: the house grade is defined and applied
// to the plate(s), as a chain, not a blanket filter on every image.
check("the house grade custom property is not defined", /--ah-grade:\s*[^;]+;/.test(styles));
check(
  "the house grade is not applied to the hero plate",
  /\.ah-plate img\s*\{[^}]*filter:\s*var\(--ah-grade\)/.test(styles),
);

// The generated-plate disclosure still rides in the banner, verbatim.
check(
  "the dusk-plate disclosure is missing",
  text.includes("The windows at dusk are a generated image, not a photograph of the house."),
);

// Never on the guest page.
check(
  "a banned phrase reached the guest page",
  !text.includes("Is this where I want to wake up?"),
);

// The swap test, as far as a file can carry it.
const anchors = ["Arley House", "Belfast Road", "Dundrum", "Pippen", "the Mournes"];
const missingAnchors = anchors.filter((anchor) => !text.includes(anchor));
check(
  `the page is not anchored to this house; missing: ${missingAnchors.join(", ")}`,
  missingAnchors.length === 0,
);

if (failures.length > 0) {
  console.error("Arley House elevation checks failed:");
  for (const failure of failures) console.error(`  - ${failure}`);
  process.exit(1);
}

console.log("Arley House elevation checks passed.");
