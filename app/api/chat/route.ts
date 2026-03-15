import { GoogleGenerativeAI } from '@google/generative-ai';

// 1. Fail fast if the API key is missing
if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
  throw new Error("Missing GOOGLE_GENERATIVE_AI_API_KEY environment variable");
}

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY);

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // 2. Map your messages to the official Gemini 'user' and 'model' roles
    const contents = messages.map((m: any) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }]
    }));

    // 3. Define the system instruction cleanly at the model level
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-2.5-flash',
      systemInstruction: `You are LongevAI, a friendly health assistant. Your goal is to extract info on 5 habits: Sleeping, Exercise, Smoking, Drinking, Screentime.
      Keep it conversational and empathetic. Ask about 1 or 2 things at a time.
      CRITICAL: If you have gathered info on ALL 5 habits, you MUST end your response with exactly: "CALCULATING_RESULTS".`
    });

    // 4. Pass the correctly structured contents array directly
    const result = await model.generateContent({ contents });
    const responseText = result.response.text();

    return new Response(JSON.stringify({ text: responseText }), {
      headers: { 'Content-Type': 'application/json' },
    });
    
  } catch (error) {
    console.error("Gemini API Error:", error);
    return new Response(JSON.stringify({ text: "Sorry, I encountered an error." }), { status: 500 });
  }
}