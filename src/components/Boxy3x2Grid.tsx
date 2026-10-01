import React, { useState } from 'react';
import { Product } from '../types';
import { useLocalization } from '../context/LocalizationContext';

interface Boxy3x2GridProps {
  products: Product[];
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, size?: string) => boolean;
}

interface BoxyCardItem {
  id: string;
  num: string;
  name: string;
  sub: string;
  priceUsd: number;
  priceIdr: number;
  colorName: string;
  shirtBg: string;
  isEditorial?: boolean;
  productMatchId: string;
}

const DESIGN_DETAILS: Record<
  string,
  {
    conceptTitle: string;
    story: string;
  }
> = {
  'boxy-01': {
    conceptTitle: '01. VOID — Star Bipolar Geometry',
    story:
      'Terinspirasi dari titik nol kosmis dan bintang empat arah. Grafis bintang biner memancarkan aura futuristik di atas bahan katun murni 280G. Simbol ini melambangkan identitas diri yang fokus dan tak tergoyahkan.',
  },
  'boxy-02': {
    conceptTitle: '02. ASCEND — Architectural Apex',
    story:
      'Konsep "Ascend" melambangkan pencapaian puncak dan presisi simetri piramida. Grafis piramida geometris minimalis di atas bahan Pure White yang bersih dan bercahaya.',
  },
  'boxy-03': {
    conceptTitle: '03. FLOW — Editorial Look 09',
    story:
      'Filosofi "Movement creates meaning" mengusung kebebasan ekspresi tanpa batas. Edisi editorial terbatas rilis FW23.2 dengan estetika obsidian monokromatis.',
  },
  'boxy-04': {
    conceptTitle: '04. GLITCH — Chrome Orbit Distortion',
    story:
      'Terinspirasi dari distorsi gelombang sinyal digital dan permukaan kromium cair. Motif orbit cincin cermin perak memantulkan dinamika gaya hidup urban.',
  },
  'boxy-05': {
    conceptTitle: '05. HORIZON — Skyline Blueprint',
    story:
      'Konsep "Horizon" terinspirasi dari siluet cakrawala metropolis dan arsitektur pencakar langit. Menggunakan palet Ice Blue yang sejuk dan menenangkan.',
  },
  'boxy-06': {
    conceptTitle: '06. NATURE — Botanical Symmetry',
    story:
      'Menggabungkan simetri organik empat kelopak bunga dengan estetika fungsional streetwear modern. Nuansa Onyx gelap yang anggun dan berkarakter.',
  },
};

export const Boxy3x2Grid: React.FC<Boxy3x2GridProps> = ({
  products,
  onQuickView,
  onAddToCart,
}) => {
  const { formatPrice, language } = useLocalization();
  const isEn = language === 'en';
  const [selectedItem, setSelectedItem] = useState<BoxyCardItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalAnimating, setIsModalAnimating] = useState(false);

  const items: BoxyCardItem[] = [
    {
      id: 'boxy-01',
      num: '01',
      name: 'Void',
      sub: 'Boxy Tee',
      priceUsd: 68,
      priceIdr: 215000,
      colorName: 'Black',
      shirtBg: 'bg-[#141518]',
      productMatchId: 'tee-02',
    },
    {
      id: 'boxy-02',
      num: '02',
      name: 'Ascend',
      sub: 'Boxy Tee',
      priceUsd: 68,
      priceIdr: 215000,
      colorName: 'White',
      shirtBg: 'bg-white border border-[#CBD2D8]',
      productMatchId: 'tee-01',
    },
    {
      id: 'boxy-03',
      num: '03',
      name: 'Flow',
      sub: 'Editorial Ed.',
      priceUsd: 74,
      priceIdr: 245000,
      colorName: 'Series 23',
      shirtBg: 'bg-[#111215]',
      isEditorial: true,
      productMatchId: 'tee-03',
    },
    {
      id: 'boxy-04',
      num: '04',
      name: 'Glitch',
      sub: 'Boxy Tee',
      priceUsd: 72,
      priceIdr: 235000,
      colorName: 'Chrome',
      shirtBg: 'bg-[#23262B]',
      productMatchId: 'tee-04',
    },
    {
      id: 'boxy-05',
      num: '05',
      name: 'Horizon',
      sub: 'Boxy Tee',
      priceUsd: 70,
      priceIdr: 225000,
      colorName: 'Ice Blue',
      shirtBg: 'bg-[#B5C4D0]',
      productMatchId: 'tee-05',
    },
    {
      id: 'boxy-06',
      num: '06',
      name: 'Nature',
      sub: 'Boxy Tee',
      priceUsd: 72,
      priceIdr: 235000,
      colorName: 'Onyx',
      shirtBg: 'bg-[#1E2024]',
      productMatchId: 'tee-06',
    },
  ];

  const handleCardClick = (item: BoxyCardItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
    requestAnimationFrame(() => {
      setIsModalAnimating(true);
    });
  };

  const handleCloseModal = () => {
    setIsModalAnimating(false);
    setTimeout(() => {
      setIsModalOpen(false);
      setSelectedItem(null);
    }, 200);
  };

  const currentDetails = selectedItem
    ? DESIGN_DETAILS[selectedItem.id] || DESIGN_DETAILS['boxy-01']
    : null;

  return (
    <section className="max-w-7xl mx-auto px-3 sm:px-6 md:px-8 py-4 select-none">
      {/* Clean Header */}
      <div className="flex items-center justify-between mb-4 px-1">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-[#1c1b1b] tracking-tight">
            {isEn ? 'Signature Boxy Collection' : 'Katalog Siluet Boxy 3x2'}
          </h2>
          <p className="text-xs text-[#565d6b] mt-0.5 font-medium">
            {isEn
              ? 'Click any card to inspect design concept.'
              : 'Klik kartu untuk melihat cerita konsep desain.'}
          </p>
        </div>
        <span className="text-xs font-mono font-bold text-[#1c1b1b] bg-white px-3 py-1 rounded-full border border-black/10">
          6 ITEMS
        </span>
      </div>

      {/* 3x2 Product Grid Container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4.5 p-3 sm:p-4 bg-white rounded-2xl md:rounded-3xl border border-black/10">
        {items.map((item) => {
          if (item.isEditorial) {
            return (
              <article
                key={item.id}
                onClick={() => handleCardClick(item)}
                className="bg-[#111215] text-white border border-stone-800 rounded-2xl relative overflow-hidden flex flex-col justify-between cursor-pointer hover:border-stone-500 transition-colors duration-200 touch-manipulation group"
              >
                {/* Header */}
                <div className="p-3 border-b border-stone-800 bg-stone-900/90 flex items-start justify-between">
                  <div className="truncate pr-2">
                    <h3 className="text-sm sm:text-base font-bold tracking-tight text-white leading-tight truncate">
                      {item.num}. {item.name}
                    </h3>
                    <p className="text-xs font-medium text-zinc-400 truncate leading-tight mt-0.5">
                      {item.sub}
                    </p>
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-white whitespace-nowrap">
                    {formatPrice(item.priceIdr)}
                  </span>
                </div>

                {/* Editorial Silhouette Area */}
                <div className="relative bg-gradient-to-b from-stone-900 via-neutral-900 to-black h-56 sm:h-64 aspect-[3/4] flex flex-col items-center justify-center p-4 text-center overflow-hidden">
                  <div className="relative z-10 w-full px-2">
                    <div className="w-8 h-[2px] bg-white/70 mx-auto mb-3"></div>
                    <p className="font-sans font-medium text-xs sm:text-sm leading-relaxed text-white tracking-tight italic">
                      &quot;Movement creates meaning.&quot;
                    </p>
                    <span className="inline-block mt-3 text-xs uppercase font-sans tracking-widest text-zinc-200 bg-white/10 px-3 py-1 rounded-md border border-white/15 font-semibold">
                      LOOK 09
                    </span>
                  </div>
                </div>

                {/* Clean Action Footer */}
                <div className="p-3 border-t border-stone-800 bg-stone-950 flex items-center justify-between">
                  <span className="text-xs font-semibold text-zinc-400 truncate">
                    {item.colorName}
                  </span>
                  <span className="text-xs text-zinc-400 font-medium">
                    {isEn ? 'Tap to Inspect' : 'Klik Detail'}
                  </span>
                </div>
              </article>
            );
          }

          return (
            <article
              key={item.id}
              onClick={() => handleCardClick(item)}
              className="bg-[#F0F2F4] border border-black/15 rounded-2xl relative overflow-hidden flex flex-col justify-between cursor-pointer hover:border-[#0056c8] transition-colors duration-200 touch-manipulation group"
            >
              {/* Header */}
              <div className="p-3 border-b border-black/10 bg-white flex items-start justify-between">
                <div className="truncate pr-2">
                  <h3 className="text-sm sm:text-base font-bold tracking-tight text-[#1c1b1b] leading-tight truncate">
                    {item.num}. {item.name}
                  </h3>
                  <p className="text-xs font-medium text-[#636a73] truncate leading-tight mt-0.5">
                    {item.sub}
                  </p>
                </div>
                <span className="text-xs sm:text-sm font-bold text-[#1c1b1b] whitespace-nowrap">
                  {formatPrice(item.priceIdr)}
                </span>
              </div>

              {/* Tee Graphic Area */}
              <div className="relative bg-[#ECEEF0] h-56 sm:h-64 aspect-[3/4] flex items-center justify-center p-3 overflow-hidden">
                {/* Tee Box Outline */}
                <div
                  className={`relative z-10 w-28 h-36 sm:w-32 sm:h-40 ${item.shirtBg} rounded-sm flex flex-col items-center pt-3.5 px-1.5 text-center transition-transform duration-200 group-hover:scale-102`}
                >
                  <div
                    className={`w-8 h-2 border-b ${
                      item.name === 'Ascend' ? 'border-slate-300' : 'border-stone-700'
                    } rounded-b-full mb-2.5`}
                  ></div>

                  {/* Graphic Icon SVG per shirt */}
                  <div className="relative flex items-center justify-center my-auto">
                    {item.name === 'Void' && (
                      <svg
                        className="w-10 h-10 text-white"
                        fill="currentColor"
                        viewBox="0 0 100 100"
                      >
                        <path d="M50 0 L53 45 L98 50 L53 55 L50 100 L47 55 L2 50 L47 45 Z"></path>
                        <circle cx="50" cy="50" fill="#000" r="1.5"></circle>
                      </svg>
                    )}

                    {item.name === 'Ascend' && (
                      <svg
                        className="w-10 h-10 text-zinc-900"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 100 80"
                      >
                        <polygon
                          fill="#f1f3f5"
                          points="50,15 75,65 25,65"
                          strokeWidth="1.5"
                        ></polygon>
                        <polygon
                          fill="#e9ecef"
                          points="65,30 85,65 45,65"
                          strokeWidth="1"
                        ></polygon>
                        <polygon
                          fill="#e9ecef"
                          points="35,35 55,65 15,65"
                          strokeWidth="1"
                        ></polygon>
                        <path
                          d="M50 5 L51 12 L58 13 L51 14 L50 21 L49 14 L42 13 L49 12 Z"
                          fill="#000"
                        ></path>
                      </svg>
                    )}

                    {item.name === 'Glitch' && (
                      <svg className="w-10 h-10 text-zinc-300" fill="none" viewBox="0 0 100 100">
                        <ellipse
                          cx="50"
                          cy="50"
                          rx="35"
                          ry="20"
                          stroke="url(#chrome-gradient-compact)"
                          strokeWidth="7"
                          transform="rotate(-25 50 50)"
                        ></ellipse>
                        <ellipse
                          cx="50"
                          cy="50"
                          rx="22"
                          ry="12"
                          stroke="white"
                          strokeDasharray="3 2"
                          strokeWidth="2"
                          transform="rotate(-25 50 50)"
                        ></ellipse>
                        <defs>
                          <linearGradient
                            id="chrome-gradient-compact"
                            x1="0%"
                            x2="100%"
                            y1="0%"
                            y2="100%"
                          >
                            <stop offset="0%" stopColor="#ffffff"></stop>
                            <stop offset="40%" stopColor="#8892b0"></stop>
                            <stop offset="70%" stopColor="#ffffff"></stop>
                            <stop offset="100%" stopColor="#2d3748"></stop>
                          </linearGradient>
                        </defs>
                      </svg>
                    )}

                    {item.name === 'Horizon' && (
                      <svg
                        className="w-10 h-9 text-slate-800"
                        fill="currentColor"
                        viewBox="0 0 100 70"
                      >
                        <rect height="35" width="8" x="12" y="32"></rect>
                        <rect height="45" width="10" x="24" y="22"></rect>
                        <polygon points="38,15 40,5 42,15 45,67 35,67"></polygon>
                        <rect height="40" width="12" x="48" y="27"></rect>
                        <polygon points="65,10 67,2 69,10 72,67 63,67"></polygon>
                        <rect height="32" width="9" x="75" y="35"></rect>
                      </svg>
                    )}

                    {item.name === 'Nature' && (
                      <svg
                        className="w-10 h-10 text-zinc-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 100 100"
                      >
                        <circle cx="50" cy="50" r="8" strokeWidth="1.5"></circle>
                        <path d="M50 22 C58 35 58 40 50 50 C42 40 42 35 50 22 Z" strokeWidth="1.2"></path>
                        <path d="M50 78 C58 65 58 60 50 50 C42 60 42 65 50 78 Z" strokeWidth="1.2"></path>
                        <path d="M22 50 C35 42 40 42 50 50 C40 58 35 58 22 50 Z" strokeWidth="1.2"></path>
                        <path d="M78 50 C65 42 60 42 50 50 C60 58 65 58 78 50 Z" strokeWidth="1.2"></path>
                      </svg>
                    )}
                  </div>

                  <div
                    className={`mt-auto mb-1.5 text-[8px] font-sans tracking-widest uppercase font-bold ${
                      item.name === 'Ascend' ? 'text-zinc-800' : 'text-zinc-400'
                    }`}
                  >
                    {item.name === 'Void' ? 'BØXY' : item.name.toUpperCase()}
                  </div>
                </div>
              </div>

              {/* Clean Action Footer */}
              <div className="p-3 border-t border-black/10 bg-white flex items-center justify-between">
                <span className="text-xs font-semibold text-[#565d6b] truncate">
                  {item.colorName}
                </span>
                <span className="text-xs text-[#0056c8] font-medium">
                  {isEn ? 'Tap to Inspect' : 'Klik Detail'}
                </span>
              </div>
            </article>
          );
        })}
      </div>

      {/* ================= MODAL: PURE FLAT OVERLAY (NO BLUR, NO SHADOW GLITCH) ================= */}
      {isModalOpen && selectedItem && currentDetails && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 transition-opacity duration-200 ${
            isModalAnimating ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onClick={handleCloseModal}
        >
          <div
            className={`bg-white rounded-3xl p-5 sm:p-7 max-w-lg w-full border border-gray-200 space-y-4 max-h-[90vh] overflow-y-auto transform transition-all duration-200 ease-out ${
              isModalAnimating
                ? 'opacity-100 scale-100 translate-y-0'
                : 'opacity-0 scale-95 translate-y-2'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-lg sm:text-xl font-bold font-display text-[#1c1b1b]">
                {selectedItem.num}. {selectedItem.name} ({selectedItem.sub})
              </h3>
              <button
                type="button"
                onClick={handleCloseModal}
                className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-700 transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Shirt Graphic Preview Box */}
            <div className="p-5 bg-[#ECEEF0] rounded-2xl border border-gray-200 flex flex-col items-center justify-center relative overflow-hidden">
              <div
                className={`w-36 h-44 ${selectedItem.shirtBg} rounded-md flex flex-col items-center pt-4 px-2 text-center relative`}
              >
                <div
                  className={`w-10 h-2 border-b ${
                    selectedItem.name === 'Ascend'
                      ? 'border-slate-300'
                      : 'border-stone-700'
                  } rounded-b-full mb-3`}
                ></div>

                <div className="my-auto flex items-center justify-center">
                  {selectedItem.name === 'Void' && (
                    <svg
                      className="w-14 h-14 text-white"
                      fill="currentColor"
                      viewBox="0 0 100 100"
                    >
                      <path d="M50 0 L53 45 L98 50 L53 55 L50 100 L47 55 L2 50 L47 45 Z"></path>
                    </svg>
                  )}
                  {selectedItem.name === 'Ascend' && (
                    <svg
                      className="w-14 h-14 text-zinc-900"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 100 80"
                    >
                      <polygon
                        fill="#f1f3f5"
                        points="50,15 75,65 25,65"
                        strokeWidth="2"
                      ></polygon>
                      <path
                        d="M50 5 L51 12 L58 13 L51 14 L50 21 L49 14 L42 13 L49 12 Z"
                        fill="#000"
                      ></path>
                    </svg>
                  )}
                  {selectedItem.name === 'Flow' && (
                    <div className="text-white text-xs italic font-medium px-1">
                      &quot;Movement creates meaning.&quot;
                    </div>
                  )}
                  {selectedItem.name === 'Glitch' && (
                    <svg
                      className="w-14 h-14 text-zinc-200"
                      fill="none"
                      viewBox="0 0 100 100"
                    >
                      <ellipse
                        cx="50"
                        cy="50"
                        rx="35"
                        ry="20"
                        stroke="white"
                        strokeWidth="6"
                        transform="rotate(-25 50 50)"
                      ></ellipse>
                    </svg>
                  )}
                  {selectedItem.name === 'Horizon' && (
                    <svg
                      className="w-14 h-12 text-slate-800"
                      fill="currentColor"
                      viewBox="0 0 100 70"
                    >
                      <rect height="35" width="8" x="12" y="32"></rect>
                      <rect height="45" width="10" x="24" y="22"></rect>
                      <rect height="40" width="12" x="48" y="27"></rect>
                      <rect height="32" width="9" x="75" y="35"></rect>
                    </svg>
                  )}
                  {selectedItem.name === 'Nature' && (
                    <svg
                      className="w-14 h-14 text-zinc-200"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 100 100"
                    >
                      <circle cx="50" cy="50" r="10" strokeWidth="2"></circle>
                      <path
                        d="M50 22 C58 35 58 40 50 50 C42 40 42 35 50 22 Z"
                        strokeWidth="1.5"
                      ></path>
                    </svg>
                  )}
                </div>

                <span className="mt-auto mb-2 text-[10px] font-bold tracking-widest text-zinc-400 uppercase">
                  {selectedItem.name}
                </span>
              </div>
            </div>

            {/* Filosofi & Konsep Desain */}
            <div className="p-4 bg-blue-50/70 border border-blue-100 rounded-2xl space-y-1.5 text-xs text-gray-700 leading-relaxed">
              <h4 className="font-bold text-sm text-[#001945]">
                {currentDetails.conceptTitle}
              </h4>
              <p className="text-gray-700 mt-1">{currentDetails.story}</p>
            </div>

            {/* Modal Actions */}
            <div className="pt-2 border-t border-gray-100">
              <button
                type="button"
                onClick={handleCloseModal}
                className="w-full py-3 rounded-xl bg-[#1c1b1b] hover:bg-black text-white text-xs font-bold transition-colors"
              >
                {isEn ? 'Close Window' : 'Tutup Jendela'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
