"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
// Very small mock match list for Lambda runtime
const MATCHES = [
    {
        id: "rm-barca",
        home: "Real Madrid",
        away: "Barcelona",
        league: "La Liga",
    },
    {
        id: "ars-che",
        home: "Arsenal",
        away: "Chelsea",
        league: "Premier League",
    },
];
function mockAiPredict(matchId, risk) {
    const match = MATCHES.find((m) => m.id === matchId) ?? MATCHES[0];
    let edgePercent = 55;
    let confidence = "low";
    let market = "Over 2.5 goals";
    if (risk === "safe") {
        edgePercent = 52;
        confidence = "low";
        market = "Home win";
    }
    else if (risk === "balanced") {
        edgePercent = 58;
        confidence = "low";
        market = "Over 2.5 goals";
    }
    else if (risk === "aggressive") {
        edgePercent = 64;
        confidence = "medium";
        market = "Both teams to score";
    }
    const summary = `${match.league}: ${market} shows a ${edgePercent}% modeled edge (${confidence} confidence).`;
    const bullets = [
        `Match: ${match.home} vs ${match.away} in the ${match.league}.`,
        `Using a ${risk} risk profile to balance upside and volatility.`,
        "Real engine will use form, xG, injuries, and live odds before suggesting a bet.",
    ];
    return {
        edge: { edgePercent, confidence, market },
        explanation: { summary, bullets },
    };
}
const handler = async (event) => {
    try {
        const params = event.queryStringParameters || {};
        const matchId = params.matchId || "rm-barca";
        const risk = params.risk || "balanced";
        const result = mockAiPredict(matchId, risk);
        const response = {
            edge: result.edge,
            explanation: result.explanation,
        };
        return {
            statusCode: 200,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(response),
        };
    }
    catch (err) {
        console.error("Prediction error", err);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Internal server error" }),
        };
    }
};
exports.handler = handler;
//# sourceMappingURL=getPrediction.js.map