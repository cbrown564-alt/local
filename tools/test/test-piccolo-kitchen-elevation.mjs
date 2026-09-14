import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const homePath = path.join(root, "src/concepts/piccolo-kitchen/home.astro");
const stylesPath = path.join(root, "src/concepts/piccolo-kitchen/styles.css");

test("piccolo-kitchen elevation adheres to bespoke requirements", async (t) => {
  const homeContent = await fs.readFile(homePath, "utf-8");
  const stylesContent = await fs.readFile(stylesPath, "utf-8");

  await t.test("OvenPeel SVG component is completely purged", () => {
    assert.doesNotMatch(homeContent, /OvenPeel/);
    assert.doesNotMatch(stylesContent, /\.pk-peel/);
  });

  await t.test("uses authentic address and contact numbers", () => {
    assert.match(homeContent, /127 Main Street/);
    assert.match(homeContent, /BT33 0AQ/);
    assert.match(homeContent, /028 4372 2999/);
    assert.match(homeContent, /tel:\+442843722999/);
  });

  await t.test("features the 3 photographic media items", () => {
    assert.match(homeContent, /piccolo-hero-main-street\.jpg/);
    assert.match(homeContent, /piccolo-woodfired-oven\.jpg/);
    assert.match(homeContent, /piccolo-fresh-pizza\.jpg/);
  });

  await t.test("displays authentic opening hours and sister location note", () => {
    assert.match(homeContent, /Closed Monday and Tuesday/);
    assert.match(homeContent, /Sister door: Belfast Lisburn Road/);
  });

  await t.test("media files exist on disk", async () => {
    const images = [
      "piccolo-hero-main-street.jpg",
      "piccolo-woodfired-oven.jpg",
      "piccolo-fresh-pizza.jpg"
    ];
    for (const img of images) {
      const p = path.join(root, "public/media/concepts/piccolo-kitchen", img);
      const stat = await fs.stat(p);
      assert.ok(stat.size > 0, `${img} should have size > 0`);
    }
  });
});
