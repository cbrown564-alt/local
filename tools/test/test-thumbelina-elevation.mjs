#!/usr/bin/env node
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { projectRoot } from "../lib/public-slugs.mjs";

const builtPath = path.join(projectRoot, "dist", "concepts", "thumbelina", "index.html");

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
check("door address missing", text.includes("10A Railway Street") && text.includes("BT33 0AL"));
check("phone link missing", /href="tel:\+442843727444"/.test(html));
check("instagram handoff missing", /instagram\.com\/thumbelinatoyshop/.test(html));
check("audrey mentioned", text.includes("Audrey"));

// 2. Imagery
check("hero image missing", html.includes("/media/concepts/thumbelina/thumbelina-hero-shopfront.jpg"));
check("counter image missing", html.includes("/media/concepts/thumbelina/thumbelina-counter-shelves.jpg"));
check("window image missing", html.includes("/media/concepts/thumbelina/thumbelina-window-display.jpg"));

// 3. Honesty & Boundaries
check("no form element", !/<form/i.test(html));
check("no amateurish svg dancer door", !html.includes("tb-plate") && !html.includes("DancerDoor"));
check("not confused with Bear Necessities", !/Bear Necessities/i.test(text));

if (failures.length > 0) {
  console.error(`test-thumbelina-elevation: FAIL with ${failures.length} issue(s):`);
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}

console.log("test-thumbelina-elevation: OK (10 assertions passing)");
