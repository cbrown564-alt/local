import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const homePath = path.join(root, "src/concepts/harbour-house/home.astro");
const stylesPath = path.join(root, "src/concepts/harbour-house/styles.css");

test("harbour-house elevation adheres to bespoke requirements", async (t) => {
  const homeContent = await fs.readFile(homePath, "utf-8");
  const stylesContent = await fs.readFile(stylesPath, "utf-8");

  await t.test("door SVG SeaWallDoor is completely purged", () => {
    assert.doesNotMatch(homeContent, /SeaWallDoor/);
    assert.doesNotMatch(stylesContent, /\.hh-door-svg/);
  });

  await t.test("uses authentic contact details and address", () => {
    assert.match(homeContent, /4–8 South Promenade/);
    assert.match(homeContent, /BT33 0EX/);
    assert.match(homeContent, /028 4372 3445/);
    assert.match(homeContent, /tel:\+442843723445/);
    assert.match(homeContent, /harbourhousenewcastle@gmail.com/);
  });

  await t.test("features the 3 photographic media items", () => {
    assert.match(homeContent, /harbour-house-hero-sea-wall\.jpg/);
    assert.match(homeContent, /harbour-house-seafood-platter\.jpg/);
    assert.match(homeContent, /harbour-house-bay-terrace\.jpg/);
  });

  await t.test("bedroom stock and booking links are present and authentic", () => {
    assert.match(homeContent, /Eight en suites over Dundrum Bay/);
    assert.match(homeContent, /https:\/\/www\.harbourhousenewcastle\.com\/book-a-table\//);
    assert.match(homeContent, /https:\/\/www\.harbourhousenewcastle\.com\/accommodation\//);
  });

  await t.test("media files exist on disk", async () => {
    const images = [
      "harbour-house-hero-sea-wall.jpg",
      "harbour-house-seafood-platter.jpg",
      "harbour-house-bay-terrace.jpg"
    ];
    for (const img of images) {
      const p = path.join(root, "public/media/concepts/harbour-house", img);
      const stat = await fs.stat(p);
      assert.ok(stat.size > 0, `${img} should have size > 0`);
    }
  });
});
