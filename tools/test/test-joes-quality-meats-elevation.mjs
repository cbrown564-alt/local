#!/usr/bin/env node
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { projectRoot } from "../lib/public-slugs.mjs";

const builtPath = path.join(projectRoot, "dist", "concepts", "joes-quality-meats", "index.html");

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
check("door address missing", text.includes("6 Main Street") && text.includes("BT33 0AD"));
check("phone link missing", /href="tel:\+442843722221"/.test(html));
check("facebook handoff missing", /facebook\.com\/joesqualitymeats\.newcastle/.test(html));

// 2. Essence & Depth
check("meats and deli essence missing", text.includes("Meats on Main Street") && text.includes("wee deli at the back"));
check("reviews missing", text.includes("Kim") && text.includes("Fabulous wee deli at back of shop") && text.includes("Josephine") && text.includes("Cornish pasties"));

// 3. Imagery
check("hero image missing", html.includes("/media/concepts/joes-quality-meats/joes-quality-meats-hero-main-street.jpg"));
check("counter case image missing", html.includes("/media/concepts/joes-quality-meats/joes-quality-meats-counter-case.jpg"));
check("deli pasties image missing", html.includes("/media/concepts/joes-quality-meats/joes-quality-meats-deli-pasties.jpg"));

// 4. Honesty & Boundaries
check("no form element", !/<form/i.test(html));
check("not merged with smalls", !/smalls/i.test(text));
check("not merged with vintage etc", !/vintage etc/i.test(text));

if (failures.length > 0) {
  console.error(`test-joes-quality-meats-elevation: FAIL with ${failures.length} issue(s):`);
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}

console.log("test-joes-quality-meats-elevation: OK (11 assertions passing)");
