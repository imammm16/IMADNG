import React from 'react';
import { Product } from '../types';
import { useLocalization } from '../context/LocalizationContext';
import heroStudioTeeImg from '../assets/images/hero_boxy_studio_tee_1790896784209.jpg';

interface HeroSectionProps {
  heroProduct: Product;
  onShopClick: () => void;
  onQuickView: (product: Product) => void;
  onExploreCut: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  heroProduct,
  onShopClick,
  onQuickView,
  onExploreCut,
}) => {
  const { formatPrice, t } = useLocalization();

  return (
    <section className="relative w-full overflow-hidden px-4 lg:px-12 pt-20 sm:pt-24 md:pt-28 pb-10 sm:pb-16">
      {/* Ambient Radial Backlight Glow */}
      <div className="absolute inset-0 pointer-events-none spec-radial-glow"></div>
      <div className="absolute -top-16 sm:-top-24 left-1/2 -translate-x-1/2 w-[300px] sm:w-[500px] md:w-[700px] h-[300px] sm:h-[500px] md:h-[700px] bg-[#d9e2ff]/40 rounded-full blur-[80px] sm:blur-[120px] pointer-events-none -z-10 animate-pulse-glow"></div>

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center">
        {/* Hero Typography */}
        <div className="text-center max-w-4xl animate-scale-in">
          <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-[#1c1b1b] tracking-tight font-display leading-[1.02] sm:leading-[0.98]">
            {t.heroHeading}
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-[#424655] max-w-xl mx-auto font-normal leading-normal sm:leading-snug mt-1.5 sm:mt-2">
            {t.heroSubheading}
          </p>
        </div>

        {/* Action Button Group */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-6 sm:mt-8 mb-8 sm:mb-12 w-full sm:w-auto px-4 sm:px-0">
          <button
            onClick={onShopClick}
            className="w-full sm:w-auto group relative px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-[#146ef5] text-white font-semibold text-xs sm:text-sm shadow-[0_12px_28px_-6px_rgba(20,110,245,0.45)] hover:bg-[#0056c8] transition-all duration-300 ease-out hover:shadow-[0_18px_40px_-6px_rgba(20,110,245,0.6)] btn-spring flex items-center justify-center gap-2"
          >
            <span>{t.shopCollection}</span>
            <span className="material-symbols-outlined text-[16px] sm:text-[18px] transition-transform duration-300 group-hover:translate-x-1.5">
              arrow_forward
            </span>
          </button>
          
          <button
            onClick={onExploreCut}
            className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 rounded-full glass-pill text-[#1c1b1b] font-semibold text-xs sm:text-sm hover:bg-white hover:shadow-md transition-all duration-300 ease-out btn-spring flex items-center justify-center"
          >
            {t.exploreCut}
          </button>
        </div>

        {/* Centerpiece Floating Garment Composition */}
        <div className="relative w-full max-w-3xl flex justify-center items-center mt-1 sm:mt-2">
          {/* Main Floating White Tee */}
          <div
            onClick={() => onQuickView(heroProduct)}
            className="relative z-20 w-full max-w-xl mx-auto flex justify-center cursor-pointer group"
          >
            <div className="animate-drift transition-transform duration-700 ease-out group-hover:scale-[1.03]">
              <div className="rounded-[32px] sm:rounded-[40px] md:rounded-[48px] overflow-hidden shadow-[0_24px_50px_-12px_rgba(20,110,245,0.18),0_12px_32px_rgba(0,0,0,0.08)] border border-black/[0.06] bg-white/70 backdrop-blur-md p-3 sm:p-4 transition-all duration-500 group-hover:shadow-[0_32px_60px_-12px_rgba(20,110,245,0.25)]">
                <img
                  src={heroStudioTeeImg}
                  alt="ImmAdNgrh. Essential Pure White Studio Boxy Tee"
                  className="w-full h-auto max-h-[300px] sm:max-h-[420px] md:max-h-[500px] object-cover rounded-[24px] sm:rounded-[32px] md:rounded-[40px] shadow-sm transition-all duration-700"
                />
              </div>
            </div>
          </div>

          {/* Left Spec Badge (Liquid Glass) */}
          <div className="hidden lg:flex flex-col absolute left-2 top-1/4 z-30 glass-card px-5 py-4 rounded-2xl max-w-[210px] space-y-1.5 transform -rotate-1 border border-white/80 animate-float-badge hover:scale-105 transition-transform duration-300">
            <div className="flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-wider text-[#0056c8] font-bold">
                {t.garmentSpec}
              </span>
              <span className="material-symbols-outlined text-[#0056c8] text-[16px]">
                architecture
              </span>
            </div>
            <p className="text-sm text-[#1c1b1b] font-bold leading-snug">
              320 GSM French Terry
            </p>
            <p className="text-[10px] uppercase tracking-wider text-[#565d6b]">
              {t.silhouetteDesc}
            </p>
            <div className="pt-1 flex items-center gap-1.5 text-[#424655] text-xs font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0057c2]"></span>
              <span>{t.doubleMercerized}</span>
            </div>
          </div>

          {/* Right Price/Edition Badge (Liquid Glass) */}
          <div className="hidden lg:flex flex-col absolute right-2 bottom-12 z-30 glass-card px-5 py-4 rounded-2xl max-w-[220px] space-y-1.5 transform rotate-2 border border-white/80 hover:scale-105 transition-transform duration-300">
            <div className="flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-wider text-[#424655] font-semibold">
                {t.edition}
              </span>
              <span className="text-[10px] text-[#0056c8] bg-[#d9e2ff] px-2 py-0.5 rounded-full font-bold">
                Atelier
              </span>
            </div>
            <p className="text-sm text-[#1c1b1b] font-bold leading-tight">
              {heroProduct.name}
            </p>
            <div className="flex items-center gap-2 pt-1">
              <span className="text-[#1c1b1b] text-2xl font-bold font-display">
                {formatPrice(heroProduct.price)}
              </span>
              <span className="text-[10px] text-[#565d6b] uppercase tracking-wider font-semibold">
                {t.taxIncluded}
              </span>
            </div>
          </div>
        </div>

        {/* Quick Metrics Strip */}
        <div className="w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-black/5">
          <div className="flex flex-col items-center text-center p-2 sm:p-3 transition-transform duration-300 hover:scale-105">
            <span className="text-xl sm:text-2xl md:text-3xl font-bold text-[#1c1b1b] font-display">
              320g
            </span>
            <span className="text-[10px] sm:text-xs text-[#424655] mt-0.5 sm:mt-1 font-medium">{t.metricDensity}</span>
          </div>
          <div className="flex flex-col items-center text-center p-2 sm:p-3 transition-transform duration-300 hover:scale-105">
            <span className="text-xl sm:text-2xl md:text-3xl font-bold text-[#1c1b1b] font-display">
              Zero
            </span>
            <span className="text-[10px] sm:text-xs text-[#424655] mt-0.5 sm:mt-1 font-medium">{t.metricStitches}</span>
          </div>
          <div className="flex flex-col items-center text-center p-2 sm:p-3 transition-transform duration-300 hover:scale-105">
            <span className="text-xl sm:text-2xl md:text-3xl font-bold text-[#1c1b1b] font-display">
              100%
            </span>
            <span className="text-[10px] sm:text-xs text-[#424655] mt-0.5 sm:mt-1 font-medium">{t.metricCotton}</span>
          </div>
          <div className="flex flex-col items-center text-center p-2 sm:p-3 transition-transform duration-300 hover:scale-105">
            <span className="text-xl sm:text-2xl md:text-3xl font-bold text-[#1c1b1b] font-display">
              Porto
            </span>
            <span className="text-[10px] sm:text-xs text-[#424655] mt-0.5 sm:mt-1 font-medium">{t.metricAssembly}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
