import React, { useState } from 'react';
import { Product } from '../types';
import { useLocalization } from '../context/LocalizationContext';

interface NewCollectionGridProps {
  products: Product[];
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const NewCollectionGrid: React.FC<NewCollectionGridProps> = ({
  products,
  onQuickView,
  onAddToCart,
}) => {
  const { formatPrice, t } = useLocalization();
  const [filter, setFilter] = useState<'all' | 'heavyweight' | 'oversized' | 'black'>('all');
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // First 4 items for the featured homepage collection
  const featuredProducts = products.slice(0, 4);

  const filteredProducts = featuredProducts.filter(p => {
    if (filter === 'heavyweight') return p.gsm >= 320;
    if (filter === 'oversized') return p.category === 'oversized';
    if (filter === 'black') return p.color.toLowerCase().includes('black');
    return true;
  });

  return (
    <section className="w-full px-4 lg:px-12 py-12 sm:py-16 md:py-20 bg-[#f6f3f2]/60" id="collection">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-6 sm:mb-10">
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-[#1c1b1b] tracking-tight font-display">
              {t.newCollectionTitle}
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-[#424655] font-normal">
              {t.newCollectionSubtitle}
            </p>
          </div>

          {/* Interactive Filter Pills */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            <button
              onClick={() => setFilter('all')}
              className={`px-3.5 sm:px-4 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold whitespace-nowrap transition-all duration-300 btn-spring ${
                filter === 'all'
                  ? 'bg-[#1c1b1b] text-white shadow-md'
                  : 'glass-pill text-[#1c1b1b] hover:bg-white'
              }`}
            >
              {t.filterAll}
            </button>
            <button
              onClick={() => setFilter('heavyweight')}
              className={`px-3.5 sm:px-4 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold whitespace-nowrap transition-all duration-300 btn-spring ${
                filter === 'heavyweight'
                  ? 'bg-[#1c1b1b] text-white shadow-md'
                  : 'glass-pill text-[#1c1b1b] hover:bg-white'
              }`}
            >
              {t.filterHeavyweight}
            </button>
            <button
              onClick={() => setFilter('oversized')}
              className={`px-3.5 sm:px-4 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold whitespace-nowrap transition-all duration-300 btn-spring ${
                filter === 'oversized'
                  ? 'bg-[#1c1b1b] text-white shadow-md'
                  : 'glass-pill text-[#1c1b1b] hover:bg-white'
              }`}
            >
              {t.filterOversized}
            </button>
            <button
              onClick={() => setFilter('black')}
              className={`px-3.5 sm:px-4 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold whitespace-nowrap transition-all duration-300 btn-spring ${
                filter === 'black'
                  ? 'bg-[#1c1b1b] text-white shadow-md'
                  : 'glass-pill text-[#1c1b1b] hover:bg-white'
              }`}
            >
              {t.filterBlack}
            </button>
          </div>
        </div>

        {/* 4-Item Grid (Clean & Premium Minimalist) */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {filteredProducts.map(product => (
            <div
              key={product.id}
              onClick={() => onQuickView(product)}
              className="group flex flex-col bg-white rounded-2xl p-2.5 sm:p-3.5 product-card-hover cursor-pointer border border-gray-100 shadow-2xs hover:shadow-md transition-all duration-300"
            >
              {/* Product Visual Container */}
              <div className="relative w-full aspect-[4/5] bg-[#f6f3f2] rounded-xl overflow-hidden flex items-center justify-center p-2.5 sm:p-4">
                {/* Minimal Tag Badge */}
                {product.tag && (
                  <div className="absolute top-2 left-2 sm:top-3 sm:left-3 z-10">
                    <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full glass-pill text-[8px] sm:text-[9px] uppercase tracking-widest text-[#1c1b1b] font-bold">
                      {product.tag}
                    </span>
                  </div>
                )}

                {/* Favorite Heart */}
                <button
                  onClick={e => toggleFavorite(product.id, e)}
                  aria-label="Favorite item"
                  className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full glass-pill flex items-center justify-center text-[#424655] hover:text-[#0056c8] transition-all duration-300 active:scale-90"
                >
                  <span className={`material-symbols-outlined text-[15px] sm:text-[18px] transition-transform duration-300 ${favorites[product.id] ? 'text-red-500 fill-current scale-110' : ''}`}>
                    favorite
                  </span>
                </button>

                {/* Product Image */}
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain img-smooth-zoom"
                />

                {/* Quick Actions Overlay */}
                <div className="absolute inset-x-2 bottom-2 sm:inset-x-3 sm:bottom-3 z-20 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out flex items-center gap-1.5">
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      onQuickView(product);
                    }}
                    className="flex-1 py-1.5 sm:py-2 rounded-full glass-card text-[#1c1b1b] text-[10px] sm:text-xs font-semibold hover:bg-[#1c1b1b] hover:text-white transition-all duration-300 flex items-center justify-center gap-1.5 shadow-md btn-spring"
                  >
                    <span>{t.quickView}</span>
                  </button>
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      onAddToCart(product);
                    }}
                    title="Alokasi Cepat ke Tas"
                    className="w-8 sm:w-9 h-8 sm:h-9 rounded-full bg-[#1c1b1b] text-white hover:bg-[#0056c8] transition-all duration-300 flex items-center justify-center shadow-md btn-spring shrink-0"
                  >
                    <span className="material-symbols-outlined text-[16px]">add_shopping_cart</span>
                  </button>
                </div>
              </div>

              {/* Ultra Clean & Simple Product Info */}
              <div className="flex flex-col pt-2.5 sm:pt-3 px-0.5 sm:px-1 space-y-0.5 sm:space-y-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-0.5">
                  <h3 className="text-xs sm:text-sm font-bold text-[#1c1b1b] tracking-tight group-hover:text-[#0056c8] transition-colors duration-300 font-display line-clamp-1">
                    {product.name}
                  </h3>
                  <span className="text-xs sm:text-sm font-bold text-[#1c1b1b] shrink-0">
                    {formatPrice(product.price)}
                  </span>
                </div>
                <p className="text-[10px] sm:text-[11px] text-[#565d6b] font-medium truncate">
                  {product.color} · {product.fabric.split('/')[0]}
                </p>

                {/* Color Swatches */}
                <div className="flex items-center gap-1 sm:gap-1.5 pt-0.5 sm:pt-1">
                  {product.swatches.map((colorHex, idx) => (
                    <span
                      key={idx}
                      className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full border border-black/10 transition-transform duration-300 hover:scale-125 ${
                        idx === 0 ? 'ring-1 ring-[#0056c8] ring-offset-1' : ''
                      }`}
                      style={{ backgroundColor: colorHex }}
                    ></span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
