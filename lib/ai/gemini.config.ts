// lib/ai/gemini.config.ts

export const GEMINI_CONFIG = {
  apiKey: process.env.GEMINI_API_KEY ?? "AIzaSyAfsyteZd_lgcPvodS7C2c5uqoRUL9Fye8",
  model: "gemini-1.5-pro",
  temperature: 0.2,
};
