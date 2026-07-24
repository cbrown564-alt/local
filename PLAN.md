# Plan

Working roadmap for Mourne Made after the Product Stage homepage ship.
Update this file when a milestone starts, finishes, or changes shape.

Snapshot: 24 July 2026 · Milestone 1 complete · Milestone 2 second assets shipped · "See it in motion" demo clips shipped · F1 Enniskeen flagship and F2 Buck's Head journey case complete locally · **Phase Q release gate and retroactive triage complete with zero public passes; all 20 concepts are internal pending evidence** · South Down Signs on hold

---

## Milestone 1 — Finish remaining shortlist landings ✅

Complete the opening-screen concept for each remaining shortlisted prospect, using the established build loop in `PROSPECTS.md` (verify → build → capture → design notes → record).

| Business | Town | Type | Landing brief | Status |
|---|---|---|---|---|
| **The Tool Centre** | Newcastle | First website | Utilitarian trade site: hire prices, stock categories, hours | Published — [/transformations/tool-centre/](/transformations/tool-centre/) |
| **Kent Amusements** | Newcastle | First website | Seasonal attraction site: attractions, hours, family offers | Published — [/transformations/kent-amusements/](/transformations/kent-amusements/) |
| **Newcastle Chamber of Commerce** | Newcastle | First website / community | Civic hub: member directory, events, join page | Published — [/transformations/newcastle-chamber/](/transformations/newcastle-chamber/) |

### Exit criteria

- Concept page at `/concepts/<slug>/` with its own scoped stylesheet
- Transformation page at `/transformations/<slug>/` with matched 1265×710 captures, three design notes, and independent-concept disclosure
- Registered in `src/data/transformations.ts`, capture script `CONCEPTS` map, `research/verifications.json` (stage → Concept published), and `PROSPECTS.md`
- Re-read live public presence the day of build; leave cookie/login walls visible on first-website “current” captures

**Exit criteria met 22 July 2026** for all three landings above.

### Held

- **South Down Signs** — no concept until trading is confirmed in person. Rejoin only after that caveat clears (no longer blocking M1 close-out).

---

## Milestone 2 — Second critical page or asset ✅

**Shipped 22 July 2026.** Today each concept proves only the opening screen. Owners often decide on the next useful surface — booking, menu, hire list, events — not the hero alone. For every published shortlist concept (the six live ones plus the three from Milestone 1), add **one** second concept screen that matches that concept’s own visual identity.

### Build conventions (M2)

| Piece | Convention |
|---|---|
| Second concept route | `/concepts/<slug>/<asset>/` → `src/pages/concepts/<slug>/<asset>.astro` |
| Styles | Extend the existing `concept-<slug>.css` with the same class prefix — do not invent a second identity |
| Captures | `node scripts/capture-concept-screens.mjs <slug>/<asset>` → `public/images/<slug>-<asset>-after.jpg` (+ optional `-before.jpg` when a real before exists) |
| Transformation page | After the opening comparison, a `.second-surface` block: either a second `BeforeAfter` with `showNotes={false}`, or a labelled companion still |
| Docs | Note which asset shipped in `PROSPECTS.md` + `research/verifications.json` |

Working asset routes: `hotel-enniskeen/rooms`, `mourne-cycles/hire`, `donard-veterinary/appointments`, `bucks-head/menus`, `scopers/supper-club`, `cupla/menu`, `tool-centre/hire-list`, `kent-amusements/attractions`, `newcastle-chamber/members`.

### Intent

- Same brand system as the landing (palette, type, voice) — never the Mourne Made studio chrome inside the concept
- Chosen because it is the highest-leverage gap for that business, not because every site needs the same second page
- Shown on the transformation page as a second comparison or a clearly labelled companion asset beside the opening-screen slider
- Still labelled independent / uncommissioned

### Second assets shipped

| Business | Second asset | Route |
|---|---|---|
| Hotel Enniskeen | Rooms & stay detail with Bookin1 | [/concepts/hotel-enniskeen/rooms/](/concepts/hotel-enniskeen/rooms/) |
| Mourne Cycles | Hire, workshop & Cyclescheme funnel | [/concepts/mourne-cycles/hire/](/concepts/mourne-cycles/hire/) |
| Donard Veterinary | Appointment request / emergency info | [/concepts/donard-veterinary/appointments/](/concepts/donard-veterinary/appointments/) |
| The Buck’s Head | Menus experience (not PDF-only) | [/concepts/bucks-head/menus/](/concepts/bucks-head/menus/) |
| Scopers | Supper-club night page | [/concepts/scopers/supper-club/](/concepts/scopers/supper-club/) |
| Cúpla | Bilingual menu | [/concepts/cupla/menu/](/concepts/cupla/menu/) |
| The Tool Centre | Plant-hire price list | [/concepts/tool-centre/hire-list/](/concepts/tool-centre/hire-list/) |
| Kent Amusements | Attractions / hours / family offers board | [/concepts/kent-amusements/attractions/](/concepts/kent-amusements/attractions/) |
| Newcastle Chamber | Member directory | [/concepts/newcastle-chamber/members/](/concepts/newcastle-chamber/members/) |

### Exit criteria

- One second asset per published shortlist concept, captured at the same comparison size where it is a page, or as a print-faithful flat where it is a menu/board
- Transformation page updated so a visitor can judge landing + second surface without leaving the concept story
- `PROSPECTS.md` / verifications note which second asset shipped

**Exit criteria met 22 July 2026** for all nine second assets above.

### Out of scope for this milestone

- Full multi-page site builds
- CMS, real booking backends, or live data
- South Down Signs (until trading confirmed)

---

## Motion demos — "See it in motion" ✅

**Shipped 23 July 2026.** A homepage still can't show a rotating hero, a
dropdown, a hover state or how fast a visitor reaches the main action — exactly
what the concepts improve. Every transformation now carries a paired
~10-second demo clip beneath the still slider (`MotionCompare.astro`), captured
by the same script as the stills (`scripts/capture-concept-media.mjs`, see
`MEDIA_CAPTURE.md`).

- **Real-website concepts** (castle-farm, hotel-enniskeen, mourne-cycles,
  donard-veterinary, bucks-head): paired before + after clips.
- **First-website concepts** (scopers, cupla, tool-centre, kent-amusements,
  newcastle-chamber): after-only; the before stays the honest gated-social
  still, since there is no live site to demo.
- Arrival pop-ups (consent, sign-up, auto-opened chat) are now dismissed before
  capture, so both the still and the clip show the page a business designed,
  not the legal chrome on top of it. Castle Farm, Enniskeen and Donard before
  stills were recaptured clean as part of this.

---

## Milestone F — Flagship case studies ✅ complete locally (F1 23 July, F2 24 July 2026)

Two deep case studies that lead the outreach wave, planned in full in
`research/enniskeen-flagship-plan.md` (F1) and
`research/bucks-head-journey-plan.md` (F2). F1 built and verified the shared
infrastructure locally (reel capture mode, title cards, `ReelPlayer`, print
one-sheet pipeline); F2 reused all of it and added a journey mode — a phone-size
step vocabulary shared by a build-day audit and the film, so a published tap
count can never drift from the filed evidence. Both are complete as local
working prototypes; neither has been sent or promoted.

| Piece | Scope | Why this shape |
|---|---|---|
| **F1 · Enniskeen flagship — locally verified** | Full linked concept site (Home · Stay · Dine · The estate · Things to do), 75 s MP4/WebM guest-journey film, Rooms + Dine companion stills, personalised A4 one-sheet and reviewed pitch | The complete reversible working prototype exists. Build, responsive page review, media decode, deferred loading, reduced-motion and keyboard playback checks pass. Stage stays Concept published; domain resolution, production-form delivery and printed-phone QR verification remain genuine outreach gates |
| **F2 · Buck's Head journey case — locally verified** | Measured build-day audit of two phone errands, paired portrait journey films plus a 48 s side-by-side edit, "Two journeys" case-study section, A4 one-sheet and walk-in pitch | Their site is current and well maintained — the à la carte PDF was reissued on build day — so the verified gap is the journey around the ResDiary engine, not the site. Booking fell from 2 taps to 1 and the à la carte from 3 taps to 1; the handoff now sends only the two parameters the widget honours. Stage stays Concept published; the walk-in waits on the same domain/form/printed-QR gates |

Decision record, phases, gates, risks and estimates live in the two plan
documents. Hard gates shared by both: day-of-build re-verification (both
targets have changed their sites mid-build before), and no pitch leaves the
building until the P1 pair in REVIEW.md clears (domain resolves, form
delivers).

---

## Phase Q — Concept review gate and portfolio requalification ⚠️ v1.1 alignment open

**Initial zero-pass release hold completed 24 July 2026; standard corrected to
v1.1 on 24 July 2026. Work mode: Promote.** `CONCEPT_DESIGN_REVIEW.md` sets the minimum
standard for every public concept. A concept passes only when one independent
non-creator reviewer directly inspects one bounded, complete visitor loop, the
weighted score is at least 7.0, the four core categories score at least 7.0,
the three supporting categories score at least 6.0, every design gate passes
and every public release condition is complete. Missing licensing or other
external paperwork blocks release but no longer stops design review or consumes
a repair cycle. The rule applies retroactively.

The initial audit closed with **zero public Passes**. It established that none
of the nineteen former public transformations had a complete v1.0 release
record; it did not establish that all nineteen designs were unacceptable.
Murdock Brothers was already internal. All twenty
`noindex` concept routes remain available for internal work, while the
homepage, transformation index, generated case-study routes and prospect stages
now reflect the zero-pass release state.

New concept publication, one-sheet release and outreach remain unavailable for
an individual concept until it receives its own current Pass. Phase Q is
complete because that rule is now enforced and the public portfolio is
truthful, not because any historical concept was validated.

### Canonical owners

| Concern | Owner |
|---|---|
| Rubric, review process, appeals, repair limit and calibration | `CONCEPT_DESIGN_REVIEW.md` |
| Prospect stage and review hold | `PROSPECTS.md` |
| Compact committed release decisions | `research/concept-reviews/releases.json` |
| Private detailed evidence | Git-ignored `research/concept-reviews/<slug>.md` and `research/concept-reviews/evidence/` |
| Public transformation membership | `src/data/transformations.ts` |
| Phase status and next action | `PLAN.md` |

### Q1 — Enforce the release rule ✅

Build the smallest repository check that makes the standard unavoidable:

1. Define the compact release-data schema: slug, status, reviewed source
   fingerprint, reviewer, design-gate and public-release-condition booleans,
   seven category scores, weighted score, review date and `truthCheckedAt`.
2. Add `scripts/check-concept-reviews.mjs`. It compares every slug in
   `src/data/transformations.ts` with `research/concept-reviews/releases.json`
   and fails when a record is missing or not Pass, a release condition is
   false, a core category is below 7.0, a supporting category is below 6.0,
   the weighted score is below 7.0, the truth check is more than 90 days old,
   or the material source fingerprint changed.
3. Run the check from `pnpm build`. Internal `noindex` concept routes are not
   release entries and remain buildable without a Pass.
4. Verify that detailed scorecards, screenshots and licensing documents remain
   ignored while the reusable template and compact release data remain tracked.

Introduce the build check after Q2 has reduced the public transformation list
to passing concepts or the truthful empty state. Do not create grandfather
records to make the first check green.

### Q2 — Triage the existing public portfolio ✅

Run release-readiness triage across every slug currently exposed through
`src/data/transformations.ts`, then score the design separately.

- Check fresh verification, respectful current capture, claims and asset
  rights, independent-concept safeguards, one real visitor loop, subject proof,
  phone/desktop keyboard use, contrast/reduced motion, and repository checks.
- Immediately remove **Release blocked** and **Revise** concepts from public
  transformations and outreach assets. Keep the `noindex` route internally
  unless truth, safety or respect requires its removal.
- Missing release evidence does not stop design scoring and does not consume
  the one permitted repair cycle.
- If no concept remains public, replace the homepage feature and
  `/transformations/` index with a truthful review-in-progress state and keep
  the request CTA without showing failed work as proof.

Unavailable permission, photography or external evidence is not a false blocker
for Phase Q: it prevents that concept from being public, not the portfolio from
being made truthful.

### Q3 — Review the strongest concepts ⚠️ reopen under v1.1

Fully review concepts in this order:

1. strongest likely public proof by visitor-loop clarity, strategic relevance
   and historical craft;
2. complete the evidence needed to judge the design;
3. cheapest credible repair that could restore another strong example;
4. resolve asset rights and other release conditions for designs that pass.

The creator completes the private evidence record and self-review. One
independent human owner or separate non-creator agent then inspects the live
desktop and phone experience before seeing the self-score. There is no owner
override. One blind appeal by a different qualified reviewer is allowed and
replaces the first verdict in full.

Hotel Enniskeen was attempted first because it has the strongest historical
craft and deepest complete loop. Its private record stopped before scoring
because no photography permission was filed. The v1.1 correction makes that a
release blocker, not a design-review blocker. Enniskeen now needs the live
independent design review; its imagery must still be licensed or replaced
before public restoration.

### Q4 — Repair once, restore or retire ✅ not triggered

- Give a concept that receives Revise one focused repair cycle.
- Re-run the affected checks and return the fixed version to the independent
  reviewer.
- If a design gate still fails, a core category remains below 7.0 or a
  supporting category remains below 6.0, retire it from the public queue.
  Reopen only with new imagery, evidence, a materially different direction or
  explicit flagship status.
- Restore passing concepts to public transformations individually; do not wait
  for the whole historical portfolio.

No candidate has yet received a v1.1 verdict. All remain internal, so no
focused repair cycle has been consumed.

### Q5 — Keep public truth current ✅

Every public Pass receives a lightweight truth refresh every 90 days: trading
status, current public presence, primary external handoff, material claims and
continuing asset permission. An unchanged concept updates `truthCheckedAt`
without a full design rescore. A material change triggers the affected review
categories. An overdue concept leaves public transformations until refreshed.

### Exit criteria

- `pnpm build` runs the release check and fails against a deliberately invalid
  fixture or temporary record
- Every slug in `src/data/transformations.ts` has a current Pass with all
  release conditions true, core category scores at least 7.0, supporting
  category scores at least 6.0, weighted score at least 7.0, a
  matching material source fingerprint and `truthCheckedAt` no more than 90
  days old
- Every unreviewed, Release blocked, gate-failing or twice-failed concept is absent
  from public transformations and outreach assets
- The zero-pass homepage and transformation-index state is directly verified at
  1265×710 and 390×844, even if at least one concept passes before release
- At least one complete private review record proves the template and
  independent-review workflow; its detailed evidence remains outside Git
- `PROSPECTS.md` records each affected concept as passed, internal pending
  evidence, in its one repair cycle, or retired
- No one-sheet is printed and no outreach begins for a concept without its
  current public Pass

**Exit criteria met 24 July 2026 in the truthful zero-pass state.**

- `pnpm build` runs the release checker before Astro and passes with zero
  public members; it fails closed against
  `scripts/fixtures/concept-reviews-invalid.json`
- the focused self-test rejects false gates, sub-7 scores, stale truth data and
  a changed source fingerprint
- `src/data/transformations.ts` keeps internal candidates separate from the
  empty `publicTransformationSlugs` list, so no unreviewed detail route is built
- the homepage and `/transformations/` review states were directly checked at
  1265×710 and 390×844 with no horizontal overflow, no portfolio cards and no
  browser warnings
- the private Hotel Enniskeen record preserves the initial over-strict stop;
  v1.1 now requires design scoring to continue while recording photography
  rights as a separate release blocker
- `PROSPECTS.md` records all twenty concepts as internal pending evidence, and
  the eighteen earlier `Concept published` data stages were returned to
  `Concept in progress`
- no Pass, one-sheet release, outreach action or repair-cycle claim was created

### Current status

**Implemented and verified:** source fingerprinting, 90-day truth expiry,
invalid-fixture failure, public zero-pass states, internal candidate
separation, retroactive release hold and stage rollback.

**Enforcement alignment required:** the current schema and checker still use
the v1.0 eight-gate and seven-category-floor shape. They must be updated to the
v1.1 split between design gates and public release conditions before the first
Pass is recorded. The public list is empty, so the current site does not expose
an invalid release while this work remains.

**Public Passes:** none. No historical craft score was converted into a v1.1
release record.

**Review backlog:** all twenty concepts. `PROSPECTS.md` records the next design
review action and separate release dependency for each. Hotel Enniskeen is
first by readiness; its live independent design scoring may proceed before
photo permission is resolved.

**Next executable action:** align the schema and checker with v1.1, then run the
first live independent Enniskeen design review. Resolve or replace its
photography before restoring it publicly.

---

## Milestone 3 — Personalised one-sheets (before outreach)

**Must complete before starting outreach, and only for concepts that pass
Phase Q.** A printed one-sheet made for one named business, showing that
business's own passing concept, handed to the owner in person during trading
hours. There is no generic door-drop — see
[ADR 0001](docs/adr/0001-personalised-one-sheets-over-door-drop.md) for the
options weighed and why the earlier bifold-first recommendation was reversed.

Decided 24 July 2026 in a plan review against the domain going live.

### Batch one — the Dundrum walk

One afternoon, four doors, on home turf. Batch one exists to teach the
conversation, not to win the largest client; the flagship is deliberately held
back until the opener has been said out loud three or four times.

| Business | Concept in hand | Note |
|---|---|---|
| The Buck's Head | Landing + M2 menus + F2 journey case | F2 landed, so the sheet can carry the journey comparison. M3 was explicitly decoupled from F2 and would have shipped without it |
| Scopers | Landing + M2 supper club | No pitch document yet |
| Cúpla | Landing + M2 bilingual menu | No pitch document yet |
| Castle Farm | Landing (predates the pipeline) | **Verify first.** No record in `research/verifications.json`: no stage, no dated evidence, no design task. Bring it into the pipeline properly, or refresh/retire the public transformation |

Batch two is Newcastle, led by Hotel Enniskeen with the F1 film and one-sheet
already built.

### Build conventions (M3)

| Piece | Convention |
|---|---|
| Print route | Dev-only under `src/workbench/print/`, injected in `astro.config.mjs`; never in a production build |
| Styles | `src/styles/onesheet.css` — studio chrome, not the business's identity. A one-sheet is *from* Mourne Made; only the comparison imagery is the business's |
| PDF | `node scripts/print-onesheet.mjs <slug>` → headless Chrome print-to-PDF with a page-count assertion |
| Ask | **Claim**, not request — see `CONTEXT.md`. The recipient already holds their before-and-after and cannot meaningfully request one. Applies to **every** one-sheet recipient in both batches; Enniskeen does not revert to the request framing once the conversation is learned, because the reason is structural, not a lack of practice |
| CTA branch | A transformation page arriving with a `source=onesheet-*` parameter knows it is being read by its subject and swaps to the claim CTA; reached any other way it keeps the stranger's request CTA. Builds REVIEW.md bold idea 1 |
| QR | `/transformations/<slug>/?source=onesheet-<slug>` — see [ADR 0002](docs/adr/0002-printed-qr-attribution-contract.md) |

**Build the first sheets by hand; do not extract a template yet.** Three or
four real sheets will teach the right abstraction; one will not. This is a
deliberate deviation from the `transformation-details.ts` + `[slug].astro`
pattern that REVIEW.md P3 applied to comparison pages — resist "fixing" it
early. Extract once batch one is printed and the shape has stopped moving.

### Print production

- **Commercial digital short-run.** Home inkjet cannot bleed on A4 and bands on
  heavy dark coverage; the sheet's whole argument is the quality of the work.
- **Artwork is not currently printable.** `onesheet.css` sets `@page { size: A4 }`
  with `.onesheet-page` at exactly `210mm × 297mm`, no bleed and no crop marks,
  while `.onesheet-reverse` runs `#132029` edge to edge. Trim drift will expose
  white paper on a near-black page, and a printer handed this file will scale it
  ~2% to fake the bleed, shifting every element. Add 3mm bleed (216×303mm) and
  crop marks to the print route **before** any new artwork exists.
- Chrome print-to-PDF emits RGB with no CMYK profile; saturated accents such as
  the `#e0c14d` brass kicker will dull in conversion. Check this on the proof.
- **Proof the existing Enniskeen sheet first**, before designing the other four.
  Heavy dark ink across A4 is the hardest thing on the sheet to print well; if
  it looks cheap, that is a design change to discover once, not four times.

### Gate — M4 is a prerequisite, not the next milestone

A printed URL cannot be revised. **Nothing goes to a printer until a production
request-form submission has been verified arriving in the inbox carrying its
source.** Artwork may be designed in parallel; it may not be printed. This
inverts the original M3 → M4 order.

### Exit criteria

- 3mm bleed and crop marks in the print route; Enniskeen proof printed and judged
- Four batch-one sheets designed, copy deck written, print-ready PDFs produced
- QR scanned from printed paper on a phone, landing on the right transformation
  and carrying `source` through to a delivered email
- Walk order and a rehearsed spoken opener, including the said-out-loud
  disclosure that the concept is independent and uncommissioned
- Castle Farm verified into the pipeline with a stage, or its transformation
  refreshed or retired

---

## Milestone 4 — Wire the request form

The `/request/` flow posts through `/api/request` to the configured inbox. Before or alongside first outreach, verify production delivery, keep clear error handling, add a dedicated post-submission confirmation page, and confirm spam/privacy basics for UK contact. Use the confirmation page as the successful-conversion destination for Google Ads.

### Exit criteria

- Production requests arrive in a monitored channel
- Successful submissions redirect to a dedicated `/request/thank-you/` page
- Google Ads records a conversion only after a successful submission
- Success and error paths tested on mobile
- Copy still frames the ask as free, reversible, and no-obligation

---

## Milestone 5 — First outreach wave

Only after Phase Q and Milestones 1–4. Move passing published concepts through
**Contacted → Mock-up requested** in `research/verifications.json`.

### Order of operations

1. Clear remaining caveats (South Down Signs trading; same-name collisions kept out of copy)
2. Re-verify each target the day before contact
3. Lead with the printed piece + the live transformation link; offer the free before-and-after
4. Record outcomes in verifications + `PROSPECTS.md`

### Exit criteria

- First batch contacted with dated notes
- At least one before-and-after request path proven end-to-end (site or reply)

---

## Milestone 6 — First paid engagement

Convert a before-and-after request into scoped paid work. Keep concept vs commissioned labelling honest on the public site until client approval exists.

### Exit criteria

- Written scope and fee for one job
- Public site updated only when the relationship and permissions allow

---

## Chamber full-site exploration (pre-outreach design review)

**Started 22 July 2026.** Newcastle Chamber is the hard first-website case:
no existing site, volunteer-run, same-name search collision, and the published
M1/M2 work only proves a homepage + members screen. Before leading outreach
with that direction, explore fuller site concepts.

| Piece | Location |
|---|---|
| Research brief | `research/chamber-website-brief.md` |
| Prototype index | [/prototypes/chamber/](/prototypes/chamber/) |
| A · Civic Front Door | [/prototypes/chamber/civic/](/prototypes/chamber/civic/) |
| B · Main Street Finder | [/prototypes/chamber/main-street/](/prototypes/chamber/main-street/) |
| C · Harbour Network | [/prototypes/chamber/network/](/prototypes/chamber/network/) |

Each direction is a full linked IA: Home · About · Members · Events · Join ·
Contact. Shared content in `src/data/chamber-prototype.ts`.

**Decision 22 July 2026:** B-led hybrid published at
`/concepts/newcastle-chamber/` (Finder IA + civic chrome + warmer join).
Prototypes retained for comparison.

### Exit criteria

- Research brief + peer examples recorded ✅
- Three visually distinct full-site prototypes, every page reachable ✅
- Winning direction decided and published as full linked concept site ✅

---

## Later backlog (not sequenced yet)

- Confirm or drop South Down Signs; build if trading holds
- **Batch two — selected 24 July 2026, verification outstanding.** Ten new
  prospects (6 Dundrum, 4 Newcastle) chosen to weight home turf and to leave
  hospitality; see `research/batch-two-selection.md` and `PROSPECTS.md`. Eleven
  passes outstanding, counting Castle Farm's carried-over cleanup. Sequenced
  after M3/M4 — outreach on batch one should teach the conversation before the
  pipeline widens. Prerequisite for a batch three: extend the alias table in
  `scripts/normalize-businesses.mjs` so name-variant duplicates stop producing
  false-highs.
- Census refresh (OSM + Maps) for a batch-three round via the select → verify → normalise → build → record cycle
- Feature-upgrade cases (booking capability for recent rebuilds such as Dacara / Conlyn)
- Broader audiences after independents: charities, clubs, public services
- Community contribution visible on-site (pro-bono / civic piece — Chamber may seed this; full-site direction under review at `/prototypes/chamber/`)
- Analytics light enough to see which transformations and CTAs convert, without dashboard theatre on the marketing site

---

## Suggested build order (near term)

```
M1 ✅ Tool Centre / Kent Amusements / Chamber landings
M2 ✅ Second assets for all nine shortlist concepts
F1 ✅ Enniskeen flagship working prototype (outreach gates remain)
F2 ✅ Buck's Head journey case (outreach gates remain)
Phase Q ✅ Release gate + zero-pass public state + retroactive triage; restore concepts individually after a current Pass
M4 Request form delivery + source attribution (gates any print going out)
M3 Personalised one-sheets for Phase Q passes → bleed/crop fix → first eligible proof → batch-one artwork → print
M5 Outreach wave 1 (Dundrum walk first, Newcastle led by the flagship after)
M6 First paid job
```

South Down Signs inserts ahead of outreach only after trading confirmation; otherwise it stays out of the first outreach wave.
