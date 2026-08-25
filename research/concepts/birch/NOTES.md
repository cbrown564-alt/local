# Birch — day-4 guest concept

Authored 25 August 2026 (Europe/London) under `/workspace/day4/birch/`,
mirroring repo paths. No clone. No CloudAgent. No push.

## Kind

Meal.

## One-liner

Vegetarian specialty coffee, opposite the sea, at 51 Central Promenade.

## Artefact

Birch leaf on the mixtape plate (`MixtapePlate.astro`). Drawn. Caption:
“Birch leaf on the mixtape plate.” Banner note discloses the drawing.
Not “not a photograph of…”.

## Paths

| File | Repo path |
| --- | --- |
| Guest home | `src/concepts/birch/home.astro` |
| Styles | `src/concepts/birch/styles.css` |
| Artefact | `src/concepts/birch/MixtapePlate.astro` |
| Page wrapper | `src/pages/concepts/birch.astro` |
| Copy brief | `research/concepts/birch/birch-copy-brief.md` |
| Elevation brief | `research/concepts/birch/birch-elevation-brief.md` |
| These notes | `NOTES.md` (workspace only) |

Read against GitHub `cbrown564-alt/local` **master**: newcastle-dental
(strip / mark / nav; ConceptLayout) and scopers (magazine meal texture,
guest voice). Brief: sprint-day2-five
`research/concepts/birch/birch-elevation-brief.md`.

## Flagship hits

- **Strip + mark + nav** — dental chrome. `.bi-strip` is not yet in
  `concept-shell.css` `:where()`; add on merge. Leaf mark is drawn, not
  a lifted logo.
- **Airy promenade first screen** — Birch as the biggest type; 51; sea
  horizon drawing with the door number. Not a packed form.
- **Magazine middle** — mixtape spread (Linktree playlists, Chris Rice)
  and run club (“Out. Then coffee.”). Their voice, dates on IG / Linktree.
- **Staged action** — walk in + Instagram. No `tel:`. No table widget.
- **One artefact that cannot move** — birch leaf + cassette labelled
  BIRCH Mixtape. Swap the name and the plate still says Birch.
- **Guest voice** — we / walk in / opposite the sea. Parked-domain
  diagnosis stays in research and this note.
- **One-off promenade** — Syne + Source Serif 4; pale bay / bark / leaf.
  Not Railway Street’s #nobaddays industrial cup.

EssenceMedia omitted — no `essence-media.ts` entry for this slug.

## Honesty

- No published phone. No invented click-to-call. Sea Salt’s number unused.
- birchcoffee.co.uk not linked. White Star omitted (parked WordPress only).
- Kitchen until 3 dated Instagram · August 2026.
- Castlewellan named; no invented street.
- Van as IG highlights (Birch Mobile / Birch wheels).
- FSA rating 5 dated 1 August 2024.
- Owner unnamed. FB unread beyond header (brief).
- Run-club 8am from parked what’s-on is not printed.
- Caption does not say “not a photograph”.

## Identity

- Prefix `bi-`. Body class `concept-page concept-birch`.
- Fonts passed as `fontHref` (Syne + Source Serif 4). Not added to
  `ConceptLayout` `conceptFonts` map — no shell edit.
- Palette: promenade sky / foam / birch leaf / sea glass.

## Swap test

Birch, 51 Central Promenade, vegetarian, the mixtape plate. Remove those
and any seafront café could wear it.

## Open on merge

- Add `birch` to `conceptFonts` if the team prefers the map.
- Add `.bi-strip` to the shared strip `:where()` list.
- Do not add a `tel:` later without a published number.
- Do not point a CTA at birchcoffee.co.uk while it is parked.
