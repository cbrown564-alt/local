# Archived concept review — Hotel Enniskeen — 24 July 2026

Status: Reviewable after a material generated-image replacement on 24 July
2026; the superseded source passed design after one focused repair cycle

Concept: `/concepts/hotel-enniskeen/`  
Reviewed commit: `35790b85672d4d21d58c1be05da165bc42819e03`  
Reviewed source fingerprint: `sha256:fcb1997d7b9c50e278d1a379338e3a2d570f8d06a11ffac13050353ac0f79c59`  
Creator: Conor Brown / Mourne Made  
Independent reviewer: Codex agent `/root/enniskeen_blind_review`, a separate
non-creator reviewer who did not inspect the creator score before deciding

## Candidate

Visitor job: Choose a stay date and length, understand the hotel, and hand
those dates into the hotel's existing Bookin1 booking engine.

Current presence and verification:
`research/pipeline/verifications.json` → Hotel Enniskeen, re-read for the F1 build on
23 July 2026.

Truth checked at: 2026-07-23.

Primary loop: Home → choose arrival date and nights → check availability →
Bookin1 results with the selected `date` and `los` values.

Review boundary:

- Start screen/state: `/concepts/hotel-enniskeen/`, default home state.
- Successful end screen/state: the hotel's Bookin1 results route with the
  selected arrival date and length of stay.
- Important failure state: availability submit with no arrival date.
- Recovery: choose a valid date and submit again; the handoff URL is created.

Exposed routes and actions outside the loop:

- Stay → `/concepts/hotel-enniskeen/rooms/` works.
- Dine → `/concepts/hotel-enniskeen/dine/` works.
- The estate → `/concepts/hotel-enniskeen/estate/` works.
- Things to do → `/concepts/hotel-enniskeen/things-to-do/` works.
- Gift vouchers → the hotel's existing external voucher shop.
- Claim this concept → `/request/` with business, town and source parameters.
- Case-study return is absent while the concept has no public Phase Q Pass.

Declared placeholders, stubs and limitations:

- The concept is independent and uncommissioned.
- The concept reuses publicly available hotel photographs, but no permission
  or covering licence for that reuse is filed.
- Production request delivery and a printed-phone QR scan are separate outreach
  gates and are not represented as complete here.

Closest portfolio neighbours:

- The Buck's Head — hospitality photography plus an existing booking engine.
- The Donard Hotel — book-direct thesis, but without Enniskeen's documented
  working-site depth.

## Evidence bundle

- Current capture: `public/media/concepts/hotel-enniskeen/hotel-enniskeen-before.jpg`
- Desktop after, 1265×710: `public/media/concepts/hotel-enniskeen/hotel-enniskeen-after.jpg`
- Phone first screen, 390×844:
  `research/concepts/hotel-enniskeen/evidence/phone-390x844.png`
- Current desktop first screen, 1265×710:
  `research/concepts/hotel-enniskeen/evidence/desktop-1265x710.png`
- Primary-loop walkthrough or recording:
  `public/media/concepts/hotel-enniskeen/hotel-enniskeen-reel.webm` and
  `research/concepts/hotel-enniskeen/enniskeen-flagship-plan.md`
- Failure and recovery evidence: native required arrival field plus the
  build-day Bookin1 parameter check recorded in
  `research/concepts/hotel-enniskeen/enniskeen-flagship-plan.md`
- Sources, asset credits and limitations:
  `src/site/data/transformation-details.ts` → `hotel-enniskeen`
- Permission or licence evidence for reused assets: **Missing.** Public
  availability and attribution do not establish reuse permission.
- External destination and accepted parameters: Bookin1 accepts `date` and
  `los`, recorded during F1 build-day verification.
- Keyboard check: visible 2.4px focus outline confirmed on the brand link;
  the independent reviewer must complete the full primary-loop run.
- Contrast check: pine-panel text passes (soft copy 7.92:1, honey 4.70:1,
  cream 10.80:1), but `--honey-deep` small labels on cream are only 3.21:1
  and fail the 4.5:1 body-text threshold.
- Reduced-motion check: previously passed during F1; must be repeated on a
  complete review candidate.
- `pnpm build`: Pass, 24 July 2026; 0 Astro errors and 0 warnings.
- `pnpm test:concepts`: Pass against the production preview, 24 July 2026.
- Relevant journey or interaction check: F1 Bookin1 handoff check passed on
  the recorded build.
- Browser console: no warnings or errors in the phone or desktop run.

## Design gates

| Gate | Pass/Fail | Evidence or defect |
|---|---|---|
| Current and respectful | Pass | Build-day verification is one day old and the current capture is representative. |
| Claims are honest | Pass | The concept identifies itself as independent and its material claims are sourced from the hotel's current presence. |
| Real visitor loop | Fail | Clearing the arrival field leaves a valid-looking empty control with no error. It is not required, has no `aria-invalid` state and exposes no error text; submit falls back to the engine landing instead of presenting a failure and recovery path. |
| Subject proof | Pass | The photographs are specific to the hotel. Their public-use rights are a separate release condition under v1.1. |
| Responsive and keyboard usable | Fail | At the required 390×844 viewport, the header CTA ends at x=382 while the layout viewport ends at x=375, producing a visible horizontal scrollbar and clipping the control. |
| Readable and motion-safe | Fail | Reduced-motion rules remove the entrance animations, but `--honey-deep` small text on cream measures 3.21:1 rather than 4.5:1. |

Review disposition: Revise on creator self-review. Keep out of public
presentation; await the blind independent verdict before starting the single
repair cycle.

Evidence still needed to judge the design: independent phone, desktop,
keyboard, failure/recovery and Bookin1 checks.

## Public release conditions

| Condition | Pass/Blocked | Evidence or unblock condition |
|---|---|---|
| Asset permission or publishable replacement | Blocked | File permission or a covering licence for every reused hotel photograph, or replace them with publishable assets. |
| Truth check current within 90 days | Pass | Checked 23 July 2026. |
| Independent-concept safeguards and honest public disclosure | Pass | `noindex, nofollow`, fixed desktop/static phone disclosure and the claim action were verified live; the withheld case-study link is correct. |
| Repository and journey checks | Blocked | Build and concept-shell checks pass, but the bounded loop has no automated missing-date failure/recovery assertion and currently fails that live check. |

## Creator self-review

| Category | Score /10 | Evidence | Strongest quality | Clearest weakness |
|---|---:|---|---|---|
| Evidence, truthfulness and respect | 7.5 | One-day-old verification, representative before capture, source-backed copy and an explicit independent-concept label. | The proposal preserves the hotel's real Bookin1 plumbing and gives the existing site credit for its content and photographs. | Public image rights remain unfiled, separately blocking release. |
| Visitor outcome and concept thesis | 7.5 | Dates and nights are the only requested inputs and match the verified engine parameters. | The stay decision moves from an archive-like site into a clear, subject-led route. | The phone first screen reaches the booking controls only after the 300px image and 486px story. |
| Subject identity and distinctiveness | 6.5 | Real house, estate, room and food photography; pine, brass and the hotel name distinguish it from Buck's Head and Donard Hotel. | The actual turreted house and Shimna Valley story make the subject tangible. | Without the header name, “mountainside hideaway” and the quiet-luxury serif remain transferable to another country hotel. |
| First viewport and visual composition | 6.5 | Desktop is a strong 48/52 story/house composition with the booking bar across the seam; phone preserves the house and story order. | The house remains the dominant proof plane and the date bar concludes the desktop fold. | The desktop disclosure crowds the booking bar, while the clipped phone header and below-fold booking weaken the first screen. |
| Complete loop and functional integrity | 5.5 | The successful `date` + `los` handoff was verified in F1. | The external handoff asks only for values the engine accepts. | There is no important failure state or recovery: an empty date silently falls back to the generic engine. |
| Responsive use and accessibility | 5.5 | Semantic headings, labels, useful image alternatives, visible focus and reduced-motion rules exist. | The content order and main actions remain understandable at both required sizes. | The 390px header overflows horizontally and low-contrast small labels fail the stated threshold. |
| Craft and finish | 6.5 | Deliberate image crops, inset pine frame, responsive derivatives, restrained motion and no browser-console defect. | The desktop hero feels composed rather than assembled from generic cards. | The clipped phone CTA, scrollbar and failed small-text colour are release-visible finish defects. |

Creator weighted score:
`(7.5 + 7.5 + 6.5 + 6.5 + 5.5 + 5.5) × .15 + 6.5 × .10 = 6.50`.

## Independent review

First-glance order at desktop: Enniskeen house → mountainside proposition →
availability bar.

First-glance order on phone: Enniskeen brand/book action → house → proposition.

Remove-nav test: Pass. The real house, Shimna Valley, estate language and hotel
name make the subject identifiable without the navigation.

Swap-the-business test: Mostly pass. The photography and copy do not transfer;
the pine/brass/Cormorant treatment could transfer to another heritage hotel.

Closest-neighbour test: Donard Hotel is the functional neighbour and Hugh
McCann's the closest heritage-serif aesthetic. Enniskeen is distinguished by
the valley-estate narrative and real-house imagery.

| Category | Weight | Score /10 | Weighted | Evidence | Strongest quality | Clearest weakness |
|---|---:|---:|---:|---|---|---|
| Evidence, truthfulness and respect | 15% | 8.0 | 1.20 | Fresh verification, representative current capture and preserved Bookin1 plumbing. | Detailed research treats the existing hotel fairly. | The third-party result page could not render; only its requested destination was captured. |
| Visitor outcome and concept thesis | 15% | 8.0 | 1.20 | The request carried `date=2026-09-18&los=3`. | Dates and nights lead directly into the existing booking route. | The page does not explain or recover when arrival is omitted. |
| Subject identity and distinctiveness | 15% | 7.5 | 1.13 | Real house, estate, rooms and location-specific language. | The subject is difficult to swap. | The quiet-luxury serif/brass lane remains familiar. |
| First viewport and visual composition | 15% | 7.5 | 1.13 | Asymmetric story/house split and seam-spanning availability. | Real property carries the dominant visual plane. | Desktop actions compete; exact phone hierarchy needed repair confirmation. |
| Complete loop and functional integrity | 15% | 6.0 | 0.90 | Successful destination carries the intended two parameters. | The handoff matches the Bookin1 contract. | Empty arrival silently falls back to the generic engine, with no error or recovery state. |
| Responsive use and accessibility | 15% | 6.0 | 0.90 | Native controls, labels, responsive stacking and reduced-motion support. | The core content remains understandable. | Focus and small-label contrast fail; the creator evidence also records 390px header overflow. |
| Craft and finish | 10% | 6.5 | 0.65 | Real imagery, deliberate crops and restrained framing. | Desktop reads as a composed hotel experience. | The repeated rise sequence and release-visible access defects remain. |
| **Total** | **100%** |  | **7.10/10** |  |  |  |

## Verdict

Weighted score: 7.10/10.

Core category floors at 7.0 met: No; complete loop and responsive/accessibility
are 6.0.

Supporting category floors at 6.0 met: Yes.

All design gates pass: No.

All public release conditions pass: No.

Verdict: Revise.

Required repairs in priority order:

1. Keep an empty-date submit on the concept page, announce a useful error,
   focus the date field, preserve nights and let correction submit the exact
   `date` and `los` destination by pointer and keyboard.
2. Remove phone horizontal overflow and prove the full loop at 390×844 and
   1265×710.
3. Raise all small-text contrast to 4.5:1 and focus indicators to 3:1 against
   adjacent surfaces.
4. Replace the repeated generic rise sequence with one earned arrival or no
   entrance motion.
5. Before release, file photography permission or publishable replacements and
   repeat the repository/journey checks.

## Appeal

Appeal requested: No.  
Reason: Missing evidence is factual and does not receive an appeal score.  
Appeal reviewer: Not applicable.  
Appeal reviewer saw earlier scores before deciding: Not applicable.  
Appeal score: Not applicable.  
Appeal verdict replacing the original: Not applicable.

## Re-review

Completed 24 July 2026. This was the one focused repair cycle allowed by v1.1.

Reviewed source fingerprint:
`sha256:ab31d33e40f7348e1d2712a1902f8e99fbdc687b7d1cc4b18101c7ac61367ef9`.

Repairs:

- required arrival field with a local, announced error and focused recovery;
- preserved selected nights and exact Bookin1 `date` + `los` handoff;
- no horizontal overflow at 390×844, with the header CTA retained at 44px;
- darker small-text colour and cream/pine two-tone keyboard focus;
- removed repeated entrance motion;
- added `pnpm test:enniskeen`.

Independent reviewer evidence:

- missing arrival stayed local, announced “Choose an arrival date,” focused
  the field and preserved the selected five nights;
- recovery requested the exact Bookin1 destination with
  `date=2026-09-18&los=5`;
- 1265×710 and 390×844 both had zero horizontal overflow;
- reduced-motion inspection found no material animation or transition;
- `pnpm test:concepts`, `pnpm test:enniskeen` and `pnpm build` passed.

| Category | Score /10 |
|---|---:|
| Evidence, truthfulness and respect | 8.0 |
| Visitor outcome and concept thesis | 8.0 |
| Subject identity and distinctiveness | 7.5 |
| First viewport and visual composition | 7.5 |
| Complete loop and functional integrity | 8.0 |
| Responsive use and accessibility | 7.5 |
| Craft and finish | 7.0 |
| **Weighted total** | **7.68** |

All six design gates pass. Truth currency, independent-concept safeguards and
repository/journey checks pass. Asset permission remains blocked.

Re-review verdict: **Release blocked**. The design passes; file permission or a
covering licence for every reused hotel photograph, or replace them with
publishable assets, before public restoration.

## Generated imagery replacement

Material change recorded 24 July 2026.

Current source fingerprint:
`sha256:85ff0726a31c71783552de05031248adb96e6a163a864f1a0f9a131ba740ee70`.

All scenic and interior photographs referenced by the five concept routes were
replaced with eleven original images generated through the built-in image
generation workflow. JPEG sources and 640/1265 WebP derivatives live under
`public/images/enniskeen-generated-*`.

The shared concept banner now says: “Scenic and interior images are
provisional AI-generated visualisations; they do not show the hotel exactly.”
Key image captions and every alternative description also identify generated
or provisional visualisations.

Prompt set:

1. Fictional late-Victorian country house below the Mournes, wide exterior.
2. Fictional country house within a wooded twelve-acre valley estate.
3. Traditional bedroom and balcony opening toward a mountain valley.
4. Compact preserved blush-pink 1930s art-deco bathroom.
5. Traditional en-suite with a forest-green roll-top bath.
6. Small old-world country-house restaurant with mountain windows.
7. Northern Irish afternoon tea on a stone terrace above a wooded valley.
8. Country-house lounge with worn seating, bay window and open fire.
9. Woodland path beside a river with native estate planting.
10. Hillwalker above a Mourne reservoir under low cloud.
11. Two leisure cyclists descending a wet wooded Mourne road.

Shared constraints across the prompt set: photorealistic editorial treatment;
original fictional subjects; realistic Northern Irish texture and weather; no
hotel name, logo, sign, readable text or watermark; do not reproduce an
identifiable real hotel.

Checks after replacement:

- all five routes reference only `enniskeen-generated-*` concept images;
- every generated image and responsive derivative loads;
- 1265×710 and 390×844 have no horizontal overflow;
- the disclosure is present on every route and readable at both sizes;
- `pnpm build`, `pnpm test:concepts` and `pnpm test:enniskeen` pass.

Asset permission is now clear. Because the image change materially affects
truth/respect, identity, composition and craft, the current source is
Reviewable and the superseded 7.68 score is retained only as history.

## Truth refresh

Date: 2026-07-23.  
Trading status: Trading; current hotel website and booking engine live.  
Current public presence: Live and representative capture filed.  
Primary external handoff: Bookin1 `date` + `los`.  
Material claims: Unchanged from the F1 build-day verification.  
Asset permission: Action required.  
Material change found: No design change; permission evidence is missing.  
Affected categories to re-review: Evidence/truth/respect and subject proof,
then the complete candidate.  
Public status: Release blocked pending photography permission or publishable
replacement assets.
