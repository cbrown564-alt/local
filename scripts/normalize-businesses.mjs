import fs from "node:fs/promises";
import path from "node:path";

const file = path.resolve(import.meta.dirname, "..", "src", "data", "businesses.json");
const rows = JSON.parse(await fs.readFile(file, "utf8"));

function norm(value = "") {
  return value.normalize("NFKD").replace(/[’‘]/g, "'").replace(/&amp;/g, "&")
    .replace(/[^a-zA-Z0-9]+/g, " ").trim().toLowerCase();
}

const aliases = new Map([
  ["bao and bento", "bao bento"],
  ["chinese sea palace", "sea palace"],
  ["tonn ruray", "tonn ruray cafe"],
]);

// Public details confirmed on the organisation's own website. These records are
// kept here (rather than inferred from a search snippet) so rerunning the
// normaliser remains deterministic and the supporting page stays visible.
const manualEnrichment = new Map(Object.entries({
  "Newcastle|conlyn house": {
    website: "https://conlynhouse.com/",
    email: "conlynhouse@gmail.com",
    phone: "077 6229 6999",
    address: "11 Downs Road, Newcastle, Co. Down, BT33 0AG",
    sourceUrls: ["https://conlynhouse.com/"],
    discoverySources: ["Official website verification"],
  },
  "Newcastle|dacara": {
    website: "https://www.dacaraguesthouse.com/",
    phone: "028 4372 6745",
    address: "47 South Promenade, Newcastle, Co. Down, BT33 0EY",
    sourceUrls: ["https://www.dacaraguesthouse.com/contact/"],
    discoverySources: ["Official website verification"],
  },
  "Newcastle|hotel enniskeen": {
    website: "https://www.enniskeenhotel.co.uk/",
    email: "info@enniskeenhotel.com",
    phone: "028 4372 2392",
    address: "98 Bryansford Road, Newcastle, Co. Down, BT33 0LF",
    sourceUrls: ["https://enniskeenhotel.co.uk/Contact.html"],
    discoverySources: ["Official website verification"],
  },
  "Newcastle|hutt backpackers hostel": {
    website: "https://hutthostel.com/",
    email: "info@hutthostel.com",
    phone: "028 4372 2133",
    address: "30 Downs Road, Newcastle, Co. Down, BT33 0AG",
    sourceUrls: ["https://hutthostel.com/"],
    discoverySources: ["Official website verification"],
  },
  "Newcastle|little haven guest house": {
    website: "https://www.hughmccanns.com/accommodation/",
    email: "info@hughmccanns.com",
    phone: "028 4372 6622",
    address: "119–121 Central Promenade, Newcastle, Co. Down, BT33 0EU",
    sourceUrls: ["https://www.hughmccanns.com/accommodation/"],
    discoverySources: ["Official website verification"],
  },
  "Newcastle|mountain view lodge": {
    website: "https://theviewsgroup.co.uk/mountain-view-lodge/",
    email: "viewsnewcastle@gmail.com",
    phone: "028 4344 0149",
    address: "49 Castlewellan Road, Newcastle, Co. Down, BT33 0JY",
    sourceUrls: ["https://theviewsgroup.co.uk/mountain-view-lodge/"],
    discoverySources: ["Official website verification"],
  },
  "Newcastle|mourne mountain art apartments": {
    website: "https://www.mournemountainartapartments.co.uk/",
    email: "info@mournemountainartapartments.co.uk",
    phone: "028 4372 7506",
    address: "99–101 Central Promenade, Newcastle, Co. Down, BT33 0HH",
    sourceUrls: ["https://www.mournemountainartapartments.co.uk/"],
    discoverySources: ["Official website verification"],
  },
  "Newcastle|sunnyholme caravan park": {
    website: "https://sunnyholme.net/",
    email: "sunny.holme@yahoo.co.uk",
    phone: "028 4372 2739",
    address: "33 Castlewellan Road, Newcastle, Co. Down, BT33 0JY",
    sourceUrls: ["https://sunnyholme.net/"],
    discoverySources: ["Official website verification"],
  },
  "Newcastle|windsor holiday park": {
    website: "https://www.windsorholidaypark.co.uk/",
    email: "info@windsorholidaypark.co.uk",
    phone: "028 4372 3367",
    address: "138 Dundrum Road, Newcastle, Co. Down, BT33 0LN",
    sourceUrls: ["https://www.windsorholidaypark.co.uk/"],
    discoverySources: ["Official website verification"],
  },
  "Newcastle|woodcroft caravan park": {
    website: "https://woodcroftcaravanpark.com/",
    email: "paul.magowan@btinternet.com",
    phone: "028 4372 2284",
    sourceUrls: ["https://woodcroftcaravanpark.com/"],
    discoverySources: ["Official website verification"],
  },
  "Dundrum|castle farm fresh produce": {
    website: "https://www.castlefarmni.com/",
    phone: "07568 436413",
    category: "Retail",
    entityType: "Independent / ownership unverified",
    sourceUrls: ["https://www.castlefarmni.com/"],
    discoverySources: ["Official website verification"],
  },
  "Dundrum|tonn ruray cafe": {
    website: "https://www.tonnruray.com/",
    phone: "028 4379 8214",
    address: "61 Main Street, Dundrum, Co. Down, BT33 0AE",
    category: "Food & drink",
    entityType: "Independent / ownership unverified",
    sourceUrls: ["https://www.tonnruray.com/"],
    discoverySources: ["Official website verification"],
  },
  "Dundrum|the buck s head": {
    website: "https://thebucksheaddundrum.co.uk/",
    email: "info@thebucksheaddundrum.co.uk",
    phone: "028 4375 1868",
    address: "77–79 Main Street, Dundrum, Co. Down, BT33 0LU",
    category: "Food & drink",
    entityType: "Independent / ownership unverified",
    sourceUrls: ["https://thebucksheaddundrum.co.uk/"],
    discoverySources: ["Official website verification"],
  },
}));

function key(row) {
  const n = norm(row.name);
  return `${row.town}|${aliases.get(n) || n}`;
}

function websiteState(website) {
  if (!website) return "No website found";
  try {
    const u = new URL(website);
    if (["facebook.com", "instagram.com", "m.facebook.com", "x.com", "twitter.com"].some((host) => u.hostname.endsWith(host))) return "Social page only";
    return u.protocol === "http:" ? "HTTP website" : "HTTPS website";
  } catch { return "Website value needs review"; }
}

function normalizedCategory(category = "Other") {
  const value = norm(category);
  if (["cafe", "takeaway", "restaurant", "pub", "pub accommodation", "pub restaurant"].includes(value)) return "Food & drink";
  if (value === "hotel") return "Accommodation";
  if (value === "garden services") return "Trades & services";
  return category;
}

function score(row) {
  let need = row.websiteStatus === "No website found" ? 50 : row.websiteStatus === "Social page only" ? 35 : row.websiteStatus === "HTTP website" ? 22 : 0;
  if (!row.email) need += 12;
  if (!row.phone) need += 10;
  if (!row.googleMapsVerified) need += 8;
  row.digitalNeedScore = Math.min(100, need);
  const typeBase = {"Independent / ownership unverified":58,"Charity / community":28,Club:24,"Public service":15,"Public attraction":18,"Larger chain / brand":12}[row.entityType] ?? 30;
  const categoryBoost = {Accommodation:24,"Food & drink":22,Retail:17,"Professional services":18,"Beauty & personal care":18,"Tourism & attraction":14,"Trades & services":12,"Health & wellbeing":12,"Sport & leisure":10}[row.category] ?? 5;
  row.paymentLikelihoodScore = Math.min(100, typeBase + categoryBoost + (row.phone ? 4 : 0) + (row.email ? 4 : 0));
  row.priorityScore = Math.round(row.digitalNeedScore * 0.55 + row.paymentLikelihoodScore * 0.45);
  row.communityOpportunity = ["Charity / community", "Club", "Public service", "Public attraction"].includes(row.entityType) || (row.digitalNeedScore >= 65 && row.paymentLikelihoodScore < 55) ? "High" : "Standard";
  row.priorityReason = row.digitalNeedScore >= 70 ? "Weak or missing owned digital/contact assets" : row.paymentLikelihoodScore >= 75 ? "Strong visual/commercial case for a transformation" : "Research and qualify before outreach";
  return row;
}

const grouped = new Map();
for (const row of rows) {
  const k = key(row);
  if (!grouped.has(k)) grouped.set(k, []);
  grouped.get(k).push(row);
}

const merged = [];
for (const group of grouped.values()) {
  group.sort((a, b) => Number(b.googleMapsVerified) - Number(a.googleMapsVerified) || Number(Boolean(b.website)) - Number(Boolean(a.website)));
  const base = structuredClone(group[0]);
  for (const row of group.slice(1)) {
    for (const field of ["website", "email", "phone", "facebook", "instagram", "address", "postcode", "lat", "lon", "category", "subcategory"]) {
      if (!base[field] && row[field]) base[field] = row[field];
    }
    if (base.category === "Other" && row.category && row.category !== "Other") {
      base.category = row.category;
      base.subcategory = row.subcategory;
    }
    if (row.googleMapsVerified) {
      base.googleMapsVerified = true;
      base.googleMapsUrl = row.googleMapsUrl;
    }
    if (row.directoryRating != null) {
      base.directoryRating = row.directoryRating;
      base.directoryReviewCount = row.directoryReviewCount;
    }
    base.sourceUrls = [...new Set([...(base.sourceUrls || []), ...(row.sourceUrls || [])])];
    base.discoverySources = [...new Set([...(base.discoverySources || []), ...(row.discoverySources || [])])];
  }
  if (/scouts?\b|\bclub\b/i.test(base.name)) base.entityType = "Club";
  if (/castle|reserve|forest park|country park|statue|memorial|public park/i.test(base.name) && !/farm|hotel|shop|cafe|café/i.test(base.name)) base.entityType = "Public attraction";
  const enrichment = manualEnrichment.get(key(base));
  if (enrichment) {
    for (const field of ["website", "email", "phone", "address", "category", "entityType"]) {
      if (enrichment[field]) base[field] = enrichment[field];
    }
    base.sourceUrls = [...new Set([...(base.sourceUrls || []), ...(enrichment.sourceUrls || [])])];
    base.discoverySources = [...new Set([...(base.discoverySources || []), ...(enrichment.discoverySources || [])])];
  }
  base.category = normalizedCategory(base.category);
  base.websiteStatus = websiteState(base.website);
  merged.push(score(base));
}

merged.sort((a, b) => b.priorityScore - a.priorityScore || a.town.localeCompare(b.town) || a.name.localeCompare(b.name));
await fs.writeFile(file, `${JSON.stringify(merged, null, 2)}\n`, "utf8");
const summaryFile = path.resolve(import.meta.dirname, "..", "research", "discovery-summary.json");
const summary = JSON.parse(await fs.readFile(summaryFile, "utf8"));
summary.totalRecords = merged.length;
summary.byTown = Object.fromEntries(["Dundrum", "Newcastle"].map((town) => [town, merged.filter((row) => row.town === town).length]));
summary.directGoogleMapsRecords = merged.filter((row) => row.googleMapsVerified).length;
summary.recordsWithWebsite = merged.filter((row) => row.website).length;
summary.recordsWithPhone = merged.filter((row) => row.phone).length;
summary.recordsWithEmail = merged.filter((row) => row.email).length;
await fs.writeFile(summaryFile, `${JSON.stringify(summary, null, 2)}\n`, "utf8");
console.log(JSON.stringify({before: rows.length, after: merged.length, removed: rows.length - merged.length}, null, 2));
