# Joe's Quality Meats — day-6 guest concept

Authored 29 August 2026 (Europe/London) under
`/workspace/day6/joes-quality-meats/`, mirroring repo paths. No clone.
No CloudAgent. No push. No merge. No publish.

## Kind

Jar / counter (take-home). Not a café.

## One-liner

Meats on Main Street. A wee deli at the back.

## Paths

| File | Repo path |
| --- | --- |
| Guest home | `src/concepts/joes-quality-meats/home.astro` |
| Styles | `src/concepts/joes-quality-meats/styles.css` |
| Deli plate | `src/concepts/joes-quality-meats/DeliPlate.astro` |
| Page wrapper | `src/pages/concepts/joes-quality-meats.astro` |
| Copy brief | `research/concepts/joes-quality-meats/joes-quality-meats-copy-brief.md` |
| Elevation brief | `research/concepts/joes-quality-meats/joes-quality-meats-elevation-brief.md` |
| These notes | `research/concepts/joes-quality-meats/NOTES.md` |

Read against `cbrown564-alt/local` `refs/heads/master` (GitHub API, no clone):
Railway Street `home.astro` (airy mast, name as biggest type, walk-in / tel,
handoff, no form) and Smalls Butchers `home.astro` (shopping-centre butcher —
contrast only). Layout is one-off: shop depth, front meats / back deli, metro
tile. Not a Smalls arcade clone and not a Railway Saturday café spread.
Brief: 23 August 2026 elevation brief, pasted unchanged. Live public facts
re-read 29 August 2026.

## Flagship hits

- **Strip + mark + nav** — enamel 6 as the mark; strip holds 6 Main Street
  and the number. `.jq-strip` is not in `concept-shell.css` `:where()`;
  add on merge. Identity CSS already sets `display: flex`.
- **Airy first screen** — Joe's as the biggest type, Quality Meats under
  it, 6 Main Street · BT33 0AD, Walk in / tel. Not a packed form.
- **Editorial texture** — shop-depth spread: at the front / at the back.
  Reviews sit as labelled quotes, not house voice.
- **Staged counter ritual with tel chips** — Walk in / `tel:+442843722221`
  / Facebook. No form.
- **One artefact** — `DeliPlate.astro`, swap-locked to 6 (fascia, door
  number, shop looking through to the deli, a pasty on the back counter).
  Caption: “The deli at the back of 6.”
- **Guest voice** — we / walk in / take it home. No plate questions.
  No page-about-itself.
- **Drawing honesty in bannerNote only** — “The deli plate is a drawing.”

EssenceMedia omitted — no `essence-media.ts` entry for this slug. No
rasters under `/media`.

## Honesty

- No owned website. Handoff: Facebook
  `facebook.com/joesqualitymeats.newcastle` (reachable 29 Aug 2026;
  1.3K followers). About page showed no workplaces, no owner name, no
  first-party hours. Posts login-walled beyond a 29 April stub.
- Phone **028 4372 2221** / `tel:+442843722221`. Confirmed across
  directories and Nextdoor.
- Address **6 Main Street, Newcastle, BT33 0AD**. Confirmed. FSA listing
  adds Ballaghbeg — not printed (6 + BT33 0AD is the door).
- Owner unnamed. Not invented.
- Hours omitted. Brief's Google table (Sun closed; Mon–Fri 9–5; Sat 8–4)
  was not locked live on 29 Aug 2026. Sluurpy still scrapes that table;
  other 2026 directories print Mon–Fri 8–6 / Sat 8–5. Omit rather than
  invent or pick a winner.
- Kim review confirmed in Google scrapes (Kim Sterritt, 21 Sep 2025):
  “Fabulous wee deli at back of shop.” Printed as a review, not house
  voice.
- Josephine / Cornish pasties: not independently re-scraped under that
  name on 29 Aug 2026. Other reviews name pasties (Andi; Fra Barr).
  Guest chrome keeps Josephine as a labelled review per the brief, not
  as shop voice, and does not invent a longer quote.
- Food hygiene 5, inspected 11 March 2026 (Newry, Mourne and Down). Not
  printed on the guest page.
- Google “Located in: Vintage etc” — do not print. Adjacent / same
  stretch as 4 Main Street; they are not inside Vintage etc.
- GBP “designer jeans” contamination ignored.
- No farm story. No café sitting. Not Smalls (The Shopping Centre,
  BT33 0ES, 028 4372 3512).

## Identity

- Prefix `jq-`. Body class `concept-page concept-joes`.
- Fonts passed as `fontHref` (Fraunces + Karla). Not added to
  `ConceptLayout` `conceptFonts` map — no shell edit.
- Palette: butcher paper / metro tile / enamel ink / parsley / fat
  paprika. Not Smalls oxblood, not Railway platform green, not Vintage
  teak, not Clay sea glaze. Layout is a walk through the shop, not a
  shopping-centre case hero and not a café Saturday.

## Swap test

Joe's, 6 Main Street, the deli-at-the-back line. Remove those and any
butcher could wear it.

## Open on merge

- Add `joes-quality-meats` to `conceptFonts` if the team prefers the map.
- Add `.jq-strip` to the shared strip `:where()` list.
- Do not mount EssenceMedia until a record exists.
- Re-read Google hours before printing a clock. Still omitted.
- Logged-in Facebook still unread.
- Josephine attribution still thin; do not expand the quote without a
  first-party or Google line.
