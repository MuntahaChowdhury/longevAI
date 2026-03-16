/*
====================================================
FILE: /app/api/analyze/route.ts

PURPOSE:
Handles health analysis requests from the frontend.

FLOW:
1. Receives user health intake data (POST request)
2. Passes data to the analysis layer in /lib
3. Stores the generated analysis results in Supabase
4. Returns the final structured analysis to the frontend.
====================================================
*/

import calculateHealth from "@/lib/analysis/calculateHealth";
import { insertRow } from "@/db/supabase.config"; // adjust path if needed
import { HealthOutput } from "@/lib/types/health.types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log(body)
    // Basic validation
    if (!body) {
      return Response.json(
        { error: "Missing request body" },
        { status: 400 }
      );
    }

    // 1️⃣ Run AI analysis (IMPORTANT: pass body)
    const resHealth = await calculateHealth({...body.messages, ...body.demographic}) as HealthOutput;

    // 2️⃣ Save to Supabase
    await insertRow("health_analyses", {
      user_id: body.user_id,
      analysis: resHealth,
    });

    // 3️⃣ Return result to frontend
    return NextResponse.json({resHealth});

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Analyze API Error:", error);

    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}