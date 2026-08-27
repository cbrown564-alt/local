# Serenity Newcastle — day-3 guest concept

Authored 24 August 2026 (Europe/London) under `/workspace/day3/serenity-newcastle/`,
mirroring repo paths. No clone. No CloudAgent. No push.

## Paths

| File | Repo path |
| --- | --- |
| Guest home | `src/concepts/serenity-newcastle/home.astro` |
| Styles | `src/concepts/serenity-newcastle/styles.css` |
| Hour plate | `src/concepts/serenity-newcastle/HourPlate.astro` |
| Page wrapper | `src/pages/concepts/serenity-newcastle.astro` |
| Copy brief | `research/concepts/serenity-newcastle/serenity-newcastle-copy-brief.md` |
| These notes | `NOTES.md` |

Read via GitHub API (`cbrown564-alt/local`):

- Flagship chrome: `src/concepts/newcastle-dental/home.astro` + `styles.css` on
  `sprint-day3-five` (utility strip + bespoke mark + simple nav). Path
  `newcastle-family-dental` is not on that branch.
- Elevation texture: `src/concepts/scopers/home.astro` on `sprint-day3-five`
  (`scopers-ice-cream` is not on that branch).
- Research: `research/concepts/serenity-newcastle/serenity-newcastle-elevation-brief.md`
  on `sprint-day2-five` only (absent from `sprint-day3-five`). That brief is
  the **gift shop** (jar; 106 Main Street). This page follows the day-3
  **relief** assignment for the Promenade day spa.

## Kind / artefact / honesty

- **Kind:** relief.
- **Artefact:** appointment slip / hour plate (`HourPlate.astro`) with treatment
  chips and one-tap `tel:02843726768`.
- **Honesty limits:** no online calendar; brochure site; current offers on
  Facebook (Serenity Day Spa Newcastle) or serenitynewcastle.com. Hours
  printed as assigned (Mon–Sat 9–6, Sunday closed). Parking at the rear.
  No EST. No prices. No invented Niamh quotation. Guest captions only.
  Facebook URL is a search handoff — page slug not verified on this pass.

## Flagship mapping

Dental first screen is copy + form. This page keeps strip + mark + nav and
makes the first screen **airy** (copy only). The hour plate sits in the
editorial middle, not in a packed overlay.

Layout is spa light (linen / sage), not butcher paper, not clinical dental.

## Identity

- Prefix `se-`. Body class `concept-page concept-serenity`.
- Fonts via `fontHref` (Cormorant Infant + Plus Jakarta Sans).
- Existing `public/media/.../serenity-newcastle-fascia-plate.png` is the
  gift-shop door (106 Main Street / Frenchic). Not used.
- No `EssenceMedia`.

## Open on merge

- Add `serenity-newcastle` to `conceptFonts` if preferred over `fontHref`.
- Add `.se-strip` to the shared strip `:where()` list.
- Confirm a canonical Facebook URL.
- Confirm serenitynewcastle.com is the live brochure (not .co.uk 410 gift-shop domain).
