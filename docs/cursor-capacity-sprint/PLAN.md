# Cursor capacity sprint plan

**Status:** proposed execution plan  
**Created:** 29 July 2026  
**Scope:** bounded use of Composer 2.5, Grok 4.5, and GLM 5.2 before subscription capacity expires  
**Canonical plan owner:** `PLAN.md`

## Purpose

Use expiring model capacity to finish the next evidence-backed Mourne Made work without increasing concept count, weakening the five-check publication standard, or mistaking generated output for real market evidence.

This document is an execution aid. It does not replace `PLAN.md`, publication records, prospect records, research plans, provenance records, or the QR attribution contract. Update canonical owners when work lands.

## Desired outcome

At the end of the sprint:

1. the verification baseline is trustworthy;
2. Painted Earth has an explicit publish, revise, or keep-internal decision;
3. selected outreach one-sheets are rebuilt and mechanically verified;
4. a small first outreach wave is ready for owner approval;
5. no invented client, product, stock, price, service, result, or interest claim has entered the public site.

## Non-goals

- Do not add another portfolio concept.
- Do not restyle a published concept absent new evidence.
- Do not contact a business automatically.
- Do not call a representative prototype client work or a pilot.
- Do not publish Painted Earth merely because work was completed.
- Do not criticise a business's current site in customer-facing material.
- Do not invent stock, fulfilment, workshops, customer results, service terms, prices, opening hours, or contact details.
- Do not replace real business identity with a generic generated identity.
- Do not treat successful automation as evidence that the commercial offer works.
- Do not allow two agents to edit the same branch.

## Model roles

| Model | Primary role | Appropriate work | Avoid |
| --- | --- | --- | --- |
| Composer 2.5 | Production lead | Bounded concept implementation, one-sheet generation, QR/manifests, screenshot recapture | Independent publication judgement |
| Grok 4.5 | Adversarial product reviewer | Current-site comparison, fifth-check review, evidence and claim audit | Expanding the design after the review question is settled |
| GLM 5.2 | Verification lead | Test truth, responsive and accessibility regression, document and QR consistency | Acting as the only reviewer of its own changes |

## Global working rules

1. Start from current `master` and record its SHA.
2. Run the canonical build and test baseline before editing.
3. Create one branch per work item.
4. Re-open live source evidence before relying on prices, products, services, hours or contact details.
5. Treat current-site information as time-sensitive.
6. Separate prototype evidence, publication evidence, outreach evidence and real client evidence.
7. Require visible provenance and disclosure for representative or generated media.
8. Update the appropriate publication and prospect record in the same change.
9. Do not merge or publish when a five-check disposition is unresolved.
10. Stop when owner judgement or business permission is required.

## Stage 0 — Verification baseline

### L0.1 Review the verification repair

**Lead:** GLM 5.2  
**Target:** the current verification-baseline pull request, if still open.

Independently verify that:

- `pnpm test` runs every required suite;
- CI uses a frozen lockfile and the same meaningful commands;
- a deliberate protected-behaviour violation makes each relevant suite fail;
- entrance animations are settled before geometry or contrast probes;
- image provenance comes from the provenance record, not filenames, captions or alt text;
- alt text alone cannot satisfy visible disclosure;
- the Buck's Head test detects real occlusion;
- the Enniskeen check preserves the booking control in the first viewport;
- failures are not swallowed when another suite fails first.

**Exit gate:**

- seven suites pass on the unchanged baseline;
- at least one safe mutation test demonstrates that each critical family can fail;
- CI and local commands agree;
- any obsolete planning PR is closed or explicitly retained.

No later work should weaken this baseline.

## Stage 1 — Painted Earth disposition

Painted Earth is the sole allowed portfolio exception and already has a narrow internal implementation. The goal is a defensible disposition, not automatic publication.

### L1.1 Refresh source evidence

**Lead:** Composer 2.5  
**Reviewer:** Grok 4.5

Recheck:

- the current public site;
- product, artist or brand and category routes;
- filters and search;
- displayed prices;
- stock states;
- checkout destination;
- shipping or collection terms;
- gallery and maker framing;
- contact and location details.

Update the dated evidence record. Do not silently carry forward stale facts.

**Stop condition:** if access or evidence is insufficient, record the gap and do not infer the missing state.

### L1.2 Verify the narrow retail loop

**Lead:** Composer 2.5

Scope the representative prototype to:

1. arrival;
2. familiar shopping route;
3. original-art collection discovery;
4. product detail;
5. existing checkout handoff;
6. sold or unavailable work recovery;
7. useful no-fit recovery;
8. place, gallery and makers context.

Verify on phone and desktop.

Record:

- proposed primary customer action;
- what remains on the business's existing systems;
- upkeep responsibility;
- measurement plan;
- every representative or generated element;
- every claim source.

Do not reintroduce the broad catalogue treatment already invalidated by the live site's improvements.

### L1.3 Run the five checks

**Product reviewer:** Grok 4.5  
**Verification reviewer:** GLM 5.2

For each check, record Pass, Revise, Fail, or Not evidenced:

1. **Truth:** Are business facts, products, terms and actions supported?
2. **Identity:** Does the concept preserve the real business's identity and character?
3. **Customer usefulness:** Does it improve a meaningful customer action?
4. **Production honesty:** Are representative media, limitations and non-client status clear?
5. **Comparative value:** Does it beat the current site on the current site's own terms?

The fifth check is decisive. Painted Earth's current site is already good.

### L1.4 Owner decision

The output is one of:

- **Publish candidate:** all five checks pass and the owner separately approves publication.
- **Revise:** a bounded, evidence-backed correction can close a named failure.
- **Keep internal:** useful demonstration, but not a credible public offer.
- **Withdraw:** current evidence removes the premise.

No model may make the final Publish decision.

## Stage 2 — Personalised one-sheet production

### L2.1 Freeze the outreach shortlist

**Owner input required**

Select the small first-wave concepts. Do not produce collateral for the entire portfolio by default.

For every selected prospect, record:

- business name;
- published concept route;
- current public contact route;
- primary proposed customer action;
- why the concept is credible now;
- evidence recency;
- exclusions or sensitivities.

### L2.2 Rebuild one-sheets

**Lead:** Composer 2.5

For each selected concept:

- use the current Mourne Made name and identity;
- show the business's real identity prominently;
- use only current published concept imagery;
- state clearly that the work is a representative proposal;
- describe one customer action, not a generic transformation claim;
- remove critique of the current site from customer-facing copy;
- avoid ROI, conversion or customer-result claims;
- provide the correct destination and contact route;
- rebuild the PDF after all copy and route changes.

Prefer a stable shared template only where it does not flatten each business's identity.

### L2.3 QR and artifact contract

**Lead:** Composer 2.5  
**Reviewer:** GLM 5.2

Create or update a manifest containing:

| Field | Requirement |
| --- | --- |
| Prospect | Exact business identity |
| Source concept | Published route and commit |
| PDF | Final artifact path and hash |
| QR target | Exact attributed URL |
| Attribution key | Contract-compliant identifier |
| Contact route | Current public source |
| Evidence date | Date last verified |
| Screenshot/media | Current and provenance-cleared |
| Verification | Render, link and scan result |

Verify each QR from the rendered PDF, not merely from the source string.

### L2.4 Visual and content QA

GLM reviews:

- clipping and overflow;
- phone-readable QR size;
- broken fonts or missing imagery;
- stale names and routes;
- disclosure visibility;
- accessibility of text contrast;
- current contact and destination;
- mismatch between one-sheet and published concept.

Grok performs a smaller adversarial review:

> Would a business owner reasonably understand what is real, what is proposed, what action is being improved, and what happens next?

## Stage 3 — First outreach wave preparation

Models may prepare the wave but must not send it.

### L3.1 Prioritisation

**Lead:** Grok 4.5

Rank selected prospects using only evidenced factors:

- concept credibility;
- strength of customer action;
- identity fidelity;
- evidence freshness;
- ease of a bounded pilot;
- business-owned implementation path;
- measurement feasibility;
- reputational risk.

Do not rank based on invented budget, interest or technical weakness.

### L3.2 Draft outreach

**Lead:** Composer 2.5

Prepare one short personalised draft per prospect:

- why this specific business was selected;
- one-sentence description of the representative concept;
- one concrete customer action;
- link or attached one-sheet;
- no criticism of the current site;
- no claim that work was commissioned;
- low-friction invitation to view or respond;
- clear sender identity.

Owner approval is required before sending.

### L3.3 Response and evidence log

Prepare a structured log separating:

- not contacted;
- contacted;
- delivered;
- opened, only if the channel legitimately supplies it;
- replied;
- interested;
- declined;
- meeting arranged;
- pilot agreed.

Never infer interest from delivery, opening, browsing or silence.

## Stage 4 — Pilot readiness

Do not implement a client pilot until one business explicitly agrees.

Prepare reusable templates for:

- baseline state;
- primary customer action;
- business-owned accounts and dependencies;
- upkeep responsibility;
- implementation boundary;
- privacy and content approval;
- measurement definition;
- 30-day review;
- rollback or withdrawal.

This stage produces templates only. It does not create pilot evidence.

## Branch sequence

```text
master
├── verify-baseline-review
├── painted-earth-source-refresh
│   └── painted-earth-loop
│       └── painted-earth-five-check-record
└── outreach-shortlist
    └── one-sheets-batch
        ├── qr-artifact-manifest
        └── outreach-drafts
```

The Painted Earth and one-sheet workstreams may proceed in parallel after the verification baseline is trusted because they do not share the same publication decision. Avoid overlapping changes to shared templates or global styles.

## Suggested agent prompt contract

Every prompt should include:

- exact concept or prospect;
- source evidence and its date;
- permitted files;
- canonical publication constraints;
- explicit prohibited claims;
- required test commands;
- required responsive sizes;
- provenance and disclosure requirements;
- final report covering files, evidence, checks, risks and owner decisions.

## Sprint priority if capacity expires early

1. Trustworthy verification baseline.
2. Painted Earth source refresh and five-check disposition.
3. First-wave shortlist.
4. One-sheet rebuilds and QR manifest.
5. Outreach drafts.
6. Pilot templates.

A clear keep-internal decision is more valuable than publishing a weak concept. Three verified one-sheets are more useful than sixteen generic drafts.

## Completion record

At sprint close, update this section and the canonical owners with:

- merged PRs and SHAs;
- Painted Earth disposition;
- one-sheets completed;
- QR verification results;
- outreach drafts awaiting approval;
- evidence gaps;
- blocked owner decisions;
- recommended next action.

No commercial claim should be updated until real outreach or pilot evidence exists.
