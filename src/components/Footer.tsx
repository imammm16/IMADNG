import React from 'react';
import { ActiveTab } from '../types';
import { useLocalization } from '../context/LocalizationContext';

interface FooterProps {
  onNavigate: (tab: ActiveTab) => void;
  onOpenSizeGuide: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenSizeGuide }) => {
  const { t } = useLocalization();

  return (
    <footer className="w-full bg-[#f6f3f2] border-t border-gray-200/60 mt-16">
      <div className="max-w-7xl mx-auto px-4 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Brand Info */}
          <div className="md:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <span className="text-2xl font-bold tracking-tight text-[#1c1b1b] font-display block">
                ImmAdNgrh.
              </span>
              <p className="text-xs md:text-sm text-[#424655] max-w-sm leading-relaxed">
                {t.footerBrandDesc}
              </p>
            </div>

            <div>
              <span className="text-[10px] uppercase text-[#565d6b] tracking-widest font-bold block mb-1">
                {t.footerAtelierEdition}
              </span>
              <p className="text-xs text-[#424655]">
                {t.footerCraftedIn}
              </p>
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div className="flex flex-col space-y-3">
              <span className="text-[11px] uppercase text-[#1c1b1b] tracking-widest font-bold">
                {t.footerNavTitle}
              </span>
              <nav className="flex flex-col space-y-2 text-xs">
                <button onClick={() => onNavigate('shop')} className="text-left text-[#424655] hover:text-[#1c1b1b] transition-colors">
                  {t.navShop}
                </button>
                <button onClick={() => onNavigate('about')} className="text-left text-[#424655] hover:text-[#1c1b1b] transition-colors">
                  {t.navAbout}
                </button>
                <button onClick={() => { onNavigate('home'); setTimeout(() => { document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' }); }, 100); }} className="text-left text-[#424655] hover:text-[#1c1b1b] transition-colors">
                  {t.newCollectionTitle}
                </button>
                <button onClick={() => onNavigate('about')} className="text-left text-[#424655] hover:text-[#1c1b1b] transition-colors">
                  {t.footerSustainability}
                </button>
              </nav>
            </div>

            <div className="flex flex-col space-y-3">
              <span className="text-[11px] uppercase text-[#1c1b1b] tracking-widest font-bold">
                {t.footerClientCare}
              </span>
              <nav className="flex flex-col space-y-2 text-xs">
                <a href="#shipping" className="text-[#424655] hover:text-[#1c1b1b] transition-colors">
                  {t.footerShippingInfo}
                </a>
                <a href="#returns" className="text-[#424655] hover:text-[#1c1b1b] transition-colors">
                  {t.footerReturns}
                </a>
                <button onClick={onOpenSizeGuide} className="text-left text-[#424655] hover:text-[#1c1b1b] transition-colors">
                  {t.footerSizeGuide}
                </button>
                <a href="https://wa.me/message/4TFDRJG3H23IK1" target="_blank" rel="noreferrer" className="text-[#424655] hover:text-[#1c1b1b] transition-colors">
                  {t.footerContactTailor}
                </a>
              </nav>
            </div>

            <div className="flex flex-col space-y-3 col-span-2 sm:col-span-1">
              <span className="text-[11px] uppercase text-[#1c1b1b] tracking-widest font-bold">
                Connect
              </span>
              <nav className="flex flex-col space-y-2 text-xs">
                <a href="https://www.instagram.com/immadngrh?stkn=dHQ1aHQzZWljb3Q3&utm_source=qr" target="_blank" rel="noreferrer" className="text-[#424655] hover:text-[#1c1b1b] transition-colors flex items-center gap-1.5">
                  Instagram
                </a>
                <a href="https://www.tiktok.com/@immadngrh?_r=1&_t=ZS-9A0mFmPyK9a" target="_blank" rel="noreferrer" className="text-[#424655] hover:text-[#1c1b1b] transition-colors flex items-center gap-1.5">
                  TikTok
                </a>
                <a href="https://wa.me/message/4TFDRJG3H23IK1" target="_blank" rel="noreferrer" className="text-[#424655] hover:text-[#1c1b1b] transition-colors flex items-center gap-1.5">
                  WhatsApp
                </a>
              </nav>
            </div>
          </div>

        </div>

        {/* Sub-footer */}
        <div className="mt-12 pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#565d6b]">
          <div>{t.footerCopyright}</div>
          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-[#1c1b1b] transition-colors">{t.footerPrivacy}</a>
            <a href="#terms" className="hover:text-[#1c1b1b] transition-colors">{t.footerTerms}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
