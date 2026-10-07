#!/usr/bin/env node
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { projectRoot } from "../lib/public-slugs.mjs";

const builtPath = path.join(projectRoot, "dist", "concepts", "cafe-67", "index.html");

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
check("door missing", text.includes("67 Main Street") && text.includes("BT33 0AE"));
check("phone missing", text.includes("028 4379 8485"));
check("tel link missing", /href="tel:02843798485"/.test(html));
check("instagram link missing", /href="https:\/\/www\.instagram\.com\/cafe67newcastle\/"/.test(html));

// 2. Elevated Brunch Theatre & 3fe Coffee
check("hero image missing", html.includes("/media/concepts/cafe-67/cafe-67-hero.jpg"));
check("3fe coffee feature missing", text.includes("3fe in the cup"));
check("brunch pass missing", text.includes("Brunch Staples & 3fe Roastery Bar"));
check("poached eggs dish missing", text.includes("Eggs Florentine"));

// 3. Honesty & Boundaries
check("no booking widget allowed", !text.includes("Book a table") && !text.includes("OpenTable"));

if (failures.length > 0) {
  console.error(`test-cafe-67-elevation: FAIL with ${failures.length} issue(s):`);
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}

console.log("test-cafe-67-elevation: OK (7 assertions passing)");
