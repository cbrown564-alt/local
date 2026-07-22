# Newcastle Chamber — website exploration brief

Internal research for the full-site concept exploration at
`/prototypes/chamber/`. Dated 22 July 2026.

## Who this chamber is

Newcastle Chamber of Commerce (Co. Down) is a **small, volunteer-run**
association relaunched in 2023. It has no public website today — presence is
Gmail (`newcastlechamber2023@gmail.com`), Facebook, Instagram and LinkedIn.
At least eight same-named chambers worldwide dominate search for its name.
Verified public facts: 50A Main Street, phone, Halloween in Newcastle
(31 Oct 2026) planned primarily with the district council.

It is **not** a metro chamber with staff, AMS software, or economic-
development site-selector tooling. Peers that match its size are UK market-
town chambers (Tavistock, Alresford, Bishop's Stortford, Banbridge), not
Greater Phoenix or Nashville.

## What good chamber sites do (2026 consensus)

Sources: Southwind 2026 chamber website checklist & best-of list; Glue Up
chamber must-haves; Kanopi membership-directory guidance; spot-checks of
Tavistock, Alresford, Bishop's Stortford, Banbridge, Newry.

| Job | Best practice | Right-sized for Newcastle |
|---|---|---|
| **Front door** | Single source of truth; clear place identity | Lead with **Co. Down / Main Street / Mournes** so searchers don't land on Tyne |
| **Directory** | Searchable / faceted by industry — not a flat PDF or A–Z dump | Category filters + cards; illustrative until the committee owns the list |
| **Events** | Standing calendar with registration where capacity exists | One confirmed date (Halloween) + room for more; deep-link social for updates |
| **Join** | Clear path on every page; pricing/tiers when ready | Mailto join is honest for volunteer capacity; form can come later |
| **About / trust** | Who runs it, how to reach them | Volunteer committee; no invented officer names |
| **Mobile / speed** | Sub-2s on throttled connections; WCAG-minded | Static Astro concept; no heavy portals |
| **Member value** | Directory visibility is the sell for small chambers | Homepage should prove "you'll be found" |

### What to skip for this chamber (for now)

Metro checklist items that would overbuild a volunteer org: member login
portals, card-taking AMS, auto-renewal, site-selector property databases,
legislative policy libraries, AI member assistants. Banbridge and Alresford
succeed with a lean IA: about, members, events, join, contact.

## Example sites worth learning from

### Closest peers (small / market-town)

| Site | Why it matters |
|---|---|
| [Tavistock Chamber](https://tavistockchamber.org.uk/) | Member-driven voice; directory + events + join as equal pillars; clear "why join" |
| [Alresford Chamber](https://www.alresfordchamber.co.uk/) | Tiny IA; featured member of the month; find-a-member as the utility |
| [Bishop's Stortford](https://bschamber.org/) | Classic small-chamber stack: directory search, membership pitch with simple numbers, committee |
| [Banbridge Chamber](https://banbridge.org/) | Local NI peer — collective voice, market-town pride; currently thin content (gap Newcastle could leapfrog) |
| [Chipping Sodbury](https://sodburychamber.co.uk/member-directory/) | Directory as the product; A–Z membership list |

### Larger / aspirational (steal one idea, not the budget)

| Site | Steal this | Leave this |
|---|---|---|
| Greater Phoenix Chamber | Faceted directory UX | Metro membership CRM |
| Bentonville / Greater Bentonville | Proof a smaller chamber can look modern | 1,000-member staffing model |
| Nashville Area Chamber | Member spotlights as storytelling | Publication-scale content engine |
| Fort Worth Chamber | Events filter UX | Committee/format taxonomy overload |
| Lawrence Chamber (KS) | Rural-adjacent, mobile-first discipline | US EDO framing |
| Newry Chamber | Regional NI neighbour; full programme site | Staffed CEO / 300+ members — different scale |

## Audiences for Newcastle's site

1. **Prospective members** — traders who need a reason to email the inbox
2. **Public / visitors** — "find a business in Newcastle Co. Down"
3. **Existing members** — visibility + event awareness
4. **Search / AI** — entity clarity so Co. Down wins over Tyne

## Three directions to prototype

| ID | Name | Primary metaphor | Homepage leads with | Bet |
|---|---|---|---|---|
| **A** | Civic Front Door | Town-hall seal | Mission + next event | Institutional trust; closest to the current M1/M2 concept |
| **B** | Main Street Finder | Shop window / directory | Search the street | Public utility + member visibility as the join hook |
| **C** | Harbour Network | Neighbour traders | Why join / belonging | Softer, growth-led; less "chamber of commerce" intimidation |

All three ship the same IA skeleton so comparison is fair:

`Home · About · Members · Events · Join · Contact`

Every page is linked and reachable. Member lists and non-Halloween events are
illustrative; contact details and Halloween are verified.

## Evaluation questions (for review)

1. Which homepage makes Co. Down unmistakable in under three seconds?
2. Which join path feels right for a volunteer committee (email vs form theatre)?
3. Does the directory feel like a gift to members, or like admin furniture?
4. Can the committee maintain this without AMS software?
5. Which direction feels most like Newcastle under the Mournes — and least like a generic UK chamber theme?

## Decision (22 July 2026)

**Proceed with a B-led hybrid**, published at `/concepts/newcastle-chamber/`:

- **B · Main Street Finder** — IA and homepage (directory as the product)
- **A · Civic Front Door** — Co. Down strip, seal, harbour-navy / brass chrome
- **C · Harbour Network** — warmer neighbour voice on the join page

Mailto join; calendar grows from the verified Halloween date. Prototype
directions at `/prototypes/chamber/` kept for comparison.
