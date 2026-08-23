#!/usr/bin/env node
/**
 * Pins the Bear Necessities elevation (the "This pass" bundle of
 * research/concepts/bear-necessities/bear-necessities-elevation-brief.md:
 * moves 2, 4, 5, 6 and 8, plus the move-3 deepen of the ritual copy).
 *
 * Runs against the built page, not the source, so a template that stops
 * rendering the essence, the circuit map or the certificate fails here. It
 * is a static check, not a browser one: every claim below is a fact about
 * the delivered HTML (plus the source for the mailto mechanism and the
 * party grade). Requires `pnpm build` first — `pnpm test` runs the build
 * ahead of it.
 *
 * The honesty limits are stated as absences: no £16.99 Care Bear line, no
 * street address or hours, no named school or hall, no located Wake the
 * Giant pin, no parent quote, no invented certificate wording, no plate
 * questions in guest copy.
 */
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { projectRoot } from "../lib/public-slugs.mjs";

const builtPath = path.join(projectRoot, "dist", "concepts", "bear-necessities", "index.html");
const sourcePath = path.join(projectRoot, "src", "concepts", "bear-necessities", "home.astro");
const stylesPath = path.join(projectRoot, "src", "concepts", "bear-necessities", "styles.css");

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
check("the phone number is missing", text.includes("07887 905 025"));
check("the phone number is not a tel: link", /href="tel:\+447887905025"/.test(html));
const mailtos = [...html.matchAll(/mailto:([^"'`?\s)]+)/g)].map((match) => match[1]);
check(
  `the page can only draft to bearnecessitieskids@gmail.com (found: ${[...new Set(mailtos)].join(", ")})`,
  mailtos.length > 0 && mailtos.every((address) => address === "bearnecessitieskids@gmail.com"),
);
check(
  "the page must not post to a form backend",
  !/<form[^>]*\baction=/.test(html) && !/fetch\(|XMLHttpRequest/.test(source),
);

// The packs, as published on the site 23 August 2026 — and the Care Bear
// line that is on neither surface stays off.
for (const pin of [
  "Little Ted",
  "£10.50",
  "10-inch bear",
  "Big Ted",
  "£15.99",
  "16-inch bear",
  "Colour Your Bear",
  "£16.50",
  "Minimum 12",
  "Minimum 10",
  "Heart insert · adoption certificate",
  "Call-out from £35 depending on location",
  "Sand art £3.50 a child",
]) {
  check(`pack pin missing: ${pin}`, text.includes(pin));
}
check("the £16.99 Care Bear line reached the page", !text.includes("16.99"));

// Move 1 — their voice stays furniture.
check('"We come to you" is missing', text.includes("We come to you!"));
check("the cover strapline is missing", text.includes("Where Bears Come To Life!"));

// Move 2 — the venue paradox owned, verbatim.
check("the essence section is missing", block('class="bn-venue"', 'class="bn-how"').length > 0);
check("the essence headline is missing", text.includes("The venue is yours."));
check(
  "the essence first paragraph is missing",
  text.includes(
    "There is no shop to find and no hall of ours to book. The party happens where the children already are — your living room, your hired hall, your classroom.",
  ),
);
check(
  "the essence second paragraph is missing",
  text.includes(
    "We arrive with the bears, the stuffing and the certificates, and for one Saturday your place is the party venue.",
  ),
);

// No street address, no hours — the page says why instead.
for (const [label, pattern] of [
  ["a postcode reached the page", /\bBT\d{2}\b/],
  ["opening hours reached the page", /opening hours|open (daily|monday|seven days)/i],
]) {
  check(label, !pattern.test(text));
}

// Move 3 — the heart is the emotional beat, strictly within the packages.
check(
  "the heart beat is missing",
  text.includes("Every bear gets a heart put inside before it is closed."),
);
check(
  "the certificate beat is missing",
  text.includes("Every bear leaves with its adoption certificate."),
);
check("they must never be elevated into craft sewing", !/hand-?sewn|hand stitched/i.test(text));

// Move 4 — the invitation asks the question the business splits on.
check("the where fieldset is missing", html.includes('name="bn-where"'));
for (const where of ["your hall", "your home", "your school", "the next public day"]) {
  check(`where chip missing: ${where}`, html.includes(`value="${where}"`));
}
check(
  "the where answer does not reach the drafted email",
  source.includes('"Where: " + where'),
);
check(
  "the draft does not open to bearnecessitieskids@gmail.com",
  source.includes("mailto:bearnecessitieskids@gmail.com?subject="),
);

// Move 5 — the circuit is the map. Pins only what the flyer grid names;
// Wake the Giant rides as a cartouche streamer, never a located pin.
const map = block('class="mm-map bn-map"', "</figure>");
check("the circuit map plate is missing", map.length > 0);
check("the map has no accessible description", map.includes("bn-map-desc"));
for (const label of [
  "Newcastle",
  "home",
  "Downpatrick Racecourse",
  "July",
  "Rathfriland",
  "August",
  "Warrenpoint Town Square",
  "your hall",
  "the Mournes",
  "CARLINGFORD LOUGH",
  "The summer circuit",
]) {
  check(`map pin/label missing: ${label}`, map.includes(label));
}
check(
  "the open dotted pin is missing",
  map.includes("bn-map-pin-open") && map.includes("bn-map-open-halo") && map.includes("bn-map-open-dot"),
);
check(
  "Wake the Giant must ride as the cartouche streamer, exactly once on the plate",
  (map.match(/Wake the Giant/g) || []).length === 1 && map.includes("Wake the Giant · 1 August"),
);
check(
  "the indicative caption is missing",
  map.includes("The public days from this summer's flyers") &&
    map.includes("indicative, not a route planner") &&
    map.includes("The private Saturdays come to you"),
);

// Move 6 — the adoption certificate, drawn blank: title and three ruled
// lines only, no invented body text.
const keepsake = block('class="bn-keepsake"', "</aside>");
check("the adoption certificate artifact is missing", keepsake.length > 0);
check(
  "the certificate lead line is missing",
  text.includes("Every bear leaves with a heart and an adoption certificate."),
);
check("the certificate title is missing", keepsake.includes("Certificate of Adoption"));
for (const line of ["The bear's name", "The maker's name", "The date"]) {
  check(`certificate blank missing: ${line}`, keepsake.includes(line));
}

// Facebook stays the live channel.
check(
  "the Facebook diary link is missing",
  /<a[^>]*href="https:\/\/www\.facebook\.com\/Bearnecessitiespartyvenue"/.test(flat),
);

// Move 8 — one photographic voice: the party grade defined and applied to
// the plate, as a chain, not a blanket filter on every image.
check("the party grade custom property is not defined", /--bn-grade:\s*[^;]+;/.test(styles));
check(
  "the party grade is not applied to the hero plate",
  /\.bn-stage img\s*\{[^}]*filter:\s*var\(--bn-grade\)/.test(styles),
);

// The generated-plate disclosure still rides in the banner, verbatim.
check(
  "the making-plate disclosure is missing",
  text.includes("The making picture is generated."),
);

// Never on the guest page.
for (const banned of ["When would I open this?", "Is this where I want to wake up?"]) {
  check(`a plate question reached the guest page: ${banned}`, !text.includes(banned));
}

// The swap test, as far as a file can carry it.
const anchors = ["Bear Necessities", "Little Ted", "Newcastle", "Certificate of Adoption", "your hall"];
const missingAnchors = anchors.filter((anchor) => !text.includes(anchor));
check(
  `the page is not anchored to this business; missing: ${missingAnchors.join(", ")}`,
  missingAnchors.length === 0,
);

if (failures.length > 0) {
  console.error("Bear Necessities elevation checks failed:");
  for (const failure of failures) console.error(`  - ${failure}`);
  process.exit(1);
}

console.log("Bear Necessities elevation checks passed.");
