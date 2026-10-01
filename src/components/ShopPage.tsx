import React, { useState } from 'react';
import { Product, FilterCategory, SortOption } from '../types';
import { useLocalization } from '../context/LocalizationContext';

interface ShopPageProps {
  products: Product[];
  onQuickView: (product: Product) => void;
}

export const ShopPage: React.FC<ShopPageProps> = ({ products, onQuickView }) => {
  const { formatPrice, t } = useLocalization();
  const [filter, setFilter] = useState<FilterCategory>('all');
  const [sort, setSort] = useState<SortOption>('featured');
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  // Filter products
  const filteredProducts = products.filter(p => {
    if (filter === 'all') return true;
    if (filter === 't-shirts') return p.category === 't-shirts';
    if (filter === 'oversized') return p.category === 'oversized';
    if (filter === 'essentials') return p.category === 'essentials';
    if (filter === 'new') return p.tag === 'NEW ARRIVAL' || p.tag === 'NEW HUE';
    return true;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sort === 'price-asc') return a.price - b.price;
    if (sort === 'price-desc') return b.price - a.price;
    if (sort === 'newest') return b.id.localeCompare(a.id);
    return 0; // featured default
  });

  const getSortLabel = () => {
    switch (sort) {
      case 'newest': return t.sortNewest;
      case 'price-asc': return t.sortPriceAsc;
      case 'price-desc': return t.sortPriceDesc;
      default: return t.sortFeatured;
    }
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailSubmitted(true);
    setTimeout(() => setEmailSubmitted(false), 4000);
  };

  return (
    <div className="w-full pt-16 sm:pt-20 pb-16 sm:pb-20 bg-[#fcf9f8] min-h-screen">
      {/* Header Banner */}
      <section className="relative w-full max-w-7xl mx-auto px-4 lg:px-12 pt-6 sm:pt-8 pb-4 sm:pb-6 animate-scale-in">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6">
          <div className="space-y-1.5 max-w-2xl">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#1c1b1b] font-display">
              {t.shopHeading}
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-[#424655] leading-relaxed font-normal tracking-wide">
              {t.shopDescription}
            </p>
          </div>

          <div className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/80 backdrop-blur-xl shadow-xs flex items-center gap-2 border border-gray-100 self-start md:self-end">
            <span className="text-[10px] uppercase text-[#565d6b] font-bold">{t.inventoryLabel}</span>
            <span className="text-xs font-semibold text-[#1c1b1b]">{sortedProducts.length} {t.items}</span>
          </div>
        </div>

        {/* Filter and Sort Toolbar */}
        <div className="mt-6 sm:mt-8 pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 border-t border-gray-200/60">
          {/* Category Filter Pills with Spring Physics */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
            <button
              onClick={() => setFilter('all')}
              className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-semibold transition-all duration-300 btn-spring flex items-center gap-1.5 sm:gap-2 whitespace-nowrap ${
                filter === 'all'
                  ? 'bg-white text-[#1c1b1b] shadow-md border border-gray-200'
                  : 'bg-white/60 text-[#424655] hover:bg-white hover:text-[#1c1b1b]'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${filter === 'all' ? 'bg-[#0056c8]' : 'bg-transparent'}`}></span>
              {t.categoryAll}
            </button>

            <button
              onClick={() => setFilter('t-shirts')}
              className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-semibold transition-all duration-300 btn-spring flex items-center gap-1.5 sm:gap-2 whitespace-nowrap ${
                filter === 't-shirts'
                  ? 'bg-white text-[#1c1b1b] shadow-md border border-gray-200'
                  : 'bg-white/60 text-[#424655] hover:bg-white hover:text-[#1c1b1b]'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${filter === 't-shirts' ? 'bg-[#0056c8]' : 'bg-transparent'}`}></span>
              {t.categoryTshirts}
            </button>

            <button
              onClick={() => setFilter('oversized')}
              className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-semibold transition-all duration-300 btn-spring flex items-center gap-1.5 sm:gap-2 whitespace-nowrap ${
                filter === 'oversized'
                  ? 'bg-white text-[#1c1b1b] shadow-md border border-gray-200'
                  : 'bg-white/60 text-[#424655] hover:bg-white hover:text-[#1c1b1b]'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${filter === 'oversized' ? 'bg-[#0056c8]' : 'bg-transparent'}`}></span>
              {t.categoryOversized}
            </button>

            <button
              onClick={() => setFilter('essentials')}
              className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-semibold transition-all duration-300 btn-spring flex items-center gap-1.5 sm:gap-2 whitespace-nowrap ${
                filter === 'essentials'
                  ? 'bg-white text-[#1c1b1b] shadow-md border border-gray-200'
                  : 'bg-white/60 text-[#424655] hover:bg-white hover:text-[#1c1b1b]'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${filter === 'essentials' ? 'bg-[#0056c8]' : 'bg-transparent'}`}></span>
              {t.categoryEssentials}
            </button>

            <button
              onClick={() => setFilter('new')}
              className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-semibold transition-all duration-300 btn-spring flex items-center gap-1.5 sm:gap-2 whitespace-nowrap ${
                filter === 'new'
                  ? 'bg-white text-[#1c1b1b] shadow-md border border-gray-200'
                  : 'bg-white/60 text-[#424655] hover:bg-white hover:text-[#1c1b1b]'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${filter === 'new' ? 'bg-[#0056c8]' : 'bg-transparent'}`}></span>
              {t.categoryNew}
            </button>
          </div>

          {/* Sort Dropdown */}
          <div className="relative self-end sm:self-auto shrink-0">
            <button
              onClick={() => setShowSortDropdown(!showSortDropdown)}
              className="flex items-center gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/90 shadow-sm border border-gray-100 text-xs text-[#1c1b1b] font-semibold hover:shadow-md transition-all duration-300 btn-spring"
            >
              <span className="text-[10px] uppercase text-[#565d6b]">{t.sortLabel}</span>
              <span>{getSortLabel()}</span>
              <span className={`material-symbols-outlined text-[18px] text-[#565d6b] transition-transform duration-300 ${showSortDropdown ? 'rotate-180' : ''}`}>
                expand_more
              </span>
            </button>

            {showSortDropdown && (
              <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-white shadow-2xl border border-gray-100 p-1.5 z-30 flex flex-col gap-1 animate-scale-in">
                <button
                  onClick={() => { setSort('featured'); setShowSortDropdown(false); }}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors duration-200 ${
                    sort === 'featured' ? 'bg-gray-100 font-semibold text-[#1c1b1b]' : 'text-[#424655] hover:bg-gray-50'
                  }`}
                >
                  <span>{t.sortFeatured}</span>
                  {sort === 'featured' && <span className="material-symbols-outlined text-[16px] text-[#0056c8]">check</span>}
                </button>
                <button
                  onClick={() => { setSort('newest'); setShowSortDropdown(false); }}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors duration-200 ${
                    sort === 'newest' ? 'bg-gray-100 font-semibold text-[#1c1b1b]' : 'text-[#424655] hover:bg-gray-50'
                  }`}
                >
                  <span>{t.sortNewest}</span>
                  {sort === 'newest' && <span className="material-symbols-outlined text-[16px] text-[#0056c8]">check</span>}
                </button>
                <button
                  onClick={() => { setSort('price-asc'); setShowSortDropdown(false); }}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors duration-200 ${
                    sort === 'price-asc' ? 'bg-gray-100 font-semibold text-[#1c1b1b]' : 'text-[#424655] hover:bg-gray-50'
                  }`}
                >
                  <span>{t.sortPriceAsc}</span>
                  {sort === 'price-asc' && <span className="material-symbols-outlined text-[16px] text-[#0056c8]">check</span>}
                </button>
                <button
                  onClick={() => { setSort('price-desc'); setShowSortDropdown(false); }}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors duration-200 ${
                    sort === 'price-desc' ? 'bg-gray-100 font-semibold text-[#1c1b1b]' : 'text-[#424655] hover:bg-gray-50'
                  }`}
                >
                  <span>{t.sortPriceDesc}</span>
                  {sort === 'price-desc' && <span className="material-symbols-outlined text-[16px] text-[#0056c8]">check</span>}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Product Showcase Grid (12 Items) */}
      <section className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-12 py-6 sm:py-8">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {sortedProducts.map((product) => (
            <article
              key={product.id}
              onClick={() => onQuickView(product)}
              className="group flex flex-col cursor-pointer transition-all product-card-hover rounded-2xl p-2.5 sm:p-3 bg-white border border-gray-100"
            >
              <div className="relative w-full aspect-[4/5] rounded-xl bg-[#f6f3f2] overflow-hidden flex items-center justify-center p-2.5 sm:p-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain img-smooth-zoom"
                />

                {/* Badge */}
                {product.tag && (
                  <div className="absolute top-2 left-2 sm:top-3 sm:left-3">
                    <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-white/90 backdrop-blur-md text-[8px] sm:text-[10px] uppercase font-bold tracking-wider text-[#1c1b1b] shadow-sm">
                      {product.tag}
                    </span>
                  </div>
                )}

                {/* Hover Quick View Floating Pill */}
                <div className="absolute inset-x-2 bottom-2 sm:inset-x-3 sm:bottom-3 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out flex items-center justify-between gap-1.5 p-1 sm:p-1.5 rounded-full bg-white/90 backdrop-blur-xl shadow-lg">
                  <span className="pl-2 sm:pl-3 text-[10px] sm:text-xs font-semibold text-[#1c1b1b]">{t.quickView}</span>
                  <button
                    type="button"
                    className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#1c1b1b] text-white flex items-center justify-center hover:bg-[#0056c8] transition-colors duration-300"
                  >
                    <span className="material-symbols-outlined text-[14px] sm:text-[16px]">visibility</span>
                  </button>
                </div>
              </div>

              {/* Product Details */}
              <div className="mt-2.5 sm:mt-3 flex flex-col space-y-1 px-0.5 sm:px-1">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-0.5 sm:gap-2">
                  <h2 className="text-xs sm:text-base font-bold text-[#1c1b1b] tracking-tight group-hover:text-[#0056c8] transition-colors duration-300 font-display line-clamp-1">
                    {product.name}
                  </h2>
                  <span className="text-xs sm:text-base font-bold text-[#1c1b1b] shrink-0">
                    {formatPrice(product.price)}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-1 pt-0.5">
                  <span className="text-[10px] sm:text-xs text-[#565d6b] truncate">{product.fabric}</span>
                  {/* Swatches */}
                  <div className="flex items-center gap-1 shrink-0">
                    {product.swatches.map((colorHex, idx) => (
                      <span
                        key={idx}
                        className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-transform duration-300 hover:scale-125 ${idx === 0 ? 'ring-1 sm:ring-2 ring-[#0056c8]' : ''}`}
                        style={{ backgroundColor: colorHex }}
                      ></span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Material Science Spec Featurette Ribbon */}
      <section className="max-w-7xl mx-auto px-4 lg:px-12 my-12">
        <div className="rounded-2xl bg-white p-8 lg:p-10 shadow-sm border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-full bg-[#f0edec] flex items-center justify-center text-[#0056c8] mb-3 transition-transform duration-300 hover:scale-110">
                <span className="material-symbols-outlined text-[20px]">architecture</span>
              </div>
              <h3 className="text-base font-bold text-[#1c1b1b]">{t.zeroTorqueTitle}</h3>
              <p className="text-xs text-[#424655] leading-relaxed">
                {t.zeroTorqueBody}
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-full bg-[#f0edec] flex items-center justify-center text-[#0056c8] mb-3 transition-transform duration-300 hover:scale-110">
                <span className="material-symbols-outlined text-[20px]">layers</span>
              </div>
              <h3 className="text-base font-bold text-[#1c1b1b]">{t.doubleMercerizedTitle}</h3>
              <p className="text-xs text-[#424655] leading-relaxed">
                {t.doubleMercerizedBody}
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-full bg-[#f0edec] flex items-center justify-center text-[#0056c8] mb-3 transition-transform duration-300 hover:scale-110">
                <span className="material-symbols-outlined text-[20px]">verified</span>
              </div>
              <h3 className="text-base font-bold text-[#1c1b1b]">{t.artisanDyeTitle}</h3>
              <p className="text-xs text-[#424655] leading-relaxed">
                {t.artisanDyeBody}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Dispatch Banner */}
      <section className="max-w-7xl mx-auto px-4 lg:px-12 mb-12">
        <div className="rounded-3xl bg-gradient-to-b from-white to-[#f0edec] p-8 lg:p-16 shadow-lg border border-gray-100 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#0056c8]"></span>
            <span className="text-[11px] uppercase tracking-widest text-[#1c1b1b] font-bold">
              Atelier Private Wire
            </span>
          </div>

          <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-[#1c1b1b] font-display max-w-xl mx-auto">
            Receive Edition 05 Preview &amp; Runway Spec Sheets
          </h2>

          <p className="text-xs md:text-sm text-[#424655] max-w-md mx-auto">
            Direct priority access to limited atelier drops, technical fabric tear-sheets, and invite-only sample releases.
          </p>

          <form onSubmit={handleNewsletterSubmit} className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter client email address..."
              required
              className="w-full px-5 py-3 rounded-full bg-white text-xs text-[#1c1b1b] placeholder:text-[#727786] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0056c8] shadow-sm"
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3 rounded-full bg-[#1c1b1b] text-white hover:bg-[#0056c8] text-xs font-semibold transition-colors duration-300 shrink-0 shadow-md btn-spring"
            >
              Access
            </button>
          </form>

          {emailSubmitted && (
            <div className="text-xs text-[#0056c8] font-semibold animate-scale-in pt-1">
              You have been indexed into the Atelier Wire.
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
