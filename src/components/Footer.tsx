export default function Footer() {
  return (
    <footer className="px-6 py-8">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 font-mono text-xs text-neutral-600 sm:flex-row">
        <p>ShadowTrace — built for cybersecurity coursework, 2026.</p>
        <div className="flex gap-4">
          <a href="#home" className="transition hover:text-cyan-400">
            home
          </a>
          <a href="#features" className="transition hover:text-cyan-400">
            features
          </a>
          <a href="#scanner" className="transition hover:text-cyan-400">
            scanner
          </a>
        </div>
      </div>
    </footer>
  );
}
