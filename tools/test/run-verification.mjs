#!/usr/bin/env node
/**
 * Runs the whole verification suite and reports the whole picture.
 *
 * Every suite runs even when an earlier one fails. Chaining them with `&&`
 * aborts on the first failure, which twice left the plan recording suites as
 * green that had never executed: once on 28 July 2026, and again after the
 * 4 August CI simplification reintroduced the chain. A verification baseline
 * that stops at the first failure is not a baseline.
 *
 * The build is the exception. Every suite below reads `dist/`, so a failed
 * build leaves nothing to check and the run stops there rather than reporting
 * twenty identical "missing dist" failures.
 *
 * SKIP_BUILD=1 reuses the existing `dist/`. It is a fast inner-loop switch,
 * not a full verification: it also skips the prose-count, publication,
 * public-asset, Open Graph and guest-voice checks, which run inside `pnpm
 * build`.
 */
import { spawn } from "node:child_process";

const skipBuild = process.env.SKIP_BUILD === "1";
const useShell = process.platform === "win32";

const run = (args) =>
  new Promise((resolve, reject) => {
    const child = spawn("pnpm", args, { stdio: "inherit", shell: useShell });
    child.on("error", reject);
    child.on("exit", (code, signal) => {
      if (signal) reject(new Error(`exited via ${signal}`));
      else if (code) reject(new Error(`exited with code ${code}`));
      else resolve();
    });
  });

// The orphan scan is here rather than in `pnpm build`: build runs
// check-public-assets without --orphans, so unreferenced media in public/ was
// scanned by nothing at all once this runner was removed.
const suites = [
  ["test:request"],
  ["test:source-attribution"],
  ["test:public-assets"],
  ["test:map-payload"],
  ["test:rebuild"],
  ["test:hugh-mccanns"],
  ["test:cupla"],
  ["test:castle-farm"],
  ["test:newcastle-dental"],
  ["test:arley-house"],
  ["test:armstrong"],
  ["test:kent-amusements"],
  ["test:kelly-mcevoy-brown"],
  ["test:tool-centre"],
  ["test:mourne-cycles"],
  ["test:painted-earth"],
  ["test:bear-necessities"],
  ["test:binghams"],
  ["test:irelands"],
  ["test:where-it-fails"],
  ["test:how-its-made"],
  ["test:why-its-yours"],
];

if (skipBuild) {
  console.log("\n==> skipping build (SKIP_BUILD=1)");
} else {
  console.log("\n==> pnpm build");
  try {
    await run(["build"]);
  } catch (error) {
    console.error(`\nVerification could not start: build ${error.message}`);
    process.exit(1);
  }
}

const failures = [];

for (const args of suites) {
  console.log(`\n==> pnpm ${args.join(" ")}`);
  try {
    await run(args);
  } catch (error) {
    failures.push({ suite: args.join(" "), message: error.message });
    console.error(`\n${args.join(" ")} FAILED: ${error.message}`);
  }
}

if (failures.length) {
  console.error(
    `\nVerification failed: ${failures.length} of ${suites.length} suites did not pass.`,
  );
  for (const failure of failures) {
    console.error(`  - ${failure.suite}: ${failure.message}`);
  }
  process.exitCode = 1;
} else {
  console.log(`\nVerification passed: ${suites.length}/${suites.length} suites.`);
}
