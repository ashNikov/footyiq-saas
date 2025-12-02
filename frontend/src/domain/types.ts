// Core domain types for FootyIQ

export type CountryCode = string; // e.g. "ENG", "ESP"

export interface Country {
  code: CountryCode;
  name: string;
}

export interface League {
  id: string;          // "epl", "laliga"
  name: string;        // "Premier League"
  countryCode: CountryCode;
  tier: number;        // 1 = top division
}

export interface Club {
  id: string;          // "arsenal"
  name: string;        // "Arsenal"
  leagueId: string;    // link to League.id
}

export interface Match {
  id: string;
  leagueId: string;
  homeClubId: string;
  awayClubId: string;
  kickoffUtc: string;  // ISO string
}

export interface PredictionEdge {
  matchId: string;
  market: "home_win" | "away_win" | "draw" | "over_2_5" | "btts";
  edgePercent: number;   // 0–100
  confidence: "low" | "medium" | "high";
}

