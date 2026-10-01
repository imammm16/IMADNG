import React from 'react';
import { useLocalization } from '../context/LocalizationContext';

export const BrandManifesto: React.FC = () => {
  const { language } = useLocalization();
  const isId = language === 'id';

  return (
    <section className="w-full px-4 lg:px-12 py-16 sm:py-24 bg-[#fcf9f8] border-t border-black/[0.04]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Editorial Quote & Story */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2">
              <span className="w-8 h-[2px] bg-[#0056c8]" />
              <span className="text-xs uppercase tracking-widest text-[#0056c8] font-bold">
                {isId ? 'Manifesto Desain' : 'Design Manifesto'}
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-extrabold text-[#1c1b1b] tracking-tight font-display text-balance">
              {isId ? 'Melampaui Sekadar T-Shirt.' : 'More Than A T-Shirt.'}
            </h2>

            <blockquote className="text-lg md:text-xl text-[#1c1b1b] leading-relaxed font-normal italic border-l-2 border-[#0056c8] pl-5">
              {isId
                ? '“ImmAdNgrh. dibangun di atas gagasan bahwa pakaian sehari-hari adalah bentuk ekspresi arsitektural. Siluet bersih, presisi detail, dan bahasa visual berbobot menyatu menjadi karya yang hidup bersama pemakainya.”'
                : '“ImmAdNgrh. is built around the idea that everyday clothing can become a form of architectural expression. Clean silhouettes, thoughtful details, and a distinct visual language come together to create pieces made to be worn your way.”'}
            </blockquote>

            <div className="pt-2 flex items-center gap-4">
              <div>
                <span className="text-lg font-bold text-[#1c1b1b] block font-display">
                  Atelier ImmAdNgrh.
                </span>
                <span className="text-xs text-[#565d6b] font-medium">
                  {isId
                    ? 'Arah Desain & Rekayasa Tekstil Arsitektural'
                    : 'Design Direction & Sartorial Engineering'}
                </span>
              </div>
            </div>
          </div>

          {/* Right Cards with Apple-style subtle clean surfaces */}
          <div className="lg:col-span-5 flex flex-col gap-3.5">
            {/* Card 1 */}
            <div className="bg-white p-5 rounded-2xl flex items-center gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border border-black/[0.04]">
              <div className="w-12 h-12 rounded-2xl bg-[#d9e2ff] flex items-center justify-center text-[#0056c8] shrink-0">
                <span className="material-symbols-outlined text-[24px]">eco</span>
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-[#1c1b1b]">
                  {isId ? '100% Katun Organik Heavyweight' : '100% Organic Heavyweight Cotton'}
                </h3>
                <p className="text-xs text-[#565d6b] mt-0.5">
                  {isId
                    ? 'Sertifikasi GOTS, bebas serat sintetis plastik seumur hidup.'
                    : 'GOTS certified zero-synthetic single origin fibers.'}
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-5 rounded-2xl flex items-center gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border border-black/[0.04]">
              <div className="w-12 h-12 rounded-2xl bg-[#d9e2ff] flex items-center justify-center text-[#0056c8] shrink-0">
                <span className="material-symbols-outlined text-[24px]">verified</span>
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-[#1c1b1b]">
                  {isId ? 'Presisi Pengerjaan Tinggi' : 'Artisanal High Precision'}
                </h3>
                <p className="text-xs text-[#565d6b] mt-0.5">
                  {isId
                    ? 'Direkayasa dalam batch kecil dengan pengrajin penjahit ahli.'
                    : 'Precision engineered in small artisanal batch runs.'}
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-5 rounded-2xl flex items-center gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border border-black/[0.04]">
              <div className="w-12 h-12 rounded-2xl bg-[#d9e2ff] flex items-center justify-center text-[#0056c8] shrink-0">
                <span className="material-symbols-outlined text-[24px]">all_inclusive</span>
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-[#1c1b1b]">
                  {isId ? 'Pewarna Bio Ramah Lingkungan' : 'Carbon Neutral Footprint'}
                </h3>
                <p className="text-xs text-[#565d6b] mt-0.5">
                  {isId
                    ? 'Fasilitas bertenaga 100% terbarukan & pewarna zero-toxic.'
                    : '100% renewable energy weaving facility and zero-water dyes.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
