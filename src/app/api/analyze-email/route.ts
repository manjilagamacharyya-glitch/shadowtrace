import { GoogleGenerativeAI } from "@google/generative-ai";

export const maxDuration = 60;

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = body.email;

    if (!process.env.GEMINI_API_KEY) {
      return Response.json(
        { result: "Server is missing GEMINI_API_KEY. Set it in your environment and redeploy." },
        { status: 500 }
      );
    }

    if (!email || !email.trim()) {
      return Response.json({ result: "No email content provided." }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
You are a cybersecurity phishing detection AI.

Analyze this suspicious email carefully.

EMAIL:
"${email}"

Return ONLY in this format, with no extra commentary before or after:

Threat Level:
Email Scam Type:
Detected Red Flags:
Why It Is Dangerous:
Risk Score: (a number from 0 to 100 only, no slash, no percent sign, no words)
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    if (!text) {
      return Response.json(
        { result: "AI analysis returned an empty response. Try again." },
        { status: 502 }
      );
    }

    return Response.json({ result: text });
  } catch (error) {
    console.error("Email analysis failed:", error);
    const message =
      error instanceof Error ? error.message : "Unknown error while contacting the AI model.";
    return Response.json(
      { result: `Email analysis failed: ${message}` },
      { status: 500 }
    );
  }
}
