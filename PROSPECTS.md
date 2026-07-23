# Prospects

Working state of the concept pipeline. The data source of truth is
`research/verifications.json` (merged into `src/data/businesses.json` by
`scripts/normalize-businesses.mjs`); this document is the human-readable
summary and must be updated whenever a prospect changes stage.

Snapshot: 24 July 2026 · 17 businesses verified · 10 shortlisted · 9 concepts
published · Milestone 2 second assets shipped for all nine · Enniskeen F1
flagship working prototype complete locally · Buck's Head F2 journey case
complete locally · **batch two selected (10 prospects, unverified)**

## Pipeline stages

Every prospect moves through: **Shortlisted → Concept in progress → Concept
published → Contacted → Mock-up requested → Client**. A prospect can also be
**Assessed – not shortlisted** (kept for the knowledge, revisited on refresh).
Record every stage change in the `stage` field of `research/verifications.json`
(plus `conceptRoute` once a comparison page exists) and re-run the normaliser;
prospects with no explicit stage default to Shortlisted.

Current stages: 9 concepts published, 1 shortlisted (held), 7 assessed.

Rules of the road:

- No concept work before a verification pass dated within the last month.
- Caveats recorded against a prospect must be resolved before outreach (e.g.
  confirm trading in person where online evidence is soft).
- Concepts stay clearly labelled independent and uncommissioned until a
  business engages (see PRODUCT.md).

## Shortlist — redesign showcases (current website, visible gap)

| Business | Town | Verified condition | Design task |
|---|---|---|---|
| **Hotel Enniskeen** — *concept published, [flagship case study + film](/transformations/hotel-enniskeen/#reel-hotel-enniskeen) · [full five-page concept site](/concepts/hotel-enniskeen/) (Home · Stay · Dine · The estate · Things to do) · [Rooms](/concepts/hotel-enniskeen/rooms/) · [Dine](/concepts/hotel-enniskeen/dine/)* | Newcastle | ~2012 hand-built template site; 2026 reviews, 4.4★ | F1 flagship working prototype: complete responsive site, verified Bookin1 deep links, 75-second guest-journey film, A4 one-sheet and pitch. Stage remains Concept published; outreach waits for domain, production-form and printed-QR gates |
| **Mourne Cycles** — *concept published, [/transformations/mourne-cycles/](src/pages/transformations/mourne-cycles.astro)* · M2 hire [/concepts/mourne-cycles/hire/](src/pages/concepts/mourne-cycles/hire.astro) | Newcastle | 2014 free-tier Wix brochure; filings current to Mar 2026 | Retail storefront: range, servicing/hire booking, Cyclescheme funnel |
| **Donard Veterinary Centre** — *concept published, [/transformations/donard-veterinary/](src/pages/transformations/donard-veterinary.astro)* · M2 appointments [/concepts/donard-veterinary/appointments/](src/pages/concepts/donard-veterinary/appointments.astro) | Newcastle | Listed domain dead; 2017 Divi build; booking = phone/email only, plus a PetsApp bubble added by Jul 2026 | Appointment requests, emergency info hierarchy, accessibility fixes |
| South Down Signs — *on hold until trading confirmed* | Newcastle | Stale WordPress, content ~2023, no quote flow | Portfolio-led B2B site with quote-request funnel |
| **The Buck's Head** — *concept published, [journey case study + film](/transformations/bucks-head/#two-journeys) · [/transformations/bucks-head/](src/pages/transformations/bucks-head.astro)* · M2 menus [/concepts/bucks-head/menus/](src/pages/concepts/bucks-head/menus.astro) | Dundrum | Current site, actively maintained (à la carte PDF reissued on build day); ResDiary widget behind policy warnings, menus PDF-only, no booking control on the phone's first screen | F2 journey case: measured 24 Jul 2026 — booking 2 taps → 1, à la carte 3 taps → 1. Verified ResDiary handoff (`date` + `partySize` only), 48-second side-by-side film, A4 one-sheet and walk-in pitch. Explicitly **not** a rebuild. Stage remains Concept published; outreach waits for domain, production-form and printed-QR gates |

## Shortlist — first-website showcases (no site, verified Maps listing)

| Business | Town | Verified condition | Design task |
|---|---|---|---|
| **Scopers** — *concept published, [/transformations/scopers/](src/pages/transformations/scopers.astro)* · M2 supper club [/concepts/scopers/supper-club/](src/pages/concepts/scopers/supper-club.astro) | Dundrum | No site; 4.6★; open most of the week and very popular (local report, Jul 2026); Facebook page meets visitors with a login wall | Chef-led brand single-pager with supper club events and booking |
| **Cúpla** — *concept published, [/transformations/cupla/](src/pages/transformations/cupla.astro)* · M2 menu [/concepts/cupla/menu/](src/pages/concepts/cupla/menu.astro) | Dundrum | No site; café founded 2024, hygiene "Good" Jan 2025; trading confirmed Jul 2026 | Mobile-first café page with bilingual Irish-language identity |
| **The Tool Centre** — *concept published, [/transformations/tool-centre/](src/pages/transformations/tool-centre.astro)* · M2 hire list [/concepts/tool-centre/hire-list/](src/pages/concepts/tool-centre/hire-list.astro) | Newcastle | No site; hardware retail + plant hire; Facebook as Tool Centre Plant Hire | Utilitarian trade site: hire prices, stock categories, hours |
| **Kent Amusements** — *concept published, [/transformations/kent-amusements/](src/pages/transformations/kent-amusements.astro)* · M2 attractions [/concepts/kent-amusements/attractions/](src/pages/concepts/kent-amusements/attractions.astro) | Newcastle | Facebook and Instagram only; active (Mar 2026 review, new VR); Facebook re-confirmed 22 July 2026 | Seasonal attraction site: attractions, hours, family offers |
| **Newcastle Chamber of Commerce** — *full-site concept published, [/transformations/newcastle-chamber/](src/pages/transformations/newcastle-chamber.astro)* · site [/concepts/newcastle-chamber/](src/pages/concepts/newcastle-chamber.astro) (Home · Members · Events · Join · About · Contact) · exploration archive [/prototypes/chamber/](src/pages/prototypes/chamber/index.astro) | Newcastle | No site; active into 2026, runs on Gmail; Facebook re-confirmed 22 July 2026 | Main Street finder hybrid: directory-first IA, civic Co. Down chrome, neighbour join voice |

## Batch two — selected 24 July 2026, not yet verified

Ten new prospects chosen for the second round of the cycle. Full selection
record, dated probe evidence and open questions in
`research/batch-two-selection.md`. **None of these is verified**: no concept
work until each has a pass under `RESEARCH_METHOD.md`, and none has a record in
`research/verifications.json` yet.

Composition was chosen to weight Dundrum and to leave hospitality — batch one
was eight of ten hospitality or consumer-facing, and nothing so far tests
whether the offer lands with a trade, a health practice or a product brand.

| Business | Town | Category | Gap class | Selection evidence |
|---|---|---|---|---|
| The Dundrum Inn | Dundrum | Pub / B&B | Journey | Live custom site with booking and 2026 content — **not a rebuild case** |
| Murdock Brothers | Dundrum | Fuel merchant | Dead site | Wix 404 "ConnectYourDomain Error" |
| Groves Chemist | Dundrum | Pharmacy | First website | No site found; trading confirmed first-hand 24 Jul 2026 |
| Tonn Ruray Café | Dundrum | Café + apartments | Redesign | Live site; café/restaurant plus luxury apartment lets off one domain |
| Kelly, McEvoy & Brown | Dundrum | Building contractor | Redesign | 9.7 KB hand-built site, established 1973 |
| Betty's Better Butters | Dundrum | Food producer | Redesign | Two-page BaseKit site still titled "Home Page" |
| Douglas and Cromie | Newcastle | Car dealer | Dead site | Domain does not resolve (ENOTFOUND) |
| The Donard Hotel | Newcastle | Hotel | Dead site | HTTP 404, HTTPS connection refused |
| Newcastle Family Dental Care | Newcastle | Dental | Dead site | Redirects to another practice over plain HTTP |
| Hugh McCann's | Newcastle | Wedding venue | Feature | Maintained to 2026 despite © 2018 footer — **not a rescue** |

**Squid Shack was selected and removed the same day** — local first-hand report,
24 July 2026: it no longer exists. Recorded in `research/verifications.json` as
`tradingStatus: "Closed"` so its OpenStreetMap node stops resurfacing near the
top of the site-less band in future rounds. Tonn Ruray Café took the slot.

The lesson generalises. **OpenStreetMap-only records carry no trading evidence
at all** — a node is a map feature that was true once — and the priority model
rewards that silence with a top-band score, because a closed business has no
website. Squid Shack scored 80. **Confirm OSM-only records first-hand before
selecting them, not after.** Groves Chemist, Brennan's, Today's and Arley Guest
House were all confirmed trading in the same conversation, at no research cost.

**A third gap class.** Batch one worked two pitches: redesign a dated site, or
build a first one. Four of these ten are trading while their website is broken,
dead, or pointing at someone else — and the owner usually does not know. Donard
Veterinary reached batch one this way and was treated as a one-off; it is not.
The pitch is the most verifiable of the three, and also the most embarrassing to
get wrong: **confirm the business is still trading before leaning on it**, since
a dead domain is equally consistent with a closed business.

Confirmed trading first-hand on 24 July 2026: Douglas and Cromie, The Donard
Hotel, Newcastle Family Dental Care. **Murdock Brothers is still unconfirmed** —
the one dead-site case where the pitch is not yet safe to make.

**The score could not make this choice.** Every site-less record scores 80–81,
and four records at the top of that band — `Donard Hotel`, `Quinns`,
`Hugh McCanns`, `Percy French` — are duplicates of businesses that trade on live
sites. Selecting off the top of the ranking would have pitched a first website
to four businesses that already have one. Thirteen further duplicate pairs are
listed in the selection record; the alias table in
`scripts/normalize-businesses.mjs` holds only five entries. **Fix it before the
batch-three selection** — this round excluded the duplicates by hand.

## Assessed — not shortlisted

Golf Links House and Avoca Hotel (sites recently rebuilt with booking),
Painted Earth (census missed its live e-commerce site), Dacara and Conlyn
House (fresh rebuilds; their gap is booking capability, a possible future
feature-upgrade case), Hutt Hostel (dated styling but working booking flow —
accommodation runner-up). Details and evidence in
`research/verifications.json`.

**Squid Shack** (Dundrum) is recorded here for a different reason: it is closed,
confirmed first-hand on 24 July 2026. The record exists to keep a dead
OpenStreetMap node out of future selection rounds, not because the business was
assessed on its merits.

## Castle Farm — published but outside the pipeline

Found 24 July 2026 during the M3 plan review. `src/data/transformations.ts`
carries ten records; this file accounts for nine. **Castle Farm** (Dundrum) has
a published concept, a captured before from its live site, a demo clip and a
public transformation page — and no entry in `research/verifications.json` at
all: no stage, no dated evidence, no design task, no shortlist decision. It
predates the pipeline and was never brought in.

The effect is that a real named neighbour's business is displayed publicly
while sitting outside every honesty mechanism built around the others — it
cannot change stage, will never be re-verified, and under the M3 walk would be
the one Dundrum door skipped while three of its neighbours are visited.

**Counted outside batch two (24 July 2026).** It needs a full verification pass
either way, but it is batch-one cleanup rather than new discovery, so recording
it inside the ten would have overstated new coverage. Site live, © 2026,
trading — eleven passes are outstanding this round, not ten.

**Decision (24 July 2026):** verify Castle Farm into batch one. A fresh pass
first, per the rule below that no concept work proceeds on evidence older than
a month. If it is trading and the concept still holds, give it a verification
record, a stage and a one-sheet. If the concept no longer holds, refresh or
retire the public transformation rather than leaving a stale comparison of a
real local business on a live site.

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

Re-verified 24 July 2026 for the F2 build: nothing had been fixed. The booking
notes still precede the widget, all five menus are still PDFs — and the à la
carte PDF had been reissued that morning, which is the clearest evidence that
the site is actively maintained and that a rebuild pitch would be dishonest.
Hand-testing the widget that day also settled the handoff question: it honours
`date` and `partySize` and ignores `covers`, `party`, `guests` and every time
parameter tried, so the concept's booking card now asks for exactly the two
fields that carry through.

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
   look like Mourne Made or like each other — Castle Farm is warm cream and
   farm green with Georgia; Enniskeen is deep pine, honey brass and Cormorant
   Garamond; Mourne Cycles is coal black, signal red and Barlow Condensed,
   drawn from the shop's own logo; Donard Veterinary is plum, lavender and
   teal with Fraunces, drawn from the practice's badge — and introduces no
   photography at all, the honest move when a site's own imagery is stock;
   Kent Amusements is pier navy, spray mist, ticket amber and candy coral with
   Teko, a promenade-arcade identity.
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
7. **For first-website prospects, the "current" capture is the business's own
   primary public presence** — its social page, shot as a first-time visitor
   without an account meets it, with Meta's cookie dialog and login wall left
   in place (Scopers set the pattern, 21 July 2026). The critique must then be
   about access — the wall in front of the story — never a mock of the
   business's own content behind it.
8. **Check the after capture too, not just the before one.** Two Mourne
   Cycles defects only showed up in the captured frame: a portrait hero image
   sized in-flow stretched the grid row and pushed the range rail below the
   1265×710 fold (fix: absolutely position imagery inside its panel), and
   Astro's HTML compression swallowed the space at a source line break before
   an inline element ("mainTrek") — keep meaningful spaces on the same source
   line as the tag.

## The repeatable cycle

Each round of work follows the same loop, and each loop makes the next one
cheaper because the knowledge lands in versioned files, not in heads:

1. **Select** from the ranked census (`/opportunities` — dev-only workbench, run
   `pnpm dev`; never deployed because it embeds the scored dataset). The
   workbench reads `src/data/businesses.json`, so it reflects every
   verification, correction and closure.
   The `.xlsx` workbook is untracked and only as fresh as its last build —
   regenerate it with `node spreadsheet-work/build-business-workbook.mjs`, which
   reads the same two files, before trusting it to select. Rebuilt 24 July 2026;
   it had been ranking the now-closed Squid Shack fifth overall.
   **It still carries the four duplicate false-highs and merges no aliases** —
   `Donard Hotel` sits at rank 3 while the same hotel trades on a live site.
   Selection inside the site-less band is judgement plus fresh evidence, never
   the ranking — the score is flat at 80–81 across a hundred-plus businesses.

   A business verified as closed now scores 0 and sorts last, in both the
   dataset and the workbook, with its listing retained so the knowledge is not
   lost. Scores are otherwise a property of the listing, not of trading status,
   so a closure has to be recorded to have any effect.
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
