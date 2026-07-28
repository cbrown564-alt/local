# Dependency advisories

Recorded exposure boundaries for known advisories after the 28 July 2026
baseline repair. Re-run `pnpm audit` after dependency changes and update this
file when an override is removed or a new advisory is accepted.

## Overridden

| Package | Advisory | Mitigation |
|---|---|---|
| `fast-uri` | [GHSA-v2hh-gcrm-f6hx](https://github.com/advisories/GHSA-v2hh-gcrm-f6hx) host confusion | `pnpm.overrides` pins `3.1.4`. Reached only through `@astrojs/check` → language-server YAML tooling at build/check time; not shipped to browsers. |
| `esbuild` | [GHSA-g7r4-m6w7-qqqr](https://github.com/advisories/GHSA-g7r4-m6w7-qqqr) Windows arbitrary file read via the development server | `pnpm.overrides` pins `0.28.1`. Affects local Vite/Astro development on Windows only; production builds and the static deploy are outside the exposure. |

## Accepted for now

Remaining high findings under `@vercel/node` (for example `minimatch` ReDoS and
`undici` WebSocket memory use) sit in the Vercel Function toolchain used to
typecheck and package `api/request.ts`. They are not part of the static site
bundle. Clear them by upgrading `@vercel/node` when a release that pulls patched
transitives is available; do not widen overrides into the Function runtime
without re-testing `pnpm test:request`.
