import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);

const transformationsPath = path.join(
  projectRoot,
  "src",
  "data",
  "transformations.ts",
);
const publicationPath = path.join(
  projectRoot,
  "research",
  "concept-reviews",
  "publication.json",
);

const source = readFileSync(transformationsPath, "utf8");
const publication = JSON.parse(readFileSync(publicationPath, "utf8"));
const errors = [];

const arrayBody = (name) => {
  const match = source.match(
    new RegExp(`export const ${name}[^=]*=\\s*\\[([\\s\\S]*?)\\n\\];`),
  );
  if (!match) {
    errors.push(`Could not find ${name} in src/data/transformations.ts.`);
    return "";
  }
  return match[1];
};

const candidateSlugs = new Set(
  [...arrayBody("transformationCandidates").matchAll(/slug:\s*"([^"]+)"/g)]
    .map((match) => match[1]),
);
const publicSlugs = [
  ...arrayBody("publicTransformationSlugs").matchAll(/"([^"]+)"/g),
].map((match) => match[1]);

if (publication.schemaVersion !== 1 || !Array.isArray(publication.reviews)) {
  errors.push("publication.json must use schemaVersion 1 with a reviews array.");
}

const reviews = new Map();
for (const review of publication.reviews ?? []) {
  if (!review || typeof review.slug !== "string") {
    errors.push("Every publication review needs a slug.");
    continue;
  }
  if (reviews.has(review.slug)) {
    errors.push(`Duplicate publication review for "${review.slug}".`);
  }
  reviews.set(review.slug, review);
}

const checkNames = [
  "truthfulAndRespectful",
  "clearAndSpecific",
  "worksAsPresented",
  "safeToPublish",
];

for (const slug of publicSlugs) {
  if (!candidateSlugs.has(slug)) {
    errors.push(`Public transformation "${slug}" is not a concept candidate.`);
    continue;
  }

  const review = reviews.get(slug);
  if (!review) {
    errors.push(`Public transformation "${slug}" has no publication review.`);
    continue;
  }
  if (review.status !== "Publish") {
    errors.push(`Public transformation "${slug}" is not marked Publish.`);
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(review.checkedAt ?? "")) {
    errors.push(`Public transformation "${slug}" needs a YYYY-MM-DD checkedAt date.`);
  }
  for (const name of checkNames) {
    if (review.checks?.[name] !== true) {
      errors.push(`Public transformation "${slug}" fails "${name}".`);
    }
  }
  if (!Array.isArray(review.blockers) || review.blockers.length > 0) {
    errors.push(`Public transformation "${slug}" still has a publication blocker.`);
  }
}

if (new Set(publicSlugs).size !== publicSlugs.length) {
  errors.push("publicTransformationSlugs contains a duplicate.");
}

if (errors.length) {
  console.error(`Concept publication check failed:\n- ${errors.join("\n- ")}`);
  process.exitCode = 1;
} else {
  console.log(
    `Concept publication check passed for ${publicSlugs.length} public transformations.`,
  );
}
