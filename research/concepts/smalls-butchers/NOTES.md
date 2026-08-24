# Smalls Butchers — day-3 guest concept

Authored 24 August 2026 (Europe/London) under `/workspace/day3/smalls-butchers/`,
mirroring repo paths. No clone. No CloudAgent. No push.

## Paths

| File | Repo path |
| --- | --- |
| Guest home | `src/concepts/smalls-butchers/home.astro` |
| Styles | `src/concepts/smalls-butchers/styles.css` |
| Case plate | `src/concepts/smalls-butchers/CasePlate.astro` |
| Page wrapper | `src/pages/concepts/smalls-butchers.astro` |
| Copy brief | `research/concepts/smalls-butchers/smalls-butchers-copy-brief.md` |
| These notes | `NOTES.md` (workspace only; not a repo file unless wanted) |

Read against `sprint-day3-five`: newcastle-dental home+css (strip / mark / nav
chrome; two-column first screen), scopers (editorial counter texture, guest
voice), ConceptLayout (banner, `fontHref`, `businessName`/`town`).
Brief: `sprint-day2-five` `research/concepts/smalls-butchers/smalls-butchers-elevation-brief.md`.

## Flagship mapping

Dental's first screen is copy + **form**. This page keeps the chrome
(strip + fascia mark + nav) and makes the first screen **airy and
counter-first**: copy + **shopping-centre case plate**. Staged action is
walk-in / ring, not a mailto draft and not a cart.

Jar class (Castle Farm / Betty): the weekly ritual is the counter. Instagram
already wins at the case; the concept is the door, the sandwich, the number.

## Identity

- Prefix `sb-`. Body class `concept-page concept-smalls`.
- Fonts passed as `fontHref` (Unna italic + Source Sans 3). Not added to
  `ConceptLayout` `conceptFonts` map — no shell edit.
- Strip layout is in `styles.css` (`.sb-strip` is not yet in
  `concept-shell.css` `:where()`). On merge, add `.sb-strip` to that list.
- No `EssenceMedia` — no frames, and the component 404s without a slug entry.
- No raster in `public/media/`. Plate is inline SVG.

## Honesty on the guest page

- Hours omitted (unclaimed Google Mon–Sat 8:30–4:30).
- EST 2007 omitted.
- No website CTA.
- Not Joe's. Not a clothing Smalls.
- Drinks as "when they are in, we post it" — Papas SKUs not listed.
- Mixed reviews / pie price not used.

## Swap test

Name, shopping centre, Mourne butchers, and sandwich are load-bearing.
Remove them and the page is any butcher.

## Open on merge

- Add `smalls-butchers` to `conceptFonts` if the team prefers the map over
  the page-level `fontHref`.
- Add `.sb-strip` to the shared strip `:where()` list.
- Logged-in Facebook Intro still unread.
- Whether 2007 is on the actual fascia — still open; still not printed.
