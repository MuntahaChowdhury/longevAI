import { HealthInput } from "../types/health.types";

/* ====================================================
   UTIL
==================================================== */

function formatValue(
  value: string | number | boolean | undefined,
  suffix = ""
): string {
  if (value === undefined) return "unknown";
  if (typeof value === "boolean") return value ? "true" : "false";
  return `${value}${suffix}`;
}

/* ====================================================
   SYSTEM PROMPT (FINAL OUTPUT STRUCTURE)
==================================================== */

export function makeHealthAnalysisSystemPrompt(): string {
  return `
You are a health analytics engine.

Your job is to estimate organ-level biological aging signals and lifestyle insights
based ONLY on the provided structured health inputs.

IMPORTANT RULES:
- Use only the user's reported inputs.
- Do NOT invent medical data.
- Do NOT diagnose.
- Do NOT provide treatment.
- Do NOT claim certainty.
- Estimates must be conservative and internally consistent.
- Output MUST be valid JSON only.
- Do NOT include markdown.
- Do NOT include text before or after JSON.

FINAL OUTPUT STRUCTURE:

Return EXACTLY this JSON shape:

{
  "overall_score": number, 
  "organs": [
    {
      "organ": "heart" | "lungs" | "brain" | "eyes" | "liver",
      "biological_age": number,
      "risk_level": number,
      "reasoning_short": string,
    }
  ],
  "primary_risks": [
    {
      "risk_factor": string,
      "severity": "low" | "medium" | "high",
      "description": string
    },
    {
      "risk_factor": string,
      "severity": "low" | "medium" | "high",
      "description": string
    },
    {
      "risk_factor": string,
      "severity": "low" | "medium" | "high",
      "description": string
    }
  ],
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
  "recommendations": [
    {
      "category": string,
      "action": string,
      "expected_benefit": string
    }
  ],
  "motivational_message": string
}

SCORING RULES:
- overall_score: 0–100 (higher = healthier)
- risk_level: integer 1–5 (1 being worst, 5 being best)
- biological_age: Plus how many has this organ aged due eto the traits/habits
- organs MUST contain exactly 5 items:
  heart, lungs, brain, eyes, liver
`.trim();
}

/* ====================================================
   USER DATA PROMPT
==================================================== */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function buildFullHealthPrompt(data: any): string {
  return `

- Analyze user health data and chat context.
- Infer habits and behavioral traits.
- Identify positive traits and areas for improvement.
- Be conservative and objective.
- Do NOT diagnose.
- Do NOT give medical advice.
- Output valid JSON only.
to get:
User Health Data: Age, Height, Weight, Sleep, Exercise, Smoking, Drinking, Screen time,
by analyzing ${data}
 
Then
Analyze:
- Organ biological aging
- Health risks
- Positive traits
- Areas for improvement
- Practical recommendations

Be concise. Be conservative. Return valid JSON only.
`.trim();
}

// import { HealthInput } from "../types/health.types";

// function formatValue(
//   value: string | number | boolean | undefined,
//   suffix = ""
// ): string {
//   if (value === undefined) return "unknown";
//   if (typeof value === "boolean") return value ? "true" : "false";
//   return `${value}${suffix}`;
// }

// export function makeHealthAnalysisSystemPrompt(): string {
//   return `
// You are a health analytics engine responsible for estimating organ-level biological aging signals from structured health inputs.

// Your job is to estimate relative biological age for different organs based ONLY on the provided health data.

// Treat biological age as a heuristic estimate of relative wear-and-tear, not as a diagnosis, lab result, or exact clinical measurement.

// Rules:
// - Use only the user's reported inputs.
// - Do NOT invent medical history, biomarkers, symptoms, or conditions.
// - Do NOT provide diagnosis.
// - Do NOT provide treatment plans.
// - Do NOT claim certainty.
// - If data is missing, estimate conservatively and avoid extreme values.
// - Keep estimates practical and internally consistent.
// - Keep reasoning_short brief and grounded only in the provided inputs.
// - Output MUST be valid JSON only.
// - Do NOT include markdown.
// - Do NOT include any text before or after the JSON.

// Scoring rules:
// - overall_score: number from 0 to 100, where higher means healthier overall profile
// - risk_level: integer from 1 to 5, where 1 = very low risk and 5 = high risk
// - biological_age: number in years
// - Return exactly 5 organ entries
// - Organ names must exactly be:
//   "heart", "lungs", "brain", "eyes", "liver"

// Return exactly this JSON shape:
// {
//   "overall_score": number,
//   "organs": [
//     {
//       "organ": string,
//       "biological_age": number,
//       "risk_level": number,
//       "reasoning_short": string
//     }
//   ]
// }
// `.trim();
// }

// export function PromptAnalyzeAge(data: HealthInput): string {
//   return `
// Here is the user's health data:

// Age: ${data.age}
// Height: ${formatValue(data.heightCm, " cm")}
// Weight: ${formatValue(data.weightKg, " kg")}
// Sleep: ${formatValue(data.sleepHoursPerNight, " hours per night")}
// Exercise: ${formatValue(data.exerciseMinutesPerWeek, " minutes per week")}
// Smoking: ${formatValue(data.smoking)}
// Drinking: ${formatValue(data.drinkingUnitsPerWeek, " units per week")}
// Screen time: ${formatValue(data.screenHoursPerDay, " hours per day")}

// Calculate biological age for:
// - heart
// - lungs
// - brain
// - eyes
// - liver

// Important instructions:
// - Base the result only on the data above.
// - Use conservative estimates.
// - Keep "reasoning_short" very brief.
// - Do not output explanations outside the JSON.
// - Return valid JSON only.

// Return output in this exact format:
// {
//   "overall_score": number,
//   "organs": [
//     {
//       "organ": string,
//       "biological_age": number,
//       "risk_level": number,
//       "reasoning_short": string
//     }
//   ]
// }
// `.trim();
// }

// export const systemPrompt = makeHealthAnalysisSystemPrompt;
// export const makeUserPrompt = PromptAnalyzeAge;

// export function promptAnalyzeRisk(data: HealthInput): string {
//   return `
// Based on the user's health data:

// Age: ${data.age}
// Height: ${formatValue(data.heightCm, " cm")}
// Weight: ${formatValue(data.weightKg, " kg")}
// Sleep: ${formatValue(data.sleepHoursPerNight, " hours per night")}
// Exercise: ${formatValue(data.exerciseMinutesPerWeek, " minutes per week")}
// Smoking: ${formatValue(data.smoking)}
// Drinking: ${formatValue(data.drinkingUnitsPerWeek, " units per week")}
// Screen time: ${formatValue(data.screenHoursPerDay, " hours per day")}

// Analyze the primary health risks associated with these metrics.
// Focus on identifying specific lifestyle factors that could lead to long-term health issues.

// Important instructions:
// - Base the risk analysis only on the provided data.
// - Keep the analysis concise and objective.
// - Output MUST be valid JSON only.

// Return output in this exact format:
// {
//   "primary_risks": [
//     {
//       "risk_factor": string,
//       "severity": string (e.g., "low", "medium", "high"),
//       "description": string
//     }
//   ],
//   "overall_risk_assessment": string
// }
// `.trim();
// }

// export function promptAnalyzeTrait(data: HealthInput): string {
//   return `
// Based on the user's health data:

// Age: ${data.age}
// Height: ${formatValue(data.heightCm, " cm")}
// Weight: ${formatValue(data.weightKg, " kg")}
// Sleep: ${formatValue(data.sleepHoursPerNight, " hours per night")}
// Exercise: ${formatValue(data.exerciseMinutesPerWeek, " minutes per week")}
// Smoking: ${formatValue(data.smoking)}
// Drinking: ${formatValue(data.drinkingUnitsPerWeek, " units per week")}
// Screen time: ${formatValue(data.screenHoursPerDay, " hours per day")}

// Analyze the user's health traits and habits.
// Identify both positive traits and areas that need improvement.

// Important instructions:
// - Base the trait analysis only on the provided data.
// - Highlight at least one positive trait if applicable.
// - Output MUST be valid JSON only.

// Return output in this exact format:
// {
//   "positive_traits": [
//     {
//       "trait": string,
//       "impact": string
//     }
//   ],
//   "areas_for_improvement": [
//     {
//       "trait": string,
//       "impact": string
//     }
//   ],
//   "trait_summary": string
// }
// `.trim();
// }

// export function promptMakeRec(data: HealthInput): string {
//   return `
// Based on the user's health data:

// Age: ${data.age}
// Height: ${formatValue(data.heightCm, " cm")}
// Weight: ${formatValue(data.weightKg, " kg")}
// Sleep: ${formatValue(data.sleepHoursPerNight, " hours per night")}
// Exercise: ${formatValue(data.exerciseMinutesPerWeek, " minutes per week")}
// Smoking: ${formatValue(data.smoking)}
// Drinking: ${formatValue(data.drinkingUnitsPerWeek, " units per week")}
// Screen time: ${formatValue(data.screenHoursPerDay, " hours per day")}

// Provide actionable, practical health recommendations to improve their overall well-being and biological age.

// Important instructions:
// - Base recommendations on the specific data provided.
// - Ensure recommendations are realistic and safe.
// - Output MUST be valid JSON only.

// Return output in this exact format:
// {
//   "recommendations": [
//     {
//       "category": string (e.g., "Diet", "Exercise", "Sleep", "Lifestyle"),
//       "action": string,
//       "expected_benefit": string
//     }
//   ],
//   "motivational_message": string
// }
// `.trim();
//                               }

// export function buildFullHealthPrompt(data: HealthInput) {
//   return `
// ${makeHealthAnalysisSystemPrompt()}

// ${PromptAnalyzeAge(data)}

// ${promptAnalyzeRisk(data)}

// ${promptAnalyzeTrait(data)}

// ${promptMakeRec(data)}
// `.trim();
// }


// Age: ${data.age}
// Height: ${formatValue(data.heightCm, " cm")}
// Weight: ${formatValue(data.weightKg, " kg")}
// Sleep: ${formatValue(data.sleepHoursPerNight, " hours per night")}
// Exercise: ${formatValue(data.exerciseMinutesPerWeek, " minutes per week")}
// Smoking: ${formatValue(data.smoking)}
// Drinking: ${formatValue(data.drinkingUnitsPerWeek, " units per week")}
// Screen time: ${formatValue(data.screenHoursPerDay, " hours per day")}