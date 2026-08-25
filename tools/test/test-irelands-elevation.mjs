#!/usr/bin/env node
/**
 * Pins the Ireland's Appliance Centre elevation (the moves in
 * research/concepts/irelands-appliance-centre/irelands-appliance-centre-elevation-brief.md:
 * moves 1 through 6 — the live-here furniture, cooker-goes-cold repairs lede,
 * accurate family timeline, hold & store, price match, and workshop docket).
 *
 * Runs against the built page, not the source. It is a static check:
 * every claim below is a fact about the delivered HTML (plus source checks for
 * the mailto generator). Requires `pnpm build` first.
 */
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { projectRoot } from "../lib/public-slugs.mjs";

const builtPath = path.join(
  projectRoot,
  "dist",
  "concepts",
  "irelands-appliance-centre",
  "index.html",
);
const sourcePath = path.join(
  projectRoot,
  "src",
  "concepts",
  "irelands-appliance-centre",
  "home.astro",
);
const stylesPath = path.join(
  projectRoot,
  "src",
  "concepts",
  "irelands-appliance-centre",
  "styles.css",
);

if (!existsSync(builtPath)) {
  console.error(
    `Missing ${path.relative(projectRoot, builtPath)} — run \`pnpm build\` first.`,
  );
  process.exit(1);
}

const html = readFileSync(builtPath, "utf8");
const source = readFileSync(sourcePath, "utf8");
const styles = readFileSync(stylesPath, "utf8");
if (!styles) throw new Error("Styles file empty");

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
  return flat
    .slice(start, end > start ? end : undefined)
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#x2019;|&rsquo;/g, "’");
};

// Sourced contact facts
check(
  "the address is missing or wrong",
  text.includes("67–69 The Harbour / South Promenade, Newcastle, BT33 0EY") ||
    text.includes("67–69 The Harbour · South Promenade · Newcastle"),
);
check("the phone number is missing", text.includes("028 4372 4717"));
check(
  "the phone number is not a tel: link",
  /href="tel:\+442843724717"/.test(html),
);
check("the email is missing", text.includes("sales@irelandsappliances.com"));
check(
  "the catalogue link is missing",
  html.includes("https://www.irelandsappliances.com/catalogue/index.php"),
);
check(
  "the facebook link is missing",
  html.includes("https://www.facebook.com/IrelandsApplianceCentre"),
);
check(
  "opening hours are missing",
  text.includes("Monday to Saturday 8:30–5:00. Sunday closed.") ||
    text.includes("Mon–Sat 8:30–5:00"),
);

// Move 1 — Creed / furniture sentence
check(
  "the live-here furniture quote is missing",
  text.includes(
    "We don't just operate in Newcastle, we all live here. We are locals.",
  ),
);

// Move 2 — Cooker goes cold lede
check(
  "the cooker-goes-cold lede is missing",
  text.includes(
    "When your cooker goes cold, your washing machine won't spin, your fridge has a meltdown, or your dishwasher does the dirty on you, don't despair!",
  ),
);
check(
  "the large at home / small on bench distinction is missing",
  text.includes("Large at the house. Small on the bench."),
);

// Move 3 — Family timeline with correct years
const familyBlock = block('id="family"', 'id="terms"');
check("the family section is missing", familyBlock.length > 0);
check(
  "1975 Tom Doesn't Go To Catering School is missing",
  familyBlock.includes("1975") &&
    familyBlock.includes("Tom Doesn't Go To Catering School!"),
);
check(
  "1980 Albion closes is missing",
  familyBlock.includes("1980") && familyBlock.includes("Albion closes."),
);
check(
  "1984 Ireland's Appliance Centre is missing",
  familyBlock.includes("1984") &&
    familyBlock.includes("Ireland's Appliance Centre Is Born."),
);
check(
  "2017 Thomas Junior is missing",
  familyBlock.includes("2017") &&
    familyBlock.includes("Thomas Junior Joins The Team."),
);
check(
  "2021 Oran is missing",
  familyBlock.includes("2021") &&
    familyBlock.includes("Oran Joins The Ever Growing Team."),
);
check(
  "2022 Siobhan is missing",
  familyBlock.includes("2022") && familyBlock.includes("Enter Siobhan."),
);
check("two vans are missing from the timeline", familyBlock.includes("two vans"));

// Move 4 — Terms (Hold & store, Price match)
const termsBlock = block('id="terms"', 'id="docket"');
check("the terms section is missing", termsBlock.length > 0);
check(
  "hold and store definition is missing",
  termsBlock.includes(
    "We're happy to secure your order with a small deposit to guarantee the price.",
  ),
);
check(
  "price match magic quote is missing",
  termsBlock.includes("Let us work our magic to find you the best deal!"),
);

// Move 5 — Workshop docket form
check("the docket form is missing", /<form[^>]*data-ia-request/.test(html));
check(
  "the docket form does not draft mail to sales@irelandsappliances.com",
  source.includes('recipient = "sales@irelandsappliances.com"'),
);
check(
  "the page must not post to a form backend",
  !/<form[^>]*\baction=/.test(html) && !/fetch\(|XMLHttpRequest/.test(source),
);

// Move 6 — Interactive Diagnostics router
check(
  "the diagnostics router is missing",
  html.includes("data-ia-diagnostics") &&
    text.includes("What has happened to the machine?"),
);

// Move 7 — Two Vans ride plate & coverage
check(
  "the ride plate is missing",
  text.includes("The Harbour door and your kitchen.") &&
    text.includes("Two vans covering Newcastle and surrounding Mourne towns"),
);
check(
  "surrounding towns coverage is missing",
  text.includes("Dundrum") &&
    text.includes("Castlewellan") &&
    text.includes("Annalong") &&
    text.includes("Kilkeel"),
);

// Honesty absences
check(
  "guest copy must not include 'Can they fix mine?'",
  !/can they fix mine\?/i.test(text),
);
check(
  "guest copy must not have a section titled 'the record'",
  !/\bthe record\b/i.test(text.replace(/50 plus years of schools/gi, "")),
);
check(
  "must not print standing Samsung £259 price as fixed catalogue text",
  !/Samsung.*£259/i.test(text),
);

if (failures.length) {
  console.error(
    `Ireland's Appliance Centre elevation verification failed (${failures.length} issues):`,
  );
  for (const failure of failures) {
    console.error(`  - ${failure}`);
  }
  process.exit(1);
}

console.log(
  "Ireland's Appliance Centre elevation verification passed (all claims pinned).",
);
