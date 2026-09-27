#!/usr/bin/env node
/**
 * Pins the Binghams Menswear elevation (the "This pass" bundle of
 * research/concepts/binghams-menswear/binghams-menswear-elevation-brief.md:
 * moves 2, 4, 8, and the sharpen in 3 over moves 1, 6 and 7, which shipped
 * with the graft and stand).
 *
 * Runs against the built page, not the source, so a template that stops
 * rendering the two-days essence, the school roll or the fitting desk fails here.
 * It is a static check, not a browser one: every claim below is a fact about the
 * delivered HTML (plus the source for the mailto mechanism and the shop grade).
 * Requires `pnpm build` first — `pnpm test` runs the build ahead of it.
 *
 * The honesty limits are stated as absences: no unverified hours, no invented
 * hire prices, no shop subdomain CTA, no /highland-wear/, no Covid / 1 July copy.
 */
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { projectRoot } from "../lib/public-slugs.mjs";

const builtPath = path.join(projectRoot, "dist", "concepts", "binghams-menswear", "index.html");
const sourcePath = path.join(projectRoot, "src", "concepts", "binghams-menswear", "home.astro");
const stylesPath = path.join(projectRoot, "src", "concepts", "binghams-menswear", "styles.css");

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

// Sourced contact facts
check("the address is missing", text.includes("82 Main Street, Newcastle, BT33 0AE"));
check("the phone number is missing", text.includes("028 4372 3521"));
check("the phone number is not a tel: link", /href="tel:\+442843723521"/.test(html));
check("the email is missing", text.includes("info@binghamsmenswear.com"));
check("the fitting form is missing", /<form[^>]*data-bm-request/.test(html));
check(
  "the fitting form does not draft mail to info@binghamsmenswear.com",
  source.includes('recipient = "info@binghamsmenswear.com"'),
);
check(
  "the page must not post to a form backend",
  !/<form[^>]*\baction=/.test(html) && !/fetch\(|XMLHttpRequest/.test(source),
);

// Move 1 — Intro verbatim
check(
  "the Intro furniture is missing",
  text.includes("Men's designer clothing, men's wedding and formal hire, boys' and girls' school uniforms, men's footwear."),
);

// Move 2 — The two measured days essence
const twoDays = block('id="two-days"', 'id="book"');
check("the two-days section is missing", twoDays.length > 0);
check("the two-days kicker is missing", twoDays.includes("The shop"));
check(
  "the two-days heading is missing",
  twoDays.includes("From the first day of school to the wedding morning."),
);
check(
  "the two-days lead is missing",
  twoDays.includes("Both come through the same door at 82 Main Street — the P1 blazer with room to grow, and the morning it all has to be right."),
);
check(
  "the two-days internet line is missing",
  twoDays.includes("That part has never been on the internet."),
);

// Move 4 — The school roll carries exactly the 14 schools across 8 towns
const rollRaw = block('id="schools"', 'id="hire"');
check("the school roll section is missing", rollRaw.length > 0);
check("the school roll heading is missing", rollRaw.includes("Fourteen schools. One counter."));
const roll = rollRaw
  .replace(/&#39;|&apos;|&#x27;/g, "'")
  .replace(/&amp;/g, "&")
  .replace(/&#x2019;|&rsquo;/g, "’");

const fourteenSchools = [
  "Newcastle Primary & Nursery",
  "Sacred Heart Dundrum",
  "All Childrens Newcastle",
  "St Mary's",
  "St Josephs Carnacaville",
  "Cumran Clough",
  "Newcastle Preschool",
  "Kilkeel High",
  "St Louis Kilkeel",
  "Assumption Ballynahinch",
  "St Patricks Downpatrick",
  "Down High",
  "St Malachys Castlewellan",
  "Shimna College",
];

for (const school of fourteenSchools) {
  check(`the school roll is missing ${school}`, roll.includes(school));
}

// Move 6 — Hire names and price honesty
const hireBlock = block('id="hire"', 'class="concept-essence"');
check("the hire section is missing", hireBlock.length > 0);
check("sale tweeds price is missing", hireBlock.includes("from £159.00"));

// Move 8 — The shop grade custom property
check("the shop grade custom property is not defined", /--bm-grade:\s*[^;]+;/.test(styles));
check(
  "the shop grade is not applied to the stage image",
  /\.bm-stage-frame img[^{]*\{[^}]*filter:\s*var\(--bm-grade\)/.test(styles),
);

// High-fidelity image plates present
check("fitting-session image is missing", html.includes("fitting-session.jpg"));
check("two-blazers image is missing", html.includes("two-blazers.jpg"));
check("hire-rail image is missing", html.includes("hire-rail.jpg"));

// Disclosure intact in banner
check(
  "the photography disclosure is missing",
  text.includes("Tailoring scenes, two-days blazers and hire rail photography are generated visualisations."),
);

// Honesty absences
check("an invented hire price reached the page", !/£\s*(?!159(?:\.00)?)\d+/.test(text));
check(
  "unverified hours reached the page",
  !/\b(monday|tuesday|wednesday|thursday|friday|saturday|sunday)\b\s*\d{1,2}(?::\d{2})?\s*(?:am|pm|–|-)/i.test(text),
);
check("dead highland wear link reached the page", !/highland-wear|highlandwear/i.test(html));
check("shop subdomain CTA reached the page", !/shop\.binghamsmenswear\.com/i.test(html));
check("covid or 1 July copy reached the page", !/covid|1st july|1 july/i.test(text));

// Swap test anchors
const anchors = ["Binghams Menswear", "82 Main Street", "Newcastle", "first day of school", "wedding morning"];
const missingAnchors = anchors.filter((anchor) => !text.includes(anchor));
check(
  `the page is not anchored to this shop; missing: ${missingAnchors.join(", ")}`,
  missingAnchors.length === 0,
);

if (failures.length > 0) {
  console.error("Binghams Menswear elevation checks failed:");
  for (const failure of failures) console.error(`  - ${failure}`);
  process.exit(1);
}

console.log("Binghams Menswear elevation checks passed.");
