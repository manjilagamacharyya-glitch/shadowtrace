"use client";

import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="fixed top-0 left-0 w-full z-50 px-6 py-4"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between
      backdrop-blur-xl bg-white/5 border border-white/10
      rounded-2xl px-6 py-4 shadow-[0_0_30px_rgba(59,130,246,0.15)]">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_15px_#22d3ee]" />
          <h1 className="text-2xl font-bold tracking-tight text-white">
            ShadowTrace
          </h1>
        </div>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8 text-sm text-gray-300">
          <a href="#features" className="hover:text-cyan-400 transition">
            Features
          </a>

          <a href="#scanner" className="hover:text-cyan-400 transition">
            Threat Scanner
          </a>

          <a href="#url-detector" className="hover:text-cyan-400 transition">
            URL Detector
          </a>

          <a href="#home" className="hover:text-cyan-400 transition">
            Home
          </a>
        </div>

        {/* CTA Button */}
        <button className="bg-cyan-400/10 border border-cyan-400/30
        hover:bg-cyan-400/20 transition px-5 py-2 rounded-xl
        text-cyan-300 text-sm shadow-[0_0_20px_rgba(34,211,238,0.2)]">
          Analyze Threat
        </button>
      </div>
    </motion.nav>
  );
}