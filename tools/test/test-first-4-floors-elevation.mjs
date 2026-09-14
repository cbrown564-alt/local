#!/usr/bin/env node
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { projectRoot } from "../lib/public-slugs.mjs";

const builtPath = path.join(projectRoot, "dist", "concepts", "first-4-floors", "index.html");

if (!existsSync(builtPath)) {
  console.error(`Missing ${path.relative(projectRoot, builtPath)} — run \`pnpm build\` first.`);
  process.exit(1);
}

const html = readFileSync(builtPath, "utf8");
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
check("unit 2 address missing", text.includes("Unit 2, 63a Castlewellan Road") && text.includes("BT33 0JX"));
check("phone link missing", /href="tel:\+442843727676"/.test(html));
check("email link missing", /href="mailto:first4floorsni@gmail\.com"/.test(html));
check("site link missing", /firstfloornewcastle\.co\.uk/.test(html));
check("caravan refloor link missing", /caravans-re-flooring/.test(html));

// 2. Specialty & Showroom
check("caravan specialty missing", text.includes("Caravan") && text.includes("caravan flooring"));
check("showroom hours missing", text.includes("Monday–Friday 9:30–17:00") && text.includes("Saturday 9:30–14:00"));

// 3. Imagery & Signature Artefacts
check("hero showroom image missing", html.includes("/media/concepts/first-4-floors/first-4-floors-hero-showroom.jpg"));
check("counter samples image missing", html.includes("/media/concepts/first-4-floors/first-4-floors-counter-samples.jpg"));
check("caravan refloor image missing", html.includes("/media/concepts/first-4-floors/first-4-floors-caravan-refloor.jpg"));
check("sample book signature component missing", text.includes("SAMPLE BOOK") && text.includes("LVT WATERPROOF"));
check("caravan docket missing", html.includes("f4-docket"));

// 4. Honesty & Boundaries
check("no form element", !/<form/i.test(html));
check("not merged with stile glass", !/stile glass/i.test(text));
check("no invented opening year chrome", !/established in 2014|est\. 2014/i.test(text));

if (failures.length > 0) {
  console.error(`test-first-4-floors-elevation: FAIL with ${failures.length} issue(s):`);
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}

console.log("test-first-4-floors-elevation: OK (15 assertions passing)");
