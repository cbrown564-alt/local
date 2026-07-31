# AGENTS.md

## Cursor Cloud specific instructions

Mourne Made is a single static [Astro](https://astro.build/) site (no backend, no database). The whole product is the site itself; there is no separate service to run.

### Services

There is one service: the Astro site. Standard commands live in `package.json`:
- Dev server: `pnpm dev` (serves `http://localhost:4321/`; pass `--host` to expose on the network). This is the command to use for development.
- Lint/typecheck + build: `pnpm build` runs prose-count, publication, public-asset and concept guest-voice guards, `astro check`, then `astro build`.
- Full verification: `pnpm test` builds, starts `pnpm preview`, and runs the request, concept-shell, reviewed-concept, media, Buck's Head, Enniskeen and Painted Earth checks.
- Preview the production build: `pnpm preview` (needed by the capture scripts and by `pnpm test`).

Key routes are documented in `README.md`. The core user flow is the request form at `/request/`. It posts to the Vercel Function at `api/request.ts`, which validates the submission, rate-limits by source address and sends the lead by email. Without `GMAIL_USER` and `GMAIL_APP_PASSWORD` in the environment — as in a bare local checkout — the endpoint validates but cannot deliver; `pnpm test:request` exercises the input handling without sending anything.

### Concept guest voice

Guest-visible concept copy must speak as the business. Do not narrate the website, the concept, the prototype, the elevation method, or studio process in headings, body, notices, captions, alts, aria-labels, or footers.

Studio / meta voice belongs only in:
- `ConceptLayout` banner text and `bannerNote` props
- `research/`
- code comments

`pnpm build` runs `tools/check/check-concept-guest-voice.mjs` against `src/concepts/` (excluding `_shell/`). Keep that denylist honest when new failure phrases appear.

### Non-obvious notes

- Directory layout: see [`docs/REPO_MAP.md`](docs/REPO_MAP.md). Edit `public/`, never `dist/`. Concept work lives under `src/concepts/<slug>/`, `public/media/concepts/<slug>/`, and `research/concepts/<slug>/`.
- Capture tools live in `tools/capture/` and need `puppeteer-core` + system Chrome/Chromium plus a running `pnpm preview` server. `ffmpeg-static` is bundled for media capture.
- `tools/pipeline/normalize-businesses.mjs` regenerates `src/site/data/businesses.json` from `research/pipeline/verifications.json`; re-run it after editing verification data.
