export type PublicState = "open" | "nearly-full" | "closed" | "between-weeks";

export type ItemAvailability = "available" | "limited" | "unavailable";

export type OperatingPage = {
  business: {
    name: string;
    contact: string;
    area: string;
  };
  publicState: PublicState;
  period: {
    startsAt: string;
    endsAt: string;
    cutoffAt: string | null;
    returnsAt: string | null;
  };
  ownerNote: string;
  items: Array<{
    id: string;
    name: string;
    description: string;
    priceNote: string | null;
    availability: ItemAvailability;
    unit: string | null;
    image: string | null;
  }>;
  fulfilment: Array<{
    label: string;
    at: string;
    note: string;
  }>;
  requestFields: Array<"name" | "email" | "phone" | "collection" | "note">;
  publishedAt: string;
  publishedBy: string;
};

export type SimulatedRequest = {
  id: string;
  createdAt: string;
  name: string;
  contact: string;
  collection: string;
  note: string;
  itemIds: string[];
  answered: boolean;
};

export type PublishResult = {
  live: OperatingPage;
  previous: OperatingPage;
};
