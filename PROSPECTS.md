# Prospects

Human-readable summary of the Mourne Made concept pipeline. The detailed source
of truth is `research/verifications.json`; regenerate `src/data/businesses.json`
with `node scripts/normalize-businesses.mjs` after changing it.

Snapshot: 26 July 2026 · nineteen public transformations · two prospects held on
trading or suitability evidence

## Stages

`Shortlisted → Concept in progress → Concept published → Contacted → Mock-up
requested → Client`

Use **Assessed – not shortlisted** when research is worth keeping but no concept
is planned. A local route alone does not change a stage.

Before publishing a concept:

- verify the business and material claims;
- answer the four checks in `CONCEPT_DESIGN_REVIEW.md`;
- add a Publish record to `research/concept-reviews/publication.json`;
- add the slug to `publicTransformationSlugs`;
- update the stage here and in `research/verifications.json`.

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
| Tonn Ruray Café | Dundrum | Café-first redesign leaving apartments alone |
| Groves Chemist | Dundrum | Repeat-prescription restore and branch handoff |
| The Dundrum Inn | Dundrum | Tonight board and GuestDiary journey |
| Hugh McCann's | Newcastle | Wedding enquiry graft on a maintained site |
| Betty's Better Butters | Dundrum | Product shelf with labelled flavour placeholders |
| Douglas & Cromie | Newcastle | Dealer-owned forecourt with sample listings |
| Kelly, McEvoy & Brown | Dundrum | Blueprint project register with sector filters |
| The Donard Hotel | Newcastle | Direct-booking proposal without OTA photos |
| Newcastle Family Dental Care | Newcastle | Secure practice front door and appointment panel |
| Castle Farm Fresh Produce | Dundrum | Produce-led shop arrival and weekly boxes |

## Held

| Business | Reason | Unblock condition |
|---|---|---|
| Murdock Brothers | Trading status is not confirmed strongly enough for public use | Confirm trading from a current authoritative or first-hand source |
| South Down Signs | Online evidence is stale | Confirm trading in person or from current business evidence |

The remaining assessed businesses and their evidence stay in
`research/verifications.json`. The earlier detailed pipeline, including the
retired v1.1 score history, is archived at
`docs/archive/prospects-before-publication-reset-2026-07-25.md`.
