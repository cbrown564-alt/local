# Transformation media capture

How the before/after media on `/transformations/` pages is produced and shown:
a matched pair of opening-screen **stills** (drag-to-compare slider) plus a
matched pair of ~10-second **demo clips** (the "See it in motion" section), all
captured by one repeatable script.

## What gets captured

For a business slug the pipeline can produce four files:

| File | Content | Format |
| --- | --- | --- |
| `public/images/<slug>-before.jpg` | Live site opening screen, overlays dismissed | 2530×1420 JPEG (2× for crisp slider rendering) |
| `public/images/<slug>-after.jpg` | Concept opening screen from `/concepts/<slug>/` | 2530×1420 JPEG |
| `public/videos/<slug>-before.mp4` | ~10 s visit to the live site | 1264×710 H.264, muted |
| `public/videos/<slug>-after.mp4` | ~10 s visit to the concept | 1264×710 H.264, muted |

The stills feed the drag-handle comparison slider (`BeforeAfter.astro`) and
double as the **poster frames** for the clips, so the two sections always agree
on what the opening screen looks like. The clips feed the paired demo player
(`MotionCompare.astro`).

Castle Farm's stills are `.png` (`castle-farm-before.png` / `-after.png`); all
other slugs use `.jpg`. Posters reference whichever the page already uses.

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
  Before/After legend, autoplay-muted-loop-playsinline, poster = the committed
  still.
- **After-only mode** (`beforeVideo` omitted) — the before side shows the
  static still with a short "no live site" note; the after side plays the clip.
- **Reduced motion** — with `prefers-reduced-motion: reduce`, clips do not
  autoplay; the poster shows with a play control. A single button pauses/plays
  the whole section.

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

(Log rows are added in the same commit as each recapture.)
