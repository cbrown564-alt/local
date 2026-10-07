export interface EssenceFrame {
  src: string;
  alt: string;
  label: string;
}

export interface EssenceMedia {
  heading: string;
  lede: string;
  frames: EssenceFrame[];
  video?: {
    mp4: string;
    webm: string;
  };
}

export const essenceMedia: Record<string, EssenceMedia> = {
  "arley-house": {
    heading: "The door opens on Belfast Road.",
    lede: "A welcoming morning in Dundrum: bikes at the door, the dog on the boards, and Newcastle when you want it.",
    frames: [{
      src: "/media/concepts/arley-house/morning-door.jpg",
      alt: "AI-generated morning scene of a coastal guesthouse door on Belfast Road with touring bicycles and a dog on the floorboards",
      label: "Morning on Belfast Road",
    }],
  },
  "cocos-adventure-playground": {
    heading: "Walk in for play. Ring for a party.",
    lede: "Two hours of adventure play, dedicated party rooms, and a viewing café overlooking the frame on Central Promenade.",
    frames: [{
      src: "/media/concepts/cocos-adventure-playground/play.jpg",
      alt: "A vibrant indoor children's adventure playground with colorful multi-level slides, ball pits, and an elevated mezzanine viewing cafe overlooking the arena",
      label: "The play kingdom and mezzanine viewing café",
    }],
  },
  "conlyn-house": {
    heading: "Wake to the ocean metres from your room.",
    lede: "Central Promenade at the purple door: a 9-iron from Royal County Down, with panoramic Dundrum Bay and Slieve Donard sloping to the sea.",
    frames: [{
      src: "/media/concepts/conlyn-house/windows-dusk.jpg",
      alt: "AI-generated indicative scene of a Victorian seaside guesthouse with a purple door on Central Promenade overlooking Dundrum Bay and the Mournes",
      label: "Central Promenade and the purple front door",
    }],
  },
  "donard-veterinary": {
    heading: "A calm line through every age.",
    lede: "Routine care, help when worry arrives, and kindness across a pet’s whole life.",
    frames: [
      ["/media/concepts/donard-veterinary/essence-sequence-01.jpg", "A clinic telephone line reaching a young dog, cat and rabbit", "The first call"],
      ["/media/concepts/donard-veterinary/essence-sequence-02.jpg", "The same telephone line connecting the animals with routine-care symbols", "Routine care"],
      ["/media/concepts/donard-veterinary/essence-sequence-03.jpg", "The line connecting a worried owner at night with an on-call handset and digital vet help", "Help after hours"],
      ["/media/concepts/donard-veterinary/essence-sequence-04.jpg", "The telephone line loosely sheltering the same dog, cat and rabbit as adults", "Care as they grow"],
      ["/media/concepts/donard-veterinary/essence-sequence-05.jpg", "An older spaniel resting beside an owner’s hand while the telephone line settles around its paw", "Kindness at every stage"],
    ].map(([src, alt, label]) => ({ src, alt: `AI-generated illustration of ${alt}`, label })),
  },
  "hotel-enniskeen": {
    heading: "Breakfast meets the valley.",
    lede: "A warm welcome inside, with garden, mist and mountain just beyond the glass.",
    frames: [
      ["/media/concepts/hotel-enniskeen/essence-sequence-01.jpg", "a steaming breakfast cup beside a window over the Shimna Valley", "Early morning"],
      ["/media/concepts/hotel-enniskeen/essence-sequence-02.jpg", "the cup’s steam aligning with two ribbons of mist in the valley", "Steam and valley mist"],
      ["/media/concepts/hotel-enniskeen/essence-sequence-03.jpg", "the same view as morning light reaches the garden and the mist lifts", "The mountainside revealed"],
    ].map(([src, alt, label]) => ({ src, alt: `AI-generated indicative scene of ${alt}`, label })),
  },
  "hugh-mccanns": {
    heading: "An old room, waiting for your day.",
    lede: "Two hundred years of family history, prepared for one future celebration.",
    frames: [{
      src: "/media/concepts/hugh-mccanns/essence-video-seed.jpg",
      alt: "AI-generated historic dining room prepared with two places, a candle and a blank date card",
      label: "Until your day",
    }],
  },
  "mourne-cycles": {
    heading: "From the stand to the trail.",
    lede: "The workshop keeps the ride going long after the bike leaves the shop.",
    frames: [{
      src: "/media/concepts/mourne-cycles/essence-video-seed.jpg",
      alt: "AI-generated bicycle wheel in a truing stand with a Mourne trail visible through the spokes",
      label: "Workshop care, trail ahead",
    }],
  },
  "newcastle-chamber": {
    heading: "When local trade is visible, the whole town connects.",
    lede: "A useful directory turns separate businesses into a place people can find their way around.",
    frames: [
      ["/media/concepts/newcastle-chamber/essence-sequence-01.jpg", "a quiet map of Newcastle with its streets and coast", "The town"],
      ["/media/concepts/newcastle-chamber/essence-sequence-02.jpg", "the same map as warm lights appear along Main Street and the promenade", "Businesses appear"],
      ["/media/concepts/newcastle-chamber/essence-sequence-03.jpg", "more trade lights connected by fine paths across the same map", "Local routes connect"],
      ["/media/concepts/newcastle-chamber/essence-sequence-04.jpg", "the lit town map resolving into one connected directory pin", "One findable town"],
    ].map(([src, alt, label]) => ({ src, alt: `AI-generated indicative map illustration of ${alt}`, label })),
  },
  "newcastle-dental": {
    heading: "A familiar name returns to the door.",
    lede: "A calm, independent family practice should be easy to see and easy to reach.",
    frames: [
      ["/media/concepts/newcastle-dental/essence-sequence-01.jpg", "an unlit family dental-practice door with an empty nameplate", "The quiet door"],
      ["/media/concepts/newcastle-dental/essence-sequence-02.jpg", "the same frosted-glass door warmly lit with two soft staff silhouettes inside", "A welcome inside"],
      ["/media/concepts/newcastle-dental/essence-sequence-03.jpg", "the door slightly open with Newcastle Family Dental Care on the nameplate", "The name returns"],
    ].map(([src, alt, label]) => ({ src, alt: `AI-generated indicative scene of ${alt}`, label })),
  },
  "scopers": {
    heading: "The whole carrot earns its place.",
    lede: "Root, peel, tops and trim become something worth eating—not something left behind.",
    frames: [{
      src: "/media/concepts/scopers/essence-video-seed.jpg",
      alt: "AI-generated serving idea using a whole carrot as a finished plate, crisp garnish, green oil and stock",
      label: "Appetite first, zero waste made visible",
    }],
    video: {
      mp4: "/media/concepts/scopers/essence-whole-carrot.mp4",
      webm: "/media/concepts/scopers/essence-whole-carrot.webm",
    },
  },
};

