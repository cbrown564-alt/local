/**
 * Every repo path named in the provenance record must exist.
 *
 * The provenance record is where an image's licence, source and retention
 * promise are written down, so a path in it is a claim about a file this
 * project still holds. A reorganisation moves the file and leaves the claim
 * behind, and nothing else in the build reads this document — which is how
 * `research/concepts/donard-hotel/evidence/source-eric-jones-2023.jpg`, the
 * CC BY-SA source retained for an in-use visualisation, came to be named here
 * while sitting nowhere in the tree.
 *
 * Private masters are the reason this reports two kinds of miss. Binary files
 * under `media/` are gitignored on purpose, so they are absent from CI and
 * from any fresh clone by design; failing the build on those would mean failing
 * it everywhere. They are reported as a warning instead, which still says
 * "this master is not where the record claims" on the machine that holds them.
 *
 * Classification is done against the convention below rather than by asking
 * `git check-ignore`, which cannot answer for these paths: the ignore pattern
 * is directory-only, so a missing directory does not match it, and a trailing
 * slash makes check-ignore report a match against a blank line.
 */

import fs from "node:fs";
import path from "node:path";
import { projectRoot } from "../lib/public-slugs.mjs";

const RECORD = "research/image-provenance.md";

/** Kept in step with .gitignore by the assertion below. */
const PRIVATE_MASTER_IGNORE = "media/**/*.png";
const PRIVATE_MASTER = /^media\//;

/** Top-level directories that make a token a repo path rather than a route. */
const REPO_ROOTS = /^(?:research|media|public|src|tools|api|docs|plans|scratch)\//;

/**
 * Placeholders and globs the record uses to describe families of files —
 * `<town>-film-mobile.{mp4,webm}`, `-hours-after-{1,2}`. They name a shape,
 * not a path, so there is nothing to look up.
 */
const PLACEHOLDER = /[{}*<>?]/;

/**
 * Transient working directories. The record cites them as where something was
 * produced, not as somewhere it is kept; `.scratch/` is gitignored and swept.
 */
const TRANSIENT = /^\.(?:scratch|tmp)\//;

const errors = [];

const gitignore = fs.readFileSync(path.join(projectRoot, ".gitignore"), "utf8");
if (!gitignore.split("\n").some((line) => line.trim() === PRIVATE_MASTER_IGNORE)) {
  errors.push(
    `.gitignore no longer contains "${PRIVATE_MASTER_IGNORE}". Update PRIVATE_MASTER in this check to match, or private masters will be reported as missing files.`,
  );
}

const text = fs.readFileSync(path.join(projectRoot, RECORD), "utf8");

/** Paths are always written in backticks in this document. */
const cited = [...new Set([...text.matchAll(/`([^`]+)`/g)].map((m) => m[1]))]
  .filter(
    (token) =>
      token.includes("/") &&
      !TRANSIENT.test(token) &&
      REPO_ROOTS.test(token) &&
      !PLACEHOLDER.test(token),
  )
  .sort();

const missing = cited.filter(
  (token) => !fs.existsSync(path.join(projectRoot, token.replace(/\/$/, ""))),
);

const absentMasters = missing.filter((token) => PRIVATE_MASTER.test(token));
errors.push(
  ...missing
    .filter((token) => !PRIVATE_MASTER.test(token))
    .map((token) => `${token} — named in ${RECORD}, not in the tree.`),
);

if (absentMasters.length) {
  console.warn(
    `Provenance check: ${absentMasters.length} private master path(s) named but not present here. Expected on a checkout without the masters; on the machine that holds them, the file has moved or been lost:\n- ${absentMasters.join("\n- ")}`,
  );
}

if (errors.length) {
  console.error(
    `Image provenance check failed (${cited.length} paths cited):\n- ${errors.join("\n- ")}`,
  );
  process.exitCode = 1;
} else {
  console.log(
    `Image provenance check passed: ${cited.length} cited paths exist${absentMasters.length ? `, ${absentMasters.length} private master path(s) absent` : ""}.`,
  );
}
