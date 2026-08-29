# First 4 Floors — day-6 guest concept

Authored 29 August 2026 (Europe/London) under
`/workspace/day6/first-4-floors/`, mirroring `cbrown564-alt/local` paths.
No clone. No CloudAgent. No push. No merge. No publish.

## Kind

None of the five / trade showroom.

## One-liner

Flooring specialists in Newcastle. Including the caravan — at Unit 2, 63a.

## Artefact

Showroom docket for a caravan re-floor at Unit 2 (`CaravanDocket.astro`).
Drawn. Caption: “The caravan docket for Unit 2.” Banner note discloses
the drawing. Not “not a photograph of…”. The slip names Unit 2, 63a
Castlewellan Road, Newcastle, BT33 0JX, and a caravan interior shape —
it could not move to another flooring shop, and it could not move to 63.

## Paths

| File | Repo path |
| --- | --- |
| Guest home | `src/concepts/first-4-floors/home.astro` |
| Styles | `src/concepts/first-4-floors/styles.css` |
| Caravan docket | `src/concepts/first-4-floors/CaravanDocket.astro` |
| Page wrapper | `src/pages/concepts/first-4-floors.astro` |
| Copy brief | `research/concepts/first-4-floors/first-4-floors-copy-brief.md` |
| Elevation brief | `research/concepts/first-4-floors/first-4-floors-elevation-brief.md` |
| These notes | `research/concepts/first-4-floors/NOTES.md` |

Read against `cbrown564-alt/local` master, 29 August 2026:

- **Stile Glass** (`src/concepts/stile-glass/home.astro` on master still
  reads 108 Dundrum Road — the day-5 recast at
  `/workspace/day5/stile-glass/` is the live contrast: 63 Castlewellan
  Road, workshop daylight, four system cards, survey clipboard). Same
  industrial stretch. Do not merge. This guest asserts **Unit 2, 63a**,
  does not name the neighbour, does not clone the clipboard or the
  four-card systems grid.
- **Ireland's Appliance Centre**
  (`src/concepts/irelands-appliance-centre/home.astro`): harbour door,
  family years, packed “prepare a docket” form, catalogue handoff. This
  guest keeps the *handoff* idea (their site for ranges) and refuses
  the family arc, the years, EssenceMedia, and any fake configurator.

Layout is one-off: strip + four-sample mark + nav; airy daylight sample
bay (not a dusk overlay, not a glass edge); two-column showroom/caravan
spread; staged paper docket. Prefix `f4`. Fonts Instrument Serif + Sora
via `fontHref`. Brief:
`research/concepts/first-4-floors/first-4-floors-elevation-brief.md`
(23 August 2026, pasted unchanged).

## Flagship score

**7 / 8** on the flagship taste list.

| Hit | Notes |
| --- | --- |
| Strip + mark + nav | `.f4-strip` / four-sample mark / Showroom · Caravan · Docket. `.f4-strip` is not in `concept-shell.css` `:where()`; add on merge. |
| Airy daylight showroom hero | Sample-bay oak in daylight. Not a dusk overlay. Not dental's packed form. |
| Editorial | Two-column folio, not a product grid. |
| Staged showroom/docket ritual | Chips ring / email / contact page. Their mechanism already exists. |
| One artefact | `CaravanDocket.astro` only. |
| Guest voice | we / our showroom / our team. No plate questions. |
| Drawing honesty in bannerNote only | Caption names the docket, not the generation method. |
| **Deduct** | Hero still uses a two-column copy + visual, which is cousin to Stile's mast. The bay (planks, not a glass pane) and the docket (perforated slip, not a clipboard) are the one-off; the spine is flagship chrome by design. |

EssenceMedia omitted — no `essence-media.ts` entry for this slug. No rasters.

## Live-fact changes (re-read 29 August 2026)

Dated against firstfloornewcastle.co.uk, fetched 29 August 2026 (Europe/London).

- **Site still live.** Home H1: “Flooring specialists in Newcastle, County Down.”
  © 2026 in the footer.
- **Address split.** Footer and contact “Get in touch” still print
  **63 Castlewellan Road** (the neighbour's number). Contact also prints
  **Registered Company Address: 63a Castlewellan Road**. GlobalDatabase
  prints **Unit 2 63a Castlewellan Road**. Guest asserts **Unit 2, 63a**.
  The 63-vs-63a split is research honesty, not guest chrome.
- **Hours on the contact page**, 29 Aug 2026: Mon–Fri 9:30–17:00,
  Saturday 9:30–14:00, Sunday closed. Matches the Google hours given.
  Printed.
- **Caravan is first-party.** `/caravans-re-flooring` live: “All aspects
  of caravan flooring work undertaken”; unique interior shapes; carpets
  and vinyl. Not a review-only claim.
- **Supply and fit** on home: vinyl, carpets, laminate, LVT waterproof.
  Carpets page also lists runners, underlay, door bars — left on their
  site, not cloned.
- **Brands**, flooring-brands page: copy names Abingdon and Phloor;
  cards name Cormar Carpets, Phloor, Lifestyle Floors, Regency. Named
  once as a handoff. Not a brand grid.
- **Phone** 028 4372 7676. Vinyl page prints `028437 27676` — same
  number, looser spacing.
- **Email** is not printed on the site form. Known enquiry address
  **first4floorsni@gmail.com** used as mailto (IG listed it; IG itself
  was login-walled on 29 Aug 2026 at instagram.com/first4floorsni, bio
  not independently readable). Guest uses ring / Gmail / their contact
  page. No fake configurator.
- **Company number on contact is garbled:** “NI028437 27676” (phone
  mashed with an NI prefix). Omitted. Not “corrected” from Companies
  House.
- **No owner name on the site.** Alan Kerr / family history omitted.
- **No opening year on the site.** 2014 CH date not printed. “Decades
  of industry knowledge” (carpets page) omitted rather than turned into
  founding chrome. Third-party “over 10 years” omitted.
- **Dedicated `/lvt` URL 404** on 29 Aug 2026. LVT waterproof remains
  on the home list.
- **Contact form** is theirs; guest does not rebuild it.

## Honesty

- Quote / measure / fit. Not a café. Not a product grid clone.
- Phone **028 4372 7676** / `tel:+442843727676`.
- Inbox **first4floorsni@gmail.com**. Contact page for their form.
- **Unit 2, 63a Castlewellan Road, Newcastle, BT33 0JX.** Distinct from
  63. Neighbour unnamed on this guest chrome.
- Hours printed as theirs from the contact page, 29 August 2026.
- Banner note discloses the docket as a drawing. Caption does not say
  “not a photograph of…”.

## Identity

- Prefix `f4`. Body class `concept-page concept-f4`.
- Fonts passed as `fontHref` (Instrument Serif + Sora). Not added to
  `ConceptLayout` `conceptFonts` map — no shell edit.
- Palette: showroom daylight / sample-book oak / kraft / wool ash.
  Not café linen, not glass coastal green, not a packed overlay.

## Swap test

First 4 Floors, Unit 2, the caravan line. Remove those and any flooring
shop could wear it.

## Open on merge

- Add `first-4-floors` to `conceptFonts` if the team prefers the map.
- Add `.f4-strip` to the shared strip `:where()` list.
- Do not mount EssenceMedia until a record exists.
- Do not print 2014 or Alan Kerr.
- Neighbour at 63 still unnamed.
- Ask them to fix the footer that still says 63, and the mashed company
  number, when a conversation starts — not on this guest page.
