# X25 — postcard departure fronts

- Date: 7 August 2026
- Model: GPT-Image 2 via the built-in image-generation tool
- Prompt source: `research/film/studio-media-experiments.md` §X25 and
  `research/film/studio-recurring-themes.md` §T1–T10
- Output: ten 1536 × 1024 PNG stills plus a contact sheet
- Status: curated 7 August 2026; T04/T07 advance to A6 proof, T10 to a
  hand-delivered leave-behind, T01 is held for a face-to-face tone check

## Common prompt

Every front was generated as an A6-landscape, 3:2 full-bleed candidate in one
handcrafted miniature family: tactile clay and paper craft, subtle fingerprints
and handmade edges, County Down coastal slate / sea green / cream / aged brass,
restrained amber light, and a quiet stop-motion-film register. Every prompt
forbade people, faces, hands, lettering, numerals, logos, signage, watermarks,
identifiable businesses, glossy CGI, and the theme's fix state.

## Theme prompts and first review

| Theme | Departure-frame request | Selected file | First review |
| --- | --- | --- | --- |
| T1 | Warm shop sealed by a frosted pane and two blank forms; boots have turned away. | `../../../../../media/film/clips/studio/X25-postcard-fronts/X25-T01-login-at-the-door.png` | Pass — obstruction, business and departure read together. |
| T2 | Blank folded note abandoned in the gravel gap where its destination should be. | `../../../../../media/film/clips/studio/X25-postcard-fronts/X25-T02-dead-end.png` | Pass — the missing destination is immediate. |
| T3 | Shop obscured by oversized blank supplier shields; its own brass mark is barely visible. | `../../../../../media/film/clips/studio/X25-postcard-fronts/X25-T03-whose-shop.png` | Pass — deliberately louder than the rest of the family, as the theme requires. |
| T4 | Dark unreadable window in rain; umbrella has withdrawn toward the frame edge. | `../../../../../media/film/clips/studio/X25-postcard-fronts/X25-T04-are-you-open.png` | Pass — no answer or fix is visible. |
| T5 | Dead brass bell alone; unanswered telephone and empty chair behind; boots departing. | `../../../../../media/film/clips/studio/X25-postcard-fronts/X25-T05-bell-no-clapper.png` | Soft-fail risk — composition reads, but the full belief still depends on sound. |
| T6 | Three completely blank clipboards form a wall between the boots and the hidden loaf. | `../../../../../media/film/clips/studio/X25-postcard-fronts/X25-T06-worries-first-v2.png` | Pass after one edit — v1 exposed too much of the loaf; v2 hides it fully. |
| T7 | Ordinary shop above; its one meaningful brass tool remains buried in a dusty cellar drawer. | `../../../../../media/film/clips/studio/X25-postcard-fronts/X25-T07-best-thing-hidden.png` | Pass — hidden value is clear without turning into treasure fantasy. |
| T8 | Sealed blank envelope nailed to the door; boots have given up and left it closed. | `../../../../../media/film/clips/studio/X25-postcard-fronts/X25-T08-locked-in-file.png` | Pass — format obstruction reads without copy. |
| T9 | Dusty stopped clock and steaming fresh loaf share one frame. | `../../../../../media/film/clips/studio/X25-postcard-fronts/X25-T09-stopped-clock.png` | Pass — stale page and live business are simultaneous. |
| T10 | Two interchangeable shopfronts; the blank plate fits the second perfectly. | `../../../../../media/film/clips/studio/X25-postcard-fronts/X25-T10-swap-test.png` | Pass — the only difference is the moved plate and its empty recess. |

## Edit turn

T6 only: preserve the image and extend/overlap the three upright blank boards
until the loaf is fully hidden, leaving only a restrained amber glow at their
far edge. The unselected first generation remains as
`../../../../../media/film/clips/studio/X25-postcard-fronts/X25-T06-worries-first.png` so the edit decision is auditable.

## Contact sheet

`../../../../../media/film/clips/studio/X25-postcard-fronts/X25-contact-sheet-v2.png` contains the ten selected candidates in T1–T10
order. `../../../../../media/film/clips/studio/X25-postcard-fronts/X25-contact-sheet.png` records the pre-edit T6 set.

## Whispers

Ten matching ElevenLabs lines (theme messages only) generated 7 August 2026 —
see [`X25-whispers.md`](X25-whispers.md). Regenerator:
`node --env-file=.env tools/pipeline/generate-x25-whispers.mjs`. The curation
retired the audio companion; the files and generator remain research records.

## Next test

Crop and print **T04 and T07 only** at 105 × 148 mm; print T10 separately as a
hand-delivered leave-behind. Inspect legibility, disclosure, reverse hierarchy
and QR scanning at actual size. Do not widen the batch from the screen review.
The provenance entry is recorded in `research/image-provenance.md`.
