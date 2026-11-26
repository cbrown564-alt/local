/** Open Graph share-card assets under public/media/og/. Regenerate with
    `node tools/capture/capture-og-cards.mjs` while `pnpm dev` is running. */
export const OG_IMAGE_SIZE = { width: 1200, height: 630 } as const;

export const ogImages = {
  studio: "/media/og/studio.jpg",
  home: "/media/og/home.jpg",
  transformations: "/media/og/transformations.jpg",
  request: "/media/og/request.jpg",
} as const;

export function transformationOgImage(slug: string): string {
  return `/media/og/${slug}.jpg`;
}

/** Custom 1200x630 Open Graph preview cards for Wave 1 & Wave 2 NMDDC concepts.
    Explicit string literals allow tools/check/check-public-assets.mjs to verify every asset. */
export const conceptOgCards: Record<string, string> = {
  "flagstaff-lodge": "/media/og/flagstaff-lodge.jpg",
  "the-lobster-pot": "/media/og/the-lobster-pot.jpg",
  "yew-wood-cottage": "/media/og/yew-wood-cottage.jpg",
  "old-school-house-rostrevor": "/media/og/old-school-house-rostrevor.jpg",
  "millers-close": "/media/og/millers-close.jpg",
  "crossgar-dental": "/media/og/crossgar-dental.jpg",
  "bridgend-studios": "/media/og/bridgend-studios.jpg",
  "belleek-country-house": "/media/og/belleek-country-house.jpg",
  "mulberry-tree-seaforde": "/media/og/mulberry-tree-seaforde.jpg",
  "ballymote-house": "/media/og/ballymote-house.jpg",
  "slieve-croob-camping": "/media/og/slieve-croob-camping.jpg",
  "saintfield-nursery": "/media/og/saintfield-nursery.jpg",
  "mourne-windows": "/media/og/mourne-windows.jpg",
  "digitech-repairs": "/media/og/digitech-repairs.jpg",
  "the-rostrevor-inn": "/media/og/the-rostrevor-inn.jpg",
  "the-oaks-saintfield": "/media/og/the-oaks-saintfield.jpg",
  "kilmorey-arms-hotel": "/media/og/kilmorey-arms-hotel.jpg",
  "the-bridge-bar-newry": "/media/og/the-bridge-bar-newry.jpg",
  "carrick-little-glamping": "/media/og/carrick-little-glamping.jpg",
};
