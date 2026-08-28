#!/usr/bin/env node
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { projectRoot } from "../lib/public-slugs.mjs";

const builtPath = path.join(projectRoot, "dist", "concepts", "stile-glass", "index.html");

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
check("door address missing", text.includes("108 Dundrum Road") && text.includes("BT33 0LN"));
check("phone link missing", /href="tel:\+442843724944"/.test(html));
check("email link missing", html.includes("info@stileglass.co.uk"));

// 2. Visuals & Atmosphere
check("hero terrace image missing", html.includes("/media/concepts/stile-glass/stile-glass-hero-terrace.jpg"));
check("balustrade spigot image missing", html.includes("/media/concepts/stile-glass/stile-glass-balustrade-spigot.jpg"));

// 3. Glazing Systems & Standards
check("systems grid missing", text.includes("Frameless Structural Balustrades") && text.includes("Frameless Shower"));
check("standards missing", text.includes("BS 6180:2011"));

if (failures.length > 0) {
  console.error(`test-stile-glass-elevation: FAIL with ${failures.length} issue(s):`);
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}

console.log("test-stile-glass-elevation: OK (7 assertions passing)");
