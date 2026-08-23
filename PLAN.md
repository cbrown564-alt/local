# Plan

Current working plan for Mourne Made. `PROSPECTS.md` owns pipeline state,
including the public, withdrawn, retired and held lists. The publication
standard lives in `docs/CONCEPT_DESIGN_REVIEW.md`. Historical milestone detail and
the retired v1.1 review process are preserved in
[`docs/archive/plan-before-publication-reset-2026-07-25.md`](docs/archive/plan-before-publication-reset-2026-07-25.md)
and in the commit history.

Snapshot: 3 August 2026. 28 transformations are public. The Buck's Head has
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

## New representative-prototype sequence — decided 9 August 2026

The next creative exploration is three forms built in order. This does not add
businesses to the public portfolio, change the first-wave outreach list or
create evidence of demand.

1. Build the pure **owner’s operating page** from
   [`docs/owners-operating-page-spec.md`](docs/owners-operating-page-spec.md): a
   new synthetic subject, one complete phone-first upkeep loop and one complete
   visitor request loop. Start from a blank canvas; existing concepts supply
   operational lessons, not layouts or identity.
2. After that loop is implemented and reviewed, build the pure **impossible
   local website** from
   [`docs/impossible-local-website-spec.md`](docs/impossible-local-website-spec.md):
   a new synthetic subject whose real place and trade structure the whole
   experience. It must not extend or reskin the existing Mourne Cycles, Lit Town
   or Shore work.
3. Do not build the combination until both pure forms meet their specifications.
   [`docs/owner-operated-impossible-site-brief.md`](docs/owner-operated-impossible-site-brief.md)
   owns the entry gate and the first combined slice.

These are representative prototypes under `docs/CONTEXT.md`, not pilots. Their
purpose is to reveal what a local business could work towards beyond the
current grounded concept portfolio.

## 1. Restore a trustworthy verification baseline — done 28 July 2026

**Sections 1, 1a and 1b describe a suite that was retired on 4 August 2026.**
They are kept as the record of what was built and why, but every `test:` name
below except `test:request` has since been deleted. Section 1c has the
replacement, and the table of what is no longer covered.

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

## 1c. Restore the run-every-suite baseline — done 6 August 2026

Sections 1, 1a and 1b describe a suite that no longer exists. On 4 August 2026,
commit `5c23a5b` removed the Puppeteer journey orchestrator and eleven browser
suites: the full run took 45+ minutes in GitHub Actions and often timed out
after the tests had passed, because the preview server never shut down.
Pre-first-sale, that cost was not justified, and the decision stands. Static
per-page pins reading `dist/` have since replaced most of the coverage.

What did not survive the simplification, and is now repaired:

1. **Abort-on-first-failure came back.** `pnpm test` was re-chained with `&&`,
   undoing section 1a item 5 — the fix made because a single failure had once
   hidden four suites the plan recorded as green. `tools/test/run-verification.mjs`
   is restored, without the preview server no suite needs any more: it builds
   once, then runs all twelve and reports `N of 12`. The build stays fail-fast,
   since every suite reads `dist/`.
2. **The orphan-media scan was running nowhere.** `pnpm build` calls
   `check-public-assets.mjs` without `--orphans`; the `--orphans` variant lived
   only in `pnpm test:public-assets`, which nothing invoked. It is now a suite
   in the runner, and section 6 item 1 has since given it teeth.

3. **`test:source-attribution` was deleted the day after it was written.**
   Section 3 item 4 cites it as walking the printed-QR path end to end, and it
   went with the browser suites on 4 August. Rebuilt 6 August as
   `tools/test/test-source-attribution.ts`: static checks plus a real
   invocation of the endpoint, no browser. It pins that every sheet's slug is
   published, that the committed QR artwork re-encodes to the URL the code
   builds today, that the print page derives that URL rather than writing it
   out, that the claim hop's carry regex accepts every sheet's source, that
   the built pages still carry `data-claim-link` and the form's hidden field,
   that each source reaches the notification email as itself, and that the
   source field is wide enough to hold it. Coverage is driven by `oneSheets`,
   so a new sheet cannot be added uncovered.

   Each assertion was confirmed to fail under mutation before the check was
   wired in — section 1a found two checks that could not fail, and a green
   suite is worth nothing until its failure is demonstrated.

`pnpm test` was recorded as 13/13 here on 6 August 2026. The runner is now
seventeen post-build suites (`tools/test/run-verification.mjs`). Treat the
runner as truth; do not cite 13/13 as current.

### What the retired suites covered, and what does not replace it

Sections 1, 1a and 1b name these as evidence. They no longer exist. Where a
row says nothing replaces it, that is a real gap and not an oversight — record
it here rather than let a doc go on citing a green suite that cannot run.

| Retired suite | What it held | Now |
| --- | --- | --- |
| `test:concepts` | Shared shell geometry and header-label wrapping across every concept route, in a browser | Nothing. The 1b header-wrap defect would not be caught today |
| `test:reviewed-concepts` | Per-concept publication evidence: disclosure of generated imagery, responsive derivatives, first-viewport rules | Partly `test:reviews` (publication records) and `test:public-assets`, both static |
| `test:shell-home` | The homepage claim-door link, and the load sweep's reduced-motion and takeover behaviour | Decided 20 August 2026: `/transformations/` is the door. Homepage claim-door comment removed. Load-sweep behaviour still unpinned. |
| `test:media` | No reel source requested before activation, WebM preferred, reduced-motion opt-in, keyboard play/pause | Nothing |
| `test:enniskeen` | The flagship's day-part swap, grade, map labels and disclosure, timeline and pull-quote | Nothing. Enniskeen is the batch-two flagship |
| `test:bucks-head`, `test:dundrum-inn`, `test:scopers` | Per-concept journey pins | `test:scopers` has no successor; the other two are unreplaced |
| `test:source-attribution` | The printed-QR chain, in a browser | Rebuilt 6 August without the browser (item 3 above) |

Nine per-page pins exist for concepts elevated since 4 August — Hugh McCann's,
Cúpla, Castle Farm, Newcastle Dental, Kent Amusements, Kelly McEvoy & Brown,
Tool Centre, Painted Earth and the fault walk — so the coverage that came back
is the coverage that was rewritten, not the coverage that was lost.

The live scan-to-inbox hop is section 3 item 6 and still has to be done by
hand.

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
   walks the whole path, and an unpublished slug fails the build rather than
   printing a QR that scans to a 404. (That suite was deleted on 4 August, a
   day after this item was written, and rebuilt without the browser on
   6 August — section 1c item 3. It reaches the endpoint, not the inbox;
   item 6 below is what closes that gap.)
5. ~~Rebuild the PDFs, inspect the rendered pages and scan every QR from the
   rendered artwork. Check the destination, business name, town, disclosure,
   contact route and trim-safe layout.~~ **Done 6 August 2026, with one
   question left for the walk-in.** Both sheets rebuilt and all four pages
   inspected as rendered. Both QRs were decoded from the rasterised PDF rather
   than from the source SVG — the artwork the printer receives — and resolve to
   `/transformations/<slug>/?source=onesheet-<slug>`. Town, disclosure, contact
   route and margins check out on both; the reverse disclosure sits above the
   footer on both, so the 4 August overlap has not returned.

   **The Scopers sheet promised a "one-minute film".** The page its QR opens
   carries an eleven-second after clip, which its own aria-label calls a
   ten-second visit. A printed promise of something four times longer than
   what exists, on the first thing an owner is handed. Corrected to "the
   ten-second walk-through" and the PDF rebuilt. Cúpla's equivalent claim —
   "and bilingual menu" — was checked and is true: `/concepts/cupla/menu/`
   exists and is bilingual.

   **The name is "Scopers", settled 6 August 2026 by the project owner.** The
   apostrophe in "See more from Scoper's" is Facebook's own possessive
   phrasing in the walk notes, not the trading name. The sheet,
   `research/pipeline/verifications.json` and `businesses.json` already agree
   and need no change. Do not reopen this at the door.
6. ~~Before printing, make one production submission through a one-sheet link
   and verify that the notification arriving in the inbox carries the expected
   `source`. A 200 response or browser success message alone is not enough.~~
   **Done 6 August 2026 by the project owner**, through the Hotel Enniskeen
   sheet's link. The notification arrived carrying
   `Came from: Printed one-sheet (Hotel Enniskeen)`, so the live hop is proven
   where it matters: production Gmail credentials deliver to the watched inbox,
   the deployed form submits `source` as a real field, and the endpoint reads it
   back out as itself rather than as `Direct` or `Unrecognised`. This is the gate
   [`docs/adr/0002`](docs/adr/0002-printed-qr-attribution-contract.md) puts in
   front of the print run.

   **Verified through Enniskeen, not through Scopers or Cúpla.** One live
   submission is what this item asks for, and the per-sheet differences it does
   not cover are the ones a script covers better:
   `pnpm test:source-attribution` drives a submission per sheet through
   `createRequestHandler`, captures the mail object and asserts the body line
   for each of the four, and checks the built `dist/request/index.html` still
   carries the hidden `source` field. So the parts that vary by sheet are
   pinned, and the part that cannot be faked locally — a real deployment
   reaching a real inbox — was done once, which is the right division.

   Worth knowing about the same day: production submissions were 500ing until
   the afternoon of 6 August, because Vercel compiled `api/request.ts` but left
   a runtime import of `transformations.ts` that Node could not load
   (`f1e4cec`); the slug allow-list moved to `api/public-transformation-slugs.mjs`
   to fix it. The form was then reshaped twice more the same evening
   (`695703c`, `90fb240`). Whichever order the live check fell in, the current
   build is pinned by the suite above rather than by that afternoon's memory.

   Two protections finished on 4 August remain inert unless configured, and
   they are not covered by the check above: without
   `KV_REST_API_URL`/`KV_REST_API_TOKEN` the rate limit is per-instance rather
   than shared, and without `REQUEST_ALERT_WEBHOOK` a failed delivery is logged
   and nothing else. Both fail quietly, so an unconfigured deployment looks
   healthy while providing neither. `README.md` documents all three; the
   omission was in `.env.example`, the file actually copied to `.env`, which
   listed only the Gmail trio until 10 August. Confirm both are set in the
   production environment — a delivered test email proves the Gmail trio, and
   nothing else.
7. Print only the two verified sheets — now gated on section 9 items 1 and 2
   (choose the stock and finish; give the artwork bleed and a trim-safe inset)
   rather than on anything in this section.

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

1. ~~Before the next deploy after the baseline repair, remove unreferenced media
   from `public/` or give it an explicit held record and reason in
   `research/image-provenance.md`. Make the asset check fail
   when an orphan has neither outcome. The 28 July review found 36 orphan
   groups; keeping withdrawn bytes at guessable production URLs works against
   the provenance standard.~~ **Done 6 August 2026.** The 36 had become 45 by
   the time the scan was made fatal, 21 of them with no outcome recorded
   anywhere.

   The requirement is now enforced in both of the script's modes rather than
   behind `--orphans`. Splitting it was what let the scan run nowhere at all
   between 4 and 6 August: `pnpm build` called the script without the flag, and
   nothing called it with one.

   Seventeen groups were deleted — 51 files, 5.5 MB, every one a capture of a
   real business's own live website that no page had referenced for days or
   weeks. Holding them was the weaker of the two outcomes this item allows: an
   unused screenshot of a named business still answers at a guessable
   production URL. Four were held with reasons and dates: two dropped Enniskeen
   illustrative visuals, the unbuilt Enniskeen outreach reel, and the
   superseded Painted Earth originals capture.

   Nothing on a page moved. All 36 before/after references across the eighteen
   public transformations still resolve, and none of the deleted names appears
   anywhere in `src/`.
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

**Done 6 August 2026 — the theme distillation.** Ten recurring faults (T1–T10)
derived from the ~60 documented before-states in
`src/site/data/transformation-details.ts` across twenty concepts, each with a
key message, a self-contained scene, a storyboard, an Omni prompt and edit
turns, plus the refinement pass recording what was cut and why:
[`research/film/studio-recurring-themes.md`](research/film/studio-recurring-themes.md).
Locked grammar is **object theatre** — no faces, no hands, no lettering — which
is what keeps the scenes honest (no invented owners, no mockable fake brands)
and generalisable. The S6 "template sludge" idea was cut: staging ugliness
argues for prettiness, which the elevation method disowns.

**Put to work, 6 August 2026 — the taxonomy is not only film.** Three surfaces
now consume it:

- **Upstream into research.** `docs/RESEARCH_METHOD.md` gains a fault-taxonomy
  section and a fifth verification step: record which of the ten a candidate's
  public surface shows, dated, in a `faults` array on the verification record.
  A coarse gap class becomes the pitch sentence, and the three case-study notes
  get written from the record instead of rediscovered per concept. T2, T5 and T9
  already fall out of `probe-sites.mjs`; T3, T4, T6, T7 and T10 need a human
  opening the page.
- **Print outreach.** [`research/outreach-postcards.md`](research/outreach-postcards.md)
  — ten postcards, one per theme, sent only where that fault is actually
  recorded. Front is the clip's departure frame; the reverse leads with a true
  good thing about the recipient *before* the page fault, dated and checkable.
- **A public page.** [`research/what-we-look-for-brief.md`](research/what-we-look-for-brief.md)
  — `/where-it-fails/`, the faults staged as invented wireframes with a walkable
  errand each ("find out if they're open now"), the visitor's own taps counted.
  Not a before/after slider: that control belongs to the measured transformation
  pages, and every one of the ten faults is structural rather than aesthetic. No
  real business's fault appears on a public surface.

Two constraints propagate to all three: the per-theme tallies count what the
studio wrote up in its own case-study notes (three per concept, a page-template
artifact) and are never a prevalence claim about websites; and no score, grade
or count is ever applied to a named business.

**Mapped, 6 August 2026 — the fault walk is one of three.** Working the page
brief surfaced two sibling answers to the same underlying brief — a public
surface for what the studio does and what a good local site is made of. The
assembly ([`research/how-a-site-goes-together-brief.md`](research/how-a-site-goes-together-brief.md))
builds one wireframe in front of the visitor, each layer a theme answered in
the method's build order, halting at the swap test where the generic form runs
out. The shapes ([`research/five-shapes-brief.md`](research/five-shapes-brief.md))
draw the elevation method's five shapes as an annotated pattern book —
explicitly not templates. The map, the tension between "one idealised form"
and "no single form", and its resolution is
[`research/three-ways-to-describe-the-work.md`](research/three-ways-to-describe-the-work.md).
Order: fault walk first, shapes second, assembly last; none ships ahead of the
request path.

**Done 6 August 2026 — `/where-it-fails/` is public.** The fault-walk study
shipped as a main page: page-order numbering 1–10 (internal theme ids off-stage),
a task strip of the jobs a stranger might try, guest-facing copy without studio
repo paths, and links from the site header and footer. Watch outreach before
deciding whether the shapes and assembly briefs become pages.

**Curated 7 August 2026 — exploratory generation is closed.** The contact-sheet
and frame-sequence review selected T01 and T04 as the two fault films, X18 as
the offer film to rework, X19 as page-only scope support, and X25 T04/T07 as
the first print proofs with T10 as a hand-delivered leave-behind. X13 and X16
survive as distribution/DOM rules; X22 survives in the existing interactive,
not as film. The detailed kill list and asset evidence are in
[`research/film/clips/studio/MANIFEST.md`](research/film/clips/studio/MANIFEST.md).
No synthetic studio voice advances from the bakeoff.

**Sequence proof implemented 7 August 2026:**
[`studio-reel-v0.mp4`](research/film/clips/studio/studio-reel-v0.mp4) is the
26-second silent T01 → T04 → provisional X18 assembly. Media probing and frame
inspection verified its order, format, duration and lack of audio. It is an
internal pacing proof, not corrected production media.

**Next pick-up:** review that sequence as a whole and print X25 T04/T07 at A6.
Correct the T01/T04 generation faults before a page trial. T01's mail use needs
a face-to-face tone check; X17 remains a research interaction until an ear
test shows it preserves owner dignity. Do not generate the retired slate to
fill the old matrix.

## 9. The paper object — a print system worth handing over (opened 10 August 2026)

The most persuasive thing this studio can do is put something on paper into an
owner's hands. It meets a busy local decision-maker in a medium they already
trust, it survives being put in a drawer and found again, and on a walk it does
the job the website does for a visitor who found us on their own. It is also
the first physical evidence that the studio exists.

This workstream has been under-thought, and the shape of the gap is specific:
**everything the repository decides about paper is layout, and all of it is
decided in CSS.** There are four renderable A4 sheets, a shared stylesheet, a
QR contract enforced at build time and a rendering script with real guards. What
no file decides is the *object* — stock, weight, finish, format family, bleed,
ink, who prints it, what it costs. Premium in print is almost entirely material
and restraint, and none of it is reachable from a stylesheet. A well-set sheet
on 100gsm office paper from a desktop laser reads as a flyer no matter how good
the typography is, and the two doors in the first wave are the two best doors
we have.

What already exists and is not reopened here:

- **[`docs/adr/0001`](docs/adr/0001-personalised-one-sheets-over-door-drop.md)** —
  personalised, hand-delivered, no untargeted door-drop. Stands.
- **[`docs/adr/0002`](docs/adr/0002-printed-qr-attribution-contract.md)** — the
  printed-QR attribution contract, derived once in
  `src/site/data/onesheets.ts` and walked by `pnpm test:source-attribution`.
  Stands, and every new printed format inherits it.
- **The four A4 sheets** in `src/workbench/print/`, on `src/site/styles/onesheet.css`,
  rendered by `tools/print/print-onesheet.mjs`. The script's content guards —
  destination, business name, town, contact route, uncommissioned disclosure,
  A4 overflow — are good and stay.
- **[`research/outreach-postcards.md`](research/outreach-postcards.md)** — ten
  cards, the selection rule, the tone rules, the reverse hierarchy, and the only
  material decision recorded anywhere in the repository: A6, 350gsm, matte.

1. **Decide the object, and write the control doc.** One place —
   `research/print-system.md` — absorbing the material half of the three
   sources above and deciding: the format family; one stock and weight per
   format; finish; and the supplier and route (short-run digital on good
   uncoated, trimmed, is the honest choice at these quantities — litho cannot
   be justified at two sheets, and a box of 500 of anything before a
   conversation has happened is section 6's problem in paper form). Uncoated
   over gloss, because gloss is the junk-mail signal that PRODUCT.md's
   anti-references warn against; the object should feel like stationery from a
   working studio, not like a leaflet. Record cost per piece so paper falls
   under the same cost discipline as everything else.

   **This gates section 3 item 7** — those two sheets are going to be printed
   on something, and nothing has chosen what.
2. **Give the artwork bleed and a trim-safe inset.** `onesheet.css` sets
   `@page { size: A4 }` at exactly 210 × 297mm and `print-onesheet.mjs` renders
   `format: "A4"` with zero margins, so the artwork is trim-size with **no
   bleed at all** — while the sheet puts ink at the edge (the wordmark block,
   the brand rule, the accent band). A commercial printer needs 3mm bleed and
   will reject or silently scale it; a desktop printer will inset the whole
   page by its own unprintable margin and shift every millimetre measurement on
   it. Move to a bleed-aware page box with a declared trim-safe content inset,
   crop marks per the supplier's spec, and the PDF box set to match.

   **This gates any print run, including the two pending sheets**, and it is
   the cheapest item in the section.
3. **Decide colour management.** The PDFs are rendered sRGB
   (`--force-color-profile=srgb`) with no CMYK intent. Either hand the supplier
   RGB and accept their conversion, or convert against a named profile — but
   decide, and check the two studio inks (`#132029`, `#e0c14d`) on the chosen
   uncoated stock in a physical proof before any run. An accent yellow that
   goes muddy on uncoated is exactly the difference between premium and cheap,
   and it is invisible on screen.
4. **Solve the before-and-after on paper.** This is the workstream's central
   design problem and it has never been named. The studio's whole argument is
   an interaction — a slider, an errand walk with counted taps — and paper
   cannot slide. The current sheets answer it with a side-by-side comparison
   slot, which is the weakest form available: two small screenshots of
   websites, on the one piece of evidence that is supposed to make an owner
   feel something. Candidates, to be judged from physical proofs rather than on
   screen: the errand walk printed as the two-column taps-and-screens the
   transformation pages already model in `TransformationErrand`; a fold that
   withholds the after until the reader opens it; or one large after with the
   before at thumbnail scale, on the argument that the after is what we want
   remembered. Sequencing on paper is a fold, and a fold is a format decision —
   so this and item 1 answer each other.
5. **Build a print design system rather than converted screen CSS.** A type
   scale in points with leading chosen for paper, a millimetre grid, a minimum
   size for the disclosure and small print that an owner over fifty can
   actually read at arm's length (9pt today, unverified in the hand), and a
   wordmark that holds in one ink at small scale. Extract the shared geometry
   out of `onesheet.css` and `bucks-head-onesheet.css` the way section 6 item 3
   asks for the concept pages: one shared print system, subject-specific
   character on top, no flattening of four sheets into one template.
6. **Decide the physical signature — the character.** One restrained set of
   choices, repeated until it is recognisable: one accent ink, one uncoated
   stock, one format family, and the object-theatre grammar already locked for
   the postcard fronts in
   [`research/film/studio-recurring-themes.md`](research/film/studio-recurring-themes.md).
   Explicitly rejected: gloss, spot UV, foil, rounded corners and anything that
   reads as agency swagger. The character has to come from restraint and from
   the fact that the piece names a real place and shows real work, because
   those are the two things a generic flyer cannot copy.
7. **Turn the postcards into artwork.** `research/outreach-postcards.md` is a
   finished brief with nothing built. Produce the T4 and T7 fronts and reverses
   as real artwork at 105 × 148mm plus bleed on the system from item 5, and
   print the two A6 proofs the storytelling workstream already asked for. The
   selection rule is load-bearing and survives into production: send only a
   fault that business's own record holds, dated. T10 stays a hand-delivered
   leave-behind; T1 stays held for a face-to-face tone check.
8. **Extend verification to the object.** Add to `print-onesheet.mjs` and its
   postcard equivalent: a bleed box is present, no load-bearing content sits
   inside the trim-safe inset, no type falls under the minimum size, and any
   generated still in print artwork has a provenance entry — print is not an
   exemption from the media guard. Then the three human gates no script
   replaces: a physical proof inspected at actual size, a phone scan from the
   printed piece rather than the PDF, and the source-attributed inbox delivery
   in section 3 item 6.

   The precedent for taking this seriously is on the site already. Both the
   sheet routes and the share-card routes are dev-only, so they can only be
   captured from `pnpm dev` — and on 10 August every committed Open Graph card
   in `public/media/og/` was found to have Astro's development toolbar
   screenshotted into it, `studio.jpg` included: the card that appears when
   anyone shares the site in a group chat. Nothing failed, because nothing
   looked. `tools/lib/dev-chrome.mjs` now strips the toolbar and both capture
   tools fail if it survives. Artwork rendered from a development server picks
   up whatever the development server adds.

Constraints:

1. **Section 3 outranks this section, but items 1 and 2 are inside it, not
   competing with it.** They are the unmade decisions standing between the two
   verified sheets and a print run, so they come first and they are small. The
   layout and format work in items 4–6 waits behind the walk and is better for
   it: two conversations will teach more about what the paper must carry than
   another screen review will.
2. **Every honesty rule that governs the site governs the paper.** No invented
   client, testimonial or result; no named or implied competitor; no score,
   grade or count applied to a named business; the fault stated about the page
   and never the owner. Generated imagery in print needs its provenance entry
   before the artwork is committed and a visible disclosure on the piece.
3. **The independent-concept label survives onto paper**, in type a reader will
   actually see — not in small print sized to be missed.

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
