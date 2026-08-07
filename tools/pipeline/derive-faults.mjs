#!/usr/bin/env node
/**
 * Derive the mechanical half of the fault taxonomy (T1, T2, T5, T8, T9) into
 * `research/pipeline/verifications.json`, per docs/RESEARCH_METHOD.md
 * "How a fault is recorded".
 *
 * Deliberately does NOT attempt T3, T4, T6, T7, T10: the method requires a
 * human opening the page for those, and T4 requires it at phone width.
 *
 * Every `observed` string is a verbatim sentence already recorded in the
 * business's own verification record. Nothing here is a fresh claim.
 *
 *   node derive-faults.mjs            # report only
 *   node derive-faults.mjs --write    # rewrite verifications.json
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const VERIFICATIONS = resolve(ROOT, "research/pipeline/verifications.json");
const PROBES = resolve(ROOT, "research/pipeline/probes-all-new.json");

const write = process.argv.includes("--write");

const doc = JSON.parse(readFileSync(VERIFICATIONS, "utf8"));
const probes = JSON.parse(readFileSync(PROBES, "utf8"));
const probeByName = new Map(probes.map((p) => [p.key, p]));

/**
 * Sentences that must never become an `observed` string, whatever they match:
 * they record a fix, a probe's own limitation, or an explicitly unconfirmed
 * state. Recording any of them would put a claim in outreach that the record
 * itself contradicts.
 */
const DISQUALIFIED =
  /\b(?:now embeds|added since|since verification|has since|no longer applies|so it sells online|confirmed by route|not a dead domain|state unconfirmed|weak evidence|must not be used|equally consistent|is corrected to|not affected by|actively maintained|reissued)\b/i;

/** Split recorded prose into sentences, keeping the terminator. */
function sentences(text) {
  if (!text) return [];
  return text
    .replace(/\s+/g, " ")
    .split(/(?<=[.!?])\s+(?=[A-Z“"/(]|$)/)
    .map((s) => s.trim())
    .filter(Boolean);
}

/**
 * The sentence to quote for a rule.
 *
 * Only `digitalPresence` is searched. `caveats` records what the evidence may
 * not be read as saying — "a dead domain is equally consistent with a closed
 * business", "the © 2018 footer is weak evidence and must not be used as the
 * argument" — and quoting a caveat as an observation inverts its meaning.
 *
 * The first surviving match wins: the field opens with what the page shows and
 * closes with corrections and re-reads.
 */
function pick(record, wanted, reject) {
  return (
    sentences(record.digitalPresence)
      .filter((s) => wanted.test(s))
      .filter((s) => !DISQUALIFIED.test(s))
      .filter((s) => !reject || !reject.test(s))[0] || null
  );
}

/** The date the prose itself claims, else the record's verification date. */
function seenOn(record, sentence) {
  const inline = sentence.match(
    /\b(\d{1,2})\s+(January|February|March|April|May|June|July|August|September|October|November|December)\s+(\d{4})\b/,
  );
  if (inline) {
    const months = {
      January: "01", February: "02", March: "03", April: "04",
      May: "05", June: "06", July: "07", August: "08",
      September: "09", October: "10", November: "11", December: "12",
    };
    return `${inline[3]}-${months[inline[2]]}-${String(inline[1]).padStart(2, "0")}`;
  }
  const recheck = (record.digitalPresence || "").match(
    /Re-checked (\d{1,2}) (\w+) (\d{4})/,
  );
  if (recheck) return seenOn(record, recheck[0]);
  return record.verifiedOn;
}

/** Best URL to cite for a fault. */
function where(record) {
  const site = record.corrections?.website;
  if (site) return site;
  const source = (record.sources || []).find((s) =>
    !/ratings\.food\.gov\.uk|booking\.com|tripadvisor|companieshouse/i.test(s),
  );
  return source || (record.sources || [])[0] || "";
}

/**
 * Each rule returns the sentence that evidences it, or null.
 * Rules read only what is already recorded — no inference beyond the match.
 */
const RULES = [
  {
    id: "T2",
    // The route ends in nothing.
    match(record, probe) {
      if (probe && /^dead:/.test(probe.verdict || "")) {
        return {
          text: `Probe on ${probe.url} returned "${probe.verdict}".`,
          basis: "probe",
          seenOn: "2026-08-05",
        };
      }
      if (probe && probe.redirected && probe.finalUrl) {
        try {
          const from = new URL(probe.url).hostname.replace(/^www\./, "");
          const to = new URL(probe.finalUrl).hostname.replace(/^www\./, "");
          if (from !== to) {
            return {
              text: `Probe: ${probe.url} redirects off-domain to ${probe.finalUrl}.`,
              basis: "probe",
              seenOn: "2026-08-05",
            };
          }
        } catch {
          /* malformed URL — fall through to the prose rules */
        }
      }
      return this.prose(record);
    },
    prose(record) {
      const hit = pick(
        record,
        /does not resolve|no longer resolves|dead domain|DNS (?:does not|fails|no longer)|returns? (?:403|404|410)|ConnectYourDomain|parked|coming soon|under construction|redirects? to (?:a )?(?:different|another|parent)/i,
        // A chef's retired personal domain is not the business's dead route,
        // and an HTTP 500 the record calls a server error is not a dead route.
        /previous domain|former domain|old domain|HTTP 500|server error/i,
      );
      return hit ? { text: hit, basis: "human" } : null;
    },
  },
  {
    id: "T1",
    // The front door is somebody else's login.
    match(record) {
      const prose = `${record.digitalPresence || ""} ${record.caveats || ""}`;
      const noSite =
        /no website|has no site|no own (?:site|website)|census recorded no website|without a website|social[- ]only/i
          .test(prose);
      if (!noSite) return null;
      // A record can open "Census recorded no website" and then name a live
      // domain the census missed. That is a corrected census row, not T1.
      const ownsADomain =
        Boolean(record.corrections?.website) ||
        /\b[a-z0-9-]+\.(?:co\.uk|com|net|ie|org)\b\s+(?:is live|exists|resolves)|(?:runs|trades (?:as [^.]+ )?on)\s+[a-z0-9-]+\.(?:co\.uk|com|net|ie|org)/i
          .test(prose);
      if (ownsADomain) return null;
      // "No website found; none needed" is the method's valid null finding.
      if (/none needed|no website or confirmed social|no website, booking page, or confirmed social/i.test(prose)) {
        return null;
      }
      const hit = sentences(record.digitalPresence).find(
        (s) => /Facebook|Instagram|Meta\b/i.test(s),
      );
      return hit ? { text: hit, basis: "human" } : null;
    },
  },
  {
    id: "T9",
    // The page's clock has stopped while the business has not.
    match(record, probe) {
      const year = new Date().getFullYear();
      if (probe?.copyrightYear && Number(probe.copyrightYear) < year - 1) {
        return {
          text: `Probe: copyright year on ${probe.finalUrl || probe.url} reads ${probe.copyrightYear}.`,
          basis: "probe",
          seenOn: "2026-08-05",
        };
      }
      const hit = pick(
        record,
        /(?:©|copyright)[^.]*(?:20(?:1\d|2[0-4]))|no year|testimonials? 20(?:1\d|2[0-4])|last (?:post|updated|update)[^.]*20(?:1\d|2[0-4])/i,
      );
      return hit ? { text: hit, basis: "human" } : null;
    },
  },
  {
    id: "T5",
    // The action exists as a word, not a mechanism.
    match(record) {
      // The probe's "live, brochure-only" verdict is NOT sufficient on its own:
      // it is the default for 41 of 54 probed sites, and a school or a solicitor
      // is not at fault for having nothing to transact. T5 is an action offered
      // and not honoured, which needs the action named in the record.
      const hit = pick(
        record,
        /no (?:detectable |online )?(?:booking|enquiry|ordering|basket|checkout)|no booking (?:engine|path|form)|cannot (?:book|order|buy)|(?:only|just) a phone number|contact (?:the shop|us) (?:for|to)|enquir(?:y|ies) (?:becomes?|by) (?:a )?phone/i,
      );
      if (!hit) return null;
      // "despite the business being bookable" is the shape that makes it a fault:
      // require the record to show the action is expected of this business.
      const expectsAction =
        /despite|though|but |bookable|takes bookings|appointment|hire|tour|order|sells|shop/i
          .test(hit);
      return expectsAction ? { text: hit, basis: "human" } : null;
    },
  },
  {
    id: "T8",
    // Information present in the wrong shape — a file, prose, an insider taxonomy.
    match(record) {
      const hit = pick(
        record,
        /\bPDF\b|\.pdf\b|as a downloadable|download the (?:menu|brochure|list|price)/i,
      );
      return hit ? { text: hit, basis: "human" } : null;
    },
  },
];

// Rank order when trimming to the method's maximum of four.
const RANK = ["T2", "T1", "T5", "T9", "T8"];

let touched = 0;
const tally = Object.create(null);

for (const record of doc.records) {
  const probe =
    probeByName.get(record.name) ||
    probeByName.get(record.corrections?.name) ||
    null;

  // Re-derivable from scratch: a rule that no longer fires must not leave a
  // stale fault behind. Human-recorded faults are kept.
  if (record.faults) {
    const human = record.faults.filter((f) => f.assignedBy === "hand");
    if (human.length) record.faults = human;
    else delete record.faults;
  }

  const found = [];
  for (const rule of RULES) {
    const hit = rule.match(record, probe);
    if (!hit) continue;
    found.push({
      id: rule.id,
      observed: hit.text,
      where: where(record),
      seenOn: hit.seenOn || seenOn(record, hit.text),
      basis: hit.basis,
    });
  }

  if (!found.length) continue;

  found.sort((a, b) => RANK.indexOf(a.id) - RANK.indexOf(b.id));

  // Two ids evidenced by the same sentence is one observation wearing two
  // labels. Keep the higher-ranked reading and drop the echo.
  const seen = new Set();
  const kept = found
    .filter((f) => {
      if (seen.has(f.observed)) return false;
      seen.add(f.observed);
      return true;
    })
    .slice(0, 4);

  record.faults = [...(record.faults || []), ...kept];
  touched += 1;
  for (const f of kept) tally[f.id] = (tally[f.id] || 0) + 1;
}

console.log(`records: ${doc.records.length}`);
console.log(`records with at least one derived fault: ${touched}`);
console.log(`records with none (human look still owed): ${doc.records.length - touched}`);
console.log("tally:", tally);

if (write) {
  writeFileSync(VERIFICATIONS, `${JSON.stringify(doc, null, 1)}\n`);
  console.log(`wrote ${VERIFICATIONS}`);
} else {
  const sample = doc.records.filter((r) => r.faults).slice(0, 4);
  console.log("\n--- sample ---");
  for (const r of sample) {
    console.log(`\n${r.name} (${r.town})`);
    for (const f of r.faults) {
      console.log(`  ${f.id} [${f.basis}] ${f.seenOn}`);
      console.log(`    ${f.observed}`);
    }
  }
}
