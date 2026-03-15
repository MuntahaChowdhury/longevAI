'use client';
import Link from 'next/link';
import BodyVisualizer from '../../components/BodyVisualizer';
import BodyVisualizerWeek2 from '../../components/BodyVisualizerWeek2';

export default function ComparisonPage() {
  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12 overflow-x-hidden relative flex flex-col items-center">
      {/* Cinematic Ambient Glows */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-red-500/10 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[150px] pointer-events-none"></div>

      <header className="w-full max-w-7xl mb-12 text-center z-10 relative mt-4">
        <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50">
          Week 1 vs Week 2
        </h1>
        <p className="text-white/50 tracking-wide text-lg">Your biological age risk dropped from <span className="text-red-400 font-medium">+22 years</span> to <span className="text-emerald-400 font-medium">+15 years</span>.</p>
      </header>

      {/* DUAL BODY MAPS */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 z-10 relative mb-16">
        <div className="flex flex-col items-center gap-6">
          <h2 className="text-xl font-light text-white/50 tracking-widest uppercase">Week 1</h2>
          <BodyVisualizer />
        </div>
        <div className="flex flex-col items-center gap-6">
          <h2 className="text-xl font-light text-emerald-400 tracking-widest uppercase drop-shadow-[0_0_10px_rgba(52,211,153,0.5)]">Week 2</h2>
          <BodyVisualizerWeek2 />
        </div>
      </div>

      {/* SUMMARY TILES */}
      <div className="w-full max-w-5xl z-10 space-y-6">
        <h3 className="text-2xl font-light text-white/80 border-b border-white/10 pb-4">Habit Breakdown</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* IMPROVED TILE */}
          <div className="p-6 rounded-3xl border border-emerald-500/30 bg-emerald-500/5 backdrop-blur-xl shadow-[0_8px_32px_rgba(16,185,129,0.1)] hover:bg-emerald-500/10 transition-all">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-emerald-400 shadow-[0_0_10px_#34D399]"></div>
              <h4 className="text-lg font-medium text-emerald-400">Improved</h4>
            </div>
            <ul className="space-y-4 text-sm text-white/80">
              <li className="flex flex-col gap-1 border-b border-white/5 pb-2">
                <span className="font-semibold text-white">Sleep</span>
                <span>Sleeping increased by 1 hr.</span>
                <span className="text-emerald-400 font-medium">Risk reduced to +0 years.</span>
              </li>
              <li className="flex flex-col gap-1">
                <span className="font-semibold text-white">Smoking</span>
                <span>Cut back 3 cigarettes a day.</span>
                <span className="text-emerald-400 font-medium">Risk reduced from +10 to +5 years.</span>
              </li>
            </ul>
          </div>

          {/* NO CHANGE TILE */}
          <div className="p-6 rounded-3xl border border-yellow-500/30 bg-yellow-500/5 backdrop-blur-xl shadow-[0_8px_32px_rgba(234,179,8,0.1)] hover:bg-yellow-500/10 transition-all">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-yellow-400 shadow-[0_0_10px_#FACC15]"></div>
              <h4 className="text-lg font-medium text-yellow-400">No Change</h4>
            </div>
            <ul className="space-y-4 text-sm text-white/80">
              <li className="flex flex-col gap-1 border-b border-white/5 pb-2">
                <span className="font-semibold text-white">Drinking</span>
                <span>Alcohol intake remains the same.</span>
                <span className="text-yellow-400 font-medium">Still aging you +5 years.</span>
              </li>
              <li className="flex flex-col gap-1">
                <span className="font-semibold text-white">Screentime</span>
                <span>Screen exposure remains high.</span>
                <span className="text-yellow-400 font-medium">Still aging you +5 years.</span>
              </li>
            </ul>
          </div>

          {/* WORSENED TILE */}
          <div className="p-6 rounded-3xl border border-red-500/30 bg-red-500/5 backdrop-blur-xl shadow-[0_8px_32px_rgba(239,68,68,0.1)] hover:bg-red-500/10 transition-all">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-400 shadow-[0_0_10px_#EF4444]"></div>
              <h4 className="text-lg font-medium text-red-400">Worsened</h4>
            </div>
            <ul className="space-y-4 text-sm text-white/80">
              <li className="flex flex-col gap-1">
                <span className="font-semibold text-white">Exercise</span>
                <span>Missed all workouts this week.</span>
                <span className="text-red-400 font-medium">Now aging you +10 years.</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Start Over Button */}
        <div className="flex justify-center pt-10 pb-20">
            <Link href="/" className="px-8 py-4 rounded-full border border-white/20 bg-transparent hover:bg-white/10 text-white font-medium transition-all">
              Restart Assessment
            </Link>
        </div>

      </div>
    </div>
  );
}