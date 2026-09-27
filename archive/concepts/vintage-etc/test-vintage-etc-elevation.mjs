#!/usr/bin/env node
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { projectRoot } from "../lib/public-slugs.mjs";

const builtPath = path.join(projectRoot, "dist", "concepts", "vintage-etc", "index.html");

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
check("door address missing", text.includes("4 Main Street") && text.includes("BT33 0AD"));
check("phone link missing", /href="tel:\+447584034590"/.test(html));
check("social links missing", html.includes("magsvintageetc") && html.includes("_vintage_etc"));

// 2. Visuals & Atmosphere
check("hero trove image missing", html.includes("/media/concepts/vintage-etc/vintage-etc-hero-trove.jpg"));
check("teak credenza image missing", html.includes("/media/concepts/vintage-etc/vintage-etc-teak-credenza.jpg"));
check("vinyl crates image missing", html.includes("/media/concepts/vintage-etc/vintage-etc-vinyl-crates.jpg"));

// 3. Collector's Index & Hold a Piece
check("collector's index missing", text.includes("Mid-Century Teak") && text.includes("Maritime Curios") && text.includes("Vintage Vinyl"));
check("hold a piece dock missing", text.includes("Hold a Piece Before It Leaves the Floor") || text.includes("Direct Reservation Line"));

if (failures.length > 0) {
  console.error(`test-vintage-etc-elevation: FAIL with ${failures.length} issue(s):`);
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}

console.log("test-vintage-etc-elevation: OK (8 assertions passing)");
