import React, { useState, useEffect } from 'react';
import { ActiveTab } from '../types';
import { useLocalization } from '../context/LocalizationContext';

export interface UserProfile {
  name: string;
  email: string;
}

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onOpenAuth: () => void;
  currentUser: UserProfile | null;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  cartCount,
  onOpenCart,
  onOpenSearch,
  onOpenAuth,
  currentUser,
}) => {
  const { t } = useLocalization();
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Track scrolled state
      setIsScrolled(currentScrollY > 25);

      // Track scroll direction
      if (currentScrollY > lastScrollY + 5 && currentScrollY > 80) {
        setScrollDirection('down');
      } else if (currentScrollY < lastScrollY - 5) {
        setScrollDirection('up');
      }
      lastScrollY = currentScrollY;

      // Track total scroll progress
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.min(100, Math.max(0, (currentScrollY / totalHeight) * 100));
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Helper to extract user initials (e.g. "Iyan Anggrah" -> "IA")
  const getInitials = (name: string) => {
    if (!name) return 'IA';
    const parts = name.trim().split(' ').filter(Boolean);
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 pointer-events-none transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isScrolled ? 'pt-2 px-2.5 sm:px-4 md:px-6' : 'pt-3 sm:pt-4 px-3 sm:px-4 md:px-8'
        } ${
          scrollDirection === 'down' && isScrolled
            ? 'translate-y-[-4px] opacity-95'
            : 'translate-y-0 opacity-100'
        }`}
      >
        <div
          className={`relative max-w-7xl mx-auto flex items-center justify-between pointer-events-auto transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] rounded-full px-3.5 sm:px-5 md:px-6 overflow-hidden ${
            isScrolled
              ? 'h-13 sm:h-14 bg-white/92 backdrop-blur-2xl shadow-[0_20px_50px_-8px_rgba(20,110,245,0.16),0_4px_20px_-2px_rgba(17,17,17,0.06)] border border-[#0056c8]/20'
              : 'h-14 sm:h-16 bg-white/85 backdrop-blur-xl shadow-[0_12px_36px_-4px_rgba(20,110,245,0.06),0_4px_20px_-2px_rgba(17,17,17,0.03)] border border-white/70 hover:shadow-[0_16px_40px_-4px_rgba(20,110,245,0.12)]'
          }`}
        >
          {/* Left: Brand Title */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setActiveTab('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-1.5 focus:outline-none text-left btn-spring group"
            >
              <span className="font-bold text-base sm:text-lg md:text-xl tracking-tight text-[#1c1b1b] font-display transition-colors duration-300 group-hover:text-[#0056c8]">
                ImmAdNgrh.
              </span>
              {isScrolled && (
                <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-[#0056c8] animate-pulse" />
              )}
            </button>
          </div>

          {/* Center: Desktop Navigation Links (Home, Shop, About) */}
          <nav className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-1 bg-[#f0edec]/80 backdrop-blur-md p-1 rounded-full border border-gray-100/80 shadow-inner">
            <button
              onClick={() => {
                setActiveTab('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`relative px-5 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                activeTab === 'home'
                  ? 'bg-white text-[#1c1b1b] shadow-sm scale-[1.02]'
                  : 'text-[#424655] hover:text-[#1c1b1b] hover:bg-white/50'
              }`}
            >
              {t.navHome}
            </button>

            <button
              onClick={() => {
                setActiveTab('shop');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`relative px-5 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                activeTab === 'shop'
                  ? 'bg-white text-[#1c1b1b] shadow-sm scale-[1.02]'
                  : 'text-[#424655] hover:text-[#1c1b1b] hover:bg-white/50'
              }`}
            >
              {t.navShop}
            </button>

            <button
              onClick={() => {
                setActiveTab('about');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`relative px-5 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                activeTab === 'about'
                  ? 'bg-white text-[#1c1b1b] shadow-sm scale-[1.02]'
                  : 'text-[#424655] hover:text-[#1c1b1b] hover:bg-white/50'
              }`}
            >
              {t.navAbout}
            </button>
          </nav>

          {/* Right: Actions & Cart */}
          <div className="flex items-center gap-1 sm:gap-2.5">
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              aria-label={t.searchLabel}
              className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full text-[#424655] hover:text-[#1c1b1b] hover:bg-[#f0edec] transition-all duration-300 btn-spring active:scale-90"
            >
              <span className="material-symbols-outlined text-[18px] sm:text-[20px]">search</span>
            </button>

            {/* Cart Bag */}
            <button
              onClick={onOpenCart}
              aria-label={t.bagLabel}
              className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-[#1c1b1b] hover:bg-[#f0edec] transition-all duration-300 relative btn-spring active:scale-95"
            >
              <span className="material-symbols-outlined text-[18px] sm:text-[20px]">shopping_bag</span>
              <span className="text-[10px] sm:text-xs font-bold bg-[#0056c8] text-white w-4.5 h-4.5 sm:w-5 sm:h-5 rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110 shadow-sm">
                {cartCount}
              </span>
            </button>

            {/* Conditional Login / User Profile Badge */}
            {!currentUser ? (
              /* Single Clean Login Button when NOT logged in */
              <button
                onClick={onOpenAuth}
                className="inline-flex items-center justify-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#1c1b1b] text-white hover:bg-[#0056c8] transition-all duration-300 text-[11px] sm:text-xs font-semibold btn-spring shadow-sm hover:shadow-md"
              >
                {t.login}
              </button>
            ) : (
              /* User Profile Avatar with Name Initials when logged in */
              <button
                onClick={onOpenAuth}
                className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-[#f0edec] hover:bg-[#0056c8] text-[#1c1b1b] hover:text-white transition-all duration-300 btn-spring shadow-2xs group"
                title={`Akses Profil: ${currentUser.name}`}
              >
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#0056c8] group-hover:bg-white text-white group-hover:text-[#0056c8] font-bold text-[10px] sm:text-xs flex items-center justify-center transition-colors duration-300 shadow-2xs">
                  {getInitials(currentUser.name)}
                </div>
                <span className="text-[11px] sm:text-xs font-bold hidden sm:inline-block max-w-[90px] truncate">
                  {currentUser.name.split(' ')[0]}
                </span>
              </button>
            )}
          </div>

          {/* Scroll Progress Line at Bottom of Header Pill */}
          {scrollProgress > 0 && (
            <div className="absolute bottom-0 left-0 right-0 h-[2px] sm:h-[2.5px] bg-gray-100/50 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#0056c8] via-[#146ef5] to-[#b0c6ff] transition-all duration-150 ease-out rounded-full"
                style={{ width: `${scrollProgress}%` }}
              />
            </div>
          )}
        </div>
      </header>

      {/* Mobile Bottom Floating Navigation Bar (Ultra Premium, non-intrusive) */}
      <div className="fixed bottom-4 inset-x-0 z-40 md:hidden flex justify-center pointer-events-none px-4">
        <nav className="pointer-events-auto bg-white/92 backdrop-blur-2xl border border-gray-200/90 shadow-[0_12px_32px_rgba(0,0,0,0.14)] rounded-full p-1.5 flex items-center gap-1 animate-scale-in">
          <button
            onClick={() => {
              setActiveTab('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`px-3.5 py-1.5 rounded-full text-[11px] font-bold transition-all duration-300 btn-spring flex items-center gap-1 ${
              activeTab === 'home'
                ? 'bg-[#1c1b1b] text-white shadow-sm'
                : 'text-[#565d6b] hover:text-[#1c1b1b]'
            }`}
          >
            <span className="material-symbols-outlined text-[15px]">home</span>
            <span>{t.navHome}</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`px-3.5 py-1.5 rounded-full text-[11px] font-bold transition-all duration-300 btn-spring flex items-center gap-1 ${
              activeTab === 'shop'
                ? 'bg-[#1c1b1b] text-white shadow-sm'
                : 'text-[#565d6b] hover:text-[#1c1b1b]'
            }`}
          >
            <span className="material-symbols-outlined text-[15px]">grid_view</span>
            <span>{t.navShop}</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('about');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`px-3.5 py-1.5 rounded-full text-[11px] font-bold transition-all duration-300 btn-spring flex items-center gap-1 ${
              activeTab === 'about'
                ? 'bg-[#1c1b1b] text-white shadow-sm'
                : 'text-[#565d6b] hover:text-[#1c1b1b]'
            }`}
          >
            <span className="material-symbols-outlined text-[15px]">info</span>
            <span>{t.navAbout}</span>
          </button>
        </nav>
      </div>
    </>
  );
};
