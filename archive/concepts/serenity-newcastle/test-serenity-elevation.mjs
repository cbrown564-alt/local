#!/usr/bin/env node
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { projectRoot } from "../lib/public-slugs.mjs";

const builtPath = path.join(projectRoot, "dist", "concepts", "serenity-newcastle", "index.html");

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
check("door address missing", text.includes("55–57 Central Promenade") && text.includes("BT33 0HH"));
check("phone link missing", /href="tel:02843726768"/.test(html));
check("official site link missing", html.includes("serenitynewcastle.com"));

// 2. Visuals & Atmosphere
check("hero image missing", html.includes("/media/concepts/serenity-newcastle/serenity-newcastle-hero-spa.jpg"));
check("treatment detail image missing", html.includes("/media/concepts/serenity-newcastle/serenity-newcastle-treatment-detail.jpg"));
check("manicure suite image missing", html.includes("/media/concepts/serenity-newcastle/serenity-newcastle-manicure-suite.jpg"));

// 3. Treatment Ritual Ledger & Parking
check("treatment ledger missing", text.includes("Dermalogica") && text.includes("CND Shellac") && text.includes("Heated Basalt Stone"));
check("rear parking guidance missing", text.includes("Rear Parking") || text.includes("rear service lane"));

// 4. Honesty & Disclosure
check("banner disclosure note missing", html.includes("AI-generated illustrative visualisations of 55–57 Central Promenade"));

if (failures.length > 0) {
  console.error(`test-serenity-elevation: FAIL with ${failures.length} issue(s):`);
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}

console.log("test-serenity-elevation: OK (9 assertions passing)");
