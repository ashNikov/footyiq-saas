import type { APIGatewayProxyHandlerV2 } from "aws-lambda";

type RiskProfile = "safe" | "balanced" | "aggressive";

interface PredictionResponse {
  matchId: string;
  risk: RiskProfile;
  edge: {
    edgePercent: number;
    confidence: "low" | "medium" | "high";
    market: string;
  };
  explanation: {
    summary: string;
    bullets: string[];
  };
}

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  const matchId = event.queryStringParameters?.matchId ?? "rm-barca";
  const risk = (event.queryStringParameters?.risk as RiskProfile) ?? "balanced";

  const edgeMap: Record<RiskProfile, number> = {
    safe: 52,
    balanced: 58,
    aggressive: 63,
  };

  const confidenceMap: Record<RiskProfile, "low" | "medium" | "high"> = {
    safe: "high",
    balanced: "medium",
    aggressive: "low",
  };

  const response: PredictionResponse = {
    matchId,
    risk,
    edge: {
      edgePercent: edgeMap[risk],
      confidence: confidenceMap[risk],
      market: "Over 2.5 goals",
    },
    explanation: {
      summary: `La Liga: Over 2.5 goals shows a ${edgeMap[risk]}% modelled edge (${confidenceMap[risk]} confidence).`,
      bullets: [
        `Match: ${matchId} in La Liga.`,
        "Using a balanced risk profile to blend upside and volatility.",
        "Real FootyIQ engine will later combine form, xG, injuries and live odds.",
      ],
    },
  };

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
      // 👉 CORS so browser can call from http://localhost:5173
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Methods": "GET,OPTIONS",
    },
    body: JSON.stringify(response),
  };
};

