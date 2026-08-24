# Shimna Café — day-3 guest concept

Authored 24 August 2026 (Europe/London) under `/workspace/day3/shimna-cafe/`,
mirroring repo paths. No clone. No CloudAgent. No push.

## Paths

| File | Repo path |
| --- | --- |
| Guest home | `src/concepts/shimna-cafe/home.astro` |
| Styles | `src/concepts/shimna-cafe/styles.css` |
| Table card | `src/concepts/shimna-cafe/TableCard.astro` |
| Page wrapper | `src/pages/concepts/shimna-cafe.astro` |
| Copy brief | `research/concepts/shimna-cafe/shimna-cafe-copy-brief.md` |
| These notes | `NOTES.md` |

## Kind / artefact

- **Kind:** meal (walk-in sit-down).
- **Essence:** sit-down after the walk.
- **Artefact:** one folded **table card** (`TableCard.astro`) on a check cloth, staged with Walk in + `tel:02843723472`.
- **Handoff:** Facebook (Shimna Cafe). No owned site.

## Flagship mapping

Dental chrome kept at a distance: utility strip + bespoke mark + simple nav.
Dental first screen is copy + **form** — this page is airy **window** (copy +
empty sash light), then a magazine fry/soup/scone spread, then the card.
Not a Mauds clone (no ice-cream counter, no brand-kit scoops). Not a
dental clone (no request form).

Read on `sprint-day3-five`: `src/concepts/newcastle-dental/` (strip/mark/nav)
and `src/concepts/scopers/` (guest meal voice). Paths
`newcastle-family-dental` and `scopers-ice-cream` and
`research/concepts/shimna-cafe/` were **not on that branch** at author time
(05ece39). Box harvest `wt-day2/.../shimna-cafe-elevation-brief.md` is a
different door (2 Main Street / 028 4372 3010 / Yumm unread). Guest copy
follows the day-3 brief: **84 Central Promenade / 028 4372 3472**.

## Honesty limits

Printed on the guest page: address, phone, hours Mon–Sat 8:30–4 / Sun 9–4,
family-run 30+ years, breakfast all day, Ulster fry, homemade soup, scones,
traybakes, kids menu, takeaway, cash and card, parking at rear, Facebook.

Held off the guest page:

- 4.8 from 847 Google reviews (third-party score — no review wall).
- 2 Main Street / 028 4372 3010 / Yumm / outdoor seating from the 23 Aug harvest.
- Owner names, priced menu, reserve/book form, website CTA.
- Caption language that explains the drawing ("not a photograph…").

## Identity

- Prefix `sh-`. Body class `concept-page concept-shimna`.
- Fonts via `fontHref` (Fraunces + Figtree). No shell edit.
- No `EssenceMedia`. No raster in `public/media/`. Plate is inline SVG.

## Swap test

Shimna, Central Promenade, after the walk, and fry/soup/scone are load-bearing.

## Open on merge

- Add `.sh-strip` to shared strip `:where()` if that list is still in use.
- Confirm Facebook URL `facebook.com/shimnacafe` still matches "Shimna Cafe".
- Confirm 84 Central Promenade vs the older Main Street harvest with the family.
