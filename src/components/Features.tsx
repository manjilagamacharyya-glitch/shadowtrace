"use client";

import { motion } from "framer-motion";

const features = [
  {
    title: "AI Scam Detection",
    desc: "Detect phishing, fake investment schemes, and scam patterns instantly.",
  },
  {
    title: "Voice Fraud Analysis",
    desc: "Identify AI-generated voice manipulation and emotional pressure tactics.",
  },
  {
    title: "Threat Intelligence",
    desc: "Analyze psychological manipulation patterns in digital communication.",
  },
  {
    title: "Real-Time Protection",
    desc: "Instant alerts and live risk analysis while browsing or chatting.",
  },
];

export default function Features() {
  return (
    <section 
    id="features"
    className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl md:text-6xl font-bold text-center mb-20"
        >
          Advanced{" "}
          <span className="text-cyan-400">Threat Intelligence</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl hover:border-cyan-400/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,211,238,0.2)]"
            >
              <h3 className="text-2xl font-semibold mb-4 text-cyan-400">
                {feature.title}
              </h3>

              <p className="text-gray-400 leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}