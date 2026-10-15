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
  /** A private, unlisted page shown to the business instead of the public
      case study (e.g. `/for/<slug>-<code>/`). Such a page has no request form
      for a `?source=` to reach, so the printed URL is the bare path — short
      enough to type from the paper. */
  privatePath?: `/for/${string}/`;
}

export const oneSheets = {
  "hotel-enniskeen": {
    slug: "hotel-enniskeen",
    route: "/workbench/print/enniskeen-onesheet/",
    qr: "public/media/concepts/hotel-enniskeen/hotel-enniskeen-onesheet-qr.svg",
    output: ".scratch/print/pdf/hotel-enniskeen-flagship-onesheet.pdf",
    /* The public case study was taken down with the gallery; on 15 October
       2026 this sheet's QR still scanned to its 404. */
    privatePath: "/for/enniskeen-dysn/",
  },
  /* The Buck's Head and Cúpla sheets were archived with their concepts on
     27 September 2026 (archive/concepts/<slug>/workbench/). */
  "scopers": {
    slug: "scopers",
    route: "/workbench/print/scopers-onesheet/",
    qr: "public/media/concepts/scopers/scopers-onesheet-qr.svg",
    output: ".scratch/print/pdf/scopers-onesheet.pdf",
  },
} as const satisfies Record<string, OneSheet>;

export type OneSheetSlug = keyof typeof oneSheets;

const publicSlugs = new Set<string>(publicTransformationSlugs);

/** The `source` value a sheet's QR must carry, per docs/adr/0002. */
export const oneSheetSource = (slug: string) => `onesheet-${slug}`;

const sheetFor = (slug: string): OneSheet | undefined =>
  (oneSheets as Record<string, OneSheet>)[slug];

/** The path a sheet's QR encodes. Absolute URL and printed text derive from
    this one string so they cannot drift apart. */
export const oneSheetPath = (slug: string) =>
  sheetFor(slug)?.privatePath ?? `/transformations/${slug}/?source=${oneSheetSource(slug)}`;

/**
 * A printed URL cannot be revised after the run, so an unknown or unpublished
 * slug is a build-time failure rather than a sheet that scans to a 404.
 */
export const oneSheetUrl = (slug: string) => {
  if (!sheetFor(slug)?.privatePath && !publicSlugs.has(slug)) {
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
