import React, { useState } from 'react';
import { useLocalization } from '../context/LocalizationContext';
import { Product } from '../types';

interface RunwayLookbookProps {
  products: Product[];
  onQuickView: (product: Product) => void;
  onExploreShop: () => void;
}

export const RunwayLookbook: React.FC<RunwayLookbookProps> = ({
  products,
  onQuickView,
  onExploreShop,
}) => {
  const { language, formatPrice } = useLocalization();
  const isId = language === 'id';
  const featuredProduct = products.find((p) => p.id === 'tee-02') || products[0];

  const [activeHotspot, setActiveHotspot] = useState<'tee' | 'pant' | null>('tee');

  return (
    <section className="w-full px-4 lg:px-12 py-16 sm:py-24 bg-[#121212] text-white overflow-hidden relative">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-10 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
          <div className="space-y-2 max-w-xl">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display tracking-tight text-balance">
              {isId ? 'Siluet Monolith Dalam Ruang Nyata.' : 'The Monolith In Real Space.'}
            </h2>
            <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
              {isId
                ? 'Sentuhan arsitektur brutalist berpadu dengan keanggunan kain katun berat yang jatuh natural tanpa kompromi.'
                : 'Brutalist architectural forms harmonize with heavyweight drape that moves with effortless poise.'}
            </p>
          </div>

          <div className="self-start md:self-auto flex items-center gap-3">
            <button
              onClick={() => onQuickView(featuredProduct)}
              className="px-6 py-3 rounded-full bg-white text-[#1c1b1b] text-xs font-semibold hover:bg-gray-100 transition-all shadow-md btn-spring flex items-center gap-1.5"
            >
              <span>{isId ? 'Beli Tampilan Ini' : 'Shop This Look'}</span>
              <span className="material-symbols-outlined text-[16px]">shopping_bag</span>
            </button>
          </div>
        </div>

        {/* Editorial Photo Showcase with Floating Interactive Pins */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Visual Look Canvas */}
          <div className="lg:col-span-8 relative rounded-3xl overflow-hidden bg-black/40 min-h-[460px] sm:min-h-[580px] shadow-2xl border border-white/10 group">
            <img
              src="/src/assets/images/runway_look_editorial_1790336620676.jpg"
              alt="ImmAdNgrh Runway Editorial Look"
              className="w-full h-full object-cover object-top transition-transform duration-1000 ease-out group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            {/* Subtle Gradient Scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

            {/* Hotspot 1: The Heavyweight Tee */}
            <div
              style={{ left: '52%', top: '34%' }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
            >
              <button
                onClick={() => setActiveHotspot(activeHotspot === 'tee' ? null : 'tee')}
                aria-label="Atelier Signature Tee"
                className="relative flex items-center justify-center group focus:outline-none"
              >
                <span className="absolute w-8 h-8 rounded-full bg-white/40 animate-ping" />
                <div className="w-7 h-7 rounded-full bg-white text-[#1c1b1b] flex items-center justify-center shadow-lg font-bold text-xs transition-transform duration-300 hover:scale-110">
                  +
                </div>
              </button>

              {activeHotspot === 'tee' && (
                <div
                  onClick={() => onQuickView(featuredProduct)}
                  className="absolute left-10 -top-6 w-60 p-3 rounded-2xl bg-white/95 backdrop-blur-xl text-[#1c1b1b] shadow-2xl border border-white/60 animate-scale-in cursor-pointer hover:bg-white transition-colors"
                >
                  <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-[#0056c8]">
                    <span>Atelier Spec</span>
                    <span>320 GSM</span>
                  </div>
                  <h4 className="text-xs font-bold text-[#1c1b1b] mt-0.5">
                    {featuredProduct.name}
                  </h4>
                  <div className="flex items-center justify-between pt-1.5 mt-1.5 border-t border-black/10">
                    <span className="text-xs font-mono font-bold text-[#1c1b1b]">
                      {formatPrice(featuredProduct.price)}
                    </span>
                    <span className="text-[10px] font-semibold text-[#0056c8] flex items-center">
                      {isId ? 'Lihat Detail' : 'Quick View'} →
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Photo Caption */}
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs sm:text-sm font-semibold text-white tracking-normal">
              <span>SERIES_01</span>
              <span>ATELIER SPEC</span>
            </div>
          </div>

          {/* Right Editorial Story & Styling Notes */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 rounded-3xl bg-white/[0.04] border border-white/10 space-y-4">
              <h3 className="text-xl font-bold font-display text-white">
                {isId
                  ? 'Keseimbangan Antara Bobot & Jatuhnya Bahan'
                  : 'An Architectural Equilibrium of Weight & Drape'}
              </h3>

              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                {isId
                  ? 'Kain 320 GSM French Terry memberikan volume struktural tanpa membuat pemakainya terasa kaku. Garis leher tegak 3.2cm membingkai wajah dengan presisi geometri minimalis.'
                  : 'The 320 GSM French Terry provides structural volume without feeling rigid. The 3.2cm collar frames the neck with austere minimalist geometry.'}
              </p>

              <div className="pt-3 border-t border-white/10 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400">{isId ? 'Potongan Tubuh:' : 'Garment Silhouette:'}</span>
                  <span className="font-semibold text-white">Anatomical Boxy</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400">{isId ? 'Sertifikasi Asal:' : 'Origin Certification:'}</span>
                  <span className="font-semibold text-white">100% GOTS Certified</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400">{isId ? 'Toleransi Susut:' : 'Shrinkage Tolerance:'}</span>
                  <span className="font-semibold text-emerald-400 font-mono">0.0%</span>
                </div>
              </div>
            </div>

            <button
              onClick={onExploreShop}
              className="w-full py-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-semibold text-white transition-all btn-spring flex items-center justify-center gap-2"
            >
              <span>{isId ? 'Jelajahi Seluruh Koleksi Toko' : 'Explore Complete Collection'}</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
