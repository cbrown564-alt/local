# Two-day media sprint manifest

Opened 9 August 2026. This is the source-of-truth for the bounded generation
wave. Masters and sidecars remain under `research/media-sprint/`; nothing moves
to `public/` until a page selects it, visible disclosure is designed and the
normal publication checks pass.

## Boundaries

- Synthetic subjects and general studio object theatre only.
- No new real-business concepts, owner likenesses, customer scenes or claims.
- No generated film or premises reconstruction for a named business.
- Every output has a job before generation and a sidecar before promotion.
- A selected motion asset needs a designed poster and settled reduced-motion
  frame. Text stays out of generated pixels.
- Preserve source masters. Derivatives are made only after selection.

## Status vocabulary

- `queued`: brief is ready; no generation accepted yet.
- `candidate`: output exists and awaits direct review.
- `selected`: review passed for the named job, not for publication.
- `reserve`: technically sound but not the preferred direction.
- `retired`: do not spend more generation time without a new product need.
- `blocked`: a required generator or evidence boundary is unavailable.

## Wave 1 jobs

| Job | Subject | Output | Job on the experience | Status |
| --- | --- | --- | --- | --- |
| `ST-T01-REPAIR` | General studio object theatre | corrected 16:9 film source + poster | show the account wall becoming a usable entrance | poster selected; central Gemini motion handoff queued |
| `ST-T04-REPAIR` | General studio object theatre | corrected 16:9 film source + poster; 9:16 crop candidate | show the first screen answering “are you open?” | poster selected; central Gemini motion handoff queued |
| `ST-X18-REWORK` | General studio object theatre | clean before / after source plates | support live DOM sequence: send the link → see the change → no obligation | after plate selected |
| `ST-T05-FRAME` | General studio object theatre | 16:9 image-to-video reference frame | make the bell, waiting visitor and unanswered back room readable without sound | candidate |
| `OP-PRODUCTS` | Synthetic seasonal food business | coherent product-photo source set | make the weekly availability list credible and editable | source master selected |
| `OP-STATES` | Synthetic seasonal food business | open / closed / reset environmental plates | give the weekly operating states distinct settled frames | reserve; cleanup needed |
| `IW-MATERIALS` | Synthetic mountain-bike workshop | material and inspection-light studies | establish a non-generic visual identity from workshop materials | exploration selected |
| `IW-CHAPTERS` | Synthetic terrain journey | five settled chapter plates | carry the reduced-motion Street → Workshop journey | high-ground exploration selected |
| `AU-OP-EVAL` | Synthetic operating-page helper | separable non-voice cues | test whether audio makes owner confirmation clearer | three existing stems curated |
| `AU-IW-EVAL` | Synthetic terrain journey | separable mechanical/environmental stems | test optional state-driven sound without a soundtrack | three existing stems curated |

## Integration checkpoint — 10 August 2026

The reversible public integration now places T01, T04, T05, T07 and T10 beside
their matching `/where-it-fails/` sections, with the X18 closed/open pair beside
the request invitation. T05 was generated from the selected T05 reference
frame; its public derivatives are silent and use the final frame as the settled
poster. Every film is poster-first and visibly disclosed. No synthetic voice or
optional audio is needed for meaning.

## Existing selections carried into the wave

The curation in `research/film/clips/studio/MANIFEST.md` remains authoritative:
T01 and T04 are repair candidates; X18 is a rework; X19 is page-only support;
X25 T04/T07 are print proofs and T10 is a hand-delivered leave-behind. No
retired branch is reopened merely to fill the generation window.

## Phase 2 queue

| Batch | Job | Intended use | Component family | Fallback | Status |
| --- | --- | --- | --- | --- | --- |
| `P2-A` | `OP-PACKING` | owner preview / visitor fulfilment rhythm | cool-steel weekly working surface | OP-PRODUCTS master + live DOM | advance |
| `P2-A` | `OP-NEXT-WEEK` | closed-state recovery and reset | same kitchen, cleared state | plain live closed state | advance |
| `P2-B` | `IW-STREET` | reduced-motion Street chapter | reflective elevation instrument | DOM elevation profile | advance |
| `P2-B` | `IW-DESCENT` | reduced-motion Descent chapter | reflective line + brake mechanics | DOM chapter and static profile | advance |
| `P2-B` | `IW-WORKSHOP` | reduced-motion return / enquiry handoff | inspection light and workbench | plain enquiry panel | advance |
| `P2-C` | `ST-X18-BEFORE` | clean opening plate for X18 motion rework | coastal paper object theatre | existing before frame | advance |

Phase 2 follows the shared overnight production loop. Checkpoints live in
`CHECKPOINTS.md`; candidates advance, reserve or reject immediately after
fundamentals review.

## Phase 3 queue

| Batch | Job | Intended use | Component family | Fallback | Status |
| --- | --- | --- | --- | --- | --- |
| `P3-A` | `OP-OPEN-WEEK` | first open-state / finite availability | cool steel, trays and blank slips | live state + item list | advance |
| `P3-A` | `OP-CLOSE-CONSEQUENCE` | closing with unanswered requests | bounded paper queue and archive rail | live confirmation copy | advance |
| `P3-B` | `IW-THRESHOLD` | bench-to-terrain scale transition | inspection plane opening into mineral field | code-native elevation transition | advance |
| `P3-B` | `IW-FOREST` | reduced-motion Forest chapter | reflective line through vertical wet material | DOM chapter + static profile | advance |

## Final component batch

| Batch | Job | Intended use | Component family | Fallback | Status |
| --- | --- | --- | --- | --- | --- |
| `P4` | `TX-PAPER-REVEAL` | draft-to-live wipe / mask | blank fibrous paper revealing cool steel | CSS clip-path | advance |
| `P4` | `TX-RAIL-REVERSAL` | publish / undo state transition | reversible brass rail and blank tabs | immediate DOM state swap | advance; hold for named interaction |
| `P4` | `TX-INSPECTION-APERTURE` | chapter / scale handoff | reflective line through mechanical light aperture | canvas mask + static line | advance |

## Capability audit — 10 August 2026

Central orchestration has proven two routes that were not callable from the
local sprint task:

- **Gemini web Video mode** can submit and complete 10-second video jobs. A
  temporary service error is a retry condition, not a capability blocker.
  Returned audio may be removed during normalization.
- **Central ElevenLabs** can generate and normalize audio. The absence of a
  local callable tool or local credential is not a provider blocker.

The earlier local records remain useful as a description of that task's tool
surface, but must not control the project queue. The classification is:

| Record | Earlier wording | Correct classification |
| --- | --- | --- |
| Wave 1 T01/T04 status rows | `motion blocked` | **False block:** central Gemini is available. |
| `CHECKPOINTS.md` P2-C | callable video generation unavailable | **Local-access limitation only:** central Gemini is available. |
| `CHECKPOINTS.md` Phase 2 carry-forward | blocked on video tooling | **False block:** queue bounded central jobs. |
| `jobs/ST-T01-REPAIR.md` | motion blocked / requires a generator | **False block:** source and job are ready for central Gemini. |
| `jobs/ST-T04-REPAIR.md` | remains a video-generation job | Not a block; it is a queued central Gemini job. |
| `jobs/ST-X18-BEFORE.md` | continuity still needs a video tool | **False block:** clean source pair is ready for central Gemini. |
| `audio-evaluation/README.md` | speech blocked until a documented generator is available | **Mixed:** central ElevenLabs is available, but no synthetic owner voice and the rejected studio-voice bakeoff remain real product/curation boundaries. Queue non-voice Foley only. |

### Central remediation queue

#### `CENTRAL-GV-T01` — login-at-the-door continuity repair

- **Route:** central Gemini web Video mode, 10 seconds.
- **Upload source:**
  `research/media-sprint/central-handoffs/CENTRAL-GV-T01-source-20260810.png`.
  Absolute path:
  `/Users/cobro/code/local/research/media-sprint/central-handoffs/CENTRAL-GV-T01-source-20260810.png`.
  Verified 10 August 2026: PNG, 1280 × 720, 801,481 bytes, SHA-256
  `93c8ea60ac8acb0d000aaceb36bfecd0214346ba309a99b9d3bb6c2865e4d216`.
  This is a uniquely named research-only copy of
  `research/media-sprint/masters/studio-film/T01-existing-final.png`; use the original
  `research/film/clips/studio/T01-login-at-the-door.mp4` only as motion review
  reference, not as factual source.
- **Use:** `/where-it-fails/` T01 film chapter; final still remains the
  reduced-motion fallback.
- **Prompt:** `10-second image-to-video, locked miniature clay shopfront. Start
  with the warm entrance sealed by one frosted blank pane and a pair of clay
  boots stopped outside. Hold the empty refusal beat. The pane tips forward in
  one physically continuous movement and settles as a flat bridge; the same
  pair of boots, unchanged in shape and count, walks across it into the warm
  shop. Blank fascia and pane, no lettering, logos, people, faces or hands.
  Stable architecture and boot continuity; final two seconds hold exactly on
  the supplied source frame.`
- **Review:** retry once on temporary service error; reject duplicated/mutated
  boots or architectural drift. Before submission, confirm the browser shows a
  non-empty image preview rather than an empty same-named attachment. Strip
  generated audio before any page trial.

#### `CENTRAL-GV-T04` — opening-hours temporal repair

- **Route:** central Gemini web Video mode, 10 seconds.
- **Source:** `masters/studio-film/T04-corrected-poster-v1.png`.
- **Use:** `/where-it-fails/` T04 film chapter and possible 9:16 derivative;
  supplied still is the reduced-motion fallback.
- **Prompt:** `10-second image-to-video, locked miniature clay shopfront in
  rain. Begin with the same window dark and the plain clock face unlit. One
  teal umbrella approaches, pauses and tilts toward the empty window, then
  withdraws completely; hold the empty wet pavement. A warm lamp clicks on,
  revealing the same blank clock face with exactly two hands and no marks or
  numerals. The same umbrella returns and folds at the door. No people, faces,
  hands, text, signage, logos or extra objects. Stable facade and clock; final
  two seconds hold exactly on the supplied source frame.`
- **Review:** retry once on temporary service error; reject clock marks,
  umbrella duplication or facade drift. Strip generated audio before use.

#### `CENTRAL-GV-X18` — envelope opening handoff

- **Route:** central Gemini web Video mode, 10 seconds.
- **Sources:** `masters/studio-film/X18-reworked-before-v1.png` as start;
  `masters/studio-film/X18-reworked-after-v1.png` as required end-state
  reference.
- **Use:** studio offer sequence under live DOM copy: `send the link` → `see
  the change` → `no obligation`; plate pair remains the settled fallback.
- **Prompt:** `10-second locked stop-motion paper scene in the supplied coastal
  room. The plain closed envelope stays grounded on the stone table, opens in
  one clean physical action with no hands visible, and reveals exactly two
  thin blank paper webpage compositions side by side: left unresolved grey,
  right resolved with one warm amber action area. Match the supplied end frame
  exactly. No floating, houses, blocks, text, letters, logos, stamps, people or
  generator marks. Hold the final two seconds.`
- **Review:** retry once on temporary service error; reject floating envelope,
  house-like contents or environment drift. Strip generated audio.

#### `CENTRAL-EL-OP-FOLEY` — operating transition stems

- **Route:** central ElevenLabs sound-effects workflow; normalize centrally.
- **Source:** `masters/transition-components/paper-to-steel-reveal-source-v1.png`
  and `brass-rail-reversal-source-v1.png` as material references.
- **Use:** optional, user-triggered draft/live and undo evaluation; never a
  voice and never required for meaning.
- **Prompt:** `Two separate dry close-miked one-shot stems, no music or voice:
  (A) one fibrous brown paper sheet curling smoothly across brushed stainless
  steel, 1.5 seconds, clean tail; (B) one small brass carriage sliding along a
  short rail and settling against a soft stop, 1.2 seconds, no alarm tone.`
- **Output:** two separate normalized WAV masters plus MP3 review proxies.

#### `CENTRAL-EL-IW-FOLEY` — aperture transition stems

- **Route:** central ElevenLabs sound-effects workflow; normalize centrally.
- **Source:** `masters/transition-components/inspection-aperture-source-v1.png`.
- **Use:** optional impossible-site scale handoff after explicit sound opt-in;
  the static line and DOM chapter retain all meaning.
- **Prompt:** `Two separate restrained material stems, no music or voice: (A)
  a thin reflective polymer strip sliding once through a matte metal aperture,
  1.5 seconds, delicate friction and one soft metallic settle; (B) a narrow
  inspection lamp switching on with a short electrical contact and quiet room
  decay, 1 second, no cinematic impact or synthetic riser.`
- **Output:** two separate normalized WAV masters plus MP3 review proxies.

### Real blockers that remain

- Generated film or premises reconstruction of a named real business still
  requires its written agreement. Central access does not change consent.
- Real terrain geometry, route or conditions still require attributed source
  data and evidence. Generated plates cannot supply them.
- Synthetic owner voices remain prohibited. The previous studio voice bakeoff
  remains rejected on product/curation grounds, not access grounds.
- Visible disclosure, settled fallbacks and publication review remain required
  before any central output can move toward `public/`.

## Sidecar fields

Each `jobs/<job-id>.md` records:

1. target experience and exact page job;
2. subject status (`synthetic`, `place` or `general studio`);
3. prompt and reference roles;
4. generator, date and source dimensions/duration;
5. evidence and consent boundary;
6. disclosure and reduced-motion requirement;
7. review result and known defects;
8. selected, reserve or retired disposition.
