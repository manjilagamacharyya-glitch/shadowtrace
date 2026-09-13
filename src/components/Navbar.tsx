"use client";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-neutral-800/80 bg-[#0a0a0b]/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-md border border-cyan-500/30 bg-cyan-500/10 font-mono text-sm font-bold text-cyan-400">
            ST
          </div>
          <span className="text-base font-semibold tracking-tight text-neutral-100">
            ShadowTrace
          </span>
          <span className="rounded border border-neutral-800 px-2 py-0.5 font-mono text-[11px] text-neutral-500">
            beta
          </span>
        </div>

        <nav className="hidden items-center gap-7 font-mono text-xs uppercase tracking-widest text-neutral-400 md:flex">
          <a href="#home" className="transition hover:text-cyan-400">
            Home
          </a>
          <a href="#features" className="transition hover:text-cyan-400">
            Features
          </a>
          <a href="#scanner" className="transition hover:text-cyan-400">
            Threat Scanner
          </a>
          <a href="#email-detector" className="transition hover:text-cyan-400">
            Email Detector
          </a>
        </nav>

        <a
          href="#scanner"
          className="rounded-md border border-cyan-500/40 bg-cyan-500/5 px-4 py-2 font-mono text-xs text-cyan-400 transition hover:bg-cyan-500/15"
        >
          Analyze
        </a>
      </div>
    </header>
  );
}
