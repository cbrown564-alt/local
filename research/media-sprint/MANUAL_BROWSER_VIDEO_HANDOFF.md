# Manual browser video handoff

Prepared 10 August 2026. These are the outstanding Gemini Video jobs from the
canonical sprint manifest. This file is the paste-ready handoff; do not infer
paths relative to this document.

## Shared submission and return rules

1. Use Gemini web **Videos**, landscape **16:9**, one job at a time.
2. Confirm the uploaded image is visibly populated before submitting. An empty
   same-named attachment is a failed upload.
3. Temporary service errors may be retried once manually. Do not create a
   matrix of near-duplicate runs.
4. Download the original completed MP4 into the absolute return directory:
   `/Users/cobro/code/local/media/media-sprint/central-handoffs/manual-video/results/`.
5. Preserve Gemini's original output outside `public/`. Strip generated audio
   by default during a later normalization pass; do not edit or promote it as
   part of this handoff.
6. Return the completed filename(s) to this task. Review for continuity,
   unwanted text/logos, architecture drift and the job-specific rejection
   conditions below.

## `CENTRAL-GV-T01` — login-at-the-door continuity repair

- **Current status:** outstanding. One automated retry was submitted before
  manual handoff was requested (`https://gemini.google.com/app/937dcb22a3ba3dac`)
  and was still analysing when automation stopped. Check that chat or Gemini
  Library first; do not duplicate the job if it completed successfully.
- **Source image:**
  `/Users/cobro/code/local/media/media-sprint/central-handoffs/manual-video/CENTRAL-GV-T01-start-20260810.png`
- **Verified:** PNG · 1280 × 720 · 801,481 bytes · SHA-256
  `93c8ea60ac8acb0d000aaceb36bfecd0214346ba309a99b9d3bb6c2865e4d216`
- **Target:** 10 seconds · landscape 16:9
- **Intended use:** `/where-it-fails/` T01 film chapter. The supplied still
  remains the reduced-motion fallback.
- **Exact prompt:**

```text
10-second image-to-video, locked miniature clay shopfront. Start with the warm entrance sealed by one frosted blank pane and a pair of clay boots stopped outside. Hold the empty refusal beat. The pane tips forward in one physically continuous movement and settles as a flat bridge; the same pair of boots, unchanged in shape and count, walks across it into the warm shop. Blank fascia and pane, no lettering, logos, people, faces or hands. Stable architecture and boot continuity; final two seconds hold exactly on the supplied source frame.
```

- **Reject if:** boots duplicate or mutate; shop architecture drifts; lettering
  appears; the final frame does not settle.
- **Post-processing:** strip generated audio by default.
- **Return as:** `CENTRAL-GV-T01-gemini-v1-original.mp4`

## `CENTRAL-GV-T04` — opening-hours temporal repair

- **Current status:** not submitted.
- **Source image:**
  `/Users/cobro/code/local/media/media-sprint/central-handoffs/manual-video/CENTRAL-GV-T04-end-20260810.png`
- **Verified:** PNG · 1672 × 941 · 1,759,498 bytes · SHA-256
  `02e2802c83d89566b8d32663005f496ad1e9e66753b227af2466f9f0c7e34a25`
- **Target:** 10 seconds · landscape 16:9
- **Intended use:** `/where-it-fails/` T04 film chapter and possible later
  9:16 derivative. The supplied still remains the reduced-motion fallback.
- **Exact prompt:**

```text
10-second image-to-video, locked miniature clay shopfront in rain. Begin with the same window dark and the plain clock face unlit. One teal umbrella approaches, pauses and tilts toward the empty window, then withdraws completely; hold the empty wet pavement. A warm lamp clicks on, revealing the same blank clock face with exactly two hands and no marks or numerals. The same umbrella returns and folds at the door. No people, faces, hands, text, signage, logos or extra objects. Stable facade and clock; final two seconds hold exactly on the supplied source frame.
```

- **Reject if:** the clock gains marks or numerals; umbrella duplicates; facade
  drifts; the empty-pavement beat disappears.
- **Post-processing:** strip generated audio by default.
- **Return as:** `CENTRAL-GV-T04-gemini-v1-original.mp4`

## `CENTRAL-GV-X18` — envelope opening handoff

- **Current status:** not submitted.
- **Start source image:**
  `/Users/cobro/code/local/media/media-sprint/central-handoffs/manual-video/CENTRAL-GV-X18-start-20260810.png`
- **Start verified:** PNG · 1672 × 941 · 1,629,479 bytes · SHA-256
  `b306d708020bef8cc2975cde7839b11129d066bfa101b909a41025837409e8d9`
- **End-state reference image:**
  `/Users/cobro/code/local/media/media-sprint/central-handoffs/manual-video/CENTRAL-GV-X18-end-reference-20260810.png`
- **End reference verified:** PNG · 1672 × 941 · 1,680,863 bytes · SHA-256
  `0b6e3a677e2be8e93a25801c113d56dc12be760759f69a1f1629b828eb57f1be`
- **Upload note:** if Gemini accepts only one image, upload the start image and
  keep the end image open locally as the visual acceptance reference. If the
  UI accepts a second reference, upload both in the order above.
- **Target:** 10 seconds · landscape 16:9
- **Intended use:** studio offer sequence beneath live DOM copy: `send the
  link` → `see the change` → `no obligation`. The still pair remains the
  settled fallback.
- **Exact prompt:**

```text
10-second locked stop-motion paper scene in the supplied coastal room. The plain closed envelope stays grounded on the stone table, opens in one clean physical action with no hands visible, and reveals exactly two thin blank paper webpage compositions side by side: left unresolved grey, right resolved with one warm amber action area. Match the supplied end frame exactly. No floating, houses, blocks, text, letters, logos, stamps, people or generator marks. Hold the final two seconds.
```

- **Reject if:** the envelope floats; contents become blocks or houses; text or
  stamps appear; room/camera drifts; final plate does not match the reference.
- **Post-processing:** strip generated audio by default.
- **Return as:** `CENTRAL-GV-X18-gemini-v1-original.mp4`

## Completion report

When returning results, provide for each job:

- completed absolute path;
- Gemini chat URL, if retained;
- whether generated audio is present;
- obvious rejection defect, or `awaiting frame review`;
- any job that failed after the one permitted retry.
