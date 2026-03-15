'use client';
import Link from 'next/link';
import BodyVisualizer from '../../components/BodyVisualizer';
import { useEffect, useState } from "react";

export default function ResultsPage() {
  const [healthData, setHealthData] = useState<any>(null);

  useEffect(() => {
    const cookie = localStorage.getItem("gemini_health");

    if (cookie) {
      try {
        const asyncFunc = async () => {
          const parsed = JSON.parse(cookie);
          setHealthData(parsed.resHealth);
          console.log('Health data:', healthData)
        }
        asyncFunc();
      } catch (err) {
        console.error("Invalid cookie JSON");
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12 overflow-hidden relative flex flex-col items-center">
      {/* Cinematic Ambient Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-red-500/10 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-yellow-500/10 rounded-full blur-[150px] pointer-events-none"></div>

      <header className="w-full max-w-6xl mb-12 text-center z-10 relative mt-10">
        <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50">
          Your Longevity Map
        </h1>
        <p className="text-white/50 tracking-wide">Hover over your organs to see how your habits impact your biological age.</p>
      </header>

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 z-10 relative items-center">

        {/* Left Column: The 3D Glass Body Model */}
        {healthData && <div className="flex justify-center">
          <BodyVisualizer organs={healthData.organs} />
        </div>}

        {/* Right Column: AI Data & Improvements */}
        <div className="space-y-6">

          {/* Top Risks Card */}
          <div className="p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] transition-all hover:bg-white/10">
            <h2 className="text-xl text-white/90 mb-6 tracking-wide font-light border-b border-white/10 pb-4">Top 3 Risks</h2>
            <ul className="space-y-6">
              {healthData?.primary_risks?.map((risk: any, index: number) => (
                <li key={index} className="flex items-center gap-4">
                  <div
                    className={`w-4 h-4 rounded-full ${risk.severity === "high"
                      ? "bg-red-500 shadow-[0_0_15px_red]"
                      : "bg-yellow-400 shadow-[0_0_15px_yellow]"
                      }`}
                  />
                  <div>
                    <p className="text-white/90 font-medium text-lg">
                      {risk.risk_factor}
                    </p>
                    <p className="text-sm text-white/50">
                      {risk.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Action Plan Card */}
          <div className="p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] transition-all hover:bg-white/10">
            <h2 className="text-xl text-white/90 mb-6 tracking-wide font-light border-b border-white/10 pb-4">Suggested Interventions</h2>
            <ul className="space-y-4 text-white/70">
              {healthData?.recommendations?.map((rec: any, index: number) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-white/30">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="text-white/90">{rec.action}</p>
                    <p className="text-white/50 text-sm">
                      {rec.expected_benefit}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Motivational Message
          {healthData?.motivational_message && (
            <div className="mt-8 p-6 rounded-2xl bg-white/5 border border-white/10 text-white/70">
              {healthData.motivational_message}
            </div>
          )} */}

          {/* Navigation */}
          <div className="pt-6">
            <Link href="/follow-up" className="flex items-center justify-center w-full px-8 py-5 rounded-full bg-white text-black text-lg font-medium hover:scale-[1.02] transition-transform shadow-[0_0_30px_rgba(255,255,255,0.2)]">
              Come back in one week →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}