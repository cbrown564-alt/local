#!/usr/bin/env node
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { projectRoot } from "../lib/public-slugs.mjs";

const builtPath = path.join(projectRoot, "dist", "concepts", "chatterbox", "index.html");

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
check("door address missing", text.includes("75 Bryansford Road") && text.includes("BT33 0LE"));
check("phone link missing", /href="tel:\+442843725805"/.test(html));
check("email link missing", /href="mailto:info@chatterboxkids\.co\.uk"/.test(html));
check("contact page link missing", /href="https:\/\/chatterboxkids\.co\.uk\/contact\.php"/.test(html));
check("fees handoff link missing", /href="https:\/\/chatterboxkids\.co\.uk\/fees\.html"/.test(html));

// 2. People & Story
check("owners missing", text.includes("Paul and Jane O'Connor") || (text.includes("Paul") && text.includes("Jane")));
check("trust registration missing", text.includes("South Eastern Health and Social Care Trust"));

// 3. Imagery & Signature Theatre
check("hero image missing", html.includes("/media/concepts/chatterbox/chatterbox-hero-bryansford-road.jpg"));
check("garden supporting image missing", html.includes("/media/concepts/chatterbox/chatterbox-garden-play.jpg"));
check("hall supporting image missing", html.includes("/media/concepts/chatterbox/chatterbox-hall-entry.jpg"));
check("day dial signature missing", text.includes("07.30") && text.includes("18:00") && text.includes("MON–FRI"));

// 4. Honesty & Boundaries
check("no form element", !/<form/i.test(html));
check("no instagram link", !/instagram\.com/i.test(html));
check("no scraped fee amounts", !/£\s*\d+/.test(text));

if (failures.length > 0) {
  console.error(`test-chatterbox-elevation: FAIL with ${failures.length} issue(s):`);
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}

console.log("test-chatterbox-elevation: OK (14 assertions passing)");
