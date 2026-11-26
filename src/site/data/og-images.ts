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

/** Custom 1200x630 Open Graph preview cards for concept routes without published
    before-and-after transformation cards. Explicit string literals allow
    tools/check/check-public-assets.mjs to verify every asset. */
export const conceptOgCards: Record<string, string> = {
  // Wave 3 NMDDC concepts (10)
  "the-yellow-heifer": "/media/og/the-yellow-heifer.jpg",
  "burford-lodge": "/media/og/burford-lodge.jpg",
  "meelmore-lodge": "/media/og/meelmore-lodge.jpg",
  "raymies-warrenpoint": "/media/og/raymies-warrenpoint.jpg",
  "mourne-mountains-brewery": "/media/og/mourne-mountains-brewery.jpg",
  "millbrook-lodge": "/media/og/millbrook-lodge.jpg",
  "denvirs-downpatrick": "/media/og/denvirs-downpatrick.jpg",
  "the-smugglers-table": "/media/og/the-smugglers-table.jpg",
  "eamon-mcauley-interiors": "/media/og/eamon-mcauley-interiors.jpg",
  "the-barn-saul": "/media/og/the-barn-saul.jpg",
  // Wave 1 & Wave 2 NMDDC concepts (19)
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
  // Earlier concepts (43)
  "avoca-hotel": "/media/og/avoca-hotel.jpg",
  "bardan-cottage": "/media/og/bardan-cottage.jpg",
  "bear-necessities": "/media/og/bear-necessities.jpg",
  "bettys-butters": "/media/og/bettys-butters.jpg",
  "bikelab": "/media/og/bikelab.jpg",
  "binghams-menswear": "/media/og/binghams-menswear.jpg",
  "black-box-donuts": "/media/og/black-box-donuts.jpg",
  "bonnys": "/media/og/bonnys.jpg",
  "brunels": "/media/og/brunels.jpg",
  "bsw-autohouse": "/media/og/bsw-autohouse.jpg",
  "cafe-67": "/media/og/cafe-67.jpg",
  "castle-farm": "/media/og/castle-farm.jpg",
  "chatterbox": "/media/og/chatterbox.jpg",
  "clay-project": "/media/og/clay-project.jpg",
  "cookie-jar": "/media/og/cookie-jar.jpg",
  "cupla": "/media/og/cupla.jpg",
  "dacara": "/media/og/dacara.jpg",
  "dominic-mcinerney": "/media/og/dominic-mcinerney.jpg",
  "douglas-cromie": "/media/og/douglas-cromie.jpg",
  "dundrum-inn": "/media/og/dundrum-inn.jpg",
  "dundrum-physio": "/media/og/dundrum-physio.jpg",
  "first-4-floors": "/media/og/first-4-floors.jpg",
  "harbour-house": "/media/og/harbour-house.jpg",
  "irelands-appliance-centre": "/media/og/irelands-appliance-centre.jpg",
  "joke-and-toy-shop": "/media/og/joke-and-toy-shop.jpg",
  "kd-hair": "/media/og/kd-hair.jpg",
  "kelly-mcevoy-brown": "/media/og/kelly-mcevoy-brown.jpg",
  "kent-amusements": "/media/og/kent-amusements.jpg",
  "keown-nugent": "/media/og/keown-nugent.jpg",
  "maguire-law": "/media/og/maguire-law.jpg",
  "marine-wellness": "/media/og/marine-wellness.jpg",
  "mccreadys-footwear": "/media/og/mccreadys-footwear.jpg",
  "mourne-seafood-dundrum": "/media/og/mourne-seafood-dundrum.jpg",
  "newcastle-tennis-club": "/media/og/newcastle-tennis-club.jpg",
  "painted-earth": "/media/og/painted-earth.jpg",
  "railway-street": "/media/og/railway-street.jpg",
  "savoy-cafe": "/media/og/savoy-cafe.jpg",
  "shimna-cafe": "/media/og/shimna-cafe.jpg",
  "shimna-taxis": "/media/og/shimna-taxis.jpg",
  "stephen-morgan": "/media/og/stephen-morgan.jpg",
  "stile-glass": "/media/og/stile-glass.jpg",
  "terry-king": "/media/og/terry-king.jpg",
  "villa-vinci": "/media/og/villa-vinci.jpg",
};
