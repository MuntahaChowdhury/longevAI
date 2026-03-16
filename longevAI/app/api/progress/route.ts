import { NextResponse } from "next/server";
import { supabase } from "@/db/supabase.config";

export async function POST() {
  try {

    // Get last two analyses for this user
    const { data: analyses, error } = await supabase
      .from("health_analyses")
      .select("analysis")
      .eq("user_id", "8a714bcc-2337-4513-9050-d2cd344aa9f6")
      .order("created_at", { ascending: false })
      .limit(2);

    if (error) throw error;

    if (!analyses || analyses.length < 2) {
      return NextResponse.json({
        message: "Not enough data for progress comparison.",
      });
    }

    const [latest, previous] = analyses;
    const overallChange =
      latest.analysis.overall_score - previous.analysis.overall_score;

    return NextResponse.json({
      latest: latest.analysis,
      previous: previous.analysis,
      overall_score_change: overallChange,
    });


  } catch (error) {
    console.error("Progress error:", error);


    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );


  }
}