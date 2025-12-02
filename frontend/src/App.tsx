import { useEffect, useState } from "react";
import { LEAGUES, MATCHES_TODAY, CLUBS } from "./domain/mockData";
import type { RiskProfile } from "./domain/aiEngine";
import type { PredictionResponse } from "./api/types";
import { getPrediction as getPredictionMock } from "./api/mockClient";
import { getPredictionReal } from "./api/realClient";

console.log("VITE_API_BASE_URL =", import.meta.env.VITE_API_BASE_URL);
console.log("VITE_USE_REAL_API =", import.meta.env.VITE_USE_REAL_API);

const useRealApi = import.meta.env.VITE_USE_REAL_API === "true";
const getPrediction = useRealApi ? getPredictionReal : getPredictionMock;


type View = "predict" | "today";

function getLeagueName(id: string): string {
  const league = LEAGUES.find((l) => l.id === id);
  return league ? league.name : id;
}

function getClubName(id: string): string {
  const club = CLUBS.find((c) => c.id === id);
  return club ? club.name : id;
}

export default function App() {
  const [activeView, setActiveView] = useState<View>("predict");
  const [selectedMatchId, setSelectedMatchId] = useState<string | null>(
    MATCHES_TODAY[0]?.id ?? null
  );
  const [riskProfile, setRiskProfile] =
    useState<RiskProfile>("balanced");
  const [aiResult, setAiResult] =
    useState<PredictionResponse | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  const selectedMatch =
    MATCHES_TODAY.find((m) => m.id === selectedMatchId) ?? null;

  async function loadPrediction(matchId: string, risk: RiskProfile) {
    try {
      setLoadingAi(true);
      setAiError(null);

      const response = await getPrediction({ matchId, risk });
      setAiResult(response);
    } catch (err: any) {
      setAiError(err?.message ?? "Something went wrong with FootyIQ AI.");
    } finally {
      setLoadingAi(false);
    }
  }

  // Call our “API” whenever match or risk profile changes
  useEffect(() => {
    if (!selectedMatchId) return;
    loadPrediction(selectedMatchId, riskProfile);
  }, [selectedMatchId, riskProfile]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-black text-gray-100">
      {/* Top bar */}
      <header className="flex items-center justify-between px-6 md:px-12 py-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          {/* Animated logo */}
          <div className="logo-roller">
            <span className="logo-ball">⚽</span>
            <span className="logo-text">FootyIQ</span>
          </div>

          {/* Uwem signature */}
          <span className="logo-signature text-[10px] text-gray-400 ml-2">
            powered by uwem
          </span>
        </div>

        <nav className="flex gap-4 text-xs md:text-sm text-gray-300">
          <button
            className={
              activeView === "predict"
                ? "text-emerald-400 font-semibold"
                : "hover:text-emerald-300"
            }
            onClick={() => setActiveView("predict")}
          >
            AI Predictions
          </button>
          <button
            className={
              activeView === "today"
                ? "text-emerald-400 font-semibold"
                : "hover:text-emerald-300"
            }
            onClick={() => setActiveView("today")}
          >
            Today&apos;s Fixtures
          </button>
        </nav>
      </header>

      {/* Hero section */}
      <main className="px-6 md:px-12 py-10 md:py-12">
        <section className="max-w-5xl">
          <p className="uppercase tracking-[0.3em] text-emerald-400 text-xs md:text-sm mb-3">
            AI FOOTBALL PREDICTIONS
          </p>
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-4">
            Predict Smarter.{" "}
            <span className="text-emerald-400">Win Bigger.</span>
          </h1>
          <p className="text-sm md:text-base text-gray-300 mb-6 max-w-xl">
            FootyIQ analyzes form, xG, injuries and live odds to give you sharp,
            data-driven recommendations for the smartest bets and predictions
            across all major leagues.
          </p>
        </section>

        {/* View switcher label */}
        <p className="text-xs text-gray-400 mb-4">
          View:{" "}
          <span className="text-emerald-300 font-semibold uppercase">
            {activeView === "predict"
              ? "AI Predictions"
              : "Today’s Fixtures"}
          </span>
        </p>

        {/* Main content grid */}
        <section className="mt-4 space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-[2fr,1.3fr] gap-6 items-start">
            {/* LEFT: AI / Fixtures panel */}
            <div className="rounded-2xl bg-white/5 border border-white/10 p-5 md:p-6 min-h-[260px] shadow-xl shadow-emerald-500/10">
              {activeView === "predict" && selectedMatch ? (
                <>
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                    <div>
                      <h3 className="text-base md:text-lg font-semibold">
                        AI Prediction Console
                      </h3>
                      <p className="text-xs md:text-sm text-gray-300">
                        {getClubName(selectedMatch.homeClubId)}{" "}
                        <span className="text-gray-400">vs</span>{" "}
                        {getClubName(selectedMatch.awayClubId)}{" "}
                        <span className="text-emerald-300 text-[11px] ml-1">
                          {getLeagueName(selectedMatch.leagueId)}
                        </span>
                      </p>
                    </div>
                    <div className="text-[10px] uppercase tracking-wide text-gray-400">
                      <span className="text-gray-300">Risk profile:</span>{" "}
                      <span className="text-emerald-300">{riskProfile}</span>
                    </div>
                  </div>

                  {/* Risk profile buttons */}
                  <div className="flex flex-wrap gap-2 text-[11px] md:text-xs mb-4">
                    <span className="text-gray-400 mr-2">Risk profile:</span>
                    {(["safe", "balanced", "aggressive"] as RiskProfile[]).map(
                      (profile) => (
                        <button
                          key={profile}
                          onClick={() => setRiskProfile(profile)}
                          className={`px-2.5 py-1 rounded-full border capitalize ${
                            riskProfile === profile
                              ? "border-emerald-400 bg-emerald-500/20 text-emerald-200"
                              : "border-white/15 text-gray-300 hover:border-emerald-300"
                          }`}
                        >
                          {profile}
                        </button>
                      )
                    )}
                  </div>

                  {loadingAi ? (
                    <p className="text-gray-400 text-sm">
                      Running FootyIQ AI model…
                    </p>
                  ) : aiError ? (
                    <p className="text-red-400 text-sm">{aiError}</p>
                  ) : aiResult ? (
                    <>
                      <div className="mb-3 text-xs md:text-sm">
                        <div className="text-emerald-300 font-semibold mb-1">
                          {aiResult.explanation.summary}
                        </div>
                        <div className="text-gray-300">
                          Edge:{" "}
                          <span className="font-semibold">
                            {aiResult.edge.edgePercent}%
                          </span>{" "}
                          • Confidence:{" "}
                          <span className="font-semibold capitalize">
                            {aiResult.edge.confidence}
                          </span>
                        </div>
                      </div>
                      <ul className="text-xs md:text-sm text-gray-300 space-y-1 mb-2">
                        {aiResult.explanation.bullets.map((line, i) => (
                          <li key={i}>• {line}</li>
                        ))}
                      </ul>
                      <p className="text-[11px] text-gray-500 mt-2">
                        In the real FootyIQ engine this panel go call live AWS
                        Lambda models on real-time odds and team data.
                      </p>
                    </>
                  ) : (
                    <p className="text-gray-400 text-sm">
                      Select a match from &quot;Today&apos;s Hot Picks&quot; to
                      run FootyIQ AI.
                    </p>
                  )}
                </>
              ) : (
                <>
                  <h3 className="text-base md:text-lg font-semibold mb-2">
                    Today&apos;s Fixtures
                  </h3>
                  <p className="text-xs md:text-sm text-gray-300 mb-3">
                    This section go later show live matches + odds from the
                    backend. For now, na static placeholder matches.
                  </p>
                  <ul className="space-y-2 text-xs md:text-sm text-gray-300">
                    {MATCHES_TODAY.map((m) => (
                      <li key={m.id}>
                        {getClubName(m.homeClubId)}{" "}
                        <span className="text-gray-500">vs</span>{" "}
                        {getClubName(m.awayClubId)}{" "}
                        <span className="text-[10px] text-emerald-300 ml-1">
                          {getLeagueName(m.leagueId)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>

            {/* RIGHT: Hot Picks / sidebar */}
            <aside className="space-y-4">
              <div className="rounded-2xl bg-white/5 border border-white/10 p-4 shadow-lg shadow-emerald-500/10">
                <h2 className="text-sm md:text-base font-semibold mb-3">
                  Today&apos;s Hot Picks
                </h2>
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {MATCHES_TODAY.map((match) => {
                    const leagueName = getLeagueName(match.leagueId);
                    const isActive = selectedMatchId === match.id;
                    return (
                      <button
                        key={match.id}
                        onClick={() => {
                          setSelectedMatchId(match.id);
                          setActiveView("predict");
                        }}
                        className={`min-w-[210px] text-left rounded-2xl border p-3 transition bg-white/5 hover:bg-white/10 ${
                          isActive
                            ? "border-emerald-400 shadow-emerald-500/30"
                            : "border-white/10"
                        }`}
                      >
                        <span className="text-[11px] text-gray-400">
                          {leagueName}
                        </span>
                        <p className="font-semibold text-sm mt-1">
                          {getClubName(match.homeClubId)}{" "}
                          <span className="text-gray-400">vs</span>{" "}
                          {getClubName(match.awayClubId)}
                        </p>
                        <p className="text-[11px] text-emerald-300 mt-1">
                          View AI predictions →
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="rounded-2xl bg-white/5 border border-emerald-500/40 p-4 text-xs md:text-sm text-gray-300 shadow-lg shadow-emerald-500/20">
                <h3 className="text-sm font-semibold mb-1 text-emerald-300">
                  Built for serious punters
                </h3>
                <p>
                  This demo shows how a DevSecOps/cloud engineer fit design,
                  version, and deploy AI football models as a SaaS product on
                  AWS.
                </p>
              </div>
            </aside>
          </div>
        </section>
      </main>
    </div>
  );
}

