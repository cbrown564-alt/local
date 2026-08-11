# Shorts-snags visuals — brief and shot lists

*Written 11 August 2026. Imagery for the five narrations in
[`../narration/shorts-snags/`](../narration/shorts-snags/) (script:
[`../narration/shorts-snags/script.md`](../narration/shorts-snags/script.md)).
Companion to [`studio-recurring-themes.md`](studio-recurring-themes.md) — each
short is one T-theme, spoken in second person as the owner-voice snag rather
than staged wordlessly like the T-scenes were. Follows the method that worked
for [`trailer-visuals-brief.md`](trailer-visuals-brief.md): timing spine
measured off the audio first, stills before motion, the still under the
narration is a shippable artefact on its own.

**Status: research only.** Nothing here is approved to ship. Provenance entry
before any commit of generated frames, per
[`../image-provenance.md`](../image-provenance.md). No stills exist yet for
`shorts-snags` — `media/film/stills/` currently has `dundrum/`, `newcastle/`,
`studio/` and `trailer/` only.

---

## 0. Theme mapping

Each short is a single T-theme from `studio-recurring-themes.md`, spoken
directly to the owner instead of staged silently. Where the trailer already
built a still for the same underlying idea, that shot is named below as the
**anchor** — not to be reused verbatim (durations and framing differ), but to
keep the object and the palette consistent across trailer and shorts.

| Short | Theme | Trailer anchor |
| --- | --- | --- |
| S1 — The login at the door | T1 | `03-reimagined.png` / `04-frosted-login-wall.png` |
| S2 — Nobody answers "are you open?" | T4 | none — new object (a clock/hours board) |
| S3 — The bell with no clapper | T5 | `08-silent-bell.png` |
| S4 — The best thing about you is in the footer | T7 | none — new object (small print at floor level) |
| S5 — The swap test | T10 | `18-reimagined.png` |

## 1. Shared visual grammar (applies to every shot below)

Unchanged from the trailer and the T-scenes: **clay object theatre, County
Down coastal palette — slate, sea green, warm amber window, harbour brass. No
faces, no hands, no lettering in frame.** The customer is boots, an umbrella,
a folded note. The page is the antagonist, never the owner — these scripts
already do the work of being fair to the owner in the *decision* beat, so nothing
in the image should look punitive or mocking.

Standard technical line for every prompt (omitted below to avoid repeating it
40 times — append before generating): *Miniature clay and paper-craft set,
stop-motion animation look, shot slightly above eye level on a long lens with
shallow depth of field. No people, no faces, no hands, no lettering. Calm and
dry, not corporate explainer energy. 16:9.*

**Second-person address.** Unlike the trailer and the T-scenes, these five
address the owner, not a silent visitor. Where the trailer's grammar keeps the
owner offscreen entirely, these can hold on the owner's side of the counter —
still object theatre, still no faces, but the "camera" can sit inside the
shop looking out, not just outside looking in.

## 2. Timing spines

Measured with `ffmpeg silencedetect` (`-30dB`, 0.4s) against each narration
file. Each script has exactly one `[pause]` tag; its timecode is given below
as **the act break** — before it is the approach and the fault, after it is
the cost, the reasonable why, the fix, and the closing question. As with the
trailer brief, these are ±1s and un-verified against word-level ASR — run
ElevenLabs speech-to-text first if a tighter sync is ever needed.

| Short | Duration | `[pause]` lands at |
| --- | --- | --- |
| S1 — The login at the door | 57.4s | ~17.3–19.1 |
| S2 — Nobody answers "are you open?" | 60.8s | ~18.4–19.9 |
| S3 — The bell with no clapper | 57.2s | ~10.1–11.8 |
| S4 — The best thing about you is in the footer | 62.1s | ~27.8–29.0 |
| S5 — The swap test | 59.4s | ~13.6–15.1 |

Every short follows the same seven-beat shape, which is the shape the scripts
themselves are already written in (setup → the broken interaction → **turn**
→ the cost → the reasonable why → the fix → the question). Shot counts below
hold to that shape rather than cutting on every sentence — these are voiced
essays, not the trailer's rapid-fire beat sheet, so each still is expected to
hold considerably longer per shot (roughly 8–13s) than the trailer's average.

---

## 3. S1 — The login at the door (57.4s)

| # | In | Line | Shot |
| --- | --- | --- | --- |
| 01 | 0:00 | "Someone wants to see what you sell. That's all." | A pair of small clay boots stopped on a cobbled street, facing a shopfront window lit warm amber inside. Nothing blocks the view yet — the window is just a window. |
| 02 | 0:03 | "They find your page... a box asks them to accept cookies. Behind it, greyed out, is your name." | Close on a sheet of frosted glass sealed across the shopfront doorway. A plain pale paper rectangle is pressed flat against the outside of the glass at eye height — a blank consent slip. Through the frost, barely legible as a soft grey smear (never as lettering), the shape of the shop's own name sign is visible, dimmed behind the glass. |
| 03 | 0:09 | "They accept. Now it wants them to log in. Or create an account." | Same frosted pane, the paper consent slip now fallen away at the base of the door. A second, taller sheet of frosted glass has risen directly behind it — a wall behind the wall. The amber light from inside is now a full shade dimmer, read through two layers instead of one. |
| — | ~17.3–19.1 | *[pause]* | **Act break.** Hold on the double-frosted door, static, no new element. |
| 04 | 0:19 | "They wanted to look in the window. They've been asked for a password." | The pair of boots from shot 01, now turned three-quarters away from the door, weight shifted off it. |
| 05 | 0:24 | "Now — nobody chose this... reasonable thing to have thought." | Inside the shop, warm and dry: a small clay counter with a modest paper sign standing on it (unreadable, just a rectangle) and a single tidy stack of paper — the owner's side, ordinary and well-kept. Nothing wrong is visible from in here. |
| 06 | 0:38 | "But here's what it costs. A stranger will not make an account... They'll go and look at somebody who lets them look." | Wide shot: the boots, now well down the street, approaching a second shopfront two doors along whose window has no glass sheet across it at all — same cobbles, same dusk, an open view straight to the counter inside. |
| 07 | 0:48 | "So the check is one question... without an account?" | Back on the original door, frosted glass still sealed, but now with the paper consent slip and the second sheet both stripped away in the frame's near foreground — as though mid-removal, held on the moment before the glass itself comes down. |
| 08 | 0:52 | "If not, that's the first thing to fix. Before the colours. Before anything." | Clean single pane of ordinary glass in the same doorframe, warm interior light now reading through at full strength, one shade brighter than shot 02's. Closing image — mirrors shot 01's framing exactly. |

## 4. S2 — Nobody answers "are you open?" (60.8s)

| # | In | Line | Shot |
| --- | --- | --- | --- |
| 01 | 0:00 | "Someone's on their way into the town... Are you open right now." | A single umbrella, closed, held loosely, moving along a wet cobbled street toward a row of shopfronts in blue dusk. Rain on the stones. |
| 02 | 0:04 | "They land on your site. There's a bar across the top offering to translate the page. Underneath it, a video plays." | Close on a shopfront's fascia board: a thin brass strip has been fixed across the very top of it, crowded with small unreadable flag-shaped tabs. Below the strip, a paper poster fills most of the window, a looping loop of light flickering faintly across it (a small warm strobe, not an image). |
| 03 | 0:11 | "They scroll. There's a map. They scroll again." | Same shopfront, camera pushed down and past the poster — a small hand-drawn street map is pinned lower in the window, then past that, empty glass, then past that again, more empty glass. The window is deeper than one pane suggests. |
| — | ~18.4–19.9 | *[pause]* | **Act break.** Hold on the third empty pane, static. |
| 04 | 0:20 | "Two screens down, there it is. Tuesday to Sunday, nine to four." | At the very bottom edge of the window, near the stall-riser, a small brass hours-plate — the kind mounted low, easy to miss, unreadable as text but clearly a plate of information, sitting in shadow below the sightline of shot 01's approaching umbrella. |
| 05 | 0:31 | "So now they have to work out what day it is... Standing outside. In the rain." | The umbrella from shot 01, now open, held overhead, standing still directly in front of the glass, rain visibly striking the stones around the boots beneath it. |
| 06 | 0:43 | "The hours were on the site... Both felt like improvements." | Interior view: the brass strip and the poster seen from behind, backlit, warm — ordinary shop fittings from the inside, put there with care, nothing sinister about them from this side. |
| 07 | 0:50 | "The fix is one line, at the top. Open now — until four today." | The brass hours-plate from shot 04, now relocated to the top of the fascia where the flag-strip was, at eye height, catching full window light. |
| 08 | 0:56 | "So: does your first screen say whether you're open?" | Wide close of the whole shopfront, hours-plate prominent up top, poster and map gone from the glass entirely, clear view straight through to the warm interior. Umbrella from shot 05 now closed again, resting against the wall. |

## 5. S3 — The bell with no clapper (57.2s)

| # | In | Line | Shot |
| --- | --- | --- | --- |
| 01 | 0:00 | "Someone wants to ask if the fourteenth is free." | A single folded paper note, held between finger-shapes implied only by a soft crease, approaching a shopfront door at dusk — the note stands in for the visitor's question. |
| 02 | 0:03 | "They find the page. There's a button that says Book. They tap it." | Close on a small brass door-bell set beside the recessed door, boot-toe just touching it at the base of frame (no leg, no face — the anchor gesture from the trailer's `08-silent-bell.png`, reframed closer). |
| 03 | 0:07 | "It gives them a phone number." | The bell's clapper visible through the open grille of the housing — hanging still, disconnected, not touching the bell's inner wall. Beside it on the door, a small brass plate with a coiled cord motif (a telephone, abstracted, not literal). |
| — | ~10.1–11.8 | *[pause]* | **Act break.** Hold on the disconnected clapper, static. |
| 04 | 0:12 | "Now, a phone number isn't nothing... they've booked somewhere else." | Wide night shot: the same street, a single lit window far off represents "tomorrow" — small, distant, out of reach, the folded note from shot 01 now resting flat on the doorstep, not carried onward. |
| 05 | 0:28 | "'Get in touch' means the visitor does the work." | The coiled-cord brass plate alone, in isolation, no hand near it, the door itself out of frame — the object doing all the asking. |
| 06 | 0:32 | "And the reason it's like that is honest enough... Everybody knows how a phone works." | Interior, warm: the bell mechanism seen from inside the door, ordinary and ungimmicked, a small maintained fixture — the owner's reasonable choice made visible without blame. |
| 07 | 0:40 | "But the asking can happen on the page itself. The date. The number of people. A button that says Ask." | The folded note from shot 01 and 04, now propped upright against the door itself rather than lying flat — reattached to the point of contact. |
| 08 | 0:51 | "So: can someone ask about a date, on the page, at half nine at night?" | Close on the bell again, matching shot 02's framing, but the clapper now visibly resting against the bell's wall, connected. Warm light behind the grille, as if the bell could ring at this hour. |

## 6. S4 — The best thing about you is in the footer (62.1s)

| # | In | Line | Shot |
| --- | --- | --- | --- |
| 01 | 0:00 | "Someone's choosing between you and two others. They're looking for a reason." | Three identical small clay shopfronts in a row, same slate roofs, same plain rendered fronts, indistinguishable from this distance — no signage, no way yet to tell them apart. |
| 02 | 0:04 | "They land on your page. It says what you do... the way everyone who does that says it." | Close on one shopfront's window: a single plain paper card sits centred in the glass, unmarked, ordinary — competent and generic at once. |
| 03 | 0:10 | "They scroll past the services. They scroll past the photographs." | Camera pulls down the height of the shopfront, past the window, past a row of small framed photographs mounted at eye level on the wall, continuing to descend. |
| 04 | 0:19 | "And down at the very bottom, in small grey text — the years. The award. The accreditations." | Ground level, at the base of the stall-riser: a small tarnished brass plaque, low to the cobbles, easy to walk past, catching almost no light. |
| — | ~27.8–29.0 | *[pause]* | **Act break.** Hold on the low plaque, static. |
| 05 | 0:29 | "The thing you'd say in ten seconds at the counter... where modest things go to hide." | The same plaque, isolated in near-darkness, the rest of the shopfront fallen out of frame entirely — it is the only thing left standing but nobody is looking this low. |
| 06 | 0:38 | "And it went there for a good reason. Saying it out loud felt like boasting." | Interior, warm: the plaque's twin — a small polished medal or seal — sitting modestly on a shelf inside, placed there with quiet care, not hidden out of neglect. |
| 07 | 0:44 | "But a visitor isn't a neighbour who already knows you... in the smallest text on the page." | Wide shot of the three shopfronts from shot 01 again, a folded note (the visitor, as in S3) paused between the first two, unable to tell them apart, about to move on. |
| 08 | 0:56 | "So: is the best reason to choose you the first thing on the page?" | The brass plaque from shot 04, now relocated up to the window at eye height, beside the plain paper card from shot 02, catching full window light. |

## 7. S5 — The swap test (59.4s)

| # | In | Line | Shot |
| --- | --- | --- | --- |
| 01 | 0:00 | "This one's quick. And it's the one people don't like." | A single clay shopfront at dusk, fascia board bare — no name plate fixed yet, just the mounting marks where one could go. |
| 02 | 0:04 | "Open your website. Look at the top of the page. The picture, the heading, the first sentence." | Close on the bare fascia board and the window beneath it: a plain paper card in the window, identical in composition to S4 shot 02 — the deliberate echo that this is the same generic template. |
| 03 | 0:10 | "Now imagine swapping your name for a competitor's." | A small unmarked brass nameplate, blank, being lifted away from the fascia's mounting marks (the trailer's `15-nameplate-lifting.png` anchor, reframed for this short) — held mid-air, not yet set down anywhere. |
| — | ~13.6–15.1 | *[pause]* | **Act break.** Hold on the lifted blank plate, static. |
| 04 | 0:15 | "Does anything else need to change?" | The same fascia and window, completely unchanged from shot 02 — same paper card, same composition — proving nothing needed to move. |
| 05 | 0:18 | "If it doesn't — the site isn't yours. It's a template with your name in the corner." | The blank nameplate from shot 03, now set down in the corner of the window sill rather than mounted centrally on the fascia — present, but marginal. |
| 06 | 0:24 | "And this is the least stupid mistake on the list... looks like a proper business." | Wide shot: the shopfront looking tidy, complete, respectable — deliberately the most "finished-looking" image in the whole short, to sell the trap. |
| 07 | 0:32 | "It also looks like everyone else's." | The same wide shot, pulled back further to reveal two more shopfronts either side, all three now visible as near-identical silhouettes in the dusk. |
| 08 | 0:38 | "The way out isn't a fancier design... a lie if a competitor said it." | Close on the fascia's mounting marks again (as in shot 01), but now with a single distinctive object — a folded note with a hand-pressed fold pattern unique to this shop, not a blank card — set where the nameplate should go. |
| 09 | 0:52 | "So: swap your name. Would anything else need to change?" | The distinctive folded object from shot 08, held up beside the blank brass nameplate from shot 03/05 — the two side by side, one plainly not interchangeable with the other. Closing image. |

---

## 8. Before any generation

1. Provenance entry per short before committing frames, per
   `../image-provenance.md`.
2. No motion promotion until each short's stills are cut against its own
   narration first (step 3 in the trailer's own method) — the still-under-VO
   is the gate here too.
3. S1, S3 and S5 share objects with existing trailer stills (frosted glass,
   the bell, the nameplate). Generate those three shots' prompts with the
   trailer's actual images open for reference so the clay world stays one
   world, not five slightly different ones.
