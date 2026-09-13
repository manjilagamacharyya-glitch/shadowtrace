export default function Hero() {
  return (
    <section
      id="home"
      className="border-b border-neutral-800 px-6 pb-14 pt-16"
    >
      <div className="mx-auto max-w-5xl animate-fade-in-up">
        <p className="mb-3 font-mono text-xs uppercase tracking-widest text-cyan-500">
          Text · email · voice · media analysis
        </p>

        <h1 className="max-w-2xl text-4xl font-bold leading-[1.15] tracking-tight text-neutral-50 sm:text-5xl">
          Catch the manipulation before it works on you.
        </h1>

        <p className="mt-4 max-w-lg text-neutral-400">
          ShadowTrace reads messages, emails, and call transcripts for the
          scam patterns and pressure tactics people fall for — urgency,
          impersonation, fake authority — and scores the risk before you act.
        </p>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
          <a
            href="#scanner"
            className="rounded-md border border-cyan-500/40 bg-cyan-500/5 px-5 py-2.5 text-center text-sm font-medium text-cyan-400 transition hover:bg-cyan-500/15"
          >
            Analyze a message
          </a>
          <a
            href="#features"
            className="rounded-md border border-neutral-700 px-5 py-2.5 text-center text-sm text-neutral-400 transition hover:bg-neutral-800"
          >
            See what it detects
          </a>
        </div>

        <div className="mt-10 flex flex-wrap gap-x-10 gap-y-4 font-mono text-sm">
          <div>
            <span className="text-2xl font-bold text-neutral-50">98%</span>
            <span className="ml-1.5 text-neutral-500">detection accuracy</span>
          </div>
          <div>
            <span className="text-2xl font-bold text-cyan-400">12,847</span>
            <span className="ml-1.5 text-neutral-500">threats analyzed</span>
          </div>
          <div>
            <span className="text-2xl font-bold text-neutral-400">24/7</span>
            <span className="ml-1.5 text-neutral-500">live analysis</span>
          </div>
        </div>
      </div>
    </section>
  );
}
