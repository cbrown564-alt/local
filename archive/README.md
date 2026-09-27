# Archive

Concept packs taken out of the product in the
[27 September 2026 portfolio review](../research/portfolio-review/portfolio-review-2026-09-27.md).
Nothing here is built, deployed, type-checked or tested: `archive/` sits
outside `src/`, and `tsconfig.json` excludes it.

- [`contact-sheet-2026-09-27.html`](contact-sheet-2026-09-27.html): all 75
  packs as they rendered on the day, grouped by verdict, with the one-line
  reason on each card. Open it in a browser; it's self-contained.
- `concepts/<slug>/`: the 64 archived packs.

## What each archived pack holds

| Path | Was |
|---|---|
| `src/` | `src/concepts/<slug>/` |
| `pages/` | `src/pages/concepts/<slug>.astro` (and any sub-route folder) |
| `test-*-elevation.mjs` | its per-page pin, from `tools/test/` |
| `workbench/` | its print one-sheet, where it had one (The Buck's Head, Cúpla) |
| `records.json` | every record cut from the shared modules, verbatim: the `transformationCandidates` entry, the case-study detail, essence media, map coordinates, font link, five-shapes example, one-sheet config, the retired `package.json` script, the verdict, and where each file moved |

Kept in place, not moved:

- **Research** stays at `research/concepts/<slug>/`. It's the part worth
  keeping.
- **Pipeline records** stay in `research/pipeline/verifications.json`,
  now with `stage: "Concept archived"`, an `archived` block (date, group,
  reason, reopen trigger) and `archivedConceptRoute` where the record had a
  route.
- **Publication reviews** stay in `research/publication.json` with
  `status: "Archived"`, their five checks intact as history.

Deployed media (concept images, video, Open Graph cards, generated map
plates) moved out of `public/` to `media/held/`, per REPO_MAP rule 2. Paths,
sizes and SHA-256 are in [`media/held/MANIFEST.md`](../media/held/MANIFEST.md);
`research/image-provenance.md` now cites the held paths. Binaries under
`media/` are gitignored, so on a fresh clone the bytes come from Git history
at the commit before the archive.

The capture tools (`tools/capture/`) still carry archived slugs in their
per-concept configuration. Those entries are inert, and they're what a
restore would need.

## Restoring a pack

1. `git mv archive/concepts/<slug>/src src/concepts/<slug>` and the same for
   `pages/`, the test and any `workbench/` files.
2. Bring the media back from `media/held/` (or from Git history) to the
   `public/` paths listed in `records.json` → `moved`.
3. Paste each entry in `records.json` → `cut` back into the file it names.
4. Set the publication review back to `Publish` only after the five checks are
   answered again; the concept was archived, not merely hidden.
5. `pnpm test`.

`tools/pipeline/archive-concepts.mjs` did the archiving and is the reference
for exactly what moved.
