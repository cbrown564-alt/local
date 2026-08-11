# The Dundrum Inn — typography & layout audit

**Route:** `/concepts/dundrum-inn/`
**Date:** 2026-07-31
**Severity summary:** Critical 1 / High 2 / Medium 3 / Low 1

## Screenshots
- Desktop hero: `../../../media/audits/typography-layout-2026-07-31/screenshots/dundrum-inn-desktop-hero.png`
- Desktop full: `../../../media/audits/typography-layout-2026-07-31/screenshots/dundrum-inn-desktop-full.png`
- Mobile hero: `../../../media/audits/typography-layout-2026-07-31/screenshots/dundrum-inn-mobile-hero.png`

## Issues

### I1 — Hero headline loses contrast on bright photo
- **Severity:** Critical
- **Where:** first viewport / `.di-hero h1` over `.di-hero-art`
- **Observation:** "Come for the views, stay for the craic." is white Petrona with only `text-shadow: 0 2px 22px rgba(0,0,0,.48)`. On the faithful night exterior, the upper half of the headline sits over the lit yellow façade, white window frames and hanging baskets. "views" and "stay for the" drop below ~3:1 contrast; the line is hard to read at a glance. Confirmed in desktop hero, mobile hero, and transformation after card (`public/media/concepts/dundrum-inn/dundrum-inn-after.jpg`).
- **Suggested fix:** Strengthen `.di-hero-scrim` — raise the mid-stop opacity (currently `.06` at 34%) and add a left-weighted overlay, e.g. `linear-gradient(90deg, rgba(30,18,24,.75) 0%, rgba(30,18,24,.35) 55%, transparent 100%)` combined with the existing bottom gradient. Alternatively add a `::before` on `.di-hero-copy` with `background: linear-gradient(90deg, rgba(30,18,24,.55), transparent)` and `padding` preserved.

### I2 — Hero subcopy also fights the photo
- **Severity:** High
- **Where:** first viewport / `.di-hero p`
- **Observation:** The three-line lede ("Cold beers and a warm welcome…") sits over mid-tone pavement, signage and flower baskets. `text-shadow: 0 1px 14px rgba(0,0,0,.6)` is insufficient where the background shifts from dark to mid-grey within a single line.
- **Suggested fix:** Tie subcopy legibility to the same strengthened scrim/copy backing as I1, or reduce `.di-hero p` `max-width` and add `background: rgba(30,18,24,.45)` with `padding: 12px 16px` (only if scrim alone is not enough).

### I3 — Top-of-hero scrim nearly absent
- **Severity:** High
- **Where:** first viewport / `.di-hero-scrim`
- **Observation:** Gradient runs `rgba(28,20,24,.1)` → `.06` for the first third of the frame — effectively no overlay where the headline actually sits. The scrim only becomes useful below ~60% of the hero height, after the copy has already passed through bright zones.
- **Suggested fix:** In `.di-hero-scrim`, replace the weak top stops with at least `.45` opacity on the left 50% of the frame; keep the strong bottom stop (`.74`) for the rail transition.

### I4 — AI disclosure band crowds mobile headline
- **Severity:** Medium
- **Where:** mobile first viewport / `.di-hero-placeholder` (≤520px rules)
- **Observation:** On mobile the placeholder expands to `left: 16px; right: 16px; max-width: none`, sitting directly above the h1. It reads as a second headline tier and pushes visual attention away from the business line.
- **Suggested fix:** On `max-width: 520px`, keep the pill anchored top-right (`right: 16px; left: auto; max-width: 14ch`) or move disclosure below the hero as a caption outside `.di-hero`.

### I5 — Headline column too narrow on mobile
- **Severity:** Medium
- **Where:** first viewport / `.di-hero h1` (`max-width: 15ch`)
- **Observation:** At 390px the headline breaks as "Come for the views," / "stay for the" / "craic." — three lines with a orphaned two-word line. `text-wrap: balance` cannot fix a 15ch cap on a long sentence.
- **Suggested fix:** Remove or raise `max-width` on `.di-hero h1` below 760px, e.g. `max-width: none` or `22ch` in a mobile media query; let the strengthened scrim handle readability instead of forcing a narrow column.

### I6 — Section h2 wraps into a wall of text
- **Severity:** Medium
- **Where:** `.di-today h2` (below fold, visible in full-page)
- **Observation:** "The one thing the website never says is when the kitchen is on." spans five lines at 1280px with no sub-break or measure cap beyond default. Line length exceeds comfortable reading measure (~65ch effective) and the rag is uneven.
- **Suggested fix:** Add `max-width: 18ch` or insert a deliberate `<br>` after "website never says" in markup; alternatively reduce `font-size` clamp upper bound from `42px` to `36px` and set `max-width: 22ch`.

### I7 — Booking disclaimer competes with form labels
- **Severity:** Low
- **Where:** `.di-book-bar` / `.di-book-note`
- **Observation:** Four-line `12.5px` note immediately under the submit button uses similar grey tone as field labels. On desktop full-page it reads as a second label row rather than footnote.
- **Suggested fix:** Move `.di-book-note` outside the grid or add `margin-top: 8px; font-size: 11px; max-width: 72ch; opacity: .85`.

## Suggested fix priority
1. Strengthen `.di-hero-scrim` and/or add a left-side text backing (I1, I3) — unblocks headline legibility.
2. Extend the same treatment to `.di-hero p` (I2).
3. Relax `.di-hero h1` `max-width` on mobile (I5).
4. Reposition mobile `.di-hero-placeholder` (I4).
5. Tighten `.di-today h2` measure (I6).

## Notes
- Petrona + Hanken Grotesk pairing is intentional and consistent elsewhere (header, board cells). The failure is environmental (photo contrast), not font choice.
- The dark plum rail and booking bar below the hero have adequate contrast and spacing; defects concentrate in the hero overlay zone.
