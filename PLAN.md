# Plan

Current working plan for Mourne Made. `PROSPECTS.md` owns pipeline state,
including the public, withdrawn, retired and held lists. The publication
standard lives in `CONCEPT_DESIGN_REVIEW.md`. Historical milestone detail and
the retired v1.1 review process are preserved in
[`docs/archive/plan-before-publication-reset-2026-07-25.md`](docs/archive/plan-before-publication-reset-2026-07-25.md)
and in the commit history.

Snapshot: 28 July 2026. The portfolio recovery and fifth-check re-review are
complete, and sixteen transformations are public. The Buck's Head has replied
to the first outreach: it already has a new website built and plans to launch
it when its accommodation is ready.

The verification baseline is restored: `pnpm test` builds from the frozen
lockfile, starts preview, and runs the request, concept-shell, reviewed-concept,
media, Buck's Head, Enniskeen and Painted Earth checks green locally. GitHub
Actions runs the same command. Remaining `@vercel/node` advisories are recorded
in `docs/dependency-advisories.md`.

No business has approved the concept work and no client result has been
measured. The ordered plan is therefore: close the two open publication
decisions, protect the request path, finish the two remaining outreach sheets
and learn from real conversations before expanding the portfolio or offer.

## 1. Restore a trustworthy verification baseline — done 28 July 2026

Completed before another publication decision or printed outreach sheet.

1. Repaired `test:reviewed-concepts` around durable evidence: each public
   transformation's rendered third-party or generated assets require disclosure,
   and Sources & limits may not claim photography the concept no longer uses.
   Retired Mourne Cycles, Kent, Donard Veterinary and Cúpla hero selectors are
   gone.
2. Replaced the Buck's Head sticky-banner comparison with a real occlusion
   check. Revised Enniskeen's first-viewport requirement to keep the booking
   control visible (and sized the hero against `--mm-banner-space`) rather than
   asserting a pre-banner whole-hero fit.
3. Added `pnpm test` and `.github/workflows/verify.yml` that install from the
   frozen lockfile, build, start `pnpm preview`, and run the request,
   concept-shell, reviewed-concept, media, Buck's Head, Enniskeen and Painted
   Earth checks.
4. Corrected documentation drift: prose public counts are checked against
   `publicTransformationSlugs`, the obsolete Dundrum Inn after-media item in
   `REVIEW.md` is closed, and the superseded form-success note is removed from
   `AGENTS.md`.
5. Overrode the `fast-uri` and `esbuild` advisories, updated Astro to 7.1.4 with
   focused checks still passing, moved `@astrojs/check` and TypeScript to
   development dependencies, and restored exact versions for the font packages.

## 2. Close the remaining publication decisions

### Kelly, McEvoy & Brown

The 27 July rebuild now carries the firm's mark, yellow-and-grey identity and
two photographs from its own named project pages. It remains withdrawn because
the publication record still contains the earlier identity blocker and the
comparison media predates the rebuild.

1. Inspect the rebuilt concept beside the live site on phone and desktop.
2. Correct the stale comparison `afterAlt` text in
   `src/data/transformation-details.ts`.
3. Run the five publication checks again. If the concept passes, update
   `research/concept-reviews/publication.json`, `PROSPECTS.md`,
   `research/verifications.json` and `publicTransformationSlugs` together.
   If it does not pass, keep it withdrawn and record the remaining blocker.
4. Only after a Publish decision, recapture and visually inspect its after
   still and clip, regenerate responsive derivatives and run the media and
   concept checks.

### Painted Earth

The internal prototype at `/concepts/painted-earth/` is implemented and its
desktop and phone shopping journeys pass. It is not publication-reviewed and
is not public. Its live shop added the catalogue filters that motivated the
first proposal, so the surviving case is deliberately narrow: make
original-art collection or shipping terms visible before purchase and give a
useful route forward when an original has sold.

1. Open the live shop beside the prototype and decide whether that narrower
   loop is a meaningful improvement the owner would recognise, not merely a
   different design.
2. Run the five publication checks and record one explicit outcome:
   **Publish**, **Fix blocker** or **stop as an internal exploration**.
3. If Publish, add the transformation record and source disclosure, capture
   comparison media, regenerate derivatives, add it to the public list and run
   the full build plus the focused Painted Earth journey check.
4. If it does not clearly beat the live experience, do not expand the
   prototype to manufacture a case for publication.

Do not start another concept while either decision is open.

## 3. Protect the request path and prepare the remaining first-wave outreach

The original Dundrum batch named in
[`docs/adr/0001-personalised-one-sheets-over-door-drop.md`](docs/adr/0001-personalised-one-sheets-over-door-drop.md)
was The Buck's Head, Scopers and Cúpla. The Buck's Head has now replied: a
replacement website is already built and is waiting on accommodation readiness
before launch. Do not continue that pitch or send its one-sheet. Re-check the
public site after launch, or respond sooner only if the business invites
follow-up.

The remaining first wave is Scopers and Cúpla. Do not add a replacement merely
to restore the original batch size. Hotel Enniskeen remains in batch two so the
highest-stakes conversation is not used to rehearse the approach.

1. Replace the module-level request-rate `Map` with a shared per-source store
   that enforces five attempts in one hour across serverless instances. Keep
   the existing origin, field, honeypot and delivery tests.
2. Make a failed delivery visible without logging submitted content. At
   minimum, retain structured failure codes and add an alert or production
   canary; use a transactional provider or queue only when the first-wave
   volume or delivery evidence justifies it.
3. Produce one personalised one-sheet for each of the two businesses using
   its current published transformation. Do not wait for optional extra media.
4. Give every sheet the slug-qualified QR destination required by
   [`docs/adr/0002-printed-qr-attribution-contract.md`](docs/adr/0002-printed-qr-attribution-contract.md):
   `/transformations/<slug>/?source=onesheet-<slug>`.
5. Rebuild the PDFs, inspect the rendered pages and scan every QR from the
   rendered artwork. Check the destination, business name, town, disclosure,
   contact route and trim-safe layout.
6. Before printing, make one production submission through a one-sheet link
   and verify that the notification arriving in the inbox carries the expected
   `source`. A 200 response or browser success message alone is not enough.
7. Print only the two verified sheets.

## 4. Run the first outreach conversations

Hand the sheets to the owner or decision-maker during trading hours. Explain
that each concept is independent and uncommissioned, then ask whether the
proposed customer journey addresses a problem they recognise.

After each visit:

- update the business stage and dated evidence in
  `research/verifications.json`, then regenerate `src/data/businesses.json`;
- update the human-readable pipeline in `PROSPECTS.md`;
- record the response separately from prototype evidence, including objections,
  requested changes, the person able to approve a pilot and the agreed next
  action;
- do not treat delivery, politeness, a page view or silence as validation.

Review the Buck's Head response together with the Scopers and Cúpla outcomes
before preparing batch two. Change the opener, one-sheet or offer only when the
conversations identify a repeated problem; do not restyle the portfolio
speculatively.

## 5. Turn one agreement into a measured pilot

When a business agrees to continue:

1. Record the baseline for one primary customer action and the evidence source.
2. Agree the bounded change, success measure, review date and who owns copy,
   prices, stock, photography, accounts and ongoing updates.
3. Implement the action using business-owned production accounts. Keep
   provisional content visibly provisional until the owner supplies or
   approves it.
4. Verify the live customer journey and its failure or recovery path.
5. Review the agreed measure after 30 days and record the result, including a
   null or negative result.

Use pilot evidence before publishing service prices, return claims or a broader
rollout plan.

## 6. Reduce recurring cost before broader promotion

Do not let this section delay the two-business outreach wave once sections 1
and 3 are complete. Apply each item at the stated boundary.

1. Before the next deploy after the baseline repair, remove unreferenced media
   from `public/` or give it an explicit held record and reason in
   `research/concept-reviews/image-provenance.md`. Make the asset check fail
   when an orphan has neither outcome. The 28 July review found 36 orphan
   groups; keeping withdrawn bytes at guessable production URLs works against
   the provenance standard.
2. Before the next recapture wave, decide how masters leave normal Git history:
   Git LFS or externally stored masters with reproducible derivative
   generation. Separately decide whether to purge the previously exposed
   business and verification datasets from history; repository privacy does
   not remove the earlier exposure.
3. Before building another concept after Painted Earth, extract a small shared
   type scale and the repeated panel, grid, rail and disclosure geometry.
   Identity sheets should continue to own subject-specific colour, typeface
   and character. Do not flatten the concepts into one template.
4. Before another case-study format is added, replace raw HTML strings and
   regex image rewriting in `transformation-details.ts` with typed sections or
   Astro content components.
5. Before a broader public campaign, move genuinely internal `/prototypes/`
   routes to dev-only or protected preview hosting unless a route has a named
   public-review purpose. Add automated accessibility checks and adopt WCAG
   2.2 AA as the promotion target.
6. Promote useful contrast, fold and occlusion probes from `.tmp/` into named
   scripts or `scripts/lib/`, then clear disposable probes instead of letting
   the temporary workspace become undocumented tooling.

## Blocked or deferred

- Create and verify a Google Business Profile only when the owner supplies the
  Google account, publishable contact details and real-world verification
  needed by the platform. This does not block the first outreach batch.
- Do not publish or contact held prospects until the unblock condition in
  `PROSPECTS.md` is met.
- After Painted Earth, a new concept or a restyle of a published concept
  requires evidence from a real conversation or pilot.

## Completion checks

- The repository build must enforce every public concept's publication record.
- Repository verification is complete only when the aggregate test command
  passes locally and in CI; a green Astro build is not a substitute.
- Visual work is complete only after direct phone and desktop inspection.
- Printed work is complete only after rendered-PDF inspection, QR scanning and
  source-attributed inbox delivery.
- Request protection is complete only when the rate limit is shared across
  serverless instances and a delivery failure is observable.
- Outreach learning is validated only by recorded business responses.
- A pilot is not promoted client work until the business has agreed to it and
  the named production boundary has been crossed.
