# Prospects

Human-readable summary of the Mourne Made concept pipeline. The detailed source
of truth is `research/verifications.json`; regenerate `src/data/businesses.json`
with `node scripts/normalize-businesses.mjs` after changing it.

Snapshot: 25 July 2026 · seven public transformations · twelve built concepts
awaiting short publication triage · two prospects held on trading or suitability
evidence

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

## Built concepts awaiting triage

The order and four-check worksheet live in `PLAN.md`.

| Business | Town | Main question |
|---|---|---|
| The Tool Centre | Newcastle | Are the hire claims and call action honest and usable? |
| Scopers | Dundrum | Does the supper-club action match the published offer? |
| Tonn Ruray Café | Dundrum | Is the café separated clearly from the apartments? |
| Groves Chemist | Dundrum | Is the prescription handoff honest? |
| The Dundrum Inn | Dundrum | Are status wording and GuestDiary handoff accurate? |
| Hugh McCann's | Newcastle | Does the enquiry action work as presented? |
| Betty's Better Butters | Dundrum | Are proposed products and flavours labelled? |
| Douglas & Cromie | Newcastle | Are vehicle placeholders and listing claims clear? |
| Kelly, McEvoy & Brown | Dundrum | Are project metadata and filters honest? |
| The Donard Hotel | Newcastle | Is direct-booking wording accurate? |
| Newcastle Family Dental Care | Newcastle | Are practice claims and the appointment action safe? |
| Castle Farm Fresh Produce | Dundrum | Create the missing verification record before review |

## Held

| Business | Reason | Unblock condition |
|---|---|---|
| Murdock Brothers | Trading status is not confirmed strongly enough for public use | Confirm trading from a current authoritative or first-hand source |
| South Down Signs | Online evidence is stale | Confirm trading in person or from current business evidence |

The remaining assessed businesses and their evidence stay in
`research/verifications.json`. The earlier detailed pipeline, including the
retired v1.1 score history, is archived at
`docs/archive/prospects-before-publication-reset-2026-07-25.md`.
