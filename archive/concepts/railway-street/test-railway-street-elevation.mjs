#!/usr/bin/env node
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { projectRoot } from "../lib/public-slugs.mjs";

const builtPath = path.join(projectRoot, "dist", "concepts", "railway-street", "index.html");

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
check("door missing", text.includes("2 Railway Street") && text.includes("Newcastle"));
check("phone missing", text.includes("028 4372 5620"));
check("tel link missing", /href="tel:\+442843725620"/.test(html));
check("instagram link missing", /href="https:\/\/www\.instagram\.com\/railwaystcoffee\/"/.test(html));
check("groupwork roastery link missing", /href="https:\/\/groupworkcoffee\.com\/"/.test(html));

// 2. Elevated Culinary & Coffee Theatre
check("hero image missing", html.includes("/media/concepts/railway-street/railway-street-hero.jpg"));
check("brew bar section missing", text.includes("Brew Bar & Extraction"));
check("batch filter item missing", text.includes("Batch Filter") && text.includes("Daily Origin"));
check("kalita item missing", text.includes("Kalita Wave 185"));
check("tiramisu saturday line missing", text.includes("TIRAMISU iced lattes on repeat"));

// 3. Honesty & Boundaries
check("no booking widget allowed", !text.includes("Book a table") && !text.includes("Reservation form"));

if (failures.length > 0) {
  console.error(`test-railway-street-elevation: FAIL with ${failures.length} issue(s):`);
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}

console.log("test-railway-street-elevation: OK (7 assertions passing)");
