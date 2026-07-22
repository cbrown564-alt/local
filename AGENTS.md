# AGENTS.md

## Cursor Cloud specific instructions

Mourne & Main is a single static [Astro](https://astro.build/) site (no backend, no database). The whole product is the site itself; there is no separate service to run.

### Services

There is one service: the Astro site. Standard commands live in `package.json`:
- Dev server: `pnpm dev` (serves `http://localhost:4321/`; pass `--host` to expose on the network). This is the command to use for development.
- Lint/typecheck + build: `pnpm build` runs `astro check` (type/diagnostic check, acts as the lint step) followed by `astro build`. There is no separate `lint` or `test` script.
- Preview the production build: `pnpm preview` (needed by the capture scripts below).

Key routes are documented in `README.md`. The core user flow is the request form at `/request/`, which validates client-side and shows a success/error state without sending data (intentionally local-only in this prototype).

### Non-obvious notes

- After submitting the request form successfully, the now-empty required fields render with red/invalid styling underneath the green success message. This is pre-existing prototype behavior (the form adds a `request-form--submitted` class that triggers `:invalid` styling on the reset empty fields), not a setup problem.
- The `scripts/capture-*.mjs` screenshot/media utilities rely on `puppeteer-core` + a system Chrome/Chromium binary and a running `pnpm preview` server. They are optional tooling for regenerating comparison images and are not required to run or develop the site. `ffmpeg-static` is bundled for the media capture script.
- `scripts/normalize-businesses.mjs` regenerates `src/data/businesses.json` from `research/verifications.json`; re-run it after editing verification data.
