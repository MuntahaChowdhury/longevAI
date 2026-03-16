/* eslint-disable @typescript-eslint/no-explicit-any */
import { supabase } from '@/db/supabase.config';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
  throw new Error("Missing GOOGLE_GENERATIVE_AI_API_KEY environment variable");
}

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY);

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const contents = messages.map((m: any) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }]
    }));

    const { data: analyses, error } = await supabase
      .from("health_analyses")
      .select("analysis")
      .order("created_at", { ascending: false })
      .limit(1);

    if (error) throw error;

    if (!analyses) {
      return NextResponse.json({
        message: "Not enough data for progress comparison.",
      });
    }

    const recommendations =
      analyses[0].analysis.recommendations
        .map((r:any) => `- ${r.action}`)
        .join("\n");

    // The new Follow-Up script!
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash-lite',
      systemInstruction: `You are LongevAI, following up with a user after one week. 
      They had 3 specific goals:
      ${recommendations}

      CRITICAL INSTRUCTIONS: 
      - Ask about ONE goal at a time. Do not ask about the next goal until the user has answered the current one.
      - Keep it conversational, short, and encouraging. 
      - Once you have gathered an update on ALL 3 goals, you MUST end your final response with exactly: "CALCULATING_RESULTS".`
    });

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