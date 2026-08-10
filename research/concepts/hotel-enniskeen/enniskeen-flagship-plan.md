# F1 · Enniskeen flagship — implementation plan

The studio's flagship case study: the full end-to-end treatment for Hotel
Enniskeen — a complete linked concept site, a flagship film, and a pitch
package. The demonstration is the product: this is the piece that leads
outreach to every other prospect.

Written 23 July 2026. Companion plan: `bucks-head-journey-plan.md` (F2, runs
second and reuses the infrastructure marked ♻ below). Roadmap summary lives in
`PLAN.md` under "Milestone F".

## Current status - local working prototype complete 23 July 2026

Work mode: full working prototype. All locally executable build, capture,
document and verification work is complete. Nothing has been sent or
promoted. Promotion remains blocked by the public-domain, production-delivery
and printed-phone QR gates; those require real deployed evidence and have not
been simulated.

| Area | Status | Evidence |
|---|---|---|
| Phase 0 - re-verify and harvest | **Verified** | Commit `744e6b0`; 23 July live-site re-read recorded in `research/pipeline/verifications.json`; sourced typed content and 19 distinct JPEG masters with responsive WebPs |
| Phase 1 - full linked site | **Verified** | Commit `7b9c01f`; five linked pages, working Bookin1 date/length-of-stay handoff, no placeholder links; build, media test and four-viewport responsive captures passed at commit time |
| Phase 2 - capture infrastructure | **Verified locally** | Declarative 13-segment `reel` mode uses `goto`, `hold`, `scroll`, `hover` and `click`; Chrome-rendered title cards; 1920×1080 CDP capture; ffmpeg split screen and crossfades |
| Phase 2 - flagship film | **Verified locally; release URL gated** | The revised guest-journey MP4 and WebM are both 74.90 s at 1920×1080 and 5.71/5.88 MB. Both full decodes passed. The small-frame contact sheet shows legible captions, the first current-site carousel slide and no late overlay. Both booking clicks resolve. The end-card public URL remains unverified because the domain does not resolve. |
| Phase 2 - site player | **Verified** | Built page keeps both sources detached until explicit activation; WebM is preferred; reduced-motion remains opt-in; keyboard play/pause passes; `reel_play` is wired |
| Phase 3 - A4 one-sheet | **Implemented and visually verified locally** | Dev-only print route plus slug-parameterised Chrome PDF script; two-page A4 PDF at `.scratch/print/pdf/hotel-enniskeen-flagship-onesheet.pdf`; no page overflow; both rendered pages inspected after fixing the print skip-link; QR encodes the tracked `?src=onesheet` URL |
| Phase 3 - written pitch | **Reviewed locally** | `research/concepts/hotel-enniskeen/enniskeen-pitch.md` contains subject lines, the email, a sixty-second in-person version, two follow-ups and objection notes; reviewed against `PRODUCT.md` tone and belief order |
| Phase 3 - case-study refresh | **Verified** | `hotel-enniskeen/dine` is registered and captured with responsive WebPs; the transformation carries Rooms and Dine companion stills plus final build-day source and design facts; 390 px and desktop browser reviews passed |
| Phase 4 - project record | **Completed** | `research/pipeline/verifications.json`, `PROSPECTS.md`, `PLAN.md`, `docs/MEDIA_CAPTURE.md`, `docs/DESIGN.md` and this owner plan record the same verified state |
| Promotion and outreach | **Domain and delivery gates cleared; QR gate open** | `mournemade.co.uk` now resolves and serves the site over HTTPS from Vercel (verified 23 July 2026), so the film end-card URL and the one-sheet QR target are real. A production submission through this sheet's link reached the inbox carrying `Came from: Printed one-sheet (Hotel Enniskeen)` (6 August 2026), clearing the [ADR-0002](../../../docs/adr/0002-printed-qr-attribution-contract.md) print gate. Still open: a printed proof scanned on a phone against the deployed case study. |

### Next true dependency

1. ~~Configure DNS and deploy the site at `mournemade.co.uk`.~~ Done — verified
   resolving 23 July 2026.
2. ~~Submit the production request form once and confirm that the intended inbox
   receives it.~~ Done 6 August 2026 — through this sheet's own link, the email
   reading `Came from: Printed one-sheet (Hotel Enniskeen)`.
3. Print the proofed PDF and scan its QR on a phone against the deployed
   route. (The `?src=onesheet` note here is superseded: the field is
   `?source=`, it is read end to end, and the drift between the two is what
   [ADR-0002](../../../docs/adr/0002-printed-qr-attribution-contract.md)
   exists to prevent recurring.) Printing is now gated on the stock and bleed
   decisions in `PLAN.md` section 9.
4. Only then mark the outreach gates complete and send or hand over the pitch
   package.

## Why Enniskeen (decision record)

Chosen over The Buck's Head for the full treatment on 23 July 2026. Enniskeen
is the only shortlist prospect where all three flagship criteria hold at once:

- **Steady business** — family-run, 4.4★ from ~389 reviews, 2026 TripAdvisor
  and Expedia listings.
- **Strong story** — a mountainside hideaway on twelve wooded acres above the
  Shimna Valley; cinematic subject matter for a film.
- **Genuinely underdeveloped website** — a ~2012 hand-built ASP.NET template
  (jQuery 1.8.3, 2013 UTM tags), recorded at verification as "the most
  dramatic before/after contrast of the ten". No incumbent web supplier, and
  the honest scope really is the whole site — "full, end to end" is the right
  size of claim here. (The Buck's Head site is current and actively
  maintained; its honest case is the booking journey, hence F2.)

## Definition of done

1. A visitor can walk the complete Enniskeen concept site — every nav item a
   real page, no placeholder links — at `/concepts/hotel-enniskeen/`.
2. `/transformations/hotel-enniskeen/` carries a ~60–75 s flagship film beside
   the existing still slider and 10 s demo pair.
3. A print-ready personalised one-sheet (PDF) and a written pitch exist,
   blocked from delivery only by the outreach gates (below), not by missing
   work.
4. Every touched doc updated in the same commit as the work it records.

## Preconditions

- [x] Land the in-flight working-tree changes (responsive media set, route
      unification) before starting — this plan builds on them.
- [x] Verification pass within the last month (20 July 2026).
- [x] **Day-of-build re-read** of enniskeenhotel.co.uk (the Buck's Head grew a
      ResDiary widget between verification and build; Donard grew PetsApp).
      **Gate:** if the hotel has rebuilt its site, the flagship premise is
      dead — stop, record in `research/pipeline/verifications.json`, and reselect.
- Pitch-delivery gates (Phase 3 output may be prepared, not sent, before
  these):
  - [ ] `mournemade.co.uk` resolves.
  - [ ] A production test submission of the request form reaches the intended
        inbox.
  - [ ] The printed QR is scanned on a phone against the deployed case study.

---

## Phase 0 — Re-verify and harvest ✅

The concept currently runs on one photograph (`enniskeen-balcony.jpg`, reused
for the hero and all three room cards) and the landing's own copy. A full site
needs the hotel's full published material, gathered honestly.

1. Re-read the live site page by page (see gate above); record any changes in
   `research/pipeline/verifications.json`.
2. **Content inventory** → `src/concepts/hotel-enniskeen/content.ts` (the
   `chamber-prototype.ts` precedent: shared typed content, pages stay thin):
   room types and names as the hotel publishes them, dining copy (Mourne
   Honey afternoon tea, Brandy Pad Lounge), grounds/estate copy (twelve
   acres, Shimna Valley), any functions/weddings content, voucher-shop URL,
   published rates if any, contact and directions. Rule: the concept reorders
   what the hotel already says — no invented services, no invented prices.
3. **Photography harvest**: catalogue usable images per page; select a
   distinct hero per page and a distinct photo per room card. Save masters to
   `public/images/enniskeen-*.jpg`, run `pnpm optimize:media` for the
   `-640`/`-1265` WebP variants `ResponsiveImage.astro` expects. All imagery
   remains the hotel's own, credited in the sources block (established
   convention; the flagship raises visibility, so credits stay prominent).
4. **Confirm the IA.** The published nav already makes the promise — Stay ·
   Dine · The estate · Things to do (`hotel-enniskeen.astro:16`, currently
   `#` links except Stay). The flagship keeps that promise, no more:

   | Route | Page | Content source |
   |---|---|---|
   | `/concepts/hotel-enniskeen/` | Home (exists; nav goes live) | current landing |
   | `…/rooms/` | Stay (exists; gets real per-room photos/names) | hotel's rooms pages |
   | `…/dine/` | Dine — restaurant, afternoon tea, Brandy Pad Lounge | hotel's dining pages |
   | `…/estate/` | The estate — twelve acres, Shimna Valley | hotel's grounds copy |
   | `…/things-to-do/` | Things to do — Mournes, Newcastle, walks | hotel's area pages |

   Contact/directions become a shared footer block on every page rather than
   a sixth page, unless the harvest shows enough material. Vouchers are a CTA
   to the hotel's existing voucher shop, not a page. Add pages only where the
   hotel's own published content supports them.

**Exit criteria:** verification note recorded; `enniskeen-site.ts` populated
with sourced content (each block traceable to a live URL); image set on disk
with WebP variants; IA table confirmed or amended with reasons.

## Phase 1 — Full-site build ✅

1. Build the three new pages under `src/pages/concepts/hotel-enniskeen/`, all
   on `ConceptLayout` (noindex, disclosure, claim action come free), content
   from `enniskeen-site.ts`, styles extending `concept-enniskeen.css` with
   the same `enk-` prefix — same identity (deep pine `#1e3a2c`, cream, honey
   brass, Cormorant Garamond), no second identity.
2. Wire the nav on all five pages: real links, correct `aria-current`, brand
   → home. Remove every `href="#"` (including the landing's "Afternoon tea →"
   stub, which now goes to `/dine/`).
3. **Fix the Bookin1 handoff.** The availability forms GET to
   `…/index.jsp?ID=ecs&hotelCode=ecs#/hotel/ecs` — form submission replaces
   the action's query string, dropping `ID`/`hotelCode`
   (`hotel-enniskeen.astro:41`, `rooms.astro:208`). Hand-test the live engine:
   preserve required params as hidden inputs, confirm which
   arrival/nights/guests params the engine actually honours, and pass exactly
   those — or, if it honours none, make the CTA a clean link into the engine.
   The demo must not fake a handoff that doesn't work.
4. Rooms page upgrade: real room names and per-room photography from the
   Phase 0 harvest (currently three cards share one balcony photo).
5. Voucher CTA to the hotel's voucher shop; every booking action → Bookin1;
   phone `tel:` links kept.

**QA:** `pnpm build` clean; every page reachable from every page; zero
placeholder links; 390 px pass via `pnpm capture:responsive`; keyboard and
reduced-motion checks. `pnpm test:media` was retired on 4 August 2026
(`PLAN.md` section 1c), so its four properties are now hand checks.

**Exit criteria:** five linked pages live locally; booking handoff verified
against the real engine and recorded in the design notes; QA list clear.

## Phase 2 — Flagship film ♻ ✅ locally verified

A single ~60–75 s silent, captioned film — a different artifact from the 10 s
`MotionCompare` pair, built for the pitch, the homepage later, and sharing.

**Infrastructure (built here, reused by F2):**

1. Extend `tools/capture/capture-concept-media.mjs` with a `reel` subcommand (keep
   one pipeline): a declarative per-slug segment list — `goto` / `hold` /
   `scroll` / `hover` / `click` steps — recorded via the existing CDP
   screencast with `maxWidth` raised to 1920 for this mode, assembled by
   ffmpeg (`concat` per segment, `xfade` between segments).
2. **Title cards** rendered from a small HTML template through the same
   headless Chrome (studio identity is correct here — the film is a studio
   artifact *about* the concept; everything inside the browser frames remains
   the sites themselves).
3. `src/components/ReelPlayer.astro`: poster + explicit play (no autoplay,
   `prefers-reduced-motion` respected — the P4 pattern), MP4+WebM sources,
   `reel_play` analytics event. `transformation-details.ts` gains an optional
   `reel` field; `[slug].astro` renders the section when present.

**Storyboard (~75 s, revised 23 July 2026):**

| Beat | ~s | Content |
|---|---|---|
| Open card | 4 | "Enniskeen Country House Hotel, Newcastle" · "An independent concept study by Mourne Made" — the honesty label leads |
| Current visit | 14 | Arrival on the live site: archive logo, blue menu bar; the hunt for a room; the abrupt Bookin1 handoff |
| Turn card | 4 | "The same hotel. A clearer journey into the stay." The photographs and booking engine remain |
| Arrival | 7 | The concept holds on the Shimna Valley hero before the availability bar is introduced |
| Choose a room | 8 | Stay opens through the linked navigation; the room story and published room details have time to register |
| Complete the picture | 20 | Dine, then the estate and things to do: three representative destinations with restrained scrolling rather than a rapid inventory of pages |
| Check availability | 7 | Return to the persistent booking bar, choose dates, and enter the hotel's own Bookin1 results route |
| Direct comparison | 5 | Before and after opening screens side by side |
| End card | 5 | "Independent concept — not commissioned." · case-study URL · free before-and-after line |

The revised film follows the order in which a guest makes sense of the hotel:
arrive, understand the rooms, see what completes the stay, then check
availability. The Bookin1 handoff is the conclusion rather than an interruption
immediately after the concept hero. The duplicate split-screen booking reprise
has been removed; showing the handoff once, deliberately, is enough. The
linked navigation and the three representative interior destinations prove
the complete-site scope without giving every page an equally short slot.

**Output:** `public/media/concepts/hotel-enniskeen/hotel-enniskeen-reel.mp4` (1920×1080, target
≤ 12 MB) + WebM via `pnpm optimize:media`; poster still. Same-commit updates:
docs/MEDIA_CAPTURE.md gains a "Flagship reel" section, choreography table, QA
checklist (length, weight, caption legibility at small sizes, no overlays
mid-take, before side lands on the first carousel slide) and capture-log rows.

**Exit criteria:** film embedded on the transformation page behind
click-to-play; watchable in under 80 s; every claim inside it visually true on
the day of capture.

## Phase 3 — Case study and pitch package ♻ (implemented locally; deployed QR verification remains)

1. **Transformation page:** add the film section; add one new
   `secondSurfacesHtml` companion still for the strongest new page (likely
   Dine), captured via `capture-concept-screens.mjs` (register
   `hotel-enniskeen/dine`); refresh design notes and sources to build-day
   facts and dates.
2. **One-sheet** (PLAN.md M3 Option D, built as reusable infrastructure):
   dev-only print route `src/workbench/print/enniskeen-onesheet.astro`
   (A4 print CSS) rendered by a new `tools/print/print-onesheet.mjs` (headless
   Chrome print-to-PDF, slug-parameterised ♻) → `outputs/`. Face: the
   before/after pair and one-line promise. Reverse: the three changes, **what
   stays** (their photographs, their Bookin1 engine, their voucher shop), the
   affordability posture from `/about/` (fixed quotes, small starting
   scopes), QR to `/transformations/hotel-enniskeen/?src=onesheet` (tracked
   path, M3's open question answered), free before-and-after CTA. Tone rules
   from PRODUCT.md: change before ask, no SaaS theatre, labelled independent.
3. **Written pitch** → `research/concepts/hotel-enniskeen/enniskeen-pitch.md`: ~120-word email plus
   subject-line options, a 60-second in-person version, follow-up cadence,
   and objection notes ("we already have a booking engine" → we keep it; "we
   can't afford an agency" → fixed quote, small first scope). Belief-ladder
   order per PRODUCT.md.

**Exit criteria:** PDF proofed at print size; QR verified on a phone against
the deployed page; pitch doc reviewed against PRODUCT.md tone rules. Delivery
itself waits for the outreach gates and the M5 wave.

## Phase 4 — Record ✅

- [x] `research/pipeline/verifications.json`: re-verification note, build-day changes,
  flagship-expansion note (stage stays **Concept published** until contact).
- [x] `PROSPECTS.md`: Enniskeen row gains the full-site and film links.
- [x] `PLAN.md`: Milestone F progress.
- [x] `docs/MEDIA_CAPTURE.md`: reel mode, log rows.
- [x] `docs/DESIGN.md`: Enniskeen identity entry gains the full-site scope; ReelPlayer
  joins the component list.

## Out of scope

- CMS, live availability data, real booking backend — concept remains static.
- Weddings/functions page unless the hotel's own site publishes that content.
- Music or voiceover in the film (silent + captions: no licensing, plays
  muted in feeds, honest register).
- Commissioned photography; the hotel's own imagery only, credited.

## Risks

| Risk | Handling |
|---|---|
| Hotel rebuilds its site before build day | Phase 0 gate: stop and reselect; record in verifications |
| Bookin1 ignores deep-link params | Degrade to a clean engine landing; say so in design notes |
| Photo reuse objection once visibility rises | Prominent credits; sources block; swap on first request — established stance, restated in the film's end card |
| Reel weight blows the media budget | Click-to-play only; ≤ 12 MB MP4 / WebM primary; poster-first like MotionCompare |
| Scope creep toward "just one more page" | IA is fixed to the nav's existing promise; additions need Phase 0 evidence |

## Estimate

~6–7 focused sessions total (harvest 1 · build 2–3 · film 2 · pitch 1–1.5),
sequenced before F2 (`bucks-head-journey-plan.md`), which reuses the ♻ items
and drops to roughly half that.
