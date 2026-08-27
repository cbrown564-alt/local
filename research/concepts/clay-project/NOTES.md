# The Clay Project — day-5 guest concept

Authored 26 August 2026 (Europe/London) under
`/workspace/day5/clay-project/`, mirroring repo paths. No clone.
No CloudAgent. No push.

## Kind

Jar (you leave with a piece) with a café shelf. Not a restaurant.

## One-liner

A pottery painting café on the promenade. We make the porcelain here.

## Paths

| File | Repo path |
| --- | --- |
| Guest home | `src/concepts/clay-project/home.astro` |
| Styles | `src/concepts/clay-project/styles.css` |
| Kiln ticket | `src/concepts/clay-project/KilnTicket.astro` |
| Page wrapper | `src/pages/concepts/clay-project.astro` |
| Copy brief | `research/concepts/clay-project/clay-project-copy-brief.md` |
| Elevation brief | `research/concepts/clay-project/clay-project-elevation-brief.md` |
| These notes | `research/concepts/clay-project/NOTES.md` |

Read against `cbrown564-alt/local` Astro: newcastle-dental `home.astro` +
`styles.css` (strip / bespoke mark / nav; ConceptLayout; guest voice;
honesty in comments and banner). Railway Street day-4 for copy-brief
shape. Brief: 23 August 2026
`research/concepts/clay-project/clay-project-elevation-brief.md`,
pasted unchanged. Live workshops re-read 26 August 2026 on
theclay-project.com/workshops.

## Flagship hits

- **Strip + mark + nav** — dental chrome. `.cp-strip` is not yet in
  `concept-shell.css` `:where()`; add on merge. Identity CSS already sets
  `display: flex`.
- **Airy first screen** — promenade / sea light. The Clay Project as the
  biggest type, 85 under it, Book a date / mailto. Not a packed dusk form
  (dental's first screen is the form; this one is sea air over the door).
- **Magazine middle** — workshop diary as a ledger (their dated 2026
  list), porcelain line as pull-quote.
- **Signature artefact** — kiln ticket (`KilnTicket.astro`) that names
  85 Central Promenade and in-house porcelain, staged with dated workshop
  chips that hand off to `https://www.theclay-project.com/workshops`.
  Caption: “The kiln ticket for 85.”
- **Guest voice** — we / our porcelain / book a date. No plate questions.
  No page-about-itself.
- **Jar, café shelf** — you leave with a piece. Coffee and bakes as one
  IG line, not a restaurant sitting.

EssenceMedia omitted — no `essence-media.ts` entry for this slug; the
component 404s without one. No rasters under `/media`.

## Honesty

- No published phone in any first-party source read 26 Aug 2026
  (home, About, Contact, workshops). Do not invent. No `tel:`.
- Email **hello@theclay-project.com**.
- Open Wednesday to Monday from IG bio. Google hour table (Sun 12–4:30
  etc.) omitted, not labelled.
- Live diary 26 Aug 2026: 19 Sep Make a Mug £55; 26 Sep Charcuterie
  Night £60; 13 Oct Pumpkin Patch £50; 7 Nov Autumn Flora £55.
  Paint-on-pottery monthly £5 is a shelf line.
- 5 September Flora is **not** on the live workshops list (it dropped).
  Not printed.
- 26 September charcuterie still carries leftover Valentines/Galentines
  CMS copy on their site. Guest chrome uses the September date, BYOB,
  ceramic board — not the leftover heading.
- Pumpkin Patch on their site lists The Ash Gallery, 83 Central Promenade.
  Omitted from guest chrome so 85 stays the door.
- Founders from About (first-party): Rebecca Killen & Laureanne Kootstra.
  Founded late 2021. Adrian McColgan quoted from the About bisc-ware
  sentence only.
- FB unread. IG posts login-walled; bio used.
- Banner note discloses the kiln ticket as a drawing. Caption does not
  say “not a photograph of…”.

## Identity

- Prefix `cp`. Body class `concept-page concept-clay`.
- Fonts passed as `fontHref` (Bodoni Moda + Figtree). Not added to
  `ConceptLayout` `conceptFonts` map — no shell edit.
- Palette: bisque / sea glaze / kiln charcoal / terracotta. Not Birch,
  not Cookie Jar flour-paper, not packed overlay. Layout is a sea-light
  mast + kiln-log ledger, not a dusk form and not a promenade café clone.

## Swap test

85, the sea, in-house porcelain, Rebecca Killen & Laureanne Kootstra.
Remove those and any paint-a-pot could wear it.

## Open on merge

- Add `clay-project` to `conceptFonts` if the team prefers the map.
- Add `.cp-strip` to the shared strip `:where()` list.
- Do not mount EssenceMedia until a record exists.
- Do not invent a phone.
- Re-read workshops before any later pass — the 5 Sep Flora drop is the
  reminder that their CMS moves.
