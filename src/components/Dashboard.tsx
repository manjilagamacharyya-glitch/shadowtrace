"use client";

import { motion } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const data = [
  { name: "Phishing", value: 35 },
  { name: "Voice Fraud", value: 20 },
  { name: "Deepfake", value: 25 },
  { name: "Financial Scam", value: 20 },
];

const COLORS = [
  "#22d3ee",
  "#38bdf8",
  "#818cf8",
  "#f43f5e",
];

export default function Dashboard() {
  return (
    <section
      id="dashboard"
      className="relative py-32 px-6"
    >
      <div className="max-w-7xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >

          <h2 className="text-5xl md:text-6xl font-bold mb-8">
            AI Threat{" "}
            <span className="text-cyan-400">
              Intelligence Dashboard
            </span>
          </h2>

          <p className="text-gray-400 text-xl max-w-3xl mx-auto">
            Real-time cybersecurity intelligence powered by
            behavioral AI analysis and advanced threat detection.
          </p>
        </motion.div>

        {/* Top Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">

          {[
            {
              title: "Threats Analyzed",
              value: "12,847",
            },
            {
              title: "Scams Prevented",
              value: "3,291",
            },
            {
              title: "AI Accuracy",
              value: "98.2%",
            },
            {
              title: "Deepfakes Flagged",
              value: "412",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.1,
              }}
              className="bg-white/5 border border-white/10
              backdrop-blur-xl rounded-3xl p-8
              shadow-[0_0_40px_rgba(34,211,238,0.08)]"
            >

              <p className="text-gray-400 mb-4">
                {item.title}
              </p>

              <h3 className="text-4xl font-bold text-cyan-400">
                {item.value}
              </h3>

            </motion.div>
          ))}

        </div>

        {/* Analytics */}
        <div className="grid lg:grid-cols-2 gap-10">

          {/* Pie Chart */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="bg-white/5 border border-white/10
            rounded-3xl p-8 backdrop-blur-xl"
          >

            <h3 className="text-3xl font-bold text-white mb-8">
              Threat Distribution
            </h3>

            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>

                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    dataKey="value"
                    label
                  >
                    {data.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>

                  <Tooltip />

                </PieChart>
              </ResponsiveContainer>
            </div>

          </motion.div>

          {/* AI Insights */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="bg-white/5 border border-white/10
            rounded-3xl p-8 backdrop-blur-xl"
          >

            <h3 className="text-3xl font-bold text-white mb-8">
              AI Insights
            </h3>

            <div className="space-y-6">

              {[
                "Urgency manipulation detected in 68% of phishing attacks.",
                "AI-generated voice scams increased by 41% this month.",
                "Fake financial websites remain the highest cyber threat category.",
                "Behavioral AI detected emotional manipulation patterns in suspicious messages.",
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: index * 0.1,
                  }}
                  className="bg-cyan-400/5 border border-cyan-400/10
                  rounded-2xl p-5 text-gray-300"
                >
                  {item}
                </motion.div>
              ))}

            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}