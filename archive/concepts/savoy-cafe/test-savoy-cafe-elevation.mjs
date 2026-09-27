import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const homePath = path.join(root, "src/concepts/savoy-cafe/home.astro");
const stylesPath = path.join(root, "src/concepts/savoy-cafe/styles.css");

test("savoy-cafe elevation adheres to bespoke requirements", async (t) => {
  const homeContent = await fs.readFile(homePath, "utf-8");
  const stylesContent = await fs.readFile(stylesPath, "utf-8");

  await t.test("SavoyFascia SVG component is completely purged", () => {
    assert.doesNotMatch(homeContent, /SavoyFascia/);
    assert.doesNotMatch(stylesContent, /\.sv-fascia/);
  });

  await t.test("uses authentic address and contact numbers", () => {
    assert.match(homeContent, /22–24 Main Street/);
    assert.match(homeContent, /BT33 0AD/);
    assert.match(homeContent, /028 4372 5757/);
    assert.match(homeContent, /tel:\+442843725757/);
  });

  await t.test("features the 3 photographic media items", () => {
    assert.match(homeContent, /savoy-cafe-hero-main-street\.jpg/);
    assert.match(homeContent, /savoy-cafe-counter-bakes\.jpg/);
    assert.match(homeContent, /savoy-cafe-hot-lunch\.jpg/);
  });

  await t.test("displays authentic opening hours and ethos", () => {
    assert.match(homeContent, /08:00–17:00/);
    assert.match(homeContent, /Good Food, not Fast Food/);
    assert.match(homeContent, /Paddy &amp; Eileen Mallon revived/);
  });

  await t.test("media files exist on disk", async () => {
    const images = [
      "savoy-cafe-hero-main-street.jpg",
      "savoy-cafe-counter-bakes.jpg",
      "savoy-cafe-hot-lunch.jpg"
    ];
    for (const img of images) {
      const p = path.join(root, "public/media/concepts/savoy-cafe", img);
      const stat = await fs.stat(p);
      assert.ok(stat.size > 0, `${img} should have size > 0`);
    }
  });
});
