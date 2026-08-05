# Plan

Current working plan for Mourne Made. `PROSPECTS.md` owns pipeline state,
including the public, withdrawn, retired and held lists. The publication
standard lives in `docs/CONCEPT_DESIGN_REVIEW.md`. Historical milestone detail and
the retired v1.1 review process are preserved in
[`docs/archive/plan-before-publication-reset-2026-07-25.md`](docs/archive/plan-before-publication-reset-2026-07-25.md)
and in the commit history.

Snapshot: 3 August 2026. Eighteen transformations are public. The Buck's Head has
replied to the first outreach: it already has a new website built and plans to
launch it when its accommodation is ready. Both open publication decisions are
now closed and both published — see section 2.

The verification baseline is green again. `pnpm test` was 7/7 on 28 July, fell
to 6 of 9 under the 31 July – 2 August design wave, and was repaired on
3 August — see section 1b. Remaining `@vercel/node` advisories are recorded in
`docs/dependency-advisories.md`.

No business has approved the concept work and no client result has been
measured. The ordered plan is therefore: protect the request path, finish the
two remaining outreach sheets and learn from real conversations before expanding
the portfolio or offer.

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

## 1b. Repair the baseline the design wave broke — done 3 August 2026

A full run on 3 August 2026 found 6 of 9 suites passing, down from 7/7 on
28 July. Every failure came from the 31 July – 2 August design wave. Repaired in
the same pass, before either publication decision was recorded:

1. **`test:shell-home`** — the homepage redesign dropped the claim-door link
   from the hero, and its CSS with it. A business owner landing on the homepage
   had no route to the concept already made for them, only the request form for
   work that already existed. Restored to `.home-hero-action` with a comment
   saying why it is there.
2. **`test:reviewed-concepts`** — Mourne Cycles served its three 1024px bike
   masters to a 390px viewport although the `-640.webp` derivatives existed; the
   panel images now use `ResponsiveImage` like the rest of the concept. The
   Dundrum Inn blue-hour hero plate, added 1 August, had no provenance entry;
   recorded in `research/image-provenance.md` with the reference boundary it
   inherits from the daytime plate.
3. **`test:concepts`** — 23 failures, all reported as `wrapped header labels`,
   and two different things were hiding under the one message:
   - **Eighteen were false positives.** The check exempted a header link
     containing `span, small, strong, em, svg` as a deliberate brand lockup but
     not one containing `img`, so Kelly, McEvoy & Brown and Douglas & Cromie
     were flagged for their logos. Painted Earth's nav links measured over 1.55
     lines because of an underline drawn as `::after`. The exemption now covers
     `img`, and a single-line label is confirmed against its own text rects
     before the height maths runs.
   - **Five were real.** Hotel Enniskeen's header genuinely wrapped at 1100px —
     "The estate", "Things to do", the phone number and "Book a room" each broke
     onto two lines, on all five routes. Fixed with a mid-width band that
     tightens the type and gaps between the phone breakpoint and full desktop,
     the same treatment Donard Veterinary got on 1 August.

The assertion itself was kept rather than silenced: it caught a real defect on a
flagship concept, on the one prospect the plan deliberately holds back for
batch two.

`pnpm test` is 9/9 green again.

## 2. Close the remaining publication decisions — done 3 August 2026

Both were reviewed against the live site at phone and desktop on 3 August 2026.
Both publish, taking the public portfolio to eighteen. Outcomes and their
evidence are in `research/publication.json`; `PROSPECTS.md` carries the
human-readable version.

### Kelly, McEvoy & Brown — published

Two blockers cleared in sequence. The 27 July identity blocker is repaired: the
concept carries the firm's own mark, its yellow-and-grey palette and two
source-matched project photographs.

The live comparison then found the case-study premise false. A portfolio
"rendered as plain text links beneath a small carousel" is not `kmbni.com`:
its `/portfolio` page is a photographed six-sector grid leading to per-project
pages with their own images, and only the nav dropdown is a text list. This was
the Painted Earth build-day failure repeating — a discovery claim the live site
had outgrown.

The premise now describes the real improvement: on the live site the work opens
one sector at a time and reaching a single building takes four clicks, while the
concept holds all thirteen projects in one register filterable by sector. The
inert "Contact the team" button is replaced by the firm's own published phone
number and email, carried across from its live header.

### Painted Earth — published on the project owner's decision

Recorded as a disagreement rather than settled silently. The review recommended
stopping it as an internal exploration: the shop is a gallery whose strength is
photography of real work by named makers, its catalogue spans 92 makers with no
recorded licence, so every artwork in the concept is a drawn placeholder tile,
and on "is this better than what they already have" the live gallery wins on
imagery.

The project owner's decision was to publish — the tiles are visibly labelled
placeholders, the loop around them carries enough on its own, and asking an
owner to picture their own photography in place of a labelled placeholder is a
small ask. Betty's Better Butters and Douglas & Cromie are public on the same
basis.

The concept stays limited to what happens around original art: collection and
shipping-quote terms before the buying action, and a route on from sold work. It
is not a repair case and must never be presented as one. The business has not
been contacted. If it ever engages, the first improvement to raise is replacing
the placeholders with the shop's own photography.

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

1. ~~Replace the module-level request-rate `Map` with a shared per-source store
   that enforces five attempts in one hour across serverless instances.~~
   **Done 4 August 2026.** Backed by the Upstash-compatible REST API that both
   Vercel KV and Upstash expose, over plain `fetch` — no client dependency in
   a function whose only other job is sending one email. `INCR` then
   `EXPIRE NX`, so the window starts on the first attempt and later attempts
   cannot roll it forward into an hour that never resets.

   Only a salted digest of the caller's address is sent to the store: it
   counts the same caller just as well, and a leak of the store is not a leak
   of who submitted a request. A store outage fails open and logs — this
   endpoint exists to deliver a handful of leads a week from printed sheets,
   and silently dropping a real business's request is worse than an unlimited
   hour. Unconfigured, it falls back to the per-instance map, which is what
   the bare local checkout and CI use.
2. ~~Make a failed delivery visible without logging submitted content.~~
   **Done 4 August 2026.** The structured failure codes are kept and now also
   POST to `REQUEST_ALERT_WEBHOOK` when one is configured — a failed delivery
   is a lead that was typed and lost, and the function log is not somewhere
   anyone is watching. The payload carries the SMTP code and the `source`
   attribution only: never the business, idea, name or email, since routing an
   enquiry through a third-party webhook to announce that the email failed
   would leak the content the alert exists to protect. A webhook that is
   itself down changes nothing the visitor is told.

   The test-facing delivery path was swallowing its error with a bare `catch`,
   so the failure handling the tests exercised was not the failure handling
   that runs. Both paths now report identically. No transactional provider or
   queue yet: first-wave volume does not justify one.
3. ~~Produce one personalised one-sheet for each of the two businesses using
   its current published transformation.~~ **Done 4 August 2026.** Both are
   two A4 pages built on the existing sheet template, from each concept's own
   published case-study notes: `.scratch/print/pdf/scopers-onesheet.pdf` and
   `.scratch/print/pdf/cupla-onesheet.pdf`.

   Each carries a media disclosure written for the owner rather than for the
   record — Scopers' food is drawn, not photographed, and the Cúpla concept
   uses no photographs of the café at all. The Scopers sheet prints no
   supper-club date: their date has moved once already and a printed sheet
   cannot be corrected, so it points at the page that always holds the current
   one.

   Rendering them surfaced two layout defects in the shared sheet stylesheet,
   both fixed and both affecting the existing Enniskeen sheet as well. The
   comparison slot was 88x58mm while every capture is 2530x1420, so
   `object-fit: cover` silently cropped the sides — the concept frame lost its
   logo and the first word of its headline, which is the one thing the sheet
   exists to show. And the reverse footer is an absolutely positioned
   two-column grid, so the disclosure became a third child and overlapped the
   QR block; it now has its own element above the footer.
4. ~~Give every sheet the slug-qualified QR destination required by
   [`docs/adr/0002-printed-qr-attribution-contract.md`](docs/adr/0002-printed-qr-attribution-contract.md):
   `/transformations/<slug>/?source=onesheet-<slug>`.~~ **Done 4 August 2026.**
   The ADR was a decision record with nothing behind it: all three breaks it
   described were still open, plus a fourth it had not reached — `source` was
   not an accepted field in `api/request.ts` at all, so no submission could
   ever have carried one. Item 6 below was therefore not merely unverified but
   impossible. Now: the destination is built once in
   `src/site/data/onesheets.ts` and read by both the artwork and the print
   script, so the printed page and its QR cannot disagree; the transformation
   page carries a scanned `source` across the claim hop; the request form
   submits it as a real field; and the endpoint allow-lists it against
   `publicTransformationSlugs` and prints it in the notification email. An
   unrecognised value is recorded as `unrecognised` rather than rejected —
   attribution is worth less than the lead. `pnpm test:source-attribution`
   walks the whole path in a browser, and an unpublished slug fails the build
   rather than printing a QR that scans to a 404.
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

## 7. Build the sensory system — in parallel with sections 3 and 4

Prototyped 4 August 2026. Eight miniature demonstrations of generated film,
generated voice, real terrain and real-time graphics run at
`/prototypes/showcase/`; the survey behind them and the case for and against
each is `research/sensory-system.md`. Six are approved to build — Rebuild,
Voice, Ridgeline, Film, Depth, Lights — and the implementation plan, its phases
and its gates are [`docs/sensory-system-plan.md`](docs/sensory-system-plan.md).

**This runs in parallel with sections 3 and 4, not behind them** (decided
4 August 2026). It is deliberately not treated as speculative portfolio
expansion: it does not add a concept, restyle a published one, or change the
offer, all of which remain gated on evidence from a real conversation. It
changes how the work we already have is presented, and the outreach wave is
limited by conversations rather than by build capacity.

Three constraints survive that decision:

1. **Section 3 outranks it.** That section protects the request path. If this
   work ever competes with that path — for attention, or for page weight on the
   way to the form — that path wins.
2. **Film needs consent, not sequencing.** A generated film of a real business
   may not be generated at all until that business has agreed in writing. The
   same applies to a splat capture of a real premises. Either gate can open the
   day a business says yes, which may be during section 4 or long after it.
3. **Ridgeline and Lights have a proven mechanism and no agreed end product.**
   Phase 0 of the plan resolves that on paper — as a single `Shore` component
   drawn at three scales, since the skyline and the town lights are the same
   picture — before any production component is written.

Phases 0 and 1 (the `Shore` design resolution, and Rebuild) are independent of
each other and of everything above. Both can start now.

One item from the plan is worth pulling forward on its own merits: "stand-ins
must never deploy" is currently discipline rather than a guard, and the town
films in `public/media/home/` are stand-ins today. A build check that fails when
a `.demo` marker exists for any film referenced from `src/` belongs with the
other publication guards regardless of whether the rest of this section is ever
built.

## 8. Studio storytelling — product showcases & explainers (opened 5 August 2026)

In parallel with sections 3–4 and 7. The free before-and-after and the concept
portfolio prove craft; they do not yet carry the full *why this studio / why
care* story for a busy owner. This workstream builds product showcases and
explainers — claymation, kinetic type, humour, scene stories, audio — using
generated film and voice as accelerators.

Control doc: [`research/studio-storytelling.md`](research/studio-storytelling.md).
Concept Omni theatre stays in `research/film/omni-clip-backlog.md`; town films
stay in `research/film/one-day-made-here.md`. Studio clips land under
`research/film/clips/studio/` and prototype surfaces before any homepage trial.
Request path still wins on attention weight. No invented client results.

**Next pick-up (before burning more studio Omni gens on explainers):** distill
5–10 recurring themes across the redesigned concept sites — problems owners
would recognise on their own websites, generalised into clear self-contained
scenes that make the improvement intuitive and sometimes visceral. Multi-stage
creative work: explore the idea space → craft the key message per theme →
build out scenes → storyboard → refine. Log findings in
`research/studio-storytelling.md` (or a linked brief under `research/film/`).
Only then run format/bakeoff gens against those scenes.

Also queued after that: day-one Omni slate in the control doc (S1–S7 bakeoff),
then a noindex prototype host for the contact sheet.

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
