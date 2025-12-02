export type RiskProfile = "safe" | "balanced" | "aggressive";

export type Confidence = "low" | "medium" | "high";

export interface PredictionEdge {
  edgePercent: number;
  confidence: Confidence;
  market: string;
}

export interface PredictionResponse {
  edge: PredictionEdge;
  explanation: {
    summary: string;
    bullets: string[];
  };
}

