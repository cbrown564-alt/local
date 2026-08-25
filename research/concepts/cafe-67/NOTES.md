# Café 67 — day 4 authoring notes

Authored 25 August 2026 (Europe/London). One Mourne Made guest concept.
Not cloned. Not CloudAgent. Not pushed. Files live under
`/workspace/day4/cafe-67/` mirroring repo paths.

## Kind

Meal.

## One-liner

Coffee and brunch at 67. The website is still new.

## Artefact

67 number plate / brunch ticket (`NumberPlate.astro`). A yellow NI plate
reading 67, mounted on a perforated walk-in stub. Compact mark in the
header; full ticket on the first screen. Number-as-door, not a Railway
clone, not a shopfront drawing, not a food plate.

## Paths

| File | Repo path |
| --- | --- |
| Guest home | `src/concepts/cafe-67/home.astro` |
| Styles | `src/concepts/cafe-67/styles.css` |
| Artefact | `src/concepts/cafe-67/NumberPlate.astro` |
| Page wrapper | `src/pages/concepts/cafe-67.astro` |
| Copy brief | `research/concepts/cafe-67/cafe-67-copy-brief.md` |
| Elevation brief | `research/concepts/cafe-67/cafe-67-elevation-brief.md` |
| These notes | `NOTES.md` (workspace only) |

Read against `cbrown564-alt/local` `master`: newcastle-dental home+css
(strip / mark / nav; airy staged action; guest voice; honesty in comments
and banner, not on the door), scopers home (editorial meal texture;
Facebook/IG for what moves; no fake board). Brief: `sprint-day2-five`
`research/concepts/cafe-67/cafe-67-elevation-brief.md` (mirrored here).

## Flagship hits

- **Strip + mark + nav** — dental chrome. `.c67-strip` is not yet in
  `concept-shell.css` `:where()`; add on merge.
- **Airy first screen** — name + street + walk in / tel:02843798485 /
  mailto. Artefact beside. Not a packed form (dental’s first screen is
  the form; this one is the door).
- **Magazine middle** — folio, two columns (3fe / walk-in brunch), pull
  quote, watermark 67. Editorial, not a year-arc.
- **Staged action** — Walk in · Ring · Write. No booking widget.
- **One artefact that cannot move** — the 67 plate. Swap the name and
  the ticket still says 67 Main Street.
- **Guest voice** — we / walk in / our website is still new. Holding
  page is their site, not this concept talking about itself.
- **Listing labelled as listing** — Google dish names, not a signed
  tariff. Instagram is today. cafe67.co.uk is not linked.

EssenceMedia omitted — no `essence-media` record for this slug; the
component assumes frames. Wire on merge if wanted.

## Honesty

- Hours dated both on the door (IG 8–4 / kitchen 9–3 / seven days vs
  Google 5pm). Harvest date stays in the briefs, not guest chrome.
- Owner omitted. Opening year omitted.
- Facebook unread — omitted.
- cafe67.co.uk named as still new; not deep-linked as a menu.
- Banner note discloses the plate as a drawn brunch ticket. Caption
  does not say “not a photograph”.
- No plate questions. No page-about-itself.

## Identity

- Prefix `c67-`. Body class `concept-page concept-cafe-67`.
- Fonts passed as `fontHref` (Ibarra Real Nova + Nunito Sans). Not
  added to `ConceptLayout` `conceptFonts` map — no shell edit.
- Palette: milk / espresso / plate yellow / 3fe terracotta. Not dental
  blue, not scopers chalk, not Shimna avocado.

## Swap test

Café 67, 67 Main Street, 3fe, the holding-page line, Instagram as
today. Remove those and any brunch room could wear it.

## Wiring when this lands on the branch

1. Copy the `src/` and `research/` trees into the repo.
2. Add `.c67-strip` to the shared strip `:where()` list in
   `src/concepts/_shell/concept-shell.css`.
3. Optional: add a `cafe-67` entry to `conceptFonts` in ConceptLayout.
   Not required — `home.astro` passes `fontHref`.
4. Do **not** mount `EssenceMedia` until a record exists.
5. Do not push from this folder. Do not CloudAgent.
