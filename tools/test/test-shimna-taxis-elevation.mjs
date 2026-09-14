#!/usr/bin/env node
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { projectRoot } from "../lib/public-slugs.mjs";

const builtPath = path.join(projectRoot, "dist", "concepts", "shimna-taxis", "index.html");

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
check("door address missing", text.includes("18 Railway Street") && text.includes("BT33 0AL"));
check("primary phone missing", text.includes("028 437 24100") || html.includes("tel:+442843724100"));
check("secondary phone missing", text.includes("028 4372 3030") || html.includes("tel:+442843723030"));
check("website handoff missing", /shimnatravel\.co\.uk/.test(html));

// 2. Imagery
check("hero image missing", html.includes("/media/concepts/shimna-taxis/shimna-taxis-hero-railway-street.jpg"));
check("desk image missing", html.includes("/media/concepts/shimna-taxis/shimna-taxis-dispatch-desk.jpg"));
check("coastal run image missing", html.includes("/media/concepts/shimna-taxis/shimna-taxis-coastal-run.jpg"));

// 3. Honesty & Boundaries
check("no form element", !/<form/i.test(html));
check("not confused with Shimna Cafe", !/Shimna Café|Shimna Cafe/i.test(text) || !text.includes("2 Main Street"));

if (failures.length > 0) {
  console.error(`test-shimna-taxis-elevation: FAIL with ${failures.length} issue(s):`);
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}

console.log("test-shimna-taxis-elevation: OK (9 assertions passing)");
