#!/usr/bin/env node
/**
 * Pins the Coco's Adventure Playground elevation (research/concepts/cocos-adventure-playground/cocos-adventure-playground-elevation-brief.md).
 *
 * Runs against the built page, not the source, to verify that the delivered HTML
 * contains all pinned claims, brand shell, admission rates, party packages,
 * arena layout plate, parking hubs, and interactive party script mechanism.
 */
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { projectRoot } from "../lib/public-slugs.mjs";

const builtPath = path.join(projectRoot, "dist", "concepts", "cocos-adventure-playground", "index.html");
const sourcePath = path.join(projectRoot, "src", "concepts", "cocos-adventure-playground", "home.astro");
const stylesPath = path.join(projectRoot, "src", "concepts", "cocos-adventure-playground", "styles.css");

if (!existsSync(builtPath)) {
  console.error(`Missing ${path.relative(projectRoot, builtPath)} — run \`pnpm build\` first.`);
  process.exit(1);
}

const html = readFileSync(builtPath, "utf8");
const source = readFileSync(sourcePath, "utf8");
const styles = readFileSync(stylesPath, "utf8");

const flat = html.replace(/\s+/g, " ");
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
check("address 27A Central Promenade missing", text.includes("27A Central Promenade") && text.includes("BT33 0AA"));
check("Newcastle Centre reference missing", text.includes("Newcastle Centre"));
check("phone number missing", text.includes("028 4372 6226"));
check("tel: link missing", /href="tel:\+442843726226"/.test(html));
check("Facebook link missing", /href="https:\/\/www\.facebook\.com\/CocosAdventurePlayground"/.test(html));

// 2. Operational Rule & Admission Rates
check("walk in for play rule missing", text.includes("Walk in for play") || text.includes("No booking necessary") || text.includes("No booking required"));
check("£6.50 under-3 admission missing", text.includes("£6.50"));
check("£7.50 child admission missing", text.includes("£7.50"));
check("£55 family pass missing", text.includes("£55"));

// 3. Birthday Party Packages
check("Coco Party missing", text.includes("Coco Party") && text.includes("£12.50"));
check("Bumper Party missing", text.includes("Bumper Party") && text.includes("£13.50"));
check("minimum £100 party spend missing", text.includes("£100"));

// 4. Arena Floorplan Plate & Zones
check("arena plate missing", flat.includes("cp-plate"));
check("Adventure Kingdom/Frame missing", text.includes("Adventure Kingdom") || text.includes("Play Frame"));
check("Toddler Zone missing", text.includes("Toddler Zone") || text.includes("Toddler"));
check("Viewing Café missing", text.includes("Viewing Café") || text.includes("Viewing Cafe"));
check("Party Rooms missing", text.includes("Party Rooms") || text.includes("Party Room"));

// 5. Parking Hubs
check("Donard Park car park missing", text.includes("Donard Park"));

// 6. Interactive Party Enquiry & Call Script Drafter
check("script form missing", /<form[^>]*data-cp-request/.test(html));
check("form drafts to cocosadventureplayground@gmail.com", source.includes("cocosadventureplayground@gmail.com"));
check("no fake booking engine backend action", !/<form[^>]*\baction=/.test(html) && !/fetch\(|XMLHttpRequest/.test(source));

// 7. Visuals & Banner Disclosure
check("banner disclosure present", text.includes("The play arena is a generated visualisation, not a photograph of the premises."));
check("brand color variables defined in styles", styles.includes("--cp-orange") && styles.includes("--cp-yellow"));

if (failures.length > 0) {
  console.error("Coco's Adventure Playground elevation checks failed:");
  for (const failure of failures) console.error(`  - ${failure}`);
  process.exit(1);
}

console.log("Coco's Adventure Playground elevation verification passed (all claims pinned).");
