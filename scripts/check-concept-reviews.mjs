import { createHash } from "node:crypto";
import {
  existsSync,
  readFileSync,
  readdirSync,
  statSync,
} from "node:fs";
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
const releasesPath = process.env.CONCEPT_RELEASES_PATH
  ? path.resolve(projectRoot, process.env.CONCEPT_RELEASES_PATH)
  : path.join(
      projectRoot,
      "research",
      "concept-reviews",
      "releases.json",
    );

export const designGateKeys = [
  "currentAndRespectful",
  "claimsHonest",
  "realVisitorLoop",
  "subjectProof",
  "responsiveAndKeyboard",
  "readableAndMotionSafe",
];

export const releaseConditionKeys = [
  "assetPermission",
  "truthCurrent",
  "independentSafeguards",
  "repositoryChecks",
];

export const scoreWeights = {
  evidenceTruthRespect: 0.15,
  visitorOutcome: 0.15,
  subjectIdentity: 0.15,
  firstViewport: 0.15,
  completeLoop: 0.15,
  responsiveAccessibility: 0.15,
  craftFinish: 0.1,
};

const scoreKeys = Object.keys(scoreWeights);
export const coreScoreKeys = [
  "evidenceTruthRespect",
  "visitorOutcome",
  "completeLoop",
  "responsiveAccessibility",
];
export const supportingScoreKeys = [
  "subjectIdentity",
  "firstViewport",
  "craftFinish",
];
const releaseKeys = [
  "slug",
  "status",
  "sourceFingerprint",
  "reviewer",
  "designGates",
  "releaseConditions",
  "scores",
  "weightedScore",
  "reviewedAt",
  "truthCheckedAt",
];
const sourceExtensions = [
  "",
  ".astro",
  ".ts",
  ".js",
  ".mjs",
  ".css",
  ".json",
  ".svg",
];
const ignoredDependencyPaths = new Set(["src/data/transformations.ts"]);

const normalisePath = (value) => value.split(path.sep).join("/");

const isPlainObject = (value) =>
  value !== null && typeof value === "object" && !Array.isArray(value);

const reportUnexpectedKeys = (value, expected, label, errors) => {
  if (!isPlainObject(value)) {
    errors.push(`${label} must be an object.`);
    return false;
  }

  for (const key of expected) {
    if (!(key in value)) errors.push(`${label}.${key} is required.`);
  }
  for (const key of Object.keys(value)) {
    if (!expected.includes(key)) errors.push(`${label}.${key} is not allowed.`);
  }
  return true;
};

const isIsoDate = (value) => {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }
  const parsed = new Date(`${value}T00:00:00.000Z`);
  return (
    Number.isFinite(parsed.getTime()) &&
    parsed.toISOString().slice(0, 10) === value
  );
};

export function extractPublicSlugs(source) {
  const declaration = source.match(
    /export const publicTransformationSlugs\s*=\s*\[([\s\S]*?)\]\s*as const/,
  );
  if (!declaration) {
    throw new Error(
      "Could not find publicTransformationSlugs in src/data/transformations.ts.",
    );
  }

  return [...declaration[1].matchAll(/["']([a-z0-9]+(?:-[a-z0-9]+)*)["']/g)].map(
    (match) => match[1],
  );
}

const findMatchingBrace = (source, start) => {
  let depth = 0;
  let quote = null;
  let escaped = false;

  for (let index = start; index < source.length; index += 1) {
    const character = source[index];
    if (quote) {
      if (escaped) {
        escaped = false;
      } else if (character === "\\") {
        escaped = true;
      } else if (character === quote) {
        quote = null;
      }
      continue;
    }

    if (character === '"' || character === "'" || character === "`") {
      quote = character;
    } else if (character === "{") {
      depth += 1;
    } else if (character === "}") {
      depth -= 1;
      if (depth === 0) return index;
    }
  }

  throw new Error("Could not find the end of a material source record.");
};

const extractCandidateRecord = (source, slug) => {
  const slugIndex = source.indexOf(`slug: "${slug}"`);
  if (slugIndex < 0) {
    throw new Error(`No transformation candidate record exists for "${slug}".`);
  }
  const lineStart = source.lastIndexOf("\n  {", slugIndex);
  const objectStart = lineStart >= 0 ? lineStart + 3 : source.indexOf("{");
  const objectEnd = findMatchingBrace(source, objectStart);
  return source.slice(objectStart, objectEnd + 1);
};

const extractDetailRecord = (source, slug) => {
  const keyIndex = source.indexOf(`"${slug}":`);
  if (keyIndex < 0) {
    throw new Error(`No transformation detail record exists for "${slug}".`);
  }
  const objectStart = source.indexOf("{", keyIndex);
  const objectEnd = findMatchingBrace(source, objectStart);
  return source.slice(objectStart, objectEnd + 1);
};

const walkFiles = (directory) => {
  if (!existsSync(directory)) return [];
  const files = [];
  for (const entry of readdirSync(directory)) {
    const absolutePath = path.join(directory, entry);
    if (statSync(absolutePath).isDirectory()) {
      files.push(...walkFiles(absolutePath));
    } else {
      files.push(absolutePath);
    }
  }
  return files;
};

const resolveLocalImport = (specifier, sourcePath) => {
  if (!specifier.startsWith(".")) return null;
  const base = path.resolve(path.dirname(sourcePath), specifier);
  for (const extension of sourceExtensions) {
    const candidate = `${base}${extension}`;
    if (existsSync(candidate) && statSync(candidate).isFile()) return candidate;
  }
  for (const extension of sourceExtensions.slice(1)) {
    const candidate = path.join(base, `index${extension}`);
    if (existsSync(candidate) && statSync(candidate).isFile()) return candidate;
  }
  return null;
};

const extractImports = (source) => {
  const imports = [];
  const pattern =
    /\bfrom\s+["']([^"']+)["']|\bimport\s+["']([^"']+)["']/g;
  for (const match of source.matchAll(pattern)) {
    imports.push(match[1] ?? match[2]);
  }
  return imports;
};

const extractPublicAssets = (source) => {
  const assets = [];
  const pattern = /\/(?:images|videos|brand)\/[^"'()\s?#]+/g;
  for (const match of source.matchAll(pattern)) assets.push(match[0]);
  return assets;
};

export function fingerprintConcept(slug, root = projectRoot) {
  const pageFile = path.join(root, "src", "pages", "concepts", `${slug}.astro`);
  const pageDirectory = path.join(root, "src", "pages", "concepts", slug);
  const roots = [
    ...(existsSync(pageFile) ? [pageFile] : []),
    ...walkFiles(pageDirectory),
  ];
  if (roots.length === 0) {
    throw new Error(`No concept source files exist for "${slug}".`);
  }

  const sourceQueue = [...roots];
  const materialFiles = new Set();
  const assetFiles = new Set();
  const virtualSources = new Map();

  const transformationsSource = readFileSync(
    path.join(root, "src", "data", "transformations.ts"),
    "utf8",
  );
  const detailsSource = readFileSync(
    path.join(root, "src", "data", "transformation-details.ts"),
    "utf8",
  );
  virtualSources.set(
    `src/data/transformations.ts#${slug}`,
    extractCandidateRecord(transformationsSource, slug),
  );
  virtualSources.set(
    `src/data/transformation-details.ts#${slug}`,
    extractDetailRecord(detailsSource, slug),
  );

  while (sourceQueue.length > 0) {
    const sourcePath = sourceQueue.pop();
    const relativePath = normalisePath(path.relative(root, sourcePath));
    if (
      materialFiles.has(sourcePath) ||
      ignoredDependencyPaths.has(relativePath)
    ) {
      continue;
    }
    materialFiles.add(sourcePath);

    const source = readFileSync(sourcePath, "utf8");
    for (const specifier of extractImports(source)) {
      const resolved = resolveLocalImport(specifier, sourcePath);
      if (resolved) sourceQueue.push(resolved);
    }
    for (const asset of extractPublicAssets(source)) {
      const assetPath = path.join(root, "public", asset.slice(1));
      if (existsSync(assetPath) && statSync(assetPath).isFile()) {
        assetFiles.add(assetPath);
      }
    }
  }

  for (const source of virtualSources.values()) {
    for (const asset of extractPublicAssets(source)) {
      const assetPath = path.join(root, "public", asset.slice(1));
      if (existsSync(assetPath) && statSync(assetPath).isFile()) {
        assetFiles.add(assetPath);
      }
    }
  }

  const hash = createHash("sha256");
  const filePaths = [...materialFiles, ...assetFiles].sort((left, right) =>
    normalisePath(path.relative(root, left)).localeCompare(
      normalisePath(path.relative(root, right)),
    ),
  );
  for (const filePath of filePaths) {
    hash.update(`[${normalisePath(path.relative(root, filePath))}]\0`);
    hash.update(readFileSync(filePath));
    hash.update("\0");
  }
  for (const [label, source] of [...virtualSources].sort(([left], [right]) =>
    left.localeCompare(right),
  )) {
    hash.update(`[${label}]\0${source}\0`);
  }

  return `sha256:${hash.digest("hex")}`;
}

const validateReviewer = (reviewer, label, errors) => {
  if (!reportUnexpectedKeys(reviewer, ["name", "kind"], label, errors)) {
    return;
  }
  if (typeof reviewer.name !== "string" || reviewer.name.trim() === "") {
    errors.push(`${label}.name must identify the independent reviewer.`);
  }
  if (!["human", "agent"].includes(reviewer.kind)) {
    errors.push(`${label}.kind must be "human" or "agent".`);
  }
};

const validateScore = (score, label, errors) => {
  if (
    typeof score !== "number" ||
    !Number.isFinite(score) ||
    score < 0 ||
    score > 10
  ) {
    errors.push(`${label} must be a number from 0 to 10.`);
  } else if (!Number.isInteger(score * 2)) {
    errors.push(`${label} must use whole or half points.`);
  }
};

const weightedScoreFor = (scores) => {
  const halfPointWeightedPercent = scoreKeys.reduce(
    (total, key) =>
      total + Math.round(scores[key] * 2) * Math.round(scoreWeights[key] * 100),
    0,
  );
  return Math.round(halfPointWeightedPercent / 2) / 100;
};

const everyBooleanTrue = (value, keys) =>
  isPlainObject(value) && keys.every((key) => value[key] === true);

const scoresMeetFloors = (scores) =>
  isPlainObject(scores) &&
  coreScoreKeys.every(
    (key) => typeof scores[key] === "number" && scores[key] >= 7,
  ) &&
  supportingScoreKeys.every(
    (key) => typeof scores[key] === "number" && scores[key] >= 6,
  );

const designPasses = (release) =>
  everyBooleanTrue(release.designGates, designGateKeys) &&
  scoresMeetFloors(release.scores) &&
  typeof release.weightedScore === "number" &&
  release.weightedScore >= 7;

export function validateReleaseData(
  data,
  publicSlugs,
  {
    now = new Date(),
    fingerprintForSlug = (slug) => fingerprintConcept(slug),
  } = {},
) {
  const errors = [];
  if (!isPlainObject(data)) return ["Release data must be a JSON object."];
  const topLevelKeys = ["$schema", "schemaVersion", "releases"];
  for (const key of Object.keys(data)) {
    if (!topLevelKeys.includes(key)) {
      errors.push(`Release data property "${key}" is not allowed.`);
    }
  }
  if (data.schemaVersion !== "1.1") {
    errors.push('schemaVersion must be "1.1".');
  }
  if (!Array.isArray(data.releases)) {
    errors.push("releases must be an array.");
    return errors;
  }

  const releaseBySlug = new Map();
  data.releases.forEach((release, index) => {
    const label = `releases[${index}]`;
    if (!reportUnexpectedKeys(release, releaseKeys, label, errors)) return;
    if (
      typeof release.slug !== "string" ||
      !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(release.slug)
    ) {
      errors.push(`${label}.slug must be a kebab-case slug.`);
      return;
    }
    if (releaseBySlug.has(release.slug)) {
      errors.push(`Release slug "${release.slug}" is duplicated.`);
    } else {
      releaseBySlug.set(release.slug, release);
    }
    if (
      !["Reviewable", "Release blocked", "Revise", "Pass"].includes(
        release.status,
      )
    ) {
      errors.push(`${label}.status is invalid.`);
    }
    if (
      typeof release.sourceFingerprint !== "string" ||
      !/^sha256:[0-9a-f]{64}$/.test(release.sourceFingerprint)
    ) {
      errors.push(`${label}.sourceFingerprint must be a SHA-256 fingerprint.`);
    }

    if (release.status === "Reviewable") {
      if (release.reviewer !== null) {
        validateReviewer(release.reviewer, `${label}.reviewer`, errors);
      }
    } else {
      validateReviewer(release.reviewer, `${label}.reviewer`, errors);
    }

    if (
      reportUnexpectedKeys(
        release.designGates,
        designGateKeys,
        `${label}.designGates`,
        errors,
      )
    ) {
      for (const key of designGateKeys) {
        if (typeof release.designGates[key] !== "boolean") {
          errors.push(`${label}.designGates.${key} must be a boolean.`);
        }
      }
    }

    if (
      reportUnexpectedKeys(
        release.releaseConditions,
        releaseConditionKeys,
        `${label}.releaseConditions`,
        errors,
      )
    ) {
      for (const key of releaseConditionKeys) {
        if (typeof release.releaseConditions[key] !== "boolean") {
          errors.push(`${label}.releaseConditions.${key} must be a boolean.`);
        }
      }
    }

    if (
      reportUnexpectedKeys(release.scores, scoreKeys, `${label}.scores`, errors)
    ) {
      for (const key of scoreKeys) {
        const score = release.scores[key];
        if (release.status === "Reviewable") {
          if (score !== null) {
            errors.push(
              `${label}.scores.${key} must be null while the concept is Reviewable.`,
            );
          }
        } else {
          validateScore(score, `${label}.scores.${key}`, errors);
        }
      }
    }

    if (release.status === "Reviewable") {
      if (release.weightedScore !== null) {
        errors.push(`${label}.weightedScore must be null when Reviewable.`);
      }
    } else if (
      isPlainObject(release.scores) &&
      scoreKeys.every((key) => typeof release.scores[key] === "number")
    ) {
      const expectedWeightedScore = weightedScoreFor(release.scores);
      if (
        typeof release.weightedScore !== "number" ||
        Math.abs(release.weightedScore - expectedWeightedScore) > 0.001
      ) {
        errors.push(
          `${label}.weightedScore must equal ${expectedWeightedScore.toFixed(2)}.`,
        );
      }
    }

    const designIsPassing = designPasses(release);
    const releaseIsClear = everyBooleanTrue(
      release.releaseConditions,
      releaseConditionKeys,
    );
    if (release.status === "Release blocked") {
      if (!designIsPassing) {
        errors.push(
          `${label} cannot be Release blocked unless its design passes.`,
        );
      }
      if (releaseIsClear) {
        errors.push(
          `${label} cannot be Release blocked when every release condition passes.`,
        );
      }
    } else if (release.status === "Revise" && designIsPassing) {
      errors.push(
        `${label} cannot be Revise when every design gate and score threshold passes.`,
      );
    } else if (release.status === "Pass") {
      if (!designIsPassing) {
        errors.push(`${label} cannot be Pass unless its design passes.`);
      }
      if (!releaseIsClear) {
        errors.push(
          `${label} cannot be Pass unless every release condition passes.`,
        );
      }
    }

    for (const dateKey of ["reviewedAt", "truthCheckedAt"]) {
      if (!isIsoDate(release[dateKey])) {
        errors.push(`${label}.${dateKey} must be a real YYYY-MM-DD date.`);
      }
    }
  });

  const publicSlugSet = new Set();
  for (const slug of publicSlugs) {
    if (publicSlugSet.has(slug)) {
      errors.push(`Public transformation slug "${slug}" is duplicated.`);
    }
    publicSlugSet.add(slug);
    const release = releaseBySlug.get(slug);
    if (!release) {
      errors.push(`Public transformation "${slug}" has no release record.`);
      continue;
    }
    if (release.status !== "Pass") {
      errors.push(`Public transformation "${slug}" is not a Pass.`);
    }
    for (const key of designGateKeys) {
      if (release.designGates?.[key] !== true) {
        errors.push(
          `Public transformation "${slug}" fails design gate "${key}".`,
        );
      }
    }
    for (const key of releaseConditionKeys) {
      if (release.releaseConditions?.[key] !== true) {
        errors.push(
          `Public transformation "${slug}" fails release condition "${key}".`,
        );
      }
    }
    for (const key of coreScoreKeys) {
      if (typeof release.scores?.[key] !== "number" || release.scores[key] < 7) {
        errors.push(
          `Public transformation "${slug}" has ${key} below 7.0.`,
        );
      }
    }
    for (const key of supportingScoreKeys) {
      if (typeof release.scores?.[key] !== "number" || release.scores[key] < 6) {
        errors.push(
          `Public transformation "${slug}" has ${key} below 6.0.`,
        );
      }
    }
    if (
      typeof release.weightedScore !== "number" ||
      release.weightedScore < 7
    ) {
      errors.push(`Public transformation "${slug}" has a weighted score below 7.0.`);
    }

    if (isIsoDate(release.truthCheckedAt)) {
      const checkedAt = new Date(`${release.truthCheckedAt}T00:00:00.000Z`);
      const today = new Date(
        Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()),
      );
      const ageDays = Math.floor((today - checkedAt) / 86_400_000);
      if (ageDays > 90) {
        errors.push(
          `Public transformation "${slug}" truth check is ${ageDays} days old.`,
        );
      } else if (ageDays < 0) {
        errors.push(
          `Public transformation "${slug}" truth check is dated in the future.`,
        );
      }
    }

    try {
      const currentFingerprint = fingerprintForSlug(slug);
      if (release.sourceFingerprint !== currentFingerprint) {
        errors.push(
          `Public transformation "${slug}" source fingerprint has changed ` +
            `(expected ${release.sourceFingerprint}, current ${currentFingerprint}).`,
        );
      }
    } catch (error) {
      errors.push(
        `Public transformation "${slug}" fingerprint failed: ${error.message}`,
      );
    }
  }

  return errors;
}

const makeSelfTestRelease = () => ({
  slug: "fixture-concept",
  status: "Pass",
  sourceFingerprint: `sha256:${"a".repeat(64)}`,
  reviewer: { name: "Independent fixture reviewer", kind: "agent" },
  designGates: Object.fromEntries(designGateKeys.map((key) => [key, true])),
  releaseConditions: Object.fromEntries(
    releaseConditionKeys.map((key) => [key, true]),
  ),
  scores: {
    evidenceTruthRespect: 8,
    visitorOutcome: 8,
    subjectIdentity: 6,
    firstViewport: 6,
    completeLoop: 8,
    responsiveAccessibility: 8,
    craftFinish: 6,
  },
  weightedScore: 7.2,
  reviewedAt: "2026-01-01",
  truthCheckedAt: "2026-01-01",
});

const runSelfTest = () => {
  const valid = makeSelfTestRelease();
  const validErrors = validateReleaseData(
    { schemaVersion: "1.1", releases: [valid] },
    ["fixture-concept"],
    {
      now: new Date("2026-01-30T00:00:00.000Z"),
      fingerprintForSlug: () => valid.sourceFingerprint,
    },
  );
  if (validErrors.length > 0) {
    throw new Error(`Valid fixture was rejected:\n${validErrors.join("\n")}`);
  }

  const blocked = structuredClone(valid);
  blocked.status = "Release blocked";
  blocked.releaseConditions.assetPermission = false;
  const blockedErrors = validateReleaseData(
    { schemaVersion: "1.1", releases: [blocked] },
    [],
  );
  if (blockedErrors.length > 0) {
    throw new Error(
      `Valid release-blocked fixture was rejected:\n${blockedErrors.join("\n")}`,
    );
  }

  const invalid = structuredClone(valid);
  invalid.designGates.realVisitorLoop = false;
  invalid.releaseConditions.assetPermission = false;
  invalid.scores.visitorOutcome = 6.5;
  invalid.scores.firstViewport = 5.5;
  invalid.weightedScore = weightedScoreFor(invalid.scores);
  invalid.truthCheckedAt = "2025-01-01";
  const invalidErrors = validateReleaseData(
    { schemaVersion: "1.1", releases: [invalid] },
    ["fixture-concept"],
    {
      now: new Date("2026-01-30T00:00:00.000Z"),
      fingerprintForSlug: () => `sha256:${"b".repeat(64)}`,
    },
  );
  const expectedFragments = [
    "cannot be Pass unless its design passes",
    "cannot be Pass unless every release condition passes",
    "fails design gate",
    "fails release condition",
    "visitorOutcome below 7.0",
    "firstViewport below 6.0",
    "weighted score below 7.0",
    "truth check is",
    "source fingerprint has changed",
  ];
  for (const fragment of expectedFragments) {
    if (!invalidErrors.some((error) => error.includes(fragment))) {
      throw new Error(
        `Invalid fixture did not trigger "${fragment}":\n${invalidErrors.join("\n")}`,
      );
    }
  }
  console.log(
    `Concept release self-test passed: invalid fixture rejected with ${invalidErrors.length} errors.`,
  );
};

const runCurrentCheck = () => {
  const transformationsSource = readFileSync(transformationsPath, "utf8");
  const publicSlugs = extractPublicSlugs(transformationsSource);
  const data = JSON.parse(readFileSync(releasesPath, "utf8"));
  const errors = validateReleaseData(data, publicSlugs);
  if (errors.length > 0) {
    console.error("Concept release check failed:");
    for (const error of errors) console.error(`- ${error}`);
    process.exitCode = 1;
    return;
  }
  const noun = publicSlugs.length === 1 ? "transformation" : "transformations";
  console.log(
    `Concept release check passed: ${publicSlugs.length} public ${noun}.`,
  );
};

const [command, value] = process.argv.slice(2);
if (command === "--fingerprint") {
  if (!value) {
    console.error("Usage: node scripts/check-concept-reviews.mjs --fingerprint <slug>");
    process.exitCode = 1;
  } else {
    console.log(fingerprintConcept(value));
  }
} else if (command === "--self-test") {
  runSelfTest();
} else if (command) {
  console.error(`Unknown option: ${command}`);
  process.exitCode = 1;
} else {
  runCurrentCheck();
}
