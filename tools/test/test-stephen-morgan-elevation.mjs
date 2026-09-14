#!/usr/bin/env node
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { projectRoot } from "../lib/public-slugs.mjs";

const builtPath = path.join(projectRoot, "dist", "concepts", "stephen-morgan", "index.html");

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
check("door address missing", text.includes("14 Main Street") && text.includes("BT33 0AD"));
check("phone link missing", /href="tel:\+442843758323"/.test(html));
check("email mailto missing", /href="mailto:smorganfunerals@gmail\.com"/.test(html));
check("notices link missing", /href="https:\/\/www\.funeraltimes\.com\/stephen-morgan-funeral-directors"/.test(html));
check("24 hours mentioned", text.includes("24 hours") || text.includes("24 hour personal service"));

// 2. Imagery
check("hero image missing", html.includes("/media/concepts/stephen-morgan/stephen-morgan-hero-main-street.jpg"));
check("consultation room image missing", html.includes("/media/concepts/stephen-morgan/stephen-morgan-consultation-room.jpg"));
check("twilight image missing", html.includes("/media/concepts/stephen-morgan/stephen-morgan-coastal-twilight.jpg"));

// 3. Honesty & Boundaries
check("no form element", !/<form/i.test(html));
check("no amateurish svg dials or doors", !html.includes("sm-door-plate") && !html.includes("NightDoorPlate"));
check("not confused with McKeague Morgan", !/McKeague Morgan/i.test(text));
check("not confused with Stephen Magee", !/Stephen Magee/i.test(text));
check("not confused with McInerney", !/McInerney/i.test(text));

if (failures.length > 0) {
  console.error(`test-stephen-morgan-elevation: FAIL with ${failures.length} issue(s):`);
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}

console.log("test-stephen-morgan-elevation: OK (13 assertions passing)");
