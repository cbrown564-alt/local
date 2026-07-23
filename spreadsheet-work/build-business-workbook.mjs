import fs from "node:fs/promises";
import path from "node:path";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const projectRoot = path.resolve(import.meta.dirname, "..");
const outputDir = path.join(projectRoot, "outputs", "019f71af-9005-7712-b549-931b71803324");
const renderDir = path.join(projectRoot, "research-renders");
await fs.mkdir(outputDir, { recursive: true });
await fs.mkdir(renderDir, { recursive: true });

const businesses = JSON.parse(await fs.readFile(path.join(projectRoot, "src", "data", "businesses.json"), "utf8"));
const summary = JSON.parse(await fs.readFile(path.join(projectRoot, "research", "discovery-summary.json"), "utf8"));
const rowEnd = businesses.length + 1;

const C = {
  ink: "#11182F",
  blue: "#4148ED",
  blueDeep: "#2F34BF",
  yellow: "#F1D831",
  pale: "#EDF0FF",
  white: "#FFFFFF",
  line: "#D7DBEF",
  muted: "#5D6375",
  green: "#DDF8E9",
  red: "#FFE5E8",
};

const workbook = Workbook.create();
workbook.comments.setSelf({ displayName: "Mourne Made research" });
const readme = workbook.worksheets.add("Read Me");
const dashboard = workbook.worksheets.add("Dashboard");
const businessSheet = workbook.worksheets.add("Businesses");
const scoring = workbook.worksheets.add("Scoring");
const queue = workbook.worksheets.add("Enrichment Queue");
const sources = workbook.worksheets.add("Sources");

function styleHeader(range) {
  range.format = {
    fill: C.blue,
    font: { color: C.white, bold: true },
    wrapText: true,
    verticalAlignment: "center",
    borders: { preset: "all", style: "thin", color: C.white },
  };
}

// Read Me
readme.showGridLines = false;
readme.getRange("A1:H2").merge();
readme.getRange("A1").values = [["Dundrum + Newcastle business opportunity database"]];
readme.getRange("A1:H2").format = { fill: C.ink, font: { color: C.white, bold: true, size: 25 }, verticalAlignment: "center" };
readme.getRange("A4:H4").merge();
readme.getRange("A4").values = [[`Public-source research snapshot · ${summary.asOf}`]];
readme.getRange("A4:H4").format = { fill: C.yellow, font: { color: C.ink, bold: true } };
readme.getRange("A6:B14").values = [
  ["What this is", "A source-bounded census of public business and organisation listings around Dundrum and Newcastle, County Down, prepared to support local digital-agency outreach."],
  ["Geographic scope", summary.geographicMethod],
  ["Audience order", "Independent owner-operated businesses first; then charities, clubs, public services and larger chains."],
  ["Discovery sources", summary.discoverySources.join("; ")],
  ["Record count", summary.totalRecords],
  ["Dundrum", summary.byTown.Dundrum],
  ["Newcastle", summary.byTown.Newcastle],
  ["Important limit", summary.caveat],
  ["How to use it", "Filter Businesses by town/category, review the linked sources, and qualify the record before any outreach. Use Enrichment Queue for the highest-value missing details."],
];
readme.getRange("A6:A14").format = { fill: C.pale, font: { bold: true, color: C.blueDeep }, verticalAlignment: "top" };
readme.getRange("A6:B14").format.wrapText = true;
readme.getRange("A16:H16").merge();
readme.getRange("A16").values = [["Data rules"]];
readme.getRange("A16:H16").format = { fill: C.blue, font: { color: C.white, bold: true, size: 16 } };
readme.getRange("A18:B24").values = [
  ["Blank ≠ none", "A blank means the detail was not found in the sources reviewed. It does not prove the business has no phone, email, website or listing."],
  ["Google metrics", "Google ratings and review counts are blank unless directly observed. Do not infer them from other directories."],
  ["Ownership", "Independent / ownership unverified is a research classification, not a legal ownership conclusion."],
  ["Priority score", "A transparent prospecting aid based on digital need and a category-level payment proxy. It is not a prediction of willingness to buy."],
  ["Contact use", "Before marketing, verify the contact, the organisation's status and the applicable UK GDPR / PECR basis for the channel you plan to use."],
  ["Outreach tone", "Offer a concrete concept, avoid shaming the current work, disclose that concept examples are unsolicited and do not imply approval."],
  ["Refresh", "Public listings change. Recheck the linked source before contact and refresh time-sensitive metrics."],
];
readme.getRange("A18:A24").format = { font: { bold: true }, fill: "#F7F8FF" };
readme.getRange("A18:B24").format.wrapText = true;
readme.getRange("A:A").format.columnWidth = 25;
readme.getRange("B:B").format.columnWidth = 95;
readme.getRange("C:H").format.columnWidth = 12;
readme.getRange("1:2").format.rowHeight = 29;
readme.freezePanes.freezeRows(4);
workbook.comments.addThread({ cell: readme.getRange("B9") }, `Research method: ${summary.discoverySources.join("; ")}. See the Sources sheet for record-level URLs.`);

// Scoring
scoring.showGridLines = false;
scoring.getRange("A1:K2").merge();
scoring.getRange("A1").values = [["Priority scoring — visible assumptions"]];
scoring.getRange("A1:K2").format = { fill: C.ink, font: { color: C.white, bold: true, size: 24 }, verticalAlignment: "center" };
scoring.getRange("A3:K3").merge();
scoring.getRange("A3").values = [["Edit the point values below to test another prioritisation view. Businesses formulas reference these cells."]];
scoring.getRange("A3:K3").format = { fill: C.yellow, font: { bold: true } };
scoring.getRange("A5:B8").values = [
  ["Website state", "Need points"],
  ["No website found", 50],
  ["Social page only", 35],
  ["HTTP website", 22],
];
scoring.getRange("D5:E9").values = [
  ["Gap / signal", "Points"],
  ["Email missing", 12],
  ["Phone missing", 10],
  ["Maps not directly verified", 8],
  ["Published contact bonus", 4],
];
scoring.getRange("G5:H11").values = [
  ["Entity type", "Base"],
  ["Independent / ownership unverified", 58],
  ["Charity / community", 28],
  ["Club", 24],
  ["Public service", 15],
  ["Public attraction", 18],
  ["Larger chain / brand", 12],
];
scoring.getRange("J5:K16").values = [
  ["Category", "Boost"],
  ["Accommodation", 24],
  ["Food & drink", 22],
  ["Retail", 17],
  ["Professional services", 18],
  ["Beauty & personal care", 18],
  ["Tourism & attraction", 14],
  ["Trades & services", 12],
  ["Health & wellbeing", 12],
  ["Sport & leisure", 10],
  ["Community & public service", 5],
  ["Other", 5],
];
scoring.getRange("A13:B15").values = [
  ["Priority mix", "Weight"],
  ["Digital need", 0.55],
  ["Payment proxy", 0.45],
];
["A5:B5", "D5:E5", "G5:H5", "J5:K5", "A13:B13"].forEach((r) => styleHeader(scoring.getRange(r)));
scoring.getRange("B14:B15").format.numberFormat = "0%";
scoring.getRange("A17:K20").merge();
scoring.getRange("A17").values = [["Interpretation: digital need rewards missing or weak owned assets and contact gaps. Payment likelihood is only a category/entity proxy, with a small bonus for an available contact route. Priority blends the two. Equal scores mean the public evidence does not justify pretending one prospect is more likely than another."]];
scoring.getRange("A17:K20").format = { fill: C.pale, wrapText: true, verticalAlignment: "top" };
scoring.getRange("A:K").format.columnWidth = 19;
scoring.getRange("A:A").format.columnWidth = 31;
scoring.getRange("D:D").format.columnWidth = 31;
scoring.getRange("G:G").format.columnWidth = 40;
scoring.getRange("J:J").format.columnWidth = 31;
scoring.freezePanes.freezeRows(3);

// Businesses
businessSheet.showGridLines = false;
const headers = [
  "Rank", "Business", "Town", "Category", "Entity type", "Subcategory", "Address", "Postcode",
  "Website status", "Website", "Google Maps status", "Google Maps URL", "Google rating", "Google reviews",
  "Phone", "Email", "Facebook", "Instagram", "Google search", "Digital need", "Payment likelihood",
  "Priority score", "Community opportunity", "Priority reason", "Source as of", "Confidence",
  "Discovery sources", "Source 1", "Source 2", "Source 3", "Latitude", "Longitude",
];
businessSheet.getRange(`A1:AF1`).values = [headers];
styleHeader(businessSheet.getRange("A1:AF1"));
businessSheet.getRange("A1:AF1").format.rowHeight = 42;
const values = businesses.map((b) => [
  null, b.name, b.town, b.category, b.entityType, b.subcategory || null, b.address || null, b.postcode || null,
  b.websiteStatus, b.website || null, b.googleMapsVerified ? "Direct listing found" : "Not directly verified", b.googleMapsUrl,
  b.googleRating, b.googleReviewCount, b.phone || null, b.email || null, b.facebook || null, b.instagram || null, b.googleSearchUrl,
  null, null, null, null, null, b.sourceAsOf, b.dataConfidence, (b.discoverySources || []).join("; "),
  b.sourceUrls?.[0] || "", b.sourceUrls?.[1] || "", b.sourceUrls?.[2] || "", b.lat, b.lon,
]);
businessSheet.getRange(`A2:AF${rowEnd}`).values = values;
businessSheet.getRange("A2:X2").formulas = [[
  `=COUNTIF($V$2:$V$${rowEnd},">"&V2)+COUNTIF($V$2:V2,V2)`, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null,
  `=MIN(100,IF(I2="No website found",Scoring!$B$6,IF(I2="Social page only",Scoring!$B$7,IF(I2="HTTP website",Scoring!$B$8,0)))+IF(P2="",Scoring!$E$6,0)+IF(O2="",Scoring!$E$7,0)+IF(K2="Not directly verified",Scoring!$E$8,0))`,
  `=MIN(100,IFERROR(VLOOKUP(E2,Scoring!$G$6:$H$11,2,FALSE),30)+IFERROR(VLOOKUP(D2,Scoring!$J$6:$K$16,2,FALSE),5)+IF(O2<>"",Scoring!$E$9,0)+IF(P2<>"",Scoring!$E$9,0))`,
  `=ROUND(T2*Scoring!$B$14+U2*Scoring!$B$15,0)`,
  `=IF(OR(E2="Charity / community",E2="Club",E2="Public service",E2="Public attraction",AND(T2>=65,U2<55)),"High","Standard")`,
  `=IF(T2>=70,"Weak or missing owned digital/contact assets",IF(U2>=75,"Strong visual/commercial case for a transformation","Research and qualify before outreach"))`,
]];
businessSheet.getRange(`A2:A${rowEnd}`).fillDown();
businessSheet.getRange(`T2:X${rowEnd}`).fillDown();
businessSheet.getRange(`A2:A${rowEnd}`).format.numberFormat = "0";
businessSheet.getRange(`M2:N${rowEnd}`).format.numberFormat = "0.0";
businessSheet.getRange(`T2:V${rowEnd}`).format.numberFormat = "0";
businessSheet.getRange(`AE2:AF${rowEnd}`).format.numberFormat = "0.000000";
businessSheet.getRange(`A2:AF${rowEnd}`).format.verticalAlignment = "top";
businessSheet.getRange(`B2:AF${rowEnd}`).format.wrapText = true;
businessSheet.getRange(`V2:V${rowEnd}`).conditionalFormats.add("colorScale", { colors: [C.green, C.yellow, "#FF9B8E"], thresholds: ["min", "50%", "max"] });
businessSheet.getRange(`I2:I${rowEnd}`).conditionalFormats.add("containsText", { text: "No website", format: { fill: C.red, font: { color: "#8A1538" } } });
businessSheet.getRange(`W2:W${rowEnd}`).conditionalFormats.add("containsText", { text: "High", format: { fill: C.yellow, font: { bold: true } } });
businessSheet.tables.add(`A1:AF${rowEnd}`, true, "BusinessesTable").style = "TableStyleMedium2";
businessSheet.freezePanes.freezeRows(1);
businessSheet.freezePanes.freezeColumns(2);
const widths = {
  A: 8, B: 30, C: 13, D: 22, E: 34, F: 22, G: 42, H: 13, I: 22, J: 36, K: 22, L: 38,
  M: 12, N: 12, O: 18, P: 29, Q: 32, R: 32, S: 36, T: 14, U: 17, V: 14, W: 18, X: 39,
  Y: 13, Z: 42, AA: 35, AB: 40, AC: 40, AD: 40, AE: 14, AF: 14,
};
for (const [col, width] of Object.entries(widths)) businessSheet.getRange(`${col}:${col}`).format.columnWidth = width;

// Dashboard
dashboard.showGridLines = false;
dashboard.getRange("A1:J2").merge();
dashboard.getRange("A1").values = [["Local digital opportunity dashboard"]];
dashboard.getRange("A1:J2").format = { fill: C.ink, font: { color: C.white, bold: true, size: 25 }, verticalAlignment: "center" };
dashboard.getRange("A3:J3").merge();
dashboard.getRange("A3").values = [[`Research snapshot · ${summary.asOf} · blanks mean “not found in reviewed sources”, not “does not exist”`]];
dashboard.getRange("A3:J3").format = { fill: C.yellow, font: { bold: true } };
dashboard.getRange("A5:B10").values = [
  ["Coverage", "Value"],
  ["Total records", null],
  ["Dundrum", null],
  ["Newcastle", null],
  ["Owned website found", null],
  ["Direct Maps listing", null],
];
styleHeader(dashboard.getRange("A5:B5"));
dashboard.getRange("B6:B10").formulas = [
  [`=COUNTA(Businesses!$B$2:$B$${rowEnd})`],
  [`=COUNTIF(Businesses!$C$2:$C$${rowEnd},"Dundrum")`],
  [`=COUNTIF(Businesses!$C$2:$C$${rowEnd},"Newcastle")`],
  [`=COUNTIF(Businesses!$I$2:$I$${rowEnd},"<>No website found")`],
  [`=COUNTIF(Businesses!$K$2:$K$${rowEnd},"Direct listing found")`],
];
dashboard.getRange("D5:E10").values = [
  ["Enrichment", "Value"],
  ["Email found", null],
  ["Phone found", null],
  ["No website found", null],
  ["Maps needs verification", null],
  ["High community opportunity", null],
];
styleHeader(dashboard.getRange("D5:E5"));
dashboard.getRange("E6:E10").formulas = [
  [`=COUNTA(Businesses!$P$2:$P$${rowEnd})`],
  [`=COUNTA(Businesses!$O$2:$O$${rowEnd})`],
  [`=COUNTIF(Businesses!$I$2:$I$${rowEnd},"No website found")`],
  [`=COUNTIF(Businesses!$K$2:$K$${rowEnd},"Not directly verified")`],
  [`=COUNTIF(Businesses!$W$2:$W$${rowEnd},"High")`],
];
dashboard.getRange("A12:F12").values = [["Rank", "Business", "Town", "Category", "Priority", "Why it ranks"]];
styleHeader(dashboard.getRange("A12:F12"));
for (let index = 0; index < 15; index += 1) {
  const target = 13 + index;
  const source = 2 + index;
  dashboard.getRange(`A${target}:F${target}`).formulas = [[
    `=Businesses!A${source}`, `=Businesses!B${source}`, `=Businesses!C${source}`, `=Businesses!D${source}`, `=Businesses!V${source}`, `=Businesses!X${source}`,
  ]];
}
dashboard.getRange("A13:F27").format.wrapText = true;
dashboard.getRange("A13:F27").format.verticalAlignment = "top";
dashboard.getRange("H5:I16").values = [
  ["Category", "Records"],
  ...["Accommodation", "Food & drink", "Retail", "Professional services", "Beauty & personal care", "Tourism & attraction", "Trades & services", "Health & wellbeing", "Sport & leisure", "Community & public service", "Other"].map((category) => [category, null]),
];
styleHeader(dashboard.getRange("H5:I5"));
for (let row = 6; row <= 16; row += 1) dashboard.getRange(`I${row}`).formulas = [[`=COUNTIF(Businesses!$D$2:$D$${rowEnd},H${row})`]];
const categoryChart = dashboard.charts.add("bar", dashboard.getRange("H5:I16"));
categoryChart.title = "Records by category";
categoryChart.hasLegend = false;
categoryChart.xAxis = { axisType: "textAxis", textStyle: { fontSize: 9 } };
categoryChart.yAxis = { numberFormatCode: "0" };
categoryChart.setPosition("H17", "N32");
dashboard.getRange("A29:F31").merge();
dashboard.getRange("A29").values = [["Priority is a triage aid, not a sales forecast. Equal scores are intentionally preserved where the public evidence is the same. Review source links and qualify the business before outreach."]];
dashboard.getRange("A29:F31").format = { fill: C.pale, wrapText: true, verticalAlignment: "top" };
dashboard.getRange("A:A").format.columnWidth = 9;
dashboard.getRange("B:B").format.columnWidth = 31;
dashboard.getRange("C:C").format.columnWidth = 14;
dashboard.getRange("D:D").format.columnWidth = 24;
dashboard.getRange("E:E").format.columnWidth = 13;
dashboard.getRange("F:F").format.columnWidth = 44;
dashboard.getRange("H:H").format.columnWidth = 27;
dashboard.getRange("I:I").format.columnWidth = 12;
dashboard.freezePanes.freezeRows(3);

// Enrichment Queue
queue.showGridLines = false;
queue.getRange("A1:J2").merge();
queue.getRange("A1").values = [["Enrichment queue"]];
queue.getRange("A1:J2").format = { fill: C.ink, font: { color: C.white, bold: true, size: 24 }, verticalAlignment: "center" };
queue.getRange("A3:J3").merge();
queue.getRange("A3").values = [["Highest-priority records with at least one missing or unverified digital/contact field. Verify before contact."]];
queue.getRange("A3:J3").format = { fill: C.yellow, font: { bold: true } };
const queueHeaders = ["Current rank", "Business", "Town", "Category", "Website status", "Maps status", "Phone", "Email", "Priority", "Next research action"];
queue.getRange("A5:J5").values = [queueHeaders];
styleHeader(queue.getRange("A5:J5"));
const queueRows = businesses.filter((b) => !b.website || !b.phone || !b.email || !b.googleMapsVerified).slice(0, 120);
queue.getRange(`A6:J${queueRows.length + 5}`).values = queueRows.map((b, index) => [
  index + 1, b.name, b.town, b.category, b.websiteStatus, b.googleMapsVerified ? "Direct listing found" : "Not directly verified", b.phone, b.email, b.priorityScore, null,
]);
queue.getRange(`J6:J${queueRows.length + 5}`).formulas = [[`=IF(E6="No website found","Search for an official site or active social page",IF(F6="Not directly verified","Verify the Google Maps profile and record current metrics",IF(G6="","Find a published business phone",IF(H6="","Find a published business email","Recheck status before outreach"))))`]];
queue.getRange(`J6:J${queueRows.length + 5}`).fillDown();
queue.getRange(`A5:J${queueRows.length + 5}`).format.wrapText = true;
queue.getRange(`A5:J${queueRows.length + 5}`).format.verticalAlignment = "top";
queue.tables.add(`A5:J${queueRows.length + 5}`, true, "EnrichmentTable").style = "TableStyleMedium2";
queue.freezePanes.freezeRows(5);
const queueWidths = [10, 32, 14, 24, 22, 22, 18, 29, 12, 48];
queueWidths.forEach((width, i) => queue.getRangeByIndexes(0, i, 1, 1).format.columnWidth = width);

// Sources
sources.showGridLines = false;
sources.getRange("A1:F2").merge();
sources.getRange("A1").values = [["Record-level source index"]];
sources.getRange("A1:F2").format = { fill: C.ink, font: { color: C.white, bold: true, size: 24 }, verticalAlignment: "center" };
sources.getRange("A3:F3").merge();
sources.getRange("A3").values = [["URLs are preserved as evidence and refresh routes. A source can establish a listing without establishing ownership or current trading status."]];
sources.getRange("A3:F3").format = { fill: C.yellow, font: { bold: true } };
sources.getRange("A5:F5").values = [["Business", "Town", "Source type", "Source URL", "As of", "What it supports"]];
styleHeader(sources.getRange("A5:F5"));
const sourceRows = [];
for (const b of businesses) {
  const seen = new Set();
  for (const url of b.sourceUrls || []) {
    if (!url || seen.has(url)) continue;
    seen.add(url);
    let type = "Other public source";
    let support = "Public listing or business detail";
    if (url.includes("google.com/maps")) { type = "Google Maps"; support = "Direct public Maps listing"; }
    else if (url.includes("openstreetmap.org")) { type = "OpenStreetMap"; support = "Named mapped feature and tagged details"; }
    else if (url.includes("newcastle-county-down.com")) { type = "Local directory"; support = "Local directory listing"; }
    else if (url === b.website || (b.website && new URL(url).hostname === new URL(b.website).hostname)) { type = "Official website"; support = "Published owned-site and contact details"; }
    sourceRows.push([b.name, b.town, type, url, b.sourceAsOf, support]);
  }
}
sources.getRange(`A6:F${sourceRows.length + 5}`).values = sourceRows;
sources.getRange(`A5:F${sourceRows.length + 5}`).format.wrapText = true;
sources.getRange(`A5:F${sourceRows.length + 5}`).format.verticalAlignment = "top";
sources.tables.add(`A5:F${sourceRows.length + 5}`, true, "SourcesTable").style = "TableStyleMedium2";
sources.freezePanes.freezeRows(5);
sources.getRange("A:A").format.columnWidth = 32;
sources.getRange("B:B").format.columnWidth = 14;
sources.getRange("C:C").format.columnWidth = 20;
sources.getRange("D:D").format.columnWidth = 64;
sources.getRange("E:E").format.columnWidth = 14;
sources.getRange("F:F").format.columnWidth = 42;

const formulaErrors = [];
for (const sheet of [readme, dashboard, businessSheet, scoring, queue, sources]) {
  const used = sheet.getUsedRange();
  const matrix = used?.values || [];
  matrix.forEach((row, rowIndex) => row.forEach((value, colIndex) => {
    if (typeof value === "string" && /^#(?:REF!|DIV\/0!|VALUE!|NAME\?|N\/A|NUM!|NULL!)/.test(value)) {
      formulaErrors.push({ sheet: sheet.name, row: rowIndex + 1, col: colIndex + 1, value });
    }
  }));
}
const verification = {
  expected: { total: businesses.length, emails: businesses.filter((b) => b.email).length, phones: businesses.filter((b) => b.phone).length },
  dashboard: {
    total: dashboard.getRange("B6").values?.[0]?.[0],
    emails: dashboard.getRange("E6").values?.[0]?.[0],
    phones: dashboard.getRange("E7").values?.[0]?.[0],
  },
  formulaErrors,
};
if (verification.dashboard.total !== verification.expected.total || verification.dashboard.emails !== verification.expected.emails || verification.dashboard.phones !== verification.expected.phones || formulaErrors.length) {
  throw new Error(`Workbook verification failed: ${JSON.stringify(verification)}`);
}
await fs.writeFile(path.join(outputDir, "workbook-verification.json"), JSON.stringify(verification, null, 2));

const outputPath = path.join(outputDir, "dundrum-newcastle-business-opportunity-database.xlsx");
const xlsx = await SpreadsheetFile.exportXlsx(workbook);
await xlsx.save(outputPath);

for (const sheetName of ["Read Me", "Dashboard", "Businesses", "Scoring", "Enrichment Queue", "Sources"]) {
  const preview = await workbook.render({ sheetName, autoCrop: "all", scale: sheetName === "Businesses" || sheetName === "Sources" ? 0.55 : 0.8, format: "png" });
  const safeName = sheetName.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  await fs.writeFile(path.join(renderDir, `${safeName}.png`), new Uint8Array(await preview.arrayBuffer()));
}

const summaryInspect = await workbook.inspect({ kind: "sheet,table", maxChars: 6000, tableMaxRows: 4, tableMaxCols: 8, tableMaxCellChars: 80 });
await fs.writeFile(path.join(outputDir, "workbook-inspect.json"), JSON.stringify(summaryInspect, null, 2));
const formulaInspect = await workbook.inspect({ kind: "formula", sheetId: "Businesses", range: `A1:X${rowEnd}`, maxChars: 5000, options: { maxResults: 80 } });
await fs.writeFile(path.join(outputDir, "workbook-formulas.json"), JSON.stringify(formulaInspect, null, 2));
console.log(JSON.stringify({ outputPath, records: businesses.length, sourceRows: sourceRows.length, queueRows: queueRows.length, renders: 6 }, null, 2));
