import { publicTransformationSlugs } from "./transformations.ts";

/**
 * The printed-QR attribution contract, in one place.
 *
 * docs/adr/0002 records that this chain broke in three independent places at
 * once, and the first of them was that the artwork printed `?src=onesheet`
 * while the form read `?source=`. That drift was possible because the URL was
 * written out by hand in the sheet's Astro page and again in the print script.
 * Both now derive it from here, so a printed sheet and the QR beside it cannot
 * disagree about where they point.
 */

export interface OneSheet {
  /** Public transformation slug. Also qualifies the source, so a scan is
      attributable to the sheet that caused it rather than to "a one-sheet". */
  slug: string;
  /** Workbench route rendering the two A4 pages. */
  route: string;
  /** Generated QR artwork, committed so the PDF build is reproducible. */
  qr: string;
  /** Rendered PDF, outside the published site. */
  output: string;
}

export const oneSheets = {
  "hotel-enniskeen": {
    slug: "hotel-enniskeen",
    route: "/workbench/print/enniskeen-onesheet/",
    qr: "public/media/concepts/hotel-enniskeen/hotel-enniskeen-onesheet-qr.svg",
    output: ".scratch/print/pdf/hotel-enniskeen-flagship-onesheet.pdf",
  },
  /* The Buck's Head replied on 3 August 2026: a replacement website is already
     built and waiting on accommodation readiness. Its sheet stays renderable
     for the record but must not be printed or handed over (PLAN.md section 3). */
  "bucks-head": {
    slug: "bucks-head",
    route: "/workbench/print/bucks-head-onesheet/",
    qr: "public/media/concepts/bucks-head/bucks-head-onesheet-qr.svg",
    output: ".scratch/print/pdf/bucks-head-journey-onesheet.pdf",
  },
  "scopers": {
    slug: "scopers",
    route: "/workbench/print/scopers-onesheet/",
    qr: "public/media/concepts/scopers/scopers-onesheet-qr.svg",
    output: ".scratch/print/pdf/scopers-onesheet.pdf",
  },
  "cupla": {
    slug: "cupla",
    route: "/workbench/print/cupla-onesheet/",
    qr: "public/media/concepts/cupla/cupla-onesheet-qr.svg",
    output: ".scratch/print/pdf/cupla-onesheet.pdf",
  },
} as const satisfies Record<string, OneSheet>;

export type OneSheetSlug = keyof typeof oneSheets;

const publicSlugs = new Set<string>(publicTransformationSlugs);

/** The `source` value a sheet's QR must carry, per docs/adr/0002. */
export const oneSheetSource = (slug: string) => `onesheet-${slug}`;

/** The path a sheet's QR encodes. Absolute URL and printed text derive from
    this one string so they cannot drift apart. */
export const oneSheetPath = (slug: string) =>
  `/transformations/${slug}/?source=${oneSheetSource(slug)}`;

/**
 * A printed URL cannot be revised after the run, so an unknown or unpublished
 * slug is a build-time failure rather than a sheet that scans to a 404.
 */
export const oneSheetUrl = (slug: string) => {
  if (!publicSlugs.has(slug)) {
    throw new Error(
      `One-sheet slug "${slug}" is not a public transformation. A printed QR would scan to a 404.`,
    );
  }
  return {
    href: `https://mournemade.co.uk${oneSheetPath(slug)}`,
    /** Shown beside the QR so a reader who will not scan can still type it. */
    display: `mournemade.co.uk${oneSheetPath(slug)}`,
  };
};
