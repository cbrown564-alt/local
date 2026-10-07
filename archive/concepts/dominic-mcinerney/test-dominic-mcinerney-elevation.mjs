#!/usr/bin/env node
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { projectRoot } from "../lib/public-slugs.mjs";

const builtPath = path.join(projectRoot, "dist", "concepts", "dominic-mcinerney", "index.html");

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
check("door address missing", text.includes("123A Main Street") && text.includes("BT33 0AE"));
check("phone link missing", /href="tel:\+442843725238"/.test(html));
check("email link missing", html.includes("dmcinerney@btconnect.com"));

// 2. Visuals & Atmosphere
check("hero chamber image missing", html.includes("/media/concepts/dominic-mcinerney/dominic-mcinerney-hero-chamber.jpg"));
check("desk detail image missing", html.includes("/media/concepts/dominic-mcinerney/dominic-mcinerney-desk-detail.jpg"));

// 3. Legal Practice Modules & Sole Practitioner Promise
check("personal handling promise missing", text.includes("All cases handled personally") || text.includes("Personal Legal Counsel"));
check("practice areas missing", text.includes("Property & Conveyancing") && text.includes("Wills, Probate & Estates"));

if (failures.length > 0) {
  console.error(`test-dominic-mcinerney-elevation: FAIL with ${failures.length} issue(s):`);
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}

console.log("test-dominic-mcinerney-elevation: OK (7 assertions passing)");
