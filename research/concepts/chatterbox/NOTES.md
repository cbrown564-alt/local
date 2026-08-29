# Chatterbox Day Nursery — day-6 guest concept

Authored 29 August 2026 (Europe/London) under
`/workspace/day6/chatterbox/`, mirroring `cbrown564-alt/local` paths.
No clone. No CloudAgent. No push. No merge. No publish.

## Kind

None of the five. Nursery, not a café. Bench pull.

## One-liner

The door at 75 Bryansford — hours on the plate, Paul and Jane behind it, ring or write.

## Paths

| File | Repo path |
| --- | --- |
| Guest home | `src/concepts/chatterbox/home.astro` |
| Styles | `src/concepts/chatterbox/styles.css` |
| Hour plate | `src/concepts/chatterbox/DoorPlate.astro` |
| Page wrapper | `src/pages/concepts/chatterbox.astro` |
| Copy brief | `research/concepts/chatterbox/chatterbox-copy-brief.md` |
| Elevation brief | `research/concepts/chatterbox/chatterbox-elevation-brief.md` |
| These notes | `research/concepts/chatterbox/NOTES.md` |

Read against `cbrown564-alt/local` master (`refs/heads/master`), chrome/shape
only: railway-street `home.astro` + `styles.css` + `StreetPlate.astro`
(strip / mark / nav; airy first screen; artefact; banner discloses drawing);
dominic-mcinerney `home.astro` (tel/mailto chips, not a generic form);
`src/concepts/_shell/ConceptLayout.astro`. Layout is one-off: a house-door
magazine, not a café fascia, not a solicitor blotter, not Coco's playground
(no emoji, no admissions grid, no party form, no Fredoka). Brief pasted
unchanged into `chatterbox-elevation-brief.md`. Live site re-read
29 August 2026, Europe/London: About, Contact, plus Meals / Drawing /
Testimonials / Fees / Carerooms only to know what already lives there.

## Flagship hits

- **Strip + mark + nav** — dental/railway chrome. `.cbx-strip` is not yet in
  `concept-shell.css` `:where()`; add on merge. Identity CSS already sets
  `display: flex`.
- **Airy first screen** — plaster and fanlight. Chatterbox as the biggest
  type, 75 Bryansford Road under it, ring / write. Not a packed form
  (dental's first screen is the form; Coco's is a party widget; this one is
  the door).
- **Magazine middle** — Paul and Jane as a two-voice house profile, quoted
  as About states them (29 Aug 2026). Not a room-system, not a meal grid.
- **Signature artefact** — 75 Bryansford hour plate (`DoorPlate.astro`)
  staged with `tel:+442843725805` and `mailto:info@chatterboxkids.co.uk`
  chips, plus their existing Contact form. Caption: “The hour plate at
  75 Bryansford Road.”
- **Guest voice** — we / the door / Bryansford. No plate questions. No
  page-about-itself. No “this page does not…”.
- **None of the five** — nursery door. Not a café. Not Coco's walk-in play.

EssenceMedia omitted — no `essence-media.ts` entry for this slug; the
component 404s without one. No rasters. No children’s photographs.

## Flagship self-score

**8.5 / 10.** Strip, mark, nav, airy name, one artefact, tel/mailto ritual,
guest voice, swap-lock, and no Coco clone. Minus: unrendered (no local
Astro build here); `.cbx-strip` not yet in the shared `:where()` list;
fees/rooms/meals correctly handed off, so the middle is thin by brief
(that thinness is the point).

## Honesty — re-read 29 August 2026, Europe/London

First-party only on the guest page. Dated here.

**Still true vs 23 August 2026 brief (About + Contact, 29 Aug 2026):**

- 75 Bryansford Rd, Newcastle, BT33 0LE
- Tel 028 4372 5805 · `info@chatterboxkids.co.uk`
- “Since 2004 Chatterbox has been providing care for hundreds of children
  aged 0-12 years.”
- “It is owned by husband and wife team Paul and Jane O'Connor who took
  over the business in April 2010.”
- Monday – Friday 07.30 – 1800hrs. Closed bank holidays and 1 week at
  Christmas.
- Site still separate HTML pages (index, about, carerooms, contact.php,
  drawing, fees, meals, testimonials).

**Live-fact additions since the 23 August brief (first-party, 29 Aug 2026) — printed only where the door needs them:**

- Contact also says “Closures are subject to change.” Printed, dated here.
- About: family-run in the seaside town of Newcastle; close to the town
  library, primary schools, parks and the seaside promenade.
- About: Paul is a local building contractor and carried out an entire
  re-furbishment; Jane is a registered nurse and deputy ward manager in
  the Royal Group of hospitals (and previously a part-time first aid
  lecturer). Printed as they state it.
- About: registered with the South Eastern Health and Social Care Trust.
- Meals page exists (5-star Down District Council food hygiene line;
  321 Dental Health diamond; snack/lunch times). Not rebuilt on the
  guest page — the site already holds meals.
- Drawing page: “Download and colour in!” — not rebuilt.
- Testimonials page live (names children; not lifted onto guest chrome).
- Carerooms page live; fetch returned almost no extractable text (likely
  images). No room names invented. Fees page names Baby / Waddler /
  Pre-school / Afterschool — those names stay off guest chrome.
- `fees.html` live 29 Aug 2026. **Amounts not printed on the guest page.**
  Handoff: chatterboxkids.co.uk.

**Not printed / not re-validated on the guest page:**

- Bing “opens tomorrow 7:30” from the 23 Aug brief (today is Saturday
  29 Aug 2026; first-party hours are Mon–Fri). Google/Bing pin omitted —
  they already hold it.
- Facebook still login-walled. Nov 2025 snippet not used. No invented
  Instagram.
- 2013 inspection comments on About — dated 2013; omitted rather than
  worn as current.
- Third-party food-hygiene dates from search indexes. Meals page's own
  5-star line exists; still not rebuilt into a meals system.
- Fake tour-booking app. Generic HTML form. Children’s photographs.

Banner note discloses the hour plate as a drawing. Caption does not say
“not a photograph of…”.

## Identity

- Prefix `cbx-`. Body class `concept-page concept-chatterbox`.
- Fonts passed as `fontHref` (Instrument Serif + Schibsted Grotesk).
  Not added to `ConceptLayout` `conceptFonts` map — no shell edit.
- Palette: plaster paper / Bryansford painted door (terracotta) / brass
  plate / enamel cream. Not railway platform green, not Coco primaries,
  not dental periwinkle, not Dominic oxblood blotter.

## Swap test

Remove Chatterbox, Bryansford, Paul and Jane. If any nursery could wear
what remains, stop. The plate carries 75, BRYANSFORD ROAD, CHATTERBOX,
and the first-party hours.

## Open on merge

- Add `chatterbox` to `conceptFonts` if the team prefers the map.
- Add `.cbx-strip` to the shared strip `:where()` list.
- Do not mount EssenceMedia until a record exists.
- Do not paste `fees.html` amounts onto the guest page.
- Facebook still unread.
