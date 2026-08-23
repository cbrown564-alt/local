# AGENTS.md

## Cursor Cloud specific instructions

Mourne Made is a single static [Astro](https://astro.build/) site (no backend, no database). The whole product is the site itself; there is no separate service to run.

### Services

There is one service: the Astro site. Standard commands live in `package.json`:
- Dev server: `pnpm dev` (serves `http://localhost:4321/`; pass `--host` to expose on the network). This is the command to use for development.
- Lint/typecheck + build: `pnpm build` runs prose-count, publication, public-asset and concept guest-voice guards, `astro check`, then `astro build`.
- CI and local check: `pnpm test` runs `pnpm build`, then twenty suites via `tools/test/run-verification.mjs` — the request handler, the printed-QR attribution chain, the orphan-media scan, the lights-payload anonymity guard, the rebuild-canvas guard and the fifteen per-page pins. Every suite runs even when an earlier one fails, so the report is the whole picture rather than the first casualty. `SKIP_BUILD=1 pnpm test` reuses the existing `dist/` for the inner loop, and is not a full verification.
- Preview the production build: `pnpm preview` (needed by the capture scripts).

Key routes are documented in `README.md`. The core user flow is the request form at `/request/`. It posts to the Vercel Function at `api/request.ts`, which validates the submission, rate-limits by source address and sends the lead by email. Without `GMAIL_USER` and `GMAIL_APP_PASSWORD` in the environment — as in a bare local checkout — the endpoint validates but cannot deliver; `pnpm test:request` exercises the input handling without sending anything.

### Concept guest voice

Guest-visible concept copy must speak as the business. Do not narrate the website, the concept, the prototype, the elevation method, or studio process in headings, body, notices, captions, alts, aria-labels, or footers.

Trust is not research chrome. Guest attribution stays light (who spoke + a reasonable month/year or era). Studio read stamps, relative "shown as N months ago" dates, "their words, not ours", and dual-name findings phrased as research notes belong in `research/`, code comments, banners, and case-study Sources & limits — not on the guest page. See the three-layer honesty split in [`docs/the-elevation-method.md`](docs/the-elevation-method.md).

Studio / meta voice belongs only in:
- `ConceptLayout` banner text and `bannerNote` props
- `research/`
- code comments
- transformation case-study Sources & limits

`pnpm build` runs `tools/check/check-concept-guest-voice.mjs` against `src/concepts/` (excluding `_shell/`). Keep that denylist honest when new failure phrases appear.

### Non-obvious notes

- Directory layout: see [`docs/REPO_MAP.md`](docs/REPO_MAP.md). Edit `public/`, never `dist/`. Concept work lives under `src/concepts/<slug>/`, `public/media/concepts/<slug>/`, and `research/concepts/<slug>/`.
- Capture tools live in `tools/capture/` and need `puppeteer-core` + system Chrome/Chromium plus a running `pnpm preview` server. `ffmpeg-static` is bundled for media capture.
- `tools/pipeline/normalize-businesses.mjs` regenerates `src/site/data/businesses.json` from `research/pipeline/verifications.json`; re-run it after editing verification data.
- Generated media — video, imagery **and synthetic speech** — needs an entry in `research/image-provenance.md` before it is committed, whether it ships or serves an internal prototype only. Guest-facing generated media also needs a disclosure in the visible layer, not only in an `alt` or `aria-label`.
- Canvas and WebGL effects live in `src/site/scripts/`. Every one of them is decorative and `aria-hidden`: the meaning belongs in the DOM beneath, and each needs a designed settled frame under `prefers-reduced-motion` rather than being switched off. Planned work: [`docs/sensory-system-plan.md`](docs/sensory-system-plan.md).
