# Gemini Omni clip backlog — Mourne Made

Studio working document. Not guest-facing.

Started 5 August 2026 after the first free Omni day: town films assembled,
Kent promenade lights edited, Betty melt loop held. This file develops the
**remaining** ideas from that exploration so later sessions can generate
without re-deriving intent, assets, or honesty rules.

Companion docs:

- Model strengths and town-film prompts — `research/film/one-day-made-here.md`
- Reference still continuity — `research/film/reference-still-prompts.md`
- Provenance — `research/image-provenance.md`
- Sensory / film phase gates — `docs/sensory-system-plan.md`
- Guest-voice rule — `AGENTS.md`
- **Studio product showcases & explainers** (claymation, kinetic type, humour,
  belief-sequence films) — [`research/studio-storytelling.md`](../studio-storytelling.md).
  Studio-owned backlog items **A10** and **A19** migrate there as S7 / S1 when
  generated; this file stays the concept + shared Omni craft list.

## What Omni is for here

| Property | Consequence |
| --- | --- |
| ~6–10s clips | Loops, day-part theatre, one proverb of motion — not features |
| Image-to-video + reference lock | Prefer existing concept stills over text-only |
| Conversational multi-turn edit | Spend free gens on edits, not re-rolls from scratch |
| Physics + world knowledge | Melts, light shifts, water, paper grain — not invented plots |
| Native audio | Opt-in ambience or soft Foley; never autoplay on concepts |
| SynthID on every output | Honesty asset: generated media stays provably generated |

### Non-negotiables (every clip)

1. **Still is the real experience** under `prefers-reduced-motion` / no-JS.
2. **Provenance entry** in `research/image-provenance.md` before commit.
3. **Visible disclosure** if guest-facing (banner / caption / on-frame — not alt-only).
4. **Guest voice** — no studio/process language on concept surfaces.
5. **No invented facts** — hours, prices, menus, attractions, membership counts, named artworks.
6. **Premises film of a real business** needs written agreement before publish (Phase 4 gate).
7. **Edit invented signage immediately** — Kent promenade taught this: Omni will letter blank fascias.

### Shipping pattern (reuse Scopers)

`ScHero.astro` only upgrades a day-part to `<video autoplay muted loop playsinline>` when **both** `.webm` and `.mp4` exist beside the still; poster + alt stay on the still; pause off-screen / under reduced motion. Prefer that pattern for any concept loop.

### Done (excluded from backlog)

| # | Idea | Status |
| --- | --- | --- |
| 1 | One Day, Made Here town films | Assembled; demo markers gone; prototype `/prototypes/home/film/` |
| 2 | Kent promenade day→dusk lights | Held: `kent-amusements-promenade-lights.mp4` (lettering edited) |
| 5 | Betty’s melt knife physics | Held: `bettys-butters-melt-loop.mp4` (hand accepted) |
| 20 | Conversational edit stress test | Practiced on Kent VARIETY → blank panels; protocol below |

---

## How to run a free day

1. Pick 1–2 **production** clips + 1 **risk** clip from the priority table.
2. Attach the listed still. Paste the prompt. Prefer image-to-video, 16:9, ~8s.
3. Budget **half** the day’s gens for edit turns (signage, hands, drift, loop freeze).
4. Drop exports beside the still; run `pnpm optimize:media` if WebM/WebP needed.
5. Log provenance the same day — even if held / unwired.

Suggested next days (opinionated):

| Day | Spend |
| --- | --- |
| A | Scopers bread + supper breathe (extends a shipping pattern) |
| B | Enniskeen continuous light + Dundrum Inn blue-hour (place theatre) |
| C | Kent comic reel + kinetic type (playful arcade register) |
| D | Castle Farm table drift + Cupla twin pour (appetite / motif) |
| E | Chamber harbour audio-first + Mourne Cycles ghost bike (civic / trade risk) |

---

## Priority overview

| ID | Idea | Register | Omni strength | Risk | Wire readiness |
| --- | --- | --- | --- | --- | --- |
| A3 | Kent storyboard comic | Playful | Drawing → video | Med | High (JourneyPlate) |
| A4 | Scopers breathe family | Appetite | Style lock + grain | Low | High (ScHero) |
| A6 | Enniskeen day→dusk take | Place | Light physics | Low | High (EnkHero) |
| A7 | Hugh table-setting | Place | Quiet action | Med | High (day-part hero) |
| A8 | Dundrum Inn blue-hour | Place | Window lights | Low | High (hero visual) |
| A9 | Castle Farm table / round | Product | Still-life drift | Low | High (hero + #round) |
| A10 | Rebuild metaphor | Studio | Style transform | High | Prototype only |
| A11 | Chamber harbour map | Civic | Atmosphere + audio | Med | Med (map missing) |
| A12 | Cupla twin pour | Playful | Sync / clay | Med | Med (need cup still) |
| A13 | Tool Centre whip-pan | Trade | Camera punch | High | Low (no stills) |
| A14 | Mourne Cycles ghost bike | Trade | Uncanny motion | Med | Med (#trails) |
| A15 | Donard Vet calm pets | Care | Restraint | Med | Med (SVG → raster) |
| A16 | Painted Earth finishes | Gallery | Drawing→paint | High | Blocked (licences) |
| A17 | Kent kinetic type | Brand | Text sync | Med | Prefer live type? |
| A18 | Bucks Head reel remix | Journey | Edit / grade | Low | Case-study surfaces |
| A19 | Elevation claymation | Studio | World-knowledge | Low | Research only |
| A21 | Risograph × Betty melt | Experiment | Style transfer | Med | Research first |
| A22 | Chamber brass / harbour | Civic | Native audio | Med | Prototype + consent |

---

## A3 — Kent afternoon storyboard → living comic

**Intent.** Turn the verified six-beat afternoon (promenade → change → floor → dodgems → VR → sea) into one looping comic reel. Omni’s drawing-to-video lane; arcade register without claiming a survey.

**Attach (prefer one strip per gen, then edit/concat later):**

- `public/media/concepts/kent-amusements/kent-amusements-afternoon-storyboard-01-03.png`
- `public/media/concepts/kent-amusements/kent-amusements-afternoon-storyboard-04-06.png`
- Master reference: `…-afternoon-storyboard-2x3-researched.png`

**Destination.** `public/media/concepts/kent-amusements/kent-amusements-afternoon-comic-loop.{mp4,webm}`  
**Hook.** `#afternoon` / `JourneyPlate.astro` — still strips remain reduced-motion default.

**Constraints.** Indicative comic only. No invented attractions beyond dodgems / VR / machines. No hours, tokens, prices. No readable invented signage. Disclose AI illustration.

**Prompt — panels 01–03 (8s):**

```
Image-to-video from this exact ink-and-gouache comic strip. Keep the three-panel layout, numbering, palette, and indicative geography. Do not become photoreal. Do not invent new attractions or readable shop text.

Animate a continuous 8-second comic motion: subtle paper grain, gentle panel life in order left to right — promenade air and sea swell, change booth soft activity without readable money counts, machine-floor cabinet glow breathing. Camera: slow drift across the strip, almost locked per panel, soft cross-panel continuity. No faces toward camera.

Audio: distant surf, muffled arcade hum, soft coin-tray clink once. No music, no voiceover, no readable on-screen words beyond existing panel numbers.
```

**Prompt — panels 04–06 (8s):**

```
Image-to-video from this exact ink-and-gouache comic strip. Keep the three-panel layout, numbering, palette, and indicative geography. Do not become photoreal.

Animate 8 seconds: indoor dodgems with soft bumper motion and window light, compact VR island with gentle headset glow (no brand logos), return to the sea with open air and swell. Same hand-drawn grain throughout. Camera: slow left-to-right drift across panels.

Audio: soft bumper thump, quiet electronic hum, then open surf. No music, no voiceover, no new text.
```

**Edit turns.**

1. `Remove any new lettering or logos. Keep panel numbers only.`
2. `Less motion in faces/crowds — atmosphere over action.`
3. `Freeze the last half-second for a loop-friendly end.`

**Acceptance.** Six beats still readable at phone width; still strips unchanged for reduced motion; provenance + banner disclosure intact.

---

## A4 — Scopers risograph breathe (bread + supper)

**Intent.** Extend the only shipping concept-native AI video pattern to morning and evening plates. Ink grain stays; steam / paper life moves.

**Attach.**

- Morning: `public/media/concepts/scopers/scopers-generated-bread.jpg`
- Evening: `public/media/concepts/scopers/scopers-generated-supper-table.jpg`
- Style sibling (already looping): `…/risograph-chicken-burger.*`

**Destination.** Same basenames with `.mp4` + `.webm` beside each still.  
**Hook.** `content.ts` day-parts → `ScHero.astro` (already video-capable).

**Constraints.** Appetite theatre, not availability. No named suppliers. No invented supper-club venue. Illustration disclosure. Midday risograph remains the proven reference for motion amount.

**Prompt — bread (6–8s):**

```
Image-to-video from this exact food illustration. Keep the composition, plate, bread, crumb, and print-like grain. Prefer a soft risograph / ink-paper feel over photoreal polish.

Over 6 seconds: almost locked camera; gentle steam or warm air above the bread; paper grain breathes; crumb highlight shifts slightly with soft side light. No hands, no faces, no logos, no text, no packaging.

Audio: quiet kitchen room tone, faint soft crust crack once. No music, no voiceover.
```

**Prompt — supper table (6–8s):**

```
Image-to-video from this exact supper-table illustration. Lock plates, cutlery, food arrangement, and cast-iron / buttermilk palette. Soft print grain, not glossy commercial video.

Over 8 seconds: candle or warm practical light breathes; faint steam; almost no camera move. Empty of people. No logos, no text, no readable menus.

Audio: quiet room, soft cutlery settle once, distant muted kitchen. No music, no voiceover.
```

**Edit turns.**

1. `Keep the illustration look — less photoreal, more ink and paper.`
2. `Reduce steam by half.`
3. `Loop freeze on the final half-second.`

**Acceptance.** Day-part stills remain defaults; video only when both codecs present; guest captions stay plate-only.

---

## A6 — Enniskeen day→dusk continuous take

**Intent.** One continuous light slide across the faithful house plate — place theatre without inventing events.

**Attach.** Prefer day master as start frame:  
`public/media/concepts/hotel-enniskeen/enniskeen-faithful-house.png`  
Optional end-look reference: `enniskeen-faithful-house-dusk.jpg` (describe in prompt; attach day as primary).

**Destination.** `…/enniskeen-house-day-dusk-loop.{mp4,webm}`  
**Hook.** `EnkHero.astro` day-parts — dawn/day stills stay no-JS / reduced-motion defaults.

**Constraints.** Same composition and reference boundary as day-part brief. No people, no new wings, no invented ceremony. Faithful-visualisation disclosure.

**Prompt:**

```
Image-to-video from this exact faithful exterior visualisation of a country house. Lock architecture, driveway relationship, tree masses, and Mourne valley backdrop. Do not redesign the building.

Over 8 seconds, continuous day-to-dusk: afternoon light cools; warm window glow rises in existing window openings only; sky deepens to blue hour. Almost locked camera with a barely perceptible slow push. No people, no cars moving, no new lights that invent storeys, no text, no logos.

Audio: soft valley air, distant quiet birds early then hush, no music, no voiceover.
```

**Edit turns.**

1. `Windows warmer amber; sky deeper blue; architecture unchanged.`
2. `Remove any people or moving cars.`
3. `Slower light change — half the speed.`

**Acceptance.** Dawn/day still remains default; dusk video is progressive enhancement; composition matches still siblings.

---

## A7 — Hugh McCann’s dining room — table being set

**Intent.** Quiet wedding-venue theatre: the room prepared for a day that has not happened yet. Recognition of the faithful room; surprise is stillness with purpose.

**Attach.** `public/media/concepts/hugh-mccanns/hugh-mccanns-faithful-room.jpg`  
Optional dusk sibling for grade only: `hugh-mccanns-faithful-room-dusk.jpg`.

**Destination.** `…/hugh-mccanns-table-setting-loop.{mp4,webm}`  
**Hook.** Hero `data-hm-daypart` in `hugh-mccanns/home.astro`.

**Constraints.** Preserve window bays, table geometry, garden edge, Mourne profile. No people, no ceremony dressing, no terrace/sea invention, no new furniture typology. Disclose faithful visualisation.

**Prompt:**

```
Image-to-video from this exact dining-room visualisation. Lock window bays, table positions, garden edge beyond the glass, and the Mourne profile. Do not add a terrace, sea view, or extra windows.

Over 8 seconds: a quiet table-setting without visible people — napkins settle, glassware catches Mourne light, soft cloth motion at the near place setting only. Afternoon light holds or gently warms. Camera almost locked, slight settle. No faces, no bridalwear, no confetti, no text, no logos.

Audio: soft linen, faint glass chime once, quiet room. No music, no voiceover.
```

**Edit turns.**

1. `Remove any visible hands or people — objects only.`
2. `Less motion; almost still atmosphere.`
3. `Warm the window light only; keep exterior Mournes.`

**Acceptance.** Day still default; no ceremony claims in captions; provenance notes “imagined preparation, not an event.”

---

## A8 — Dundrum Inn blue-hour façade

**Intent.** Existing day→blue-hour still swap becomes a continuous window-lighting loop. Place register, journey not rebuild.

**Attach.** `public/media/concepts/dundrum-inn/dundrum-inn-faithful-exterior.jpg`  
End grade reference: `dundrum-inn-faithful-exterior-blue-hour.jpg`.

**Destination.** `…/dundrum-inn-blue-hour-loop.{mp4,webm}`  
**Hook.** `di-hero-visual` day-part opacity swap in `dundrum-inn/home.astro`.

**Constraints.** Same yellow-black frontage. Don’t invent busy interiors or unverified opening. Day still is default. Disclose faithful visualisation.

**Prompt:**

```
Image-to-video from this exact pub façade visualisation. Lock the frontage colours, signage shapes already in the still, window layout, and street relationship. Do not invent a different building.

Over 8 seconds: day cools into blue hour; a restrained handful of existing windows take warm amber glow one by one; wet pavement reflections breathe. Almost locked camera. No crowds, no readable new text, no logos beyond what is already in the image.

Audio: quiet village evening, soft distant murmur, no music, no voiceover.
```

**Edit turns.**

1. `Fewer windows lit — more restrained.`
2. `Remove any new signage lettering.`
3. `Deeper blue sky; warmer amber only.`

**Acceptance.** Day plate default; bilingual / hours systems untouched by the clip.

---

## A9 — Castle Farm weekly table / delivery round

**Intent.** Keepable artifact in motion: produce still-life drift, or a ghosted van along the indicative round — product register, not fake photography of a real box.

**Attach (pick one gen per day):**

- Theatre: `public/media/concepts/castle-farm/castle-farm-weekly-table-illustration.png`
- Artifact: `public/media/concepts/castle-farm/castle-farm-delivery-round-plate.png`

**Destination.** `…/castle-farm-weekly-table-loop.*` and/or `…/castle-farm-delivery-round-loop.*`  
**Hook.** Hero table fig; `#round` delivery fig in `castle-farm/home.astro`.

**Constraints.** Illustrative only. Towns only from published schedule. Not a survey. Banner disclosure. No invented box contents beyond published categories.

**Prompt — weekly table:**

```
Image-to-video from this exact hand-painted weekly-table still-life. Keep produce, vessels, cloth, and editorial composition. Do not become a supermarket photo.

Over 8 seconds: soft daylight drift; subtle leaf/herb micro-motion; almost locked camera with a barely perceptible push. No hands, no faces, no brand packs, no text, no logos.

Audio: quiet kitchen air, soft cloth. No music, no voiceover.
```

**Prompt — delivery round plate:**

```
Image-to-video from this exact indicative delivery-round plate. Keep geography marks, route language already drawn, and illustration style. Do not become a navigation map or survey.

Over 8 seconds: gentle paper drift; a soft ghost of a small van moves only along the already-drawn route if present — otherwise only light and paper grain breathe. No new towns, no new labels, no logos.

Audio: soft rural road hush, very quiet. No music, no voiceover.
```

**Edit turns.**

1. `Remove any new place names or numbers.`
2. `Slower motion; illustration grain stronger.`

**Acceptance.** Still remains the artifact guests can “keep”; video is atmosphere only.

---

## A10 — Rebuild-stage before→after metaphor (studio only)

> **Workstream home:** `research/studio-storytelling.md` → **S7**. Keep this
> prompt sketch until the first studio slate lands, then maintain the living
> brief there.

**Intent.** A 6s proverb of elevation: tired local presence dissolving into elevated light. For homepage / prototype pitch energy — **not** a substitute for honest capture pairs.

**Attach.** Optional: a muted capture still as texture reference, or pure text-to-video. Do **not** overwrite `*-before/after` capture media.

**Destination.** `public/media/prototypes/` or `research/film/clips/studio/` — never concept guest heroes.  
**Hook.** Optional prototype beside `RebuildStage`; canvas rebuild stays the product mechanism.

**Constraints.** Studio/meta voice only. Must not imply client results. Must not replace capture honesty. Label generated.

**Prompt:**

```
Text-to-video, 6 seconds, 16:9. A muted, dated small-business homepage on a dusty screen grain dissolves into a clear coastal-light webpage composition — same implied local shop, clearer type hierarchy, warmer practical light. Abstract enough that no real brand is identifiable. Soft film grain. No readable URLs, no logos, no phone numbers, no faces.

Audio: soft digital dissolve, then quiet air. No voiceover, no music bed that sentimentalises.
```

**Edit turns.**

1. `Less literal browser chrome — more light and paper.`
2. `No readable text at all.`

**Acceptance.** Lives only under prototypes/research; RebuildStage behaviour unchanged.

---

## A11 — Newcastle Chamber harbour / living map

**Intent.** Civic mood: harbour breath under brass/harbour-navy grammar. Map light-up waits on the town-trades plate (brief move 2) — until then, harbour atmosphere only.

**Attach.** Prefer CC place photo with credit chain:  
`public/media/place/boats-moored-at-newcastle-harbour.jpg`  
Or film still: `research/film/stills/newcastle/05-golden-harbour.png`  
(Reuse clip `research/film/clips/newcastle/05-harbour-boats.mp4` as grade reference — don’t claim it as chamber footage.)

**Destination.** `public/media/concepts/newcastle-chamber/newcastle-chamber-harbour-loop.*`  
**Hook.** Soften `nc-hero` or future map plate — never the directory search job.

**Constraints.** Membership disclaimer if any pins appear. Eric Jones CC BY-SA credit where that photo is used. No invented officers or membership counts. Seal is concept work. Co. Down disambiguation in copy elsewhere, not burned into video text.

**Prompt:**

```
Image-to-video from this exact harbour photograph. Lock boat positions relative to mud/walls, harbour walls, far-shore houses, and the wooded Mourne slope. Preserve low water if boats are grounded — do not invent a full high-tide basin.

Over 8 seconds: gentle light breath, soft water/mud shimmer, almost locked camera with walking-pace drift. No new boats, no logos, no text, no recognisable faces.

Audio: quiet harbour clink, soft water, distant gull once. No brass band yet, no voiceover, no music bed.
```

**Edit turns.**

1. `Cooler civic grade — harbour navy, less tourist postcard.`
2. `Remove any people facing camera.`

**Acceptance.** Photo credit + AI-motion disclosure if guest-facing; directory remains the primary task.

---

## A12 — Cupla twin pour (playful)

**Intent.** Two identical cups pouring in sync — bilingual twins motif as stop-motion / clay-adjacent motion. Needs a cup still first (none in-repo today).

**Pre-step (image pipeline, not Omni).** Generate a single 16:9 still: two identical cups, petrol/oat/caramel Cupla palette, plain table, no logos, no readable Irish/English packaging claims beyond empty cups. Save as `public/media/concepts/cupla/cupla-twin-cups.png`. Disclose as illustrative.

**Attach.** That still.  
**Destination.** `…/cupla-twin-pour-loop.{mp4,webm}`  
**Hook.** `#cp-pair` story band — not a replacement for the faithful frontage (rights-sensitive).

**Constraints.** Only verified twin facts in surrounding copy. No invented twin biographies. Frontage photo rights remain separate. Guest voice as the café.

**Prompt:**

```
Image-to-video from this exact twin-cups still. Keep both cups identical in form and fill level at the start. Soft stop-motion / tactile clay-adjacent material optional but keep the Cupla petrol, oat and caramel palette.

Over 8 seconds: both cups pour in sync into matching saucers or the same motion mirrored — perfect timing, playful and precise. No faces, no hands preferred; if hands appear they must be identical twins of motion. No logos, no readable labels, no text.

Audio: soft pour, dual ceramic clink in sync. No music, no voiceover.
```

**Edit turns.**

1. `Sync the pours tighter.`
2. `Remove branding or text if any appeared.`
3. `More stop-motion chalkiness; less photoreal.`

**Acceptance.** Motif stays symbolic; frontage rights block unchanged.

---

## A13 — Tool Centre shelf vs hire yard whip-pan

**Intent.** Trade punchline in one camera move: hardware shelf → muddy hire yard. Thesis already exists in type (`CounterBridge`); video is optional spectacle — only if it doesn’t fake inventory.

**Pre-step.** Generate a diptych still or single wide still with two clear zones labelled only in the page HTML, not in the artwork. No invented product SKUs, no rates.

**Attach.** New still `tool-centre-shelf-yard.png` (to be made).  
**Destination.** `…/tool-centre-shelf-yard-whip.{mp4,webm}`  
**Hook.** Optional under `#tc-counter` — type band remains the truth.

**Constraints.** Thin verified inventory. No fabricated owner voice. No day rates in frame. Don’t let spectacle outrun honesty.

**Prompt:**

```
Image-to-video from this exact shelf-versus-yard illustration. Left: hardware shelf, dry, orderly. Right: hire yard, muddy, practical. No readable prices, no brand logos, no text.

Over 6 seconds: a single whip-pan from shelf to yard (or a hard energy move that still reads as one shot). Practical daylight. No people faces, no invented machine brands.

Audio: soft shelf quiet then outdoor yard air. No voiceover, no music sting.
```

**Edit turns.**

1. `Remove all lettering and price tags.`
2. `Yard muddier; shelf cleaner — contrast only.`

**Acceptance.** If it needs a caption to explain the joke, kill it — `CounterBridge` already says it.

---

## A14 — Mourne Cycles ghost bike on the trail

**Intent.** Freedom register, slightly uncanny: a riderless bike drifts a verified trail atmosphere. Map stays indicative.

**Attach.** Prefer trails plate: `public/media/maps/mourne-cycles-trails-generated.png`  
Or bike still: `public/media/concepts/mourne-cycles/mourne-cycles-bike-mountain.jpg` (AI bike, not showroom).

**Destination.** `…/mourne-cycles-ghost-bike-loop.{mp4,webm}`  
**Hook.** `#trails` / beside `McTrailsMap.astro` — not a fake hire proof.

**Constraints.** Trails only from shop/public designations. Map indicative. Bike imagery already AI. Banner honesty. No invented stock.

**Prompt (map-led):**

```
Image-to-video from this exact indicative trails map plate. Keep route geography and illustration style. Do not become a survey or GPS track.

Over 8 seconds: soft paper drift; a small ghostly bicycle silhouette travels only along an already-drawn trail line, slow and riderless, then fades. No new trails, no logos, no text beyond what is already in the artwork.

Audio: soft wind in trees, quiet chain tick. No music, no voiceover.
```

**Prompt (bike-led alternate):**

```
Image-to-video from this mountain-bike still. Keep the bike design. Place it in soft Mourne forest path fog, riderless, rolling slowly away from camera as if guided by the trail. Cinematic but not advertisement-glossy. No logos, no text, no rider.

Audio: soft tyre on damp path, wind. No music, no voiceover.
```

**Edit turns.**

1. `More fog; less product-shine.`
2. `Bike slower; no rider ever.`

**Acceptance.** Map disclaimer unchanged; ghost bike never implies a photographed shop fleet.

---

## A15 — Donard Veterinary calm pets

**Intent.** Care theatre as anti-spectacle: drawn pets almost still — blink, breath, tail tip. Reassurance, not virality.

**Pre-step.** Rasterize one `DvPetIllustrations` composition to PNG (dog/cat/rabbit cast on calm ground), or draw a single still matching the SVG language. Save `donard-veterinary-pet-cast.png`.

**Attach.** That raster.  
**Destination.** `…/donard-veterinary-calm-pets-loop.{mp4,webm}`  
**Hook.** `#life` life arc — not the hero.

**Constraints.** Drawings not photos. Bereavement-adjacent pages stay gentle. No medical claims. Banner disclosure. Prefer almost-nothing-happens.

**Prompt:**

```
Image-to-video from this exact drawn pet cast. Keep the illustration style — not photoreal animals. Over 8 seconds: tiny calm motions only — a blink, a breath, a tail tip. Soft waiting-room light. No text, no logos, no clinical equipment inventing services.

Audio: very quiet room tone, distant soft clock tick optional. No music, no voiceover.
```

**Edit turns.**

1. `Half the motion.`
2. `No new animals or breeds.`

**Acceptance.** If it feels like a sticker pack animation, kill the bounce — calm only.

---

## A16 — Painted Earth: a painting that finishes itself

**Intent.** Gallery magic — brush strokes completing a landscape — **blocked for guest use** until maker licences exist. Keep as research anti-pattern + future prompt.

**Status.** **Do not wire.** 92 makers, no licences; placeholders must stay labelled. Elevation brief unimplemented on gallery stock.

**If researched internally (prototype only):** abstract non-attributable landscape, never a named maker’s work, never implying Painted Earth’s upstairs stock.

**Prompt (research only):**

```
Text-to-video, 8 seconds. An unfinished oil landscape of coastal mountains on an easel in a quiet gallery corner completes itself with visible brush strokes, then freezes. No readable artist names, no price tags, no logos. Soft natural window light.

Audio: soft brush on canvas, quiet room. No voiceover.
```

**Acceptance.** File under `research/` or prototypes only; never imply real stock.

---

## A17 — Kent kinetic type — “Machines change, summer doesn’t”

**Intent.** Omni’s text-sync strength as brand film. Prefer **live accessible type** over burned-in words if this ever ships on the concept; use Omni to test rhythm, then re-implement in CSS/canvas.

**Attach.** Optional backdrop: `kent-amusements-promenade-dusk.png` or lights loop (no new fascia lettering).

**Destination.** Research/prototype first: `research/film/clips/kent/kent-thesis-kinetic.mp4`  
**Hook.** Inspiration for `.ka-thesis` / `#summers` — production path may be non-Omni type motion.

**Constraints.** Guest voice as the arcade. No process language. Paradox line is essence, not a slogan sticker pile. Prefer not to burn text into a guest hero if HTML type can do the job.

**Prompt (exploration):**

```
Text-to-video, 8 seconds, 16:9. Over a hand-drawn pier-navy and ticket-amber seaside arcade promenade (no readable fascia names), the words appear one phrase at a time in sync with a soft arcade rhythm:

Machines change
summer doesn’t

Ticket-amber type, clean, not gamer chrome. No logos, no other text, no faces. Atmosphere over action.

Audio: soft arcade hum and surf under the phrase hits. No voiceover.
```

**Edit turns.**

1. `Exact wording only — no extra words.`
2. `Slower; more poster, less promo.`

**Acceptance.** If burned-in type wins, keep it prototype-only; ship kinetic type as real DOM text.

---

## A18 — Bucks Head journey reel remix

**Intent.** Conversational grade/edit pass on the existing journey storytelling reel — spruce-green warmth, booking mood — without SaaS theatre or fake ResDiary UI.

**Attach / source.** `public/media/concepts/bucks-head/bucks-head-journey.mp4` (and poster).  
Note: UK/EEA may restrict **uploaded** video edit; if blocked, rebuild as image-to-video from journey step stills `bucks-head-journey-booking-after-*.jpg`.

**Destination.** Replace reel only after side-by-side review; keep poster.  
**Hook.** Transformation journey / `ReelPlayer` — concept hero stays hearth still.

**Constraints.** Journey not rebuild. Steps from plan/captures only. No invented booking product UI.

**Prompt (stills path):**

```
Image-to-video using these booking-journey stills as the visual lock. Soft spruce-green and blush hospitality grade. Over 8–10 seconds, gentle transitions between waiting / table / confirmation moods without showing a readable third-party booking UI. No logos, no prices, no faces toward camera.

Audio: quiet pub room, soft glass. No voiceover.
```

**Edit turns.**

1. `Warmer practical light; less corporate.`
2. `Remove any readable screen UI.`

**Acceptance.** Case-study journey still explains itself without the reel; reel remains enhancement.

---

## A19 — Elevation-method claymation explainer (studio)

> **Workstream home:** `research/studio-storytelling.md` → **S1** (day-one
> slate gens 1–2). Living brief and contact-sheet notes move there.

**Intent.** Skeuomorphic stop-motion of “recognition + theatre” for internal teaching / showcase — never guest concepts.

**Attach.** None required (text-to-video). Optional paper props photographed as reference.

**Destination.** `research/film/clips/studio/elevation-method-claymation.mp4` or `/prototypes/showcase/`  
**Hook.** None on concepts.

**Constraints.** Meta voice only outside guest UI. No client claims. Disclose generated.

**Prompt:**

```
Text-to-video, 10 seconds. Claymation / paper-craft stop motion, no hands in frame. First, a small clay shopfront receives one precise recognisable detail (a real brass number, a local hill silhouette). Second, one theatrical surprise in the same register (a warm window glow at dusk). Title cards optional as hand-lettered paper slips:

recognition
theatre

Accurate to the idea, gentle humour, not corporate explainer energy. No real business names, no logos.

Audio: soft stop-motion Foley, quiet craft room. Calm voiceover optional: "Find what is already true. Then one surprise in their register." If voiceover is shaky, drop it and keep Foley only.
```

**Edit turns.**

1. `Remove any real brand names.`
2. `Slower; fewer cuts — Omni should stay one continuous craft table if possible.`

**Acceptance.** Never linked from `src/concepts/*/`.

---

## A20 — Conversational edit protocol (standing)

Practiced on Kent promenade lights (VARIETY invented → blank panels).

**Rule.** First gen validates motion and lock. **Edits** fix honesty. Do not re-roll from scratch unless geography collapsed.

**Checklist after every image-to-video:**

1. Invented lettering / logos / prices?
2. Hands / faces contrary to brief?
3. Architecture drift vs still?
4. Photoreal bleed on illustration plates?
5. Loop ending freeze?
6. Audio sentimentalising?

**Stock edit prompts.**

```
Keep everything. Remove all lettering and logos. Blank panels stay blank.
```

```
Keep the frame. Remove hands and faces. Objects only.
```

```
Keep geography and architecture exact. Change only light and atmosphere.
```

```
Less photoreal; more of the source illustration’s paper/ink grain.
```

```
Freeze the final half-second for a seamless loop.
```

Log each edit pass in provenance (“first pass …; edit pass …”).

---

## A21 — Scopers risograph style × Betty melt

**Intent.** Test whether a Mourne Made “print motion” house style can span concepts. Research first; don’t overwrite Scopers or the held photoreal melt loop.

**Attach.**

- Content: `public/media/concepts/bettys-butters/bettys-butters-generated-melt.jpg`
- Style ref: `public/media/concepts/scopers/risograph-chicken-burger.png` (or jpg)

**Destination.** `…/bettys-butters-melt-risograph.{jpg?,mp4,webm}` — new files only.  
**Hook.** Research comparison; guest wire only with dual disclosure.

**Constraints.** Betty flavours remain illustrative. Cross-brand experiment may stay internal. If guest: banner already says serving imagery is AI-generated; say if print-styled.

**Prompt:**

```
Reference-to-video / image-to-video. Use the butter knife still for subject and composition. Apply the risograph / ink-paper grain, limited pigment feel, and soft print texture from the chicken-burger illustration reference. Keep the knife cutting soft butter on the wooden board.

Over 6 seconds: cut completes; print grain breathes; not glossy food-ad video. No logos, no text, no packaging.

Audio: soft knife-through-butter. No music, no voiceover.
```

**Edit turns.**

1. `Stronger ink grain; weaker photoreal sheen.`
2. `Keep butter yellow readable — not muddied into grey print.`

**Acceptance.** Side-by-side with photoreal melt loop; pick one language per concept, don’t mix casually on the same hero.

---

## A22 — Chamber brass / harbour audio-first

**Intent.** Ask whether native/synced audio sells civic place harder than picture. Pair a restrained harbour loop (A11) with a sparse brass/gull/tide bed — not a marching-band tourist cue.

**Attach.** Harbour still from A11.  
**Audio path.** Prefer ElevenLabs stems via `pnpm generate:ambience` patterns, or Omni native audio kept very quiet. Existing Newcastle film stems in `research/film/audio/newcastle/` are seafront, not chamber brass — don’t misuse as “committee audio.”

**Destination.** Prototype bed `public/media/prototypes/chamber-harbour-ambience.mp3` + optional loop.  
**Hook.** Opt-in only on a prototype; consent before any committee-facing voice.

**Constraints.** Synthetic speech needs agreement. No membership claims. Photo credits. Opt-in never autoplay.

**Prompt (visual + sparse audio):**

```
Image-to-video from this harbour still. Same lock rules as the harbour loop. Over 8 seconds: almost still. Audio only: distant soft brass rehearsal fragment far away (barely there), tide, one gull — never a fanfare, never a melody that sentimentalises. No voiceover, no readable text.
```

**Edit turns.**

1. `Brass quieter — almost imagined.`
2. `No melody; tonal air only.`

**Acceptance.** If brass reads as tourism board, strip to tide + gull only.

---

## Wiring checklist (when a held clip earns a page)

1. Still on disk remains poster + reduced-motion experience.
2. Provide both `.mp4` and `.webm` (Scopers pattern) or deliberately document a single-codec exception.
3. Visible disclosure + aria that matches honesty boundary.
4. Provenance entry same commit as the wire-up.
5. Recapture transformation comparison stills/clips if first viewport changes (`docs/MEDIA_CAPTURE.md`).
6. Guest-voice guard clean.
7. Premises consent if the clip depicts a real trading frontage as “film of the business.”

---

## Index of held Omni assets (5 August 2026)

| File | Idea | Wired? |
| --- | --- | --- |
| `research/film/clips/<town>/01–06-*.mp4` | #1 town films | Prototype film hero |
| `public/media/home/<town>-film.*` | #1 assembled | Prototype |
| `kent-amusements-promenade-lights.mp4` | #2 | Held |
| `bettys-butters-melt-loop.mp4` | #5 | Held |
| `scopers/risograph-chicken-burger.{mp4,webm}` | Pre-Omni appetite loop | **Wired** |

When a backlog ID ships, move its row to this table and trim the section above to a short “shipped” pointer — keep prompts for regenerate-ability.
