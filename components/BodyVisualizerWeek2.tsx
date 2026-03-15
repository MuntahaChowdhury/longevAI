'use client';
import { useState } from 'react';

type Organ = {
  organ: string;
  biological_age: number;
  risk_level: number;
  reasoning_short: string;
  reasoning_habit: string;
};

interface BodyVisualizerProps {
  latest?: { organs: Organ[] };
  previous?: { organs: Organ[] };
}

const getPosition = (organId: string) => {
  switch (organId) {
    case 'brain': return { top: '18%', left: '50%' };
    case 'eyes': return { top: '22%', left: '52%' };
    case 'lungs': return { top: '32%', left: '57%' };
    case 'heart': return { top: '35%', left: '50%' };
    case 'liver': return { top: '40%', left: '50%' };
    default: return { top: '50%', left: '50%' };
  }
};

const getColor = (riskLevel: number) => {
  if (riskLevel >= 4) return '#EF4444';
  if (riskLevel === 3) return '#FACC15';
  return '#22C55E';
};

export default function BodyVisualizerWeek2({ latest, previous }: BodyVisualizerProps) {
  const [hoveredOrgan, setHoveredOrgan] = useState<string | null>(null);

  const organCoordinates =
    latest?.organs?.map((organ) => {
      const prevOrgan = previous?.organs?.find(
        (o) => o.organ === organ.organ
      );


      const ageChange = prevOrgan
        ? prevOrgan.biological_age - organ.biological_age
        : 0;

      let statusLabel;

      if (ageChange > 0) {
        statusLabel = (
          <>
            {organ.reasoning_habit} improved! <strong>+{ageChange} yrs</strong>
          </>
        );
      } else if (ageChange < 0) {
        statusLabel = (
          <>
            {organ.reasoning_habit} worsened <strong>{ageChange} yrs</strong>
          </>
        );
      } else {
        statusLabel = <strong>No change</strong>;
      }

      return {
        id: organ.organ,
        label: (
          <>
            {organ.organ.charAt(0).toUpperCase() + organ.organ.slice(1)} ({statusLabel})
          </>
        ),
        color: getColor(organ.risk_level),
        top: getPosition(organ.organ).top,
        left: getPosition(organ.organ).left,
      };
    }) || [];


  return (<div className="relative w-full max-w-sm mx-auto">
    {organCoordinates.map((organ) => (
      <div key={organ.id} style={{ color: organ.color }}>
        {organ.label} </div>
    ))} </div>
  );
}
