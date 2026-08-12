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
    "comparisonIntro": "Drag the handle. The left shows the public opening screen captured during research; the right shows the proposed first screen.",
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
        "body": "The inn publishes opening hours for all seven days, but only a limited restaurant last-orders note rather than a full food-service schedule. On the captured homepage even those useful details sit far below a translation bar and a video, where someone checking before a visit will not find them quickly.",
        "change": "A status line at the top of the page that works out open or closed from the inn's own published hours, in local time, next to the event the inn currently lists and the bay across the road."
      },
      {
        "title": "Retire the machine translation, keep the Irish",
        "body": "A translation widget offers the site in twenty-eight-plus machine-rendered languages and is among the most prominent controls on the page. Irish is already in that list — buried among the rest rather than offered as the one alternative this street would actually use.",
        "change": "Replace the prominent translation bar with Irish beside English, freeing the space it occupied for a booking action instead."
      },
      {
        "title": "Keep the booking that works",
        "body": "The inn already runs a real booking engine — GuestDiary — with availability, room types and the self-catering cottage. The gap is not the engine; it is how far you travel down the page before you reach it.",
        "change": "The same four fields the inn's own search takes — dates, adults, children — moved to the first screen and handing to GuestDiary, which keeps the live availability. The working booking kept, the route to it shortened."
      }
    ],
    "sourceHtml": "<section class=\"source-section\">\n    <div class=\"shell source-grid\">\n      <div>\n        <p class=\"eyebrow\">Sources &amp; limits</p>\n        <h2>Clear about what is real.</h2>\n      </div>\n      <div>\n        <p>The existing-site still and demo clip were captured from the public Dundrum Inn website on 24 July 2026, and the inn's published detail was re-checked on 26 July 2026. The inn's own words — Come for the views, stay for the craic, the 190 years, the best Sunday roast award — its 2026 content, its winter opening hours, the four named rooms, Murlough Cottage, the 2 August Fleadh Cheoil listing and the GuestDiary booking engine all come from that site and are kept. The concept corrects one listing error rather than inventing anything: the phone number was listed as 028 4375 1211, while the inn's own site publishes 028 4372 9933. This is a maintained, working site with a real booking engine, so the proposal keeps the existing GuestDiary booking route.</p>\n        <p>Two limits are worth stating plainly. The hero is an AI-generated faithful visualisation based on the inn's own exterior photograph, not documentary photography. The concept page labels it over the image, and the alt text repeats the reference boundary. The generation preserved the yellow-and-black terraced frontage, shopfront, roof and window rhythm, awning, hanging sign, benches, barrels, baskets, toucan feature and neighbouring façades; it changed only lighting, framing and minor street clutter. The open-or-closed line is worked out from the inn's published <em>bar</em> hours: the site has one limited restaurant last-orders note but no full food-service schedule, which is the gap the concept is addressing rather than filling. No kitchen closing time or nightly price appears in the concept because the site does not publish a full food-service schedule or room prices in the material used here. The proposed page is an independent concept, not a commissioned redesign.</p>\n        <ul>\n          <li><a href=\"https://dundruminn.com/\" rel=\"external\">The Dundrum Inn public website</a></li>\n        </ul>\n        <p>No claim is made about sales performance, customer approval or the business's plans for its current site.</p>\n        <a class=\"button\" href=\"/request/\">Request a free before-and-after for your business <span aria-hidden=\"true\">→</span></a>\n      </div>\n    </div>\n  </section>"
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
    "comparisonIntro": "Drag the handle. The left shows The Donard's new official homepage, captured during the build-day re-check; the right shows a property-first feature proposal that keeps its identity and booking route.",
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
        "body": "The new official homepage opens on a wide Mournes landscape. It establishes the place beautifully, but the first screen does not show the red-brick Main Street building a guest will arrive at.",
        "change": "A property-first opening built from a clearly disclosed visualisation of the real frontage, so the first frame belongs to this hotel rather than to accommodation in the Mournes generally."
      },
      {
        "title": "Keep the identity the hotel chose",
        "body": "The official site establishes a specific identity: deep navy, soft gold, a line drawing of the corner turret and the ESTD 1946 date.",
        "change": "The proposal carries that navy, gold, wide-spaced name and founding date. It does not reuse the unlicensed logo artwork or replace the hotel with a studio-made crest."
      },
      {
        "title": "Keep direct booking, add room context",
        "body": "The current site already puts its booking search on the first screen. Replacing that working route would solve nothing.",
        "change": "The proposal keeps the official engine as the handoff and places the hotel's published starting rates beside it, so a guest has useful room context before continuing."
      }
    ],
    "sourceHtml": "<section class=\"source-section\">\n    <div class=\"shell source-grid\">\n      <div>\n        <p class=\"eyebrow\">Sources &amp; limits</p>\n        <h2>Clear about what changed.</h2>\n      </div>\n      <div>\n        <p>On 24 July 2026 donardhotel.com returned a 404 over HTTP and refused a secure connection, which originally made this a first-website and commission case. The 27 July build-day re-check found a new official site at thedonard.co.uk with the hotel's navy-and-gold identity, property pages and a working booking search. That new evidence changes the proposal: the dead-domain and commission diagnosis is retained only as dated case-study history and does not appear inside the guest page. The concept uses the official Rooms page for the 19-room count, room types and starting rates.</p>\n        <p>The exterior hero is a disclosed generated visualisation based on Eric Jones's 24 March 2023 photograph of the real Main Street facade, licensed CC BY-SA 2.0. The shutters are shown open and parked cars removed; it is not presented as a documentary photograph. The hotel logo informed the palette, ESTD 1946 date and wide-spaced name, but the unlicensed logo artwork itself is not reused.</p>\n        <ul>\n          <li><a href=\"https://www.thedonard.co.uk/\" rel=\"external\">The Donard's current official homepage and booking search</a></li>\n          <li><a href=\"https://www.thedonard.co.uk/bedrooms\" rel=\"external\">Official Rooms page used for room types and starting rates</a></li>\n          <li><a href=\"https://www.geograph.org.uk/photo/7440264\" rel=\"external\">Eric Jones's source photograph, CC BY-SA 2.0</a></li>\n          <li><a href=\"https://creativecommons.org/licenses/by-sa/2.0/\" rel=\"external\">Creative Commons Attribution-ShareAlike 2.0 licence</a></li>\n        </ul>\n        <p>No claim is made about booking conversion, commission saved, customer approval or the hotel's plans for its new site.</p>\n        <a class=\"button\" href=\"/request/\">Request a free before-and-after for your business <span aria-hidden=\"true\">→</span></a>\n      </div>\n    </div>\n  </section>"
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
    "comparisonIntro": "Drag the handle. The left shows the public opening screen captured during research; the right shows the proposed first screen.",
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
        "body": "On the captured first screen, a photograph of the owners above Dundrum Bay does all the work. No headline, opening hours, address or booking action appears before a visitor scrolls.",
        "change": "The same welcome, said in the pub's own words — old charm meets modern flare, Bronagh and Alex named in the opening lines — with the hours and phone number in a strip along the top."
      },
      {
        "title": "Start booking on the first screen",
        "body": "Book A Table leads to a page that opens with Important Booking Notes — the eight-seat maximum and cancellation warnings — before the ResDiary widget appears below them.",
        "change": "A booking card on the first screen — date and party — passing straight into the same ResDiary booking system the pub already runs, with the party-size limit reduced to one calm line beneath the button."
      },
      {
        "title": "Put the menus on the page",
        "body": "Five menus — À La Carte, Bar, Dessert, Sunday and Drinks — are PDF downloads on the menus page, so no dish can be read without opening a file.",
        "change": "A menus list across the bottom of the page, one tap from each menu, set to be read on the page rather than downloaded."
      }
    ],
    "sourceHtml": "<section class=\"source-section\">\n    <div class=\"shell source-grid\">\n      <div>\n        <p class=\"eyebrow\">Sources &amp; limits</p>\n        <h2>Clear about what is real.</h2>\n      </div>\n      <div>\n        <p>The existing-site still was captured from the public Bucks Head website on 21 July 2026, and a ten-second demo clip on 23 July 2026. The concept's identity is taken from the pub's own building — the spruce-green frontage, the blush-pink signage lettering and the antler mark. Its opening image is a disclosed AI-generated faithful visualisation of the pub's real photographed hearth, preserving the rounded arch, brick chimney, stove, antlers and surrounding room rather than publishing the source photograph. The old charm meets modern flare line, the owners' names, the party-size policy, the menu names, hours, address and phone number all come from the pub's published pages. Menu dishes are adapted from public menus and every direct menu panel repeats the illustrative-price warning. The booking card points at the ResDiary booking system the pub already runs — added to its site since our 20 July verification pass, and worth keeping. The proposed page is an independent concept, not a commissioned redesign.</p>\n        <ul>\n          <li><a href=\"https://thebucksheaddundrum.co.uk/\" rel=\"external\">The Bucks Head public website</a></li>\n          <li><a href=\"https://www.tripadvisor.ie/Restaurant_Review-g1477857-d1185069\" rel=\"external\">TripAdvisor listing used to verify current trading</a></li>\n        </ul>\n        <p>No claim is made about sales performance, customer approval or the business's plans for its current site.</p>\n        <a class=\"button\" href=\"/request/\">Request a free before-and-after for your business <span aria-hidden=\"true\">→</span></a>\n      </div>\n    </div>\n  </section>"
  },
  "castle-farm": {
    "title": "Castle Farm concept transformation — Mourne Made",
    "description": "A respectful, source-backed before-and-after website concept for Castle Farm Fresh Produce in Dundrum.",
    "eyebrow": "Website transformation · Dundrum",
    "headline": "Show the week the farm actually runs.",
    "date": "17 July 2026",
    "comparisonIntro": "Drag the handle. The left shows the public opening screen captured during research; the right shows the proposed first screen.",
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
        "body": "The captured page places a newsletter request above the farm, before a visitor has had time to understand what is on offer.",
        "change": "Open on the farm's own sentence — Let us worry about digging it up. — beside the two dates no box scheme can copy: generations of the same family beside Dundrum Castle, and online ordering and home delivery since 2008."
      },
      {
        "title": "Make every control do something",
        "body": "Several layers compete at once on arrival, so the route into the working shop is harder to see than it needs to be.",
        "change": "One primary action — shop this week's produce — pointing at the farm's own store, with no basket and no category rail that leads nowhere."
      },
      {
        "title": "Put the weekly round on the page",
        "body": "The delivery schedule is published in full but as dense paragraphs of town names, so a customer has to read the lot to find out which day their own town goes out.",
        "change": "The round set out day by day with the towns the farm names, the two 3pm cutoffs, the published minimums and delivery fee, and a lookup that answers one question — is your town on it, and when?"
      }
    ],
    "sourceHtml": "<section class=\"source-section\">\n    <div class=\"shell source-grid\">\n      <div>\n        <p class=\"eyebrow\">Sources &amp; limits</p>\n        <h2>Clear about what is real.</h2>\n      </div>\n      <div>\n        <p>The existing-site still and demo clip were captured from the public Castle Farm website on 23 July 2026; arrival pop-ups (a newsletter sign-up and cookie prompt) were closed first so the comparison shows the page itself. The concept's first screen was rebuilt on 5 August 2026 from the farm's own About and Delivery pages, re-read on 4 August 2026. The week's-table theatre plate replaced the earlier mixed-box still the same day, and the comparison after still and demo clip were recaptured with it.</p><p>Everything the concept says as the farm is the farm's own published wording, quoted verbatim: &ldquo;Let us worry about digging it up.&rdquo;, &ldquo;Simply browse our fresh produce, add to cart and checkout&rdquo;, the castle-grounds and same-family provenance, &ldquo;established as a web based order and home delivery service in 2008&rdquo;, and the aim of keeping money circulating in the local economy, providing jobs for local people and cutting down on food miles. The delivery days, the towns named against each of them, the two 3pm order cutoffs, the &pound;40 local minimum, the &pound;76 outlying minimum and the &pound;4 delivery fee are the farm's published schedule and terms as read on 4 August 2026. They are live business facts and they move — the October 2025 archive already shows the local minimum going from &pound;36 to &pound;40 — so the page carries the read date and links to the farm's own delivery-schedule page as the source of truth. No town appears that the farm does not list, and a town that is not on the published round is told so rather than given a day. The Aberdeen Angus herd, the 300-ewe flock behind the Mourne lamb, the Gloucestershire Old Spot pork, the free-range eggs and the seasonal vegetables are the farm's own published stock; the local producers who travel the round with it are described, as the farm describes them, without naming suppliers the farm does not name. Beef bourguignon, shepherd's cottage pie and goulash are dishes named on the farm's recipe blog as read on 4 August 2026; the shop sitemap on 5 August 2026 listed only the blog index and one news post, so those dishes hand off to the live blog rather than to invented per-post URLs. The Medium Mixed Box price is deliberately not quoted here — prices are the most perishable thing the farm publishes, so the page links to the live meal-deal box listings instead.</p><p>The opening image is a disclosed AI-generated painted plate of a possible week's table laid from the farm's published food categories — an Angus joint, eggs, potatoes, seasonal vegetables and plain yoghurt — not a photograph of Castle Farm, its kitchen or an exact current box. Below the round, a disclosed AI-generated delivery-round plate draws the farm beside Dundrum Castle at the centre with four day-loops of published towns; it is indicative, not a survey. The concept previously cropped a generated produce photograph into a wordmark window; that was withdrawn on 5 August 2026 because it was not the farm's mark, and the name is now set in type. Castle Farm runs a working online shop with live checkout, so nothing here sells: every commerce control on the concept hands off to castlefarmni.com, and there is no basket. The proposed page is an independent concept, not a commissioned redesign.</p>\n        <ul>\n          <li><a href=\"https://www.castlefarmni.com/\" rel=\"external\">Castle Farm public website</a></li>\n          <li><a href=\"https://www.castlefarmni.com/pages/delivery-schedule\" rel=\"external\">Delivery schedule and terms</a></li>\n          <li><a href=\"https://www.castlefarmni.com/collections/meal-deal-boxes\" rel=\"external\">Meal-deal box listings</a></li>\n          <li><a href=\"https://www.google.com/maps/place/Castle+Farm+Fresh+Produce/data=!4m7!3m6!1s0x48613d0b384805c5:0x9ac0e5068d4ff3ab!8m2!3d54.264296!4d-5.851389\" rel=\"external\">Public Google Maps listing used in discovery</a></li>\n        </ul>\n        <p>No claim is made about exact box contents or availability, sales performance, customer approval or the business&#39;s plans for its current site. The figures above were true on 4 August 2026 and are re-verified before any contact.</p>\n        <a class=\"button\" href=\"/request/\">Request a free before-and-after for your business <span aria-hidden=\"true\">&rarr;</span></a>\n      </div>\n    </div>\n  </section>"
  },
  "painted-earth": {
    "title": "Painted Earth concept transformation — Mourne Made",
    "description": "A respectful, source-backed before-and-after website concept for Painted Earth, the gift shop and art gallery on Main Street, Newcastle.",
    "eyebrow": "Website transformation · Newcastle",
    "headline": "Know what happens before checkout.",
    "date": "3 August 2026",
    "comparisonIntro": "Drag the handle. The left shows the public opening screen captured during research; the right shows the proposed first screen.",
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
        "body": "An £850 oil on canvas carries COLLECTION ONLY and a request to contact the shop before shipping — stated twice, in capitals, inside the description body — under an Add to Cart button identical to the one on a £3 greeting card.",
        "change": "Collection, shipping-quote and no-returns terms sit against each original before the buying action, not underneath it."
      },
      {
        "title": "Give sold work somewhere to go",
        "body": "232 originals are listed and 124 of them have already sold. A visitor who arrives on one — from a search, a share or a saved link — reaches a full stop.",
        "change": "A sold piece offers available work by the same artist and the gallery's current collection, so the visit continues instead of ending."
      },
      {
        "title": "Start from the piece, not the maker",
        "body": "The shop's own filters for price, artist, product type and stock already work. What the menu asks first is which of 92 makers you want, which only helps if you already know them.",
        "change": "Product, occasion and price lead the way in; place stays as an optional local route; the shop's existing filters are named on the page rather than replaced."
      }
    ],
    "sourceHtml": "<section class=\"source-section\">\n    <div class=\"shell source-grid\">\n      <div>\n        <p class=\"eyebrow\">Sources &amp; limits</p>\n        <h2>Clear about what is real.</h2>\n      </div>\n      <div>\n        <p>The existing-site still and demo clip were captured from the public Painted Earth shop on 3 August 2026; a cookie prompt and a sign-up dialog were declined and closed first so the comparison shows the page itself. The address, opening hours, phone number, contact addresses, shipping and returns terms, artwork titles, artists, prices and sold status all come from the shop's own public pages and product data, sampled on 26 July 2026 and re-checked on 27 July and 3 August.</p>\n        <p><strong>No artwork is shown.</strong> Every tile on the concept is a drawn placeholder, labelled as one on the image itself. Painted Earth sells work by 92 named makers and the shop does not hold publishable rights to all of that photography, so none of it is reproduced here. A placeholder attributes the product record — title, artist, price, availability — to the artist named beside it, and the drawing to nobody. The real work is on the shop's own pages, which every tile links to.</p>\n        <p>The makers' roll, the workshop records and the waiting-list sentence come from the dated 26 July 2026 snapshot of the shop's own public product data, and the page presents them as of that catalogue date. Each maker's name links to that maker's live collection on the shop's own site. The gallery's sentence and the visitor review are quoted verbatim from the shop's public Art &amp; Craft Gallery page, read on 6 August 2026; that page publishes no review dates, so none are shown. The waiting list you can join from the page is a labelled proposal — the shop runs its list by hand today, and nothing here claims otherwise.</p>\n        <p>This is not a repair case. The shop runs a polished, working store with catalogue filters it added before this concept was built, and the concept says so on the page. Its proposal is limited to what happens around original art: fulfilment terms before checkout, and a route on from sold work.</p>\n        <ul>\n          <li><a href=\"https://www.paintedearthgifts.com/\" rel=\"external\">Painted Earth public shop</a></li>\n        </ul>\n        <p>No claim is made about sales performance, customer approval, click-and-collect (which the shop does not offer and the concept only proposes), or the internal decisions behind the current site. The business has not been contacted and has not approved this work.</p>\n        <a class=\"button\" href=\"/request/\">Request a free before-and-after for your business <span aria-hidden=\"true\">→</span></a>\n      </div>\n    </div>\n  </section>"
  },
  "cupla": {
    "title": "Cúpla concept transformation — Mourne Made",
    "description": "A respectful, source-backed first-website concept for Cúpla, the bilingual café in Dundrum.",
    "eyebrow": "First website · Dundrum",
    "headline": "Open the door in both languages.",
    "date": "21 July 2026",
    "comparisonIntro": "Drag the handle. The left shows what a first-time visitor currently finds — the café's Facebook page as it loads without an account; the right shows the proposed first screen.",
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
        "body": "Cúpla has no website. Its Facebook page greets a first-time visitor with Meta's cookie dialog and a login form — the café's name and its Brews, Bakes & Bowls line sit greyed out behind them.",
        "change": "A first screen that opens the door instead — Fáilte isteach — with the café's own three-word tagline doing the work of structuring the whole page."
      },
      {
        "title": "Let the name explain the café",
        "body": "The café's name is the Irish word for twins, reflecting the twin owners who founded it in 2024. On the current public page, that connection is not explained and the café's Irish identity is easy to miss.",
        "change": "Build the identity around the pair: twin rings in the mark, Irish first and English beside it, and a short story block that stages the pair from the three things the record holds — the name, the twin owners, and Est. 2024 on the door."
      },
      {
        "title": "Answer the passer-by's three questions",
        "body": "What's on the counter, when it opens and where it is live only as feed posts, so someone deciding on a whim has to scroll to find out.",
        "change": "The counter's day in two beats — Maidin and Lón, morning bakes into brunch bowls — with today's counter and today's hours pointing at the Instagram the café already runs. The feed keeps doing the updating, behind a page that never goes stale."
      }
    ],
    "sourceHtml": "<section class=\"source-section\">\n    <div class=\"shell source-grid\">\n      <div>\n        <p class=\"eyebrow\">Sources &amp; limits</p>\n        <h2>Clear about what is real.</h2>\n      </div>\n      <div>\n        <p>The before image was captured from the café's public Facebook page on 21 July 2026, with Meta's cookie dialog and login prompt left in place — that is what a first-time visitor without an account meets. The café's name, its Brews, Bakes &amp; Bowls tagline, the twin founders, the 2024 founding and the Main Street address come from its public pages, Companies House and the food-hygiene register; active trading was confirmed by local first-hand knowledge on 21 July 2026. The shopfront on the proposed page is an AI-generated visualisation, faithful to a photograph of the premises taken in August 2024 and captioned as generated where it appears; that reference photograph is held privately and is not published, and no photograph of the café is reproduced here. The twin-ring mark and the Irish-language phrasing are concept work — the café's own bilingual voice would replace them, and the bilingual menu card is a sample, awaiting review by a fluent Irish speaker before it could be used. The proposed page is an independent concept, not a commissioned redesign.</p>\n        <ul>\n          <li><a href=\"https://www.facebook.com/p/C%C3%BApla-61565293502528/\" rel=\"external\">Cúpla public Facebook page</a></li>\n          <li><a href=\"https://find-and-update.company-information.service.gov.uk/company/NI711705\" rel=\"external\">Companies House record used to verify the business</a></li>\n          <li><a href=\"https://ratings.food.gov.uk/business/1783241/cpla-bais-newcastle\" rel=\"external\">Food hygiene listing used to verify the premises</a></li>\n        </ul>\n        <p>The café's own three words — Brews, Bakes &amp; Bowls — are quoted from its public pages, read 21 July 2026; no other sentence is put in the café's mouth. The proposed page states no opening hour, no schedule and no day's special: what is on the counter today, and today's hours, stay with the Instagram account the café already runs. No claim is made about sales performance, customer approval or the owners' plans for a website.</p>\n        <a class=\"button\" href=\"/request/\">Request a free before-and-after for your business <span aria-hidden=\"true\">→</span></a>\n      </div>\n    </div>\n  </section>"
  },
  "donard-veterinary": {
    "title": "Donard Veterinary Clinic concept transformation — Mourne Made",
    "description": "A respectful, source-backed before-and-after website concept for Donard Veterinary Clinic in Newcastle.",
    "eyebrow": "Website transformation · Newcastle",
    "headline": "Make it easy to ask for help.",
    "date": "21 July 2026",
    "comparisonIntro": "Drag the handle. The left shows the public opening screen captured during research; the right shows the proposed first screen.",
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
        "body": "The captured screen greets visitors with a wall-to-wall collage of stock puppies and kittens, and a page title that repeats the header logo's name. The one thing that is genuinely theirs — the badge with its Mourne silhouette, blue and teal — sits small in the corner.",
        "change": "The whole screen is drawn from the practice's own badge: its colours, its mountain profile as the backdrop, and its own words — Professional, Caring, Compassionate; Taking care of your pets — as the welcome."
      },
      {
        "title": "Turn booking into a real request",
        "body": "Book Appointments leads to a page that lists only the phone number and email address. The site separately promotes VidiVet for free 24/7 digital vet advice.",
        "change": "An appointment-request card on the first screen — name, pet, preferred day, phone — passing straight to the phone line and inbox the practice already answers, with repeat prescriptions one line away."
      },
      {
        "title": "Separate emergencies from everyday care",
        "body": "Emergency treatment is one item in a nine-entry services dropdown, while the opening hours are competing with the photographs in a chat popup.",
        "change": "Emergencies get the top strip with a call action beside the published hours, and six everyday services line the foot of the screen — visible without opening a menu."
      }
    ],
    "sourceHtml": "<section class=\"source-section\">\n    <div class=\"shell source-grid\">\n      <div>\n        <p class=\"eyebrow\">Sources &amp; limits</p>\n        <h2>Clear about what is real.</h2>\n      </div>\n      <div>\n        <p>The existing-site still and demo clip were captured on 23 July 2026, when a PetsApp panel appeared over the hero. By 25 July the public site promoted VidiVet for free 24/7 digital advice instead. The practice's name, fascia strapline, address, phone number, email, opening hours, catchment villages, bereavement page and service list come from the current site and the July 2026 recruitment listing. The pet cast, the safety-net flow, the life arc and the catchment map are studio drawings, disclosed as such — not photographs of patients, and the map is indicative rather than a boundary survey. The bereavement line quoted on the page is the practice's own sentence, with its page named and linked. The layout, copy hierarchy and proposed appointment experience are part of an independent concept.</p>\n        <ul>\n          <li><a href=\"https://donardveterinaryclinic.co.uk/\" rel=\"external\">Donard Veterinary Clinic public website</a></li>\n          <li><a href=\"https://donardveterinaryclinic.co.uk/vidivet/\" rel=\"external\">Current VidiVet information</a></li>\n          <li><a href=\"https://donardveterinaryclinic.co.uk/when-the-time-comes-to-say-goodbye/\" rel=\"external\">Bereavement page quoted on the concept</a></li>\n          <li><a href=\"https://vetni.co.uk/2026/07/08/pt-ft-experienced-sa-vet-donard-vet-clinic-newcastle/\" rel=\"external\">July 2026 recruitment listing used to verify current trading</a></li>\n        </ul>\n        <p>No claim is made about sales performance, customer approval or the business's plans for its current site.</p>\n        <a class=\"button\" href=\"/request/\">Request a free before-and-after for your business <span aria-hidden=\"true\">→</span></a>\n      </div>\n    </div>\n  </section>"
  },
  "hotel-enniskeen": {
    "title": "Hotel Enniskeen concept transformation — Mourne Made",
    "description": "A respectful, source-backed before-and-after website concept for Enniskeen Country House Hotel in Newcastle.",
    "eyebrow": "Website transformation · Newcastle",
    "headline": "Let the valley make the welcome.",
    "date": "23 July 2026",
    "comparisonIntro": "Drag the handle. The left shows the public opening screen captured during research; the right shows the proposed first screen.",
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
        "body": "The captured page leads with an oval archive photograph, a blue serif title and seven uppercase menu items — while the hotel's own phrase, a mountainside hideaway, appears nowhere on the first screen.",
        "change": "One composed scene — the valley framed from a balcony room, the hideaway line as the headline, and five linked pages for the complete visit."
      },
      {
        "title": "Make checking dates effortless",
        "body": "Book Now is one menu item among seven, and checking availability means leaving for the booking system with no dates in hand.",
        "change": "Availability bars for arrival and nights — exactly the fields the hotel’s Bookin1 search accepts — pass straight into its results route."
      },
      {
        "title": "Let the estate do the selling",
        "body": "Twelve wooded acres, the river trail, Mourne Honey afternoon tea and the Brandy Pad Lounge are real, published draws — but they all live behind dropdown menus.",
        "change": "The opening carries the estate’s story in one breath, with dedicated Dine, Estate and Things to do pages one step away."
      }
    ],
    "sourceHtml": "<section class=\"source-section\">\n    <div class=\"shell source-grid\">\n      <div>\n        <p class=\"eyebrow\">Sources &amp; limits</p>\n        <h2>Clear about what is real.</h2>\n      </div>\n      <div>\n        <p>The public Enniskeen site was re-read page by page on 23 July 2026 before the flagship build; its hand-built template and Bookin1 hotel code were unchanged. The existing-site still, ten-second demo and before-side film footage were captured that day, with the arrival cookie prompt closed first so the comparison shows the page itself. The hotel’s name, mountainside-hideaway and Shimna Valley wording, room names, dining and estate details, contact information, menu and voucher links come from its published site. The current five-page concept uses original AI-generated imagery instead of publishing the hotel's photographs. The façade and named Room 6 bathroom are faithful visualisations grounded in reference photographs of those real features; every route identifies them as generated. Other scenic and interior images are atmospheric concept visuals, not documentary views of the hotel. The pages reorganise sourced material rather than inventing services or prices. Their availability bars pass arrival date and length of stay into the same Bookin1 results route used by the hotel’s own search box. Historical prototype captures made on 23 July 2026 predate the generated-image replacement. The proposed page is an independent concept, not a commissioned redesign.</p>\n        <ul>\n          <li><a href=\"https://www.enniskeenhotel.co.uk/\" rel=\"external\">Enniskeen public website</a></li>\n          <li><a href=\"https://www.tripadvisor.co.uk/Hotel_Review-g186478-d1462012\" rel=\"external\">TripAdvisor listing used to verify current trading</a></li>\n        </ul>\n        <p>No claim is made about sales performance, customer approval or the business's plans for its current site. The concept, generated visualisations and film were not commissioned by the hotel.</p>\n        <a class=\"button\" href=\"/request/\">Request a free before-and-after for your business <span aria-hidden=\"true\">→</span></a>\n      </div>\n    </div>\n  </section>"
  },
  "kent-amusements": {
    "title": "Kent Amusements concept transformation — Mourne Made",
    "description": "A respectful, source-backed first-website concept for Kent Amusements, the seaside arcade on Newcastle's Central Promenade.",
    "eyebrow": "First website · Newcastle",
    "headline": "The machines change. The summer doesn't.",
    "date": "22 July 2026",
    "comparisonIntro": "Drag the handle. The left shows what a first-time visitor currently finds — the arcade's Facebook page as it loads without an account; the right shows the proposed first screen.",
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
                "body": "The arcade has no first-party sentence anywhere on the open web: its Facebook page and Instagram account are its only channels, and both meet a first-time visitor with Meta's login. The one voice in the record belongs to other people — the BBC's Your Place and Mine archive holds two Newcastle memories of this arcade, including a summer worker in the late sixties dishing out the change.",
                "change": "That memory quoted verbatim as a supporting band just below the opening, carrying who is speaking, the era it is speaking about, the archive it is preserved in and a link to the rest of it. The Avoca Hotel's present-tense description sits beside it, attributed to the Avoca, whose words \"premier\" and \"one of NI's only homes to indoor Dodgem Cars\" stay theirs."
          },
          {
                "title": "Put fifty summers on the page, dated at both ends",
                "body": "The strongest fact in the record was compressed into a thesis line — \"Fifty summers of seaside fun\" — and the arc behind it was nowhere: the Kent name on the promenade in the late sixties, the same site ever since, and a VR zone new this year.",
                "change": "A two-stop timeline from c. 1968 — the mid-point of the late-1960s BBC archive date — to the 2026 VR launch. The jukebox memory, the change-booth memory and the Avoca Hotel's description sit as loose ticks on the line for colour. No Companies House filler, no undated milestone."
          },
          {
                "title": "Stage the afternoon instead of listing the attractions",
                "body": "Dodgems, VR and arcade machines are the three verified attractions — and they are the three every seaside arcade in Ireland would list, so nothing on the old page belonged to this promenade in particular.",
                "change": "A comic storyboard split into two three-panel strips shows one indicative afternoon, with each beat's description under the art: the promenade, the change, the floor, the dodgems, the VR, back out to the sea. The change is the hinge, where the sixties memory and this afternoon are the same afternoon. Nothing is added to the record to fill it out — no tokens, tickets, prices or packages."
          },
          {
                "title": "Replace the empty hours board with the honest season panel",
                "body": "The attractions board carried three rows reading \"Seasonal — check Facebook\", which the 27 July 2026 publication review asked to be replaced. No confirmed seasonal hours exist in any source, and an earlier draft's invented ones were the concept's one claims-gate failure.",
                "change": "One confident panel that states the arcade's real operating ritual — hours move with the season and are posted on Facebook as they change, with family offers posted there when they run — explains why that page is the freshest source there is, and hands today's answer to it. If the arcade ever publishes confirmed hours, the panel already has the designed home, with a source line, for them to land in."
          },
          {
                "title": "Put the promenade back into the picture",
                "body": "The concept had no photograph or illustration after the 2023 exterior was withdrawn, so the page could describe the Central Promenade without showing the place that makes the arcade itself recognisable.",
                "change": "Two generated illustrative plates now fill the first viewport beside the brand: the light plate is the no-JavaScript and reduced-motion default, and the visitor's local clock can select the lit sibling. They are labelled as generated artwork and not a survey. The late-1960s memory sits just below as supporting voice rather than competing with the geography."
          }
    ],
    "sourceHtml": "<section class=\"source-section\">\n    <div class=\"shell source-grid\">\n      <div>\n        <p class=\"eyebrow\">Sources &amp; limits</p>\n        <h2>Clear about what is real.</h2>\n      </div>\n      <div>\n        <p>The before image was captured from the arcade's public Facebook page on 22 July 2026, with Meta's cookie dialog and login prompt left in place — that is what a first-time visitor without an account meets. The Central Promenade address and the company are confirmed by Companies House (NI688147), whose confirmation statement was filed 2 November 2025. A March 2026 TripAdvisor review names the new VR games. Longevity on the promenade — over fifty years on the same site — was verified on 22 July 2026.</p>\n        <p>The arcade has no first-party voice on the open web: its Facebook page and Instagram account are its only channels, so the two quotations on the concept belong to other people. The late-1960s change-booth memory and the juke-box memory are quoted verbatim from the BBC's Your Place and Mine Newcastle memory archive, re-read 4 August 2026, and both carry their era, their archive and a link to it on the page. The change-booth memory is quoted with its shift hours elided, and the page says so: the memory records a 1960s summer job, and on an arcade page those figures would read as opening hours. The Kent Cafe is named only inside the memory that mentions it; its relationship to the arcade is not established anywhere in the record. The description beginning “Newcastle County Down's premier family entertainment centre” is the Avoca Hotel's, read 5 August 2026, quoted and attributed on both screens; “premier” and the indoor-dodgems scarcity are the Avoca's claim and the concept never adopts either in its own voice.</p>\n        <p>No opening time appears anywhere on either screen, and a standing test fails the build if one does: an earlier draft published invented seasonal hours on 25 July 2026, and no source records any hours for this arcade. The season panel states the arcade's operating ritual and hands today's answer to the Facebook page it updates itself; the three empty “Seasonal — check Facebook” rows the 27 July 2026 review asked to be replaced are gone, and the panel holds a designed, sourced home for confirmed hours if the arcade ever publishes them. Dodgems, VR games and arcade machines are the verified attractions and the list is closed: no tokens, tickets, 2p machines, party packages, loyalty cards, prices or family-offer specifics appear, because none are in the record.</p>\n        <p>The home screen puts a pair of generated illustrative promenade plates in the first viewport beside the brand — a light plate and a lit sibling showing an indicative Central Promenade frontage with the sea and the Mournes — and the attractions screen carries the same plates below its opening. Below the fifty-summers band, a generated comic storyboard — two three-panel strips with the step descriptions under each strip — stages the verified afternoon (promenade, change, floor, dodgems, VR, back out to the sea). The plates and storyboard are labelled as AI-generated artwork and indicative, not a survey; the light promenade plate is the no-JavaScript and reduced-motion default, and the visitor's local clock may select the lit sibling. The late-1960s BBC memory sits just below the home opening as supporting voice rather than as the first-viewport visual. The 2023 CC BY-SA exterior photograph was withdrawn from use on 26 July 2026 and stays withdrawn; it was not used as a reference for the plates. The K-and-A mark in the header is concept work, not the business's own artwork. Content is limited to the Newcastle, Co. Down site and does not refer to any same-named arcade elsewhere. The proposed page is an independent concept, not a commissioned redesign.</p>\n        <ul>\n          <li><a href=\"https://www.facebook.com/kentamusementsnewcastle/\" rel=\"external\">Kent Amusements public Facebook page</a></li>\n          <li><a href=\"https://www.instagram.com/kentamusementsnewcastle/\" rel=\"external\">Kent Amusements Instagram</a></li>\n          <li><a href=\"https://www.tripadvisor.com/Attraction_Review-g186478-d14073725\" rel=\"external\">TripAdvisor listing used to verify current trading and VR</a></li>\n          <li><a href=\"https://find-and-update.company-information.service.gov.uk/company/NI688147\" rel=\"external\">Companies House record used to verify the business, the address and the November 2025 filing</a></li>\n          <li><a href=\"https://avocahotel.com/activities/uncategorized/kent-amusements/\" rel=\"external\">Avoca Hotel activities listing used for the quoted description, indoor dodgems and phone</a></li>\n          <li><a href=\"https://www.bbc.co.uk/northernireland/yourplaceandmine/down/A781698.shtml\" rel=\"external\">BBC Your Place and Mine memory archive used for the two quoted Newcastle memories</a></li>\n        </ul>\n        <p>No claim is made about sales performance, customer approval, current family offers, opening hours or the owner's plans for a website.</p>\n        <a class=\"button\" href=\"/request/\">Request a free before-and-after for your business <span aria-hidden=\"true\">→</span></a>\n      </div>\n    </div>\n  </section>"
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
    "comparisonIntro": "Drag the handle. The left shows what a first-time visitor currently finds — the bar's Facebook page as it loads without an account; the right shows the proposed first screen.",
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
        "body": "Scopers has no website. Searching for it lands on a Facebook page that greets a first-time visitor with Meta's cookie dialog and a login form — the bar's own introduction, Hot Food Bar by Paul Cunningham, sits greyed out behind them.",
        "change": "A first screen with nothing in front of it, opening on the one remarkable fact: Northern Ireland's first zero-waste hot food bar, on Dundrum's main street."
      },
      {
        "title": "Say the remarkable thing once, plainly",
        "body": "A Great British Menu chef, a zero-waste first, the Mourne Larder and a grandfather's foraging exist only as fragments scattered across feed posts and third-party write-ups.",
        "change": "The story told in three opening lines — chef, provenance, philosophy — with the signature dishes named along the foot of the screen."
      },
      {
        "title": "Keep the supper club visible",
        "body": "The pop-up dinners of up to eleven courses are ticketed through social posts, so the next date exists only for people who happen to scroll past it.",
        "change": "A supper-club card that always holds the next date, with a booking action opening the same Instagram inbox the kitchen already answers."
      }
    ],
    "sourceHtml": "<section class=\"source-section\">\n    <div class=\"shell source-grid\">\n      <div>\n        <p class=\"eyebrow\">Sources &amp; limits</p>\n        <h2>Clear about what is real.</h2>\n      </div>\n      <div>\n        <p>The before image was captured from the bar's public Facebook page on 21 July 2026, with Meta's cookie dialog and login prompt left in place — that is what a first-time visitor without an account meets. The zero-waste-first claim, Paul Cunningham's Great British Menu appearance, the grandfather's foraging, the Mourne Larder, the supper-club format and the signature dishes all come from the bar's public presence and dated third-party features. Every image in the concept is an AI-generated illustration. The dish names and descriptions are quoted from the bar's own public Instagram captions, read on 31 July 2026 \u2014 the pictures are not photographs of their food, their premises or a supper-club night — each generated plate is captioned on the page as a riff on the bar's own posts, and the concept banner and this block say so too. The bar's own round badge is used as the concept's mark, downloaded from its public Instagram profile on 31 July 2026, in place of the redrawn stamp the concept previously carried. The supper-club date of Wednesday 26 August 2026 was read from the same public Instagram on 31 July 2026 and is re-checked before any outreach. Trading pattern — now open most of the week — was confirmed by local first-hand knowledge on 21 July 2026. The proposed page is an independent concept, not a commissioned redesign.</p>\n        <ul>\n          <li><a href=\"https://www.facebook.com/p/Scopers-Dundrum-Co-Down-100083029315116/\" rel=\"external\">Scopers public Facebook page</a></li>\n          <li><a href=\"https://goodfoodireland.ie/scopers-dundrum/\" rel=\"external\">Good Food Ireland feature used for the chef's story</a></li>\n          <li><a href=\"https://www.tripadvisor.co.uk/Restaurant_Review-g1477857-d26533474\" rel=\"external\">TripAdvisor listing used to verify current trading</a></li>\n        </ul>\n        <p>No claim is made about sales performance, customer approval or the owner's plans for a website.</p>\n        <a class=\"button\" href=\"/request/\">Request a free before-and-after for your business <span aria-hidden=\"true\">→</span></a>\n      </div>\n    </div>\n  </section>"
  },
  "tool-centre": {
    "title": "The Tool Centre concept transformation — Mourne Made",
    "description": "A respectful, source-backed first-website concept for The Tool Centre, the hardware and plant-hire shop on Main Street, Newcastle, Co. Down.",
    "eyebrow": "First website · Newcastle, Co. Down",
    "headline": "A trade counter that does not need a login.",
    "date": "22 July 2026",
    "comparisonIntro": "Drag the handle. The left shows what a first-time visitor currently finds — the shop's Facebook page as it loads without an account; the right shows the proposed first screen.",
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
        "body": "No working website was found in the review. Searching for the shop lands on a Facebook page that greets a first-time visitor with Meta's cookie dialog and a login form, while results also include same-named shops in Newcastle-upon-Tyne.",
        "change": "A first screen that opens on the Co. Down address, with hire rates and stock categories reachable without an account — Newcastle, Co. Down named plainly so the Mourne shop is never mistaken for the Tyne ones."
      },
      {
        "title": "Lead with the two offers",
        "body": "Directories list the shop as The Tool Centre; its Facebook page trades as Tool Centre Plant Hire. Online, the two service lines — hardware retail and plant/tool hire — can look like two businesses.",
        "change": "Both screens end on a shelf-and-yard band: hardware & DIY beside plant & tool hire, with one call button underneath. The Facebook trading name appears once as a quiet link; Co. Down is repeated wherever a stranger meets the shop."
      },
      {
        "title": "Make the hire desk the first action",
        "body": "The shop's public pages and directory listings do not give a contractor one clear place to compare hire categories, rates and opening hours.",
        "change": "A hire-desk board with the four categories and a call action opening the number the yard already answers — the page explains the service while Facebook carries day-to-day updates."
      }
    ],
    "sourceHtml": "<section class=\"source-section\">\n    <div class=\"shell source-grid\">\n      <div>\n        <p class=\"eyebrow\">Sources &amp; limits</p>\n        <h2>Clear about what is real.</h2>\n      </div>\n      <div>\n        <p>The before image was captured from the shop's public Facebook page on 22 July 2026, with Meta's cookie dialog and login prompt left in place — that is what a first-time visitor without an account meets. The concept does not mock or invent content from behind that wall. The Main Street address, phone number, seven-day opening hours, Calor gas retail and the dual hardware/plant-hire offering come from public directories and the Calor dealer listing; the Facebook trading name Tool Centre Plant Hire appears once as a quiet link rather than being overwritten. The hire-desk board on the opening screen shows no figure at all; the hire list carries suggested day rates so the shop has something concrete to correct, every card is labelled Suggested, and both screens carry one sentence in the same words: &quot;No rate here is the shop's own — call the counter for today's rate and terms.&quot; None of those figures came from the shop, and weekend and week terms are asked about rather than stated because the record holds none. What a hirer must bring on collection is asked for the same reason. Two Google reviews read on 6 August 2026 supply the customer sentences: Tony&#39;s Reviews (shown as &quot;10 months ago&quot;, October 2025 on the page) on the landing route, and chris keag (shown as &quot;2 years ago&quot;, August 2024 on the page) on the hire list — each quoted verbatim and attributed as a Google review with month and year; no star rating is stated. The shop review also praises prices and staff; the hire review names Tony and Gerard inside the quotation only. The concept introduces no photography; the circular yellow-and-black mark is concept work suggested by the shop's own Facebook badge, not the badge itself. The proposed page is an independent concept, not a commissioned redesign.</p>\n        <ul>\n          <li><a href=\"https://www.facebook.com/Toolcentreplanthire/\" rel=\"external\">Tool Centre Plant Hire public Facebook page</a></li>\n          <li><a href=\"https://www.bigreddirectory.com/tool-centre-newcastle\" rel=\"external\">Big Red Directory listing used for address and hours</a></li>\n          <li><a href=\"https://www.calorgas.ie/cylinder-dealers/Newcastle-BT33-0AE-Tool-Centre-8001144\" rel=\"external\">Calor dealer listing used to confirm gas retail</a></li>\n        </ul>\n        <p>No claim is made about sales performance, customer approval or the owner's plans for a website.</p>\n        <a class=\"button\" href=\"/request/\">Request a free before-and-after for your business <span aria-hidden=\"true\">→</span></a>\n      </div>\n    </div>\n  </section>"
  }
} satisfies Record<string, TransformationDetail>;
