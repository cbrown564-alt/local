#!/usr/bin/env node

/**
 * Assemble the evidence and release checklist for one transformation.
 *
 * This deliberately does not promote a concept. It reads the canonical
 * records, writes a dated working packet, and exits non-zero in --check mode
 * when the concept is not ready for the public transformation list.
 */

import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { projectRoot, readPublicTransformationSlugs } from "../lib/public-slugs.mjs";

const root = projectRoot;

const TRANSFORMATIONS = "src/site/data/transformations.ts";
const TRANSFORMATION_DETAILS = "src/site/data/transformation-details.ts";
const PUBLICATION_REVIEWS = "research/publication.json";
const VERIFICATIONS = "research/pipeline/verifications.json";
const IMAGE_PROVENANCE = "research/image-provenance.md";

/** Responsive widths written by the media optimiser, per tools/lib/media-references.mjs. */
const DERIVATIVE_WIDTHS = [640, 1265];

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

function exists(relativePath) {
  return fs.existsSync(path.join(root, relativePath));
}

function json(relativePath) {
  return JSON.parse(read(relativePath));
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function unquote(value) {
  try {
    return JSON.parse(`"${value.replaceAll('"', '\\"')}"`);
  } catch {
    return value.replaceAll("\\\"", '"').replaceAll("\\n", " ");
  }
}

function readTsString(block, key) {
  const pattern = new RegExp(
    `(?:^|\\n)\\s*"?${escapeRegExp(key)}"?:\\s*(?:\\n\\s*)?"((?:\\\\.|[^"\\\\])*)"`,
  );
  const match = block.match(pattern);
  return match ? unquote(match[1]) : null;
}

function candidateRecord(slug) {
  const source = read(TRANSFORMATIONS);
  const marker = `slug: "${slug}"`;
  const markerIndex = source.indexOf(marker);
  if (markerIndex < 0) return null;
  const start = source.lastIndexOf("\n  {", markerIndex) + 1;
  const end = source.indexOf("\n  },", markerIndex);
  const block = source.slice(start, end < 0 ? source.length : end);
  return {
    slug,
    name: readTsString(block, "name"),
    town: readTsString(block, "town"),
    category: readTsString(block, "category"),
    summary: readTsString(block, "summary"),
    before: readTsString(block, "before"),
    after: readTsString(block, "after"),
    beforeAlt: readTsString(block, "beforeAlt"),
    afterAlt: readTsString(block, "afterAlt"),
    href: readTsString(block, "href"),
  };
}

function publicSlugs() {
  return readPublicTransformationSlugs();
}

function detailRecord(slug) {
  const source = read(TRANSFORMATION_DETAILS);
  const marker = `  "${slug}": {`;
  const start = source.indexOf(marker);
  if (start < 0) return null;
  const next = source.indexOf("\n  \"", start + marker.length);
  const block = source.slice(start, next < 0 ? source.length : next);
  return {
    date: readTsString(block, "date"),
    conceptHref: readTsString(block, "conceptHref"),
    hasSourceDisclosure: block.includes('"sourceHtml":'),
    hasMotion: block.includes('"beforeVideo":') && block.includes('"afterVideo":'),
  };
}

function routeSource(route) {
  if (!route) return null;
  const clean = route.replace(/^\//, "").replace(/\/$/, "");
  const candidates = [`src/pages/${clean}.astro`, `src/pages/${clean}/index.astro`];
  if (clean.startsWith("transformations/")) candidates.push("src/pages/transformations/[slug].astro");
  return candidates.find(exists) ?? null;
}

function assetStatus(urls) {
  return urls.map((url) => {
    const relative = url.replace(/^\//, "");
    return { url, path: `public/${relative}`, exists: exists(`public/${relative}`) };
  });
}

/**
 * Media lives beside the concept it belongs to — `public/media/concepts/<slug>/`
 * — so the masters are derived from the candidate's own before/after URLs
 * rather than guessed from the slug. Responsive derivatives carry a width
 * suffix (`-640.webp`), which is why they are built here and not by swapping
 * the extension.
 */
function mediaStatus(slug, candidate, details) {
  const stems = [candidate.before, candidate.after]
    .filter(Boolean)
    .map((url) => `public/${url.replace(/^\//, "").replace(/\.[a-z0-9]+$/i, "")}`);
  if (stems.length === 0) return [];
  const paths = [];
  for (const stem of stems) paths.push(`${stem}.jpg`);
  if (details?.hasMotion) {
    for (const stem of stems) {
      paths.push(`${stem}.mp4`, `${stem}.webm`);
      for (const width of DERIVATIVE_WIDTHS) paths.push(`${stem}-${width}.webp`);
    }
  }
  return paths.map((relativePath) => ({ relativePath, exists: exists(relativePath) }));
}

function verificationRecords() {
  return json(VERIFICATIONS).records;
}

function verificationRecord(name) {
  const records = verificationRecords();
  const normalise = (value) => value.toLowerCase().replace(/building contractors?$/, "").trim();
  const target = normalise(name ?? "");
  return records.find((record) => normalise(record.name) === target) ?? null;
}

function verificationForSlug(slug) {
  const routes = [`/concepts/${slug}/`, `/transformations/${slug}/`];
  return verificationRecords().find((record) =>
    routes.includes(record.conceptRoute) || routes.includes(record.conceptPreview),
  ) ?? null;
}

function reviewRecord(slug) {
  return json(PUBLICATION_REVIEWS).reviews.find(
    (review) => review.slug === slug,
  ) ?? null;
}

function provenanceStatus(slug, name) {
  const source = read(IMAGE_PROVENANCE).toLowerCase();
  const needle = `${slug} ${name ?? ""}`.toLowerCase();
  return {
    note: source.includes(needle) ? "Named slug and business both appear in the provenance record." :
      source.includes(slug.toLowerCase()) ? "Slug appears in the provenance record." :
      "No dedicated provenance entry found; confirm imagery and disclosure before publication.",
  };
}

function markdownList(items) {
  return items.length ? items.map((item) => `- ${item}`).join("\n") : "- None recorded.";
}

function buildPacket(slug) {
  const sourceCandidate = candidateRecord(slug);
  const shortlistVerification = sourceCandidate ? verificationRecord(sourceCandidate.name) : verificationForSlug(slug);
  const candidate = sourceCandidate ?? (shortlistVerification ? {
    slug,
    name: shortlistVerification.name,
    town: shortlistVerification.town,
    category: null,
    summary: shortlistVerification.designTask,
    before: null,
    after: null,
    beforeAlt: null,
    afterAlt: null,
    href: `/transformations/${slug}/`,
  } : null);
  if (!candidate) throw new Error(`Unknown concept or transformation slug: ${slug}`);
  const details = detailRecord(slug);
  const verification = shortlistVerification ?? verificationRecord(candidate.name);
  const review = reviewRecord(slug);
  const publicMember = publicSlugs().includes(slug);
  const route = routeSource(candidate.href);
  const conceptRoute = verification?.conceptRoute ?? `/concepts/${slug}/`;
  const secondRoute = verification?.secondAssetRoute ?? null;
  const media = mediaStatus(slug, candidate, details);
  const assets = assetStatus([candidate.before, candidate.after].filter(Boolean));
  const provenance = provenanceStatus(slug, candidate.name);
  const checklist = [
    ["Candidate metadata", Boolean(candidate.name && candidate.summary)],
    ["Verification record", Boolean(verification)],
    ["Transformation detail", Boolean(details)],
    ["Source disclosure", Boolean(details?.hasSourceDisclosure)],
    ["Publication review", review?.status === "Publish" && review.blockers.length === 0],
    ["Before/after stills", assets.length === 2 && assets.every((asset) => asset.exists)],
    ["Before/after motion", media.filter(({ relativePath }) => relativePath.endsWith(".mp4")).every((asset) => asset.exists)],
    ["Transformation route", Boolean(route)],
    ["Public transformation list", publicMember],
  ];
  const ready = checklist.every(([, passed]) => passed);
  const checkedAt = new Date().toISOString().slice(0, 10);
  const lines = [
    `# Publication packet: ${candidate.name}`,
    "",
    `> Draft assembled by \`publication-packer\` on ${checkedAt}. This packet is evidence for a publication decision; it does not promote the concept by itself.`,
    "",
    `**Slug:** \`${slug}\`  `,
    `**Current packet status:** ${ready ? "Ready for final human sign-off" : "Not ready — complete the open items below"}  `,
    `**Concept route:** [${conceptRoute}](${conceptRoute})  `,
    secondRoute ? `**Second route:** [${secondRoute}](${secondRoute})  ` : "",
    "",
    "## What the concept is testing",
    "",
    candidate.summary ? `${candidate.summary}` : "No candidate summary found.",
    verification?.designTask ? `\n\n**Research design task:** ${verification.designTask}` : "",
    "",
    "## Evidence carried forward",
    "",
    verification ? `- Verified on **${verification.verifiedOn}**; trading status: **${verification.tradingStatus}**.` : "- No matching business verification record found.",
    verification?.corrections?.website ? `- Canonical website: ${verification.corrections.website}` : "",
    verification?.sources?.length ? `- Research sources:\n${markdownList(verification.sources.map((source) => `[${source}](${source})`))}` : "",
    verification?.caveats ? `- Caveat to preserve: ${verification.caveats}` : "",
    review?.summary ? `- Review summary: ${review.summary}` : "",
    review?.reviewNote ? `- Review evidence: ${review.reviewNote}` : "",
    "",
    "## Publication gate",
    "",
    "| Check | Result |",
    "|---|---|",
    ...checklist.map(([label, passed]) => `| ${label} | ${passed ? "PASS" : "OPEN"} |`),
    "",
    "## Existing records",
    "",
    `- Publication review: ${review ? `**${review.status}**, checked ${review.checkedAt}` : "**missing**"}.`,
    review?.blockers?.length ? `- Blockers: ${markdownList(review.blockers)}` : "- Blockers: none recorded.",
    review?.improvements?.length ? `- Improvements: ${markdownList(review.improvements)}` : "- Improvements: none recorded.",
    `- Transformation detail source: ${details ? "present" : "missing"}${details?.date ? ` (dated ${details.date})` : ""}.`,
    `- Source disclosure: ${details?.hasSourceDisclosure ? "present" : "missing"}.`,
    `- Image provenance: ${provenance.note}`,
    `- Candidate asset records:\n${markdownList(assets.map((asset) => `${asset.exists ? "PASS" : "OPEN"} \`${asset.path}\` (${asset.url})`))}`,
    `- Media files:\n${markdownList(media.map((asset) => `${asset.exists ? "PASS" : "OPEN"} \`${asset.relativePath}\``))}`,
    `- Transformation route source: ${route ? `\`${route}\`` : "missing"}.`,
    `- Public list membership: ${publicMember ? "present" : "not present"}.`,
    "",
    "## Open actions",
    "",
    ready ? "- Final human sign-off: confirm the five publication checks and the owner-recognition answer." : "- Complete every OPEN item in the publication gate before adding this slug to the public list.",
    "- Run the concept's five checks in the browser at desktop and true phone width; retain the dated evidence in the review record.",
    "- Capture and optimise before/after stills and motion when the concept is publication-bound; keep the source and generation limits next to the case-study copy.",
    "- Run `node tools/check/check-prose-counts.mjs`, `node tools/check/check-concept-publication.mjs`, the focused journey test, and the full build before outreach.",
    "",
    "## Canonical owners",
    "",
    "- Pipeline state: `PROSPECTS.md`",
    "- Current milestone: `PLAN.md`",
    `- Business evidence: \`${VERIFICATIONS}\``,
    `- Publication decision: \`${PUBLICATION_REVIEWS}\``,
    `- Transformation metadata: \`${TRANSFORMATIONS}\` and \`${TRANSFORMATION_DETAILS}\``,
    "- Public transformation list: `api/public-transformation-slugs.mjs`",
    `- Image provenance: \`${IMAGE_PROVENANCE}\``,
    "",
  ].filter((line) => line !== "").join("\n");
  return { markdown: `${lines}\n`, ready, checklist };
}

function usage() {
  console.error("Usage: node tools/pipeline/publication-packer.mjs <slug> [--out <path>] [--check]");
  process.exit(2);
}

const args = process.argv.slice(2);
const slug = args.find((arg) => !arg.startsWith("--"));
if (!slug) usage();
const checkOnly = args.includes("--check");
const outIndex = args.indexOf("--out");
const output = outIndex >= 0 ? args[outIndex + 1] : `research/concepts/${slug}/publication-packet.md`;
if (outIndex >= 0 && !output) usage();

try {
  const packet = buildPacket(slug);
  const open = packet.checklist.filter(([, passed]) => !passed).map(([label]) => label);
  if (!checkOnly) {
    const outputPath = path.resolve(root, output);
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, packet.markdown, "utf8");
    console.log(`Publication packet written: ${path.relative(root, outputPath)}`);
  }
  console.log(packet.ready ? "Publication packet is ready for final human sign-off." : `Publication packet has ${open.length} open item(s): ${open.join(", ")}.`);
  if (checkOnly && !packet.ready) process.exitCode = 1;
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}
