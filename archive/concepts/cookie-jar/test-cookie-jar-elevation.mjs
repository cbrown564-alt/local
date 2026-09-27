#!/usr/bin/env node
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { projectRoot } from "../lib/public-slugs.mjs";

const builtPath = path.join(projectRoot, "dist", "concepts", "cookie-jar", "index.html");

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
check("door address missing", text.includes("121 Main Street") && text.includes("BT33 0AE"));
check("phone link missing", /href="tel:\+442843722427"/.test(html));
check("mourne and bread shop link missing", html.includes("mourneandbread.co.uk"));
check("email link missing", html.includes("James@mourneandbread.co.uk"));

// 2. Visuals & Atmosphere
check("hero bakery image missing", html.includes("/media/concepts/cookie-jar/cookie-jar-hero-bakery.jpg"));
check("wheaten slice image missing", html.includes("/media/concepts/cookie-jar/cookie-jar-wheaten-slice.jpg"));
check("bread mix pack image missing", html.includes("/media/concepts/cookie-jar/cookie-jar-bread-mix-pack.jpg"));

// 3. Dual-Deck System & Bake Guide
check("dual-deck system missing", text.includes("Dual-Deck Bakery System") && text.includes("121 Main Street Counter") && text.includes("Mourne and Bread Mix"));
check("bake guide missing", text.includes("How to Bake at Home") && text.includes("Add Buttermilk") && text.includes("Bake 35 Mins"));

if (failures.length > 0) {
  console.error(`test-cookie-jar-elevation: FAIL with ${failures.length} issue(s):`);
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}

console.log("test-cookie-jar-elevation: OK (9 assertions passing)");
