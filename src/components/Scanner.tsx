"use client";

import { useState } from "react";
import ScanningOverlay from "./ScanningOverlay";

export default function Scanner() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [threatScore, setThreatScore] = useState(0);

  const [history, setHistory] = useState<
    {
      text: string;
      score: number;
      time: string;
    }[]
  >([]);

  const analyzeThreat = async () => {
    if (!input.trim()) return;

    setLoading(true);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: input,
          type: "threat",
        }),
      });

      const data = await response.json();

      setResult(data.result);

      // Extract Risk Score
      const scoreMatch = data.result.match(
        /Risk Score:\s*(\d+)/i
      );

      let extractedScore = scoreMatch
        ? parseInt(scoreMatch[1])
        : 0;

      // Convert 10-point scale to percentage if needed
      if (extractedScore <= 10) {
        extractedScore = extractedScore * 10;
      }

      setThreatScore(extractedScore);

      // Save scan history
      setHistory((prev) => [
        {
          text: input,
          score: extractedScore,
          time: new Date().toLocaleTimeString(),
        },
        ...prev,
      ]);
    } catch (error) {
      console.error(error);

      setResult("AI analysis failed.");
      setThreatScore(0);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <ScanningOverlay />}

      <section
        id="scanner"
        className="w-full min-h-screen bg-black text-white px-6 py-24"
      >
        <div className="max-w-6xl mx-auto">
          {/* Heading */}
          <div className="text-center mb-16">
            <h1 className="text-6xl md:text-7xl font-bold mb-6">
              Live Threat{" "}
              <span className="text-cyan-400">Scanner</span>
            </h1>

            <p className="text-gray-400 text-xl max-w-3xl mx-auto">
              ShadowTrace analyzes suspicious messages,
              emotional manipulation, phishing attempts,
              and scam probability in real time.
            </p>
          </div>

          {/* Scanner Box */}
          <div className="bg-[#050505] border border-cyan-500/10 rounded-[40px] p-10 shadow-[0_0_60px_rgba(0,255,255,0.08)]">
            {/* Textarea */}
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste suspicious message here..."
              className="w-full h-[250px] bg-black border border-white/10 rounded-3xl p-8 text-3xl text-white outline-none resize-none"
            />

            {/* Button */}
            <button
              onClick={analyzeThreat}
              className="mt-10 px-14 py-6 bg-cyan-400 text-black font-bold text-3xl rounded-3xl shadow-[0_0_40px_rgba(0,255,255,0.5)] hover:scale-105 transition-all duration-300"
            >
              Analyze Threat
            </button>

            {/* Result */}
            {result && (
              <div className="mt-14 bg-cyan-500/10 border border-cyan-400/30 rounded-3xl p-10">
                <h2 className="text-5xl font-bold text-cyan-400 mb-8">
                  AI Analysis Result
                </h2>

                <pre className="whitespace-pre-wrap text-2xl leading-loose text-white">
                  {result}
                </pre>
              </div>
            )}

            {/* Threat Meter */}
            <div className="mt-14">
              <div className="flex justify-between items-center mb-5">
                <h3 className="text-3xl">
                  Threat Probability
                </h3>

                <span className="text-red-400 text-3xl font-bold">
                  {threatScore}%
                </span>
              </div>

              <div className="w-full h-7 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-400 via-yellow-400 to-red-500 transition-all duration-700"
                  style={{
                    width: `${threatScore}%`,
                  }}
                />
              </div>
            </div>

            {/* History */}
            <div className="mt-20">
              <h2 className="text-6xl font-bold text-cyan-400 mb-10">
                Threat History
              </h2>

              <div className="space-y-8">
                {history.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white/5 border border-white/10 rounded-3xl p-8"
                  >
                    <div className="flex justify-between items-center mb-5">
                      <span className="px-5 py-2 rounded-full bg-cyan-400/20 text-cyan-300 text-xl font-semibold">
                        {item.score >= 70
                          ? "Critical Threat"
                          : item.score >= 40
                          ? "Moderate Threat"
                          : "Low Threat"}
                      </span>

                      <span className="text-gray-500 text-xl">
                        {item.time}
                      </span>
                    </div>

                    <p className="text-2xl text-white mb-6">
                      {item.text}
                    </p>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-xl">
                        Threat Probability
                      </span>

                      <span className="text-cyan-400 text-3xl font-bold">
                        {item.score}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}