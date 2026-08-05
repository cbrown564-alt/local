/**
 * Bake a real-elevation heightfield of the Mournes / Dundrum Bay area for the
 * Lit Town hero prototype (`/prototypes/home/lit-town/`).
 *
 * Samples the AWS Open Data terrain tileset (Terrarium PNG encoding, SRTM
 * derived, public domain, https://registry.opendata.aws/terrain-tiles/) and
 * writes `src/site/data/mourne-terrain.json`: a row-major grid of heights in
 * metres, north to south, west to east, with its bounding box.
 *
 * Repeatable: `node tools/pipeline/bake-mourne-terrain.mjs`
 */
import { writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PNG } from "pngjs";

const projectRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "..",
);

// Slieve Donard 54.180,-5.920 · Newcastle 54.211,-5.888 · Dundrum 54.257,-5.843
const BBOX = { latMin: 54.13, latMax: 54.3, lonMin: -6.05, lonMax: -5.75 };
const GRID_W = 224;
const GRID_H = 224;
const ZOOM = 12;
const TILE_SIZE = 256;

const lonToTileX = (lon, z) => ((lon + 180) / 360) * 2 ** z;
const latToTileY = (lat, z) => {
  const rad = (lat * Math.PI) / 180;
  return (
    ((1 - Math.log(Math.tan(rad) + 1 / Math.cos(rad)) / Math.PI) / 2) * 2 ** z
  );
};

const tileCache = new Map();

const fetchTile = async (x, y) => {
  const key = `${x}/${y}`;
  if (tileCache.has(key)) return tileCache.get(key);
  const url = `https://s3.amazonaws.com/elevation-tiles-prod/terrarium/${ZOOM}/${x}/${y}.png`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Tile ${key} failed: HTTP ${response.status}`);
  }
  const png = PNG.sync.read(Buffer.from(await response.arrayBuffer()));
  tileCache.set(key, png);
  return png;
};

/** Terrarium: height = (R * 256 + G + B / 256) - 32768, in metres. */
const heightAtPixel = (png, px, py) => {
  const clampedX = Math.min(Math.max(px, 0), TILE_SIZE - 1);
  const clampedY = Math.min(Math.max(py, 0), TILE_SIZE - 1);
  const i = (clampedY * TILE_SIZE + clampedX) * 4;
  return (
    png.data[i] * 256 + png.data[i + 1] + png.data[i + 2] / 256 - 32768
  );
};

const sampleHeight = async (lat, lon) => {
  const tx = lonToTileX(lon, ZOOM);
  const ty = latToTileY(lat, ZOOM);
  const tileX = Math.floor(tx);
  const tileY = Math.floor(ty);
  const png = await fetchTile(tileX, tileY);
  // Bilinear within the tile; the half-pixel of error at tile seams is far
  // below what a 224-wide hero mesh can show.
  const fx = (tx - tileX) * TILE_SIZE - 0.5;
  const fy = (ty - tileY) * TILE_SIZE - 0.5;
  const x0 = Math.floor(fx);
  const y0 = Math.floor(fy);
  const dx = fx - x0;
  const dy = fy - y0;
  const h00 = heightAtPixel(png, x0, y0);
  const h10 = heightAtPixel(png, x0 + 1, y0);
  const h01 = heightAtPixel(png, x0, y0 + 1);
  const h11 = heightAtPixel(png, x0 + 1, y0 + 1);
  return (
    h00 * (1 - dx) * (1 - dy) +
    h10 * dx * (1 - dy) +
    h01 * (1 - dx) * dy +
    h11 * dx * dy
  );
};

const heights = new Array(GRID_W * GRID_H);
let minH = Infinity;
let maxH = -Infinity;

for (let row = 0; row < GRID_H; row += 1) {
  const lat = BBOX.latMax - (row / (GRID_H - 1)) * (BBOX.latMax - BBOX.latMin);
  for (let col = 0; col < GRID_W; col += 1) {
    const lon =
      BBOX.lonMin + (col / (GRID_W - 1)) * (BBOX.lonMax - BBOX.lonMin);
    const h = Math.round(await sampleHeight(lat, lon));
    heights[row * GRID_W + col] = h;
    if (h < minH) minH = h;
    if (h > maxH) maxH = h;
  }
  if (row % 32 === 0) console.log(`row ${row}/${GRID_H}`);
}

const output = {
  source:
    "AWS Open Data terrain tiles (Terrarium, SRTM derived), zoom 12, baked by tools/pipeline/bake-mourne-terrain.mjs",
  bakedAt: new Date().toISOString().slice(0, 10),
  bbox: BBOX,
  width: GRID_W,
  height: GRID_H,
  minHeight: minH,
  maxHeight: maxH,
  heights,
};

const outPath = path.join(projectRoot, "src", "site", "data", "mourne-terrain.json");
writeFileSync(outPath, JSON.stringify(output));
console.log(
  `Wrote ${outPath} — ${GRID_W}x${GRID_H}, ${tileCache.size} tiles, heights ${minH}m to ${maxH}m.`,
);
