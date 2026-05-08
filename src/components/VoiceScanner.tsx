"use client";

import { useState } from "react";

export default function VoiceScanner() {
  const [transcript, setTranscript] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [riskScore, setRiskScore] = useState(0);

  async function analyzeVoice() {
    if (!transcript.trim()) return;

    setLoading(true);
    setResult("");

    try {
      const res = await fetch("/api/analyze-voice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          transcript: transcript,
        }),
      });

      const data = await res.json();

      const output = data.result || "No response";

      setResult(output);

      // Extract risk score
      const scoreMatch = output.match(/Risk Score:\s*(\d+)/i);

      let extractedScore = scoreMatch
        ? parseInt(scoreMatch[1])
        : 0;

      // Convert 5/5 style scoring into percentage
      if (extractedScore <= 5) {
        extractedScore = extractedScore * 20;
      }

      // Limit max score to 100
      if (extractedScore > 100) {
        extractedScore = 100;
      }

      setRiskScore(extractedScore);
    } catch (error) {
      console.error(error);

      setResult("Voice analysis failed.");
      setRiskScore(0);
    }

    setLoading(false);
  }

  return (
    <section className="w-full py-24 px-6 bg-black text-white">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <h1 className="text-6xl font-bold mb-12">
          AI Voice Fraud{" "}
          <span className="text-cyan-400">Detector</span>
        </h1>

        {/* Upload Section */}
        <div className="mb-10">
          <label className="text-cyan-400 text-2xl font-semibold block mb-4">
            Upload Suspicious Audio File
          </label>

          <input
            type="file"
            accept=".mp3,.wav,.m4a"
            className="block w-full text-xl bg-black border border-cyan-900 rounded-2xl p-4"
          />
        </div>

        {/* Transcript Input */}
        <textarea
          value={transcript}
          onChange={(e) => setTranscript(e.target.value)}
          placeholder="Paste suspicious voice call transcript here..."
          className="w-full h-[260px] bg-black border border-cyan-900 rounded-3xl p-10 text-3xl outline-none resize-none"
        />

        {/* Analyze Button */}
        <button
          onClick={analyzeVoice}
          disabled={loading}
          className="mt-10 px-16 py-6 rounded-2xl bg-cyan-400 text-black text-3xl font-bold shadow-[0_0_40px_rgba(34,211,238,0.7)] hover:scale-105 transition"
        >
          {loading ? "Analyzing..." : "Analyze Voice"}
        </button>

        {/* Result */}
        {result && (
          <>
            <div className="mt-14 border border-cyan-800 bg-cyan-950/30 rounded-3xl p-10">
              <h2 className="text-5xl font-bold text-cyan-400 mb-8">
                AI Analysis Result
              </h2>

              <pre className="whitespace-pre-wrap text-2xl leading-loose">
                {result}
              </pre>
            </div>

            {/* Threat Meter */}
            <div className="mt-12">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-4xl">
                  Threat Probability
                </h3>

                <span className="text-red-400 text-4xl font-bold">
                  {riskScore}%
                </span>
              </div>

              <div className="w-full h-8 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full transition-all duration-700"
                  style={{
                    width: `${riskScore}%`,
                    background:
                      "linear-gradient(to right, #22d3ee, #facc15, #ef4444)",
                  }}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}