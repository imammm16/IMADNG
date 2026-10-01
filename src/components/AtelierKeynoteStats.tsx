import React from 'react';
import { useLocalization } from '../context/LocalizationContext';

export const AtelierKeynoteStats: React.FC = () => {
  const { language } = useLocalization();
  const isId = language === 'id';

  const stats = [
    {
      value: '360',
      unit: 'GSM',
      labelId: 'Densitas Tertinggi',
      labelEn: 'Peak Weave Density',
      descId: 'Katun sisir murni Prancis berbobot masif yang tahan benturan bentuk.',
      descEn: 'Heavyweight organic combed cotton holding permanent structural presence.',
    },
    {
      value: '0.0',
      unit: '%',
      labelId: 'Penyusutan Pasca Beli',
      labelEn: 'Post-Wash Shrinkage',
      descId: 'Distabilkan melalui closed-loop bio-wash tanpa penyusutan seumur hidup.',
      descEn: 'Permanently locked dimension through eco bio-enzyme cold wash.',
    },
    {
      value: '12',
      unit: '°',
      labelId: 'Sudut Pitch Bahu',
      labelEn: 'Shoulder Pitch Bias',
      descId: 'Garis bahu dimajukan 12° mengikuti kurvatur rangka alami manusia.',
      descEn: 'Forward-pitched shoulder seams mapped to natural human clavicle geometry.',
    },
    {
      value: '250',
      unit: 'PCS',
      labelId: 'Alokasi per Batch',
      labelEn: 'Numbered Micro-Batch',
      descId: 'Dibatasi secara ketat dan ditandai nomor seri unik pada setiap garmen.',
      descEn: 'Strictly capped allocation batch hand-finished with unique serials.',
    },
  ];

  return (
    <section className="w-full px-4 lg:px-12 py-16 sm:py-20 bg-white border-t border-b border-black/[0.04]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 divide-y sm:divide-y-0 sm:divide-x divide-black/[0.06]">
          {stats.map((st, idx) => (
            <div
              key={idx}
              className={`space-y-2 ${idx > 0 ? 'pt-6 sm:pt-0 sm:pl-6 lg:pl-10' : ''}`}
            >
              <div className="flex items-baseline gap-1 text-[#1c1b1b]">
                <span className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display tracking-tight text-[#1c1b1b]">
                  {st.value}
                </span>
                <span className="text-sm sm:text-base font-bold font-display text-[#0056c8]">
                  {st.unit}
                </span>
              </div>

              <h4 className="text-xs sm:text-sm font-bold text-[#1c1b1b]">
                {isId ? st.labelId : st.labelEn}
              </h4>

              <p className="text-[11px] sm:text-xs text-[#565d6b] leading-relaxed">
                {isId ? st.descId : st.descEn}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
