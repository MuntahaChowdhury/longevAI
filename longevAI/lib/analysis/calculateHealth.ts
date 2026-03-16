import { callGemini } from "../ai/gemini.client";
import { buildFullHealthPrompt, makeHealthAnalysisSystemPrompt } from "../prompts/healthAnalysis.prompt";
import { HealthInput, HealthOutput } from "../types/health.types";

export default async function calculateHealth(
  data: HealthInput
): Promise<HealthOutput> {
  try {
    // 1️⃣ Build prompts
    const fullPrompt = `
${makeHealthAnalysisSystemPrompt()}

${buildFullHealthPrompt(data)}
`.trim();

    // 2️⃣ Call Gemini (single call)
    const rawResponse = await callGemini(fullPrompt);

    // 3️⃣ Clean response (in case model adds whitespace)
    const cleaned = rawResponse.trim();

    // 4️⃣ Parse JSON safely
    let parsed: HealthOutput;

    try {
      parsed = JSON.parse(cleaned);
    } catch (err) {
      console.error("Invalid JSON from AI:", cleaned);
      throw new Error("AI returned invalid JSON.");
    }

    // 5️⃣ Basic validation (lightweight safeguard)
    if (!parsed.overall_score || !Array.isArray(parsed.organs)) {
      throw new Error("AI response missing required fields.");
    }

    if (parsed.organs.length !== 5) {
      throw new Error("AI must return exactly 5 organs.");
    }

    return parsed;
  } catch (error) {
    console.error("calculateHealth error:", error);
    throw error;
  }
}