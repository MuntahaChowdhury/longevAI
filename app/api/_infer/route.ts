/*******************************************************
 * /api/traits/infer
 *
 * Purpose:
 * - Receive chat context + health data
 * - Send to Gemini
 * - Infer habits / traits
 * - Return structured JSON
 *
 * This route does NOT:
 * - Save to DB
 * - Calculate health scores
 * - Generate recommendations
 *******************************************************/

import { NextRequest, NextResponse } from "next/server";
import { callGemini } from "@/lib/ai/gemini.client";
import { HealthInput } from "@/lib/types/health.types";
import { buildSystemPrompt, buildUserPrompt } from "@/lib/prompts/biasCheck.prompt";


export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { healthData, chat } = body as {
      healthData: HealthInput;
      chat: string;
    };

    if (!healthData || !chat) {
      return NextResponse.json(
        { error: "Missing required data" },
        { status: 400 }
      );
    }

    const system = buildSystemPrompt();
    const user = buildUserPrompt(healthData, chat);
        const fullPrompt = `
    ${system}
    
    ${user}
    `.trim();

    const result = await callGemini(fullPrompt);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Trait inference error:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}