# Shorts-snags motion review

*Originally written 11 August 2026; reviewed and closed 12 August 2026.* It
follows [`shorts-snags-visuals-brief.md`](shorts-snags-visuals-brief.md) (shot
lists) and the stills/proof-cut stage it gated on. All five now exist and are
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

**Status: reviewed 12 August 2026; the five-generation slate is closed.** No
new clip is needed to complete these shorts. Nothing here is approved to ship.
The purpose-level catalogue and source trace are in
[`video-purpose-dedup-audit-2026-08-12.md`](video-purpose-dedup-audit-2026-08-12.md).

---

## 1. The rule, carried over from the trailer

`trailer-visuals-brief.md` §1: *"Promote to motion only the shots that must
move. Four or five of the eighteen carry a physical turn; the rest are held
frames with a slow push, which is prototype **02 Depth**
(`docs/sensory-system-plan.md` phase 5a) and costs nothing."*

02 Depth is shipped infrastructure, not a proposal: a depth map per still
drives a parallax/push via `DepthStill.astro`, falling back to a plain
`ResponsiveImage` when the depth map, WebGL or motion budget is missing. It is
available for a later representative-slice test, but this review does not
infer that every held frame needs it. The still remains the preferred default.

## 2. Editorial reuse review

The proposed turns were compared with the five existing silent studio films
on `/where-it-fails/`, their research masters and the selected short stills.
The question was not whether the film shares a theme; it was whether the same
film can enter the narrated short without changing its visual world, object
identity, timing or meaning.

| Short | Existing scene reviewed | Decision | Evidence |
| --- | --- | --- | --- |
| S1 — login at the door | `public/media/studio/login-at-the-door.mp4` | **Retain still proof.** Do not reuse and do not generate. | The existing scene tells the complete boots/barrier/entry arc in a different frontage. The short's selected 07→08 pair changes from two removed paper sheets to a fully revealed pottery shop. An excerpt would neither preserve that identity nor explain the larger change. |
| S2 — are you open? | `public/media/studio/are-you-open.mp4` | **Retain still proof.** Do not reuse and do not generate. | The published scene already answers the theme with umbrella departure, light and clock. The short's low-plate→fascia hierarchy is a different composition across different camera angles. It is optional emphasis, not a missing causal beat. |
| S3 — bell with no clapper | `public/media/studio/bell-no-clapper.mp4` | **Retain still proof.** Do not reuse and do not generate. | The published film uses a counter bell, boots, reply card and back-room light. The short uses a disconnected counter-bell mechanism, telephone and a different wall-mounted bell as its closing image. Mixing them would change object identity instead of clarifying it. |
| S4 — best thing hidden | `public/media/studio/best-thing-hidden.mp4` | **Retain still proof.** Do not reuse and do not generate. | The existing hidden-key film is already the theme's physical metaphor, but the short's selected object is a low plaque brought to a lit shop window. A key excerpt would replace the narrated evidence rather than animate it. |
| S5 — swap test | `public/media/studio/swap-test.mp4` | **Retain still proof.** Do not reuse and do not generate. | A temporary full-length comparison replaced 0:10–0:15 with the published 5.04s clip. It cut visibly from the short's blue-dusk coastal shop into T10's flatter grey-green frontage, changed architecture and lighting, and introduced the wider move/add-details arc when the line asks only for the imagined name swap. The still is cleaner and more continuous. |

**Verdict: acceptable as still-first films.** The five proof cuts remain the
preferred edits. Motion is not missing merely because the selected stills
depict physical turns.

## 3. Proof-cut location check

All five documented proof cuts exist. S2, S3 and S5 are present in this
worktree. S1 and S4 are private media omitted from this worktree but were
located read-only in the main checkout:

- `/Users/cobro/code/local/media/film/clips/shorts-snags/S1/S1-stills-v0.mp4`
  — 57.40s, 1280×720, H.264/AAC;
- `/Users/cobro/code/local/media/film/clips/shorts-snags/S4/S4-stills-v0.mp4`
  — 62.08s, 1280×720, H.264/AAC.

They are not missing work and were not copied or rebuilt.

## 4. Closed generation slate

The earlier five-reference Omni handoff is superseded by the review above.
Do not submit S1–S5 as a batch, and do not create a replacement motion brief
for any of them. A later generation request must first name all four of these:

1. the exact final edit and time window it serves;
2. the missing causal beat that a held still and existing scene cannot carry;
3. the required continuity lock or aspect ratio;
4. the acceptance test that distinguishes the new result from the existing
   published scene.

Without those facts, retain the still. If a future accepted clip exists, the
original non-negotiables still apply: silent delivery, no invented lettering,
source still as the complete reduced-motion fallback, preserved SynthID and a
provenance entry before commit.

## 5. Remaining optional polish

The earlier suggestion to apply 02 Depth across roughly 35 held frames is not
part of this decision and should not be spread automatically. Judge any depth
pass on one representative short first. The settled still must remain the
complete experience, and a slow push should be kept only when it improves
attention or continuity without making a narrated held image restless.
