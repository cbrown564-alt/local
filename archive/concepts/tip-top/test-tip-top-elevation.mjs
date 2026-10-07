#!/usr/bin/env node
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { projectRoot } from "../lib/public-slugs.mjs";

const builtPath = path.join(projectRoot, "dist", "concepts", "tip-top", "index.html");

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
check("door missing", text.includes("131 Main Street") && text.includes("BT33 0AE"));
check("instagram link missing", /href="https:\/\/www\.instagram\.com\/tiptopthesweetshop\/"/.test(html));
check("est 1937 missing", text.includes("1937"));

// 2. Heritage Sweet Shop & Weigh-Out
check("hero image missing", html.includes("/media/concepts/tip-top/tip-top-hero.jpg"));
check("counter section missing", text.includes("The 1937 Confectionery Index"));
check("clove rock item missing", text.includes("Mourne Clove Rock"));
check("weigh-out language missing", text.includes("weigh it by the quarter or the pound"));

// 3. Honesty & Boundaries
check("no online checkout", !text.includes("Add to cart") && !text.includes("Checkout"));

if (failures.length > 0) {
  console.error(`test-tip-top-elevation: FAIL with ${failures.length} issue(s):`);
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}

console.log("test-tip-top-elevation: OK (7 assertions passing)");
