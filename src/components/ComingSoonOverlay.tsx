import React from 'react';

interface ComingSoonOverlayProps {
  onSecretUnlock: () => void;
  onOpenAuth?: () => void;
}

export const ComingSoonOverlay: React.FC<ComingSoonOverlayProps> = ({
  onSecretUnlock,
}) => {
  return (
    <div className="fixed inset-0 z-40 bg-white/80 backdrop-blur-2xl flex items-center justify-center p-4 text-center select-none animate-fade-in overflow-hidden">
      
      {/* Single Line Typography COMING SOON. with Disguised Secret Period Button */}
      <h1 className="text-2xl sm:text-5xl md:text-8xl lg:text-9xl font-black font-display tracking-tighter text-[#1c1b1b] leading-none whitespace-nowrap flex items-baseline justify-center">
        <span>COMING SOON</span>
        <button
          type="button"
          onClick={onSecretUnlock}
          className="text-[#1c1b1b] cursor-pointer focus:outline-none hover:opacity-75 transition-opacity inline"
          title=""
          aria-label="Secret Access"
        >
          .
        </button>
      </h1>

    </div>
  );
};
