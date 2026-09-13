"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { name: "Phishing", value: 40 },
  { name: "Voice fraud", value: 25 },
  { name: "Financial scam", value: 35 },
];

const COLORS = ["#22d3ee", "#38bdf8", "#f43f5e"];

const stats = [
  { title: "Threats analyzed", value: "12,847" },
  { title: "Scams prevented", value: "3,291" },
  { title: "AI accuracy", value: "98.2%" },
  { title: "Voice calls flagged", value: "512" },
];

const insights = [
  "Urgency manipulation detected in 68% of phishing attacks.",
  "AI-generated voice scams increased by 41% this month.",
  "Fake financial websites remain the highest cyber threat category.",
  "Behavioral analysis found emotional manipulation patterns in suspicious messages.",
];

export default function Dashboard() {
  return (
    <section id="dashboard" className="border-b border-neutral-800 px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-2 font-mono text-sm uppercase tracking-widest text-neutral-400">
          Threat intelligence dashboard
        </h2>
        <p className="mb-8 max-w-xl text-sm text-neutral-500">
          Aggregate numbers across everything scanned on this instance.
        </p>

        <div className="mb-10 grid grid-cols-2 gap-px overflow-hidden border border-neutral-800 bg-neutral-800 sm:grid-cols-4">
          {stats.map((item) => (
            <div key={item.title} className="bg-[#0a0a0b] p-5">
              <p className="mb-2 text-xs text-neutral-500">{item.title}</p>
              <h3 className="font-mono text-2xl font-bold text-neutral-50">
                {item.value}
              </h3>
            </div>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="border border-neutral-800 bg-neutral-950/60 p-6">
            <h3 className="mb-6 font-mono text-xs uppercase tracking-widest text-neutral-400">
              Threat distribution
            </h3>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                    label
                  >
                    {data.map((entry, index) => (
                      <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: "#0a0a0b",
                      border: "1px solid #262626",
                      fontSize: 12,
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="border border-neutral-800 bg-neutral-950/60 p-6">
            <h3 className="mb-4 font-mono text-xs uppercase tracking-widest text-neutral-400">
              Insights
            </h3>
            <div className="divide-y divide-neutral-800">
              {insights.map((item) => (
                <p key={item} className="py-3 text-sm leading-relaxed text-neutral-400">
                  {item}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
