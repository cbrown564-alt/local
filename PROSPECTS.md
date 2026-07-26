# Prospects

Human-readable summary of the Mourne Made concept pipeline. The detailed source
of truth is `research/verifications.json`; regenerate `src/data/businesses.json`
with `node scripts/normalize-businesses.mjs` after changing it.

This document owns pipeline state. `PLAN.md` and `README.md` link here rather
than repeating a count.

Snapshot: 26 July 2026 · seventeen public transformations · one active next
prospect · two prospects held on trading or suitability evidence · **no
business contacted yet**

## Stages

`Shortlisted → Concept in progress → Concept published → Contacted → Mock-up
requested → Client`

Use **Assessed – not shortlisted** when research is worth keeping but no concept
is planned. A local route alone does not change a stage.

**Held** is not a stage. It is a flag laid over whatever stage a business has
reached, recording that it must not be published or contacted until a named
condition is met. A held business keeps its real stage in
`research/verifications.json`.

Before publishing a concept:

- verify the business and material claims;
- answer the four checks in `CONCEPT_DESIGN_REVIEW.md`;
- add a Publish record to `research/concept-reviews/publication.json`;
- add the slug to `publicTransformationSlugs`;
- update the stage here and in `research/verifications.json`.

## Active next prospect

| Business | Town | Stage | Planned work |
|---|---|---|---|
| Painted Earth | Newcastle | Shortlisted | Full representative retail prototype: preserve the existing product photography, pricing, catalogue routes and personal identity while testing clearer collection discovery, product detail, physical-shop and gallery context, customer capture, upkeep and measurement |

Painted Earth already has a functioning, polished ecommerce site. It is not a
repair case and must not be presented as one. The project owner selected it on
26 July 2026 because its strong starting point makes it a better test of
proportionate improvement than another absent or failed website. The business
has not been contacted. The work remains an independent prototype unless the
business agrees to a pilot.

## Public concepts

| Business | Town | Main concept work |
|---|---|---|
| Hotel Enniskeen | Newcastle | Five-page hotel concept, rooms, dining and Bookin1 handoff |
| The Buck's Head | Dundrum | Table booking and HTML menus |
| Mourne Cycles | Newcastle | Storefront, workshop and Cycle to Work |
| Newcastle Chamber of Commerce | Newcastle | Directory, events and joining route |
| Kent Amusements | Newcastle | Attractions and seasonal-hours structure |
| Donard Veterinary Clinic | Newcastle | Appointment request and emergency information |
| Cúpla | Dundrum | Bilingual café opening and sample menu |
| The Tool Centre | Newcastle | Hardware and plant-hire desk with hire-list |
| Scopers | Dundrum | Zero-waste bar and supper-club night |
| The Dundrum Inn | Dundrum | Tonight board and GuestDiary journey |
| Hugh McCann's | Newcastle | Wedding enquiry graft on a maintained site |
| Betty's Better Butters | Dundrum | Product shelf with labelled flavour placeholders |
| Douglas & Cromie | Newcastle | Dealer-owned forecourt with sample listings |
| Kelly, McEvoy & Brown | Dundrum | Blueprint project register with sector filters |
| The Donard Hotel | Newcastle | Direct-booking proposal without OTA photos |
| Newcastle Family Dental Care | Newcastle | Secure practice front door and appointment panel |
| Castle Farm Fresh Produce | Dundrum | Produce-led shop arrival and weekly boxes |

## Removed from the public list

| Business | Recorded stage | Current public state |
|---|---|---|
| Tonn Ruray Café | Concept published | Removed from `publicTransformationSlugs` on 26 July 2026; the reason is not recorded |
| Groves Chemist | Concept published | Removed from `publicTransformationSlugs` on 26 July 2026; the reason is not recorded |

Their internal concept routes and historical stage records remain. Do not call
either transformation public unless it is restored to the machine-readable
public list and passes the current publication check.

## Held

| Business | Stage | Reason | Unblock condition |
|---|---|---|---|
| Murdock Brothers | Concept in progress | Trading status is not confirmed strongly enough for public use | Confirm trading from a current authoritative or first-hand source |
| South Down Signs | Shortlisted | Online evidence is stale; no concept work started | Confirm trading in person or from current business evidence |

South Down Signs carries no explicit `stage` in `research/verifications.json`;
`scripts/normalize-businesses.mjs` defaults an unset stage to **Shortlisted**.

The remaining assessed businesses and their evidence stay in
`research/verifications.json`. The earlier detailed pipeline, including the
retired v1.1 score history, is archived at
`docs/archive/prospects-before-publication-reset-2026-07-25.md`.
