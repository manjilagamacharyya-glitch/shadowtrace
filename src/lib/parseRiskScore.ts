/**
 * Extracts a 0-100 risk score from a Gemini text response.
 * Tolerates formats like "Risk Score: 85", "Risk Score: 85%",
 * "Risk Score: 85/100", "Risk Score: 8/10", or a bare number on its own line.
 */
export function parseRiskScore(output: string): number {
  if (!output) return 0;

  // "Risk Score: 85 / 100" or "Risk Score: 85/100"
  const outOf100 = output.match(/Risk Score:\s*(\d+)\s*\/\s*100/i);
  if (outOf100) {
    return clamp(parseInt(outOf100[1], 10));
  }

  // "Risk Score: 8/10" -> scale to 100
  const outOf10 = output.match(/Risk Score:\s*(\d+)\s*\/\s*10\b/i);
  if (outOf10) {
    return clamp(parseInt(outOf10[1], 10) * 10);
  }

  // "Risk Score: 85%" or "Risk Score: 85"
  const plain = output.match(/Risk Score:\s*(\d+)\s*%?/i);
  if (plain) {
    const n = parseInt(plain[1], 10);
    // A lone single-digit score (e.g. "Risk Score: 8") usually means a /10 scale.
    return clamp(n <= 10 ? n * 10 : n);
  }

  return 0;
}

function clamp(n: number): number {
  if (Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(100, n));
}
