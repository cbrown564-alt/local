#!/usr/bin/env node
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { projectRoot } from "../lib/public-slugs.mjs";

const builtPath = path.join(projectRoot, "dist", "concepts", "keown-nugent", "index.html");

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
check("door address missing", text.includes("26 Railway Street") && text.includes("BT33 0AL"));
check("phone link missing", /href="tel:\+442843330055"/.test(html));
check("email mailto missing", /href="mailto:info@knsolicitors\.com"/.test(html));
check("names present", text.includes("Anna Marie Nugent") && text.includes("John Keown"));

// 2. Imagery
check("hero image missing", html.includes("/media/concepts/keown-nugent/keown-nugent-hero-railway-street.jpg"));

// 3. Honesty & Boundaries
check("no form element", !/<form/i.test(html));
check("no amateurish svg blotter or door", !html.includes("kn-blotter") && !html.includes("DoorBlotter"));
check("not confused with Dominic McInerney", !/McInerney/i.test(text));
check("not confused with Belfast Keown", !/Cregagh/i.test(text));
check("not confused with Newry", !/Newry/i.test(text));

if (failures.length > 0) {
  console.error(`test-keown-nugent-elevation: FAIL with ${failures.length} issue(s):`);
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}

console.log("test-keown-nugent-elevation: OK (10 assertions passing)");
