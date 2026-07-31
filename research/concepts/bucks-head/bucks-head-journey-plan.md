# F2 · Buck's Head journey case — implementation plan

The pitch piece built to win The Buck's Head as the first client: a
journey-led case — measured taps-to-a-booked-table and menus-on-a-phone —
that keeps their site, their photography, their brand and their ResDiary
engine. Explicitly **not** a rebuild: the honest critique recorded at
verification is the journey around the booking engine, not the site itself.

Written 23 July 2026. Runs **after** F1 (`enniskeen-flagship-plan.md`) and
reuses its infrastructure (marked ♻). Roadmap summary in `PLAN.md` under
"Milestone F".

## Why this shape (decision record)

Decided 23 July 2026. The Buck's Head fails the "underdeveloped website"
flagship criterion — its site is current, actively maintained, with modern
photography, and gained a ResDiary widget in the very week we built the
concept. Pitching a façade rebuild would ask them to throw away recent spend
and would read as dishonest against our own verification caveat. What they
demonstrably have is a journey problem: booking buried behind policy warnings,
five menus as PDF downloads, a wordless first screen. The winning artifact is
therefore a *journey* comparison — two phone-frame films of the same errand on
their site and on the concept — plus a walk-in pitch. Story assets: #1 of 8
Dundrum restaurants, 4.4★, chef Alex Greene and Bronagh McCormick since April
2024, and this is the studio's home village.

## Definition of done

1. Build-day evidence of both live journeys (booking, menu), step by step,
   with measured tap counts — dated and filed.
2. Both concept pages excellent at 390 px, with a verified ResDiary handoff.
3. A paired portrait journey film (before/after) plus a combined side-by-side
   edit, embedded on `/transformations/bucks-head/` in a new "Two journeys"
   section with only measured, dated claims.
4. A personalised one-sheet and a walk-in pitch script ready, gated only by
   the outreach gates.

## Preconditions

- F1 Phases 2–3 shipped (reel pipeline, ReelPlayer, print pipeline ♻).
- **Morning-of-build re-verification** — this site changes fast (ResDiary
  appeared between the 20 July pass and the 21 July build). **Gate:** if
  they have fixed the journey themselves, pivot the scope to whatever gap
  survives (likely menus/mobile) or stand down honestly; either way record
  it in `research/pipeline/verifications.json`. A pitch built on a stale critique is
  worse than no pitch.
- Same delivery gates as F1: domain resolves, request form delivers
  (docs/REVIEW.md P1). Re-verify again the morning of any walk-in.

---

## Phase 0 — Build-day journey audit (~0.5 session)

On a 390×844 viewport against the live site, walk both errands as a
first-time visitor and record every step:

1. **Book a table for two, Saturday 7 pm:** homepage → find booking →
   policy-warning screens → widget → date/party/time. Stop at the widget's
   details screen — see the no-real-booking rule below.
2. **Read the à la carte on a phone:** homepage → Menus → PDF download →
   pinch-zoom experience.

Screenshot every step to `.scratch/renders/bucks-head-journey/<date>/`;
tabulate taps, screens and scroll-hunting per errand. Confirm or retire each
recorded friction point (warnings before widget · PDF menus · wordless first
screen). Write the numbers into `research/pipeline/verifications.json` — these
measured counts are the spine of every claim downstream.

**Exit criteria:** evidence folder filed; tap table recorded; scope confirmed
or pivoted at the gate above.

## Phase 1 — Mobile concept polish (~1 session)

The concept pages were built to a 1265×710 capture; the journey film is
phone-first, so both pages must genuinely earn it at 390 px.

1. Audit `/concepts/bucks-head/` and `/concepts/bucks-head/menus/` at
   390×844 (`pnpm capture:responsive`): booking card thumb-reachable in the
   first screen or one swipe; menu tabs usable on a narrow viewport (switch
   the five-tab rail to a wrap/segmented layout or accordion if cramped);
   consider a slim sticky "Book a table" bar on scroll.
2. **Verify the ResDiary handoff.** The booking form GETs date/time/party/
   area onto the Standard widget URL (`bucks-head.astro:43-65` →
   `booking.resdiary.com/widget/Standard/TheBucksHeadRestaurantwithRooms/50459`).
   Hand-test which query parameters that widget actually honours and wire the
   form fields to exactly those names; drop any field the widget ignores. The
   film must show a real handoff, not a decorative form.
3. Keep the committed 1265×710 stills valid: if anything above the desktop
   fold changes, recapture per docs/MEDIA_CAPTURE.md in the same commit.

**Exit criteria:** both errands complete on the concept at 390 px in the
target step counts; handoff parameters verified against the live widget and
noted in the design notes.

## Phase 2 — Journey capture mode ♻ (~1 session)

Extend the F1 reel mode in `tools/capture/capture-concept-media.mjs` with a
`journey` subcommand:

- **Portrait preset** 390×844 (screencast sized to match) with a declarative
  step list per side: `goto` / `tap` (selector or `text=`) / `fill` /
  `scroll` / `hold`.
- **Identical tap indicator** injected on both sides (a neutral ripple at the
  click point) and **identical per-step dwell** — the fairness rule: pacing
  is fixed, the only variable is the number of steps. No speed-ups, no
  slow-downs on the before side.
- **No-real-booking rule (hard):** on the live site the script stops at the
  widget's date/party stage and never enters personal details or submits.
  Encode the stop in the script and document it in docs/MEDIA_CAPTURE.md.
- Outputs: `public/media/concepts/bucks-head/bucks-head-journey-before.mp4` and `-after.mp4`
  (portrait pair), plus a combined 1920×1080 side-by-side edit (hstack, step
  counters and captions styled identically both sides, title/end cards from
  the F1 card renderer — end card restates "independent concept, not
  commissioned"). WebM variants via `pnpm optimize:media`.

**Exit criteria:** paired clips of equal step-pacing; combined edit ≤ 60 s
and ≤ 8 MB; capture-log rows and QA checklist additions in docs/MEDIA_CAPTURE.md.

## Phase 3 — Case-study update (~0.5–1 session)

1. `/transformations/bucks-head/` gains a **"Two journeys"** section: the
   portrait pair (ReelPlayer ♻ or a portrait mode on MotionCompare —
   decide by fit when building), a small table of the measured numbers
   (taps · screens · dated), and refreshed design notes tied to the Phase 0
   evidence.
2. Sources block updated: build-day dates, the no-real-booking rule, the
   what-stays list stated plainly — their photography, their ResDiary, their
   brand, their site.
3. Only measured claims anywhere on the page; every number traceable to the
   evidence folder.

**Exit criteria:** section live; every claim dated and reproducible from
`.scratch/renders/bucks-head-journey/`.

## Phase 4 — Pitch (~0.5 session)

1. **One-sheet** via the F1 print pipeline ♻
   (`src/workbench/print/bucks-head-onesheet.astro` → `outputs/`): the face
   is the journey strip — step thumbnails before vs after with the two
   counts — not a façade comparison. Reverse: what stays / what changes, the
   affordability posture, QR to `/transformations/bucks-head/?src=onesheet`.
2. **Walk-in script** → `research/concepts/bucks-head/bucks-head-pitch.md`. This is a hometown,
   in-person pitch: respect first ("you've got a good site and a real
   booking engine — this is about the path to them"), the combined journey
   film shown on a phone, the one-sheet left behind, the free
   before-and-after as the only ask. Email version as fallback. Note the
   story hook (new chapter since April 2024) without presuming familiarity.
3. Gates before anything is handed over: docs/REVIEW.md P1 pair cleared;
   morning-of re-verification (again — if the journey improved since Phase
   0, refresh or stand down).

**Exit criteria:** PDF proofed; QR tested on a phone; script rehearsed
against PRODUCT.md tone rules (change before ask, no hard sell).

## Phase 5 — Record

Same-commit doc updates throughout: `research/pipeline/verifications.json` (audit
numbers, scope decisions, stage change to **Contacted** only when the walk-in
happens), `PROSPECTS.md`, `PLAN.md` Milestone F, `docs/MEDIA_CAPTURE.md`,
`docs/DESIGN.md` if a new component ships.

## Out of scope

- Any full-site rebuild framing — that is the honesty line this plan exists
  to hold.
- Pages for Fish & Farm, Gift vouchers, Rooms, Contact (landing nav stubs
  stay visibly inert placeholders unless work is commissioned).
- Faking ResDiary confirmation screens or completing real bookings.
- Music/voiceover; same silent-captioned register as F1.

## Risks

| Risk | Handling |
|---|---|
| They fix the journey themselves before build or pitch day | Gates at Phase 0 and Phase 4: re-measure, pivot to surviving gaps, or stand down and record it |
| ResDiary widget ignores deep-link params | Wire only what it honours; if nothing, the concept CTA opens the widget cleanly and the film shows that |
| Automated driving of their live booking flow creates a real reservation | Hard stop before details entry, encoded in the script; manual review of the before clip every capture |
| Walk-in lands badly as criticism of a business that just invested in its site | The respect-first framing is the pitch; the film opens on their own strengths (photography, #1 ranking) before the journey counts |
| Portrait media bloats the page | Click-to-play only, poster-first, WebM primary, combined edit capped at 60 s |

## Estimate

~3.5–4 focused sessions, roughly half of F1, because the reel pipeline, card
renderer, player component and print pipeline already exist (♻). Do not start
before F1 Phase 2 lands.
