/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Link from 'next/link';
import BodyVisualizer from '../../components/BodyVisualizer';
import BodyVisualizerWeek2 from '../../components/BodyVisualizerWeek2';
import { useEffect, useState } from "react";

export default function ComparisonPage() {
  const [latest, setLatest] = useState<any>(null);
  const [previous, setPrevious] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const res = await fetch("/api/progress", {
          method: 'POST'
        });

        if (!res.ok) throw new Error("Failed to fetch progress");

        const data = await res.json();

        if (data?.latest && data?.previous) {
          setLatest(data.latest);
          setPrevious(data.previous);
        }
      } catch (err) {
        console.error("Progress fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, []);

  if (loading || !latest || !previous) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!latest || !previous) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Not enough data for comparison.

      </div>
    );
  }

  // 🔥 Dynamic overall change
  const overallChange =
    latest.overall_score - previous.overall_score;

  // 🔥 Dynamic organ comparison
  const compareOrgans = () => {
    const improved: any[] = [];
    const worsened: any[] = [];
    const noChange: any[] = [];

    latest.organs.forEach((current: any) => {
      const prev = previous.organs.find(
        (p: any) => p.organ === current.organ
      );

      if (!prev) return;

      const diff = current.biological_age - prev.biological_age;

      if (diff < 0) {
        improved.push({ ...current, diff });
      } else if (diff > 0) {
        worsened.push({ ...current, diff });
      } else {
        noChange.push(current);
      }
    });

    return { improved, worsened, noChange };
  };

  const organChanges = compareOrgans();

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12 overflow-x-hidden relative flex flex-col items-center">

      {/* Background Glow */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-red-500/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[150px] pointer-events-none" />

      {/* Header */}
      <header className="w-full max-w-7xl mb-12 text-center z-10 relative mt-4">
        <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-4">
          Week 1 vs Week 2
        </h1>

        <p className="text-white/60 text-lg">
          Your biological age risk changed by{" "}
          <span className="text-emerald-400 font-medium">
            {overallChange > 0 ? `+${overallChange}` : overallChange}
          </span>{" "}
          points.
        </p>
      </header>

      {/* Body Maps */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 z-10 mb-16">

        <div className="flex flex-col items-center gap-6">
          <h2 className="text-xl font-light text-white/50 uppercase tracking-widest">
            Week 1
          </h2>
          <BodyVisualizer organs={previous.organs} />
        </div>

        <div className="flex flex-col items-center gap-6">
          <h2 className="text-xl font-light text-emerald-400 uppercase tracking-widest">
            Week 2
          </h2>
          <BodyVisualizer organs={latest.organs} />

        </div>

      </div>

      {/* Dynamic Summary */}
      <div className="w-full max-w-5xl z-10 space-y-8">

        <h3 className="text-2xl font-light border-b border-white/10 pb-4">
          Habit Breakdown
        </h3>
{organChanges && (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

    {/* Improved */}
    <div className="p-6 rounded-3xl border border-emerald-500/30 bg-emerald-500/5">
      <h4 className="text-emerald-400 font-medium mb-4">
        Improved
      </h4>

      {organChanges.improved?.length ? (
        <ul className="space-y-2 list-disc pl-4 text-sm">
          {organChanges.improved.map((o) => (
            <li key={o.organ}>
              {o.organ.toUpperCase()} age decreased by {Math.abs(o.diff)} years
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-white/60 text-sm">
          No improvements yet.
        </p>
      )}
    </div>

    {/* No Change */}
    <div className="p-6 rounded-3xl border border-yellow-500/30 bg-yellow-500/5">
      <h4 className="text-yellow-400 font-medium mb-4">
        No Change
      </h4>

      {organChanges.noChange?.length ? (
        <ul className="space-y-2 list-disc pl-4 text-sm">
          {organChanges.noChange.map((o) => (
            <li key={o.organ}>{o.organ.toUpperCase()}</li>
          ))}
        </ul>
      ) : (
        <p className="text-white/60 text-sm">
          All organs changed.
        </p>
      )}
    </div>

    {/* Worsened */}
    <div className="p-6 rounded-3xl border border-red-500/30 bg-red-500/5">
      <h4 className="text-red-400 font-medium mb-4">
        Needs Attention
      </h4>

      {organChanges.worsened?.length ? (
        <ul className="space-y-2 list-disc pl-4 text-sm">
          {organChanges.worsened.map((o) => (
            <li key={o.organ}>
              {o.organ.toUpperCase()} aging increased by {o.diff} years
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-white/60 text-sm">
          No declines 🎉
        </p>
      )}
    </div>

  </div>
)}

        {/* Restart */}
        <div className="flex justify-center pt-10 pb-20">
          <Link
            href="/"
            className="px-8 py-4 rounded-full border border-white/20 hover:bg-white/10 transition-all"
          >
            Restart Assessment
          </Link>
        </div>

      </div>
    </div>
  );
}