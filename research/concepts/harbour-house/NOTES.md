# Harbour House Newcastle — day-7 guest concept

Authored 13 September 2026 (Europe/London) under
`/workspace/day7/harbour-house/`, mirroring repo paths. No clone.
No CloudAgent. No push. No merge. No publish.

## Kind

**meal** — rooms = stock / Accommodation handoff, not hotel reserve theatre.

## One-liner

Second-generation Connolly hospitality on the sea wall: seafood and Dundrum Bay, with eight rooms upstairs if the evening runs long.

## Paths

| File | Repo path |
| --- | --- |
| Guest home | `src/concepts/harbour-house/home.astro` |
| Styles | `src/concepts/harbour-house/styles.css` |
| Sea-wall door | `src/concepts/harbour-house/SeaWallDoor.astro` |
| Page wrapper | `src/pages/concepts/harbour-house.astro` |
| Copy brief | `research/concepts/harbour-house/harbour-house-copy-brief.md` |
| Elevation brief | `research/concepts/harbour-house/harbour-house-elevation-brief.md` |
| These notes | `research/concepts/harbour-house/NOTES.md` |

Read shape from Day 4/6 ConceptLayout grammar (strip / mark / nav; airy
first screen; one artefact; guest voice; drawing honesty in bannerNote):
cafe-67, railway-street, joes-quality-meats, chatterbox — chrome only.
**Not** a visual clone of Buck's Head, Enniskeen, or Dundrum Inn. Door =
harbour / sea wall. Elevation brief copied unchanged from
`/workspace/day7/research/concepts/harbour-house/harbour-house-elevation-brief.md`.
First-party home re-read 13 Sep 2026 Europe/London.

## Flagship hits

- **Strip + mark + nav** — sea-wall mark; strip holds 4–8 South Promenade
  and the number. `.hh-strip` is not in `concept-shell.css` `:where()`;
  add on merge. Identity CSS already sets `display: flex`.
- **Airy first screen** — Harbour House as biggest type, South Promenade
  under it, Book Table / tel / mailto. Artefact beside. Meal register, not
  a bedroom hero and not a packed form.
- **Editorial house middle** — South Prom Brew Bar / Water Edge Terrace /
  The Pantry as named reasons to come; Connolly arc lightly (40+ / second
  generation only).
- **Staged table ritual** — Book Table outbound · `tel:+442843723445` ·
  `mailto:harbourhousenewcastle@gmail.com`. No studio availability engine.
- **Rooms as stock rail** — “8” stock card + Accommodation handoff. No
  open/few/taken calendar. No fake rates.
- **One unmovable artefact** — `SeaWallDoor.astro`, swap-locked to sea wall,
  harbour door, HARBOUR HOUSE fascia, 4–8, Dundrum Bay / working harbour.
  Caption: “The harbour door on the sea wall.”
- **Guest voice** — we / the sea wall / Book Table. No plate questions.
  No page-about-itself. No competitor names on the door.
- **Drawing honesty in bannerNote only** — “The harbour door on the sea
  wall is a drawing.”

EssenceMedia omitted — no `essence-media.ts` entry for this slug. No
rasters under `/media`.

## Flagship self-score

**8 / 8** on the taste list (strip+mark+nav; airy meal-first screen;
house magazine middle; Book Table / tel / mailto ritual; rooms as stock
not theatre; one sea-wall artefact; guest voice; bannerNote drawing
honesty). Deduct nothing for kind discipline — rooms deliberately
secondary. Unrendered here (no local Astro build); `.hh-strip` not yet in
shared `:where()`.

## Honesty — re-read 13 September 2026, Europe/London

First-party home `https://www.harbourhousenewcastle.com/` only on the
guest page. Dated here.

**Still true:**

- Connolly family, 40+ years, second generation
- 4–8 South Promenade, Newcastle, Co. Down, BT33 0EX
- (028) 4372 3445 / +44 (0) 28 4372 3445 · harbourhousenewcastle@gmail.com
- Seafood / shellfish specials daily; seasonal menus; vegan/vegetarian bistro
- South Prom Brew Bar; Water Edge Terrace & Cocktail Bar; The Pantry;
  lounge / bar / pool room; beer-garden views
- 8 en suite bedrooms, Dundrum Bay views, Wi-Fi, breakfasts praised
- Built on the sea wall overlooking the harbour; small-scale commercial fishing
- Peer CTAs: Accommodation · Book Table
- “Newly-opened” South Prom Brew Bar — their phrase on this read

**Not printed:**

- Kitchen hours (unpublished on home)
- Invented specials dish list
- Room rates / availability calendar
- Deep iframe booking (subpaths sat behind bot challenge on curl earlier;
  outbound `/book-a-table/` and `/accommodation/` as handoffs)
- Studio contrast names on the guest page

## Identity

- Prefix `hh-`. Body class `concept-page concept-harbour-house`.
- Fonts passed as `fontHref` (Crimson Pro + Manrope). Not added to
  `ConceptLayout` `conceptFonts` map — no shell edit.
- Palette: shell cream / harbour bay teal / sea-wall stone / rope copper /
  moss. Not Buck's inland door, not Enniskeen country-house dusk, not
  Dundrum Inn Main Street inn paper.

## Swap test

Harbour House, sea wall, Connolly, Dundrum Bay bedrooms, South Prom Brew
Bar, 4–8 South Promenade. Remove those and Buck's Head or Dundrum Inn
could wear what remains — stop.

## Open on merge

- Add `harbour-house` to `conceptFonts` if the team prefers the map.
- Add `.hh-strip` to the shared strip `:where()` list.
- Do not mount EssenceMedia until a record exists.
- Re-open Book Table + Accommodation the morning of build (captcha risk).
- Re-check “newly-opened” Brew Bar phrasing on the next first-party read.
