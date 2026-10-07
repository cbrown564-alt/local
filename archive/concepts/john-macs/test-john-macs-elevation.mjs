#!/usr/bin/env node
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { projectRoot } from "../lib/public-slugs.mjs";

const builtPath = path.join(projectRoot, "dist", "concepts", "john-macs", "index.html");

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
check("door address missing", text.includes("9 Central Promenade") && text.includes("BT33 0AA"));
check("phone missing", text.includes("028 4372 6119") || html.includes("tel:+442843726119"));

// 2. Imagery
check("hero image missing", html.includes("/media/concepts/john-macs/john-macs-hero-promenade.jpg"));
check("fryer image missing", html.includes("/media/concepts/john-macs/john-macs-fryer-counter.jpg"));
check("supper image missing", html.includes("/media/concepts/john-macs/john-macs-paper-supper.jpg"));

// 3. Honesty & Boundaries
check("no form element", !/<form/i.test(html));
check("not confused with other promenades", !text.includes("7 Central Promenade"));

if (failures.length > 0) {
  console.error(`test-john-macs-elevation: FAIL with ${failures.length} issue(s):`);
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}

console.log("test-john-macs-elevation: OK (7 assertions passing)");
