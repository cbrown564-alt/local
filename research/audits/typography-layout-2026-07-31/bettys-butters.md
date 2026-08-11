# Betty's Better Butters — typography & layout audit

**Route:** `/concepts/bettys-butters/`
**Date:** 2026-07-31
**Severity summary:** Critical 0 / High 4 / Medium 2 / Low 1

## Screenshots
- Desktop hero: `../../../media/audits/typography-layout-2026-07-31/screenshots/bettys-butters-desktop-hero.png`
- Desktop full: `../../../media/audits/typography-layout-2026-07-31/screenshots/bettys-butters-desktop-full.png`
- Mobile hero: `../../../media/audits/typography-layout-2026-07-31/screenshots/bettys-butters-mobile-hero.png`

## Issues

### I1 — Mixed type styles make hero feel uncrafted
- **Severity:** High
- **Where:** first viewport / `.bb-kicker`, `.bb-hero h1`, `.bb-lede`, `.bb-cta`
- **Observation:** Hero combines Rozha One display (`h1`), Epilogue bold caps kicker (`12px`, `letter-spacing: .2em`), Epilogue body lede, and a pill CTA in Epilogue 700. The brand mark image is a third voice (hand-drawn mountain ring). No clear primary typeface — the kicker reads louder than the subordinate lede because of tracking, while the display headline uses a different serif with heavy contrast. Confirmed as sloppy mixed-type hero in screenshots.
- **Suggested fix:** Pick one lead voice: either promote Rozha One to kicker + headline only and set `.bb-kicker, .bb-lede, .bb-cta` to a single Epilogue weight scale (`kicker: 600 11px .14em; lede: 400 16px`), or drop Rozha One from `h1` and use Epilogue 700 at display size for a mono-family hero. Match kicker tracking to header nav (`letter-spacing: .06em`).

### I2 — Strikethrough on primary CTAs and nav
- **Severity:** High
- **Where:** first viewport / `a[data-concept-placeholder]` → `.concept-link-inert` in `concept-shell.css`
- **Observation:** Nav links, "Shop the range" header button, "See the range →" hero CTA, and "Our story" all render with `text-decoration: line-through dotted` and `opacity: .5` from the ConceptLayout placeholder script. On the hero this reads as broken UI, not a subtle prototype hint — especially on the gold `.bb-cta` where the strike cuts through the main action.
- **Suggested fix:** Exclude hero and header CTAs from inert styling: e.g. `.bb-shop, .bb-cta, .bb-story { /* no strikethrough */ }` with a different disabled treatment (`pointer-events: none; box-shadow: none; outline: 2px dashed var(--bb-cocoa-soft)`), or scope `.concept-link-inert` to footer/range sections only via a wrapper class.

### I3 — Headline locked to four cramped lines
- **Severity:** High
- **Where:** first viewport / `.bb-hero h1` (`max-width: 10ch`)
- **Observation:** "Restaurant flavour, brought home." stacks as four lines — "Restaurant" / "flavour," / "brought" / "home." — on desktop and mobile. The 10ch cap plus `line-height: .94` creates a vertical tower; "home." alone on the last line looks like an orphan.
- **Suggested fix:** Remove `max-width: 10ch`. Keep `.bb-hero-em { display: block; }` for a two-line structure ("Restaurant flavour," / "brought home.") or set `max-width: 14ch` with `text-wrap: balance`.

### I4 — Accent line low contrast on cream ground
- **Severity:** Medium
- **Where:** first viewport / `.bb-hero-em` (`color: var(--bb-butter-deep)` `#d99a1f`)
- **Observation:** On mobile the hero copy sits on the cream gradient (`--bb-cream` → `--bb-cream-deep`) without the photo behind it. Gold `#d99a1f` on `#f3e6c9` is ~3.2:1 — below WCAG AA for large text. "brought home." is harder to read than the cocoa first line.
- **Suggested fix:** Darken accent on text: `.bb-hero-em { color: var(--bb-cocoa); }` with a gold underline, or use `color: #a8621f` (`--bb-maple`) for ≥4.5:1 on cream.

### I5 — Headline hugs the image gutter on desktop
- **Severity:** Medium
- **Where:** first viewport / `.bb-hero-copy` right edge vs `.bb-hero-media`
- **Observation:** "flavour," ends within ~12px of the vertical split to the butter photo. The comma terminal nearly touches the image boundary — same seam collision pattern as Douglas & Cromie.
- **Suggested fix:** Add `padding-inline-end: clamp(40px, 6vw, 88px)` on `.bb-hero-copy` at `min-width: 761px`, or reduce image column fraction from `1.14fr` to `1fr`.

### I6 — Range shelf mixes three text treatments per row
- **Severity:** Medium
- **Where:** below fold / `.bb-jar-label h3`, `.bb-jar-label p`, `.bb-ph`
- **Observation:** Each row combines Rozha One flavour name, italic Epilogue note, and uppercase Epilogue pill "illustrative flavour". Italic + display serif + tracked caps in one 60px-tall row feels busy and inconsistent with the hero's already mixed stack.
- **Suggested fix:** Drop italic on `.bb-jar-label p` (`font-style: normal; color: var(--bb-cocoa-soft)`), or switch flavour names to Epilogue 700 to reduce family count in the list.

### I7 — Section index misaligned with headline
- **Severity:** Low
- **Where:** `.bb-range-intro` / `.bb-range-number`
- **Observation:** "01" sits with `margin: 10px 0 0` beside a 68px Rozha One h2 — the number's cap height does not align to the headline's first baseline; it floats high and disconnected.
- **Suggested fix:** Set `.bb-range-number { margin: 0; align-self: start; padding-top: 0.35em; }` or move the index inside the h2 as a `::before` pseudo with shared baseline grid.

## Suggested fix priority
1. Replace strikethrough placeholder styling on hero/header CTAs (I2).
2. Remove `max-width: 10ch` and fix two-line headline rhythm (I3).
3. Unify hero type hierarchy — one display + one workhorse (I1).
4. Darken `.bb-hero-em` on cream mobile background (I4).
5. Add right padding at desktop hero split (I5).

## Notes
- Placeholder flavour data is correctly labelled; the "illustrative flavour" pills are intentional content signalling, not a craft failure — the italic + serif + caps combo is.
- Butter photography and figcaption placement are sound; defects are typographic, not photographic.
- Transformation after card reproduces the same hero type and strikethrough issues.
