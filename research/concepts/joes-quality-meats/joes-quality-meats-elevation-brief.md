# Joe's Quality Meats — elevation brief: 6 Main Street, deli at the back, no site

Written 23 August 2026. **jar** / counter. Distinct from Smalls. Not a café.

**Status: Applied elevation 14 September 2026 (supersedes 23 August 2026 draft). Pinned by `tools/test/test-joes-quality-meats-elevation.mjs`.**

## The organising principle
Traditional Irish high-street butcher shop and rear delicatessen at 6 Main Street. Two counters in depth: fresh cuts at the front, hot savoury bakes and Cornish pasties at the back.

## The essence
Meats on Main Street. A wee deli at the back.

## Applied elevation moves (14 September 2026)
1. **Photographic hero**: Shopfront on Main Street in soft morning light with butcher's awning and white-tiled interior (`joes-quality-meats-hero-main-street.jpg`).
2. **Dual-counter photographic structure**:
   - `joes-quality-meats-counter-case.jpg` illustrating the front butchery case and fresh prime cuts.
   - `joes-quality-meats-deli-pasties.jpg` illustrating the rear deli counter and fresh Cornish pasties.
3. **Typography & palette**: Rich traditional butcher claret, porcelain white, and warm butcher paper using Fraunces and Karla.
4. **Honesty & Boundaries**:
   - Pinned facts: 6 Main Street, BT33 0AD, 028 4372 2221.
   - Distinct from Smalls (Shopping Centre) and Vintage etc (4 Main Street).
   - Butcher/deli, not a café (no tables, no dining menu, no restaurant reservations).
   - Authentic customer review quotes (Kim and Josephine).
   - Facebook handoff for daily baked specials; no invented website.

## Image generation specifications

All images generated and placed in `public/media/concepts/joes-quality-meats/`:

1. **Hero plate**: `joes-quality-meats-hero-main-street.jpg`
   - Aspect / Size: 16:9 landscape (1536×1024)
   - Prompt: *An architectural documentary photograph of a traditional Irish butcher shopfront on Main Street in Newcastle County Down, painted deep oxblood fascia with discreet gold lettering, butcher awning, soft morning coastal daylight, clean plate glass window showing white-tiled shop interior, no people, no readable phone numbers or prices, authentic high street photography.*
   - In use in `src/concepts/joes-quality-meats/home.astro`.

2. **Counter case plate**: `joes-quality-meats-counter-case.jpg`
   - Aspect / Size: 4:3 landscape (1200×900)
   - Prompt: *An artisanal food documentary photograph of a traditional town butcher display case: fresh prime cuts of beef, pork chops, and artisan sausages arranged on white enamel butcher trays with fresh rosemary sprigs, white metro tile wall behind, spotless glass refrigeration counter, warm shop lighting, no people, no price tags or labels, appetizing craftsmanship.*
   - In use in `src/concepts/joes-quality-meats/home.astro`.

3. **Deli pasties plate**: `joes-quality-meats-deli-pasties.jpg`
   - Aspect / Size: 4:3 landscape (1200×900)
   - Prompt: *A close-up artisanal food photograph of freshly baked golden Cornish pasties and hot savory pies resting on greaseproof butcher paper on a wooden deli counter at the back of the butcher shop, warm ambient light, flaky golden brown crust, rustic charm, appetizing and fresh, no people, no text.*
   - In use in `src/concepts/joes-quality-meats/home.astro`.

## Honesty / tests
Pinned by `tools/test/test-joes-quality-meats-elevation.mjs`:
- Assert 6 Main Street, BT33 0AD, 028 4372 2221.
- Assert butcher/deli, not café.
- Assert Facebook handoff; assert no owned site.
- Do not merge with Smalls or Vintage etc.
