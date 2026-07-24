# Concept portfolio design review — 24 July 2026

Critical design review of all 20 concept sites (batch 1 × 10, batch 2 × 10).
Method: twenty independent subagent reviews against DESIGN.md and the project
frontend rules, then batch-level synthesis, then a birds-eye portfolio read.

**Verdict.** The first-glance suspicion holds. Batch 2 mean craft is **4.1/10**
versus batch 1 **5.3/10**. Batch 2 often has sharper research theses and thinner
brand surfaces — signature widgets replaced place photography, and the shared
shell reads louder when the photo is gone.

| Metric | Value |
|---|---|
| Batch 1 mean craft | 5.3 / 10 |
| Batch 2 mean craft | 4.1 / 10 |
| Gap (B1 − B2) | 1.2 |
| Concepts that pass the brand-first / remove-nav test | ~2 / 20 |
| Batch 2 concepts with a strong photograph in the first fold | 0 / 10 |

Related: [`DESIGN.md`](DESIGN.md) (system), [`PROSPECTS.md`](PROSPECTS.md)
(pipeline), [`REVIEW.md`](REVIEW.md) (site/ops review — different artefact).

---

## Required standard for every new concept

**Decision (24 July 2026).** A concept is not complete and must not become a
transformation, outreach asset, one-sheet or portfolio example until it passes
the review in this document at **7.0/10 or higher**.

The threshold applies at the boundary between local concept work and external
use. Rough studies may score below 7 while the direction is still being tested;
calling them complete or letting them escape the internal concept route is what
the standard forbids. This preserves useful exploration without lowering the
quality bar.

The scored object is **one bounded, complete visitor loop**, not every page a
finished website might eventually contain. Every screen and state required by
that loop must be real. Any other visible navigation or action must work or be
unmistakably labelled as outside the prototype. Missing breadth is acceptable;
pretending that breadth exists is not.

The historical craft scores below are a baseline diagnosis, not passes under
this rubric. They were holistic judgements made before the rubric existed.
Nineteen concepts therefore have status **not yet reviewed under v1.1**.
Enniskeen completed the first independent workflow: its current design passed
at 7.68, while missing photography permission keeps it Release blocked.

### Acceptance rule

A concept passes design review only when all four statements are true:

1. Its weighted score is **at least 7.0/10**.
2. Evidence/truth/respect, visitor outcome, complete loop and
   responsive/accessibility are each **at least 7.0**. Subject identity,
   first-viewport composition and craft/finish are each **at least 6.0**.
3. Every design gate below passes.
4. The independent reviewer records a final **Pass** after checking the fixed
   version. “7 with promised fixes” is not a pass.

Scores use whole or half points. Do not round a 6.95 to 7.0. The review record
shows the calculation to two decimal places.

Public release is a separate decision. A design that passes review remains
**Release blocked** until its current trading evidence, asset rights,
independent-concept safeguards and repository checks are complete. Missing
licensing or other external paperwork must not prevent the design from being
experienced, scored or repaired. It prevents external publication of the
affected material.

### Design gates

These are pass/fail protections, not bonus points. One failure makes the
verdict **Revise**, regardless of the average.

| Gate | Pass evidence |
|---|---|
| Current and respectful | Verification is no more than one month old; the captured current presence is representative; criticism describes the public experience without mocking the business. |
| Claims are honest | Every material fact, quotation, price, service and placeholder is sourced or visibly labelled. The concept implies no approval, relationship or result that does not exist. |
| Real visitor loop | The primary visitor job can be completed, or reaches an explicitly labelled prototype handoff. No fake search, inert filter, decorative submit, invented live status or unavailable price is presented as working. |
| Subject proof | The first viewport contains convincing visual proof of this subject. Image-led businesses use real subject/product/place imagery for internal evaluation. Generic stock or generated imagery never impersonates the real premises, staff, products, food, rooms or completed work. A non-image-led concept may use an equally specific real artefact; CSS costume is not proof. |
| Responsive and keyboard usable | At 390×844 and 1265×710 there is no unintended horizontal overflow, hidden essential content or broken hierarchy. Navigation, controls, disclosure and the primary action work by keyboard with visible focus. |
| Readable and motion-safe | Body text and controls meet 4.5:1 contrast; large text meets 3:1; meaningful images have useful alternatives; reduced motion removes nonessential movement. |

### Public release conditions

All conditions below must be complete before a concept becomes a
transformation, outreach asset, one-sheet or public portfolio example:

- reused protected assets have documented permission or a licence covering
  the public use, or have been replaced with assets Mourne Made may publish;
- the truth check is no more than 90 days old and no material claim has
  changed;
- `noindex`, the independent-concept disclosure and claim action are present
  on internal concept routes; the public case study accurately identifies the
  work as an independent proposal;
- `pnpm build`, `pnpm test:concepts` and relevant journey checks pass on the
  reviewed source fingerprint.

For internal review, use an owned substitute, a blurred or redacted capture,
or a plainly labelled image placeholder when final asset rights are not yet
available. Do not publish an unlicensed source image merely to demonstrate the
design.

### Scoring rubric

The score is a weighted judgement of the experience, not a count of CSS
features. Each category needs a short evidence note and at least one named
weakness; a row with praise but no observed limitation is incomplete.

| Category | Weight | What the reviewer judges | Required evidence |
|---|---:|---|---|
| Evidence, truthfulness and respect | 15% | The concept follows fresh research, preserves useful existing plumbing, distinguishes facts from proposals and treats the current business fairly. | Verification record, sources/limitations, asset sources, current-site capture and tested external parameters. Public release rights are checked separately. |
| Visitor outcome and concept thesis | 15% | One concrete visitor problem is materially easier; the opening speaks to the visitor before explaining the owner's website problem; the proposed change is specific enough to judge. | One-sentence visitor job, before/after route or task comparison and primary CTA outcome. |
| Subject identity and distinctiveness | 15% | The business name owns the identity; colour, type, imagery and language come from the subject rather than its category; removing the nav still leaves the business recognisable; the result does not repeat another concept or a saturated AI aesthetic lane. | Remove-nav test, identity source notes and side-by-side comparison with the two closest portfolio concepts. |
| First viewport and visual composition | 15% | The first screen is one legible composition with a dominant visual plane, clear brand, short proposition and one primary action. Real imagery or an earned subject artefact carries the proof; chrome, cards and widgets do not consume the scene. | Desktop and mobile first-viewport captures, plus a sentence naming what the eye meets first, second and third. |
| Complete loop and functional integrity | 15% | The bounded visitor loop includes the primary action, important failure or empty state, recovery and honest handoff. Interactions change state or do useful work; external integrations accept the parameters collected. | Walkthrough steps, interaction test, failure/recovery capture and destination URL/parameter check. |
| Responsive use and accessibility | 15% | Hierarchy, content order and controls survive phone and desktop; text is readable; keyboard and focus behaviour work; semantics, labels, alternatives and reduced motion support access. | 390×844 and 1265×710 checks, keyboard run, contrast results, reduced-motion check and any known limitation. |
| Craft and finish | 10% | Typography, spacing, image treatment, copy, states and motion feel deliberate at both sizes. No generic rise animation, reflex card grid, over-rounding, cramped display type, decorative UI theatre or visible browser-console defect remains. | Captures at both sizes, console check and a named polish pass against `DESIGN.md` and the project frontend rules. |

Weighted score:

```text
final = (evidence × .15)
      + (outcome × .15)
      + (identity × .15)
      + (composition × .15)
      + (loop × .15)
      + (responsive × .15)
      + (craft × .10)
```

### Score anchors

Use the same anchor meanings in every category. A reviewer may use the
half-point between two anchors when the evidence genuinely sits between them.

| Score | Meaning |
|---:|---|
| 0–2 | Missing, broken, deceptive or unsafe. The direction cannot be judged honestly. |
| 3–4 | A recognisable idea with major gaps. It reads as a sketch, costume or untested claim. |
| 5 | Plausible and partly competent, but generic, incomplete or visibly compromised. |
| 6 | Close to publishable. The intended outcome works, but a meaningful weakness is still obvious. |
| 7 | Publishable Mourne Made standard: specific, truthful, usable and deliberately composed, with only minor limitations. |
| 8 | Strong portfolio work. The subject feels present, the loop is convincing and the design repays closer inspection. |
| 9 | Exceptional. The concept could not be swapped to another business, and research, interaction and art direction reinforce one another. |
| 10 | Reference quality. No material weakness remains and the work establishes a reusable lesson for later concepts. Use rarely. |

Distinctive does not mean busy, and polished does not mean distinctive.
Research insight does not compensate for a weak visual surface; visual craft
does not compensate for a fake control or unsupported claim.

## Review process after each concept is created

The review happens while the prospect remains **Concept in progress**, after a
complete local loop exists and before transformation media, publication or
outreach.

### 1. Freeze the review candidate

The creator records the slug and commit, links the fresh verification entry,
states the visitor job in one sentence and lists all deliberate placeholders,
stubs and external handoffs. They also name the first and last screen/state of
the bounded loop and every exposed route outside it. If the visitor job, review
boundary or truth boundary cannot be stated plainly, the concept is not ready
to review.

### 2. Assemble the evidence bundle

The creator supplies:

- the local concept URL and any companion route needed for the primary loop;
- the declared start, successful end, important failure and recovery state of
  the bounded loop;
- a list of every other exposed route or action and how it works or is labelled
  as outside the prototype;
- the representative current-site capture;
- the after capture at 1265×710 and the first screen at 390×844;
- a short screen recording or numbered walkthrough of the primary loop,
  including its most important failure and recovery path;
- source, image-credit and limitations notes;
- the known source and current rights status of every reused image or other
  protected asset; missing public-use permission is recorded as a release
  blocker, not a reason to stop design review;
- keyboard, contrast and reduced-motion results;
- `pnpm build`, `pnpm test:concepts` and relevant journey-test output;
- the two existing concepts most likely to expose portfolio repetition.

The review may start when the reviewer can experience the bounded loop and
judge every scored category. Missing evidence needed to judge the design must
be collected or reproduced during review. Missing evidence needed only for
public release is recorded separately and does not receive a guessed score or
stop design review.

### 3. Creator self-review

The creator completes the design gates and scores every category before
requesting review. The self-score is diagnostic only and cannot approve the
concept. It exists to catch cheap defects before another reviewer spends time
on them.

### 4. Independent review

An independent reviewer experiences the page in the browser before reading the
creator's category scores. They:

1. run the first-glance test at desktop and phone size;
2. complete the visitor loop with keyboard as well as pointer input;
3. trigger the important failure or empty state and recover;
4. inspect the before/after capture and the live external handoff;
5. run the remove-nav, swap-the-business and closest-neighbour tests;
6. check every design gate and public release condition;
7. score each category with evidence, its strongest quality and its clearest
   weakness.

One independent reviewer makes the release decision. A human owner or a
separate agent that did not create or repair the concept qualifies. A new chat
or context for the same creator does not. The reviewer must inspect the live
experience, score from the canonical documents and evidence bundle before
seeing the creator's self-score, and identify a concrete reason for every score
below or above 7. A prose-only review does not count. A second opinion is
optional when the reviewer cannot resolve a factual or domain question, but it
is not part of the release gate. This is deliberately a lean operation;
calibration every five reviews is the check against one-reviewer drift.

The owner cannot override a failed review. A factual error goes back to the
original reviewer for correction. A disputed judgement may receive one fresh
appeal review from a different qualified non-creator. The appeal reviewer does
not see either earlier score before deciding, reviews the complete candidate,
and replaces the original verdict in full whether the result is higher or
lower. The owner cannot choose between verdicts. A failed appeal leaves repair
or retirement as the only options.

### 5. Decide and repair

There are four review and release states:

- **Reviewable** — the bounded loop can be experienced and scored; review or
  evidence collection is in progress.
- **Release blocked** — the design has passed, but a public release condition
  such as asset permission, current truth evidence or repository verification
  is incomplete.
- **Revise** — a design gate failed, a core category is below 7.0, a supporting
  category is below 6.0, or the weighted score is below 7.0.
- **Pass** — design review and every public release condition pass on the
  version checked.

Fix the highest-consequence failure first: truth and visitor loop, then subject
proof and composition, then responsive/accessibility, then polish. A score
below 5 in Outcome, Identity or Composition usually calls for revisiting the
direction, not decorating the same page. Re-run the affected checks and have
the independent reviewer inspect the fixed version. The review record keeps
the earlier verdict so improvement is visible.

Allow one focused repair cycle after the first Revise verdict. If a core
category still scores below 7, a supporting category remains below 6 or a
design gate still fails on re-review, retire the concept from the public queue
and keep it internal. A release blocker does not consume this repair cycle.
Resume a retired design only when new evidence, imagery or a materially
different direction changes the review, or when the owner explicitly
designates it as a flagship worth further investment. Repeated spacing and
typography adjustments are not a reason to extend a weak direction
indefinitely.

### 6. Record and release

Create the private `research/concept-reviews/<slug>.md` from
`research/concept-reviews/_template.md`. Keep its detailed critique,
screenshots, licensing documents and working evidence out of Git. The private
record owns the evidence and decision for that concept; this document owns the
rubric and portfolio calibration. Commit only the compact release entry in
`research/concept-reviews/releases.json`: slug, status, reviewed source
fingerprint, reviewer identity, gate booleans, category scores, weighted score
review date and `truthCheckedAt`. On Pass:

1. record the final commit, category scores, calculation, gates and reviewer;
2. change the prospect stage and re-run the normaliser;
3. create or update the transformation, matched media and source disclosure;
4. update the portfolio table in this document and the pipeline in
   `PROSPECTS.md`;
5. only then use the concept for outreach, a one-sheet or a public claim.

The release rule is enforced by the repository, not memory. A build check
compares every slug published through `src/data/transformations.ts` with its
committed entry in `research/concept-reviews/releases.json` and fails when:

- the record is missing or not Pass;
- any public release condition is not true;
- a core category is below 7.0, a supporting category is below 6.0 or the
  weighted score is below 7.0;
- `truthCheckedAt` is more than 90 days old; or
- the reviewed source fingerprint no longer matches the material concept
  files.

Internal `noindex` concept routes do not require a Pass. A material change
invalidates public release until the affected checks are repeated and the
private record and committed release entry are refreshed. Introduce the checker
during the retroactive audit, after the public transformation list has been
reduced to passing concepts or the truthful empty state, so the repository can
still build while the standard is first established.

Do not commit harsh named-business scorecards or licensing documents merely to
make the gate auditable. Public transformation pages carry only respectful,
publishable limitations.

### Calibration and change control

- Every five completed reviews, compare the newest scores with one clear pass,
  one near miss and the strongest portfolio example. Record drift here.
- Re-review when fresh evidence changes the business, a material interaction or
  first viewport changes, or the concept is promoted into a deeper prototype.
  Copy-only corrections and invisible refactors need the relevant checks, not
  an automatic full rescore.
- A public Pass requires a lightweight truth refresh every 90 days. Recheck
  trading status, current public presence, the primary external handoff,
  material claims and continuing asset permission. When nothing material
  changed, update `truthCheckedAt` without rescoring the design. A material
  change invalidates the Pass and triggers the affected review categories. An
  overdue truth check removes the concept from `/transformations/` until
  refreshed.
- Change rubric weights or floors only in this document, with a dated reason.
  Never edit the rule to make a candidate pass.
- Do not compare the historical holistic scores below directly with v1.1
  scores. A new score replaces the historical one for acceptance purposes but
  the baseline remains as history.

### Existing portfolio transition

**Owner decision (24 July 2026): the release gate is retroactive.** Pause new
concept publication and outreach while the existing public portfolio is
reviewed under v1.1. Review does not presume that a historical score is still
correct, but no existing concept is grandfathered.

Review the public concepts in current portfolio order. When a concept passes,
keep or restore it on `/transformations/`. When it receives Revise, remove it
from the public transformation index and any outreach assets until the fixed
version passes. Keep its `noindex` concept route and review evidence internally
unless truth, safety or respect requires the route itself to come down. This
avoids destroying useful work while ensuring the public proof meets the stated
minimum.

Before public release, check release readiness across the whole portfolio.
Remove a concept from `/transformations/` when a release condition is
incomplete or a design gate clearly fails. Record **Release blocked** for a
design that passes but cannot yet be published. Continue scoring when missing
evidence concerns only public release. The repair cycle begins only when the
independent reviewer returns Revise. Review concepts in this order:

1. strongest likely public proof, judged by visitor-loop clarity, strategic
   relevance and historical craft;
2. complete design evidence;
3. cheapest credible repairs that could restore another strong example;
4. resolve public asset rights and other release conditions for designs that
   pass.

Do not withhold design review merely because asset permission is pending. Keep
release-blocked work internal and record the exact publication dependency.

Never waive the standard to keep the portfolio populated. If no concept
currently passes, replace the homepage's featured transformation and the
`/transformations/` index with a truthful temporary state explaining that the
portfolio is being reviewed against a new publication standard. Keep the
request action available without implying approved results or showing failed
concepts as proof. Restore concepts individually as they pass.

### Phase Q transition result — 24 July 2026

The retroactive triage is complete with **zero public Passes**. All nineteen
former public transformations were removed from public membership and their
recorded stages returned to Concept in progress; Murdock Brothers was already
internal. All twenty concept routes remain `noindex` and available for internal
evidence or repair work.

Every candidate is **internal pending review or release evidence**.
`PROSPECTS.md` owns the next review action and any separate publication
dependency for each concept. Enniskeen proved the corrected workflow. Its
first independent verdict was Revise at 7.10; one focused repair corrected the
missing-date recovery, phone overflow, contrast, focus and generic entrance
motion. The same reviewer then passed every design gate at 7.68. The compact
record is **Release blocked** because no photography permission or publishable
replacement is filed. Nineteen concepts remain unreviewed and none has
consumed a repair cycle.

The repository now enforces the state:

- `publicTransformationSlugs` in `src/data/transformations.ts` is the only
  public membership list; internal candidate metadata remains separate;
- `research/concept-reviews/releases.schema.json` defines the compact v1.1
  record and `releases.json` contains no grandfather records;
- `scripts/check-concept-reviews.mjs` checks the four review/release states,
  six design gates, four public release conditions, the distinct core and
  supporting category floors, weighted score, 90-day truth expiry and a SHA-256
  fingerprint of the material concept sources, referenced media and
  slug-specific transformation copy;
- `pnpm build` runs the release check first and fails closed against the
  deliberately invalid fixture;
- the homepage and `/transformations/` show the verified zero-pass state until
  a concept earns a current Pass.

The historical review identifies the first portfolio-wide work: subject
imagery, brand-first composition, honest interactions and removal of repeated
aesthetic lanes.

## Decision ledger

| Question | Decision or assumption | Evidence | Consequence | Owner |
|---|---|---|---|---|
| What does “minimum 7” control? | Completion and external use, not disposable exploration. | Project guidance separates Explore, Build and Promote. | Local studies may be rough; transformations and outreach may not. | `CONCEPT_DESIGN_REVIEW.md` |
| Is a 7 average sufficient? | No. Gates and category floors also apply. | Current portfolio contains strong research paired with inert controls, missing imagery and weak mobile compositions. | Visual flair cannot hide truth, access or function failures. | `CONCEPT_DESIGN_REVIEW.md` |
| Can strong categories compensate for weak ones? | Only within limits. Truth, outcome, loop and accessibility must each reach 7.0; identity, composition and craft must each reach 6.0; the weighted result must reach 7.0. | A single supporting weakness should not erase an otherwise publishable concept, while strong styling must not hide a weak outcome, false claim or broken experience. | Review protects the consequential parts without demanding uniform strength in every category. | `CONCEPT_DESIGN_REVIEW.md` |
| How much of a site must pass? | One bounded, complete visitor loop. Every exposed route or action outside it must work or be unmistakably labelled as outside the prototype. | Project guidance prefers one complete loop to many shallow screens; the portfolio mixes single pages and full sites. | Review rewards experiential depth without forcing every concept to become a full website. | `CONCEPT_DESIGN_REVIEW.md` + per-concept review |
| How long may a failed concept remain in repair? | One focused repair cycle. A second failure retires it unless new evidence, imagery, a materially different direction or explicit flagship status justifies reopening it. | An unlimited fix loop conflicts with the lean operating model and encourages polishing a weak thesis. | Revise has a bounded cost and an honest terminal state. | `CONCEPT_DESIGN_REVIEW.md` + per-concept review |
| What imagery can count as subject proof? | Real subject imagery, or a specific real artefact for a genuinely non-image-led brief. Generic stock and generated imagery cannot impersonate the business. Public use also requires documented rights or a publishable replacement. | The portfolio review identifies absent subject imagery as the main craft regression, while `PRODUCT.md` requires concepts, facts and client results to remain separate. | Rights can block release without preventing internal design evaluation. | `CONCEPT_DESIGN_REVIEW.md` + per-concept review |
| How does the retroactive audit start? | Review the strongest concepts by public value and likelihood of passing, then resolve release dependencies separately. | Missing paperwork says nothing about design quality, while a broken loop or dishonest claim does. | The review produces useful design evidence without weakening publication safeguards. | This document + `PROSPECTS.md` |
| What if no concept passes yet? | Show a truthful temporary review state on the homepage and `/transformations/`; keep the request action but show no failed concept as proof. | Transformations are the product's primary proof, but retaining a failed example would contradict the release gate. | Public honesty outranks portfolio volume; concepts return individually after Pass. | `CONCEPT_DESIGN_REVIEW.md` + public routes |
| How long does a Pass remain current? | The design score persists, but public release requires a lightweight truth refresh every 90 days. | Businesses, websites and external handoffs can change quickly; a dated initial review does not protect an indefinite public claim. | Unchanged concepts update one date; material changes trigger affected categories; overdue concepts leave public transformations. | Release data + verification evidence |
| Is the release gate documentary or enforced? | Enforced. The build checks every public transformation against committed machine-readable Pass data and the reviewed source fingerprint. | A documented process can be skipped accidentally, especially in a lean operation. | Public concepts cannot build without current evidence of every gate and category floor. | `research/concept-reviews/releases.json` + build check |
| Who can approve? | One human owner or separate non-creator agent after direct inspection; a fresh context for the creator does not count. | The operation must stay lean, while creator-only or prose-only approval would provide fictional independence. | One non-creator owns the decision; evidence requirements and five-review calibration control drift. | Per-concept review record |
| Can the owner override a failure? | No. One blind appeal by a different qualified non-creator is allowed; its complete verdict replaces the first. | Direct override makes the threshold ceremonial, while a single reviewer can still make a factual or calibration error. | There is a bounded correction path without score shopping. | Per-concept review record |
| Does the rule apply retrospectively? | Yes. Pause new publication and outreach; review the existing public portfolio; remove failed or release-blocked concepts from `/transformations/` until cleared. | The transformations are the product's main proof, while all twenty concepts are unreviewed under v1.1. | No false grandfathering; public proof and the stated quality floor agree. | This document + `PROSPECTS.md` |
| Where do records live? | Detailed evidence stays private and Git-ignored under `research/concept-reviews/`; a compact release entry is committed in `releases.json`. | Named-business criticism and licensing evidence should not become public merely to enforce the build. | The gate remains auditable without exposing private working material. | This document + release data |

---

## Craft scores by concept

Scores are independent subagent craft judgements (/10). Photo = first-viewport
visual proof of the subject (not stock abstraction or CSS costume).

| Concept | Batch | Craft | Photo | One-line |
|---|---|---:|---|---|
| Hotel Enniskeen | 1 | 7.0 | strong | Flagship system; brand-first fail; valley drift |
| Mourne Cycles | 1 | 6.5 | strong | Credible dealer; hero dashboard overlays |
| Buck's Head | 1 | 6.0 | strong | Honest ResDiary journey; hospitality chrome |
| Newcastle Chamber | 1 | 6.0 | none | Finder thesis right; imageless mist hero |
| Kent Amusements | 1 | 5.5 | svg | Useful FB escape; pier SVG costume |
| Donard Veterinary | 1 | 5.0 | none | Appointments IA wins; home is dashboard |
| Cúpla | 1 | 5.0 | none | Twinning system real; cream card home |
| Tonn Ruray | 2 | 5.0 | none | Syne type; timeline = schedule wallpaper |
| Murdock Brothers | 2 | 4.5 | none | Gauge novelty; blank £— guts climax |
| Betty's Better Butters | 2 | 4.5 | css | Shelf insight; CSS discs below fold |
| Hugh McCann's | 2 | 4.3 | none | Enquiry sharp; plaster/gold graft fails |
| Groves Chemist | 2 | 4.3 | none | Rx insight real; label mostly costume |
| Tool Centre | 1 | 4.2 | none | Honest yellow/black; empty rates desk |
| Castle Farm | 1 | 4.0 | strong | Produce photo; cream/Georgia slop |
| Scopers | 1 | 4.0 | none | Zero food photo; supper-club list best |
| Kelly, McEvoy & Brown | 2 | 4.0 | none | Register idea; blueprint costume |
| Douglas & Cromie | 2 | 4.0 | hatch | Plate type strong; PHOTO tiles hollow |
| Dundrum Inn | 2 | 4.0 | none | Tonight thesis; playbill dashboard |
| Donard Hotel | 2 | 3.6 | none | Commission brief; OTA below capture fold |
| Newcastle Family Dental Care | 2 | 3.0 | none | HTTPS insight; padlock chrome theatre |

---

## Core design principles

Drawn from `DESIGN.md`, `ConceptLayout` / `concept-shell` practice, and the
frontend rules the reviewers scored against.

### Identity

1. Subject owns the identity — never Mourne Made Antonio / bay / gorse inside a concept.
2. Brand-first: the name survives the remove-the-nav test at hero scale.
3. Unique typeface per concept (batch 2: no face reused from batch 1).
4. Place-true colour from the building, badge, or frontage — not category defaults.
5. Concepts stay uncommissioned: disclosure banner, `noindex`, claim path.

### Composition

6. First viewport = one composition (brand, one line, one sentence, CTAs, one visual).
7. Full-bleed / dominant visual plane preferred; no hero overlays or promo chips.
8. Cards only when they contain real interaction.
9. One job per section; real photography of product/place, not abstract wash.
10. Honest engines (ResDiary, Bookin1, GuestDiary) — params the business already honours.

### How well are they implemented?

| Principle | Batch 1 | Batch 2 | Portfolio note |
|---|---|---|---|
| Subject identity | Strong when frontage/badge used | Tokens vary; often category costume | Best: Buck's, Enniskeen, Tool Centre colours |
| Brand-first | Near-universal fail | Near-universal fail | H1 slogan owns fold almost everywhere |
| Hero budget | Mixed — flagships overstuffed | Systemic fail — widget dashboards | Journey cases partly earn density |
| Real imagery | Enniskeen / Buck's / Cycles / Farm strong; half the batch empty | Nearly absent | Biggest portfolio regression |
| Signature / journey | Secondary pages + measured journeys | First-fold widgets, often static/costume | Insight quality ≠ shipped interaction |
| Anti-slop | Hospitality cream/Lora recurs | Cream/serif/gold + clinical SaaS lanes | Type uniqueness policy ≠ visual uniqueness |
| Honest engines | Best craft in set (Bookin1, ResDiary) | Weaker — inert submits / fake filters | Batch 1 conversion honesty leads |

---

## Shared building blocks

Repeating chassis that makes a screen read as a “Mourne Made concept” even when
the subject identity changes:

| Block | Role |
|---|---|
| `ConceptLayout` | Head, `noindex`, fonts map, claim banner, inert `#` links |
| `concept-shell.css` | Strip flex + header/nav underline geometry; identity supplies tokens |
| Hours / place strip | Address · phone · status — nearly every concept |
| Brand + nav + pill CTA header | Wordmark left, links centre, conversion right |
| Split first viewport | Story column + right panel (photo **or** widget) |
| Tracked kicker + giant H1 | Brand-second pattern — slogan owns the fold |
| Secondary surface (batch 1) | Menus / hire / appointments / attractions companions |
| Independent-concept disclosure | Fixed studio banner — MM brand outside the concept |

**What actually establishes the studio brand.** Not the concept palettes (those
must not look like MM). The brand signal is the method: source-backed problem →
subject-owned skin → honest first action → fixed independent-concept disclosure →
case-study / claim path. When photography and brand-scale marks drop out, the
shared strip/header/split-widget chassis becomes the dominant “MM look” — and
that is when the portfolio feels samey.

---

## Unique components (business essence)

Where deep understanding shows: a control, IA, or motif that could not swap to
another business without breaking.

### High substance (earned)

- Enniskeen Bookin1 seam (real deep link)
- Buck’s Head date+party ResDiary + phone menus
- Chamber directory IA (idea; search still theatre)
- Cúpla twin-ring + bilingual menu
- Hugh McCann’s date+guests+season enquiry
- Groves repeat-Rx restore (insight > skin)
- Donard Hotel commission problem (owner frame)
- Dental insecure-redirect problem (owner frame)

### Thin / decorative (costume risk)

- Murdock E/F dial + blank £—
- Groves perforation as form skin
- KMB blueprint grid + inert filters
- Dental fake URL bar
- Betty’s CSS butter discs below fold
- Douglas PHOTO hatch tiles
- Tonn / Dundrum static “status” boards
- Kent pier SVG booth

### Unique artifact per concept

| Concept | Unique artifact |
|---|---|
| Enniskeen | Bookin1 Arrive+Nights seam; five-page estate shell; pine bathroom mats |
| Buck's Head | Date+party ResDiary; phone-first stack; HTML menus + segmented tabs |
| Chamber | Main Street finder IA; seal; members/events/join multi-pager |
| Mourne Cycles | Range rail + Cyclescheme; hire three-panel funnel |
| Donard Vet | Emergency strip; appointments form/emergency split |
| Scopers | Eleven-course supper-club list; kelp signature rail |
| Cúpla | Twin-ring mark; Irish-first bilingual menu card |
| Tool Centre | Hire-list indicative rates board |
| Kent | Seasonal hours slot; attractions naming (FB escape) |
| Castle Farm | Produce-crate commerce split (thin beyond photo) |
| Dundrum Inn | Tonight board + 43→2 language jab + GuestDiary |
| Murdock | Litre range / fuel-gauge order (novelty-heavy) |
| Groves | Repeat-Rx form with perforated label skin |
| Tonn Ruray | Café/apartments split; through-the-day timeline |
| KMB | Drawing-register portfolio (filters unwired) |
| Betty's | Butter-round shelf (CSS; below fold) |
| Douglas & Cromie | Owned forecourt board + UK plate mark |
| Donard Hotel | Direct-vs-OTA commission panel |
| Dental | Padlocked URL bar as security argument |
| Hugh McCann's | Date + guests + season wedding enquiry |

---

## Batch 1 as a unit

Hospitality-heavy wave (≈8/10 consumer/hospitality). Strength is depth where
investment landed: Enniskeen five-pager, Buck’s journey case, Chamber multi-site,
Cycles hire companion. Weakness already present: brand-second H1s, cream
hospitality monoculture (Scopers, Castle Farm, Cúpla), and a silent “no
photography” habit on Facebook-escape concepts (Scopers, Tool Centre, Kent SVG,
Vet, Chamber).

- Mean **5.3** · Best craft Enniskeen **7.0** · Floor Castle Farm / Scopers **4.0**
- Strong photo in fold: **4/10**

**Pattern.** When a real photograph carries half the fold, the shell recedes and
the business appears. When it doesn’t, batch 1 already looks like typed
dashboards with floating cards — the same failure mode batch 2 later
industrialises.

---

## Batch 2 as a unit

Explicit brief: leave hospitality, give each prospect a signature interaction,
never reuse a display face. Research quality is often higher (dead-site
reclassifications, commission maths, insecure redirect, wedding-call facts).
Craft delivery inverted the priority: the signature widget became the hero,
place was deleted, and interactions shipped as static costume (hardcoded tonight
cells, inert filters, hatch PHOTO, CSS butter, padlock chrome).

- Mean **4.1** · Ceiling Tonn Ruray **5.0** · Floor Dental **3.0**
- Strong photo in fold: **0/10**

**Pattern.** Strategy > surface. The portfolio argues cleverly in the banner
notes and case studies, then opens on cream/graphite/mint type specimens.
Owner-frame arguments (OTA commission, HTTPS, “your forecourt”) dominate
guest-frame openings (place, food, room, yard).

---

## Birds-eye portfolio

### What the studio is good at

- Source-backed problem selection
- Honest booking-engine handoffs
- Subject token systems on paper
- Companion surfaces when invested
- Clear independent-concept ethics

### What regresses across the set

- Brand-scale identity in the hero
- Photography as the product proof
- Hero budget discipline
- Motion with character (generic rise)
- Wiring signature controls for real

### Hardest challenges

- Conversion on screen one without eating the only photo
- Signature interaction ≠ costume metaphor
- Owner pitch vs guest first screen
- Trade/health without SaaS template gravity
- No-photo concepts in a before/after product

### Structural diagnosis

Batch 1’s best work is place-led compositions with an honest action stitched on.
Batch 2’s brief optimised for signature interactions and category spread — and
the production pattern became “argument + widget, no photograph.” At first glance
that reads as a quality drop even when the underlying research is sharper. Fix
the first viewport (brand + place + one true control) and many batch-2 theses
become strong again.

---

## Best and worst of each

| Concept | B | Best | Worst |
|---|---|---|---|
| Hotel Enniskeen | 1 | Bookin1 seam; pine bathroom plates; estate depth | Brand-second home; figcaption overlays; house façade vs valley |
| Mourne Cycles | 1 | Trail photo; hire three-jobs; peak/coal/red system | Overlay dashboard; slogan > brand; floating e-bike card |
| Buck's Head | 1 | Frontage colours; honest ResDiary; phone menu segments | Booking eats hearth; Lora/cream/pills; first-viewport bloat |
| Newcastle Chamber | 1 | Directory-as-product; Co. Down seal; multi-page shell | No place photo; fake search; nav dies under 940px |
| Kent Amusements | 1 | Seasonal FB-escape thesis; Teko marquee; honest hours model | Pier SVG costume; overstuffed hero; Attractions icon cards |
| Donard Veterinary | 1 | Emergency strip; appointments/emergency split; plum/teal from badge | Home packs form + 6-service rail; zero pets photos |
| Cúpla | 1 | Twin-ring system; Irish-first menu card; honest first-website pitch | Cream/caramel/pills; zero café photo; English-only CTAs |
| Tool Centre | 1 | Subject yellow/black; hire-list rates honesty; Call as conversion | Zero yard photo; empty “Today’s rates” desk; hatch/card chrome |
| Castle Farm | 1 | Real crate photography; single shop CTA; local framing | Cream/Georgia/gold cluster; hero badge overlay; no depth |
| Scopers | 1 | Bricolage; supper-club course list on iron; kelp rail band | Zero food photo; cream/paprika dual-sell card; still Meta-gated |
| Tonn Ruray | 2 | Café≠apartments split; Syne + coral italic; “Wave of Ruray” etymology | No café photo; timeline decorative; Stein slogan brand-second |
| Murdock Brothers | 2 | Steel/orange direction; real litre range control; price honesty | E/F dial cosplay; blank £— climax; no place imagery |
| Betty's Better Butters | 2 | Show-the-range insight; Rozha One; “on a knife” voice | Shelf below fold; CSS discs not food; cream/didone/gold slop |
| Hugh McCann's | 2 | Date + guests + season enquiry; wedding-call facts | Zero photography vs graft brief; “We do.” crushes brand; AI luxury |
| Groves Chemist | 2 | Restore repeat-Rx thesis; form a11y; local surgeries copy | Label costume; mint SaaS look; zero shop/van photo; overloaded left |
| Kelly, McEvoy & Brown | 2 | Drawing-register IA idea; Martian Mono metadata; tender CTA | Inert filters; invented drawing nos.; erased building photos |
| Douglas & Cromie | 2 | UK plate lockup; listing scan order; Saira condensed character | PHOTO hatch tiles; “photographed by us” contradicted; flat night |
| Dundrum Inn | 2 | Playbill type; tonight/GuestDiary/43→2 thesis; Inn-specific copy | No bay photo; hero dashboard; static board sold as interaction |
| Donard Hotel | 2 | Commission problem is real; palette ≠ Enniskeen; plain local copy | No hotel imagery; OTA panel below capture fold; cream/wine slop |
| Newcastle Family Dental Care | 2 | Insecure-redirect research; form a11y; named dentists | Padlock URL theatre; pill/team card clutter; zero clinic imagery |

---

## Priority repair lanes

**P0 — Photography back into the fold.** Especially batch 2 and the no-photo
batch-1 set. A before/after studio cannot ship afters with no subject.

**P0 — Brand-first retypeset.** Promote wordmark to hero scale; demote slogan.
Almost every concept fails the remove-nav test.

**P1 — Demote signature widgets below the brand plane** unless they are truly
interactive and answer a visitor job (not an owner meta-argument).

**P1 — Wire or cut.** Inert filters, fake search, static tonight boards, and
costume skins that don’t change the control model.

**P2 — Break cream/serif/gold and clinical-SaaS lanes** with place materials,
not just new Google Fonts.

---

## Method note

Twenty parallel independent reviews (one agent per concept), then progressive
synthesis: each concept → batch 1 unit → batch 2 unit → full portfolio.
Scores are craft judgements, not automated metrics. Murdock Brothers is
included as a built concept page even though trading remains unconfirmed and it
is not yet published as a transformation.
