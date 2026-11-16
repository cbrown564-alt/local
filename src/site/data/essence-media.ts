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
  "kent-amusements": {
    heading: "The games change. The summer stays.",
    lede: "One promenade, one coin and more than fifty Newcastle summers.",
    frames: [
      ["/media/concepts/kent-amusements/essence-sequence-01.jpg", "a promenade arcade threshold with a jukebox and one coin in the foreground", "Late 1960s"],
      ["/media/concepts/kent-amusements/essence-sequence-02.jpg", "the same threshold and coin beside a later change booth", "Change-booth years"],
      ["/media/concepts/kent-amusements/essence-sequence-03.jpg", "the same threshold lit by 1990s-style arcade cabinets", "The arcade glow"],
      ["/media/concepts/kent-amusements/essence-sequence-04.jpg", "the same modern threshold with a compact virtual-reality area and the coin upright", "Today"],
    ].map(([src, alt, label]) => ({ src, alt: `AI-generated illustrated scene of ${alt}`, label })),
  },
  "dundrum-inn": {
    heading: "One table, from bay light to blue hour.",
    lede: "A local inn through the day and a place to stay through the night.",
    frames: [
      ["/media/concepts/dundrum-inn/essence-sequence-01.jpg", "a room key on a table beside Dundrum Bay in daylight", "Day by the bay"],
      ["/media/concepts/dundrum-inn/essence-sequence-02.jpg", "the same key and an empty pub glass in late-afternoon light", "Late afternoon"],
      ["/media/concepts/dundrum-inn/essence-sequence-03.jpg", "the same table at blue hour with a warm amber drink and room key", "Evening at the Inn"],
    ].map(([src, alt, label]) => ({ src, alt: `AI-generated indicative scene of ${alt}`, label })),
  },
  "castle-farm": {
    heading: "Old ground. This week’s round.",
    lede: "Produce from a family farm beside the castle, packed for the road today.",
    frames: [{
      src: "/media/concepts/castle-farm/essence-video-seed.jpg",
      alt: "AI-generated overhead scene of fresh vegetables in a delivery box under a castle-shaped shadow",
      label: "From the field to this week’s delivery",
    }],
  },
  "marine-wellness": {
    heading: "The hands stay the same.",
    lede: "Twenty years of therapeutic massage, reflexology and restorative care in Newcastle.",
    frames: [{
      src: "/media/concepts/marine-wellness/calm.jpg",
      alt: "AI-generated scene of a calm, sunlit treatment room with soft linen and plants",
      label: "A calm treatment room",
    }],
  },
  "bettys-butters": {
    heading: "A little butter changes the whole plate.",
    lede: "Professional-kitchen flavour, made useful on an ordinary night at home.",
    frames: [{
      src: "/media/concepts/bettys-butters/essence-video-seed.jpg",
      alt: "AI-generated serving idea showing herb butter melting over chicken, potatoes and greens",
      label: "From Tuesday tea to the plate you look forward to",
    }],
  },
  "kelly-mcevoy-brown": {
    heading: "A small register with a substantial record.",
    lede: "More than fifty years of schools, hospitals, churches and community halls, made visible.",
    frames: [
      ["/media/concepts/kelly-mcevoy-brown/essence-sequence-01.jpg", "a small closed project register on a large survey table", "The register"],
      ["/media/concepts/kelly-mcevoy-brown/essence-sequence-02.jpg", "the register open as fine routes spread across a folded county map", "The record opens"],
      ["/media/concepts/kelly-mcevoy-brown/essence-sequence-03.jpg", "paper models of civic buildings rising from the mapped locations", "The work takes shape"],
      ["/media/concepts/kelly-mcevoy-brown/essence-sequence-04.jpg", "the small register at the centre of a substantial paper-built landscape", "The weight of the record"],
    ].map(([src, alt, label]) => ({ src, alt: `AI-generated paper-model scene of ${alt}`, label })),
  },
  "douglas-cromie": {
    heading: "The key comes back ready for the road.",
    lede: "Sales, servicing and after-sales care are one continuing promise.",
    frames: [
      ["/media/concepts/douglas-cromie/essence-sequence-01.jpg", "a plain car key arriving at a garage service counter", "Arrival"],
      ["/media/concepts/douglas-cromie/essence-sequence-02.jpg", "the same key held at the counter while the car is cared for in the workshop", "Workshop"],
      ["/media/concepts/douglas-cromie/essence-sequence-03.jpg", "a hand closing around the same key, ready to return to the road", "Ready to go"],
    ].map(([src, alt, label]) => ({ src, alt: `AI-generated scene of ${alt}`, label })),
  },
  "painted-earth": {
    heading: "Many hands make one place.",
    lede: "Different materials and makers come together, then one handmade piece travels home.",
    frames: [
      ["/media/concepts/painted-earth/essence-sequence-01.jpg", "paper, thread, clay, wood and paint sitting separately on a worktable", "The materials"],
      ["/media/concepts/painted-earth/essence-sequence-02.jpg", "more individually different handmade pieces moving together", "Many makers"],
      ["/media/concepts/painted-earth/essence-sequence-03.jpg", "the materials beginning to form a tactile Mourne and County Down landscape", "A place takes shape"],
      ["/media/concepts/painted-earth/essence-sequence-04.jpg", "the complete handmade landscape of mountain, fields and blue coast", "Held together"],
      ["/media/concepts/painted-earth/essence-sequence-05.jpg", "a hand lifting one small finished piece while the larger landscape remains", "A piece to take home"],
    ].map(([src, alt, label]) => ({ src, alt: `AI-generated original craft scene of ${alt}`, label })),
  },
  "villa-vinci": {
    heading: "The promenade first, then the table.",
    lede: "Since 2008, where the warmth of the Mediterranean meets the charm of the Mourne Mountains.",
    frames: [{
      src: "/media/concepts/villa-vinci/dish.jpg",
      alt: "AI-generated scene of steaming seafood pasta in a rich tomato sauce at a Mediterranean coastal trattoria table",
      label: "From the kitchen pass to the promenade table",
    }],
  },
  "binghams-menswear": {
    heading: "Two measured days, through one door.",
    lede: "From the P1 school blazer to the wedding morning, measured properly on Main Street.",
    frames: [{
      src: "/media/concepts/binghams-menswear/fitting-session.jpg",
      alt: "AI-generated scene of a bespoke herringbone tweed jacket on a tailoring bust with tailor's tape, shears and chalk on Main Street",
      label: "The fitting on Main Street",
    }],
  },
  "bear-necessities": {
    heading: "The party venue that travels to your door.",
    lede: "Custom teddy bear making workshops, heartfelt adoption ceremonies and magical memories across County Down.",
    frames: [{
      src: "/media/concepts/bear-necessities/party-moment.jpg",
      alt: "AI-generated scene of a child with their newly made teddy bear and adoption certificate at a party",
      label: "A completed bear and adoption certificate",
    }],
  },
  "irelands-appliance-centre": {
    heading: "The kitchen working again.",
    lede: "Two vans already in town when the cooker goes cold, and bench repairs on the harbour.",
    frames: [{
      src: "/media/concepts/irelands-appliance-centre/kitchen.jpg",
      alt: "AI-generated scene of a restored kitchen at evening with warm appliance light and working machines",
      label: "The kitchen restored",
    }],
  },
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

