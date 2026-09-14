#!/usr/bin/env node
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { projectRoot } from "../lib/public-slugs.mjs";

const builtPath = path.join(projectRoot, "dist", "concepts", "bonnys", "index.html");

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
check("location missing", text.includes("Tullybrannigan") && text.includes("Newcastle"));
check("cottage phone link missing", /href="tel:\+447734540500"/.test(html));
check("visit mourne handoff missing", /visitmournegullionstrangford\.com/.test(html));

// 2. Imagery
check("hero image missing", html.includes("/media/concepts/bonnys/bonnys-hero-tullybrannigan.jpg"));
check("cottage image missing", html.includes("/media/concepts/bonnys/bonnys-cottage-exterior.jpg"));
check("pod image missing", html.includes("/media/concepts/bonnys/bonnys-log-pod-meadow.jpg"));

// 3. Honesty & Boundaries
check("no form element", !/<form/i.test(html));
check("no amateurish svg bay cottage", !html.includes("bn-plate") && !html.includes("BayCottage"));
check("no fake booking calendar", !/booking calendar/i.test(text));

if (failures.length > 0) {
  console.error(`test-bonnys-elevation: FAIL with ${failures.length} issue(s):`);
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}

console.log("test-bonnys-elevation: OK (9 assertions passing)");
