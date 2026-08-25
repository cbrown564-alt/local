#!/usr/bin/env node
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { projectRoot } from "../lib/public-slugs.mjs";

const builtPath = path.join(projectRoot, "dist", "concepts", "birch", "index.html");

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
check("door missing", text.includes("51 Central Promenade") && text.includes("BT33 0HH"));
check("instagram link missing", /href="https:\/\/www\.instagram\.com\/birch_coffee_\/"/.test(html));
check("linktree link missing", /href="https:\/\/linktr\.ee\/Birch_Coffee"/.test(html));

// 2. Coastal Botanical & Culture
check("hero image missing", html.includes("/media/concepts/birch/birch-hero.jpg"));
check("culture section missing", text.includes("Coffee, Plant Kitchen & Community"));
check("mixtape section missing", text.includes("The mixtape") && text.includes("Chris Rice"));
check("run club section missing", text.includes("Sunday 8:00 AM") || text.includes("Out. Then coffee."));

// 3. Honesty & Boundaries
check("no phone click to call when unpublished", !/href="tel:/.test(html));

if (failures.length > 0) {
  console.error(`test-birch-elevation: FAIL with ${failures.length} issue(s):`);
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}

console.log("test-birch-elevation: OK (7 assertions passing)");
