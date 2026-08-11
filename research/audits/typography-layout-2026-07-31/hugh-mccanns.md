# Hugh McCann's — typography & layout audit

**Route:** `/concepts/hugh-mccanns/`
**Date:** 2026-07-31
**Severity summary:** Critical 1 / High 3 / Medium 4 / Low 1

## Screenshots
- Desktop hero: `../../../media/audits/typography-layout-2026-07-31/screenshots/hugh-mccanns-desktop-hero.png`
- Desktop full: `../../../media/audits/typography-layout-2026-07-31/screenshots/hugh-mccanns-desktop-full.png`
- Mobile hero: `../../../media/audits/typography-layout-2026-07-31/screenshots/hugh-mccanns-mobile-hero.png`

## Issues

### I1 — Gold kicker illegible over bright sky (mobile)
- **Severity:** Critical
- **Where:** first viewport (mobile) / `.hm-kicker` over `.hm-hero-image`
- **Observation:** “From today until your day” (#ead59d) sits on the pale/cloudy portion of the hero photo. At 390×844 it is nearly unreadable — fails basic contrast on the most prominent hook line.
- **Suggested fix:** Strengthen the left gradient in `.hm-hero::after` on mobile — e.g. `linear-gradient(90deg, rgba(15,24,18,.72) 0%, transparent 70%)` inside `@media (max-width: 940px)` — or add `text-shadow: 0 1px 8px rgba(15,24,18,.6)` to `.hm-kicker`.

### I2 — Nav links struck through at half opacity
- **Severity:** High
- **Where:** first viewport / `.hm-nav a` (`data-concept-placeholder`)
- **Observation:** “Weddings”, “The gardens”, “Food & drink”, “Stay” all show dotted strikethrough and 50% opacity from `.concept-link-inert`. Decorative Italiana + strikethrough makes the header feel broken.
- **Suggested fix:** Same as other concepts: remove `data-concept-placeholder` from nav and render as plain text spans, or exclude `header nav a` from `.concept-link-inert` line-through/opacity rules.

### I3 — Hero body copy low contrast on photo
- **Severity:** High
- **Where:** first viewport / `.hm-lede` over `.hm-hero-image`
- **Observation:** White paragraph text (`rgba(255,255,255,.94)`) crosses bright foliage and window mullions. On mobile especially, mid-paragraph lines drop below comfortable reading contrast despite `text-shadow`.
- **Suggested fix:** Darken `.hm-hero::after` base gradient to ~`.88` opacity at the bottom third, or add a semi-opaque scrim behind `.hm-hero-copy`: `background: linear-gradient(90deg, rgba(15,24,18,.55), transparent); padding-right: 24px`.

### I4 — Top strip text low contrast on plaster
- **Severity:** High
- **Where:** first viewport / `.hm-strip`
- **Observation:** 11.5px uppercase `--hm-ink-soft` (#6d6355) on `--hm-plaster` (#f4ece2) is thin and quiet for an address line; on mobile the stacked strip is easy to skim past.
- **Suggested fix:** Use `color: var(--hm-ink)` on `.hm-strip` or bump weight to `600` and size to `12px`.

### I5 — “We do.” collides with window mullion
- **Severity:** Medium
- **Where:** first viewport / `.hm-hero h1`
- **Observation:** The “W” sits within ~12px of the dark vertical window frame in the photo. Letterform and architecture compete at desktop and mobile.
- **Suggested fix:** Shift image focal point: `.hm-hero-image { object-position: 48% center; }` on desktop, or add `padding-left: 8px` + wider left scrim on `.hm-hero-copy`.

### I6 — Italiana nav too thin for utility links
- **Severity:** Medium
- **Where:** first viewport / `.hm-nav a`
- **Observation:** 15px Italiana (weight 400) on plaster reads as display type in a wayfinding row. Thin strokes plus placeholder strikethrough compound legibility loss.
- **Suggested fix:** Move nav to Lato: `.hm-nav a { font-family: "Lato", sans-serif; font-size: 14px; font-weight: 600; letter-spacing: .06em; text-transform: uppercase; }` — reserve Italiana for brand and headings.

### I7 — Awkward mobile line breaks in lede
- **Severity:** Medium
- **Where:** mobile hero / `.hm-lede`
- **Observation:** “two-hundred-year-old” breaks across lines; em-dash line (“the heart of the town —”) orphans the continuation; “fifty.” sits alone on the last line.
- **Suggested fix:** Shorten copy or use `max-width: 44ch` with `text-wrap: pretty` (where supported), and insert a soft break: `forty guests or<br />two hundred and fifty`.

### I8 — Visual-note caption undersized
- **Severity:** Medium
- **Where:** first viewport / `.hm-visual-note`
- **Observation:** 11px white at 76% opacity on photo is disclosure-critical but reads as footnote dust; easy to miss and hard to read on bright areas.
- **Suggested fix:** `font-size: 12px; color: rgba(255,255,255,.9);` plus a subtle pill background: `background: rgba(15,24,18,.35); padding: 6px 10px; border-radius: 4px; display: inline-block;`.

### I9 — Claim button tight in studio banner (mobile)
- **Severity:** Low
- **Where:** `.mm-concept-banner .mm-concept-claim`
- **Observation:** White claim button text sits close to the right edge at 390px; arrow nearly touches padding.
- **Suggested fix:** Studio-level: increase `.mm-concept-claim` padding to `8px 12px` at `max-width: 760px` in `concept-shell.css`.

## Suggested fix priority
1. Fix mobile kicker contrast with stronger scrim (I1).
2. Remove nav strikethrough / restore full-opacity nav (I2).
3. Darken hero text scrim for body copy (I3).
4. Strengthen strip contrast (I4).
5. Reposition hero image or padding to clear mullion (I5).

## Notes
- Italiana on the logo and “We do.” is intentional venue voice.
- Enquiry panel overlap (`margin: -34px` on mobile) is a deliberate card-over-hero pattern; panel typography and spacing are otherwise sound.
- Season strip and guest slider hierarchy are clear; no spacing defects in the form column at desktop.
