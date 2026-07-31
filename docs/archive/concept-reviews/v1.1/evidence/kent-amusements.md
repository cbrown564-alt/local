# Archived concept review — Kent Amusements — 25 July 2026

Status: Revise

Concept: `/concepts/kent-amusements/`
Reviewed commit: `efadf8a`
Reviewed source fingerprint: `sha256:4ceec1f0cc17e48f79827e3ce8dd416c2f12513b5845ca841e892f468f550ade`
(re-computed locally with `node tools/check-concept-reviews.mjs --fingerprint
kent-amusements` — matches the repaired candidate recorded in
`docs/CONCEPT_DESIGN_REVIEW.md` → "Re-review candidate — repaired source fingerprints")
Creator: second repair pass of 25 July 2026 (not this reviewer)
Independent reviewer: separate non-creator agent. I did not create or repair this
concept and made no change to any concept source, stylesheet, data file or test.
Every finding below comes from my own live measurement of the production build.

## Candidate

Visitor job: a family on or near Newcastle's Central Promenade wants to know what
is inside Kent Amusements and whether it is open, before walking down.

Current presence and verification: `research/pipeline/verifications.json` → "Kent
Amusements", `verifiedOn` 2026-07-22, trading status Open (TripAdvisor review
March 2026 praising new VR games; Companies House NI688147 confirmation statement
2 November 2025; Yelp updated February 2026; Facebook page re-confirmed live
22 July 2026). Digital presence is Facebook + Instagram only, and the Facebook
page shows a login wall to first-time visitors. Caveat recorded and honoured:
exclude the same-named Dundalk arcade.

Truth checked at: 2026-07-22 (3 days old at review; next refresh due 2026-10-20).

Primary loop: opening screen → read what is inside (dodgems / VR / arcade) →
either tap `Call 028 4372 2515` or move to `/attractions/` for the hours and
offers board → external handoff to the Facebook page the arcade actually updates.

Review boundary:

- Start screen/state: `/concepts/kent-amusements/`, first viewport.
- Successful end screen/state: external handoff to
  `https://www.facebook.com/kentamusementsnewcastle/` (or `tel:+442843722515`),
  reached from the hero CTA, the strip, the header nav, the rail or the
  attractions board.
- Important failure state: the visitor wants *today's* hours or a live family
  offer, neither of which the concept holds.
  `/concepts/kent-amusements/attractions/`.
- Recovery: both panels declare the gap before showing anything, and both route
  to Facebook. The hours board is headed "Where the hours would live.", carries a
  `.ka-provisional` block ("No opening hours were verified for this concept. The
  rows below are an empty layout, not the arcade's times.") and then three rows
  reading "Not verified — see Facebook"; the offers panel is headed "Updated when
  they run." with the same deferral.

Exposed routes and actions outside the loop:

- `/concepts/kent-amusements/attractions/` — real, linked both ways.
- Header nav `Attractions` / `Hours` / `Family offers` — three labels, one
  destination (`/attractions/`, no fragment). They work, but "Hours" and "Family
  offers" promise finer navigation than exists.
- Header nav `Find us` → Facebook. Works. `rel="external"` on `/attractions/`,
  **absent on the home page**.
- `tel:+442843722515` in header and rail on both routes — matches the
  verification corrections exactly.
- Instagram follow link → `kentamusementsnewcastle` (HTTP 200), the Newcastle
  account, not the Dundalk namesake.
- Claim action → `/request/?business=Kent%20Amusements&town=Newcastle&source=concept`
  on both routes.

Declared placeholders, stubs and limitations:

- `/attractions/` rail cells `Dodgems` and `VR games` — `data-concept-placeholder`,
  rendered inert with the href removed and excluded from the tab order (my tab
  walk on that route stops at only two rail cells). Correct.
- Seasonal hours — declared empty, with the disclaimer placed **before** the
  values it qualifies (desktop: `.ka-provisional` y 195.2–247.4 above `.ka-offer`
  y 254.4; phone: 733.8–804.2 above 811.2). Correct.
- Family offers — declared empty ("No current offer details were verified for
  this concept. This is a proposed update slot"). Correct.
- Not declared: "New virtual reality zone · 2026" on `/attractions/` (the record
  evidences "new VR games", not a zone); "Indoor bumper cars" and "Machines for
  all ages" are unlabelled inferences.

Closest portfolio neighbours (chosen from my own side-by-side captures at
1265×710, `.tmp/rr-ka-out/nb-*.png`):

- **Donard Veterinary** — closest by a wide margin. Same batch, same repair pass,
  and component-for-component the same fold: dark info strip → white header with
  SVG mark, wordmark, tracked-caps strapline, centred nav, phone and coloured pill
  CTA → 50/50 hero with bar-rule kicker, two-tone display H1 whose second word
  takes the accent colour, one-line proposition, three-line lede, dark pill button
  beside an underlined text link → right half a full-bleed **Eric Jones 2023
  Geograph street photograph** closed by an identically formatted dark credit
  strip ("… on Railway Street · Eric Jones, 2023 · CC BY-SA 2.0" against "… on
  Central Promenade · Eric Jones, 2023 · CC BY-SA 2.0") → bottom rail of cells.
  Even the two photographs rhyme: grey-sky Newcastle street scenes with parked
  cars filling the lower half.
- **Mourne Cycles** — same skeleton again (strip → header → split hero → captioned
  right-hand image → bottom rail), also a condensed two-tone wordmark whose second
  word is the accent colour. Chosen over Tonn Ruray, which shares the seaside
  palette family but none of the layout.

## Evidence bundle

- Current capture: `research/pipeline/verifications.json` — Facebook/Instagram only; no
  website exists to capture.
- Desktop after, 1265×710: `.tmp/rr-ka-out/home-desktop.png`,
  `.tmp/rr-ka-out/atx-desktop.png` (+ `-full.png`).
- Phone first screen, 390×844: `.tmp/rr-ka-out/home-phone.png`,
  `.tmp/rr-ka-out/atx-phone.png` (+ `-full.png`), plus a 2× crop of the phone
  photo band `.tmp/rr-ka-out/phone-photo-band.png`.
- Primary-loop walkthrough: `.tmp/rr-ka-out/report.json` — pointer hit-tests with
  `document.elementFromPoint` at every control centre at three scroll positions
  per route per size, plus tab walks of 10–15 stops on each of the four
  route/size combinations, and a second settled tab walk
  (`.tmp/rr-ka-final.mjs`) that waits out `scroll-behavior: smooth`.
- Failure and recovery evidence: `.tmp/rr-ka-out/atx-desktop.png` and
  `atx-phone.png` — the empty hours board and offers panel with the disclaimer
  above the values.
- Sources, asset credits and limitations: `research/pipeline/verifications.json`;
  `public/media/place/ATTRIBUTION.md` line 11.
- Asset source and public-use rights status: `kent-amusements-exterior-2023.jpg`
  — Kent Amusements, Newcastle, Eric Jones, 28 February 2023,
  [Geograph 7426796](https://www.geograph.ie/photo/7426796), CC BY-SA 2.0.
  Credited on-page in a figcaption inside the same `<figure>` as the image.
  Publishable with attribution; the caption still carries no link to the source
  photo or the licence deed.
- External destination and accepted parameters: `curl` → Facebook page 200,
  Instagram profile 200, both the `kentamusementsnewcastle` accounts named in the
  verification corrections. The handoff carries no parameters, which is correct —
  Facebook accepts none.
- Keyboard check: tab order follows visual order on all four route/size
  combinations; Enter activates; hidden nav is `display:none` at 390 and correctly
  out of the tab order; declared placeholders are correctly out of the tab order;
  focus scrolls each control fully into view and nothing is occluded once the
  smooth scroll settles. **But the focus ring itself is invisible on every dark
  surface** — see the responsive gate.
- Contrast check: computed from live styles on every text-bearing node,
  `.tmp/rr-ka-out/report.json`. **Zero failures** on either route at either size.
  The three misses recorded on 25 July (`.ka-call` 3.50:1, `.ka-kicker` 4.02:1,
  `.ka-brand-sub` 2.98:1) are all resolved by `--coral-ink` / `--ticket-ink`.
- Focus-indicator contrast (separate measurement, `.tmp/rr-ka-out/focus.json`):
  `--concept-focus: #0b1726` against each control's own backdrop —
  `.ka-strip a` **1.00:1**, `.ka-rail-cell` ×4 **1.00:1**, `.ka-offers-link`
  **1.00:1**, `.ka-ticket-cta` **1.17:1**; `.ka-call`, `.ka-cta`, `.ka-link`,
  `.ka-nav a` and `.ka-brand` are fine at 15.07–17.31:1. Visually confirmed at
  2× in `.tmp/rr-ka-out/focus-rail-2x.png`.
- Reduced-motion check: with `Emulation.setEmulatedMedia`
  `prefers-reduced-motion: reduce`, **zero** elements on either route retain an
  animation or a transition over 0.01 s. Pass.
- `pnpm build`: not re-run — the brief reserved the build to another process. Its
  first gate runs standalone: `node tools/check-concept-reviews.mjs` → "Concept
  release check passed", and `--self-test` → "invalid fixture rejected with 9
  errors". The `dist/` build I served is the reviewed source.
- `pnpm test:concepts`: **72/72 passed, 0 failed** (36 routes × 2 viewports, 109
  declared placeholders), run serially with no competing agents.
- `pnpm test:reviewed-concepts`: **14/14 passed.**
- Relevant journey or interaction check: `elementFromPoint` hit-testing at three
  scroll positions per route per size; explicit rect-intersection measurement of
  `.ka-atx-story` against `.ka-atx-panel` at 390×844.
- Browser console: zero errors, zero warnings, zero failed requests on both
  routes at both sizes.
- Viewport integrity: `document.documentElement.clientWidth` asserted as 1265 and
  390 before every measurement **and** re-asserted after every screenshot;
  `defaultViewport: null` with a CDP `setDeviceMetricsOverride` and
  `captureBeyondViewport: false`. No 800 px layout entered this bundle.
- Serving note: the shared preview on `:4321` stopped responding partway through
  (connection refused). I served the same already-built `dist/` with
  `astro preview` on a spare port rather than rebuilding, so no `pnpm build` was
  triggered and the reviewed artefact is unchanged.

## Design gates

| Gate | Pass/Fail | Evidence or defect |
|---|---|---|
| Current and respectful | Pass | Verification 2026-07-22, three days old. Address `77–79 Central Promenade`, phone `028 4372 2515` and both social handles reproduce the corrections character-for-character; no Dundalk content anywhere on either route. The copy is warm about the business and frames the Facebook-only presence as a fact to work with ("Seasonal hours on Facebook", "the Facebook page the arcade already updates") rather than as a failing. |
| Claims are honest | Pass | The regression that failed this gate on 25 July is fixed at the root. No time-of-day string survives anywhere in `.ka-hours-board`; the board is headed "Where the hours would live.", the `.ka-provisional` disclaimer is placed **before** the values in both DOM and geometric order (desktop y 195.2 vs 254.4; phone y 733.8 vs 811.2), and all three rows read "Not verified — see Facebook". "Over fifty years" and "Fifty summers" trace to the record's "Over fifty years on the Central Promenade site"; "new VR" traces to the March 2026 TripAdvisor evidence; dodgems is proved by the "DODGEMS" sign in the concept's own hero photograph; the address and phone match the corrections exactly. Weakness, not a failure: "New virtual reality zone · 2026" still upgrades sourced *games* to an unsourced, unlabelled *zone*, and the home CTA "See today's hours" leaves the site with no "on Facebook" wording and no `rel="external"` while the identical control on `/attractions/` has both. |
| Real visitor loop | Pass | The loop completes by pointer and by keyboard on both routes at both sizes. Handoffs resolve 200 to the correct `kentamusementsnewcastle` accounts; the `tel:` value matches the record; placeholders are marked and inert; the empty state is honest and recovers. Both 25 July loop failures are gone: `.ka-cta` on `/attractions/` at 390 now returns itself from `elementFromPoint`, and the home rail at 1265 returns itself at every scroll position. Weakness: on `/attractions/` at 1265 all four `.ka-rail-cell` centres still return `aside.mm-concept-banner` at scroll 0 and at mid-scroll, clearing only at maximum scroll (102 px); on the home page at 390 two rail cells are covered at mid-scroll. Recoverable by scrolling, so not the dead-control failure of the last round. |
| Subject proof | Pass | `/media/concepts/kent-amusements/kent-amusements-exterior-2023.jpg` is a real 2023 Geograph photograph of this arcade, credited in a figcaption inside the same `<figure>`. At 1265 it fills the right half of the fold (633×402) with the "KENT AMUSEMENTS" fascia, the "DODGEMS" sign and the "PLEASURELAND FAMILY FUN FAIR" banner all legible and the Mournes behind; the credit strip closes the fold in-viewport at y 519.7–555.1. No CSS-costume element survives in either DOM. Weakness: at 390 the image sits at y 612.5–892.5, so 231.5 px falls inside the 844 fold — but the opaque fixed disclosure banner (y 749.5–834) paints over the lower part, leaving only **137 px** of photograph actually visible; at that scale the fascia lettering is a smear rather than a readable name, and the CC BY-SA credit at y 892.5 is **48.5 px below the fold**, so the share-alike attribution travels with the image in the markup but not in the phone first viewport. |
| Responsive and keyboard usable | **Fail** | Keyboard focus is not visible on six control classes. `--concept-focus: #0b1726` is byte-identical to `--pier-deep`, the background of `.ka-strip`, `.ka-rail` and `.ka-family-offers`, so the 3 px ring measures **1.00:1** on `.ka-strip a` (the *first* tab stop on both routes), **1.00:1** on all four `.ka-rail-cell` cells including "Call us", **1.00:1** on `.ka-offers-link`, and **1.17:1** on `.ka-ticket-cta` — the attractions page's primary hours action. A 2× capture of the focused "Call us" cell shows no perceptible ring. The gate requires controls to "work by keyboard with visible focus"; a keyboard visitor arriving at either page gets no indication of where they are. This is a **regression introduced by this repair pass**: the ring the last round measured was `rgb(224,193,77)`, which is high-contrast on pier-deep. Secondary: `.ka-nav { display: none }` below 940 px with no replacement, so "Attractions", "Hours", "Family offers" and "Find us" have no phone nav equivalent (the companion route stays reachable via the rail, so this is not the Cúpla-class unreachable-companion failure). Everything else in this gate passes and is measured: zero horizontal overflow (`scrollWidth === clientWidth` = 390 and 1265 on both routes); the 100 % story/panel overlap is **gone** (see below); the header Call button sits fully inside 390 at x 231.6–374.0; tab order is logical; Enter activates; focus scrolls controls into view with nothing occluded once settled. |
| Readable and motion-safe | Pass | Computed contrast on every text-bearing node on both routes at both sizes: **zero failures**, including the `.ka-call` phone button that measured 3.50:1 last round. Reduced motion: under emulation not one element on either route retains an animation or a transition above 0.01 s. The single meaningful image carries a specific, useful alt ("Kent Amusements' long red and cream frontage on Newcastle Central Promenade, with the Mournes visible behind"); every decorative SVG sits inside an `aria-hidden` wrapper. |

Review disposition: Revise

Evidence still needed to judge the design: none. Every measurement was
reproducible locally.

### The 390 px `/attractions/` layout, measured

The 25 July defect is **resolved**. At an asserted `clientWidth` of 390:

| Element | Rect (x, y, w, h) | Span |
|---|---|---|
| `.ka-atx-story` | 0, 135.28, 390, 521.48 | y 135.28 → 656.77 |
| `.ka-atx-panel` | 0, 656.77, 390, 581.88 | y 656.77 → 1238.64 |

Horizontal overlap 390 px, **vertical overlap 0 px, intersection area 0 px²**
(against 212,355 px² — 100 % — on 25 July). The two boxes abut exactly at
y 656.77 and do not intersect. `grid-row: auto` on both children in the ≤940 px
query is what fixed it, and the heading, lede and all three attraction cards are
visible and hittable on the phone. The page's own actions confirm it: `.ka-cta`
"Check today's hours" at y 585.5–636.8 and `.ka-link` "← Opening screen" at
y 599.5–622.8 both return themselves from `elementFromPoint` at every scroll
position.

## Public release conditions

| Condition | Pass/Blocked | Evidence or unblock condition |
|---|---|---|
| Asset permission or publishable replacement | Pass (with note) | Geograph 7426796, Eric Jones, 28 February 2023, CC BY-SA 2.0 — publishable with attribution, which the on-page figcaption and `ATTRIBUTION.md` line 11 both provide. Note before public use: add a link to the source photo and the licence deed, and record that the `object-fit: cover` / `object-position: 58% 50%` presentation is a ShareAlike derivative. |
| Truth check current within 90 days | Pass | `verifiedOn` 2026-07-22; expires 2026-10-20. |
| Independent-concept safeguards and honest public disclosure | Pass | `noindex, nofollow` confirmed in the built HTML of both routes; `<html lang="en-GB">`; the fixed banner reads "Independent concept by Mourne Made. Not the live Kent Amusements website." and is present and inside the fold at 1265 *and* 390 on both routes; claim action `/request/?business=Kent%20Amusements&town=Newcastle&source=concept`. (The banner is also what occludes the attractions rail and the phone hero photograph — a placement defect, not a disclosure defect.) |
| Repository and journey checks | Pass | `tools/test/test-concept-shell.mjs` 72/72 passed, 0 failed, run serially with no competing agents; `tools/test/test-reviewed-concept-journeys.mjs` 14/14 passed; `tools/check-concept-reviews.mjs` passed and its `--self-test` rejected the invalid fixture with 9 errors; zero console errors on all four route/size combinations. `pnpm build` itself was not re-run because the brief reserved it to another process. |

## Creator self-review

No creator self-score was filed for this candidate, so this table is skipped as
permitted by the review brief.

## Independent review

First-glance order at desktop (1265×710), home: (1) the 88 px two-tone "KENT
AMUSEMENTS" wordline, navy over coral, owning the upper left; (2) the photograph
filling the right half — red frontage, legible fascia, Mournes behind; (3) the
dark "See today's hours" button, with the coral "Call 028 4372 2515" pill
competing from the header. The fold now *ends* cleanly on the attractions rail
rather than in a collision — the defect the last round recorded here is gone.

First-glance order at desktop, `/attractions/`: (1) the amber-topped "SEASONAL
HOURS / WHERE THE HOURS WOULD LIVE." board on the right; (2) "PLAN YOUR TIME ON
THE PROMENADE." on the left; (3) the three attraction cards. Fourth and unwanted:
a band of half-cut white capitals bleeding out from under the disclosure bar at
the bottom edge — the occluded rail again.

First-glance order on phone (390×844), home: (1) "KENT AMUSEMENTS"; (2) the coral
"Call 028 4372 2515" button, the only saturated object above the fold; (3) "See
today's hours"; (4) a 137 px band of the photograph before the disclosure banner
covers the rest of it. Identity → action → evidence is the right sequence and it
works; the banner sitting *on* the proof is what spoils it.

First-glance order on phone, `/attractions/`: (1) "PLAN YOUR TIME ON THE
PROMENADE."; (2) the three attraction cards; (3) "Check today's hours". The page
finally shows its own argument on a phone.

Remove-nav test: passes clearly. Strip the header and the screen still says Kent
Amusements twice (headline and photographed fascia), says Central Promenade
twice, and shows the actual building. No other business could wear this fold.

Swap-the-business test: the photograph, the address, the phone number, the
"Dodgems, arcade games and new VR" sentence and the ticket-board metaphor would
all have to go — that is real specificity. But the chassis survives intact: swap
the palette tokens and the display face and the identical layout carries a vet or
a bike shop, which is precisely what the two neighbours do. The SVG brand mark is
the weak link — at 42 px it reads as a "P" beside a circle-and-chevron glyph that
is neither "K", nor "A", nor anything arcade-specific, and would swap unnoticed.

Closest-neighbour test: against **Donard Veterinary**, my own side-by-side
captures show the same components in the same positions at the same proportions —
strip, header lockup, 50/50 hero, kicker rule, two-tone headline with the accent
on the second word, button pair, full-bleed Eric Jones 2023 Geograph photo, and a
dark credit strip using the same wording pattern; even the two photographs share
a grey sky and a foreground of parked cars. Against **Mourne Cycles** the same
skeleton returns with a condensed two-tone wordmark and a captioned right-hand
image. Kent's genuinely own contributions are the seaside colour temperature
(pier navy / coral / ticket amber), Teko condensed caps, the dashed amber
"ticket" treatment on the hours board, and the honesty apparatus — a board that
names its own emptiness, which neither neighbour has in this form.

| Category | Weight | Score /10 | Weighted | Evidence | Strongest quality | Clearest weakness |
|---|---:|---:|---:|---|---|---|
| Evidence, truthfulness and respect | 15% | 7.5 | 1.125 | Verification three days old; address, phone and both handles character-exact against the corrections; Dundalk caveat honoured; "over fifty years" and "new VR" both traceable to `tradingEvidence`; CC BY-SA licence recorded on-page and in `ATTRIBUTION.md`. The invented hours are gone and the disclaimer is placed ahead of the values it qualifies. | The record is used as evidence rather than decoration: the concept states what it does not know as plainly as what it does, and the source comment in `attractions.astro` records *why* the board is empty. | "New virtual reality zone · 2026" still upgrades a sourced fact ("new VR games") to an unsourced facility, and "Indoor bumper cars" / "Machines for all ages" are unlabelled inferences on top of a record that contains neither. |
| Visitor outcome and concept thesis | 15% | 6.5 | 0.975 | The fold answers what is inside, where it is and how to call in one tap; the phone number is a genuine improvement over a login-walled Facebook page; the second surface exists and now displays on a phone. | The opening speaks to the family rather than to the owner's website problem — "Dodgems, arcade games and new VR" answers the visitor's actual question first. | The concept's own `designTask` names "opening hours, family offers", and both are delivered as declared-empty slots: the visitor's headline question, "is it open now", is still answered only by leaving for Facebook, so the second surface proposes a shape rather than delivering an outcome. |
| Subject identity and distinctiveness | 15% | 6.0 | 0.900 | Remove-nav passes; Teko caps and the pier navy / coral / amber temperature read as seaside arcade; but my own captures put the chassis, the hero geometry and the Eric Jones credit-strip treatment side by side with two sibling concepts. | The two-tone name at 88 px over the real frontage gives the arcade a confident seaside voice it has never had, and the dashed amber ticket board is a motif no neighbour uses. | Layout-level repetition of Donard Veterinary and Mourne Cycles is untouched by this repair, and the brand mark's letterforms belong to no business — colour and type are doing all the differentiating work. |
| First viewport and visual composition | 15% | 6.0 | 0.900 | Home desktop is one legible composition with a dominant proof plane and a fold that now ends on the rail rather than under the banner (rail 555.1–627.1, banner 637.8–694.0, zero hit failures). Phone sequences identity, action, evidence. | Nothing decorative competes: one headline, one proposition, one button, one photograph, one credit line. | Both non-home folds still end badly — at 1265 `/attractions/` shows half-cut rail capitals under the disclosure bar, and at 390 the opaque banner paints over the hero photograph, leaving 137 px of proof and pushing the credit 48.5 px below the fold. The `58% 50%` crop also gives roughly the lower half of the desktop proof plane to two parked cars. |
| Complete loop and functional integrity | 15% | 7.0 | 1.050 | Pointer and keyboard both complete the loop on both routes at both sizes; handoffs 200 to the correct accounts; `tel:` correct; placeholders inert and out of the tab order; the empty state declares itself and recovers to Facebook. Both 25 July loop failures verified fixed. | The empty state is the most honest failure state in the batch — it names the gap, places the disclaimer before the values, and hands the visitor to the surface the business actually maintains. | Four `/attractions/` rail cells at 1265 (including "Call us") and two home rail cells at 390 still fail a centre hit-test against the disclosure banner at scroll positions a visitor will occupy; they clear only at maximum scroll. Three nav labels also share one destination with no fragment, so "Hours" promises navigation that does not exist. |
| Responsive use and accessibility | 15% | 5.5 | 0.825 | Zero horizontal overflow at both sizes on both routes; the 100 % attractions overlap measured to 0 px² intersection; header Call inside 390; zero computed text-contrast failures; reduced motion fully neutralised; specific alt text; logical tab order; focus scrolls into view. Against that, six control classes have a 1.00–1.17:1 focus ring, and the phone nav is still `display: none` with no replacement. | The measured repairs are real and complete — the stacking bug that hid the second surface on a phone and all three contrast misses are genuinely gone, not merely moved. | The focus indicator is invisible on the first tab stop of both routes and on all four rail cells including "Call us", because `--concept-focus` was set to the same value as the dark surfaces those controls sit on — a fresh access failure created by this repair pass. |
| Craft and finish | 10% | 6.0 | 0.600 | Zero console errors, warnings or failed requests at four route/size combinations; 72/72 audit; 14/14 journeys; release checker and self-test pass; considered type scale; the source now carries dated comments explaining each repair. | The build, audit, journey and console surface is completely clean, and the placeholder discipline (`data-concept-placeholder`, no bare `href="#"`) is exact. | Every housekeeping item from the last round's repair 6 is untouched: `.ka-stage`, `.ka-pier`, `.ka-visual-note`, the whole `.ka-ticket*` block and `@keyframes ka-rise` / `ka-bulbs` are still dead code; the `prefers-reduced-motion` block at lines 378–381 targets three selectors that exist in no DOM; the `.ka-rail` comment still claims the badge "never covers a cell" while four cells fail a hit-test; and the same action reads "See today's hours" on one route and "Check today's hours" on the other, with mixed straight and curly apostrophes. |
| **Total** | **100%** |  | **6.38/10** |  |  |  |

## Verdict

Weighted score: (7.5 × .15) + (6.5 × .15) + (6.0 × .15) + (6.0 × .15) +
(7.0 × .15) + (5.5 × .15) + (6.0 × .10)
= 1.125 + 0.975 + 0.900 + 0.900 + 1.050 + 0.825 + 0.600
= **6.375**, recorded as **6.38/10** using `tools/check-concept-reviews.mjs`
as the canonical half-up calculator (the truncated value is 6.37; the score is
nowhere near the 7.0 threshold either way, so the verdict is unaffected).

Core category floors at 7.0 met: **No** — visitor outcome 6.5 and
responsive/accessibility 5.5 are below 7.0. Evidence 7.5 and loop 7.0 meet it.

Supporting category floors at 6.0 met: **Yes** — identity 6.0, first viewport
6.0, craft 6.0.

All design gates pass: **No** — responsive and keyboard usable fails. The other
five pass.

All public release conditions pass: **Yes** — all four pass, with a note on the
CC BY-SA source/deed link.

Verdict: **Revise**

Required repairs in priority order:

1. **Invisible keyboard focus on every dark surface.** `--concept-focus: #0b1726`
   equals `--pier-deep`, giving 1.00:1 on `.ka-strip a`, all four `.ka-rail-cell`
   cells and `.ka-offers-link`, and 1.17:1 on `.ka-ticket-cta`. Use a two-tone
   ring, or a light focus colour scoped to the dark components. Acceptance check:
   a `test:reviewed-concepts` assertion that the computed outline colour of every
   focusable control reaches ≥3:1 against the first opaque backdrop behind it, at
   both sizes on both routes — this is a defect class that will recur on any
   concept with a dark surface, so assert it portfolio-wide.
2. **Disclosure banner still occludes the `/attractions/` rail at 1265×710.** All
   four cells return `aside.mm-concept-banner` from a centre hit-test at scroll 0
   and at mid-scroll, and the fold ends in half-cut capitals. `--mm-banner-space`
   is applied to `.ka-atx-main`'s `min-height` but the rail is taller than the
   reserved room (rail top 656.1 against banner top 637.8). Acceptance check:
   every `.ka-rail-cell` centre returns itself at **every** scroll position on
   both routes at both sizes.
3. **Phone hero: the banner covers the proof and the credit falls below the
   fold.** Only 137 px of the 280 px photograph is visible at 390 before the
   opaque banner, and the CC BY-SA figcaption sits 48.5 px below the fold.
   Acceptance check: at 390×844 the figcaption's bottom edge is ≤844 and no part
   of `.ka-visual-image` inside the fold is covered by `.mm-concept-banner`.
4. **Unlabelled service claim.** "New virtual reality zone · 2026" is not in the
   record, which evidences "new VR games". Either reword to the sourced phrasing
   or label it as proposed, before the value, as the hours board now does.
5. **Under-labelled external handoffs on the home page.** "See today's hours",
   nav "Find us", the strip "Facebook" link and the Instagram follow all leave the
   site with no `rel="external"` and, for the CTA, no "on Facebook" wording — the
   `/attractions/` page already does both correctly. While there, give "Hours" and
   "Family offers" real fragments or reduce them to one honest "Attractions" link.
6. **Housekeeping (carried unchanged from the last round).** Delete
   `.ka-stage`, `.ka-pier`, `.ka-visual-note`, the `.ka-ticket*` block and the two
   dead `@keyframes`; delete or retarget the stale `prefers-reduced-motion` block;
   correct the false `.ka-rail` comment; normalise the CTA wording and the
   apostrophes.
7. **Phone navigation.** `.ka-nav` is `display: none` below 940 px with no
   replacement. The companion route stays reachable via the rail, so this is a
   weakness rather than a blocker, but "Find us" has no phone equivalent at all.

## Appeal

Appeal requested: No
Reason: —
Appeal reviewer: —
Appeal reviewer saw earlier scores before deciding: No
Appeal score: —
Appeal verdict replacing the original: —

## Re-review

Date: 2026-07-25
Commit: `efadf8a`
Fingerprint: `sha256:4ceec1f0cc17e48f79827e3ce8dd416c2f12513b5845ca841e892f468f550ade`
Checks repeated: first-glance at 1265×710 and 390×844 on both routes; pointer and
keyboard loop; failure/empty state and recovery; every exposed route and action;
all six material-claim classes against `research/pipeline/verifications.json`; computed
text contrast on every text-bearing node; computed focus-ring contrast on nine
control classes; reduced-motion emulation; overflow and header-clip measurement;
explicit rect-intersection of `.ka-atx-story` against `.ka-atx-panel` at 390;
`elementFromPoint` at three scroll positions per route per size; console capture;
remove-nav, swap-the-business and closest-neighbour tests against my own
neighbour captures; `test-concept-shell.mjs`,
`test-reviewed-concept-journeys.mjs`, `check-concept-reviews.mjs` and its
self-test; live `curl` of both external handoffs.

### Earlier verdicts, kept visible

- **24 July 2026 — first independent v1.1 verdict: Revise at 5.88.** Gates
  failed: subject proof, responsive. Deciding defects: 390 px header overflow
  clipping the "Call" CTA; the whole hero an SVG pier booth (costume) with zero
  real arcade imagery. Honesty was named as the concept's genuine strength.
- **25 July 2026 — re-review of the first repair: Revise at 5.43.** Gates failed:
  claims, real loop, responsive, readable. Deciding defects: `/attractions/` at
  390 painting `.ka-atx-story` and `.ka-atx-panel` into the identical 390×545
  rect (100 % overlap); unlabelled invented seasonal hours under "Open this
  season."; the phone primary CTA not hittable; `.ka-call` at 3.50:1.
- **25 July 2026 — this review of the second repair: Revise at 6.38.** One gate
  fails: responsive and keyboard usable.

### Earlier defect disposition (read only after the scores above were fixed)

- **Claims — resolved.** No time-of-day string survives anywhere in
  `.ka-hours-board`. The board is headed "Where the hours would live.", the
  `.ka-provisional` disclaimer precedes the values in both DOM and geometric
  order (desktop y 195.2 before 254.4; phone y 733.8 before 811.2), and every row
  reads "Not verified — see Facebook". The offers panel does the same. This is
  an honest empty state, not an admission of nothing to say: the board's *shape*
  is the design proposal and the copy says so in as many words. Residual: the
  unsourced "VR zone" wording and the unlabelled home handoffs.
- **Real loop — resolved.** `.ka-cta` on `/attractions/` at 390 now returns
  itself from `elementFromPoint` at every scroll position; the home rail at 1265
  returns itself at every scroll position (`--mm-banner-space` reserves the room).
  What remains is a *recoverable* occlusion on `/attractions/` at 1265 and at
  mid-scroll on the phone home page, not a dead control.
- **Responsive — partly resolved, and newly failed on a different count.** The
  100 % story/panel overlap is gone: intersection area 0 px² against 212,355 px²
  (`grid-row: auto`), and the second surface displays its own heading, lede and
  all three cards on a phone. Overflow remains zero and the header still fits at
  390. But the gate now fails on focus visibility, which the same repair pass
  introduced by setting `--concept-focus` to `#0b1726` — the exact background
  colour of the strip, the rail and the offers panel.
- **Readable — resolved.** All three 25 July contrast misses are fixed
  (`.ka-call` 3.50:1, `.ka-kicker` 4.02:1, `.ka-brand-sub` 2.98:1), and a full
  computed sweep of every text-bearing node on both routes at both sizes returns
  zero failures. Reduced motion and image alternatives still pass.
- **Subject proof — still passes.** At 1265 the fold carries convincing proof:
  the fascia, the "DODGEMS" sign and the "PLEASURELAND" banner are legible across
  the upper band of a 633×402 plane, with the CC BY-SA credit in-fold. At 390 the
  proof is materially weaker — 137 px of visible photograph after the opaque
  banner takes the rest, fascia lettering not legible at that scale, and the
  share-alike credit 48.5 px below the fold. The credit travels with the image in
  the markup (same `<figure>`), but not in the phone first viewport.

Final score: 6.38/10
Final verdict: **Revise**

If the final verdict is Revise:

Retired from public queue: not applicable on this reviewer's authority. The
concept has never been public and remains a `noindex` internal route. Under §5 its
one focused repair cycle was consumed and then explicitly reopened by the owner on
25 July; this is the verdict on that reopened repair. Whether a third cycle is
authorised is an owner decision, not a reviewer one. The trajectory is genuinely
upward — 5.88 → 5.43 → 6.38, with both truth defects and the phone stacking bug
closed for good — and the single remaining gate failure is one CSS custom
property.

Condition required to reopen: a visible focus indicator on every control at both
sizes on both routes, plus rail cells that are hittable at every scroll position;
then a fresh independent re-review of the affected categories.

## Truth refresh

Date: 2026-07-25
Trading status: Open — unchanged; verification 2026-07-22 (TripAdvisor March
2026, Companies House NI688147 November 2025, Yelp February 2026).
Current public presence: Facebook and Instagram only; both
`kentamusementsnewcastle` URLs returned HTTP 200 on 2026-07-25.
Primary external handoff: Facebook page — resolves, correct Newcastle account,
not the Dundalk namesake.
Material claims: unchanged since 2026-07-22. The invented hours recorded in the
previous refresh are gone; "New virtual reality zone" remains an unsourced
embellishment of the recorded "new VR games".
Asset permission: still valid (CC BY-SA 2.0, attributed on-page and in
`ATTRIBUTION.md`).
Material change found: No
Affected categories to re-review: none on truth-refresh grounds.
Public status: Remove pending re-review (never published).
