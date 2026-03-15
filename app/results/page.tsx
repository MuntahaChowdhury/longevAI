'use client';
import Link from 'next/link';
import BodyVisualizer from '../../components/BodyVisualizer';

export default function ResultsPage() {
  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12 overflow-hidden relative flex flex-col items-center">
      {/* Cinematic Ambient Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[var(--color-organ-liver)]/10 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[var(--color-organ-lungs)]/10 rounded-full blur-[150px] pointer-events-none"></div>

      <header className="w-full max-w-6xl mb-12 text-center z-10 relative mt-10">
        <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50">
          Your Longevity Map
        </h1>
        <p className="text-white/50 tracking-wide">Hover over your organs to see how your habits impact your biological age.</p>
      </header>

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 z-10 relative items-center">
        
        {/* Left Column: The 3D Glass Body Model */}
        <div className="flex justify-center">
          <BodyVisualizer />
        </div>

        {/* Right Column: AI Data & Improvements */}
        <div className="space-y-6">
          {/* Top Risks Card */}
          <div className="p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] transition-all hover:bg-white/10">
            <h2 className="text-xl text-white/90 mb-6 tracking-wide font-light border-b border-white/10 pb-4">Top 3 Risks</h2>
            
            <ul className="space-y-6">
              <li className="flex items-center gap-4">
                <div className="w-4 h-4 rounded-full bg-[var(--color-organ-lungs)] shadow-[0_0_15px_var(--color-organ-lungs)]"></div>
                <div>
                  <p className="text-white/90 font-medium text-lg">Smoking <span className="text-[var(--color-organ-lungs)]">(+10 years)</span></p>
                  <p className="text-sm text-white/50">Severely impacting lung capacity and cellular aging.</p>
                </div>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-4 h-4 rounded-full bg-[var(--color-organ-liver)] shadow-[0_0_15px_var(--color-organ-liver)]"></div>
                <div>
                  <p className="text-white/90 font-medium text-lg">Drinking <span className="text-[var(--color-organ-liver)]">(+5 years)</span></p>
                  <p className="text-sm text-white/50">Frequent alcohol consumption straining liver function.</p>
                </div>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-4 h-4 rounded-full bg-[var(--color-organ-eyes)] shadow-[0_0_15px_var(--color-organ-eyes)]"></div>
                <div>
                  <p className="text-white/90 font-medium text-lg">Screentime <span className="text-[var(--color-organ-eyes)]">(+5 years)</span></p>
                  <p className="text-sm text-white/50">High daily exposure causing severe eye strain.</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Action Plan Card */}
          <div className="p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] transition-all hover:bg-white/10">
             <h2 className="text-xl text-white/90 mb-6 tracking-wide font-light border-b border-white/10 pb-4">Suggested Interventions</h2>
             <ul className="space-y-4 text-white/70">
                <li className="flex items-start gap-3">
                  <span className="text-white/30">01</span>
                  <span>Reduce smoking by 2 cigarettes daily starting tomorrow.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-white/30">02</span>
                  <span>Replace 2 alcoholic drinks this week with sparkling water.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-white/30">03</span>
                  <span>Implement the 20-20-20 rule for screens while working.</span>
                </li>
             </ul>
          </div>

          {/* Navigation */}
          <div className="pt-6">
            <Link href="/check-in" className="flex items-center justify-center w-full px-8 py-5 rounded-full bg-white text-black text-lg font-medium hover:scale-[1.02] transition-transform shadow-[0_0_30px_rgba(255,255,255,0.2)]">
              Come back in one week →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}