import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { useLocalization } from '../context/LocalizationContext';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: string) => boolean | void;
  onOpenAiStylist: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onOpenAiStylist,
}) => {
  const { formatPrice, t, language } = useLocalization();
  const isId = language === 'id';
  const [selectedSize, setSelectedSize] = useState<string>('2 (M)');
  const [buttonState, setButtonState] = useState<'idle' | 'success'>('idle');
  const [isClosing, setIsClosing] = useState<boolean>(false);

  // Reset state when product changes
  useEffect(() => {
    setIsClosing(false);
    setButtonState('idle');
    if (product?.availableSizes?.[0]) {
      setSelectedSize(product.availableSizes[1] || product.availableSizes[0]);
    }
  }, [product?.id]);

  // Support Escape key to close smoothly
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleSmoothClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isClosing]);

  if (!product) return null;

  const handleSmoothClose = () => {
    if (isClosing) return;
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 250);
  };

  const handleAdd = () => {
    if (isClosing) return;

    // 1. Add item to cart (requires login)
    const success = onAddToCart(product, selectedSize);
    if (success === false) {
      return;
    }

    // 2. Change button to animated green checkmark with success text
    setButtonState('success');

    // 3. Keep the shirt modal open! Wait for user to click top-right close 'X' button.
    // Allow re-adding after 2.5s if user wants to add more.
    setTimeout(() => {
      setButtonState('idle');
    }, 2500);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 transition-all duration-300 ${
        isClosing ? 'pointer-events-none' : ''
      }`}
    >
      {/* Backdrop */}
      <div
        onClick={handleSmoothClose}
        className={`absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-300 ${
          isClosing ? 'opacity-0' : 'opacity-100'
        }`}
      />

      {/* Liquid Modal Container with Smooth Spring Scale */}
      <div
        className={`relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white/95 backdrop-blur-2xl shadow-2xl border border-white/80 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isClosing
            ? 'opacity-0 scale-95 translate-y-3'
            : 'animate-scale-in opacity-100 scale-100 translate-y-0'
        }`}
      >
        
        {/* Close Button Top Right (Prominent with hover rotation) */}
        <button
          type="button"
          onClick={handleSmoothClose}
          className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-white/90 hover:bg-black hover:text-white text-[#1c1b1b] flex items-center justify-center transition-all duration-300 btn-spring shadow-md border border-gray-200/80 group"
          aria-label="Tutup tampilan produk"
          title="Tutup (Esc)"
        >
          <span className="material-symbols-outlined text-[20px] transition-transform duration-300 group-hover:rotate-90">close</span>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image Left */}
          <div className="relative bg-[#f6f3f2] aspect-[4/5] md:aspect-auto overflow-hidden p-6 flex items-center justify-center group">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain drop-shadow-md img-smooth-zoom"
            />
            <div className="absolute bottom-4 left-4">
              <span className="px-3 py-1 rounded-full glass-pill text-[10px] uppercase font-bold text-[#1c1b1b]">
                {product.color}
              </span>
            </div>
          </div>

          {/* Details Right */}
          <div className="p-6 lg:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <h3 className="text-2xl font-bold text-[#1c1b1b] tracking-tight font-display">
                {product.name}
              </h3>

              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-bold text-[#0056c8]">
                  {formatPrice(product.price)}
                </span>
                <span className="text-xs text-[#565d6b] uppercase tracking-wider font-semibold">
                  {product.gsm} GSM
                </span>
              </div>

              <p className="text-xs text-[#424655] leading-relaxed pt-1">
                {product.description}
              </p>
            </div>

            {/* Proportion Size Selector */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-widest text-[#1c1b1b] font-bold">
                  {t.selectProportionSize}
                </span>
                <button
                  onClick={onOpenAiStylist}
                  className="text-xs text-[#0056c8] font-semibold hover:underline flex items-center gap-1 transition-colors duration-200"
                >
                  <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
                  <span>{t.aiSizeConsultant}</span>
                </button>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {product.availableSizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`py-2.5 rounded-xl text-xs font-semibold transition-all duration-300 btn-spring ${
                      selectedSize === sz
                        ? 'bg-[#1c1b1b] text-white shadow-md'
                        : 'bg-gray-100 text-[#1c1b1b] hover:bg-gray-200'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 space-y-2">
              <button
                type="button"
                onClick={handleAdd}
                className={`w-full py-3.5 rounded-full font-semibold text-xs transition-all duration-300 btn-spring flex items-center justify-center gap-2 shadow-lg ${
                  buttonState === 'success'
                    ? 'bg-emerald-600 text-white shadow-emerald-500/35 scale-[1.02]'
                    : 'bg-[#0056c8] hover:bg-[#00429c] text-white shadow-[0_12px_28px_-4px_rgba(20,110,245,0.35)]'
                }`}
              >
                {buttonState === 'success' ? (
                  <div className="flex items-center justify-center gap-2 animate-scale-in">
                    <span className="w-5 h-5 rounded-full bg-white text-emerald-600 flex items-center justify-center shadow-xs animate-checkmark-circle">
                      <svg
                        className="w-3.5 h-3.5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path
                          className="animate-checkmark-stroke"
                          d="M20 6L9 17l-5-5"
                        />
                      </svg>
                    </span>
                    <span className="font-bold text-xs tracking-wide">
                      {isId ? 'Sukses Ditambahkan!' : 'Added Successfully!'}
                    </span>
                  </div>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
                    <span>{t.addToBagBtn}</span>
                  </>
                )}
              </button>

              <p className="text-center text-[10px] text-[#565d6b] font-medium">
                {t.careAdvice} · ImmAdNgrh. Atelier Spec
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

