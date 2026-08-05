# Concept image provenance

Internal record of how each concept image was made and whether a concept still
uses it. Not deployed — the public credits for third-party photographs live in
`public/media/place/ATTRIBUTION.md`, which is served with the site to honour
those licences.

**Check this file before writing a sourcing claim.** The "Sources & limits"
block on a transformation page describes the imagery inside its concept, so a
withdrawn image makes that copy false. On 26 July 2026, three public case
studies were found describing photography that had already been removed —
Mourne Cycles, Donard Veterinary and Castle Farm — because commit `b9e28aa`
replaced concept hero imagery with drawn service panels and nothing re-read the
sourcing copy afterwards.

`node tools/check/check-public-assets.mjs` reports images held in `public/images/`
that no longer appear anywhere in `src/`.

## Site films ("One Day, Made Here")

- `media/home/<town>-film.{mp4,webm}`, `<town>-film-mobile.{mp4,webm}`,
  `<town>-film-poster.*`, `<town>-ambience.mp3` — **stand-ins in place** (4
  August 2026). Town hero films, one per town (Dundrum, Newcastle), shown in
  prototype E at `/prototypes/home/film/`. Assembled by
  `tools/pipeline/assemble-hero-film.mjs` from clips generated with Gemini
  Omni and ambience stems generated with ElevenLabs (treatment and prompts:
  `research/film/one-day-made-here.md`). The films are
  **generated, not footage**: the hero carries an on-page disclosure
  ("An imagined day … not footage") and the video aria-labels say the same.
  The clips currently in `research/film/clips/<town>/` are `--demo`
  tone-gradient stand-ins (marked by a `.demo` file) so the hero can be
  reviewed end-to-end. **Stand-ins must not deploy**: replace with the Gemini
  Omni renders, rerun `pnpm assemble:film`, and update this entry's status.

## Generated narration

- `media/prototypes/showcase/showcase-narration-hugh-mccanns.mp3` — **internal
  prototype only** (4 August 2026). 24 seconds of synthetic speech generated
  with ElevenLabs (`eleven_multilingual_v2`, voice "Irish Cultural Guide",
  `NPWroowF4phQhaPWjXPj`) for demonstration 05 on `/prototypes/showcase/`. It
  is **not a recording of anyone**, and no real person's voice was cloned. The
  script describes the published Hugh McCann's concept and makes no claim the
  concept does not already make. If narration ever ships on a guest-facing
  page it must be disclosed as synthetic on that page, and the script must be
  checked against the concept's own copy the same way the "Sources & limits"
  block is.

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

- Donard Veterinary pet illustrations and catchment map — **in use** (31 July
  2026). Inline SVG line drawings in `DvPetIllustrations.astro` and
  `DvCatchmentMap.astro` — warm, obviously commissioned, disclosed on the page
  as illustrations and an indicative map, not photographs of patients or a
  boundary survey.

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
- `scopers-badge.png` and `scopers-logo.jpg` — **in use / held.** The bar's own
  badge: the purple pin reading "SCOPERS", a circular produce motif and
  "DUNDRUM · CO. DOWN". The concept header uses it directly in place of the
  redrawn stamp mark it previously carried. `scopers-logo.jpg` is the
  higher-resolution copy supplied to the repository on 31 July 2026;
  `scopers-badge.png` is that file trimmed, with its white ground keyed out so
  the pin sits on the concept's buttermilk. A first copy had been downloaded
  from the logged-out Instagram profile the same day at the only size it
  serves, 100x100, and was replaced by the larger file. **Confirm where the
  larger copy came from before making any sourcing claim about it**, and before
  using the mark in print.
- `bettys-butters-brand-mark.png` and `bettys-butters-source-butter.jpg` —
  **in use (mark) / held (source butter).** Downloaded from the Betty's Better
  Butters public homepage on 27 July 2026. The mark remains the concept
  favicon, header seal and ornaments. The butter-on-a-board photograph stays
  in `public/` as provenance for the maker's own visual language; the live
  melt hero now uses the generated plate below rather than this file.
- `bettys-butters-generated-melt.jpg`, `bettys-butters-generated-treat.jpg`
  and `bettys-butters-generated-staple.jpg` — **in use** (1 August 2026).
  AI-generated illustrative visualisations in the table register: a knife
  through soft butter on a wooden board (melt hero), steak with a melting
  herb-butter knob (treat / Café de Paris), and new potatoes with herb butter
  melting through (staple / Garlic & Herb). None depicts the maker's real
  range, packaging or premises. Guest captions describe the plate only; the
  concept banner states "Serving imagery is AI-generated." Flavour names
  beside the plates remain illustrative placeholders. Responsive WebP
  derivatives at 640 and 1265.
- `bettys-butters-generated-cube-herb.jpg`,
  `bettys-butters-generated-cube-chilli.jpg`,
  `bettys-butters-generated-cube-paris.jpg` and
  `bettys-butters-generated-cube-maple.jpg` — **in use** (1 August 2026).
  AI-generated illustrative butter-cube stills for the Tuesday range wheel
  (Garlic & Herb, Chilli & Lime, Café de Paris, Maple & Sea Salt). Same
  disclosure boundary as the serving plates: not the maker's real products;
  flavour names remain placeholders. Responsive WebP at 640 and 1265.

## Generated imagery

### Generated map previews

- `public/media/maps/town-coverage-generated.png` — **in use** (5 August
  2026). AI-generated illustrative map of Dundrum and
  Newcastle, revised to place Dundrum Castle above Dundrum village, Murlough
  Beach between the towns, Royal County Down Golf Course south-east of
  Newcastle, and Tollymore Forest inland south-west of Newcastle. The saved
  version has all generated pin markers removed. Town labels, business pins,
  focus states, hover cards and links are HTML overlays on the interactive
  site map. The page labels the artwork as AI-generated and indicative; it is
  not a survey or navigational map.
- `public/media/maps/enniskeen-estate-generated.png`,
  `donard-catchment-generated.png`, `mourne-cycles-trails-generated.png`,
  `scopers-larder-generated.png` and `dundrum-inn-place-generated.png` —
  **in use** (5 August 2026). AI-generated illustrative
  map previews made with the built-in OpenAI image generation tool. They show
  the published place relationships and visual themes described by their
  corresponding concepts, but are indicative drawings rather than surveys,
  exact site plans, navigational routes, or evidence of current business
  operations. Their readable labels and legends are HTML overlays, with a
  separate text key on small screens. Each figure visibly labels the artwork
  as AI-generated and states its concept-specific evidence boundary.

- `research/film/stills/dundrum/01-pre-dawn-bay.png`, `02-first-light-mudflats.png`, `04-cafe-window-bay.png` and `05-golden-hour-castle.png` — **internal film reference stills** (regenerated 5 August 2026). AI-generated with the built-in OpenAI image generation tool, grounded in Colin Park's real view "Dundrum Inner Bay from east of Downshire Bridge with view towards Dundrum" (Geograph 7677782, CC BY-SA 2.0) and Eschadew's supporting castle detail "Dundrum Castle from outside" (CC BY-SA 4.0). The frames preserve the real camera direction, tidal-channel pattern, village placement, wooded hill and the castle's small distant relationship to the bay while changing light, mist, birds, a tiny walker and, for 04, adding a generic café interior. Shots 02 and 05 were edited from the new 01 master for continuity. They remain generated visualisations, not documentary photographs or evidence of exact weather, activity or a real café view.
- `research/film/stills/dundrum/03-morning-main-street.png` and `06-blue-hour-street.png` — **internal film reference stills** (regenerated twice 5 August 2026 after local-accuracy review). AI-generated with the built-in OpenAI image generation tool, grounded in Eric Jones's real photograph "Crawling Sunday afternoon traffic in Main Street, Dundrum" (Geograph 4140783, CC BY-SA 2.0). They preserve one documented camera position: the bus-stop and road markings, exact stepped building row, grey three-storey quoined house, roofs, chimneys, doors, windows, church tower, lamps and overhead wires. Shot 03 changes traffic, rain and early-morning light; 06 is a blue-hour edit of 03. The tool followed the source's 4:3 frame, so both were centre-cropped identically to 1440×810 after generation; the crop added no content. Four Eric Jones photographs from 11 April 2025 were also checked to identify the rejected first pair's errors: it had conflated separate stretches of Main Street, invented a continuous shop row, and changed locally recognisable façades. Those 2025 images were not composited into the replacement pair. The fictional castle-at-the-end-of-the-street geography remains explicitly removed because the castle is not visible from this viewpoint. These are generated visualisations, not documentary photographs or evidence of exact businesses or activity. Source files and attribution: `research/film/stills/dundrum/sources/README.md`.
- `research/film/stills/newcastle/01-pre-dawn-beach.png`, `02-first-light-ridge.png` and `04-midday-beach.png` — **internal film reference stills** (generated 5 August 2026). AI-generated with the built-in OpenAI image generation tool, grounded in Colin Park's real photograph "Beach and old groynes with view towards Newcastle, Co Down" (Geograph 7677784, CC BY-SA 2.0). The frames preserve one southwest beach camera position: old groyne posts, low-tide pools and sand, Murlough dune edge and rock armour, distant town skyline and the true Mourne profile. Shots 02 and 04 are atmosphere edits of 01. The old prompt's fictional open surf and enlarged Victorian town are explicitly removed. These remain generated visualisations, not documentary photographs or evidence of exact weather or activity.
- `research/film/stills/newcastle/03-morning-promenade.png` — **internal film reference still** (generated 5 August 2026). AI-generated with the built-in OpenAI image generation tool, grounded in Eric Jones's March 2025 photograph "Public gardens on the Central Promenade at Newcastle" (Geograph 8011492, CC BY-SA 2.0). It preserves the real gardens, railings, path, mature trees, modern lamp columns, breakwater, road, houses and mountain relationship while changing rain, traffic and early-morning light. It does not invent the old prompt's Victorian shop row, bike shop or ornate lamps.
- `research/film/stills/newcastle/05-golden-harbour.png` — **internal film reference still** (generated 5 August 2026). AI-generated with the built-in OpenAI image generation tool, using Eric Jones's 2019 Newcastle Harbour photographs (Geograph 6138550 as the primary camera position and 6138558 as a boat-and-wall reference, CC BY-SA 2.0). It preserves the strongly tidal low-water basin, grounded boats, harbour walls, houses and steep wooded mountain instead of replacing them with boats floating on generic calm water.
- `research/film/stills/newcastle/06-dusk-amusements.png` — **internal film reference still** (generated 5 August 2026). AI-generated with the built-in OpenAI image generation tool, grounded in Eric Jones's October 2025 photograph "Kent Amusements overlooking the Central Promenade, Newcastle" (Geograph 8170874, CC BY-SA 2.0). It preserves the current red-and-grey façade, fascia, glass frontage, yellow accessibility ramp, signs, road and perspective while changing only traffic, rain and blue-hour light. It intentionally uses a separate real camera position from 03 rather than inserting a fictional arcade into the promenade gardens. All six Newcastle outputs were cropped without content addition and normalised to 1600×900. Full source roles and attribution: `research/film/stills/newcastle/sources/README.md`.

Every page carrying one of these labels it as generated on the page itself.

- `donard-hotel-exterior-visualisation.jpg` — **in use.** AI-generated faithful
  visualisation based on Eric Jones's 24 March 2023 photograph of The Donard's
  Main Street facade, licensed CC BY-SA 2.0 and retained at
  `research/concepts/donard-hotel/evidence/source-eric-jones-2023.jpg`.
  The prompt preserved the brick facade, corner turret, roofline, window rhythm,
  perspective and neighbouring edges; it raised the winter shutters, removed
  parked cars and changed the light to a clear late-summer afternoon. The first
  viewport labels it a faithful visualisation and links both the source and
  licence.
- `castle-farm-weekly-box-faithful.webp` — **in use.** AI-generated faithful visualisation based on Castle Farm's published mixed-box photograph retained at `research/concepts/castle-farm/evidence/castle-farm-box.jpg`. The prompt preserved the recognisable broccoli, corn, peppers, onions, potatoes, eggs, chicken and packaged butcher items while removing labels and supermarket branding and recomposing the contents in a navy crate. The concept labels the image in the first viewport and makes no claim about exact current contents or availability.
- `dundrum-inn-faithful-exterior.jpg` — **in use.** AI-generated faithful visualisation based on the Inn's own exterior hero photograph, downloaded from its GuestDiary CDN on 26 July 2026 and held privately at `.tmp/concept-subject-references/dundrum-inn-exterior-reference.jpg`. The prompt preserved the yellow-and-black terraced façade, shopfront, roof and window rhythm, blue-edged awning, hanging sign, benches, barrels, baskets, toucan feature and neighbouring blue/purple fronts. It changed only lighting, minor street clutter and framing; it expressly forbade an invented bay view, mountains, garden, hotel extension or new architecture. The concept labels the image as generated in the first viewport and its alt text repeats the reference boundary. The rejected first attempt (`dundrum-inn-hero-generated-v1.png`) invented a cream country inn and false bay setting and was removed.
- `dundrum-inn-faithful-exterior-blue-hour.jpg` — **in use** (1 August 2026).
  AI-generated blue-hour sibling of the faithful exterior visualisation above,
  made for the concept's day-part hero. The reference was that existing daytime
  plate rather than the original GuestDiary photograph, so the same reference
  boundary and prohibitions carry over — no invented bay view, mountains,
  garden, hotel extension or new architecture — and the façade, awning, signs,
  benches, barrels, baskets, toucan and neighbouring fronts stay fixed between
  day parts. The prompt changed only the sky, street light and warm interior
  glow, and expressly forbade people or new signage. The second frame changes
  atmosphere only and never represents whether the bar is open: it is
  decorative, carries an empty alt, and sits behind the same first-viewport
  generated-image disclosure as the daytime plate, which names the blue-hour
  state. Responsive WebP at 640 and 1265.
- `hugh-mccanns-faithful-room.jpg` — **in use.** AI-generated faithful visualisation based on the venue's own dining-room photograph from its public site, downloaded on 27 July 2026 and held privately at `.tmp/hugh-reference-venue.jpg`. The prompt preserved the broad window bays, room scale, table settings, garden character and Mourne mountain profile while forbidding people, invented architecture, a ballroom, ceremony dressing, a terrace or a sea view. The concept labels the image as a faithful visualisation in the first viewport and its alt text repeats the reference boundary.
- `hugh-mccanns-faithful-room-dusk.jpg` — **in use** (4 August 2026). AI-generated dusk sibling of the faithful room visualisation above, edited from the existing daytime plate so the broad window bays, table settings, garden edge and Mourne profile stay fixed. The prompt changed only the time of day and warm interior illumination, and forbade people, new furniture, ceremony dressing, signage, terrace, sea view or extra windows. The page keeps the daytime plate as its no-JS and reduced-motion default, then swaps to dusk during the visitor's local evening hours; both states carry the same faithful-visualisation boundary in alt text and the visible caption.
- `hugh-mccanns-where-your-day-happens.jpg` — **in use** (4 August 2026). AI-generated illustrative hand-drawn geography plate showing only the published relationship between Hugh McCann's on Central Promenade, the Secret Garden, the Mourne Mountains, Dundrum Bay, Little Haven and The Avoca Hotel. It is an indicative drawing rather than a survey: no scale, route time, street network, extra building, garden, terrace or unsupported sightline is claimed. The page labels it "Indicative · not a survey" and repeats the boundary in alt text.
- `enniskeen-faithful-house.png` — **in use.** AI-generated faithful visualisation based on a reference photograph of the real Enniskeen Country House Hotel. The prompt preserved the painted-render gabled façade, turret, chimney placement, window rhythm and ivy while removing parked cars and a streetlamp.
- `enniskeen-faithful-house-dawn.jpg` and `enniskeen-faithful-house-dusk.jpg` —
  **in use** (31 July 2026). AI-generated faithful visualisations of the same
  view as `enniskeen-faithful-house.png`, at first light and at dusk, made for
  the concept's day-part hero. The reference was the existing
  `enniskeen-faithful-house.png` plate rather than the original photograph, so
  the three frames share one composition and the house does not appear to move
  when the hero swaps. The prompts preserved the painted-render gabled façade,
  conical slate turret and weathervane, chimneys, window rhythm and ivy, and
  changed only light and atmosphere — dawn mist and unlit windows; dusk sky
  with warm domestic lamplight in the lower windows. Both expressly forbade
  architectural change, people, cars, signage, exterior floodlighting and
  invented grounds. Delivered as PNG and converted to JPEG so the responsive
  WebP derivatives generate. Each variant carries its own
  "Provisional visualisation" caption on the page, and the daytime plate
  remains the pre-script state. Prompts and boundary: `research/concepts/hotel-enniskeen/enniskeen-day-part-hero-brief.md`.
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
  `src/concepts/hotel-enniskeen/content.ts` after the journey suite found them rendered with
  no provenance entry; confirm the generation details before relying on this
  record for a sourcing claim.
- `scopers-generated-chicken-burger.jpg`, `scopers-generated-loaded-fries.jpg`,
  `scopers-generated-carrots.jpg`, `scopers-generated-bread.jpg`,
  `scopers-generated-counter.jpg` and `scopers-generated-supper-table.jpg` —
  **in use.** AI-generated illustrative visualisations, generated 31 July 2026
  to the prompts in `research/concepts/scopers/scopers-image-brief.md` and delivered as 1402x1122
  PNGs, converted to JPEG for the site (originals held outside the repo at
  `.tmp/scopers-source-images/`). Unlike the `-faithful-` files elsewhere in
  this record, **none was made from a reference photograph** of Scopers, their
  food or their premises: they depict the *kind* of dish, counter and
  supper-club table described, not the real ones. The dish names and
  descriptions beside them are quoted from Scopers' own public Instagram
  captions, read 31 July 2026 — the words are theirs, the pictures are not.
  That boundary is carried in the lightened register settled 31 July 2026:
  each generated plate is captioned as a riff on the bar's own post, the
  concept banner states the imagery is AI-generated, and the case study's
  Sources & limits block says it in full. The prompts forbade faces,
  hands, logos, text and any recognisable Dundrum premises. The bar's own
  photography stays off the public site by the privacy decision of 31 July 2026
  and is reserved for personal outreach material.
- `risograph-chicken-burger.jpg`, `risograph-chicken-burger.mp4` and
  `risograph-chicken-burger.webm` — **in use.** AI-generated risograph-style
  illustration of the buttermilk chicken burger (dish and caption from the
  bar's 14 March Instagram post) plus a four-second animated loop made from
  it, delivered 7 August 2026 to the menu-cover spec in
  `research/concepts/scopers/scopers-image-brief.md` §7 and chosen over the
  photoreal macro originally specced there — an illustration is its own
  disclosure. Not a depiction of the real dish. The still is the midday
  day-part hero on `/concepts/scopers/` and the video's poster; the loop
  plays only in that frame, is stripped of audio, and falls back to the
  still under `prefers-reduced-motion`. The 1536x1024 PNG master
  (`risograph-chicken-burger.png`) sits alongside as the print-resolution
  source; webp derivatives and the webm are pipeline products of the jpg
  and mp4.
- `castle-farm-produce.jpg` — **in use.** AI-generated. Cropped by CSS to a
  190×43 window and shown as the concept's wordmark in the page header, so the
  visible slice reads as a brand mark rather than as photography. It is not the
  farm's own mark. Recorded 28 July 2026 after the journey suite found it
  rendered with no provenance entry.
- `enniskeen-faithful-room9.png` — **not in use since 26 July 2026.** AI-generated faithful visualisation based on the hotel's reference photograph of Room 9's compact beige-tiled en-suite. The prompt preserved the wall-mounted basin, mirror, magnifying mirror and towel-ring arrangement and forbade an invented bath or spa setting.
- `cupla-faithful-visualisation.jpg` — **not in use since 26 July 2026.** AI-generated faithful visualisation based on the photographed frontage at 105 Main Street, Dundrum. The source reference was an August 2024 Google Maps user photo; the prompt forbade invented seating, people, products or amenities.
- `mourne-cycles-faithful-visualisation.jpg` — **not in use since 26 July 2026.** AI-generated faithful visualisation based on an April 2026 Mourne Cycles customer photo. The prompt preserved the photographed bicycle, red fence, paving and numbered blue bin while forbidding invented shop, rider, trail or product context. The reference evidences the bicycle and its surroundings only, not the ownership of the yard, so neither the caption nor the alt text called the fence the shop's own premises (corrected 25 July 2026 after the re-review flagged the alt text as an unsourced premises claim).
- `mourne-cycles-bike-electric.jpg`, `mourne-cycles-bike-road.jpg` and `mourne-cycles-bike-mountain.jpg` — **in use.** AI-generated illustrative bike-category visuals added 31 July 2026 for the Electric, Road and Mountain terrain panels. They show the kind of bike and riding context named by each panel, not stock held by the shop or its premises; no product model, price or availability claim is attached to them.
- `mourne-cycles-hero.jpg` — **in use.** AI-generated illustrative landscape visual added 31 July 2026 for the concept's hero. It is a drawn riding context for the Mourne/Castlewellan route, not a photograph of the shop, its premises or a specific current trail condition.

## Third-party photographs

Credited publicly in `public/media/place/ATTRIBUTION.md`. Status here.

- `mournes-newcastle.jpg`, `businesses-main-street-dundrum.jpg`, `main-street-1.jpg`, `houses.jpg`, `boats-moored-at-newcastle-harbour.jpg`, `central-promenade.jpg` — **in use** on the public site.
- `kent-amusements-exterior-2023.jpg` — **not in use since 26 July 2026.** Still held, so its CC BY-SA 2.0 credit stays in the public file.
- `donard-veterinary-exterior-2023.jpg` — **not in use since 26 July 2026.** Still held, so its CC BY-SA 2.0 credit stays in the public file.
- `source-eric-jones-2023.jpg` — **source for an in-use visualisation.** Eric
  Jones, “The Main Street facade of the Donard Hotel,” 24 March 2023, CC BY-SA
  2.0. The public concept credits the photographer and licence beside the hero;
  the source file is held under
  `research/concepts/donard-hotel/evidence/`, not shipped as concept
  photography.

## Withdrawn from the deploy boundary, still held

Moved out of `public/` on 31 July 2026 and held under
`research/evidence/<slug>/`. All of these were businesses' own
photographs that no concept referenced any more, so they were being served at
guessable production URLs for no purpose — against the 31 July privacy
decision that the public site carries AI imagery only and a business's own
photographs are reserved for personal outreach. The masters are kept because
outreach material and future faithful visualisations still need them; the
`-640.webp` and `-1265.webp` derivatives were deleted rather than moved, since
they regenerate from the master with `pnpm optimize:media`.

Being out of `public/` stops them being served from here on. Git history was
rewritten on 31 July 2026 to drop the earlier `public/` copies, the mistaken
`evidence/` commit, and historical versions of the scored datasets — see
`docs/adr/0003-master-storage-and-history-purge.md`. That does not undo clones
or caches from the public period.

- **Enniskeen, 19 photographs** — `enniskeen-aerial`, `-afternoon-tea`,
  `-balcony`, `-bedroom`, `-bencrom-walker`, `-bike-hire`, `-dining-fire`,
  `-entrance`, `-gardens`, `-house`, `-lawn-view`, `-lounge`, `-mournes`,
  `-oak-restaurant`, `-old-house`, `-picnic-sign`, `-room6-bathroom`,
  `-room9-bathroom`, `-terrace-view`. The hotel's own published photography,
  harvested with the rest of its site on 23 July 2026. `enniskeen-house.jpg`
  is the reference behind `enniskeen-faithful-house.png`; the room and
  interior frames are the references behind the faithful Room 6 and Room 9
  visualisations. Held at
  `research/concepts/hotel-enniskeen/evidence/`.
- `bucks-head-hearth.jpg` — the pub's own hearth photograph, copied from its
  public site, and the reference behind `bucks-head-faithful-hearth.png`. The
  v1.1 evidence note already recorded that public-use permission was never
  documented, which made its presence in `public/` the weaker position. Held
  at `research/concepts/bucks-head/evidence/`.
- `castle-farm-box.jpg` — Castle Farm's published mixed-box photograph, the
  reference behind `castle-farm-weekly-box-faithful.webp`. Held at
  `research/concepts/castle-farm/evidence/`. The sourcing sentence in
  the Generated imagery entry above was updated to the new path in the same
  commit.

## Withdrawn

- `mourne-cycles-ebike.jpg` — **deleted 31 July 2026.** Trek dealer marketing
  photography of an electric bike, the same class of asset as
  `mourne-cycles-trail.jpg` below and reused from the same source with no
  recorded licence. It was missed by the 25 July removal and sat unreferenced
  in `public/` for six days afterwards, so the claim that the 25 July deletion
  "cleared the only outstanding asset-rights blocker on that concept" was not
  quite true when written. Deleted rather than held: unlike a business's own
  photograph there is no legitimate future use for it here.
- `mourne-cycles-trail.jpg` — **deleted 25 July 2026.** Trek/Bontrager dealer marketing photography reused from the shop's own site, used decoratively at 20% opacity behind a hire panel with no recorded licence. Removing it cleared the only outstanding asset-rights blocker on that concept. The Mourne Cycles case study went on claiming the concept reused this imagery until 26 July 2026.
