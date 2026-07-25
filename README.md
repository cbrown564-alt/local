# Mourne Made

A working Astro site for a local digital studio serving Dundrum and Newcastle, County Down. The first complete loop lets a visitor browse a concept transformation, compare the before and after opening screens, reveal the design reasoning, and submit a no-obligation before-and-after request.

## Run locally

```powershell
pnpm install
pnpm dev
```

Production check:

```powershell
pnpm build
```

The build starts by checking every slug in the public transformation list
against `research/concept-reviews/releases.json`. Run the deliberately invalid
release fixture and the checker's focused self-test with:

```powershell
$env:CONCEPT_RELEASES_PATH = "scripts/fixtures/concept-reviews-invalid.json"
pnpm build # expected to fail before Astro runs
Remove-Item Env:CONCEPT_RELEASES_PATH
pnpm test:reviews
```

Regenerate responsive image and video derivatives after changing a capture:

```powershell
pnpm optimize:media
pnpm test:media     # run while pnpm preview serves 127.0.0.1:4321
```

## Main routes

- `/` — product-stage landing page (before/after first; place belonging next)
- `/prototypes/home/` — internal homepage alternatives explored before shipping Product Stage
- `/prototypes/chamber/` — internal full-site exploration for Newcastle Chamber (research + three multi-page directions)
- `research/chamber-website-brief.md` — chamber website best-practice brief and peer examples
- `/transformations/` — public concept index
- `/transformations/<slug>/` — generated for slugs that pass the four
  publication checks in `research/concept-reviews/publication.json`
- `/about/` — local and community commitment
- `/request/` — request form with error and success states
- `/privacy/` — plain-language privacy notice linked at the point of collection
- `/concepts/<slug>/` — standalone proposed screens used in the comparisons
- `/concepts/newcastle-chamber/` — full linked Chamber concept (Home · Members · Events · Join · About · Contact)

`src/pages/transformations/[slug].astro` renders public case studies from the
public slug list in `src/data/transformations.ts` and the shared records in
`src/data/transformation-details.ts`. Unreleased records remain in
`transformationCandidates` so internal concept routes keep their names and
towns without becoming public. Standalone concepts use
`src/layouts/ConceptLayout.astro` for their metadata, disclosure, case-study
return and pre-filled claim action while retaining their subject-specific
visual identity. Shared concept chrome lives in `src/styles/concept-shell.css`;
identity sheets provide navigation tokens and the genuinely distinct page
rules.

The request form posts to the Vercel Function at `/api/request`, which sends the
submission to the configured inbox. Concept work is labelled as independent
and uncommissioned. Concept and prototype routes are intentionally omitted from
the public sitemap; concept routes are `noindex`, and prototype routes are
disallowed in `robots.txt`.

## Vercel request email

The request route sends mail through Gmail with an app password. Never add a Gmail password or app password to this repository.

1. Turn on 2-Step Verification for the sending Google account, then create a Google app password for Mourne Made.
2. In the Vercel project, add these environment variables:
   - `GMAIL_USER` — the Gmail address used to send the notification
   - `GMAIL_APP_PASSWORD` — the Google app password
   - `REQUEST_TO_EMAIL` — the inbox that receives requests (defaults to `GMAIL_USER`)
3. Redeploy after adding or changing the variables.

Validate the endpoint's input handling locally without sending an email:

```powershell
pnpm test:request
```

To exercise actual delivery in a local Vercel runtime, copy `.env.example` to `.env` and supply local values first.

The public endpoint accepts requests without a current website, normalises
scheme-free public links, rejects missing or cross-site origins, and limits
each source address to five attempts per hour. Vercel Web Analytics records
page views plus non-identifying events for comparison interaction, form start,
and successful submission.

## Review backlog

`REVIEW.md` — critical site review (23 July 2026): verified findings with file references and the prioritised P0–P4 backlog plus bold ideas. P0 items are fixed; work the rest top-down and tick them off in the same commit as each fix.

`CONCEPT_DESIGN_REVIEW.md` owns the four publication checks: truthful and
respectful, clear and specific, works as presented, and safe to publish. Public
concepts are recorded in `research/concept-reviews/publication.json`; the build
checks those four answers and any remaining blocker. Optional improvements do
not remove a useful concept from the portfolio.

Seven transformations are currently public. The twelve remaining former public
concepts are queued in `PLAN.md` for short four-check reviews. The retired v1.1
score system and its plan are preserved under `docs/archive/`.

## Research artifacts

- `src/data/businesses.json` — consolidated public-source dataset (379 records)
- `/opportunities` — internal prospecting workbench (`src/workbench/opportunities.astro`); served by `pnpm dev` only and deliberately excluded from production builds because it embeds the full scored dataset
- `research/verifications.json` — accumulated per-business verification knowledge: dated trading evidence, census corrections, shortlist decisions and design tasks
- `research/concept-reviews/releases.schema.json` — compact public release
  schema; `releases.json` holds only committed release decisions
- `scripts/check-concept-reviews.mjs` — public membership, score floor,
  mandatory-gate, 90-day truth expiry and material-source fingerprint check
- `PROSPECTS.md` — human-readable pipeline state: current shortlist, caveats, and the repeatable select → verify → normalise → build → record cycle
- `RESEARCH_METHOD.md` — source and geographic methodology, plus the verification protocol
- `scripts/research-businesses.mjs` — repeatable discovery pipeline
- `scripts/normalize-businesses.mjs` — deterministic deduplication, enrichment, verification merge and scoring; re-run after editing `research/verifications.json`
- `scripts/capture-concept-screens.mjs` — matched before/after screenshots via system Chrome; run `pnpm build && pnpm preview` first, then `node scripts/capture-concept-screens.mjs <slug>`
- `scripts/optimize-public-media.mjs` — derives two responsive WebP sizes and a WebM clip from each committed JPEG/MP4 master
- `scripts/test-media-loading.mjs` — browser assertion that phone-sized WebP sources are lazy and demo video is fetched only after a play click
- `scripts/test-concept-shell.mjs` — auto-discovers every concept route and audits
  desktop and phone rendering for horizontal overflow, clipped header controls,
  broken concept links, inert brand links, undeclared placeholders and browser
  errors. Intentional inactive controls must use
  `href="#" data-concept-placeholder`; real navigation, including every
  homepage wordmark, must use its actual route. Run against `pnpm preview` with
  `pnpm test:concepts`.
- `scripts/test-reviewed-concept-journeys.mjs` — executable repair checks for
  reviewed and representative concepts: Chamber queries change directory
  results, Donard form data survives into an explicit email handoff, Cúpla and
  Mourne provisional claims are disclosed before prices, Kent's illustration
  limitation is visible, and prototype availability exposes an honest end
  state. Add a focused assertion here whenever a review identifies a
  reproducible interaction or claim-ordering defect. Run with
  `pnpm test:reviewed-concepts` against `pnpm preview`.
- `spreadsheet-work/build-business-workbook.mjs` — workbook builder and checks
