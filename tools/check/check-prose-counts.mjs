import { readFileSync } from "node:fs";
import path from "node:path";
import {
  projectRoot,
  readPublicTransformationSlugs,
} from "../lib/public-slugs.mjs";

const NUMBER_WORDS = {
  zero: 0,
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  ten: 10,
  eleven: 11,
  twelve: 12,
  thirteen: 13,
  fourteen: 14,
  fifteen: 15,
  sixteen: 16,
  seventeen: 17,
  eighteen: 18,
  nineteen: 19,
  twenty: 20,
};

const parseCount = (token) => {
  const normalised = token.toLocaleLowerCase("en-GB");
  if (/^\d+$/.test(normalised)) return Number(normalised);
  if (Object.hasOwn(NUMBER_WORDS, normalised)) return NUMBER_WORDS[normalised];
  return null;
};

const publicCount = readPublicTransformationSlugs().length;
const errors = [];

/** Prose that must track `publicTransformationSlugs.length`. Historical
 *  sentences (for example “seventeen concepts published before…”) stay
 *  outside this list on purpose. */
const ownedClaims = [
  {
    file: "PLAN.md",
    pattern: /\b([A-Za-z]+|\d+)\s+transformations are public\b/i,
    label: "PLAN.md public transformation count",
  },
  {
    file: "PROSPECTS.md",
    pattern: /\b([A-Za-z]+|\d+)\s+public transformations\b/i,
    label: "PROSPECTS.md public transformation count",
  },
];

for (const claim of ownedClaims) {
  const absolute = path.join(projectRoot, claim.file);
  const text = readFileSync(absolute, "utf8");
  const match = text.match(claim.pattern);
  if (!match) {
    errors.push(`${claim.label}: expected claim not found.`);
    continue;
  }
  const counted = parseCount(match[1]);
  if (counted === null) {
    errors.push(`${claim.label}: could not parse count from "${match[1]}".`);
    continue;
  }
  if (counted !== publicCount) {
    errors.push(
      `${claim.label}: says ${counted} but publicTransformationSlugs has ${publicCount}.`,
    );
  }
}

if (errors.length) {
  console.error(`Prose count check failed:\n- ${errors.join("\n- ")}`);
  process.exitCode = 1;
} else {
  console.log(
    `Prose count check passed: ${publicCount} public transformations agree with PLAN.md and PROSPECTS.md.`,
  );
}
