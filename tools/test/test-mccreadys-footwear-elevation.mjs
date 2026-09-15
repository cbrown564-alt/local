#!/usr/bin/env node
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { projectRoot } from "../lib/public-slugs.mjs";

const builtPath = path.join(projectRoot, "dist", "concepts", "mccreadys-footwear", "index.html");

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

check("door address missing", text.includes("85 Main Street") && text.includes("BT33 0AE"));
check("phone missing", text.includes("028 4372 3491") || html.includes("tel:+442843723491"));
check("handoff missing", /mccreadysfootwear\.com/.test(html));
check("hero image missing", html.includes("/media/concepts/mccreadys-footwear/mccreadys-footwear-hero-main-street.jpg"));
check("no form element", !/<form/i.test(html));
check("artefact names door", text.includes("85 Main Street"));

if (failures.length > 0) {
  console.error(`test-mccreadys-footwear-elevation: FAIL with ${failures.length} issue(s):`);
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}

console.log("test-mccreadys-footwear-elevation: OK");
