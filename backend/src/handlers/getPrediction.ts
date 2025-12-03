type RiskProfile = "safe" | "balanced" | "aggressive";

interface ApiGatewayEventLike {
  queryStringParameters?: {
    matchId?: string;
    risk?: string;
  };
}

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

export const handler = async (event: ApiGatewayEventLike) => {
  const matchId =
    event.queryStringParameters?.matchId?.toLowerCase() ?? "rm-barca";

  const risk: RiskProfile =
    (event.queryStringParameters?.risk as RiskProfile | undefined) ??
    "balanced";

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

  const marketMap: Record<RiskProfile, string> = {
    safe: "Double Chance - Home/Draw",
    balanced: "Over 2.5 Goals",
    aggressive: "Both Teams To Score & Over 2.5",
  };

  const edgePercent = edgeMap[risk];
  const confidence = confidenceMap[risk];
  const market = marketMap[risk];

  const response: PredictionResponse = {
    matchId,
    risk,
    edge: {
      edgePercent,
      confidence,
      market,
    },
    explanation: {
      summary: `Model favours ${market} with a ${edgePercent}% edge at a ${confidence} confidence level.`,
      bullets: [
        `Match: ${matchId}`,
        `Risk profile: ${risk}`,
        `Suggested market: ${market}`,
        `Projected edge: ${edgePercent}% (${confidence} confidence)`,
      ],
    },
  };

  return {
    statusCode: 200,
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(response),
  };
};

