# Archived concept review — The Buck's Head — 24 July 2026

Status: Revise

Concept: `/concepts/bucks-head/`  
Reviewed commit: `5dc71088d8ec70ae2b71ee07f9eebd0b41d4ead5`  
Reviewed source fingerprint: `sha256:82818e47ecde4be1b827267b9b8fd34d55eaef611eecc24c34394cf2631ac6db`  
Creator: Codex root agent  
Independent reviewer: independent non-creator agent `bucks_head_v11_review`

## Candidate

Visitor job: Book a table for a chosen date and party, or read a named menu on a phone, without replacing the pub's maintained site or ResDiary engine.

Current presence and verification: `research/pipeline/verifications.json`, The Buck's Head record, verified 24 July 2026.

Truth checked at: 2026-07-24

Primary loop: concept home → choose date and party → ResDiary handoff → unavailable date → choose an available date and continue.

Review boundary:

- Start screen/state: `/concepts/bucks-head/`, first visit.
- Successful end screen/state: ResDiary shows the requested date and party with an available time.
- Important failure state: a closed date reaches ResDiary with `None Available`.
- Recovery: choose an open date; ResDiary restores an available time.

Exposed routes and actions outside the loop:

- `/concepts/bucks-head/menus/` and five landing-page menu links → intended to open the named on-page menu.
- Header booking actions → open the unparameterised ResDiary widget.
- Fish & Farm, Gift vouchers, Rooms and Contact → rendered visibly inert by the shared concept shell.
- Telephone links → call the pub's published number.

Declared placeholders, stubs and limitations:

- The menus route uses illustrative dishes drawn from published menus; prices, descriptions and availability may differ.
- The concept is independent, uncommissioned and `noindex`.
- Public-use permission for the real hearth photograph is not documented.

Closest portfolio neighbours:

- Hotel Enniskeen — deep-green/cream hospitality palette, serif accent and photograph-plus-booking composition.
- Donard Hotel — heritage-hospitality copy and cream surface treatment.

## Evidence bundle

- Current capture: `public/media/concepts/bucks-head/bucks-head-before.jpg`
- Desktop after, 1265×710: `public/media/concepts/bucks-head/bucks-head-after.jpg`
- Phone first screen, 390×844: `.scratch/renders/bucks-head-journey/2026-07-24/booking-after-01-home.png`
- Primary-loop walkthrough or recording: `.scratch/renders/bucks-head-journey/2026-07-24/README.md`
- Failure and recovery evidence: live ResDiary checks on 24 July 2026; a closed date returned `None Available`, an open date returned `12:00`.
- Sources, asset credits and limitations: `research/pipeline/verifications.json`, `research/concepts/bucks-head/bucks-head-journey-plan.md`, and the concept menus sidebar.
- Asset source and public-use rights status: `public/media/concepts/bucks-head/bucks-head-hearth.jpg`, copied from the pub's public site; public-use permission not documented.
- External destination and accepted parameters: `https://booking.resdiary.com/widget/Standard/TheBucksHeadRestaurantwithRooms/50459?date=2026-08-01&partySize=2`; date and party were honoured.
- Keyboard check: booking fields and submit were usable with visible focus; menu tabs could be reached and activated, but the full Arrow/Home/End tab pattern was absent.
- Contrast check: most tested pairs passed; the 11px unselected tab sublabel was approximately 3.26:1 and failed.
- Reduced-motion check: the media query removed the entrance animation; the initial source still used generic rise motion in the default experience.
- `pnpm build`: passed, 124 Astro files checked with zero diagnostics and 71 pages built.
- `pnpm test:concepts`: passed.
- Relevant journey or interaction check: dated audit and exact live ResDiary handoff reproduced.
- Browser console: local routes clean; an external ResDiary dependency emitted its own warning.

## Design gates

| Gate | Pass/Fail | Evidence or defect |
|---|---|---|
| Current and respectful | Pass | Fresh verification and a measured journey case that preserves the maintained site and booking engine. |
| Claims are honest | Pass, narrowly | Independent disclosure and menu limitation exist, but the menu limitation follows the phone's prices. |
| Real visitor loop | Fail | Four named landing links retain their hashes while showing À la carte. |
| Subject proof | Pass | Real hearth, antlers and frontage-derived colours identify the subject internally. |
| Responsive and keyboard usable | Pass | No overflow and visible focus at both target sizes; full tab-key pattern is incomplete. |
| Readable and motion-safe | Fail | Unselected tab sublabels measure about 3.26:1 at 11px. |

Review disposition: Revise

Evidence still needed to judge the design: none.

## Public release conditions

| Condition | Pass/Blocked | Evidence or unblock condition |
|---|---|---|
| Asset permission or publishable replacement | Blocked | Document permission for the hearth image or replace it with publishable real subject photography. |
| Truth check current within 90 days | Pass | Verified 24 July 2026. |
| Independent-concept safeguards and honest public disclosure | Pass for internal route | `noindex`, disclosure and claim action are present; recheck public case copy on any release candidate. |
| Repository and journey checks | Pass for reviewed source | Build, release self-test, concept-shell check and live handoff passed. |

## Creator self-review

| Category | Score /10 | Evidence | Strongest quality | Clearest weakness |
|---|---:|---|---|---|
| Evidence, truthfulness and respect | 8.0 | Same-day verification, paired audit and exact parameter test. | The work argues for a shorter journey, not a dishonest rebuild. | Menu limitations are too far from initial prices. |
| Visitor outcome and concept thesis | 7.5 | Booking and menu errands fall to one tap. | The change has a measured visitor benefit. | Named menu links do not all reach the named menu. |
| Subject identity and distinctiveness | 6.5 | Hearth, antlers, spruce and blush. | Real subject details survive the remove-nav test better than most concepts. | Cream, Lora and pill controls repeat the hospitality lane. |
| First viewport and visual composition | 6.0 | Desktop carries story, photo and booking. | The useful action is immediately apparent. | The card covers the hearth and phone proof barely enters the first screen. |
| Complete loop and functional integrity | 6.0 | Exact ResDiary handoff and recovery work. | The external engine honours the collected fields. | Menu hashes and tab history are broken. |
| Responsive use and accessibility | 6.5 | No overflow, visible focus, usable form. | Phone segmentation is readable. | Contrast and complete tab keyboard semantics are unfinished. |
| Craft and finish | 6.0 | Strong typography and menu scanability. | Spacing is generally deliberate. | Rise motion, pills, floating card and banner collision read as template residue. |

Creator weighted score: `(8×.15) + (7.5×.15) + (6.5×.15) + (6×.15) + (6×.15) + (6.5×.15) + (6×.10) = 6.68`

## Independent review

First-glance order at desktop: slogan → booking card → hearth photograph.

First-glance order on phone: compressed wordmark and booking action → slogan → long introduction and actions.

Remove-nav test: weak; the opening heritage-pub promise is more prominent than the business identity.

Swap-the-business test: frontage colours, antlers, named owners and hearth are specific, but the cream/serif/pill/floating-card treatment transfers too easily.

Closest-neighbour test: stronger real subject proof than Donard Hotel, but the split hospitality hero remains visibly close to Enniskeen.

| Category | Weight | Score /10 | Weighted | Evidence | Strongest quality | Clearest weakness |
|---|---:|---:|---:|---|---|---|
| Evidence, truthfulness and respect | 15% | 7.5 | 1.125 | Fresh verification and reproduced handoff. | Respectful, measured journey thesis. | Menu detail disclaimer arrives late. |
| Visitor outcome and concept thesis | 15% | 7.0 | 1.050 | Both errands are materially shorter. | Concrete booking and menu jobs. | Four menu routes deliver the wrong panel. |
| Subject identity and distinctiveness | 15% | 6.5 | 0.975 | Frontage palette, antlers, hearth and local language. | Real subject cues are present. | Generic heritage-hospitality treatment dominates. |
| First viewport and visual composition | 15% | 6.0 | 0.900 | Desktop combines proof and action. | The useful action is prominent. | Card covers the hearth; phone fold and disclosure collision are crowded. |
| Complete loop and functional integrity | 15% | 6.0 | 0.900 | Date/party handoff and failure/recovery work. | ResDiary receives exactly what is collected. | Hash routing breaks four exposed actions. |
| Responsive use and accessibility | 15% | 6.5 | 0.975 | No overflow and visible focus. | Core booking works at both sizes. | Tab pattern and text contrast are incomplete. |
| Craft and finish | 10% | 6.0 | 0.600 | Typography and menu scanning are deliberate. | The menu is readable on a phone. | Motion, pills and floating-card/banner collisions retain template residue. |
| **Total** | **100%** |  | **6.53/10** |  |  |  |

## Verdict

Weighted score: 6.53/10

Core category floors at 7.0 met: No

Supporting category floors at 6.0 met: Yes

All design gates pass: No

All public release conditions pass: No

Verdict: Revise

Required repairs in priority order:

1. Synchronise all landing menu hashes, menu panels, history and tab state.
2. Complete Arrow/Home/End keyboard behaviour with one tab in the tab order.
3. Raise every tab label and sublabel to at least 4.5:1.
4. Make the business and real hearth proof more prominent, and stop the disclosure obscuring the desktop rail.
5. Move the illustrative-menu warning before prices and remove or visibly label unsupported scope.
6. Remove generic rise motion and reduce the repeated hospitality pill/floating-card treatment.

## Appeal

Appeal requested: No  
Reason: Not applicable.  
Appeal reviewer: Not applicable.  
Appeal reviewer saw earlier scores before deciding: No  
Appeal score: Not applicable.  
Appeal verdict replacing the original: Not applicable.

## Re-review

Date: 2026-07-24  
Commit: `771042ed16651ef97f8c0c968a14d198ade24567`  
Reviewed source fingerprint: `sha256:e96dea913da9d5c42fb4990464283828f09fe9ba264f7c8a67d50f2eb2c7d947`  
Checks repeated: all five landing hashes, click/history state, Arrow Left/Right/Home/End, one tab stop, tab contrast, warning placement, blank-date failure/recovery, exact ResDiary parameters, first-glance order, hearth visibility, disclosure collision, reduced motion, overflow and console.  
Earlier defect disposition: menu state, keyboard behavior, contrast, subject-photo exposure, blank-date validation, inactive scope and rail collision repaired. One truth-boundary defect remains: hash navigation scrolls directly to the selected panel, past the illustrative-price warning.  
Final design gates: current/respectful Pass; claims honest Fail; real visitor loop Pass; subject proof Pass; responsive/keyboard Pass; readable/motion-safe Pass.  
Final scores: evidence/truth/respect 6.5; visitor outcome 7.5; subject identity 7.0; first viewport 7.0; complete loop 7.5; responsive/accessibility 7.5; craft/finish 7.0.  
Final score: 7.15/10  
Final verdict: Revise

If the final verdict is Revise:

Retired from public queue: 24 July 2026; remains an internal `noindex` prototype and absent from public transformations and outreach.  
Condition required to reopen: new evidence, publishable real subject imagery plus a materially revised truth/disclosure treatment, or an explicit owner decision to treat the concept as a flagship.

## Truth refresh

Date: 2026-07-24  
Trading status: Open; fresh verification record.  
Current public presence: Maintained WordPress/Elementor site with ResDiary and current PDF menus.  
Primary external handoff: Date and party accepted; no reservation completed.  
Material claims: Current.  
Asset permission: Action required.  
Material change found: No  
Affected categories to re-review: none  
Public status: Remove pending review
