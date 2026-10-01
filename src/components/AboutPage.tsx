import React from 'react';
import { useLocalization } from '../context/LocalizationContext';

export const AboutPage: React.FC = () => {
  const { t } = useLocalization();

  return (
    <div className="w-full pt-18 sm:pt-28 pb-16 sm:pb-20 bg-[#fcf9f8] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 lg:px-12 space-y-10 sm:space-y-16">
        
        {/* Editorial Title */}
        <div className="max-w-3xl space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d9e2ff] text-[#0056c8] text-[10px] sm:text-[11px] font-bold uppercase tracking-widest">
            {t.aboutManifestoBadge}
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#1c1b1b] font-display">
            {t.aboutTitle}
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-[#424655] leading-relaxed">
            {t.aboutSubtitle}
          </p>
        </div>

        {/* Hero Visual Banner */}
        <div className="relative w-full h-[260px] sm:h-[400px] md:h-[500px] rounded-3xl overflow-hidden bg-gray-200 shadow-xl">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAWowrSlA6JW-bOmR_pj0gvXcorjQ_7aI3iNCFf7jmdqCQDBg-khevNpoLBI7X6Ts3vPd4HPeWhc_s2Xb-iKGaZUWTg_7sT5D8NrWq1oJnrr7NxM_p_bAdHavVsIS3jABtEQg6_ryElOl1UjZuSfPa59a2OG0hEQqCHiC04Py6B-rm4NNPqnr0rvPhqNm-blOABrruDCub3dvyWOdaA1-ZRNwwbsDsk0uJmOPe4zwX68p8awWkUKoLm"
            alt="ImmAdNgrh Atelier Studio in Portugal"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
          <div className="absolute bottom-5 sm:bottom-8 left-5 sm:left-8 right-5 sm:right-8 text-white max-w-xl space-y-1">
            <span className="text-[10px] sm:text-[11px] uppercase tracking-widest text-[#d9e2ff] font-bold block">
              {t.aboutHeroBadge}
            </span>
            <h3 className="text-lg sm:text-2xl font-bold font-display">{t.aboutHeroTitle}</h3>
          </div>
        </div>

        {/* 3 Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 pt-2 sm:pt-4">
          <div className="p-6 sm:p-8 rounded-2xl bg-white shadow-sm border border-gray-100 space-y-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#d9e2ff] text-[#0056c8] flex items-center justify-center font-bold text-base sm:text-lg font-display">
              01
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-[#1c1b1b] font-display">{t.pillar1Title}</h3>
            <p className="text-xs text-[#424655] leading-relaxed">
              {t.pillar1Desc}
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-2xl bg-white shadow-sm border border-gray-100 space-y-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#d9e2ff] text-[#0056c8] flex items-center justify-center font-bold text-base sm:text-lg font-display">
              02
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-[#1c1b1b] font-display">{t.pillar2Title}</h3>
            <p className="text-xs text-[#424655] leading-relaxed">
              {t.pillar2Desc}
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-2xl bg-white shadow-sm border border-gray-100 space-y-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#d9e2ff] text-[#0056c8] flex items-center justify-center font-bold text-base sm:text-lg font-display">
              03
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-[#1c1b1b] font-display">{t.pillar3Title}</h3>
            <p className="text-xs text-[#424655] leading-relaxed">
              {t.pillar3Desc}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
