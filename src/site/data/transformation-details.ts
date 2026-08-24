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
  "dundrum-inn": {
    "title": "The Dundrum Inn concept transformation — Mourne Made",
    "description": "A respectful, source-backed before-and-after website concept for The Dundrum Inn in Dundrum.",
    "eyebrow": "Website transformation · Dundrum",
    "headline": "Answer today on the first screen.",
    "date": "26 July 2026",
    "comparisonIntro": "Drag the handle. Left: what visitors find today. Right: a first screen that answers whether the door is open.",
    "conceptHref": "/concepts/dundrum-inn/",
    "conceptLabel": "See the full website idea",
    "motion": {
      "slug": "dundrum-inn",
      "beforeVideo": "/media/concepts/dundrum-inn/dundrum-inn-before.mp4",
      "afterVideo": "/media/concepts/dundrum-inn/dundrum-inn-after.mp4",
      "beforePoster": "/media/concepts/dundrum-inn/dundrum-inn-before.jpg",
      "afterPoster": "/media/concepts/dundrum-inn/dundrum-inn-after.jpg",
      "beforeAlt": "Ten-second visit to The Dundrum Inn's current website — the GuestDiary homepage under its machine-translation bar, a scroll down the page and a menu hover",
      "afterAlt": "Ten-second visit to the concept — the full-width Come for the views hero, the open-or-closed status line computed from the Inn's published hours, the booking fields handing to GuestDiary, and the Today board of hours, events and rooms"
    },
    "secondSurfacesHtml": [],
    /* Rebuilt 26 July 2026. The first concept dressed the inn in black and
       brass with no photograph, and invented a kitchen closing time, a room
       count and a nightly price. None of the three is published by the inn,
       so none survives here. */
    "notesHeading": "Three changes to answer the question people arrive with.",
    "notes": [
      {
        "title": "Say whether the door is open",
        "body": "The inn publishes opening hours for all seven days, but they sit far below a translation bar and a video — hard to find before a visit.",
        "change": "A status line at the top that works out open or closed from the inn's own published hours, next to the event currently listed and the bay across the road."
      },
      {
        "title": "Retire the machine translation, keep the Irish",
        "body": "A translation widget for twenty-eight-plus languages is among the most prominent controls. Irish is already in that list — buried among the rest.",
        "change": "Irish beside English instead of the translation bar, freeing the space for a booking action."
      },
      {
        "title": "Keep the booking that works",
        "body": "The inn already runs GuestDiary with availability, room types and the cottage. The gap is how far you scroll before you reach it.",
        "change": "The same date, adults and children fields on the first screen, handing to GuestDiary so live availability stays."
      }
    ],
    "sourceHtml": "<section class=\"source-section\">\n    <div class=\"shell source-grid\">\n      <div>\n        <p class=\"eyebrow\">Sources &amp; limits</p>\n        <h2>Clear about what is real.</h2>\n      </div>\n      <div>\n        <p>Captured from the public Dundrum Inn website on 24 July 2026, with published detail re-checked on 26 July. Come for the views, stay for the craic, the 190 years, winter hours, named rooms, Murlough Cottage, the Fleadh Cheoil listing and GuestDiary all come from that site.</p>\n        <p>The hero is a disclosed AI visualisation based on the inn's own exterior photograph — not a documentary shot. Open or closed is worked out from published bar hours; the site has no full food-service schedule, so none is invented. The concept corrects one listing error: the phone shown is the inn's own 028 4372 9933.</p>\n        <p>This was not commissioned or approved by The Dundrum Inn. It is a free website idea: answer today on the first screen.</p>\n        <ul>\n          <li><a href=\"https://dundruminn.com/\" rel=\"external\">The Dundrum Inn public website</a></li>\n        </ul>\n        <a class=\"button\" href=\"/request/\">Request a free before-and-after for your business <span aria-hidden=\"true\">→</span></a>\n      </div>\n    </div>\n  </section>"
  },
  "kelly-mcevoy-brown": {
    "title": "Kelly, McEvoy & Brown concept transformation — Mourne Made",
    "description": "A respectful, source-backed before-and-after website concept for Kelly, McEvoy & Brown Building Contractors in Dundrum.",
    "eyebrow": "Website transformation · Dundrum",
    "headline": "Make fifty-three years of work visible.",
    "date": "24 July 2026",
    "comparisonIntro": "Drag the handle. Left: what tender buyers find today. Right: a first screen that shows fifty-three years of work as one record.",
    "conceptHref": "/concepts/kelly-mcevoy-brown/",
    "conceptLabel": "See the full website idea",
    "motion": {
      "slug": "kelly-mcevoy-brown",
      "beforeVideo": "/media/concepts/kelly-mcevoy-brown/kelly-mcevoy-brown-before.mp4",
      "afterVideo": "/media/concepts/kelly-mcevoy-brown/kelly-mcevoy-brown-after.mp4",
      "beforePoster": "/media/concepts/kelly-mcevoy-brown/kelly-mcevoy-brown-before.jpg",
      "afterPoster": "/media/concepts/kelly-mcevoy-brown/kelly-mcevoy-brown-after.jpg",
      "beforeAlt": "Ten-second visit to Kelly, McEvoy & Brown's current website — the small hand-built homepage carousel, then the portfolio page's six sector tiles, each opening its own project pages",
      "afterAlt": "Ten-second visit to the concept — the Build on experience opening with its fifty-three-year arc, the drawn patch map of completed places, and the project register with sector filters, photography and named projects"
    },
    "secondSurfacesHtml": [],
    "notesHeading": "Three changes to let the record do the selling.",
    "notes": [
      {
        "title": "Show fifty-three years in one register",
        "body": "Procurement teams checking a contractor should not click four pages to reach one building. The work is named and photographed — it just never appears as one body of work.",
        "change": "One register, filterable by sector, holds all thirteen projects with names, places and the firm's own photography — ready to scan before a tender."
      },
      {
        "title": "Lead with Build on experience",
        "body": "Established 1973, with named work from Magheralin to Dundrum — the opening screen should put that record first.",
        "change": "Build on experience — the firm's own line — over the fifty-three-year figure and the six sectors they work across."
      },
      {
        "title": "Put the evidence pack beside the phone",
        "body": "ISO 14001, Constructionline, SafeTCert, CEF and NHBC sit as footer logos, away from the project record and the number a buyer would dial.",
        "change": "Bring the marks up as the evidence a main contractor needs before inviting a tender, beside a clear enquiry route."
      }
    ],
    "sourceHtml": "<section class=\"source-section\">\n    <div class=\"shell source-grid\">\n      <div>\n        <p class=\"eyebrow\">Sources &amp; limits</p>\n        <h2>Clear about what is real.</h2>\n      </div>\n      <div>\n        <p>Captured from the public Kelly, McEvoy & Brown website on 24 July 2026. The 1973 establishment date, Build on experience line, six sectors, named projects and accreditation marks all come from that site.</p>\n        <p>The mark and project photography — Saint Patrick's & Saint Ronan's in Magheralin and Rowallane Credit Union in Saintfield — are the firm's own. The patch map is a hand-drawn sketch of places named on their site; two completed projects without a named town stay on the register, not on the map. Accreditation weights name each mark's plain procurement role and claim nothing further.</p>\n        <p>This was not commissioned or approved by Kelly, McEvoy & Brown. It is a free website idea: make fifty-three years of work visible for tender buyers.</p>\n        <ul>\n          <li><a href=\"https://www.kmbni.com/\" rel=\"external\">Kelly, McEvoy & Brown public website</a></li>\n        </ul>\n        <a class=\"button\" href=\"/request/\">Request a free before-and-after for your business <span aria-hidden=\"true\">→</span></a>\n      </div>\n    </div>\n  </section>"
  },
  "bettys-butters": {
    "title": "Betty's Better Butters concept transformation — Mourne Made",
    "description": "A respectful, source-backed before-and-after website concept for Betty's Better Butters in Dundrum.",
    "eyebrow": "Website transformation · Dundrum",
    "headline": "Show the food.",
    "date": "24 July 2026",
    "comparisonIntro": "Drag the handle. Left: what shoppers find today. Right: a first screen that shows the butter and the story.",
    "conceptHref": "/concepts/bettys-butters/",
    "conceptLabel": "See the full website idea",
    "motion": {
      "slug": "bettys-butters",
      "beforeVideo": "/media/concepts/bettys-butters/bettys-butters-before.mp4",
      "afterVideo": "/media/concepts/bettys-butters/bettys-butters-after.mp4",
      "beforePoster": "/media/concepts/bettys-butters/bettys-butters-before.jpg",
      "afterPoster": "/media/concepts/bettys-butters/bettys-butters-after.jpg",
      "beforeAlt": "Ten-second visit to Betty's Better Butters' current website — the two-page site whose navigation still reads Home Page and Our Store, with no product shown",
      "afterAlt": "Ten-second visit to the concept — Betty's mountain-ring mark, a butter-on-a-board photograph and an illustrative flavour range"
    },
    "secondSurfacesHtml": [],
    "notesHeading": "Three changes to put the product on the page.",
    "notes": [
      {
        "title": "Put the butter on the first screen",
        "body": "Today the site shows almost no product — navigation still reads Home Page and Our Store, and search results get a generic title.",
        "change": "A clear name, a butter-led opening, and a first screen that says what Betty makes."
      },
      {
        "title": "Show how the shelf could work",
        "body": "No flavours, sizes or prices are published yet, so shoppers cannot picture the range.",
        "change": "The maker's own butter photograph leads into an example range, ready for real names and prices when Betty supplies them."
      },
      {
        "title": "Lead with the story already written",
        "body": "Restaurant-quality flavours from ten years in professional kitchens are already Betty's words — easy to miss in the current layout.",
        "change": "Give that founder story room above the range, with collection, local delivery and Royal Mail easy to find."
      }
    ],
    "sourceHtml": "<section class=\"source-section\">\n    <div class=\"shell source-grid\">\n      <div>\n        <p class=\"eyebrow\">Sources &amp; limits</p>\n        <h2>Clear about what is real.</h2>\n      </div>\n      <div>\n        <p>Captured from the public Betty's Better Butters website on 24 July 2026. The mountain-ring mark and butter photograph are reused from that site; the founder story, Main Street address and delivery options are the maker's own words.</p>\n        <p>No product names, sizes or prices are published, so the flavours shown are examples of how a range could read — not Betty's real list. Serving plates and cubes are disclosed AI imagery.</p>\n        <p>This was not commissioned or approved by Betty's Better Butters. It is a free website idea: put the food on the page.</p>\n        <ul>\n          <li><a href=\"https://www.bettysbetterbutters.com/\" rel=\"external\">Betty's Better Butters public website</a></li>\n          <li><a href=\"https://www.bettysbetterbutters.com/our-store\" rel=\"external\">Store page, used to confirm delivery options</a></li>\n        </ul>\n        <a class=\"button\" href=\"/request/\">Request a free before-and-after for your business <span aria-hidden=\"true\">→</span></a>\n      </div>\n    </div>\n  </section>"
  },
  "douglas-cromie": {
    "title": "Douglas & Cromie concept transformation — Mourne Made",
    "description": "A respectful, source-backed before-and-after website concept for Douglas & Cromie Car Sales in Newcastle, Co. Down.",
    "eyebrow": "Website transformation · Newcastle, Co. Down",
    "headline": "Put the garage back at its own address.",
    "date": "24 July 2026",
    "comparisonIntro": "Drag the handle. The left stands in for what a customer currently finds — douglasandcromie.co.uk does not resolve, so there is no page to capture; the right shows the proposed first screen.",
    "conceptHref": "/concepts/douglas-cromie/",
    "conceptLabel": "See the full website idea",
    "motion": {
      "slug": "douglas-cromie",
      "afterVideo": "/media/concepts/douglas-cromie/douglas-cromie-after.mp4",
      "beforePoster": "/media/concepts/douglas-cromie/douglas-cromie-before.jpg",
      "afterPoster": "/media/concepts/douglas-cromie/douglas-cromie-after.jpg",
      "beforeAlt": "A muted card standing in for douglasandcromie.co.uk, which does not resolve — the domain returns no page at all",
      "afterAlt": "Ten-second view of the website idea — Douglas & Cromie's own wordmark and vehicle photography beside a Drive away with confidence opening",
      "beforeNote": "Douglas & Cromie's domain does not resolve at all — typing douglasandcromie.co.uk returns no page. Search engines still show a cached title, so the dealer appears to have a website and has none. There is no live site to demo; the panel on the left is a muted stand-in for a domain that answers nothing."
    },
    "secondSurfacesHtml": [],
    "notesHeading": "Three changes that put the garage back on the map.",
    "notes": [
      {
        "title": "Search still promises a website that is not there",
        "body": "Their old address still appears in search with a cached title. Follow it and nothing loads — apex or www.",
        "change": "A working page at an address they control, so people already looking for them land somewhere useful."
      },
      {
        "title": "The garage already had a look people would recognise",
        "body": "Their January 2024 homepage had a clear wordmark, colours, photography and a straightforward offer.",
        "change": "Bring that identity back as the front door, instead of leaving it stranded in an archive."
      },
      {
        "title": "Phone, hours and the workshop should be obvious",
        "body": "Someone ready to call or visit should not have to dig. The next step belongs on the first screen.",
        "change": "Put call, hours, directions and workshop services where they can be acted on immediately."
      }
    ],
    "sourceHtml": "<section class=\"source-section\">\n    <div class=\"shell source-grid\">\n      <div>\n        <p class=\"eyebrow\">Sources &amp; limits</p>\n        <h2>Clear about what is real.</h2>\n      </div>\n      <div>\n        <p>In July 2026 their domain did not resolve, so the before panel is a stand-in — there was no live page to capture.</p>\n        <p>The website idea uses identity and wording from their January 2024 public homepage (via the Internet Archive). Used Cars NI still lists the garage at Bryansford, which is how we know they are trading.</p>\n        <p>This was not commissioned or approved by Douglas &amp; Cromie.</p>\n        <ul>\n          <li><a href=\"https://web.archive.org/web/20240117041804/http://www.douglasandcromie.co.uk/\" rel=\"external\">Archived Douglas &amp; Cromie homepage</a></li>\n          <li><a href=\"https://www.usedcarsni.com/search_results.php?dealer=26586938&amp;search_type=1\" rel=\"external\">Used Cars NI dealer profile</a></li>\n        </ul>\n        <a class=\"button\" href=\"/request/\">Request a free before-and-after for your business <span aria-hidden=\"true\">→</span></a>\n      </div>\n    </div>\n  </section>"
  },
  "donard-hotel": {
    "title": "The Donard Hotel concept transformation — Mourne Made",
    "description": "A respectful, source-backed property-first feature concept for The Donard in Newcastle, Co. Down.",
    "eyebrow": "Website feature · Newcastle, Co. Down",
    "headline": "Put the hotel before the destination.",
    "date": "27 July 2026",
    "comparisonIntro": "Drag the handle. Left: The Donard's current official homepage. Right: a property-first feature that keeps its identity and booking route.",
    "conceptHref": "/concepts/donard-hotel/",
    "conceptLabel": "See the full website idea",
    "motion": {
      "slug": "donard-hotel",
      "afterVideo": "/media/concepts/donard-hotel/donard-hotel-after.mp4",
      "beforePoster": "/media/concepts/donard-hotel/donard-hotel-before.jpg",
      "afterPoster": "/media/concepts/donard-hotel/donard-hotel-after.jpg",
      "beforeAlt": "Ten-second visit to The Donard's current official homepage — the navy-and-gold building logo, wide Mournes landscape, welcome line and booking search",
      "afterAlt": "View of the feature concept — The Donard's navy-and-gold identity, a disclosed visualisation of its Main Street frontage, published room rates and an official booking handoff",
      "beforeNote": "The build-day re-check found a new official website at thedonard.co.uk, including a working booking search. That evidence retires the original first-website premise. The live page shown here is the new baseline, not the dead domain captured three days earlier."
    },
    "secondSurfacesHtml": [],
    "notesHeading": "Three changes to make the hotel recognisable sooner.",
    "notes": [
      {
        "title": "Show the hotel, not only the destination",
        "body": "The official homepage opens on a wide Mournes landscape. It sets the place beautifully, but the first screen does not show the red-brick Main Street building a guest will arrive at.",
        "change": "A property-first opening from a disclosed visualisation of the real frontage, so the first frame belongs to this hotel."
      },
      {
        "title": "Keep the identity the hotel chose",
        "body": "Deep navy, soft gold, a line drawing of the corner turret and ESTD 1946 — the official site already has a clear look.",
        "change": "Carry that navy, gold, wide-spaced name and founding date. Do not reuse the unlicensed logo artwork or invent a studio crest."
      },
      {
        "title": "Keep direct booking, add room context",
        "body": "The current site already puts its booking search on the first screen. Replacing that working route would solve nothing.",
        "change": "Keep the official engine as the handoff and place the hotel's published starting rates beside it."
      }
    ],
    "sourceHtml": "<section class=\"source-section\">\n    <div class=\"shell source-grid\">\n      <div>\n        <p class=\"eyebrow\">Sources &amp; limits</p>\n        <h2>Clear about what is real.</h2>\n      </div>\n      <div>\n        <p>On 27 July 2026 The Donard had a new official site at thedonard.co.uk — navy-and-gold identity, property pages and a working booking search. Room count, types and starting rates come from that Rooms page. An earlier dead-domain capture is kept only as dated case-study history.</p>\n        <p>The exterior hero is a disclosed generated visualisation based on Eric Jones's 2023 Main Street photograph (CC BY-SA 2.0). Shutters are shown open and parked cars removed; it is not a documentary photograph. The hotel logo informed the palette and ESTD 1946 date; the unlicensed artwork itself is not reused.</p>\n        <p>This was not commissioned or approved by The Donard. It is a free website idea: put the hotel before the destination.</p>\n        <ul>\n          <li><a href=\"https://www.thedonard.co.uk/\" rel=\"external\">The Donard's current official homepage and booking search</a></li>\n          <li><a href=\"https://www.thedonard.co.uk/bedrooms\" rel=\"external\">Official Rooms page used for room types and starting rates</a></li>\n          <li><a href=\"https://www.geograph.org.uk/photo/7440264\" rel=\"external\">Eric Jones's source photograph, CC BY-SA 2.0</a></li>\n        </ul>\n        <a class=\"button\" href=\"/request/\">Request a free before-and-after for your business <span aria-hidden=\"true\">→</span></a>\n      </div>\n    </div>\n  </section>"
  },
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
  "bucks-head": {
    "title": "The Bucks Head concept transformation — Mourne Made",
    "description": "A respectful, source-backed before-and-after website concept for The Bucks Head in Dundrum.",
    "eyebrow": "Website transformation · Dundrum",
    "headline": "Make booking as warm as the welcome.",
    "date": "21 July 2026",
    "comparisonIntro": "Drag the handle. Left: what diners find today. Right: a first screen with booking beside the welcome.",
    "conceptHref": "/concepts/bucks-head/",
    "conceptLabel": "See the full website idea",
    "motion": {
      "slug": "bucks-head",
      "beforeVideo": "/media/concepts/bucks-head/bucks-head-before.mp4",
      "afterVideo": "/media/concepts/bucks-head/bucks-head-after.mp4",
      "beforePoster": "/media/concepts/bucks-head/bucks-head-before.jpg",
      "afterPoster": "/media/concepts/bucks-head/bucks-head-after.jpg",
      "beforeAlt": "Ten-second visit to The Bucks Head's current website — the owners' photograph, a scroll down the page and a menus hover",
      "afterAlt": "Ten-second visit to The Bucks Head concept — the Old Charm Modern Flare opening, the book-a-table card over the hearth and the menus list"
    },
    "journeys": {
      "eyebrow": "Measured 24 July 2026 · walked at 390 × 844",
      "heading": "Two journeys, walked on a phone.",
      "intro": "The Bucks Head's website is current, well photographed and actively maintained — this is not a case for rebuilding it. The gap we could measure is the walk to the two things people arrive wanting: a table and tonight's menu. Both errands below were walked on the live site and on the concept the same morning, and every figure is a count from that walk.",
      "tableCaption": "Counts from the build-day audit. Both booking journeys finish in the same place — the pub's own ResDiary widget.",
      "errands": [
        {
          "label": "Book a table for two, Saturday evening",
          "endsAt": "the ResDiary widget, ready to choose a time",
          "before": "2 taps · 4 screens",
          "beforeNote": "Open the menu, tap Bookings, then read past the booking notes to reach an engine that opens on today's date, with nothing the guest was after carried in.",
          "after": "1 tap · 2 screens",
          "afterNote": "Date and party chosen on the page already open, then one tap into the same ResDiary engine with both carried across."
        },
        {
          "label": "Read the à la carte",
          "endsAt": "the à la carte, readable",
          "before": "3 taps · 4 screens",
          "beforeNote": "Open the menu, tap Menus, tap A La Carte — and arrive at an A4 PDF that has to shrink by half to fit the screen.",
          "after": "1 tap · 2 screens",
          "afterNote": "The hero's menus link sits on the first screen; dishes, descriptions and prices then read as a page, in the pub's own type."
        }
      ],
      "measures": [
        "On the current homepage the first Book A Table sits 2,254 pixels down — 2.7 phone screens below the opening view of a 4,241-pixel page.",
        "The bookings page opens on its Important Booking Notes: the ResDiary widget begins 399 pixels down, and its time list falls below the first screen.",
        "The à la carte is a one-page A4 PDF, 794 CSS pixels wide. Fitting it to a 390-pixel phone shrinks it to 49 per cent.",
        "Both booking journeys were stopped at the widget's date and party stage. No personal details were entered and no reservation was made."
      ],
      "film": {
        "video": "/media/concepts/bucks-head/bucks-head-journey.mp4",
        "poster": "/media/concepts/bucks-head/bucks-head-journey-poster.jpg",
        "alt": "Silent side-by-side film of two phone journeys — booking a table and reading the à la carte — walked on The Bucks Head's current website and on the concept, with the tap counts for each side",
        "heading": "Both errands, side by side.",
        "intro": "The two walks, filmed at phone size. Every step is held for exactly the same time on both sides and page-loading is never filmed, so the only thing that varies is how many steps the errand takes.",
        "duration": "About 50 seconds",
        "eyebrow": "Journey film",
        "note": "Independent concept study. Not commissioned by The Bucks Head."
      }
    },
    "secondSurfacesHtml": [
      "<section class=\"second-surface\">\n    <div class=\"shell\">\n      <div class=\"second-surface-intro\">\n        <div>\n          <p class=\"second-surface-label\">Menus</p>\n          <h2>The menus, on the page.</h2>\n        </div>\n        <p>Five menus currently live as PDF downloads — no dish is readable without opening a file. The separate concept page puts every section on the page: browsable tabs, dish names and descriptions in the pub's own design language, with a booking card within reach throughout.</p>\n      </div>\n      <div class=\"second-surface-frame\">\n        <img\n          src=\"/media/concepts/bucks-head/bucks-head-menus-after.jpg\"\n          alt=\"The Bucks Head menus concept screen: spruce-green tab rail across the top with À la carte selected, two-column dish listing in cream below, and a booking sidebar on the right\"\n          width=\"1265\"\n          height=\"710\"\n        />\n      </div>\n      <p class=\"second-surface-caption\">Concept only · illustrative dishes drawn from publicly available menus · not a live menu feed</p>\n      <a class=\"text-link concept-link\" href=\"/concepts/bucks-head/menus/\">Browse the menus concept <span aria-hidden=\"true\">→</span></a>\n    </div>\n  </section>"
    ],
    "notesHeading": "Three changes to turn looking into booking.",
    "notes": [
      {
        "title": "Say the welcome out loud",
        "body": "Today a photograph of the owners above Dundrum Bay does all the work. No headline, hours, address or booking action appears before a visitor scrolls.",
        "change": "The same welcome in the pub's own words — old charm meets modern flare, Bronagh and Alex named — with hours and phone along the top."
      },
      {
        "title": "Start booking on the first screen",
        "body": "Book A Table opens on Important Booking Notes before the ResDiary widget appears below them.",
        "change": "A booking card on the first screen — date and party — passing into the same ResDiary system the pub already runs, with the party-size limit as one calm line."
      },
      {
        "title": "Put the menus on the page",
        "body": "Five menus are PDF downloads, so no dish can be read without opening a file.",
        "change": "A menus list across the bottom of the page, set to be read on the page rather than downloaded."
      }
    ],
    "sourceHtml": "<section class=\"source-section\">\n    <div class=\"shell source-grid\">\n      <div>\n        <p class=\"eyebrow\">Sources &amp; limits</p>\n        <h2>Clear about what is real.</h2>\n      </div>\n      <div>\n        <p>Captured from the public Bucks Head website on 21 July 2026. Identity comes from the pub's own building — spruce-green frontage, blush-pink lettering and the antler mark. Opening line, owners' names, party-size policy, menu names, hours, address and phone all come from their published pages.</p>\n        <p>The hearth image is a disclosed AI visualisation of the pub's real photographed hearth. Menu dishes are adapted from public menus and labelled as illustrative. Booking hands to the ResDiary system the pub already runs.</p>\n        <p>This was not commissioned or approved by The Bucks Head. It is a free website idea: make booking as warm as the welcome.</p>\n        <ul>\n          <li><a href=\"https://thebucksheaddundrum.co.uk/\" rel=\"external\">The Bucks Head public website</a></li>\n          <li><a href=\"https://www.tripadvisor.ie/Restaurant_Review-g1477857-d1185069\" rel=\"external\">TripAdvisor listing used to verify current trading</a></li>\n        </ul>\n        <a class=\"button\" href=\"/request/\">Request a free before-and-after for your business <span aria-hidden=\"true\">→</span></a>\n      </div>\n    </div>\n  </section>"
  },
  "castle-farm": {
    "title": "Castle Farm concept transformation — Mourne Made",
    "description": "A respectful, source-backed before-and-after website concept for Castle Farm Fresh Produce in Dundrum.",
    "eyebrow": "Website transformation · Dundrum",
    "headline": "Show the week the farm actually runs.",
    "date": "17 July 2026",
    "comparisonIntro": "Drag the handle. Left: what shoppers find today. Right: a first screen that shows the week the farm runs.",
    "conceptHref": "/concepts/castle-farm/",
    "conceptLabel": "See the full website idea",
    "motion": {
      "slug": "castle-farm",
      "beforeVideo": "/media/concepts/castle-farm/castle-farm-before.mp4",
      "afterVideo": "/media/concepts/castle-farm/castle-farm-after.mp4",
      "beforePoster": "/media/concepts/castle-farm/castle-farm-before.jpg",
      "afterPoster": "/media/concepts/castle-farm/castle-farm-after.jpg",
      "beforeAlt": "Ten-second visit to Castle Farm's current website — the opening screen, a scroll through the produce boxes and a menu hover",
      "afterAlt": "Ten-second visit to the Castle Farm concept — Let us worry about digging it up. over the week's table plate, then this week's round: the two published cutoffs, the delivery days with their named towns, the published minimums and the is-your-town-on-it lookup"
    },
    "secondSurfacesHtml": [],
    "notesHeading": "Three changes to put the farm's own week on the page.",
    "notes": [
      {
        "title": "Give the business the opening moment",
        "body": "A newsletter request currently sits above the farm, before a visitor has had time to understand what is on offer.",
        "change": "Open on the farm's own sentence — Let us worry about digging it up. — beside the family story and online ordering since 2008."
      },
      {
        "title": "Make every control do something",
        "body": "Several layers compete at once on arrival, so the route into the working shop is harder to see than it needs to be.",
        "change": "One primary action — shop this week's produce — pointing at the farm's own store, with no basket that leads nowhere."
      },
      {
        "title": "Put the weekly round on the page",
        "body": "The delivery schedule is published in full but as dense paragraphs of town names — hard to scan for your own day.",
        "change": "The round day by day with the towns the farm names, the two 3pm cutoffs, published minimums and a lookup: is your town on it, and when?"
      }
    ],
    "sourceHtml": "<section class=\"source-section\">\n    <div class=\"shell source-grid\">\n      <div>\n        <p class=\"eyebrow\">Sources &amp; limits</p>\n        <h2>Clear about what is real.</h2>\n      </div>\n      <div>\n        <p>Captured from the public Castle Farm website on 23 July 2026. Wording, delivery days, towns, 3pm cutoffs, minimums and the £4 delivery fee come from the farm's About and Delivery pages as read on 4 August 2026 — live facts that move, so the page links to their schedule as the source of truth.</p>\n        <p>The opening image is a disclosed AI plate of a possible week's table from the farm's published food categories — not a photograph of Castle Farm or an exact current box. Every commerce control hands off to castlefarmni.com; there is no basket here. Box prices are not quoted — they link to the live listings instead.</p>\n        <p>This was not commissioned or approved by Castle Farm. It is a free website idea: show the week the farm actually runs.</p>\n        <ul>\n          <li><a href=\"https://www.castlefarmni.com/\" rel=\"external\">Castle Farm public website</a></li>\n          <li><a href=\"https://www.castlefarmni.com/pages/delivery-schedule\" rel=\"external\">Delivery schedule and terms</a></li>\n          <li><a href=\"https://www.castlefarmni.com/collections/meal-deal-boxes\" rel=\"external\">Meal-deal box listings</a></li>\n        </ul>\n        <a class=\"button\" href=\"/request/\">Request a free before-and-after for your business <span aria-hidden=\"true\">→</span></a>\n      </div>\n    </div>\n  </section>"
  },
  "painted-earth": {
    "title": "Painted Earth concept transformation — Mourne Made",
    "description": "A respectful, source-backed before-and-after website concept for Painted Earth, the gift shop and art gallery on Main Street, Newcastle.",
    "eyebrow": "Website transformation · Newcastle",
    "headline": "Know what happens before checkout.",
    "date": "3 August 2026",
    "comparisonIntro": "Drag the handle. Left: what shoppers find today. Right: a first screen that says what happens before checkout.",
    "conceptHref": "/concepts/painted-earth/",
    "conceptLabel": "See the full website idea",
    "motion": {
      "slug": "painted-earth",
      "beforeVideo": "/media/concepts/painted-earth/painted-earth-before.mp4",
      "afterVideo": "/media/concepts/painted-earth/painted-earth-after.mp4",
      "beforePoster": "/media/concepts/painted-earth/painted-earth-before.jpg",
      "afterPoster": "/media/concepts/painted-earth/painted-earth-after.jpg",
      "beforeAlt": "Ten-second visit to Painted Earth's current shop — the rotating workshop banner, then the Shop Collections menu opening into lists of maker names",
      "afterAlt": "Ten-second visit to the concept — the What are you looking for? opening, then the original-art shelf showing collection and shipping terms against each piece"
    },
    "secondSurfacesHtml": [],
    "notesHeading": "Three changes for the work that costs the most.",
    "notes": [
      {
        "title": "Say how an original gets home",
        "body": "An expensive oil can carry COLLECTION ONLY and a shipping warning inside the description — under an Add to Cart button that looks the same as a greeting card.",
        "change": "Collection, shipping-quote and no-returns terms sit against each original before the buying action, not underneath it."
      },
      {
        "title": "Give sold work somewhere to go",
        "body": "Hundreds of originals are listed and many have already sold. Landing on one from a search or share reaches a full stop.",
        "change": "A sold piece offers available work by the same artist and the gallery's current collection, so the visit continues."
      },
      {
        "title": "Start from the piece, not the maker",
        "body": "The shop already has working filters for price, artist, product type and stock. The menu asks first which of many makers you want — useful only if you already know them.",
        "change": "Product, occasion and price lead the way in; place stays as an optional local route; the shop's existing filters are named on the page rather than replaced."
      }
    ],
    "sourceHtml": "<section class=\"source-section\">\n    <div class=\"shell source-grid\">\n      <div>\n        <p class=\"eyebrow\">Sources &amp; limits</p>\n        <h2>Clear about what is real.</h2>\n      </div>\n      <div>\n        <p>Captured from the public Painted Earth shop on 3 August 2026. Address, hours, phone, shipping and returns terms, artwork titles, artists, prices and sold status come from the shop's own pages. The gallery sentence and visitor review are quoted from the Art &amp; Craft Gallery page, read on 6 August 2026 — that page publishes no review dates, so none are shown.</p>\n        <p>No artwork is shown. Every tile is a drawn placeholder: Painted Earth sells work by many makers and the shop does not hold publishable rights to all of that photography. Each tile links to the real product on their site.</p>\n        <p>This was not commissioned or approved by Painted Earth. It is a free website idea: make fulfilment clear before checkout on original art.</p>\n        <ul>\n          <li><a href=\"https://www.paintedearthgifts.com/\" rel=\"external\">Painted Earth public shop</a></li>\n        </ul>\n        <a class=\"button\" href=\"/request/\">Request a free before-and-after for your business <span aria-hidden=\"true\">→</span></a>\n      </div>\n    </div>\n  </section>"
  },
  "cupla": {
    "title": "Cúpla concept transformation — Mourne Made",
    "description": "A respectful, source-backed first-website concept for Cúpla, the bilingual café in Dundrum.",
    "eyebrow": "First website · Dundrum",
    "headline": "Open the door in both languages.",
    "date": "21 July 2026",
    "comparisonIntro": "Drag the handle. Left: what a first-time visitor finds today — the café's Facebook page without an account. Right: a bilingual first screen.",
    "conceptHref": "/concepts/cupla/",
    "conceptLabel": "See the full website idea",
    "motion": {
      "slug": "cupla",
      "afterVideo": "/media/concepts/cupla/cupla-after.mp4",
      "beforePoster": "/media/concepts/cupla/cupla-before.jpg",
      "afterPoster": "/media/concepts/cupla/cupla-after.jpg",
      "beforeAlt": "Cúpla's current public presence: its Facebook page covered by Meta's cookie consent dialog and login form, with the café's name and tagline greyed out behind them",
      "afterAlt": "Ten-second visit to the Cúpla concept — the bilingual Fáilte isteach opening beside a visualisation of the CÚPLA shopfront, then the counter's day in two beats and the paired Irish-and-English labels"
    },
    "secondSurfacesHtml": [
      "<section class=\"second-surface\">\n    <div class=\"shell\">\n      <div class=\"second-surface-intro\">\n        <div>\n          <p class=\"second-surface-label\">Menu</p>\n          <h2>The bilingual menu.</h2>\n        </div>\n        <p>The café's offer — coffees, morning bakes and brunch bowls — written out in both languages as a card that could be printed or used at the counter, so the menu is as bilingual as the name itself.</p>\n      </div>\n      <div class=\"second-surface-frame\">\n        <img\n          src=\"/media/concepts/cupla/cupla-menu-after.jpg\"\n          alt=\"The bilingual Cúpla menu card: three columns on an oat background — Caife (Coffee), Bácús (Morning bakes), Babhlaí (Brunch bowls) — each with Irish item names in Vollkorn italic and English descriptors beside prices, anchored by a caramel specials strip at the foot\"\n          width=\"1265\"\n          height=\"710\"\n        />\n      </div>\n      <p class=\"second-surface-caption\">\n        <a class=\"text-link\" href=\"/concepts/cupla/menu/\">Open the bilingual menu card <span aria-hidden=\"true\">→</span></a>\n      </p>\n    </div>\n  </section>"
    ],
    "notesHeading": "Three changes to serve both languages.",
    "notes": [
      {
        "title": "Open the door, not a login form",
        "body": "Cúpla has no website. Its Facebook page greets a first-time visitor with Meta's cookie dialog and a login form — the café's name and Brews, Bakes & Bowls sit greyed out behind them.",
        "change": "A first screen that opens the door instead — Fáilte isteach — with the café's own three-word tagline structuring the page."
      },
      {
        "title": "Let the name explain the café",
        "body": "Cúpla is the Irish word for twins, reflecting the twin owners who founded it in 2024. On the current public page that connection is easy to miss.",
        "change": "Build the identity around the pair: twin rings in the mark, Irish first and English beside it, and a short story from the name, the twin owners and Est. 2024."
      },
      {
        "title": "Answer the passer-by's three questions",
        "body": "What's on the counter, when it opens and where it is live only as feed posts, so someone deciding on a whim has to scroll.",
        "change": "The counter's day in two beats — morning bakes into brunch bowls — with today's counter and hours pointing at the Instagram the café already runs."
      }
    ],
    "sourceHtml": "<section class=\"source-section\">\n    <div class=\"shell source-grid\">\n      <div>\n        <p class=\"eyebrow\">Sources &amp; limits</p>\n        <h2>Clear about what is real.</h2>\n      </div>\n      <div>\n        <p>Captured from the café's public Facebook page on 21 July 2026, with Meta's cookie dialog and login prompt left in place. Name, Brews, Bakes &amp; Bowls, the twin founders, 2024 founding and Main Street address come from public pages, Companies House and the food-hygiene register.</p>\n        <p>The shopfront is an AI-generated visualisation, faithful to a photograph of the premises taken in August 2024 and captioned as generated where it appears. The twin-ring mark and Irish phrasing are concept work — the café's own bilingual voice would replace them. The café's three words are quoted from its public pages, read 21 July 2026; no opening hour or day's special is stated here.</p>\n        <p>This was not commissioned or approved by Cúpla. It is a free website idea: open the door in both languages.</p>\n        <ul>\n          <li><a href=\"https://www.facebook.com/p/C%C3%BApla-61565293502528/\" rel=\"external\">Cúpla public Facebook page</a></li>\n          <li><a href=\"https://find-and-update.company-information.service.gov.uk/company/NI711705\" rel=\"external\">Companies House record used to verify the business</a></li>\n          <li><a href=\"https://ratings.food.gov.uk/business/1783241/cpla-bais-newcastle\" rel=\"external\">Food hygiene listing used to verify the premises</a></li>\n        </ul>\n        <a class=\"button\" href=\"/request/\">Request a free before-and-after for your business <span aria-hidden=\"true\">→</span></a>\n      </div>\n    </div>\n  </section>"
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
  "kent-amusements": {
    "title": "Kent Amusements concept transformation — Mourne Made",
    "description": "A respectful, source-backed first-website concept for Kent Amusements, the seaside arcade on Newcastle's Central Promenade.",
    "eyebrow": "First website · Newcastle",
    "headline": "The machines change. The summer doesn't.",
    "date": "22 July 2026",
    "comparisonIntro": "Drag the handle. Left: what a first-time visitor finds today — the arcade's Facebook page without an account. Right: a first screen for this promenade arcade.",
    "conceptHref": "/concepts/kent-amusements/",
    "conceptLabel": "See the full website idea",
    "motion": {
      "slug": "kent-amusements",
      "afterVideo": "/media/concepts/kent-amusements/kent-amusements-after.mp4",
      "beforePoster": "/media/concepts/kent-amusements/kent-amusements-before.jpg",
      "afterPoster": "/media/concepts/kent-amusements/kent-amusements-after.jpg",
      "beforeAlt": "Kent Amusements' current public presence: its Facebook page covered by Meta's cookie consent dialog and login form, with the arcade's introduction greyed out behind them",
      "afterAlt": "Ten-second visit to the Kent Amusements concept — the machines-change opening beside a generated promenade plate, the late-1960s memory below, the dated fifty-summers band and the staged afternoon"
    },
    "secondSurfacesHtml": [
      "<section class=\"second-surface\">\n    <div class=\"shell\">\n      <p class=\"second-surface-label\">What's inside</p>\n      <div class=\"second-surface-intro\">\n        <div>\n          <h2>Three attractions, each carrying where it is verified from.</h2>\n          <p>The companion screen keeps the list closed to what the record holds — indoor dodgems, the VR zone new in 2026, arcade machines — and names the source under each one. Beside them is the season panel that replaced the three empty hours rows, and the Avoca Hotel's description, still attributed to the Avoca.</p>\n        </div>\n        <a class=\"text-link\" href=\"/concepts/kent-amusements/attractions/\">View the attractions screen <span aria-hidden=\"true\">→</span></a>\n      </div>\n      <div class=\"second-surface-frame\">\n        <img\n          src=\"/media/concepts/kent-amusements/kent-amusements-attractions-after.jpg\"\n          alt=\"Kent Amusements attractions concept: three attraction cards — dodgems, VR games and arcade — each with the source it is verified from, beside a seasonal-hours panel and the Avoca Hotel's attributed description\"\n          width=\"1265\"\n          height=\"710\"\n        />\n      </div>\n      <p class=\"second-surface-caption\">A companion to the opening page: the attractions named with their sources, and one honest panel where three empty rows used to be.</p>\n    </div>\n  </section>"
    ],
    "notesHeading": "Five changes to put this arcade, and no other, out front.",
    "notes": [
      {
        "title": "Let the town remember it out loud",
        "body": "The arcade has no first-party sentence on the open web — only Facebook and Instagram behind Meta's login. The BBC's Your Place and Mine archive holds Newcastle memories of this arcade, including a late-sixties summer worker.",
        "change": "That memory quoted as a supporting band below the opening, with who is speaking, the era, the archive and a link. The Avoca Hotel's present-tense description sits beside it, attributed to the Avoca."
      },
      {
        "title": "Put fifty summers on the page, dated at both ends",
        "body": "The strongest fact — over fifty years on the same site — was easy to miss as a slogan, with no dated arc from the late sixties to a VR zone new in 2026.",
        "change": "A two-stop timeline from c. 1968 to the 2026 VR launch. No invented milestones."
      },
      {
        "title": "Stage the afternoon instead of listing the attractions",
        "body": "Dodgems, VR and arcade machines are the three verified attractions — and the three every seaside arcade would list.",
        "change": "A comic storyboard of one indicative afternoon on this promenade. Nothing is added to the record — no tokens, tickets, prices or packages."
      },
      {
        "title": "Replace the empty hours board with the honest season panel",
        "body": "No confirmed seasonal hours exist in any source. Earlier invented hours were withdrawn.",
        "change": "One panel that states the real ritual — hours move with the season and are posted on Facebook as they change — and hands today's answer to that page."
      },
      {
        "title": "Put the promenade back into the picture",
        "body": "Without a frontage image, the page could describe Central Promenade without showing the place that makes the arcade recognisable.",
        "change": "Two generated illustrative promenade plates beside the brand, labelled as generated artwork and indicative, not a survey."
      }
    ],
    "sourceHtml": "<section class=\"source-section\">\n    <div class=\"shell source-grid\">\n      <div>\n        <p class=\"eyebrow\">Sources &amp; limits</p>\n        <h2>Clear about what is real.</h2>\n      </div>\n      <div>\n        <p>Captured from the arcade's public Facebook page on 22 July 2026, with Meta's cookie dialog and login prompt left in place. Address and company are confirmed by Companies House (NI688147). Longevity on the promenade and the March 2026 VR mention come from public listings.</p>\n        <p>The late-1960s change-booth and juke-box memories are quoted from the BBC Your Place and Mine Newcastle archive, re-read 4 August 2026. The change-booth memory is quoted with its shift hours elided, and the page says so — those figures would read as opening hours. The Avoca Hotel description is quoted and attributed; premier and indoor-dodgems scarcity stay the Avoca's claims. No opening time appears on either screen.</p>\n        <p>Home and attractions carry generated illustrative promenade plates — labelled as AI-generated artwork and indicative, not a survey. Dodgems, VR and arcade machines are the closed attractions list. The K-and-A mark is concept work. This was not commissioned or approved by Kent Amusements. It is a free website idea: put this arcade, and no other, out front.</p>\n        <ul>\n          <li><a href=\"https://www.facebook.com/kentamusementsnewcastle/\" rel=\"external\">Kent Amusements public Facebook page</a></li>\n          <li><a href=\"https://www.instagram.com/kentamusementsnewcastle/\" rel=\"external\">Kent Amusements Instagram</a></li>\n          <li><a href=\"https://www.tripadvisor.com/Attraction_Review-g186478-d14073725\" rel=\"external\">TripAdvisor listing used to verify current trading and VR</a></li>\n          <li><a href=\"https://find-and-update.company-information.service.gov.uk/company/NI688147\" rel=\"external\">Companies House record used to verify the business, the address and the November 2025 filing</a></li>\n          <li><a href=\"https://avocahotel.com/activities/uncategorized/kent-amusements/\" rel=\"external\">Avoca Hotel activities listing used for the quoted description, indoor dodgems and phone</a></li>\n          <li><a href=\"https://www.bbc.co.uk/northernireland/yourplaceandmine/down/A781698.shtml\" rel=\"external\">BBC Your Place and Mine memory archive used for the two quoted Newcastle memories</a></li>\n        </ul>\n        <a class=\"button\" href=\"/request/\">Request a free before-and-after for your business <span aria-hidden=\"true\">→</span></a>\n      </div>\n    </div>\n  </section>"
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
  "tool-centre": {
    "title": "The Tool Centre concept transformation — Mourne Made",
    "description": "A respectful, source-backed first-website concept for The Tool Centre, the hardware and plant-hire shop on Main Street, Newcastle, Co. Down.",
    "eyebrow": "First website · Newcastle, Co. Down",
    "headline": "A trade counter that does not need a login.",
    "date": "22 July 2026",
    "comparisonIntro": "Drag the handle. Left: what a first-time visitor finds today — the shop's Facebook page without an account. Right: a trade-counter first screen that does not need a login.",
    "conceptHref": "/concepts/tool-centre/",
    "conceptLabel": "See the full website idea",
    "motion": {
      "slug": "tool-centre",
      "afterVideo": "/media/concepts/tool-centre/tool-centre-after.mp4",
      "beforePoster": "/media/concepts/tool-centre/tool-centre-before.jpg",
      "afterPoster": "/media/concepts/tool-centre/tool-centre-after.jpg",
      "beforeAlt": "The Tool Centre's current public presence: its Facebook page covered by Meta's cookie consent dialog and login form, with the shop's introduction greyed out behind them",
      "afterAlt": "Ten-second visit to The Tool Centre concept — the Hardware on the shelf, Hire on the yard opening with a customer's Google review sentence, the hire-desk board that asks callers to ring, and the shelf-and-yard band with a call action underneath"
    },
    "secondSurfacesHtml": [
      "<section class=\"second-surface\">\n    <div class=\"shell\">\n      <div class=\"second-surface-intro\">\n        <div>\n          <p class=\"second-surface-label\">Hire list</p>\n          <h2>A standalone hire-rate sheet.</h2>\n          <p>The hire desk on the opening page asks callers to ring for day rates. A separate page gives that list a permanent address — four categories of plant and tools, suggested day rates for the counter to correct, and one call button using the same counter number.</p>\n        </div>\n        <a class=\"text-link\" href=\"/concepts/tool-centre/hire-list/\">View the hire list concept <span aria-hidden=\"true\">→</span></a>\n      </div>\n      <div class=\"second-surface-frame\">\n        <img src=\"/media/concepts/tool-centre/tool-centre-hire-list-after.jpg\" alt=\"The Tool Centre hire list concept: a two-column price sheet in yard black and badge yellow, showing four hire categories — power tools, garden machinery, plant and site, access equipment — with indicative day rates and a call panel in the sidebar\" width=\"1265\" height=\"710\" loading=\"lazy\" />\n      </div>\n      <p class=\"second-surface-caption\">Hire price list · suggested rates in four categories, none of them the shop's own · same phone number as the opening page</p>\n    </div>\n  </section>"
    ],
    "notesHeading": "Three changes to put the yard out front.",
    "notes": [
      {
        "title": "Put the counter in front of the login",
        "body": "No working website was found. Searching lands on a Facebook page behind Meta's cookie dialog and login form, while results also include same-named shops in Newcastle-upon-Tyne.",
        "change": "A first screen that opens on the Co. Down address, with hire and stock reachable without an account — Newcastle, Co. Down named plainly so the Mourne shop is never mistaken for the Tyne ones."
      },
      {
        "title": "Lead with the two offers",
        "body": "Directories list The Tool Centre; Facebook trades as Tool Centre Plant Hire. Online, hardware retail and plant/tool hire can look like two businesses.",
        "change": "Both screens end on a shelf-and-yard band: hardware & DIY beside plant & tool hire, with one call button. Co. Down is repeated wherever a stranger meets the shop."
      },
      {
        "title": "Make the hire desk the first action",
        "body": "Public pages and directories do not give a contractor one clear place to compare hire categories, rates and opening hours.",
        "change": "A hire-desk board with the four categories and a call action opening the number the yard already answers — Facebook still carries day-to-day updates."
      }
    ],
    "sourceHtml": "<section class=\"source-section\">\n    <div class=\"shell source-grid\">\n      <div>\n        <p class=\"eyebrow\">Sources &amp; limits</p>\n        <h2>Clear about what is real.</h2>\n      </div>\n      <div>\n        <p>Captured from the shop's public Facebook page on 22 July 2026, with Meta's cookie dialog and login prompt left in place. Main Street address, phone, seven-day hours, Calor gas retail and the dual hardware/plant-hire offering come from public directories and the Calor dealer listing.</p>\n        <p>The hire desk shows no figure; the hire list carries suggested day rates labelled Suggested. Both screens carry the same sentence: &quot;No rate here is the shop's own — call the counter for today's rate and terms.&quot; None of those figures came from the shop. Two Google reviews (read 6 August 2026) supply the customer sentences, quoted and attributed with month and year — no star rating is stated. The yellow-and-black mark is concept work suggested by the shop's own Facebook badge, not the badge itself.</p>\n        <p>This was not commissioned or approved by The Tool Centre. It is a free website idea: a trade counter that does not need a login.</p>\n        <ul>\n          <li><a href=\"https://www.facebook.com/Toolcentreplanthire/\" rel=\"external\">Tool Centre Plant Hire public Facebook page</a></li>\n          <li><a href=\"https://www.bigreddirectory.com/tool-centre-newcastle\" rel=\"external\">Big Red Directory listing used for address and hours</a></li>\n          <li><a href=\"https://www.calorgas.ie/cylinder-dealers/Newcastle-BT33-0AE-Tool-Centre-8001144\" rel=\"external\">Calor dealer listing used to confirm gas retail</a></li>\n        </ul>\n        <a class=\"button\" href=\"/request/\">Request a free before-and-after for your business <span aria-hidden=\"true\">→</span></a>\n      </div>\n    </div>\n  </section>"
  },
  "bear-necessities": {
    "title": "Bear Necessities concept transformation — Mourne Made",
    "description": "A respectful, source-backed before-and-after website concept for Bear Necessities in Newcastle.",
    "eyebrow": "Website transformation · Newcastle",
    "headline": "We come to you — packs held, diary on Facebook.",
    "date": "23 August 2026",
    "comparisonIntro": "Drag the handle. Left: a labelled placeholder for the current public presence (a matched live capture was not filed). Right: the concept opening screen.",
    "conceptHref": "/concepts/bear-necessities/",
    "conceptLabel": "See the full website idea",
    "motion": {
      "slug": "bear-necessities",
      "afterVideo": "/media/concepts/bear-necessities/bear-necessities-after.mp4",
      "beforePoster": "/media/concepts/bear-necessities/bear-necessities-before.jpg",
      "afterPoster": "/media/concepts/bear-necessities/bear-necessities-after.jpg",
      "beforeAlt": "Labelled placeholder for Bear Necessities's current public presence — not a live-site screenshot",
      "afterAlt": "Opening frame of the Bear Necessities concept, held as a short clip from the captured still — a full interactive visit demo was not filed for this publish",
      "beforeNote": "This business already has a website and a busy Facebook diary. A matched live-site capture was not filed for this publish, so the before panel is a labelled placeholder — not a screenshot."
    },
    "secondSurfacesHtml": [],
    "notesHeading": "What this concept changes.",
    "notes": [
      {
        "title": "Put the business's own first job on the first screen",
        "body": "The public presence today splits the story across a site, a feed, or a booker — so a cold visitor has to already know where to look.",
        "change": "We come to you — packs held, diary on Facebook."
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
    "sourceHtml": "<section class=\"source-section\">\n    <div class=\"shell source-grid\">\n      <div>\n        <p class=\"eyebrow\">Sources &amp; limits</p>\n        <h2>Clear about what is real.</h2>\n      </div>\n      <div>\n        <p>Published 23 August 2026 as a first-50 concept graft. The before panel is a labelled placeholder because a matched live-site capture was not filed — it is not a screenshot of bearnecessitieskids.co.uk and the public Facebook page.</p>\n        <p>Facebook already wins at the live diary; the concept must not rebuild a calendar the studio cannot keep current. Generated making plate disclosed on the concept banner. Concept not independently Phase-Q validated — published as a working first-50 graft with elevation-brief honesty limits retained.</p>\n        <p>Packs, prices, call-out and extras (heart insert and adoption certificate included) are sourced to bearnecessitieskids.co.uk, read 23 August 2026. The circuit map pins only the four public days named on the 23 August 2026 public flyer grid — Wake the Giant carries no located pin because the harvest does not name its place. The adoption certificate is a drawn artifact of the ritual object the packages publish — title and three blank lines, no invented wording.</p>\n        <p>This was not commissioned or approved by Bear Necessities.</p>\n        <a class=\"button\" href=\"/request/\">Request a free before-and-after for your business <span aria-hidden=\"true\">→</span></a>\n      </div>\n    </div>\n  </section>"
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
  "armstrong-opticians": {
    "title": "Armstrong Opticians concept transformation — Mourne Made",
    "description": "A respectful, source-backed before-and-after website concept for Armstrong Opticians in Newcastle.",
    "eyebrow": "Website transformation · Newcastle",
    "headline": "One door since 1983. The diary is the phone.",
    "date": "23 August 2026",
    "comparisonIntro": "Drag the handle. Left: a labelled placeholder for the current public presence (a matched live capture was not filed). Right: the concept opening screen.",
    "conceptHref": "/concepts/armstrong-opticians/",
    "conceptLabel": "See the full website idea",
    "motion": {
      "slug": "armstrong-opticians",
      "afterVideo": "/media/concepts/armstrong-opticians/armstrong-opticians-after.mp4",
      "beforePoster": "/media/concepts/armstrong-opticians/armstrong-opticians-before.jpg",
      "afterPoster": "/media/concepts/armstrong-opticians/armstrong-opticians-after.jpg",
      "beforeAlt": "Labelled placeholder for Armstrong Opticians's current public presence — not a live-site screenshot",
      "afterAlt": "Opening frame of the Armstrong Opticians concept, held as a short clip from the captured still — a full interactive visit demo was not filed for this publish",
      "beforeNote": "A matched live-site capture was not filed for this publish. The before panel is a labelled placeholder for the practice's public splash and Facebook presence — not a screenshot."
    },
    "secondSurfacesHtml": [],
    "notesHeading": "What this concept changes.",
    "notes": [
      {
        "title": "Put the business's own first job on the first screen",
        "body": "The public presence today splits the story across a site, a feed, or a booker — so a cold visitor has to already know where to look.",
        "change": "One door since 1983. The diary is the phone."
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
    "sourceHtml": "<section class=\"source-section\">\n    <div class=\"shell source-grid\">\n      <div>\n        <p class=\"eyebrow\">Sources &amp; limits</p>\n        <h2>Clear about what is real.</h2>\n      </div>\n      <div>\n        <p>Published 23 August 2026 as a first-50 concept graft. The before panel is a labelled placeholder because a matched live-site capture was not filed — it is not a screenshot of the practice splash site and public Facebook page.</p>\n        <p>Generated calm-room plate disclosed — not a photograph of the shop. Do not freeze Facebook sale posts or Bing hours as standing practice facts. Concept not independently Phase-Q validated.</p>\n        <p>The concept's history band draws only on the practice's own splash (&quot;-Established 1983-&quot;) and the ~20 August 2026 Facebook refit post — the third pin is the practice's own promise, quoted. The appointment card is a drawn studio artifact, not a photograph, carrying only sourced facts (the name, the street, the number, 1983) and one blank line. All sources read 23 August 2026.</p>\n        <p>This was not commissioned or approved by Armstrong Opticians.</p>\n        <a class=\"button\" href=\"/request/\">Request a free before-and-after for your business <span aria-hidden=\"true\">→</span></a>\n      </div>\n    </div>\n  </section>"
  },
  "irelands-appliance-centre": {
    "title": "Ireland's Appliance Centre concept transformation — Mourne Made",
    "description": "A respectful, source-backed before-and-after website concept for Ireland's Appliance Centre in Newcastle.",
    "eyebrow": "Website transformation · Newcastle",
    "headline": "Live here. The cooker comes with a harbour counter.",
    "date": "23 August 2026",
    "comparisonIntro": "Drag the handle. Left: a labelled placeholder for the current public presence (a matched live capture was not filed). Right: the concept opening screen.",
    "conceptHref": "/concepts/irelands-appliance-centre/",
    "conceptLabel": "See the full website idea",
    "motion": {
      "slug": "irelands-appliance-centre",
      "afterVideo": "/media/concepts/irelands-appliance-centre/irelands-appliance-centre-after.mp4",
      "beforePoster": "/media/concepts/irelands-appliance-centre/irelands-appliance-centre-before.jpg",
      "afterPoster": "/media/concepts/irelands-appliance-centre/irelands-appliance-centre-after.jpg",
      "beforeAlt": "Labelled placeholder for Ireland's Appliance Centre's current public presence — not a live-site screenshot",
      "afterAlt": "Opening frame of the Ireland's Appliance Centre concept, held as a short clip from the captured still — a full interactive visit demo was not filed for this publish",
      "beforeNote": "A matched live-site capture was not filed for this publish. The before panel is a labelled placeholder for the shop's catalogue site and Facebook presence — not a screenshot."
    },
    "secondSurfacesHtml": [],
    "notesHeading": "What this concept changes.",
    "notes": [
      {
        "title": "Put the business's own first job on the first screen",
        "body": "The public presence today splits the story across a site, a feed, or a booker — so a cold visitor has to already know where to look.",
        "change": "Live here. The cooker comes with a harbour counter."
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
    "sourceHtml": "<section class=\"source-section\">\n    <div class=\"shell source-grid\">\n      <div>\n        <p class=\"eyebrow\">Sources &amp; limits</p>\n        <h2>Clear about what is real.</h2>\n      </div>\n      <div>\n        <p>Published 23 August 2026 as a first-50 concept graft. The before panel is a labelled placeholder because a matched live-site capture was not filed — it is not a screenshot of irelandsappliances.com and the public Facebook page.</p>\n        <p>Generated kitchen plate disclosed — not a customer's house or a photograph of 67–69 The Harbour. Do not typeset one-off charity totals as standing badges. Concept not independently Phase-Q validated.</p>\n        <p>This was not commissioned or approved by Ireland's Appliance Centre.</p>\n        <a class=\"button\" href=\"/request/\">Request a free before-and-after for your business <span aria-hidden=\"true\">→</span></a>\n      </div>\n    </div>\n  </section>"
  },
  "villa-vinci": {
    "title": "Villa Vinci concept transformation — Mourne Made",
    "description": "A respectful, source-backed before-and-after website concept for Villa Vinci in Newcastle.",
    "eyebrow": "Website transformation · Newcastle",
    "headline": "Promenade first. The table note on the first screen.",
    "date": "23 August 2026",
    "comparisonIntro": "Drag the handle. Left: a labelled placeholder for the current public presence (a matched live capture was not filed). Right: the concept opening screen.",
    "conceptHref": "/concepts/villa-vinci/",
    "conceptLabel": "See the full website idea",
    "motion": {
      "slug": "villa-vinci",
      "afterVideo": "/media/concepts/villa-vinci/villa-vinci-after.mp4",
      "beforePoster": "/media/concepts/villa-vinci/villa-vinci-before.jpg",
      "afterPoster": "/media/concepts/villa-vinci/villa-vinci-after.jpg",
      "beforeAlt": "Labelled placeholder for Villa Vinci's current public presence — not a live-site screenshot",
      "afterAlt": "Opening frame of the Villa Vinci concept, held as a short clip from the captured still — a full interactive visit demo was not filed for this publish",
      "beforeNote": "A matched live-site capture was not filed for this publish. The before panel is a labelled placeholder for Villa Vinci's own site and Facebook presence — not a screenshot."
    },
    "secondSurfacesHtml": [],
    "notesHeading": "What this concept changes.",
    "notes": [
      {
        "title": "Put the business's own first job on the first screen",
        "body": "The public presence today splits the story across a site, a feed, or a booker — so a cold visitor has to already know where to look.",
        "change": "Promenade first. The table note on the first screen."
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
    "sourceHtml": "<section class=\"source-section\">\n    <div class=\"shell source-grid\">\n      <div>\n        <p class=\"eyebrow\">Sources &amp; limits</p>\n        <h2>Clear about what is real.</h2>\n      </div>\n      <div>\n        <p>Published 23 August 2026 as a first-50 concept graft. The before panel is a labelled placeholder because a matched live-site capture was not filed — it is not a screenshot of villavinci.co.uk and the public Facebook page.</p>\n        <p>Generated dish plate disclosed — not a photograph from the pass. Do not print Bing hours or invent a farm list. Concept not independently Phase-Q validated.</p>\n        <p>This was not commissioned or approved by Villa Vinci.</p>\n        <a class=\"button\" href=\"/request/\">Request a free before-and-after for your business <span aria-hidden=\"true\">→</span></a>\n      </div>\n    </div>\n  </section>"
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
  "binghams-menswear": {
    "title": "Binghams Menswear concept transformation — Mourne Made",
    "description": "A respectful, source-backed before-and-after website concept for Binghams Menswear in Newcastle.",
    "eyebrow": "Website transformation · Newcastle",
    "headline": "Hire and the appointment, without invented prices.",
    "date": "23 August 2026",
    "comparisonIntro": "Drag the handle. Left: a labelled placeholder for the current public presence (a matched live capture was not filed). Right: the concept opening screen.",
    "conceptHref": "/concepts/binghams-menswear/",
    "conceptLabel": "See the full website idea",
    "motion": {
      "slug": "binghams-menswear",
      "afterVideo": "/media/concepts/binghams-menswear/binghams-menswear-after.mp4",
      "beforePoster": "/media/concepts/binghams-menswear/binghams-menswear-before.jpg",
      "afterPoster": "/media/concepts/binghams-menswear/binghams-menswear-after.jpg",
      "beforeAlt": "Labelled placeholder for Binghams Menswear's current public presence — not a live-site screenshot",
      "afterAlt": "Opening frame of the Binghams Menswear concept, held as a short clip from the captured still — a full interactive visit demo was not filed for this publish",
      "beforeNote": "A matched live-site capture was not filed for this publish. The before panel is a labelled placeholder for binghamsmenswear.com — not a screenshot, and not a reconstruction of dead shop URLs."
    },
    "secondSurfacesHtml": [],
    "notesHeading": "What this concept changes.",
    "notes": [
      {
        "title": "Put the business's own first job on the first screen",
        "body": "The public presence today splits the story across a site, a feed, or a booker — so a cold visitor has to already know where to look.",
        "change": "Hire and the appointment, without invented prices."
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
    "sourceHtml": "<section class=\"source-section\">\n    <div class=\"shell source-grid\">\n      <div>\n        <p class=\"eyebrow\">Sources &amp; limits</p>\n        <h2>Clear about what is real.</h2>\n      </div>\n      <div>\n        <p>Published 23 August 2026 as a first-50 concept graft. The before panel is a labelled placeholder because a matched live-site capture was not filed — it is not a screenshot of binghamsmenswear.com.</p>\n        <p>Generated jacket plate disclosed — not hire-stock photography. Do not invent hire prices or reproduce dead Highland-wear URLs. Concept not independently Phase-Q validated.</p>\n        <p>This was not commissioned or approved by Binghams Menswear.</p>\n        <a class=\"button\" href=\"/request/\">Request a free before-and-after for your business <span aria-hidden=\"true\">→</span></a>\n      </div>\n    </div>\n  </section>"
  },
  "cafe-mauds": {
    "title": "Café Mauds concept transformation — Mourne Made",
    "description": "A respectful, source-backed before-and-after website concept for Café Mauds in Newcastle.",
    "eyebrow": "Website transformation · Newcastle",
    "headline": "Appetite first. Walk in or ring.",
    "date": "23 August 2026",
    "comparisonIntro": "Drag the handle. Left: a labelled placeholder for the current public presence (a matched live capture was not filed). Right: the concept opening screen.",
    "conceptHref": "/concepts/cafe-mauds/",
    "conceptLabel": "See the full website idea",
    "motion": {
      "slug": "cafe-mauds",
      "afterVideo": "/media/concepts/cafe-mauds/cafe-mauds-after.mp4",
      "beforePoster": "/media/concepts/cafe-mauds/cafe-mauds-before.jpg",
      "afterPoster": "/media/concepts/cafe-mauds/cafe-mauds-after.jpg",
      "beforeAlt": "Labelled placeholder for Café Mauds's current public presence — not a live-site screenshot",
      "afterAlt": "Opening frame of the Café Mauds concept, held as a short clip from the captured still — a full interactive visit demo was not filed for this publish",
      "beforeNote": "Café Mauds has no separate brochure site filed for this publish. The before panel is a labelled placeholder for its public Facebook and tourism listing — not a fabricated website screenshot."
    },
    "secondSurfacesHtml": [],
    "notesHeading": "What this concept changes.",
    "notes": [
      {
        "title": "Put the business's own first job on the first screen",
        "body": "The public presence today splits the story across a site, a feed, or a booker — so a cold visitor has to already know where to look.",
        "change": "Appetite first. Walk in or ring."
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
    "sourceHtml": "<section class=\"source-section\">\n    <div class=\"shell source-grid\">\n      <div>\n        <p class=\"eyebrow\">Sources &amp; limits</p>\n        <h2>Clear about what is real.</h2>\n      </div>\n      <div>\n        <p>Published 23 August 2026 as a first-50 concept graft. The before panel is a labelled placeholder because a matched live-site capture was not filed — it is not a screenshot of the public Facebook page and the council tourism listing.</p>\n        <p>Generated cup/dish plate disclosed. Group menu prices not confirmed as Newcastle's — do not freeze them. Do not cherry-pick reviews. Concept not independently Phase-Q validated.</p>\n        <p>This was not commissioned or approved by Café Mauds.</p>\n        <a class=\"button\" href=\"/request/\">Request a free before-and-after for your business <span aria-hidden=\"true\">→</span></a>\n      </div>\n    </div>\n  </section>"
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
  "marine-wellness": {
    "title": "Marine Wellness concept transformation — Mourne Made",
    "description": "A respectful, source-backed before-and-after website concept for Marine Wellness in Newcastle.",
    "eyebrow": "Website transformation · Newcastle",
    "headline": "Same hands, same number, new room.",
    "date": "24 August 2026",
    "comparisonIntro": "Drag the handle. Left: a labelled placeholder for the current public presence (a matched live capture was not filed). Right: the concept opening screen.",
    "conceptHref": "/concepts/marine-wellness/",
    "conceptLabel": "See the full website idea",
    "motion": {
      "slug": "marine-wellness",
      "afterVideo": "/media/concepts/marine-wellness/marine-wellness-after.mp4",
      "beforePoster": "/media/concepts/marine-wellness/marine-wellness-before.jpg",
      "afterPoster": "/media/concepts/marine-wellness/marine-wellness-after.jpg",
      "beforeAlt": "Labelled placeholder for Marine Wellness's current public presence — not a live-site screenshot",
      "afterAlt": "Opening frame of the Marine Wellness concept, held as a short clip from the captured still — a full interactive visit demo was not filed for this publish",
      "beforeNote": "Marine Wellness books on Booksy rather than a brochure site. The before panel is a labelled placeholder for that public booking presence — not a fabricated clinic homepage screenshot."
    },
    "secondSurfacesHtml": [],
    "notesHeading": "What this concept changes.",
    "notes": [
      {
        "title": "Put the business's own first job on the first screen",
        "body": "The public presence today splits the story across a site, a feed, or a booker — so a cold visitor has to already know where to look.",
        "change": "Same hands, same number, new room. The diary stays on Booksy."
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
    "sourceHtml": "<section class=\"source-section\">\n    <div class=\"shell source-grid\">\n      <div>\n        <p class=\"eyebrow\">Sources &amp; limits</p>\n        <h2>Clear about what is real.</h2>\n      </div>\n      <div>\n        <p>Published 23 August 2026 as a first-50 concept graft; elevated 24 August 2026. The before panel is a labelled placeholder because a matched live-site capture was not filed — it is not a screenshot of Booksy and the public Facebook page.</p>\n        <p>Hours from the clinic's own site table (read 23 August 2026 — Booksy's hours widget was unreliable on that read). The rename chain: Marine Beauty Haven on the Promenade is a directory-era name; the current door is Unit 13, 63A Castlewellan Road (first-party). People tenures — Patricia over twenty years, Nicola over ten, Emma three — from the clinic's site. Booking rules from the clinic's Booksy listing (read 23 August 2026).</p>\n        <p>Generated calm plate disclosed — not a treatment-room photograph. Quote clinical lines; do not paraphrase or invent a founding year. Concept not independently Phase-Q validated.</p>\n        <p>This was not commissioned or approved by Marine Wellness.</p>\n        <a class=\"button\" href=\"/request/\">Request a free before-and-after for your business <span aria-hidden=\"true\">→</span></a>\n      </div>\n    </div>\n  </section>"
  },
} satisfies Record<string, TransformationDetail>;
