"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import ScanningOverlay from "./ScanningOverlay";

export default function DeepfakeScanner() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [score, setScore] = useState(0);
  const [artifacts, setArtifacts] = useState<string[]>([]);

  const analyzeDeepfake = async () => {
    if (!file) return;

    setLoading(true);

    await new Promise((resolve) =>
      setTimeout(resolve, 3000)
    );

    const fakeScore = Math.floor(Math.random() * 40) + 55;

    setScore(fakeScore);

    if (fakeScore > 75) {
      setResult("High Deepfake Probability Detected");

      setArtifacts([
        "Lip Sync Inconsistency",
        "Synthetic Eye Reflection",
        "AI Facial Smoothing",
        "Frame Rendering Anomalies",
      ]);
    } else {
      setResult("Moderate Synthetic Media Risk");

      setArtifacts([
        "Minor Frame Artifacts",
        "Possible AI Enhancement",
      ]);
    }

    setLoading(false);
  };

  return (
    <section
      id="deepfake"
      className="relative py-32 px-6"
    >
      <div className="max-w-6xl mx-auto">

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl md:text-6xl font-bold text-center mb-8"
        >
          Deepfake Video{" "}
          <span className="text-cyan-400">
            Detection
          </span>
        </motion.h2>

        <p className="text-center text-gray-400 max-w-3xl mx-auto mb-20 text-xl">
          Detect AI-generated synthetic media,
          manipulated videos, facial inconsistencies,
          and suspicious rendering artifacts.
        </p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white/5 border border-white/10
          backdrop-blur-2xl rounded-[32px] p-10
          shadow-[0_0_60px_rgba(0,255,255,0.08)]"
        >

          <input
            type="file"
            accept="video/*,image/*"
            onChange={(e) => {
              if (e.target.files?.[0]) {
                setFile(e.target.files[0]);
              }
            }}
            className="text-white"
          />

          {file && (
            <p className="text-cyan-400 mt-4">
              Uploaded: {file.name}
            </p>
          )}

          <div className="mt-8">
            <button
              onClick={analyzeDeepfake}
              disabled={loading || !file}
              className="bg-cyan-400 text-black font-semibold
              px-10 py-5 rounded-2xl
              shadow-[0_0_40px_rgba(34,211,238,0.5)]
              hover:scale-105 transition-all duration-300
              disabled:opacity-50"
            >
              {loading
                ? "Analyzing Deepfake..."
                : "Analyze Media"}
            </button>
          </div>

          {loading && <ScanningOverlay />}

          {result && !loading && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-12"
            >

              <div
                className="p-6 rounded-2xl border
                border-cyan-400/30 bg-cyan-400/10
                text-cyan-300 text-2xl"
              >
                {result}
              </div>

              {/* Deepfake Meter */}
              <div className="mt-10">
                <div className="flex justify-between mb-3 text-lg">
                  <span className="text-gray-300">
                    Deepfake Probability
                  </span>

                  <span className="text-red-400 font-bold">
                    {score}%
                  </span>
                </div>

                <div className="w-full h-5 rounded-full bg-white/10 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${score}%` }}
                    transition={{ duration: 1 }}
                    className="h-full bg-gradient-to-r
                    from-cyan-400 via-yellow-400 to-red-500"
                  />
                </div>
              </div>

              {/* AI Artifacts */}
              <div className="mt-10">

                <h3 className="text-cyan-400 text-2xl font-semibold mb-6">
                  Detected AI Artifacts
                </h3>

                <div className="flex flex-wrap gap-4">
                  {artifacts.map((item, index) => (
                    <span
                      key={index}
                      className="px-5 py-2 rounded-full
                      bg-cyan-400/10 border border-cyan-400/30
                      text-cyan-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>

              </div>

            </motion.div>
          )}

        </motion.div>
      </div>
    </section>
  );
}