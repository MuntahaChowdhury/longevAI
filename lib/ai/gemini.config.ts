// lib/ai/gemini.config.ts

export const GEMINI_CONFIG = {
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
  model: "gemini-2.5-flash-lite",
  temperature: 0.2,
};
