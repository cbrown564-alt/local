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
  eyebrow?: string;
  note?: string;
}

/** One errand, walked on both sides at phone size. */
export interface TransformationErrand {
  label: string;
  endsAt: string;
  before: string;
  beforeNote: string;
  after: string;
  afterNote: string;
}

/**
 * The measured journey comparison. Every figure here comes from
 * `node tools/capture/audit-journey.mjs <slug>`, which files dated screenshots and a
 * summary to .scratch/renders/<slug>-journey/<date>/ — nothing on this page is
 * estimated.
 */
export interface TransformationJourneys {
  eyebrow: string;
  heading: string;
  intro: string;
  tableCaption: string;
  errands: TransformationErrand[];
  measures: string[];
  film: TransformationReel;
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
  journeys?: TransformationJourneys;
  secondSurfacesHtml: string[];
  notesHeading: string;
  notes: TransformationNote[];
  sourceHtml: string;
}

export const transformationDetails = {
  "newcastle-dental": {
    "title": "Newcastle Family Dental Care concept transformation — Mourne Made",
    "description": "A respectful, source-backed before-and-after website concept for Newcastle Family Dental Care in Newcastle, Co. Down.",
    "eyebrow": "Website transformation · Newcastle, Co. Down",
    "headline": "The practice's own door, served securely.",
    "date": "24 July 2026",
        "comparisonIntro": "Drag the handle. Left: what patients find today when they follow the practice online — the Maguire Newcastle location page under the practice's name. Right: a calmer first screen of their own.",
    "conceptHref": "/concepts/newcastle-dental/",
    "conceptLabel": "See the full website idea",
    "motion": {
      "slug": "newcastle-dental",
      "beforeVideo": "/media/concepts/newcastle-dental/newcastle-dental-before.mp4",
      "afterVideo": "/media/concepts/newcastle-dental/newcastle-dental-after.mp4",
      "beforePoster": "/media/concepts/newcastle-dental/newcastle-dental-before.jpg",
      "afterPoster": "/media/concepts/newcastle-dental/newcastle-dental-after.jpg",
      "beforeAlt": "Ten-second view of what patients find today — the Maguire Newcastle location page under the Newcastle Family Dental Care name",
      "afterAlt": "Ten-second visit to the website idea — We love to make you smile! over a padlocked secure address bar, the three named dentists, the practice band, what happens when you ring, and a private appointment request"
    },
    "secondSurfacesHtml": [],
    "notesHeading": "Three changes that make their front door feel like theirs.",
    "notes": [
      {
        "title": "Make their own address feel like their practice",
        "body": "Patients who follow Newcastle Family Dental Care online already land on a page under that name — today it is the Maguire group's Newcastle location page. It works as a listing; it does not feel like the practice's own front door.",
        "change": "A calmer first screen at an address they control: their sentence, their hours, and a secure connection that completes."
      },
      {
        "title": "Ask for a visit without handing details to a form farm",
        "body": "People ready to book should not have to wonder where their details go.",
        "change": "A private appointment request that opens as a draft in the patient's own email app. The practice rings back to confirm a time — nothing is posted off-site from the page."
      },
      {
        "title": "See the people and the plan before you call",
        "body": "A family practice is people, hours and a clear next step — not only a group booking link.",
        "change": "Three named dentists, the award the practice is proud of, weekday hours, and a plain answer to what happens when you ring — including if it is urgent — on one calm page."
      }
    ],
    "sourceHtml": "<section class=\"source-section\">\n    <div class=\"shell source-grid\">\n      <div>\n        <p class=\"eyebrow\">Sources &amp; limits</p>\n        <h2>Clear about what is real.</h2>\n      </div>\n      <div>\n        <p>Patients already find the practice online under its own name. In July 2026 that meant the published practice address sent visitors to the DJ Maguire Dentists Newcastle location page — that page is the before. HTTPS on the practice's own host did not complete.</p>\n        <p>Dentists' names and credentials, Railway Street address, weekday hours, phone and email come from that branded location page. The smile line and practice sentences are quoted from their 2018 archived homepage; the two layers are not blended. The calm-room plate is a disclosed AI-generated illustration, not a photograph or record of the practice's actual interior.</p>\n        <p>This was not commissioned or approved by Newcastle Family Dental Care. It is a free before-and-after website idea — a clearer front door for a practice that already has a web presence.</p>\n        <ul>\n          <li><a href=\"https://djmaguiredentists.co.uk/location-newcastle.html\" rel=\"external\">DJ Maguire Dentists — Newcastle location</a></li>\n        </ul>\n        <a class=\"button\" href=\"/request/\">Request a free before-and-after for your business <span aria-hidden=\"true\">→</span></a>\n      </div>\n    </div>\n  </section>"
  },
  "hugh-mccanns": {
    "title": "Hugh McCann's concept transformation — Mourne Made",
    "description": "A respectful, source-backed before-and-after website concept for Hugh McCann's wedding venue in Newcastle, Co. Down.",
    "eyebrow": "Website transformation · Newcastle, Co. Down",
    "headline": "Let couples check the date.",
    "date": "24 July 2026",
    "comparisonIntro": "Drag the handle. Left: what couples find today. Right: a calmer first screen with a date enquiry beside their dining-room view.",
    "conceptHref": "/concepts/hugh-mccanns/",
    "conceptLabel": "See the full website idea",
    "motion": {
      "slug": "hugh-mccanns",
      "beforeVideo": "/media/concepts/hugh-mccanns/hugh-mccanns-before.mp4",
      "afterVideo": "/media/concepts/hugh-mccanns/hugh-mccanns-after.mp4",
      "beforePoster": "/media/concepts/hugh-mccanns/hugh-mccanns-before.jpg",
      "afterPoster": "/media/concepts/hugh-mccanns/hugh-mccanns-after.jpg",
      "beforeAlt": "Ten-second visit to Hugh McCann's current website — the well-photographed Boutique Wedding Venue & Gardens homepage, with no enquiry form or date capture anywhere",
      "afterAlt": "Ten-second visit to the concept — Hugh McCann's dining-room view towards the Mournes behind the From Today Until Your Day, We Do opening, beside an Is our day free enquiry with a date field and guest-count slider, then the named suites, garden and guest houses and the day in sequence"
    },
    "secondSurfacesHtml": [],
    "notesHeading": "Three changes to capture the enquiry.",
    "notes": [
      {
        "title": "Let couples ask about a date online",
        "body": "The site is well written and looked after, but there is no form and no way to leave a preferred date. Every wedding enquiry starts as a phone call.",
        "change": "An Is our day free enquiry that captures the two facts every venue conversation starts with — the date and the guest count — then opens a draft in their email."
      },
      {
        "title": "Keep their voice, name every room",
        "body": "From today until your day, we do, and three generations in a two-hundred-year-old building — the copy and photography are genuinely good and should stay.",
        "change": "Their sentence leads the page. The Loft Suite, Coast Suite, Secret Garden, Little Haven and the Avoca sit with published capacities, each linking to the same date enquiry."
      },
      {
        "title": "Show the day from first viewing to Day 2",
        "body": "Couples need to see how the house, garden and guest houses fit together before they ring.",
        "change": "The day runs in the venue's own order — viewing, planning, ceremony, meal, reception, evening, night and Day 2 — and every step arrives at the date enquiry."
      }
    ],
    "sourceHtml": "<section class=\"source-section\">\n    <div class=\"shell source-grid\">\n      <div>\n        <p class=\"eyebrow\">Sources &amp; limits</p>\n        <h2>Clear about what is real.</h2>\n      </div>\n      <div>\n        <p>Captured from the public Hugh McCann's website on 24 July 2026. Address, phone, email and the venue's own wording come from that site.</p>\n        <p>Dining-room imagery is a disclosed AI visualisation based on their published room photograph. Suite names, capacities and the quoted guest review come from their home, weddings and accommodation pages (re-read 4 August 2026). No availability is claimed — the venue publishes none.</p>\n        <p>This was not commissioned or approved by Hugh McCann's. It is a free website idea: a clearer way for couples to start a date conversation.</p>\n        <ul>\n          <li><a href=\"https://www.hughmccanns.com/\" rel=\"external\">Hugh McCann's public website</a></li>\n          <li><a href=\"https://www.hughmccanns.com/weddings/\" rel=\"external\">Weddings page</a></li>\n          <li><a href=\"https://www.hughmccanns.com/accommodation/\" rel=\"external\">Accommodation page</a></li>\n        </ul>\n        <a class=\"button\" href=\"/request/\">Request a free before-and-after for your business <span aria-hidden=\"true\">→</span></a>\n      </div>\n    </div>\n  </section>"
  },
  "donard-veterinary": {
    "title": "Donard Veterinary Clinic concept transformation — Mourne Made",
    "description": "A respectful, source-backed before-and-after website concept for Donard Veterinary Clinic in Newcastle.",
    "eyebrow": "Website transformation · Newcastle",
    "headline": "Make it easy to ask for help.",
    "date": "21 July 2026",
    "comparisonIntro": "Drag the handle. Left: what pet owners find today. Right: a calmer first screen with booking and emergencies clear.",
    "conceptHref": "/concepts/donard-veterinary/",
    "conceptLabel": "See the full website idea",
    "motion": {
      "slug": "donard-veterinary",
      "beforeVideo": "/media/concepts/donard-veterinary/donard-veterinary-before.mp4",
      "afterVideo": "/media/concepts/donard-veterinary/donard-veterinary-after.mp4",
      "beforePoster": "/media/concepts/donard-veterinary/donard-veterinary-before.jpg",
      "afterPoster": "/media/concepts/donard-veterinary/donard-veterinary-after.jpg",
      "beforeAlt": "Ten-second visit to Donard Veterinary Clinic's current website — the pet-collage hero, a scroll down the page and a Pet Services menu hover",
      "afterAlt": "Ten-second visit to the Donard concept — the drawn dog, cat and small pet above the care desk, the safety-net flow, the life arc and the drawn catchment map"
    },
    "secondSurfacesHtml": [
      "<section class=\"second-surface\">\n    <div class=\"shell\">\n      <p class=\"second-surface-label\">\n        <svg width=\"14\" height=\"14\" viewBox=\"0 0 14 14\" fill=\"none\" aria-hidden=\"true\">\n          <rect x=\"1\" y=\"4\" width=\"9\" height=\"9\" rx=\"1.5\" stroke=\"currentColor\" stroke-width=\"1.5\"/>\n          <rect x=\"4\" y=\"1\" width=\"9\" height=\"9\" rx=\"1.5\" stroke=\"currentColor\" stroke-width=\"1.5\" fill=\"var(--pale, #f5f4f2)\"/>\n        </svg>\n        Appointments\n      </p>\n      <div class=\"second-surface-intro\">\n        <div>\n          <h2>Where the booking actually happens.</h2>\n          <p>The opening page brings the appointment form forward — but a dedicated page lets the practice separate everyday requests from out-of-hours emergencies, and gives both a clear action without competing for space.</p>\n        </div>\n        <a class=\"text-link\" href=\"/concepts/donard-veterinary/appointments/\">View the appointments screen <span aria-hidden=\"true\">→</span></a>\n      </div>\n      <div class=\"second-surface-frame\">\n        <img\n          src=\"/media/concepts/donard-veterinary/donard-veterinary-appointments-after.jpg\"\n          alt=\"Donard Veterinary appointments concept: the clinic header above two columns — an appointment request form on the left and an out-of-hours emergency card in clinic blue on the right\"\n          width=\"1265\"\n          height=\"710\"\n          loading=\"lazy\"\n        />\n      </div>\n      <p class=\"second-surface-caption\">The appointments screen separates routine booking from emergency guidance and links to the clinic's current VidiVet information for 24/7 digital advice.</p>\n    </div>\n  </section>"
    ],
    "notesHeading": "Three changes to make asking effortless.",
    "notes": [
      {
        "title": "Let the badge set the tone",
        "body": "Today a collage of stock puppies and kittens greets visitors. The one thing that is genuinely theirs — the badge with its Mourne silhouette — sits small in the corner.",
        "change": "The whole screen is drawn from the practice's own badge: its colours, mountain profile and words — Professional, Caring, Compassionate."
      },
      {
        "title": "Turn booking into a real request",
        "body": "Book Appointments leads to a page that lists only the phone number and email. The site separately promotes VidiVet for free 24/7 digital advice.",
        "change": "An appointment-request card on the first screen — name, pet, preferred day, phone — passing to the phone line and inbox the practice already answers."
      },
      {
        "title": "Separate emergencies from everyday care",
        "body": "Emergency treatment is one item in a nine-entry services dropdown, while opening hours compete with photographs in a chat popup.",
        "change": "Emergencies get the top strip with a call action beside the published hours, and six everyday services line the foot of the screen."
      }
    ],
    "sourceHtml": "<section class=\"source-section\">\n    <div class=\"shell source-grid\">\n      <div>\n        <p class=\"eyebrow\">Sources &amp; limits</p>\n        <h2>Clear about what is real.</h2>\n      </div>\n      <div>\n        <p>Captured on 23 July 2026; by 25 July the public site promoted VidiVet for free 24/7 digital advice. Name, address, phone, email, hours, catchment villages, bereavement page and service list come from the current site and a July 2026 recruitment listing.</p>\n        <p>The pet cast, safety-net flow, life arc and catchment map are studio drawings, disclosed as such — not photographs of patients, and the map is indicative rather than a boundary survey. The bereavement line is the practice's own sentence, with its page named and linked.</p>\n        <p>This was not commissioned or approved by Donard Veterinary Clinic. It is a free website idea: make it easy to ask for help.</p>\n        <ul>\n          <li><a href=\"https://donardveterinaryclinic.co.uk/\" rel=\"external\">Donard Veterinary Clinic public website</a></li>\n          <li><a href=\"https://donardveterinaryclinic.co.uk/vidivet/\" rel=\"external\">Current VidiVet information</a></li>\n          <li><a href=\"https://donardveterinaryclinic.co.uk/when-the-time-comes-to-say-goodbye/\" rel=\"external\">Bereavement page quoted on the concept</a></li>\n          <li><a href=\"https://vetni.co.uk/2026/07/08/pt-ft-experienced-sa-vet-donard-vet-clinic-newcastle/\" rel=\"external\">July 2026 recruitment listing used to verify current trading</a></li>\n        </ul>\n        <a class=\"button\" href=\"/request/\">Request a free before-and-after for your business <span aria-hidden=\"true\">→</span></a>\n      </div>\n    </div>\n  </section>"
  },
  "hotel-enniskeen": {
    "title": "Hotel Enniskeen concept transformation — Mourne Made",
    "description": "A respectful, source-backed before-and-after website concept for Enniskeen Country House Hotel in Newcastle.",
    "eyebrow": "Website transformation · Newcastle",
    "headline": "Let the valley make the welcome.",
    "date": "23 July 2026",
    "comparisonIntro": "Drag the handle. Left: what guests find today. Right: a first screen that leads with the valley and checking dates.",
    "conceptHref": "/concepts/hotel-enniskeen/",
    "conceptLabel": "See the full website idea",
    "motion": {
      "slug": "hotel-enniskeen",
      "beforeVideo": "/media/concepts/hotel-enniskeen/hotel-enniskeen-before.mp4",
      "afterVideo": "/media/concepts/hotel-enniskeen/hotel-enniskeen-after.mp4",
      "beforePoster": "/media/concepts/hotel-enniskeen/hotel-enniskeen-before.jpg",
      "afterPoster": "/media/concepts/hotel-enniskeen/hotel-enniskeen-after.jpg",
      "beforeAlt": "Ten-second visit to Enniskeen's current website — the archive-logo header, the rotating photo carousel and a menu-bar hover",
      "afterAlt": "Ten-second visit to the Enniskeen concept — the balcony-valley opening, the availability bar and the mountainside hideaway headline"
    },
    "reel": {
      "video": "/media/concepts/hotel-enniskeen/hotel-enniskeen-reel.mp4",
      "poster": "/media/concepts/hotel-enniskeen/hotel-enniskeen-reel-poster.jpg",
      "alt": "Captioned flagship film comparing a visit to Enniskeen Country House Hotel's current website with the complete five-page concept and both routes into the hotel's online booking system",
      "heading": "From first visit to checking dates.",
      "intro": "The complete story in one short, silent film: the current room-finding and booking route, then Home, Stay, Dine, the estate and things to do in the linked concept. The hotel’s own photographs and Bookin1 system remain throughout.",
      "duration": "About 77 seconds"
    },
    "secondSurfacesHtml": [
      "<section class=\"second-surface\">\n    <div class=\"shell\">\n      <p class=\"second-surface-label\">Rooms and suites</p>\n      <div class=\"second-surface-intro\">\n        <h2>A room detail that earns the booking.</h2>\n        <p>The hotel has no interior page for rooms — the current site links straight from a photo carousel to the booking system with no copy, no amenities, no sense of what the stay is like. This concept page shows what a guest would want to read before they commit.</p>\n      </div>\n      <div class=\"second-surface-frame\">\n        <img\n          src=\"/media/concepts/hotel-enniskeen/hotel-enniskeen-rooms-after.jpg\"\n          alt=\"The Enniskeen rooms concept page showing the balcony room hero, room type cards and an availability bar\"\n          width=\"1265\"\n          height=\"710\"\n          loading=\"lazy\"\n        />\n      </div>\n      <p class=\"second-surface-caption\">Rooms concept — balcony stay story with availability, matching the opening screen’s valley identity.</p>\n      <a class=\"text-link concept-link\" href=\"/concepts/hotel-enniskeen/rooms/\">View the rooms concept <span aria-hidden=\"true\">→</span></a>\n    </div>\n  </section>",
      "<section class=\"second-surface\">\n    <div class=\"shell\">\n      <p class=\"second-surface-label\">Dining</p>\n      <div class=\"second-surface-intro\">\n        <h2>Give dining its own window on the Mournes.</h2>\n        <p>The full concept carries the hotel’s published dining offer beyond a dropdown: the Oak Restaurant, Mourne Honey afternoon tea, the Brandy Pad Lounge and the hotel’s own menus — readable on the page, not only as PDF downloads — share one clear route, with table booking kept on the published phone line.</p>\n      </div>\n      <div class=\"second-surface-frame\">\n        <img\n          src=\"/media/concepts/hotel-enniskeen/hotel-enniskeen-dine-after.jpg\"\n          alt=\"The Enniskeen Dine concept page showing the Oak Restaurant beside a mountain-window photograph, with a call-to-book action and on-page menus\"\n          width=\"1265\"\n          height=\"710\"\n          loading=\"lazy\"\n        />\n      </div>\n      <p class=\"second-surface-caption\">Dine concept — the hotel’s own restaurant, afternoon tea, lounge and on-page menus, reorganised into one linked page.</p>\n      <a class=\"text-link concept-link\" href=\"/concepts/hotel-enniskeen/dine/\">View the Dine concept <span aria-hidden=\"true\">→</span></a>\n    </div>\n  </section>"
    ],
    "notesHeading": "Three changes to make the stay feel closer.",
    "notes": [
      {
        "title": "Open with the valley, not the archive",
        "body": "Today an oval archive photograph and seven uppercase menu items lead the page, while the hotel's own phrase — a mountainside hideaway — is missing from the first screen.",
        "change": "One composed scene — the valley framed from a balcony room, the hideaway line as the headline, and five linked pages for the complete visit."
      },
      {
        "title": "Make checking dates effortless",
        "body": "Book Now is one menu item among seven, and checking availability means leaving for the booking system with no dates in hand.",
        "change": "Availability bars for arrival and nights — exactly the fields the hotel's Bookin1 search accepts — pass straight into its results route."
      },
      {
        "title": "Let the estate do the selling",
        "body": "Twelve wooded acres, the river trail, Mourne Honey afternoon tea and the Brandy Pad Lounge are real draws — but they all live behind dropdown menus.",
        "change": "The opening carries the estate's story in one breath, with dedicated Dine, Estate and Things to do pages one step away."
      }
    ],
    "sourceHtml": "<section class=\"source-section\">\n    <div class=\"shell source-grid\">\n      <div>\n        <p class=\"eyebrow\">Sources &amp; limits</p>\n        <h2>Clear about what is real.</h2>\n      </div>\n      <div>\n        <p>The public Enniskeen site was re-read on 23 July 2026. Name, mountainside-hideaway and Shimna Valley wording, room names, dining and estate details, contact information, menus and vouchers come from that site. Availability bars pass into the same Bookin1 results route the hotel's own search uses.</p>\n        <p>The concept uses disclosed AI-generated imagery rather than publishing the hotel's photographs. Façade and named Room 6 bathroom are faithful visualisations grounded in reference photographs; other scenic images are atmospheric concept visuals, not documentary views.</p>\n        <p>This was not commissioned or approved by Enniskeen Country House Hotel. It is a free website idea: let the valley make the welcome.</p>\n        <ul>\n          <li><a href=\"https://www.enniskeenhotel.co.uk/\" rel=\"external\">Enniskeen public website</a></li>\n          <li><a href=\"https://www.tripadvisor.co.uk/Hotel_Review-g186478-d1462012\" rel=\"external\">TripAdvisor listing used to verify current trading</a></li>\n        </ul>\n        <a class=\"button\" href=\"/request/\">Request a free before-and-after for your business <span aria-hidden=\"true\">→</span></a>\n      </div>\n    </div>\n  </section>"
  },
  "mourne-cycles": {
    "title": "Mourne Cycles concept transformation — Mourne Made",
    "description": "A respectful, source-backed before-and-after website concept for Mourne Cycles, the Trek dealer in Newcastle.",
    "eyebrow": "Website transformation · Newcastle",
    "headline": "Put the shop's name over the door.",
    "date": "21 July 2026",
    "comparisonIntro": "Drag the handle. The left shows the public opening screen captured during research; the right shows the proposed first screen.",
    "conceptHref": "/concepts/mourne-cycles/",
    "conceptLabel": "See the full website idea",
    "motion": {
      "slug": "mourne-cycles",
      "beforeVideo": "/media/concepts/mourne-cycles/mourne-cycles-before.mp4",
      "afterVideo": "/media/concepts/mourne-cycles/mourne-cycles-after.mp4",
      "beforePoster": "/media/concepts/mourne-cycles/mourne-cycles-before.jpg",
      "afterPoster": "/media/concepts/mourne-cycles/mourne-cycles-after.jpg",
      "beforeAlt": "Ten-second visit to Mourne Cycles' current website — the logo collage of brand marks and cut-out bikes, a scroll through the page and a showroom hover",
      "afterAlt": "Ten-second visit to the Mourne Cycles concept — the kinetic Mourne Cycles opening riding in over a generated trail plate, a scroll down through the terrain-mapped range rail and the electric, road and mountain bike panels, and back up to the hero"
    },
    "secondSurfacesHtml": [
      "<section class=\"second-surface\">\n    <div class=\"shell\">\n      <div class=\"second-surface-intro\">\n        <div>\n          <p class=\"second-surface-label\">The workshop</p>\n          <h2>The thin loop, kept honest.</h2>\n        </div>\n        <p>\n          The service desk gets the page a working shop deserves: tiers a rider can self-select from, the day's stand tickets beside them (illustrative, labelled as such), and a booking path that carries the service and the day into a composed email — the shop still confirms every slot.\n          <a class=\"text-link\" href=\"/concepts/mourne-cycles/workshop/\">Open the live concept <span aria-hidden=\"true\">→</span></a>\n        </p>\n      </div>\n      <div class=\"second-surface-frame\">\n        <img\n          src=\"/media/concepts/mourne-cycles/mourne-cycles-workshop-after.jpg\"\n          alt=\"The Mourne Cycles workshop concept page: service tiers beside the day's stand tickets — a bottom bracket creak, two puncture repairs and a full mountain-bike service — under the Get your bike checked heading\"\n        />\n      </div>\n      <p class=\"second-surface-caption\">\n        Workshop — <a href=\"/concepts/mourne-cycles/workshop/\">mourne-cycles/workshop/</a> · capture at 1265 × 710\n      </p>\n    </div>\n  </section>",
      "<section class=\"second-surface\">\n    <div class=\"shell\">\n      <div class=\"second-surface-intro\">\n        <div>\n          <p class=\"second-surface-label\">Hire</p>\n          <h2>Day rates that say what they are.</h2>\n        </div>\n        <p>\n          Hire is its own page now, and every figure carries its label: prices indicative, confirmed by phone before anyone sets off. The right rail answers the three questions a hire customer actually has — what to bring, where to point the bike, when to be back.\n          <a class=\"text-link\" href=\"/concepts/mourne-cycles/hire/\">Open the live concept <span aria-hidden=\"true\">→</span></a>\n        </p>\n      </div>\n      <div class=\"second-surface-frame\">\n        <img\n          src=\"/media/concepts/mourne-cycles/mourne-cycles-hire-after.jpg\"\n          alt=\"The Mourne Cycles hire concept page: day hire rates for hybrid, mountain and e-bike under an explicit indicative-prices label, with a before-you-set-off checklist\"\n        />\n      </div>\n      <p class=\"second-surface-caption\">\n        Hire — <a href=\"/concepts/mourne-cycles/hire/\">mourne-cycles/hire/</a> · capture at 1265 × 710\n      </p>\n    </div>\n  </section>",
      "<section class=\"second-surface\">\n    <div class=\"shell\">\n      <div class=\"second-surface-intro\">\n        <div>\n          <p class=\"second-surface-label\">Trails</p>\n          <h2>The hills the shop trades under.</h2>\n        </div>\n        <p>\n          The trails page opens with the skyline itself — the high Mournes above Newcastle, sampled column by column from open elevation data at build time and drawn as the visitor arrives, a marker walking the ridge with a live metre readout. This still is the designed settled frame a reduced-motion visitor meets; the moving version runs on the live concept.\n          <a class=\"text-link\" href=\"/concepts/mourne-cycles/trails/\">Open the live concept <span aria-hidden=\"true\">→</span></a>\n        </p>\n      </div>\n      <div class=\"second-surface-frame\">\n        <img\n          src=\"/media/concepts/mourne-cycles/mourne-cycles-trails-after.jpg\"\n          alt=\"The Mourne Cycles trails concept page showing the settled ridgeline — the Mourne skyline above Newcastle drawn from open elevation data, with the ridge marker and metre readout\"\n        />\n      </div>\n      <p class=\"second-surface-caption\">\n        Trails — <a href=\"/concepts/mourne-cycles/trails/\">mourne-cycles/trails/</a> · capture at 1265 × 710, reduced-motion settled frame\n      </p>\n    </div>\n  </section>"
    ],
    "notesHeading": "Five changes that put the shop first.",
    "notes": [
      {
        "title": "Put the shop's name over the door",
        "body": "The captured screen gives most of its space to supplier brands: Trek, Bontrager, Shimano and bike cut-outs. The shop's own name sits small in the header.",
        "change": "Mourne Cycles and its own words — local since 2002, one of Northern Ireland's premier local bike shops — take the opening screen. Trek and the component brands become one confident line in the story."
      },
      {
        "title": "Give the workshop a way to book",
        "body": "The header phone number is the first screen's only action. Repairs are explained, but there is no clear path to request a slot online.",
        "change": "A workshop booking path: pick a service tier and a preferred day, add a note about the bike, and the details open as an email to the shop. They confirm every slot — nothing pretends to live availability."
      },
      {
        "title": "Make hire as obvious as buying",
        "body": "People coming for a day in the forest or along the coast need to know they can take a bike out, not only buy one.",
        "change": "A hire page on the same site as the showroom: pick a bike for trail or coast riding, with indicative prices and a clear call to confirm what is free before you set off."
      },
      {
        "title": "Show the range by where you ride",
        "body": "Electric, road and mountain are real categories on the showroom side, and the shop is a Cyclescheme retailer — but the opening screen did not show where each kind of bike goes or how to save through work.",
        "change": "A bikes page that maps each category to local riding country, plus a Cycle to Work page with a labelled, illustrative worked example."
      },
      {
        "title": "Draw the country the shop trades in",
        "body": "The shop sits on the road out of Newcastle toward Castlewellan — the trailhead — and its own site already names local trails without designing for them.",
        "change": "A trails page with the Mourne skyline above Newcastle and an indicative map of the riding country around Castlewellan, Tollymore, Donard and the coast road."
      }
    ],
    "sourceHtml": "<section class=\"source-section\">\n    <div class=\"shell source-grid\">\n      <div>\n        <p class=\"eyebrow\">Sources &amp; limits</p>\n        <h2>Clear about what is real.</h2>\n      </div>\n      <div>\n        <p>The before panel is a capture of the public Mourne Cycles site from July 2026.</p>\n        <p>Name, logo, tagline, address, phone, email, brand list, bike categories, trails wording and Cyclescheme listing come from that site. Hire prices, workshop tiers and Cycle to Work figures are illustrative. Bike scenes are generated — not showroom stock or the shop's premises. The trails skyline is SRTM-derived elevation, drawn as an indicative ridgeline, not a survey.</p>\n        <p>This was not commissioned or approved by Mourne Cycles.</p>\n        <ul>\n          <li><a href=\"https://www.mourne-cycles.co.uk/\" rel=\"external\">Mourne Cycles website</a></li>\n        </ul>\n        <a class=\"button\" href=\"/request/\">Request a free before-and-after for your business <span aria-hidden=\"true\">→</span></a>\n      </div>\n    </div>\n  </section>"
  },
  "newcastle-chamber": {
    "title": "Newcastle Chamber of Commerce concept transformation — Mourne Made",
    "description": "A respectful, source-backed public-page concept for Newcastle Chamber of Commerce: a Main Street finder with a local business directory and a full linked site.",
    "eyebrow": "First website · Newcastle · full site",
    "headline": "A Main Street finder for the town's chamber.",
    "date": "22 July 2026",
    "comparisonIntro": "Drag the handle. Left: what a first-time visitor finds today — the Chamber's Facebook page without an account. Right: a Main Street finder for the town's chamber.",
    "conceptHref": "/concepts/newcastle-chamber/",
    "conceptLabel": "See the full website idea",
    "motion": {
      "slug": "newcastle-chamber",
      "afterVideo": "/media/concepts/newcastle-chamber/newcastle-chamber-after.mp4",
      "beforePoster": "/media/concepts/newcastle-chamber/newcastle-chamber-before.jpg",
      "afterPoster": "/media/concepts/newcastle-chamber/newcastle-chamber-after.jpg",
      "beforeAlt": "Newcastle Chamber of Commerce's current public presence: its Facebook page covered by a login form, with the Chamber's introduction greyed out behind the wall",
      "afterAlt": "Ten-second visit to the Newcastle Chamber concept — the town's businesses under one roof opening, the events card and the links to members, events and joining"
    },
    "secondSurfacesHtml": [
      "<section class=\"second-surface\">\n    <div class=\"shell\">\n      <div class=\"second-surface-intro\">\n        <div>\n          <p class=\"second-surface-label\">Members</p>\n          <h2>A member directory for Main Street.</h2>\n        </div>\n        <p>Once a visitor lands, the next question is which businesses are in the Chamber — and how to join. The directory answers both without new infrastructure: members listed by trade, a path to the existing Gmail inbox.</p>\n      </div>\n      <div class=\"second-surface-frame\">\n        <img\n          src=\"/media/concepts/newcastle-chamber/newcastle-chamber-members-after.jpg\"\n          alt=\"Newcastle Chamber member directory concept: harbour-navy header with the chamber seal, a grid of business cards organised by trade category, and a Join the Chamber banner at the foot\"\n          width=\"1265\"\n          height=\"710\"\n          loading=\"lazy\"\n        />\n      </div>\n      <p class=\"second-surface-caption\">Example listings of real Newcastle businesses on Main Street, Co. Down. Membership is confirmed by the Chamber committee.</p>\n      <a class=\"text-link concept-link\" href=\"/concepts/newcastle-chamber/members/\">View the members concept screen <span aria-hidden=\"true\">→</span></a>\n    </div>\n  </section>",
      "<section class=\"second-surface\" style=\"padding-top: 0\">\n    <div class=\"shell\">\n      <div class=\"second-surface-intro\">\n        <div>\n          <p class=\"second-surface-label\">Complete site</p>\n          <h2>A complete site for the Chamber.</h2>\n        </div>\n        <p>\n          The complete site keeps the Main Street directory, a clear Co. Down identity and a friendly route for businesses to join.\n          Joining by email matches the Chamber's current volunteer capacity.\n        </p>\n      </div>\n      <ul class=\"chamber-site-map\"><li><a href=\"/concepts/newcastle-chamber/\"><strong>Home</strong><span>Finder opening</span></a></li><li><a href=\"/concepts/newcastle-chamber/members/\"><strong>Members</strong><span>Directory by trade</span></a></li><li><a href=\"/concepts/newcastle-chamber/events/\"><strong>Events</strong><span>Town calendar</span></a></li><li><a href=\"/concepts/newcastle-chamber/join/\"><strong>Join</strong><span>Neighbour voice + mailto</span></a></li><li><a href=\"/concepts/newcastle-chamber/about/\"><strong>About</strong><span>Volunteer hub</span></a></li><li><a href=\"/concepts/newcastle-chamber/contact/\"><strong>Contact</strong><span>Inbox & Main Street</span></a></li></ul>\n    </div>\n  </section>"
    ],
    "notesHeading": "Three changes to make the Chamber findable.",
    "notes": [
      {
        "title": "Be findable as Newcastle, Co. Down",
        "body": "Search results mix this Chamber with organisations elsewhere, and the public Facebook page is hard for a first-time visitor to use as a front door.",
        "change": "A finder opening that leads with Newcastle, Co. Down and Main Street under the Mournes — place first, then directory, events and join."
      },
      {
        "title": "Give Main Street a directory people can use",
        "body": "Member news and how to join live only as feed posts and a Gmail address, so someone looking for a trader has to already know where to look.",
        "change": "A Main Street finder: search into a category directory, a trade list and a clear route for businesses that want to join."
      },
      {
        "title": "Put the town calendar on the front door",
        "body": "Halloween in Newcastle is a night the Chamber helps put on — but a passer-by who starts on social still has to dig for the next date.",
        "change": "An events card on the opening screen, with a full calendar page behind it — updates still pointing at the Facebook and Instagram the Chamber already runs."
      }
    ],
    "sourceHtml": "<section class=\"source-section\">\n    <div class=\"shell source-grid\">\n      <div>\n        <p class=\"eyebrow\">Sources &amp; limits</p>\n        <h2>Clear about what is real.</h2>\n      </div>\n      <div>\n        <p>Captured from the Chamber's public Facebook page on 22 July 2026, with the login prompt left in place. Co. Down naming, Main Street address, Gmail, phone, Instagram, LinkedIn, the 2023 relaunch and Halloween in Newcastle on 31 October 2026 come from the Chamber's public pages and the council tourism listing.</p>\n        <p>The opening photograph is Eric Jones's 2012 Central Promenade view (CC BY-SA 2.0), credited on the page. The seal is concept work, not an official crest. Directory listings are real Newcastle businesses shown as examples — membership is confirmed by the committee. Non-Halloween calendar rows are examples.</p>\n        <p>This was not commissioned or approved by Newcastle Chamber of Commerce. It is a free website idea: a Main Street finder the town can use.</p>\n        <ul>\n          <li><a href=\"https://www.facebook.com/newcastlechamberofcommerce/\" rel=\"external\">Newcastle Chamber of Commerce public Facebook page</a></li>\n          <li><a href=\"https://www.instagram.com/newcastlechamber_/\" rel=\"external\">Chamber Instagram</a></li>\n          <li><a href=\"https://www.visitmournegullionstrangford.com/explore/cities-towns-and-villages/newcastle/whats-on-in-newcastle\" rel=\"external\">Council tourism listing used for Halloween 2026</a></li>\n          <li><a href=\"https://uk.linkedin.com/company/newcastle-chamber\" rel=\"external\">LinkedIn company page</a></li>\n          <li><a href=\"https://www.geograph.ie/photo/2843609\" rel=\"external\">Eric Jones, Central Promenade, Newcastle, 2012 (CC BY-SA 2.0)</a></li>\n        </ul>\n        <a class=\"button\" href=\"/request/\">Request a free before-and-after for your business <span aria-hidden=\"true\">→</span></a>\n      </div>\n    </div>\n  </section>"
  },
  "scopers": {
    "title": "Scopers concept transformation — Mourne Made",
    "description": "A respectful, source-backed first-website concept for Scopers, the zero-waste hot food bar in Dundrum.",
    "eyebrow": "First website · Dundrum",
    "headline": "A first page for a Northern Ireland first.",
    "date": "21 July 2026",
    "comparisonIntro": "Drag the handle. Left: what a first-time visitor finds today — the bar's Facebook page without an account. Right: a first screen for Northern Ireland's first zero-waste hot food bar.",
    "conceptHref": "/concepts/scopers/",
    "conceptLabel": "See the full website idea",
    "motion": {
      "slug": "scopers",
      "afterVideo": "/media/concepts/scopers/scopers-after.mp4",
      "beforePoster": "/media/concepts/scopers/scopers-before.jpg",
      "afterPoster": "/media/concepts/scopers/scopers-after.jpg",
      "beforeAlt": "Scopers' current public presence: its Facebook page covered by Meta's cookie consent dialog and login form, with the bar's introduction greyed out behind them",
      "afterAlt": "Ten-second visit to the Scopers concept — the zero-waste hot food bar opening, the supper-club card and the signature-dish list"
    },
    "secondSurfacesHtml": [
      "<section class=\"second-surface\">\n    <div class=\"shell\">\n      <div class=\"second-surface-intro\">\n        <div>\n          <p class=\"second-surface-label\">Supper club</p>\n          <p>A complete site gives the pop-up dining events a permanent place — with the full event details, the eleven-course sample menu and a booking action, rather than relying on a social post.</p>\n        </div>\n        <a class=\"text-link\" href=\"/concepts/scopers/supper-club/\">View the supper-club page <span aria-hidden=\"true\">→</span></a>\n      </div>\n      <div class=\"second-surface-frame\">\n        <img\n          src=\"/media/concepts/scopers/scopers-supper-club-after.jpg\"\n          alt=\"The Scopers supper-club concept page in cast iron, buttermilk and paprika: an eleven-course August menu, event details card and booking button\"\n          width=\"1265\"\n          height=\"710\"\n        />\n      </div>\n      <p class=\"second-surface-caption\">Supper-club night page — date, theme, eleven-course sample menu and a direct booking action pointing to the same Instagram inbox the kitchen already answers.</p>\n    </div>\n  </section>"
    ],
    "notesHeading": "Three changes to put the chef out front.",
    "notes": [
      {
        "title": "Take the story out from behind the login",
        "body": "Scopers has no website. Searching lands on a Facebook page that greets a first-time visitor with Meta's cookie dialog and a login form — Hot Food Bar by Paul Cunningham sits greyed out behind them.",
        "change": "A first screen with nothing in front of it, opening on the one remarkable fact: Northern Ireland's first zero-waste hot food bar, on Dundrum's main street."
      },
      {
        "title": "Say the remarkable thing once, plainly",
        "body": "A Great British Menu chef, a zero-waste first, the Mourne Larder and a grandfather's foraging exist only as fragments across feed posts and third-party write-ups.",
        "change": "The story in three opening lines — chef, provenance, philosophy — with the signature dishes named along the foot of the screen."
      },
      {
        "title": "Keep the supper club visible",
        "body": "The pop-up dinners of up to eleven courses are ticketed through social posts, so the next date exists only for people who happen to scroll past it.",
        "change": "A supper-club card that always holds the next date, with a booking action opening the same Instagram inbox the kitchen already answers."
      }
    ],
    "sourceHtml": "<section class=\"source-section\">\n    <div class=\"shell source-grid\">\n      <div>\n        <p class=\"eyebrow\">Sources &amp; limits</p>\n        <h2>Clear about what is real.</h2>\n      </div>\n      <div>\n        <p>Captured from the bar's public Facebook page on 21 July 2026, with Meta's cookie dialog and login prompt left in place. The zero-waste-first claim, Paul Cunningham's Great British Menu appearance, the Mourne Larder, supper-club format and signature dishes come from the bar's public presence and dated third-party features.</p>\n        <p>Every food image is an AI-generated illustration — a riff on the bar's own Instagram captions (read 31 July 2026), not a photograph of their food or premises. The round badge is the bar's own, from its public Instagram profile. The Wednesday 26 August 2026 supper-club date was read from Instagram on 31 July 2026.</p>\n        <p>This was not commissioned or approved by Scopers. It is a free website idea: a first page for a Northern Ireland first.</p>\n        <ul>\n          <li><a href=\"https://www.facebook.com/p/Scopers-Dundrum-Co-Down-100083029315116/\" rel=\"external\">Scopers public Facebook page</a></li>\n          <li><a href=\"https://goodfoodireland.ie/scopers-dundrum/\" rel=\"external\">Good Food Ireland feature used for the chef's story</a></li>\n          <li><a href=\"https://www.tripadvisor.co.uk/Restaurant_Review-g1477857-d26533474\" rel=\"external\">TripAdvisor listing used to verify current trading</a></li>\n        </ul>\n        <a class=\"button\" href=\"/request/\">Request a free before-and-after for your business <span aria-hidden=\"true\">→</span></a>\n      </div>\n    </div>\n  </section>"
  },
  "arley-house": {
    "title": "Arley House concept transformation — Mourne Made",
    "description": "A respectful, source-backed before-and-after website concept for Arley House in Dundrum.",
    "eyebrow": "Website transformation · Dundrum",
    "headline": "Wake in Dundrum. Newcastle when you want it.",
    "date": "23 August 2026",
    "comparisonIntro": "Drag the handle. Left: a labelled placeholder for the current public presence (a matched live capture was not filed). Right: the concept opening screen.",
    "conceptHref": "/concepts/arley-house/",
    "conceptLabel": "See the full website idea",
    "motion": {
      "slug": "arley-house",
      "afterVideo": "/media/concepts/arley-house/arley-house-after.mp4",
      "beforePoster": "/media/concepts/arley-house/arley-house-before.jpg",
      "afterPoster": "/media/concepts/arley-house/arley-house-after.jpg",
      "beforeAlt": "Labelled placeholder for Arley House's current public presence — not a live-site screenshot",
      "afterAlt": "Opening frame of the Arley House concept, held as a short clip from the captured still — a full interactive visit demo was not filed for this publish",
      "beforeNote": "Arley's own brochure site is not a reliable before capture for this publish. The before panel is a labelled placeholder naming the public Facebook presence — not a fabricated live-site screenshot."
    },
    "secondSurfacesHtml": [],
    "notesHeading": "What this concept changes.",
    "notes": [
      {
        "title": "Put the business's own first job on the first screen",
        "body": "The public presence today splits the story across a site, a feed, or a booker — so a cold visitor has to already know where to look.",
        "change": "Wake in Dundrum. Newcastle when you want it."
      },
      {
        "title": "Keep honesty limits visible",
        "body": "Elevation briefs for these first-50 grafts name what the feed already wins and what the studio must not invent.",
        "change": "Generated plates stay disclosed on the concept banner; live diary and booking paths hand off to the surfaces the business already runs."
      },
      {
        "title": "Leave a clear claim path",
        "body": "These pages were not commissioned by the businesses shown.",
        "change": "Each transformation keeps the standard claim route so an owner can say whether the reading is fair."
      }
    ],
    "sourceHtml": "<section class=\"source-section\">\n    <div class=\"shell source-grid\">\n      <div>\n        <p class=\"eyebrow\">Sources &amp; limits</p>\n        <h2>Clear about what is real.</h2>\n      </div>\n      <div>\n        <p>Published 23 August 2026 as a first-50 concept graft. The before panel is a labelled placeholder because a matched live-site capture was not filed — it is not a screenshot of the public Facebook page (own site thin / not carrying the stay).</p>\n        <p>Generated dusk-windows plate disclosed on the concept banner — not a photograph of the house. Do not print unverified hotel-spec or 'dogs inside and out' as house policy. Concept not independently Phase-Q validated.</p>\n        <p>The village map is a hand-drawn sketch — indicative, not a survey — drawn only from places the logged-out Facebook read of the house's page (23 August 2026) or the attributed Visit Mourne Gullion Strangford sentence carries: the house on Belfast Road, the village, Dundrum Castle, the bay with beaches either side, Newcastle and the Mournes. The guestbook band quotes the house's own 25 July 2026 Facebook post and hands the live diary back to the feed.</p>\n        <p>This was not commissioned or approved by Arley House.</p>\n        <a class=\"button\" href=\"/request/\">Request a free before-and-after for your business <span aria-hidden=\"true\">→</span></a>\n      </div>\n    </div>\n  </section>"
  },
  "conlyn-house": {
    "title": "Conlyn House concept transformation — Mourne Made",
    "description": "A respectful, source-backed before-and-after website concept for Conlyn House in Newcastle.",
    "eyebrow": "Website transformation · Newcastle",
    "headline": "Wake on Central Promenade. Book is still an enquiry.",
    "date": "23 August 2026",
    "comparisonIntro": "Drag the handle. Left: a labelled placeholder for the current public presence (a matched live capture was not filed). Right: the concept opening screen.",
    "conceptHref": "/concepts/conlyn-house/",
    "conceptLabel": "See the full website idea",
    "motion": {
      "slug": "conlyn-house",
      "afterVideo": "/media/concepts/conlyn-house/conlyn-house-after.mp4",
      "beforePoster": "/media/concepts/conlyn-house/conlyn-house-before.jpg",
      "afterPoster": "/media/concepts/conlyn-house/conlyn-house-after.jpg",
      "beforeAlt": "Labelled placeholder for Conlyn House's current public presence — not a live-site screenshot",
      "afterAlt": "Opening frame of the Conlyn House concept, held as a short clip from the captured still — a full interactive visit demo was not filed for this publish",
      "beforeNote": "A matched live-site capture was not filed for this publish. The before panel is a labelled placeholder for conlynhouse.com — not a screenshot of the 2019 gallery or the Elementor form."
    },
    "secondSurfacesHtml": [],
    "notesHeading": "What this concept changes.",
    "notes": [
      {
        "title": "Put the business's own first job on the first screen",
        "body": "The public presence today splits the story across a site, a feed, or a booker — so a cold visitor has to already know where to look.",
        "change": "Wake on Central Promenade. Book is still an enquiry."
      },
      {
        "title": "Keep honesty limits visible",
        "body": "Elevation briefs for these first-50 grafts name what the feed already wins and what the studio must not invent.",
        "change": "Generated plates stay disclosed on the concept banner; live diary and booking paths hand off to the surfaces the business already runs."
      },
      {
        "title": "Leave a clear claim path",
        "body": "These pages were not commissioned by the businesses shown.",
        "change": "Each transformation keeps the standard claim route so an owner can say whether the reading is fair."
      }
    ],
    "sourceHtml": "<section class=\"source-section\">\n    <div class=\"shell source-grid\">\n      <div>\n        <p class=\"eyebrow\">Sources &amp; limits</p>\n        <h2>Clear about what is real.</h2>\n      </div>\n      <div>\n        <p>Published 23 August 2026 as a first-50 concept graft. The before panel is a labelled placeholder because a matched live-site capture was not filed — it is not a screenshot of conlynhouse.com.</p>\n        <p>Generated dusk-windows plate disclosed. Gallery on the live site is largely a 2019 shoot; do not present it as this morning. 'Book Now' is not a live calendar. Concept not independently Phase-Q validated.</p>\n        <p>This was not commissioned or approved by Conlyn House.</p>\n        <a class=\"button\" href=\"/request/\">Request a free before-and-after for your business <span aria-hidden=\"true\">→</span></a>\n      </div>\n    </div>\n  </section>"
  },
  "cocos-adventure-playground": {
    "title": "Coco's Adventure Playground concept transformation — Mourne Made",
    "description": "A respectful, source-backed before-and-after website concept for Coco's Adventure Playground in Newcastle.",
    "eyebrow": "Website transformation · Newcastle",
    "headline": "Play first. Today's hours stay on sources we can keep.",
    "date": "23 August 2026",
    "comparisonIntro": "Drag the handle. Left: a labelled placeholder for the current public presence (a matched live capture was not filed). Right: the concept opening screen.",
    "conceptHref": "/concepts/cocos-adventure-playground/",
    "conceptLabel": "See the full website idea",
    "motion": {
      "slug": "cocos-adventure-playground",
      "afterVideo": "/media/concepts/cocos-adventure-playground/cocos-adventure-playground-after.mp4",
      "beforePoster": "/media/concepts/cocos-adventure-playground/cocos-adventure-playground-before.jpg",
      "afterPoster": "/media/concepts/cocos-adventure-playground/cocos-adventure-playground-after.jpg",
      "beforeAlt": "Labelled placeholder for Coco's Adventure Playground's current public presence — not a live-site screenshot",
      "afterAlt": "Opening frame of the Coco's Adventure Playground concept, held as a short clip from the captured still — a full interactive visit demo was not filed for this publish",
      "beforeNote": "A matched live-site capture was not filed for this publish. The before panel is a labelled placeholder for cocosplayground.co.uk — not a screenshot."
    },
    "secondSurfacesHtml": [],
    "notesHeading": "What this concept changes.",
    "notes": [
      {
        "title": "Put the business's own first job on the first screen",
        "body": "The public presence today splits the story across a site, a feed, or a booker — so a cold visitor has to already know where to look.",
        "change": "Play first. Today's hours stay on sources we can keep."
      },
      {
        "title": "Keep honesty limits visible",
        "body": "Elevation briefs for these first-50 grafts name what the feed already wins and what the studio must not invent.",
        "change": "Generated plates stay disclosed on the concept banner; live diary and booking paths hand off to the surfaces the business already runs."
      },
      {
        "title": "Leave a clear claim path",
        "body": "These pages were not commissioned by the businesses shown.",
        "change": "Each transformation keeps the standard claim route so an owner can say whether the reading is fair."
      }
    ],
    "sourceHtml": "<section class=\"source-section\">\n    <div class=\"shell source-grid\">\n      <div>\n        <p class=\"eyebrow\">Sources &amp; limits</p>\n        <h2>Clear about what is real.</h2>\n      </div>\n      <div>\n        <p>Published 23 August 2026 as a first-50 concept graft. The before panel is a labelled placeholder because a matched live-site capture was not filed — it is not a screenshot of cocosplayground.co.uk.</p>\n        <p>Generated play-hall plate disclosed — not a photograph of the premises. Do not resurrect retired disco framing or invent parent quotes. Concept not independently Phase-Q validated.</p>\n        <p>This was not commissioned or approved by Coco's Adventure Playground.</p>\n        <a class=\"button\" href=\"/request/\">Request a free before-and-after for your business <span aria-hidden=\"true\">→</span></a>\n      </div>\n    </div>\n  </section>"
  },
} satisfies Record<string, TransformationDetail>;
