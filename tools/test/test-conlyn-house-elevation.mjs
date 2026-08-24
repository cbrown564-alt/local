#!/usr/bin/env node
/**
 * Pins the Conlyn House elevation (research/concepts/conlyn-house/conlyn-house-elevation-brief.md).
 *
 * Runs against the built page, not the source, to verify that the delivered HTML
 * contains all pinned claims, the brand shell, rates, room names, rituals,
 * and contact mechanisms.
 */
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { projectRoot } from "../lib/public-slugs.mjs";

const builtPath = path.join(projectRoot, "dist", "concepts", "conlyn-house", "index.html");
const sourcePath = path.join(projectRoot, "src", "concepts", "conlyn-house", "home.astro");
const stylesPath = path.join(projectRoot, "src", "concepts", "conlyn-house", "styles.css");

if (!existsSync(builtPath)) {
  console.error(`Missing ${path.relative(projectRoot, builtPath)} — run \`pnpm build\` first.`);
  process.exit(1);
}

const html = readFileSync(builtPath, "utf8");
const source = readFileSync(sourcePath, "utf8");
const styles = readFileSync(stylesPath, "utf8");

const flat = html.replace(/\s+/g, " ");
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

// 1. Identity, Address & Contacts
check("address 11 Downs Road missing", text.includes("11 Downs Road") && text.includes("BT33 0AG"));
check("Central Promenade missing", text.includes("Central Promenade"));
check("phone number missing", text.includes("077 6229 6999"));
check("tel: link missing", /href="tel:\+447762296999"/.test(html));
check("WhatsApp link missing", /href="https:\/\/wa\.me\/447762296999"/.test(html));
check("Facebook link missing", /href="https:\/\/www\.facebook\.com\/conlynhousenewcastle"/.test(html));

// 2. The Nine Room Themes
const roomThemes = [
  "The New Yorker",
  "The Regency",
  "Little Havana",
  "Key West",
  "La Parisienne",
  "Walsh's Retreat",
  "The Olive",
  "Hollywood",
  "Sorrento",
];
for (const theme of roomThemes) {
  check(`room theme missing: ${theme}`, text.includes(theme));
}

// 3. The Five Published Rates & Date
check("Single £80 missing", text.includes("Single") && text.includes("£80"));
check("Double £100 missing", text.includes("Double") && text.includes("£100"));
check("Deluxe Double £120 missing", text.includes("Deluxe Double") && text.includes("£120"));
check("Twin £120 missing", text.includes("Twin") && text.includes("£120"));
check("Family £120 missing", text.includes("Family") && text.includes("£120"));
check("Rate card date missing", text.includes("23 August 2026"));

// 4. House Rituals & Accessibility
check("Breakfast 8 to 10 missing", text.includes("8:00") && text.includes("10:00"));
check("Checkout 11:00 missing", text.includes("11:00 AM") || text.includes("11:00"));
check("Ramp entrance missing", text.includes("Ramp") || text.includes("ramp"));
check("Ground floor rooms missing", text.includes("Ground Floor") || text.includes("ground-floor"));
check("Ensuite in every room missing", text.includes("Ensuite") || text.includes("ensuite"));

// 5. Furniture & Real Voice
check("purple front door furniture missing", text.includes("purple front door"));
check("9-iron quote missing", text.includes("9-iron"));
check("wee cuppa tea quote missing", text.includes("wee cuppa tea"));
check("Royal County Down missing", text.includes("Royal County Down"));

// 6. Promenade Walk Plate
check("walk plate missing", flat.includes("ch-walk-plate"));
check("Slieve Donard missing", text.includes("Slieve Donard"));
check("Main Street missing", text.includes("Main Street"));

// 7. Honest Enquiry Ledger (No fake booking engine)
check("script form missing", /<form[^>]*data-ch-request/.test(html));
check("form drafts to conlynhouse@gmail.com", source.includes("conlynhouse@gmail.com"));
check("no fake booking engine backend action", !/<form[^>]*\baction=/.test(html) && !/fetch\(|XMLHttpRequest/.test(source));

// 8. Visual & Disclosures
check("dusk plate disclosure present", text.includes("The windows at dusk and promenade plate are AI-generated visualisations, not photographs of the house."));
check("house grade defined in styles", /--ch-grade:\s*[^;]+;/.test(styles));
check("brand color variables defined in styles", styles.includes("--ch-dusk") && styles.includes("--ch-purple-door"));

if (failures.length > 0) {
  console.error("Conlyn House elevation checks failed:");
  for (const failure of failures) console.error(`  - ${failure}`);
  process.exit(1);
}

console.log("Conlyn House elevation verification passed (all claims pinned).");
