# Site review — 23 July 2026

Critical review of the deployed site and codebase, run before the M5 outreach wave.
Method: full-page renders of the key routes at 1440px and 390px via headless Chrome,
plus three parallel code reviews (conversion funnel and shell; transformations and
concepts system; data, ops and build health). Work the backlog below top-down;
tick items here and update the linked docs in the same commit as each fix.

---

## P0 — Critical (both fixed 23 July 2026, commit `e6440a9`)

- [x] **GitHub repo was public** while `src/data/businesses.json` and
  `research/verifications.json` carry 379 real named businesses with phones,
  emails, `digitalNeedScore`, `paymentLikelihoodScore` and candid verdicts.
  Repo switched to private (verified via API). Treat the dataset as previously
  exposed — history was public until today. Optional belt-and-braces: purge the
  two files from git history.
- [x] **`/opportunities/` shipped the full scored dataset** in public static
  HTML (439 KB, view-source plain text, `noindex` only). The page now lives at
  `src/workbench/opportunities.astro` and is injected as a route only under
  `astro dev` (`astro.config.mjs`); production build emits nothing and the live
  route 404s (verified). Workbench remains at `localhost:4321/opportunities`.

## P1 — Silent lead-killers (fix before any outreach goes out)

- [x] **Required URL field blocks the target audience.** Fixed 23 July 2026:
  the field is optional, scheme-free links are normalised to HTTPS, and both
  the form and endpoint accept businesses with no current public page.
  Previously, `request.astro:26` required a valid `http(s)` URL and
  `api/request.ts:60-64` re-validated it, even though core prospects have no
  website and `facebook.com/mybiz` without a scheme was rejected.
- [x] **Honeypot named `company`.** Fixed 23 July 2026: renamed to a
  project-specific field that does not resemble organisation or contact data.
  Previously (`request.astro:16-19`), browsers and
  password managers autofill organisation fields despite `autocomplete="off"`;
  an autofilled real lead got a fake success and was silently dropped.
- [x] **No rate limiting on `api/request.ts`.** Fixed 23 July 2026: the
  endpoint now allows five requests per source address per hour, returns
  standard limit/retry headers, and rejects requests with a missing or
  mismatched origin. Previously, the origin check was skipped
  when no `Origin` header is present (`api/request.ts:26`). Abuse burns the
  Gmail ~500/day cap and can lock the sending account mid-campaign.
- [x] **No analytics anywhere.** Fixed 23 July 2026: added privacy-friendly
  Vercel Web Analytics with custom events for comparison interaction, request
  form start, and successful submission.
- [ ] **Confirm the deployed form actually delivers.** `PLAN.md` (~L141) still
  says the flow is local-only; `api/request.ts` is fully wired but local `.env`
  lacks the Gmail vars. Verify the Vercel env vars, send a test submission on
  production, then correct PLAN.md.
- [ ] **`mourneandmain.co.uk` does not resolve.** `astro.config.mjs` claims it
  but the domain is not attached to the Vercel project; the live site is only
  `local-zeta-seven.vercel.app`. Attach (or buy) the domain before anything is
  printed.

## P2 — Trust and copy

- [ ] **The site is anonymous.** No name, face, phone, email or address
  anywhere. Add a founder note to `/about/` ("I'm …, from Dundrum") and direct
  contact routes (email; consider WhatsApp — this audience lives on phones and
  Facebook, not contact forms).
- [ ] **No affordability signal.** The belief ladder's "affordable and
  low-risk" rung is never addressed; add a price anchor ("one-screen sites from
  £X") or an FAQ covering cost, hosting, timeline, "is the concept really
  free?".
- [ ] **"379 public local listings reviewed so far"** (`index.astro:104`) is
  the largest text on the homepage and reads as surveillance, not craft — and
  it advertises the scoring operation from P0. Replace with a
  generosity-framed proof (e.g. concepts built, towns covered).
- [ ] Hero h1 "Fancy a digital makeover?" is charming but generic; PRODUCT.md's
  10-second line is "see what your local business could become online" — the
  h1 should carry *your business*, *free*, *personalised*.
- [ ] Mission copy ("Good digital work should reach the whole community")
  interrupts mid-funnel; move the community commitment below the closing CTA or
  onto `/about/`.
- [ ] **Privacy page missing** — the form collects personal data with a single
  reassurance line and no policy (UK GDPR). Add `/privacy/` and link it from
  the form.

## P3 — Concept and comparison system (the scaling wall)

- [ ] **Concept pages dead-end.** Concept home pages have no link back to the
  case study or to Mourne & Main, and carry 5–12 `href="#"` fake nav links
  each. Add a persistent "Independent concept by Mourne & Main — is this your
  business? →" banner, and make dead links visibly inert or real.
- [ ] **`/concepts/*` pages are indexable and name real businesses** — some
  embed the real phone/email (`concepts/donard-veterinary.astro`). They bypass
  BaseLayout, so they have no `noindex`, no meta. Add noindex (or a shared
  concept head) before search engines associate them with the businesses.
- [ ] **One CSS file per concept re-implements the same skeleton** — 451–712
  lines each with only tokens and copy differing (`concept-*.css`, ~5,000
  lines total). Build `ConceptLayout.astro` + shared primitives driven by CSS
  custom properties; new concepts become a token block plus content.
- [ ] **Comparison pages are hand-built** (~85–180 lines each) with alt text
  duplicated 2–3× between `transformations.ts` and the page. Move notes,
  sources, media paths and headline into the data model and collapse to a
  single `transformations/[slug].astro`.
- [ ] Add prev/next navigation between transformations; detail pages currently
  dead-end.
- [ ] Add `robots.txt` (disallow `/prototypes/`) and `@astrojs/sitemap` for the
  public pages; add canonicals, favicon, `LocalBusiness` JSON-LD, and a Google
  Business Profile. Decide whether `/prototypes/chamber/` should stay linked
  from the public Chamber transformation page.

## P4 — Performance and media

- [ ] **Transformations index eager-loads ~20 comparison images (~4 MB).**
  `BeforeAfter.astro:26-28` sets no `loading` attribute; add `loading="lazy"`
  below the fold. The index is ~12,000px tall on phone — consider a card grid
  linking to detail pages instead of ten stacked sliders.
- [ ] **`MotionCompare` fetches both clips on scroll** (`MotionCompare.astro:
  115-123`) — up to 4.1 MB unprompted (castle-farm). Require a tap to play, or
  play sequentially.
- [ ] **All media is JPG/MP4** — no webp/avif, no `srcset`, no WebM. 22 MB of
  `public/`; before-videos up to 2.8 MB. Transcode and add responsive sources;
  rural mobile is the audience.
- [ ] Pin dependency versions (`astro`, `@astrojs/check`, `nodemailer`,
  `typescript` are `"latest"`/floating in `package.json`).
- [ ] Script cleanup: `capture-home-alts.mjs` is Linux-only dead code on this
  machine; `capture-concept-screens.mjs` duplicates ~80% of
  `capture-concept-media.mjs`; factor the shared Chrome-detection block.

## Bold ideas (the review's exploratory recommendations)

1. **Flip the funnel from inbound to claim.** The concepts already exist before
   anyone asks — make "Is this your business? Claim this concept" the primary
   CTA on every concept and comparison page, with the request form pre-filled
   from query params.
2. **Per-business share links with generated OG images** where the preview card
   is the before/after split — engineered for Dundrum/Newcastle Facebook
   groups, which is where this audience actually is. Auto-wiping slider clips
   (the ffmpeg pipeline exists) are the feed-video version.
3. **QR postcards (M3) landing on `/transformations/<slug>/`** with the form
   pre-filled — the honest sourcing block already on each page makes this warm
   rather than spammy.
4. **Embed the live concept in a device frame** on comparison pages instead of
   a flat after-JPG — the mechanic becomes "touch it".
5. **A town coverage map** pinning every concept — replaces the "379 reviewed"
   stat with proof that reads as investment in the place, and doubles as
   sector-coverage signalling.
6. **Thumbnails, not text, for the homepage portfolio strip** — a visual
   product deserves a visual portfolio.

## What is genuinely strong (keep)

- The three-layer honesty labelling (index disclosure, fixed concept badge,
  per-page "Sources & limits" with dated citations) — a real differentiator.
- The `BeforeAfter` comparator: keyboard-operable, pinned design notes,
  mobile toggle.
- Focus-visible states, skip link, reduced-motion handling, form live regions.
- Concept visual quality — each carries the subject's identity, never the
  studio's, exactly as DESIGN.md prescribes.
