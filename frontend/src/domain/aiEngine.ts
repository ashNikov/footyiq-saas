import type { Match, PredictionEdge } from "./types";
import { CLUBS, LEAGUES } from "./mockData";

export type RiskProfile = "safe" | "balanced" | "aggressive";

export interface AiInput {
  match: Match;
  risk: RiskProfile;
}

export interface AiExplanation {
  summary: string;
  bullets: string[];
}

export interface AiResult {
  edge: PredictionEdge;
  explanation: AiExplanation;
}

// tiny helpers
function getClubName(id: string): string {
  const club = CLUBS.find((c) => c.id === id);
  return club ? club.name : id;
}

function getLeagueName(id: string): string {
  const league = LEAGUES.find((l) => l.id === id);
  return league ? league.name : id;
}

// This is our "mock AI" for now.
// Later we can replace this with a real AI API call.
export function mockAiPredict(input: AiInput): AiResult {
  const { match, risk } = input;

  const leagueName = getLeagueName(match.leagueId);
  const home = getClubName(match.homeClubId);
  const away = getClubName(match.awayClubId);

  // base edge by league (just fake heuristics for now)
  let baseEdge =
    match.leagueId === "epl"
      ? 60
      : match.leagueId === "laliga"
      ? 58
      : 55;

  // adjust by risk profile
  if (risk === "safe") baseEdge -= 6;
  if (risk === "aggressive") baseEdge += 8;

  // clamp
  const edgePercent = Math.max(48, Math.min(82, baseEdge));

  // choose market by risk
  const market: PredictionEdge["market"] =
    risk === "safe"
      ? "home_win"
      : risk === "balanced"
      ? "over_2_5"
      : "btts";

  // confidence from edge strength
  const confidence: PredictionEdge["confidence"] =
    edgePercent >= 72 ? "high" : edgePercent >= 60 ? "medium" : "low";

  const edge: PredictionEdge = {
    matchId: match.id,
    market,
    edgePercent,
    confidence,
  };

  const explanation: AiExplanation = {
    summary: `${leagueName}: ${marketLabel(
      market
    )} shows a ${edgePercent}% modeled edge (${confidence} confidence).`,
    bullets: [
      `Match: ${home} vs ${away} in the ${leagueName}.`,
      risk === "safe"
        ? "Using a conservative profile to reduce volatility and focus on higher-probability outcomes."
        : risk === "balanced"
        ? "Blending goal and result-based markets for a stable risk / reward profile."
        : "Leaning into high-variance markets for bigger potential returns.",
      "In the real FootyIQ engine this will combine form, xG, injuries, and live odds before suggesting a bet.",
    ],
  };

  return { edge, explanation };
}

function marketLabel(market: PredictionEdge["market"]): string {
  switch (market) {
    case "home_win":
      return "Home win";
    case "away_win":
      return "Away win";
    case "draw":
      return "Full-time draw";
    case "over_2_5":
      return "Over 2.5 goals";
    case "btts":
      return "Both teams to score";
    default:
      return market;
  }
}

