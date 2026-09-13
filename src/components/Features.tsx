const features = [
  {
    tag: "scam",
    title: "Scam & phishing detection",
    desc: "Flags fake investment pitches, credential-harvesting attempts, and known scam phrasing in text.",
  },
  {
    tag: "voice",
    title: "Voice fraud analysis",
    desc: "Reads call transcripts for AI-impersonation cues and forced-urgency, family-emergency style pressure.",
  },
  {
    tag: "pattern",
    title: "Manipulation patterns",
    desc: "Looks for the psychological levers scams rely on — urgency, authority, isolation, guilt.",
  },
  {
    tag: "live",
    title: "Real-time scoring",
    desc: "Every scan returns a threat probability instantly, so you get an answer, not just a warning.",
  },
];

export default function Features() {
  return (
    <section id="features" className="border-b border-neutral-800 px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-8 font-mono text-sm uppercase tracking-widest text-neutral-400">
          What it looks for
        </h2>

        <div className="grid gap-px overflow-hidden rounded-md border border-neutral-800 bg-neutral-800 sm:grid-cols-2">
          {features.map((feature) => (
            <div
              key={feature.tag}
              className="bg-[#0a0a0b] p-6 transition hover:bg-neutral-950"
            >
              <span className="font-mono text-[11px] uppercase tracking-wide text-cyan-500">
                {feature.tag}
              </span>
              <h3 className="mt-2 text-lg font-semibold text-neutral-100">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-400">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
