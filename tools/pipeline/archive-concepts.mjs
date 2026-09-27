#!/usr/bin/env node
/**
 * Moves concept packs out of the build and into `archive/concepts/<slug>/`.
 *
 *   node tools/pipeline/archive-concepts.mjs <slug> [<slug> ...]
 *   node tools/pipeline/archive-concepts.mjs --from research/portfolio-review/verdicts-2026-09-27.json
 *
 * Written for the 27 September 2026 portfolio review, which kept 11 packs and
 * archived 64 (research/portfolio-review/portfolio-review-2026-09-27.md). What it does
 * for each slug:
 *
 * - `git mv` the pack (`src/concepts/<slug>/`), its routes
 *   (`src/pages/concepts/<slug>{.astro,/}`) and its elevation pin
 *   (`tools/test/test-*-elevation.mjs`) into `archive/concepts/<slug>/`.
 *   `archive/` is outside `src/`, so Astro never builds it, and tsconfig
 *   excludes it from `astro check`.
 * - Moves deployed media (`public/media/concepts/<slug>/`, its Open Graph
 *   cards and generated map plates) to `media/held/`, the REPO_MAP home for
 *   retired binaries, and records path, size and SHA-256 in
 *   `media/held/MANIFEST.md`. The bytes stay recoverable from Git history at
 *   the commit before the archive.
 * - Cuts the slug's records out of the shared data modules and writes each
 *   cut verbatim to `archive/concepts/<slug>/records.json`, so restoring a
 *   pack is a paste, not a rewrite.
 * - Marks the slug's review in `research/publication.json` as `Archived`,
 *   keeping its checks as history.
 *
 * Research (`research/concepts/<slug>/`) is not moved: it is the part worth
 * keeping, and the review points at it.
 */
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  renameSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const rel = (p) => path.relative(root, p).split(path.sep).join("/");
const abs = (p) => path.join(root, p);
const git = (...args) => execFileSync("git", args, { cwd: root, stdio: "pipe" });

const argv = process.argv.slice(2);
let slugs = argv.filter((a) => !a.startsWith("--"));
const fromIndex = argv.indexOf("--from");
if (fromIndex !== -1) {
  const verdicts = JSON.parse(readFileSync(abs(argv[fromIndex + 1]), "utf8"));
  slugs = verdicts.concepts.filter((c) => c.verdict === "archive").map((c) => c.slug);
}
if (!slugs.length) {
  console.error("Usage: archive-concepts.mjs <slug> ... | --from <verdicts.json>");
  process.exit(1);
}
const verdictBySlug = new Map();
if (fromIndex !== -1) {
  const verdicts = JSON.parse(readFileSync(abs(argv[fromIndex + 1]), "utf8"));
  for (const c of verdicts.concepts) verdictBySlug.set(c.slug, c);
}
const archivedOn = new Date().toISOString().slice(0, 10);

/* ---------- a small scanner that skips strings and comments ---------- */

function skipString(text, i) {
  const quote = text[i];
  i++;
  while (i < text.length) {
    const ch = text[i];
    if (ch === "\\") {
      i += 2;
      continue;
    }
    if (quote === "`" && ch === "$" && text[i + 1] === "{") {
      i = matchBrace(text, i + 1) + 1;
      continue;
    }
    if (ch === quote) return i + 1;
    i++;
  }
  throw new Error("Unterminated string");
}

/** Index of the brace that closes the one at `open`. */
function matchBrace(text, open) {
  const pair = { "{": "}", "[": "]" }[text[open]];
  const opener = text[open];
  let depth = 0;
  let i = open;
  while (i < text.length) {
    const ch = text[i];
    if (ch === '"' || ch === "'" || ch === "`") {
      i = skipString(text, i);
      continue;
    }
    if (ch === "/" && text[i + 1] === "/") {
      i = text.indexOf("\n", i);
      continue;
    }
    if (ch === "/" && text[i + 1] === "*") {
      i = text.indexOf("*/", i) + 2;
      continue;
    }
    if (ch === opener) depth++;
    else if (ch === pair) {
      depth--;
      if (depth === 0) return i;
    }
    i++;
  }
  throw new Error("Unbalanced brace");
}

/** End of a value starting at `start`, then past a trailing comma to the end of line. */
function valueEnd(text, start) {
  let end;
  if (text[start] === "{" || text[start] === "[") end = matchBrace(text, start) + 1;
  else if (text[start] === '"' || text[start] === "'" || text[start] === "`") end = skipString(text, start);
  else throw new Error(`Unexpected value start ${JSON.stringify(text.slice(start, start + 20))}`);
  if (text[end] === ",") end++;
  const nl = text.indexOf("\n", end);
  if (nl !== -1 && /^[ \t]*$/.test(text.slice(end, nl))) end = nl + 1;
  return end;
}

/** Remove `"slug": <value>` (quoted or bare key) from a keyed object literal. */
function cutKeyed(text, slug) {
  const re = new RegExp(`(^|\\n)([ \\t]*)(["']?)${slug.replace(/-/g, "\\-")}\\3\\s*:\\s*`, "g");
  const m = re.exec(text);
  if (!m) return { text, cut: null };
  const lineStart = m.index + m[1].length;
  const valueStart = m.index + m[0].length;
  const end = valueEnd(text, valueStart);
  return { text: text.slice(0, lineStart) + text.slice(end), cut: text.slice(lineStart, end) };
}

/** Remove the object carrying `slug: "<slug>"` from the array exported as `name`. */
function cutFromArray(text, name, slug) {
  const decl = text.indexOf(`export const ${name}`);
  if (decl === -1) return { text, cut: null };
  const open = text.indexOf("[", text.indexOf("=", decl));
  const close = matchBrace(text, open);
  let i = open + 1;
  while (i < close) {
    const ch = text[i];
    if (ch === "{") {
      const end = matchBrace(text, i);
      const body = text.slice(i, end + 1);
      const first = body.match(/slug:\s*"([^"]+)"/);
      if (first && first[1] === slug) {
        let lineStart = text.lastIndexOf("\n", i) + 1;
        const cutEnd = valueEnd(text, i);
        return { text: text.slice(0, lineStart) + text.slice(cutEnd), cut: text.slice(lineStart, cutEnd) };
      }
      i = end + 1;
      continue;
    }
    if (ch === '"' || ch === "'" || ch === "`") {
      i = skipString(text, i);
      continue;
    }
    i++;
  }
  return { text, cut: null };
}

/* ---------- files ---------- */

const edit = (file, fn) => {
  const before = readFileSync(abs(file), "utf8");
  const after = fn(before);
  if (after !== before) writeFileSync(abs(file), after);
};

const sha256 = (file) => createHash("sha256").update(readFileSync(file)).digest("hex");

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else out.push(full);
  }
  return out;
}

const manifestRows = [];
function holdFile(from) {
  const fromRel = rel(from);
  const toRel = fromRel.replace(/^public\/media\//, "media/held/");
  const to = abs(toRel);
  mkdirSync(path.dirname(to), { recursive: true });
  const bytes = statSync(from).size;
  const digest = sha256(from);
  let tracked = true;
  try {
    git("ls-files", "--error-unmatch", fromRel);
  } catch {
    tracked = false;
  }
  if (tracked) git("rm", "--cached", "--quiet", fromRel);
  renameSync(from, to);
  manifestRows.push(`| \`${fromRel}\` | \`${toRel}\` | ${bytes} | \`${digest}\` |`);
}

const testFiles = readdirSync(abs("tools/test")).filter((f) => /^test-.*-elevation\.mjs$/.test(f));
const testFor = (slug) => {
  const present = testFiles.filter((f) => existsSync(abs(`tools/test/${f}`)));
  return (
    present.find((f) => f === `test-${slug}-elevation.mjs`) ??
    present.find((f) => readFileSync(abs(`tools/test/${f}`), "utf8").includes(`concepts/${slug}/`))
  );
};

const pkg = JSON.parse(readFileSync(abs("package.json"), "utf8"));
const removedScripts = [];

for (const slug of slugs) {
  const home = `archive/concepts/${slug}`;
  if (existsSync(abs(home))) {
    console.log(`skip ${slug}: already archived`);
    continue;
  }
  mkdirSync(abs(home), { recursive: true });
  const records = { slug, archivedOn, verdict: verdictBySlug.get(slug) ?? null, moved: {}, cut: {} };

  // Code, routes and pin.
  if (existsSync(abs(`src/concepts/${slug}`))) {
    git("mv", `src/concepts/${slug}`, `${home}/src`);
    records.moved[`src/concepts/${slug}/`] = `${home}/src/`;
  }
  for (const route of [`src/pages/concepts/${slug}.astro`, `src/pages/concepts/${slug}`]) {
    if (existsSync(abs(route))) {
      mkdirSync(abs(`${home}/pages`), { recursive: true });
      const target = `${home}/pages/${path.basename(route)}`;
      git("mv", route, target);
      records.moved[route] = target;
    }
  }
  const test = testFor(slug);
  if (test) {
    git("mv", `tools/test/${test}`, `${home}/${test}`);
    records.moved[`tools/test/${test}`] = `${home}/${test}`;
    for (const [name, cmd] of Object.entries(pkg.scripts)) {
      if (cmd.includes(`tools/test/${test}`)) {
        records.cut[`package.json scripts.${name}`] = cmd;
        removedScripts.push(name);
        delete pkg.scripts[name];
      }
    }
  }

  // Media out of the deploy boundary.
  const mediaDir = abs(`public/media/concepts/${slug}`);
  if (existsSync(mediaDir)) {
    for (const file of walk(mediaDir)) holdFile(file);
    rmSync(mediaDir, { recursive: true, force: true });
    records.moved[`public/media/concepts/${slug}/`] = `media/held/concepts/${slug}/`;
  }
  for (const dir of ["public/media/og", "public/media/maps"]) {
    for (const entry of readdirSync(abs(dir))) {
      if (entry === `${slug}.jpg` || entry.startsWith(`${slug}-`)) {
        holdFile(abs(`${dir}/${entry}`));
        records.moved[`${dir}/${entry}`] = `${dir.replace("public/media", "media/held")}/${entry}`;
      }
    }
  }

  // Records in shared modules.
  edit("src/site/data/transformations.ts", (t) => {
    const r = cutFromArray(t, "transformationCandidates", slug);
    if (r.cut) records.cut["src/site/data/transformations.ts transformationCandidates"] = r.cut;
    return r.text;
  });
  for (const file of [
    "src/site/data/transformation-details.ts",
    "src/site/data/essence-media.ts",
    "src/site/data/onesheets.ts",
    "src/site/components/TownMap.astro",
    "src/concepts/_shell/ConceptLayout.astro",
  ]) {
    edit(file, (t) => {
      const r = cutKeyed(t, slug);
      if (r.cut) records.cut[file] = r.cut;
      return r.text;
    });
  }
  edit("src/site/data/five-shapes.ts", (t) => {
    const re = new RegExp(`^[ \\t]*\\{ slug: "${slug}", name: [^\\n]*\\},?\\n`, "m");
    const m = t.match(re);
    if (m) records.cut["src/site/data/five-shapes.ts example"] = m[0];
    return t.replace(re, "");
  });
  edit("api/public-transformation-slugs.mjs", (t) => {
    const line = `  "${slug}",\n`;
    if (t.includes(line)) records.cut["api/public-transformation-slugs.mjs"] = line;
    return t.replace(line, "");
  });
  edit("research/publication.json", (t) => {
    const pub = JSON.parse(t);
    const review = pub.reviews.find((r) => r.slug === slug);
    if (!review) return t;
    review.status = "Archived";
    review.archivedOn = archivedOn;
    review.archiveReason =
      "Archived in the 27 September 2026 portfolio review; see research/portfolio-review/portfolio-review-2026-09-27.md.";
    return `${JSON.stringify(pub, null, 2)}\n`;
  });

  writeFileSync(abs(`${home}/records.json`), `${JSON.stringify(records, null, 2)}\n`);
  git("add", home);
  console.log(`archived ${slug}`);
}

writeFileSync(abs("package.json"), `${JSON.stringify(pkg, null, 2)}\n`);
edit("tools/test/run-verification.mjs", (t) =>
  removedScripts.reduce((acc, name) => acc.replace(`  ["${name}"],\n`, ""), t),
);

if (manifestRows.length) {
  edit("media/held/MANIFEST.md", (t) =>
    `${t.trimEnd()}\n\n## Archived in the ${archivedOn} portfolio review\n\n` +
    `Concept packs moved to \`archive/concepts/\`; see\n` +
    `[the review](../../research/portfolio-review/portfolio-review-2026-09-27.md).\n\n` +
    `| Previous path | Current path | Bytes | SHA-256 |\n|---|---|---:|---|\n${manifestRows.join("\n")}\n`,
  );
}
console.log(`${slugs.length} slug(s); ${manifestRows.length} media file(s) held; ${removedScripts.length} test script(s) retired.`);
