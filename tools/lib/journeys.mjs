// Journey definitions — one errand, walked on both the live site and the
// concept, at phone size.
//
// Two consumers read this file: the build-day audit
// (`tools/capture/audit-journey.mjs`, which screenshots every step and counts taps)
// and the journey film mode (`capture-concept-media.mjs journey`). Keeping one
// definition means the film can never claim a step count the evidence folder
// does not show.
//
// Step vocabulary (a subset of the reel vocabulary, plus `fill` and `measure`):
//   goto    — arrive at a URL. Leading `goto` steps prepare the page before
//             recording; they are never counted as taps.
//   tap     — one thumb tap. This is the counted unit.
//   fill    — type into a field the visitor would fill anyway. Never counted
//             as a tap; forbidden outright on live sides (see SAFETY).
//   scroll  — scroll hunting, as a fraction of the page or the viewport.
//   hold    — dwell so a viewer can read the screen.
//   measure — record geometry, or the facts of a PDF, as evidence (no visible
//             effect on the page).
//
// `screen: true` marks a step that lands the visitor on a new view worth
// counting. It is declared rather than inferred so the count in the case study
// can be checked against the numbered screenshots by eye.
//
// SAFETY — the no-real-booking rule (hard):
// On a `live: true` side the walk stops at the booking engine's date/party/time
// stage. It never types personal details and never submits. `assertSafe()`
// below enforces this: `fill` is refused outright on live sides, and any target
// naming a personal-details field or a confirm/pay control is refused on either
// side. Both journeys deliberately end at the same place — the ResDiary widget,
// ready to pick a time — because the verified gap is the path *around* the
// engine, not the engine itself.

export const MOBILE_VIEW = { width: 390, height: 844 };

export const MOBILE_USER_AGENT =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 "
  + "(KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1";

const RESDIARY_WIDGET =
  "https://booking.resdiary.com/widget/Standard/TheBucksHeadRestaurantwithRooms/50459";

// Anything that would take a real reservation past the point of no return.
const FORBIDDEN_TARGETS =
  /(first ?name|last ?name|surname|full ?name|e-?mail|phone|mobile|telephone|card|cvv|postcode|confirm|complete booking|pay|checkout)/i;

const SCOPERS_FACEBOOK =
  "https://www.facebook.com/p/Scopers-Dundrum-Co-Down-100083029315116/";
const SCOPERS_INSTAGRAM = "https://www.instagram.com/scopersdundrum/";

export const JOURNEYS = {
  // Scopers has no website at all, so the "before" side is their social
  // presence — which is the honest comparison, not a straw man: the live
  // Facebook page is genuinely where a customer ends up.
  //
  // One step is deliberately missing. The walk starts at the Facebook page
  // rather than at a Google search, because Google refuses scripted access
  // (recorded 31 July 2026: the search returns its unusual-traffic page). The
  // tap from the search result to the page is therefore *not* counted, which
  // understates the live side by one tap. Never present these counts as
  // including the search.
  scopers: {
    liveHome: SCOPERS_FACEBOOK,
    conceptHome: "/concepts/scopers/",
    evidenceNote:
      "Scopers has no website; the live side is their public Facebook page and Instagram profile, "
      + "walked logged out, as a customer without an account meets them. Nothing was posted, "
      + "messaged, followed or logged into. The tap from a Google result to the page is not "
      + "counted, because Google blocks scripted search — the live counts are one tap short.",
    errands: [
      {
        id: "hours",
        label: "Find today's opening hours and what's on the menu",
        endsAt: "The concept's Find us block · on Facebook, no published hours or menu",
        before: {
          live: true,
          steps: [
            {
              id: "consent",
              action: "goto",
              url: SCOPERS_FACEBOOK,
              settleMs: 5000,
              screen: true,
              strip: true,
              note: "Meta's cookie dialog is the whole first screen. Not one word about the business yet.",
            },
            { id: "consent-hold", action: "hold", seconds: 2.6 },
            {
              id: "consent-scroll",
              action: "scroll",
              to: 1,
              unit: "page",
              seconds: 1.8,
              note: "The dialog's buttons sit below the fold: a full screen of cookie policy has to be scrolled past before the page can be dismissed.",
            },
            {
              id: "accept-essential",
              action: "tap",
              target: "text=Only allow essential cookies",
              via: "element",
              seconds: 6,
              navigation: true,
              screen: true,
              strip: true,
              note: "Tap one only clears the dialog. The page beneath opens on a login prompt and an app banner.",
            },
            {
              id: "measure-page",
              action: "measure",
              targets: {
                details: "text=Details",
                phone: "text=028 4375 8436",
              },
              note: "Where the only trading-status words on the page sit.",
            },
            {
              id: "hunt-hours",
              action: "scroll",
              to: 1,
              unit: "viewport",
              seconds: 2.4,
              note: "Scrolling for opening times. There are none: the page says only 'Closing soon', with no day, no hours and no menu.",
            },
            { id: "hunt-hold", action: "hold", seconds: 2.6 },
          ],
        },
        after: {
          steps: [
            {
              id: "home",
              action: "goto",
              url: "/concepts/scopers/",
              settleMs: 2600,
              screen: true,
              strip: true,
              note: "The first screen names the street, says the bar is open most of the week and links today's hours.",
            },
            { id: "home-hold", action: "hold", seconds: 2.4 },
            {
              id: "to-find-us",
              action: "tap",
              target: "text=Find us",
              seconds: 2.2,
              screen: true,
              strip: true,
              note: "Tap one: address, the hours handoff to their own Facebook, directions and the message route, on one screen.",
            },
            { id: "find-hold", action: "hold", seconds: 2.6 },
          ],
        },
      },
      {
        id: "supper",
        label: "Find the date of the next supper club",
        endsAt: "The concept's supper-club page · on Instagram, a wall",
        before: {
          live: true,
          steps: [
            {
              id: "instagram",
              action: "goto",
              url: SCOPERS_INSTAGRAM,
              settleMs: 5000,
              screen: true,
              strip: true,
              note: "Instagram, logged out on a phone: the bio, the follower count, and no posts at all. The supper club is not reachable from here without an account.",
            },
            { id: "instagram-hold", action: "hold", seconds: 3 },
            {
              id: "measure-instagram",
              action: "measure",
              targets: { anyPost: "main a[href*='/p/']", signUp: "text=Sign up" },
              note: "Whether a single post is reachable on the logged-out profile.",
            },
            {
              id: "facebook",
              action: "goto",
              url: SCOPERS_FACEBOOK,
              settleMs: 5000,
              screen: true,
              note: "The only route left is the Facebook page — and the cookie dialog again.",
            },
            {
              id: "consent-scroll",
              action: "scroll",
              to: 1,
              unit: "page",
              seconds: 1.8,
              note: "The dialog's buttons sit below the fold: a full screen of cookie policy has to be scrolled past before the page can be dismissed.",
            },
            {
              id: "accept-essential",
              action: "tap",
              target: "text=Only allow essential cookies",
              via: "element",
              seconds: 6,
              navigation: true,
              screen: true,
              strip: true,
              note: "Tap one clears the dialog. The date is not on the page: it is inside a post, in the feed.",
            },
            {
              id: "hunt-feed",
              action: "scroll",
              to: 1,
              unit: "viewport",
              seconds: 2.6,
              screen: true,
              note: "Scrolling the feed past pinned posts and a birthday post to reach the supper-club announcement of 10 July, which sinks further with every new post.",
            },
            {
              id: "dismiss-wall",
              action: "tap",
              target: "[aria-label='Close']",
              via: "element",
              seconds: 2.4,
              screen: true,
              strip: true,
              note: "Tap two closes Facebook's login wall, which drops over the feed the moment the posts start.",
            },
            {
              id: "hunt-feed-2",
              action: "scroll",
              to: 4.4,
              unit: "viewport",
              seconds: 2.6,
              note: "Scrolling on, past the pinned posts, towards the supper-club announcement of 10 July — which sinks further with every new post.",
            },
            {
              id: "measure-post",
              action: "measure",
              targets: { supperPost: "text=Supper Club New date 26th August, 7pm" },
              note: "How far down the feed the only public statement of the next date sits.",
            },
            { id: "feed-hold", action: "hold", seconds: 3 },
          ],
        },
        after: {
          steps: [
            {
              id: "home",
              action: "goto",
              url: "/concepts/scopers/",
              settleMs: 2600,
              screen: true,
              strip: true,
              note: "The date is on the first screen: next night, Wednesday 26 August.",
            },
            { id: "home-hold", action: "hold", seconds: 2.4 },
            {
              id: "to-supper",
              action: "tap",
              target: "text=Supper club",
              seconds: 3,
              navigation: true,
              screen: true,
              strip: true,
              note: "Tap one: a standing page for the night — date, format, sample menu and the same Instagram inbox to reserve.",
            },
            { id: "supper-hold", action: "hold", seconds: 3 },
          ],
        },
      },
    ],
  },

  "bucks-head": {
    liveHome: "https://thebucksheaddundrum.co.uk/",
    conceptHome: "/concepts/bucks-head/",
    engine: RESDIARY_WIDGET,
    // Cards that open and close the combined side-by-side edit. The close
    // restates the independent-concept label, as the flagship reel's does.
    filmCards: {
      open: {
        type: "card",
        duration: 4.5,
        eyebrow: "Independent concept · not commissioned",
        title: "The same pub. A shorter walk to the table.",
        detail: "Two errands on a phone, walked on The Bucks Head's own site and on a concept that keeps it — 24 July 2026, Mourne Made, Dundrum",
      },
      end: {
        type: "card",
        cardStyle: "proof",
        duration: 5,
        eyebrow: "Independent concept · not commissioned",
        title: "Their site, their brand, their booking engine.",
        detail: "Only the path changes. mournemade.co.uk/transformations/bucks-head/ · Free before-and-after for local businesses",
      },
    },
    errands: [
      {
        id: "booking",
        label: "Book a table for two, Saturday evening",
        // Both sides finish in the same place so the comparison is about the
        // path, not the engine.
        endsAt: "The ResDiary widget, ready to choose a time",
        before: {
          live: true,
          steps: [
            {
              id: "home",
              action: "goto",
              url: "https://thebucksheaddundrum.co.uk/",
              settleMs: 5000,
              screen: true,
              strip: true,
              note: "The first screen carries the logo, a burger and a cart. No hours, no phone number and no way to book.",
            },
            { id: "home-hold", action: "hold", seconds: 2.6 },
            {
              id: "measure-home",
              action: "measure",
              targets: { book: "text=Book A Table" },
              note: "Where the first booking control sits on the homepage.",
            },
            {
              id: "open-nav",
              action: "tap",
              target: ".elementor-menu-toggle",
              seconds: 1.9,
              screen: true,
              strip: true,
              note: "Tap one: open the menu, because nothing on the first screen books a table.",
            },
            {
              id: "to-bookings",
              action: "tap",
              target: "text=BOOKINGS",
              seconds: 3.4,
              navigation: true,
              screen: true,
              strip: true,
              note: "Tap two: Bookings. The page opens on Important Booking Notes, not on the booking form.",
            },
            { id: "policy-hold", action: "hold", seconds: 3 },
            {
              id: "measure-widget",
              action: "measure",
              targets: { widget: "#rd-widget-frame" },
              note: "How far down the page the booking widget begins.",
            },
            {
              id: "hunt-widget",
              action: "scroll",
              to: 0.42,
              unit: "page",
              durationMs: 1100,
              seconds: 2.6,
              screen: true,
              strip: true,
              note: "Scroll past the party-size limit, the multiple-tables cancellation warning and the area-preference caveat to reach the widget.",
            },
            {
              id: "widget",
              action: "hold",
              seconds: 3.2,
              note: "The engine opens on today's date and the first free slot — nothing the guest was after is carried in.",
            },
          ],
        },
        after: {
          live: false,
          steps: [
            {
              id: "home",
              action: "goto",
              url: "/concepts/bucks-head/",
              settleMs: 1500,
              screen: true,
              strip: true,
              note: "The first screen names the pub, the hours and the phone number, and puts the booking card in reach.",
            },
            { id: "home-hold", action: "hold", seconds: 2.6 },
            {
              id: "measure-home",
              action: "measure",
              // `book` is the like-for-like against the live site's first
              // booking control; `card` is where date and party are entered.
              targets: { book: ".bh-book", card: ".bh-booking" },
              note: "Where the booking controls sit on the concept homepage.",
            },
            {
              id: "reach-card",
              action: "scroll",
              to: 0.28,
              unit: "page",
              durationMs: 900,
              seconds: 1.4,
              note: "One short swipe brings the whole booking card into the thumb's reach.",
            },
            { id: "date", action: "fill", target: ".bh-booking input[type=date]", value: "2026-07-25", seconds: 1.2 },
            {
              id: "party",
              action: "fill",
              target: ".bh-booking select[name=partySize]",
              value: "2",
              seconds: 1.4,
              note: "Date and party chosen on the page the visitor already has open — the two things ResDiary actually accepts.",
            },
            {
              id: "check",
              action: "tap",
              target: ".bh-booking button",
              seconds: 4.4,
              navigation: true,
              screen: true,
              strip: true,
              note: "Tap one: Check availability hands the date and party straight to the pub's own ResDiary engine.",
            },
            { id: "engine-hold", action: "hold", seconds: 3 },
          ],
        },
      },
      {
        id: "menu",
        label: "Read the à la carte on a phone",
        endsAt: "The à la carte, readable",
        before: {
          live: true,
          steps: [
            {
              id: "home",
              action: "goto",
              url: "https://thebucksheaddundrum.co.uk/",
              settleMs: 5000,
              screen: true,
              note: "Again the first screen offers no route to the food.",
            },
            { id: "home-hold", action: "hold", seconds: 2.4 },
            {
              id: "open-nav",
              action: "tap",
              target: ".elementor-menu-toggle",
              seconds: 1.8,
              screen: true,
              note: "Tap one: open the menu.",
            },
            {
              id: "to-menus",
              action: "tap",
              target: "text=MENUS",
              seconds: 3.2,
              navigation: true,
              screen: true,
              note: "Tap two: Menus. Five sample menus, listed as links.",
            },
            { id: "menus-hold", action: "hold", seconds: 2.6 },
            {
              id: "open-pdf",
              action: "tap",
              target: "text=A La Carte Menu",
              seconds: 4.5,
              navigation: true,
              screen: true,
              note: "Tap three: the à la carte is a PDF download, sized for A4 and read on a 390-pixel screen.",
            },
            { id: "pdf-hold", action: "hold", seconds: 3.4 },
            {
              id: "measure-pdf",
              action: "measure",
              pdf: true,
              note: "The page size the phone is being asked to display, and how far it must shrink to fit.",
            },
          ],
        },
        after: {
          live: false,
          steps: [
            {
              id: "home",
              action: "goto",
              url: "/concepts/bucks-head/",
              settleMs: 1500,
              screen: true,
              note: "The hero's own menus link sits on the first screen. (The five-menu rail is one swipe further down; on a phone the hero link is what a visitor reaches first.)",
            },
            { id: "home-hold", action: "hold", seconds: 2.4 },
            {
              id: "to-menus",
              action: "tap",
              target: ".bh-actions .bh-link",
              seconds: 3.6,
              navigation: true,
              screen: true,
              note: "Tap one: the à la carte opens as a page, in the pub's own type, at phone size.",
            },
            { id: "read", action: "hold", seconds: 2.6 },
            {
              id: "scroll-dishes",
              action: "scroll",
              to: 0.34,
              unit: "page",
              durationMs: 1200,
              seconds: 3.4,
              note: "Dish names, descriptions and prices read at a glance — no pinching, no downloads.",
            },
          ],
        },
      },
    ],
  },
};

// Mechanical counts, derived from the step lists so the case study, the film
// and the evidence folder can never disagree.
export function countJourney(side) {
  return {
    taps: side.steps.filter((step) => step.action === "tap").length,
    screens: side.steps.filter((step) => step.screen).length,
    scrolls: side.steps.filter((step) => step.action === "scroll").length,
  };
}

// The no-real-booking rule, enforced rather than documented.
export function assertSafe(errandId, sideName, side) {
  for (const step of side.steps) {
    const where = `${errandId}/${sideName}/${step.id}`;
    if (side.live && step.action === "fill") {
      throw new Error(`${where}: typing into a live site is not allowed (no-real-booking rule)`);
    }
    const target = `${step.target ?? ""} ${step.value ?? ""}`;
    if (target.trim() && FORBIDDEN_TARGETS.test(target)) {
      throw new Error(`${where}: target "${step.target}" would enter or submit a real reservation`);
    }
  }
}

export function getJourney(slug) {
  const journey = JOURNEYS[slug];
  if (!journey) throw new Error(`no journey defined for ${slug}`);
  for (const errand of journey.errands) {
    assertSafe(errand.id, "before", errand.before);
    assertSafe(errand.id, "after", errand.after);
  }
  return journey;
}
