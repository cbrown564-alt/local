# Armstrong Opticians — elevation brief: two doors, one building; the diary is the phone

Written 23 August 2026. The general method is in
`docs/the-elevation-method.md`; this is the relief / care application of it.

**Status: written 23 August 2026 against the concept already on
`sprint-day1-five`.** The record is thin and the page is honestly thin. Shipped:
30 Railway Street, Newcastle, BT33 0AL; two doors (Armstrong Opticians
028 4372 2991 for eyes; The Hearing Care Partnership 028 4064 8306 for hearing);
sudden vision loss → A&E / 111; no hours; no NHS / private / exam list; a
disclosed AI calm-room plate; a desk-note form that writes words for the
correct `tel:` by door. Emergency strip, split, and form were polished 23
August 2026; guest-voice sweep the same day. Companies House was not used on
the guest page — keep it that way. Not validated with the practice.

## The shape of this business

**Relief.** What the patient buys is emotion under management: can I get seen,
and which door. The register is **reassurance**, not spectacle and not a retail
eyewear catalogue. Theatre is a calm room and a phone that belongs to the right
door. The diary is not on the web in our verified set.

## The essence

**Two doors, one building; the diary is the phone.**

The paradox is architectural and operational: eyes and hearing share Railway
Street, with two numbers, and we have no published hours or exam menu to dress
the page. Padding a Companies House spine or an invented NHS list would be a
different business. Thin is the honest elevation.

## What recognition can draw on

Thin inventory — say so; do not pad.

- **Their voice:** None verified beyond the trading names. Do not invent a
  welcome line and attribute it to the practice.
- **Their geography:** 30 Railway Street, Newcastle, BT33 0AL. One building,
  two doors.
- **Their ritual:** Ring for the next appointment. Eyes: Armstrong Opticians,
  028 4372 2991. Hearing: The Hearing Care Partnership in the building,
  028 4064 8306. Emergency: sudden vision loss → A&E or 111. Hours not listed.
- **Their arc:** None in the verified set. Do not invent a founding year or a
  practitioner list.
- **Their mark:** The two names. No logo in this set.

No NHS / private / exam list is in our verified record. Do not invent one.

## The diagnosis

Against shipped `src/concepts/armstrong-opticians/home.astro`:

1. **The two doors are the first screen.** Correct essence.
2. **Emergency is not buried** — A&E / 111 leads. Correct care register.
3. **Hours and services were not invented.** The page does not apologise for
   the gap with fake opening times. Good.
4. **The desk form routes the call** to the chosen door. Honest mechanism.
5. **Calm-room plate is AI and disclosed** (banner: generated image of a calm
   practice, not a photograph of the shop). Do not let it become an invented
   interior tour.
6. **Companies House / filing spine is absent from the guest page.** Correct.
   If filings exist in other research, they stay in research.
7. **The page is still almost any optician plus a second door.** Recognition
   cannot be thickened without new verified facts. That is a finding, not a
   prompt to invent.

## The moves

### 1. Two numbers, two names — **shipped**

Never collapse hearing into "Armstrong".

### 2. Emergency first — **shipped**

Sudden loss of vision: A&E or 111. The appointment form repeats the same
boundary.

### 3. Desk note, then ring — **shipped**

Who, when you hope to come, a return number, which door. Words for the call.
No fake online booking. No published email in this set.

### 4. One calm plate — **shipped (AI, disclosed)**

Reassurance theatre. Not the shop's furnishings.

### 5. Leave the gaps empty — **shipped as absence**

No hours, no exam menu, no NHS claim, no reviews, no Companies House.

### 6. Do not write a plate question on the guest page — **shipped (sweep)**

Guest page must not print "Can they see us, and soon?"

## Honesty constraints

- Thin record: say so in research; do not pad guest copy to look thicker.
- Do not invent hours, prices, practitioners, NHS/private lists, or reviews.
- Do not put Companies House on the guest page.
- Do not claim hearing is Armstrong, or that one number serves both doors.
- Sudden vision loss is A&E / 111, not "ring us first."
- Guest page must not print "Can they see us, and soon?"
- AI calm room: triple disclosure; not a photograph of 30 Railway Street.
- Health context: real labels, large targets, visible focus,
  `prefers-reduced-motion`, honest text at 390px.

## Tests that pin the elevation

- Assert 30 Railway Street, BT33 0AL; 028 4372 2991 (eyes); 028 4064 8306
  (hearing, The Hearing Care Partnership).
- Assert A&E / 111 for sudden vision loss, and that the form does not replace
  that path.
- Assert no hours and no NHS / private / exam list.
- Assert choosing hearing changes the `tel:` to the hearing number.
- Assert nothing is sent from the page.
- Assert guest copy does not contain "Can they see us, and soon?"
- Assert the generated-image banner note survives with the plate.
- Swap test: remove Armstrong, Railway Street, and the hearing partnership;
  if any high-street optician could wear what remains, stop adding chrome and
  wait for facts.

## Open decisions

- Hours, exam types, NHS/private: only after a first-hand published source
  with a read date.
- A practice-supplied room photograph to replace the AI plate.
- Whether the two trades want a single page or two linked doors — not ours to
  invent commercially; the building is what we have.

## When a move ships

Record the source and read date for every new fact in `research/` and in the
case-study Sources & limits block — studio provenance, not guest copy. Speak
as the practice. Do not call the concept validated until an owner or
representative visitor has supplied that evidence.
