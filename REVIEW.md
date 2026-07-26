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
- [x] **Confirm the deployed form actually delivers.** Verified 26 July 2026
  after replacing the rejected Gmail app password. A live browser submission
  rendered the success state, and the corresponding production
  `POST /api/request` returned 200 in the Vercel logs.
- [x] **`mournemade.co.uk` does not resolve.** Fixed 23 July 2026: the domain
  is registered and attached. Verified live — the apex serves the site over
  HTTPS from Vercel (`lhr1`), `www` redirects to the apex, and `/`,
  `/transformations/`, `/transformations/hotel-enniskeen/`, `/request/`,
  `/about/` and `/privacy/` all return 200. The QR target on printed artwork
  now resolves.
- [x] **The printed one-sheet QR still encoded the old domain after the
  rename.** Fixed 23 July 2026: the studio rename (`8f93c5a`) updated
  `scripts/print-onesheet.mjs` but not the asset it writes, so
  `public/images/hotel-enniskeen-onesheet-qr.svg` stayed byte-identical to a QR
  of `mourneandmain.co.uk` — every scan of the flagship leave-behind would have
  hit a domain that will never resolve. Regenerated against
  `mournemade.co.uk/transformations/hotel-enniskeen/?src=onesheet` and verified
  against both URLs. **Generated assets do not follow a text rename** — see
  MEDIA_CAPTURE.md. The PDF under gitignored `output/pdf/` still predates the
  rename and must be rebuilt with `pnpm print:onesheet hotel-enniskeen` before
  anything reaches a printer.

## P2 — Trust and copy

- [x] **The site is anonymous.** Fixed 23 July 2026: `/about/` now names Conor
  Brown, locates him in Dundrum, and offers a direct email route. A phone or
  WhatsApp route was not invented without a number supplied for publication.
- [x] **No affordability signal.** Fixed 23 July 2026: `/about/` now answers
  whether the concept is free and explains fixed quotes, small starting scopes,
  separated hosting/domain costs, and agreed delivery dates.
- [x] **"379 public local listings reviewed so far."** Fixed 23 July 2026:
  replaced with a live count of published local transformations framed as work
  invested across Dundrum and Newcastle.
- [x] **Generic hero h1.** Fixed 23 July 2026: the homepage now leads with
  “See what your business could become online — free.”
- [x] **Mission copy interrupts mid-funnel.** Fixed 23 July 2026: the community
  commitment now follows the closing request.
- [x] **Privacy page missing.** Fixed 23 July 2026: added a plain-language
  `/privacy/` notice covering collection, purpose, lawful basis, processors,
  retention, rights and ICO complaints, linked beside the submit button and in
  the footer.

## P3 — Concept and comparison system (the scaling wall)

- [x] **Concept pages dead-end.** Fixed 23 July 2026: the shared concept shell
  adds a persistent case-study link and pre-filled claim action to every
  concept page. Placeholder `href="#"` links are now visibly inert and exposed
  to assistive technology as disabled rather than behaving like broken links.
- [x] **`/concepts/*` pages are indexable and name real businesses.** Fixed
  23 July 2026: all 23 concept routes use `ConceptLayout.astro`, which supplies
  `noindex, nofollow`, a plain description, favicon and consistent disclosure.
  The sitemap also excludes the whole concept tree.
- [x] **One CSS file per concept re-implemented the same shell.** Fixed
  23 July 2026: `ConceptLayout.astro` owns the head, disclosure, claim action
  and disabled-link behaviour; `concept-shell.css` now also owns top-strip,
  direct-header and navigation geometry. Each identity supplies only its
  accent, gap, underline size and genuinely distinct page rules. The ten
  published concepts are covered by `pnpm test:concepts`, which verifies the
  resolved shared layout and identity token in a real browser. Secondary-page
  CSS remains with its identity because those layouts are not interchangeable.
- [x] **Comparison pages are hand-built.** Fixed 23 July 2026: headlines,
  source blocks, design notes and media paths now live in
  `transformation-details.ts`; one static `[slug].astro` route generates all
  ten case studies without duplicating the base comparison markup.
- [x] Added circular previous/next navigation between all transformations.
- [x] Added `robots.txt`, a filtered public sitemap, canonicals, a favicon and
  `LocalBusiness`/`ProfessionalService` JSON-LD. The internal Chamber
  exploration stays buildable under `/prototypes/chamber/`, but is disallowed
  to crawlers, omitted from the sitemap and no longer linked publicly.
- [ ] Create and verify a Google Business Profile. This needs the owner's
  Google account, publishable contact details and real-world business
  verification; it cannot be completed safely from the repository.
- [ ] **The Dundrum Inn transformation page shows the wrong "after".** The
  concept was rebuilt on 26 July 2026 and the stored after still and clip
  (`/images/dundrum-inn-after.jpg`, `/videos/dundrum-inn-after.mp4`) are
  captures of the retired black-and-brass version. The case study currently
  misrepresents the concept it links to. Blocked on the hero image so the
  capture is run once rather than twice — see `PLAN.md` next milestone 3.
- [ ] **The four checks did not catch a concept losing to the live site.** The
  Dundrum Inn passed all four on 26 July and was still weaker than the
  business's own website. The checks test honesty, not quality, which is
  deliberate — but nothing in the process asks *is this actually better than
  what they have?* for the maintained-site cases where that is the whole
  pitch. Consider adding that single question to the review of any concept
  whose subject already has a working site.

## P4 — Performance and media

- [x] **Transformations index eager-loaded ~20 comparison images.** Fixed
  23 July 2026: replaced the ten stacked sliders with a compact, filterable
  card grid and lazy responsive previews. A 375px browser check now requests
  two 640px WebP previews at first paint instead of the full before/after set.
- [x] **`MotionCompare` fetched both clips on scroll.** Fixed 23 July 2026:
  every motion section starts on its posters and requests no video until the
  visitor presses “Play demos”; the behaviour is covered by
  `pnpm test:media`.
- [x] **All media was JPG/MP4.** Fixed 23 July 2026: the repeatable media task
  generates 640px and 1265px WebP variants for all 35 JPEG masters and WebM
  variants for all 15 MP4 clips. Responsive sources are used by comparisons,
  case-study companion screens, index cards and concept photography. The
  640px image set is 0.87 MB versus 7.04 MB for the JPEG masters; the WebM set
  is 5.17 MB versus 13.19 MB for MP4 (61% smaller in aggregate). JPEG/MP4 stay
  as compatibility and capture masters.
- [x] Pinned every production and development dependency to the exact version
  recorded in the lockfile, including Astro, `@astrojs/check`, Nodemailer and
  TypeScript.
- [x] Script cleanup: one cross-platform Chrome resolver now serves all four
  capture scripts, and `capture-home-alts.mjs` uses a repository-local default
  output on Windows, macOS and Linux. Responsive captures also scroll through
  lazy images before taking full-page screenshots.

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
