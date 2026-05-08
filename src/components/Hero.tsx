"use client";

import { motion } from "framer-motion";
import Particles from "./Particles";

export default function Hero() {
  return (
    <section 
    id="home"
    className="relative pt-32 pb-20 flex items-center justify-center overflow-hidden bg-black pt-32">
      
        <Particles />

      {/* Background Glow */}
      <div className="absolute top-[-200px] left-[-100px] w-[500px] h-[500px] bg-cyan-500/20 blur-[120px] rounded-full" />

      <div className="absolute bottom-[-200px] right-[-100px] w-[500px] h-[500px] bg-purple-500/20 blur-[120px] rounded-full" />

      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:70px_70px]" />

      {/* Scanning Beam */}
<motion.div
  initial={{ y: "-100%" }}
  animate={{ y: "100%" }}
  transition={{
    repeat: Infinity,
    duration: 6,
    ease: "linear",
  }}
  className="absolute inset-0 pointer-events-none"
>
  <div className="w-full h-40 bg-cyan-400/10 blur-3xl" />
</motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center px-6">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="inline-flex items-center gap-2 border border-cyan-400/20
          bg-cyan-400/10 text-cyan-300 px-4 py-2 rounded-full
          backdrop-blur-md mb-8 shadow-[0_0_20px_rgba(34,211,238,0.2)]"
        >
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          AI Psychological Threat Intelligence
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-6xl md:text-8xl font-black tracking-tight
          leading-none mb-6"
        >
          Detect
          <span className="text-cyan-400 drop-shadow-[0_0_25px_rgba(34,211,238,0.8)]">
            {" "}Manipulation
          </span>
          <br />
          Before It Wins
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="text-lg md:text-xl text-gray-400 max-w-3xl
          mx-auto leading-relaxed mb-10"
        >
          ShadowTrace analyzes scams, phishing attempts, fake websites,
          emotional manipulation, AI voice fraud, and digital threats using
          advanced psychological intelligence.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5"
        >
          <button className="px-8 py-4 rounded-2xl bg-cyan-400
          text-black font-semibold text-lg hover:scale-105 transition
          shadow-[0_0_40px_rgba(34,211,238,0.5)]">
            Analyze Threat
          </button>

          <button className="px-8 py-4 rounded-2xl border border-white/10
          bg-white/5 backdrop-blur-md text-white font-semibold text-lg
          hover:bg-white/10 transition">
            Watch Demo
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20"
        >
          {[
            ["98%", "Scam Detection Accuracy"],
            ["24/7", "Real-Time Analysis"],
            ["12K+", "Threats Analyzed"],
            ["AI", "Psychological Intelligence"],
          ].map(([value, label]) => (
            <div
              key={label}
              className="border border-white/10 bg-white/5
              backdrop-blur-md rounded-2xl p-6"
            >
              <h3 className="text-3xl font-bold text-cyan-400 mb-2">
                {value}
              </h3>

              <p className="text-gray-400 text-sm">
                {label}
              </p>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}