import { spawn } from "node:child_process";
import { setTimeout as delay } from "node:timers/promises";

// The preview is started on this host and port, and the suites are pointed at
// the same URL. Reading SHOT_BASE here but hardcoding the preview meant a set
// SHOT_BASE silently tested a different target than the server this script
// started.
const host = process.env.PREVIEW_HOST ?? "127.0.0.1";
const port = process.env.PREVIEW_PORT ?? "4321";
const base = `http://${host}:${port}`;
// SKIP_BUILD also skips the prose-count, concept-publication and public-asset
// checks, which only run as part of `pnpm build`. It is a fast inner-loop
// switch, not a full verification.
const skipBuild = process.env.SKIP_BUILD === "1";
const useShell = process.platform === "win32";

const run = (command, args, options = {}) =>
  new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      stdio: "inherit",
      shell: useShell,
      ...options,
    });
    child.on("error", reject);
    child.on("exit", (code, signal) => {
      if (signal) {
        reject(new Error(`${command} ${args.join(" ")} exited via ${signal}`));
        return;
      }
      if (code) {
        reject(new Error(`${command} ${args.join(" ")} exited with code ${code}`));
        return;
      }
      resolve();
    });
  });

const waitForServer = async (url, timeoutMs = 90_000) => {
  const started = Date.now();
  while (Date.now() - started < timeoutMs) {
    try {
      const response = await fetch(url, { redirect: "manual" });
      if (response.status > 0 && response.status < 500) return;
    } catch {
      // Preview is still starting.
    }
    await delay(400);
  }
  throw new Error(`Preview server did not become ready at ${url}`);
};

const stop = (child) => {
  if (!child || child.exitCode !== null || child.killed) return;
  if (process.platform === "win32" && child.pid) {
    spawn("taskkill", ["/pid", String(child.pid), "/T", "/F"], {
      stdio: "ignore",
      shell: true,
    });
    return;
  }
  child.kill("SIGTERM");
};

if (!skipBuild) {
  console.log("\n==> pnpm build");
  await run("pnpm", ["build"]);
} else {
  console.log("\n==> skipping build (SKIP_BUILD=1)");
}

console.log("\n==> pnpm preview");
const preview = spawn("pnpm", ["preview", "--host", host, "--port", port], {
  stdio: ["ignore", "pipe", "pipe"],
  shell: useShell,
  env: { ...process.env },
});

let previewLog = "";
preview.stdout.on("data", (chunk) => {
  previewLog += chunk.toString();
  process.stdout.write(chunk);
});
preview.stderr.on("data", (chunk) => {
  previewLog += chunk.toString();
  process.stderr.write(chunk);
});
preview.on("error", (error) => {
  console.error(error);
});

const suites = [
  ["test:request"],
  ["test:shell-home"],
  ["test:concepts"],
  ["test:reviewed-concepts"],
  ["test:dundrum-inn"],
  ["test:media"],
  ["test:bucks-head"],
  ["test:enniskeen"],
  ["test:scopers"],
  ["test:painted-earth"],
];

// Every suite runs even when an earlier one fails. Aborting on the first
// failure hid the state of the other six: on 28 July 2026 a single
// reviewed-concept failure meant the media, Buck's Head, Enniskeen and
// Painted Earth suites never ran at all, while the plan recorded all seven as
// green. A verification baseline has to report the whole picture.
const failures = [];

try {
  await waitForServer(base);
  for (const args of suites) {
    console.log(`\n==> pnpm ${args.join(" ")}`);
    try {
      await run("pnpm", args, {
        env: { ...process.env, SHOT_BASE: base },
      });
    } catch (error) {
      failures.push({ suite: args.join(" "), message: error.message });
      console.error(`\n${args.join(" ")} FAILED: ${error.message}`);
    }
  }
} catch (error) {
  failures.push({ suite: "preview", message: error.message });
  console.error(`\nVerification could not start: ${error.message}`);
}

if (failures.length) {
  console.error(
    `\nVerification failed: ${failures.length} of ${suites.length} suites did not pass.`,
  );
  for (const failure of failures) console.error(`  - ${failure.suite}: ${failure.message}`);
  if (previewLog.trim()) {
    console.error("Preview log tail:\n" + previewLog.trim().split(/\r?\n/).slice(-20).join("\n"));
  }
  process.exitCode = 1;
} else {
  console.log(`\nVerification passed: ${suites.length}/${suites.length} suites.`);
}

{
  stop(preview);
  await Promise.race([
    new Promise((resolve) => preview.on("exit", resolve)),
    delay(5_000),
  ]);
}
