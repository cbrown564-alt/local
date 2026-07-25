# Plan

Current working plan for Mourne Made. Historical milestone detail and the
retired v1.1 review process are preserved in
[`docs/archive/plan-before-publication-reset-2026-07-25.md`](docs/archive/plan-before-publication-reset-2026-07-25.md).

Snapshot: 25 July 2026 · seven public transformations · twelve former public
transformations queued for four-check triage · Murdock Brothers remains internal
until trading is confirmed

## Active work — recover the useful portfolio

The publication standard is the four checks in
[`CONCEPT_DESIGN_REVIEW.md`](CONCEPT_DESIGN_REVIEW.md): truthful and respectful,
clear and specific, works as presented, and safe to publish.

### Completed in this pass

- Replaced the scored review and one-repair rule with the four-check review.
- Kept Hotel Enniskeen and The Buck's Head public.
- Repaired and restored Mourne Cycles, Newcastle Chamber, Kent Amusements,
  Donard Veterinary and Cúpla.
- Moved the v1.1 criteria, plan and scorecard template into dated archives.

### Twelve concepts to triage

Check these in order. Default to **Publish** when all four answers are yes.
Optional improvements do not hold up publication.

| Order | Concept | Truthful | Specific | Works | Safe | Result / next action |
|---:|---|---|---|---|---|---|
| 1 | The Tool Centre | To check | To check | To check | To check | Review the hire-list claims and call action |
| 2 | Scopers | To check | To check | To check | To check | Review the supper-club action and food claims |
| 3 | Tonn Ruray Café | To check | To check | To check | To check | Review the café/apartments distinction and menu action |
| 4 | Groves Chemist | To check | To check | To check | To check | Review prescription claims and handoff |
| 5 | The Dundrum Inn | To check | To check | To check | To check | Review status wording and GuestDiary handoff |
| 6 | Hugh McCann's | To check | To check | To check | To check | Review the enquiry action and venue claims |
| 7 | Betty's Better Butters | To check | To check | To check | To check | Review illustrative products and flavours |
| 8 | Douglas & Cromie | To check | To check | To check | To check | Review vehicle placeholders and listing claims |
| 9 | Kelly, McEvoy & Brown | To check | To check | To check | To check | Review project metadata and filter labels |
| 10 | The Donard Hotel | To check | To check | To check | To check | Review direct-booking wording and handoff |
| 11 | Newcastle Family Dental Care | To check | To check | To check | To check | Review practice claims and appointment action |
| 12 | Castle Farm Fresh Produce | To check | To check | To check | To check | Create its missing verification record, then review |

For each concept, update this row, `research/concept-reviews/publication.json`
when publishing, the public slug list in `src/data/transformations.ts`, and the
pipeline stage in `research/verifications.json`.

## Next milestones

1. Complete the twelve triage reviews and restore every concept without a
   serious blocker.
2. Regenerate public comparison media only where a blocker repair changed the
   visible result.
3. Finish personalised one-sheets for concepts selected for direct outreach.
4. Verify the production request form delivers.
5. Begin the first small outreach wave and record real responses separately
   from prototype evidence.

