import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const transcript = body.transcript;

    if (!transcript) {
      return Response.json({
        result: "No voice transcript provided.",
      });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `
You are an AI Voice Fraud Detection System.

Analyze this suspicious voice call transcript.

TRANSCRIPT:
${transcript}

Return ONLY in this format:

Threat Level:
Voice Scam Type:
Emotional Manipulation Detected:
Why It Is Dangerous:
Risk Score:
`;

    const result = await model.generateContent(prompt);

    const response = await result.response;

    const text = response.text();

    console.log("VOICE RESPONSE:");
    console.log(text);

    return Response.json({
      result: text,
    });
  } catch (error) {
    console.error(error);

    return Response.json({
      result: "Voice analysis failed.",
    });
  }
}