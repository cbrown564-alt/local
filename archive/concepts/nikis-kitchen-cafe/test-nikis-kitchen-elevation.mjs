#!/usr/bin/env node
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { projectRoot } from "../lib/public-slugs.mjs";

const builtPath = path.join(projectRoot, "dist", "concepts", "nikis-kitchen-cafe", "index.html");

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
check("door missing", text.includes("107 Central Promenade") && text.includes("BT33 0EU"));
check("phone missing", text.includes("028 4372 6777"));
check("tel link missing", /href="tel:\+442843726777"/.test(html));
check("facebook link missing", /href="https:\/\/www\.facebook\.com\/NikisKitchenCafe"/.test(html));

// 2. Elevated Culinary & Kitchen Theatre
check("hero image missing", html.includes("/media/concepts/nikis-kitchen-cafe/nikis-kitchen-hero.jpg"));
check("kitchen pass section missing", text.includes("Coastal Comfort Cooking"));
check("weekday wonders line missing", text.includes("Weekday Wonders") && text.includes("£12.50"));
check("chowder line missing", text.includes("Mourne Coast Chowder"));

// 3. Honesty & Boundaries
check("no booking widget allowed", !text.includes("Reserve online") && !text.includes("Book a table"));

if (failures.length > 0) {
  console.error(`test-nikis-kitchen-elevation: FAIL with ${failures.length} issue(s):`);
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}

console.log("test-nikis-kitchen-elevation: OK (7 assertions passing)");
