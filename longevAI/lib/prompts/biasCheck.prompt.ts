import { HealthInput } from "../types/health.types";

export function buildSystemPrompt(): string {
  return `
You are a health trait inference engine.

Your task:
- Analyze user health data and chat context.
- Infer habits and behavioral traits.
- Identify positive traits and areas for improvement.
- Be conservative and objective.
- Do NOT diagnose.
- Do NOT give medical advice.
- Output valid JSON only.
`.trim();
}

export function buildUserPrompt(data: HealthInput, chat: string): string {
  return `
User Health Data:
Age: ${data.age}
Height: ${data.heightCm}
Weight: ${data.weightKg}
Sleep: ${data.sleepHoursPerNight}
Exercise: ${data.exerciseMinutesPerWeek}
Smoking: ${data.smoking}
Drinking: ${data.drinkingUnitsPerWeek}
Screen Time: ${data.screenHoursPerDay}

User Chat:
${chat}

Return JSON in this format:

{
  "positive_traits": [
    {
      "trait": string,
      "impact": string
    }
  ],
  "areas_for_improvement": [
    {
      "trait": string,
      "impact": string
    }
  ],
  "trait_summary": string
}
`.trim();
}