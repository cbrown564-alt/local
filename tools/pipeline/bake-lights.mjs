/**
 * Bake everything `/the-lights/` draws and says, from one filtered array.
 *
 * The count in prose and the points in the picture must come from the same
 * pass over the same rows, or the picture can say something the sentence does
 * not (docs/sensory-system-plan.md phase 3b, docs/adr/0005). This is that
 * pass. It writes `src/site/data/lights.json` and nothing else reads
 * `businesses.json` on this route.
 *
 * Two things this file is responsible for, both of which are promises to real
 * people rather than implementation details:
 *
 * 1. **Displacement.** The census carries coordinates to seven decimal places
 *    — centimetre accuracy. A dark point at its true position names the
 *    premises to anyone who pastes it into a map, and from the premises the
 *    business, so dropping the `name` field anonymises nothing. Every point is
 *    displaced by 25–50m here, before anything is written, so true
 *    coordinates never reach the emitted page. Lit and dark are displaced
 *    identically: displace only the dark and the displacement is itself the
 *    tell.
 *
 * 2. **Removals.** A business that asks to be left out is out of the map, the
 *    denominator and the outreach pool. `research/pipeline/removals.json` is
 *    the record, and it is never published.
 *
 * Repeatable: `node tools/pipeline/bake-lights.mjs`
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { censusClass, TRADING } from "./census-class.mjs";

const projectRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "..",
);

/** The day the whole set was last swept by the four-step hunt (docs/CONTEXT.md). */
const REVIEWED_ON = "2026-08-05";
/**
 * Metres. Every point moves at least MIN and at most MAX.
 *
 * The floor is the part that matters. Sampling uniformly over a disc would
 * leave about one point in a hundred within 5m of its own premises — with 166
 * points, one or two businesses published at their front door, chosen by a
 * seed rather than by anything. A guarantee with a hole in it is not one, so
 * the offset is drawn from an annulus: nothing lands where it started, and a
 * shopfront is narrower than the floor.
 */
const MIN_DISPLACE_M = 25;
const MAX_DISPLACE_M = 50;
/** ~11m of latitude. Finer than the displacement, so it only tidies. */
const DECIMALS = 4;
/**
 * Fixed so a rebuild does not reshuffle the town, and so a diff of this file
 * shows real changes rather than new noise. Not a secret: the displacement
 * protects by being larger than the premises, not by being unguessable.
 */
const SEED = "the-lights/2026-08-05";

const businessesPath = path.join(projectRoot, "src/site/data/businesses.json");
const removalsPath = path.join(projectRoot, "research/pipeline/removals.json");
const outPath = path.join(projectRoot, "src/site/data/lights.json");

const rows = JSON.parse(readFileSync(businessesPath, "utf8"));

/** Not published, and not required to exist until someone asks to be removed. */
const removals = existsSync(removalsPath)
  ? JSON.parse(readFileSync(removalsPath, "utf8"))
  : [];
const removalKey = (name, town) =>
  `${String(town).toLowerCase().trim()}|${String(name).toLowerCase().trim()}`;
const removed = new Set(
  removals.map((entry) => removalKey(entry.name, entry.town)),
);
const lastCorrectedOn = removals.reduce(
  (latest, entry) => (entry.date > latest ? entry.date : latest),
  "",
);

/** A website of its own. A social page is not one (docs/CONTEXT.md). */
const isLit = (row) =>
  row.websiteStatus === "HTTPS website" || row.websiteStatus === "HTTP website";
const isMapped = (row) =>
  typeof row.lat === "number" && typeof row.lon === "number";

const fnv1a = (text) => {
  let hash = 0x811c9dc5;
  for (let i = 0; i < text.length; i += 1) {
    hash ^= text.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193) >>> 0;
  }
  return hash >>> 0;
};

/** Deterministic per row, so the same census bakes the same town every time. */
const mulberry32 = (seed) => {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

const displace = (row) => {
  const random = mulberry32(fnv1a(`${SEED}|${row.id ?? `${row.town}|${row.name}`}`));
  // Uniform over the annulus rather than the square: the sqrt keeps density
  // even across the ring, so points neither pile up at the inner edge nor in
  // the corners of a box.
  const angle = random() * Math.PI * 2;
  const radius = Math.sqrt(
    MIN_DISPLACE_M ** 2 +
      random() * (MAX_DISPLACE_M ** 2 - MIN_DISPLACE_M ** 2),
  );
  const metresPerDegLat = 111_320;
  const metresPerDegLon = 111_320 * Math.cos((row.lat * Math.PI) / 180);
  return {
    lat: Number(
      (row.lat + (radius * Math.sin(angle)) / metresPerDegLat).toFixed(DECIMALS),
    ),
    lon: Number(
      (row.lon + (radius * Math.cos(angle)) / metresPerDegLon).toFixed(DECIMALS),
    ),
    lit: isLit(row),
  };
};

const trading = rows
  .filter((row) => censusClass(row) === TRADING)
  .filter((row) => !removed.has(removalKey(row.name, row.town)));
const mapped = trading.filter(isMapped);

const points = mapped.map(displace);

const counts = {
  /** The pair beside the picture: what the map can actually show. */
  mapped: mapped.length,
  mappedLit: mapped.filter(isLit).length,
  mappedDark: mapped.filter((row) => !isLit(row)).length,
  /** The fuller answer for section 3, so the map's denominator does not
   *  quietly become the town's statistic. */
  trading: trading.length,
  tradingLit: trading.filter(isLit).length,
  tradingDark: trading.filter((row) => !isLit(row)).length,
};

/* --- Assertions. The arithmetic is pinned, not eyeballed (docs/adr/0005). --- */

const fail = (message) => {
  throw new Error(`bake-lights: ${message}`);
};

if (points.length !== counts.mapped) {
  fail(`${points.length} points for ${counts.mapped} mapped rows`);
}
if (counts.mappedLit + counts.mappedDark !== counts.mapped) {
  fail("mapped lit + dark does not equal mapped");
}
if (counts.tradingLit + counts.tradingDark !== counts.trading) {
  fail("trading lit + dark does not equal trading");
}
if (points.filter((point) => point.lit).length !== counts.mappedLit) {
  fail("lit points do not match the lit count");
}
for (const point of points) {
  const keys = Object.keys(point).sort().join(",");
  if (keys !== "lat,lit,lon") {
    fail(`a point carries ${keys} — only lat, lon and lit may be published`);
  }
  if (typeof point.lit !== "boolean" || !Number.isFinite(point.lat)) {
    fail("a point carries a value that is not a number or a boolean");
  }
}
/* Every dark row in the map must carry the evidence that lets us draw it at
 * all. A dark point without a verification object is the claim ADR 0004 held
 * the gate against. */
const unevidenced = mapped.filter((row) => !isLit(row) && !row.verification);
if (unevidenced.length) {
  fail(
    `${unevidenced.length} dark mapped rows have no verification object; ` +
      "the aggregate may not be published over unverified darkness",
  );
}

writeFileSync(
  outPath,
  `${JSON.stringify(
    {
      reviewedOn: REVIEWED_ON,
      lastCorrectedOn: lastCorrectedOn || null,
      displacedMetres: { min: MIN_DISPLACE_M, max: MAX_DISPLACE_M },
      ...counts,
      points,
    },
    null,
    2,
  )}\n`,
);

console.log(
  `Baked ${points.length} displaced points to src/site/data/lights.json\n` +
    `  mapped   ${counts.mapped} — ${counts.mappedLit} lit, ${counts.mappedDark} dark\n` +
    `  trading  ${counts.trading} — ${counts.tradingLit} lit, ${counts.tradingDark} dark\n` +
    `  reviewed ${REVIEWED_ON}` +
    (lastCorrectedOn ? `, last corrected ${lastCorrectedOn}` : "") +
    (removed.size ? `\n  ${removed.size} removed at request` : ""),
);
