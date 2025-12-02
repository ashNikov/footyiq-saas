import type { Country, League, Club, Match, PredictionEdge } from "./types";

export const COUNTRIES: Country[] = [
  { code: "ENG", name: "England" },
  { code: "ESP", name: "Spain" },
  { code: "ITA", name: "Italy" },
];

export const LEAGUES: League[] = [
  { id: "epl", name: "Premier League", countryCode: "ENG", tier: 1 },
  { id: "laliga", name: "La Liga", countryCode: "ESP", tier: 1 },
  { id: "seriea", name: "Serie A", countryCode: "ITA", tier: 1 },
];

export const CLUBS: Club[] = [
  { id: "arsenal", name: "Arsenal", leagueId: "epl" },
  { id: "chelsea", name: "Chelsea", leagueId: "epl" },
  { id: "realmadrid", name: "Real Madrid", leagueId: "laliga" },
  { id: "barcelona", name: "Barcelona", leagueId: "laliga" },
];

export const MATCHES_TODAY: Match[] = [
  {
    id: "ars-che",
    leagueId: "epl",
    homeClubId: "arsenal",
    awayClubId: "chelsea",
    kickoffUtc: "2025-11-25T20:00:00Z",
  },
  {
    id: "rm-barca",
    leagueId: "laliga",
    homeClubId: "realmadrid",
    awayClubId: "barcelona",
    kickoffUtc: "2025-11-25T21:00:00Z",
  },
];

export const MOCK_EDGES: PredictionEdge[] = [
  {
    matchId: "ars-che",
    market: "home_win",
    edgePercent: 61,
    confidence: "medium",
  },
  {
    matchId: "rm-barca",
    market: "over_2_5",
    edgePercent: 68,
    confidence: "high",
  },
];

