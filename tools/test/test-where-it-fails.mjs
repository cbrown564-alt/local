#!/usr/bin/env node
/**
 * Pins /where-it-fails/, from research/what-we-look-for-brief.md interaction
 * rules and research/owner-voice-on-the-three-pages.md guest voice:
 * "Test the snag, not the fix."
 *
 * The failure mode this guards is a mock whose snag becomes accidentally
 * walkable — someone tidies a grey layout and the hours land on the first
 * screen. Each walk carries its graph as a JSON blob in the built page
 * (script[data-fault-graph]); this test parses those blobs and asserts, per
 * theme, that the before-walk cannot reach the errand's goal in fewer taps
 * than the theme declares — or at all, for the hard stops. It equally pins
 * the fix: the after-walk must stay a one-tap walk.
 *
 * Runs against the built page, not the source. Requires `pnpm build` first —
 * `pnpm test` runs the build ahead of it.
 */
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { projectRoot } from "../lib/public-slugs.mjs";

const pagePath = path.join(projectRoot, "dist", "where-it-fails", "index.html");

if (!existsSync(pagePath)) {
  console.error("Missing dist/where-it-fails/index.html — run `pnpm build` first.");
  process.exit(1);
}

const html = readFileSync(pagePath, "utf8");
const text = html
  .replace(/<script[\s\S]*?<\/script>/gi, " ")
  .replace(/<style[\s\S]*?<\/style>/gi, " ")
  .replace(/<!--[\s\S]*?-->/g, " ")
  .replace(/<[^>]+>/g, " ")
  .replace(/&#39;|&apos;/g, "'")
  .replace(/&rsquo;/g, "’")
  .replace(/&amp;/g, "&")
  .replace(/&quot;/g, '"')
  .replace(/&ldquo;|&#8220;/g, "“")
  .replace(/&rdquo;|&#8221;/g, "”")
  .replace(/&#8211;/g, "–")
  .replace(/&#8212;/g, "—")
  .replace(/&#8230;/g, "…")
  .replace(/\s+/g, " ");

const failures = [];
const check = (label, condition) => {
  if (!condition) failures.push(label);
};

/** Shortest tap count to any goal block, or null when unreachable. */
const shortestToGoal = (panels) => {
  const byId = new Map(panels.map((panel) => [panel.id, panel]));
  const distances = new Map([[panels[0].id, 0]]);
  const queue = [panels[0].id];
  let best = null;
  while (queue.length > 0) {
    const panel = byId.get(queue.shift());
    const arrived = distances.get(panel.id);
    for (const block of panel.blocks) {
      if (block.goal) {
        const total = arrived + 1;
        if (best === null || total < best) best = total;
      }
      if (block.tap && byId.has(block.tap)) {
        const next = arrived + 1;
        if (!distances.has(block.tap) || distances.get(block.tap) > next) {
          distances.set(block.tap, next);
          queue.push(block.tap);
        }
      }
    }
  }
  return best;
};

const graphs = [...html.matchAll(/<script[^>]*data-fault-graph[^>]*>([\s\S]*?)<\/script>/g)].map(
  (match) => JSON.parse(match[1]),
);

check(
  `expected 4 walk graphs on the page (found ${graphs.length})`,
  graphs.length === 4,
);

for (const graph of graphs) {
  const prefix = `${graph.id} (${graph.before[0]?.id}…)`;
  const panelIds = new Set(graph.before.map((panel) => panel.id));

  for (const [mode, panels] of [
    ["before", graph.before],
    ["after", graph.after],
  ]) {
    const targets = new Set(panels.map((panel) => panel.id));
    for (const panel of panels) {
      for (const block of panel.blocks) {
        if (block.tap) {
          check(
            `${prefix}: a ${mode} tap leads to unknown panel "${block.tap}"`,
            targets.has(block.tap),
          );
        }
      }
    }
  }

  const beforeTaps = shortestToGoal(graph.before);
  if (graph.minBeforeTaps === null) {
    check(
      `${prefix}: the snag became walkable — the goal is reachable in ${beforeTaps} taps`,
      beforeTaps === null,
    );
    check(
      `${prefix}: a blocked walk must name the panel it stops at`,
      graph.stop.kind === "blocked" && panelIds.has(graph.stop.panel),
    );
  } else {
    check(
      `${prefix}: the before-walk finishes in ${beforeTaps} taps, fewer than the declared ${graph.minBeforeTaps}`,
      beforeTaps !== null && beforeTaps >= graph.minBeforeTaps,
    );
  }

  const afterTaps = shortestToGoal(graph.after);
  check(
    `${prefix}: the fixed walk must complete in ${graph.afterTaps} tap(s) (takes ${afterTaps})`,
    afterTaps !== null && afterTaps <= graph.afterTaps,
  );

  if (graph.goalIsHidden) {
    for (const panel of graph.before) {
      const tappable = panel.blocks.filter(
        (block) => block.goal || block.tap || block.note,
      );
      const goals = tappable.filter((block) => block.goal);
      for (const goal of goals) {
        const goalArea = goal.w * goal.h;
        const smallestOther = Math.min(
          ...tappable.filter((block) => !block.goal).map((block) => block.w * block.h),
        );
        check(
          `${prefix}: the hidden goal is no longer the smallest target (${goalArea} vs ${smallestOther})`,
          goalArea < smallestOther,
        );
      }
    }
  }

  check(
    `${prefix}: the stop note left the page`,
    text.includes(graph.stop.note),
  );
  check(
    `${prefix}: the fixed note left the page`,
    text.includes(graph.fixedNote),
  );
}

// The reel order is the argument: access faults first, identity fault
// second, the swap test last. Five of the studio's ten, curated for the page.
const EXPECTED_ORDER = ["t1", "t4", "t5", "t7", "t10"];
const pageOrder = [...html.matchAll(/data-theme="(t\d+)"/g)].map((match) => match[1]);
check(
  `the themes no longer run in reel order (${pageOrder.join(" ")})`,
  JSON.stringify(pageOrder) === JSON.stringify(EXPECTED_ORDER),
);

const MESSAGES = {
  t1: "A visitor should not need an account to find your front door.",
  t4: "People arrive with one question. The first screen should answer it.",
  t5: "“Get in touch” means the visitor does the work.",
  t7: "The thing you'd say in ten seconds at the counter isn't on the site at all.",
  t10: "Swap your name for a competitor's. If nothing else needs changing, the site isn't yours.",
};
for (const [id, message] of Object.entries(MESSAGES)) {
  check(`${id}: the theme's message left the page`, text.includes(message));
}

// T10 is the one drag control on the page, and the closer.
check("the swap test is missing", /data-swap-test/.test(html));
check(
  "the swap test lost its static plates' verdicts",
  text.includes("The plate seats perfectly. Nothing else needs changing.") &&
    text.includes("Three true details later, the plate won't seat."),
);

// Owner voice: H1, light honesty, no method lecture.
check("the H1 left the page", text.includes("Where it fails."));
check(
  "the invented-demonstrations statement is missing or reworded",
  text.includes("These are made-up sites") && text.includes("stays between us"),
);
for (const mediaPath of [
  "/media/studio/login-at-the-door-settled.png",
  "/media/studio/are-you-open-settled.png",
  "/media/studio/bell-no-clapper-settled.png",
  "/media/studio/best-thing-hidden-settled.png",
  "/media/studio/swap-test-settled.png",
  "/media/studio/show-the-change-closed.png",
  "/media/studio/show-the-change-open.png",
]) {
  check(`the selected studio scene is missing: ${mediaPath}`, html.includes(mediaPath));
}
for (const mediaPath of [
  "/media/studio/login-at-the-door.webm",
  "/media/studio/login-at-the-door.mp4",
  "/media/studio/are-you-open.webm",
  "/media/studio/are-you-open.mp4",
  "/media/studio/bell-no-clapper.webm",
  "/media/studio/bell-no-clapper.mp4",
  "/media/studio/best-thing-hidden.webm",
  "/media/studio/best-thing-hidden.mp4",
  "/media/studio/swap-test.webm",
  "/media/studio/swap-test.mp4",
]) {
  check(`a selected studio film is missing: ${mediaPath}`, html.includes(mediaPath));
}
check(
  "the studio films must remain poster-first and explicitly loaded",
  (html.match(/data-fault-film>/g) ?? []).length === 5 &&
    (html.match(/<video[^>]*preload="none"[^>]*data-fault-film-video/g) ?? []).length === 5 &&
    (html.match(/<source[^>]*data-src="\/media\/studio\/[^\"]+\.webm"/g) ?? []).length === 5 &&
    (html.match(/<source[^>]*data-src="\/media\/studio\/[^\"]+\.mp4"/g) ?? []).length === 5 &&
    !/<video[^>]*autoplay/.test(html),
);
check(
  "the selected studio scenes lost their visible synthetic-media status",
  (text.match(/AI-made/g) ?? []).length === 5 && text.includes("Synthetic paper study"),
);
check(
  "the method-step lecture should be gone",
  !/step 5 of the studio's research method/.test(text) &&
    !/What this is for/.test(text),
);
check("the close does not lead to /request/", html.includes('href="/request/"'));

// The mock's numbers are the mock's own: the static plates must state the
// costs as text, so the no-JS layer cannot quietly rot.
for (const cost of ["no way through", "1 tap", "2 screens down"]) {
  check(`the static plates no longer state "${cost}"`, text.includes(cost));
}

// Named businesses stay off this page — faults go one-to-one, never as a
// public "we fixed this here" trail from a mock to a case study.
const linkedSlugs = [...html.matchAll(/href="\/transformations\/([^/"]+)\/"/g)].map(
  (match) => match[1],
);
check(
  `named case-study links should not appear on this page (found ${linkedSlugs.join(", ") || "none"})`,
  linkedSlugs.length === 0,
);
check(
  'the "we fixed this here" trail should be gone',
  !/we fixed this here/i.test(text),
);
check(
  "the independent-concept label should not appear on this page",
  !/independent concepts/i.test(text),
);

if (failures.length > 0) {
  console.error(`Where-it-fails: ${failures.length} check(s) failed.\n`);
  for (const failure of failures) console.error(`  ✗ ${failure}`);
  process.exit(1);
}

console.log("Where-it-fails: all checks passed.");
