// Player Types
export interface Player {
  id: string;
  name: string;
  slug: string;
  shortName: string;
  team: Team;
  position: string;
  height: number;
  preferredFoot: string | null;
  dateOfBirthTimestamp: number;
  contractUntilTimestamp: number;
  proposedMarketValue: number;
  proposedMarketValueRaw: {
    value: number;
    currency: string;
  };
  nationality: {
    id: string;
    name: string;
  };
}

export interface Team {
  id: string;
  name: string;
  slug: string;
  sport: Sport;
  tournament: Tournament;
  country: Country;
}

export interface Sport {
  name: string;
  slug: string;
}

export interface Tournament {
  name: string;
  slug: string;
  category: Category;
}

export interface Category {
  name: string;
  slug: string;
  id: string;
  sport: Sport;
}

export interface Country {
  id: string;
  name: string;
}