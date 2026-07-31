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

## Studio-drawn concept assets

Neither photographed nor generated: vector artwork drawn by hand for a concept.
The distinction matters because a mark reads as a business's identity, and none
of these businesses supplied one.

- `brand/enniskeen-mark.svg` — **in use** (31 July 2026). A line monogram drawn
  for the Enniskeen concept: an "E" beneath the conical turret roofline and
  weathervane finial taken from the building's own silhouette. Used as the
  concept's favicon, header lockup, section ornament and footer seal; the
  drawing lives in `src/components/enniskeen/EnkMark.astro` and this file is
  the favicon copy of it, kept in step by hand. **This is not Enniskeen's
  logo.** The hotel publishes no mark of its own; nothing on the concept
  presents this as the hotel's existing identity, and the concept's header
  keeps the text wordmark beside it. Withdraw it if the hotel ever supplies a
  real mark.
- `enniskeen-faithful-house-dawn.jpg` and `enniskeen-faithful-house-dusk.jpg` —
  **declared but not yet made.** The day-part hero in
  `src/components/enniskeen/EnkHero.astro` skips any variant whose file is
  absent, so these names are reserved rather than shipped. Prompts, the
  reference boundary and the post-generation steps — including adding a real
  entry per file under **Generated imagery** below — are in
  `research/enniskeen-day-part-hero-brief.md`.

## Business-owned site assets

- `douglas-cromie-logo.png` and `douglas-cromie-forecourt.jpg` — **in use.**
  Recovered on 27 July 2026 from Douglas & Cromie's archived January 2024
  public homepage. The first is the dealer's slate wordmark; the second is one
  of the vehicle photographs the business selected for its homepage slider.
  The concept does not present the photographed cars as current inventory.
- `kmb-logo.png`, `kmb-saint-patricks-ronans.jpg` and
  `kmb-rowallane-credit-union.jpg` — **in use.** Downloaded from the Kelly,
  McEvoy & Brown public site and the matching Magheralin ecclesiastical and
  Saintfield commercial project pages on 27 July 2026. The concept uses the
  firm's mark directly. Each photograph is attached only to its named project;
  the other register entries remain text-only rather than implying an
  unsourced image match.
- `scopers-badge.png` — **in use.** Downloaded from Scopers' public Instagram
  profile (`@scopersdundrum`) on 31 July 2026 at the only size the logged-out
  page serves, 100x100. It is the bar's own round purple badge — "SCOPERS",
  a circular produce motif, "DUNDRUM · CO DOWN" — and the concept header now
  uses it directly in place of the redrawn stamp mark it previously carried.
  Too small for print; the one-sheet needs a larger copy from the business or
  a redraw before it is used at that size.
- `bettys-butters-brand-mark.png` and `bettys-butters-source-butter.jpg` —
  **in use.** Downloaded from the Betty's Better Butters public homepage on
  27 July 2026. The first is the business's mountain-ring mark. The second is
  the butter-on-a-board photograph used as that site's hero background. The
  concept uses both directly and does not present the illustrative flavour
  names as photographed products.

## Generated imagery

Every page carrying one of these labels it as generated on the page itself.

- `donard-hotel-exterior-visualisation.jpg` — **in use.** AI-generated faithful
  visualisation based on Eric Jones's 24 March 2023 photograph of The Donard's
  Main Street facade, licensed CC BY-SA 2.0 and retained at
  `research/concept-reviews/evidence/donard-hotel/source-eric-jones-2023.jpg`.
  The prompt preserved the brick facade, corner turret, roofline, window rhythm,
  perspective and neighbouring edges; it raised the winter shutters, removed
  parked cars and changed the light to a clear late-summer afternoon. The first
  viewport labels it a faithful visualisation and links both the source and
  licence.
- `castle-farm-weekly-box-faithful.webp` — **in use.** AI-generated faithful visualisation based on Castle Farm's published mixed-box photograph retained at `public/images/castle-farm-box.jpg`. The prompt preserved the recognisable broccoli, corn, peppers, onions, potatoes, eggs, chicken and packaged butcher items while removing labels and supermarket branding and recomposing the contents in a navy crate. The concept labels the image in the first viewport and makes no claim about exact current contents or availability.
- `dundrum-inn-faithful-exterior.jpg` — **in use.** AI-generated faithful visualisation based on the Inn's own exterior hero photograph, downloaded from its GuestDiary CDN on 26 July 2026 and held privately at `.tmp/concept-subject-references/dundrum-inn-exterior-reference.jpg`. The prompt preserved the yellow-and-black terraced façade, shopfront, roof and window rhythm, blue-edged awning, hanging sign, benches, barrels, baskets, toucan feature and neighbouring blue/purple fronts. It changed only lighting, minor street clutter and framing; it expressly forbade an invented bay view, mountains, garden, hotel extension or new architecture. The concept labels the image as generated in the first viewport and its alt text repeats the reference boundary. The rejected first attempt (`dundrum-inn-hero-generated-v1.png`) invented a cream country inn and false bay setting and was removed.
- `hugh-mccanns-faithful-room.jpg` — **in use.** AI-generated faithful visualisation based on the venue's own dining-room photograph from its public site, downloaded on 27 July 2026 and held privately at `.tmp/hugh-reference-venue.jpg`. The prompt preserved the broad window bays, room scale, table settings, garden character and Mourne mountain profile while forbidding people, invented architecture, a ballroom, ceremony dressing, a terrace or a sea view. The concept labels the image as a faithful visualisation in the first viewport and its alt text repeats the reference boundary.
- `enniskeen-faithful-house.png` — **in use.** AI-generated faithful visualisation based on a reference photograph of the real Enniskeen Country House Hotel. The prompt preserved the painted-render gabled façade, turret, chimney placement, window rhythm and ivy while removing parked cars and a streetlamp.
- `enniskeen-faithful-room6.png` — **in use.** AI-generated faithful visualisation based on the hotel's reference photograph of Room 6's distinctive matching pink basin and bath. The prompt preserved the fixture colour, forms and chrome cross-head tap arrangement and forbade invented luxury features.
- `bucks-head-faithful-hearth.png` — **in use.** AI-generated faithful visualisation based on the pub's reference photograph of its real hearth. The prompt preserved the rounded arch, brick chimney breast, stove, antlers, wall colours, seating and floor materials while forbidding redesign or invented amenities.
- `enniskeen-generated-estate.jpg`, `enniskeen-generated-balcony.jpg`,
  `enniskeen-generated-afternoon-tea.jpg`, `enniskeen-generated-walker.jpg`,
  `enniskeen-generated-restaurant.jpg` and `enniskeen-generated-lounge.jpg` —
  **in use.** AI-generated illustrative visualisations. Unlike the `-faithful-`
  files above, these were not made from a reference photograph of the hotel:
  they depict generic country-house and Mourne estate scenes, which their alt
  text states ("a fictional country house in a wooded Mourne estate"). They
  carry no claim to show the real property, its rooms or its grounds. Recorded
  28 July 2026 from the repository's own `generatedVisuals` definitions in
  `src/data/enniskeen-site.ts` after the journey suite found them rendered with
  no provenance entry; confirm the generation details before relying on this
  record for a sourcing claim.
- `scopers-generated-chicken-burger.jpg`, `scopers-generated-loaded-fries.jpg`,
  `scopers-generated-carrots.jpg`, `scopers-generated-bread.jpg`,
  `scopers-generated-counter.jpg` and `scopers-generated-supper-table.jpg` —
  **placeholders, 31 July 2026.** Not yet generated. Each name currently holds
  a flat "IMAGE PENDING" card so the concept's layout is real while the
  generations are made to `research/scopers-image-brief.md`. The finished files
  will be AI-generated illustrative visualisations — made from no reference
  photograph of Scopers, their food or their premises — of dishes the bar
  describes in its own public Instagram captions. The dish names are theirs;
  the pictures are not, and the alt text, the visible provenance line in the
  food section and the case study's sources block all say so. **The concept
  must not be deployed or shown while the placeholders are in place.** Replace
  this entry with the real generation details before publication.
- `castle-farm-produce.jpg` — **in use.** AI-generated. Cropped by CSS to a
  190×43 window and shown as the concept's wordmark in the page header, so the
  visible slice reads as a brand mark rather than as photography. It is not the
  farm's own mark. Recorded 28 July 2026 after the journey suite found it
  rendered with no provenance entry.
- `enniskeen-faithful-room9.png` — **not in use since 26 July 2026.** AI-generated faithful visualisation based on the hotel's reference photograph of Room 9's compact beige-tiled en-suite. The prompt preserved the wall-mounted basin, mirror, magnifying mirror and towel-ring arrangement and forbade an invented bath or spa setting.
- `cupla-faithful-visualisation.jpg` — **not in use since 26 July 2026.** AI-generated faithful visualisation based on the photographed frontage at 105 Main Street, Dundrum. The source reference was an August 2024 Google Maps user photo; the prompt forbade invented seating, people, products or amenities.
- `mourne-cycles-faithful-visualisation.jpg` — **not in use since 26 July 2026.** AI-generated faithful visualisation based on an April 2026 Mourne Cycles customer photo. The prompt preserved the photographed bicycle, red fence, paving and numbered blue bin while forbidding invented shop, rider, trail or product context. The reference evidences the bicycle and its surroundings only, not the ownership of the yard, so neither the caption nor the alt text called the fence the shop's own premises (corrected 25 July 2026 after the re-review flagged the alt text as an unsourced premises claim).

## Third-party photographs

Credited publicly in `public/images/place/ATTRIBUTION.md`. Status here.

- `mournes-newcastle.jpg`, `businesses-main-street-dundrum.jpg`, `main-street-1.jpg`, `houses.jpg`, `boats-moored-at-newcastle-harbour.jpg`, `central-promenade.jpg` — **in use** on the public site.
- `kent-amusements-exterior-2023.jpg` — **not in use since 26 July 2026.** Still held, so its CC BY-SA 2.0 credit stays in the public file.
- `donard-veterinary-exterior-2023.jpg` — **not in use since 26 July 2026.** Still held, so its CC BY-SA 2.0 credit stays in the public file.
- `source-eric-jones-2023.jpg` — **source for an in-use visualisation.** Eric
  Jones, “The Main Street facade of the Donard Hotel,” 24 March 2023, CC BY-SA
  2.0. The public concept credits the photographer and licence beside the hero;
  the source file is held under
  `research/concept-reviews/evidence/donard-hotel/`, not shipped as concept
  photography.

## Withdrawn

- `mourne-cycles-trail.jpg` — **deleted 25 July 2026.** Trek/Bontrager dealer marketing photography reused from the shop's own site, used decoratively at 20% opacity behind a hire panel with no recorded licence. Removing it cleared the only outstanding asset-rights blocker on that concept. The Mourne Cycles case study went on claiming the concept reused this imagery until 26 July 2026.
