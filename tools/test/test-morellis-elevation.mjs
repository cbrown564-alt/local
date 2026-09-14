#!/usr/bin/env node
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { projectRoot } from "../lib/public-slugs.mjs";

const builtPath = path.join(projectRoot, "dist", "concepts", "morellis", "index.html");

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
check("door address missing", text.includes("73 Central Promenade") && text.includes("BT33 0HH"));
check("brand link missing", /morellisices\.com/.test(html));
check("buy link missing", /buy\.php/.test(html));

// 2. Imagery
check("hero image missing", html.includes("/media/concepts/morellis/morellis-hero-promenade.jpg"));
check("counter image missing", html.includes("/media/concepts/morellis/morellis-counter-gelato.jpg"));
check("cone image missing", html.includes("/media/concepts/morellis/morellis-promenade-cone.jpg"));

// 3. Honesty & Boundaries
check("no form element", !/<form/i.test(html));
check("no amateurish svg prom plate", !html.includes("mo-plate") && !html.includes("PromPlate"));
check("not confused with Cafe Mauds", !/Café Mauds|Cafe Mauds/i.test(text));

if (failures.length > 0) {
  console.error(`test-morellis-elevation: FAIL with ${failures.length} issue(s):`);
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}

console.log("test-morellis-elevation: OK (9 assertions passing)");
