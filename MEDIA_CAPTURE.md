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
| `public/images/<slug>-before.jpg` | Live site opening screen, overlays dismissed | 2530×1420 JPEG (2× for crisp slider rendering) |
| `public/images/<slug>-after.jpg` | Concept opening screen from `/concepts/<slug>/` | 2530×1420 JPEG |
| `public/videos/<slug>-before.mp4` | ~10 s visit to the live site | 1264×710 H.264, muted |
| `public/videos/<slug>-after.mp4` | ~10 s visit to the concept | 1264×710 H.264, muted |
| `public/images/<stem>-640.webp` | Phone delivery image | 640px WebP |
| `public/images/<stem>-1265.webp` | Large delivery image | 1265px WebP |
| `public/videos/<stem>.webm` | Preferred delivery clip | VP9 WebM, muted |

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
| **Real live website** | castle-farm, hotel-enniskeen, mourne-cycles, donard-veterinary, bucks-head | ✅ clip | ✅ clip |
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

`scripts/capture-concept-media.mjs`. Tools, all local, no browser download:

- **puppeteer-core** driving the installed system Chrome in new-headless mode.
- **CDP `Page.startScreencast`** for demo frames — Chrome emits a JPEG frame on
  every visual change with an epoch timestamp, so static holds cost nothing and
  pacing is exact. The final static hold has no frame of its own, so its
  duration is measured from the wall clock when the screencast stops.
- **ffmpeg-static** to assemble frames into H.264 MP4 (`concat` demuxer with
  real per-frame durations, 30 fps output, `yuv420p`, `+faststart`).
- **sharp** (from Astro's dependency store) for mozjpeg stills.
- **`scripts/optimize-public-media.mjs`** to derive 640px/1265px WebP images
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

node scripts/capture-concept-media.mjs <slug>                 # both sides, still + video
node scripts/capture-concept-media.mjs <slug> both video      # both sides, video only
node scripts/capture-concept-media.mjs <slug> after video     # concept demo clip only
node scripts/capture-concept-media.mjs <slug> before still    # refresh one still
pnpm optimize:media                                           # refresh delivery derivatives
pnpm test:media                                               # verify delivery in pnpm preview
```

- **Arg 2 (target):** `both` (default) · `before` · `after`.
- **Arg 3 (what):** `both` (default) · `video` · `still`. Use `video` to add
  demo clips without overwriting verified committed stills.

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

`node scripts/capture-concept-media.mjs hotel-enniskeen reel` uses the same
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

The 23 July revision replaced the original rapid page inventory with a guest
journey: arrive, understand the rooms, see what completes the stay, then book.
The booking handoff now concludes the concept visit. The closing comparison
holds each opening view at full size and uses a single wipe from before to
after, so neither hero is reduced to a narrow crop.

Enniskeen delivery files:

- `public/videos/hotel-enniskeen-reel.mp4` — H.264 fallback, 75.83 s,
  1920×1080, 5.74 MB.
- `public/videos/hotel-enniskeen-reel.webm` — VP9 preferred source, 75.83 s,
  1920×1080, 5.83 MB.
- `public/videos/hotel-enniskeen-outreach-reel.mp4` — 49.40 s H.264
  first-contact edit, 1920×1080, 2.97 MB.
- `public/videos/hotel-enniskeen-outreach-reel.webm` — 49.40 s VP9
  first-contact edit, 1920×1080, 3.22 MB. Both outreach files retain the
  opening, booking journey and full-frame before-to-after wipe and are
  generated alongside the complete reel.
- `public/images/hotel-enniskeen-reel-poster.jpg` — 1920×1080, 220 KB, with
  responsive WebP derivatives.

Final local QA on 23 July 2026:

- Both encodes decoded from first frame to last without errors. The revised
  MP4 contact sheet was inspected at roughly 320 px per frame: captions remain
  legible, the current site starts on its intended first carousel slide, and
  no consent or late pop-up overlay appears mid-take.
- The concept opening, Stay, Dine, estate and things-to-do segments now hold
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
  checks. `mourneandmain.co.uk` had no DNS record on 23 July 2026, so this
  film and the one-sheet must not be distributed yet.

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

## Capture log

| Business | Date | Media | Overlays found → action | Notes |
| --- | --- | --- | --- | --- |
| castle-farm | 23 Jul 2026 | before+after still & clip | Sign-up lightbox + cookie banner → clicked "Decline" | Stills normalised `.png`→`.jpg`; old popup still replaced |
| hotel-enniskeen | 23 Jul 2026 | before still & clip, after clip | Cookie bar → clicked "I Consent" | Before still recaptured clean (was cookie-bar) |
| hotel-enniskeen flagship | 23 Jul 2026 | 75 s guest-journey reel, poster, Rooms + Dine companion stills | Cookie bar → clicked "I Consent"; no late overlays | MP4/WebM full-decode and revised small-frame visual QA passed; player loading, reduced-motion and keyboard checks passed |
| donard-veterinary | 23 Jul 2026 | before still & clip, after clip | PetsApp chat panel → `hide iframe[title="petsapp-chat"]` | Panel auto-opens with variable timing; hidden (bubble goes too) |
| mourne-cycles | 23 Jul 2026 | before+after clip | None found | Committed clean stills kept as posters |
| bucks-head | 23 Jul 2026 | before+after clip | None found | Committed clean stills kept as posters |
| scopers | 23 Jul 2026 | after clip | n/a (after only) | First-website: before stays the gated-social still |
| cupla | 23 Jul 2026 | after clip | n/a (after only) | First-website: before stays the gated-social still |
| tool-centre | 23 Jul 2026 | after clip | n/a (after only) | First-website: before stays the gated-social still |
| kent-amusements | 23 Jul 2026 | after clip | n/a (after only) | First-website: before stays the gated-social still |
| newcastle-chamber | 23 Jul 2026 | after clip | n/a (after only) | First-website: before stays the gated-social still |

(Log rows are added in the same commit as each recapture.)
