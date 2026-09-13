"use client";

import { useState } from "react";
import { parseRiskScore } from "@/lib/parseRiskScore";

export default function EmailScanner() {
  const [emailText, setEmailText] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [riskScore, setRiskScore] = useState(0);

  async function analyzeEmail() {
    if (!emailText.trim()) return;

    setLoading(true);
    setResult("");

    try {
      const res = await fetch("/api/analyze-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailText,
        }),
      });

      const data = await res.json();
      const output = data.result || "No response";
      setResult(output);

      const extractedScore = parseRiskScore(output);
      setRiskScore(extractedScore);
    } catch (error) {
      console.error(error);
      setResult("Failed to analyze email. Try again in a moment.");
      setRiskScore(0);
    }

    setLoading(false);
  }

  return (
    <section id="email-detector" className="border-b border-neutral-800 px-6 py-16">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-2 font-mono text-sm uppercase tracking-widest text-neutral-400">
          Phishing email detector
        </h2>
        <p className="mb-8 max-w-xl text-sm text-neutral-500">
          Paste the full email body, including sender line and links if
          visible, for the most accurate read.
        </p>

        <textarea
          value={emailText}
          onChange={(e) => setEmailText(e.target.value)}
          placeholder="Paste suspicious email here..."
          rows={7}
          className="w-full resize-none rounded-md border border-neutral-800 bg-neutral-950 p-4 text-sm text-neutral-200 placeholder:text-neutral-600 focus:border-cyan-500/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/30"
        />

        <div className="mt-4 flex items-center gap-3">
          <button
            onClick={analyzeEmail}
            disabled={loading || !emailText.trim()}
            className="rounded-md border border-cyan-500/40 bg-cyan-500/5 px-5 py-2.5 text-sm font-medium text-cyan-400 transition hover:bg-cyan-500/15 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {loading ? "Analyzing..." : "Analyze email"}
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
                <span className="font-mono font-bold text-cyan-400">
                  {riskScore}%
                </span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-neutral-800">
                <div
                  className="h-full rounded-full bg-cyan-400 transition-all duration-500"
                  style={{ width: `${riskScore}%` }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
