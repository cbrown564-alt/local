# Concept image provenance

Internal record of how each concept image was made and whether a concept still
uses it. Not deployed — the public credits for third-party photographs live in
`public/images/place/ATTRIBUTION.md`, which is served with the site to honour
those licences.

**Check this file before writing a sourcing claim.** The "Sources & limits"
block on a transformation page describes the imagery inside its concept, so a
withdrawn image makes that copy false. On 26 July 2026, three public case
studies were found describing photography that had already been removed —
Mourne Cycles, Donard Veterinary and Castle Farm — because commit `b9e28aa`
replaced concept hero imagery with drawn service panels and nothing re-read the
sourcing copy afterwards.

`node scripts/check-public-assets.mjs` reports images held in `public/images/`
that no longer appear anywhere in `src/`.

## Generated imagery

Every page carrying one of these labels it as generated on the page itself.

- `dundrum-inn-faithful-exterior.jpg` — **in use.** AI-generated faithful visualisation based on the Inn's own exterior hero photograph, downloaded from its GuestDiary CDN on 26 July 2026 and held privately at `.tmp/concept-subject-references/dundrum-inn-exterior-reference.jpg`. The prompt preserved the yellow-and-black terraced façade, shopfront, roof and window rhythm, blue-edged awning, hanging sign, benches, barrels, baskets, toucan feature and neighbouring blue/purple fronts. It changed only lighting, minor street clutter and framing; it expressly forbade an invented bay view, mountains, garden, hotel extension or new architecture. The concept labels the image as generated in the first viewport and its alt text repeats the reference boundary. The rejected first attempt (`dundrum-inn-hero-generated-v1.png`) invented a cream country inn and false bay setting and was removed.
- `hugh-mccanns-faithful-room.jpg` — **in use.** AI-generated faithful visualisation based on the venue's own dining-room photograph from its public site, downloaded on 27 July 2026 and held privately at `.tmp/hugh-reference-venue.jpg`. The prompt preserved the broad window bays, room scale, table settings, garden character and Mourne mountain profile while forbidding people, invented architecture, a ballroom, ceremony dressing, a terrace or a sea view. The concept labels the image as a faithful visualisation in the first viewport and its alt text repeats the reference boundary.
- `enniskeen-faithful-house.png` — **in use.** AI-generated faithful visualisation based on a reference photograph of the real Enniskeen Country House Hotel. The prompt preserved the painted-render gabled façade, turret, chimney placement, window rhythm and ivy while removing parked cars and a streetlamp.
- `enniskeen-faithful-room6.png` — **in use.** AI-generated faithful visualisation based on the hotel's reference photograph of Room 6's distinctive matching pink basin and bath. The prompt preserved the fixture colour, forms and chrome cross-head tap arrangement and forbade invented luxury features.
- `bucks-head-faithful-hearth.png` — **in use.** AI-generated faithful visualisation based on the pub's reference photograph of its real hearth. The prompt preserved the rounded arch, brick chimney breast, stove, antlers, wall colours, seating and floor materials while forbidding redesign or invented amenities.
- `enniskeen-faithful-room9.png` — **not in use since 26 July 2026.** AI-generated faithful visualisation based on the hotel's reference photograph of Room 9's compact beige-tiled en-suite. The prompt preserved the wall-mounted basin, mirror, magnifying mirror and towel-ring arrangement and forbade an invented bath or spa setting.
- `cupla-faithful-visualisation.jpg` — **not in use since 26 July 2026.** AI-generated faithful visualisation based on the photographed frontage at 105 Main Street, Dundrum. The source reference was an August 2024 Google Maps user photo; the prompt forbade invented seating, people, products or amenities.
- `mourne-cycles-faithful-visualisation.jpg` — **not in use since 26 July 2026.** AI-generated faithful visualisation based on an April 2026 Mourne Cycles customer photo. The prompt preserved the photographed bicycle, red fence, paving and numbered blue bin while forbidding invented shop, rider, trail or product context. The reference evidences the bicycle and its surroundings only, not the ownership of the yard, so neither the caption nor the alt text called the fence the shop's own premises (corrected 25 July 2026 after the re-review flagged the alt text as an unsourced premises claim).

## Third-party photographs

Credited publicly in `public/images/place/ATTRIBUTION.md`. Status here.

- `mournes-newcastle.jpg`, `businesses-main-street-dundrum.jpg`, `main-street-1.jpg`, `houses.jpg`, `boats-moored-at-newcastle-harbour.jpg`, `central-promenade.jpg` — **in use** on the public site.
- `kent-amusements-exterior-2023.jpg` — **not in use since 26 July 2026.** Still held, so its CC BY-SA 2.0 credit stays in the public file.
- `donard-veterinary-exterior-2023.jpg` — **not in use since 26 July 2026.** Still held, so its CC BY-SA 2.0 credit stays in the public file.

## Withdrawn

- `mourne-cycles-trail.jpg` — **deleted 25 July 2026.** Trek/Bontrager dealer marketing photography reused from the shop's own site, used decoratively at 20% opacity behind a hire panel with no recorded licence. Removing it cleared the only outstanding asset-rights blocker on that concept. The Mourne Cycles case study went on claiming the concept reused this imagery until 26 July 2026.
