# Prospects

Working state of the concept pipeline. The data source of truth is
`research/verifications.json` (merged into `src/data/businesses.json` by
`scripts/normalize-businesses.mjs`); this document is the human-readable
summary and must be updated whenever a prospect changes stage.

Snapshot: 25 July 2026 · 27 businesses verified · **two public transformations
after Phase Q** · Enniskeen F1 is restored at 7.68 **Pass** with disclosed,
faithful visualisations of the real façade and named room features · Buck's
Head F2 is released at 7.23 **Pass** after direct menu hashes gained an
in-panel price warning and the unlicensed hearth photo was replaced by a
disclosed faithful visualisation · the next five candidates took one shared repair
pass and were **independently re-reviewed on 25 July 2026**: Donard Veterinary
6.53, Newcastle Chamber 5.88, Mourne Cycles 5.78, Cúpla 5.78 and Kent
Amusements 5.43 — **all Revise a second time**, so all five have consumed their
one repair cycle and are retired from the public queue and kept internal
pending an explicit owner decision · seven concepts reviewed, thirteen
unreviewed · no one-sheet release or outreach is permitted until a concept has a
current independent public Pass

## Pipeline stages

Every prospect moves through: **Shortlisted → Concept in progress → Concept
published → Contacted → Mock-up requested → Client**. A prospect can also be
**Assessed – not shortlisted** (kept for the knowledge, revisited on refresh).
Record every stage change in the `stage` field of `research/verifications.json`
(plus `conceptRoute` once a comparison page exists) and re-run the normaliser;
prospects with no explicit stage default to Shortlisted.

Current recorded stages: 19 concepts in progress, 7 shortlisted, 1 assessed.
Castle Farm remains the one built concept without a verification record and is
tracked explicitly in the Phase Q table below.

Rules of the road:

- No concept work before a verification pass dated within the last month.
- **Retroactive review hold (owner decision, 24 July 2026; corrected to v1.1
  the same day):** pause new concept publication and outreach until each
  public candidate has completed design review and its release conditions.
  Remove Release blocked and Revise concepts from `/transformations/` and
  outreach assets until cleared;
  keep the `noindex` concept route internally unless truth, safety or respect
  requires removal. Missing release evidence does not stop design scoring or
  consume the one repair cycle. If
  no concept passes, the homepage and transformation index show a truthful
  temporary review state rather than retaining a failed example. Fully review
  eligible concepts by evidence readiness, public value and likelihood of
  passing, not chronological order.
- A concept remains **Concept in progress** until it passes the independent
  review in `CONCEPT_DESIGN_REVIEW.md` at 7.0/10 or higher, including every
  every design gate, core category floors of 7.0 and supporting category
  floors of 6.0. A local route
  is not evidence of completion. The build enforces a current machine-readable
  Pass for every slug published through `src/data/transformations.ts`; internal
  `noindex` concept routes do not require one. Each public Pass needs a
  lightweight truth refresh every 90 days; overdue concepts leave public
  transformations until refreshed.
- Caveats recorded against a prospect must be resolved before outreach (e.g.
  confirm trading in person where online evidence is soft).
- Concepts stay clearly labelled independent and uncommissioned until a
  business engages (see PRODUCT.md).

## Phase Q portfolio disposition — 24 July 2026

Release-readiness triage removed all nineteen former public transformations.
None had the complete private record and independent v1.1 Pass required by the
release rule. This did not establish that the designs failed. Missing release
evidence is **Release blocked**, not Revise, so no repair cycle has been
consumed. All concept routes remain internal and `noindex`;
`src/data/transformations.ts` has no public members.

| Concept | Current disposition | Next design-review action; separate release dependency |
|---|---|---|
| Hotel Enniskeen | **Public Pass at 7.68** | Faithful, disclosed generated visualisations now prove the real façade and the distinctive Room 6 and Room 9 bathroom features without publishing the hotel's reference photographs |
| Mourne Cycles | **Reopened by owner decision 25 Jul**; second repair implemented, awaiting independent re-review. Previous verdict: re-review 25 Jul returned **Revise at 5.78** (was 5.93). Gates failed: claims, subject proof, readable/motion-safe | Keep internal. The repair closed the 390 px header overflow and labelled the provisional prices, but "Trek main dealer for the area" overstates the sourced "listed Trek dealer", the AI-visualisation disclosure falls 61 px below the phone fold, and ~20 texts sit under 4.5:1. Reopen only on new imagery proving the shop itself (frontage, workshop, yard) or an explicit flagship decision. `mourne-cycles-trail.jpg` still has no recorded rights |
| The Buck's Head | **Public Pass at 7.23** | Every direct menu panel repeats the illustrative-price warning; the reused hearth photograph has been replaced by a disclosed faithful visualisation |
| Donard Veterinary | **Reopened by owner decision 25 Jul**; second repair implemented, awaiting independent re-review. Previous verdict: re-review 25 Jul returned **Revise at 6.53** (was 5.93) — the batch's best score. One gate failed: readable/motion-safe | Keep internal, but this is the closest candidate to the standard: claims, loop and subject proof all now pass, and only responsive/accessibility sits below its 7.0 floor, on four contrast values inside the out-of-hours emergency card (2.56:1–3.38:1) plus a frozen post-submit handoff link. **Worth an owner decision on reopening** — the remaining work is measured and small. Verification record still says "Donard Veterinary Centre"; the real name is Clinic |
| Scopers | Internal pending review | Add real subject or food proof and replace or clearly label exposed inert actions; resolve image rights before release |
| Cúpla | **Reopened by owner decision 25 Jul**; second repair implemented, awaiting independent re-review. Previous verdict: re-review 25 Jul returned **Revise at 5.78** (was 6.43). Gates failed: real loop, responsive, readable | Keep internal. Both first-round failures were fixed and its disclosed AI visualisation is the only one in the portfolio to **pass** subject proof (verified feature by feature against the August 2024 frontage photo, where Enniskeen's fictional visuals failed). It fell on defects the first round never measured: `.cp-nav { display: none }` at 390 px hides the only link to the menu, menu body copy fails 4.5:1 throughout, and the menu page declares `lang="ga-IE"` over mostly English text. **Worth an owner decision on reopening** — the direction is sound, the failures are rules |
| The Tool Centre | Internal pending evidence | Add specific subject proof and source every published hire detail before the hire/call loop is reviewed |
| Kent Amusements | **Reopened by owner decision 25 Jul**; second repair implemented, awaiting independent re-review. Previous verdict: re-review 25 Jul returned **Revise at 5.43** (was 5.88). Gates failed: claims, real loop, responsive, readable | Keep internal. Subject proof now passes on the licensed 2023 Geograph photograph of the real frontage and the SVG costume is gone, but `/attractions/` paints story and panel into the identical 390×545 rect at phone size (100% overlap), the phone primary CTA is not hittable, and the honesty that was the first round's strength regressed — two unlabelled unverified opening-hour ranges under "Open this season." |
| Newcastle Chamber | **Reopened by owner decision 25 Jul**; second repair implemented, awaiting independent re-review. Previous verdict: re-review 25 Jul returned **Revise at 5.88** (was 6.28). Gates failed: claims, real loop, subject proof, responsive, readable — five of six | Keep internal. The search is genuinely wired now, but `/contact/`'s "Send an email" button renders navy-on-navy at **1.00:1** (invisible), `.nc-nav` is hidden below 940 px with no replacement so `/about/` is reachable from nowhere on a phone, category tabs do not clear an active query, and `/members/#hospitality` lands on real trading names with no illustrative label in view. Reopen only on a materially different direction |
| The Dundrum Inn | Internal pending review | Replace invented live status with sourced or explicitly illustrative states and add real place proof; resolve image rights before release |
| Groves Chemist | Internal pending evidence | Add specific pharmacy proof and an honest prescription-request handoff or clearly labelled prototype end state |
| Tonn Ruray Café | Internal pending review | Add real café proof and make the visit/menu loop complete rather than decorative; resolve image rights before release |
| Kelly, McEvoy & Brown | Internal pending review | Add real project proof, remove invented project metadata and wire or cut the filters; resolve image rights before release |
| Betty's Better Butters | Internal pending review | Add real product proof and keep every unverified flavour or product detail visibly provisional; resolve image rights before release |
| Douglas & Cromie | Internal pending review | Replace empty vehicle-photo placeholders with real subject proof and source every listing claim; resolve image rights before release |
| The Donard Hotel | Internal pending review | Add real hotel proof and an honest direct-booking handoff or labelled prototype end state; resolve image rights before release |
| Newcastle Family Dental Care | Internal pending evidence | Add specific practice proof and make the appointment loop functional or explicitly bounded |
| Hugh McCann's | Internal pending review | Add real venue proof and complete the enquiry success, failure and recovery states; resolve image rights before release |
| Castle Farm | Internal pending review; release blocked | Create the missing fresh verification record and complete design review; produce-photo rights or replacements are required for release |
| Murdock Brothers | Internal pending evidence | Confirm trading first; then add specific subject proof and a truthful price/handoff model |

Hotel Enniskeen received the first independent v1.1 verdict on 24 July 2026
because it has the strongest historical craft and deepest loop. The first
verdict was **Revise** at 7.10 because the missing-date path, 390px header
overflow and contrast defects failed core floors and design gates. One focused
repair added the failure/recovery path and exact handoff check, corrected the
phone and contrast defects, and removed the generic entrance motion. The same
reviewer passed every design gate at 7.68. Photography permission remains the
sole blocker on that reviewed source. The reused photography was subsequently
replaced by original AI-generated visualisations with a site-wide disclosure.
That resolves the asset-rights condition, but materially changes identity,
composition and craft, so the current source returned to Reviewable rather than
inheriting the 7.68 score.

On 25 July the fictional exterior and named-room images were replaced with
faithful, disclosed visualisations grounded in reference photographs of the
real façade and the distinctive Room 6 and Room 9 bathrooms. That closes the
only design regression introduced by the rights repair, so the prior 7.68 Pass
is restored on the current source and the concept is public.

The Buck's Head received the second independent v1.1 review on 24 July 2026.
The live ResDiary handoff and unavailable-date recovery worked, but four named
menu links opened À la carte instead of their requested panels and an
unselected tab sublabel measured about 3.26:1. The reviewer returned **Revise
at 6.53**. The repair fixed routing, history, keyboard state, contrast,
blank-date recovery, first-screen photo exposure and the disclosure collision.
The same reviewer scored the fixed source at 7.15, but direct menu hashes
scrolled past the illustrative-price warning. On 25 July every addressable
panel gained its own warning, lifting truth to its 7.0 floor. The unlicensed
hearth photograph was also replaced by a disclosed faithful visualisation.
The resulting 7.23 Pass is public.

The next five candidates received their first independent v1.1 reviews on 24
July 2026 — **Mourne Cycles (5.93), Newcastle Chamber (6.28), Kent Amusements
(5.88), Donard Veterinary (5.93) and Cúpla (6.43)**. All five returned **Revise**
and each keeps its one repair cycle. The failures are concrete and reproducible,
not matters of taste: a 390 px header that clips the primary action (Mourne
Cycles, Kent); a homepage search that ignores its query and always returns the
full directory (Chamber); an appointment form that opens a blank email and
discards every typed field, plus a "VidiVet" service the practice does not use —
it uses PetsApp (Donard Vet); a café menu priced in euro for a sterling
jurisdiction (Cúpla); and invented, unlabelled prices (Mourne Cycles, Cúpla) or
real businesses listed as members (Chamber). Across the batch, no first viewport
carries real subject imagery, every home page renders its own wordmark
struck-through (an `href="#"` inert-link side effect), and the slogan owns the
fold. Full per-concept records are private under
`research/concept-reviews/<slug>.md`; the compact verdicts are committed in
`releases.json`.

A shared repair pass then closed those mechanical and truth failures: all
wordmarks use real routes; Chamber search filters and has an empty state;
Donard's form preserves its fields into an explicit email draft and names
PetsApp correctly; Cúpla uses labelled sterling sample prices; Mourne labels
provisional imagery and commercial details before use; Kent's phone action fits;
and a follow-on pass replaced the fictional hero material with real licensed
photography (Chamber, Kent, Donard) or a faithful disclosed visualisation
(Cúpla, Mourne Cycles).

**Independent re-review, 25 July 2026 — all five returned Revise again**, at
Donard Veterinary 6.53, Newcastle Chamber 5.88, Mourne Cycles 5.78, Cúpla 5.78
and Kent Amusements 5.43. Every repair held: the gates the pass targeted are
closed, and subject proof now passes for Kent, Donard and Cúpla. Four scores
nonetheless fell, because this round measured what the first round asserted —
contrast computed from live styles, `elementFromPoint` hit-testing, phone
navigation enumerated link by link. The deciding defects are mostly pre-existing
and previously undetected: an invisible 1.00:1 contact button and a phone nav
that strands `/about/` (Chamber); a mobile rule hiding the only link to the menu
(Cúpla); a 100% layout overlap on `/attractions/` at 390 px (Kent); four
contrast failures in the emergency card (Donard); an unsourced "main dealer"
claim and a disclosure below the phone fold (Mourne Cycles). One regression:
Kent's honesty, the first round's strength, now publishes unlabelled opening
hours.

One defect is portfolio-wide and worth a single shared fix: at 1265×710 the
fixed `.mm-concept-banner` covers the bottom rail of four of the five concepts
and the Chamber's primary CTA, and the document is 1–2 px taller than the
viewport, so it cannot be scrolled clear. Verified by hit-testing on all five.

All five had consumed their one repair cycle, so §5 directed retirement. The
**owner reopened all five on 25 July 2026** under the explicit-designation
clause, on the ground that the repair cycle had been spent against an
incomplete defect list — the first round asserted contrast, hit-testing and
phone navigation rather than measuring them. A second repair pass is now
implemented against the measured findings (shared banner reservation, phone
navigation restored, contrast cleared, the Chamber directory rebuilt from
verified records, Kent's overlap and unlabelled hours fixed, Donard's stale
draft withdrawn) and `pnpm test:reviewed-concepts` has grown from 7 to 14
checks covering the new defect classes. That source has **not yet been
independently re-reviewed**, so every committed verdict remains Revise. Full
per-concept records are private under `research/concept-reviews/<slug>.md`; the
compact verdicts are committed in `releases.json`.

## Shortlist — redesign showcases (current website, visible gap)

| Business | Town | Verified condition | Design task |
|---|---|---|---|
| **Hotel Enniskeen** — *internal Revise (7.15) on the current generated-image source · prior photography source passed v1.1 design at 7.68 · current source uses disclosed but fictional generated visualisations · [full five-page concept site](/concepts/hotel-enniskeen/) (Home · Stay · Dine · The estate · Things to do) · [Rooms](/concepts/hotel-enniskeen/rooms/) · [Dine](/concepts/hotel-enniskeen/dine/)* | Newcastle | ~2012 hand-built template site; 2026 reviews, 4.4★ | F1 flagship working prototype remains local. Generated assets remove the reused-photo rights issue but are declared fictional, so they fail subject proof; faithful disclosed visuals of the real hotel (or licensed photography) + re-review, plus domain, production-form and printed-QR gates, remain before publication or outreach |
| **Mourne Cycles** — *internal reopened 25 Jul · repaired, awaiting re-review · previous Revise at 5.78 after one repair cycle (25 Jul) · M2 hire [/concepts/mourne-cycles/hire/](src/pages/concepts/mourne-cycles/hire.astro)* | Newcastle | 2014 free-tier Wix brochure; filings current to Mar 2026 | Retail storefront: range, servicing/hire booking, Cyclescheme funnel |
| **Donard Veterinary Clinic** — *internal reopened 25 Jul · repaired, awaiting re-review · previous Revise at 6.53 after one repair cycle (25 Jul); closest to the standard, worth an owner decision on reopening · M2 appointments [/concepts/donard-veterinary/appointments/](src/pages/concepts/donard-veterinary/appointments.astro)* | Newcastle | Listed domain dead; 2017 Divi build; booking = phone/email only, plus a PetsApp bubble added by Jul 2026 | Appointment requests, emergency info hierarchy, accessibility fixes |
| South Down Signs — *on hold until trading confirmed* | Newcastle | Stale WordPress, content ~2023, no quote flow | Portfolio-led B2B site with quote-request funnel |
| **The Buck's Head** — *internal reopened 25 Jul · repaired, awaiting re-review · previous Revise at 7.15 after one repair cycle · M2 menus [/concepts/bucks-head/menus/](src/pages/concepts/bucks-head/menus.astro)* | Dundrum | Current site, actively maintained (à la carte PDF reissued on build day); ResDiary widget behind policy warnings, menus PDF-only, no booking control on the phone's first screen | Keep the repaired prototype internal. Reopen only for a materially revised truth/disclosure treatment with publishable real subject imagery, or an explicit flagship decision |

## Shortlist — first-website showcases (no site, verified Maps listing)

| Business | Town | Verified condition | Design task |
|---|---|---|---|
| **Scopers** — *internal pending Phase Q evidence · M2 supper club [/concepts/scopers/supper-club/](src/pages/concepts/scopers/supper-club.astro)* | Dundrum | No site; 4.6★; open most of the week and very popular (local report, Jul 2026); Facebook page meets visitors with a login wall | Chef-led brand single-pager with supper club events and booking |
| **Cúpla** — *internal reopened 25 Jul · repaired, awaiting re-review · previous Revise at 5.78 after one repair cycle (25 Jul); its disclosed visualisation is the only one to pass subject proof, worth an owner decision on reopening · M2 menu [/concepts/cupla/menu/](src/pages/concepts/cupla/menu.astro)* | Dundrum | No site; café founded 2024, hygiene "Good" Jan 2025; trading confirmed Jul 2026 | Mobile-first café page with bilingual Irish-language identity |
| **The Tool Centre** — *internal pending Phase Q evidence · M2 hire list [/concepts/tool-centre/hire-list/](src/pages/concepts/tool-centre/hire-list.astro)* | Newcastle | No site; hardware retail + plant hire; Facebook as Tool Centre Plant Hire | Utilitarian trade site: hire prices, stock categories, hours |
| **Kent Amusements** — *internal reopened 25 Jul · repaired, awaiting re-review · previous Revise at 5.43 after one repair cycle (25 Jul) · M2 attractions [/concepts/kent-amusements/attractions/](src/pages/concepts/kent-amusements/attractions.astro)* | Newcastle | Facebook and Instagram only; active (Mar 2026 review, new VR); Facebook re-confirmed 22 July 2026 | Seasonal attraction site: attractions, hours, family offers |
| **Newcastle Chamber of Commerce** — *internal reopened 25 Jul · repaired, awaiting re-review · previous Revise at 5.88 after one repair cycle (25 Jul) · site [/concepts/newcastle-chamber/](src/pages/concepts/newcastle-chamber.astro) (Home · Members · Events · Join · About · Contact) · exploration archive [/prototypes/chamber/](src/pages/prototypes/chamber/index.astro)* | Newcastle | No site; active into 2026, runs on Gmail; Facebook re-confirmed 22 July 2026 | Main Street finder hybrid: directory-first IA, civic Co. Down chrome, neighbour join voice |

## Batch two — verified and captured 24 July 2026, ten concept pages built

All ten passed a verification pass under `RESEARCH_METHOD.md` on 24 July 2026 and
have records in `research/verifications.json`. Each has a concept page built
locally at `/concepts/<slug>/` with its own scoped identity. Nine were published
with matched stills and demo media before Phase Q; all ten are now internal
pending evidence. Murdock Brothers also waits on trading confirmation. Full
selection record and dated probe evidence live in
`research/batch-two-selection.md`.

Former public batch-two cases: `dundrum-inn`, `groves-chemist`, `tonn-ruray`,
`kelly-mcevoy-brown`, `bettys-butters`, `douglas-cromie`, `donard-hotel`,
`newcastle-dental`, and `hugh-mccanns`.

Composition weights Dundrum and leaves hospitality — batch one was eight of ten
hospitality or consumer-facing. Batch two is the first test of whether the offer
lands with a trade, a health practice or a product brand.

| Business | Town | Gap class | Verified condition (24 Jul 2026) | Concept at `/concepts/…` |
|---|---|---|---|---|
| The Dundrum Inn | Dundrum | Journey | Live GuestDiary site, 2026 content, real booking — **not a rebuild**. Phone corrected to 028 4372 9933 | `dundrum-inn/` — a tonight status board (kitchen/rooms/tide/what's-on) on the first screen; 43-language translate widget cut to two |
| Murdock Brothers | Dundrum | Dead site | Wix "ConnectYourDomain" 404 on a domain the merchant still publishes. **Trading unconfirmed** | `murdock-brothers/` — a fuel-gauge order slider; price left deliberately blank (none published) |
| Groves Chemist | Dundrum | ~~First website~~ **Dead site** | **Reclassified.** A full pharmacy site with prescription ordering exists at groveschemist.com and has been *deactivated* — live URL, "no longer available" notice | `groves-chemist/` — the deactivated repeat-prescription capability restored, on a dispensing-label form |
| Tonn Ruray Café | Dundrum | Redesign | Live Webflow site built for the apartments; the café is the failing half — JUN24 menu PDF, no booking | `tonn-ruray/` — the café given its own front door and a live menu |
| Kelly, McEvoy & Brown | Dundrum | Redesign | Live 9.7 KB hand-built site, est. 1973; a 53-year portfolio rendered as text links | `kelly-mcevoy-brown/` — a filterable drawing-register portfolio |
| Betty's Better Butters | Dundrum | Redesign | Live two-page **ProSite Hosting** site, nav still "Home Page"/"Our Store", not one product shown | `bettys-butters/` — a food brand that shows the food; flavours marked placeholder |
| Douglas and Cromie | Newcastle | Dead site | Domain ENOTFOUND; stock lives on a third-party marketplace. Trading confirmed first-hand | `douglas-cromie/` — a forecourt the dealer owns |
| The Donard Hotel | Newcastle | Dead site | HTTP 404, no HTTPS listener; trading (Booking.com 8.7, 46 reviews). Every booking is an OTA | `donard-hotel/` — book-direct, whose whole argument is commission |
| Newcastle Family Dental Care | Newcastle | Dead site | Trades under its own name; its domain 301s over plain HTTP to another practice, .co.uk HTTPS times out | `newcastle-dental/` — the practice's own door, served over HTTPS |
| Hugh McCann's | Newcastle | Feature | Maintained (July 2026 menu upload); a wedding venue with no online enquiry at all | `hugh-mccanns/` — a date-and-guest-count enquiry, the two facts every venue call starts with |

**Three findings changed the batch on verification.** (1) **Groves reclassified**
from first-website to dead-site: a full pharmacy site with prescription ordering
exists and was switched off, so batch two is now **five dead-site, four redesign,
one feature — no first-website case**. (2) **The Dundrum Inn phone** was wrong in
the census (028 4375 1211); its own site publishes 028 4372 9933 — corrected. (3)
The **Betty's builder** is ProSite Hosting, not BaseKit as the selection record
guessed. All ten are recorded honestly in `research/verifications.json`; the
open apartments-vs-café and DJ-Maguire-ownership questions are resolved in the
records.

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
2. **Use real subject photography and record its rights status.** Internal
   review may use sourced subject imagery to judge the design, but missing
   public-use permission leaves the concept Release blocked. Before public
   use, images must be supplied by the business, captured by Mourne Made or
   covered by permission or a licence that allows that use; publication on the
   business's existing site proves the source, not the right to reuse it.
   Credit every reused asset on the transformation page. Since the
   24 July 2026 subject-proof amendment, a disclosed, subject-specific
   generated visualisation faithful to the real premises may carry subject
   proof and is publishable, so an image-led business need no longer stay
   internal purely for want of licensed photography. Generic stock never
   counts, and no image — real or generated — may be passed off as a genuine
   photograph or impersonate premises, staff, products, food, rooms or
   completed work that do not exist. For a genuinely non-image-led brief, a
   specific real artefact may carry the proof; CSS costume may not.
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
9. **Review before publishing.** Assemble the desktop, phone, interaction,
   source and check evidence required by `CONCEPT_DESIGN_REVIEW.md`; complete
   the self-review, then have an independent reviewer test and score the fixed
   candidate. Licensing or other release paperwork does not stop design
   scoring; record it as Release blocked. The concept needs a recorded Pass at
   7.0/10 or higher before external use. Keep the
   detailed record privately at `research/concept-reviews/<slug>.md`; commit
   only its compact release entry in
   `research/concept-reviews/releases.json`.

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
4. **Build** one complete local concept loop while the prospect remains
   Concept in progress.
5. **Review and repair** under `CONCEPT_DESIGN_REVIEW.md`. Continue design
   review when release paperwork is incomplete. A public release needs an
   independent Pass at 7.0/10 or higher, core categories at 7.0 or higher,
   supporting categories at 6.0 or higher, all design gates passed and all
   release conditions complete.
6. **Publish** under `/transformations/` with matched media and source
   disclosure.
7. **Record the outcome** — stage change, what the concept taught us, any new
   census corrections — back into `research/verifications.json` and this file.
8. **Update the docs** touched by what changed (this file always; README /
   RESEARCH_METHOD / DESIGN when the process itself moved).
