# Shimna Taxis — day-8 guest concept

Authored 14 September 2026 (Europe/London) under
`/workspace/day8/shimna-taxis/`, mirroring `cbrown564-alt/local` paths.
No clone. No CloudAgent. Push straight to master via `push-one.sh`.

## Kind

**ride** — ring to book. Mechanism = phone.

## One-liner

Local taxis on Railway Street — ring either line, day or night.

## Artefact

`DispatchCard.astro` — drawn dispatch card naming **18 Railway Street**,
both first-party phones, and 24/365. Caption: “The dispatch card for 18.”
Honesty that it is a drawing lives in `bannerNote` only. Not “not a
photograph of…”.

## Paths

| File | Repo path |
| --- | --- |
| Guest home | `src/concepts/shimna-taxis/home.astro` |
| Styles | `src/concepts/shimna-taxis/styles.css` |
| Dispatch card | `src/concepts/shimna-taxis/DispatchCard.astro` |
| Page wrapper | `src/pages/concepts/shimna-taxis.astro` |
| Copy brief | `research/concepts/shimna-taxis/shimna-taxis-copy-brief.md` |
| Elevation brief | `research/concepts/shimna-taxis/shimna-taxis-elevation-brief.md` |
| These notes | `research/concepts/shimna-taxis/NOTES.md` |

## Flagship hits

- **Strip + mark + nav** — utility strip with door + both lines + 24/365;
  bespoke roof-light SVG mark; nav to board / desk / dispatch.
- **Airy first screen** — name biggest type, 18 under it, ring CTAs.
  No packed dusk form box.
- **Magazine middle** — dispatch-board stock + short travel editorial.
- **Ritual** — staged DispatchCard with one-tap `tel:` on both lines.
- **Signature artefact** — names 18 Railway Street; could not move to
  another town’s rank.
- **Guest voice** — we / ring us. No plate questions. No page-about-itself.
- **Handoff** — shimnatravel.co.uk.

EssenceMedia omitted — no record for this slug. No rasters.

## Honesty

- Phones **028 437 24100** / **028 4372 3030** → `tel:+442843724100` /
  `tel:+442843723030` as on contact page 14 Sep 2026.
- Email **info@shimnatravel.co.uk**.
- Door **18 Railway Street, Newcastle, BT33 0AL**.
- Distinct from **Shimna Café, 2 Main Street**.
- 24/365, airport, day trips, executive/VIP, golf, female driver option,
  cards — first-party only.
- No founding year. No form. No fake ETA.

## Identity

- Prefix `st`. Body class `concept-page concept-shimna-taxis`.
- Fonts via `fontHref` (Archivo + Source Serif 4). Not added to shell map.
- Palette: midnight dispatch charcoal, amber roof-light, cream card stock,
  railway steel. Not café linen, not glass cyan, not toy-shop rose.

## Swap test

Shimna Taxis, 18 Railway Street, both Newcastle numbers. Remove those and
any taxi firm could wear it.

## Open on merge

- Add `shimna-taxis` to `conceptFonts` if the team prefers the map.
- Add `.st-strip` to the shared strip `:where()` list if needed.
- Do not mount EssenceMedia until a record exists.
- Do not add to `/transformations` until Conor clears publish.
