/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { supabase } from "@/db/supabase.config"; 
// (use server client so it reads cookies)

export async function GET() {
  try {

    // Get logged-in user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get last two analyses
    const { data: analyses, error } = await supabase
      .from("analyses")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(2);

    if (error) throw error;

    if (!analyses || analyses.length < 2) {
      return NextResponse.json({
        message: "Not enough data for progress comparison.",
      });
    }

    const [latest, previous] = analyses;

    // Calculate overall score progress
    const overallChange =
      latest.overall_score - previous.overall_score;

    // Organ progress
    const organProgress: any = {};

    for (const organ of latest.organs) {
      const prevOrgan = previous.organs.find(
        (o: any) => o.organ === organ.organ
      );

      if (prevOrgan) {
        organProgress[organ.organ] =
          prevOrgan.biological_age - organ.biological_age;
      }
    }

    return NextResponse.json({
      overall_score_change: overallChange,
      organ_progress: organProgress,
      latest_analysis_id: latest.id,
    });
  } catch (error) {
    console.error("Progress error:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}