# Concept craft standards

Practical visual, typographic, and structural standards distilled from the
Waves 1–5 concept builds and design reviews (November 2026). These sit
alongside [`docs/the-elevation-method.md`](the-elevation-method.md) (business
recognition & honesty) and [`docs/CONCEPT_DESIGN_REVIEW.md`](CONCEPT_DESIGN_REVIEW.md)
(the five publication checks).

## 1. Apply the craft principles — never copy a template

Every concept must feel designed for one specific business, not stamped from a
shared blueprint. Apply the seven craft principles to each business's own
layout architecture:

1. **Declutter** — one primary job above the fold. Strip redundant badges,
   secondary promos, and decorative chrome.
2. **Spacing** — generous, consistent vertical rhythm and edge gutters
   (`clamp(20px, 4.5vw, 56px)` or wider on editorial pages). Never cram text
   against viewport edges or photography borders.
3. **Copy** — short, grounded headlines and leads. Avoid em-dash clutter in
   display headlines (`"X, Y — built for Z"`). Speak as the business (see
   `.cursor/rules/concept-guest-voice.mdc`).
4. **Alignment** — every band on a page shares one crisp vertical rail
   (typically `1240px`, or an explicit full-bleed Swiss grid where intentional).
   Header logo, hero headline, body copy, and interactive planners must share
   the same left and right optical lines.
5. **Font** — deliberate display + body pairing registered in
   `ConceptLayout.astro` (`conceptFonts`) or `fontHref`. Never let an `<h1>`
   silently inherit `global.css`'s fallback display face.
6. **Font size & scale** — clear display-to-body contrast with tight tracking
   (`-0.025em` to `-0.035em` on geometric/grotesque sans) and clean line
   heights (`1.08`–`1.18` when phrases are highlighted).
7. **Imagery** — honest, subject-specific scenes with clear visible disclosure
   for generated visualisations and `loading="eager"` on the hero plate.

## 2. Composition diversity across any wave

Do not repeat the same hero layout across adjacent concepts in a wave. Match
the composition to the business's shape:

- **Full-bleed horizon / architectural elevation** (e.g. `mourne-windows`,
  `slieve-croob-camping`, `meelmore-lodge`, `the-cuan`)
- **Edge-to-edge 50/50 split-bleed** (e.g. `mcveigh-property`,
  `the-yellow-heifer`)
- **Exposed `1px` Swiss grid / workshop spec sheet** (e.g. `ross-cycles`,
  `mourne-mountains-brewery`)
- **Centred editorial monograph / broadsheet** (e.g. `murlands-solicitors`,
  `tory-bush-cottages`, `burford-lodge`, `denvirs-downpatrick`,
  `mulberry-tree-seaforde`)
- **Daylight almanac / asymmetric top-header plate** (e.g.
  `mount-panther-farm`, `woodhill-kitchens`)
- **Frosted overlay sanctuary card** (e.g. `crossgar-dental`)
- **Image-left editorial or dark supper club** (e.g. `carrive-grove-garden`,
  `raymies-warrenpoint`, `guru-indian-newry`)

## 3. Typography & headline emphasis variety

Avoid defaulting to serif display faces with italic `<em>` emphasis on every
site. Reserve serif + italic emphasis for heritage, legal, estate, and classic
broadsheet businesses (`murlands-solicitors`, `denvirs-downpatrick`,
`millbrook-lodge`, `mulberry-tree-seaforde`, `eamon-mcauley-interiors`).

For modern trades, workshops, clinics, holiday parks, family venues, craft
breweries, and contemporary eateries, prefer **bold sans-serif display type**
(`Bricolage Grotesque`, `Plus Jakarta Sans`, `Space Grotesk`, `Outfit`,
`Manrope`, `Syne`, `Barlow Condensed`) paired with a **brand-native highlighted
`<mark>` phrase**:

- **Low-half editorial marker sweep** (`linear-gradient(180deg, transparent 56%, ...)` — great on white/cream grounds)
- **Solid high-contrast ink block** (bold workshops, outdoor/camping, playful bistros)
- **Translucent glass or bottom-ruled band** (over full-bleed dark photography)
- **Framed or left-accented callout** (industrial taprooms, trailhead basecamps)
- **Soft surface tint / pill** (clinics, modern joinery showrooms)

**Wrapping rule for `<mark>`:** Keep solid, bordered, or translucent `<mark>`
phrases on **one clean unbroken line** (using a deliberate `<br />` before the
`<mark>` when needed, or a low-half gradient sweep) so vertical highlight boxes
never collide or create jagged step overlaps across wrapped lines. Always set
`box-decoration-break: clone; -webkit-box-decoration-break: clone;`.

## 4. Selective interactive richness

Rich navigation widgets — such as visual preview dropdown panels (`Glazing
Systems ▾` on `mourne-windows`, `Our 4 Parks ▾` on `chestnutt-holiday-parks`)
— belong only where a business genuinely has multiple distinct product families
or locations that benefit from visual browsing. Do not stamp preview dropdowns
onto single-focus venues.

## 5. Structural invariants (enforced by automated checks)

These recurring CSS/JS defects are checked automatically:

1. **Defeat the `concept-shell.css` header flex-shrink trap:**
   `src/concepts/_shell/concept-shell.css` applies
   `:where(body.concept-page) > :where(header) { display: flex; justify-content: space-between; }`.
   Whenever `<header>` wraps a single inner container (`.xx-wrap` or
   `.xx-header-inner`), explicitly set `display: block;` on the header class
   and give the inner container a definite `width: min(var(--max), calc(100% - gutter * 2))`.
2. **Never override a `.xx-wrap` rail with `width: 100%`:**
   On hero overlays (`class="xx-wrap xx-hero-inner"`), a later rule setting
   `width: 100%` silently cancels the `1240px` rail and pushes hero text flush
   against the left viewport edge.
3. **Explicit `font-family` on `<h1>`:**
   `global.css` sets a default display font on headings. Every concept's hero
   `h1` must declare its own `font-family` token explicitly.
4. **Enquiry event bus uses `window`:**
   Dispatch `mm:enquiry` on `window.dispatchEvent(ev)`, never `document.dispatchEvent(ev)`.

## 6. Verification workflow before pushing

```bash
pnpm test:craft          # Fast static guard + portfolio typography diversity report
pnpm test                # Build + request, guest-voice, and craft verification suites
pnpm audit:renders       # Headless Chromium check (0px desktop/mobile overflow, rails, 0 errors)
pnpm test:cloudflare     # Workers runtime suite
```

When hero layout, typography, or imagery changes on any concept, delete its
stale `public/media/og/<slug>.jpg` and recapture with:

```bash
node tools/capture/capture-concept-og-cards.mjs
```

Finally, visually inspect desktop renders (`pnpm audit:renders <slug> --capture=.scratch/review`)
before committing. Automated checks catch overflow and alignment regressions;
only eyes catch awkward line breaks, contrast, and composition fatigue.
