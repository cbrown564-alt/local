#!/usr/bin/env node
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { projectRoot } from "../lib/public-slugs.mjs";

const builtPath = path.join(projectRoot, "dist", "concepts", "clay-project", "index.html");

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
check("door address missing", text.includes("85 Central Promenade") && text.includes("BT33 0HH"));
check("workshops booking link missing", html.includes("theclay-project.com/workshops"));
check("email link missing", html.includes("hello@theclay-project.com"));

// 2. Visuals & Atmosphere
check("hero studio image missing", html.includes("/media/concepts/clay-project/clay-project-hero-studio.jpg"));
check("porcelain wheel image missing", html.includes("/media/concepts/clay-project/clay-project-porcelain-wheel.jpg"));
check("evening session image missing", html.includes("/media/concepts/clay-project/clay-project-evening-session.jpg"));

// 3. Craft Cycle & Workshop Schedule
check("craft cycle section missing", text.includes("Bisc Ware") && text.includes("Kiln Firing"));
check("workshop diary missing", text.includes("Make a Mug") && text.includes("Charcuterie Night"));

if (failures.length > 0) {
  console.error(`test-clay-project-elevation: FAIL with ${failures.length} issue(s):`);
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}

console.log("test-clay-project-elevation: OK (8 assertions passing)");
