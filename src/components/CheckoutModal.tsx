import React, { useState, useEffect } from 'react';
import { CartItem, OrderItem } from '../types';
import { useLocalization } from '../context/LocalizationContext';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onClearCart: () => void;
  onOrderPlaced?: (order: OrderItem) => void;
  clientName?: string;
  clientEmail?: string;
}

export type PaymentType = 'qris' | 'dana' | 'gopay' | 'bank_transfer' | 'card';
export type BankType = 'bca' | 'mandiri' | 'bni' | 'bri';

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  onClearCart,
  onOrderPlaced,
  clientName = '',
  clientEmail = '',
}) => {
  const { formatPrice, t, language } = useLocalization();
  const isEn = language === 'en';

  const [step, setStep] = useState<'form' | 'confirmed'>('form');
  const [formData, setFormData] = useState({
    name: clientName || '',
    email: clientEmail || '',
    address: '',
    city: '',
    postalCode: '',
    country: 'Indonesia',
    paymentMethod: 'qris' as PaymentType,
  });

  // Specific Payment Method Sub-States
  const [selectedBank, setSelectedBank] = useState<BankType>('bca');
  const [danaPhone, setDanaPhone] = useState('081234567890');
  const [gopayPhone, setGopayPhone] = useState('081234567890');
  const [copiedVa, setCopiedVa] = useState(false);
  const [instructionTab, setInstructionTab] = useState<'mbanking' | 'atm' | 'ibanking'>('mbanking');
  const [qrisSecondsLeft, setQrisSecondsLeft] = useState(900); // 15 mins countdown
  const [orderNumber, setOrderNumber] = useState('');
  const [confirmedPaymentLabel, setConfirmedPaymentLabel] = useState('');

  // Promo Code States
  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{
    code: string;
    percent: number;
    label: string;
  } | null>(null);
  const [promoError, setPromoError] = useState<string | null>(null);
  const [promoSuccess, setPromoSuccess] = useState<string | null>(null);

  const PROMO_CODES: Record<string, { percent: number; label: string }> = {
    ZXCVBNM: { percent: 50, label: 'Diskon 50%' },
    ZXCVBNNM: { percent: 10, label: 'Diskon 10%' },
    IMMADN: { percent: 40, label: 'Diskon 40%' },
    ATKPJILSTRI: { percent: 80, label: 'Diskon 80%' },
  };

  // Auto-apply saved promo from Profile Redeem Code tab if available
  useEffect(() => {
    if (isOpen) {
      try {
        const saved = localStorage.getItem('imm_redeemed_promo');
        if (saved) {
          const promo = JSON.parse(saved);
          const upperCode = promo?.code?.toUpperCase();
          if (upperCode && PROMO_CODES[upperCode]) {
            setAppliedPromo({
              code: upperCode,
              percent: PROMO_CODES[upperCode].percent,
              label: PROMO_CODES[upperCode].label,
            });
            setPromoInput(upperCode);
          }
        }
      } catch (e) {
        console.error(e);
      }
    }
  }, [isOpen]);

  const handleApplyPromo = (codeToApply?: string) => {
    const raw = codeToApply !== undefined ? codeToApply : promoInput;
    const code = raw.trim().toUpperCase();
    setPromoError(null);
    setPromoSuccess(null);

    if (!code) {
      setPromoError(isEn ? 'Please enter a promo code.' : 'Silakan masukkan kode promo.');
      return;
    }

    if (PROMO_CODES[code]) {
      const promo = { code, ...PROMO_CODES[code] };
      setAppliedPromo(promo);
      setPromoInput(code);
      setPromoSuccess(
        isEn
          ? `Promo code ${code} applied! You get ${promo.percent}% discount.`
          : `Kode promo ${code} aktif! Anda mendapatkan diskon ${promo.percent}%.`
      );
    } else {
      setPromoError(
        isEn
          ? 'Invalid promo code. Please verify your code and try again.'
          : 'Kode promo tidak valid atau salah penulisan. Silakan periksa kembali.'
      );
    }
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    setPromoInput('');
    setPromoError(null);
    setPromoSuccess(null);
  };

  // QRIS Countdown Timer
  useEffect(() => {
    if (!isOpen || step !== 'form' || formData.paymentMethod !== 'qris') return;
    const interval = setInterval(() => {
      setQrisSecondsLeft((prev) => (prev > 0 ? prev - 1 : 900));
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen, step, formData.paymentMethod]);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, i) => acc + i.product.price * i.quantity, 0);
  const discountPercent = appliedPromo ? appliedPromo.percent : 0;
  const discountAmount = Math.round(subtotal * (discountPercent / 100));
  const discountedSubtotal = Math.max(0, subtotal - discountAmount);
  const shippingFee = discountedSubtotal >= 500000 ? 0 : 25000;
  const total = discountedSubtotal + shippingFee;

  // Format QRIS timer mm:ss
  const formatTimer = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${String(mins).padStart(2, '0')}:${String(remainder).padStart(2, '0')}`;
  };

  // Virtual Account Number Generator based on selected bank
  const getVaNumber = (bank: BankType) => {
    switch (bank) {
      case 'bca':
        return '80777 0812 3456 7890';
      case 'mandiri':
        return '89508 0812 3456 7890';
      case 'bni':
        return '988 0812 3456 7890';
      case 'bri':
        return '12800 0812 3456 7890';
    }
  };

  const getBankName = (bank: BankType) => {
    switch (bank) {
      case 'bca':
        return 'BCA Virtual Account';
      case 'mandiri':
        return 'Mandiri Virtual Account';
      case 'bni':
        return 'BNI Virtual Account';
      case 'bri':
        return 'BRI Virtual Account (BRIVA)';
    }
  };

  const handleCopyVa = (vaText: string) => {
    navigator.clipboard?.writeText(vaText.replace(/\s+/g, ''));
    setCopiedVa(true);
    setTimeout(() => setCopiedVa(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const randomOrderNum = `#IMM-${Math.floor(10000 + Math.random() * 90000)}`;
    const now = new Date();
    const dateFormatted = now.toLocaleDateString(isEn ? 'en-GB' : 'id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

    let paymentLabel = '';
    switch (formData.paymentMethod) {
      case 'qris':
        paymentLabel = isEn ? 'QRIS Instant (Paid)' : 'QRIS (Lunas - Terverifikasi)';
        break;
      case 'dana':
        paymentLabel = `DANA (${danaPhone || '0812-xxxx-xxxx'})`;
        break;
      case 'gopay':
        paymentLabel = `GoPay (${gopayPhone || '0812-xxxx-xxxx'})`;
        break;
      case 'bank_transfer':
        paymentLabel = `Transfer Bank - ${getBankName(selectedBank)}`;
        break;
      case 'card':
        paymentLabel = isEn ? 'Credit / Debit Card (Paid)' : 'Kartu Kredit / Debit (Lunas)';
        break;
      default:
        paymentLabel = 'QRIS Instant (Lunas)';
    }

    const newOrder: OrderItem = {
      id: `ord-${Date.now()}`,
      orderNumber: randomOrderNum,
      date: dateFormatted,
      totalAmount: total,
      paymentMethod: paymentLabel,
      status: 'Dipotong & Dijahit',
      statusStep: 1,
      courier: 'DHL Express VIP Air',
      trackingNumber: `DHL-${randomOrderNum.replace('#', '')}-JKT`,
      shippingAddress: `${formData.address}, ${formData.city} ${formData.postalCode}, ${formData.country}`,
      items: cartItems.map((item) => ({
        name: item.product.name,
        size: item.selectedSize,
        color: item.product.color,
        gsm: `${item.product.gsm} GSM Fabric`,
        price: item.product.price,
        image: item.product.image,
        quantity: item.quantity,
      })),
    };

    setOrderNumber(randomOrderNum);
    setConfirmedPaymentLabel(paymentLabel);
    setStep('confirmed');
    if (onOrderPlaced) {
      onOrderPlaced(newOrder);
    }
    onClearCart();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 animate-fade-in">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-300"
      />

      <div className="relative z-10 w-full max-w-2xl bg-white rounded-3xl p-5 sm:p-8 md:p-10 shadow-2xl border border-gray-100 max-h-[92vh] overflow-y-auto animate-scale-in">
        {step === 'form' ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#0056c8] tracking-widest block">
                  {t.dispatchAllocation}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-[#1c1b1b] font-display">
                  {t.checkoutSubtitle}
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:text-black transition-colors btn-spring"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            {/* Order Brief Summary with Promo Code Integration */}
            <div className="bg-[#f6f3f2] rounded-2xl p-4 sm:p-5 space-y-3 border border-black/[0.04]">
              <div className="flex items-center justify-between text-xs font-bold text-[#1c1b1b] uppercase tracking-wider">
                <span>{isEn ? 'Allocation Items' : 'Ringkasan Pesanan'} ({cartItems.length})</span>
                <span className="text-[#0056c8] font-mono">{formatPrice(subtotal)}</span>
              </div>

              <div className="max-h-28 overflow-y-auto space-y-1.5 divide-y divide-black/[0.04]">
                {cartItems.map((item) => (
                  <div
                    key={`${item.product.id}-${item.selectedSize}`}
                    className="flex justify-between text-xs text-[#424655] pt-1"
                  >
                    <span>
                      {item.quantity}x {item.product.name} ({item.selectedSize})
                    </span>
                    <span className="font-semibold text-[#1c1b1b]">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Promo Code Input & Voucher Chips */}
              <div className="pt-2 border-t border-gray-200/80 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-[#1c1b1b]">
                  <span className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-[#0056c8]">confirmation_number</span>
                    <span>{isEn ? 'Promo Code / Voucher' : 'Kode Promo / Voucher Diskon'}</span>
                  </span>
                  {appliedPromo && (
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full border border-emerald-300">
                      {appliedPromo.code} (-{appliedPromo.percent}%)
                    </span>
                  )}
                </div>

                {!appliedPromo ? (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => {
                        setPromoInput(e.target.value.toUpperCase());
                        setPromoError(null);
                      }}
                      placeholder={isEn ? 'Enter promo code...' : 'Masukkan kode promo...'}
                      className="flex-1 px-3.5 py-2.5 rounded-xl bg-white border border-gray-200 text-xs font-mono font-bold text-[#1c1b1b] placeholder:text-gray-400 placeholder:font-sans uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-[#0056c8]"
                    />
                    <button
                      type="button"
                      onClick={() => handleApplyPromo()}
                      className="px-5 py-2.5 rounded-xl bg-[#1c1b1b] text-white hover:bg-[#0056c8] text-xs font-semibold transition-colors duration-200 btn-spring shrink-0 shadow-2xs"
                    >
                      {isEn ? 'Apply' : 'Gunakan'}
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs animate-scale-in">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[11px] font-bold">
                        ✓
                      </span>
                      <div>
                        <div className="font-bold text-emerald-950 font-mono tracking-wider">
                          {appliedPromo.code}
                        </div>
                        <div className="text-[11px] text-emerald-700">
                          {isEn
                            ? `Discount ${appliedPromo.percent}% applied (Saved ${formatPrice(discountAmount)})`
                            : `Diskon ${appliedPromo.percent}% aktif (Hemat ${formatPrice(discountAmount)})`}
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleRemovePromo}
                      className="text-xs font-bold text-red-600 hover:text-red-700 hover:underline px-2 py-1"
                    >
                      {isEn ? 'Remove' : 'Hapus'}
                    </button>
                  </div>
                )}

                {promoError && (
                  <p className="text-[11px] text-red-500 font-semibold animate-fade-in flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">error</span>
                    <span>{promoError}</span>
                  </p>
                )}
                {promoSuccess && (
                  <p className="text-[11px] text-emerald-600 font-semibold animate-fade-in flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">check_circle</span>
                    <span>{promoSuccess}</span>
                  </p>
                )}
              </div>

              {/* Detailed Price Breakdown */}
              <div className="pt-2 border-t border-gray-200/80 space-y-1 text-xs">
                <div className="flex justify-between text-gray-500">
                  <span>{isEn ? 'Subtotal' : 'Subtotal Produk'}</span>
                  <span className="font-semibold text-[#1c1b1b]">{formatPrice(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span>{isEn ? `Promo Discount (${discountPercent}%)` : `Diskon Promo (${discountPercent}%)`}</span>
                    <span className="font-mono font-bold">-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-500">
                  <span>{isEn ? 'Express Courier' : 'Ongkos Kirim (Express)'}</span>
                  <span className="font-semibold text-emerald-600">
                    {shippingFee === 0 ? (isEn ? 'Free' : 'Gratis') : formatPrice(shippingFee)}
                  </span>
                </div>
                <div className="pt-2 border-t border-gray-200 flex justify-between text-sm font-bold text-[#1c1b1b]">
                  <span>{t.estimatedTotal}</span>
                  <span className="text-[#0056c8] text-base font-black">{formatPrice(total)}</span>
                </div>
              </div>
            </div>

            {/* 1. Customer Delivery Information */}
            <div className="space-y-3">
              <h3 className="text-xs uppercase font-bold text-[#1c1b1b] tracking-wider flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-black text-white text-[10px] flex items-center justify-center font-mono">1</span>
                <span>{t.shippingDestination}</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder={t.nameLabel}
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="px-4 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#0056c8]/20 focus:border-[#0056c8] focus:outline-none transition-all duration-300"
                />
                <input
                  type="email"
                  placeholder={t.emailLabel}
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="px-4 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#0056c8]/20 focus:border-[#0056c8] focus:outline-none transition-all duration-300"
                />
                <input
                  type="text"
                  placeholder={t.addressLabel}
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="sm:col-span-2 px-4 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#0056c8]/20 focus:border-[#0056c8] focus:outline-none transition-all duration-300"
                />
                <input
                  type="text"
                  placeholder={t.cityLabel}
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="px-4 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#0056c8]/20 focus:border-[#0056c8] focus:outline-none transition-all duration-300"
                />
                <input
                  type="text"
                  placeholder={t.postalCodeLabel}
                  required
                  value={formData.postalCode}
                  onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                  className="px-4 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#0056c8]/20 focus:border-[#0056c8] focus:outline-none transition-all duration-300"
                />
              </div>
            </div>

            {/* 2. Payment Options: QRIS, DANA, GoPay, Transfer Bank */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs uppercase font-bold text-[#1c1b1b] tracking-wider flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-black text-white text-[10px] flex items-center justify-center font-mono">2</span>
                  <span>{t.paymentMethodLabel}</span>
                </h3>
                <span className="text-[10px] font-semibold text-[#0056c8] bg-blue-50 px-2 py-0.5 rounded-full">
                  Instant Auto-Verify
                </span>
              </div>

              {/* Payment Method Selector Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {/* QRIS */}
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, paymentMethod: 'qris' })}
                  className={`p-3 rounded-2xl border text-left transition-all duration-200 btn-spring relative overflow-hidden flex flex-col justify-between ${
                    formData.paymentMethod === 'qris'
                      ? 'border-[#0056c8] bg-blue-50/60 ring-2 ring-[#0056c8]/20 shadow-xs'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="w-8 h-8 rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-black text-xs font-mono">
                      QR
                    </span>
                    {formData.paymentMethod === 'qris' && (
                      <span className="material-symbols-outlined text-[#0056c8] text-[18px]">check_circle</span>
                    )}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#1c1b1b] flex items-center gap-1">
                      <span>QRIS</span>
                      <span className="text-[9px] px-1 py-0.2 bg-red-100 text-red-700 font-bold rounded">Instan</span>
                    </div>
                    <div className="text-[10px] text-gray-500 mt-0.5 line-clamp-1">Semua E-Wallet / Bank</div>
                  </div>
                </button>

                {/* DANA */}
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, paymentMethod: 'dana' })}
                  className={`p-3 rounded-2xl border text-left transition-all duration-200 btn-spring relative overflow-hidden flex flex-col justify-between ${
                    formData.paymentMethod === 'dana'
                      ? 'border-[#0056c8] bg-blue-50/60 ring-2 ring-[#0056c8]/20 shadow-xs'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="w-8 h-8 rounded-xl bg-sky-50 text-[#118eea] flex items-center justify-center font-black text-xs">
                      D
                    </span>
                    {formData.paymentMethod === 'dana' && (
                      <span className="material-symbols-outlined text-[#0056c8] text-[18px]">check_circle</span>
                    )}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#1c1b1b] flex items-center gap-1">
                      <span>DANA</span>
                    </div>
                    <div className="text-[10px] text-gray-500 mt-0.5 line-clamp-1">Dompet Digital DANA</div>
                  </div>
                </button>

                {/* GoPay */}
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, paymentMethod: 'gopay' })}
                  className={`p-3 rounded-2xl border text-left transition-all duration-200 btn-spring relative overflow-hidden flex flex-col justify-between ${
                    formData.paymentMethod === 'gopay'
                      ? 'border-[#0056c8] bg-blue-50/60 ring-2 ring-[#0056c8]/20 shadow-xs'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="w-8 h-8 rounded-xl bg-emerald-50 text-[#00a5cf] flex items-center justify-center font-black text-xs">
                      G
                    </span>
                    {formData.paymentMethod === 'gopay' && (
                      <span className="material-symbols-outlined text-[#0056c8] text-[18px]">check_circle</span>
                    )}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#1c1b1b] flex items-center gap-1">
                      <span>GoPay</span>
                    </div>
                    <div className="text-[10px] text-gray-500 mt-0.5 line-clamp-1">Saldo & GoPay Coins</div>
                  </div>
                </button>

                {/* Transfer Bank (Virtual Account) */}
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, paymentMethod: 'bank_transfer' })}
                  className={`p-3 rounded-2xl border text-left transition-all duration-200 btn-spring relative overflow-hidden flex flex-col justify-between ${
                    formData.paymentMethod === 'bank_transfer'
                      ? 'border-[#0056c8] bg-blue-50/60 ring-2 ring-[#0056c8]/20 shadow-xs'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center">
                      <span className="material-symbols-outlined text-[18px]">account_balance</span>
                    </span>
                    {formData.paymentMethod === 'bank_transfer' && (
                      <span className="material-symbols-outlined text-[#0056c8] text-[18px]">check_circle</span>
                    )}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#1c1b1b] flex items-center gap-1">
                      <span>Transfer Bank</span>
                    </div>
                    <div className="text-[10px] text-gray-500 mt-0.5 line-clamp-1">Virtual Account BCA/Mandiri/BNI/BRI</div>
                  </div>
                </button>
              </div>

              {/* ================= DETAIL PANEL: QRIS ================= */}
              {formData.paymentMethod === 'qris' && (
                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-gray-200 shadow-2xs space-y-4 animate-fade-in">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-red-600 text-white font-black text-[11px] rounded tracking-widest font-mono">
                        QRIS
                      </span>
                      <span className="text-xs font-bold text-[#1c1b1b]">
                        National QR Code Standard
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-gray-400 block font-medium">Batas Waktu Bayar</span>
                      <span className="text-xs font-mono font-bold text-red-600 flex items-center justify-end gap-1">
                        <span className="material-symbols-outlined text-[14px]">timer</span>
                        {formatTimer(qrisSecondsLeft)}
                      </span>
                    </div>
                  </div>

                  {/* QRIS Code Box */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-5 py-2">
                    <div className="p-3 bg-white border-2 border-dashed border-gray-300 rounded-2xl shadow-sm flex flex-col items-center">
                      {/* Realistic SVG QR Code with Corner Focus Elements */}
                      <svg
                        className="w-40 h-40 sm:w-44 sm:h-44 text-[#1c1b1b]"
                        viewBox="0 0 160 160"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        {/* Top-Left Finder */}
                        <rect x="10" y="10" width="40" height="40" rx="6" stroke="currentColor" strokeWidth="6" />
                        <rect x="22" y="22" width="16" height="16" rx="2" fill="currentColor" />
                        {/* Top-Right Finder */}
                        <rect x="110" y="10" width="40" height="40" rx="6" stroke="currentColor" strokeWidth="6" />
                        <rect x="122" y="22" width="16" height="16" rx="2" fill="currentColor" />
                        {/* Bottom-Left Finder */}
                        <rect x="10" y="110" width="40" height="40" rx="6" stroke="currentColor" strokeWidth="6" />
                        <rect x="22" y="122" width="16" height="16" rx="2" fill="currentColor" />
                        
                        {/* High-density Data Matrix Simulation */}
                        <rect x="60" y="15" width="8" height="8" fill="currentColor" />
                        <rect x="75" y="15" width="8" height="18" fill="currentColor" />
                        <rect x="90" y="15" width="10" height="8" fill="currentColor" />
                        <rect x="60" y="32" width="16" height="8" fill="currentColor" />
                        <rect x="85" y="32" width="14" height="8" fill="currentColor" />

                        <rect x="15" y="60" width="8" height="16" fill="currentColor" />
                        <rect x="30" y="65" width="12" height="8" fill="currentColor" />
                        <rect x="15" y="85" width="14" height="8" fill="currentColor" />
                        <rect x="35" y="80" width="15" height="16" fill="currentColor" />

                        {/* Center Atelier Emblem Badge */}
                        <rect x="62" y="62" width="36" height="36" rx="8" fill="#0056c8" />
                        <text x="80" y="84" fill="white" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
                          IMM
                        </text>

                        <rect x="110" y="60" width="14" height="8" fill="currentColor" />
                        <rect x="130" y="65" width="16" height="12" fill="currentColor" />
                        <rect x="110" y="80" width="8" height="18" fill="currentColor" />
                        <rect x="125" y="85" width="20" height="8" fill="currentColor" />

                        <rect x="60" y="110" width="8" height="16" fill="currentColor" />
                        <rect x="75" y="115" width="14" height="8" fill="currentColor" />
                        <rect x="60" y="135" width="16" height="8" fill="currentColor" />
                        <rect x="85" y="130" width="12" height="14" fill="currentColor" />

                        <rect x="110" y="115" width="8" height="8" fill="currentColor" />
                        <rect x="125" y="110" width="14" height="14" fill="currentColor" />
                        <rect x="115" y="135" width="24" height="8" fill="currentColor" />
                        <rect x="145" y="130" width="8" height="16" fill="currentColor" />
                      </svg>
                      <div className="mt-2 text-[10px] font-mono font-bold text-gray-500">
                        NMID: ID1024398201948
                      </div>
                    </div>

                    <div className="space-y-2.5 text-center sm:text-left">
                      <div>
                        <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Merchant Resmi</span>
                        <div className="text-sm font-bold text-[#1c1b1b]">IMMADNGRH. ATELIER</div>
                        <div className="text-xs text-[#0056c8] font-bold mt-0.5">{formatPrice(total)}</div>
                      </div>

                      <div className="text-[11px] text-gray-600 space-y-1 leading-relaxed">
                        <p>1. Buka aplikasi m-Banking (BCA, Mandiri, BRI, BNI) atau E-Wallet (GoPay, DANA, OVO, ShopeePay).</p>
                        <p>2. Arahkan kamera atau scan QR Code di samping.</p>
                        <p>3. Konfirmasi nominal dan pembayaran otomatis diverifikasi.</p>
                      </div>

                      {/* App supported badges */}
                      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1 pt-1">
                        {['BCA Mobile', 'Livin', 'BRImo', 'BNI', 'GoPay', 'DANA', 'OVO', 'ShopeePay'].map((app) => (
                          <span key={app} className="text-[9px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-700 font-semibold font-mono">
                            {app}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ================= DETAIL PANEL: DANA ================= */}
              {formData.paymentMethod === 'dana' && (
                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-gray-200 shadow-2xs space-y-4 animate-fade-in">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 bg-[#118eea] text-white font-black text-xs rounded-md font-sans">
                        DANA
                      </span>
                      <span className="text-xs font-bold text-[#1c1b1b]">
                        Pembayaran Dompet Digital DANA
                      </span>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                      Bebas Biaya Admin
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="text-[11px] font-bold text-gray-700 block mb-1">
                        Nomor Handphone Terdaftar DANA *
                      </label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-500 font-mono">
                          +62
                        </span>
                        <input
                          type="tel"
                          required
                          value={danaPhone}
                          onChange={(e) => setDanaPhone(e.target.value)}
                          placeholder="812-xxxx-xxxx"
                          className="w-full pl-12 pr-4 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold focus:outline-none focus:border-[#0056c8] transition-all"
                        />
                      </div>
                    </div>

                    <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-100 text-xs text-gray-600 space-y-1 leading-relaxed">
                      <div className="font-bold text-[#0056c8] flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">info</span>
                        <span>Instruksi Pembayaran DANA</span>
                      </div>
                      <p>
                        Setelah menekan tombol <strong>Konfirmasi Pesanan</strong>, Anda akan menerima permintaan otorisasi langsung di aplikasi DANA untuk menyelesaikan pembayaran sebesar <strong>{formatPrice(total)}</strong>.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* ================= DETAIL PANEL: GOPAY ================= */}
              {formData.paymentMethod === 'gopay' && (
                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-gray-200 shadow-2xs space-y-4 animate-fade-in">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 bg-[#00a5cf] text-white font-black text-xs rounded-md font-sans">
                        GoPay
                      </span>
                      <span className="text-xs font-bold text-[#1c1b1b]">
                        Pembayaran GoPay / GoPay Coins
                      </span>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                      Bebas Biaya Admin
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="text-[11px] font-bold text-gray-700 block mb-1">
                        Nomor Handphone Terdaftar GoPay *
                      </label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-500 font-mono">
                          +62
                        </span>
                        <input
                          type="tel"
                          required
                          value={gopayPhone}
                          onChange={(e) => setGopayPhone(e.target.value)}
                          placeholder="812-xxxx-xxxx"
                          className="w-full pl-12 pr-4 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold focus:outline-none focus:border-[#0056c8] transition-all"
                        />
                      </div>
                    </div>

                    <div className="p-3 bg-cyan-50/50 rounded-xl border border-cyan-100 text-xs text-gray-600 space-y-1 leading-relaxed">
                      <div className="font-bold text-[#00a5cf] flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">bolt</span>
                        <span>Instan & Notifikasi Gojek / GoPay</span>
                      </div>
                      <p>
                        Pembayaran saldo GoPay akan didebit otomatis saat konfirmasi alokasi garmen atelier diproses.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* ================= DETAIL PANEL: TRANSFER BANK ================= */}
              {formData.paymentMethod === 'bank_transfer' && (
                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-gray-200 shadow-2xs space-y-4 animate-fade-in">
                  <div>
                    <label className="text-[11px] font-bold text-gray-700 block mb-2">
                      Pilih Bank Tujuan Virtual Account:
                    </label>

                    {/* Bank Selector Tabs */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {(['bca', 'mandiri', 'bni', 'bri'] as BankType[]).map((bank) => (
                        <button
                          key={bank}
                          type="button"
                          onClick={() => setSelectedBank(bank)}
                          className={`p-2.5 rounded-xl border text-center transition-all duration-200 btn-spring ${
                            selectedBank === bank
                              ? 'border-[#0056c8] bg-blue-50 text-[#0056c8] font-bold shadow-2xs'
                              : 'border-gray-200 bg-gray-50/50 text-gray-700 hover:border-gray-300'
                          }`}
                        >
                          <div className="text-xs uppercase font-black tracking-wider">{bank}</div>
                          <span className="text-[9px] text-gray-500 block mt-0.5">Virtual Account</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Virtual Account Box */}
                  <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200/80 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">
                        {getBankName(selectedBank)}
                      </span>
                      <span className="text-[10px] text-[#0056c8] font-bold bg-blue-100/60 px-2 py-0.5 rounded-md">
                        Verifikasi Otomatis
                      </span>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1">
                      <div>
                        <div className="text-base sm:text-lg font-mono font-black text-[#1c1b1b] tracking-wider">
                          {getVaNumber(selectedBank)}
                        </div>
                        <div className="text-[11px] text-gray-500">
                          Atas Nama: <strong className="text-[#1c1b1b]">IMMADNGRH. ATELIER</strong>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleCopyVa(getVaNumber(selectedBank))}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 btn-spring flex items-center justify-center gap-1.5 self-start sm:self-auto ${
                          copiedVa
                            ? 'bg-emerald-600 text-white'
                            : 'bg-black text-white hover:bg-[#0056c8]'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[16px]">
                          {copiedVa ? 'check' : 'content_copy'}
                        </span>
                        <span>{copiedVa ? 'Tersalin!' : 'Salin No. VA'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Instructions Accordion / Tabs */}
                  <div className="space-y-2 pt-1">
                    <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl">
                      <button
                        type="button"
                        onClick={() => setInstructionTab('mbanking')}
                        className={`flex-1 py-1 rounded-lg text-[11px] font-bold transition-all ${
                          instructionTab === 'mbanking'
                            ? 'bg-white text-[#1c1b1b] shadow-2xs'
                            : 'text-gray-500 hover:text-black'
                        }`}
                      >
                        m-Banking
                      </button>
                      <button
                        type="button"
                        onClick={() => setInstructionTab('atm')}
                        className={`flex-1 py-1 rounded-lg text-[11px] font-bold transition-all ${
                          instructionTab === 'atm'
                            ? 'bg-white text-[#1c1b1b] shadow-2xs'
                            : 'text-gray-500 hover:text-black'
                        }`}
                      >
                        ATM
                      </button>
                      <button
                        type="button"
                        onClick={() => setInstructionTab('ibanking')}
                        className={`flex-1 py-1 rounded-lg text-[11px] font-bold transition-all ${
                          instructionTab === 'ibanking'
                            ? 'bg-white text-[#1c1b1b] shadow-2xs'
                            : 'text-gray-500 hover:text-black'
                        }`}
                      >
                        Internet Banking
                      </button>
                    </div>

                    <div className="p-3 bg-white rounded-xl border border-gray-200 text-[11px] text-gray-600 space-y-1">
                      {instructionTab === 'mbanking' && (
                        <>
                          <p>1. Buka aplikasi m-Banking {selectedBank.toUpperCase()} Anda.</p>
                          <p>2. Pilih menu <strong>Transfer / Bayar</strong> &gt; <strong>Virtual Account</strong>.</p>
                          <p>3. Masukkan nomor VA: <span className="font-mono font-bold text-[#1c1b1b]">{getVaNumber(selectedBank)}</span>.</p>
                          <p>4. Masukkan nominal transfer tepat: <strong className="text-[#0056c8]">{formatPrice(total)}</strong>.</p>
                          <p>5. Masukkan PIN transaksi Anda untuk menyelesaikan.</p>
                        </>
                      )}
                      {instructionTab === 'atm' && (
                        <>
                          <p>1. Masukkan kartu ATM {selectedBank.toUpperCase()} & PIN Anda.</p>
                          <p>2. Pilih <strong>Transaksi Lainnya</strong> &gt; <strong>Transfer</strong> &gt; <strong>Ke Rekening Virtual Account</strong>.</p>
                          <p>3. Masukkan nomor Virtual Account: <span className="font-mono font-bold text-[#1c1b1b]">{getVaNumber(selectedBank)}</span>.</p>
                          <p>4. Periksa detail pesanan IMMADNGRH. ATELIER & tekan <strong>Benar</strong>.</p>
                        </>
                      )}
                      {instructionTab === 'ibanking' && (
                        <>
                          <p>1. Login ke portal Internet Banking {selectedBank.toUpperCase()} Anda.</p>
                          <p>2. Akses menu <strong>Pembayaran Tagihan</strong> &gt; <strong>Virtual Account</strong>.</p>
                          <p>3. Masukkan kode VA <span className="font-mono font-bold">{getVaNumber(selectedBank)}</span> dan konfirmasi dengan token Anda.</p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 rounded-full bg-[#0056c8] hover:bg-[#00429c] text-white text-xs font-semibold shadow-xl transition-all duration-300 btn-spring flex items-center justify-center gap-2"
            >
              <span>{t.confirmAllocation}</span>
              <span>•</span>
              <span>{formatPrice(total)}</span>
            </button>
          </form>
        ) : (
          /* Order Confirmed Screen */
          <div className="py-6 sm:py-8 text-center space-y-6 animate-scale-in">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-[#0056c8] mx-auto animate-bounce">
              <span className="material-symbols-outlined text-3xl">verified</span>
            </div>

            <div className="space-y-2">
              <span className="text-xs uppercase font-bold tracking-widest text-[#0056c8]">
                {t.orderConfirmedTitle}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1c1b1b] font-display">
                {t.orderConfirmedTitle}
              </h2>
              <p className="text-xs text-[#424655] max-w-sm mx-auto leading-relaxed">
                {t.orderConfirmedSub}
              </p>
            </div>

            {/* Order Confirmation Details Box */}
            <div className="p-4 sm:p-5 bg-[#f6f3f2] rounded-2xl max-w-md mx-auto space-y-2.5 text-left text-xs border border-gray-200/80">
              <div className="flex justify-between items-center font-mono border-b border-gray-200/60 pb-2">
                <span className="text-gray-500 font-sans">{t.orderRef}:</span>
                <span className="font-bold text-[#0056c8] text-sm">{orderNumber}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-500">{isEn ? 'Payment Method:' : 'Metode Pembayaran:'}</span>
                <span className="font-bold text-[#1c1b1b] bg-white px-2 py-0.5 rounded border border-gray-200">
                  {confirmedPaymentLabel}
                </span>
              </div>

              {formData.paymentMethod === 'bank_transfer' && (
                <div className="p-3 bg-white rounded-xl border border-gray-200/80 space-y-1">
                  <div className="text-[10px] text-gray-500 uppercase font-bold">Nomor Virtual Account:</div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-black text-sm text-[#1c1b1b]">
                      {getVaNumber(selectedBank)}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopyVa(getVaNumber(selectedBank))}
                      className="text-[10px] font-bold text-[#0056c8] hover:underline"
                    >
                      {copiedVa ? 'Tersalin ✓' : 'Salin'}
                    </button>
                  </div>
                </div>
              )}

              <div className="flex justify-between">
                <span className="text-gray-500">{isEn ? 'Total Amount:' : 'Total Tagihan:'}</span>
                <span className="font-black text-[#0056c8]">{formatPrice(total)}</span>
              </div>

              {appliedPromo && discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 font-medium">
                  <span>{isEn ? 'Promo Discount:' : 'Diskon Kode Promo:'}</span>
                  <span className="font-mono font-bold">
                    -{formatPrice(discountAmount)} ({appliedPromo.code} -{appliedPromo.percent}%)
                  </span>
                </div>
              )}

              <div className="flex justify-between">
                <span className="text-gray-500">{isEn ? 'Estimated Delivery:' : 'Estimasi Pengiriman:'}</span>
                <span className="font-semibold text-[#1c1b1b]">2-3 {isEn ? 'Business Days' : 'Hari Kerja (Express)'}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">{isEn ? 'Courier:' : 'Kurir Alokasi:'}</span>
                <span className="font-semibold text-[#1c1b1b]">DHL Express VIP Air</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="px-8 py-3.5 rounded-full bg-[#1c1b1b] text-white text-xs font-semibold hover:bg-[#0056c8] transition-colors duration-300 btn-spring shadow-md"
            >
              {t.backToStore}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

