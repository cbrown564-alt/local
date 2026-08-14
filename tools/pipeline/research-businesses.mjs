import fs from "node:fs/promises";
import path from "node:path";

const AS_OF = "2026-07-17";
const ROOT = path.resolve(import.meta.dirname, "..", "..");

const places = {
  Dundrum: { lat: 54.259, lon: -5.844, radius: 2200 },
  Newcastle: { lat: 54.215, lon: -5.89, radius: 3500 },
};

const googleMapsSeed = {
  Dundrum: [
    ["Dunmore Construction", "http://www.dunmoreconstruction.com/", "https://www.google.com/maps/place/Dunmore+Construction/data=!4m7!3m6!1s0x48613da678c5acab:0x607307e9b2163a5f!8m2!3d54.2625126!4d-5.8397314!16s%2Fg%2F11ddwsbs29"],
    ["Joseph McClune & Sons Ltd", "https://josephmcclune.co.uk/", "https://www.google.com/maps/place/Joseph+McClune+%26+Sons+Ltd/data=!4m7!3m6!1s0x48613d07770c123f:0x83e7653fac9fa730!8m2!3d54.2546908!4d-5.8510742"],
    ["Maranco", "", "https://www.google.com/maps/place/Maranco/data=!4m7!3m6!1s0x48613d08ed518507:0x7a018a0625593afd!8m2!3d54.2572838!4d-5.8453876"],
    ["Exploiting Technology Ltd", "http://exploiting-technology.com/", "https://www.google.com/maps/place/Exploiting+Technology+Ltd/data=!4m7!3m6!1s0x48613da62f629763:0x40d5dc9176b69416!8m2!3d54.2605309!4d-5.841852"],
    ["Dundrum Castle", "https://www.communities-ni.gov.uk/heritage-sites/dundrum-castle", "https://www.google.com/maps/place/Dundrum+Castle/data=!4m7!3m6!1s0x48613da847de4549:0xaba784db9c3cf161!8m2!3d54.2625582!4d-5.8455721"],
    ["Castle Farm Fresh Produce", "https://www.castlefarmni.com/", "https://www.google.com/maps/place/Castle+Farm+Fresh+Produce/data=!4m7!3m6!1s0x48613d0b384805c5:0x9ac0e5068d4ff3ab!8m2!3d54.264296!4d-5.851389"],
    ["Dundrum WwTW", "http://www.niwater.com/", "https://www.google.com/maps/place/Dundrum+WwTW/data=!4m7!3m6!1s0x48613d83c9349903:0xa29e16a334e0264!8m2!3d54.2528333!4d-5.8523544"],
    ["Kelly, McEvoy & Brown Building Contractors", "http://www.kmbni.com/", "https://www.google.com/maps/place/Kelly,+McEvoy+%26+Brown+Building+Contractors/data=!4m7!3m6!1s0x486122efaeaf9561:0x37dcdf660f6d013b!8m2!3d54.2578944!4d-5.8467775"],
    ["Rooneys", "", "https://www.google.com/maps/place/Rooneys/data=!4m7!3m6!1s0x48613da89bf09e3b:0xa3e55963a1815b6!8m2!3d54.2621221!4d-5.8409881"],
    ["Hamill Harty Limited", "http://www.hamillharty.com/", "https://www.google.com/maps/place/Hamill+Harty+Limited/data=!4m7!3m6!1s0x48613d8715c0d3c5:0xdd6fb03178adfbf1!8m2!3d54.2600413!4d-5.8525057"],
    ["Scopers", "", "https://www.google.com/maps/place/Scopers/data=!4m7!3m6!1s0x48613db9bcca7109:0x1f52c6abeb6c91ba!8m2!3d54.2568299!4d-5.8466888"],
    ["Cupla", "", "https://www.google.com/maps/place/Cupla/data=!4m7!3m6!1s0x48613d00259d60eb:0xbba31966ab63fb9c!8m2!3d54.258071!4d-5.8431276"],
    ["Tonn Ruray Café", "https://www.tonnruray.com/", "https://www.google.com/maps/place/Tonn+Ruray+Caf%C3%A9/data=!4m7!3m6!1s0x48613da89a752e67:0x1ff5ecf9d5a95082!8m2!3d54.2594296!4d-5.8413017"],
    ["Murdock Brothers", "http://murdocksoilcoalandgas.co.uk/", "https://www.google.com/maps/place/Murdock+Brothers/data=!4m7!3m6!1s0x48613da2c03a4377:0x890e9c37b6351a01!8m2!3d54.2700611!4d-5.8363964"],
    ["DHL eCommerce ServicePoint Dundrum", "https://www.dhl.com/gb-en/ecommerce/uk/business-services/servicepoints.html", "https://www.google.com/maps/place/DHL+eCommerce+ServicePoint+Dundrum/data=!4m7!3m6!1s0x48613da23178787d:0x2f95f5e4b4a6b78f!8m2!3d54.2576077!4d-5.8444488"],
    ["The Buck's Head", "https://thebucksheaddundrum.co.uk/", "https://www.google.com/maps/place/The+Buck%27s+Head/data=!4m7!3m6!1s0x48613da88dcd1c8f:0x503a37fa8324ccb4!8m2!3d54.2588533!4d-5.841673"],
    ["Dundrum Butters Ltd.", "https://www.bettysbetterbutters.com/", "https://www.google.com/maps/place/Dundrum+butters+Ltd./data=!4m7!3m6!1s0x48613d78d8c40345:0x43160b1c2d8b8f58!8m2!3d54.2596911!4d-5.8409619"],
    ["InPost Shop", "https://inpost.co.uk/lockers/UK00427044", "https://www.google.com/maps/place/InPost+Shop/data=!4m7!3m6!1s0x48613d0eec141dbf:0x1a6859b0405957b5!8m2!3d54.25748!4d-5.84444"],
  ],
  Newcastle: [
    ["Reencon Development Services Ltd", "http://www.reencon.co.uk/", "https://www.google.com/maps/place/Reencon+Development+Services+Ltd/data=!4m7!3m6!1s0x48613cad4b5790ef:0xae5f871c0feaa54d!8m2!3d54.2147598!4d-5.8885566"],
    ["Crebisol Limited", "https://www.crebisol.com/shop/", "https://www.google.com/maps/place/Crebisol+Limited/data=!4m7!3m6!1s0x48613d785664f9ff:0xa7618d3e73dbebff!8m2!3d54.2129936!4d-5.8888413"],
    ["Newcastle Business Centre", "", "https://www.google.com/maps/place/Newcastle+Business+Centre/data=!4m7!3m6!1s0x48613cacbfc8d18f:0x7bd55cb033b3ce35!8m2!3d54.2094261!4d-5.890711"],
    ["Kent Amusements", "https://m.facebook.com/kentamusementsnewcastle/", "https://www.google.com/maps/place/Kent+Amusements/data=!4m7!3m6!1s0x48612354b31afe4f:0xaf994dda0f3576ff!8m2!3d54.2075091!4d-5.8925314"],
    ["Painted Earth", "", "https://www.google.com/maps/place/Painted+Earth/data=!4m7!3m6!1s0x48613cb274c5f3e5:0x142d4d8d0e251f1f!8m2!3d54.211454!4d-5.889706"],
    ["Eamonn P McGrady & Co", "https://www.eamonnmcgrady.co.uk/", "https://www.google.com/maps/place/Eamonn+P+McGrady+%26+Co/data=!4m7!3m6!1s0x48613cada50e8d5d:0x7b4dec6776b2f73c!8m2!3d54.2120645!4d-5.8889748"],
    ["Newcastle Jobs & Benefits Office", "https://www.nidirect.gov.uk/contacts/newcastle-jobs-benefits-office", "https://www.google.com/maps/place/Newcastle+Jobs+%26+Benefits+Office/data=!4m7!3m6!1s0x48613cb20cd8a91d:0x741ebed63d963411!8m2!3d54.2122883!4d-5.890979"],
    ["Newcastle Chamber Of Commerce", "", "https://www.google.com/maps/place/Newcastle+Chamber+Of+Commerce/data=!4m7!3m6!1s0x48613cad89b4ff2b:0xfccb62da20c0b318!8m2!3d54.214692!4d-5.8883328"],
    ["Reencon Chartered Surveyors", "https://www.reenconsurveyors.co.uk/", "https://www.google.com/maps/place/Reencon+Chartered+Surveyors/data=!4m7!3m6!1s0x48613dcd46409b35:0x787531722d670ae9!8m2!3d54.2147584!4d-5.8885222"],
    ["South Down Signs", "http://southdownsigns.co.uk/", "https://www.google.com/maps/place/South+Down+Signs/data=!4m7!3m6!1s0x48613cb7e91a4bc9:0x45981c912f9dd7b6!8m2!3d54.2243632!4d-5.8832739"],
    ["Newcastle Visitor Information Centre | Northern Ireland", "http://www.visitmournemountains.co.uk/", "https://www.google.com/maps/place/Newcastle+Visitor+Information+Centre+%7C+Northern+Ireland/data=!4m7!3m6!1s0x48613cacba6fb11d:0x97ae1d8c6a53b315!8m2!3d54.2093097!4d-5.8907452"],
    ["The Tool Centre", "", "https://www.google.com/maps/place/The+Tool+Centre/data=!4m7!3m6!1s0x48613da847de4549:0x606ba57e3185bff0!8m2!3d54.2119081!4d-5.8898773"],
    ["Malone Accounting", "https://maloneaccounting.co.uk/", "https://www.google.com/maps/place/Malone+Accounting/data=!4m7!3m6!1s0x4861235350cb1f21:0x6ae94d00aa0dd7bd!8m2!3d54.2083218!4d-5.8927017"],
    ["Golf Links House", "http://golflinkshouse.com/", "https://www.google.com/maps/place/Golf+Links+House/data=!4m10!3m9!1s0x48613cb7aa9c4703:0x852815e02b9e0798!5m2!4m1!1i2!8m2!3d54.2224693!4d-5.8839807"],
    ["Emo Oil - Newcastle", "", "https://www.google.com/maps/place/Emo+Oil+-+Newcastle/data=!4m7!3m6!1s0x48613cb7e7e3c45d:0x68e93201496c839d!8m2!3d54.2217231!4d-5.8854238"],
    ["Regal Fabrication Company", "https://www.regalfabricationcompany.com/", "https://www.google.com/maps/place/REGAL+FABRICATION+COMPANY/data=!4m7!3m6!1s0x48613cb694b27507:0x22881a248f5fbf0!8m2!3d54.2209601!4d-5.8877437"],
  ],
};

const directorySeed = [
  ["Bao & Bento", "Food & drink", 5, 1], ["Hugh McCanns", "Food & drink", 0, 0],
  ["Savoy Cafe", "Café", 5, 4], ["The Anchor Bar", "Pub", 3, 2],
  ["Morellis", "Café", 0, 0], ["Diamond Pats", "Restaurant", 3, 2],
  ["The Strand", "Restaurant", 3.7, 3], ["Seasalt", "Café", 0, 0],
  ["Broadway Cafe", "Café", 3.4, 7], ["Exotikka", "Takeaway", 4.8, 5],
  ["John Macs", "Takeaway", 5, 2], ["Cafe Mauds", "Café", 2, 2],
  ["Cafe Creme", "Café", 0, 0], ["Sea Palace", "Restaurant", 3, 2],
  ["Subway", "Takeaway", 0, 0], ["Grahams Ice Cream", "Food & drink", 5, 1],
  ["KFC", "Takeaway", 1.5, 2], ["Country Fried Chicken", "Takeaway", 0, 0],
  ["Quinns", "Pub", 2.3, 3], ["Slieve Donard", "Hotel", 0, 0],
  ["Percy French", "Restaurant", 0, 0], ["Nutty Chefs", "Takeaway", 5, 1],
  ["Peking Corner", "Takeaway", 5, 1], ["Top Of The Town", "Café", 0, 0],
  ["Donard Hotel", "Hotel", 5, 1], ["Villa Vinci", "Restaurant", 5, 1],
  ["Vanilla", "Restaurant", 0, 0], ["Harbour House Inn", "Pub & restaurant", 0, 0],
  ["O’Hares Lounge Bars", "Pub & accommodation", 0, 0], ["Donard Bar", "Pub", 2.3, 3],
  ["The Arlington Bar", "Pub", 0, 0], ["The Avoca Hotel", "Hotel", 1, 2],
  ["Tip Top Sweet Shop", "Retail", 4.8, 4], ["Emerald Gardening Services", "Garden services", 0, 0],
].map(([name, category, rating, reviews]) => ({
  name, town: "Newcastle", category, rating, reviews,
  sourceUrl: category === "Retail"
    ? "https://newcastle-county-down.com/places/category/shops/"
    : category === "Garden services"
      ? "https://newcastle-county-down.com/places/category/services/"
      : category.includes("Hotel") || category.includes("accommodation")
        ? "https://newcastle-county-down.com/places/category/accommodation/"
        : category.includes("Pub")
          ? "https://newcastle-county-down.com/places/category/pubs-clubs/"
          : "https://newcastle-county-down.com/places/category/food/",
}));

const chainNames = new Set([
  "boots", "card factory", "dhl ecommerce servicepoint dundrum", "emo oil newcastle", "inpost shop",
  "kfc", "lidl", "mace", "nisa", "post office", "spar", "subway", "supervalu", "tesco",
  "ulster bank", "vodafone", "winemark",
]);

const socialHosts = ["facebook.com", "instagram.com", "m.facebook.com", "x.com", "twitter.com"];

function norm(value = "") {
  return value.normalize("NFKD").replace(/[’‘]/g, "'").replace(/&amp;/g, "&")
    .replace(/[^a-zA-Z0-9]+/g, " ").trim().toLowerCase();
}

const canonicalAliases = new Map([
  ["bao and bento", "bao bento"],
  ["chinese sea palace", "sea palace"],
  ["tonn ruray", "tonn ruray cafe"],
]);

function recordKey(town, name) {
  const normalized = norm(name);
  return `${town}|${canonicalAliases.get(normalized) || normalized}`;
}

function slug(value) {
  return norm(value).replaceAll(" ", "-");
}

function distanceMetres(a, b) {
  const r = 6371000;
  const p1 = a.lat * Math.PI / 180;
  const p2 = b.lat * Math.PI / 180;
  const dp = (b.lat - a.lat) * Math.PI / 180;
  const dl = (b.lon - a.lon) * Math.PI / 180;
  const x = Math.sin(dp / 2) ** 2 + Math.cos(p1) * Math.cos(p2) * Math.sin(dl / 2) ** 2;
  return 2 * r * Math.asin(Math.sqrt(x));
}

async function fetchOverpass(placeName, place) {
  const selectors = ["shop", "amenity", "office", "craft", "tourism", "leisure", "healthcare"]
    .map((key) => `nwr(around:${place.radius},${place.lat},${place.lon})["name"]["${key}"];`).join("");
  const query = `[out:json][timeout:90];(${selectors});out center tags;`;
  const body = new URLSearchParams({ data: query });
  const response = await fetch("https://overpass.kumi.systems/api/interpreter", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded", "user-agent": "LocalBusinessResearch/1.0" },
    body,
  });
  if (!response.ok) throw new Error(`Overpass ${placeName}: ${response.status}`);
  const json = await response.json();
  return json.elements.map((element) => ({ ...element, discoveredFor: placeName }));
}

function latLon(element) {
  return { lat: element.lat ?? element.center?.lat ?? null, lon: element.lon ?? element.center?.lon ?? null };
}

function classify(tags, name) {
  const n = norm(name);
  const subtype = tags.shop || tags.amenity || tags.office || tags.craft || tags.tourism || tags.leisure || tags.healthcare || "other";
  let category = "Other";
  if (tags.shop) category = "Retail";
  if (["restaurant", "cafe", "fast_food", "pub", "bar", "ice_cream", "food_court"].includes(tags.amenity)) category = "Food & drink";
  else if (["hotel", "guest_house", "hostel", "apartment", "camp_site", "caravan_site"].includes(tags.tourism)) category = "Accommodation";
  else if (tags.office) category = "Professional services";
  else if (tags.craft) category = "Trades & services";
  else if (tags.healthcare || ["pharmacy", "dentist", "doctors", "clinic", "hospital"].includes(tags.amenity)) category = "Health & wellbeing";
  else if (["hairdresser", "beauty", "massage", "optician"].includes(tags.shop)) category = "Beauty & personal care";
  else if (tags.leisure) category = "Sport & leisure";
  else if (tags.tourism) category = "Tourism & attraction";
  else if (["school", "library", "police", "fire_station", "post_office", "townhall", "place_of_worship", "community_centre"].includes(tags.amenity)) category = "Community & public service";

  let entityType = "Independent / ownership unverified";
  if (chainNames.has(n) || tags.brand || tags.wikidata) entityType = "Larger chain / brand";
  if (["school", "library", "police", "fire_station", "townhall", "hospital"].includes(tags.amenity)) entityType = "Public service";
  if (tags.office === "ngo" || /charity|trust|association|community/i.test(name)) entityType = "Charity / community";
  if (tags.leisure === "sports_centre" || /club\b|scouts?\b/i.test(name)) entityType = "Club";
  if (/castle|reserve|forest park|country park|statue|memorial|public park/i.test(name)) entityType = "Public attraction";
  return { category, subtype, entityType };
}

function websiteState(website) {
  if (!website) return "No website found";
  try {
    const u = new URL(website);
    if (socialHosts.some((host) => u.hostname.endsWith(host))) return "Social page only";
    if (u.protocol === "http:") return "HTTP website";
    return "HTTPS website";
  } catch {
    return "Website value needs review";
  }
}

function contactValue(tags, key) {
  return tags[`contact:${key}`] || tags[key] || "";
}

function addressFrom(tags) {
  return [tags["addr:housenumber"], tags["addr:street"], tags["addr:city"], tags["addr:postcode"]]
    .filter(Boolean).join(", ");
}

function applyScores(row) {
  let need = 0;
  if (row.websiteStatus === "No website found") need += 50;
  else if (row.websiteStatus === "Social page only") need += 35;
  else if (row.websiteStatus === "HTTP website") need += 22;
  if (!row.email) need += 12;
  if (!row.phone) need += 10;
  if (!row.googleMapsVerified) need += 8;
  row.digitalNeedScore = Math.min(100, need);

  const typeBase = {
    "Independent / ownership unverified": 58,
    "Charity / community": 28,
    Club: 24,
    "Public service": 15,
    "Public attraction": 18,
    "Larger chain / brand": 12,
  }[row.entityType] ?? 30;
  const categoryBoost = {
    Accommodation: 24,
    "Food & drink": 22,
    Retail: 17,
    "Professional services": 18,
    "Beauty & personal care": 18,
    "Tourism & attraction": 14,
    "Trades & services": 12,
    "Health & wellbeing": 12,
    "Sport & leisure": 10,
  }[row.category] ?? 5;
  row.paymentLikelihoodScore = Math.min(100, typeBase + categoryBoost + (row.phone ? 4 : 0) + (row.email ? 4 : 0));
  row.priorityScore = Math.round(row.digitalNeedScore * 0.55 + row.paymentLikelihoodScore * 0.45);
  row.communityOpportunity = ["Charity / community", "Club", "Public service", "Public attraction"].includes(row.entityType)
    || (row.digitalNeedScore >= 65 && row.paymentLikelihoodScore < 55) ? "High" : "Standard";
  row.priorityReason = row.digitalNeedScore >= 70
    ? "Weak or missing owned digital/contact assets"
    : row.paymentLikelihoodScore >= 75
      ? "Strong visual/commercial case for a transformation"
      : "Research and qualify before outreach";
  return row;
}

function mergeRows(base, incoming) {
  for (const key of ["website", "email", "phone", "facebook", "instagram", "address", "lat", "lon", "category", "subcategory"]) {
    if (!base[key] && incoming[key]) base[key] = incoming[key];
  }
  if (incoming.googleMapsVerified) {
    base.googleMapsUrl = incoming.googleMapsUrl;
    base.googleMapsVerified = true;
  }
  if (incoming.directoryRating != null) {
    base.directoryRating = incoming.directoryRating;
    base.directoryReviewCount = incoming.directoryReviewCount;
  }
  base.sourceUrls = [...new Set([...(base.sourceUrls || []), ...(incoming.sourceUrls || [])])];
  base.discoverySources = [...new Set([...(base.discoverySources || []), ...(incoming.discoverySources || [])])];
  if (base.entityType === "Independent / ownership unverified" && incoming.entityType && incoming.entityType !== base.entityType) {
    base.entityType = incoming.entityType;
  }
  return base;
}

const osmElements = [];
for (const [name, place] of Object.entries(places)) {
  osmElements.push(...await fetchOverpass(name, place));
}
const osmById = new Map();
for (const element of osmElements) {
  const key = `${element.type}/${element.id}`;
  if (!osmById.has(key)) osmById.set(key, element);
}

const rows = [];
for (const element of osmById.values()) {
  const tags = element.tags || {};
  const coords = latLon(element);
  if (!tags.name || coords.lat == null || coords.lon == null) continue;
  const town = Object.entries(places)
    .map(([name, p]) => [name, distanceMetres(coords, p)])
    .sort((a, b) => a[1] - b[1])[0][0];
  const { category, subtype, entityType } = classify(tags, tags.name);
  const website = contactValue(tags, "website") || tags.url || "";
  const osmUrl = `https://www.openstreetmap.org/${element.type}/${element.id}`;
  rows.push({
    id: `${slug(town)}-${slug(tags.name)}`,
    name: tags.name,
    town,
    category,
    subcategory: subtype,
    entityType,
    address: addressFrom(tags),
    postcode: tags["addr:postcode"] || "",
    phone: contactValue(tags, "phone"),
    email: contactValue(tags, "email"),
    website,
    facebook: tags["contact:facebook"] || tags.facebook || "",
    instagram: tags["contact:instagram"] || tags.instagram || "",
    googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${tags.name}, ${town}, County Down`)}`,
    googleMapsVerified: false,
    googleRating: null,
    googleReviewCount: null,
    directoryRating: null,
    directoryReviewCount: null,
    lat: coords.lat,
    lon: coords.lon,
    websiteStatus: websiteState(website),
    discoverySources: ["OpenStreetMap"],
    sourceUrls: [osmUrl],
    sourceAsOf: AS_OF,
    dataConfidence: "Public listing; ownership and trading status not independently confirmed",
  });
}

const consolidated = new Map(rows.map((row) => [recordKey(row.town, row.name), row]));

for (const [town, entries] of Object.entries(googleMapsSeed)) {
  for (const [name, website, mapsUrl] of entries) {
    const key = recordKey(town, name);
    const coordsMatch = mapsUrl?.match(/!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/);
    const incoming = {
      id: `${slug(town)}-${slug(name)}`,
      name, town,
      category: "Other",
      subcategory: "Google Maps result",
      entityType: chainNames.has(norm(name)) ? "Larger chain / brand" : "Independent / ownership unverified",
      address: "", postcode: "", phone: "", email: "", website,
      facebook: socialHosts.some((host) => website.includes(host)) ? website : "", instagram: "",
      googleMapsUrl: mapsUrl, googleMapsVerified: true, googleRating: null, googleReviewCount: null,
      directoryRating: null, directoryReviewCount: null,
      lat: coordsMatch ? parseFloat(coordsMatch[1]) : null,
      lon: coordsMatch ? parseFloat(coordsMatch[2]) : null,
      websiteStatus: websiteState(website),
      discoverySources: ["Google Maps broad business search"], sourceUrls: [mapsUrl], sourceAsOf: AS_OF,
      dataConfidence: "Direct Google Maps result; metrics require periodic refresh",
    };
    if (consolidated.has(key)) mergeRows(consolidated.get(key), incoming);
    else consolidated.set(key, incoming);
  }
}

for (const entry of directorySeed) {
  const key = recordKey(entry.town, entry.name);
  const incoming = {
    id: `${slug(entry.town)}-${slug(entry.name)}`,
    name: entry.name, town: entry.town, category: entry.category, subcategory: "Local directory listing",
    entityType: chainNames.has(norm(entry.name)) ? "Larger chain / brand" : "Independent / ownership unverified",
    address: "", postcode: "", phone: "", email: "", website: "", facebook: "", instagram: "",
    googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${entry.name}, Newcastle, County Down`)}`,
    googleMapsVerified: false, googleRating: null, googleReviewCount: null,
    directoryRating: entry.rating, directoryReviewCount: entry.reviews, lat: null, lon: null,
    websiteStatus: "No website found", discoverySources: ["Newcastle County Down local directory"],
    sourceUrls: [entry.sourceUrl], sourceAsOf: AS_OF,
    dataConfidence: "Local directory listing; trading status and metrics not independently confirmed",
  };
  if (consolidated.has(key)) mergeRows(consolidated.get(key), incoming);
  else consolidated.set(key, incoming);
}

const finalRows = [...consolidated.values()].map((row) => {
  row.websiteStatus = websiteState(row.website);
  row.googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(`${row.name} ${row.town} County Down`)}`;
  row.sourceUrls = [...new Set(row.sourceUrls)];
  row.discoverySources = [...new Set(row.discoverySources)];
  return applyScores(row);
}).sort((a, b) => b.priorityScore - a.priorityScore || a.town.localeCompare(b.town) || a.name.localeCompare(b.name));

const outputDir = path.join(ROOT, "src", "data");
const researchDir = path.join(ROOT, "research");
await fs.mkdir(outputDir, { recursive: true });
await fs.mkdir(researchDir, { recursive: true });
await fs.writeFile(path.join(outputDir, "businesses.json"), `${JSON.stringify(finalRows, null, 2)}\n`, "utf8");

const summary = {
  asOf: AS_OF,
  geographicMethod: "2.2 km radius around Dundrum and 3.5 km radius around Newcastle; overlap assigned to the nearer centre",
  discoverySources: [
    "OpenStreetMap Overpass named shop/amenity/office/craft/tourism/leisure/healthcare features",
    "Google Maps broad business searches for each town",
    "Newcastle County Down local directory category pages",
  ],
  totalRecords: finalRows.length,
  byTown: Object.fromEntries(Object.keys(places).map((town) => [town, finalRows.filter((row) => row.town === town).length])),
  directGoogleMapsRecords: finalRows.filter((row) => row.googleMapsVerified).length,
  recordsWithWebsite: finalRows.filter((row) => row.website).length,
  recordsWithPhone: finalRows.filter((row) => row.phone).length,
  recordsWithEmail: finalRows.filter((row) => row.email).length,
  caveat: "This is a source-bounded public-listing census, not proof that every trading business is registered online or currently active.",
};
await fs.writeFile(path.join(researchDir, "discovery-summary.json"), `${JSON.stringify(summary, null, 2)}\n`, "utf8");

console.log(JSON.stringify(summary, null, 2));
