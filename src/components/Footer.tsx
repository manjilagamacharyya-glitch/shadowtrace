export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 mt-32">

      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid md:grid-cols-3 gap-12">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_15px_#22d3ee]" />

              <h1 className="text-3xl font-bold text-white">
                ShadowTrace
              </h1>
            </div>

            <p className="text-gray-400 leading-relaxed">
              AI-powered psychological threat intelligence platform
              focused on scam detection, phishing analysis, and
              digital manipulation prevention.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-5">
              Navigation
            </h3>

            <div className="flex flex-col gap-3 text-gray-400">
              <a href="#home" className="hover:text-cyan-400 transition">
                Home
              </a>

              <a href="#features" className="hover:text-cyan-400 transition">
                Features
              </a>

              <a href="#scanner" className="hover:text-cyan-400 transition">
                Threat Scanner
              </a>

              <a href="#url-detector" className="hover:text-cyan-400 transition">
                URL Detector
              </a>
            </div>
          </div>

          {/* Tech */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-5">
              Technology
            </h3>

            <div className="flex flex-wrap gap-3">
              {[
                "Next.js",
                "TypeScript",
                "Tailwind",
                "Framer Motion",
                "AI Security",
              ].map((tech) => (
                <div
                  key={tech}
                  className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-cyan-300 text-sm"
                >
                  {tech}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">

          <p className="text-gray-500 text-sm">
            © 2026 ShadowTrace. Built for cybersecurity innovation.
          </p>

          <p className="text-gray-500 text-sm">
            AI Psychological Threat Intelligence Platform
          </p>
        </div>
      </div>
    </footer>
  );
}