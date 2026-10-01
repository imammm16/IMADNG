import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'id';
export type Currency = 'USD' | 'IDR' | 'EUR' | 'SGD';

export interface Translations {
  // Navigation & Header
  navHome: string;
  navShop: string;
  navAbout: string;
  navArchive: string;
  login: string;
  vipClient: string;
  searchLabel: string;
  bagLabel: string;
  items: string;

  // Hero Section
  heroBadge: string;
  heroHeading: string;
  heroSubheading: string;
  shopCollection: string;
  exploreCut: string;
  garmentSpec: string;
  silhouetteDesc: string;
  doubleMercerized: string;
  edition: string;
  taxIncluded: string;
  densityDesc: string;
  zeroTorqueDesc: string;
  interlockWeaveDesc: string;
  madeIn: string;
  metricDensity: string;
  metricStitches: string;
  metricCotton: string;
  metricAssembly: string;

  // Collection Grid
  newCollectionTitle: string;
  newCollectionSubtitle: string;
  filterAll: string;
  filterHeavyweight: string;
  filterOversized: string;
  filterBlack: string;
  quickView: string;
  addToCart: string;
  addedToCart: string;

  // Editorial Section
  limitedRun: string;
  editorialTitle: string;
  editorialDesc: string;
  discoverPiece: string;
  viewBlueprint: string;
  originLabel: string;
  originValue: string;
  gsmLabel: string;
  gsmValue: string;
  collarLabel: string;
  collarValue: string;
  zeroTorqueLabel: string;
  zeroTorqueValue: string;
  collarDepthLabel: string;
  collarDepthValue: string;
  yarnCountLabel: string;
  yarnCountValue: string;
  colorFastnessLabel: string;
  colorFastnessValue: string;

  // Shop Page
  shopHeading: string;
  shopDescription: string;
  inventoryLabel: string;
  categoryAll: string;
  categoryTshirts: string;
  categoryOversized: string;
  categoryEssentials: string;
  categoryNew: string;
  sortLabel: string;
  sortFeatured: string;
  sortNewest: string;
  sortPriceAsc: string;
  sortPriceDesc: string;
  showingItems: string;
  noProductsFound: string;
  materialScienceTitle: string;
  materialScienceSubtitle: string;
  zeroTorqueTitle: string;
  zeroTorqueBody: string;
  doubleMercerizedTitle: string;
  doubleMercerizedBody: string;
  artisanDyeTitle: string;
  artisanDyeBody: string;

  // About Page
  aboutManifestoBadge: string;
  aboutTitle: string;
  aboutSubtitle: string;
  aboutHeroBadge: string;
  aboutHeroTitle: string;
  pillar1Title: string;
  pillar1Desc: string;
  pillar2Title: string;
  pillar2Desc: string;
  pillar3Title: string;
  pillar3Desc: string;

  // Quick View Modal
  selectProportionSize: string;
  aiSizeConsultant: string;
  addToBagBtn: string;
  addedSuccessMsg: string;
  structuralIntegrity: string;
  careAdvice: string;

  // Cart Drawer
  atelierBag: string;
  complimentaryCourierUnlocked: string;
  addMoreForFreeShipping: string;
  subtotal: string;
  shipping: string;
  freeCourier: string;
  estimatedTotal: string;
  proceedToCheckout: string;
  emptyBagTitle: string;
  emptyBagDesc: string;
  startExploring: string;
  cartRemove: string;
  cartCourierExpress: string;

  // Checkout Modal
  dispatchAllocation: string;
  checkoutSubtitle: string;
  clientInformation: string;
  nameLabel: string;
  emailLabel: string;
  shippingDestination: string;
  addressLabel: string;
  cityLabel: string;
  postalCodeLabel: string;
  countryLabel: string;
  paymentMethodLabel: string;
  paymentQris: string;
  paymentDana: string;
  paymentGopay: string;
  paymentBankTransfer: string;
  paymentQrisDesc: string;
  paymentDanaDesc: string;
  paymentGopayDesc: string;
  paymentBankTransferDesc: string;
  creditCard: string;
  applePay: string;
  cashOnDelivery: string;
  confirmAllocation: string;
  orderConfirmedTitle: string;
  orderConfirmedSub: string;
  orderRef: string;
  backToStore: string;

  // Search Modal
  searchTitle: string;
  searchPlaceholder: string;
  trendingCuts: string;
  noSearchResults: string;
  popularIndex: string;
  matchesFound: string;

  // Auth Modal
  authClientLogin: string;
  authClientRegister: string;
  authWelcomeBack: string;
  authJoinAtelier: string;
  authIdentifier: string;
  authPassword: string;
  authFullName: string;
  authEmail: string;
  authConfirmPass: string;
  authLoginSubmit: string;
  authRegisterSubmit: string;
  authNoAccount: string;
  authHaveAccount: string;
  authRegisterLink: string;
  authLoginLink: string;

  // AI Stylist Modal
  stylistTitle: string;
  stylistPowered: string;
  stylistIntro: string;
  heightLabel: string;
  weightLabel: string;
  chestLabel: string;
  drapeSilhouetteLabel: string;
  drapeSculptural: string;
  drapeFluid: string;
  drapeFitted: string;
  movementContextLabel: string;
  movementPlaceholder: string;
  calculateBtn: string;
  calculatingBtn: string;
  allocationResultTitle: string;
  textileCareAdvice: string;
  recalculateBtn: string;
  viewRecommendedPiece: string;

  // Footer
  footerBrandDesc: string;
  footerAtelierEdition: string;
  footerCraftedIn: string;
  footerNavTitle: string;
  footerClientCare: string;
  footerSizeGuide: string;
  footerShippingInfo: string;
  footerReturns: string;
  footerContactTailor: string;
  footerLegal: string;
  footerPrivacy: string;
  footerTerms: string;
  footerSustainability: string;
  footerCopyright: string;
}

const TRANSLATIONS: Record<Language, Translations> = {
  en: {
    navHome: 'Home',
    navShop: 'Shop',
    navAbout: 'About',
    navArchive: 'Archive & Wire',
    login: 'Login',
    vipClient: 'VIP Client',
    searchLabel: 'Search',
    bagLabel: 'Bag',
    items: 'Items',

    heroBadge: 'ARCHITECTURAL ESSENTIALS',
    heroHeading: 'Wear Your Identity.',
    heroSubheading: 'Distinct character. Sculptural ergonomic drape designed for anatomical movement.',
    shopCollection: 'Shop Collection',
    exploreCut: 'Explore Architectural Cut',
    garmentSpec: 'Garment Spec',
    silhouetteDesc: 'Sculptural Ergonomic Silhouette',
    doubleMercerized: 'Pre-shrunk Double Mercerized',
    edition: 'Edition 01',
    taxIncluded: 'Tax incl.',
    densityDesc: 'Double-mercerized French Terry structure',
    zeroTorqueDesc: 'Zero-torque lateral seams for permanent vertical posture',
    interlockWeaveDesc: 'High-density computational interlock weave',
    madeIn: 'Crafted with Precision',
    metricDensity: 'Weight Density',
    metricStitches: 'Zero Visible Seams',
    metricCotton: 'Organic Cotton',
    metricAssembly: 'Artisan Assembly',

    newCollectionTitle: 'New Collection.',
    newCollectionSubtitle: 'Designed for everyday expression. Crafted with thoughtful precision.',
    filterAll: 'All Editions',
    filterHeavyweight: '320+ GSM Heavyweight',
    filterOversized: 'Oversized Drape',
    filterBlack: 'Obsidian & Black',
    quickView: 'Quick View',
    addToCart: 'Add to Cart',
    addedToCart: 'Added to Bag',

    limitedRun: 'Limited Run 04',
    editorialTitle: 'THE SIGNATURE TEE',
    editorialDesc: 'Refined essentials designed with a modern perspective. Crafted from ultra-dense 340 GSM interlock weave that holds its structural silhouette throughout every movement.',
    discoverPiece: 'Discover Piece',
    viewBlueprint: 'View Construction Blueprint',
    originLabel: 'Origin',
    originValue: 'Atelier Certified',
    gsmLabel: 'Density',
    gsmValue: '340 GSM Interlock',
    collarLabel: 'Collar Rib',
    collarValue: 'Double-Needle Bind',
    zeroTorqueLabel: 'Torque Bias',
    zeroTorqueValue: '0% Structural Drift',
    collarDepthLabel: 'Collar Depth',
    collarDepthValue: '2.4cm Ribbed Stay',
    yarnCountLabel: 'Yarn Count',
    yarnCountValue: '30/2 Combed Compact',
    colorFastnessLabel: 'Color Fastness',
    colorFastnessValue: 'Grade 5 Reactive Dye',

    shopHeading: 'Shop',
    shopDescription: 'Explore the ImmAdNgrh. collection — architectural cuts, calculated drape, and pure computational materiality.',
    inventoryLabel: 'Inventory',
    categoryAll: 'All Pieces',
    categoryTshirts: 'T-Shirts',
    categoryOversized: 'Oversized',
    categoryEssentials: 'Essentials',
    categoryNew: 'New Arrivals',
    sortLabel: 'SORT:',
    sortFeatured: 'Featured',
    sortNewest: 'Newest',
    sortPriceAsc: 'Price: Low to High',
    sortPriceDesc: 'Price: High to Low',
    showingItems: 'Showing pieces',
    noProductsFound: 'No garments found matching this criteria.',
    materialScienceTitle: 'Textile Engineering & Zero-Torque Architecture',
    materialScienceSubtitle: 'Every single meter of fabric is double-mercerized and preshrunk to guarantee exact geometric silhouette retention.',
    zeroTorqueTitle: 'Zero-Torque Drape',
    zeroTorqueBody: 'Every garment profile is pre-washed and calibrated against vertical grain bias, guaranteeing a perpendicular posture that holds its structural integrity wash after wash.',
    doubleMercerizedTitle: 'Double-Mercerized Luster',
    doubleMercerizedBody: 'Liquid caustic treatments eliminate loose surface fuzz, yielding an exceptionally smooth micro-sheen finish and deep light absorption.',
    artisanDyeTitle: 'Reactive Pigment Depth',
    artisanDyeBody: 'Dyed in controlled small batches in Northern Portugal with eco-certified colorfast dyes that resist fading across prolonged ultraviolet exposure.',

    aboutManifestoBadge: 'Textile Engineering Manifesto',
    aboutTitle: 'Architectural Precision in Computational Form.',
    aboutSubtitle: 'ImmAdNgrh. was established to challenge standard fast-fashion decay. We treat the simple t-shirt not as a disposable commodity, but as an engineered architectural vessel for human posture.',
    aboutHeroBadge: 'Atelier Braga — Portugal',
    aboutHeroTitle: 'Precision Weaving & Zero-Torque Dyeing',
    pillar1Title: 'Materiality',
    pillar1Desc: 'We source exclusively 320 GSM to 380 GSM combed Aegean and Peruvian organic cotton. Double-mercerized yarns deliver silk-like hand touch with heavy structural drape that never clings.',
    pillar2Title: 'Digital Geometry',
    pillar2Desc: 'Pattern profiles are digitally calculated to align fabric bias with body ergonomics. Zero shoulder drag, perpendicular hem hang, and reinforced neck collars designed to survive hundreds of cycles.',
    pillar3Title: 'Micro-Batch Ethos',
    pillar3Desc: 'Every drop is produced in limited runs of 250 units per colorway in Braga, Portugal. Laser-etched identification tabs confirm authenticity and provenance.',

    selectProportionSize: 'Select Proportion Size',
    aiSizeConsultant: 'AI Size Consultant',
    addToBagBtn: 'Add to Atelier Bag',
    addedSuccessMsg: 'Garment Added to Bag',
    structuralIntegrity: 'Structural Integrity',
    careAdvice: 'Care Advice',

    atelierBag: 'Atelier Bag',
    complimentaryCourierUnlocked: 'Unlocked Complimentary Global Express Courier',
    addMoreForFreeShipping: 'Add {amount} for Complimentary Express Shipping',
    subtotal: 'Subtotal',
    shipping: 'Shipping',
    freeCourier: 'Free Courier',
    estimatedTotal: 'Estimated Total',
    proceedToCheckout: 'Proceed to Allocation Checkout',
    emptyBagTitle: 'Your Bag is Empty',
    emptyBagDesc: 'Explore our latest architectural cuts and high-density cotton essentials.',
    startExploring: 'Explore Catalogue',
    cartRemove: 'Remove',
    cartCourierExpress: 'Courier Express Shipping',

    dispatchAllocation: 'Atelier Dispatch Allocation',
    checkoutSubtitle: 'Enter delivery details for bespoke garment preparation and express shipping.',
    clientInformation: 'Client Information',
    nameLabel: 'Full Name *',
    emailLabel: 'Email Address *',
    shippingDestination: 'Shipping Destination',
    addressLabel: 'Street Address *',
    cityLabel: 'City *',
    postalCodeLabel: 'Postal / ZIP Code *',
    countryLabel: 'Country *',
    paymentMethodLabel: 'Payment Method',
    paymentQris: 'QRIS (All Banks & E-Wallets)',
    paymentDana: 'DANA E-Wallet',
    paymentGopay: 'GoPay',
    paymentBankTransfer: 'Bank Transfer (Virtual Account)',
    paymentQrisDesc: 'Scan with BCA Mobile, GoPay, DANA, OVO, ShopeePay & all banking apps',
    paymentDanaDesc: 'Fast direct payment with DANA balance or linked card',
    paymentGopayDesc: 'Instant payment with GoPay balance or GoPay Coins',
    paymentBankTransferDesc: 'Virtual Account BCA, Mandiri, BNI, BRI with instant verification',
    creditCard: 'Credit / Debit Card',
    applePay: 'Apple Pay / Digital Wallet',
    cashOnDelivery: 'Courier COD',
    confirmAllocation: 'Confirm Order Allocation',
    orderConfirmedTitle: 'Order Allocation Confirmed',
    orderConfirmedSub: 'Our master cutters have queued your pieces for immediate inspection, packaging, and express dispatch.',
    orderRef: 'Order Reference',
    backToStore: 'Return to Atelier',

    searchTitle: 'Search Atelier Garments',
    searchPlaceholder: 'Search pieces by name, GSM weight, color, or weave...',
    trendingCuts: 'Trending Silhouettes',
    noSearchResults: 'No matching garments found for your search.',
    popularIndex: 'Popular Atelier Index',
    matchesFound: 'Found {count} Matches',

    authClientLogin: 'Client Login',
    authClientRegister: 'Register Client Account',
    authWelcomeBack: 'Enter your client credentials to access the private catalogue and orders.',
    authJoinAtelier: 'Create your Atelier account for bespoke proportion sizing and dispatch tracking.',
    authIdentifier: 'Email Address or Client ID',
    authPassword: 'Password',
    authFullName: 'Full Name',
    authEmail: 'Email Address',
    authConfirmPass: 'Confirm Password',
    authLoginSubmit: 'Sign In',
    authRegisterSubmit: 'Create Account',
    authNoAccount: "Don't have an account yet?",
    authHaveAccount: 'Already registered as a client?',
    authRegisterLink: 'Register Here',
    authLoginLink: 'Sign In Here',

    stylistTitle: 'Atelier AI Size & Fit Stylist',
    stylistPowered: 'Powered by Gemini 2.5 Intelligence',
    stylistIntro: 'Enter your anatomical measurements. Our digital tailoring intelligence calculates your exact proportion index, vertical bias drape, and optimal GSM selection.',
    heightLabel: 'Height (cm)',
    weightLabel: 'Weight (kg)',
    chestLabel: 'Chest (cm)',
    drapeSilhouetteLabel: 'Preferred Drape Silhouette',
    drapeSculptural: 'Sculptural Ergonomic (Default Atelier Cut)',
    drapeFluid: 'Fluid Oversized (Dropped Shoulder, Extended Span)',
    drapeFitted: 'Fitted Atelier (Slightly Tailored Armhole & Waist)',
    movementContextLabel: 'Movement Context / Daily Activity',
    movementPlaceholder: 'e.g., Everyday gallery wear, architectural studio, layering',
    calculateBtn: 'Analyze My Atelier Size & Garment',
    calculatingBtn: 'Calculating Textile Drape Index...',
    allocationResultTitle: 'Anatomical Allocation Result',
    textileCareAdvice: 'Textile Care Advice',
    recalculateBtn: 'Recalculate Specs',
    viewRecommendedPiece: 'View Recommended Piece',

    footerBrandDesc: 'An avant-garde continuum of architectural precision, tactile materiality, and computational sartorial form.',
    footerAtelierEdition: 'Atelier Edition',
    footerCraftedIn: 'Crafted for digital curators and modern connoisseurs in Braga, Portugal.',
    footerNavTitle: 'Navigation',
    footerClientCare: 'Client Care',
    footerSizeGuide: 'Size & Drape Guide',
    footerShippingInfo: 'Express Courier & Tracking',
    footerReturns: '14-Day Complimentary Exchange',
    footerContactTailor: 'Contact Concierge Tailor',
    footerLegal: 'Legal',
    footerPrivacy: 'Privacy Policy',
    footerTerms: 'Terms of Allocation',
    footerSustainability: 'Sustainability & Zero-Torque',
    footerCopyright: 'ImmAdNgrh. All rights reserved.',
  },

  id: {
    navHome: 'Beranda',
    navShop: 'Toko',
    navAbout: 'Tentang',
    navArchive: 'Arsip & Wire',
    login: 'Masuk',
    vipClient: 'Klien VIP',
    searchLabel: 'Cari',
    bagLabel: 'Tas',
    items: 'Produk',

    heroBadge: 'ESENSIAL ARSITEKTURAL',
    heroHeading: 'Kenakan Identitas Anda.',
    heroSubheading: 'Karakter berkelas. Siluet ergonomis arsitektural yang dirancang untuk kebebasan gerak anatomi tubuh.',
    shopCollection: 'Belanja Koleksi',
    exploreCut: 'Eksplorasi Pola Potongan',
    garmentSpec: 'Spesifikasi Busana',
    silhouetteDesc: 'Siluet Ergonomis Arsitektural',
    doubleMercerized: 'Pre-shrunk Double Mercerized',
    edition: 'Edisi 01',
    taxIncluded: 'Termasuk Pajak',
    densityDesc: 'Struktur French Terry double-mercerized',
    zeroTorqueDesc: 'Keliman zero-torque lateral untuk postur vertikal permanen',
    interlockWeaveDesc: 'Anyaman interlock berdensitas tinggi',
    madeIn: 'Dikerjakan di Braga, Portugal',
    metricDensity: 'Kepadatan Gramasi',
    metricStitches: 'Tanpa Jahitan Luar',
    metricCotton: 'Katun Organik',
    metricAssembly: 'Perakitan Artisan',

    newCollectionTitle: 'Koleksi Terbaru.',
    newCollectionSubtitle: 'Dirancang untuk ekspresi harian. Dibuat dengan presisi dan dedikasi arsitektural.',
    filterAll: 'Semua Edisi',
    filterHeavyweight: 'Heavyweight 320+ GSM',
    filterOversized: 'Potongan Oversized',
    filterBlack: 'Obsidian & Hitam',
    quickView: 'Lihat Cepat',
    addToCart: 'Tambah ke Keranjang',
    addedToCart: 'Masuk ke Tas',

    limitedRun: 'Rilis Terbatas 04',
    editorialTitle: 'THE SIGNATURE TEE',
    editorialDesc: 'Busana esensial berkelas dengan perspektif kontemporer. Ditenun dari anyaman interlock 340 GSM ultra-padat yang mempertahankan postur siluet di setiap gerak tubuh.',
    discoverPiece: 'Lihat Detail Busana',
    viewBlueprint: 'Lihat Cetak Biru Konstruksi',
    originLabel: 'Asal Pembuatan',
    originValue: 'Standar Atelier Tersertifikasi',
    gsmLabel: 'Kepadatan Kain',
    gsmValue: 'Interlock 340 GSM',
    collarLabel: 'Kerah Rib',
    collarValue: 'Jahitan Double-Needle',
    zeroTorqueLabel: 'Penyimpangan Jahitan',
    zeroTorqueValue: '0% Drift Struktural',
    collarDepthLabel: 'Ketebalan Kerah',
    collarDepthValue: 'Rib Stay 2.4cm',
    yarnCountLabel: 'Kerapatan Benang',
    yarnCountValue: '30/2 Combed Compact',
    colorFastnessLabel: 'Ketahanan Warna',
    colorFastnessValue: 'Pewarna Reaktif Grade 5',

    shopHeading: 'Katalog Koleksi',
    shopDescription: 'Jelajahi koleksi lengkap ImmAdNgrh. — potongan arsitektural, drape terukur, dan material komputasional berkualitas tinggi.',
    inventoryLabel: 'Inventaris',
    categoryAll: 'Semua Koleksi',
    categoryTshirts: 'T-Shirt',
    categoryOversized: 'Oversized',
    categoryEssentials: 'Esensial',
    categoryNew: 'Rilis Terbaru',
    sortLabel: 'URUTKAN:',
    sortFeatured: 'Unggulan',
    sortNewest: 'Terbaru',
    sortPriceAsc: 'Harga: Terendah ke Tertinggi',
    sortPriceDesc: 'Harga: Tertinggi ke Terendah',
    showingItems: 'Menampilkan koleksi',
    noProductsFound: 'Tidak ada busana yang sesuai dengan kriteria filter.',
    materialScienceTitle: 'Rekayasa Tekstil & Arsitektur Zero-Torque',
    materialScienceSubtitle: 'Setiap meter kain melewati proses double-mercerized dan pre-shrunk demi menjaga retensi siluet geometris.',
    zeroTorqueTitle: 'Siluet Zero-Torque Drape',
    zeroTorqueBody: 'Setiap pola busana dicuci dan dikalibrasi terhadap serat vertikal kain, menjamin postur tegak tegak lurus yang tahan cuci berkali-kali.',
    doubleMercerizedTitle: 'Kilau Double-Mercerized',
    doubleMercerizedBody: 'Perendaman larutan khusus menghilangkan serat halus berlebih, menghasilkan permukaan sutra lembut dan pantulan cahaya yang mewah.',
    artisanDyeTitle: 'Kedalaman Pigmen Reaktif',
    artisanDyeBody: 'Diwarnai dalam batch terbatas dengan pewarna bersertifikasi lingkungan yang tidak mudah luntur oleh sinar matahari.',

    aboutManifestoBadge: 'Manifesto Rekayasa Tekstil',
    aboutTitle: 'Presisi Arsitektural dalam Bentuk Komputasional.',
    aboutSubtitle: 'ImmAdNgrh. didirikan untuk mendefinisikan ulang standar busana kasual. Kami memandang t-shirt bukan sekadar komoditas sekali pakai, melainkan struktur arsitektural penopang postur tubuh manusia.',
    aboutHeroBadge: 'Atelier Spec & Textile Lab',
    aboutHeroTitle: 'Penitenunan Presisi & Pewarnaan Zero-Torque',
    pillar1Title: 'Materialitas',
    pillar1Desc: 'Kami hanya menggunakan katun organik combed 320 GSM hingga 380 GSM dari Aegean & Peru. Benang double-mercerized memberikan rasa lembut layaknya sutra dengan drape berbobot yang tidak menempel di kulit.',
    pillar2Title: 'Geometri Digital',
    pillar2Desc: 'Pola potongan dihitung secara digital untuk menyelaraskan serat kain dengan ergonomi tubuh. Tanpa tarikan bahu, jatuhnya keliman tegak lurus, dan kerah leher kokoh yang tahan ratusan kali pencucian.',
    pillar3Title: 'Etos Batch Mikro',
    pillar3Desc: 'Setiap rilis diproduksi dalam jumlah terbatas 250 unit per varian warna. Dilengkapi nomor identifikasi ukiran laser yang membuktikan keasliannya.',

    selectProportionSize: 'Pilih Proporsi Ukuran',
    aiSizeConsultant: 'Konsultan Ukuran AI',
    addToBagBtn: 'Masukkan ke Tas Atelier',
    addedSuccessMsg: 'Busana Ditambahkan ke Tas',
    structuralIntegrity: 'Integritas Struktural',
    careAdvice: 'Saran Perawatan',

    atelierBag: 'Tas Belanja Atelier',
    complimentaryCourierUnlocked: 'Bebas Ongkir Pengiriman Kilat Terbuka',
    addMoreForFreeShipping: 'Tambah {amount} lagi untuk Bebas Ongkir Kilat',
    subtotal: 'Subtotal',
    shipping: 'Pengiriman',
    freeCourier: 'Gratis Kurir',
    estimatedTotal: 'Total Perkiraan',
    proceedToCheckout: 'Lanjut ke Pembayaran Alokasi',
    emptyBagTitle: 'Tas Belanja Kosong',
    emptyBagDesc: 'Jelajahi potongan siluet arsitektural dan busana esensial katun berbobot kami.',
    startExploring: 'Mulai Belanja Koleksi',
    cartRemove: 'Hapus',
    cartCourierExpress: 'Pengiriman Kurir Kilat',

    dispatchAllocation: 'Alokasi Pengiriman Atelier',
    checkoutSubtitle: 'Lengkapi alamat pengiriman untuk proses penjahitan khusus dan kurir kilat.',
    clientInformation: 'Informasi Klien',
    nameLabel: 'Nama Lengkap *',
    emailLabel: 'Alamat Email *',
    shippingDestination: 'Tujuan Pengiriman',
    addressLabel: 'Alamat Jalan & No. Rumah *',
    cityLabel: 'Kota *',
    postalCodeLabel: 'Kode Pos *',
    countryLabel: 'Negara *',
    paymentMethodLabel: 'Metode Pembayaran',
    paymentQris: 'QRIS (Semua Bank & E-Wallet)',
    paymentDana: 'DANA E-Wallet',
    paymentGopay: 'GoPay',
    paymentBankTransfer: 'Transfer Bank (Virtual Account)',
    paymentQrisDesc: 'Pindai QR dengan BCA Mobile, GoPay, DANA, OVO, ShopeePay & semua m-banking',
    paymentDanaDesc: 'Bayar instan dan praktis dengan saldo DANA Anda',
    paymentGopayDesc: 'Bayar cepat dengan saldo GoPay atau GoPay Coins',
    paymentBankTransferDesc: 'Virtual Account resmi BCA, Mandiri, BNI, BRI verifikasi otomatis',
    creditCard: 'Kartu Kredit / Debit',
    applePay: 'Apple Pay / Dompet Digital',
    cashOnDelivery: 'Bayar di Tempat (COD)',
    confirmAllocation: 'Konfirmasi Pesanan Busana',
    orderConfirmedTitle: 'Alokasi Pesanan Berhasil',
    orderConfirmedSub: 'Tim master cutter kami telah menjadwalkan busana Anda untuk pemeriksaan QC, pengemasan eksklusif, dan pengiriman kilat.',
    orderRef: 'Nomor Pesanan',
    backToStore: 'Kembali ke Toko',

    searchTitle: 'Cari Busana Atelier',
    searchPlaceholder: 'Cari busana berdasarkan nama, berat GSM, warna, atau pola...',
    trendingCuts: 'Pilihan Populer',
    noSearchResults: 'Tidak ditemukan busana yang cocok dengan pencarian.',
    popularIndex: 'Indeks Koleksi Atelier',
    matchesFound: 'Ditemukan {count} Hasil',

    authClientLogin: 'Masuk Klien',
    authClientRegister: 'Daftar Akun Klien',
    authWelcomeBack: 'Masukkan kredensial Anda untuk mengakses katalog privat dan riwayat pesanan.',
    authJoinAtelier: 'Buat akun Atelier Anda untuk rekomendasi ukuran proporsional dan pelacakan pengiriman.',
    authIdentifier: 'Alamat Email atau ID Klien',
    authPassword: 'Kata Sandi',
    authFullName: 'Nama Lengkap',
    authEmail: 'Alamat Email',
    authConfirmPass: 'Konfirmasi Kata Sandi',
    authLoginSubmit: 'Masuk',
    authRegisterSubmit: 'Buat Akun',
    authNoAccount: 'Belum memiliki akun?',
    authHaveAccount: 'Sudah terdaftar sebagai klien?',
    authRegisterLink: 'Daftar Sekarang',
    authLoginLink: 'Masuk di Sini',

    stylistTitle: 'Konsultan Ukuran & Fitting AI Atelier',
    stylistPowered: 'Didukung oleh Kecerdasan Gemini 2.5',
    stylistIntro: 'Masukkan data anatomi Anda. Kecerdasan digital tailoring kami menghitung indeks proporsi, sudut drape, dan rekomendasi GSM kain optimal.',
    heightLabel: 'Tinggi Badan (cm)',
    weightLabel: 'Berat Badan (kg)',
    chestLabel: 'Lingkar Dada (cm)',
    drapeSilhouetteLabel: 'Pilihan Siluet Jatuh Kain',
    drapeSculptural: 'Sculptural Ergonomic (Potongan Standar Atelier)',
    drapeFluid: 'Fluid Oversized (Bahu Turun, Ruang Lebar)',
    drapeFitted: 'Fitted Atelier (Sedikit Pas di Badan & Lengan)',
    movementContextLabel: 'Konteks Aktivitas Harian',
    movementPlaceholder: 'Contoh: Pameran seni, studio arsitektur, gaya harian kasual',
    calculateBtn: 'Hitung Ukuran & Busana Ideal',
    calculatingBtn: 'Menghitung Indeks Drape Tekstil...',
    allocationResultTitle: 'Hasil Alokasi Proporsi Anatomi',
    textileCareAdvice: 'Saran Perawatan Tekstil',
    recalculateBtn: 'Hitung Ulang',
    viewRecommendedPiece: 'Lihat Busana Rekomendasi',

    footerBrandDesc: 'Kontinuum avant-garde presisi arsitektural, materialitas taktil, dan bentuk busana komputasional.',
    footerAtelierEdition: 'Edisi Atelier',
    footerCraftedIn: 'Dikerjakan untuk kurator digital dan penikmat busana di Braga, Portugal.',
    footerNavTitle: 'Navigasi',
    footerClientCare: 'Layanan Klien',
    footerSizeGuide: 'Panduan Ukuran & Drape',
    footerShippingInfo: 'Pengiriman Kilat & Lacak Resi',
    footerReturns: 'Tukar Ukuran Gratis 14 Hari',
    footerContactTailor: 'Hubungi Konsultan Atelier',
    footerLegal: 'Hukum & Kebijakan',
    footerPrivacy: 'Kebijakan Privasi',
    footerTerms: 'Ketentuan Alokasi',
    footerSustainability: 'Keberlanjutan & Zero-Torque',
    footerCopyright: 'ImmAdNgrh. All rights reserved.',
  },
};

interface LocalizationContextType {
  language: Language;
  currency: Currency;
  setLanguage: (lang: Language) => void;
  setCurrency: (curr: Currency) => void;
  formatPrice: (amountInIdr: number) => string;
  t: Translations;
}

const LocalizationContext = createContext<LocalizationContextType | undefined>(undefined);

export const LocalizationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Default language is 'en', default currency is 'USD' as requested by the user
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('imm_user_lang');
      return (saved === 'id' || saved === 'en') ? saved : 'en';
    } catch {
      return 'en';
    }
  });

  const [currency, setCurrencyState] = useState<Currency>(() => {
    try {
      const saved = localStorage.getItem('imm_user_currency');
      return (saved as Currency) || 'USD';
    } catch {
      return 'USD';
    }
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('imm_user_lang', lang);
    } catch (e) {
      console.error(e);
    }
  };

  const setCurrency = (curr: Currency) => {
    setCurrencyState(curr);
    try {
      localStorage.setItem('imm_user_currency', curr);
    } catch (e) {
      console.error(e);
    }
  };

  const formatPrice = (amountInIdr: number): string => {
    if (currency === 'USD') {
      // 1 USD ~ 15,000 IDR (clean standard apparel pricing)
      const usdVal = Math.round(amountInIdr / 15000);
      return `$${usdVal.toLocaleString('en-US')}`;
    }
    if (currency === 'EUR') {
      const eurVal = Math.round(amountInIdr / 16500);
      return `€${eurVal.toLocaleString('en-US')}`;
    }
    if (currency === 'SGD') {
      const sgdVal = Math.round(amountInIdr / 11500);
      return `S$${sgdVal.toLocaleString('en-US')}`;
    }
    // Default IDR
    return `Rp ${amountInIdr.toLocaleString('id-ID')}`;
  };

  const t = TRANSLATIONS[language];

  return (
    <LocalizationContext.Provider
      value={{
        language,
        currency,
        setLanguage,
        setCurrency,
        formatPrice,
        t,
      }}
    >
      {children}
    </LocalizationContext.Provider>
  );
};

export const useLocalization = (): LocalizationContextType => {
  const context = useContext(LocalizationContext);
  if (!context) {
    throw new Error('useLocalization must be used within a LocalizationProvider');
  }
  return context;
};
