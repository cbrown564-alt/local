# Enniskeen — generation brief for the day-part hero

Written 31 July 2026 alongside the elevation build in
`docs/good-to-great-concept-elevation.md` (move 1).

**Done, 31 July 2026.** Both generations were made against the prompts below,
converted to JPEG, optimised and shipped; all three day parts are live and
covered by `pnpm test:enniskeen`. The brief stays as the record of how they
were made and the boundary they must respect if either is ever regenerated.

## What it is for

The concept's hero is a faithful visualisation of the real house. The owner
will most likely open the link in the evening, on a phone, after service. The
day-part hero means the first thing they see is *their own building with the
windows lit* rather than a stock-feeling afternoon shot. It is the cheapest
emotional move available to this concept and the one most likely to get the
page shown to somebody else.

## How the mechanism behaves (already built)

`src/components/enniskeen/EnkHero.astro` renders every variant whose file is
actually present under `public/`, and a small inline script swaps to the band
matching the visitor's local clock:

| Variant | Local hours | File |
|---|---|---|
| `dawn` | 04:00 – 09:59 | `public/images/enniskeen-faithful-house-dawn.jpg` *(exists)* |
| `day` | 10:00 – 17:59 | `public/images/enniskeen-faithful-house.png` *(exists)* |
| `dusk` | 18:00 – 03:59 | `public/images/enniskeen-faithful-house-dusk.jpg` *(exists)* |

Consequences worth knowing before generating:

- **A missing file is skipped, not broken.** With one variant the hero is a
  plain static image and no swap script is emitted at all. Drop a file in,
  rebuild, and it joins the rotation. Nothing else to edit.
- **Clear the Astro cache when adding a variant.** A cached build silently
  omitted a newly added file during this session — the page looked correct and
  simply never swapped. `rm -rf dist node_modules/.astro node_modules/.vite`
  before rebuilding. `pnpm test:enniskeen` now fails loudly on the mismatch
  rather than leaving it to be noticed by eye.
- **`day` is always the pre-script state**, so no-JS visits, crawlers, the
  print one-sheet and the capture scripts keep seeing exactly what they see
  today. The film does not need re-capturing for this move.
- Alt text and the `Provisional visualisation` caption for each variant are
  already written in `src/data/enniskeen-site.ts` and swap with the image.
- Both new files are `.jpg` so `pnpm optimize:media` generates the `-640.webp`
  and `-1265.webp` derivatives the responsive `<picture>` expects. **Run it
  after adding them.** A `.png` would silently skip the WebP path.
- Match the existing plate's **2.10:1** aspect. The delivered files are
  1820 × 864 (dawn) and 1818 × 865 (dusk) against the day plate's 1819 × 865 —
  within a pixel, which is what matters: a different ratio crops
  unpredictably against `object-position: 40% 46%`.

## The reference boundary (non-negotiable)

These are *faithful* visualisations of a real, identifiable building. The
standing rule from the existing entry in
`research/concept-reviews/image-provenance.md` applies unchanged: preserve the
painted-render gabled façade, the conical slate turret and its weathervane
finial, the chimney placement, the window rhythm and the ivy. Change the light
and nothing else.

**Use `public/images/enniskeen-faithful-house.png` as the reference image**, not
the original photograph. Working from the existing plate is what keeps the
three variants in the same position, at the same focal length, with the same
ivy — which is the entire point. A re-shot angle breaks the swap: the house
would appear to jump when the image changes.

**Forbidden in both frames:** any change to the architecture, added wings,
towers, balconies, glazing or extensions; people; cars; signage or a hotel
name board; invented gardens, terraces, water features or lighting rigs; snow;
a different season for the ivy; any recognisable third-party building.

## Prompt — dawn

> Using the supplied image as an exact architectural reference, regenerate the
> same view of this Victorian country house at first light. Keep the building,
> its position in frame, camera angle, focal length, roofline, conical slate
> turret and weathervane, chimneys, window arrangement, painted render and the
> autumn ivy on the façade exactly as they are. Change only the light and
> atmosphere: soft pre-sunrise blue-grey sky with a low band of warm light on
> the horizon behind the wooded hillside, cool mist lying across the lawn and
> lifting through the trees, dew on the grass, the gravel drive damp and dark.
> Windows unlit and reflecting the pale sky. No people, no cars, no signage, no
> added buildings or structures. Photographic, natural, slightly desaturated;
> fine grain; no HDR, no glow, no lens flare.

## Prompt — dusk (the important one)

> Using the supplied image as an exact architectural reference, regenerate the
> same view of this Victorian country house at dusk, shortly after sunset. Keep
> the building, its position in frame, camera angle, focal length, roofline,
> conical slate turret and weathervane, chimneys, window arrangement, painted
> render and the autumn ivy on the façade exactly as they are. Change only the
> light: deep blue evening sky with the last warm light draining off the
> hillside behind, the house falling into silhouette, and **warm lamplight in
> the ground-floor and first-floor windows** — a domestic tungsten glow spilling
> faintly onto the gravel and the planters, not floodlighting. Turret and upper
> windows mostly dark. No people, no cars, no signage, no added buildings,
> no exterior floodlights, no string lights, no illuminated hotel sign.
> Photographic, natural, restrained contrast; fine grain; no HDR, no bloom.

If the dusk frame comes back with the whole façade lit like a hotel exterior,
reject it. The move works because the house looks *lived in*, not marketed.

## After the files land

1. Convert to `.jpg` if the generator emitted PNG — the 2.3 MB PNGs that came
   back first time became 175–200 KB JPEGs with no visible loss, and only
   `.jpg` gets WebP derivatives. Then `pnpm optimize:media`.
2. `pnpm build` — the variants join the rotation automatically.
3. `pnpm test:enniskeen` — the journey suite asserts the swap for real: it
   pins the clock to 21:00 and requires the visible frame to change, pins it
   to 12:00 and requires the daytime frame back, and separately requires every
   variant present on disk to reach the page.
4. Add an entry per file to `research/concept-reviews/image-provenance.md`
   under **Generated imagery**, recording the reference plate and the
   change-the-light-only boundary. Do this in the same commit as the images.

## Where the reference photographs live now

The hotel's own photographs were moved out of `public/` on 31 July 2026 and
are held at `research/concept-reviews/evidence/hotel-enniskeen/` — nineteen
frames including `enniskeen-house.jpg`, the original reference behind the day
plate. They were being served at guessable production URLs while referenced
nowhere in `src/`, against the privacy decision that the public site carries
AI imagery only. See the "Withdrawn from the deploy boundary, still held"
section of `research/concept-reviews/image-provenance.md`.

They remain available for personal outreach material and for any future
faithful visualisation. For *this* hero, still generate from the existing day
plate rather than from them, for the composition reason given above.
