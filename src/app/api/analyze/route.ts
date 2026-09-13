import { GoogleGenerativeAI } from "@google/generative-ai";

export const maxDuration = 60;

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const text = body.text;
    const type = body.type;

    if (!process.env.GEMINI_API_KEY) {
      return Response.json(
        { result: "Server is missing GEMINI_API_KEY. Set it in your environment and redeploy." },
        { status: 500 }
      );
    }

    if (!text || !text.trim()) {
      return Response.json({ result: "No message provided." }, { status: 400 });
    }

    let prompt = "";

    if (type === "email") {
      prompt = `
You are a cybersecurity phishing detection AI.

Analyze this suspicious email carefully.

EMAIL:
"${text}"

Return ONLY in this format:

Threat Level:
Email Scam Type:
Detected Red Flags:
Why It Is Dangerous:
Risk Score: (a number from 0 to 100, no slash, no percent sign)
`;
    } else if (type === "voice") {
      prompt = `
You are an AI Voice Fraud Detection System.

Analyze this suspicious voice call transcript.

TRANSCRIPT:
"${text}"

Return ONLY in this format:

Threat Level:
Voice Scam Type:
Emotional Manipulation Detected:
Why It Is Dangerous:
Risk Score: (a number from 0 to 100, no slash, no percent sign)
`;
    } else {
      prompt = `
Analyze this suspicious message.

Message:
"${text}"

Return EXACTLY in this format:

Threat Level:
Scam Type:
Manipulation Technique:
Why It Is Dangerous:
Risk Score: (a number from 0 to 100, no slash, no percent sign)
`;
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const output = response.text();

    if (!output) {
      return Response.json(
        { result: "AI analysis returned an empty response. Try again." },
        { status: 502 }
      );
    }

    return Response.json({ result: output });
  } catch (error) {
    console.error("Threat scan failed:", error);

    const message =
      error instanceof Error ? error.message : "Unknown error while contacting the AI model.";

    return Response.json(
      { result: `AI analysis failed: ${message}` },
      { status: 500 }
    );
  }
}
