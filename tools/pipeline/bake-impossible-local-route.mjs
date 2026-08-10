/**
 * Bake the one-dimensional terrain study used by the Line & Bearing
 * representative prototype at `/prototypes/impossible-local/`.
 *
 * The source grid is the existing AWS Terrain Tiles / Terrarium bake in
 * `src/site/data/mourne-terrain.json`. The control points describe an
 * expressive Newcastle → high ground → Newcastle cross-section. They are not
 * a trail, surveyed route, safety recommendation or statement of access.
 *
 * Repeatable: `node tools/pipeline/bake-impossible-local-route.mjs`
 */
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "..",
);

const sourcePath = path.join(
  projectRoot,
  "src",
  "site",
  "data",
  "mourne-terrain.json",
);
const outputPath = path.join(
  projectRoot,
  "src",
  "prototypes",
  "impossible-local",
  "route-profile.json",
);

const terrain = JSON.parse(readFileSync(sourcePath, "utf8"));
const { bbox, width, height, heights } = terrain;

const controls = [
  { id: "street", lat: 54.2115, lon: -5.8883, progress: 0 },
  { id: "forest", lat: 54.199, lon: -5.916, progress: 0.26 },
  { id: "high-ground", lat: 54.18, lon: -5.92, progress: 0.5 },
  { id: "descent", lat: 54.194, lon: -5.94, progress: 0.76 },
  { id: "workshop", lat: 54.2115, lon: -5.8883, progress: 1 },
];

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const heightAt = (lat, lon) => {
  const row = ((bbox.latMax - lat) / (bbox.latMax - bbox.latMin)) * (height - 1);
  const col = ((lon - bbox.lonMin) / (bbox.lonMax - bbox.lonMin)) * (width - 1);
  const r0 = clamp(Math.floor(row), 0, height - 2);
  const c0 = clamp(Math.floor(col), 0, width - 2);
  const dr = clamp(row - r0, 0, 1);
  const dc = clamp(col - c0, 0, 1);
  const h00 = heights[r0 * width + c0];
  const h10 = heights[r0 * width + c0 + 1];
  const h01 = heights[(r0 + 1) * width + c0];
  const h11 = heights[(r0 + 1) * width + c0 + 1];
  return (
    h00 * (1 - dc) * (1 - dr) +
    h10 * dc * (1 - dr) +
    h01 * (1 - dc) * dr +
    h11 * dc * dr
  );
};

const metresBetween = (a, b) => {
  const radius = 6371000;
  const lat1 = (a.lat * Math.PI) / 180;
  const lat2 = (b.lat * Math.PI) / 180;
  const dLat = lat2 - lat1;
  const dLon = ((b.lon - a.lon) * Math.PI) / 180;
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
  return 2 * radius * Math.asin(Math.sqrt(h));
};

const pointAtProgress = (progress) => {
  const segmentIndex = clamp(
    controls.findIndex((point) => point.progress >= progress) - 1,
    0,
    controls.length - 2,
  );
  const from = controls[segmentIndex];
  const to = controls[segmentIndex + 1];
  const local = (progress - from.progress) / (to.progress - from.progress);
  return {
    lat: from.lat + (to.lat - from.lat) * local,
    lon: from.lon + (to.lon - from.lon) * local,
  };
};

const sampleCount = 121;
const raw = Array.from({ length: sampleCount }, (_, index) => {
  const progress = index / (sampleCount - 1);
  const point = pointAtProgress(progress);
  return {
    progress,
    ...point,
    elevationM: Math.max(0, Math.round(heightAt(point.lat, point.lon))),
  };
});

let distanceM = 0;
let climbM = 0;
const samples = raw.map((point, index) => {
  if (index > 0) {
    distanceM += metresBetween(raw[index - 1], point);
    climbM += Math.max(0, point.elevationM - raw[index - 1].elevationM);
  }
  return {
    progress: Number(point.progress.toFixed(4)),
    distanceKm: Number((distanceM / 1000).toFixed(2)),
    cumulativeClimbM: Math.round(climbM),
    elevationM: point.elevationM,
  };
});

const output = {
  source: terrain.source,
  sourceGridBakedAt: terrain.bakedAt,
  generatedAt: "2026-08-09",
  status:
    "Expressive terrain cross-section only — not navigation, survey, access or current trail advice.",
  bounds: {
    latMin: Math.min(...controls.map((point) => point.lat)),
    latMax: Math.max(...controls.map((point) => point.lat)),
    lonMin: Math.min(...controls.map((point) => point.lon)),
    lonMax: Math.max(...controls.map((point) => point.lon)),
  },
  sampling: {
    controlPointCount: controls.length,
    sampleCount,
    interpolation: "piecewise linear coordinates; bilinear elevation grid",
    publicCoordinatesOmitted: true,
  },
  summary: {
    distanceKm: Number((distanceM / 1000).toFixed(1)),
    cumulativeClimbM: Math.round(climbM),
    minElevationM: Math.min(...samples.map((point) => point.elevationM)),
    maxElevationM: Math.max(...samples.map((point) => point.elevationM)),
  },
  chapters: controls.map(({ id, progress }) => ({ id, progress })),
  samples,
};

writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`);
console.log(
  `Wrote ${outputPath} — ${sampleCount} samples, ${output.summary.distanceKm}km study, ${output.summary.cumulativeClimbM}m cumulative climb.`,
);
