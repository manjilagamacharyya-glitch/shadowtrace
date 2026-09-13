"use client";

import { useState } from "react";
import { parseRiskScore } from "@/lib/parseRiskScore";

const MAX_AUDIO_BYTES = 4 * 1024 * 1024; // ~4MB, safely under Vercel's request body limit

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      // strip the "data:audio/mpeg;base64," prefix
      resolve(result.split(",")[1] ?? "");
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function VoiceScanner() {
  const [transcript, setTranscript] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [riskScore, setRiskScore] = useState(0);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files?.[0];
    setFileError("");
    if (!selected) {
      setFile(null);
      return;
    }
    if (selected.size > MAX_AUDIO_BYTES) {
      setFileError(
        `That file is ${(selected.size / (1024 * 1024)).toFixed(1)}MB — please use a clip under 4MB (roughly 1–2 minutes).`
      );
      setFile(null);
      e.target.value = "";
      return;
    }
    setFile(selected);
  }

  async function analyzeVoice() {
    if (!file && !transcript.trim()) return;

    setLoading(true);
    setResult("");

    try {
      const payload: {
        transcript: string;
        audioBase64?: string;
        mimeType?: string;
      } = { transcript };

      if (file) {
        payload.audioBase64 = await fileToBase64(file);
        payload.mimeType = file.type || "audio/mpeg";
      }

      const res = await fetch("/api/analyze-voice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      const output = data.result || "No response";
      setResult(output);

      const extractedScore = parseRiskScore(output);
      setRiskScore(extractedScore);
    } catch (error) {
      console.error(error);
      setResult("Voice analysis failed. Try again in a moment.");
      setRiskScore(0);
    }

    setLoading(false);
  }

  return (
    <section id="voice-detector" className="border-b border-neutral-800 px-6 py-16">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-2 font-mono text-sm uppercase tracking-widest text-neutral-400">
          AI voice fraud detector
        </h2>
        <p className="mb-8 max-w-xl text-sm text-neutral-500">
          Upload an audio clip and Gemini listens to it directly — tone, pacing, and
          content — no manual transcription needed. You can also paste a transcript
          instead, or alongside it for extra context.
        </p>

        <label className="mb-2 block font-mono text-xs uppercase tracking-widest text-neutral-500">
          Audio file (recommended)
        </label>
        <input
          type="file"
          accept="audio/*"
          onChange={handleFileChange}
          className="mb-2 block w-full text-sm text-neutral-400 file:mr-4 file:rounded-md file:border file:border-neutral-700 file:bg-neutral-900 file:px-3 file:py-1.5 file:text-xs file:text-neutral-300 file:transition hover:file:bg-neutral-800"
        />
        {file && (
          <p className="mb-4 font-mono text-xs text-emerald-400">
            attached: {file.name} ({(file.size / (1024 * 1024)).toFixed(2)}MB) — will be analyzed directly
          </p>
        )}
        {fileError && (
          <p className="mb-4 font-mono text-xs text-rose-400">{fileError}</p>
        )}

        <textarea
          value={transcript}
          onChange={(e) => setTranscript(e.target.value)}
          placeholder="Optional: paste a transcript for extra context, or use this instead of an audio file..."
          rows={5}
          className="mt-2 w-full resize-none rounded-md border border-neutral-800 bg-neutral-950 p-4 text-sm text-neutral-200 placeholder:text-neutral-600 focus:border-cyan-500/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/30"
        />

        <div className="mt-4 flex items-center gap-3">
          <button
            onClick={analyzeVoice}
            disabled={loading || (!file && !transcript.trim())}
            className="rounded-md border border-cyan-500/40 bg-cyan-500/5 px-5 py-2.5 text-sm font-medium text-cyan-400 transition hover:bg-cyan-500/15 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {loading ? "Analyzing..." : "Analyze voice"}
          </button>
          {loading && (
            <span className="flex items-center gap-2 font-mono text-xs text-neutral-500">
              <span className="h-2.5 w-2.5 animate-spin rounded-full border-2 border-neutral-700 border-t-cyan-400" />
              {file ? "listening to audio" : "running analysis"}
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
