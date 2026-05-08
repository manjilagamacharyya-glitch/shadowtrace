import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const email = body.email;

    if (!email) {
      return Response.json({
        result: "No email content provided.",
      });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `
You are a cybersecurity phishing detection AI.

Analyze this suspicious email carefully.

EMAIL:
${email}

Return ONLY in this format:

Threat Level:
Email Scam Type:
Detected Red Flags:
Why It Is Dangerous:
Risk Score:
`;

    const result = await model.generateContent(prompt);

    const response = await result.response;

    const text = response.text();

    console.log("EMAIL RESPONSE:");
    console.log(text);

    return Response.json({
      result: text,
    });
  } catch (error) {
    console.error(error);

    return Response.json({
      result: "Email analysis failed.",
    });
  }
}