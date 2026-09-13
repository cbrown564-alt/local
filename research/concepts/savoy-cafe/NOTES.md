# Savoy Cafe — day-7 guest concept

Authored 13 September 2026 (Europe/London) under
`/workspace/day7/savoy-cafe/`, mirroring `cbrown564-alt/local` paths.
No clone. No CloudAgent. No push. No merge. No publish.

## Kind

**meal** — flagship counter appetite. Daytime Main Street eatery.
Homemade made-to-order breakfast through lunch, traybakes, Fairtrade tea
and coffee. Not Seasalt (closed). Not Broadway (no site). Not Mauds
(ice-cream group gravity). Not Piccolo (evening pizza).

## One-liner

A revived 1930s Savoy name on Main Street — Good Food, not Fast Food —
Paddy & Eileen Mallon’s made-to-order room.

## Artefact

`SavoyFascia.astro` — enamel Main Street fascia with **SAVOY**, the ethos
line, counter appetite in the window, and **22–24** on the door. Drawn.
Caption: “The fascia on Main Street.” Banner note discloses the drawing.
The plate names Savoy, the ethos, and 22–24 — it could not move to another
daytime café.

## Paths

| File | Repo path |
| --- | --- |
| Guest home | `src/concepts/savoy-cafe/home.astro` |
| Styles | `src/concepts/savoy-cafe/styles.css` |
| Fascia plate | `src/concepts/savoy-cafe/SavoyFascia.astro` |
| Page wrapper | `src/pages/concepts/savoy-cafe.astro` |
| Copy brief | `research/concepts/savoy-cafe/savoy-cafe-copy-brief.md` |
| Elevation brief | `research/concepts/savoy-cafe/savoy-cafe-elevation-brief.md` |
| These notes | `research/concepts/savoy-cafe/NOTES.md` |

Elevation brief copied unchanged from
`/workspace/day7/research/concepts/savoy-cafe/savoy-cafe-elevation-brief.md`
(live-read stamp 13 Sep 2026). Live facts re-confirmed same day from
`https://savoy.cafe/`, `/about/`, `/contact-us/`.

## Flagship score

**8 / 10** — ethos lock-up, door + dated contact hours, Mallon revival
honesty, counter appetite first screen, staged walk-in / ring / site, one
drawn artefact, guest voice. Deduct: no photoreal plate theatre (drawn
fascia carries recognition instead); Facebook specials handoff is verbal
rather than a live feed embed.

Flagship hits:

- **Strip + mark + nav** — `.sv-strip` / compact enamel mark / The counter,
  Ethos, The name, The door. Prefix `sv`. Not yet in `concept-shell.css`
  `:where()`; add on merge. Mark is drawn, not a lifted logo.
- **Airy first screen** — cream paper, Playfair Savoy, italic ethos say,
  Walk in / Ring / savoy.cafe. Appetite rail beside the mast. No form.
- **Editorial** — counter cards (breakfast / lunch / treats); ethos band
  in enamel; revival arc with about attribution; hours stamped from contact.
- **Staged counter ritual** — walk in / ring / site. No booking widget.
- **One artefact** — `SavoyFascia.astro`. Caption names the fascia, not the
  generation method.
- **Guest voice** — we / our / walk in. No plate questions. No
  page-about-itself.
- **Drawing honesty in bannerNote only** — “The Main Street fascia is a
  drawing.” Caption does not say “not a photograph of…”.

Layout is one-off: enamel burgundy + brass + counter window. Not cloned
from Railway Street (green platform, cup rail, Saturday tiramisu) or Café 67
(yellow NI plate ticket). Fonts via `fontHref` (Playfair Display + Sora).
No shell edit. EssenceMedia omitted.

## Live-fact checklist (13 Sep 2026)

- [x] `savoy.cafe` /about/ /contact-us/ still live
- [x] Address **22–24 Main Street, BT33 0AD**
- [x] Phone printed **028 4372 5757** (site spacing 028 437 25757 — same digits)
- [x] Contact hours **Mon–Sun 08:00–17:00**
- [x] Ethos **“Good Food, not Fast Food”**
- [x] Paddy & Eileen Mallon / 1930s name revival on /about/
- [x] Breakfast 9am–midday as menu colour only (inside 08:00 open)
- [x] Monday late-night / music to 10pm **omitted** (conflicts with 17:00 close)
- [x] Not Seasalt / Broadway / Mauds / Piccolo on the guest page
- [x] No continuous-since-1930s claim
- [x] No invented prices / booking form

## Wiring when this lands on the branch

1. Copy the `src/` and `research/` trees into the repo.
2. Add `.sv-strip` to the shared strip `:where()` list in
   `src/concepts/_shell/concept-shell.css`.
3. Optional: add a `savoy-cafe` entry to `conceptFonts` in ConceptLayout.
   Not required — `home.astro` passes `fontHref`.
4. Do **not** mount `EssenceMedia` until a record exists.
5. Do not lift a logo file from savoy.cafe without provenance.

## Swap test

Without Savoy, Mallons, “Good Food, not Fast Food,” and 22–24 Main Street,
the page is any daytime café. Those four stay.
