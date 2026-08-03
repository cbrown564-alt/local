# Plan

Current working plan for Mourne Made. `PROSPECTS.md` owns pipeline state,
including the public, withdrawn, retired and held lists. The publication
standard lives in `docs/CONCEPT_DESIGN_REVIEW.md`. Historical milestone detail and
the retired v1.1 review process are preserved in
[`docs/archive/plan-before-publication-reset-2026-07-25.md`](docs/archive/plan-before-publication-reset-2026-07-25.md)
and in the commit history.

Snapshot: 3 August 2026. Sixteen transformations are public. The Buck's Head has
replied to the first outreach: it already has a new website built and plans to
launch it when its accommodation is ready. Both open publication decisions are
now closed and neither published — see section 2.

**The verification baseline is red.** `pnpm test` was 7/7 green on 28 July after
the hardening pass in section 1a. On 3 August it is **6 of 9 suites passing**,
and the three failures were all introduced by the 31 July – 2 August design wave
(homepage redesign, brand palette refresh, image optimisation, concept
elevation) — work that section 2 said not to start while the publication
decisions were open. Repair is section 1b, before anything else. Remaining
`@vercel/node` advisories are recorded in `docs/dependency-advisories.md`.

No business has approved the concept work and no client result has been
measured. The ordered plan is therefore: repair the baseline, protect the
request path, finish the two remaining outreach sheets and learn from real
conversations before expanding the portfolio or offer.

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
   `docs/REVIEW.md` is closed, and the superseded form-success note is removed from
   `AGENTS.md`.
5. Overrode the `fast-uri` and `esbuild` advisories, updated Astro to 7.1.4 with
   focused checks still passing, moved `@astrojs/check` and TypeScript to
   development dependencies, and restored exact versions for the font packages.

## 1a. Harden that baseline — done 28 July 2026

A code review of the section 1 commit found the suite was not actually green,
and that two of its checks could not fail. Fixed in the same pass:

1. Entrance animations are settled before any probe reads the page. Seven
   concepts fade and translate on load, so contrast and geometry probes were
   measuring a half-rendered page and reporting different failures on different
   runs. `.dv-emergency-tag` was lifted to `--lavender-soft` because it settled
   at 4.60:1 against a 4.5 floor.
2. Rendered concept imagery is classified from
   `research/image-provenance.md` rather than from the filename,
   caption and alt text the check then asserted against — which made it
   tautological for any image whose alt already read "AI-generated
   visualisation", and blind to a generated image with a neutral name. Alt text
   no longer counts as disclosure: it is not what a sighted visitor is told.
   `nearbyDisclosure` was also matching the `<img>` itself, hiding the real
   disclosures on Dundrum Inn and Hugh McCann's.
3. Restored the two requirements deleted with the retired selectors: a
   generated image inside the phone first viewport needs its disclosure there
   too, and where a `-640.webp` derivative exists the phone must be served it.
4. That first run surfaced five rendered images with no provenance entry
   (four Enniskeen estate visuals and the Castle Farm wordmark) and two
   concepts serving oversized masters. Provenance is now recorded, Castle Farm
   carries a banner disclosure for its AI-generated wordmark, and both images
   use `ResponsiveImage`.
5. `pnpm test` runs every suite even when one fails. A single failure used to
   abort the run, so the media, Buck's Head, Enniskeen and Painted Earth
   checks had never executed since section 1 was written.
6. CI now runs once per pull request rather than twice, with
   `permissions: contents: read`.

## 1b. Repair the baseline the design wave broke — open

Full run on 3 August 2026: 6 of 9 suites pass. `test:request`, `test:media`,
`test:bucks-head`, `test:enniskeen`, `test:scopers` and `test:painted-earth`
(34/34) are green. Three fail, and none of the failures is in the plan:

1. **`test:shell-home`** — "homepage hero must carry the claim-door link". The
   31 July – 1 August homepage redesign (reveal hero, town map) dropped the
   claim-door link from the hero. That link is the route a business owner takes
   to claim their own concept, so this is a real loss, not a stale assertion.
   Restore it or, if the redesign moved it deliberately, move the assertion to
   where it now lives — decide which, and say so here.
2. **`test:reviewed-concepts`** — 14/15. Mourne Cycles serves the 1024px
   `-electric`, `-road` and `-mountain` masters to a 390px viewport while the
   `-640.webp` derivatives exist, and one rendered Dundrum Inn image has no
   entry in `research/image-provenance.md`. Both are regressions of section 1a
   items 3 and 4, from the 1 August imagery pass.
3. **`test:concepts`** — 97/120 route × viewport combinations pass; 23 fail, all
   `wrapped header labels`. Two different things are hiding under one message:
   - **False positives.** Kelly, McEvoy & Brown and Douglas & Cromie are flagged
     for their brand link, which wraps a tall `<img>` logo. The check exempts a
     link containing `span, small, strong, em, svg` as a deliberate brand
     lockup, but not one containing `img`. Painted Earth's nav links measure
     over 1.55 lines because of an underline element the height maths does not
     subtract; they render on one line.
   - **Possibly real.** Hotel Enniskeen fails on all five routes at laptop width
     only, with six labels flagged including the phone number and "Book a room".
     Check that before widening the exemption.

   Fix the check first — `img` belongs in the brand-lockup exemption and the
   underline height needs subtracting — then re-read what is left. Do not
   silence the whole assertion; it caught the Donard Veterinary header problem
   on 1 August.

Nothing in sections 3–6 starts until `pnpm test` is green again.

## 2. Close the remaining publication decisions — done 3 August 2026

Both were reviewed against the live site at phone and desktop on 3 August 2026.
Neither publishes. The public list is unchanged at sixteen. Outcomes and their
evidence are in `research/publication.json`; `PROSPECTS.md` carries the
human-readable version.

### Kelly, McEvoy & Brown — Fix blocker, stays withdrawn

The 27 July identity blocker is repaired: the concept carries the firm's own
mark, its yellow-and-grey palette and two source-matched project photographs,
and the stale comparison `afterAlt` is corrected in both `transformations.ts`
and `transformation-details.ts`.

A different blocker replaced it. The case study's premise — a portfolio
"rendered as plain text links beneath a small carousel" — is not true of
`kmbni.com`, whose `/portfolio` page is a photographed six-sector grid leading
to per-project pages with their own images. Only the nav dropdown is a text
list. This is the Painted Earth build-day failure again: a discovery claim the
live site has outgrown.

The repair is to rewrite the premise around what the concept actually adds — one
filterable register across all thirteen projects instead of drilling sector by
sector, and the accreditation marks promoted from the footer to procurement
evidence — or to drop the claim. Do that before any further work on this
concept, and re-run the five checks. Only after a Publish decision should the
after still and clip be recaptured.

### Painted Earth — stopped as an internal exploration

The prototype stays at `/concepts/painted-earth/`, internal and noindex, with no
transformation record, no comparison media and no place in the public list. Its
own journey checks pass 34/34; this is a publication decision, not a defect.

The shop is a gallery whose strength is photography of real work by named
makers, and the prototype cannot show any of it — republishing catalogue
photography spanning 92 third-party makers has no recorded licence, so every
artwork is a drawn placeholder tile. The imagery policy that keeps the prototype
honest is the same policy that makes it unpublishable. The live shop wins on
what the business actually sells.

What survives is smaller than a website transformation: collection-only and
shipping-quote terms visible before the Add to Cart button, a route forward from
a sold original, and the hand-run workshop waiting list. Offer that as a
merchandising fix to their existing product template if the shop is ever
approached. Do not expand the prototype to manufacture a case for publication.

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
   Scopers is further on: its journey was walked and filed on 31 July 2026
   (`.scratch/renders/scopers-journey/2026-07-31/`) and the walk-in script is
   written (`research/concepts/scopers/scopers-pitch.md`). The six generated food images landed
   the same day and the comparison still, clip and supper-club still were
   recaptured with them, so the concept is showable. What remains before
   outreach is its one-sheet and the standing gates below.
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
  `research/pipeline/verifications.json`, then regenerate `src/site/data/businesses.json`;
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
   `research/image-provenance.md`. Make the asset check fail
   when an orphan has neither outcome. The 28 July review found 36 orphan
   groups; keeping withdrawn bytes at guessable production URLs works against
   the provenance standard.
2. ~~Before the next recapture wave, decide how masters leave normal Git history:
   Git LFS or externally stored masters with reproducible derivative
   generation. Separately decide whether to purge the previously exposed
   business and verification datasets from history; repository privacy does
   not remove the earlier exposure.~~ **Done 31 July 2026** — masters stay
   git-ignored under `research/evidence/`; sensitive blobs
   were purged from history with `tools/purge-sensitive-git-history.sh`.
   Recorded in [`docs/adr/0003-master-storage-and-history-purge.md`](docs/adr/0003-master-storage-and-history-purge.md).
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
   scripts or `tools/lib/`, then clear disposable probes instead of letting
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
