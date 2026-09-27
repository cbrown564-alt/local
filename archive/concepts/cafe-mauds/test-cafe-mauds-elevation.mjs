#!/usr/bin/env node
/**
 * Pins the Café Mauds elevation (research/concepts/cafe-mauds/cafe-mauds-elevation-brief.md).
 *
 * Runs against the built page, not the source, to verify that the delivered HTML
 * contains all pinned claims, brand shell, menu pillars, Waterfoot plate,
 * operating rhythm, and interactive contact mechanism.
 */
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { projectRoot } from "../lib/public-slugs.mjs";

const builtPath = path.join(projectRoot, "dist", "concepts", "cafe-mauds", "index.html");
const sourcePath = path.join(projectRoot, "src", "concepts", "cafe-mauds", "home.astro");
const stylesPath = path.join(projectRoot, "src", "concepts", "cafe-mauds", "styles.css");

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
check("address 106 Waterfoot missing", text.includes("106 Waterfoot") && text.includes("BT33 0AE"));
check("Main Street missing", text.includes("Main Street"));
check("phone number missing", text.includes("028 4372 6184"));
check("tel: link missing", /href="tel:\+442843726184"/.test(html));
check("Facebook link missing", /href="https:\/\/www\.facebook\.com\/cafemaudsnewcastle\/"/.test(html));
check("Instagram link missing", /href="https:\/\/www\.instagram\.com\/cafemaudsnewcastle\/"/.test(html));

// 2. Culinary & Counter Pillars
check("Waterfoot Breakfast & Brunch missing", text.includes("Waterfoot Breakfast & Brunch") || text.includes("Breakfast & Brunch"));
check("The Champion Scoop Counter missing", text.includes("The Champion Scoop Counter") || text.includes("Scoop Counter"));
check("Pooh Bear's Delight missing", text.includes("Pooh Bear's Delight") || text.includes("Pooh Bear"));
check("Belgian Waffles missing", text.includes("Belgian Waffles") || text.includes("Waffles"));
check("Artisanal Roasts & Bakes missing", text.includes("Artisanal Roasts") || text.includes("Roasts & Bakes"));

// 3. Waterfoot Architectural Plate & Keypoints
check("waterfoot plate missing", flat.includes("cm-plate"));
check("Shimna Footbridge missing", text.includes("Shimna Footbridge") || text.includes("Shimna"));
check("Seaside Terrace missing", text.includes("Seaside Terrace") || text.includes("Terrace"));
check("Promenade Walk missing", text.includes("Promenade Walk") || text.includes("Promenade"));

// 4. Arc & Heritage
check("1982 scooping missing", text.includes("1982") || text.includes("'82"));
check("Green Tourism award missing", text.includes("Green Tourism"));

// 5. Operating Hours & Walk-in Culture
check("9:00 AM to 9:00 PM hours missing", text.includes("9:00") && (text.includes("9:00 PM") || text.includes("9:00pm")));
check("walk in culture missing", text.includes("walk in") || text.includes("Walk in") || text.includes("Walk-ins"));

// 6. Interactive Counter & Visit Script Form
check("script form missing", /<form[^>]*data-cm-request/.test(html));
check("form drafts to cafemauds106@gmail.com", source.includes("cafemauds106@gmail.com"));
check("no fake booking engine backend action", !/<form[^>]*\baction=/.test(html) && !/fetch\(|XMLHttpRequest/.test(source));

// 7. Visuals & Banner Disclosure
check("banner disclosure present", text.includes("The cup is a generated image of one dish, not a photograph from the café."));
check("brand color variables defined in styles", styles.includes("--cm-berry") && styles.includes("--cm-gold"));

if (failures.length > 0) {
  console.error("Café Mauds elevation checks failed:");
  for (const failure of failures) console.error(`  - ${failure}`);
  process.exit(1);
}

console.log("Café Mauds elevation verification passed (all claims pinned).");
