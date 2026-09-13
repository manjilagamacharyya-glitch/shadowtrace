"use client";

import { useState } from "react";
import { parseRiskScore } from "@/lib/parseRiskScore";

function severity(score: number) {
  if (score >= 70) return { label: "critical", color: "text-rose-400 border-rose-500/40" };
  if (score >= 40) return { label: "moderate", color: "text-amber-400 border-amber-500/40" };
  return { label: "low", color: "text-emerald-400 border-emerald-500/40" };
}

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

      const extractedScore = parseRiskScore(data.result);
      setThreatScore(extractedScore);

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
      setResult("Analysis failed. Try again in a moment.");
      setThreatScore(0);
    } finally {
      setLoading(false);
    }
  };

  const current = severity(threatScore);

  return (
    <section id="scanner" className="border-b border-neutral-800 px-6 py-16">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-2 font-mono text-sm uppercase tracking-widest text-neutral-400">
          Threat scanner
        </h2>
        <p className="mb-8 max-w-xl text-sm text-neutral-500">
          Paste a suspicious message, DM, or text and get a risk score with a
          breakdown of what triggered it.
        </p>

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste a suspicious message here..."
          rows={6}
          className="w-full resize-none rounded-md border border-neutral-800 bg-neutral-950 p-4 text-sm text-neutral-200 placeholder:text-neutral-600 focus:border-cyan-500/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/30"
        />

        <div className="mt-4 flex items-center gap-3">
          <button
            onClick={analyzeThreat}
            disabled={loading || !input.trim()}
            className="rounded-md border border-cyan-500/40 bg-cyan-500/5 px-5 py-2.5 text-sm font-medium text-cyan-400 transition hover:bg-cyan-500/15 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {loading ? "Analyzing..." : "Analyze"}
          </button>
          {loading && (
            <span className="flex items-center gap-2 font-mono text-xs text-neutral-500">
              <span className="h-2.5 w-2.5 animate-spin rounded-full border-2 border-neutral-700 border-t-cyan-400" />
              running analysis
            </span>
          )}
        </div>

        {result && (
          <div className="mt-8 border-t border-neutral-800 pt-6">
            <h3 className="mb-3 font-mono text-xs uppercase tracking-widest text-neutral-400">
              Result
            </h3>
            <pre className="whitespace-pre-wrap rounded-md border border-neutral-800 bg-neutral-950 p-4 text-sm leading-relaxed text-neutral-300">
              {result}
            </pre>

            <div className="mt-6">
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-neutral-400">Threat probability</span>
                <span className={`font-mono font-bold ${current.color.split(" ")[0]}`}>
                  {threatScore}%
                </span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-neutral-800">
                <div
                  className="h-full rounded-full bg-cyan-400 transition-all duration-500"
                  style={{ width: `${threatScore}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {history.length > 0 && (
          <div className="mt-10">
            <h3 className="mb-4 border-b border-neutral-800 pb-3 font-mono text-sm uppercase tracking-widest text-neutral-400">
              Scan history
            </h3>

            <div className="space-y-3">
              {history.map((item, index) => {
                const s = severity(item.score);
                return (
                  <div
                    key={index}
                    className="border border-neutral-800/80 bg-neutral-950/60 p-4"
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <span
                        className={`border px-2 py-0.5 font-mono text-[11px] font-bold uppercase tracking-wide ${s.color}`}
                      >
                        {s.label}
                      </span>
                      <span className="font-mono text-xs text-neutral-500">
                        {item.time}
                      </span>
                    </div>
                    <p className="line-clamp-2 text-sm text-neutral-400">
                      {item.text}
                    </p>
                    <p className="mt-2 font-mono text-xs text-neutral-500">
                      score: <span className="text-neutral-300">{item.score}%</span>
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
