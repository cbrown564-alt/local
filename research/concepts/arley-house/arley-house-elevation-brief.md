# Arley House — elevation brief: wake in Dundrum, Newcastle when you want it

Written 23 August 2026. The general method is in
`docs/the-elevation-method.md`; this is the stay application of it.

**Status: written 23 August 2026 against the concept already on
`sprint-day1-five`.** The guest page has shipped the Belfast Road address, family
B&B inventory (dogs inside and out, TV and games room, ground-floor bedrooms,
cot, parking, wifi, laundry, tea in rooms), the A24/A2 line, two beaches and
Dundrum Castle, the Visit Mourne Gullion Strangford pull-quote, "Ring the house
for nights" (no invented hours), a disclosed AI dusk-windows plate, and a stay
form that writes words for a phone call to 028 4375 0949 rather than pretending
to book. First-screen and form chrome were polished 23 August 2026; guest-voice
sweep the same day. `arleyhousedundrum.co.uk` exists (census / verification 5
August 2026) but was thin / unreadable to the probe — the concept does not
lean on that site. FSA rating is research-only (see below). Not validated with
the house.

## The shape of this business

A **stay**: what the guest buys is where they wake. The register is
**atmosphere** — a small house in Dundrum, dogs welcome, Newcastle down the
road when they want it, not before. Theatre is waking in the village, not a
hotel booking engine. Hours are not published in the verified set; the diary
is the phone.

## The essence

**Wake in Dundrum, Newcastle when you want it.**

The paradox is geography: the house sits on the A24/A2 Belfast–Newcastle road
in the village, with two award-winning beaches either side and Dundrum Castle
a short walk, while the resort town is a choice, not the address. A concept
that sells "Newcastle B&B" on the first line fails the house. A concept that
invents check-in hours fails the record.

## What recognition can draw on

- **Their voice:** No long house-written creed is in this brief's verified set.
  The strongest sourced sentence is the destination quote (Visit Mourne Gullion
  Strangford, used on the concept, attributed there): "If it's the beach you
  like, we have 2 award winning beaches on either side of us… climbing the
  historic Dundrum Castle gives you a bird's eye view of how the land lies all
  the way up to where the Mountains of Mourne sweep down to the sea." Do not
  present that as the family's uncredited speech.
- **Their geography:** 14 Belfast Road, Dundrum, BT33 0NG. A24/A2
  Belfast–Newcastle road. Two award-winning beaches either side of the village;
  Dundrum Castle; Mournes in the sourced quote. Newcastle when you want it.
- **Their ritual:** Family B&B. Dogs inside and out. TV and games room.
  Ground-floor bedrooms. Cot. Parking, wifi, laundry. Tea in rooms. Nights
  arranged by ringing the house.
- **Their arc:** Family-run is all the verified arc supports. Do not invent a
  founding year.
- **Their mark:** The name Arley House. No cleared logo in this set.

**Contact:** 028 4375 0949.

**FSA (research only, not guest chrome):** ARLEY HOUSE BED & BREAKFAST rated 5
on 2024-09-04 (Food Standards Agency). If it ever appears, it belongs in
Sources & limits with that date — not as a guest badge without a re-read.

**Own site:** arleyhousedundrum.co.uk existed at census / verification 5 August
2026; content was thin / unreadable to the probe. Do not invent hours, tariffs,
or room counts from a site we could not read.

## The diagnosis

Against shipped `src/concepts/arley-house/home.astro`:

1. **Essence is on the first screen** — beaches, castle, Newcastle when you
   want it. Good.
2. **Inventory is only the verified list.** Good. No invented spa, no star
   rating.
3. **Hours were not invented.** "Ring the house for nights." Good.
4. **The form is a call script, not a booking backend.** Right for a house
   without a published reserve path.
5. **The dusk plate is AI and disclosed** in the banner ("The windows at dusk
   are a generated image, not a photograph of the house."). Keep that pairing.
6. **FSA 5 is correctly off the guest page** until we decide it belongs in
   research-facing case study only.
7. **Their own site cannot be treated as a rich competitor** — we could not
   read it (5 August 2026). Do not criticise it on the guest page anyway.

## The moves

### 1. Name Dundrum first — **shipped**

Address and village before the resort. Newcastle is a later choice.

### 2. Put the sourced place quote on the page — **shipped**

Visit Mourne Gullion Strangford · Arley House. Verbatim as on the concept.
Studio read stamps stay off the quote.

### 3. Inventory the house, not a hotel spec — **shipped**

Dogs, games room, ground-floor rooms, cot, parking / wifi / laundry, tea in
rooms. Nothing else.

### 4. Nights by telephone — **shipped**

Form writes the words; guest rings 028 4375 0949. No email is in the verified
set — do not add a mailto.

### 5. One dusk atmosphere plate — **shipped (AI, disclosed)**

Stay register: windows lit. Not a photoreal claim to be this house.

### 6. Keep hours unpublished — **shipped as absence**

Do not fill the gap from memory or from a thin website.

## Honesty constraints

- Do not invent hours, prices, room numbers, reviews, or occupancy.
- Guest page must not print "Is this where I want to wake up?"
- Do not use FSA, Companies House, or the 5 August 2026 probe as guest copy.
- Do not pretend arleyhousedundrum.co.uk was a readable, current brochure.
- Dogs, cot, ground floor: only as listed; no extra pet policy.
- AI dusk plate stays disclosed; never captioned as a photograph of Arley House.
- Guest page never criticises the house's own site (Buck's Head rule).

## Tests that pin the elevation

- Assert 14 Belfast Road, Dundrum, BT33 0NG and 028 4375 0949.
- Assert dogs, games room, ground-floor bedrooms, cot, parking, wifi, laundry,
  tea in rooms — and no other amenity claims.
- Assert the Visit Mourne Gullion Strangford quote (beaches, castle, Mournes)
  with that attribution.
- Assert no clock hours and no prices.
- Assert the form produces a call script and a `tel:` to the house; nothing
  sends.
- Assert guest copy does not contain "Is this where I want to wake up?"
- Assert the banner disclosure that dusk windows are generated remains with
  the plate.
- Swap test: remove Arley House, Belfast Road, and Dundrum Castle; if any
  coastal B&B could wear the page, elevation has not gone far enough.

## Open decisions

- Re-read arleyhousedundrum.co.uk when it is actually readable; only then add
  hours, tariffs, or their own sentences.
- Whether FSA 5 (2024-09-04) belongs in a case-study Sources & limits line.
- A house-supplied photograph to replace the dusk plate.

## When a move ships

Record the source and read date for every new fact in `research/` and in the
case-study Sources & limits block — studio provenance, not guest copy.
Guest-facing attribution stays light; never put a studio read stamp on the
guest page. Speak as the house. Update this status line as moves land; do not
call the concept validated until an owner or representative visitor has
supplied that evidence.
