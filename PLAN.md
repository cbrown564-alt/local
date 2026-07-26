# Plan

Current working plan for Mourne Made. Historical milestone detail and the
retired v1.1 review process are preserved in
[`docs/archive/plan-before-publication-reset-2026-07-25.md`](docs/archive/plan-before-publication-reset-2026-07-25.md).

Snapshot: 26 July 2026. `PROSPECTS.md` owns pipeline state — the public list,
the two held prospects and their unblock conditions. This document owns only
the current milestone and the next actions.

## Completed — recover the useful portfolio

The publication standard is the four checks in
[`CONCEPT_DESIGN_REVIEW.md`](CONCEPT_DESIGN_REVIEW.md): truthful and respectful,
clear and specific, works as presented, and safe to publish.

### Completed in this pass

- Replaced the scored review and one-repair rule with the four-check review.
- Kept Hotel Enniskeen and The Buck's Head public.
- Repaired and restored Mourne Cycles, Newcastle Chamber, Kent Amusements,
  Donard Veterinary and Cúpla.
- Moved the v1.1 criteria, plan and scorecard template into dated archives.
- Completed four-check triage for the twelve queued concepts and published all
  twelve after economical blocker repairs where needed.

### Triage outcomes (26 July 2026)

| Concept | Result | Notes |
|---|---|---|
| The Tool Centre | Publish | Hire-list labelled illustrative; call focus rings fixed |
| Scopers | Publish | Supper-club date no longer presents a stale year as upcoming |
| Tonn Ruray Café | Publish | Café/apartments split and menu placeholders already honest |
| Groves Chemist | Publish | Prescription handoff now an honest prototype with branch phone |
| The Dundrum Inn | Publish | Tonight board labelled sample; GuestDiary opens live homepage |
| Hugh McCann's | Publish | Enquiry prepares mailto with date and guest count |
| Betty's Better Butters | Publish | Placeholder flavours already disclosed |
| Douglas & Cromie | Publish | Stock cards labelled as sample placeholders |
| Kelly, McEvoy & Brown | Publish | Project metadata limited to sourced fields; filters work |
| The Donard Hotel | Publish | Direct-booking wording already illustrative; no OTA photos |
| Newcastle Family Dental Care | Publish | Care claims limited to sourced practice items |
| Castle Farm Fresh Produce | Publish | Verification record created; shop journey concept passes |

## Next milestones

Nineteen concepts are public and no business has been contacted. Every item
below serves the first real conversation; nothing here adds a concept.

1. **Verify the production request form delivers.** This blocks everything
   else — the claim and before-and-after actions on all nineteen public pages
   and every concept page post into `/api/request`, and the printed one-sheet
   QR codes land on pages whose only action is that form. Check the Vercel
   environment variables, send a live submission, then tick the open P1 in
   `REVIEW.md`.
2. Regenerate public comparison media only where a blocker repair changed the
   visible result (Scopers supper-club, Douglas & Cromie forecourt, Kelly
   register, Groves handoff, Dundrum Inn Tonight board, Hugh McCann's enquiry,
   Tool Centre hire-list, Newcastle Dental care pills).
3. Finish personalised one-sheets for the concepts selected for direct
   outreach. Rebuild each PDF after the rename — see the QR contract in
   `docs/adr/0002-printed-qr-attribution-contract.md`.
4. Begin the first small outreach wave and record real responses separately
   from prototype evidence.

## Standing constraints

- The portfolio is closed at nineteen. A new concept, or a restyle of a
  published one, needs a reason beyond craft — the marginal value of concept
  twenty is near zero until a real reply exists.
- A publication standard that is not enforced by a script in `pnpm build` is
  not a standard. The scored v1.1 process existed only as prose and was
  rewritten twice in three days; `scripts/check-concept-publication.mjs` has
  never needed a change.
