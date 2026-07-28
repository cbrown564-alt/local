import { spawn } from "node:child_process";
import { setTimeout as delay } from "node:timers/promises";

const base = process.env.SHOT_BASE ?? "http://127.0.0.1:4321";
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
const preview = spawn("pnpm", ["preview", "--host", "127.0.0.1", "--port", "4321"], {
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
  ["test:concepts"],
  ["test:reviewed-concepts"],
  ["test:media"],
  ["test:bucks-head"],
  ["test:enniskeen"],
  ["test:painted-earth"],
];

try {
  await waitForServer(base);
  for (const args of suites) {
    console.log(`\n==> pnpm ${args.join(" ")}`);
    await run("pnpm", args, {
      env: { ...process.env, SHOT_BASE: base },
    });
  }
  console.log("\nVerification passed.");
} catch (error) {
  console.error(`\nVerification failed: ${error.message}`);
  if (previewLog.trim()) {
    console.error("Preview log tail:\n" + previewLog.trim().split(/\r?\n/).slice(-20).join("\n"));
  }
  process.exitCode = 1;
} finally {
  stop(preview);
  await Promise.race([
    new Promise((resolve) => preview.on("exit", resolve)),
    delay(5_000),
  ]);
}
