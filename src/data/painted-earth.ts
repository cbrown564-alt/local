export const paintedEarthBase = "/concepts/painted-earth";
export const paintedEarthLive = "https://www.paintedearthgifts.com";

export type PaintedEarthArtwork = {
  slug: string;
  title: string;
  artist: string;
  price: number;
  place: string;
  medium: string;
  available: boolean;
  theme: string;
  livePath: string;
};

export const paintedEarthArtworks: PaintedEarthArtwork[] = [
  {
    slug: "rossglass-to-mournes",
    title: "Rossglass To Mournes",
    artist: "Gary Murray",
    price: 700,
    place: "Mournes",
    medium: "Original painting",
    available: true,
    theme: "mountain",
    livePath: "/products/rossglass-to-mournes",
  },
  {
    slug: "tide",
    title: "Tide",
    artist: "Gary Murray",
    price: 575,
    place: "Sea",
    medium: "Original painting",
    available: true,
    theme: "tide",
    livePath: "/products/tide",
  },
  {
    slug: "ruby-the-robin",
    title: "Ruby the Robin",
    artist: "Gary Murray",
    price: 495,
    place: "County Down",
    medium: "Original painting",
    available: true,
    theme: "robin",
    livePath: "/products/ruby-the-robin",
  },
  {
    slug: "soft-breeze",
    title: "Soft Breeze",
    artist: "Deirdre Oram",
    price: 425,
    place: "Sea",
    medium: "Original painting",
    available: true,
    theme: "breeze",
    livePath: "/products/soft-breeze-original-painting",
  },
  {
    slug: "bloom-in-the-broken",
    title: "Bloom In The Broken",
    artist: "Julieanne Ashfield",
    price: 395,
    place: "Garden",
    medium: "Original painting",
    available: true,
    theme: "bloom",
    livePath: "/products/bloom-in-the-broken",
  },
  {
    slug: "evening-light",
    title: "Evening light on Slieve Donard",
    artist: "John O'Flaherty-Lynch",
    price: 650,
    place: "Mournes",
    medium: "Original painting",
    available: true,
    theme: "evening",
    livePath: "/products/evening-light-on-slieve-donard",
  },
  {
    slug: "cutie-the-puffin",
    title: "Cutie The Puffin",
    artist: "Gary Murray",
    price: 650,
    place: "Sea",
    medium: "Original painting",
    available: false,
    theme: "puffin",
    livePath: "/products/cutie-the-puffin",
  },
  {
    slug: "willow-the-badger",
    title: "Willow the Badger",
    artist: "Gary Murray",
    price: 650,
    place: "County Down",
    medium: "Original painting",
    available: false,
    theme: "badger",
    livePath: "/products/willow-the-badger",
  },
];

export const paintedEarthPlaces = [
  { name: "Mournes", count: 45, theme: "mountain" },
  { name: "Murlough", count: 18, theme: "dunes" },
  { name: "Tollymore", count: 14, theme: "forest" },
  { name: "Newcastle", count: 9, theme: "town" },
  { name: "Royal County Down", count: 7, theme: "links" },
];
