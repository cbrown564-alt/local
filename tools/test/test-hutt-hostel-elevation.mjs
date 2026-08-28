#!/usr/bin/env node
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { projectRoot } from "../lib/public-slugs.mjs";

const builtPath = path.join(projectRoot, "dist", "concepts", "hutt-hostel", "index.html");

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
check("door address missing", text.includes("30 Downs Road") && text.includes("BT33 0AG"));
check("phone link missing", /href="tel:\+442843722133"/.test(html));
check("email link missing", html.includes("info@hutthostel.com"));

// 2. Visuals & Atmosphere
check("hero mountain image missing", html.includes("/media/concepts/hutt-hostel/hutt-hostel-hero-mountain.jpg"));
check("lounge interior image missing", html.includes("/media/concepts/hutt-hostel/hutt-hostel-lounge-interior.jpg"));
check("padd apartment image missing", html.includes("/media/concepts/hutt-hostel/hutt-hostel-padd-apartment.jpg"));

// 3. Basecamp Capacity & The Padd Apartment
check("capacity and padd missing", text.includes("72 Mountain Bunks") || text.includes("72 beds") || text.includes("The Padd"));
check("trail guide missing", text.includes("Slieve Donard Summit") && text.includes("Mourne Wall"));

if (failures.length > 0) {
  console.error(`test-hutt-hostel-elevation: FAIL with ${failures.length} issue(s):`);
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}

console.log("test-hutt-hostel-elevation: OK (8 assertions passing)");
