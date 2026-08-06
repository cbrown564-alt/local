#!/usr/bin/env node
/**
 * Pins the /prototypes/what-we-look-for/ fault-walks, from
 * research/what-we-look-for-brief.md: "Test the fault, not the fix."
 *
 * The failure mode this guards is a mock whose fault becomes accidentally
 * walkable — someone tidies a wireframe and the hours land on the first
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
import { projectRoot, readPublicTransformationSlugs } from "../lib/public-slugs.mjs";

const pagePath = path.join(
  projectRoot,
  "dist",
  "prototypes",
  "what-we-look-for",
  "index.html",
);

if (!existsSync(pagePath)) {
  console.error(
    "Missing dist/prototypes/what-we-look-for/index.html — run `pnpm build` first.",
  );
  process.exit(1);
}

const html = readFileSync(pagePath, "utf8");
const flat = html.replace(/\s+/g, " ");
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
  `expected 9 walk graphs on the page (found ${graphs.length})`,
  graphs.length === 9,
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
      `${prefix}: the fault became walkable — the goal is reachable in ${beforeTaps} taps`,
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

// The reel order is the argument: access faults first, identity faults
// second, the swap test last.
const EXPECTED_ORDER = ["t1", "t4", "t5", "t6", "t8", "t2", "t3", "t9", "t7", "t10"];
const pageOrder = [...html.matchAll(/data-theme="(t\d+)"/g)].map((match) => match[1]);
check(
  `the themes no longer run in reel order (${pageOrder.join(" ")})`,
  JSON.stringify(pageOrder) === JSON.stringify(EXPECTED_ORDER),
);

const MESSAGES = {
  t1: "A stranger should not need an account to find your front door.",
  t4: "People arrive with one question. The first screen should answer it.",
  t5: "“Get in touch” means the customer does the work.",
  t6: "Your website greets people with what worries you. They came with a question.",
  t8: "A menu nobody opens is a menu nobody read.",
  t2: "Every link that ends in nothing was somebody deciding to visit you.",
  t3: "The biggest name on your website should be yours.",
  t9: "Your site is telling people how old it is, not how good you are.",
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

// The page's own rules: invented mocks, stated once, plainly, up top.
check(
  "the invented-demonstrations statement is missing or reworded",
  text.includes("Every demonstration on this page is invented") &&
    text.includes("never onto a public page"),
);
check(
  "the no-score rule is not stated",
  text.includes("never grades you") || text.includes("never score"),
);
check(
  "the step-5 method framing is missing",
  /step 5 of the studio's research method/.test(text),
);
check("the close does not lead to /request/", html.includes('href="/request/"'));

// The mock's numbers are the mock's own: the static plates must state the
// costs as text, so the no-JS layer cannot quietly rot.
for (const cost of ["no way through", "1 tap", "2 screens down"]) {
  check(`the static plates no longer state "${cost}"`, text.includes(cost));
}

// "We fixed this here" links point only at public transformation pages.
const publicSlugs = new Set(readPublicTransformationSlugs());
const linkedSlugs = [...html.matchAll(/href="\/transformations\/([^/"]+)\/"/g)].map(
  (match) => match[1],
);
check("no case-study links found", linkedSlugs.length > 0);
for (const slug of linkedSlugs) {
  check(`a "fixed here" link points at non-public transformation "${slug}"`, publicSlugs.has(slug));
}
const conceptLabels = text.match(/independent concepts/gi) ?? [];
check(
  `the independent-concept label should travel with every theme (found ${conceptLabels.length} of 10)`,
  conceptLabels.length === 10,
);

if (failures.length > 0) {
  console.error(`What-we-look-for fault-walks: ${failures.length} check(s) failed.\n`);
  for (const failure of failures) console.error(`  ✗ ${failure}`);
  process.exit(1);
}

console.log("What-we-look-for fault-walks: all checks passed.");
