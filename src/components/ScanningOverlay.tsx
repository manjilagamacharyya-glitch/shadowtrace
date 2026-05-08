"use client";

import { motion } from "framer-motion";

export default function ScanningOverlay() {
  return (
    <div className="fixed inset-0 z-[999] bg-black/70 backdrop-blur-md flex items-center justify-center">
      <div className="relative flex flex-col items-center">

        {/* Radar Circle */}
        <div className="relative w-56 h-56 flex items-center justify-center">

          {/* Outer Glow */}
          <div className="absolute w-56 h-56 rounded-full border border-cyan-500/30 shadow-[0_0_60px_rgba(34,211,238,0.4)]" />

          {/* Rotating Scan */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: "linear",
            }}
            className="absolute w-56 h-56 rounded-full"
          >
            <div className="absolute left-1/2 top-1/2 w-[2px] h-28 bg-cyan-400 origin-bottom -translate-x-1/2 -translate-y-full shadow-[0_0_20px_rgba(34,211,238,0.9)]" />
          </motion.div>

          {/* Inner Pulse */}
          <motion.div
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              repeat: Infinity,
              duration: 2,
            }}
            className="w-24 h-24 rounded-full bg-cyan-400/20 border border-cyan-400"
          />
        </div>

        {/* AI Text */}
        <motion.h2
          initial={{ opacity: 0.5 }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
          }}
          className="mt-10 text-3xl font-bold text-cyan-400"
        >
          AI Neural Engine Processing...
        </motion.h2>

        <p className="text-gray-400 mt-4 text-lg">
          Analyzing behavioral threat patterns
        </p>

        {/* Scanning Lines */}
        <div className="mt-10 space-y-3 w-96">
          <motion.div
            animate={{ x: [-100, 100, -100] }}
            transition={{
              repeat: Infinity,
              duration: 2,
            }}
            className="h-[2px] bg-cyan-400/70"
          />

          <motion.div
            animate={{ x: [100, -100, 100] }}
            transition={{
              repeat: Infinity,
              duration: 2.5,
            }}
            className="h-[2px] bg-cyan-400/40"
          />

          <motion.div
            animate={{ x: [-120, 120, -120] }}
            transition={{
              repeat: Infinity,
              duration: 3,
            }}
            className="h-[2px] bg-cyan-400/30"
          />
        </div>
      </div>
    </div>
  );
}