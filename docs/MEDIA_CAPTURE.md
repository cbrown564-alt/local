# Transformation media capture

How the before/after media on `/transformations/` pages is produced and shown:
a matched pair of opening-screen **stills** (drag-to-compare slider) plus a
matched pair of ~10-second **demo clips** (the "See it in motion" section), all
captured by one repeatable script.

## What gets captured

For a business slug the capture pipeline produces four master files. The
delivery task then creates the responsive derivatives used by the browser:

| File | Content | Format |
| --- | --- | --- |
| `public/media/concepts/<slug>/<slug>-before.jpg` | Live site opening screen, overlays dismissed | 2530×1420 JPEG (2× for crisp slider rendering) |
| `public/media/concepts/<slug>/<slug>-after.jpg` | Concept opening screen from `/concepts/<slug>/` | 2530×1420 JPEG |
| `public/media/concepts/<slug>/<slug>-before.mp4` | ~10 s visit to the live site | 1264×710 H.264, muted |
| `public/media/concepts/<slug>/<slug>-after.mp4` | ~10 s visit to the concept | 1264×710 H.264, muted |
| `public/media/concepts/<slug>/<stem>-640.webp` | Phone delivery image | 640px WebP |
| `public/media/concepts/<slug>/<stem>-1265.webp` | Large delivery image | 1265px WebP |
| `public/media/concepts/<slug>/<stem>.webm` | Preferred delivery clip | VP9 WebM, muted |

The stills feed the drag-handle comparison slider (`BeforeAfter.astro`) and
double as the **poster frames** for the clips, so the two sections always agree
on what the opening screen looks like. The clips feed the paired demo player
(`MotionCompare.astro`). JPEG and MP4 remain the capture masters and browser
fallbacks; normal delivery prefers the responsive WebP and WebM files.

## Why demo clips exist

A homepage still cannot show a rotating hero, a dropdown menu, a hover state,
scroll behaviour, or how quickly a visitor reaches the main action. Those are
exactly the things the concepts improve, so each comparison carries a short
scripted visit of both versions, captured identically — same viewport, same
choreography, same length — to keep the comparison fair.

## Coverage: which concepts get which media

| Group | Concepts | Before demo | After demo |
| --- | --- | --- | --- |
| **Real live website** | castle-farm, hotel-enniskeen, mourne-cycles, donard-veterinary, bucks-head, painted-earth | ✅ clip | ✅ clip |
| **First-website** | scopers, cupla, tool-centre, kent-amusements, newcastle-chamber | ✖ still only | ✅ clip |

**First-website concepts have no site of their own** — their only public
presence is a gated social page. The `*-before.jpg` stills are Facebook
login/cookie walls, left visible on purpose (that *is* the finding: there is no
website to visit). Auto-driving a 10-second demo of a login modal would show
nothing, sit off-message, and run against the platform's automation terms, so
these carry an **after-only** motion demo. The "before" side keeps the honest
static still with a short note. In the config, `before: null` marks this group.

## Overlay policy (stills and before-clips of real sites)

**Decision (21 July 2026):** on real live sites, consent banners,
newsletter/sign-up lightboxes and auto-expanded chat panels are dismissed
before any capture. This supersedes the earlier "capture the page as a
first-time visitor meets it" rule — in practice that produced stills that were
mostly popup (Castle Farm's was a sign-up form over a cookie banner) and told
the reader nothing about the page underneath. The comparison judges the page a
business designed, not the legal chrome stacked on top of it; leaving popups in
also reads as a cheap shot, which the studio's respectful-comparison stance
rules out.

Dismissal preference, in order:

1. **Refuse** — "Decline" / "Reject" / "Necessary only" where offered.
2. **Accept** — where the banner offers no refusal.
3. **Close** — the ×/dismiss control, for sign-up and promo lightboxes.

Chat widgets are collapsed to their idle bubble, never removed: the bubble is
part of the site a visitor sees, the auto-expanded panel is not. Per-site
`hide` CSS is a last resort for widgets that cannot be clicked in a headless
session; its use is recorded in the capture log below.

This policy does **not** apply to first-website "before" stills, where the
login/cookie wall is the point and stays visible (see coverage table).

Transformation pages state in their Sources section that arrival prompts were
closed before capture, so the transparency stance is preserved.

## Pipeline

`tools/capture/capture-concept-media.mjs`. Tools, all local, no browser download:

- **puppeteer-core** driving the installed system Chrome in new-headless mode.
- **CDP `Page.startScreencast`** for demo frames — Chrome emits a JPEG frame on
  every visual change with an epoch timestamp, so static holds cost nothing and
  pacing is exact. The final static hold has no frame of its own, so its
  duration is measured from the wall clock when the screencast stops.
- **ffmpeg-static** to assemble frames into H.264 MP4 (`concat` demuxer with
  real per-frame durations, 30 fps output, `yuv420p`, `+faststart`).
- **sharp** (from Astro's dependency store) for mozjpeg stills.
- **`tools/media/optimize-public-media.mjs`** to derive 640px/1265px WebP images
  and VP9 WebM clips after the capture masters change.

Per-target flow: open at 1265×710 → wait for network idle + per-site `settleMs`
→ dismiss overlays → capture still (2×) → drop to 1× → record demo.

### Demo choreography (~10 s)

| Phase | Duration | Purpose |
| --- | --- | --- |
| Hero hold | 2.0 s | Carousels and entrance animations play |
| Scroll stops (default 0.85 vh, 1.7 vh) | 0.7 s glide + 1.45 s dwell each | Page structure, scroll behaviour, lazy content |
| Return to top | 0.9 s + 0.5 s | Restores the opening framing |
| Hover target(s) | 1.6 s | Dropdown menus and primary CTAs read best |
| Closing hold | padded | Every clip lands at ~10 s |

Scroll stops are clamped to the page's real scroll range and deduplicated, so
short single-screen concepts skip dead scrolls; total length is padded from the
wall clock so before and after clips match.

## Running it

```powershell
pnpm build
pnpm preview        # serves 127.0.0.1:4321 in another terminal

node tools/capture/capture-concept-media.mjs <slug>                 # both sides, still + video
node tools/capture/capture-concept-media.mjs <slug> both video      # both sides, video only
node tools/capture/capture-concept-media.mjs <slug> after video     # concept demo clip only
node tools/capture/capture-concept-media.mjs <slug> before still    # refresh one still
pnpm optimize:media                                           # refresh delivery derivatives
pnpm test:media                                               # verify delivery in pnpm preview
```

- **Arg 2 (target):** `both` (default) · `before` · `after`.
- **Arg 3 (what):** `both` (default) · `video` · `still`. Use `video` to add
  demo clips without overwriting verified committed stills.
- **`CHROME_PATH`** points the resolver at a Chrome or Chromium binary when it
  is not in a standard location.
- **`CHROME_NO_SANDBOX=1`** adds `--no-sandbox`, which Chrome requires when it
  runs as root inside a container. Leave it unset on a workstation so the
  sandbox stays on.

`pnpm optimize:media` rewrites every derivative, not only the ones whose master
changed, so the encoder's output churns files that are otherwise untouched.
After recapturing one slug, revert the derivatives belonging to the others
before committing.

### Adding a business

Add an entry to `CONCEPTS` in the script:

- `before` — live site URL, or `null` for a first-website concept (after only).
- `settleMs` — pre-capture settle (rotating heroes land differently; keep the
  shortest settle that loads the hero and verify it is stable across runs).
- `beforeHover` / `afterHover` — CSS selector or `text=Visible Label` (exact,
  case-insensitive), or an array tried in order, for the end-of-demo hover.
- `dismiss` (optional) — ordered site-specific steps, selector or `text=`.
- `hide` (optional, last resort) — selectors removed with injected CSS; log it.
- `scrollStops` (optional) — viewport-height multiples when the default suits
  the page badly.

## Display

`MotionCompare.astro` renders the "See it in motion" section beneath the
still slider on each transformation page:

- **Paired mode** — before and after `<video>` side by side, each with a
  Before/After legend, a responsive WebP poster and WebM/MP4 sources.
- **After-only mode** (`beforeVideo` omitted) — the before side shows the
  static still with a short "no live site" note; the after side plays the clip.
- **Explicit playback** — no visitor receives video bytes on page load or
  scroll. A single “Play demos” button loads and starts the available clips;
  the same control pauses them.

## Flagship reel

`node tools/capture/capture-concept-media.mjs hotel-enniskeen reel` uses the same
Chrome and ffmpeg pipeline for a longer, captioned case-study film. Its
declarative plan has thirteen segments built from `goto`, `hold`, `scroll`,
`hover` and `click` actions plus Chrome-rendered title cards and an ffmpeg
comparison wipe. Browser segments capture at 1920×1080; the assembly uses short
crossfades and remains silent.

| Sequence | Segment IDs | What is shown |
| --- | --- | --- |
| Honest opening | `open-card` | Independent concept; not commissioned |
| Current visit | `before-home`, `before-rooms`, `before-booking` | First carousel slide, room hunt and live Bookin1 handoff |
| What changes | `turn-card` | Keep the hotel's photographs and booking engine |
| Arrive and choose | `after-home`, `after-rooms` | A settled first impression followed by the room story |
| Complete the stay | `after-dine`, `after-estate`, `after-things-to-do` | Dining, the grounds and the wider Mournes with enough dwell time to read each page |
| Check availability | `after-booking` | The persistent booking bar leads into the hotel's own Bookin1 results route |
| Direct comparison | `swipe-heroes` | Full before view, then a directional wipe to the full after view |
| Close | `end-card` | Independent label, case-study URL and free before-and-after line |

The 23 July revision replaced the original rapid page inventory with a
guest-first sequence: arrive, understand the rooms, see what completes the
stay, then book.
The booking handoff now concludes the concept visit. The closing comparison
holds each opening view at full size and uses a single wipe from before to
after, so neither hero is reduced to a narrow crop.

Captions follow three related treatments. Proof captions state a specific
problem or retained feature during the current-site footage. Numbered
editorial captions guide the guest from arrival to booking. Quieter serif
captions sit over the estate and local-area footage, where the photography
needs more room. The comparison keeps one continuous proof line while the
image wipes from before to after, avoiding two sentences colliding in motion.

Enniskeen delivery files:

- `public/media/concepts/hotel-enniskeen/hotel-enniskeen-reel.mp4` — H.264 fallback, 76.90 s,
  1920×1080, 5.89 MB.
- `public/media/concepts/hotel-enniskeen/hotel-enniskeen-reel.webm` — VP9 preferred source, 76.90 s,
  1920×1080, 5.64 MB.
- `public/media/concepts/hotel-enniskeen/hotel-enniskeen-outreach-reel.mp4` — 50.67 s H.264
  first-contact edit, 1920×1080, 3.09 MB.
- `public/media/concepts/hotel-enniskeen/hotel-enniskeen-outreach-reel.webm` — 50.67 s VP9
  first-contact edit, 1920×1080, 2.97 MB. Both outreach files retain the
  opening, booking sequence and full-frame before-to-after wipe and are
  generated alongside the complete reel.
- `public/media/concepts/hotel-enniskeen/hotel-enniskeen-reel-poster.jpg` — 1920×1080, 183 KB, with
  responsive WebP derivatives.

Final local QA on 31 July 2026 (recapture after on-page menus and Royal County
Down golf image):

- Both encodes decode end-to-end. Dine opens on the Honey afternoon tea panel;
  Things to do scrolls through to the golf band with the new links photograph.
- Concept segments: Arrive 9.1 s, Stay 8.9 s, Dine 7.9 s, estate 7.5 s,
  things-to-do 7.6 s before crossfades; booking handoff still closes the visit.
- Outreach edit remains nine segments (50.67 s). One-sheet regenerated to
  `.scratch/print/pdf/hotel-enniskeen-flagship-onesheet.pdf` (624 KB, 2 pages).

Earlier local QA on 23 July 2026:

- Both encodes decoded from first frame to last without errors. The revised
  MP4 contact sheet was inspected at roughly 320 px per frame: captions remain
  legible, the current site starts on its intended first carousel slide, and
  no consent or late pop-up overlay appears mid-take.
- The concept opening, Stay, Dine, estate and things-to-do segments then held
  for 8.6, 8.9, 8.2, 7.5 and 7.5 seconds respectively before crossfades. The
  booking handoff follows them instead of interrupting the concept opening.
- The comparison holds the full current hero for 2 seconds, wipes to the
  concept over 1.2 seconds, then holds the full concept hero. The Before/After
  label changes with the image.
- The outreach edit uses nine existing segments: the honest opening, current
  arrival and booking handoff, change card, concept arrival, rooms and booking
  handoff, full-frame comparison and close. It is assembled from the same
  captured sources rather than maintained as a second manual timeline.
- Both recorded booking actions resolve into Bookin1; the concept handoff
  carries arrival date and length of stay.
- `pnpm test:media` confirms no reel source is requested before explicit
  activation, the WebM is preferred, reduced-motion remains opt-in, and the
  film plays and pauses from the keyboard through native controls.
- The end-card domain and printed QR are release checks, not local capture
  checks. `mournemade.co.uk` had no DNS record on 23 July 2026, so this
  film and the one-sheet must not be distributed yet.
- **Generated assets do not follow a rename or domain change.** A text sweep
  updates `tools/print/print-onesheet.mjs` but not the QR it writes to
  `public/media/concepts/<slug>/<slug>-onesheet-qr.svg`, and not the reel title cards or the
  PDF under `.scratch/print/pdf/`. After any name or URL change, re-run
  `pnpm print:onesheet <slug>` (with `pnpm dev` serving the dev-only workbench
  route) and re-render affected film segments, then confirm the QR resolves by
  scanning the printed sheet on a phone. This was missed once already on
  23 July 2026 — the QR shipped pointing at the previous domain.

## Journey films

`node tools/capture/capture-concept-media.mjs bucks-head journey` films the same
errand twice — once on the business's live site, once on the concept — at phone
size, and assembles a side-by-side edit. It answers a different question from
the reel: not "what could this look like" but "how far is it to the thing people
came for".

Steps live in `tools/lib/journeys.mjs` and are read by two consumers: this
film mode and the build-day audit (`tools/capture/audit-journey.mjs`). One definition
means the film can never show a step count the filed evidence does not.

### The fairness rule

Pacing is fixed; the only variable is how many steps the errand takes.

- Every step holds for the same `JOURNEY_DWELL_SECONDS` on both sides. There is
  no per-step tuning and no speed-up of the "before" side.
- Taps get an identical neutral ripple, injected the same way on both sides.
- **Page loading is never filmed.** A navigating tap is filmed for a fixed beat,
  the wait for the next page happens off camera, and the destination is then
  filmed for the same dwell as any other step. Without this the live site would
  look slow purely because it is on real hosting while the concept is served
  from `pnpm preview`.
- Whichever side finishes first freezes on its last frame so the pair stays in
  step (`tpad`), rather than either side being stretched or compressed.
- Both sides of a booking errand are made to finish in the same place — the
  business's own booking engine — because the comparison is about the path
  around the engine, not the engine itself.

### The no-real-booking rule (hard)

The walk stops at the booking engine's date/party stage. It never types personal
details and never submits. This is enforced in code, not just documented:
`assertSafe()` in `tools/lib/journeys.mjs` refuses `fill` on any live side and
refuses any target naming a personal-details, confirm or payment control, on
either side. `capture-concept-media.mjs` calls `getJourney()` before launching,
so a definition that has drifted stops the run. Review the "before" clip by eye
after every capture.

### Outputs

| File | Content |
| --- | --- |
| `public/media/concepts/<slug>/<slug>-journey-before.mp4` | Portrait pair, live site, every errand |
| `public/media/concepts/<slug>/<slug>-journey-after.mp4` | Portrait pair, concept, every errand |
| `public/media/concepts/<slug>/<slug>-journey.mp4` | 1920×1080 side-by-side edit with title and end cards |
| `public/media/concepts/<slug>/<slug>-journey-poster.jpg` | Poster for the site player |

The combined edit is capped at 60 s and 8 MB; the run fails if either is
exceeded. WebM variants come from `pnpm optimize:media`.

### Evidence and print assets

`node tools/capture/audit-journey.mjs <slug>` walks the same steps and screenshots
every one to `.scratch/renders/<slug>-journey/<date>/`, with `summary.json` and
a `README.md` tap table. Steps marked `strip: true` also become print-ready
thumbnails in `public/images/`, so the one-sheet's journey strip is the audit's
own frames. `node tools/capture/audit-journey.mjs <slug> strips` regenerates just
those from evidence already on disk, so print artwork can be reworked without
walking someone else's live site again.

A tap whose target is off screen fails the audit rather than being scrolled into
view: a control the visitor cannot see is not one tap away, so the definition
has to spell out the scroll that reaches it.

### Buck's Head, 24 July 2026

| Errand | Live site | Concept |
| --- | --- | --- |
| Book a table for two, Saturday evening | 2 taps · 4 screens | 1 tap · 2 screens |
| Read the à la carte | 3 taps · 4 screens | 1 tap · 2 screens |

## QA checklist (every capture)

- Still shows the actual homepage — no consent banner, sign-up form, or
  expanded chat panel; chat bubble may remain. (First-website befores keep
  their login/cookie wall by design.)
- Both clips run 9.5–10.5 s and include the scroll pass and a visible hover
  moment; nothing pops up mid-clip (late modals appear on some sites — if one
  does, extend `settleMs` so it fires and is dismissed before capture).
- Hero shows the site at its own chosen best (first carousel slide, loaded
  images).
- Weight: still ≤ 350 KB, clip ≤ 3 MB.
- Pages referencing the captured view (alt text, design notes, source dates)
  still describe what the media now shows — update them in the same commit.

Journey films additionally:

- The "before" clip is reviewed by eye and stops at the widget's date/party
  stage: no personal details typed, no reservation made.
- Both sides show the same dwell per step; neither side is sped up, and no page
  load appears in either clip.
- Every count stated on the case study, the one-sheet or the pitch matches the
  audit `README.md` for that date. If a count moved, the business changed its
  site — re-measure or stand down, never reuse the old number.
- Combined edit inside 60 s and 8 MB; the tap counts in the overlay match the
  step lists.

## Capture log

| Business | Date | Media | Overlays found → action | Notes |
| --- | --- | --- | --- | --- |
| castle-farm | 23 Jul 2026 | before+after still & clip | Sign-up lightbox + cookie banner → clicked "Decline" | Stills normalised `.png`→`.jpg`; old popup still replaced |
| hotel-enniskeen | 23 Jul 2026 | before still & clip, after clip | Cookie bar → clicked "I Consent" | Before still recaptured clean (was cookie-bar) |
| hotel-enniskeen flagship | 23 Jul 2026 | 76 s guest-first reel, poster, Rooms + Dine companion stills | Cookie bar → clicked "I Consent"; no late overlays | MP4/WebM full-decode and revised small-frame visual QA passed; player loading, reduced-motion and keyboard checks passed |
| donard-veterinary | 23 Jul 2026 | before still & clip, after clip | PetsApp chat panel → `hide iframe[title="petsapp-chat"]` | Panel auto-opens with variable timing; hidden (bubble goes too) |
| mourne-cycles | 23 Jul 2026 | before+after clip | None found | Committed clean stills kept as posters |
| bucks-head | 23 Jul 2026 | before+after clip | None found | Committed clean stills kept as posters |
| bucks-head | 24 Jul 2026 | after still + clip recaptured | None found | Booking card rewired to the two parameters ResDiary honours, so the committed after still no longer matched the page |
| bucks-head journey | 24 Jul 2026 | portrait pair + 48 s side-by-side edit, poster, 6 strip thumbnails | None found | Both errands walked at 390×844; before side stopped at the widget's date/party stage, reviewed by eye — no reservation made |
| scopers | 23 Jul 2026 | after clip | n/a (after only) | First-website: before stays the gated-social still |
| cupla | 23 Jul 2026 | after clip | n/a (after only) | First-website: before stays the gated-social still |
| tool-centre | 23 Jul 2026 | after clip | n/a (after only) | First-website: before stays the gated-social still |
| kent-amusements | 23 Jul 2026 | after clip | n/a (after only) | First-website: before stays the gated-social still |
| newcastle-chamber | 23 Jul 2026 | after clip | n/a (after only) | First-website: before stays the gated-social still |
| dundrum-inn | 24 Jul 2026 | before+after still & clip | Consent prompt → clicked "Reject all" | Paired journey capture; live GuestDiary booking destination kept |
| dundrum-inn | 27 Jul 2026 | after still & clip recaptured | None found | Concept rebuilt 26 Jul and the hero image shipped, so the 24 Jul after-media showed the retired black-and-brass page. Before capture unchanged. Ran with `CHROME_NO_SANDBOX=1` in a container |
| groves-chemist | 24 Jul 2026 | before still, after still & clip | None; deactivation notice intentionally visible | Concept retired 27 Jul 2026; all media deleted from `public/`, retrievable at commit dc87b15 |
| tonn-ruray | 24 Jul 2026 | before+after still & clip | Promo lightbox → clicked coordinate (914,76) | Concept retired 27 Jul 2026; all media deleted from `public/`, retrievable at commit dc87b15. The before clip is the evidence that contradicted the apartment-first claim |
| kelly-mcevoy-brown | 24 Jul 2026 | before+after still & clip | None found | Paired portfolio comparison; source photography retained |
| bettys-butters | 24 Jul 2026 | before+after still & clip | None found | Paired comparison; placeholder flavours remain labelled in concept |
| douglas-cromie | 24 Jul 2026 | before stand-in still, after still & clip | n/a; domain ENOTFOUND | After-only motion; muted before card records the failed address honestly |
| donard-hotel | 24 Jul 2026 | before 404 still, after still & clip | n/a; HTTP 404 and no HTTPS listener | After-only motion; no OTA photography reused |
| newcastle-dental | 24 Jul 2026 | before redirect still, after still & clip | n/a; insecure redirect to DJ Maguire page | After-only motion; before records where the practice's address leads |
| hugh-mccanns | 24 Jul 2026 | before+after still & clip | None found | Paired feature comparison; maintained source site and photography retained |
| murdock-brothers | 24 Jul 2026 | internal before still, after still & clip | n/a; Wix domain-connection error | Internal-only capture; trading remains unconfirmed, so no transformation case or outreach |
| scopers | 27 Jul 2026 | supper-club after still recaptured | n/a (local concept) | Removed the stale dated event from the second-surface comparison |
| tool-centre | 27 Jul 2026 | hire-list after still recaptured | n/a (local concept) | Captures the repaired illustrative-equipment, conditions and rates disclosure |
| douglas-cromie | 27 Jul 2026 | after still & clip recaptured | None found | Captures the placeholder labels added to every sample forecourt listing |
| kelly-mcevoy-brown | 27 Jul 2026 | after still & clip recaptured | None found | Captures the repaired project register and its source-bounded metadata |
| scopers | 31 Jul 2026 | after still & clip, supper-club after still, all recaptured | n/a (local concept) | The fold changed: generated food imagery, a signature rail of dishes, and the bar's own badge in place of the redrawn stamp |
| hugh-mccanns | 27 Jul 2026 | after still & clip recaptured after fifth-check repair | None found | Carries a disclosed faithful visualisation of the venue's dining-room view and captures the enquiry handoff to the published email address |
| newcastle-dental | 27 Jul 2026 | after still & clip recaptured | None found | Captures the care pills after unsupported treatment claims were removed; recaptured again after the fifth-check repair moved current-site criticism out of the proposed patient page |
| hotel-enniskeen | 31 Jul 2026 | after still & clip, Dine companion still, 76.9 s flagship reel + 50.7 s outreach, poster, onesheet | Cookie bar → clicked "I Consent"; concept overlays none | Dine beat opens on on-page Honey afternoon tea; Things to do scrolls to Royal County Down golf image; case-study dine copy updated off PDF-only wording |
| public portfolio (16) | 1 Aug 2026 | before+after stills & clips where configured; all second surfaces; Enniskeen reel + outreach; Buck's Head journey | Per-site overlay pass; first-website befores skipped (no live site) | Full recapture after elevation work. Scopers journey blocked on Instagram login-wall Close control (live UI drift). Capture tool gained paint-nudge for single-screen after demos |
| painted-earth | 1 Aug 2026 | before+after still & clip; originals after still | Cookie/decline + close dialog on live Shopify | Capture config added; representative retail prototype remains internal/noindex |

(Log rows are added in the same commit as each recapture.)
