# AGENTS.md

## Cursor Cloud specific instructions

Mourne Made is a single static [Astro](https://astro.build/) site (no backend, no database). The whole product is the site itself; there is no separate service to run.

### Services

There is one service: the Astro site. Standard commands live in `package.json`:
- Dev server: `pnpm dev` (serves `http://localhost:4321/`; pass `--host` to expose on the network). This is the command to use for development.
- Lint/typecheck + build: `pnpm build` runs prose-count and publication guards, `astro check`, then `astro build`.
- Full verification: `pnpm test` builds, starts `pnpm preview`, and runs the request, concept-shell, reviewed-concept, media, Buck's Head, Enniskeen and Painted Earth checks.
- Preview the production build: `pnpm preview` (needed by the capture scripts and by `pnpm test`).

Key routes are documented in `README.md`. The core user flow is the request form at `/request/`. It posts to the Vercel Function at `api/request.ts`, which validates the submission, rate-limits by source address and sends the lead by email. Without `GMAIL_USER` and `GMAIL_APP_PASSWORD` in the environment — as in a bare local checkout — the endpoint validates but cannot deliver; `pnpm test:request` exercises the input handling without sending anything.

### Non-obvious notes

- The `scripts/capture-*.mjs` screenshot/media utilities rely on `puppeteer-core` + a system Chrome/Chromium binary and a running `pnpm preview` server. They are optional tooling for regenerating comparison images and are not required to run or develop the site. `ffmpeg-static` is bundled for the media capture script.
- `scripts/normalize-businesses.mjs` regenerates `src/data/businesses.json` from `research/verifications.json`; re-run it after editing verification data.
