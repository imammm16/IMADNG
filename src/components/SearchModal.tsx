import React, { useState } from 'react';
import { Product } from '../types';
import { useLocalization } from '../context/LocalizationContext';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onQuickView: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onQuickView,
}) => {
  const { formatPrice, t } = useLocalization();
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const results = query.trim()
    ? products.filter(
        p =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.color.toLowerCase().includes(query.toLowerCase()) ||
          p.fabric.toLowerCase().includes(query.toLowerCase()) ||
          p.gsm.toString().includes(query)
      )
    : products.slice(0, 4);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 animate-fade-in">
      {/* Backdrop */}
      <div onClick={onClose} className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-300"></div>

      <div className="relative z-10 w-full max-w-2xl bg-white rounded-3xl p-6 shadow-2xl border border-gray-100 space-y-4 animate-scale-in">
        
        {/* Search Input Bar */}
        <div className="relative flex items-center">
          <span className="material-symbols-outlined text-[22px] text-gray-400 absolute left-4">
            search
          </span>
          <input
            type="text"
            autoFocus
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full pl-12 pr-10 py-3.5 rounded-full bg-[#f6f3f2] text-sm text-[#1c1b1b] placeholder:text-[#727786] focus:outline-none focus:ring-2 focus:ring-[#0056c8] transition-all duration-300"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-4 text-gray-400 hover:text-black transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">cancel</span>
            </button>
          )}
        </div>

        {/* Results */}
        <div className="space-y-2">
          <div className="text-[10px] uppercase font-bold text-[#565d6b] tracking-wider px-1">
            {query.trim() ? t.matchesFound.replace('{count}', results.length.toString()) : t.popularIndex}
          </div>

          <div className="max-h-80 overflow-y-auto space-y-2 pr-1">
            {results.length === 0 ? (
              <div className="py-8 text-center text-xs text-[#565d6b]">
                {t.noSearchResults}
              </div>
            ) : (
              results.map(product => (
                <div
                  key={product.id}
                  onClick={() => {
                    onQuickView(product);
                    onClose();
                  }}
                  className="flex items-center justify-between p-2.5 rounded-2xl hover:bg-[#f6f3f2] cursor-pointer transition-all duration-300 hover:translate-x-1"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-14 object-contain bg-white rounded-xl p-1 border border-gray-100"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-[#1c1b1b] font-display">
                        {product.name}
                      </h4>
                      <p className="text-[11px] text-[#565d6b]">
                        {product.color} · {product.fabric}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-bold text-[#0056c8]">
                      {formatPrice(product.price)}
                    </span>
                    <span className="text-[10px] text-gray-400 block uppercase font-medium">
                      {product.availableSizes[0]} - {product.availableSizes[3]}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
