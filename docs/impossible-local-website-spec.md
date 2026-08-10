# The impossible local website

Full representative-prototype specification. Written 9 August 2026.

## Decision

Build this second, after the owner’s operating page is implemented and
reviewed, but before attempting any combination.

The impossible local website is a public experience that could not plausibly
have come from a template, a page builder or a generic agency process. It turns
the subject’s real place, material, rhythm or mechanics into the structure of
the site itself.

The proposition is:

> The website does not decorate the business. It lets a visitor experience the
> thing that makes the business impossible to substitute.

“Impossible” does not mean technically extravagant for its own sake. It means
the finished interaction is inseparable from one subject. Removing the name
would not make it reusable for a competitor.

## Why this exists

The current concept portfolio is deliberately grounded: it preserves business
identity, respects published facts and improves a route to action. That has
produced useful work, but it also establishes a ceiling. The concepts mostly
show a better version of what businesses already recognise as a website.

This prototype asks a different question:

> What could a local business be working towards if the web were treated as a
> native creative medium rather than a set of pages?

The answer must still be useful, accessible and honest. Ambition does not relax
those requirements. It changes the form in which they are met.

## Scope and non-goals

This specification owns one complete representative visitor journey. It does
not own a reusable product, a client delivery system or the later
owner-operated combination.

The prototype includes:

- one synthetic workshop identity and one terrain study;
- the full street-to-workshop journey across five chapters;
- one complete workshop-enquiry handoff;
- full-motion, reduced-motion and renderer-failure forms;
- the source and provenance record needed to explain what is real.

It does not include:

- live trail conditions, route guidance or safety advice;
- real stock, hire availability, workshop capacity or customer accounts;
- a general terrain-site builder, theme system or content-management layer;
- the owner editing loop specified in
  [`owners-operating-page-spec.md`](owners-operating-page-spec.md);
- evidence that a business wants, can maintain or will profit from this form.

## The pure form

Choose one subject with an irreducible relationship to place and movement. The
first representative prototype will study a mountain-bike workshop and ride
culture beneath the Mournes, using new synthetic identity and content rather
than extending the existing Mourne Cycles concept.

The site is a continuous journey from street to ridge and back to the workshop.
The Mourne terrain is not a background. It is navigation, pacing, information
and memory.

The central interaction is a living cross-section of the mountains. A visitor
traces a route through real elevation. The page changes register as the line
moves: town, forest, open mountain, descent, workshop. Each section reveals the
small amount of content relevant to that part of the ride.

The experience ends with one useful choice: prepare a bike for this kind of
ride, find an appropriate hire category, or contact the workshop. It does not
pretend to recommend a safe current trail or guarantee conditions.

## Departure rules

This must look and behave unlike the existing portfolio, including the current
Mourne Cycles routes, Lit Town, Shore and the existing ridgeline component.

Do not reuse:

- any current Mourne Cycles shell, palette, typography, peaks mark, hero or
  booking widget;
- the existing `McRidgeline` drawing or its red marker treatment;
- Lit Town’s glowing-business map or the studio’s Shore horizon;
- conventional header navigation followed by stacked page sections;
- the studio’s comparison, cards, accordions or design-note patterns;
- a video hero with the experience placed below it;
- scroll effects whose only achievement is movement.

The prototype may reuse verified raw terrain sources and general motion
utilities, but it must derive a new visual object and interaction from them.

The work should be bold, opinionated and unusually simple: one strong spatial
idea carried to its limit, with supporting interface almost disappearing.

## Representative subject and evidence

The prototype uses a fictional mountain-bike workshop based in Newcastle,
clearly labelled as a synthetic representative subject. It is not a renamed
concept for an existing prospect.

Real inputs may include:

- open SRTM or equivalent elevation data;
- verified public coordinates for Newcastle and named Mourne summits;
- calculated daylight for the stated place and date;
- a deliberately selected route profile derived from open terrain data;
- weather only if a stable, attributed data source is added later.

The prototype must not present:

- a route as open, safe or suitable today;
- generated riders as customers;
- the workshop as stocking a particular model;
- live wind, trail or weather conditions without a real source;
- exact trail geometry inferred only from elevation data;
- performance or safety advice beyond the evidence available.

The route is an expressive terrain study, not a navigation product or survey.

## The complete experience

### Entry: street level

The experience opens at human scale. The visitor hears nothing by default and
sees no generic mountain panorama. They see a single grounded object: the
profile of the journey rising from the town.

One invitation is visible:

> Take the line from the street to the high ground.

Pointer, touch, wheel and keyboard may move along the same journey, but the
interaction must never require dexterity or continuous gesture.

### Ascent: the page becomes terrain

Moving along the line changes more than a marker position:

- typography compresses or opens with the terrain’s scale;
- sound, if deliberately enabled, uses restrained browser-generated material
  rather than a looping soundtrack;
- the visible palette shifts according to altitude and exposure;
- facts arrive at places where they have meaning;
- the line carries cumulative climb and approximate elevation in readable DOM
  text;
- route chapters can be entered directly without replaying the journey.

The visitor always knows where they are, how to advance and how to leave the
experience.

### High ground: the impossible moment

At the highest point, the flat webpage should feel briefly insufficient. The
terrain opens into a spatial scene built from the same data: not a photograph,
not a hand-drawn mountain and not a generic three-dimensional globe.

The scene should communicate distance, exposure and the relationship between
town, ridge and sea. It must remain recognisably derived from the place rather
than becoming abstract audiovisual art.

This moment has one line of copy and no call to action. Its job is recognition
and theatre.

### Descent: speed with control

The return changes the interaction’s character. The visitor may let the route
play or step through it. Motion becomes quicker and more directional but never
removes reading control. Reduced motion receives a sequence of composed settled
plates.

The business appears through the problems the ride creates: brakes, drivetrain,
punctures, setup and recovery. Product categories or workshop services emerge
as consequences of the journey, not navigation tabs.

### Return: the workshop

The line finishes at a workbench. The terrain folds into a concise useful
action:

- `Prepare my bike for this kind of ride`;
- `Find the right hire category`;
- or `Ask the workshop`.

The prototype should build one of these actions completely. Default to the
workshop enquiry because it preserves human judgement and can be implemented
without stock or availability claims.

The enquiry carries context from the journey—ride character, duration and the
visitor’s concern—without claiming that the route itself is recommended.

## Information architecture

The experience is continuous, but it still exposes a clear document outline:

1. Street
2. Forest
3. High ground
4. Descent
5. Workshop
6. Sources and limits

Each chapter has a real heading, a direct anchor and meaningful content in the
DOM. The spatial layer enhances that structure. It never owns the only copy,
fact or action.

There is no traditional top navigation. A compact route index shows the five
chapters as positions along the same line. It is always keyboard operable and
becomes the primary interface when reduced motion is requested.

## Visual direction

The aesthetic should feel like a collision between:

- an elevation instrument;
- the reflective material and sharp colour used on a working bike;
- the mineral, forestry and coastal light of the Mournes;
- and the scale change from a workshop bench to a mountain range.

Avoid outdoor-brand clichés: pine green, contour-line wallpaper, topo-map
decoration, motivational summit copy, lifestyle photography grids and rugged
display typography.

Choose a new identity from the subject’s physical materials. Possible inputs
include anodised metal, grease pencil, wet stone, reflective tape, brake-rotor
geometry and workshop inspection light. Use one as structure, not all as
decoration.

The first design exploration must produce three materially different worlds in
the actual first-to-high-ground flow. At least one should reject photography
entirely; at least one may use a small amount of generated or commissioned
imagery if the provenance and visible disclosure are designed with it.

Typography must not reuse the studio or current cycle-concept families. Select
it for the new physical scene, not for the generic category “cycling.”

## Motion and sound

Motion carries the journey, so its rules are strict:

- movement always corresponds to distance, altitude, exposure or return;
- every transition has a settled frame that carries the same meaning;
- user input cancels automated motion immediately;
- no looping animation continues after a chapter settles;
- the page never scroll-jacks or hides the browser’s normal exit;
- motion uses one shared scheduler;
- visible text remains DOM text and does not shear, blur or rotate while read;
- reduced motion is a designed chapter sequence, not the animated version with
  transitions disabled.

Sound is off by default and optional. If built, it should be generated from the
same journey state—subtle mechanical resonance, tyre material or exposure—not
a cinematic music bed. The full experience must communicate without it.

## Technical approach

Build under `/prototypes/impossible-local/` and keep it `noindex`.

### Data preparation

- Select and document the open elevation source.
- Bake the representative terrain and route profile at build time.
- Reduce it to the smallest data set that preserves the visible form.
- Store source, bounds, sampling and simplification beside the generated data.
- Keep facts, labels and interaction copy in typed records rather than drawing
  them into the visual layer.

### Rendering

The prototype may use Canvas, WebGL or SVG according to the selected direction.
Do not choose WebGL merely to claim technical ambition. Choose the least complex
renderer capable of the high-ground moment at target frame rate.

The renderer receives an immutable journey model and paints visual state. It
does not own navigation, copy or business logic.

Suggested boundaries:

- `JourneyDocument` owns chapters, facts, sources and the final enquiry context;
- `JourneyController` maps keyboard, pointer, touch and scroll into bounded
  progress;
- `TerrainRenderer` paints the selected visual direction;
- `JourneyA11y` synchronises progress, focus and live descriptions;
- `WorkshopHandoff` turns the chosen journey context into the honest enquiry.

### Performance budget

For the representative route:

- initial HTML and critical CSS render a meaningful street-level frame without
  waiting for the renderer;
- the terrain experience loads after the document is usable;
- added JavaScript should target less than 100KB gzipped, with any departure
  justified by a measured visual need;
- route data should target less than 25KB compressed;
- generated media must not load before it is needed;
- the experience must remain responsive on a recent mid-range phone.

The existing Lit Town prototype measured 132KB gzipped for its script and 46KB
for terrain. That is a warning, not a reusable budget.

## Accessibility and resilience

- Every chapter and the final action work without the visual renderer.
- Keyboard controls include previous/next chapter and fine progress within a
  chapter where that has meaning.
- Touch interaction uses ordinary page gestures; no precision dragging is
  required.
- Canvas/WebGL is decorative and `aria-hidden`.
- A concise live description announces chapter changes, not continuous metres.
- Reduced motion receives the complete settled-plate sequence.
- High contrast, zoom to 200% and 390px layouts preserve the route index and
  workshop action.
- If rendering fails, a classed terrain profile image plus the structured
  document remains.

## Honesty and provenance

- The subject is synthetic and visibly labelled.
- Real terrain sources, coordinate boundaries and simplification are recorded.
- Generated imagery or synthetic audio receives a provenance entry before
  commit and visible disclosure if rendered to a visitor.
- `Indicative terrain study—not navigation or current trail advice` remains
  visible near the route and in Sources and limits.
- The final workshop action is a representative enquiry, not a real booking.
- No performance, safety or business result is inferred from experiencing the
  prototype.

## What the prototype must prove

### Creative proof

- A still from street, high ground and workshop looks like three states of one
  authored system.
- The experience remains identifiable with the subject name removed.
- The high-ground moment produces recognition or surprise without explanatory
  copy doing the work.
- No current concept, site shell or studio component is visually recognisable.
- The final business action feels like the inevitable end of the journey rather
  than an attached conversion panel.

### Interaction proof

- A visitor can complete the journey by pointer, touch and keyboard.
- They can skip directly to a chapter and resume without losing context.
- Taking control stops automated motion.
- Reduced motion is complete and deliberate.
- The renderer failing does not remove content or the enquiry.

### Later validation

Only representative viewers and eventually a participating business can tell
us whether:

- the experience feels specific rather than merely spectacular;
- the subject recognises itself in the abstraction;
- visitors understand the relationship between journey and business;
- and the ambition increases trust rather than making the business feel
  inaccessible.

## Build sequence

1. Select and document a new synthetic subject identity and route.
2. Make three competing street-to-high-ground directions in the real viewport,
   not separate moodboards.
3. Choose the direction with the strongest still frame and clearest journey.
4. Build the document structure and renderer-failure fallback first.
5. Build street → forest → high ground as the representative visual slice.
6. Add descent and the complete workshop-enquiry loop.
7. Use the same journey model for pointer, keyboard, touch and reduced-motion
   paths from the first slice; complete and test those paths after the main
   visual loop works. Treat optional sound as a separate final enhancement.
8. Capture all five chapters at desktop and phone sizes; test the no-renderer
   and reduced-motion paths directly.
9. Record the visual or technical pattern only after the singular experience
   succeeds. Do not extract a generic “impossible site framework.”

## Stop conditions

Stop and redesign if:

- the result reads as a cycling brand campaign with local imagery;
- the mountain is a background behind conventional sections;
- the high-ground moment depends on copy saying it is special;
- the final action could be removed without changing the journey;
- current conditions or route safety are implied without evidence;
- motion blocks reading or control;
- reduced motion feels like a broken version;
- or the same interaction could be reskinned for a hotel, farm or architect.

## Decision ledger

| Question | Decision | Evidence | Consequence | Owner |
| --- | --- | --- | --- | --- |
| What makes it impossible? | Real terrain structures the whole journey and its business action. | The elevation method requires subject-specific recognition and theatre. | Terrain is navigation and meaning, not decoration. | This spec |
| Does this extend Mourne Cycles? | No. It uses a new synthetic identity and starts from a blank canvas. | The user explicitly wants departure from existing concepts. | Existing cycle work supplies only evidential lessons. | This spec |
| Is WebGL required? | No. The selected direction decides the renderer. | Ambition is experiential, not a technology claim. | Canvas/SVG remain valid if they deliver the high-ground moment. | This spec |
| What stays real? | Terrain source, geographic relationship, structured document, controls and enquiry loop. | Those elements support the prototype’s central claim. | Weather, safety and live business data remain out unless sourced. | This spec |
| What is the promotion boundary? | Representative prototype only. | `docs/CONTEXT.md` distinguishes prototype from pilot and result. | No demand, client or commercial claim follows from completion. | `docs/CONTEXT.md` |

## Definition of implemented

The impossible local website is implemented only when the five-chapter journey,
the high-ground moment, the workshop handoff, renderer failure, keyboard and
touch control, reduced-motion sequence and provenance record all exist. A
beautiful animated opening screen does not satisfy this specification.
