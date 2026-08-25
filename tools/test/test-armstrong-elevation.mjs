#!/usr/bin/env node
/**
 * Pins the Armstrong Opticians elevation (the "This pass" bundle of
 * research/concepts/armstrong-opticians/armstrong-opticians-elevation-brief.md:
 * moves 3, 5 and 8 — the arc band, the drawn appointment card and the
 * practice grade — over moves 1, 2, 6 and 7, which shipped with the graft
 * and stand).
 *
 * Runs against the built page, not the source, so a template that stops
 * rendering the arc, the card or the desk note fails here. It is a static
 * check, not a browser one: every claim below is a fact about the delivered
 * HTML (plus the source for the call-script mechanism and the practice
 * grade). Requires `pnpm build` first — `pnpm test` runs the build ahead of
 * it.
 *
 * The honesty limits are stated as absences: no 028 4064 8306, no Hearing
 * Care Partnership, no 2013 founding year, no hours, no NHS/private claims,
 * no exam list, no email, no flyer prices (£99 / £19 / 20%), and never
 * "Can they see us, and soon?".
 */
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { projectRoot } from "../lib/public-slugs.mjs";

const builtPath = path.join(projectRoot, "dist", "concepts", "armstrong-opticians", "index.html");
const sourcePath = path.join(projectRoot, "src", "concepts", "armstrong-opticians", "home.astro");
const stylesPath = path.join(projectRoot, "src", "concepts", "armstrong-opticians", "styles.css");

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
check("the address is missing", text.includes("30 Railway Street, Newcastle, BT33 0AL"));
check("the phone number is missing", text.includes("028 4372 2991"));
check("the phone number is not a tel: link", /href="tel:\+442843722991"/.test(html));
check("the desk-note form is missing", /<form[^>]*data-ao-script/.test(html));
check(
  "the desk note no longer drafts the words for a call to the practice number",
  source.includes('"Ring " + practice'),
);
check(
  "the page must not post to a form backend",
  !/<form[^>]*\baction=/.test(html) && !/fetch\(|XMLHttpRequest/.test(source),
);

// Move 1 — the Intro stays hero furniture, as their words.
check(
  "the Intro sentence is missing",
  text.includes(
    "Independent Optometrists in Newcastle, County Down specialising in enhanced eye care and unique eyewear.",
  ),
);

// Move 2 — the refit notice stays a dated, dismissible notice.
check("the refit band lost its date", text.includes("Around 20 August 2026"));
check(
  "the refit band is not dismissible",
  html.includes("data-ao-refit-off") && source.includes('localStorage.setItem(KEY, "off")'),
);

// Move 3 — the two-and-a-half-pin arc: 1983, the August 2026 refit, and a
// "soon" the practice wrote itself, quoted.
const arc = block('class="ao-history"', 'class="ao-week"');
check("the arc band is missing", arc.length > 0);
check("the arc kicker is missing", arc.includes("The practice"));
check("the arc heading is missing", arc.includes("Same door since 1983."));
check(
  "the arc lead is missing",
  arc.includes("Independent optometrists on Railway Street since 1983.") &&
    arc.includes("the same door, the same number, and a new practice at the end of it."),
);
check("the 1983 pin is missing", arc.includes("The practice opens on Railway Street."));
check(
  "the August 2026 pin is missing",
  arc.includes("August 2026") && arc.includes("The builders come in"),
);
check(
  "the 'soon' pin is missing or not quoted in their words",
  arc.includes("Soon") &&
    /[“"]We look forward to showing you the new and updated practice soon\.[”"]/.test(arc) &&
    /<blockquote/.test(arc),
);
check("2013 reached the page as a founding year", !text.includes("2013"));

// Move 5 — the drawn appointment card: the four sourced facts, one blank
// ruled line, and nothing else.
const keepsake = block('class="ao-keepsake"', 'class="ao-history"');
check("the appointment card section is missing", keepsake.length > 0);
check("the card kicker is missing", keepsake.includes("For the diary"));
check("the card lead is missing", keepsake.includes("Everything you need fits on one card."));
for (const fact of [
  "Armstrong Opticians",
  "30 Railway Street, Newcastle",
  "028 4372 2991",
  "Established 1983",
  "Your appointment",
]) {
  check(`the card lost a sourced fact: ${fact}`, keepsake.includes(fact));
}
check(
  "the card carries an invented claim",
  !/£|@|\bhours\b|\bemail\b|ask for/i.test(keepsake),
);

// Move 7 — the offers handoff stands, without typesetting flyer prices.
check(
  "the Facebook offers handoff is missing",
  /href="https:\/\/www\.facebook\.com\/Armstrongopticians"/.test(html),
);

// Move 8 — one photographic voice: the practice grade is defined and applied
// to the plate(s), as a chain, not a blanket filter on every image.
check("the practice grade custom property is not defined", /--ao-grade:\s*[^;]+;/.test(styles));
check(
  "the practice grade is not applied to the plate",
  /\.ao-plate img\s*\{[^}]*filter:\s*var\(--ao-grade\)/.test(styles),
);

// A&E / 111 is present as public guidance, explicitly not the practice.
check("the public-guidance strip is missing", text.includes("Sudden loss of vision"));
check("the A&E / 111 guidance is missing", text.includes("A&E") && /href="tel:111"/.test(html));
check(
  "the A&E line is no longer disclaimed as not the practice's voice",
  text.includes("That is not a line from Armstrong Opticians."),
);

// The generated-plate disclosure still rides in the banner, verbatim.
check(
  "the calm-plate disclosure is missing",
  text.includes("The quiet room is a generated image of a calm practice, not a photograph of the shop."),
);

// Honesty absences.
check("the hearing number reached the page", !/028\s?4064\s?8306/.test(html));
check("the Hearing Care Partnership reached the page", !/Hearing Care Partnership/i.test(text));
check(
  "hours reached the page",
  !/\b(monday|tuesday|wednesday|thursday|friday|saturday|sunday)\b/i.test(text) &&
    !/opening hours/i.test(text),
);
check(
  "an NHS/private claim reached the page",
  !/\bprivate\b/i.test(text) && !/NHS (eye|sight|test|patient)/i.test(text),
);
check("an exam list reached the page", !/eye (test|exam|examination)|sight test/i.test(text));
check(
  "an email reached the page",
  !/mailto:/.test(html) && !/[\w.+-]+@[\w-]+\.[\w.]+/.test(text),
);
check("a flyer price reached the page", !/£\s*99|£\s*19|20\s*%/.test(text));
check(
  "a banned phrase reached the guest page",
  !text.includes("Can they see us, and soon?"),
);

// The swap test, as far as a file can carry it.
const anchors = ["Armstrong Opticians", "Railway Street", "1983", "Independent Optometrists in Newcastle"];
const missingAnchors = anchors.filter((anchor) => !text.includes(anchor));
check(
  `the page is not anchored to this practice; missing: ${missingAnchors.join(", ")}`,
  missingAnchors.length === 0,
);

if (failures.length > 0) {
  console.error("Armstrong Opticians elevation checks failed:");
  for (const failure of failures) console.error(`  - ${failure}`);
  process.exit(1);
}

console.log("Armstrong Opticians elevation checks passed.");
