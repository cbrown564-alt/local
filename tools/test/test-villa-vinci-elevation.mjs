#!/usr/bin/env node
/**
 * Pins the Villa Vinci elevation (the moves in
 * research/concepts/villa-vinci/villa-vinci-elevation-brief.md:
 * Move 1: Since 2008 & Mediterranean/Mournes Intro
 * Move 2: Table Ledger / Call script composer with tel: & mailto:
 * Move 3: Honest hours (no invented clock hours)
 * Move 4: Living sister Zio Portadown; closed Al Forno Newry excluded
 * Move 5: La Cucina culinary pillars (no stale 2024 SAMPLE prices)
 * Move 6: Live site / phone primary menu action (demote SAMPLE PDF)
 * Move 7: Promenade walk map plate artifact
 * Guest voice integrity & disclosure checks).
 *
 * Runs against the built page, not the source. Requires `pnpm build` first.
 */
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { projectRoot } from "../lib/public-slugs.mjs";

const builtPath = path.join(
  projectRoot,
  "dist",
  "concepts",
  "villa-vinci",
  "index.html",
);
const sourcePath = path.join(
  projectRoot,
  "src",
  "concepts",
  "villa-vinci",
  "home.astro",
);
const stylesPath = path.join(
  projectRoot,
  "src",
  "concepts",
  "villa-vinci",
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
  .replace(/&#x201C;|&#x201D;|&ldquo;|&rdquo;/g, '"')
  .replace(/\s+/g, " ");

const failures = [];
const check = (label, condition) => {
  if (!condition) failures.push(label);
};

// 1. Sourced contact & physical address facts
check("the address is missing or wrong", text.includes("31 Main Street, Newcastle"));
check("the postcode is missing", text.includes("BT33 0AD"));
check("the phone number is missing", text.includes("028 4372 3080"));
check("the phone number is not a tel: link", /href="tel:\+442843723080"/.test(html));
check("the email is missing", source.includes("villavincinewcastlecodown@gmail.com"));
check("the table form is missing", /<form[^>]*data-vv-request/.test(html));

// 2. Facebook handle must be villavincinewcastle (not Romanian /villavinci or broken /villavincini)
check(
  "the Facebook URL is wrong",
  html.includes("facebook.com/villavincinewcastle"),
);
check(
  "must not link to Romanian or broken Facebook handles",
  !html.includes("facebook.com/villavinci/") && !html.includes("facebook.com/villavincini"),
);

// 3. Move 1: Intro furniture verbatim
check(
  "the Since 2008 furniture is missing",
  text.includes("Since 2008, where the warmth of the Mediterranean meets the charm of the Mourne Mountains."),
);

// 4. Promenade sentence verbatim
check(
  "the promenade quote is missing",
  text.includes("Why not pop in for lunch on a day at the seaside or reserve a table for dinner after an evening stroll on along the promenade."),
);

// 5. Move 4: Living sister Zio Portadown present; closed Al Forno Newry absent
check("Zio in Portadown is missing", text.includes("Zio") && text.includes("Portadown"));
check("must not list Al Forno Newry as an active room", !text.includes("Al Forno"));

// 6. Move 5 & 6: La Cucina & live board notice (no stale SAMPLE prices)
check("La Cucina section is missing", text.includes("La Cucina"));
check("Pizza dal Forno pillar is missing", text.includes("Pizza dal Forno"));
check("Pasta Fresca pillar is missing", text.includes("Pasta Fresca"));
check("Frutti di Mare pillar is missing", text.includes("Frutti di Mare"));
check(
  "stale March 2024 SAMPLE prices must not be printed as today's board",
  !text.includes("SAMPLE") && !text.includes("£14.95") && !text.includes("£16.95"),
);

// 7. Move 7: Promenade Walk Map Plate
check("the promenade walk plate is missing", text.includes("Promenade first, then the table"));
check("the coastal stroll step is missing", text.includes("The Coastal Stroll"));
check("the 31 Main Street step is missing", text.includes("Step Off Main Street"));

// 8. Move 2: Interactive Table Ledger & Call Script Handoff
check("the table call script handoff element is missing", /data-vv-handoff/.test(html));
check("the table script container is missing", /data-vv-script/.test(html));
check("the mailto handoff button is missing", /data-vv-mail/.test(html));

// 9. Absence of unverified clock hours
check("must not invent clock hours", !text.includes("12:00 – 22:00") && !text.includes("12pm - 10pm"));

// 10. AI disclosure present in layout bannerNote
check(
  "bannerNote must disclose the AI generated dish",
  source.includes("bannerNote=") && source.includes("dish is a generated image"),
);

if (failures.length > 0) {
  console.error("Villa Vinci elevation verification failed:");
  for (const f of failures) console.error(` - ${f}`);
  process.exit(1);
}

console.log("Villa Vinci elevation verification passed.");
