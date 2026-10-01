import React, { useEffect, useState } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [stage, setStage] = useState<'enter' | 'visible' | 'exit'>('enter');

  useEffect(() => {
    // Stage 1: Fade in logo (0ms -> 300ms)
    const timer1 = setTimeout(() => {
      setStage('visible');
    }, 300);

    // Stage 2: Hold logo, then trigger fade out (1800ms)
    const timer2 = setTimeout(() => {
      setStage('exit');
    }, 1800);

    // Stage 3: Complete animation (2400ms)
    const timer3 = setTimeout(() => {
      onComplete();
    }, 2400);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white select-none overflow-hidden">
      {/* Center Animated Logo Container - ONLY ImmAdNgrh */}
      <div
        className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] transform ${
          stage === 'enter'
            ? 'opacity-0 scale-95'
            : stage === 'visible'
            ? 'opacity-100 scale-100'
            : 'opacity-0 scale-105'
        }`}
      >
        <h1 className="text-5xl sm:text-7xl md:text-8xl font-black font-display tracking-tight text-[#1c1b1b]">
          ImmAdNgrh<span className="text-[#0056c8]">.</span>
        </h1>
      </div>
    </div>
  );
};
