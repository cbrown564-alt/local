#!/usr/bin/env node
/**
 * Pins the Newcastle Family Dental Care elevation (moves 1–5 of
 * research/concepts/newcastle-dental/newcastle-dental-elevation-brief.md).
 *
 * Runs against the built page, not the source, so a template that stops
 * rendering the arc fails here. It is a static check, not a browser one: the
 * Puppeteer suites were retired on 4 August 2026, and every claim below is a
 * fact about the delivered HTML. Requires `pnpm build` first — `pnpm test`
 * runs the build ahead of it.
 *
 * Guest UI stays patient-facing: no archive stamps, no fake padlock chrome.
 * Archive-era absences still apply (NHS, recorded-message protocol, Maguire).
 * Calm-room disclosure stays in the banner and case study.
 */
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { projectRoot } from "../lib/public-slugs.mjs";

const builtPath = path.join(projectRoot, "dist", "concepts", "newcastle-dental", "index.html");
const sourcePath = path.join(projectRoot, "src", "concepts", "newcastle-dental", "home.astro");
const caseStudyPath = path.join(projectRoot, "dist", "transformations", "newcastle-dental", "index.html");
const platePath = path.join(
  projectRoot,
  "public",
  "media",
  "concepts",
  "newcastle-dental",
  "newcastle-dental-calm-room-plate.png",
);

if (!existsSync(builtPath)) {
  console.error(`Missing ${path.relative(projectRoot, builtPath)} — run \`pnpm build\` first.`);
  process.exit(1);
}

const html = readFileSync(builtPath, "utf8");
const source = readFileSync(sourcePath, "utf8");
/** Markup wraps freely; compare on collapsed whitespace. */
const flat = html.replace(/\s+/g, " ");
/** What a patient actually reads: no scripts, styles, comments or entities. */
const text = html
  .replace(/<script[\s\S]*?<\/script>/gi, " ")
  .replace(/<style[\s\S]*?<\/style>/gi, " ")
  .replace(/<!--[\s\S]*?-->/g, " ")
  .replace(/<[^>]+>/g, " ")
  .replace(/&#39;|&apos;/g, "'")
  .replace(/&amp;/g, "&")
  .replace(/&quot;/g, '"')
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
const visible = (markup) => markup.replace(/<[^>]+>/g, " ").replace(/&#39;/g, "'").replace(/\s+/g, " ");

// Move 1 — calm hero: studio headline, quiet smile line, private-appointments
// offer. Archive stamps stay off the guest UI (case study / banner instead).
check(
  "the studio headline is missing",
  text.includes("Your family dentist,") && text.includes("close to home."),
);
check('"We love to make you smile!" is not on the page', text.includes("We love to make you smile!"));
check(
  "guest UI still shows archive capture stamps",
  !/archived 2018/i.test(text),
);
check(
  "fake padlock URL chrome returned to the guest hero",
  !flat.includes('class="nd-urlbar"') && !text.includes("Secure connection"),
);
check(
  "the current private-appointments line is missing",
  text.includes("make a private appointment to help you with your dental care needs"),
);

// Move 2 — the arc still carries years and the award, without guest-facing
// research source stamps.
const practice = block('class="nd-practice"', 'class="nd-urgent"');
const practiceText = visible(practice);
check("the practice band is missing", practice.length > 0);
for (const year of ["2014", "2017", "2023", "Today"]) {
  check(`arc entry missing: ${year}`, new RegExp(`class="nd-arc-year">${year}<`).test(practice));
}
check(
  "research source stamps returned on the practice arc",
  !practice.includes('class="nd-arc-source"'),
);
check("the award is missing", practiceText.includes("Dental Practice of the Year"));
check("the award is not attributed to Randox Healthcare", practiceText.includes("Randox Healthcare"));
check("the BDA Good Practice Scheme is missing", practiceText.includes("BDA Good Practice Scheme"));
check(
  "the two-surgeries claim is presented as current",
  !practiceText.includes("two surgeries"),
);
check(
  "the archived ethical-dentistry sentence returned as undated guest copy",
  !text.includes("high quality, ethical dentistry"),
);

// The layer rules, stated as absences. Each of these was true of the archived
// practice and cannot be published as true today.
check("an NHS claim reached the page in either direction", !/\bNHS\b/.test(text));
check(
  "the archived recorded-message protocol was published as current",
  !/recorded message|answering machine|recorded instructions/i.test(text),
);
check(
  "GDC numbers reached the page while the third dentist's is not in the record",
  !text.includes("250740") && !text.includes("250716"),
);
check(
  "a treatment beyond the published items reached the page",
  !/cosmetic|implant|sedation|whitening|orthodontic|veneer/i.test(text),
);
check(
  "the page says something about the group relationship",
  !/DJ Maguire|Maguire|group of practices|part of a group/i.test(text),
);

// The three named dentists and their published credentials.
for (const [name, cred] of [
  ["Dr David Knowles", "BDS QUB 2014"],
  ["Dr Rebecca McCarey", "BDS QUB 2014"],
  ["Dr Daniel Sandford", "Grado en Odontología UCV 2023"],
]) {
  check(`dentist missing: ${name}`, text.includes(name));
  check(`published credential missing for ${name}: ${cred}`, text.includes(cred));
}

// Move 3 — the emergency path is a two-step mechanism with no promise the
// record does not carry.
const urgent = block('class="nd-urgent"', "</section>");
const urgentText = visible(urgent);
check("the urgent panel is missing", urgent.length > 0);
check("the in-hours step is missing", urgentText.includes("Monday to Friday, 9 until 5"));
check(
  "the in-hours step does not give the practice number",
  /href="tel:\+442843723776"/.test(urgent),
);
check("the out-of-hours step does not give 111", /href="tel:111"/.test(urgent));
check(
  "the urgent panel makes a promise the record does not support",
  !/seen the same day|same-day appointment|Sunday|24 hours|emergency appointment guaranteed/i.test(urgentText),
);
check(
  "the urgent panel is not staged as steps",
  (urgent.match(/class="nd-step"/g) ?? []).length === 2,
);

// Move 4 — the calm-room plate: disclosed as a drawn plate on the page, in
// alt text and in the case study, and never presented as the real room.
const calm = block('class="nd-calm-room"', "</section>");
const calmText = visible(calm);
check("the calm-room plate section is missing", calm.length > 0);
check(
  "the calm-room plate asset is missing from public media",
  existsSync(platePath),
);
check(
  "the calm-room plate is not on the page",
  /newcastle-dental-calm-room-plate\.png/.test(calm),
);
check(
  "the calm-room plate alt does not name it as a hand-drawn plate",
  /alt="Hand-drawn plate of a calm dental room[^"]*"/.test(calm),
);
check(
  "the calm-room plate caption does not disclose it as a drawn plate",
  /drawn plate/i.test(calmText),
);
check(
  "over-explained room caveats reached the calm-room caption",
  !/not the practice's furnishings|view from Railway Street|shown as a drawn plate/i.test(
    calmText,
  ),
);
check(
  "the banner note no longer discloses the calm-room plate",
  /calm-room plate is an AI-generated illustration/i.test(text),
);
if (existsSync(caseStudyPath)) {
  const caseStudy = readFileSync(caseStudyPath, "utf8")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ");
  check(
    "the case study does not disclose the calm-room plate",
    caseStudy.includes("calm-room plate is a disclosed AI-generated illustration") &&
      caseStudy.includes("not a photograph or record of the practice's actual interior"),
  );
} else {
  check("the newcastle-dental case study did not build", false);
}

// Move 5 — the request panel does its one job honestly and nothing else sends.
check("the request panel is no longer a form", /<form[^>]*data-nd-request/.test(html));
check("the request panel no longer captures a name", /id="nd-who"/.test(html));
check("the request panel no longer captures a number", /id="nd-tel"/.test(html));
check(
  "the request panel no longer captures a reason",
  /value="Register"/.test(html) && /value="Check-up"/.test(html) && /value="In pain"/.test(html),
);
check("the draft no longer carries the name", source.includes('"Name: " + name'));
check("the draft no longer carries the number", source.includes('"Best number: " + tel'));
check("the draft no longer carries the reason", source.includes('"Reason: " + reason'));
check(
  "editing a detail no longer withdraws the prepared draft",
  /addEventListener\("input"/.test(source) && /data-nd-stale/.test(html),
);
const mailtos = [...html.matchAll(/mailto:([^"'`?\s)]+)/g)].map((match) => match[1]);
check(
  `the page can only draft to info@newcastlefamilydentalcare.co.uk (found: ${[...new Set(mailtos)].join(", ")})`,
  mailtos.length > 0 &&
    mailtos.every((address) => address === "info@newcastlefamilydentalcare.co.uk"),
);
check(
  "the page must not post to a form backend",
  !/<form[^>]*\baction=/.test(html) && !/fetch\(|XMLHttpRequest/.test(source),
);
check(
  "the request foot still describes the email handoff",
  text.includes("Opens as a draft in your email app") &&
    text.includes("Or ring"),
);
check("placeholder controls survive", !/<a[^>]*data-concept-placeholder/.test(html));

// Padlock URL chrome was stripped in the Care-register redesign; keep it gone.
check("the padlocked address bar returned", !/class="nd-urlbar"/.test(html));
check(
  "the banner note no longer explains a padlock",
  !/not a live certificate/i.test(text),
);

// The swap test, as far as a file can carry it.
const anchors = [
  "Newcastle Family Dental Care",
  "Iveagh Court",
  "Railway Street",
  "BT33 0SP",
  "Dental Practice of the Year",
  "Queen's",
  "We love to make you smile!",
];
const missingAnchors = anchors.filter((anchor) => !text.includes(anchor));
check(
  `the page is not anchored to this practice; missing: ${missingAnchors.join(", ")}`,
  missingAnchors.length === 0,
);

if (failures.length > 0) {
  console.error("Newcastle Family Dental Care elevation checks failed:");
  for (const failure of failures) console.error(`  - ${failure}`);
  process.exit(1);
}

console.log("Newcastle Family Dental Care elevation checks passed.");
