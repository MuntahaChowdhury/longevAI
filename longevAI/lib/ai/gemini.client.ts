// lib/ai/gemini.client.ts

import { GEMINI_CONFIG } from "./gemini.config";

export async function callGemini(prompt: string) {
  if (!GEMINI_CONFIG.apiKey) {
    throw new Error("GEMINI_API_KEY is missing from environment variables.");
  }

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_CONFIG.model}:generateContent?key=${GEMINI_CONFIG.apiKey}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }],
          },
        ],
        // generationConfig: {
        //   temperature: GEMINI_CONFIG.temperature,
        //   responseMimeType: "application/json",
        // },
      }),
    }
  );

  // console.log(response);
  if (!response.ok) {
    const errorBody = await response.text();
    console.error("🔥 Gemini Error Body:", errorBody);
    // throw new Error(`Gemini API error: ${response.status}`);
  }

  const data = await response.json();

  const textOutput = data.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!textOutput) {
    throw new Error("Unexpected response format from Gemini API");
  }

  // 🔥 Safely parse JSON
  try {
    return textOutput;
  } catch (err) {
    throw new Error("Gemini did not return valid JSON.");
  }
}
