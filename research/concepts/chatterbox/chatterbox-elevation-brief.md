# Chatterbox Day Nursery — elevation brief: Bryansford Road, a 2004 door, a static site

Written 23 August 2026, from chatterboxkids.co.uk (About, Contact) and Google/Bing listings. Facebook login-walled; Nov 2025 training post is a snippet. This is **none of the five**. Not a café. Bench pull.

**Status: Applied elevation 14 September 2026 (supersedes 23 August 2026 draft). Pinned by `tools/test/test-chatterbox-elevation.mjs`.**

## The organising principle
The site already holds rooms, fees, meals, testimonials. Facebook already holds the staff week. Google/Bing already hold the pin.
So: A place — phone / the form they already have. 75 Bryansford Road, Paul and Jane, the hours — the concept. Do not invent a nursery brand system or a fake “book a tour” app.

## The essence
Family-run care in Newcastle since 2004. The website is still separate HTML pages.

## Applied elevation moves (14 September 2026)
1. **Photographic hero**: Full-bleed figure/img/figcaption pattern with eager loading (`chatterbox-hero-bryansford-road.jpg`), framed by designed warm plaster and terracotta styling.
2. **Signature component**: `DayArc.astro`, a drawn enamel-and-brass dial tracking the 07.30–18:00 Monday–Friday hours ritual, paired with the established `DoorPlate.astro`.
3. **Supporting photographic plates**:
   - `chatterbox-garden-play.jpg` illustrating the outdoor nature play garden and dry-stone boundary.
   - `chatterbox-hall-entry.jpg` illustrating the calm interior entryway with timber floors and coat pegs.
4. **Honesty & Boundaries**:
   - Spoken strictly as the nursery. No studio meta-voice.
   - Preserves verified first-party facts: 75 Bryansford Road, BT33 0LE, 028 4372 5805, Paul and Jane O'Connor, South Eastern Trust registration.
   - Replaced generic contact box with first-party links to official contact and fees pages. No scraped fee amounts; no fake tour bookings; no children's photos.

## Image generation specifications

All images generated and placed in `public/media/concepts/chatterbox/`:

1. **Hero plate**: `chatterbox-hero-bryansford-road.jpg`
   - Aspect / Size: 16:9 landscape (1536×1024)
   - Prompt: *An illustrative architectural photograph of the exterior entrance of a handsome Victorian family house day nursery on Bryansford Road in Newcastle County Down, warm morning coastal light, garden path with planted greenery leading to a welcoming painted front door with a brass door plate, Mourne mountains hinted softly in the far background, no readable text, no people, high realism documentary architectural style.*
   - In use in `src/concepts/chatterbox/home.astro`.

2. **Garden supporting plate**: `chatterbox-garden-play.jpg`
   - Aspect / Size: 4:3 landscape (1200×900)
   - Prompt: *An illustrative documentary photograph of an outdoor nature play garden behind a coastal family day nursery in Newcastle County Down, lush green grass, low wooden timber balance beams, small planter boxes with lavender and herbs, dappled sunlight falling through garden trees, dry stone wall in the background, no people, no children, peaceful and serene morning atmosphere.*
   - In use in `src/concepts/chatterbox/home.astro`.

3. **Hallway supporting plate**: `chatterbox-hall-entry.jpg`
   - Aspect / Size: 4:3 landscape (1200×900)
   - Prompt: *An illustrative interior photograph of the bright and tranquil entrance hallway of a refurbished Edwardian nursery house, polished timber floor, row of low wooden coat pegs and cubbies, soft morning window light from a side window illuminating the warm painted walls, no people, no children, no text, homely and calm documentary architectural style.*
   - In use in `src/concepts/chatterbox/home.astro`.

## Honesty / tests
Pinned by `tools/test/test-chatterbox-elevation.mjs`:
- Assert 75 Bryansford Road, BT33 0LE, 028 4372 5805, info@chatterboxkids.co.uk.
- Assert nursery, not café.
- Assert no Instagram link, no form tags, no scraped fee figures.
- Assert all 3 media assets present.
