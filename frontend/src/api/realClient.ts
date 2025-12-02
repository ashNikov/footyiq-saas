import type { PredictionResponse, RiskProfile } from "./types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type GetPredictionInput = {
  matchId: string;
  risk: RiskProfile;
};

export async function getPredictionReal(
  input: GetPredictionInput
): Promise<PredictionResponse> {
  const { matchId, risk } = input;

  if (!API_BASE_URL) {
    throw new Error("VITE_API_BASE_URL no set for .env");
  }

  const url = `${API_BASE_URL}/prediction?matchId=${encodeURIComponent(
    matchId
  )}&risk=${encodeURIComponent(risk)}`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

  const data = (await res.json()) as PredictionResponse;
  return data;
}

