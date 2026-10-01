import React, { useState } from 'react';
import { useLocalization } from '../context/LocalizationContext';
import { Product } from '../types';
import configuratorWhitePodium from '../assets/images/configurator_white_podium_1790897097817.jpg';
import configuratorBlackPodium from '../assets/images/configurator_black_podium_1790897112581.jpg';
import configuratorGrayPodium from '../assets/images/configurator_gray_podium_1790897125878.jpg';
import configuratorNavyPodium from '../assets/images/configurator_navy_podium_1790897138316.jpg';

interface AtelierStudioConfiguratorProps {
  products: Product[];
  onAddToCart: (product: Product, size: string) => void;
  onQuickView: (product: Product) => void;
}

interface ColorOption {
  id: string;
  nameId: string;
  nameEn: string;
  hex: string;
  image: string;
  productId: string;
}

interface SilhouetteOption {
  id: string;
  nameId: string;
  nameEn: string;
  gsm: number;
  cutDescId: string;
  cutDescEn: string;
}

const SILHOUETTES: SilhouetteOption[] = [
  {
    id: 'boxy',
    nameId: 'Sculptural Boxy',
    nameEn: 'Sculptural Boxy',
    gsm: 360,
    cutDescId: 'Bahu lurus datar, potongan badan lebar kotak, dan kain tebal masif yang berdiri mandiri.',
    cutDescEn: 'Zero-slope shoulders, architectural wide torso, and standalone rigid drape.',
  },
  {
    id: 'drape',
    nameId: 'Anatomical Drape',
    nameEn: 'Anatomical Drape',
    gsm: 320,
    cutDescId: 'Jatuh dinamis mengikuti garis tubuh dengan rajutan French Terry loopback sejuk.',
    cutDescEn: 'Dynamic natural vertical fall with cooling micro-loopback French Terry interior.',
  },
];

const COLORS: ColorOption[] = [
  {
    id: 'white',
    nameId: 'Pure Chalk White',
    nameEn: 'Pure Chalk White',
    hex: '#F5F5F7',
    image: configuratorWhitePodium,
    productId: 'tee-01',
  },
  {
    id: 'black',
    nameId: 'Obsidian Black',
    nameEn: 'Obsidian Black',
    hex: '#171717',
    image: configuratorBlackPodium,
    productId: 'tee-02',
  },
  {
    id: 'gray',
    nameId: 'Concrete Melange',
    nameEn: 'Concrete Melange',
    hex: '#9E9EA2',
    image: configuratorGrayPodium,
    productId: 'tee-04',
  },
  {
    id: 'navy',
    nameId: 'Midnight Archival Navy',
    nameEn: 'Midnight Archival Navy',
    hex: '#16233B',
    image: configuratorNavyPodium,
    productId: 'tee-03',
  },
];

const SIZES = ['2 (M)', '3 (L)', '4 (XL)'];

export const AtelierStudioConfigurator: React.FC<AtelierStudioConfiguratorProps> = ({
  products,
  onAddToCart,
  onQuickView,
}) => {
  const { language, formatPrice } = useLocalization();
  const isId = language === 'id';

  const [selectedSilhouette, setSelectedSilhouette] = useState<SilhouetteOption>(SILHOUETTES[0]);
  const [selectedColor, setSelectedColor] = useState<ColorOption>(COLORS[1]); // Default to Obsidian Black
  const [selectedSize, setSelectedSize] = useState<string>('2 (M)');

  const matchedProduct =
    products.find((p) => p.id === selectedColor.productId) || products[0];

  const handleAdd = () => {
    onAddToCart(matchedProduct, selectedSize);
  };

  return (
    <section className="w-full px-4 lg:px-12 py-16 sm:py-24 bg-white overflow-hidden" id="studio">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Apple-style Studio Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1c1b1b] font-display tracking-tight text-balance">
            {isId ? 'Kustomisasi Siluet Anda.' : 'Style It Your Way.'}
          </h2>
          <p className="text-sm sm:text-base text-[#565d6b]">
            {isId
              ? 'Pilih siluet arsitektural, warna, dan ukuran presisi yang Anda inginkan.'
              : 'Select your preferred architectural silhouette, material weight, and finish.'}
          </p>
        </div>

        {/* Studio Canvas (Apple Pro Device Configurator) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#f8f6f5] rounded-3xl p-6 sm:p-10 border border-black/[0.05] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.06)]">
          {/* Left: Dynamic Live Garment Stage */}
          <div className="lg:col-span-7 relative flex items-center justify-center min-h-[380px] sm:min-h-[480px] bg-white rounded-2xl overflow-hidden shadow-sm p-6 group">
            {/* Subtle radial floor spotlight */}
            <div className="absolute inset-0 bg-radial from-blue-500/5 via-transparent to-transparent pointer-events-none" />

            {/* Garment Image with Smooth Zoom and Shadow */}
            <img
              key={`${selectedColor.id}-${selectedSilhouette.id}`}
              src={selectedColor.image}
              alt={isId ? selectedColor.nameId : selectedColor.nameEn}
              className="max-h-[340px] sm:max-h-[420px] w-auto object-contain transition-all duration-500 ease-out group-hover:scale-105 animate-fade-in"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Right: Studio Configurator Controls */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            {/* 1. Silhouette Selector */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-[#1c1b1b]">
                <span className="uppercase tracking-wider text-[#565d6b] text-[10px]">
                  01. {isId ? 'Siluet & Densitas' : 'Silhouette & Density'}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {SILHOUETTES.map((sil) => {
                  const isSel = selectedSilhouette.id === sil.id;
                  return (
                    <button
                      key={sil.id}
                      onClick={() => setSelectedSilhouette(sil)}
                      className={`p-3 rounded-xl text-center text-xs font-semibold transition-all btn-spring border ${
                        isSel
                          ? 'bg-[#1c1b1b] text-white border-[#1c1b1b] shadow-sm'
                          : 'bg-white text-[#424655] border-black/10 hover:border-black/30'
                      }`}
                    >
                      <div className="font-bold">{sil.gsm} GSM</div>
                      <div className="text-[10px] opacity-75 truncate">
                        {isId ? sil.nameId : sil.nameEn}
                      </div>
                    </button>
                  );
                })}
              </div>

              <p className="text-[11px] text-[#565d6b] pt-1 leading-relaxed">
                {isId ? selectedSilhouette.cutDescId : selectedSilhouette.cutDescEn}
              </p>
            </div>

            {/* 2. Color Palette Selector (Apple Swatches) */}
            <div className="space-y-2 pt-2 border-t border-black/[0.06]">
              <div className="flex items-center justify-between text-xs font-bold text-[#1c1b1b]">
                <span className="uppercase tracking-wider text-[#565d6b] text-[10px]">
                  02. {isId ? 'Warna Arsitektural' : 'Architectural Finish'}
                </span>
                <span className="text-xs font-semibold text-[#1c1b1b]">
                  {isId ? selectedColor.nameId : selectedColor.nameEn}
                </span>
              </div>

              <div className="flex items-center gap-3">
                {COLORS.map((col) => {
                  const isSel = selectedColor.id === col.id;
                  return (
                    <button
                      key={col.id}
                      onClick={() => setSelectedColor(col)}
                      aria-label={isId ? col.nameId : col.nameEn}
                      className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 ${
                        isSel
                          ? 'ring-2 ring-[#0056c8] ring-offset-2 scale-110 shadow-md'
                          : 'opacity-70 hover:opacity-100 hover:scale-105'
                      }`}
                    >
                      <span
                        className="w-full h-full rounded-full border border-black/15 shadow-inner"
                        style={{ backgroundColor: col.hex }}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Size Selector */}
            <div className="space-y-2 pt-2 border-t border-black/[0.06]">
              <div className="flex items-center justify-between text-xs font-bold text-[#1c1b1b]">
                <span className="uppercase tracking-wider text-[#565d6b] text-[10px]">
                  03. {isId ? 'Ukuran Alokasi' : 'Select Size'}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {SIZES.map((sz) => {
                  const isSel = selectedSize === sz;
                  return (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`py-2.5 rounded-xl text-xs font-bold transition-all btn-spring border ${
                        isSel
                          ? 'bg-[#0056c8] text-white border-[#0056c8] shadow-sm'
                          : 'bg-white text-[#1c1b1b] border-black/10 hover:border-black/30'
                      }`}
                    >
                      {sz}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price and Action Bar */}
            <div className="pt-4 border-t border-black/[0.08] flex items-center justify-between gap-4">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#565d6b] block">
                  {isId ? 'Harga Batch' : 'Batch Allocation'}
                </span>
                <span className="text-2xl sm:text-3xl font-extrabold text-[#1c1b1b] font-display tracking-tight">
                  {formatPrice(matchedProduct.price)}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleAdd}
                  className="px-6 py-3 rounded-full bg-[#1c1b1b] hover:bg-[#0056c8] text-white text-xs font-semibold transition-all shadow-md btn-spring flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[16px]">shopping_bag</span>
                  <span>{isId ? 'Pesan Alokasi' : 'Allocate Piece'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
