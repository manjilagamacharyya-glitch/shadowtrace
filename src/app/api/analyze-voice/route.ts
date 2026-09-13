import { GoogleGenerativeAI } from "@google/generative-ai";

export const maxDuration = 60;

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

type Part = { text: string } | { inlineData: { data: string; mimeType: string } };

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const transcript: string | undefined = body.transcript;
    const audioBase64: string | undefined = body.audioBase64;
    const mimeType: string | undefined = body.mimeType;

    if (!process.env.GEMINI_API_KEY) {
      return Response.json(
        { result: "Server is missing GEMINI_API_KEY. Set it in your environment and redeploy." },
        { status: 500 }
      );
    }

    const hasTranscript = Boolean(transcript && transcript.trim());
    const hasAudio = Boolean(audioBase64 && mimeType);

    if (!hasTranscript && !hasAudio) {
      return Response.json(
        { result: "No audio or transcript provided." },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const instructions = `
You are an AI Voice Fraud Detection System.

${hasAudio ? "Listen to the attached audio recording" : "Read the transcript below"} of a phone
call and analyze it for signs of a scam or social-engineering attempt: impersonation,
manufactured urgency, emotional manipulation, requests for money, OTPs, or personal
information${hasAudio ? ", and anything about the voice itself (tone, pacing, artifacts) that suggests it could be AI-generated or cloned" : ""}.

Return ONLY in this format, with no extra commentary before or after:

Threat Level:
Voice Scam Type:
Emotional Manipulation Detected:
${hasAudio ? "Voice Authenticity Notes:\n" : ""}Why It Is Dangerous:
Risk Score: (a number from 0 to 100 only, no slash, no percent sign, no words)
`;

    const parts: Part[] = [{ text: instructions }];

    if (hasAudio && audioBase64 && mimeType) {
      parts.push({ inlineData: { data: audioBase64, mimeType } });
    }

    if (hasTranscript && transcript) {
      parts.push({ text: `\nTranscript:\n"${transcript}"` });
    }

    const result = await model.generateContent(parts);
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
    console.error("Voice analysis failed:", error);
    const message =
      error instanceof Error ? error.message : "Unknown error while contacting the AI model.";
    return Response.json(
      { result: `Voice analysis failed: ${message}` },
      { status: 500 }
    );
  }
}
