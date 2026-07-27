# Plan

Current working plan for Mourne Made. Historical milestone detail and the
retired v1.1 review process are preserved in
[`docs/archive/plan-before-publication-reset-2026-07-25.md`](docs/archive/plan-before-publication-reset-2026-07-25.md).

Snapshot: 26 July 2026. `PROSPECTS.md` owns pipeline state — the public list,
the two held prospects and their unblock conditions. This document owns only
the current milestone and the next actions.

## Completed — recover the useful portfolio

The publication standard is the five checks in
[`CONCEPT_DESIGN_REVIEW.md`](CONCEPT_DESIGN_REVIEW.md): truthful and respectful,
clear and specific, works as presented, safe to publish, and the owner would
recognise themselves in it. The fifth was added on 27 July 2026 — see below.

### Completed in this pass

- Replaced the scored review and one-repair rule with the four-check review.
- Kept Hotel Enniskeen and The Buck's Head public.
- Repaired and restored Mourne Cycles, Newcastle Chamber, Kent Amusements,
  Donard Veterinary and Cúpla.
- Moved the v1.1 criteria, plan and scorecard template into dated archives.
- Completed four-check triage for the twelve queued concepts and published all
  twelve after economical blocker repairs where needed.
- Restored production request delivery after replacing the rejected Gmail app
  password. A live browser submission returned 200 and rendered the success
  state on 26 July 2026.

### Triage outcomes (26 July 2026)

| Concept | Result | Notes |
|---|---|---|
| The Tool Centre | Publish | Hire-list labelled illustrative; call focus rings fixed |
| Scopers | Publish | Supper-club date no longer presents a stale year as upcoming |
| Tonn Ruray Café | Publish, then retired 27 Jul | Passed all four checks and was worse than the café's own site — see `PROSPECTS.md` |
| Groves Chemist | Publish, then retired 27 Jul | Proposed rebuilding the centralised platform the pharmacy came off — see `PROSPECTS.md` |
| The Dundrum Inn | Publish, then rebuilt 26 Jul | Passed triage but lost to the Inn's own live site; rebuilt — see below |
| Hugh McCann's | Publish | Enquiry prepares mailto with date and guest count |
| Betty's Better Butters | Publish | Placeholder flavours already disclosed |
| Douglas & Cromie | Publish | Stock cards labelled as sample placeholders |
| Kelly, McEvoy & Brown | Publish | Project metadata limited to sourced fields; filters work |
| The Donard Hotel | Publish | Direct-booking wording already illustrative; no OTA photos |
| Newcastle Family Dental Care | Publish | Care claims limited to sourced practice items |
| Castle Farm Fresh Produce | Publish | Verification record created; shop journey concept passes |

### The Dundrum Inn rebuild (26 July 2026)

The Inn passed four-check triage on 26 July and was still a bad concept. The
checks caught its disclosure problems and had nothing to say about the fact
that the Inn's own live website was the better page. That is a real limit of
the standard, not a failure to apply it: the four checks test whether a concept
is honest, not whether it is good.

What was wrong, in the order it mattered. It carried no photograph of a
business whose product is a view, a garden and a Sunday roast, while the live
site opens on a film of the village. It replaced the Inn's blush-and-cream
identity and 1834 crest with black, brass and Bodoni, against the rule in
`DESIGN.md` that a concept carries the subject's identity. It set body copy in
Space Mono. Its whole four-item navigation rendered struck through, because
every item was a `data-concept-placeholder`. It printed a remark about the
client's current site — *Two languages, not forty-three* — inside the client's
proposed site. And its single argument, the Tonight board, was disclosed twice
as illustrative while the control it displaced, GuestDiary's date and guest
search, genuinely worked.

Re-checking the Inn's site for the rebuild produced a better argument than the
one that was invented. The Inn publishes bar hours for all seven days and **no
kitchen or food-service time anywhere**, which is the call the bar takes most
often. It publishes no room prices either. So the first concept's "kitchen
until 8.30pm" and "double from £95" were both fabrications, and the honest
version of the board is stronger: the open state is computed in the browser
from the published winter hours, the event comes from the Inn's events listing,
and the rooms cell is a search rather than a count.

This is a restyle of a published concept, which the standing constraint below
reserves for evidence from a real conversation or pilot. It was directed
explicitly and it repairs fabricated data, so it is recorded here as a
correction rather than as new portfolio work. It adds no concept.

### The fifth check (27 July 2026)

The Inn was not an isolated case. Tonn Ruray Café and Groves Chemist passed the
same four checks on the same day and were retired on 27 July for the same
reason: honest concepts that the business would not have wanted. All three broke
the `DESIGN.md` rule that a concept carries the subject's identity, and no check
asked about it.

`CONCEPT_DESIGN_REVIEW.md` now carries a fifth check — **would the owner
recognise themselves in this?** — with four questions behind it: does what they
chose deliberately survive, is this better than what they already have, would
they read anything here as criticism of them, and are we solving a problem they
have. A *no* is a blocker.

`scripts/check-concept-publication.mjs` requires the answer for every review
dated 27 July 2026 or later. The seventeen concepts published before that date
were never asked, so the build names them on every run rather than failing;
`PROSPECTS.md` records the two retirements in full.

## Next milestones

Seventeen concepts are public and no business has been contacted. The next
piece of product work is one deliberate exception to the closed portfolio:
Painted Earth will test the broader commercial offer in a strong retail
setting. It is a representative prototype until the business agrees to take
part; it must not be described as a client pilot or client work.

1. **Give Painted Earth a full representative retail treatment.** Start from
   what already works: real product photography, clear prices, several routes
   through the catalogue and a personal identity that feels carefully made.
   Re-check the live site and source record before design work because
   products, prices and services can change. Build one complete mobile-first
   retail loop from arrival through collection discovery and product detail to
   the existing checkout, including a useful recovery when an item is
   unavailable or no product fits. Show how the shop, gallery, makers and
   online range belong together without replacing the owner's character or
   inventing stock, fulfilment terms, workshops or customer results. Record
   the proposed customer action, upkeep responsibility and measurement plan.
   Verify the full prototype on phone and desktop. Publication still requires
   the five checks and a separate Publish decision, and the fifth applies with
   particular force here: Painted Earth's site is already good, so the concept
   has to beat it on its own terms or not ship.
2. **Generate the Dundrum Inn hero image, then regenerate its media.** The
   concept was rebuilt on 26 July 2026 (see below) and its hero is a labelled
   placeholder until a publishable image of the Inn exists. Generate the image,
   disclose it on the page and in `public/images/place/ATTRIBUTION.md` as the
   file requires, then capture the after still and clip once — not twice.
   Until then the transformation page's after-media still shows the retired
   black-and-brass concept and misrepresents the current page.
3. **Re-review the seventeen published concepts against the fifth check.** Each
   needs the live site and the concept open side by side, and an
   `ownerWouldRecognise` answer written into its publication record. `pnpm
   build` names the outstanding ones on every run. Three of nineteen concepts
   from the same batch have already failed this question, so treat a *no* as
   likely rather than exceptional.
4. Regenerate public comparison media only where a blocker repair changed the
   visible result (Scopers supper-club, Douglas & Cromie forecourt, Kelly
   register, Hugh McCann's enquiry, Tool Centre hire-list, Newcastle Dental
   care pills).
5. Finish personalised one-sheets for the concepts selected for direct
   outreach. Rebuild each PDF after the rename — see the QR contract in
   `docs/adr/0002-printed-qr-attribution-contract.md`.
6. Begin the first small outreach wave and record real responses separately
   from prototype evidence.
7. After one business agrees to a pilot, record its baseline, implement one
   primary customer action with business-owned accounts, name the upkeep
   responsibility and review the agreed measure after 30 days. Use that
   evidence before setting public service prices or making return claims.

## Standing constraints

- Painted Earth is the only planned addition to the portfolio. It was selected
  to test the retail form of the broader offer, not to increase the concept
  count. After it, another concept or a restyle of a published one requires
  evidence from a real conversation or pilot.
- A publication standard that is not enforced by a script in `pnpm build` is
  not a standard. The scored v1.1 process existed only as prose and was
  rewritten twice in three days; `scripts/check-concept-publication.mjs` needed
  its first change on 27 July 2026, to carry the fifth check.
- A concept is an offer to a business, not an exercise. Before building one, and
  again before publishing it, open the live site beside the concept. If the live
  site wins, there is no offer to make.
