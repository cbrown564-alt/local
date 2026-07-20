import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const workbookPath = new URL(
  "../../outputs/019f71af-9005-7712-b549-931b71803324/dundrum-newcastle-business-opportunity-database.xlsx",
  import.meta.url,
);

const input = await FileBlob.load(workbookPath.pathname.replace(/^\/(?:[A-Za-z]:)/, (match) => match.slice(1)));
const workbook = await SpreadsheetFile.importXlsx(input);

const summaries = [];
for (const [sheetName, range] of [
  ["Read Me", "A1:B24"],
  ["Dashboard", "A1:I29"],
  ["Businesses", "A1:AF8"],
  ["Enrichment Queue", "A1:M12"],
  ["Sources", "A1:F20"],
  ["Scoring", "A1:F24"],
]) {
  const result = await workbook.inspect({
    kind: "table",
    sheetId: sheetName,
    range,
    tableMaxRows: 30,
    tableMaxCols: 32,
    tableMaxCellChars: 160,
    maxChars: 14000,
  });
  summaries.push({ sheetName, ndjson: result.ndjson });
}

console.log(JSON.stringify(summaries, null, 2));
