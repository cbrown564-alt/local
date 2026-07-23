# F1 · Enniskeen flagship — implementation plan

The studio's flagship case study: the full end-to-end treatment for Hotel
Enniskeen — a complete linked concept site, a flagship film, and a pitch
package. The demonstration is the product: this is the piece that leads
outreach to every other prospect.

Written 23 July 2026. Companion plan: `bucks-head-journey-plan.md` (F2, runs
second and reuses the infrastructure marked ♻ below). Roadmap summary lives in
`PLAN.md` under "Milestone F".

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

- [ ] Land the in-flight working-tree changes (responsive media set, route
      unification) before starting — this plan builds on them.
- [x] Verification pass within the last month (20 July 2026).
- [ ] **Day-of-build re-read** of enniskeenhotel.co.uk (the Buck's Head grew a
      ResDiary widget between verification and build; Donard grew PetsApp).
      **Gate:** if the hotel has rebuilt its site, the flagship premise is
      dead — stop, record in `research/verifications.json`, and reselect.
- Pitch-delivery gates (Phase 3 output may be prepared, not sent, before
  these): `mourneandmain.co.uk` resolves, and a production test submission of
  the request form delivers (REVIEW.md P1, both open as of 23 July).

---

## Phase 0 — Re-verify and harvest (~1 session)

The concept currently runs on one photograph (`enniskeen-balcony.jpg`, reused
for the hero and all three room cards) and the landing's own copy. A full site
needs the hotel's full published material, gathered honestly.

1. Re-read the live site page by page (see gate above); record any changes in
   `research/verifications.json`.
2. **Content inventory** → `src/data/enniskeen-site.ts` (the
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

## Phase 1 — Full-site build (~2–3 sessions)

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
reduced-motion checks; `pnpm test:media` still green.

**Exit criteria:** five linked pages live locally; booking handoff verified
against the real engine and recorded in the design notes; QA list clear.

## Phase 2 — Flagship film ♻ (~2 sessions)

A single ~60–75 s silent, captioned film — a different artifact from the 10 s
`MotionCompare` pair, built for the pitch, the homepage later, and sharing.

**Infrastructure (built here, reused by F2):**

1. Extend `scripts/capture-concept-media.mjs` with a `reel` subcommand (keep
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

**Storyboard (~70 s):**

| Beat | ~s | Content |
|---|---|---|
| Open card | 3 | "Enniskeen Country House Hotel, Newcastle" · "An independent concept study by Mourne & Main" — the honesty label leads |
| Before visit | 15 | Arrival on the live site: archive logo, blue menu bar; the hunt for a room; the dated booking handoff |
| Turn card | 3 | "The same hotel. Its own photographs. Its own booking engine." |
| After visit | 30 | Concept hero (valley + availability bar) → check availability into Bookin1 → rooms → dine → estate, quick page-flow beats |
| Split screen | 8 | Before/after heroes side by side (ffmpeg hstack), then both booking paths |
| End card | 4 | "Independent concept — not commissioned." · case-study URL · free before-and-after line |

**Output:** `public/videos/hotel-enniskeen-reel.mp4` (1920×1080, target
≤ 12 MB) + WebM via `pnpm optimize:media`; poster still. Same-commit updates:
MEDIA_CAPTURE.md gains a "Flagship reel" section, choreography table, QA
checklist (length, weight, caption legibility at small sizes, no overlays
mid-take, before side lands on the first carousel slide) and capture-log rows.

**Exit criteria:** film embedded on the transformation page behind
click-to-play; watchable in under 80 s; every claim inside it visually true on
the day of capture.

## Phase 3 — Case study and pitch package ♻ (~1–1.5 sessions)

1. **Transformation page:** add the film section; add one new
   `secondSurfacesHtml` companion still for the strongest new page (likely
   Dine), captured via `capture-concept-screens.mjs` (register
   `hotel-enniskeen/dine`); refresh design notes and sources to build-day
   facts and dates.
2. **One-sheet** (PLAN.md M3 Option D, built as reusable infrastructure):
   dev-only print route `src/workbench/print/enniskeen-onesheet.astro`
   (A4 print CSS) rendered by a new `scripts/print-onesheet.mjs` (headless
   Chrome print-to-PDF, slug-parameterised ♻) → `outputs/`. Face: the
   before/after pair and one-line promise. Reverse: the three changes, **what
   stays** (their photographs, their Bookin1 engine, their voucher shop), the
   affordability posture from `/about/` (fixed quotes, small starting
   scopes), QR to `/transformations/hotel-enniskeen/?src=onesheet` (tracked
   path, M3's open question answered), free before-and-after CTA. Tone rules
   from PRODUCT.md: change before ask, no SaaS theatre, labelled independent.
3. **Written pitch** → `research/enniskeen-pitch.md`: ~120-word email plus
   subject-line options, a 60-second in-person version, follow-up cadence,
   and objection notes ("we already have a booking engine" → we keep it; "we
   can't afford an agency" → fixed quote, small first scope). Belief-ladder
   order per PRODUCT.md.

**Exit criteria:** PDF proofed at print size; QR verified on a phone against
the deployed page; pitch doc reviewed against PRODUCT.md tone rules. Delivery
itself waits for the outreach gates and the M5 wave.

## Phase 4 — Record (in-line with every phase, per repo convention)

- `research/verifications.json`: re-verification note, build-day changes,
  flagship-expansion note (stage stays **Concept published** until contact).
- `PROSPECTS.md`: Enniskeen row gains the full-site and film links.
- `PLAN.md`: Milestone F progress.
- `MEDIA_CAPTURE.md`: reel mode, log rows.
- `DESIGN.md`: Enniskeen identity entry gains the full-site scope; ReelPlayer
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
