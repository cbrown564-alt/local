# The Dundrum Inn — elevation brief: from functional to memorable, on its own terms

Written 1 August 2026, after the rebuilt journey concept passed the publication
checks but still felt emotionally flat beside the place it represents. The
general method is in `docs/the-elevation-method.md`; this is the Inn-shaped
application of it.

**Status: implemented 1 August 2026; moves 1–6 are in the concept page.** The
rebuild on 26 July fixed the real problems: it restored the Inn's colour, put a
faithful frontage visualisation on the first screen, kept the GuestDiary
destination, and made the published bar hours do useful work. This pass carries
the brief through: the Inn now has a name-and-date lock-up, one Today panel,
the bay-to-bed sequence, five named keys, a composition-matched blue-hour
frame, and an indicative Inn-to-bay place plate. The open decisions below stay
open where they require owner permission or a verified GuestDiary parameter
format; the concept does not pretend those questions are settled.

## The shape of this business

The Dundrum Inn is a **working inn**: a pub and garden on Main Street, rooms
above, and Murlough Cottage down the lane. It is not a boutique hotel waiting
to be dressed in quiet-luxury language. People arrive for a local stop, a
view, an event, a meal they need to ask about, or a night away; the business
also has to answer the ordinary question of whether the bar is open today.

The existing concept's thesis — **answer today on the first screen** — is
right. Its limitation is that the answer is presented as data. Greatness here
comes from giving the data a setting and a sequence: **the bay-side place in
the afternoon, the working bar in the evening, and the room or cottage after
the door closes.** That sequence is the Inn's own register: local, social,
practical and warm.

The concept competes with a maintained site and a real booking engine, not a
broken brochure. This is a journey concept, not a rebuild. The improvement is
how quickly and memorably the site lets someone understand the place and
choose their next action.

## The essence

**One address, two rhythms: the local inn that works by the day and receives
guests by the night.**

The Inn has a useful tension inside it. It publishes its bar hours and named
stays, but it does not publish kitchen or food-service times. The right answer
is not to invent a schedule; it is to make the honest call-to-the-bar part of
the experience. A concept that handles that tension with confidence will feel
more like the Inn than a generic hotel page with a pub label attached.

## What recognition can draw on

The available material is unusually specific (`research/pipeline/verifications.json:451-471`; the Inn's public site re-checked 26 July 2026):

- **Their voice:** “Come for the views, stay for the craic.” The Inn also
  publishes “Over 190 Years Old” and claims the award for the best Sunday
  roast in Northern Ireland. These are stronger raw materials than a new
  studio-written welcome line.
- **Their geography:** 143–145 Main Street, Dundrum; Dundrum Bay is “over the
  road”; Murlough Cottage is “down the lane”. Keep those relationships exact.
  Do not manufacture a coastal walking route or a mountain vista just because
  the word “views” is available.
- **Their daily rhythm:** published winter bar hours from Monday through
  Sunday, including the Friday and Saturday 1am close; the Inn's events page;
  and the phone call that is still needed for kitchen times. This is a real
  mechanism, not filler for a board.
- **Their stay:** the booking engine accepts check-in, check-out, adults,
  children and a promo code. The public record names The King, The Savage,
  The McLatchie, The Patterson and Murlough Cottage for self-catering. Keep
  the names; do not invent room features, prices, views or availability.
- **Their arc:** 1834 and “over 190 years” on Main Street, with current 2026
  content and a dated Fleadh Cheoil na hÉireann listing. The arc is long, but
  the page only has to use the few moments the Inn actually publishes.
- **Their physical mark:** the yellow-and-black frontage, blue-edged awning,
  hanging Inn sign, flower baskets, barrels and toucan feature. The public
  exterior photograph is held privately as the reference for the faithful
  visualisation (`research/image-provenance.md:106`). These details should do
  more identity work than a new studio crest.

## The diagnosis

The rebuild solved the first-pass failures but leaves four elevation gaps:

1. **The place is present only as a façade.** The hero shows the building, but
   nothing in the page makes the visitor feel the change from bay to bar to
   bed.
2. **The strongest fact is still a widget.** The live open-or-closed state is
   valuable, especially because the Inn publishes no kitchen time, but the
   current rail and board split that answer across dashboard-like cells.
3. **The stay is named but not imagined.** Five named stay options are folded
   into one paragraph beneath the operational content. The concept does not
   yet make “stay” feel like a reason to choose the Inn.
4. **The visual identity is close but not owned.** Plum, cream and Petrona are
   a good response to the frontage, but the hand-drawn 1834 oval is a studio
   substitute. If the Inn has a usable public crest or wordmark, that should
   lead; if it cannot be used, plain type and the date are more honest than an
   invented badge.

The swap test is the warning: the headline, rail, booking bar and board could
be moved to another small hotel with only the nouns changed. The next pass
must make the bay relationship, the working-bar question and the named stay
options impossible to remove without breaking the argument.

## The moves

Ordered by the recommended build sequence.

### 1. Let the Inn speak before the studio does

Rebuild the opening lock-up around the Inn's own language and mark. Keep
“Come for the views, stay for the craic.” as the headline because it is the
Inn's phrase, but give it a quieter supporting role than the current generic
“Cold beers and a warm welcome” sentence. Use “1834” and “Over 190 Years Old”
as a dated house detail, not as a decorative badge invented by the studio.

First choice: use the Inn's public crest or wordmark if it is cleared for the
concept. If it is not, use the Inn name in type with a small 1834 date line and
no substitute emblem. A real subject mark or no mark is better than a
well-drawn studio mark that the Inn never chose.

### 2. Turn “today” into the living front door

The current open-state calculation is the right mechanism, but it needs one
clear composition rather than a rail plus a board. Make a single **Today at
the Inn** panel that answers, in order:

- **Bar:** open now, closed, or next opening, computed from the published
  Europe/London hours;
- **Food:** “Kitchen times are not published — call the bar” with the phone
  number as the immediate action;
- **What's on:** the dated event listing, linked to the Inn's events page;
- **Stay:** check availability through the same GuestDiary handoff.

The open state is the theatre of this business: the site knows enough to help,
and is candid about the one thing it cannot know. The panel should feel like a
chalkboard or front-door notice in the Inn's own voice, not an analytics card.
It must never infer kitchen hours from bar hours or imply that an event is
still current after its date has passed.

### 3. Show the route from the bay to the bed

Translate “a day in the life” into a short **At the Inn** sequence, grounded
only in the public facts:

**Dundrum Bay over the road → the bar's published hours → the event or Sunday
roast claim → a named room or Murlough Cottage.**

This is not a fictional itinerary and must not promise a walk, meal service,
music or atmosphere the sources do not document. It is a way of placing the
existing facts in time so a visitor can see the difference between dropping
in and staying. Each step should have one job and one honest action: find us,
call for food, see the event, or check dates.

The sequence is the main recognition move. It tells the owner that the studio
understood the Inn as a place with a daily life, not just a booking destination.

### 4. Give the five named stays a proper key rail

Replace the single “Four rooms and a cottage” sentence with a restrained
**Keys at the Inn** register:

- The King
- The Savage
- The McLatchie
- The Patterson
- Murlough Cottage · self-catering

Treat the names like key tags or a register in an old front hall. Each entry
can lead to the same live availability handoff; none needs a fabricated room
description to earn its place. If the Inn later supplies room photographs or
amenities, they can be added as sourced detail. Until then, the names and the
GuestDiary search are enough to make the accommodation visible without
pretending the concept knows more than the Inn publishes.

### 5. Make blue hour the Inn's theatre

The current faithful exterior is accurate and useful, but its darkened daytime
frame is visually familiar. Create a second, composition-matched faithful
visualisation for blue hour: the same yellow-and-black frontage, the same
awning, sign, window rhythm and neighbouring façades, with the Inn becoming a
warm stop on Main Street as daylight goes.

The asset is a mood change, not a claim that the bar is open. The open state
must remain text and data-driven. If a blue-hour generation makes the frontage
feel documentary or invents activity behind the windows, use a drawn sign or
facade plate instead. The public page stays AI-imagery-only and carries the
existing disclosure in alt text, on the page and in the case study.

### 6. Draw the place someone can keep

Make an indicative, hand-drawn **Inn-to-bay place plate** for the concept and
the reverse of a one-sheet. It needs only the geography the record supports:
the Inn at 143–145 Main Street, Dundrum Bay over the road, and Murlough
Cottage down the lane. Add no invented trail, viewpoint, garden boundary or
mountain sightline. The map's value is not the number of labels; it is showing
the short relationship that gives the business its nameable setting.

This is a drawing, not a diagram. It should use the Inn's yellow, black, blue
and blush cues, have a clear “indicative · not a survey” disclosure, and be
reviewed at phone width for clipped labels before it is treated as finished.

## Recommended bundles

- **First pass:** moves 1–3. They use existing facts and the current hero, and
  turn the concept from an information stack into a recognisable Inn without
  waiting for new imagery.
- **Stay pass:** move 4. The named keys make the accommodation earn space
  while preserving the real booking handoff.
- **Theatre session:** move 5, with the generation mechanism and day-part
  behaviour built before the asset arrives.
- **Keepable artifact:** move 6 as its own drawing session, then carry the
  finished plate into outreach material.

The first bundle is the priority. It makes the page feel more specific before
adding more sections or more visual weight.

## Honesty constraints

- This is a journey concept, not a rebuild pitch. The live GuestDiary booking
  remains the destination. Verify its query-parameter format before claiming
  that the on-page dates and guest counts carry through; the current page
  deliberately avoids inventing parameters (`research/concepts/dundrum-inn/triage.json`).
- Re-check winter hours, the event date, room names, phone number and the Inn's
  public wording before any outreach. The event listing and hours are live
  business facts, not permanent editorial copy.
- The Inn publishes bar hours, not kitchen or food-service times. The concept
  must say “call for kitchen times”; it must not turn a bar close into a food
  close.
- Do not add room prices, room amenities, room photographs, a menu, music
  programme, guest review or event history unless each item is sourced and
  dated. The current record has enough material; it does not need invented
  atmosphere.
- Keep the phone number from the Inn's own site, `028 4372 9933`; the old
  census number is explicitly corrected in the verification record.
- The public site remains AI-imagery-only. Any generated exterior keeps the
  triple disclosure: alt text, visible page note and case-study Sources &
  limits, plus a provenance entry in the same commit as the file. The Inn's
  original exterior photograph stays a private reference unless permissions
  change.
- Preserve the Inn's own colour and identity cues. Do not bring Mourne Made's
  studio palette or generic boutique-hotel styling into the concept, and do
  not make the studio's oval 1834 device look like the Inn's official crest.
- Any day-part or map interaction must respect `prefers-reduced-motion`, keep
  focus visible and be usable at the real 390px viewport.
- The current case-study comparison and clip were captured after the rebuild.
  Any change to the first viewport, hero composition or section order requires
  a fresh still and clip capture under `docs/MEDIA_CAPTURE.md`.

## Tests that pin the elevation

Each move should have a small proof attached to it:

- Pin the Europe/London open-state calculation, including Friday/Saturday
  spillover past midnight, and assert that the kitchen line remains a call
  rather than an inferred time.
- Assert that all five named stays reach the live availability action and that
  no room price or unsupported amenity appears.
- Re-check the event date and prevent an expired listing from presenting as
  upcoming.
- If the blue-hour hero lands, assert that every day-part asset on disk reaches
  the page, that reduced motion settles without a swap, and that the visible
  disclosure remains attached to the image.
- If the place plate lands, inspect it at desktop and phone width and assert
  that its labels are not clipped and its indicative disclosure is present.
- The focused proof for these checks is `tools/test/test-dundrum-inn-journey.mjs`:
  it runs at desktop, laptop and 390px, verifies both hero sources and all
  five keys, checks the dated event and booking handoff, rejects horizontal
  overflow, and confirms reduced motion keeps the daytime frame.
- Run the swap test on the final page: remove the name “Dundrum Inn”. If the
  sequence still works for any hotel, the elevation has not gone far enough.

## Open decisions

- Can the Inn's public crest or wordmark be used in an uncommissioned concept?
  If not, keep the name-and-date lock-up and retire the studio-drawn oval.
- Does the blue-hour visualisation remain photoreal after generation review,
  or is a drawn facade/sign plate more honest and more ownable?
- Is there one exact, dated guest review or current Inn sentence worth
  elevating as a pull-quote? Do not add one until it is recorded with a source.
- Can GuestDiary accept the four search values through a verified deep link?
  This is an implementation question, not a copy decision; until answered,
  the handoff must stay at the Inn's public booking page.

## When a move ships

Record the source and read date for every new fact, add provenance for any new
asset in the same commit, update the case-study Sources & limits block, and
add journey coverage for new behaviour. Any move that changes the first
viewport recaptures the comparison stills and clip in the same commit. Update
this status line as moves land; do not call the concept validated until an
owner or representative visitor has supplied that evidence.
