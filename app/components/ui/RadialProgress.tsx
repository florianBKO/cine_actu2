import React from 'react';

interface ValueProgress {
  vote_average: number;
}

function RadialProgress({ vote_average }: ValueProgress) {
  const percentage = Math.floor(vote_average * 10);

  const getColorClass = (value: number) => {
    if (value >= 75) return 'text-green-600 bg-green-100';
    if (value >= 50) return 'text-yellow-400 bg-warning/20';
    return 'text-error bg-error/20';
  };

  const getRingColor = (value: number) => {
    if (value >= 75) return '#089669';
    if (value >= 50) return '#f59e0b';
    return '#dc2626';
  };

  return (
    <div className="relative inline-flex">
      <div
        className={`radial-progress ${getColorClass(percentage)} border-2 font-bold`}
        style={{
          "--value": percentage,
          "--size": "2.6rem",
          "--thickness": "2px",
          "--progress-color": getRingColor(percentage),
        } as React.CSSProperties}
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div className="text-sm ">
          {percentage}
          <span className="text-[8px]">%</span>
        </div>
      </div>
      
      <div 
        className="absolute inset-0 rounded-full opacity-30"
        style={{
          background: `radial-gradient(circle at 30% 30%, white, transparent 50%)`
        }}
      />
      
      <div 
        className="absolute -inset-0.5 rounded-full opacity-20"
        style={{
          background: `radial-gradient(circle at center, ${getRingColor(percentage)}, transparent 70%)`
        }}
      />
    </div>
  );
}

export default RadialProgress;