# Shorts-snags motion plan

*Written 11 August 2026. Follows
[`shorts-snags-visuals-brief.md`](shorts-snags-visuals-brief.md) (shot lists)
and the stills/proof-cut stage it gated on — all five now exist and are
confirmed sample-accurate against their narration:

| Short | Proof cut | Duration |
| --- | --- | --- |
| S1 | `media/film/clips/shorts-snags/S1/S1-stills-v0.mp4` | 57.4s |
| S2 | `media/film/clips/shorts-snags/S2/S2-stills-v0.mp4` | 60.8s |
| S3 | `media/film/clips/shorts-snags/S3/S3-stills-v0.mp4` (v1, v2 also exist) | 57.2s |
| S4 | `media/film/clips/shorts-snags/S4/S4-stills-v0.mp4` | 62.1s |
| S5 | `media/film/clips/shorts-snags/S5/S5-stills-v0.mp4` | 59.4s |

That's the gate the trailer's method insisted on: the still-cut-to-audio is
already a complete, shippable artefact. Everything below is optional polish
on top of something that already works — not a step motion is required to
complete.

**Status: research only.** No clip has been generated yet. Nothing here is
approved to ship.

---

## 1. The rule, carried over from the trailer

`trailer-visuals-brief.md` §1: *"Promote to motion only the shots that must
move. Four or five of the eighteen carry a physical turn; the rest are held
frames with a slow push, which is prototype **02 Depth**
(`docs/sensory-system-plan.md` phase 5a) and costs nothing."*

02 Depth is shipped infrastructure, not a proposal: a depth map per still
drives a parallax/push via `DepthStill.astro`, falling back to a plain
`ResponsiveImage` when the depth map, WebGL or motion budget is missing. That
covers every shot below that isn't in the table in §2 — apply it uniformly
across all five shorts' remaining ~35 shots rather than leaving them
perfectly static. No Omni cost, no generation, no provenance entry beyond
what the still already has.

## 2. What gets promoted

One shot per short — the shot that **is** the mechanism of that short's
theme, not just a moment in it. Five clips total across ~40 shots (~12%),
leaner than the trailer's ~25%: these are voiced essays holding 8–13s a
shot, not a rapid-fire beat sheet, so held frames carry their weight longer
before a push reads as static.

| Short | Shot(s) | Still(s) to reference-lock | The turn |
| --- | --- | --- | --- |
| S1 | 07→08 | `s1-07-stripped-away-v0.png` → `s1-08-clear-pane-v1.png` | Second frosted sheet lifts away; clear pane revealed, interior light steps up one stop. |
| S2 | 04→07 | `s2-04-low-hours-plate-v0.png` → `s2-07-hours-plate-top-v1.png` | Hours-plate rises from the stall-riser to the top of the fascia. |
| S3 | 03→08 | `s3-03-disconnected-clapper-v2.png` → `s3-08-clapper-returned-v0.png` | Disconnected clapper swings into contact with the bell wall. |
| S4 | 04→08 | `s4-04-low-plaque-v0.png` → `s4-08-plaque-window-v0.png` | Low plaque rises from the stall-riser to window height. |
| S5 | 03 | `s5-03-nameplate-lifting-v1.png` | Blank nameplate lifts away from its fascia mounting marks — already framed as a lift in the still itself; may read as motion-ready with only a short hold-to-hold interpolation. |

Each is chosen because it's the one gesture in its short that a depth-map
push cannot fake — an object relocating, not the camera moving past a static
scene. Everything else in each shot list is camera-relative (a push, a
pull-down, a wide-to-close) and belongs in 02 Depth, not Omni.

## 3. Generation notes, per the Omni non-negotiables

Carried from `omni-clip-backlog.md` §"Non-negotiables (every clip)" —
unchanged for this batch:

1. **Still is the real experience** under `prefers-reduced-motion` / no-JS —
   each clip needs its source still shipped as the fallback poster, not just
   as a generation input.
2. **Provenance entry** in `../image-provenance.md` before commit, one row
   per clip.
3. **Image-to-video with reference lock** on the *pair* of stills named
   above, not a single image + text prompt — the end-state still already
   exists for all five, so this is interpolation between two approved
   frames, the strongest-constrained case Omni supports, not open
   generation.
4. **6–10s length.** Long enough to read the object relocating, short enough
   to loop or hold without asking for a second beat.
5. **No native audio.** Silent — confirmed against this trailer's own music
   test, which was rejected as "horrible"; these clips inherit that call.
   Foley, if it's ever tried, is a separate decision, not a default.
6. **SynthID stays on** — no processing step should strip it.
7. **No invented lettering** — every still in the pair is already
   letterless by the shared grammar; watch the interpolated frames
   specifically for Omni inventing signage mid-motion, which is the exact
   failure `omni-clip-backlog.md` flags from the Kent promenade clip.
8. **Shipping pattern**: `<video autoplay muted loop playsinline>` only when
   both `.webm` and `.mp4` exist beside the still; poster + alt stay on the
   still; pause off-screen / under reduced motion. Same pattern as every
   existing concept loop (`ScHero.astro`).

## 4. What this session can't do

No Omni/video-generation tool is available in this environment — the
T-scene clips in `omni-clip-backlog.md` were made through interactive
Gemini Omni sessions, not a script (`tools/pipeline/` has no
clip-generation entry, only `generate-studio-audio.mjs` and
`generate-hero-ambience.mjs` for audio, and `assemble-hero-film.mjs` for
cutting already-generated footage together). This document is the
handoff: five reference-locked pairs, ready to run through that tool when a
session with it picks this up.

## 5. Order of operations

1. Run the five clips above through Omni, one short at a time — cheapest
   validation is S5 shot 03, since it's a single still already framed as a
   lift rather than a two-still interpolation.
2. Provenance entry per clip immediately on generation, before any cut.
3. Cut each returned clip into its short's existing proof cut in place of
   the still pair it replaces — duration and narration timing don't change,
   only that one window becomes video.
4. Judge each on the same acceptance line the trailer used: does the clip
   read as *one physical turn*, or does it invite a second look for its own
   sake? Kill and hold the still if the latter.
5. 02 Depth pass across the remaining ~35 shots is independent of 1–4 and
   can happen in either order — it's a build-time step, not a generation
   spend.
