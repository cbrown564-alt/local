# The Donard — typography & layout audit

**Route:** `/concepts/donard-hotel/`
**Date:** 2026-07-31
**Severity summary:** Critical 0 / High 2 / Medium 3 / Low 1

## Screenshots
- Desktop hero: `screenshots/donard-hotel-desktop-hero.png`
- Desktop full: `screenshots/donard-hotel-desktop-full.png`
- Mobile hero: `screenshots/donard-hotel-mobile-hero.png`

## Issues

### I1 — Hero headline cramped into four short lines
- **Severity:** High
- **Where:** first viewport / `.dh-hero h1` + markup `<br>` in `donard-hotel.astro`
- **Observation:** Six words span four lines: "Main Street." / "below." / "The Mournes" / "ahead." — caused by `max-width: 12ch` combined with a manual break after "below." Desktop and mobile screenshots both show a tall, narrow column with "below." orphaned on its own line. Confirmed against known issue and transformation after card.
- **Suggested fix:** Remove `max-width: 12ch` from `.dh-hero h1`. Replace the markup break with a single intentional break: `Main Street below.<br>The Mournes ahead.` Set `max-width: 16ch–18ch` if a cap is still needed, or use `text-wrap: balance` without ch constraint.

### I2 — Headline line-height and weight feel utilitarian
- **Severity:** High
- **Where:** first viewport / `.dh-hero h1` (Figtree 500, `line-height: .98`)
- **Observation:** At `clamp(43px, 5.2vw, 74px)` the tight leading and medium weight produce a blocky, app-ui feel against the hotel photography — especially with single-word lines. The brand wordmark uses wide-tracked uppercase gold; the hero headline does not echo that voice and reads as generic sans poster type.
- **Suggested fix:** Either load a display cut (e.g. add `Fraunces` or `Instrument Serif` to `conceptFonts["donard-hotel"]` and apply to `.dh-hero h1` only) or adjust Figtree to `font-weight: 600; line-height: 1.05; letter-spacing: -.02em` and fix line breaks (I1) so the face can work at display size.

### I3 — Booking panel h2 repeats the narrow-column problem
- **Severity:** Medium
- **Where:** first viewport right column / `.dh-book-panel h2` (`max-width: 12ch`)
- **Observation:** "Find a room in Newcastle." breaks as "Find a room in" / "Newcastle." in the sidebar. The 12ch cap is unnecessary in a ~340px panel that already constrains width.
- **Suggested fix:** Remove `max-width: 12ch` from `.dh-book-panel h2` (desktop). The `max-width: 17ch` at ≤980px can stay or be removed — the panel is single-column there.

### I4 — Photo credit competes with hero lede on mobile
- **Severity:** Medium
- **Where:** mobile first viewport / `.dh-photo-credit` (≤560px: `left: 14px`)
- **Observation:** Credit pill moves to bottom-left and sits directly under the lede paragraph and above the fold into the white booking panel. At 10px size it collides visually with the 15–17px lede — two text blocks stacked in the same corner with no separation.
- **Suggested fix:** On mobile, move `.dh-photo-credit` outside `.dh-hero` below the image fold, or position `bottom: 120px` above the copy block with `max-width: 28ch` and lower opacity (`color: rgba(245,247,251,.75)`).

### I5 — Dead space beside constrained headline
- **Severity:** Medium
- **Where:** first viewport / `.dh-hero-copy` (`max-width: 650px` with 12ch h1)
- **Observation:** Copy block is 650px wide but the headline occupies only ~120px of horizontal space, leaving a large empty zone to the right over the photo. Hierarchy looks accidentally left-floated rather than deliberately asymmetric.
- **Suggested fix:** After fixing I1, either remove `max-width` on `.dh-hero-copy` and let text measure naturally, or set `.dh-hero h1 { max-width: 20ch; }` so the block fills more of the shaded left third.

### I6 — Tight header on mobile with hidden nav
- **Severity:** Low
- **Where:** mobile first viewport / `.dh-header` + `.dh-book`
- **Observation:** At ≤980px nav links disappear; only "THE DONARD" and a compressed "CHECK AVAILABILITY" button remain. Brand name drops to `18px` with year marks hidden — acceptable functionally but the button (`font-size: 10px; padding: 9px 10px`) feels cramped against the 28px brand.
- **Suggested fix:** Increase `.dh-book` mobile padding to `10px 14px` and `font-size: 11px`; add `letter-spacing: .04em` instead of shrinking further.

## Suggested fix priority
1. Fix hero headline breaks — remove `max-width: 12ch`, revise `<br>` in `donard-hotel.astro` (I1).
2. Tune display typography on `.dh-hero h1` (I2).
3. Remove sidebar h2 ch cap (I3).
4. Reposition mobile photo credit (I4).
5. Rebalance `.dh-hero-copy` width after headline fix (I5).

## Notes
- Left-side gradient (`.dh-hero-shade`) provides adequate contrast for white/gold text; legibility is not the primary failure — line breaking and type voice are.
- Navy/gold identity in header and booking panel is internally consistent; the hero headline is the outlier in hierarchy treatment.
- External nav links to thedonard.co.uk are intentional; not a layout defect.
