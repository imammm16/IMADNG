import React from 'react';
import { CartItem } from '../types';
import { useLocalization } from '../context/LocalizationContext';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, size: string, delta: number) => void;
  onRemoveItem: (productId: string, size: string) => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}) => {
  const { formatPrice, t } = useLocalization();

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const freeShippingThreshold = 500000;
  const shippingFee = 25000;
  const progressToFreeShipping = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fade-in">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-300"
      ></div>

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-gray-100 animate-scale-in">
          
          {/* Cart Header */}
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[22px] text-[#0056c8]">
                shopping_bag
              </span>
              <h2 className="text-xl font-bold text-[#1c1b1b] font-display">{t.atelierBag}</h2>
              <span className="text-xs bg-gray-100 text-[#1c1b1b] px-2.5 py-0.5 rounded-full font-bold">
                {cartItems.reduce((acc, i) => acc + i.quantity, 0)} {t.items}
              </span>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-[#424655] transition-colors btn-spring"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          {/* Free Shipping Progress */}
          <div className="px-6 py-3 bg-[#f6f3f2]/60 border-b border-gray-100 space-y-1.5">
            <div className="flex items-center justify-between text-xs text-[#1c1b1b]">
              {subtotal >= freeShippingThreshold ? (
                <span className="font-semibold text-[#0056c8] flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">verified</span>
                  {t.complimentaryCourierUnlocked}
                </span>
              ) : (
                <span>
                  {t.addMoreForFreeShipping.replace('{amount}', formatPrice(freeShippingThreshold - subtotal))}
                </span>
              )}
            </div>
            <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#0056c8] h-full transition-all duration-500 rounded-full"
                style={{ width: `${progressToFreeShipping}%` }}
              ></div>
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 divide-y divide-gray-100">
            {cartItems.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <span className="material-symbols-outlined text-4xl text-gray-300">
                  shopping_bag
                </span>
                <p className="text-sm text-[#424655] font-medium">{t.emptyBagDesc}</p>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-full bg-[#1c1b1b] text-white text-xs font-semibold hover:bg-[#0056c8] transition-colors duration-300 btn-spring"
                >
                  {t.startExploring}
                </button>
              </div>
            ) : (
              cartItems.map((item, idx) => (
                <div key={`${item.product.id}-${item.selectedSize}`} className={`${idx > 0 ? 'pt-4' : ''} flex gap-4 transition-all duration-300`}>
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-24 object-contain bg-[#f6f3f2] rounded-xl p-2 shrink-0"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-sm font-bold text-[#1c1b1b] font-display">
                          {item.product.name}
                        </h4>
                        <span className="text-sm font-bold text-[#0056c8]">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                      </div>
                      <div className="text-xs text-[#565d6b] mt-0.5 flex items-center gap-2">
                        <span>Size: {item.selectedSize}</span>
                        <span>·</span>
                        <span>{item.product.color}</span>
                      </div>
                    </div>

                    {/* Quantity Stepper & Remove */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-2 border border-gray-200/90 rounded-full px-3 py-1 bg-gray-50/80">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.selectedSize, -1)}
                          className="text-gray-500 hover:text-black font-bold px-1 transition-colors btn-spring"
                        >
                          -
                        </button>
                        <span className="text-xs font-bold w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.selectedSize, 1)}
                          className="text-gray-500 hover:text-black font-bold px-1 transition-colors btn-spring"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.product.id, item.selectedSize)}
                        aria-label={t.cartRemove || "Hapus item"}
                        title={t.cartRemove || "Hapus item"}
                        className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all duration-200 btn-spring"
                      >
                        <span className="material-symbols-outlined text-[19px]">
                          delete
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer / Checkout CTA */}
          {cartItems.length > 0 && (
            <div className="p-6 border-t border-gray-100 bg-[#fcf9f8] space-y-4">
              <div className="space-y-1.5 text-xs text-[#424655]">
                <div className="flex justify-between">
                  <span>{t.subtotal}</span>
                  <span className="font-semibold text-[#1c1b1b]">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>{t.cartCourierExpress}</span>
                  <span className="font-semibold text-emerald-600">
                    {subtotal >= freeShippingThreshold ? t.freeCourier : formatPrice(shippingFee)}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#1c1b1b] pt-2 border-t border-gray-200">
                  <span>{t.estimatedTotal}</span>
                  <span>{formatPrice(subtotal >= freeShippingThreshold ? subtotal : subtotal + shippingFee)}</span>
                </div>
              </div>

              <button
                onClick={onCheckout}
                className="w-full py-4 rounded-full bg-[#146ef5] hover:bg-[#0056c8] text-white text-xs font-semibold shadow-lg shadow-blue-500/20 transition-all duration-300 btn-spring flex items-center justify-center gap-2"
              >
                <span>{t.proceedToCheckout}</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
