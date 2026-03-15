'use client';
import Image from 'next/image';
import { useState } from 'react';

// const organCoordinates = [
//   { id: 'brain', label: <>Brain (Your sleeping habits is aging you <strong>+2 yrs</strong>)</>, color: '#FACC15', top: '18%', left: '50%' }, // Yellow (Moderate)
//   { id: 'eyes', label: <>Eyes (Your screen time is aging you <strong>+5 yrs</strong>)</>, color: '#FACC15', top: '20.75%', left: '52.9%' }, // Yellow (Moderate)
//   { id: 'lungs', label: <>Lungs (Your smoking habit is aging you <strong>+10 yrs</strong>)</>, color: '#EF4444', top: '32%', left: '57%' }, // Red (Severe)
//   { id: 'heart', label: <>Heart (<strong>You're on track!</strong>)</>, color: '#22C55E', top: '35%', left: '50%' }, // Green (On Track)
//   { id: 'liver', label: <>Liver (Your drinking habit is aging you <strong>+5 yrs</strong>)</>, color: '#EF4444', top: '40%', left: '50%' }, // Red (Severe)
// ];

type Organ = {
  organ: string;
  biological_age: number;
  risk_level: number;
  reasoning_short: string;
  reasoning_habit: string;
};

interface BodyVisualizerProps {
  organs?: Organ[];
}

const getPosition = (organId: string) => {
  switch (organId) {
    case 'brain':
      return { top: '18%', left: '50%' };
    case 'eyes':
      return { top: '22%', left: '52%' };
    case 'lungs':
      return { top: '32%', left: '57%' };
    case 'heart':
      return { top: '35%', left: '50%' };
    case 'liver':
      return { top: '40%', left: '50%' };
    default:
      return { top: '50%', left: '50%' };
  }
};

const getColor = (riskLevel: number) => {
  if (riskLevel >= 4) return '#EF4444'; // Red
  if (riskLevel === 3) return '#FACC15'; // Yellow
  return '#22C55E'; // Green
};

export default function BodyVisualizer({ organs }: BodyVisualizerProps) {
  const [hoveredOrgan, setHoveredOrgan] = useState<string | null>(null);


  const organCoordinates =
    organs?.map((organ) => ({
      id: organ.organ,
      // label: (
      //   <>
      //     {organ.organ.charAt(0).toUpperCase() + organ.organ.slice(1)} (
      //     {organ.biological_age > 0 ? (
      //       <>
      //         Your {organ.reasoning_habit} is aged to{" "}
      //         <strong>{organ.biological_age} yrs</strong>
      //       </>
      //     ) : (
      //       <strong>You&apos;re on track!</strong>
      //     )}
      //     )
      //   </>
      // ),
      label: organ.reasoning_short,
      age: organ.biological_age,
      color: getColor(organ.risk_level),
      top: getPosition(organ.organ).top,
      left: getPosition(organ.organ).left,
    })) || [];

  return (
    <div className="relative w-full max-w-sm mx-auto aspect-[1/2] rounded-[3rem] border border-white/10 bg-black/40 backdrop-blur-xl flex items-center justify-center p-0 overflow-hidden shadow-[0_0_50px_rgba(255,255,255,0.05)]">

      {/* LAYER 1: The Base Image - BLUR REMOVED, OPACITY UP */}
      <Image
        src="/images/greyscale_body.png"
        alt="3D Body"
        className="absolute inset-0 w-full h-full object-contain pointer-events-none opacity-90 transition-all duration-500"
        style={{ filter: hoveredOrgan ? 'brightness(0.4)' : 'brightness(1)' }}
        fill
      />

      {/* LAYER 2: The Interactive Hotspots */}
      <div className="absolute inset-0 z-10 w-full h-full">
        {organCoordinates.map((organ) => {
          const isHovered = hoveredOrgan === organ.id;

          return (
            <div
              key={organ.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 flex items-center justify-center group"
              style={{ top: organ.top, left: organ.left, width: '50px', height: '50px' }}
              onMouseEnter={() => setHoveredOrgan(organ.id)}
              onMouseLeave={() => setHoveredOrgan(null)}
            >
              {/* The Small Ring Marker (Visible when NOT hovered) */}
              {!hoveredOrgan && <div
                className={`absolute rounded-full transition-all duration-300 z-0 ${isHovered ? 'w-full h-full opacity-0' : 'w-3 h-3 opacity-100'}`}
                style={{ border: `2px solid ${organ.color}`, backgroundColor: `${organ.color}30`, boxShadow: `0 0 10px ${organ.color}` }}
              />}
              {/* Tooltip */}
              
              <div
                className={`absolute bottom-0 left-1/2 -translate-x-1/2 mb-2 w-40 px-4 py-2 rounded-xl bg-black/90 border border-white/20 backdrop-blur-xl text-[8px] font-medium tracking-wide transition-all duration-300 pointer-events-none z-[999]
                ${isHovered ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'}`}
                style={{ color: organ.color, boxShadow: `0 4px 20px ${organ.color}50` }}
              >
                <strong><i>Your {organ.id} is aged to {organ.age} years.</i></strong> {organ.label}
              </div>


              {/* The Massive Neon Glow (Visible ONLY when hovered) */}
              <div
                className={`absolute rounded-full transition-all duration-500 blur-xl pointer-events-none
                ${isHovered ? 'w-40 h-40 opacity-50' : 'w-0 h-0 opacity-0'}`}
                style={{ backgroundColor: organ.color }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}