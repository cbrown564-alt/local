#!/usr/bin/env node
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { projectRoot } from "../lib/public-slugs.mjs";

const builtPath = path.join(projectRoot, "dist", "concepts", "shimna-cafe", "index.html");

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
check("door address missing", text.includes("2 Main Street") && text.includes("BT33 0AD"));
check("phone link missing", /href="tel:\+442843723010"/.test(html));
check("yumm menu link missing", html.includes("m.yumm.menu/shimnacafe"));

// 2. Visuals & Atmosphere
check("hero terrace image missing", html.includes("/media/concepts/shimna-cafe/shimna-cafe-hero-terrace.jpg"));
check("breakfast fry image missing", html.includes("/media/concepts/shimna-cafe/shimna-cafe-breakfast-fry.jpg"));
check("catering platter image missing", html.includes("/media/concepts/shimna-cafe/shimna-cafe-catering-platter.jpg"));

// 3. Kitchen Pass & Catering
check("all-day breakfast pass missing", text.includes("All-Day Ulster Fry") && text.includes("Smashed Avocado"));
check("catering platter ledger missing", text.includes("Council & Corporate Catering") || text.includes("Catering Platters"));
check("walk-in guidance missing", text.includes("No booking required") || text.includes("Walk-ins always welcome"));

if (failures.length > 0) {
  console.error(`test-shimna-elevation: FAIL with ${failures.length} issue(s):`);
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}

console.log("test-shimna-elevation: OK (9 assertions passing)");
