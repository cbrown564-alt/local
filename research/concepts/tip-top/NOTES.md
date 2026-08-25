# Tip Top — day-4 guest concept

Authored 25 August 2026 (Europe/London) under `/workspace/day4/tip-top/`,
mirroring repo paths. No clone. No CloudAgent. No push.

## Paths

| File | Repo path |
| --- | --- |
| Guest home | `src/concepts/tip-top/home.astro` |
| Styles | `src/concepts/tip-top/styles.css` |
| Jar plate | `src/concepts/tip-top/JarPlate.astro` |
| Page wrapper | `src/pages/concepts/tip-top.astro` |
| Copy brief | `research/concepts/tip-top/tip-top-copy-brief.md` |
| These notes | `NOTES.md` (workspace only; not a repo file unless wanted) |

Read against `cbrown564-alt/local` master: newcastle-dental home+css (strip /
mark / nav chrome; two-column first screen), scopers (editorial magazine
texture, labelled quote, guest voice), ConceptLayout (`bannerNote`,
`fontHref`, `businessName`/`town`).
Brief: `sprint-day2-five` `research/concepts/tip-top/tip-top-elevation-brief.md`.

Kind: **jar**. Slug: **tip-top**. Prefix: `tt-`. Body class:
`concept-page concept-tip-top`. Artefact: **jar / fascia plate**.

## Flagship mapping

Dental chrome: utility strip + house mark + simple nav. Dental's first
screen is copy + **form**. This page keeps the chrome and makes the first
screen **airy and jar-first**: Tip Top as the biggest type + **fascia/jar
plate**. Staged action is walk-in, not a mailto draft and not a cart.

Magazine middle is the **jars** (glass / pound / bag as a three-column
spread), not Scopers' counter row and not a SKU grid. Instagram already
holds appetite; the concept is the door and the pound.

Layout is **sweet-shop paper** (Gloock + Nunito Sans, raspberry fascia,
jar glass). Not Cookie Jar flour/bran/wheaten. Not Smalls oxblood case.
Not Vintage etc. teak. Not dental periwinkle request form.

## Identity

- Fonts passed as `fontHref` (Gloock + Nunito Sans). Not added to
  `ConceptLayout` `conceptFonts` map — no shell edit.
- Strip layout is in `styles.css` (`.tt-strip` is not yet in
  `concept-shell.css` `:where()`). On merge, add `.tt-strip` to that list.
- No `EssenceMedia` — no frames, and the component 404s without a slug entry.
- No raster in `public/media/`. Plate is inline SVG.

## Honesty on the guest page

- Door is **131 Main Street, Newcastle BT33 0AE** (Google). 133 and
  Central Promenade omitted.
- Phone **028 4372 3130** omitted (Yelp/directory, not on Google).
- Hours printed and dated: **As Google, 23 August 2026** — Sun 10–20,
  Mon–Fri 10–19, Sat 10–20.
- 1937 as fascia lockup + labelled Yelp About quote + IG bio pointer.
  No founding essay.
- No Facebook. No form. No website CTA.
- Not Crystal Clean.

## Swap test

Name, 131 Main Street, Est 1937 fascia, and jars by the pound are
load-bearing. Remove them and the page is any sweet shop.

## Open on merge

- Add `tip-top` to `conceptFonts` if the team prefers the map over
  the page-level `fontHref`.
- Add `.tt-strip` to the shared strip `:where()` list.
- Facebook unread; still not printed.
- 131 vs 133 still unresolved in research; guest page asserts Google 131 only.
