# Villa Vinci — elevation brief: promenade first, then the table

Written 23 August 2026. The general method is in
`docs/the-elevation-method.md`; this is the meal application of it.

**Status: written 23 August 2026 against the concept already on
`sprint-day1-five`.** Shipped: Villa Vinci Restaurante at 31 Main Street,
Newcastle, BT33 0AD; 028 4372 3080; https://www.villavinci.co.uk/; Mediterranean
origin and local sourcing; their about-page sentence (pop in for lunch on a day
at the seaside or reserve after an evening stroll on the promenade); sisters
Zio Portadown and Al Forno Newry named as not this door; hours not listed —
live site and phone, not invented clocks; a week strip of "Walk in" (action,
not hours); menu pill still points at the March 2024 PDF on their domain (stale
— see diagnosis); table note that writes words for a call, not a hotel reserve
form; disclosed AI dish plate; first-screen / chalkboard / guest-voice polish
23 August 2026. Hours verified absent on their site 23 August 2026. Not
validated with the room.

## The shape of this business

A **meal**. What the guest buys is lunch from the street or dinner after the
stroll. The register is **appetite**. Theatre is the dish and the promenade
sequence — not a booking widget copied from a hotel. The main move is walk-in
or ring. Sister rooms in Portadown and Newry are other doors.

## The essence

**Promenade first, then the table.**

The paradox is already in their words: the meal is timed to a day at the
seaside or an evening walk, not to a studio-invented service window. A concept
that leads with a reserve form fails the room. A concept that freezes a March
2024 PDF as today's board fails time.

## What recognition can draw on

- **Their voice:** About page (their site): pop in for lunch on a day at the
  seaside or reserve after an evening stroll on the promenade. Shipped page
  quotes: "Why not pop in for lunch on a day at the seaside or reserve a table
  for dinner after an evening stroll on along the promenade." Keep their
  wording, including the about-page roughness, if that is what the page
  captured; do not silently tidy it into studio English without a new read.
  Mediterranean origin, local sourcing — their positioning, not a farm list
  (no farms verified).
- **Their geography:** 31 Main Street, Newcastle, BT33 0AD. Promenade as the
  approach. Zio (Portadown) and Al Forno (Newry) are sisters, not this door.
- **Their ritual:** Walk in; or ring 028 4372 3080. Lunch or dinner after the
  stroll. Hours not listed on their site (verified 23 August 2026) — hand to
  villavinci.co.uk or the phone before anyone sets out.
- **Their arc:** Mediterranean origin is the positioning, not a dated founding
  story in this set. Do not invent one.
- **Their mark:** Villa Vinci / Villa Vinci Restaurante. No logo file here.

**Menu:** PDF March 2024 on their domain
(`http://villavinci.co.uk/wp-content/uploads/2024/06/DES01087_VILLA-VINCI-MENU-A3-MAR-24-SAMPLE.pdf`
— as linked from the shipped page). Stale. Hand to the live site; do not freeze
as today's board.

## The diagnosis

Against shipped `src/concepts/villa-vinci/home.astro`:

1. **Their promenade sentence is on the page.** Essence is visible.
2. **Hours were not invented.** Copy sends people to villavinci.co.uk or the
   phone. Good.
3. **The week strip is "Walk in" every day** — an action, not a service clock.
   It must never be misread as "open all week, hours unknown" presented as a
   timetable. If it starts to look like hours, take it off.
4. **The menu pill still hits the March 2024 PDF.** That fights the brief
   ("hand to live site, do not freeze as today's board"). Footer already points
   at villavinci.co.uk for today's board. Next pass should demote or drop the
   PDF as the primary action.
5. **Table note is ring-first, not a hotel reserve form.** Correct main move.
6. **Sisters are fenced.** Good.
7. **Dish plate is AI and disclosed.** Appetite register, not a pass photograph.
8. **"What's on today, and until when" is off the guest page.** Keep it off.

## The moves

### 1. Their seaside / promenade sentence — **shipped**

Lead the meal with their words.

### 2. Walk-in or ring, not a hotel booker — **shipped**

Table note: name, covers, lunch / dinner / walk in, the day. Words for the
call to 028 4372 3080.

### 3. Hours live elsewhere — **shipped as hand-off**

Verified absent on their site 23 August 2026. Do not fill.

### 4. Sisters are other doors — **shipped**

Zio Portadown / Al Forno Newry — not this door.

### 5. Dish as appetite theatre — **shipped (AI, disclosed)**

Banner: generated from the kitchen's voice, not a photograph from the pass.

### 6. Menu as live site, not a frozen PDF — **partly shipped**

Footer hands to villavinci.co.uk. Primary pill still the March 2024 PDF —
change when convenient; do not scrape the PDF onto the page as today's dishes.

### 7. No plate question — **shipped (sweep)**

Guest page must not print "What's on today, and until when".

## Honesty constraints

- Hours not listed (site read 23 August 2026). Do not invent them.
- Do not invent dishes, prices, reviews, or a farm list. "Local sourcing"
  stays at their words.
- March 2024 menu PDF is stale; never present it as this week's board.
- Do not make a hotel-style reservation form the main move.
- Do not merge this door with Zio or Al Forno.
- Guest page must not print "What's on today, and until when".
- AI dish: triple disclosure.
- Guest page never criticises their current site.

## Tests that pin the elevation

- Assert 31 Main Street, BT33 0AD; 028 4372 3080; villavinci.co.uk.
- Assert the promenade / seaside sentence (theirs) and Mediterranean origin /
  local sourcing without extra farms.
- Assert Zio Portadown and Al Forno Newry are not this door.
- Assert no clock hours on the page.
- Assert the form writes a call script and `tel:`; nothing sends; no reserve
  backend.
- Assert guest copy does not contain "What's on today, and until when".
- Assert the dish banner disclosure survives.
- When the PDF is demoted: assert the primary menu action is the live site.
- Swap test: remove Villa Vinci, Main Street, and the promenade sentence; if
  any Mediterranean room could wear the page, the elevation has not gone far
  enough.

## Open decisions

- Demote the March 2024 PDF from the first-screen pill (recommended: yes).
- Whether "Walk in" on all seven days should stay once it is re-read as a
  timetable risk.
- A kitchen-supplied plate to replace the AI dish.

## When a move ships

Record the source and read date for every new fact in `research/` and in the
case-study Sources & limits block — studio provenance, not guest copy. Speak
as the restaurant. Update this status line as moves land; do not call the
concept validated until an owner or representative visitor has supplied that
evidence.
