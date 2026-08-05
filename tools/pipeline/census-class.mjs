/**
 * What a census row actually is.
 *
 * `src/site/data/businesses.json` is a census: a catalogue of everything found
 * in public listings for Dundrum and Newcastle. A census row is a *place that
 * was listed*, not a business. The catalogue contains walking trails, car
 * parks, graveyards, a waste-water treatment works, churches, the police
 * station and a road called "High Mournes scenic loop", alongside real shops
 * and cafés.
 *
 * Nothing published may count raw census rows. `docs/CONTEXT.md` defines the
 * distinction; this module is where it is applied, once, so every downstream
 * count means the same thing. See ADR 0004 for why it exists: the census was
 * about to be published as "N local businesses have no website", which would
 * have asserted that Royal County Down Golf Course, KFC and two graveyards are
 * local businesses without websites.
 *
 * Classification is by OpenStreetMap tag first (`subcategory`), because that is
 * the most reliable signal in the data. Rows whose tag is absent or useless
 * fall through to entity type, then to an explicit name list. Anything still
 * unresolved is `Needs review` — never silently promoted to a business.
 */

/** The publishable universe. Everything else is excluded from any count. */
export const TRADING = "Trading business";
/** A branch of a national or international brand. Has a website; not ours. */
export const CHAIN = "Chain branch";
/** Council, health, education, emergency services, benefits, tourism offices. */
export const PUBLIC_SERVICE = "Public service";
/** Churches, charities, clubs, community centres, trade associations. */
export const COMMUNITY = "Community organisation";
/** Parks, trails, beaches, nature reserves, viewpoints — places, not traders. */
export const PLACE = "Place, not a business";
/** Car parks, treatment works, parcel lockers, EV chargers, bus stations. */
export const INFRASTRUCTURE = "Infrastructure";
/** Verified as no longer trading. Excluded from every count. */
export const CLOSED = "Closed";
/** Could not be classified from the data held. Excluded from every count. */
export const NEEDS_REVIEW = "Needs review";

/**
 * Brands whose web presence is supplied nationally or regionally, typed as
 * independents by the census because the name carries no chain keyword. The
 * test is not ownership — a SPAR franchisee genuinely owns their shop — but
 * whether the premises needs a website of its own. A branch of a national or
 * regional brand does not, so counting it as a local business without a
 * website overstates the claim.
 *
 * Names must match the census row *after* verification corrections.
 */
const CHAIN_NAMES = new Set([
  "Around A Pound",
  "Brennan's",
  "DV8",
  "Emo Oil - Newcastle",
  "Fix Auto Newcastle NI",
  "Gordons Chemist",
  "Herrons Country Fried Chicken",
  "Home Instead Care Agency",
  "McKeevers Chemists",
  "MediCare - Thorntons Pharmacy",
  "Morelli's Ice Cream",
  "Morellis",
  "Sea Spar",
  "Simon Brien Bradley",
  "SpecsXpress Opticians",
  "Toals Bookmakers",
]);

/**
 * OpenStreetMap tags that are definitively not a trading business. Everything
 * absent from this table and from `NON_TRADING_CATEGORIES` is treated as
 * commercial, which is the right default: the commercial tags are the long
 * tail (tattoo, sewing, podiatrist, seafood…) and enumerating them would rot.
 */
const TAG_CLASS = new Map(Object.entries({
  // Landscape and amenity features. No trading entity exists behind these.
  information: PLACE,
  playground: PLACE,
  park: PLACE,
  picnic_site: PLACE,
  viewpoint: PLACE,
  nature_reserve: PLACE,
  grave_yard: PLACE,
  artwork: PLACE,
  wilderness_hut: PLACE,
  attraction: PLACE,
  garden: PLACE,
  swimming_pool: PLACE,
  water_park: PLACE,

  // Built infrastructure.
  parking: INFRASTRUCTURE,
  charging_station: INFRASTRUCTURE,
  bus_station: INFRASTRUCTURE,

  // Public services.
  school: PUBLIC_SERVICE,
  educational_institution: PUBLIC_SERVICE,
  fire_station: PUBLIC_SERVICE,
  police: PUBLIC_SERVICE,
  library: PUBLIC_SERVICE,
  doctors: PUBLIC_SERVICE,
  social_facility: PUBLIC_SERVICE,

  // Community life.
  place_of_worship: COMMUNITY,
  religion: COMMUNITY,
  charity: COMMUNITY,
  community_centre: COMMUNITY,
  business_association: COMMUNITY,

  // Tags carrying no information at all: OSM's bare `building=yes` and the two
  // placeholders the census writes when a row came from Maps or a directory
  // rather than from OSM. These fall through to the name rules below.
  yes: null,
  "Local directory listing": null,
  "Google Maps result": null,
}));

/** Census categories that are never a trading business regardless of tag. */
const NON_TRADING_CATEGORIES = new Map(Object.entries({
  "Community & public service": COMMUNITY,
}));

/**
 * Rows the tags get wrong, by exact name. Kept explicit and small: a name list
 * that grows without bound is a sign the tag rules above need work instead.
 */
const BY_NAME = new Map(Object.entries({
  // Untagged walking routes and a road, all tagged `yes` under Tourism.
  "High Mournes scenic loop": PLACE,
  "Mourne Coastal Route": PLACE,
  "Granite Trail": PLACE,
  "The Granite Trail": PLACE,
  "Slieve Donard Trail, Mournes": PLACE,
  "Newcastle Challenge Trail": PLACE,
  "Newcastle Heritage Trail - Old Railway Station": PLACE,
  "Murlough South End Nature Trail": PLACE,
  "Murlough South End Nature Trail, Murlough": PLACE,
  "Murlough North Point Nature Trail, Murlough": PLACE,
  "Murlough Woodland Walk, Murlough": PLACE,
  "Dundrum Coastal Path, Murlough": PLACE,
  "Tollymore Forest Park Entrance": PLACE,
  "Tollymore Arboretum": PLACE,
  "Tollymore Forest": PLACE,
  "Tollymore Forest Park": PLACE,
  "Tollymore Forest Park Play Park": PLACE,
  "Parkaneety Graveyard": PLACE,
  "Drumee Cemetery": PLACE,
  "Castle Park": PLACE,
  "Donard Park": PLACE,
  // Council seawater pool — closed since ~2019, never a private trader.
  "Rock Pool": PLACE,

  // Infrastructure that reads as a business in a Maps listing.
  "Dundrum WwTW": INFRASTRUCTURE,
  "DHL eCommerce ServicePoint Dundrum": INFRASTRUCTURE,
  "InPost Shop": INFRASTRUCTURE,
  "Banking Hub": INFRASTRUCTURE,

  // Public services that arrived untagged from Google Maps / council pages.
  "Newcastle Visitor Information Centre | Northern Ireland": PUBLIC_SERVICE,
  "Newcastle Jobs & Benefits Office": PUBLIC_SERVICE,
  "Newcastle Tourist Information Centre": PUBLIC_SERVICE,
  "Newcastle Centre": PUBLIC_SERVICE,
  "Tropicana": PUBLIC_SERVICE,
  "Tropicana Outdoor Swimming Complex": PUBLIC_SERVICE,
  "Knockevin Early Years Centre": PUBLIC_SERVICE,

  // Mutual / community finance mistyped as a brand chain via OSM.
  "Dromara & Drumgooland CreditUnion Ltd": COMMUNITY,
  "YMCA": COMMUNITY,

  // Private club with a famous site — OSM/wikidata marked it as a brand chain.
  // It trades (green fees, membership) and is not a multi-branch retail brand.
  "Royal County Down Golf Course": TRADING,
}));

/**
 * Classifies one census row. Pure: same row in, same class out, no network.
 *
 * @param {object} row a record from `src/site/data/businesses.json`
 * @returns {string} one of the exported class constants
 */
export function censusClass(row) {
  // Explicit name rules first: they correct tag and entity-type errors, and
  // they outrank a Closed verification on rows that were never businesses
  // (Rock Pool is a shut council amenity, not a closed shop).
  const byName = BY_NAME.get(row.name);
  if (byName) return byName;

  // A trading business confirmed shut is not a dark prospect.
  if (row.verification?.tradingStatus === "Closed") return CLOSED;

  if (CHAIN_NAMES.has(row.name)) return CHAIN;

  // Definitive OSM tags outrank a wrong "Larger chain / brand" entity type —
  // Tollymore Forest and YMCA were both typed as chains while tagged park /
  // charity.
  const byTag = TAG_CLASS.get(row.subcategory);
  if (byTag) return byTag;

  // Entity type is set by the normaliser's own derivation rules and by
  // verification, so it outranks weak tags (null placeholders) below.
  if (row.entityType === "Larger chain / brand") return CHAIN;
  if (row.entityType === "Public service") return PUBLIC_SERVICE;
  if (row.entityType === "Charity / community" || row.entityType === "Club") return COMMUNITY;
  if (row.entityType === "Public attraction") return PLACE;

  const byCategory = NON_TRADING_CATEGORIES.get(row.category);
  if (byCategory) return byCategory;

  // A row with no usable tag, no category signal and nothing on the name list
  // is a business only if we hold something that suggests it trades.
  if (byTag === null && row.category === "Other" && !row.website && !row.phone && !row.email) {
    return NEEDS_REVIEW;
  }

  return TRADING;
}

/** True when a row may appear in a published count or on a published map. */
export const isTradingBusiness = (row) => censusClass(row) === TRADING;
