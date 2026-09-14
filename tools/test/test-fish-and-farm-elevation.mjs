#!/usr/bin/env node
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { projectRoot } from "../lib/public-slugs.mjs";

const builtPath = path.join(projectRoot, "dist", "concepts", "fish-and-farm", "index.html");

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
check("door address missing", text.includes("18 Main Street") && text.includes("BT33 0AD"));
check("phone missing", text.includes("028 4379 8550") || html.includes("tel:+442843798550"));
check("chef handoff missing", /chefalexgreene\.co\.uk/.test(html));

// 2. Imagery
check("hero image missing", html.includes("/media/concepts/fish-and-farm/fish-and-farm-hero-main-street.jpg"));
check("counter image missing", html.includes("/media/concepts/fish-and-farm/fish-and-farm-take-home-counter.jpg"));
check("deli image missing", html.includes("/media/concepts/fish-and-farm/fish-and-farm-deli-table.jpg"));

// 3. Honesty & Boundaries
check("no form element", !/<form/i.test(html));
check("sister relationship with Bucks Head preserved", text.includes("Buck’s Head") || text.includes("Buck's Head"));

if (failures.length > 0) {
  console.error(`test-fish-and-farm-elevation: FAIL with ${failures.length} issue(s):`);
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}

console.log("test-fish-and-farm-elevation: OK (8 assertions passing)");
