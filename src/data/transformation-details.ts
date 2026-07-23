export interface TransformationNote {
  title: string;
  body: string;
  change: string;
}

export interface TransformationReel {
  video: string;
  poster: string;
  alt: string;
  heading?: string;
  intro?: string;
  duration?: string;
}

export interface TransformationDetail {
  title: string;
  description: string;
  eyebrow: string;
  headline: string;
  date: string;
  comparisonIntro: string;
  conceptHref: string;
  conceptLabel: string;
  motion: Record<string, string>;
  reel?: TransformationReel;
  secondSurfacesHtml: string[];
  notesHeading: string;
  notes: TransformationNote[];
  sourceHtml: string;
}

export const transformationDetails = {
  "bucks-head": {
    "title": "The Bucks Head concept transformation — Mourne & Main",
    "description": "A respectful, source-backed before-and-after website concept for The Bucks Head in Dundrum.",
    "eyebrow": "Website transformation · Dundrum",
    "headline": "Make booking as warm as the welcome.",
    "date": "21 July 2026",
    "comparisonIntro": "Drag the handle. The left shows the public opening screen captured during research; the right shows the proposed first screen.",
    "conceptHref": "/concepts/bucks-head/",
    "conceptLabel": "View the full concept screen",
    "motion": {
      "slug": "bucks-head",
      "beforeVideo": "/videos/bucks-head-before.mp4",
      "afterVideo": "/videos/bucks-head-after.mp4",
      "beforePoster": "/images/bucks-head-before.jpg",
      "afterPoster": "/images/bucks-head-after.jpg",
      "beforeAlt": "Ten-second visit to The Bucks Head's current website — the owners' photograph, a scroll down the page and a menus hover",
      "afterAlt": "Ten-second visit to The Bucks Head concept — the Old Charm Modern Flare opening, the book-a-table card over the hearth and the menus rail"
    },
    "secondSurfacesHtml": [
      "<section class=\"second-surface\">\n    <div class=\"shell\">\n      <div class=\"second-surface-intro\">\n        <div>\n          <p class=\"second-surface-label\">Second surface · Menus</p>\n          <h2>The menus, on the page.</h2>\n        </div>\n        <p>Five menus currently live as PDF downloads — no dish is readable without opening a file. The second concept surface puts every section on the page: browsable tabs, dish names and descriptions in the pub's own design language, with a booking card within reach throughout.</p>\n      </div>\n      <div class=\"second-surface-frame\">\n        <img\n          src=\"/images/bucks-head-menus-after.jpg\"\n          alt=\"The Bucks Head menus concept screen: spruce-green tab rail across the top with À la carte selected, two-column dish listing in cream below, and a booking sidebar on the right\"\n          width=\"1265\"\n          height=\"710\"\n        />\n      </div>\n      <p class=\"second-surface-caption\">Concept only · illustrative dishes drawn from publicly available menus · not a live menu feed</p>\n      <a class=\"text-link concept-link\" href=\"/concepts/bucks-head/menus/\">Browse the menus concept <span aria-hidden=\"true\">→</span></a>\n    </div>\n  </section>"
    ],
    "notesHeading": "Three changes to turn looking into booking.",
    "notes": [
      {
        "title": "Say the welcome out loud",
        "body": "The captured first screen gives the whole frame to a photograph of the owners above Dundrum Bay — and nothing else. No headline, no opening hours, no address and no way to book a table without opening the menu.",
        "change": "The same welcome, said in the pub's own words — old charm meets modern flare, Bronagh and Alex named in the opening lines — with the hours and phone number in a strip along the top."
      },
      {
        "title": "Start booking on the first screen",
        "body": "Book A Table leads to a page that opens with Important Booking Notes — the eight-seat maximum and cancellation warnings — before the ResDiary widget appears below them.",
        "change": "A booking card on the first screen — date, time, party, area — passing straight into the same ResDiary booking system the pub already runs, with the party-size limit reduced to one calm line beneath the button."
      },
      {
        "title": "Put the menus on the page",
        "body": "Five menus — À La Carte, Bar, Dessert, Sunday and Drinks — are PDF downloads on the menus page, so no dish can be read without opening a file.",
        "change": "A menus rail across the foot of the screen, one tap from each menu, set to be read on the page rather than downloaded."
      }
    ],
    "sourceHtml": "<section class=\"source-section\">\n    <div class=\"shell source-grid\">\n      <div>\n        <p class=\"eyebrow\">Sources &amp; limits</p>\n        <h2>Clear about what is real.</h2>\n      </div>\n      <div>\n        <p>The existing-site still was captured from the public Bucks Head website on 21 July 2026, and a ten-second demo clip on 23 July 2026. The concept's identity is taken from the pub's own building — the spruce-green frontage, the blush-pink signage lettering and the antler mark — and its photography is the pub's own hearth picture, reused rather than replaced. The old charm meets modern flare line, the owners' names, the party-size policy, the menu names, hours, address and phone number all come from the pub's published pages. The booking card points at the ResDiary booking system the pub already runs — added to its site since our 20 July verification pass, and worth keeping. The layout, copy hierarchy and proposed experience are independent concept work.</p>\n        <ul>\n          <li><a href=\"https://thebucksheaddundrum.co.uk/\" rel=\"external\">The Bucks Head public website</a></li>\n          <li><a href=\"https://www.tripadvisor.ie/Restaurant_Review-g1477857-d1185069\" rel=\"external\">TripAdvisor listing used to verify current trading</a></li>\n        </ul>\n        <p>No claim is made about sales performance, customer approval or the internal decisions behind the current site.</p>\n        <a class=\"button\" href=\"/request/\">Request a free before-and-after for your business <span aria-hidden=\"true\">→</span></a>\n      </div>\n    </div>\n  </section>"
  },
  "castle-farm": {
    "title": "Castle Farm concept transformation — Mourne & Main",
    "description": "A respectful, source-backed before-and-after website concept for Castle Farm Fresh Produce in Dundrum.",
    "eyebrow": "Website transformation · Dundrum",
    "headline": "Let the produce make the first impression.",
    "date": "17 July 2026",
    "comparisonIntro": "Drag the handle. The left shows the public opening screen captured during research; the right shows the proposed first screen.",
    "conceptHref": "/concepts/castle-farm/",
    "conceptLabel": "View the full concept screen",
    "motion": {
      "slug": "castle-farm",
      "beforeVideo": "/videos/castle-farm-before.mp4",
      "afterVideo": "/videos/castle-farm-after.mp4",
      "beforePoster": "/images/castle-farm-before.jpg",
      "afterPoster": "/images/castle-farm-after.jpg",
      "beforeAlt": "Ten-second visit to Castle Farm's current website — the opening screen, a scroll through the produce boxes and a menu hover",
      "afterAlt": "Ten-second visit to the Castle Farm concept — the produce hero, one clear shop action and a scroll through the weekly promises"
    },
    "secondSurfacesHtml": [],
    "notesHeading": "Three changes to make the first visit easier.",
    "notes": [
      {
        "title": "Give the business the opening moment",
        "body": "The captured page places a newsletter request above the farm, before a visitor has had time to understand what is on offer.",
        "change": "Lead with the weekly box and move newsletter sign-up until after value has been shown."
      },
      {
        "title": "Make the next action obvious",
        "body": "Several layers compete at once, so the route into the shop is harder to see than it needs to be.",
        "change": "Offer one primary action — shop this week's produce — with quieter navigation behind it."
      },
      {
        "title": "Show why local matters",
        "body": "The existing mark is distinctive, but the opening screen does not immediately connect it to produce, provenance or delivery.",
        "change": "Pair real product imagery with three short promises: Dundrum-grown, weekly boxes and local collection."
      }
    ],
    "sourceHtml": "<section class=\"source-section\">\n    <div class=\"shell source-grid\">\n      <div>\n        <p class=\"eyebrow\">Sources &amp; limits</p>\n        <h2>Clear about what is real.</h2>\n      </div>\n      <div>\n        <p>The existing-site still and demo clip were captured from the public Castle Farm website on 23 July 2026; arrival pop-ups (a newsletter sign-up and cookie prompt) were closed first so the comparison shows the page itself. The business name, published phone number, store categories and product image came from that site. The layout, copy hierarchy and proposed experience are independent concept work.</p>\n        <ul>\n          <li><a href=\"https://www.castlefarmni.com/\" rel=\"external\">Castle Farm public website</a></li>\n          <li><a href=\"https://www.google.com/maps/place/Castle+Farm+Fresh+Produce/data=!4m7!3m6!1s0x48613d0b384805c5:0x9ac0e5068d4ff3ab!8m2!3d54.264296!4d-5.851389\" rel=\"external\">Public Google Maps listing used in discovery</a></li>\n        </ul>\n        <p>No claim is made about sales performance, customer approval or the internal decisions behind the current site.</p>\n        <a class=\"button\" href=\"/request/\">Request a free before-and-after for your business <span aria-hidden=\"true\">→</span></a>\n      </div>\n    </div>\n  </section>"
  },
  "cupla": {
    "title": "Cúpla concept transformation — Mourne & Main",
    "description": "A respectful, source-backed first-website concept for Cúpla, the bilingual café in Dundrum.",
    "eyebrow": "First website · Dundrum",
    "headline": "Open the door in both languages.",
    "date": "21 July 2026",
    "comparisonIntro": "Drag the handle. The left shows what a first-time visitor currently finds — the café's Facebook page as it loads without an account; the right shows the proposed first screen.",
    "conceptHref": "/concepts/cupla/",
    "conceptLabel": "View the full concept screen",
    "motion": {
      "slug": "cupla",
      "afterVideo": "/videos/cupla-after.mp4",
      "beforePoster": "/images/cupla-before.jpg",
      "afterPoster": "/images/cupla-after.jpg",
      "beforeAlt": "Cúpla's current public presence: its Facebook page covered by Meta's cookie consent dialog and login form, with the café's name and tagline greyed out behind them",
      "afterAlt": "Ten-second visit to the Cúpla concept — the bilingual Fáilte isteach opening, the twin-ring mark and the twinned Irish-and-English rail"
    },
    "secondSurfacesHtml": [
      "<section class=\"second-surface\">\n    <div class=\"shell\">\n      <div class=\"second-surface-intro\">\n        <div>\n          <p class=\"second-surface-label\">Second surface · Menu</p>\n          <h2>The bilingual menu.</h2>\n        </div>\n        <p>The café's offer — coffees, morning bakes and brunch bowls — written out in both languages as a card that could be printed or used at the counter, so the menu is as bilingual as the name itself.</p>\n      </div>\n      <div class=\"second-surface-frame\">\n        <img\n          src=\"/images/cupla-menu-after.jpg\"\n          alt=\"The bilingual Cúpla menu card: three columns on an oat background — Caife (Coffee), Bácús (Morning bakes), Babhlaí (Brunch bowls) — each with Irish item names in Vollkorn italic and English descriptors beside prices, anchored by a caramel specials strip at the foot\"\n          width=\"1265\"\n          height=\"710\"\n        />\n      </div>\n      <p class=\"second-surface-caption\">\n        <a class=\"text-link\" href=\"/concepts/cupla/menu/\">Open the bilingual menu card <span aria-hidden=\"true\">→</span></a>\n      </p>\n    </div>\n  </section>"
    ],
    "notesHeading": "Three changes to serve both languages.",
    "notes": [
      {
        "title": "Open the door, not a login form",
        "body": "Cúpla has no website. Its Facebook page greets a first-time visitor with Meta's cookie dialog and a login form — the café's name and its Brews, Bakes & Bowls line sit greyed out behind them.",
        "change": "A first screen that opens the door instead — Fáilte isteach — with the café's own three-word tagline doing the work of structuring the whole page."
      },
      {
        "title": "Let the name mean something",
        "body": "The café's Irish-language identity — its own name is the Irish for twins, for the twin owners who founded it in 2024 — survives online only as a fada in a Facebook page title.",
        "change": "An identity built on the pair: twin rings in the mark, and every label twinned — Irish first, English beside it — so both of the town's languages are part of the design rather than a translation bolted on."
      },
      {
        "title": "Answer the passer-by's three questions",
        "body": "What's on the counter, when it opens and where it is live only as feed posts, so someone deciding on a whim has to scroll to find out.",
        "change": "An at-the-counter card and an hours line pointing at the Instagram the café already runs — the feed keeps doing the updating, behind a page that never goes stale."
      }
    ],
    "sourceHtml": "<section class=\"source-section\">\n    <div class=\"shell source-grid\">\n      <div>\n        <p class=\"eyebrow\">Sources &amp; limits</p>\n        <h2>Clear about what is real.</h2>\n      </div>\n      <div>\n        <p>The before image was captured from the café's public Facebook page on 21 July 2026, with Meta's cookie dialog and login prompt left in place — that is what a first-time visitor without an account meets. The café's name, its Brews, Bakes &amp; Bowls tagline, the twin founders, the 2024 founding and the Main Street address come from its public pages, Companies House and the food-hygiene register; active trading was confirmed by local first-hand knowledge on 21 July 2026. The concept introduces no photography; the twin-ring mark and the Irish-language phrasing are concept work — the café's own bilingual voice would replace them. The layout, copy hierarchy and proposed experience are independent concept work.</p>\n        <ul>\n          <li><a href=\"https://www.facebook.com/p/C%C3%BApla-61565293502528/\" rel=\"external\">Cúpla public Facebook page</a></li>\n          <li><a href=\"https://find-and-update.company-information.service.gov.uk/company/NI711705\" rel=\"external\">Companies House record used to verify the business</a></li>\n          <li><a href=\"https://ratings.food.gov.uk/business/1783241/cpla-bais-newcastle\" rel=\"external\">Food hygiene listing used to verify the premises</a></li>\n        </ul>\n        <p>No claim is made about sales performance, customer approval or the owners' plans for a website.</p>\n        <a class=\"button\" href=\"/request/\">Request a free before-and-after for your business <span aria-hidden=\"true\">→</span></a>\n      </div>\n    </div>\n  </section>"
  },
  "donard-veterinary": {
    "title": "Donard Veterinary Clinic concept transformation — Mourne & Main",
    "description": "A respectful, source-backed before-and-after website concept for Donard Veterinary Clinic in Newcastle.",
    "eyebrow": "Website transformation · Newcastle",
    "headline": "Make it easy to ask for help.",
    "date": "21 July 2026",
    "comparisonIntro": "Drag the handle. The left shows the public opening screen captured during research; the right shows the proposed first screen.",
    "conceptHref": "/concepts/donard-veterinary/",
    "conceptLabel": "View the full concept screen",
    "motion": {
      "slug": "donard-veterinary",
      "beforeVideo": "/videos/donard-veterinary-before.mp4",
      "afterVideo": "/videos/donard-veterinary-after.mp4",
      "beforePoster": "/images/donard-veterinary-before.jpg",
      "afterPoster": "/images/donard-veterinary-after.jpg",
      "beforeAlt": "Ten-second visit to Donard Veterinary Clinic's current website — the pet-collage hero, a scroll down the page and a Pet Services menu hover",
      "afterAlt": "Ten-second visit to the Donard concept — the plum-and-teal badge opening, the appointment-request card and the services rail over a Mourne silhouette"
    },
    "secondSurfacesHtml": [
      "<section class=\"second-surface\">\n    <div class=\"shell\">\n      <p class=\"second-surface-label\">\n        <svg width=\"14\" height=\"14\" viewBox=\"0 0 14 14\" fill=\"none\" aria-hidden=\"true\">\n          <rect x=\"1\" y=\"4\" width=\"9\" height=\"9\" rx=\"1.5\" stroke=\"currentColor\" stroke-width=\"1.5\"/>\n          <rect x=\"4\" y=\"1\" width=\"9\" height=\"9\" rx=\"1.5\" stroke=\"currentColor\" stroke-width=\"1.5\" fill=\"var(--pale, #f5f4f2)\"/>\n        </svg>\n        Second surface · Appointments\n      </p>\n      <div class=\"second-surface-intro\">\n        <div>\n          <h2>Where the booking actually happens.</h2>\n          <p>The first screen surfaces the appointment form — but a dedicated page lets the practice separate everyday requests from out-of-hours emergencies, and gives both a clear action without competing for space.</p>\n        </div>\n        <a class=\"text-link\" href=\"/concepts/donard-veterinary/appointments/\">View the appointments screen <span aria-hidden=\"true\">→</span></a>\n      </div>\n      <div class=\"second-surface-frame\">\n        <img\n          src=\"/images/donard-veterinary-appointments-after.jpg\"\n          alt=\"Donard Veterinary appointments concept: the clinic header above two columns — an appointment request form on the left and an out-of-hours emergency card in clinic plum on the right\"\n          width=\"1265\"\n          height=\"710\"\n          loading=\"lazy\"\n        />\n      </div>\n      <p class=\"second-surface-caption\">The appointments screen separates routine booking (form, phone, email) from emergency guidance (out-of-hours call action, clinic hours, VidiVet link) — each with its own hierarchy and no overlap.</p>\n    </div>\n  </section>"
    ],
    "notesHeading": "Three changes to make asking effortless.",
    "notes": [
      {
        "title": "Let the badge set the tone",
        "body": "The captured screen greets visitors with a wall-to-wall collage of stock puppies and kittens, and a page title that repeats the header logo's name. The one thing that is genuinely theirs — the badge with its Mourne silhouette, plum and teal — sits small in the corner.",
        "change": "The whole screen is drawn from the practice's own badge: its colours, its mountain profile as the backdrop, and its own words — Professional, Caring, Compassionate; Taking care of your pets — as the welcome."
      },
      {
        "title": "Turn booking into a real request",
        "body": "Book Appointments leads to a page that lists only the phone number and email address, while booking otherwise lives in a floating PetsApp chat bubble in the corner of the screen.",
        "change": "An appointment-request card on the first screen — name, pet, preferred day, phone — passing straight to the phone line and inbox the practice already answers, with repeat prescriptions one line away."
      },
      {
        "title": "Separate emergencies from everyday care",
        "body": "Emergency treatment is one item in a nine-entry services dropdown, and the opening hours arrive as a chat popup over the photographs.",
        "change": "Emergencies get the top strip with a call action beside the published hours, and six everyday services line the foot of the screen — visible without opening a menu."
      }
    ],
    "sourceHtml": "<section class=\"source-section\">\n    <div class=\"shell source-grid\">\n      <div>\n        <p class=\"eyebrow\">Sources &amp; limits</p>\n        <h2>Clear about what is real.</h2>\n      </div>\n      <div>\n        <p>The existing-site still and a ten-second demo clip were captured from the public Donard Veterinary Clinic website on 23 July 2026; the PetsApp chat panel auto-opens over the hero, so it was collapsed first to show the page itself (the panel's behaviour is noted in the design changes below). The practice's name and badge identity, the Professional Caring Compassionate line, the Taking Care of Your Pets wording, the address, phone number, email, opening hours, service list and VidiVet partnership all come from that site. The concept introduces no photography: its identity is drawn from the practice's own logo rather than replacing their stock imagery with ours. The layout, copy hierarchy and proposed experience are independent concept work.</p>\n        <ul>\n          <li><a href=\"https://donardveterinaryclinic.co.uk/\" rel=\"external\">Donard Veterinary Clinic public website</a></li>\n          <li><a href=\"https://vetni.co.uk/2026/07/08/pt-ft-experienced-sa-vet-donard-vet-clinic-newcastle/\" rel=\"external\">July 2026 recruitment listing used to verify current trading</a></li>\n        </ul>\n        <p>No claim is made about sales performance, customer approval or the internal decisions behind the current site.</p>\n        <a class=\"button\" href=\"/request/\">Request a free before-and-after for your business <span aria-hidden=\"true\">→</span></a>\n      </div>\n    </div>\n  </section>"
  },
  "hotel-enniskeen": {
    "title": "Hotel Enniskeen concept transformation — Mourne & Main",
    "description": "A respectful, source-backed before-and-after website concept for Enniskeen Country House Hotel in Newcastle.",
    "eyebrow": "Website transformation · Newcastle",
    "headline": "Let the valley make the welcome.",
    "date": "20 July 2026",
    "comparisonIntro": "Drag the handle. The left shows the public opening screen captured during research; the right shows the proposed first screen.",
    "conceptHref": "/concepts/hotel-enniskeen/",
    "conceptLabel": "View the full concept screen",
    "motion": {
      "slug": "hotel-enniskeen",
      "beforeVideo": "/videos/hotel-enniskeen-before.mp4",
      "afterVideo": "/videos/hotel-enniskeen-after.mp4",
      "beforePoster": "/images/hotel-enniskeen-before.jpg",
      "afterPoster": "/images/hotel-enniskeen-after.jpg",
      "beforeAlt": "Ten-second visit to Enniskeen's current website — the archive-logo header, the rotating photo carousel and a menu-bar hover",
      "afterAlt": "Ten-second visit to the Enniskeen concept — the balcony-valley opening, the availability bar and the mountainside hideaway headline"
    },
    "reel": {
      "video": "/videos/hotel-enniskeen-reel.mp4",
      "poster": "/images/hotel-enniskeen-reel-poster.jpg",
      "alt": "Captioned flagship film comparing a visit to Enniskeen Country House Hotel's current website with the complete five-page concept and both routes into the hotel's online booking system",
      "heading": "From first visit to checking dates.",
      "intro": "The complete story in one short, silent film: the current room-finding and booking route, then Home, Stay, Dine and the estate in the linked concept. The hotel’s own photographs and booking system remain throughout.",
      "duration": "About one minute"
    },
    "secondSurfacesHtml": [
      "<section class=\"second-surface\">\n    <div class=\"shell\">\n      <p class=\"second-surface-label\">Second surface · Rooms &amp; suites</p>\n      <div class=\"second-surface-intro\">\n        <h2>A room detail that earns the booking.</h2>\n        <p>The hotel has no interior page for rooms — the current site links straight from a photo carousel to the booking system with no copy, no amenities, no sense of what the stay is like. This concept page shows what a guest would want to read before they commit.</p>\n      </div>\n      <div class=\"second-surface-frame\">\n        <img\n          src=\"/images/hotel-enniskeen-rooms-after.jpg\"\n          alt=\"The Enniskeen rooms concept page showing the balcony room hero, room type cards and an availability bar\"\n        />\n      </div>\n      <p class=\"second-surface-caption\">Rooms concept — balcony stay story with availability, matching the opening screen’s valley identity.</p>\n      <a class=\"text-link concept-link\" href=\"/concepts/hotel-enniskeen/rooms/\">View the rooms concept <span aria-hidden=\"true\">→</span></a>\n    </div>\n  </section>"
    ],
    "notesHeading": "Three changes to make the stay feel closer.",
    "notes": [
      {
        "title": "Open with the valley, not the archive",
        "body": "The captured page leads with an oval archive photograph, a blue serif title and seven uppercase menu items — while the hotel's own phrase, a mountainside hideaway, appears nowhere on the first screen.",
        "change": "One composed scene — the valley framed from a balcony room, the hideaway line as the headline, and four quiet navigation items."
      },
      {
        "title": "Make checking dates effortless",
        "body": "Book Now is one menu item among seven, and checking availability means leaving for the booking system with no dates in hand.",
        "change": "A persistent availability bar — arrive, nights, guests — that passes straight into the hotel's own online booking system."
      },
      {
        "title": "Let the estate do the selling",
        "body": "Twelve wooded acres, the river trail, Mourne Honey afternoon tea and the Brandy Pad Lounge are real, published draws — but they all live behind dropdown menus.",
        "change": "The opening copy carries the estate's story in one breath, with afternoon tea one step away."
      }
    ],
    "sourceHtml": "<section class=\"source-section\">\n    <div class=\"shell source-grid\">\n      <div>\n        <p class=\"eyebrow\">Sources &amp; limits</p>\n        <h2>Clear about what is real.</h2>\n      </div>\n      <div>\n        <p>The existing-site still and a ten-second demo clip were captured from the public Enniskeen website on 23 July 2026; the arrival cookie prompt was closed first so the comparison shows the page itself. The hotel's name, the mountainside hideaway and Shimna Valley wording, the estate details, the phone number, the photographs and the online booking system all come from that site. The layout, copy hierarchy and proposed experience are independent concept work.</p>\n        <ul>\n          <li><a href=\"https://www.enniskeenhotel.co.uk/\" rel=\"external\">Enniskeen public website</a></li>\n          <li><a href=\"https://www.tripadvisor.co.uk/Hotel_Review-g186478-d1462012\" rel=\"external\">TripAdvisor listing used to verify current trading</a></li>\n        </ul>\n        <p>No claim is made about sales performance, customer approval or the internal decisions behind the current site.</p>\n        <a class=\"button\" href=\"/request/\">Request a free before-and-after for your business <span aria-hidden=\"true\">→</span></a>\n      </div>\n    </div>\n  </section>"
  },
  "kent-amusements": {
    "title": "Kent Amusements concept transformation — Mourne & Main",
    "description": "A respectful, source-backed first-website concept for Kent Amusements, the seaside arcade on Newcastle's Central Promenade.",
    "eyebrow": "First website · Newcastle",
    "headline": "A first page for the promenade arcade.",
    "date": "22 July 2026",
    "comparisonIntro": "Drag the handle. The left shows what a first-time visitor currently finds — the arcade's Facebook page as it loads without an account; the right shows the proposed first screen.",
    "conceptHref": "/concepts/kent-amusements/",
    "conceptLabel": "View the full concept screen",
    "motion": {
      "slug": "kent-amusements",
      "afterVideo": "/videos/kent-amusements-after.mp4",
      "beforePoster": "/images/kent-amusements-before.jpg",
      "afterPoster": "/images/kent-amusements-after.jpg",
      "beforeAlt": "Kent Amusements' current public presence: its Facebook page covered by Meta's cookie consent dialog and login form, with the arcade's introduction greyed out behind them",
      "afterAlt": "Ten-second visit to the Kent Amusements concept — the Fifty summers on the Central Promenade opening, the promenade marquee and the attractions rail"
    },
    "secondSurfacesHtml": [
      "<section class=\"second-surface\">\n    <div class=\"shell\">\n      <p class=\"second-surface-label\">Second surface · Attractions</p>\n      <div class=\"second-surface-intro\">\n        <div>\n          <h2>Attractions, seasonal hours and family offers.</h2>\n          <p>A day's plan for families arriving at the Central Promenade — the three things to know before you go in: what is inside, when it opens and any offers running that season.</p>\n        </div>\n        <a class=\"text-link\" href=\"/concepts/kent-amusements/attractions/\">View the attractions screen <span aria-hidden=\"true\">→</span></a>\n      </div>\n      <div class=\"second-surface-frame\">\n        <img\n          src=\"/images/kent-amusements-attractions-after.jpg\"\n          alt=\"Kent Amusements attractions concept showing three attraction cards — dodgems, VR games and arcade — on the left, with a seasonal hours board and family offers panel on the right\"\n          width=\"1265\"\n          height=\"710\"\n        />\n      </div>\n      <p class=\"second-surface-caption\">A companion to the opening screen: attractions named, seasonal hours placed and a standing slot for family offers when the arcade posts them.</p>\n    </div>\n  </section>"
    ],
    "notesHeading": "Three changes to put the promenade out front.",
    "notes": [
      {
        "title": "Take the promenade out from behind the login",
        "body": "Kent Amusements has no website. Searching for it lands on a Facebook page that greets a first-time visitor with Meta's cookie dialog and a login form — the arcade on Newcastle's Central Promenade sits greyed out behind them.",
        "change": "A first screen with nothing in front of it, opening on the one place fact that matters: fifty summers of family fun on the Central Promenade."
      },
      {
        "title": "Name what is inside before someone has to ask",
        "body": "Dodgems, the arcade floor and the new VR games live only as fragments across feed posts and third-party write-ups, so a family planning a day out has to scroll to learn what is actually there.",
        "change": "The attractions named once along the foot of the screen — dodgems, VR, arcade — with the phone number the business already publishes one tap away."
      },
      {
        "title": "Give seasonal hours a standing place — and room for offers when they run",
        "body": "Opening times are seasonal and live on social, so a first-time visitor has to already follow the page to find them. No current family-offer details were verified for this concept.",
        "change": "A standing ticket for today's hours, with a clearly labelled proposed slot for seasonal family offers whenever the arcade posts them — both pointing at the Facebook page it already updates."
      }
    ],
    "sourceHtml": "<section class=\"source-section\">\n    <div class=\"shell source-grid\">\n      <div>\n        <p class=\"eyebrow\">Sources &amp; limits</p>\n        <h2>Clear about what is real.</h2>\n      </div>\n      <div>\n        <p>The before image was captured from the arcade's public Facebook page on 22 July 2026, with Meta's cookie dialog and login prompt left in place — that is what a first-time visitor without an account meets. The Central Promenade address is confirmed by Companies House (NI688147). A March 2026 TripAdvisor review mentions new VR games. Indoor dodgems are named on a local hotel activities listing for the Newcastle site. Longevity on the promenade is supported by a BBC Your Place and Mine recollection of working at Kent Amusements in the late sixties — the concept's “fifty summers” line is phrasing of that long tenure, not a dated founding claim. The published phone number appears in local directories. No current family-offer details were verified; the offers line on the concept is a proposed update slot only. The concept introduces no photography; the marquee illustration and ticket mark are concept work, not the business's own artwork. Content is limited to the Newcastle, Co. Down site and does not refer to any same-named arcade elsewhere. The layout, copy hierarchy and proposed experience are independent concept work.</p>\n        <ul>\n          <li><a href=\"https://www.facebook.com/kentamusementsnewcastle/\" rel=\"external\">Kent Amusements public Facebook page</a></li>\n          <li><a href=\"https://www.instagram.com/kentamusementsnewcastle/\" rel=\"external\">Kent Amusements Instagram</a></li>\n          <li><a href=\"https://www.tripadvisor.com/Attraction_Review-g186478-d14073725\" rel=\"external\">TripAdvisor listing used to verify current trading and VR</a></li>\n          <li><a href=\"https://find-and-update.company-information.service.gov.uk/company/NI688147\" rel=\"external\">Companies House record used to verify the business and address</a></li>\n          <li><a href=\"https://avocahotel.com/activities/uncategorized/kent-amusements/\" rel=\"external\">Avoca Hotel activities listing used for indoor dodgems and phone</a></li>\n          <li><a href=\"https://www.bbc.co.uk/northernireland/yourplaceandmine/down/A781698.shtml\" rel=\"external\">BBC Your Place and Mine recollection used for late-sixties promenade tenure</a></li>\n        </ul>\n        <p>No claim is made about sales performance, customer approval, current family offers or the owner's plans for a website.</p>\n        <a class=\"button\" href=\"/request/\">Request a free before-and-after for your business <span aria-hidden=\"true\">→</span></a>\n      </div>\n    </div>\n  </section>"
  },
  "mourne-cycles": {
    "title": "Mourne Cycles concept transformation — Mourne & Main",
    "description": "A respectful, source-backed before-and-after website concept for Mourne Cycles, the Trek dealer in Newcastle.",
    "eyebrow": "Website transformation · Newcastle",
    "headline": "Put the shop's name over the door.",
    "date": "21 July 2026",
    "comparisonIntro": "Drag the handle. The left shows the public opening screen captured during research; the right shows the proposed first screen.",
    "conceptHref": "/concepts/mourne-cycles/",
    "conceptLabel": "View the full concept screen",
    "motion": {
      "slug": "mourne-cycles",
      "beforeVideo": "/videos/mourne-cycles-before.mp4",
      "afterVideo": "/videos/mourne-cycles-after.mp4",
      "beforePoster": "/images/mourne-cycles-before.jpg",
      "afterPoster": "/images/mourne-cycles-after.jpg",
      "beforeAlt": "Ten-second visit to Mourne Cycles' current website — the logo collage of brand marks and cut-out bikes, a scroll through the page and a showroom hover",
      "afterAlt": "Ten-second visit to the Mourne Cycles concept — the shop's black-and-red Ride With Us opening, the Trek trail hero and the numbered range rail"
    },
    "secondSurfacesHtml": [
      "<section class=\"second-surface\">\n    <div class=\"shell\">\n      <div class=\"second-surface-intro\">\n        <div>\n          <p class=\"second-surface-label\">Second surface · Hire &amp; service</p>\n          <h2>Where the booking happens.</h2>\n        </div>\n        <p>\n          The same identity — shop name over the door, coal and red, Trek imagery the shop already publishes — carries into the hire and service page.\n          Three panels in one view: bike hire with day rates, a workshop booking path, and the Cyclescheme salary-sacrifice funnel.\n          <a class=\"text-link\" href=\"/concepts/mourne-cycles/hire/\">Open the live concept <span aria-hidden=\"true\">→</span></a>\n        </p>\n      </div>\n      <div class=\"second-surface-frame\">\n        <img\n          src=\"/images/mourne-cycles-hire-after.jpg\"\n          alt=\"The Mourne Cycles hire and service concept page: three panels showing bike hire day rates, a workshop booking prompt, and a Cyclescheme 42% saving dial\"\n        />\n      </div>\n      <p class=\"second-surface-caption\">\n        Hire &amp; service — <a href=\"/concepts/mourne-cycles/hire/\">mourne-cycles/hire/</a> · capture at 1265 × 710\n      </p>\n    </div>\n  </section>"
    ],
    "notesHeading": "Three changes to put the shop first.",
    "notes": [
      {
        "title": "Lead with the shop, not the suppliers",
        "body": "The captured screen belongs to the brands: the Trek shield and a full-width TREK BICYCLE STORE wordmark, tilted Bontrager and Shimano logos, torn-edge bike cut-outs — while the shop's own name sits only in the small header logo.",
        "change": "The shop's own mountain mark and its own words — Ride with us, established 2002, one of Northern Ireland's premier local bike shops — take the opening screen; Trek and the component brands become one confident line in the story."
      },
      {
        "title": "Give the workshop a way to book",
        "body": "The header phone number is the first screen's only action. Workshop is a menu item, but there is no path to actually book a repair or service.",
        "change": "A persistent red Book a service action in the header and a workshop-slot link in the hero — both pointed at the phone line and email address the shop already runs."
      },
      {
        "title": "Show the range and the saving",
        "body": "The five-category range on the showroom pages — electric, road, mountain, hybrid, kids — and the shop's two Cycle to Work partnerships are real, but nothing on the opening screen shows what you can buy or how to save.",
        "change": "A range rail across the foot of the screen, the five categories numbered like a parts catalogue, with Cycle to Work as the red cell that starts the salary-saving."
      }
    ],
    "sourceHtml": "<section class=\"source-section\">\n    <div class=\"shell source-grid\">\n      <div>\n        <p class=\"eyebrow\">Sources &amp; limits</p>\n        <h2>Clear about what is real.</h2>\n      </div>\n      <div>\n        <p>The existing-site still was captured from the public Mourne Cycles website on 21 July 2026, and a ten-second demo clip on 23 July 2026. The shop's name and logo identity, the Ride with us tagline, the established-2002 wording, the address, phone number and email, the brand list, the bike categories and the Cycle to Work partnerships all come from that site. The photographs are the Trek dealer imagery the shop already publishes on its own pages, reused rather than replaced. The layout, copy hierarchy and proposed experience are independent concept work.</p>\n        <ul>\n          <li><a href=\"https://www.mourne-cycles.co.uk/\" rel=\"external\">Mourne Cycles public website</a></li>\n          <li><a href=\"https://find-and-update.company-information.service.gov.uk/company/NI064124\" rel=\"external\">Companies House record used to verify current trading</a></li>\n        </ul>\n        <p>No claim is made about sales performance, customer approval or the internal decisions behind the current site.</p>\n        <a class=\"button\" href=\"/request/\">Request a free before-and-after for your business <span aria-hidden=\"true\">→</span></a>\n      </div>\n    </div>\n  </section>"
  },
  "newcastle-chamber": {
    "title": "Newcastle Chamber of Commerce concept transformation — Mourne & Main",
    "description": "A respectful, source-backed first-website concept for Newcastle Chamber of Commerce: a Main Street finder with civic chrome and a full linked site.",
    "eyebrow": "First website · Newcastle · full site",
    "headline": "A Main Street finder for the town's chamber.",
    "date": "22 July 2026",
    "comparisonIntro": "Drag the handle. The left shows what a first-time visitor currently finds — the Chamber's Facebook page as it loads without an account; the right shows the proposed finder opening.",
    "conceptHref": "/concepts/newcastle-chamber/",
    "conceptLabel": "View the full concept site",
    "motion": {
      "slug": "newcastle-chamber",
      "afterVideo": "/videos/newcastle-chamber-after.mp4",
      "beforePoster": "/images/newcastle-chamber-before.jpg",
      "afterPoster": "/images/newcastle-chamber-after.jpg",
      "beforeAlt": "Newcastle Chamber of Commerce's current public presence: its Facebook page covered by a login form, with the Chamber's introduction greyed out behind the wall",
      "afterAlt": "Ten-second visit to the Newcastle Chamber concept — the town's businesses under one roof opening, the events card and the members-events-join rail"
    },
    "secondSurfacesHtml": [
      "<section class=\"second-surface\">\n    <div class=\"shell\">\n      <div class=\"second-surface-intro\">\n        <div>\n          <p class=\"second-surface-label\">Second surface · Members</p>\n          <h2>A member directory for Main Street.</h2>\n        </div>\n        <p>Once a visitor lands, the next question is which businesses are in the Chamber — and how to join. The directory answers both without new infrastructure: members listed by trade, a path to the existing Gmail inbox.</p>\n      </div>\n      <div class=\"second-surface-frame\">\n        <img\n          src=\"/images/newcastle-chamber-members-after.jpg\"\n          alt=\"Newcastle Chamber member directory concept: harbour-navy header with the chamber seal, a grid of business cards organised by trade category, and a Join the Chamber banner at the foot\"\n          width=\"1265\"\n          height=\"710\"\n          loading=\"lazy\"\n        />\n      </div>\n      <p class=\"second-surface-caption\">Member cards use illustrative names that reflect the kinds of trade on Main Street, Newcastle, Co. Down. Actual listing managed by the Chamber committee.</p>\n      <a class=\"text-link concept-link\" href=\"/concepts/newcastle-chamber/members/\">View the members concept screen <span aria-hidden=\"true\">→</span></a>\n    </div>\n  </section>",
      "<section class=\"second-surface\" style=\"padding-top: 0\">\n    <div class=\"shell\">\n      <div class=\"second-surface-intro\">\n        <div>\n          <p class=\"second-surface-label\">Full site · every page linked</p>\n          <h2>Chosen direction after exploration.</h2>\n        </div>\n        <p>\n          Research and three internal prototypes led to this hybrid: Main Street Finder IA, civic Co. Down chrome, and a warmer neighbour join voice.\n          Mailto join matches volunteer capacity.\n        </p>\n      </div>\n      <ul class=\"chamber-site-map\"><li><a href=\"/concepts/newcastle-chamber/\"><strong>Home</strong><span>Finder opening</span></a></li><li><a href=\"/concepts/newcastle-chamber/members/\"><strong>Members</strong><span>Directory by trade</span></a></li><li><a href=\"/concepts/newcastle-chamber/events/\"><strong>Events</strong><span>Town calendar</span></a></li><li><a href=\"/concepts/newcastle-chamber/join/\"><strong>Join</strong><span>Neighbour voice + mailto</span></a></li><li><a href=\"/concepts/newcastle-chamber/about/\"><strong>About</strong><span>Volunteer hub</span></a></li><li><a href=\"/concepts/newcastle-chamber/contact/\"><strong>Contact</strong><span>Inbox & Main Street</span></a></li></ul>\n    </div>\n  </section>"
    ],
    "notesHeading": "Three changes to make the Chamber findable.",
    "notes": [
      {
        "title": "Put Co. Down on the front door",
        "body": "The Chamber has no website. Searching its name lands among at least eight same-named chambers worldwide, and its own public Facebook presence is hard for a first-time visitor to use as a standing front door.",
        "change": "A finder opening that leads with Newcastle, Co. Down and Main Street under the Mournes — place first, then the directory, events and join path."
      },
      {
        "title": "Make the directory the product",
        "body": "Member news and how to join live only as feed posts and a Gmail address, so someone looking for a trader on Main Street has to already know where to look.",
        "change": "A Main Street finder first screen: search into a category directory, a trade rail, and a join path that sells visibility — the practical benefit a volunteer chamber can deliver."
      },
      {
        "title": "Keep the town calendar where visitors can find it",
        "body": "Halloween in Newcastle on 31 October 2026 is listed on the council tourism site as planned primarily by the Chamber, but a passer-by who starts on social still has to dig for the next date.",
        "change": "A standing events card on the opening screen, with a full calendar page behind it — updates still pointing at the Facebook and Instagram the Chamber already runs."
      }
    ],
    "sourceHtml": "<section class=\"source-section\">\n    <div class=\"shell source-grid\">\n      <div>\n        <p class=\"eyebrow\">Sources &amp; limits</p>\n        <h2>Clear about what is real.</h2>\n      </div>\n      <div>\n        <p>The before image was captured from the Chamber's public Facebook page on 22 July 2026, with the login prompt left in place — that is what a first-time visitor without an account meets on this capture (no cookie dialog appeared in frame). The Co. Down naming, Main Street address, Gmail contact, phone, Instagram and LinkedIn, the 2023 relaunch and Halloween in Newcastle on 31 October 2026 come from the Chamber's public pages and the council tourism listing; Facebook's own intro line reads “Newcastle County Down Chamber of Commerce”. No officer names are stated — volunteer committee roles were unconfirmed snippet data at verification. The concept introduces no photography; the seal mark is concept work, not an official crest. Member listings and non-Halloween calendar rows are illustrative. The layout, copy hierarchy and proposed experience are independent concept work.</p>\n        <ul>\n          <li><a href=\"https://www.facebook.com/newcastlechamberofcommerce/\" rel=\"external\">Newcastle Chamber of Commerce public Facebook page</a></li>\n          <li><a href=\"https://www.instagram.com/newcastlechamber_/\" rel=\"external\">Chamber Instagram</a></li>\n          <li><a href=\"https://www.visitmournegullionstrangford.com/explore/cities-towns-and-villages/newcastle/whats-on-in-newcastle\" rel=\"external\">Council tourism listing used for Halloween 2026</a></li>\n          <li><a href=\"https://uk.linkedin.com/company/newcastle-chamber\" rel=\"external\">LinkedIn company page used to verify the organisation</a></li>\n        </ul>\n        <p>No claim is made about membership numbers, committee decisions or the Chamber's plans for a website.</p>\n        <a class=\"button\" href=\"/request/\">Request a free before-and-after for your business <span aria-hidden=\"true\">→</span></a>\n      </div>\n    </div>\n  </section>"
  },
  "scopers": {
    "title": "Scopers concept transformation — Mourne & Main",
    "description": "A respectful, source-backed first-website concept for Scopers, the zero-waste hot food bar in Dundrum.",
    "eyebrow": "First website · Dundrum",
    "headline": "A first page for a Northern Ireland first.",
    "date": "21 July 2026",
    "comparisonIntro": "Drag the handle. The left shows what a first-time visitor currently finds — the bar's Facebook page as it loads without an account; the right shows the proposed first screen.",
    "conceptHref": "/concepts/scopers/",
    "conceptLabel": "View the full concept screen",
    "motion": {
      "slug": "scopers",
      "afterVideo": "/videos/scopers-after.mp4",
      "beforePoster": "/images/scopers-before.jpg",
      "afterPoster": "/images/scopers-after.jpg",
      "beforeAlt": "Scopers' current public presence: its Facebook page covered by Meta's cookie consent dialog and login form, with the bar's introduction greyed out behind them",
      "afterAlt": "Ten-second visit to the Scopers concept — the zero-waste hot food bar opening, the supper-club card and the signature-dish rail"
    },
    "secondSurfacesHtml": [
      "<section class=\"second-surface\">\n    <div class=\"shell\">\n      <div class=\"second-surface-intro\">\n        <div>\n          <p class=\"second-surface-label\">Second surface · Supper club</p>\n          <p>A first website is more than one screen. The supper-club page gives the pop-up dining events a standing home — with the full event details, the eleven-course sample menu and a booking action, rather than waiting for a social post to surface.</p>\n        </div>\n        <a class=\"text-link\" href=\"/concepts/scopers/supper-club/\">View the supper-club page <span aria-hidden=\"true\">→</span></a>\n      </div>\n      <div class=\"second-surface-frame\">\n        <img\n          src=\"/images/scopers-supper-club-after.jpg\"\n          alt=\"The Scopers supper-club concept page in cast iron, buttermilk and paprika: an eleven-course August menu, event details card and booking CTA\"\n          width=\"1265\"\n          height=\"710\"\n        />\n      </div>\n      <p class=\"second-surface-caption\">Supper-club night page — date, theme, eleven-course sample menu and a direct booking action pointing to the same Instagram inbox the kitchen already answers.</p>\n    </div>\n  </section>"
    ],
    "notesHeading": "Three changes to put the chef out front.",
    "notes": [
      {
        "title": "Take the story out from behind the login",
        "body": "Scopers has no website. Searching for it lands on a Facebook page that greets a first-time visitor with Meta's cookie dialog and a login form — the bar's own introduction, Hot Food Bar by Paul Cunningham, sits greyed out behind them.",
        "change": "A first screen with nothing in front of it, opening on the one remarkable fact: Northern Ireland's first zero-waste hot food bar, on Dundrum's main street."
      },
      {
        "title": "Say the remarkable thing once, plainly",
        "body": "A Great British Menu chef, a zero-waste first, the Mourne Larder and a grandfather's foraging exist only as fragments scattered across feed posts and third-party write-ups.",
        "change": "The story told in three opening lines — chef, provenance, philosophy — with the signature dishes named along the foot of the screen."
      },
      {
        "title": "Give the supper club a standing invitation",
        "body": "The pop-up dinners of up to eleven courses are ticketed through social posts, so the next date exists only for people who happen to scroll past it.",
        "change": "A standing supper-club card that always holds the next date, with a booking action landing in the same Instagram inbox the kitchen already answers."
      }
    ],
    "sourceHtml": "<section class=\"source-section\">\n    <div class=\"shell source-grid\">\n      <div>\n        <p class=\"eyebrow\">Sources &amp; limits</p>\n        <h2>Clear about what is real.</h2>\n      </div>\n      <div>\n        <p>The before image was captured from the bar's public Facebook page on 21 July 2026, with Meta's cookie dialog and login prompt left in place — that is what a first-time visitor without an account meets. The zero-waste-first claim, Paul Cunningham's Great British Menu appearance, the grandfather's foraging, the Mourne Larder, the supper-club format and the signature dishes all come from the bar's public presence and dated third-party features. The concept introduces no photography, and its stamp mark is concept work suggested by the bar's own round badge, not the badge itself. Trading pattern — now open most of the week — was confirmed by local first-hand knowledge on 21 July 2026. The layout, copy hierarchy and proposed experience are independent concept work.</p>\n        <ul>\n          <li><a href=\"https://www.facebook.com/p/Scopers-Dundrum-Co-Down-100083029315116/\" rel=\"external\">Scopers public Facebook page</a></li>\n          <li><a href=\"https://goodfoodireland.ie/scopers-dundrum/\" rel=\"external\">Good Food Ireland feature used for the chef's story</a></li>\n          <li><a href=\"https://www.tripadvisor.co.uk/Restaurant_Review-g1477857-d26533474\" rel=\"external\">TripAdvisor listing used to verify current trading</a></li>\n        </ul>\n        <p>No claim is made about sales performance, customer approval or the owner's plans for a website.</p>\n        <a class=\"button\" href=\"/request/\">Request a free before-and-after for your business <span aria-hidden=\"true\">→</span></a>\n      </div>\n    </div>\n  </section>"
  },
  "tool-centre": {
    "title": "The Tool Centre concept transformation — Mourne & Main",
    "description": "A respectful, source-backed first-website concept for The Tool Centre, the hardware and plant-hire shop on Main Street, Newcastle, Co. Down.",
    "eyebrow": "First website · Newcastle, Co. Down",
    "headline": "A trade counter that does not need a login.",
    "date": "22 July 2026",
    "comparisonIntro": "Drag the handle. The left shows what a first-time visitor currently finds — the shop's Facebook page as it loads without an account; the right shows the proposed first screen.",
    "conceptHref": "/concepts/tool-centre/",
    "conceptLabel": "View the full concept screen",
    "motion": {
      "slug": "tool-centre",
      "afterVideo": "/videos/tool-centre-after.mp4",
      "beforePoster": "/images/tool-centre-before.jpg",
      "afterPoster": "/images/tool-centre-after.jpg",
      "beforeAlt": "The Tool Centre's current public presence: its Facebook page covered by Meta's cookie consent dialog and login form, with the shop's introduction greyed out behind them",
      "afterAlt": "Ten-second visit to The Tool Centre concept — the Hardware on the shelf, Hire on the yard opening, the hire-desk rates board and the stock-category rail"
    },
    "secondSurfacesHtml": [
      "<section class=\"second-surface\">\n    <div class=\"shell\">\n      <div class=\"second-surface-intro\">\n        <div>\n          <p class=\"second-surface-label\">Second surface · Hire list</p>\n          <h2>A standalone hire-rate sheet.</h2>\n          <p>The hire desk on the landing asks callers to ring for day rates. A second screen gives that list a permanent address — four categories of plant and tools, indicative prices, and one call-to-action that lands on the same counter number.</p>\n        </div>\n        <a class=\"text-link\" href=\"/concepts/tool-centre/hire-list/\">View the hire list concept <span aria-hidden=\"true\">→</span></a>\n      </div>\n      <div class=\"second-surface-frame\">\n        <img src=\"/images/tool-centre-hire-list-after.jpg\" alt=\"The Tool Centre hire list concept: a two-column price sheet in yard black and badge yellow, showing four hire categories — power tools, garden machinery, plant and site, access equipment — with indicative day rates and a call panel in the sidebar\" width=\"1265\" height=\"710\" loading=\"lazy\" />\n      </div>\n      <p class=\"second-surface-caption\">Hire price list · indicative rates in four categories · same call action as the landing</p>\n    </div>\n  </section>"
    ],
    "notesHeading": "Three changes to put the yard out front.",
    "notes": [
      {
        "title": "Put the counter in front of the login",
        "body": "The Tool Centre has no website. Searching for it lands on a Facebook page that greets a first-time visitor with Meta's cookie dialog and a login form — and search results are crowded with same-named shops in Newcastle-upon-Tyne.",
        "change": "A first screen that opens on the Co. Down address, with hire rates and stock categories reachable without an account — Newcastle, Co. Down named plainly so the Mourne shop is never mistaken for the Tyne ones."
      },
      {
        "title": "Say both names on one counter",
        "body": "Directories list the shop as The Tool Centre; its Facebook page trades as Tool Centre Plant Hire. The two service lines — hardware retail and plant/tool hire — look like two businesses online.",
        "change": "One brand lock-up that carries both: The Tool Centre with Hardware · Plant & tool hire underneath, and a short line that names the Facebook trading style so the relationship is honest rather than papered over."
      },
      {
        "title": "Make the hire desk the first action",
        "body": "Day rates, stock categories and opening hours live only as feed posts and third-party directory scraps, so a contractor deciding on a whim has to scroll or call blind.",
        "change": "A standing hire-desk board with the four hire lines and a call action landing on the number the yard already answers — the Facebook feed keeps doing the updating, behind a page that never goes stale."
      }
    ],
    "sourceHtml": "<section class=\"source-section\">\n    <div class=\"shell source-grid\">\n      <div>\n        <p class=\"eyebrow\">Sources &amp; limits</p>\n        <h2>Clear about what is real.</h2>\n      </div>\n      <div>\n        <p>The before image was captured from the shop's public Facebook page on 22 July 2026, with Meta's cookie dialog and login prompt left in place — that is what a first-time visitor without an account meets. The concept does not mock or invent content from behind that wall. The Main Street address, phone number, seven-day opening hours, Calor gas retail and the dual hardware/plant-hire offering come from public directories and the Calor dealer listing; the Facebook trading name Tool Centre Plant Hire is acknowledged in the concept copy rather than overwritten. Day-rate figures are deliberately not invented — the hire desk asks visitors to call for today's rates. The concept introduces no photography; the circular yellow-and-black mark is concept work suggested by the shop's own Facebook badge, not the badge itself. The layout, copy hierarchy and proposed experience are independent concept work.</p>\n        <ul>\n          <li><a href=\"https://www.facebook.com/Toolcentreplanthire/\" rel=\"external\">Tool Centre Plant Hire public Facebook page</a></li>\n          <li><a href=\"https://www.bigreddirectory.com/tool-centre-newcastle\" rel=\"external\">Big Red Directory listing used for address and hours</a></li>\n          <li><a href=\"https://www.calorgas.ie/cylinder-dealers/Newcastle-BT33-0AE-Tool-Centre-8001144\" rel=\"external\">Calor dealer listing used to confirm gas retail</a></li>\n        </ul>\n        <p>No claim is made about sales performance, customer approval or the owner's plans for a website.</p>\n        <a class=\"button\" href=\"/request/\">Request a free before-and-after for your business <span aria-hidden=\"true\">→</span></a>\n      </div>\n    </div>\n  </section>"
  }
} satisfies Record<string, TransformationDetail>;
