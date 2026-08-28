#!/usr/bin/env node
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { projectRoot } from "../lib/public-slugs.mjs";

const builtPath = path.join(projectRoot, "dist", "concepts", "smalls-butchers", "index.html");

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
check("door address missing", text.includes("The Shopping Centre") && text.includes("BT33 0ES"));
check("phone link missing", /href="tel:\+442843723512"/.test(html));
check("instagram link missing", html.includes("smallsbutchers_foods"));

// 2. Visuals & Atmosphere
check("hero counter image missing", html.includes("/media/concepts/smalls-butchers/smalls-butchers-hero-counter.jpg"));
check("dry-aged rib image missing", html.includes("/media/concepts/smalls-butchers/smalls-butchers-dry-aged-rib.jpg"));
check("hot carvery image missing", html.includes("/media/concepts/smalls-butchers/smalls-butchers-hot-carvery.jpg"));

// 3. Provenance Ledger & Hot Carvery
check("provenance ledger missing", text.includes("Mourne Meat Provenance") && text.includes("Dry-Aged Beef"));
check("hot lunch carvery missing", text.includes("Fresh Carved Lunchtime Roast Rolls") || text.includes("Hot Lunch Carvery"));

if (failures.length > 0) {
  console.error(`test-smalls-butchers-elevation: FAIL with ${failures.length} issue(s):`);
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}

console.log("test-smalls-butchers-elevation: OK (8 assertions passing)");
