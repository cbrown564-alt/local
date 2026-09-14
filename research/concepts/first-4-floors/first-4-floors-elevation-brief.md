# First 4 Floors — elevation brief: Unit 2, caravan floors, a live 2026 site

Written 23 August 2026. Kind: none of the five / trade showroom. Same industrial stretch as Stile Glass — do not merge them.

**Status: Applied elevation 14 September 2026 (supersedes 23 August 2026 draft). Pinned by `tools/test/test-first-4-floors-elevation.mjs`.**

## The organising principle
Trade showroom on Castlewellan Road specializing in supply and fit for carpets, vinyl, laminate, LVT waterproof, and bespoke caravan flooring.

## The essence
Flooring specialists in Newcastle. Including the caravan.

## Applied elevation moves (14 September 2026)
1. **Photographic hero**: Showroom interior photographic plate (`first-4-floors-hero-showroom.jpg`) with veil overlay, eager loading, and oak/paper palette styling.
2. **Signature component**: `SampleBook.astro`, a drawn sample book illustrating the physical swatches (carpet, vinyl, laminate, LVT waterproof) alongside the caravan offcut, paired with `CaravanDocket.astro`.
3. **Supporting photographic plates**:
   - `first-4-floors-counter-samples.jpg` illustrating showroom counter swatches, tape measure, and order pad.
   - `first-4-floors-caravan-refloor.jpg` illustrating bespoke caravan re-flooring cut to curved furniture.
4. **Honesty & Boundaries**:
   - Spoken strictly as the showroom at Unit 2, 63a Castlewellan Road.
   - Pinned facts: Unit 2, BT33 0JX, 028 4372 7676, `first4floorsni@gmail.com`, `firstfloornewcastle.co.uk`.
   - Distinct from 63 and not merged with Stile Glass. No invented opening year chrome. No form elements.

## Image generation specifications

All images generated and placed in `public/media/concepts/first-4-floors/`:

1. **Hero plate**: `first-4-floors-hero-showroom.jpg`
   - Aspect / Size: 16:9 landscape (1536×1024)
   - Prompt: *An illustrative architectural photograph of the interior of First 4 Floors showroom at Unit 2 on Castlewellan Road in Newcastle County Down: tall rolls of carpet standing neatly along the wall, tiered wooden racks of luxury vinyl tile and laminate flooring samples, natural daylight streaming across laid oak timber flooring planks, clean and spacious trade showroom, no people, no readable text or brand logos, high realism architectural photography.*
   - In use in `src/concepts/first-4-floors/home.astro`.

2. **Counter samples supporting plate**: `first-4-floors-counter-samples.jpg`
   - Aspect / Size: 4:3 landscape (1200×900)
   - Prompt: *An illustrative close-up still life photograph on a wooden showroom counter: open fanned sample swatches of neutral textured carpets, vinyl flooring and timber wood planks, next to a kraft paper order notebook and a retractable steel measuring tape, warm natural workshop light, no people, no readable text, authentic trade craftsman atmosphere.*
   - In use in `src/concepts/first-4-floors/home.astro`.

3. **Caravan re-floor supporting plate**: `first-4-floors-caravan-refloor.jpg`
   - Aspect / Size: 4:3 landscape (1200×900)
   - Prompt: *An illustrative documentary photograph inside a British touring caravan undergoing a custom flooring replacement: clean new fitted neutral carpet and timber-look vinyl cut smoothly around curved retro built-in caravan seating and wheel arch cupboards, measuring tools on the floor, soft natural light streaming in through caravan windows, no people, no text, meticulous craftsman interior installation style.*
   - In use in `src/concepts/first-4-floors/home.astro`.

## Honesty / tests
Pinned by `tools/test/test-first-4-floors-elevation.mjs`:
- Assert Unit 2, 63a Castlewellan Road, BT33 0JX, 028 4372 7676, first4floorsni@gmail.com.
- Assert caravan specialty and hours.
- Assert all 3 media assets and sample book signature component.
- Assert not merged with Stile Glass.
