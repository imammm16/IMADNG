import React, { useState } from 'react';
import { Product } from '../types';
import { useLocalization } from '../context/LocalizationContext';
import editorialConceptImg from '../assets/images/editorial_page7_brutalist_concept_1790896982597.jpg';

interface EditorialShowcaseProps {
  signatureProduct: Product;
  onDiscover: (product: Product) => void;
}

export const EditorialShowcase: React.FC<EditorialShowcaseProps> = ({
  signatureProduct,
  onDiscover,
}) => {
  const { t } = useLocalization();
  const [showBlueprint, setShowBlueprint] = useState(false);

  return (
    <section className="w-full px-4 lg:px-12 py-8 sm:py-12" id="editorial">
      <div className="max-w-7xl mx-auto">
        <div className="relative w-full min-h-[460px] sm:min-h-[520px] lg:h-[640px] rounded-3xl overflow-hidden bg-[#e5e2e1] flex items-end p-4 sm:p-8 lg:p-12 shadow-xl group">
          {/* Background Architectural Photo with Smooth Parallax Zoom */}
          <img
            src={editorialConceptImg}
            alt="ImmAdNgrh Signature Tee in brutalist concrete architectural gallery"
            className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105"
          />

          {/* Gradient Scrim Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent pointer-events-none transition-opacity duration-700"></div>

          {/* Floating Liquid Glass Monolithic Overlay Card */}
          <div className="relative z-10 glass-card p-5 sm:p-8 lg:p-10 rounded-2xl max-w-xl text-[#1c1b1b] space-y-3 sm:space-y-4 border border-white/80 transition-all duration-500 hover:shadow-2xl">
            <div className="flex items-center gap-2 text-[#0056c8]">
              <span className="text-[10px] sm:text-[11px] uppercase tracking-widest text-[#424655] font-semibold">
                {t.limitedRun}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1c1b1b] tracking-tight font-display">
              {t.editorialTitle}
            </h2>

            <p className="text-xs sm:text-sm md:text-base text-[#424655] leading-relaxed font-normal">
              {t.editorialDesc}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onDiscover(signatureProduct)}
                className="px-6 py-3 rounded-full bg-[#0056c8] text-white font-semibold text-xs md:text-sm hover:bg-[#00429c] transition-all duration-300 shadow-[0_8px_20px_rgba(20,110,245,0.3)] btn-spring"
              >
                {t.discoverPiece}
              </button>
              
              <button
                onClick={() => setShowBlueprint(!showBlueprint)}
                className="px-5 py-3 rounded-full glass-pill text-[#1c1b1b] font-semibold text-xs md:text-sm hover:bg-white transition-all duration-300 flex items-center gap-1.5 btn-spring"
              >
                <span>{t.viewBlueprint}</span>
                <span
                  className={`material-symbols-outlined text-[16px] transition-transform duration-400 ease-out ${
                    showBlueprint ? 'rotate-180 text-[#0056c8]' : ''
                  }`}
                >
                  expand_more
                </span>
              </button>
            </div>

            {/* Construction Blueprint Accordion */}
            {showBlueprint && (
              <div className="pt-4 space-y-2 border-t border-black/10 animate-fade-in">
                <div className="grid grid-cols-2 gap-2 text-left">
                  <div className="p-2.5 rounded-xl bg-white/80 backdrop-blur-sm border border-white transition-all duration-300 hover:bg-white">
                    <span className="text-[10px] uppercase text-[#565d6b] font-bold block">
                      {t.originLabel}
                    </span>
                    <span className="text-xs font-bold text-[#1c1b1b]">
                      {t.originValue}
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/80 backdrop-blur-sm border border-white transition-all duration-300 hover:bg-white">
                    <span className="text-[10px] uppercase text-[#565d6b] font-bold block">
                      {t.collarDepthLabel}
                    </span>
                    <span className="text-xs font-bold text-[#1c1b1b]">
                      {t.collarDepthValue}
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/80 backdrop-blur-sm border border-white transition-all duration-300 hover:bg-white">
                    <span className="text-[10px] uppercase text-[#565d6b] font-bold block">
                      {t.yarnCountLabel}
                    </span>
                    <span className="text-xs font-bold text-[#1c1b1b]">
                      {t.yarnCountValue}
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/80 backdrop-blur-sm border border-white transition-all duration-300 hover:bg-white">
                    <span className="text-[10px] uppercase text-[#565d6b] font-bold block">
                      {t.colorFastnessLabel}
                    </span>
                    <span className="text-xs font-bold text-[#1c1b1b]">
                      {t.colorFastnessValue}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
