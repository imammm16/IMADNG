import React, { useEffect, useState } from 'react';
import { Product } from '../types';
import { useLocalization } from '../context/LocalizationContext';

export interface AllocationPayload {
  product: Product;
  selectedSize: string;
  timestamp: number;
}

interface LuxuryCartAllocationToastProps {
  allocation: AllocationPayload | null;
  onClose: () => void;
  onOpenCart: () => void;
}

export const LuxuryCartAllocationToast: React.FC<LuxuryCartAllocationToastProps> = ({
  allocation,
  onClose,
  onOpenCart,
}) => {
  const { language } = useLocalization();
  const isId = language === 'id';
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    if (!allocation) return;
    setIsLeaving(false);

    // Checkmark toast disappears smoothly after 1100ms (300ms fade-out)
    const dismissTimer = setTimeout(() => {
      setIsLeaving(true);
      setTimeout(onClose, 300);
    }, 1100);

    return () => {
      clearTimeout(dismissTimer);
    };
  }, [allocation, onClose]);

  if (!allocation) return null;

  const { product, selectedSize } = allocation;

  const handleClose = () => {
    setIsLeaving(true);
    setTimeout(onClose, 250);
  };

  return (
    <div className="fixed inset-x-0 top-4 sm:top-6 z-[9999] flex justify-center p-3 sm:p-4 pointer-events-none">
      {/* Floating Success Toast with Animated Green Checkmark (Non-blocking, preserves full view of shirt) */}
      <div
        className={`pointer-events-auto w-full max-w-sm bg-white/95 backdrop-blur-2xl rounded-3xl p-5 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border border-gray-100 text-center space-y-3.5 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isLeaving
            ? 'opacity-0 scale-95 -translate-y-4'
            : 'animate-scale-in opacity-100 scale-100 translate-y-0'
        }`}
      >
        {/* Close Button Top Right */}
        <button
          onClick={handleClose}
          className="absolute top-3.5 right-3.5 w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-400 hover:text-black flex items-center justify-center transition-colors btn-spring"
          aria-label="Tutup"
        >
          <span className="material-symbols-outlined text-[16px]">close</span>
        </button>

        {/* Animated Green Checkmark Circle */}
        <div className="flex justify-center pt-0.5">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/35 animate-checkmark-circle">
            <svg
              className="w-8 h-8 sm:w-9 sm:h-9 text-white"
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
          </div>
        </div>

        {/* Success Text */}
        <div className="space-y-1">
          <h3 className="text-lg sm:text-xl font-black text-[#1c1b1b] font-display tracking-tight">
            {isId ? 'Sukses!' : 'Success!'}
          </h3>
          <p className="text-xs text-gray-600 leading-snug px-2">
            {isId ? (
              <>
                <strong className="text-[#1c1b1b]">{product.name}</strong> ({selectedSize}) berhasil dimasukkan ke keranjang.
              </>
            ) : (
              <>
                <strong className="text-[#1c1b1b]">{product.name}</strong> ({selectedSize}) has been added to your cart.
              </>
            )}
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-1 flex items-center justify-center gap-2">
          <button
            onClick={() => {
              handleClose();
              onOpenCart();
            }}
            className="w-full py-2.5 rounded-full bg-[#1c1b1b] hover:bg-[#0056c8] text-white text-xs font-semibold transition-all duration-300 btn-spring shadow-md flex items-center justify-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[16px]">shopping_bag</span>
            <span>{isId ? 'Lihat Keranjang' : 'View Cart'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
