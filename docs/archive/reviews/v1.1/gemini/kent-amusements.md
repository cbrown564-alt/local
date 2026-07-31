# Archived concept review — Kent Amusements — 25 July 2026

Status: Revise

Concept: `/concepts/kent-amusements/`  
Reviewed commit: `8987095`  
Reviewed source fingerprint: `sha256:426c9eaf8032e782bde4dcb720cca5d55d9b0934fe35fc4db14c8d8ff66f556c`  
(re-computed locally with `node tools/check-concept-reviews.mjs --fingerprint kent-amusements` — matches the repair candidate recorded in `docs/CONCEPT_DESIGN_REVIEW.md`)  
Creator: repair pass of 24–25 July 2026 (not this reviewer)  
Independent reviewer: separate non-creator agent; did not create or repair this concept and made no change to any concept source, stylesheet, data file or test.

## Candidate

Visitor job: a family standing on Newcastle's Central Promenade wants to know
whether Kent Amusements is open now and what is inside before they walk down.

Current presence and verification: `research/pipeline/verifications.json` → "Kent
Amusements", `verifiedOn` 2026-07-22, trading status Open (TripAdvisor review
March 2026 praising new VR games; Companies House NI688147 confirmation
statement 2 November 2025; Yelp updated February 2026; Facebook page
re-confirmed live 22 July 2026). Digital presence is Facebook + Instagram only;
the Facebook page shows a login wall to first-time visitors. Caveat recorded:
exclude the same-named Dundalk arcade.

Truth checked at: 2026-07-22 (3 days old at review; next refresh due
2026-10-20).

Primary loop: opening screen → read what is inside (dodgems / VR / arcade) →
either tap `Call 028 4372 2515` or move to `/attractions/` for hours and offers
→ external handoff to the Facebook page the arcade actually updates.

Review boundary:

- Start screen/state: `/concepts/kent-amusements/` first viewport.
- Successful end screen/state: external handoff to
  `https://www.facebook.com/kentamusementsnewcastle/` (or `tel:+442843722515`),
  reached from the hero CTA, the strip, the header nav or the attractions board.
- Important failure state: the visitor wants *today's* hours or a family offer
  price, which the concept does not hold. `/concepts/kent-amusements/attractions/`.
- Recovery: the "Family offers" card states no offer detail was verified and
  routes to Facebook; the hours board's third row ("Weekdays (term) — Seasonal —
  see Facebook") and the amber "Check today's hours on Facebook →" button carry
  the same deferral. **The first two hours rows do not defer — they assert
  specific times (see gate "Claims are honest").**

Exposed routes and actions outside the loop:

- `/concepts/kent-amusements/attractions/` — real, linked both ways.
- Header nav `Attractions` / `Hours` / `Family offers` — three labels, one
  destination (`/attractions/`, no anchor to the named sections). Works, but the
  labels promise finer navigation than exists.
- Header nav `Find us` → Facebook. Works; **not marked as leaving the site** on
  the home page (no `rel`, no `target`, no "on Facebook" wording).
- `tel:+442843722515` in header and rail — correct number per the verification
  corrections.
- Instagram follow link → correct `kentamusementsnewcastle` account (HTTP 200).
- Attractions rail `Dodgems` and `VR games` — declared placeholders using
  `data-concept-placeholder`; rendered struck-through, `aria-disabled="true"`,
  href removed. Correctly marked.

Declared placeholders, stubs and limitations:

- Attractions rail Dodgems / VR games cells — `data-concept-placeholder`,
  visibly inert. Correct.
- Family offers card — "No current offer details were verified for this concept.
  This is a proposed update slot." Exemplary.
- Seasonal hours values — **undeclared**. "School holidays 10 am – 9 pm" and
  "Weekends 11 am – 8 pm" appear under the heading "Open this season." with no
  illustrative/provisional label anywhere in the source (`grep` for
  illustrative|proposed|sample|not verified across both pages returns only the
  family-offers sentence).

Closest portfolio neighbours:

- **Donard Veterinary** (`/concepts/donard-veterinary/`) — same batch, same
  repair pass. Near-identical chassis: dark info strip, white header with brand
  + nav + phone + coloured pill CTA, 50/50 split hero, bar-rule kicker, two-tone
  display headline, dark primary button beside an underlined text link, and a
  full-bleed Eric Jones 28 February 2023 Geograph street photograph with an
  identically formatted dark credit strip beneath it.
- **Mourne Cycles** (`/concepts/mourne-cycles/`) — same batch, same skeleton
  again (strip → header → split hero → captioned photo → bottom rail), also a
  condensed uppercase two-tone name where the second word is the accent colour.
  Chosen over Tonn Ruray, which shares the seaside palette family but no layout.

## Evidence bundle

- Current capture: `research/pipeline/verifications.json` (Facebook/Instagram-only
  presence; no website exists to capture).
- Desktop after, 1265×710: `.tmp/ka-out2/home-desktop.png`,
  `.tmp/ka-out2/attractions-desktop.png` (+ `-full.png`, `-scrolled.png`).
- Phone first screen, 390×844: `.tmp/ka-out2/home-phone.png`,
  `.tmp/ka-out2/attractions-phone.png` (+ `-full.png`).
- Primary-loop walkthrough: `.tmp/ka-out2/probe.txt` — pointer hit-tests plus an
  18-step keyboard tab walk at both sizes on both routes.
- Failure and recovery evidence: `.tmp/ka-out2/attractions-desktop.png` (family
  offers empty state and hours deferral).
- Sources, asset credits and limitations: `research/pipeline/verifications.json`;
  `public/media/place/ATTRIBUTION.md` line 11.
- Asset source and public-use rights status: `kent-amusements-exterior-2023.jpg`
  — Kent Amusements, Newcastle, Eric Jones, 28 February 2023,
  [Geograph 7426796](https://www.geograph.ie/photo/7426796), CC BY-SA 2.0.
  Credited on the page as "Kent Amusements on Central Promenade · Eric Jones,
  2023 · CC BY-SA 2.0". Licence permits publication with attribution; the
  caption carries no link to the source or licence deed.
- External destination and accepted parameters: `curl` → Facebook page 200,
  Instagram profile 200, both the `kentamusementsnewcastle` accounts named in
  the verification corrections (not the Dundalk namesake). The handoff carries
  no parameters, which is correct — Facebook accepts none.
- Keyboard check: tab order follows the visual order (strip Facebook → brand →
  nav ×4 → Call → CTA → follow → rail ×4 → claim link); every stop shows a solid
  3 px `rgb(224,193,77)` outline; Enter activates. Hidden nav is `display:none`
  at 390 so it is correctly out of the tab order.
- Contrast check: computed from live styles, `.tmp/ka-out2/report.json`. Passes:
  lede 6.82, strip 17.31, strip link 8.31, primary CTA 14.78, secondary link
  12.87, nav 14.94, h1 12.87 (large), thesis 4.02 (large, ≥3 OK), rail label
  18.03, rail note 8.40, figcaption 17.31, hours board values and buttons,
  disclosure 17.57. **Fails: `.ka-call` "Call 028 4372 2515" white on `#E85A4F`
  = 3.50:1 (control, needs 4.5); `.ka-kicker` `#C9443A` on `#DCEEF2` = 4.02:1;
  `.ka-brand-sub` "CENTRAL PROMENADE · NEWCASTLE" `#C4860C` on `#F7FBFC` =
  2.98:1.** All three appear on both routes at both sizes.
- Reduced-motion check: with `Emulation.setEmulatedMedia`
  `prefers-reduced-motion: reduce`, every remaining declared transition collapses
  to 1e-05 s (global override); no entrance or looping animation is applied
  anywhere (the `ka-rise`/`ka-bulbs` keyframes are dead code). Pass.
- `pnpm build`: exit 0 — "Concept release check passed: 0 public
  transformations", `astro check` 0 errors / 0 warnings, 71 pages built.
- `pnpm test:concepts`: 36 routes × 2 viewports, 71 passed, **1 failed** —
  `/concepts/tonn-ruray/ · phone` returned HTTP 404 with a 980 px document, i.e.
  the shared dev server missed a route while several reviewers hit it
  concurrently. No Kent route or viewport failed. Note the audit does not detect
  overlapping grid items, which is how the defect below survived it.
- `pnpm test:reviewed-concepts`: 7/7 passed, including "Kent identifies its
  documentary exterior and keeps the phone action visible".
- Relevant journey or interaction check: pointer hit-testing with
  `document.elementFromPoint` at every control centre, at both sizes, scrolled to
  top and to the bottom of the document.
- Browser console: zero errors, warnings or failed requests on both routes at
  both sizes.
- **Evidence-bundle defect:** the supplied bundle in
  `research/concepts/phase-q-rereview/evidence/` is not usable. Its own
  `capture-report.json` records `clientWidth: 800` for *every* row, including
  the ones labelled `desktop-1265x710` and `phone-390x844`; the harness never
  applied either viewport, so the PNGs are 800 px renders padded into a 1265 px
  canvas or clipped into a 390 px one. The "phone" images therefore fake an
  overflow that does not exist and the "desktop" images hide the nav. All
  findings below come from captures I made myself with
  `Emulation.setDeviceMetricsOverride` **plus** a matching `page.setViewport`.

## Design gates

| Gate | Pass/Fail | Evidence or defect |
|---|---|---|
| Current and respectful | Pass | Verification 2026-07-22, three days old. Address `77–79 Central Promenade`, phone `028 4372 2515`, both social handles reproduced exactly from the corrections block; no Dundalk content anywhere. Copy is warm about the business and never mocks the Facebook-only presence — the strip frames it as "Seasonal hours on Facebook". |
| Claims are honest | **Fail** | The attractions board publishes "School holidays 10 am – 9 pm" and "Weekends 11 am – 8 pm" under the heading "Open this season." The verification record contains no hours at all, and no illustrative/provisional label appears before or beside those values (only the third row and the small print defer to Facebook, which reads as a pointer, not a disclaimer). A visitor could act on invented opening times. Secondary: the home CTA "See today's hours" promises hours the page does not hold, and "New virtual reality zone · 2026" upgrades the sourced fact (a March 2026 review praising new VR games) to a "zone" the record does not evidence. |
| Real visitor loop | **Fail** | Two counts. (1) Invented seasonal hours are presented as working information. (2) On `/attractions/` at 390×844 the primary action `.ka-cta` "Check today's hours" and the "← Opening screen" back link are painted under `.ka-offers-link` and cannot be clicked — `document.elementFromPoint` at their centres returns "See current offers on Facebook", both at scroll top and at maximum scroll. At 1265×710 all four home rail cells (Dodgems, VR games, Arcade, **Call us**) return `aside.mm-concept-banner` / `a.mm-concept-claim` from `elementFromPoint`, and the document is only 711 px against a 710 px viewport, so they cannot be scrolled clear. The rail is dead to pointer input at desktop on both routes. |
| Subject proof | Pass | `/media/concepts/kent-amusements/kent-amusements-exterior-2023.jpg` is a real 2023 Geograph photograph of this arcade: the "KENT AMUSEMENTS" fascia and the "DODGEMS" sign are legible at both sizes, with the Mournes behind. At 1265 it fills the right half of the fold (633×486) with the credit strip in-fold at y 604–639. At 390 it occupies the bottom 231 px of the 844 fold and the frontage band is the part that shows. No CSS-illustration costume remains in the DOM (the old `.ka-stage` / `.ka-pier` / `.ka-bulbs` booth survives only as dead stylesheet rules). Weakness, not a failure: at 390 the CC BY-SA credit sits at y 892, ~48 px below the fold, so attribution travels with the image only after a scroll. |
| Responsive and keyboard usable | **Fail** | `/concepts/kent-amusements/attractions/` at 390×844: `.ka-atx-story` and `.ka-atx-panel` both measure `[0,135,390,545]` — 212,355 px² of overlap, i.e. 100 %. The mobile media query resets `grid-template-columns` and `grid-column` but never clears the base `grid-row: 1`, so both children land in the same cell and the hours/offers panel paints over the page's own H1, lede and all three attraction cards. The second surface's entire argument is invisible on a phone. Introduced in `e6bf321`, not by this repair, and never caught. Also: `.ka-nav` is `display:none` below 940 px with no replacement control, so "Find us", "Hours" and "Family offers" have no phone equivalent. Keyboard itself is clean: logical order, visible 3 px focus, Enter works. No horizontal overflow anywhere (`scrollWidth === clientWidth` = 390 and 1265 on both routes) and the header no longer clips the Call action at 390 (button right edge 374 of 390). |
| Readable and motion-safe | **Fail** | Three measured contrast misses on every screen: the `.ka-call` phone button (the concept's most important control) at **3.50:1** against the required 4.5:1; the `.ka-kicker` "CENTRAL PROMENADE · NEWCASTLE" at **4.02:1**; the `.ka-brand-sub` strapline at **2.98:1**. Reduced motion and image alternatives pass — the single image has a specific, useful alt text and decorative SVGs are `aria-hidden`. |

Review disposition: Revise

Evidence still needed to judge the design: none. Everything required was
reproducible locally; the supplied capture bundle was replaced with my own.

## Public release conditions

| Condition | Pass/Blocked | Evidence or unblock condition |
|---|---|---|
| Asset permission or publishable replacement | Pass (with note) | Geograph 7426796, Eric Jones, CC BY-SA 2.0 — publishable with attribution, which the figcaption and `ATTRIBUTION.md` provide. Note for public use: add a link to the source photo and the licence deed, and record that the cropped presentation is a ShareAlike derivative. |
| Truth check current within 90 days | Pass | `verifiedOn` 2026-07-22; expires 2026-10-20. |
| Independent-concept safeguards and honest public disclosure | Pass | `ConceptLayout` emits `noindex, nofollow`; the fixed banner reads "Independent concept by Mourne Made. Not the live Kent Amusements website." with the claim action `/request/?business=Kent%20Amusements&town=Newcastle&source=concept`, present on both routes. (The banner is also what occludes the rail — a placement defect, not a disclosure defect.) |
| Repository and journey checks | Blocked | `pnpm build` exit 0 and `pnpm test:reviewed-concepts` 7/7 pass on this fingerprint, but `pnpm test:concepts` exited 1 on this run (`/concepts/tonn-ruray/ · phone` HTTP 404, unrelated to Kent). Re-run on a quiet dev server to clear. |

## Creator self-review

No creator self-score was filed for this candidate, so this table is skipped as
permitted by the review brief.

## Independent review

First-glance order at desktop (1265×710): (1) the huge two-tone "KENT
AMUSEMENTS" wordline, navy over coral, filling the upper left; (2) the
photograph on the right half — red frontage, "KENT AMUSEMENTS" and "DODGEMS"
signage, Mournes behind; (3) the dark "See today's hours" button, with the coral
"Call 028 4372 2515" pill competing for the same attention from the header.
Fourth and unwanted: a band of half-cut white capitals peeking below the fixed
disclosure bar at the bottom edge — the occluded attractions rail.

First-glance order on phone (390×844): (1) "KENT AMUSEMENTS" headline; (2) the
coral "Call 028 4372 2515" button, the only saturated object above the fold;
(3) "See today's hours"; (4) the top 231 px of the photograph at the very bottom
edge, frontage visible but the credit line cut off below the fold. Identity and
action lead, and subject evidence follows — the intended phone sequence works.

Remove-nav test: passes clearly. With the header removed the screen still says
Kent Amusements twice (headline and the photographed fascia), states Central
Promenade twice, and shows the actual building. No other business could wear
this fold.

Swap-the-business test: the photograph, the address, the phone number and the
"Dodgems, arcade games and new VR" sentence would all have to go — that is real
specificity. But the chassis would survive intact: change the palette tokens and
display face and the identical layout carries a vet, a bike shop or a hotel,
which is exactly what the two neighbours below do. The SVG brand mark is the
weak link — it renders as a "P" beside a circle-and-chevron glyph that reads as
neither "K" nor "A" nor anything arcade-specific, so it would swap without
anyone noticing.

Closest-neighbour test: against **Donard Veterinary** the differences are
palette (pier navy/coral/amber vs plum/teal), display face (Teko vs a serif) and
subject copy — the strip, header, 50/50 hero, kicker rule, two-tone headline,
button pair, full-bleed Eric Jones 2023 Geograph photo and dark credit strip are
the same components in the same positions, captioned in the same format. Against
**Mourne Cycles** the same skeleton returns with a condensed two-tone name and a
captioned hero photo. Kent's genuinely own contributions are the seaside colour
temperature, the amber/dashed "ticket" treatment on the hours board, and the
horizontal attractions rail — and the rail is the element the disclosure banner
hides at desktop.

| Category | Weight | Score /10 | Weighted | Evidence | Strongest quality | Clearest weakness |
|---|---:|---:|---:|---|---|---|
| Evidence, truthfulness and respect | 15% | 5.5 | 0.825 | Address, phone and both handles match the corrections character-for-character; "over fifty years" and the VR reference trace to the tradingEvidence; the Dundalk caveat is honoured; image licence documented in two places. Against that, two hour ranges exist nowhere in the record. | The record is used properly rather than decoratively — even the strip line ("Seasonal hours on Facebook") reflects the verified fact that Facebook is where hours live. | Invented seasonal hours presented as fact on the one surface built to answer "when are you open", the concept's own stated design task. |
| Visitor outcome and concept thesis | 15% | 6.0 | 0.900 | Visitor job stated and answered in the fold: what's inside, where, and one tap to call. The Facebook-only reality is acknowledged rather than papered over, and the phone number is a genuine improvement on a login-walled page. | The opening speaks to the family, not to the owner's website problem — "Dodgems, arcade games and new VR" is the visitor's question answered first. | The payoff surface fails the visitor it was built for: on a phone the attractions page shows only the panels, and the hours it does show are not real, so the errand ends either invisible or misinformed. |
| Subject identity and distinctiveness | 15% | 6.0 | 0.900 | Remove-nav passes; palette and Teko read as seaside arcade; but the chassis is shared with Donard Veterinary and Mourne Cycles, and the credit-strip photo treatment is identical across all three. | The two-tone name at 88 px over the real frontage gives the arcade a confident, unmistakably seaside voice it has never had. | Layout-level repetition of two sibling concepts plus a brand mark whose letterforms belong to no business — colour and type are doing all the differentiating work. |
| First viewport and visual composition | 15% | 6.0 | 0.900 | One dominant plane per side at desktop, clear brand → proposition → one action; phone sequences identity, action, evidence. | A genuinely legible composition: nothing decorative competes with the headline and the photograph. | The fold ends in a defect at both routes on desktop — the rail's white capitals are cut in half by the disclosure bar — and the photograph gives roughly its lower half to parked cars and tarmac, so the arcade itself occupies only the upper third of the proof plane. |
| Complete loop and functional integrity | 15% | 5.0 | 0.750 | Handoffs resolve to the correct accounts (200), the tel: link is correct, placeholders are properly marked, and the family-offers empty state is exemplary. Against that: four dead rail cells at 1265 on both routes, and a covered primary CTA and back link at 390 on `/attractions/`. | The empty state — "No current offer details were verified for this concept. This is a proposed update slot" — is the most honest failure state in the batch. | Controls that exist, look active and are unclickable: the desktop rail (including "Call us") and the phone attractions CTA, both verified by hit-test at maximum scroll. |
| Responsive use and accessibility | 15% | 4.0 | 0.600 | No horizontal overflow at 390 or 1265 on either route; header Call action fully inside 390 (right edge 374); clean keyboard order with a visible 3 px focus ring; reduced motion neutralised; useful alt text. Against that: 100 % grid overlap at 390 on `/attractions/`, no phone nav replacement, and three contrast misses. | The keyboard run is genuinely good — every control reachable, focus always visible, nothing focusable that is hidden. | Essential content hidden by a stacking bug: on a phone, the attractions page's heading, lede and all three attraction cards are painted under the hours and offers panels. |
| Craft and finish | 10% | 5.5 | 0.550 | Zero console errors, clean `astro check`, considered type scale, tidy credit strip. Against that, the stylesheet still carries ~60 lines of removed-costume rules (`.ka-stage`, `.ka-pier`, `.ka-bulbs`, `.ka-visual-note`, `@keyframes ka-rise`/`ka-bulbs`) and a stale reduced-motion block targeting elements that no longer exist. | Console, build and type checks are all clean, and the placeholder discipline (`data-concept-placeholder`, no bare `href="#"`) is exact. | A comment on `.ka-rail` asserts the layout is arranged "so the fixed concept-disclosure badge … never covers a cell" — the badge covers all four; alongside that, mixed straight/curly apostrophes and "See today's hours" vs "Check today's hours" for the same action. |
| **Total** | **100%** |  | **5.42/10** |  |  |  |

## Verdict

Weighted score: (5.5 × .15) + (6.0 × .15) + (6.0 × .15) + (6.0 × .15) +
(5.0 × .15) + (4.0 × .15) + (5.5 × .10) = 0.825 + 0.900 + 0.900 + 0.900 + 0.750
+ 0.600 + 0.550 = **5.425 → 5.42/10** (not rounded up).

Core category floors at 7.0 met: No — evidence 5.5, outcome 6.0, loop 5.0,
responsive 4.0 all below 7.0.

Supporting category floors at 6.0 met: No — craft 5.5 (identity and first
viewport meet 6.0).

All design gates pass: No — claims, real visitor loop, responsive/keyboard and
readable/motion-safe fail; current-and-respectful and subject proof pass.

All public release conditions pass: No — repository checks blocked on a
`pnpm test:concepts` failure (unrelated route) pending a clean re-run.

Verdict: **Revise**

Required repairs in priority order:

1. **Invented seasonal hours.** `attractions.astro` lines 100–113 publish "10 am
   – 9 pm" and "11 am – 8 pm" with no source and no label. Either remove the
   values and defer all three rows to Facebook, or place a visible provisional
   label *before* the values in the same way Cúpla labels its sample menu.
   Acceptance check: a browser assertion in
   `tools/test/test-reviewed-concept-journeys.mjs` that no time-of-day string
   appears in `.ka-hours-board` unless a labelled provisional marker precedes it
   in DOM order.
2. **Phone attractions grid overlap.** `.ka-atx-story` and `.ka-atx-panel` both
   occupy grid row 1 at ≤940 px (`concept-kent-amusements.css` lines 543–548 omit
   `grid-row`). Acceptance check: at 390×844 the union of the two rectangles has
   zero intersection, and `document.elementFromPoint` at the centre of `.ka-cta`
   returns `.ka-cta`. Add this as a portfolio-wide assertion — the 72-case audit
   checks overflow but not stacking, and would not have caught this on any
   concept.
3. **Disclosure banner occludes the bottom rail at 1265×710.** All four rail
   cells on `/` and the last two on `/attractions/` fail a centre hit-test even
   at maximum scroll (document 711 px vs viewport 710 px). Give the page bottom
   padding equal to the banner height, or move the rail. Acceptance check: every
   `.ka-rail-cell` centre returns itself from `elementFromPoint` at 1265×710.
4. **Contrast.** `.ka-call` 3.50:1, `.ka-kicker` 4.02:1, `.ka-brand-sub` 2.98:1.
   Acceptance check: computed contrast ≥ 4.5:1 for all three at both sizes.
5. **Under-labelled external handoffs on the home page.** "See today's hours" and
   nav "Find us" leave the site with no signal; mirror the attractions wording
   ("… on Facebook →") and add `rel="external"`. While there, give "Hours" and
   "Family offers" real anchors or drop them to one honest "Attractions" link.
6. **Housekeeping.** Delete the dead costume rules and the stale reduced-motion
   block; correct the false `.ka-rail` comment; normalise apostrophes and the
   CTA wording.

## Appeal

Appeal requested: No  
Reason: —  
Appeal reviewer: —  
Appeal reviewer saw earlier scores before deciding: No  
Appeal score: —  
Appeal verdict replacing the original: —

## Re-review

Date: 2026-07-25  
Commit: `8987095`  
Checks repeated: first-glance at 1265×710 and 390×844 on both routes; pointer
and keyboard loop; failure/empty state; every exposed route and action; all six
material-claim classes against `research/pipeline/verifications.json`; computed contrast
on 17 text/control pairs; reduced-motion emulation; overflow and header-clip
measurement; console capture; remove-nav, swap-the-business and closest-neighbour
tests; `pnpm build`, `pnpm test:concepts`, `pnpm test:reviewed-concepts`.  
Earlier defect disposition (read only after the scores above were fixed):

- **390 px header overflow clipping the "Call" action — resolved.** Measured at a
  true 390 px viewport: document `scrollWidth` 390 = `clientWidth` 390 on both
  routes; header 390×75 with the Call button occupying x 231.6–374.0, entirely
  inside the viewport. The `≤520 px` rule that shrinks the mark, drops the
  strapline and tightens the padding is what fixed it.
- **"The whole hero is an SVG booth (costume) with zero real arcade imagery" —
  resolved.** The fold now carries a real, licensed 2023 photograph of this
  arcade with legible fascia signage, credited in an adjacent figcaption; no
  costume element remains in the DOM. The subject-proof gate passes.
- **"Honesty is a genuine strength — offers/hours self-label and defer to
  Facebook" — regressed.** The offers card still self-labels, but the hours board
  now asserts two unlabelled, unverified time ranges, which fails the claims
  gate that the first round passed.
- **Not previously found, still open:** the 390 px attractions grid overlap
  (present since `e6bf321`), the disclosure banner covering the desktop rail, and
  three contrast misses including the primary phone control.

Final score: 5.42/10  
Final verdict: Revise

If the final verdict is Revise:

Retired from public queue: not yet — this is the first independent verdict on
the repaired source, and the concept's one focused repair cycle after the
original 24 July Revise has been implemented but is now shown to have left three
gates failing. Owner decision required on whether repairs 1–4 count as that
cycle's completion or as a second cycle.  
Condition required to reopen: sourced or visibly labelled hours, a phone
attractions layout that shows its own content, clickable rail cells at desktop,
and contrast-compliant controls — then a fresh independent re-review of the
affected categories.

## Truth refresh

Date: 2026-07-25  
Trading status: Open — unchanged; verification 2026-07-22 (TripAdvisor March
2026, Companies House NI688147 November 2025, Yelp February 2026).  
Current public presence: Facebook and Instagram only; both
`kentamusementsnewcastle` URLs returned HTTP 200 on 2026-07-25.  
Primary external handoff: Facebook page — resolves, correct account, not the
Dundalk namesake.  
Material claims: unchanged since 2026-07-22, except that the page now states
seasonal hours the record does not contain.  
Asset permission: still valid (CC BY-SA 2.0, attributed).  
Material change found: No  
Affected categories to re-review: none on truth-refresh grounds.  
Public status: Remove pending re-review (never published; zero public
transformations).
