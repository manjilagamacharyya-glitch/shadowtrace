import * as https from "https";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const text = body.text;
    const type = body.type;

    if (!process.env.GEMINI_API_KEY) {
      return Response.json({
        result: "Missing Gemini API Key.",
      });
    }

    let prompt = "";

    // Threat Scanner
    if (type === "threat") {
      prompt = `
Analyze this suspicious message.

Message:
"${text}"

Return EXACTLY in this format:

Threat Level:
Scam Type:
Manipulation Technique:
Why It Is Dangerous:
Risk Score: (number between 0 and 100)
`;
    }

    // Email Detector
    if (type === "email") {
      prompt = `
Analyze this email for phishing risk.

Email:
"${text}"

Return EXACTLY in this format:

Threat Level:
Email Scam Type:
Detected Red Flags:
Why It Is Dangerous:
Risk Score: (number between 0 and 100)
`;
    }

    // Voice Fraud Detector
    if (type === "voice") {
      prompt = `
Analyze this voice transcript for AI voice scam risk.

Transcript:
"${text}"

Return EXACTLY in this format:

Threat Level:
Voice Scam Type:
Emotional Manipulation Detected:
Why It Is Dangerous:
Risk Score: (number between 0 and 100)
`;
    }

    const postData = JSON.stringify({
      contents: [
        {
          parts: [{ text: prompt }],
        },
      ],
    });

    const options = {
      hostname: "generativelanguage.googleapis.com",
      port: 443,
      path: `/v1beta/models/gemini-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(postData),
      },
      family: 4,
    };

    const data = await new Promise<any>((resolve, reject) => {
      const request = https.request(options, (res) => {
        let rawData = "";

        res.on("data", (chunk) => {
          rawData += chunk;
        });

        res.on("end", () => {
          try {
            resolve(JSON.parse(rawData));
          } catch (e) {
            reject(e);
          }
        });
      });

      request.on("error", (e) => {
        reject(e);
      });

      request.write(postData);
      request.end();
    });

    const output =
      data?.candidates?.[0]?.content?.parts?.[0]?.text;

    return Response.json({
      result: output || "AI analysis failed.",
    });
  } catch (error) {
    console.error(error);

    return Response.json({
      result: "AI analysis failed.",
    });
  }
}