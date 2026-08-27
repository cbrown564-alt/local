# Vintage etc. — day-3 guest concept

Authored 24 August 2026 (Europe/London) under `/workspace/day3/vintage-etc/`,
mirroring repo paths. No clone. No CloudAgent. No push.

## Paths

| File | Repo path |
| --- | --- |
| Guest home | `src/concepts/vintage-etc/home.astro` |
| Styles | `src/concepts/vintage-etc/styles.css` |
| Room map | `src/concepts/vintage-etc/RoomMap.astro` |
| Page wrapper | `src/pages/concepts/vintage-etc.astro` |
| Copy brief | `research/concepts/vintage-etc/vintage-etc-copy-brief.md` |
| These notes | `NOTES.md` |

Read against `sprint-day3-five`: newcastle-dental home+css (utility strip,
bespoke mark, simple nav — first screen there is a form; this page is not),
scopers home (guest voice, honest social handoff), ConceptLayout (`fontHref`,
`businessName`/`town`). `research/concepts/vintage-etc/` was empty on the
branch; pipeline row in `research/pipeline/verifications.json` (4 Main Street,
social-only) is noted and overridden by the day-3 brief.

## Kind

**None of the five.** Arcade / market browse: Saturday through three rooms.

## Artefact

`RoomMap.astro` — paper plan of front / middle / back + stall card
(Walk in + tel). Inline SVG. No raster in `public/media/`.

## Flagship mapping

Chrome only: strip + three-arch mark + Rooms / Traders / Saturday.
First screen is airy (rooms opening), not a packed form.
Middle is a three-column gazette, not a dental arc or a butcher case.
Prefix `ve-`. Fonts via page-level `fontHref` (Libre Caslon Text + Sora).
No `EssenceMedia`. No shell edit.

## Honesty limits

- Live stock, who is trading this week, and room photographs: their site
  and Facebook only. This page does not sell.
- Joe's Quality Meats is inside; this is not Joe's page.
- Room names (front / middle / back) are the walk, not a published
  floor-plan title from the business.
- Facebook URL uses the 2026-08-05 attributable `magsvintageetc` listing;
  guest chrome says "Facebook · Vintage Etc".
- Address printed as **6 Main Street** (brief). Older directory 4 Main
  Street is not used.
- No fake checkout. No invented stall list. No plate-question captions.
- Rating 4.6 / 547 printed as given in the brief; not sourced further here.

## Swap test

Arcade of 30+ traders, three rooms, Saturday browse, 6 Main Street, and
Joe's-as-tenant are load-bearing. Remove them and the page is any vintage shop.

## Open on merge

- Add `vintage-etc` to `conceptFonts` if the team prefers the map.
- Add `.ve-strip` to the shared strip `:where()` list.
- Confirm Facebook URL still resolves as Vintage Etc.
- Confirm 6 Main Street vs any remaining 4 Main Street listings.
