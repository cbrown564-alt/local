# Enniskeen Country House Hotel — typography & layout audit

**Route:** `/concepts/hotel-enniskeen/`
**Date:** 2026-07-31
**Severity summary:** Critical 0 / High 1 / Medium 4 / Low 3

## Screenshots
- Desktop hero: `screenshots/hotel-enniskeen-desktop-hero.png`
- Desktop full: `screenshots/hotel-enniskeen-desktop-full.png`
- Mobile hero: `screenshots/hotel-enniskeen-mobile-hero.png`

## Issues

### I1 — Pull-quote attribution below contrast floor
- **Severity:** High
- **Where:** below fold / `.enk-welcome` / `.enk-pullquote figcaption span`
- **Observation:** TripAdvisor context line uses `opacity: 0.85` on honey-deep text over cream — effective contrast ~4.21:1, below 4.5:1 AA for `12px` body text.
- **Suggested fix:** Remove `opacity: 0.85` on `figcaption span`; set explicit `color: #5c4520` or `color: var(--honey-deep)` at full opacity; verify with probe on `--cream` background.

### I2 — Mobile hero loses booking bar from first viewport
- **Severity:** Medium
- **Where:** mobile hero / `.enk-hero` + `.enk-booking`
- **Observation:** At 390×844, stacked layout puts image first, then story copy and CTAs; `.enk-booking` moves to `position: static` below the story block and is not visible in the mobile hero capture. Primary conversion control is below the fold.
- **Suggested fix:** On mobile, keep a compact booking strip sticky at bottom of hero image (`position: sticky; bottom: 0` on `.enk-visual` wrapper) or repeat a slim “Check availability” bar after `.enk-actions` inside `.enk-story` before scroll.

### I3 — Booking CTA vertical padding tight in bar
- **Severity:** Medium
- **Where:** first viewport (desktop) / `.enk-booking button`
- **Observation:** “CHECK AVAILABILITY” in the third grid column has no vertical padding (`padding: 0 30px`); label sits flush to top/bottom of the cream bar while date fields have `16px` padding — uneven vertical rhythm in one control group.
- **Suggested fix:** Set `padding: 16px 30px` on `.enk-booking button`, or `align-items: center` with `min-height` matching label cells.

### I4 — Interior frame inset fights headline on mobile
- **Severity:** Medium
- **Where:** mobile hero / `.enk-story::before`
- **Observation:** Decorative `inset: 10px` border on pine panel reduces usable text width; combined with `padding: 46px 24px`, the kicker and headline sit noticeably inset from the image edge, feeling cramped versus the full-bleed photo above.
- **Suggested fix:** Hide `::before` below 900px (`display: none`) or reduce inset to `6px`; increase story `padding-inline` to `28px` if frame kept.

### I5 — Brand subline extremely small on mobile
- **Severity:** Medium
- **Where:** mobile hero / `.enk-brand-sub`
- **Observation:** “COUNTRY HOUSE HOTEL · SHIMNA VALLEY” drops to `9px` with `letter-spacing: 0.12em` — hard to read beside the 24px brand name and competes with the gold “BOOK A ROOM” button.
- **Suggested fix:** Minimum `11px` at mobile breakpoint; shorten string (“Country house · Shimna Valley”) or hide subline on `<400px`.

### I6 — Explore card note orphans on narrow cards
- **Severity:** Low
- **Where:** below fold / `.enk-explore-note`
- **Observation:** Four-column grid at 1280px yields narrow cards; “Things to do” note ends with orphan “Spelga Dam.” on its own line while other cards balance better.
- **Suggested fix:** Add `text-wrap: pretty` on `.enk-explore-note`; or shorten note strings; at `max-width: 1100px` the 2-column grid already helps.

### I7 — Drop cap collides with pull-quote spacing
- **Severity:** Low
- **Where:** below fold / `.enk-dropcap` + `.enk-pullquote`
- **Observation:** Large `68px` drop cap on welcome paragraph is intentional editorial voice; `margin: 44px 0 30px` on pull-quote creates a long vertical gap that weakens connection between owner copy and guest quote.
- **Suggested fix:** Reduce `.enk-pullquote { margin-top: 28px }` or cap drop cap `font-size: 56px` on welcome band only.

### I8 — Provisional caption competes with house roofline
- **Severity:** Low
- **Where:** first viewport / `.enk-visual figcaption`
- **Observation:** Upper-right caption on hero image sits over sky/turret with adequate contrast but draws the eye away from the house focal point on first glance.
- **Suggested fix:** Move to bottom-right (match `.enk-int-hero-image figcaption` pattern) or reduce to `10px` with more padding from edge.

## Suggested fix priority
1. Fix pull-quote attribution contrast (I1).
2. Surface booking on mobile first viewport (I2).
3. Equalise booking bar cell padding (I3).
4. Relax mobile story frame inset (I4).
5. Bump mobile brand subline size (I5).

## Notes
- Explore grid images load correctly with `#enk-grade` filter — full-page capture shows photos; earlier empty-tile impression was a misread.
- Cormorant + honey/pine palette, italic “hideaway”, and drop cap are deliberate luxury voice — not defects.
- `.enk-lede` on pine (~7.9:1) and `.enk-kicker` honey on pine (~4.7:1) pass contrast checks.
- Enniskeen uses `EnniskeenShell` (not `ConceptLayout`); placeholder strikethrough is less pervasive than ConceptLayout concepts.
