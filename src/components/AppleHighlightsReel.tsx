import React, { useState, useEffect } from 'react';
import { useLocalization } from '../context/LocalizationContext';
import { Product } from '../types';

interface HighlightSlide {
  id: string;
  taglineId: string;
  taglineEn: string;
  headlineId: string;
  headlineEn: string;
  descId: string;
  descEn: string;
  image: string;
  targetProductId: string;
}

const HIGHLIGHT_SLIDES: HighlightSlide[] = [
  {
    id: 'slide-1',
    taglineId: 'Inovasi Tekstil Baru',
    taglineEn: 'New Textile Benchmark',
    headlineId: '360 GSM. Kerapatan yang Nyata Terasa.',
    headlineEn: '360 GSM. Density You Can Feel.',
    descId: 'Empat warna netral arsitektural di atas katun organik sisir murni. Tidak tembus cahaya, tidak kusut, dan tegak seimbang.',
    descEn: 'Four architectural neutral tones on pure combed organic cotton. Completely opaque, wrinkle-resistant, and impeccably balanced.',
    image: '/src/assets/images/studio_color_lineup_1790336636281.jpg',
    targetProductId: 'tee-03',
  },
  {
    id: 'slide-2',
    taglineId: 'Siluet Runway 2026',
    taglineEn: 'Runway Silhouette 2026',
    headlineId: 'Siluet Boxy Arsitektural Dalam Gerak.',
    headlineEn: 'Sculptural Boxy Drape In Kinetic Motion.',
    descId: 'Rancang bangun dengan garis bahu maju 12° yang mempertahankan postur busana, baik saat berdiri tegak maupun melangkah.',
    descEn: 'Engineered with 12° forward-pitched shoulder seams preserving clean garment silhouette whether standing still or in stride.',
    image: '/src/assets/images/runway_look_editorial_1790336620676.jpg',
    targetProductId: 'tee-02',
  },
  {
    id: 'slide-3',
    taglineId: 'Atelier Porto, Portugal',
    taglineEn: 'Porto Atelier, Portugal',
    headlineId: 'Dibuat untuk Bertahan Bertahun-tahun.',
    headlineEn: 'Hand-Finished to Endure for Years.',
    descId: 'Dijahit dalam batch terbatas maksimal 250 potong per rilis dengan sertifikasi katun organik GOTS dan pewarna zero-water.',
    descEn: 'Crafted in micro-batches strictly capped at 250 units with GOTS certified organic fibers and closed-loop bio-finishing.',
    image: '/src/assets/images/atelier_studio_craft_1790336161662.jpg',
    targetProductId: 'tee-01',
  },
];

interface AppleHighlightsReelProps {
  products: Product[];
  onQuickView: (product: Product) => void;
  onShopClick: () => void;
}

export const AppleHighlightsReel: React.FC<AppleHighlightsReelProps> = ({
  products,
  onQuickView,
  onShopClick,
}) => {
  const { language } = useLocalization();
  const isId = language === 'id';
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Auto-advance slides every 6 seconds if playing
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % HIGHLIGHT_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPlaying]);

  const currentSlide = HIGHLIGHT_SLIDES[currentIdx];
  const matchedProduct =
    products.find((p) => p.id === currentSlide.targetProductId) || products[0];

  return (
    <section className="w-full px-4 lg:px-12 py-10 sm:py-16 bg-[#fcf9f8] overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-4">
        {/* Apple-style Section Top Bar with Controls */}
        <div className="flex items-center justify-between pb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-normal text-[#1c1b1b]">
              {isId ? 'Sorotan Utama' : 'Key Highlights'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Play / Pause Toggle */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              aria-label={isPlaying ? 'Pause highlight reel' : 'Play highlight reel'}
              className="w-8 h-8 rounded-full bg-white border border-black/10 flex items-center justify-center text-[#1c1b1b] hover:bg-gray-100 transition-colors btn-spring shadow-2xs"
            >
              <span className="material-symbols-outlined text-[16px]">
                {isPlaying ? 'pause' : 'play_arrow'}
              </span>
            </button>

            {/* Slide Navigation Dots */}
            <div className="flex items-center gap-1.5 p-1 bg-white rounded-full border border-black/10 shadow-2xs">
              {HIGHLIGHT_SLIDES.map((slide, idx) => {
                const isActive = currentIdx === idx;
                return (
                  <button
                    key={slide.id}
                    onClick={() => {
                      setCurrentIdx(idx);
                      setIsPlaying(false);
                    }}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      isActive ? 'w-6 bg-[#0056c8]' : 'w-2 bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Slide ${idx + 1}`}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* Cinematic Main Slide Container */}
        <div className="relative w-full h-[480px] sm:h-[560px] lg:h-[620px] rounded-3xl overflow-hidden shadow-xl border border-black/[0.06] bg-[#121212] group">
          {/* Background Image with Smooth Fade and Zoom */}
          <img
            key={currentSlide.id}
            src={currentSlide.image}
            alt={isId ? currentSlide.headlineId : currentSlide.headlineEn}
            className="absolute inset-0 w-full h-full object-cover object-center animate-fade-in transition-transform duration-1000 ease-out group-hover:scale-105"
            referrerPolicy="no-referrer"
          />

          {/* Cinematic Scrim Gradient (Measured contrast for legibility) */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />

          {/* Content Overlay Card (Apple Pro Style) */}
          <div className="absolute bottom-6 sm:bottom-10 left-6 sm:left-10 right-6 sm:right-10 max-w-2xl text-white space-y-3 sm:space-y-4">
            <span className="text-xs sm:text-sm font-semibold tracking-normal text-white block">
              {isId ? currentSlide.taglineId : currentSlide.taglineEn}
            </span>

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-white leading-tight text-balance">
              {isId ? currentSlide.headlineId : currentSlide.headlineEn}
            </h2>

            <p className="text-xs sm:text-sm lg:text-base text-gray-300 font-normal leading-relaxed max-w-xl">
              {isId ? currentSlide.descId : currentSlide.descEn}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onQuickView(matchedProduct)}
                className="px-6 py-3 rounded-full bg-white text-[#1c1b1b] font-semibold text-xs sm:text-sm hover:bg-gray-100 transition-all shadow-md btn-spring flex items-center gap-1.5"
              >
                <span>{isId ? 'Lihat Spesifikasi' : 'View Piece'}</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>

              <button
                onClick={onShopClick}
                className="px-5 py-3 rounded-full bg-white/20 backdrop-blur-md text-white font-semibold text-xs sm:text-sm hover:bg-white/30 transition-all border border-white/30 btn-spring"
              >
                {isId ? 'Jelajahi Semua' : 'Browse All'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
