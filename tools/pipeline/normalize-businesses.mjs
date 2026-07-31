import fs from "node:fs/promises";
import path from "node:path";

const file = path.resolve(import.meta.dirname, "..", "..", "src", "site", "data", "businesses.json");
const rows = JSON.parse(await fs.readFile(file, "utf8"));

function norm(value = "") {
  return value.normalize("NFKD").replace(/[’‘]/g, "'").replace(/&amp;/g, "&")
    .replace(/[^a-zA-Z0-9]+/g, " ").trim().toLowerCase();
}

const aliases = new Map([
  ["bao and bento", "bao bento"],
  ["chinese sea palace", "sea palace"],
  ["tonn ruray", "tonn ruray cafe"],
  ["the tool centre", "tool centre"],
  ["the avoca hotel", "avoca restaurant and hotel"],
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

// Per-business verification knowledge accumulated after the census. Each entry
// records dated trading evidence, corrections to census fields, and the
// shortlist/design-task decision. Corrections are authoritative: they overwrite
// census values, and scores are recomputed from the corrected fields.
const verificationsFile = path.resolve(import.meta.dirname, "..", "..", "research", "pipeline", "verifications.json");
const verificationData = JSON.parse(await fs.readFile(verificationsFile, "utf8"));
const verifications = new Map(verificationData.records.map((record) => [key(record), record]));

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
  // An earlier run's "castle" pattern matched the "castle" inside "Newcastle",
  // tagging Newcastle-named organisations as public attractions. The original
  // entity types are unrecoverable, so reset those rows to the default before
  // re-deriving.
  if (base.entityType === "Public attraction" && !/\bcastle\b|reserve|forest park|country park|statue|memorial|public park/i.test(base.name)) base.entityType = "Independent / ownership unverified";
  if (/scouts?\b|\bclub\b/i.test(base.name)) base.entityType = "Club";
  if (/\bcastle\b|reserve|forest park|country park|statue|memorial|public park/i.test(base.name) && !/farm|hotel|shop|cafe|café/i.test(base.name)) base.entityType = "Public attraction";
  if (/fire station|police station|library|primary school|regional college|jobs & benefits|bus station|tourist information|visitor information/i.test(base.name)) base.entityType = "Public service";
  if (/church|chapel|presbyterian|pentecostal|orange hall|parish/i.test(base.name)) base.entityType = "Charity / community";
  const enrichment = manualEnrichment.get(key(base));
  if (enrichment) {
    for (const field of ["website", "email", "phone", "address", "category", "entityType"]) {
      if (enrichment[field]) base[field] = enrichment[field];
    }
    base.sourceUrls = [...new Set([...(base.sourceUrls || []), ...(enrichment.sourceUrls || [])])];
    base.discoverySources = [...new Set([...(base.discoverySources || []), ...(enrichment.discoverySources || [])])];
  }
  delete base.verification;
  delete base.prospect;
  const verified = verifications.get(key(base));
  if (verified) {
    for (const [field, value] of Object.entries(verified.corrections || {})) base[field] = value;
    // Not every verification rests on a public source. Local first-hand
    // knowledge has twice corrected the census where no dated source existed,
    // so a source-less record must not claim public-source verification.
    base.dataConfidence = verified.sources?.length
      ? `Verified against public sources on ${verified.verifiedOn}; trading status: ${verified.tradingStatus}`
      : `Verified on ${verified.verifiedOn} by local first-hand report, no public source; trading status: ${verified.tradingStatus}`;
  }
  base.category = normalizedCategory(base.category);
  base.websiteStatus = websiteState(base.website);
  score(base);
  if (verified) {
    base.verification = {
      verifiedOn: verified.verifiedOn,
      tradingStatus: verified.tradingStatus,
      tradingEvidence: verified.tradingEvidence,
      digitalPresence: verified.digitalPresence,
      sources: verified.sources,
    };
    base.prospect = {
      shortlist: verified.shortlist,
      designTask: verified.designTask,
      caveats: verified.caveats,
      stage: verified.stage || (verified.shortlist === "Not shortlisted" ? "Assessed – not shortlisted" : "Shortlisted"),
      ...(verified.conceptRoute ? { conceptRoute: verified.conceptRoute } : {}),
    };
    // A business confirmed closed is not a prospect at any priority. Without
    // this it keeps the score its missing website earned it — Squid Shack
    // scored 80 while shut — and sorts to the top of the ranked census, the
    // workbench and the workbook dashboard in every future selection round.
    if (verified.tradingStatus === "Closed") {
      base.digitalNeedScore = 0;
      base.paymentLikelihoodScore = 0;
      base.priorityScore = 0;
      base.communityOpportunity = "Standard";
      base.priorityReason = `Not trading — confirmed closed ${verified.verifiedOn}`;
    }
  }
  merged.push(base);
}

merged.sort((a, b) => b.priorityScore - a.priorityScore || a.town.localeCompare(b.town) || a.name.localeCompare(b.name));
await fs.writeFile(file, `${JSON.stringify(merged, null, 2)}\n`, "utf8");
const summaryFile = path.resolve(import.meta.dirname, "..", "..", "research", "pipeline", "discovery-summary.json");
const summary = JSON.parse(await fs.readFile(summaryFile, "utf8"));
summary.totalRecords = merged.length;
summary.byTown = Object.fromEntries(["Dundrum", "Newcastle"].map((town) => [town, merged.filter((row) => row.town === town).length]));
summary.directGoogleMapsRecords = merged.filter((row) => row.googleMapsVerified).length;
summary.recordsWithWebsite = merged.filter((row) => row.website).length;
summary.recordsWithPhone = merged.filter((row) => row.phone).length;
summary.recordsWithEmail = merged.filter((row) => row.email).length;
summary.verifiedRecords = merged.filter((row) => row.verification).length;
summary.shortlistedRecords = merged.filter((row) => row.prospect && row.prospect.shortlist !== "Not shortlisted").length;
summary.verificationAsOf = verificationData.asOf;
await fs.writeFile(summaryFile, `${JSON.stringify(summary, null, 2)}\n`, "utf8");
console.log(JSON.stringify({before: rows.length, after: merged.length, removed: rows.length - merged.length}, null, 2));
