# Repository map

Where things live after the A→D restructure (31 July 2026).

## Three rules

1. **Edit `public/`, never `dist/`.** `dist/` is rebuildable output from `pnpm build`. Static files you care about live under `public/` and are copied into `dist/` on build.
2. **A concept has at most three homes:** `src/concepts/<slug>/`, `public/media/concepts/<slug>/`, `research/concepts/<slug>/`.
3. **Scratch is disposable.** Anything under `.scratch/` can be deleted; capture/print tools recreate what they need.

## Top level

| Path | Role |
|---|---|
| `src/pages/` | Thin URL map (Astro file routes). Concept routes re-export pack pages. |
| `src/site/` | Mourne Made product UI: shared components, layouts, styles, data. |
| `src/concepts/` | Concept packs (`_shell/` + one folder per slug). |
| `src/prototypes/` | Internal explorations (chamber shells, etc.). |
| `src/workbench/` | Dev-only routes injected by `astro.config.mjs`. |
| `public/` | **Deploy boundary** — only static assets that may ship. |
| `public/media/concepts/<slug>/` | Comparison stills, concept imagery, videos for that slug. |
| `public/media/place/` | CC place photographs + `ATTRIBUTION.md`. |
| `public/brand/` | Studio and concept marks. |
| `research/publication.json` | Central five-check publication gate. |
| `research/image-provenance.md` | How each concept image was made / whether it ships. |
| `research/pipeline/` | `verifications.json`, discovery summaries, landscape PDF. |
| `research/concepts/<slug>/` | Briefs, triage, pitches; `evidence/` is gitignored. |
| `research/audits/` | Internal design audits (screenshots gitignored). |
| `docs/` | DESIGN, MEDIA_CAPTURE, CONCEPT_DESIGN_REVIEW, REVIEW, ADRs, archive. |
| `tools/` | Capture, media, check, test, print, pipeline scripts. |
| `.scratch/` | Probes, print PDFs, journey renders — not committed. |
| `api/` | Vercel request function. |

## Root control-plane docs (stay at root)

`README.md`, `AGENTS.md`, `PRODUCT.md`, `PLAN.md`, `PROSPECTS.md`

## Media URLs

Shipped assets are served as:

- `/media/concepts/<slug>/<file>`
- `/media/place/<file>`
- `/brand/<file>`

`ResponsiveImage` derives `/media/.../<stem>-640.webp` and `-1265.webp` beside the JPEG master. Regenerate with `pnpm optimize:media`.

## What not to do

- Do not put internal HTML, markdown, JSON datasets, or audits under `public/`.
- Do not commit `research/concepts/*/evidence/` (private masters).
- Do not hand-edit `dist/`.
