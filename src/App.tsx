import React, { useState } from 'react';
import { Product, CartItem, ActiveTab, OrderItem } from './types';
import { PRODUCTS } from './data/products';
import { Header, UserProfile } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { NewCollectionGrid } from './components/NewCollectionGrid';
import { EditorialShowcase } from './components/EditorialShowcase';
import { ShopPage } from './components/ShopPage';
import { AboutPage } from './components/AboutPage';
import { QuickViewModal } from './components/QuickViewModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { AiStylistModal } from './components/AiStylistModal';
import { SearchModal } from './components/SearchModal';
import { AuthModal } from './components/AuthModal';
import { SplashScreen } from './components/SplashScreen';
import { ComingSoonOverlay } from './components/ComingSoonOverlay';
import { Footer } from './components/Footer';
import { ScrollReveal } from './components/ScrollReveal';
import { AppleHighlightsReel } from './components/AppleHighlightsReel';
import { AtelierStudioConfigurator } from './components/AtelierStudioConfigurator';
import { RunwayLookbook } from './components/RunwayLookbook';
import { AtelierKeynoteStats } from './components/AtelierKeynoteStats';
import { Boxy3x2Grid } from './components/Boxy3x2Grid';
import { LuxuryCartAllocationToast, AllocationPayload } from './components/LuxuryCartAllocationToast';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [pendingTab, setPendingTab] = useState<ActiveTab | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [latestAllocation, setLatestAllocation] = useState<AllocationPayload | null>(null);
  
  // User Profile Auth State & Secret Lock
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [isSecretUnlocked, setIsSecretUnlocked] = useState(false);

  // User Orders State (Initially empty for new users; records orders placed from catalogue)
  const [userOrders, setUserOrders] = useState<OrderItem[]>(() => {
    try {
      const saved = localStorage.getItem('imm_user_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const handleOrderPlaced = (newOrder: OrderItem) => {
    setUserOrders(prev => {
      const updated = [newOrder, ...prev];
      try {
        localStorage.setItem('imm_user_orders', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAiStylistOpen, setIsAiStylistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  // Pending actions when user triggers protected features before logging in
  const [pendingAction, setPendingAction] = useState<'cart' | 'search' | null>(null);
  const [pendingProductToAdd, setPendingProductToAdd] = useState<{ product: Product; size: string } | null>(null);

  // Check if background should be blurred (when not logged in and secret not unlocked)
  const isBackgroundBlurred = !currentUser && !isSecretUnlocked;

  // Navigation Guard for Shop & About Tabs
  const handleNavigateTab = (tab: ActiveTab) => {
    if ((tab === 'shop' || tab === 'about') && !currentUser) {
      setPendingTab(tab);
      setIsAuthOpen(true);
      return;
    }
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Dedicated Guards for Cart and Search: If not logged in, must login first!
  const handleOpenCart = () => {
    if (!currentUser) {
      setPendingAction('cart');
      setIsAuthOpen(true);
      return;
    }
    setIsCartOpen(true);
  };

  const handleOpenSearch = () => {
    if (!currentUser) {
      setPendingAction('search');
      setIsAuthOpen(true);
      return;
    }
    setIsSearchOpen(true);
  };

  // Trigger Auth modal when splash completes if not logged in
  const handleSplashComplete = () => {
    setShowSplash(false);
    if (!currentUser) {
      setIsAuthOpen(true);
    }
  };

  // Quick Cart Add with Luxury Allocation Sensory Feedback (Requires Login!)
  const handleAddToCart = (product: Product, selectedSize: string = '2 (M)'): boolean => {
    if (!currentUser) {
      setPendingProductToAdd({ product, size: selectedSize });
      setIsAuthOpen(true);
      return false;
    }

    setCartItems(prev => {
      const existingIdx = prev.findIndex(
        i => i.product.id === product.id && i.selectedSize === selectedSize
      );
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += 1;
        return updated;
      } else {
        return [...prev, { product, selectedSize, quantity: 1 }];
      }
    });

    // Trigger Luxury Cart Allocation Animation & Sound
    setLatestAllocation({
      product,
      selectedSize,
      timestamp: Date.now(),
    });

    return true;
  };

  const handleUpdateQuantity = (productId: string, size: string, delta: number) => {
    setCartItems(prev => {
      return prev
        .map(item => {
          if (item.product.id === productId && item.selectedSize === size) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveItem = (productId: string, size: string) => {
    setCartItems(prev => prev.filter(i => !(i.product.id === productId && i.selectedSize === size)));
  };

  const handleSelectRecommendedProduct = (productName: string) => {
    const matched = PRODUCTS.find(p => p.name.toLowerCase().includes(productName.toLowerCase())) || PRODUCTS[0];
    setQuickViewProduct(matched);
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#fcf9f8] text-[#1c1b1b] font-sans selection:bg-[#d9e2ff] selection:text-[#001945] relative overflow-x-hidden">
      
      {/* Intro Splash Screen */}
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}

      {/* Main Home Page Content Wrapper (Blurred when unauthenticated & secret locked) */}
      <div className={isBackgroundBlurred ? "filter blur-md md:blur-lg pointer-events-none select-none transition-all duration-500" : "transition-all duration-500"}>
        {/* Sticky Liquid Glass Header with Scroll Physics */}
        <Header
          activeTab={activeTab}
          setActiveTab={handleNavigateTab}
          cartCount={cartCount}
          onOpenCart={handleOpenCart}
          onOpenSearch={handleOpenSearch}
          onOpenAuth={() => {
            setShowComingSoon(false);
            setIsAuthOpen(true);
          }}
          currentUser={currentUser}
        />

        {/* Main Content Area */}
        <main className="flex-1 w-full">
          {activeTab === 'home' && (
            <div className="space-y-4">
              {/* Hero Keynote Section (Page 1) */}
              <HeroSection
                heroProduct={PRODUCTS[0]} // Pure White Essential Tee
                onShopClick={() => handleNavigateTab('shop')}
                onQuickView={(p) => setQuickViewProduct(p)}
                onExploreCut={() => {
                  const el = document.getElementById('highlights');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              />

              {/* BØXY 3x2 Editorial Product Grid (Page 2) */}
              <ScrollReveal delayMs={30}>
                <Boxy3x2Grid
                  products={PRODUCTS}
                  onQuickView={(p) => setQuickViewProduct(p)}
                  onAddToCart={handleAddToCart}
                />
              </ScrollReveal>

              {/* Apple-style Cinematic Highlights Reel */}
              <div id="highlights">
                <ScrollReveal delayMs={30}>
                  <AppleHighlightsReel
                    products={PRODUCTS}
                    onQuickView={(p) => setQuickViewProduct(p)}
                    onShopClick={() => handleNavigateTab('shop')}
                  />
                </ScrollReveal>
              </div>

              {/* Interactive Atelier Studio Configurator (Apple Studio Style) */}
              <ScrollReveal delayMs={30}>
                <AtelierStudioConfigurator
                  products={PRODUCTS}
                  onAddToCart={handleAddToCart}
                  onQuickView={(p) => setQuickViewProduct(p)}
                />
              </ScrollReveal>

              {/* Curated Product Collection Grid */}
              <ScrollReveal delayMs={30}>
                <NewCollectionGrid
                  products={PRODUCTS}
                  onQuickView={(p) => setQuickViewProduct(p)}
                  onAddToCart={(p) => handleAddToCart(p, '2 (M)')}
                />
              </ScrollReveal>

              {/* High-Fashion Runway Lookbook with Interactive Hotspots */}
              <ScrollReveal delayMs={30}>
                <RunwayLookbook
                  products={PRODUCTS}
                  onQuickView={(p) => setQuickViewProduct(p)}
                  onExploreShop={() => handleNavigateTab('shop')}
                />
              </ScrollReveal>

              {/* Minimalist Apple Keynote Metric Numbers */}
              <ScrollReveal delayMs={30}>
                <AtelierKeynoteStats />
              </ScrollReveal>

              {/* Iconic Signature Editorial Showcase */}
              <div id="editorial">
                <ScrollReveal delayMs={30}>
                  <EditorialShowcase
                    signatureProduct={PRODUCTS[1]} // Signature Tee Black
                    onDiscover={(p) => setQuickViewProduct(p)}
                  />
                </ScrollReveal>
              </div>
            </div>
          )}

          {activeTab === 'shop' && (
            <div className="animate-fade-in">
              <ShopPage
                products={PRODUCTS}
                onQuickView={(p) => setQuickViewProduct(p)}
              />
            </div>
          )}

          {activeTab === 'about' && (
            <div className="animate-fade-in">
              <AboutPage />
            </div>
          )}
        </main>

        {/* Footer */}
        <Footer
          onNavigate={(tab) => handleNavigateTab(tab)}
          onOpenSizeGuide={() => setIsAiStylistOpen(true)}
        />
      </div>

      {/* Full-Screen Coming Soon Overlay (Triggered when login is closed without authentication) */}
      {showComingSoon && !currentUser && !isSecretUnlocked && (
        <ComingSoonOverlay
          onSecretUnlock={() => {
            setIsSecretUnlocked(true);
            setShowComingSoon(false);
          }}
          onOpenAuth={() => {
            setShowComingSoon(false);
            setIsAuthOpen(true);
          }}
        />
      )}

      {/* Luxury Cart Allocation Sensory Toast */}
      <LuxuryCartAllocationToast
        allocation={latestAllocation}
        onClose={() => setLatestAllocation(null)}
        onOpenCart={handleOpenCart}
      />

      {/* Quick View Product Modal */}
      {quickViewProduct && (
        <QuickViewModal
          key={quickViewProduct.id}
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          onAddToCart={handleAddToCart}
          onOpenAiStylist={() => {
            setQuickViewProduct(null);
            setIsAiStylistOpen(true);
          }}
        />
      )}

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        onClearCart={() => setCartItems([])}
        onOrderPlaced={handleOrderPlaced}
        clientName={currentUser?.name}
        clientEmail={currentUser?.email}
      />

      {/* Gemini AI Size Consultant Modal */}
      <AiStylistModal
        isOpen={isAiStylistOpen}
        onClose={() => setIsAiStylistOpen(false)}
        products={PRODUCTS}
        onSelectRecommendedProduct={handleSelectRecommendedProduct}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={PRODUCTS}
        onQuickView={(p) => setQuickViewProduct(p)}
      />

      {/* Client Profile / Login Modal (Mandatory Gate when not logged in) */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => {
          setIsAuthOpen(false);
          setPendingTab(null);
          setPendingAction(null);
          setPendingProductToAdd(null);
          if (!currentUser && !isSecretUnlocked) {
            setShowComingSoon(true);
          }
        }}
        currentUser={currentUser}
        isMandatory={!currentUser}
        userOrders={userOrders}
        onNavigateShop={() => {
          setIsAuthOpen(false);
          handleNavigateTab('shop');
        }}
        onUpdateUser={(updated) => setCurrentUser(updated)}
        onLoginSuccess={(user) => {
          setCurrentUser(user);
          setIsAuthOpen(false);
          setShowComingSoon(false);
          setIsSecretUnlocked(true);

          // If user attempted to add a product before logging in, process the allocation now
          if (pendingProductToAdd) {
            const prod = pendingProductToAdd.product;
            const sz = pendingProductToAdd.size;
            setCartItems(prev => {
              const existingIdx = prev.findIndex(
                i => i.product.id === prod.id && i.selectedSize === sz
              );
              if (existingIdx > -1) {
                const updated = [...prev];
                updated[existingIdx].quantity += 1;
                return updated;
              } else {
                return [...prev, { product: prod, selectedSize: sz, quantity: 1 }];
              }
            });
            setLatestAllocation({
              product: prod,
              selectedSize: sz,
              timestamp: Date.now(),
            });
            setPendingProductToAdd(null);
          }

          // If user attempted to open Cart or Search before logging in, open the requested drawer/modal now
          if (pendingAction === 'cart') {
            setIsCartOpen(true);
            setPendingAction(null);
          } else if (pendingAction === 'search') {
            setIsSearchOpen(true);
            setPendingAction(null);
          }

          if (pendingTab) {
            setActiveTab(pendingTab);
            setPendingTab(null);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
        onSignOut={() => {
          setCurrentUser(null);
          setIsSecretUnlocked(false);
          setActiveTab('home');
          setIsAuthOpen(true);
        }}
      />

    </div>
  );
}
