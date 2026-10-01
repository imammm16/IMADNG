import React, { useState } from 'react';
import { useLocalization } from '../context/LocalizationContext';
import { BrandManifesto } from './BrandManifesto';
import whiteTeeImg from '../assets/images/featured_white_tee_1790863611827.jpg';
import blackTeeImg from '../assets/images/featured_black_signature_1790863627706.jpg';
import phantomTeeImg from '../assets/images/featured_phantom_boxy_1790863645176.jpg';
import heatherTeeImg from '../assets/images/featured_heather_gray_1790863659881.jpg';
import macroWeaveImg from '../assets/images/macro_textile_weave_1790336133917.jpg';
import studioCraftImg from '../assets/images/atelier_studio_craft_1790336161662.jpg';
import runwayLookImg from '../assets/images/runway_look_editorial_1790336620676.jpg';
import colorLineupImg from '../assets/images/studio_color_lineup_1790336636281.jpg';
import garmentExplodedImg from '../assets/images/garment_exploded_1790336148928.jpg';

interface FeedPostItem {
  id: string;
  title: string;
  subtitle: string;
  imgSrc: string;
  badge: string;
  details: string;
  priceFormatted?: string;
}

export const AboutPage: React.FC = () => {
  const { t, language } = useLocalization();
  const isId = language === 'id';
  const [activeFeedTab, setActiveFeedTab] = useState<'grid' | 'reels' | 'tagged'>('grid');
  const [isFollowing, setIsFollowed] = useState(false);
  const [followerCount, setFollowerCount] = useState(89);
  const [selectedPost, setSelectedPost] = useState<FeedPostItem | null>(null);

  const handleFollowToggle = () => {
    if (isFollowing) {
      setIsFollowed(false);
      setFollowerCount((prev) => prev - 1);
    } else {
      setIsFollowed(true);
      setFollowerCount((prev) => prev + 1);
    }
  };

  // 9 High-Fashion Photo Editorial Cards
  const feedPosts: FeedPostItem[] = [
    {
      id: 'post-01',
      title: '01. Essential White Boxy Tee',
      subtitle: '320 GSM Organic Cotton · Pure White',
      imgSrc: whiteTeeImg,
      badge: 'BOXY CUT',
      priceFormatted: 'Rp 215.000',
      details: 'Pola potongan ergonomis arsitektural dengan bahu jatuh yang pas, mempertahankan struktur siluet tegak secara permanen.',
    },
    {
      id: 'post-02',
      title: '02. Macro Interlock Weave',
      subtitle: '340 GSM High-Density Micro-Knit',
      imgSrc: macroWeaveImg,
      badge: 'HEAVYWEIGHT',
      priceFormatted: 'Textile Spec',
      details: 'Detail rajutan micro-interlock berdensitas tinggi untuk kelembutan taktil premium serta retensi bentuk cuci berulang.',
    },
    {
      id: 'post-03',
      title: '03. Atelier Craft & Tailoring',
      subtitle: 'Precision Tailoring in Braga, Portugal',
      imgSrc: studioCraftImg,
      badge: 'CRAFT STUDIO',
      priceFormatted: 'Artisan Process',
      details: 'Dikerjakan dalam batch terbatas oleh master tailor tersertifikasi dengan jahitan pelindung ganda yang presisi.',
    },
    {
      id: 'post-04',
      title: '04. Obsidian Signature Tee',
      subtitle: '320 GSM French Terry · Obsidian Black',
      imgSrc: blackTeeImg,
      badge: 'BESTSELLER',
      priceFormatted: 'Rp 245.000',
      details: 'T-shirt esensial berkelas dengan warna obsidian pekat dan konstruksi jahitan tersembunyi yang lembut di kulit.',
    },
    {
      id: 'post-05',
      title: '05. Runway Editorial Lookbook',
      subtitle: 'FW26 Atelier Continuum Collection',
      imgSrc: runwayLookImg,
      badge: 'RUNWAY',
      priceFormatted: 'Editorial Look',
      details: 'Edisi lookbook eksklusif yang memadukan siluet modern streetwear dengan ketelitian tailoring busana tingkat tinggi.',
    },
    {
      id: 'post-06',
      title: '06. Exploded Pattern Architecture',
      subtitle: 'Anatomical Zero-Torque Bias Cut',
      imgSrc: garmentExplodedImg,
      badge: 'PATTERN SPEC',
      priceFormatted: 'Digital Geometry',
      details: 'Cetak biru konstruksi terurai yang menghilangkan tarikan bahu dan mendistribusikan bobot kain secara seimbang.',
    },
    {
      id: 'post-07',
      title: '07. Studio Boxy Phantom Tee',
      subtitle: '360 GSM Heavyweight Jersey · Charcoal',
      imgSrc: phantomTeeImg,
      badge: 'NEW ARRIVAL',
      priceFormatted: 'Rp 265.000',
      details: 'Siluet boxy tegas berbobot mantap dengan kerah leher 2.4cm yang tidak melar walau dicuci berkali-kali.',
    },
    {
      id: 'post-08',
      title: '08. Studio Heather Gray Tee',
      subtitle: '290 GSM Melange Drop Shoulder',
      imgSrc: heatherTeeImg,
      badge: 'TAILORED',
      priceFormatted: 'Rp 235.000',
      details: 'Nuansa abu-abu melange yang sejuk dengan jatuh kain yang mengalir santai mengikuti gerak tubuh.',
    },
    {
      id: 'post-09',
      title: '09. Studio Color Spectrum',
      subtitle: 'Eco-Certified Reactive Dye Lineup',
      imgSrc: colorLineupImg,
      badge: 'COLORWAY',
      priceFormatted: 'Artisan Palette',
      details: 'Spektrum warna eksklusif hasil pewarnaan reaktif ramah lingkungan dengan tingkat ketahanan warna Grade 5.',
    },
  ];

  return (
    <div className="w-full pt-18 sm:pt-24 pb-16 sm:pb-24 bg-[#fcf9f8] min-h-screen select-none">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-12 space-y-16 sm:space-y-24">
        
        {/* ================================================================= */}
        {/* SECTION 1 (HALAMAN 1): STABLE OUTER BACKGROUND + SMOOTH SIDE SLIDE */}
        {/* ================================================================= */}
        <section className="relative w-full rounded-3xl bg-gradient-to-br from-white via-[#f0f4ff] to-[#c7d9ff] p-4 sm:p-10 flex flex-col items-center justify-center overflow-hidden shadow-2xl border border-white/80 transition-all duration-300">
          
          {/* Fixed Ambient Glowing Liquid Blobs (Never Resizes or Shifts) */}
          <div className="absolute -top-16 -left-16 w-80 h-80 bg-[#05299E]/20 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
          <div className="absolute -bottom-16 -right-16 w-96 h-96 bg-[#0056c8]/25 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.75)_0%,transparent_75%)] pointer-events-none"></div>

          {/* Inner Interactive Sliding Container */}
          <div
            className={`w-full relative z-10 my-2 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              selectedPost
                ? 'max-w-4xl flex flex-col md:flex-row gap-5 items-start justify-center'
                : 'max-w-[430px] mx-auto flex flex-col gap-3.5'
            }`}
          >
            {/* LEFT PANEL: PROFILE CARD & GRID FEED (SMOOTHLY SHIFTS LEFT ON SELECTION) */}
            <div
              className={`w-full flex flex-col gap-3.5 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                selectedPost ? 'md:w-[390px] shrink-0 transform md:-translate-x-2' : 'w-full'
              }`}
            >
              {/* LIQUID GLASS PROFILE CARD */}
              <header className="bg-white/50 backdrop-blur-2xl border border-white/80 rounded-[2.25rem] p-5 pb-4 shadow-[0_15px_35px_rgba(5,41,158,0.08),0_0_1px_1px_rgba(255,255,255,0.9)_inset] transition-all duration-300">
                {/* Username Header */}
                <div className="flex items-center justify-between mb-3.5">
                  <div className="flex items-center gap-1.5">
                    <h1 className="text-2xl font-extrabold tracking-tight text-black font-display">
                      immadngrh
                    </h1>
                    <span className="w-4 h-4 rounded-full bg-[#05299E] text-white flex items-center justify-center text-[9px] font-bold shadow-2xs">
                      ✓
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold tracking-widest text-[#05299E] uppercase bg-white/80 px-2.5 py-0.5 rounded-full border border-[#05299E]/20">
                    ATELIER
                  </span>
                </div>

                {/* Avatar & Stats Row (PURE WHITE BACKGROUND WITH BLUE "ImmAdNgrh." LOGO) */}
                <div className="flex items-center gap-4 mb-3.5">
                  <div className="relative p-[2px] bg-gradient-to-tr from-[#05299E] via-[#0056c8] to-[#93c5fd] rounded-full shadow-sm shrink-0">
                    <div className="w-[74px] h-[76px] sm:w-[76px] sm:h-[76px] rounded-full bg-white border border-white/80 flex flex-col items-center justify-center p-2 text-center overflow-hidden shadow-2xs">
                      {/* 4-Petal Organic Cobalt Icon */}
                      <svg className="w-7 h-7 text-[#0056c8] mb-0.5 shrink-0" fill="currentColor" viewBox="0 0 100 100">
                        <path
                          d="M50 42 C45 22, 24 16, 24 34 C24 48, 44 48, 50 50 C44 52, 24 52, 24 66 C24 84, 45 78, 50 58 C55 78, 76 84, 76 66 C76 52, 56 52, 50 50 C56 48, 76 48, 76 34 C76 16, 55 22, 50 42 Z"
                          transform="rotate(18 50 50)"
                        ></path>
                      </svg>
                      {/* Blue "ImmAdNgrh." Logo Text */}
                      <span className="text-[8.5px] font-extrabold font-display tracking-tight text-[#0056c8] leading-none">
                        ImmAdNgrh.
                      </span>
                    </div>
                  </div>

                  {/* Subtitle / Followers / Stats EVENLY JUSTIFIED */}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold tracking-tight text-neutral-800 mb-2.5">
                      immadngrh.official
                    </p>
                    <div className="flex items-center justify-between px-1 text-center font-sans">
                      <div className="flex flex-col items-center">
                        <span className="block text-sm font-bold leading-tight text-black">9</span>
                        <span className="text-[11px] text-neutral-600 font-medium mt-0.5">posts</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="block text-sm font-bold leading-tight text-black">{followerCount}</span>
                        <span className="text-[11px] text-neutral-600 font-medium mt-0.5">followers</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="block text-sm font-bold leading-tight text-black">123</span>
                        <span className="text-[11px] text-neutral-600 font-medium mt-0.5">following</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bio Tagline */}
                <div className="mb-4 pl-0.5 text-left">
                  <p className="text-[13px] leading-snug font-bold text-neutral-900">
                    @atkapjilstr
                  </p>
                  <div className="text-[11px] font-mono font-bold tracking-widest text-[#05299E] uppercase mt-0.5">
                    HONOR SUPER OMNIA
                  </div>
                </div>

                {/* Profile Actions Button Row */}
                <nav aria-label="Profile actions" className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={handleFollowToggle}
                    className={`flex-1 ${
                      isFollowing
                        ? 'bg-neutral-200/90 text-black'
                        : 'bg-[#1c1b1b] text-white hover:bg-black'
                    } text-xs font-bold py-2 px-3 rounded-full active:scale-95 transition-all shadow-xs`}
                  >
                    {isFollowing ? 'Following' : 'Follow'}
                  </button>
                  <button
                    type="button"
                    className="bg-white/60 hover:bg-white/90 backdrop-blur-lg border border-white/80 text-black text-xs font-semibold py-2 px-2.5 rounded-full active:scale-95 transition-all shadow-2xs"
                  >
                    Message
                  </button>
                  <button
                    type="button"
                    className="bg-white/60 hover:bg-white/90 backdrop-blur-lg border border-white/80 text-black text-xs font-semibold py-2 px-2.5 rounded-full active:scale-95 transition-all shadow-2xs"
                  >
                    Email
                  </button>
                  <button
                    type="button"
                    aria-label="Suggested users"
                    className="bg-white/60 hover:bg-white/90 backdrop-blur-lg border border-white/80 px-2.5 py-2 rounded-full flex items-center justify-center text-black active:scale-95 transition-all shadow-2xs"
                  >
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      viewBox="0 0 24 24"
                    >
                      <line x1="12" x2="12" y1="5" y2="19"></line>
                      <line x1="5" x2="19" y1="12" y2="12"></line>
                    </svg>
                  </button>
                </nav>
              </header>

              {/* GRID CONTENT CARD */}
              <main className="bg-white/50 backdrop-blur-2xl border border-white/80 rounded-[2.25rem] overflow-hidden p-4 pt-2 flex flex-col w-full shadow-[0_15px_35px_rgba(5,41,158,0.08),0_0_1px_1px_rgba(255,255,255,0.9)_inset]">
                {/* Navigation Tabs (Grid, Reels, Tagged) */}
                <div className="grid grid-cols-3 border-b border-neutral-300/50 py-1 mb-2.5" role="tablist">
                  <button
                    type="button"
                    aria-selected={activeFeedTab === 'grid'}
                    onClick={() => setActiveFeedTab('grid')}
                    className={`flex flex-col items-center justify-center pt-2 pb-1.5 relative ${
                      activeFeedTab === 'grid' ? 'text-black font-bold' : 'text-neutral-500'
                    }`}
                    role="tab"
                  >
                    <svg className="w-5 h-5 mb-1" fill="currentColor" viewBox="0 0 24 24">
                      <rect height="5" rx="0.5" width="5" x="3" y="3"></rect>
                      <rect height="5" rx="0.5" width="5" x="9.5" y="3"></rect>
                      <rect height="5" rx="0.5" width="5" x="16" y="3"></rect>
                      <rect height="5" rx="0.5" width="5" x="3" y="9.5"></rect>
                      <rect height="5" rx="0.5" width="5" x="9.5" y="9.5"></rect>
                      <rect height="5" rx="0.5" width="5" x="16" y="9.5"></rect>
                      <rect height="5" rx="0.5" width="5" x="3" y="16"></rect>
                      <rect height="5" rx="0.5" width="5" x="9.5" y="16"></rect>
                      <rect height="5" rx="0.5" width="5" x="16" y="16"></rect>
                    </svg>
                    {activeFeedTab === 'grid' && (
                      <span className="w-7 h-[2px] bg-[#05299E] rounded-full absolute bottom-0"></span>
                    )}
                  </button>

                  <button
                    type="button"
                    aria-selected={activeFeedTab === 'reels'}
                    onClick={() => setActiveFeedTab('reels')}
                    className={`flex items-center justify-center pt-2 pb-1.5 ${
                      activeFeedTab === 'reels' ? 'text-black' : 'text-neutral-500 hover:text-black'
                    }`}
                    role="tab"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.8"
                      viewBox="0 0 24 24"
                    >
                      <rect height="18" rx="5" width="18" x="3" y="3"></rect>
                      <polygon fill="currentColor" points="10 8 16 12 10 16 10 8"></polygon>
                      <line x1="8" x2="8" y1="3" y2="7"></line>
                      <line x1="16" x2="16" y1="3" y2="7"></line>
                    </svg>
                  </button>

                  <button
                    type="button"
                    aria-selected={activeFeedTab === 'tagged'}
                    onClick={() => setActiveFeedTab('tagged')}
                    className={`flex items-center justify-center pt-2 pb-1.5 ${
                      activeFeedTab === 'tagged' ? 'text-black' : 'text-neutral-500 hover:text-black'
                    }`}
                    role="tab"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.8"
                      viewBox="0 0 24 24"
                    >
                      <rect height="18" rx="4" width="18" x="3" y="3"></rect>
                      <circle cx="12" cy="10" r="3.2"></circle>
                      <path d="M7 19c0-2.8 2.2-4.5 5-4.5s5 1.7 5 4.5"></path>
                    </svg>
                  </button>
                </div>

                {/* 3x3 HIGH FASHION EDITORIAL PHOTO FEED GRID */}
                <section className="grid grid-cols-3 gap-2 rounded-2xl overflow-hidden w-full mx-auto">
                  {feedPosts.map((post) => {
                    const isCurrentSelected = selectedPost?.id === post.id;
                    return (
                      <article
                        key={post.id}
                        onClick={() => setSelectedPost(isCurrentSelected ? null : post)}
                        className={`aspect-square bg-stone-100 relative overflow-hidden rounded-xl border transition-all duration-300 cursor-pointer shadow-2xs group ${
                          isCurrentSelected
                            ? 'ring-2 ring-[#05299E] border-transparent scale-102 z-10'
                            : 'border-black/10 hover:scale-[1.02]'
                        }`}
                      >
                        <img
                          src={post.imgSrc}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-1.5">
                          <span className="text-[8px] font-bold text-white tracking-tight line-clamp-1">
                            {post.badge}
                          </span>
                        </div>
                        {post.badge && (
                          <div className="absolute top-1.5 left-1.5 z-10">
                            <span className="px-1.5 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-[7px] font-mono font-bold text-white">
                              {post.badge}
                            </span>
                          </div>
                        )}
                      </article>
                    );
                  })}
                </section>
              </main>
            </div>

            {/* RIGHT PANEL: SLIDES & FADES IN SMOOTHLY FROM CENTER TO RIGHT (OPACITY 0 TO 100) */}
            {selectedPost && (
              <div className="flex-1 w-full bg-white/60 backdrop-blur-2xl border border-white/80 rounded-[2.25rem] p-5 sm:p-6 shadow-[0_20px_45px_rgba(5,41,158,0.12)] space-y-4 animate-fade-in transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] transform translate-x-0 opacity-100">
                {/* Header with Close Button ✕ */}
                <div className="flex items-center justify-between border-b border-black/10 pb-3">
                  <div className="flex items-center gap-2 pr-2">
                    <span className="px-2.5 py-1 rounded-full bg-[#05299E] text-white text-[9px] font-bold font-mono uppercase tracking-wider shadow-2xs">
                      {selectedPost.badge}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold font-display text-black truncate">
                      {selectedPost.title}
                    </h3>
                  </div>

                  {/* CLOSE BUTTON ✕ */}
                  <button
                    type="button"
                    onClick={() => setSelectedPost(null)}
                    title="Tutup & Kembalikan Tampilan Ke Tengah"
                    className="w-8 h-8 rounded-full bg-black/5 hover:bg-black hover:text-white flex items-center justify-center text-black font-bold transition-all duration-300 shrink-0 btn-spring"
                  >
                    ✕
                  </button>
                </div>

                {/* High Resolution Image Box */}
                <div className="relative w-full aspect-[4/3] sm:aspect-square rounded-2xl overflow-hidden border border-black/10 shadow-2xs bg-stone-100">
                  <img
                    src={selectedPost.imgSrc}
                    alt={selectedPost.title}
                    className="w-full h-full object-cover"
                  />
                  {selectedPost.priceFormatted && (
                    <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-black border border-black/10 shadow-xs">
                      {selectedPost.priceFormatted}
                    </div>
                  )}
                </div>

                {/* Subtitle & Details */}
                <div className="p-4 bg-blue-50/70 rounded-2xl border border-blue-100 space-y-1">
                  <p className="text-xs font-bold text-[#05299E] font-mono uppercase tracking-wider">
                    {selectedPost.subtitle}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-800 leading-relaxed pt-1">
                    {selectedPost.details}
                  </p>
                </div>

                {/* Return Action */}
                <button
                  type="button"
                  onClick={() => setSelectedPost(null)}
                  className="w-full py-2.5 rounded-xl bg-[#1c1b1b] hover:bg-black text-white text-xs font-bold transition-all duration-300 shadow-xs btn-spring"
                >
                  ✕ Tutup & Kembalikan Tampilan Ke Tengah
                </button>
              </div>
            )}
          </div>
        </section>


        {/* ================================================================= */}
        {/* SECTION 2 (HALAMAN 2): EDITORIAL TITLE & HERO VISUAL BANNER       */}
        {/* ================================================================= */}
        <section className="space-y-6 sm:space-y-10">
          <div className="max-w-3xl space-y-3 sm:space-y-4">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#1c1b1b] font-display">
              {t.aboutTitle}
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-[#424655] leading-relaxed">
              {t.aboutSubtitle}
            </p>
          </div>

          <div className="relative w-full h-[260px] sm:h-[400px] md:h-[500px] rounded-3xl overflow-hidden bg-gray-200 shadow-xl">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAWowrSlA6JW-bOmR_pj0gvXcorjQ_7aI3iNCFf7jmdqCQDBg-khevNpoLBI7X6Ts3vPd4HPeWhc_s2Xb-iKGaZUWTg_7sT5D8NrWq1oJnrr7NxM_p_bAdHavVsIS3jABtEQg6_ryElOl1UjZuSfPa59a2OG0hEQqCHiC04Py6B-rm4NNPqnr0rvPhqNm-blOABrruDCub3dvyWOdaA1-ZRNwwbsDsk0uJmOPe4zwX68p8awWkUKoLm"
              alt="ImmAdNgrh Atelier Studio in Portugal"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <div className="absolute bottom-5 sm:bottom-8 left-5 sm:left-8 right-5 sm:right-8 text-white max-w-xl space-y-1">
              <span className="text-[10px] sm:text-[11px] uppercase tracking-widest text-[#d9e2ff] font-bold block">
                {t.aboutHeroBadge}
              </span>
              <h3 className="text-lg sm:text-2xl font-bold font-display">{t.aboutHeroTitle}</h3>
            </div>
          </div>
        </section>


        {/* ================================================================= */}
        {/* SECTION 3 (HALAMAN 3): 3 CORE PILLARS                            */}
        {/* ================================================================= */}
        <section className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs uppercase tracking-widest text-[#0056c8] font-bold font-mono">
              {isId ? '3 Pilar Utama Atelier' : '3 Core Architectural Pillars'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1c1b1b] font-display">
              {isId ? 'Fundasi Konstruksi Busana Kami' : 'Constructed With Uncompromising Purpose'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 pt-2">
            <div className="p-6 sm:p-8 rounded-2xl bg-white shadow-sm border border-gray-100 space-y-3 hover:border-gray-300 transition-colors">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#d9e2ff] text-[#0056c8] flex items-center justify-center font-bold text-base sm:text-lg font-display">
                01
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#1c1b1b] font-display">
                {t.pillar1Title}
              </h3>
              <p className="text-xs text-[#424655] leading-relaxed">
                {t.pillar1Desc}
              </p>
            </div>

            <div className="p-6 sm:p-8 rounded-2xl bg-white shadow-sm border border-gray-100 space-y-3 hover:border-gray-300 transition-colors">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#d9e2ff] text-[#0056c8] flex items-center justify-center font-bold text-base sm:text-lg font-display">
                02
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#1c1b1b] font-display">
                {t.pillar2Title}
              </h3>
              <p className="text-xs text-[#424655] leading-relaxed">
                {t.pillar2Desc}
              </p>
            </div>

            <div className="p-6 sm:p-8 rounded-2xl bg-white shadow-sm border border-gray-100 space-y-3 hover:border-gray-300 transition-colors">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#d9e2ff] text-[#0056c8] flex items-center justify-center font-bold text-base sm:text-lg font-display">
                03
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#1c1b1b] font-display">
                {t.pillar3Title}
              </h3>
              <p className="text-xs text-[#424655] leading-relaxed">
                {t.pillar3Desc}
              </p>
            </div>
          </div>
        </section>


        {/* ================================================================= */}
        {/* SECTION 4 (HALAMAN 4): BRAND MANIFESTO                           */}
        {/* ================================================================= */}
        <section className="pt-4">
          <BrandManifesto />
        </section>

      </div>
    </div>
  );
};
