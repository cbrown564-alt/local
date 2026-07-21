# Prospects

Working state of the concept pipeline. The data source of truth is
`research/verifications.json` (merged into `src/data/businesses.json` by
`scripts/normalize-businesses.mjs`); this document is the human-readable
summary and must be updated whenever a prospect changes stage.

Snapshot: 21 July 2026 · 16 businesses verified · 10 shortlisted · 4 concepts
published

## Pipeline stages

Every prospect moves through: **Shortlisted → Concept in progress → Concept
published → Contacted → Mock-up requested → Client**. A prospect can also be
**Assessed – not shortlisted** (kept for the knowledge, revisited on refresh).
Record every stage change in the `stage` field of `research/verifications.json`
(plus `conceptRoute` once a comparison page exists) and re-run the normaliser;
prospects with no explicit stage default to Shortlisted.

Current stages: 4 concepts published, 6 shortlisted, 6 assessed.

Rules of the road:

- No concept work before a verification pass dated within the last month.
- Caveats recorded against a prospect must be resolved before outreach (e.g.
  confirm trading in person where online evidence is soft).
- Concepts stay clearly labelled independent and uncommissioned until a
  business engages (see PRODUCT.md).

## Shortlist — redesign showcases (current website, visible gap)

| Business | Town | Verified condition | Design task |
|---|---|---|---|
| **Hotel Enniskeen** — *concept published, [/transformations/hotel-enniskeen/](src/pages/transformations/hotel-enniskeen.astro)* | Newcastle | ~2012 hand-built template site; 2026 reviews, 4.4★ | Imagery-led country-house hotel site, responsive, Bookin1 deep links. Most dramatic contrast of the ten |
| **Mourne Cycles** — *concept published, [/transformations/mourne-cycles/](src/pages/transformations/mourne-cycles.astro)* | Newcastle | 2014 free-tier Wix brochure; filings current to Mar 2026 | Retail storefront: range, servicing/hire booking, Cyclescheme funnel |
| **Donard Veterinary Centre** — *concept published, [/transformations/donard-veterinary/](src/pages/transformations/donard-veterinary.astro)* | Newcastle | Listed domain dead; 2017 Divi build; booking = phone/email only, plus a PetsApp bubble added by Jul 2026 | Appointment requests, emergency info hierarchy, accessibility fixes |
| South Down Signs — *on hold until trading confirmed* | Newcastle | Stale WordPress, content ~2023, no quote flow | Portfolio-led B2B site with quote-request funnel |
| **The Buck's Head** — *concept published, [/transformations/bucks-head/](src/pages/transformations/bucks-head.astro)* | Dundrum | Current site; ResDiary widget added by Jul 2026 but buried behind policy warnings, menus PDF-only, first screen wordless | Reservations flow and menu UX — functional upgrade, not a rebuild |

## Shortlist — first-website showcases (no site, verified Maps listing)

| Business | Town | Verified condition | Design task |
|---|---|---|---|
| Scopers | Dundrum | No site; 4.6★; open most of the week and very popular (local report, Jul 2026) | Chef-led brand single-pager with supper club events and booking |
| Cúpla | Dundrum | No site; café founded 2024, hygiene "Good" Jan 2025; trading confirmed Jul 2026 | Mobile-first café page with bilingual Irish-language identity |
| The Tool Centre | Newcastle | No site; hardware retail + plant hire | Utilitarian trade site: hire prices, stock categories, hours |
| Kent Amusements | Newcastle | Facebook-only; active (Mar 2026 review, new VR) | Seasonal attraction site: attractions, hours, family offers |
| Newcastle Chamber of Commerce | Newcastle | No site; active into 2026, runs on Gmail | Civic hub: member directory, events, join page — community piece |

## Assessed — not shortlisted

Golf Links House and Avoca Hotel (sites recently rebuilt with booking),
Painted Earth (census missed its live e-commerce site), Dacara and Conlyn
House (fresh rebuilds; their gap is booking capability, a possible future
feature-upgrade case), Hutt Hostel (dated styling but working booking flow —
accommodation runner-up). Details and evidence in
`research/verifications.json`.

## Outstanding caveats before outreach

- **South Down Signs**: weakest trading recency evidence of the ten — held
  back from concept work (21 July 2026) until trading is confirmed directly.
- Same-name collisions to keep out of concept content: Tool Centre
  (Newcastle-upon-Tyne shops), Kent Amusements (Dundalk), South Downs Signs
  (England), Newcastle Chamber of Commerce (at least eight worldwide).

Resolved 21 July 2026 by local first-hand knowledge: Scopers now trades most
of the week and is very popular (the Thursday-only pattern is outdated), and
Cúpla is confirmed actively trading. Both recorded in
`research/verifications.json`.

Superseded 21 July 2026 at build time: The Buck's Head added a ResDiary
booking widget to its Bookings page after the 20 July verification pass —
another case for re-reading the live site the day you build. The concept keeps
ResDiary as the engine; the critique moved to the journey around it.

## Building a concept

Established while building Enniskeen (20 July 2026); reuse rather than
reinvent:

1. **Read the business's own site first.** Its published words are the best
   copy source and keep the concept honest. Enniskeen's "mountainside
   hideaway", Shimna Valley, the twelve acres, Mourne Honey afternoon tea and
   the Brandy Pad Lounge are all the hotel's own language — the concept
   reorders what the business already says rather than inventing a new voice.
   Re-read it the day you build, not just at census time: Donard's site
   gained a PetsApp chat widget between the 20 July verification pass and the
   21 July build, and the change belonged in both the design notes and
   `research/verifications.json`.
2. **Use the business's own photography** where the site publishes usable
   images, and credit the source on the transformation page. Enniskeen's
   balcony and terrace photographs are genuinely good; the problem was the
   frame around them, which is a fairer and more flattering critique than
   replacing their imagery with stock. When what the site publishes is
   supplier imagery (Mourne Cycles runs Trek dealer photography), reuse it
   and say so plainly — "the Trek dealer imagery the shop already publishes,
   reused rather than replaced" — instead of introducing stock of our own.
3. **Keep the existing plumbing.** Point concept actions at whatever the
   business already pays for (here, the Bookin1 engine and voucher shop) so
   the proposal reads as an upgrade, not a rebuild that throws away spend.
4. **Give each concept its own visual identity**, in a separate stylesheet
   (`src/styles/concept-<slug>.css`) scoped by a body class. Concepts must not
   look like Mourne & Main or like each other — Castle Farm is warm cream and
   farm green with Georgia; Enniskeen is deep pine, honey brass and Cormorant
   Garamond; Mourne Cycles is coal black, signal red and Barlow Condensed,
   drawn from the shop's own logo; Donard Veterinary is plum, lavender and
   teal with Fraunces, drawn from the practice's badge — and introduces no
   photography at all, the honest move when a site's own imagery is stock.
   (Castle Farm predated this convention and was normalised out of
   `global.css` on 21 July 2026.)
5. **Capture both screens the same way** with
   `node scripts/capture-concept-screens.mjs <slug>` (needs `pnpm build &&
   pnpm preview` running). It shoots the live site and the local concept at
   an identical 1265×710 at 2x through system Chrome, then compresses to JPEG.
   Leave cookie banners and consent prompts visible: that is what a first-time
   visitor meets, and hiding them would flatter the comparison. But if the
   site runs a hero carousel, tune `currentBudgetMs` so the capture is stable
   across runs and lands on the first slide — Enniskeen's default budget drifted
   onto an arbitrary later slide with a parasol across the frame, which would
   have shown the business at a bad moment rather than at its own chosen best.
   Always look at the captured "current" image before publishing.
6. **Write the three design notes as observation → change**, naming what is
   on the captured page without mocking it, and register the new slug in the
   `CONCEPTS` map in the capture script.
7. **Check the concept capture too, not just the current one.** Two Mourne
   Cycles defects only showed up in the captured frame: a portrait hero image
   sized in-flow stretched the grid row and pushed the range rail below the
   1265×710 fold (fix: absolutely position imagery inside its panel), and
   Astro's HTML compression swallowed the space at a source line break before
   an inline element ("mainTrek") — keep meaningful spaces on the same source
   line as the tag.

## The repeatable cycle

Each round of work follows the same loop, and each loop makes the next one
cheaper because the knowledge lands in versioned files, not in heads:

1. **Select** from the ranked census (`/opportunities`, workbook).
2. **Verify** per the protocol in RESEARCH_METHOD.md; record evidence,
   corrections, and the shortlist/design-task decision in
   `research/verifications.json`.
3. **Normalise** (`node scripts/normalize-businesses.mjs`) so corrections,
   scores, and prospect fields flow into the dataset and summary.
4. **Build** the concept; publish under `/transformations/` with source
   disclosure.
5. **Record the outcome** — stage change, what the concept taught us, any new
   census corrections — back into `research/verifications.json` and this file.
6. **Update the docs** touched by what changed (this file always; README /
   RESEARCH_METHOD / DESIGN when the process itself moved).
