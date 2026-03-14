import Link from 'next/link';

export default function LandingPage() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center bg-black overflow-hidden text-white">
      {/* Background Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-organ-liver/20 rounded-full mix-blend-screen filter blur-[100px] animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-organ-eyes/20 rounded-full mix-blend-screen filter blur-[100px] animate-pulse" style={{ animationDelay: '2s' }}></div>

      {/* Glassy Content Card */}
      <div className="relative z-10 flex flex-col items-center text-center p-12 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl shadow-[0_0_40px_rgba(255,255,255,0.05)]">
        
        <h1 className="text-6xl md:text-7xl font-light tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white via-white/90 to-white/20 drop-shadow-[0_2px_15px_rgba(255,255,255,0.2)]">
          Longev<span className="font-semibold text-white/90">AI</span>
        </h1>
        
        <p className="text-lg text-white/50 mb-10 max-w-md font-light tracking-wide">
          Your personal longevity agent. Discover how your habits influence your biological timeline.
        </p>

        <Link href="/onboarding" className="px-8 py-3 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300 backdrop-blur-md">
          Begin Assessment
        </Link>
      </div>
    </main>
  );
}
