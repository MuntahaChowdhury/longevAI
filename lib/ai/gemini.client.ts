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
            parts: [{ text: prompt }],
          },
        ],
        generationConfig: {
          temperature: GEMINI_CONFIG.temperature,
        },
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Gemini API Error:", errorText);
    throw new Error(`Gemini API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();

  const textOutput = data.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!textOutput) {
    throw new Error("Unexpected response format from Gemini API");
  }

  return textOutput;
}
