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
  `<town>-film-poster.*`, `<town>-ambience.mp3` — **Gemini Omni clips assembled**
  (5 August 2026). Town hero films, one per town (Dundrum, Newcastle), shown in
  prototype E at `/prototypes/home/film/`. Assembled by
  `tools/pipeline/assemble-hero-film.mjs` from twelve Gemini Omni exports
  (~6s each, padded to 8s) dropped into `research/film/clips/<town>/01–06-*.mp4`
  (treatment and prompts: `research/film/one-day-made-here.md`). Demo
  tone-gradient stand-ins and `.demo` markers removed. The films are
  **generated, not footage**: the hero carries an on-page disclosure
  ("An imagined day … not footage") and the video aria-labels say the same.
  Ambience stems generated 5 August 2026 with ElevenLabs Sound Effects
  (`eleven_text_to_sound_v2`, 10s, `loop: true`) via
  `pnpm generate:ambience` into `research/film/audio/<town>/`, then mixed to
  ~60s `<town>-ambience.mp3` beds by `pnpm assemble:film`. Review notes
  before any promotion off the prototype: (1) Newcastle 03 reads as a
  bike-shop promenade rather than the gardens still in
  `research/film/stills/newcastle/03-morning-promenade.png`; (2) Dundrum 06
  and Newcastle 06 were replaced 5 August 2026 evening with still-locked Omni
  re-renders (`Quiet_village_street_at_blue_…`,
  `Arcade_frontage_during_blue_hour_…`).

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

- `research/narration/audition/` — **held / research only** (10 August 2026).
  Five ~34-second takes of one ~450-character audition script, for casting the
  long-form narrator in
  [`narrative-audio-plan.md`](narrative-audio-plan.md) §5. ElevenLabs
  `eleven_v3` (`stability` 0.5). Two existing designed voices — MM Slate
  Narrator (`5vykio5nGgdGfnCLEAJ3`) and MM Harbour Brass
  (`UDLQOECmLD4JOGNJYCNd`) — plus three unsaved voice-design previews for a
  County Down long-form narrator (`azdpqdBfa91lH9AfZglr`,
  `uxNnEZY19YXVgxaDYabn`, `5D9bboiw6vTiK5plwIve`). None of the five **is a
  recording of anyone**, and no real person's voice was cloned; the three
  designed previews were generated from a written description of an accent and
  a manner, not from any person's audio. The script is the studio's own copy
  from [`the-elevation-method.md`](../docs/the-elevation-method.md) and makes
  no claim about any business. Names no place, per the plan's §3 policy.
  Unmastered — the five span 2.8 LU and two exceed the −1.5 dBTP ceiling, so
  none is fit for use as-is. Casting is undecided; nothing here advances to
  production, and the two unchosen designed previews expire unsaved.

  **Cast 10 August:** preview `5D9bboiw6vTiK5plwIve` (A5) was saved as
  **MM Down Narrator**, keeping the same ID. It is a designed voice, generated
  from a written description of a County Down accent and manner — **not a
  clone, and not a recording of anyone**. The two unchosen previews were left
  to expire.

- `research/narration/trailer/` — **held / research only** (10 August 2026).
  One 1 min 20s studio trailer, `trailer.mp3` (mastered) and `trailer-raw.mp3`
  (as generated). ElevenLabs `eleven_v3`, voice MM Down Narrator
  (`5D9bboiw6vTiK5plwIve`), `stability` 0.5, five audio tags. Script and its
  honesty check: `trailer/script.md`. Speaks in studio voice about the studio's
  own method; names no business, no client and no place. The two figures it
  states — twenty businesses looked at, roughly sixty faults found — are
  auditable to `src/site/data/transformation-details.ts`. No testimonial, no
  ranking, no measured result, no prevalence claim. Mastered to −16.4 LUFS /
  −1.7 dBTP with `loudnorm`, the first file in this workstream to meet the
  level spec. If it ever goes guest-facing it needs a visible synthetic-speech
  disclosure in the visible layer, not only in an `alt` or `aria-label`.

- `research/narration/shorts-snags/` — **held / research only** (10 August
  2026). Five 57–62 second snag explainers, mastered in the folder with
  generator output in `raw/`. ElevenLabs `eleven_v3`, voice **Old Irish Village
  Elder** (`eEzkfaTvgdaH5to7Cn0M`, a 7 August bakeoff control), `stability`
  0.5. It is a designed voice, **not a recording of anyone**, and no real
  person's voice was cloned. Scripts and sourcing: `shorts-snags/script.md`.
  Every beat derives from `src/site/data/fault-walks.ts`, the same five entries
  `/where-it-fails/` walks, using each entry's `errand`, `decision` and
  `check`. The visitor in each is an invented visitor on a named errand,
  matching the page's invented-mock rule. Names no business, no client and no
  place; makes no prevalence claim and promises no result. Mastered to −16.9 to
  −17.5 LUFS / −1.8 dBTP, 0.6 LU spread across the set. Casting is unresolved —
  the voice's folklore-storyteller brief may not suit practical explainers —
  and `S5` duplicates the swap test used in the trailer, so at most one of the
  two survives. Guest-facing use needs a visible synthetic-speech disclosure.

## Owner's operating page prototype (9 August 2026)

- `media/prototypes/operating-page/tomato-fennel-galette.webp`,
  `blackberry-rye-buns.webp` and `lemon-herb-chicken.webp` — **in use on an
  internal representative prototype.** Generated with the built-in Codex
  image tool (GPT Image) as serving imagery for the clearly synthetic Salt &
  Stem seasonal food-and-delivery business. The three square overhead images
  show, respectively, a tomato and fennel galette, six blackberry rye buns,
  and a lemon-herb chicken tray on cobalt enamel trays. They do not depict a
  real maker, product range, premises or fulfilled order. The public prototype
  labels both the business and the serving imagery as synthetic/generated in
  the masthead and trust footer. Source outputs remain under the session's
  Codex generated-images directory; project copies are 1200px WebP derivatives.

## Impossible local website prototype (9 August 2026)

- **No generated media is in use.** The selected `IW-MATERIALS` and
  `IW-CHAPTERS` studies remain under
  `research/media-sprint/masters/impossible-local-website/` and are not loaded
  by `/prototypes/impossible-local/`. They informed the reflective material
  direction only. The shipped visual is Canvas/SVG geometry derived from the
  attributed terrain samples recorded in
  `research/prototypes/impossible-local/SOURCES.md`.

## Studio storytelling bakeoff (7 August 2026)

- `research/film/clips/studio/T*.mp4`, `X*.{png,mp4}` — **held / research only**
  (7 August 2026). Format-bakeoff stills and Gemini Omni clips for
  [`research/film/studio-media-experiments.md`](film/studio-media-experiments.md)
  and theme controls from
  [`research/film/studio-recurring-themes.md`](film/studio-recurring-themes.md).
  Stills from GPT-Image (Codex Image downloads); videos from Gemini Omni
  (Flow exports). Object theatre only — no real businesses, no faces, no
  lettering intended. Inventory and source download names:
  [`research/film/clips/studio/MANIFEST.md`](film/clips/studio/MANIFEST.md).
  Not wired to guest routes; any later prototype use needs on-page disclosure
  ("imagined, not footage") and a reduced-motion poster. Includes X26
  (`X26-choir-of-clocks.{png,mp4}`) and X27 (`X27-nicer-dissolve.mp4`) from
  the same bakeoff evening.
- `research/film/clips/studio/studio-reel-v0.mp4` — **internal sequence proof**
  (7 August 2026). A silent FFmpeg concatenation of the existing T01, T04 and
  X18 research exports; no generated frames were added. It tests pacing while
  the source corrections remain open and must not be copied to `public/`.
  Sidecar: `research/film/clips/studio/studio-reel-v0.md`.
- `research/film/clips/studio/X23-coastal-sequence/X23-*.png` — **retired /
  research only** (7 August 2026). Twelve GPT-Image stills for X23's proposed
  day-in-the-town mosaic. The fictional generic coastal street weakened the
  studio's local-trust claim, so the set was moved out of `public/` and the
  assembled film was cancelled. Do not promote or regenerate it.
- `research/film/clips/studio/X25-postcard-fronts/X25-T*.png` — **held /
  research only** (7 August 2026). Ten GPT-Image 2 departure-beat postcard
  fronts for experiment X25 (one per theme T1–T10), plus contact sheets and
  an unselected T6 v1. Sidecar:
  `research/film/clips/studio/X25-postcard-fronts/X25-postcard-fronts.md`.
  Object theatre only; no real businesses. Curation advances T04 and T07 to
  A6 print proof and T10 to a hand-delivered leave-behind; T01 is held for a
  face-to-face tone check. The remaining fronts stay research-only.
- `research/film/clips/studio/X25-postcard-fronts/X25-T*.mp3` — **retired /
  research only** (7 August 2026). Ten synthetic whispers (theme messages)
  for the matching postcard QR tap-to-hear. ElevenLabs
  `eleven_multilingual_v2`; cast from voice bake-off —
  MM Harbour Whisper default, MM Rain Glass for T02/T09. Scripts:
  `X25-whispers.md`; generator
  `tools/pipeline/generate-x25-whispers.mjs`. Disclose as synthetic wherever
  guest-facing. The 7 August curation cut the audio companion; postcard QR
  destinations must not use these files.
- `research/film/clips/studio/audio/` — **held / research only** (7 August
  2026). Studio bakeoff VO + Foley for X6–X9, X17, X18, X26. ElevenLabs
  `eleven_multilingual_v2` (speech) and `eleven_text_to_sound_v2` (beds).
  Voices: MM Harbour Whisper, MM Rain Glass, MM Slate Narrator, MM Harbour
  Brass, MM Consent Bot (UI antagonist). Index `AUDIO.md`; generator
  `tools/pipeline/generate-studio-audio.mjs`. Disclose as synthetic wherever
  guest-facing.

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
- `bettys-butters-melt-loop.mp4` — **held / not wired** (Gemini Omni, 5 August
  2026). Image-to-video of the melt still: knife finishing a cut through soft
  butter. Soft-body physics land; a hand appears in frame and is accepted for
  this pass. Still remains the reduced-motion default if this ever wires in.

### Held Omni concept loops (5 August 2026 evening slate)

Judged “worked reasonably well” from backlog A3–A11; **not wired**. Stills
remain reduced-motion defaults. Prompts in `research/film/omni-clip-backlog.md`.

- `hotel-enniskeen/enniskeen-house-day-dusk-loop.mp4` — A6; day→dusk on the
  faithful house plate.
- `hugh-mccanns/hugh-mccanns-table-setting-loop.mp4` — A7; quiet table-setting
  in the faithful dining room.
- `dundrum-inn/dundrum-inn-blue-hour-loop.mp4` — A8; façade loop after a
  signage-correction edit pass (`Correcting_text_on_sign_…`).
- `castle-farm/castle-farm-weekly-table-loop.mp4` — A9 theatre still-life.
- `castle-farm/castle-farm-delivery-round-loop.mp4` — A9 delivery-round plate
  with gentle van drift.
- `newcastle-chamber/newcastle-chamber-harbour-loop.mp4` — A11; harbour photo
  to motion. Guest wire must keep Eric Jones / place attribution chain.
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

### Castle Farm and Newcastle Family Dental concept plates

### Kent Amusements concept plates

- `public/media/concepts/kent-amusements/kent-amusements-afternoon-storyboard.png` — **concept asset** (generated 5 August 2026). AI-generated single wide six-panel ink-and-gouache storyboard made with the built-in OpenAI image generation tool for Kent Amusements move 3 / the staged afternoon. It follows the promenade, change, arcade floor, dodgems, VR and return to the sea in one continuous indicative scene. It is not a photograph, map, floorplan, exact interior survey, or evidence of current signage, attractions beyond the published list, opening hours, prices, or premises detail; the panel numbers are the only text in the artwork.
- `public/media/concepts/kent-amusements/kent-amusements-afternoon-storyboard-2x3.png` — **concept asset / alternate composition** (generated 5 August 2026). AI-generated 2-row × 3-column version of the six-panel ink-and-gouache storyboard above, made with the built-in OpenAI image generation tool from that plate as a composition reference. It keeps the same scene order, numbering, palette and indicative geography; it is not a photograph, map, floorplan, exact interior survey, or evidence of current signage, opening hours, prices, or premises detail.
- `public/media/concepts/kent-amusements/kent-amusements-afternoon-storyboard-2x3-researched.png` — **concept asset / researched revision** (generated 5 August 2026). AI-generated revision of the 2-row × 3-column storyboard, made with the built-in OpenAI image generation tool after reviewing the current seafront frontage references, the public business-page mirror's recent posts, and public visitor-photo descriptions. It carries researched cues — long glazed red-grey terrace, promenade railings, front cash desk, broad machine floor, distinct windowed dodgem room and compact VR island — without copying signage or claiming an exact interior survey. It remains indicative comic-book artwork, not a photograph, map, floorplan, or evidence of current premises detail.
- `public/media/concepts/kent-amusements/kent-amusements-promenade-day.png` and
  `kent-amusements-promenade-dusk.png` — **concept assets** (generated 5 August
  2026). AI-generated hand-drawn ink-and-gouache promenade plates made with the
  built-in OpenAI image generation tool for Kent Amusements move 5. The day
  plate shows an indicative illustration of a modest arcade frontage on
  Newcastle's Central Promenade with the sea and Mourne Mountains; the dusk
  plate is a lighting-only edit of the same composition with warm interior
  light. They are not photographs, an exact architectural reconstruction, a
  survey, a navigational map, or evidence of current signage, opening hours,
  attractions, or premises detail. The frontage is drawn rather than based on
  the withdrawn 2023 exterior photograph; any guest-facing use must disclose
  the generated illustrative boundary and keep the day plate as the reduced-
  motion/no-JavaScript default.
- `public/media/concepts/kent-amusements/kent-amusements-promenade-lights.mp4`
  — **held / not wired** (Gemini Omni, 5 August 2026; lettering edit same day).
  Image-to-video day→dusk transition from the day promenade plate. First pass
  invented a "VARIETY" fascia; conversational edit removed fascia lettering and
  kept the yellow panels blank. Day plate remains the reduced-motion default if
  this ever wires in.
- `public/media/concepts/kent-amusements/kent-amusements-hero-video-source.png`
  — **in use.** AI-generated edit created 9 August 2026 for a
  stylised human-motion capability test. The in-use day promenade plate was
  the edit target; one anonymous adult, one child and a plain red balloon were
  added in the same ink-and-gouache style, walking toward the indicative
  arcade. They do not depict identified customers or a recorded event. The
  building, blank fascia panels and place remain subject to the day plate's
  indicative-not-a-survey boundary. Generated with the built-in image tool at
  1672 × 941. It is the poster and reduced-motion fallback for the hero video.
- `public/media/concepts/kent-amusements/kent-amusements-hero.{mp4,webm}` —
  **in use.** Six-second image-to-video derivative of the source above: the
  anonymous adult and child walk into the indicative arcade while the balloon
  trails behind. Selected 9 August 2026 after review found stable architecture,
  coherent figures and a clean ending; it plays once and holds rather than
  forcing a narrative action to loop. Both web files are stripped of audio.
  The visible in-frame generated-scene label covers the generator mark while
  preserving explicit disclosure.
- `kent-amusements-afternoon-comic-01-03.mp4` and
  `kent-amusements-afternoon-comic-04-06.mp4` — **held / not wired** (Gemini
  Omni, 5 August 2026). Image-to-video of the researched storyboard strips
  (backlog A3). Indicative comic motion only; still strips remain the
  reduced-motion default.
- `public/media/concepts/kent-amusements/kent-amusements-afternoon-storyboard-2x3-researched.png`
  — **source master** (generated 5 August 2026). AI-generated six-panel 2×3
  comic storyboard made with GPT image generation for Kent Amusements move 3.
  Panels follow the verified afternoon in order: promenade, change, machine
  floor, indoor dodgems, VR, back out to the sea. It is not a photograph,
  floorplan, survey, or evidence of the arcade's real interior layout,
  equipment, signage or hours.
- `public/media/concepts/kent-amusements/kent-amusements-afternoon-storyboard-01-03.png`
  and `kent-amusements-afternoon-storyboard-04-06.png` — **in use** (cropped
  5 August 2026 from the researched 2×3 master). Top and bottom three-panel
  strips served on the concept with captions under each strip; same honesty
  boundary as the master, disclosed on the page.
- `public/media/concepts/kent-amusements/kent-amusements-afternoon-journey.png`,
  `kent-amusements-afternoon-storyboard.png` and
  `kent-amusements-afternoon-storyboard-2x3.png` — **held** (generated 5 August
  2026). Earlier afternoon-journey and storyboard attempts kept for reference;
  not linked from the concept.

- `public/media/concepts/castle-farm/castle-farm-weekly-table-illustration.png` — **in use** (generated 5 August 2026). AI-generated hand-painted editorial still-life made with the built-in OpenAI image generation tool for Castle Farm move 4, showing a possible week's table from the published food categories. It is an illustrative visualisation, not a photograph of Castle Farm, its kitchen or an exact current box, and carries no brand, packaging or availability claim.
- `public/media/concepts/castle-farm/castle-farm-hero-video-source.png` —
  **in use.** AI-generated edit created 9 August 2026 for a
  hand-and-object interaction capability test. The in-use weekly-table
  illustration was the edit target; one anonymous partial arm and hand holding
  a small bunch of carrots were added in the same painted style. The generator
  produced four carrots despite a request for exactly three; that miss is
  retained as evidence for the capability test. The image remains a possible
  week's table, not Castle Farm's current box, kitchen, produce selection or a
  real person. Generated with the built-in image tool at 1672 × 941. It is the
  poster and reduced-motion fallback for the hero video.
- `public/media/concepts/castle-farm/castle-farm-hero.{mp4,webm}` — **in
  use.** Six-second image-to-video derivative of the source above: one
  anonymous hand sets the four visible carrots into the illustrative box and
  withdraws. Selected 9 August 2026 after frame review found coherent contact,
  a stable table and a clean final arrangement. It plays once and holds; both
  web files are stripped of audio. The visible in-frame generated-scene label
  covers the generator mark while preserving explicit disclosure.
- `public/media/concepts/castle-farm/castle-farm-delivery-round-plate.png` — **in use** (generated and revised 5 August 2026). AI-generated hand-drawn ink-and-gouache route plate made with the built-in OpenAI image generation tool for Castle Farm move 5. It uses only towns named in the farm's published schedule and arranges Tuesday, Wednesday, Thursday and Friday clockwise; it is an indicative drawing, not a survey, navigational map or exact route record.
- `public/media/concepts/newcastle-dental/newcastle-dental-calm-room-plate.png` — **concept asset** (generated 5 August 2026). AI-generated hand-drawn periwinkle room illustration made with the built-in OpenAI image generation tool for Newcastle Family Dental Care move 4. It imagines a calm treatment room with a chair by a window and plants; it is not a photograph or evidence of the practice's actual interior, facilities or furnishings.

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
- `castle-farm-weekly-box-faithful.webp` — **not in use since 5 August 2026.** AI-generated faithful visualisation based on Castle Farm's published mixed-box photograph retained at `research/concepts/castle-farm/evidence/castle-farm-box.jpg`. Replaced on the concept by `castle-farm-weekly-table-illustration.png` when move 4 made the week's table the theatre; still held as the earlier box-still reference.
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
- `enniskeen-hero-video-source.png` — **held, not in use.** AI-generated
  weather-only edit created 9 August 2026 for a near-static atmospheric-loop
  capability test. The in-use faithful dawn plate was the edit target; the
  generation refined only the mist into two thin ribbons over the left lawn
  and distant trees. The house architecture, grounds, camera, dawn light and
  empty windows retain the faithful dawn plate's boundary. Generated with the
  built-in image tool at 1821 × 864. Record any video derivative separately,
  strip its audio and keep the existing dawn still as the reduced-motion
  fallback.
- `enniskeen-faithful-room6.png` — **in use.** AI-generated faithful visualisation based on the hotel's reference photograph of Room 6's distinctive matching pink basin and bath. The prompt preserved the fixture colour, forms and chrome cross-head tap arrangement and forbade invented luxury features.
- `bucks-head-faithful-hearth.png` — **in use.** AI-generated faithful visualisation based on the pub's reference photograph of its real hearth. The prompt preserved the rounded arch, brick chimney breast, stove, antlers, wall colours, seating and floor materials while forbidding redesign or invented amenities.
- `bucks-head-hero-video-source.png` — **in use.** AI-generated
  edit created 9 August 2026 as the source frame for a restrained hearth-loop
  experiment. The in-use `bucks-head-faithful-hearth.png` was the edit target;
  the generation changed only the existing stove from dark to a small fire
  visible behind its closed glass door. The rounded arch, brick chimney
  breast, antlers, wall colours, lighting, seating, shelving, floor and empty
  room remain based on that faithful visualisation. Generated with the
  built-in image tool at the original 992 × 1586 dimensions. It is the poster
  and reduced-motion fallback for the hero video.
- `bucks-head-hero.{mp4,webm}` — **in use.** Ten-second image-to-video
  derivative of the source above, added 9 August 2026 after review found the
  room stable and the low fire naturally contained behind the stove glass.
  It loops in the hero; both web files are stripped of audio. The visible
  in-frame generated-scene label covers the generator mark while preserving
  explicit disclosure.
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
- `scopers-hero-video-source.png` — **held, not in use.** AI-generated
  photoreal source frame created 9 August 2026 for a quieter alternative to
  the in-use risograph hero loop. The generated
  `scopers-generated-chicken-burger.jpg` was supplied as a dish reference;
  the wide pass composition, spoon and anonymous partial hand are newly
  generated. It depicts the kind of buttermilk chicken burger described in
  Scopers' public post, not the real dish, premises, chef or service. Generated
  with the built-in image tool at 1672 × 941. If a video derivative ships,
  record it separately here, strip its audio and retain the concept's visible
  generated-media disclosure.
- `castle-farm-produce.jpg` — **not in use since 5 August 2026.** AI-generated.
  It was cropped by CSS to a 190×43 window and shown as the concept's wordmark
  in the page header, so the visible slice read as a brand mark rather than as
  photography. It was never the farm's own mark, which is why the elevation
  retired it: `research/concepts/castle-farm/castle-farm-elevation-brief.md`
  asks for plain type until the farm's production wordmark is cleared. Recorded
  28 July 2026 after the journey suite found it rendered with no provenance
  entry; withdrawn from the page 5 August 2026.
- `enniskeen-generated-house.jpg` and `enniskeen-generated-bath-green.jpg` —
  **held, not in use.** Two more of the AI-generated *illustrative* Enniskeen
  visuals described in the `enniskeen-generated-*` entry above, dropped from
  `src/concepts/hotel-enniskeen/content.ts` by the 25 July 2026 public pass and
  never re-wired. Like their siblings they were not made from a reference
  photograph and depict a generic country house and bathroom, so neither may
  ever be captioned as the hotel's own property or its rooms. Held rather than
  deleted because Enniskeen is the batch-two flagship and its `generatedVisuals`
  set is still being chosen; recorded 6 August 2026. Confirm the generation
  details before relying on this record for a sourcing claim.
- `hotel-enniskeen-outreach-reel.{mp4,webm}` — **held, not in use.** A short
  reel assembled by `tools/capture/capture-concept-media.mjs` for the Enniskeen
  outreach one-sheet, which ships as a printed PDF and shows no video. Nothing
  on the site has ever referenced it. Held because the Enniskeen outreach
  conversation has not happened yet and a reel is the obvious thing to want on
  a phone during it; recorded 6 August 2026. It is assembled from the concept's
  own generated and faithful visuals, so the disclosure that governs them
  governs it.
- `painted-earth-originals-after.jpg` — **held, not in use.** An after-state
  capture of the Painted Earth originals view, superseded by the 6 August 2026
  elevation (makers' roll, handover, waiting list) before it was ever wired to
  a page. Held because the concept is public and this is a capture of the
  studio's own concept rather than of anyone's live site; recorded 6 August
  2026. It shows the drawn placeholder tiles, so it must never be presented as
  the gallery's artwork.
- `enniskeen-faithful-room9.png` — **not in use since 26 July 2026.** AI-generated faithful visualisation based on the hotel's reference photograph of Room 9's compact beige-tiled en-suite. The prompt preserved the wall-mounted basin, mirror, magnifying mirror and towel-ring arrangement and forbade an invented bath or spa setting.
- `cupla-faithful-visualisation.jpg` — **in use** on `/concepts/cupla/` again since 5 August 2026, having dropped off the route in the repo restructure. AI-generated faithful visualisation based on the photographed frontage at 105 Main Street, Dundrum. The source reference was an August 2024 Google Maps user photo; the prompt forbade invented seating, people, products or amenities. Verified feature by feature against the reference in the 25 July 2026 review: same three-bay white-render frontage with navy joinery, same CÚPLA fascia board with the Facebook and Instagram glyphs, same hanging baskets, window boxes and "CÚPLA COFFEE SHOP Est. 2024" door decal.
  **Rights position (recorded 5 August 2026, the question the July review left open).** The reference photograph is a third-party Google Maps user photo, held privately at `.tmp/concept-subject-references/cupla-exterior-google-2024.jpg` and never published, redistributed or shipped. No licence to it has been obtained, and the studio does not hold one. The visualisation is a close derivative of that specific photograph of a building elevation visible from a public street, and it is used on an internal, `noindex` concept route and in the concept's own case-study comparison. That is the position as it stands, not a clearance: **before any external use — client pitch material, print, or any surface outside the concept routes and their case study — either the photographer's permission is obtained, or the image is replaced by a visualisation generated from a reference the studio owns.** The generation boundary above still applies: nothing in the frame is invented.
- `cupla-twin-cups.png` — **in use on `/concepts/cupla/` since 5 August 2026; generated as the A12 image-to-video source still.** AI-generated illustrative still of two identical petrol-blue ceramic cups and oat saucers, with matching caramel coffee fill levels on a plain oat table. The existing frontage visualisation was supplied as a palette reference only; the prompt explicitly excluded its shopfront, lettering, flowers, architecture and logos. The image stages the verified twins motif symbolically and does not depict the owners, premises, products or current menu. Generated with the built-in image tool, then centre-cropped to an exact 16:9 frame. The concept banner and the image's own caption visibly disclose its generated origin. The `-640.webp` and `-1265.webp` files are responsive derivatives of the PNG master.
- `mourne-cycles-faithful-visualisation.jpg` — **not in use since 26 July 2026.** AI-generated faithful visualisation based on an April 2026 Mourne Cycles customer photo. The prompt preserved the photographed bicycle, red fence, paving and numbered blue bin while forbidding invented shop, rider, trail or product context. The reference evidences the bicycle and its surroundings only, not the ownership of the yard, so neither the caption nor the alt text called the fence the shop's own premises (corrected 25 July 2026 after the re-review flagged the alt text as an unsourced premises claim).
- `mourne-cycles-bike-electric.jpg`, `mourne-cycles-bike-road.jpg` and `mourne-cycles-bike-mountain.jpg` — **in use.** AI-generated illustrative bike-category visuals added 31 July 2026 for the Electric, Road and Mountain terrain panels. They show the kind of bike and riding context named by each panel, not stock held by the shop or its premises; no product model, price or availability claim is attached to them.
- `mourne-cycles-hero.jpg` — **in use.** AI-generated illustrative landscape visual added 31 July 2026 for the concept's hero. It is a drawn riding context for the Mourne/Castlewellan route, not a photograph of the shop, its premises or a specific current trail condition.
- `mourne-cycles-hero-video-source.png` — **in use.** AI-generated
  illustrative source frame created 9 August 2026 for a possible short hero
  loop. The in-use `mourne-cycles-hero.jpg` was supplied as a visual reference
  for its cool overcast light, forest texture, muted grade and Mourne setting;
  the composition and anonymous rider are newly generated. It does not depict
  a customer, shop premises, a stocked bike or a specific current trail
  condition. Generated with the built-in image tool at 1672 × 941. It is the
  hero poster and reduced-motion fallback.
- `mourne-cycles-hero.{mp4,webm}` — **in use.** Six-second image-to-video
  derivative of the source above: the anonymous rider crosses the locked-off
  trail view and exits behind the edge trees. Added 9 August 2026 after review
  found stable landscape geometry, coherent bicycle movement and a quiet loop
  point. Both web files are stripped of audio. The visible in-frame
  generated-scene label covers the generator mark while preserving explicit
  disclosure.

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

### Journey captures — deleted 6 August 2026

Seventeen groups, 51 files, 5.5 MB. Every one is a capture of a real
business's own live website, made for a before/after journey comparison, that
no page had referenced for days or weeks. They were found when the orphan scan
was made fatal (`PLAN.md` section 1c) — the scan itself had been running
nowhere since 4 August, so nothing reported them.

Deleted rather than held, because holding was the weaker of the two outcomes
`PLAN.md` section 6.1 allows. A screenshot of a named business's website, used
by nothing, still answers at a guessable production URL. The Buck's Head
captures document a site the business is in the middle of replacing, and the
Murdock Brothers pair belongs to a concept with no public transformation page
at all. The evidence they were made from is unaffected —
it lives under `research/concepts/<slug>/evidence/` per ADR-0003, and the walk
counts they support are quoted from `research/pipeline/verifications.json` and
`.scratch/renders/`, not from these files.

Git first-appearance dates are not capture dates for anything here: the history
purge of 31 July 2026 (ADR-0003) rewrote every earlier commit, so a blob that
predates it reads as added that day. Dates below are given only where a source
outside git records them.

- `scopers-journey-hours-before-{1,2}`, `-hours-after-{1,2}`,
  `-supper-before-{1,2,3}`, `-supper-after-{1,2}` (nine groups) — frames from
  the phone walk of Scoper's public Facebook and Instagram pages, and of the
  concept beside them. `research/pipeline/verifications.json` dates that walk
  to 31 July 2026 and holds its counts; the frames are in
  `.scratch/renders/scopers-journey/2026-07-31/`.
- `bucks-head-journey-before`, `-journey-after` (mp4/webm) and
  `bucks-head-menus-before` — the booking and menu journeys on
  `thebucksheaddundrum.com`. The pub replied on 3 August 2026 that a
  replacement site is already built and waiting on accommodation readiness, so
  these capture a site that is about to stop existing. The still frames the
  Buck's Head one-sheet uses (`bucks-head-journey-booking-*`) are referenced
  and stay.
- `donard-veterinary-appointments-before`, `hotel-enniskeen-rooms-before`,
  `mourne-cycles-hire-before` — single before-captures, each dropped when its
  concept was reworked on 1 August 2026.
- `murdock-brothers-before`, `-after` — before/after pair for a concept that
  has no public transformation page.

## Concept essence production seeds — approved for publication

Generated 10 August 2026 with the built-in OpenAI image tool and held under
`research/concepts/*/essence-media/`. The set contains ten 16:9 film source
stills and nine complete composition-matched sequences totalling thirty-four
frames. The Cúpla seed is a research copy of the already recorded
`public/media/concepts/cupla/cupla-twin-cups.png`; the other forty-three images
were generated for this brief. The prompts and direct asset links are owned by
`research/concept-essence-media-brief.md`.

For each sequence, the opening composition was generated from its complete
prompt and each later frame was edited from the preceding image to retain the
camera, layout, materials and visual language. Workspace copies were
centre-cropped to 1664 × 936; uncropped generation masters remain in Codex's
generated-image store. The project owner reviewed the complete set and
approved it for publication on 10 August 2026. These remain generated
illustrations, not documentary photographs or evidence of real premises,
products, people, routes, projects, patients, stock, menus or results. The
indicative maps and views are not surveys. Guest-facing use needs a visible
generated-media disclosure and the normal factual, crop and reduced-motion
checks.

Publication copies were made on 10 August 2026 as quality-88 JPEG masters at
`public/media/concepts/<slug>/essence-video-seed.jpg` and
`public/media/concepts/<slug>/essence-sequence-*.jpg`. They are rendered by the
shared `EssenceMedia` section on eighteen concept home pages, with an adjacent
visible generated-media label and user-controlled sequence navigation. Cúpla
continues to use its established twin-cup section, now with the approved still
as the poster for its essence film rather than publishing a duplicate section.

Three owner-supplied generated films were reviewed and integrated on 10 August
2026. Their supplied AAC tracks were removed for silent page playback; the
H.264 video streams were copied without visual re-encoding and moved to the
start of each MP4 for fast loading. Responsive WebM alternatives are generated
by the normal media optimiser. All three use the approved still as their
poster and reduced-motion frame, carry an adjacent visible AI-generated-film
disclosure, and provide an explicit play/pause control.

- `public/media/concepts/cupla/essence-twin-pour.mp4` — six seconds, 1920 ×
  1080; supplied as
  `/Users/cobro/Downloads/Steel_jugs_pouring_steamed_milk_202608100849.mp4`.
- `public/media/concepts/scopers/essence-whole-carrot.mp4` — eight seconds,
  1280 × 720; supplied as
  `/Users/cobro/Downloads/Stop-motion_carrot_food_film_202608100959.mp4`.
- `public/media/concepts/donard-hotel/essence-open-newcastle.mp4` — eight
  seconds, 1280 × 720; supplied as
  `/Users/cobro/Downloads/Curtains_opening_to_reveal_Newca…_202608100958.mp4`.

## Two-day media sprint research masters — held outside public

Generated 9–10 August 2026 with the built-in OpenAI image tool and held under
`research/media-sprint/masters/`. These are synthetic prototype or general
studio research ingredients, not evidence about a real business, customer,
stock level, route, current condition or commercial result. The job prompts,
reference roles, dimensions and advance/reserve decisions live beside them in
`research/media-sprint/jobs/`; `research/media-sprint/MANIFEST.md` owns the
batch boundary. None is guest-facing or referenced from `src/`.

- **Studio object theatre:** `T04-corrected-poster-v1.png`,
  `X18-reworked-before-v1.png`, `X18-reworked-after-v1.png`,
  `T05-bell-no-clapper-reference-v1.png`,
  `T05-bell-no-clapper-reference-v2.png`. The first removes generated clock
  marks from a generalised opening-hours scene. The X18 pair is a blank
  paper-envelope metaphor for showing a change before a decision. T05 is a
  16:9 clay-object-theatre video reference: one brass counter bell and waiting
  boots in front of an unanswered telephone, empty chair and lamp. T05 v2 is
  the selected reference with the lamp off; v1 is reserve because the lit lamp
  spent the scene's final response beat in the opening frame. No named
  business or realised result is represented. Existing extracted frames in
  the same folder are references, not new generated masters.
- **Synthetic owner-operating-page:** `weekly-offering-source-v1.png`,
  `week-reset-source-v2.png`, `packing-requests-source-v1.png`,
  `next-week-blank-source-v1.png`, `open-week-finite-row-source-v1.png`,
  `close-consequence-source-v1.png`. A fictional weekly food business shown on a
  cool-steel working surface. No menu, stock, order or fulfilment is real.
  `week-reset-source-v2.png` remains reserve-only because a faint generator
  trace survived cleanup; the other three advanced as source ingredients.
- **Synthetic impossible local website:**
  `reflective-elevation-material-source-v1.png`,
  `high-ground-settled-source-v1.png`, `street-settled-source-v1.png`,
  `descent-settled-source-v1.png`, `workshop-settled-source-v1.png`,
  `bench-to-terrain-transition-source-v1.png`,
  `forest-settled-source-v1.png`. These use
  a reflective bicycle-tape elevation instrument across fictional workshop
  and mineral scenes. They own material and pacing exploration only. They are
  not terrain data, a route, a survey, safety advice, current conditions, a
  real workshop or evidence of stock/services.

Any future guest-facing use needs a visible generated-media disclosure, live
DOM copy, and the normal reduced-motion and publication checks. The impossible
site's actual elevation must remain derived from attributed source data rather
than from these plates.

### Studio sprint selections published as illustrations and films — 10 August 2026

Four approved studio object-theatre still derivatives are in use on
`/where-it-fails/`:

- `public/media/studio/login-at-the-door-settled.png`, copied from
  `research/media-sprint/masters/studio-film/T01-existing-final.png`;
- `public/media/studio/are-you-open-settled.png`, copied from
  `research/media-sprint/masters/studio-film/T04-corrected-poster-v1.png`;
- `public/media/studio/show-the-change-closed.png` and
  `show-the-change-open.png`, copied from the matching
  `X18-reworked-{before,after}-v1.png` masters.

Five silent public page trials were prepared on 10 August 2026:

- `public/media/studio/login-at-the-door.{mp4,webm}`, derived from
  `research/film/clips/studio/T01-login-at-the-door.mp4`;
- `public/media/studio/are-you-open.{mp4,webm}`, the corrected T04 edit that
  resolves onto the numeral-free settled frame;
- `public/media/studio/bell-no-clapper.{mp4,webm}`, derived from
  `research/film/clips/studio/T05-bell-no-clapper.mp4`, with
  `bell-no-clapper-settled.png` extracted from its final half-second. The
  research master was generated from `T05-bell-no-clapper-reference-v2.png`;
  its generated audio is retained only in research and removed from public
  delivery;
- `public/media/studio/best-thing-hidden.{mp4,webm}`, derived from
  `research/film/clips/studio/T07-best-thing-hidden.mp4`, with
  `best-thing-hidden-settled.png` extracted from its final half-second;
- `public/media/studio/swap-test.{mp4,webm}`, derived from
  `research/film/clips/studio/T10-swap-test.mp4`, with
  `swap-test-settled.png` extracted from frame 120 at 5.00 seconds. The public
  edit ends on that seated nameplate and excludes the incorrect movement in
  the source's final three seconds.

All five use the settled poster as the default and reduced-motion experience;
the page requests no video source until the visitor presses “Watch the scene.”
The compact “AI-made” corner mark on each player is the visible generated-media
disclosure. T07 retains its intake clarity caveat, and T10 remains supporting
material beneath the interactive swap test rather than a replacement for it.

They depict general synthetic object theatre, no named business, owner,
customer or realised result. The X18 pair remains labelled as a synthetic
paper study. The five films use the compact disclosure described above; T04
is the one corrected motion edit. Source hashes and job prompts remain in the
media-sprint records.

### Reusable tactile transition components

Also generated 9 August 2026 with the built-in OpenAI image tool and held under
`research/media-sprint/masters/transition-components/`:

- `paper-to-steel-reveal-source-v1.png` — blank fibrous paper curling away
  from a cool steel plane, intended as a draft/live wipe or compositing mask;
- `brass-rail-reversal-source-v1.png` — three blank tabs on a bounded brass
  rail, intended as a reversible state-transition ingredient;
- `inspection-aperture-source-v1.png` — the synthetic reflective elevation
  instrument passing through a black mechanical light slot, intended as a
  chapter/scale handoff mask.

They depict no location, business, owner, customer, product, testimony or
result. They are research-only material plates, not interface screenshots or
evidence. Their job prompts and reviews live in `research/media-sprint/jobs/`.
