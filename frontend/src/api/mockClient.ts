// src/api/mockClient.ts
export type RiskProfile = "safe" | "balanced" | "aggressive";

export interface PredictionResponse {
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

const API_BASE = "https://4wq975jxo0.execute-api.eu-west-1.amazonaws.com";

export async function getPrediction(params: {
  matchId: string;
  risk: RiskProfile;
}): Promise<PredictionResponse> {
  const { matchId, risk } = params;

  const url = `${API_BASE}/prediction?matchId=${encodeURIComponent(
    matchId
  )}&risk=${encodeURIComponent(risk)}`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`API error ${res.status}`);
  }

  return (await res.json()) as PredictionResponse;
}

