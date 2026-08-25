# Niki's Kitchen Café — day 4 authoring notes

Authored 25 August 2026 (Europe/London). One Mourne Made guest concept.
Not cloned. Not CloudAgent. Not pushed. Files live under
`/workspace/day4/nikis-kitchen-cafe/` mirroring repo paths.

## Kind

Meal.

## Artefact

Weekday Wonders chalkboard (`WeekdayBoard.astro`) plus a table slip on the
first screen. Both dated / numbered to 107. Not a live tariff.

## One-liner

A quick fulfilling bite mid-week without splashing out — then the sea.

## Paths

| File | Repo path |
| --- | --- |
| Guest home | `src/concepts/nikis-kitchen-cafe/home.astro` |
| Styles | `src/concepts/nikis-kitchen-cafe/styles.css` |
| Artefact | `src/concepts/nikis-kitchen-cafe/WeekdayBoard.astro` |
| Page wrapper | `src/pages/concepts/nikis-kitchen-cafe.astro` |
| Copy brief | `research/concepts/nikis-kitchen-cafe/nikis-kitchen-cafe-copy-brief.md` |
| Elevation brief (mirrored) | `research/concepts/nikis-kitchen-cafe/nikis-kitchen-cafe-elevation-brief.md` |
| These notes | `NOTES.md` (workspace only) |

Read flagship from `cbrown564-alt/local` **master**: newcastle-dental
`home.astro` + `styles.css` (strip + mark + nav; ConceptLayout; guest voice;
honesty in comments / banner) and scopers `home.astro` (magazine meal
texture; Facebook for what moves; no fake live board). Brief:
`sprint-day2-five`
`research/concepts/nikis-kitchen-cafe/nikis-kitchen-cafe-elevation-brief.md`.

## Flagship grammar used

- **Strip + mark + nav** — dental chrome. Enamel **107** is the mark.
  `.nk-strip` is not yet in `concept-shell.css` `:where()`; add on merge.
- **Airy first screen** — name as biggest type, short essence, walk in +
  `tel:+442843726777`. Table slip as the door artefact. Not a packed form
  (dental’s first screen is the form; this one is the slip).
- **Magazine middle** — poster pull-quote + typeset five plates beside the
  chalkboard. Scopers editorial texture, not Scopers’ larder map.
- **Staged action** — walk in / ring. No booking form. Facebook for today.
- **One artefact that cannot move** — 107 on the slip + Weekday Wonders at
  £12.50. Swap the name and the number and the board still say this door.
- **Guest voice** — we / walk in / our board. No plate questions. No
  page-about-itself. Captions do not say “not a photograph of…”.
- **EssenceMedia omitted** — no `essence-media.ts` entry for this slug.

Layout is a one-off **promenade kitchen**: horizon sea band, table slip,
chalkboard. Not Mauds (ice cream parlour). Not Shimna (Main Street corner,
avocado plate, Yumm, platter script).

## Honesty

- **No owned website.** None invented. No booking form, no mailto.
- **Owner unnamed.** “Niki” is the shop name only. No “Niki opened…”.
- **Hours conflict dated, not won.** Google (harvest 23 Aug 2026): 8–3
  seven days. Instagram bio: Monday–Friday from 8. Facebook 4 May 2026:
  closed May Day Monday, back Tuesday–Friday that week. Strip says
  Facebook, not a clock. Do not assert Sunday hours without the Google date.
- **Weekday Wonders** staged from the Facebook poster (August 2026), all
  £12.50, as a chalkboard — not a live tariff.
- **Reviews** handed to Google. No invented praise. Daisy C omitted
  (partial fry argument; theatre is the printed list).
- **825** not used as a boast.
- **Instagram bio URL** broken — not handed off. Handle only.
- **Visit Mourne** not found.
- **FB unread** beyond the public shell (brief).
- Banner note carries hours-disagree + dated-board. Captions stay guest.

## Identity

- Prefix `nk-`. Body class `concept-page concept-nikis`.
- Fonts passed as `fontHref` (Calistoga + Nunito Sans). Not added to
  `ConceptLayout` `conceptFonts` map — no shell edit.
- Palette: tomato oil / cream slip / promenade teal / chalkboard. Not
  dental blue, not Shimna avocado, not studio gorse.

## Wiring when this lands on the branch

1. Copy the `src/` and `research/` trees into the repo.
2. Add `.nk-strip` to the shared strip `:where()` list in
   `src/concepts/_shell/concept-shell.css` (identity CSS already sets
   `display: flex` so the door still holds without that edit).
3. Optional: add a `nikis-kitchen-cafe` entry to `conceptFonts`.
   Pairing: Calistoga + Nunito Sans.
4. Do **not** mount `EssenceMedia` until a record exists.
5. Do not invent a site URL or a booking engine.

## Swap test

Without Niki's Kitchen Café, 107 Central Promenade, Weekday Wonders at
£12.50, and the May Day line, any promenade café could wear it. Those four
stay.
