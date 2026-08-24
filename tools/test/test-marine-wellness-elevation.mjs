#!/usr/bin/env node
/**
 * Pins the Marine Wellness elevation (research/concepts/marine-wellness/marine-wellness-elevation-brief.md).
 *
 * Runs against the built page, not the source, to verify that the delivered HTML
 * contains the continuity line, the verbatim creed, the people band, the weekly
 * hours table, the Booksy house rules, and the calm grade — and that the errors
 * the brief names (false "we do not publish hours", founding years, directory-era
 * door, restated clinical claims) stay off.
 */
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { projectRoot } from "../lib/public-slugs.mjs";

const builtPath = path.join(projectRoot, "dist", "concepts", "marine-wellness", "index.html");
const sourcePath = path.join(projectRoot, "src", "concepts", "marine-wellness", "home.astro");
const stylesPath = path.join(projectRoot, "src", "concepts", "marine-wellness", "styles.css");

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
check("current door missing", text.includes("Unit 13, 63A Castlewellan Road") && text.includes("BT33 0JX"));
check("phone number missing", text.includes("028 4372 6207"));
check("tel: link missing", /href="tel:\+442843726207"/.test(html));
check("Booksy link missing", /href="https:\/\/booksy\.com\/en-gb\/120760_marine-wellness/.test(html));
check("Facebook link missing", /href="https:\/\/www\.facebook\.com\/marinebeauty\.haven/.test(html));

// 2. The continuity line — Beauty Haven named once, as the old name
check(
  "continuity line missing",
  text.includes("If you knew us as Marine Beauty Haven on the Promenade — same hands, same number, new room."),
);
check("continuity paragraph missing", text.includes("The phone has not changed"));
check(
  "Beauty Haven should be named exactly once",
  (text.match(/Beauty Haven/g) ?? []).length === 1,
);
check("directory-era door must not appear", !text.includes("91 Central Promenade"));

// 3. The hours table — the site's seven lines, and the false line gone
const hoursRows = [
  ["Monday", "Closed"],
  ["Tuesday", "10–5"],
  ["Wednesday", "10–6"],
  ["Thursday", "10–7"],
  ["Friday", "10–6"],
  ["Saturday", "9–3"],
  ["Sunday", "Closed"],
];
for (const [day, time] of hoursRows) {
  check(`hours row missing: ${day} ${time}`, text.includes(day) && text.includes(time));
}
check("hours table markup missing", /<table[^>]*class="[^"]*mw-hours-table/.test(flat));
check('false "We do not publish hours" line still present', !text.includes("We do not publish hours"));
check('false "We do not publish hours" line still in source', !source.includes("We do not publish hours"));

// 4. The creed, verbatim, attributed
check(
  "creed quote missing or trimmed",
  text.includes(
    "Marine Wellness is a professional holistic wellness clinic specialising in therapeutic massage, reflexology and restorative treatments designed to support relaxation, recovery and overall wellbeing in a calm, welcoming environment.",
  ),
);
check("creed attribution missing", text.includes("Marine Wellness · Facebook"));

// 5. The people band — tenures carry the arc, nothing else invented
check("Patricia tenure missing", text.includes("Patricia") && text.includes("Over twenty years"));
check("Nicola tenure missing", text.includes("Nicola") && text.includes("Over ten"));
check("Emma tenure missing", text.includes("Emma") && text.includes("Three and counting"));

// 6. Booksy is the only diary, with the four house rules beside it
check("50% deposit rule missing", text.includes("50% deposit"));
check("24-hour cancellation rule missing", text.includes("non-refundable inside 24 hours"));
check("late-means-shorter rule missing", text.includes("late arrival means a shorter treatment"));
check("consultation-first rule missing", text.includes("consultation before advanced work"));
check("no fake booking engine backend action", !/<form[^>]*\baction=/.test(html) && !/fetch\(|XMLHttpRequest/.test(source));
check("no second booking engine", !/fresha|treatwell|vagaro|booking\.com/i.test(text));
check("treatment list stays dated", text.includes("23 August 2026"));

// 7. Emergency boundary strip intact
check("999/111 boundary strip missing", text.includes("This is not A&E") && /href="tel:999"/.test(html) && /href="tel:111"/.test(html));

// 8. Honesty constraints — nothing the record cannot carry
check("founding year asserted", !/\bfounded\b|\bestablished\b/i.test(text) && !text.includes("2012"));
check("no frozen tariff", !/£\d/.test(text));
check(
  "clinical claims left off rather than restated",
  !/cancer|fertility|pregnancy|sekhem|seichim|dry needling/i.test(text),
);

// 9. The calm grade and the banner disclosure
check("--mw-grade not defined", styles.includes("--mw-grade:"));
check("grade not applied to the plate", styles.includes("filter: var(--mw-grade)"));
check(
  "banner disclosure missing",
  text.includes("The calm plate is a generated image, not a photograph of the treatment room."),
);

if (failures.length > 0) {
  console.error("Marine Wellness elevation checks failed:");
  for (const failure of failures) console.error(`  - ${failure}`);
  process.exit(1);
}

console.log("Marine Wellness elevation verification passed (all claims pinned).");
