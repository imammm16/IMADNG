import React, { useState, useEffect } from 'react';
import { UserProfile } from './Header';
import { OrderItem } from '../types';
import { useLocalization, Language, Currency } from '../context/LocalizationContext';

interface ProfileHubProps {
  currentUser: UserProfile;
  onClose: () => void;
  onSignOut: () => void;
  onUpdateUser?: (user: UserProfile) => void;
  userOrders?: OrderItem[];
  onNavigateShop?: () => void;
}

export type ProfileTab =
  | 'profile'
  | 'orders'
  | 'settings'
  | 'sizing'
  | 'support'
  | 'redeem';

export const ProfileHub: React.FC<ProfileHubProps> = ({
  currentUser,
  onClose,
  onSignOut,
  onUpdateUser,
  userOrders = [],
  onNavigateShop,
}) => {
  const [activeTab, setActiveTab] = useState<ProfileTab>('profile');

  // Global Language & Currency from LocalizationContext (affects the entire website)
  const { language, setLanguage, currency, setCurrency, formatPrice } = useLocalization();

  // Default sample active order for live tracking demonstration
  const initialSampleOrder: OrderItem = {
    id: 'ord-sample-01',
    orderNumber: '#IMM-8921',
    date: '01 Okt 2026',
    totalAmount: 215000,
    paymentMethod: 'QRIS (Lunas)',
    status: 'Cutting & Sewing',
    statusStep: 1,
    courier: 'Express Courier VIP',
    trackingNumber: 'VIP-7789-IND',
    shippingAddress: 'Jl. Senopati No. 42, Jakarta Selatan, 12190',
    items: [
      {
        name: 'Essential Pure White Boxy Tee',
        size: '2 (M)',
        color: 'Pure White',
        gsm: '320 GSM',
        price: 215000,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBxFxFlsmFr5ETdj1pH8YkG3-QnRrhFMGpgqLwgnjyhVYuYp_Bl1ujUsA6PjOjyZoHHaD5PcbJtynNrEesYyHYy52z_kKGGwwTzpvIKd_PHHmZGvMs4Nez-LeODbSVohycdtZHv2zcQWWsn2sv5Me87mGM3wXDtdPN_QZjP9JBlWbeilNEagp9vpjtWIDZLc7csIRIdw_0mUJMZXCZJeT9Tq-r14NZrM2E0fkviD54p33ajobmqk951',
        quantity: 1,
      },
    ],
  };

  // Orders State: Initially populated with user orders or sample active order
  const [orders, setOrders] = useState<OrderItem[]>(() => {
    if (userOrders && userOrders.length > 0) return userOrders;
    try {
      const saved = localStorage.getItem('imm_user_orders');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
      return [initialSampleOrder];
    } catch {
      return [initialSampleOrder];
    }
  });

  // Keep in sync if userOrders prop changes
  useEffect(() => {
    if (userOrders && userOrders.length > 0) {
      setOrders(userOrders);
    }
  }, [userOrders]);

  // Automatic Step Progress Timer: Advances active shipments every 5 seconds (5000ms)
  useEffect(() => {
    const timer = setInterval(() => {
      setOrders((prevOrders) => {
        let hasChanges = false;
        const nextOrders = prevOrders.map((ord) => {
          if (ord.status !== 'Selesai' && (ord.statusStep || 1) < 4) {
            hasChanges = true;
            const nextStep = (ord.statusStep || 1) + 1;
            const stepStatuses: OrderItem['status'][] = [
              'Cutting & Sewing',
              'QC Inspection',
              'In Transit',
              'Delivered',
            ];
            return {
              ...ord,
              statusStep: nextStep,
              status: stepStatuses[nextStep - 1],
            };
          }
          return ord;
        });

        if (hasChanges) {
          try {
            localStorage.setItem('imm_user_orders', JSON.stringify(nextOrders));
          } catch (e) {
            console.error(e);
          }
          return nextOrders;
        }
        return prevOrders;
      });
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  // Order Details / Tracking / Invoice Modals
  const [selectedOrder, setSelectedOrder] = useState<OrderItem | null>(null);
  const [showInvoiceOrder, setShowInvoiceOrder] = useState<OrderItem | null>(null);
  const [orderFilter, setOrderFilter] = useState<'all' | 'progress' | 'completed'>('all');

  // Sync selectedOrder with updated live orders state
  useEffect(() => {
    if (selectedOrder) {
      const updated = orders.find((o) => o.id === selectedOrder.id);
      if (updated && (updated.statusStep !== selectedOrder.statusStep || updated.status !== selectedOrder.status)) {
        setSelectedOrder(updated);
      }
    }
  }, [orders, selectedOrder]);

  // Personal Profile Info States
  const [name, setName] = useState(currentUser.name || 'Client');
  const [username, setUsername] = useState(
    currentUser.name ? `@${currentUser.name.toLowerCase().replace(/\s+/g, '.')}` : '@atelier.client'
  );
  const [email, setEmail] = useState(currentUser.email || '');
  const [phone, setPhone] = useState('0857 1230 8673');
  const [gender, setGender] = useState<'male' | 'female' | 'unspecified'>('male');
  const [birthDate, setBirthDate] = useState('1998-05-14');
  const [bio, setBio] = useState('Architectural silhouette enthusiast. Prioritizing 320 GSM & 360 GSM drape integrity.');
  const [selectedAvatarIdx, setSelectedAvatarIdx] = useState(0);

  // Success Feedback Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Notification Preferences (Theme Mode removed, Early drop email removed)
  const [waOrderNotify, setWaOrderNotify] = useState(true);
  const [waPromoNotify, setWaPromoNotify] = useState(false);
  const [privacyProfilePublic, setPrivacyProfilePublic] = useState(false);

  // Sizing & Fitting States
  const [favSize, setFavSize] = useState('Size 2 (M)');
  const [favGsm, setFavGsm] = useState('320 GSM Heavyweight');
  const [userHeight, setUserHeight] = useState('178');
  const [userWeight, setUserWeight] = useState('72');
  const [userChest, setUserChest] = useState('98');
  const [drapeSilhouette, setDrapeSilhouette] = useState('Sculptural Ergonomic');

  // Logout Confirmation Modal
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  // Redeem Code States
  const [redeemInput, setRedeemInput] = useState('');
  const [redeemError, setRedeemError] = useState<string | null>(null);
  const [redeemSuccess, setRedeemSuccess] = useState<string | null>(null);
  const [activeRedeemedPromo, setActiveRedeemedPromo] = useState<{
    code: string;
    percent: number;
    label: string;
  } | null>(() => {
    try {
      const saved = localStorage.getItem('imm_redeemed_promo');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const handleRedeemCode = (e: React.FormEvent) => {
    e.preventDefault();
    setRedeemError(null);
    setRedeemSuccess(null);

    const rawCode = redeemInput.trim();
    const upper = rawCode.toUpperCase();

    if (!rawCode) {
      setRedeemError(isEn ? 'Please fill in the redeem code correctly.' : 'Harap isi dengan benar.');
      return;
    }

    const REDEEM_CATALOG: Record<string, { percent: number; label: string }> = {
      ZXCVBNM: { percent: 50, label: 'Diskon 50%' },
      ZXCVBNNM: { percent: 10, label: 'Diskon 10%' },
      IMMADN: { percent: 40, label: 'Diskon 40%' },
      ATKPJILSTRI: { percent: 80, label: 'Diskon 80%' },
    };

    if (REDEEM_CATALOG[upper]) {
      const matched = REDEEM_CATALOG[upper];
      const promoObj = {
        code: rawCode,
        percent: matched.percent,
        label: matched.label,
      };
      setActiveRedeemedPromo(promoObj);
      try {
        localStorage.setItem('imm_redeemed_promo', JSON.stringify(promoObj));
      } catch (err) {
        console.error(err);
      }
      setRedeemSuccess(
        isEn
          ? `Code "${rawCode}" redeemed successfully! You get ${matched.percent}% discount.`
          : `Kode "${rawCode}" berhasil ditukarkan! Anda mendapatkan potongan harga ${matched.percent}%.`
      );
      showToast(
        isEn
          ? `Redeem code ${matched.percent}% active!`
          : `Kode redeem diskon ${matched.percent}% berhasil diklaim!`
      );
      setRedeemInput('');
    } else {
      setRedeemError(
        isEn
          ? 'Invalid or expired redeem code. Please verify your code and try again.'
          : 'Kode redeem tidak valid. Pastikan Anda mengisinya dengan benar.'
      );
    }
  };

  const handleRemoveRedeemedPromo = () => {
    setActiveRedeemedPromo(null);
    try {
      localStorage.removeItem('imm_redeemed_promo');
    } catch (e) {
      console.error(e);
    }
    setRedeemSuccess(null);
    setRedeemError(null);
    showToast(isEn ? 'Redeemed code removed.' : 'Kode redeem berhasil dihapus.');
  };

  // Translations dictionary
  const isEn = language === 'en';

  const t = {
    vipClient: isEn ? 'VIP Client' : 'Klien VIP',
    verified: isEn ? 'Verified Account' : 'Akun Terverifikasi',
    signOut: isEn ? 'Sign Out' : 'Keluar',
    close: isEn ? 'Close Window' : 'Tutup Jendela',
    mainNav: isEn ? 'Main Navigation' : 'Navigasi Utama',
    prefSecurity: isEn ? 'Preferences & Security' : 'Preferensi & Keamanan',

    // Tab names
    overviewTab: isEn ? 'Account Overview' : 'Ringkasan Akun',
    profileTab: isEn ? 'Personal Profile' : 'Biodata Diri',
    ordersTab: isEn ? 'My Orders' : 'Pesanan Saya',
    addressTab: isEn ? 'Delivery Addresses' : 'Alamat Pengiriman',
    settingsTab: isEn ? 'Account Settings' : 'Pengaturan Akun',
    sizingTab: isEn ? 'Sizing & Fitting' : 'Fitting & Ukuran',
    paymentTab: isEn ? 'Payment Methods' : 'Pembayaran',
    securityTab: isEn ? 'Password & Security' : 'Kata Sandi & Akses',
    supportTab: isEn ? 'Concierge & FAQ' : 'Bantuan & FAQ',

    // Overview
    welcome: isEn ? `Welcome back, ${name || currentUser.name}` : `Selamat Datang, ${name || currentUser.name}`,
    overviewSub: isEn
      ? 'Manage your personal account, atelier garment allocations, fitting specs, and security credentials.'
      : 'Kelola informasi akun, pesanan atelier, preferensi fitting, serta keamanan sandi Anda.',
    activeOrders: isEn ? 'Active Orders' : 'Pesanan Aktif',
    addressBook: isEn ? 'Address Book' : 'Buku Alamat',
    locations: isEn ? 'Locations' : 'Lokasi',
    primarySize: isEn ? 'Primary Size' : 'Ukuran Utama',
    vipVouchers: isEn ? 'VIP Vouchers' : 'Voucher VIP',
    noActiveOrders: isEn ? 'No active orders' : 'Tidak ada pesanan aktif',
    inProgress: isEn ? 'In Progress' : 'Sedang Diproses',
    primaryActive: isEn ? 'Primary Set' : 'Alamat Utama Aktif',
    noAddressSaved: isEn ? 'No address saved' : 'Belum ada alamat',
    vipTitle: isEn ? 'Exclusive Allocation & Fitting Guarantee' : 'Akses Eksklusif Koleksi & Garansi Fitting',
    vipDesc: isEn
      ? 'Enjoy our 14-day complimentary size exchange guarantee, priority atelier cutting queue, and 1-on-1 WhatsApp master tailor styling consultations.'
      : 'Nikmati garansi tukar ukuran bebas ongkir selama 14 hari, jalur prioritas antrean potong, dan konsultasi fitting master tailor via WhatsApp.',
    contactConcierge: isEn ? 'Contact Concierge' : 'Hubungi Concierge',
    quickActions: isEn ? 'Quick Actions' : 'Aksi Cepat',
    quickEditProfile: isEn ? 'Update Profile & WhatsApp Number' : 'Perbarui Biodata & No. WhatsApp',
    quickEditProfileSub: isEn ? 'Ensure active contact for shipping tracking.' : 'Pastikan nomor aktif untuk notifikasi resi.',
    quickSettings: isEn ? 'Notification & Currency Preferences' : 'Preferensi Notifikasi & Mata Uang',
    quickSettingsSub: isEn ? 'Configure language (EN/ID) and currency (USD/IDR).' : 'Atur bahasa tampilan (EN/ID) dan mata uang (USD/IDR).',

    // Orders
    ordersTitle: isEn ? 'My Orders & Allocations' : 'Pesanan & Transaksi Saya',
    ordersSubtitle: isEn
      ? 'Monitor atelier tailoring status, live tracking codes, and official digital receipts.'
      : 'Pantau status jahitan atelier dan lacak nomor resi pengiriman.',
    filterAll: isEn ? 'All' : 'Semua',
    filterProgress: isEn ? 'In Progress' : 'Diproses',
    filterCompleted: isEn ? 'Completed' : 'Selesai',
    emptyOrdersTitle: isEn ? 'No Orders Placed Yet' : 'Belum Ada Pesanan',
    emptyOrdersSub: isEn
      ? 'Your architectural garment orders will appear here once you allocate pieces from our shop catalogue.'
      : 'Pesanan busana arsitektural Anda akan tercatat di sini setelah Anda melakukan alokasi dari katalog toko.',
    browseCatalogue: isEn ? 'Browse Shop Catalogue' : 'Jelajahi Katalog Toko',
    orderNum: isEn ? 'Order' : 'Nomor Pesanan',
    allocationDate: isEn ? 'Allocation Date' : 'Tanggal Pesanan',
    statusStep1: isEn ? 'Cutting & Sewing' : 'Dipotong & Dijahit',
    statusStep2: isEn ? 'QC Inspection' : 'Proses QC',
    statusStep3: isEn ? 'In Transit' : 'Dalam Pengiriman',
    statusStep4: isEn ? 'Delivered' : 'Selesai',
    courier: isEn ? 'Courier' : 'Kurir',
    tracking: isEn ? 'Tracking Number' : 'Nomor Resi',
    trackShipment: isEn ? 'Track Shipment' : 'Lacak Resi',
    viewInvoice: isEn ? 'View Receipt' : 'Lihat Struk / Invoice',

    // Addresses
    addressTitle: isEn ? 'Delivery & Shipping Addresses' : 'Alamat Pengiriman',
    addressSubtitle: isEn
      ? 'Define where your tailored architectural garments and luxury packaging are dispatched.'
      : 'Tentukan alamat tujuan pengiriman pesanan atelier Anda.',
    addNewAddress: isEn ? '+ Add New Delivery Address' : '+ Tambah Alamat Pengiriman Baru',
    emptyAddressTitle: isEn ? 'No Saved Delivery Addresses' : 'Belum Ada Alamat Pengiriman Tersimpan',
    emptyAddressSub: isEn
      ? 'You have not added any delivery address yet. Add your primary shipping address so we can allocate your pieces seamlessly.'
      : 'Anda belum mendaftarkan alamat pengiriman. Tentukan alamat tujuan Anda agar alokasi pesanan dapat diproses dengan cepat.',
    primaryAddressBadge: isEn ? 'Primary Address' : 'Alamat Utama',
    setAsPrimary: isEn ? 'Set as Primary' : 'Jadikan Alamat Utama',
    edit: isEn ? 'Edit' : 'Ubah',
    delete: isEn ? 'Delete' : 'Hapus',
    recipient: isEn ? 'Recipient' : 'Penerima',
    phone: isEn ? 'Phone' : 'Telepon',

    // Settings
    settingsTitle: isEn ? 'Account & Interface Settings' : 'Pengaturan Akun & Antarmuka',
    settingsSubtitle: isEn
      ? 'Configure language, currency display, and preferred notification channels.'
      : 'Konfigurasikan bahasa, format mata uang, serta saluran notifikasi yang Anda inginkan.',
    regionalTitle: isEn ? 'Regional & Display Preferences' : 'Preferensi Bahasa & Mata Uang',
    langLabel: isEn ? 'Interface Language' : 'Bahasa Tampilan',
    langSub: isEn ? 'Switch between English and Bahasa Indonesia.' : 'Pilih bahasa antarmuka aplikasi.',
    currencyLabel: isEn ? 'Default Currency' : 'Mata Uang Default',
    currencySub: isEn ? 'Prices and order totals will adapt to this format.' : 'Semua harga akan diformat sesuai pilihan ini.',
    saveSettings: isEn ? 'Save Settings' : 'Simpan Pengaturan',
    notifyTitle: isEn ? 'Notification Channels' : 'Saluran Pemberitahuan',
    waOrderTitle: isEn ? 'WhatsApp Order & Dispatch Updates' : 'Pembaruan Status Pesanan WhatsApp',
    waOrderDesc: isEn
      ? 'Receive instant WhatsApp alerts when your pieces are cut, inspected, and tracking numbers are assigned.'
      : 'Terima pesan WhatsApp instan saat pesanan dipotong, QC, & nomor resi terbit.',
    waPromoTitle: isEn ? 'Exclusive VIP Vouchers & Birthday Privileges' : 'Voucher Eksklusif & Hadiah Ulang Tahun',
    waPromoDesc: isEn
      ? 'Receive private promotional allocations and birthday discount codes.'
      : 'Kode diskon VIP hari raya dan diskon ulang tahun khusus klien.',
    privacyTitle: isEn ? 'Profile Privacy' : 'Privasi Profil',
    privacyHideOrders: isEn ? 'Keep Order History Private' : 'Sembunyikan Riwayat Pembelian Publik',
    privacyDesc: isEn
      ? 'Only you and the master atelier cutter can view your custom garment allocations.'
      : 'Hanya Anda dan konsultan atelier yang dapat melihat koleksi tersimpan.',

    // Personal Profile
    profileTitle: isEn ? 'Personal Information & Bio' : 'Informasi & Biodata Diri',
    profileSubtitle: isEn
      ? 'Used for client allocation records and customized atelier tailoring services.'
      : 'Informasi ini digunakan untuk personalisasi layanan atelier dan pengiriman paket kustom.',
    avatarStyle: isEn ? 'Avatar Accent & Initials' : 'Gaya Inisial & Warna Avatar',
    fullName: isEn ? 'Full Name *' : 'Nama Lengkap *',
    clientUsername: isEn ? 'Client Username' : 'Panggilan Klien / Username',
    emailAddress: isEn ? 'Email Address *' : 'Alamat Email *',
    verifiedEmail: isEn ? 'Verified ✓' : 'Terverifikasi ✓',
    whatsappNum: isEn ? 'WhatsApp / Mobile Number *' : 'Nomor WhatsApp / Seluler *',
    genderLabel: isEn ? 'Gender' : 'Jenis Kelamin',
    male: isEn ? 'Male' : 'Pria',
    female: isEn ? 'Female' : 'Wanita',
    unspecified: isEn ? 'Unspecified' : 'Lainnya / Tidak Disebutkan',
    birthdate: isEn ? 'Date of Birth (VIP Birthday Gift)' : 'Tanggal Lahir (Hadiah Ulang Tahun VIP)',
    bioLabel: isEn ? 'Sartorial Bio & Cut Preferences' : 'Bio Sartorial / Catatan Preferensi Gaya',
    saveProfile: isEn ? 'Save Profile Changes' : 'Simpan Perubahan Biodata',

    // Sizing
    sizingTitle: isEn ? 'Fitting & Anatomical Measurements' : 'Fitting & Indeks Ukuran Tubuh',
    sizingSubtitle: isEn
      ? 'Your saved measurements help our digital cutting system recommend the ideal GSM and size.'
      : 'Data ukuran ini dipakai oleh algoritma tailoring kami untuk rekomendasi ukuran presisi.',
    saveSizing: isEn ? 'Save Fitting Specs' : 'Simpan Spesifikasi Fitting',

    // Payment
    paymentTitle: isEn ? 'Saved Payment Methods' : 'Metode Pembayaran Tersimpan',
    paymentSubtitle: isEn ? 'Manage fast checkout cards and virtual accounts.' : 'Kelola kartu dan akun virtual untuk alokasi cepat.',
    addCard: isEn ? '+ Add New Card' : '+ Tambah Kartu Baru',

    // Security
    securityTitle: isEn ? 'Password & Security Access' : 'Kata Sandi & Keamanan Akses',
    securitySubtitle: isEn ? 'Keep your atelier client account protected.' : 'Jaga keamanan akun klien atelier Anda.',
    currentPassword: isEn ? 'Current Password' : 'Kata Sandi Saat Ini',
    newPassword: isEn ? 'New Password' : 'Kata Sandi Baru',
    confirmNewPassword: isEn ? 'Confirm New Password' : 'Konfirmasi Kata Sandi Baru',
    updatePassword: isEn ? 'Update Password' : 'Ganti Kata Sandi',
  };

  // Filtered orders
  const filteredOrders = orders.filter((ord) => {
    if (orderFilter === 'progress') return ord.status !== 'Selesai';
    if (orderFilter === 'completed') return ord.status === 'Selesai';
    return true;
  });

  // Complete Order & Move to History
  const handleCompleteOrder = (orderId: string) => {
    setOrders((prevOrders) => {
      const updated = prevOrders.map((ord) => {
        if (ord.id === orderId) {
          return {
            ...ord,
            status: 'Selesai' as const,
            statusStep: 4,
          };
        }
        return ord;
      });
      try {
        localStorage.setItem('imm_user_orders', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });

    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder(null);
    }

    showToast(
      isEn
        ? 'Order completed & archived to Order History!'
        : 'Pesanan telah selesai & masuk ke riwayat pesanan!'
    );
  };
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (onUpdateUser) {
      onUpdateUser({
        name: name.trim() || currentUser.name,
        email: email.trim() || currentUser.email,
      });
    }
    showToast(isEn ? 'Profile updated successfully!' : 'Profil dan informasi akun berhasil diperbarui!');
  };

  // Handle Save Settings
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      localStorage.setItem('imm_user_lang', language);
      localStorage.setItem('imm_user_currency', currency);
    } catch (err) {
      console.error(err);
    }
    showToast(
      isEn
        ? 'Settings and currency preferences saved!'
        : 'Pengaturan preferensi bahasa dan mata uang berhasil disimpan!'
    );
  };

  // Handle Save Sizing
  const handleSaveSizing = (e: React.FormEvent) => {
    e.preventDefault();
    showToast(isEn ? 'Fitting specs saved!' : 'Data fitting & indeks ukuran tubuh berhasil diperbarui!');
  };

  // Avatar presets
  const avatarColors = [
    'bg-[#0056c8] text-white',
    'bg-[#1c1b1b] text-white',
    'bg-[#2d4059] text-white',
    'bg-[#0f4c81] text-white',
    'bg-[#40514e] text-white',
  ];

  const getInitials = (n: string) => {
    if (!n) return 'IA';
    const parts = n.trim().split(' ').filter(Boolean);
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  return (
    <div className="w-full flex flex-col h-[85vh] max-h-[780px] bg-[#faf9f8] text-[#1c1b1b] overflow-hidden select-text relative">
      {/* ================= TOAST NOTIFICATION ================= */}
      {toastMessage && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-full bg-[#1c1b1b] text-white text-xs font-semibold shadow-xl border border-white/20 flex items-center gap-2 animate-scale-in">
          <span className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-bold">
            ✓
          </span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ================= TOP HEADER BAR ================= */}
      <div className="px-5 py-4 sm:px-8 bg-white border-b border-gray-200/80 flex items-center justify-between shrink-0 shadow-2xs">
        <div className="flex items-center gap-3.5 sm:gap-4">
          {/* Avatar with Ring */}
          <div className="relative">
            <div
              className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl ${avatarColors[selectedAvatarIdx]} flex items-center justify-center text-base sm:text-lg font-black tracking-wider shadow-md border-2 border-white ring-2 ring-[#0056c8]/20`}
            >
              {getInitials(name || currentUser.name)}
            </div>
            <span
              className="absolute -bottom-1 -right-1 w-4.5 h-4.5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[9px] font-bold shadow-xs border border-white"
              title={t.verified}
            >
              ✓
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold font-display text-[#1c1b1b] tracking-tight flex items-center gap-1.5">
                <span>{name || currentUser.name}</span>
                <svg className="w-4.5 h-4.5 text-[#0095f6] shrink-0 inline-block" viewBox="0 0 24 24" fill="currentColor">
                  <title>{t.verified}</title>
                  <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.79-4-4-4-.495 0-.965.084-1.4.238C14.55 2.475 13.18 1.6 11.6 1.6c-1.58 0-2.95.875-3.6 2.148-.435-.154-.905-.238-1.4-.238-2.21 0-4 1.79-4 4 0 .495.084.965.238 1.4C1.475 9.55.6 10.92.6 12.5c0 1.58.875 2.95 2.148 3.6-.154.435-.238.905-.238 1.4 0 2.21 1.79 4 4 4 .495 0 .965-.084 1.4-.238 1.05 1.273 2.42 2.148 4 2.148 1.58 0 2.95-.875 3.6-2.148.435.154.905.238 1.4.238 2.21 0 4-1.79 4-4 0-.495-.084-.965-.238-1.4 1.273-1.05 2.148-2.42 2.148-4zM10 17.2l-4.2-4.2 1.4-1.4 2.8 2.8 7.2-7.2 1.4 1.4L10 17.2z"/>
                </svg>
              </h2>
            </div>
            <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-2">
              <span>{email || currentUser.email}</span>
              <span className="text-gray-300">•</span>
              <span className="font-mono text-[11px] text-gray-400">
                {currency} • {isEn ? 'EN' : 'ID'}
              </span>
            </p>
          </div>
        </div>

        {/* Header Right Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowLogoutConfirm(true)}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-200 hover:border-red-300 text-xs font-semibold text-gray-600 hover:text-red-600 hover:bg-red-50/60 transition-all btn-spring"
            title={t.signOut}
          >
            <span className="material-symbols-outlined text-[16px]">logout</span>
            <span>{t.signOut}</span>
          </button>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center transition-colors btn-spring"
            title={t.close}
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>
      </div>

      {/* ================= MAIN CONTENT SPLIT (SIDEBAR & CONTENT BODY) ================= */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* ================= LEFT NAVIGATION SIDEBAR ================= */}
        <aside className="w-full md:w-68 bg-white border-b md:border-b-0 md:border-r border-gray-200/80 p-2 sm:p-3 shrink-0 flex md:flex-col overflow-x-auto md:overflow-y-auto no-scrollbar gap-1">
          <div className="hidden md:block px-3 py-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            {t.mainNav}
          </div>

          <button
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 whitespace-nowrap btn-spring shrink-0 ${
              activeTab === 'profile'
                ? 'bg-[#0056c8] text-white shadow-xs'
                : 'text-gray-600 hover:text-[#1c1b1b] hover:bg-gray-100/70'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">person</span>
            <span>{t.profileTab}</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 whitespace-nowrap btn-spring shrink-0 ${
              activeTab === 'orders'
                ? 'bg-[#0056c8] text-white shadow-xs'
                : 'text-gray-600 hover:text-[#1c1b1b] hover:bg-gray-100/70'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">inventory_2</span>
            <span>{t.ordersTab}</span>
            {orders.length > 0 && (
              <span
                className={`ml-auto text-[10px] font-black px-1.5 py-0.5 rounded-md ${
                  activeTab === 'orders' ? 'bg-white/20 text-white' : 'bg-blue-100 text-[#0056c8]'
                }`}
              >
                {orders.length}
              </span>
            )}
          </button>

          <div className="hidden md:block my-2 border-t border-gray-100" />
          <div className="hidden md:block px-3 py-1 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            {isEn ? 'Preferences & Sizing' : 'Preferensi & Ukuran'}
          </div>

          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 whitespace-nowrap btn-spring shrink-0 ${
              activeTab === 'settings'
                ? 'bg-[#0056c8] text-white shadow-xs'
                : 'text-gray-600 hover:text-[#1c1b1b] hover:bg-gray-100/70'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">settings</span>
            <span>{t.settingsTab}</span>
          </button>

          <button
            onClick={() => setActiveTab('sizing')}
            className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 whitespace-nowrap btn-spring shrink-0 ${
              activeTab === 'sizing'
                ? 'bg-[#0056c8] text-white shadow-xs'
                : 'text-gray-600 hover:text-[#1c1b1b] hover:bg-gray-100/70'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">straighten</span>
            <span>{t.sizingTab}</span>
          </button>

          <button
            onClick={() => setActiveTab('support')}
            className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 whitespace-nowrap btn-spring shrink-0 ${
              activeTab === 'support'
                ? 'bg-[#0056c8] text-white shadow-xs'
                : 'text-gray-600 hover:text-[#1c1b1b] hover:bg-gray-100/70'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">support_agent</span>
            <span>{t.supportTab}</span>
          </button>

          <button
            onClick={() => setActiveTab('redeem')}
            className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 whitespace-nowrap btn-spring shrink-0 ${
              activeTab === 'redeem'
                ? 'bg-[#0056c8] text-white shadow-xs'
                : 'text-gray-600 hover:text-[#1c1b1b] hover:bg-gray-100/70'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">confirmation_number</span>
            <span>{isEn ? 'Redeem Code' : 'Redeem Code'}</span>
          </button>

          {/* Mobile Logout item */}
          <button
            onClick={() => setShowLogoutConfirm(true)}
            className="md:hidden flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 shrink-0"
          >
            <span className="material-symbols-outlined text-[18px]">logout</span>
            <span>{t.signOut}</span>
          </button>
        </aside>

        {/* ================= RIGHT TAB BODY ================= */}
        <main className="flex-1 p-4 sm:p-7 overflow-y-auto bg-[#faf9f8]">
          {/* ================= 1. TAB BIODATA DIRI (PROFILE) ================= */}
          {activeTab === 'profile' && (
            <form onSubmit={handleSaveProfile} className="space-y-6 animate-fade-in max-w-2xl">
              <div>
                <h3 className="text-base sm:text-lg font-bold font-display text-[#1c1b1b]">{t.profileTitle}</h3>
                <p className="text-xs text-gray-500 mt-0.5">{t.profileSubtitle}</p>
              </div>

              {/* Avatar Selector */}
              <div className="p-4 bg-white rounded-2xl border border-gray-200/80 space-y-3">
                <label className="text-xs font-bold text-[#1c1b1b] block">{t.avatarStyle}</label>
                <div className="flex items-center gap-3">
                  {avatarColors.map((colorClass, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedAvatarIdx(idx)}
                      className={`w-11 h-11 rounded-xl ${colorClass} flex items-center justify-center text-xs font-black shadow-xs transition-all ${
                        selectedAvatarIdx === idx ? 'ring-3 ring-[#0056c8] ring-offset-2 scale-105' : 'opacity-70 hover:opacity-100'
                      }`}
                    >
                      {getInitials(name || currentUser.name)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Form Input Fields */}
              <div className="p-5 bg-white rounded-2xl border border-gray-200/80 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-gray-600 block mb-1">
                      {t.fullName}
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50/50 border border-gray-200 text-xs text-[#1c1b1b] font-medium focus:bg-white focus:outline-none focus:border-[#0056c8] transition-all"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-gray-600 block mb-1">
                      {t.clientUsername}
                    </label>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="@username"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50/50 border border-gray-200 text-xs text-[#1c1b1b] font-medium focus:bg-white focus:outline-none focus:border-[#0056c8] transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-gray-600">
                        {t.emailAddress}
                      </label>
                      <span className="text-[10px] text-emerald-600 font-bold">{t.verifiedEmail}</span>
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50/50 border border-gray-200 text-xs text-[#1c1b1b] font-medium focus:bg-white focus:outline-none focus:border-[#0056c8] transition-all"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-gray-600 block mb-1">
                      {t.whatsappNum}
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+62 812-xxxx-xxxx"
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50/50 border border-gray-200 text-xs text-[#1c1b1b] font-medium focus:bg-white focus:outline-none focus:border-[#0056c8] transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-gray-600 block mb-1">
                      {t.genderLabel}
                    </label>
                    <select
                      value={gender}
                      onChange={(e: any) => setGender(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50/50 border border-gray-200 text-xs text-[#1c1b1b] font-medium focus:bg-white focus:outline-none focus:border-[#0056c8] transition-all"
                    >
                      <option value="male">{t.male}</option>
                      <option value="female">{t.female}</option>
                      <option value="unspecified">{t.unspecified}</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-gray-600 block mb-1">
                      {t.birthdate}
                    </label>
                    <input
                      type="date"
                      value={birthDate}
                      onChange={(e) => setBirthDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50/50 border border-gray-200 text-xs text-[#1c1b1b] font-medium focus:bg-white focus:outline-none focus:border-[#0056c8] transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-gray-600 block mb-1">
                    {t.bioLabel}
                  </label>
                  <textarea
                    rows={2}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Describe your structural silhouette preference..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50/50 border border-gray-200 text-xs text-[#1c1b1b] font-medium focus:bg-white focus:outline-none focus:border-[#0056c8] transition-all resize-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-[#0056c8] hover:bg-[#0041a3] text-white text-xs font-bold uppercase tracking-wider transition-all btn-spring shadow-md"
                >
                  {t.saveProfile}
                </button>
              </div>
            </form>
          )}

          {/* ================= 3. TAB PENGATURAN AKUN (SETTINGS) ================= */}
          {activeTab === 'settings' && (
            <form onSubmit={handleSaveSettings} className="space-y-6 animate-fade-in max-w-2xl">
              <div>
                <h3 className="text-base sm:text-lg font-bold font-display text-[#1c1b1b]">{t.settingsTitle}</h3>
                <p className="text-xs text-gray-500 mt-0.5">{t.settingsSubtitle}</p>
              </div>

              {/* Regional Preferences (Language & Currency) */}
              <div className="p-5 bg-white rounded-2xl border border-gray-200/80 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#1c1b1b]">{t.regionalTitle}</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Language Selector */}
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-gray-600 block mb-1">
                      {t.langLabel}
                    </label>
                    <select
                      value={language}
                      onChange={(e) => {
                        const newLang = e.target.value as Language;
                        setLanguage(newLang);
                        try {
                          localStorage.setItem('imm_user_lang', newLang);
                        } catch (err) {
                          console.error(err);
                        }
                      }}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50/50 border border-gray-200 text-xs text-[#1c1b1b] font-semibold focus:outline-none focus:border-[#0056c8]"
                    >
                      <option value="en">English (Default)</option>
                      <option value="id">Bahasa Indonesia</option>
                    </select>
                    <span className="text-[10px] text-gray-400 mt-1 block">{t.langSub}</span>
                  </div>

                  {/* Currency Selector (Default USD $, switchable to IDR Rp) */}
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-gray-600 block mb-1">
                      {t.currencyLabel}
                    </label>
                    <select
                      value={currency}
                      onChange={(e) => {
                        const newCurr = e.target.value as Currency;
                        setCurrency(newCurr);
                        try {
                          localStorage.setItem('imm_user_currency', newCurr);
                        } catch (err) {
                          console.error(err);
                        }
                      }}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50/50 border border-gray-200 text-xs text-[#1c1b1b] font-semibold focus:outline-none focus:border-[#0056c8]"
                    >
                      <option value="USD">USD ($ - US Dollar)</option>
                      <option value="IDR">IDR (Rp - Rupiah Indonesia)</option>
                      <option value="EUR">EUR (€ - Euro)</option>
                      <option value="SGD">SGD (S$ - Singapore Dollar)</option>
                    </select>
                    <span className="text-[10px] text-gray-400 mt-1 block">{t.currencySub}</span>
                  </div>
                </div>
              </div>

              {/* Notification Channels (Early Drop Alert Removed as requested) */}
              <div className="p-5 bg-white rounded-2xl border border-gray-200/80 space-y-3.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#1c1b1b]">{t.notifyTitle}</h4>

                <label className="flex items-center justify-between p-3 rounded-xl bg-gray-50/70 border border-gray-200/60 cursor-pointer hover:bg-gray-50 transition-colors">
                  <div>
                    <span className="text-xs font-bold block text-[#1c1b1b]">{t.waOrderTitle}</span>
                    <span className="text-[11px] text-gray-400">{t.waOrderDesc}</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={waOrderNotify}
                    onChange={(e) => setWaOrderNotify(e.target.checked)}
                    className="w-4 h-4 rounded text-[#0056c8] focus:ring-[#0056c8]"
                  />
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl bg-gray-50/70 border border-gray-200/60 cursor-pointer hover:bg-gray-50 transition-colors">
                  <div>
                    <span className="text-xs font-bold block text-[#1c1b1b]">{t.waPromoTitle}</span>
                    <span className="text-[11px] text-gray-400">{t.waPromoDesc}</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={waPromoNotify}
                    onChange={(e) => setWaPromoNotify(e.target.checked)}
                    className="w-4 h-4 rounded text-[#0056c8] focus:ring-[#0056c8]"
                  />
                </label>
              </div>

              {/* Privacy Setting */}
              <div className="p-5 bg-white rounded-2xl border border-gray-200/80 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#1c1b1b]">{t.privacyTitle}</h4>
                <label className="flex items-center justify-between cursor-pointer">
                  <div>
                    <span className="text-xs font-bold block text-[#1c1b1b]">{t.privacyHideOrders}</span>
                    <span className="text-[11px] text-gray-400">{t.privacyDesc}</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={privacyProfilePublic}
                    onChange={(e) => setPrivacyProfilePublic(e.target.checked)}
                    className="w-4 h-4 rounded text-[#0056c8] focus:ring-[#0056c8]"
                  />
                </label>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-[#0056c8] hover:bg-[#0041a3] text-white text-xs font-bold uppercase tracking-wider transition-all btn-spring shadow-md"
                >
                  {t.saveSettings}
                </button>
              </div>
            </form>
          )}

          {/* ================= 4. TAB PESANAN SAYA (ORDERS) ================= */}
          {activeTab === 'orders' && (
            <div className="space-y-5 animate-fade-in max-w-3xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-base sm:text-lg font-bold font-display text-[#1c1b1b]">{t.ordersTitle}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">{t.ordersSubtitle}</p>
                </div>

                {/* Filter Pills (shown if orders exist) */}
                {orders.length > 0 && (
                  <div className="flex items-center gap-1.5 bg-gray-100 p-1 rounded-xl self-start sm:self-auto">
                    <button
                      onClick={() => setOrderFilter('all')}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                        orderFilter === 'all' ? 'bg-white text-[#1c1b1b] shadow-2xs' : 'text-gray-500 hover:text-[#1c1b1b]'
                      }`}
                    >
                      {t.filterAll}
                    </button>
                    <button
                      onClick={() => setOrderFilter('progress')}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                        orderFilter === 'progress' ? 'bg-white text-[#1c1b1b] shadow-2xs' : 'text-gray-500 hover:text-[#1c1b1b]'
                      }`}
                    >
                      {t.filterProgress}
                    </button>
                    <button
                      onClick={() => setOrderFilter('completed')}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                        orderFilter === 'completed' ? 'bg-white text-[#1c1b1b] shadow-2xs' : 'text-gray-500 hover:text-[#1c1b1b]'
                      }`}
                    >
                      {t.filterCompleted}
                    </button>
                  </div>
                )}
              </div>

              {/* If no orders exist (clean initial state for new users) */}
              {orders.length === 0 ? (
                <div className="p-10 sm:p-14 bg-white rounded-3xl border border-gray-200/80 text-center space-y-4 shadow-2xs">
                  <div className="w-16 h-16 rounded-2xl bg-blue-50 text-[#0056c8] flex items-center justify-center mx-auto">
                    <span className="material-symbols-outlined text-[32px]">inventory_2</span>
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-[#1c1b1b]">{t.emptyOrdersTitle}</h4>
                    <p className="text-xs text-gray-500 mt-1 max-w-md mx-auto leading-relaxed">
                      {t.emptyOrdersSub}
                    </p>
                  </div>
                  {onNavigateShop && (
                    <button
                      onClick={() => {
                        onClose();
                        onNavigateShop();
                      }}
                      className="px-6 py-2.5 rounded-full bg-[#1c1b1b] hover:bg-[#0056c8] text-white text-xs font-bold uppercase tracking-wider transition-all duration-300 btn-spring shadow-md"
                    >
                      {t.browseCatalogue}
                    </button>
                  )}
                </div>
              ) : filteredOrders.length === 0 ? (
                <div className="p-10 bg-white rounded-2xl border border-gray-200/80 text-center space-y-2">
                  <span className="material-symbols-outlined text-[32px] text-gray-300">inventory_2</span>
                  <div className="text-sm font-bold text-gray-700">
                    {isEn ? 'No orders in this category' : 'Tidak ada pesanan pada kategori ini'}
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredOrders.map((order) => (
                    <div
                      key={order.id}
                      className="p-5 bg-white rounded-2xl border border-gray-200/80 shadow-2xs hover:border-gray-300 transition-all space-y-4"
                    >
                      {/* Order Header */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-3">
                        <div className="flex items-center gap-3">
                          <span className="px-2.5 py-1 rounded-lg bg-gray-100 text-[#1c1b1b] text-xs font-mono font-bold">
                            {order.orderNumber}
                          </span>
                          <span className="text-xs text-gray-400">•</span>
                          <span className="text-xs text-gray-500">{order.date}</span>
                        </div>

                        {/* Status Badge */}
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 ${
                              order.status === 'Selesai'
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : order.statusStep === 4
                                ? 'bg-amber-50 text-amber-800 border border-amber-300'
                                : 'bg-blue-50 text-[#0056c8] border border-blue-200'
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                order.status === 'Selesai' ? 'bg-emerald-500' : 'bg-[#0056c8] animate-pulse'
                              }`}
                            />
                            <span>
                              {order.status === 'Selesai'
                                ? (isEn ? 'Selesai' : 'Selesai')
                                : order.statusStep === 1
                                ? '1. Cutting & Sewing'
                                : order.statusStep === 2
                                ? '2. QC Inspection'
                                : order.statusStep === 3
                                ? '3. In Transit'
                                : '4. Delivered'}
                            </span>
                          </span>
                        </div>
                      </div>

                      {/* Items in order */}
                      <div className="space-y-3">
                        {order.items.map((it, idx) => (
                          <div key={idx} className="flex items-center gap-3.5">
                            <img
                              src={it.image}
                              alt={it.name}
                              className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover border border-gray-100 shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <h5 className="text-xs sm:text-sm font-bold text-[#1c1b1b] truncate">{it.name}</h5>
                              <div className="flex flex-wrap items-center gap-2 text-[11px] text-gray-500 mt-0.5">
                                <span className="font-semibold text-gray-700">{it.size}</span>
                                <span>•</span>
                                <span>{it.color}</span>
                                <span>•</span>
                                <span>{it.gsm}</span>
                              </div>
                              <div className="text-xs font-bold text-[#0056c8] mt-1">
                                {formatPrice(it.price * (it.quantity || 1))}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Order Footer & Actions */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-3 border-t border-gray-100 gap-3">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-gray-400 block">Total Allocation</span>
                          <span className="text-sm sm:text-base font-black text-[#1c1b1b]">
                            {formatPrice(order.totalAmount)}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                          {(order.statusStep >= 4 || order.status === 'Delivered' || order.status === 'Sampai') && order.status !== 'Selesai' && (
                            <button
                              onClick={() => handleCompleteOrder(order.id)}
                              className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all flex items-center gap-1.5 btn-spring shadow-xs"
                            >
                              <span className="material-symbols-outlined text-[16px]">check_circle</span>
                              <span>{isEn ? 'Complete Order' : 'Pesanan Selesai'}</span>
                            </button>
                          )}

                          <button
                            onClick={() => setSelectedOrder(order)}
                            className="px-3 py-1.5 rounded-xl border border-gray-200 hover:border-[#0056c8] text-xs font-bold text-gray-700 hover:text-[#0056c8] transition-all flex items-center gap-1.5 btn-spring"
                          >
                            <span className="material-symbols-outlined text-[16px]">local_shipping</span>
                            <span>{t.trackShipment}</span>
                          </button>

                          <button
                            onClick={() => setShowInvoiceOrder(order)}
                            className="px-3 py-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-xs font-bold text-gray-800 transition-all flex items-center gap-1.5 btn-spring"
                          >
                            <span className="material-symbols-outlined text-[16px]">receipt_long</span>
                            <span>{t.viewInvoice}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ================= 3. TAB FITTING & UKURAN (SIZING) ================= */}
          {activeTab === 'sizing' && (
            <form onSubmit={handleSaveSizing} className="space-y-6 animate-fade-in max-w-2xl">
              <div>
                <h3 className="text-base sm:text-lg font-bold font-display text-[#1c1b1b]">{t.sizingTitle}</h3>
                <p className="text-xs text-gray-500 mt-0.5">{t.sizingSubtitle}</p>
              </div>

              <div className="p-5 bg-white rounded-2xl border border-gray-200/80 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-gray-600 block mb-1">
                      {isEn ? 'Preferred Atelier Size' : 'Ukuran Favorit'}
                    </label>
                    <select
                      value={favSize}
                      onChange={(e) => setFavSize(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50/50 border border-gray-200 text-xs text-[#1c1b1b] font-semibold focus:outline-none focus:border-[#0056c8]"
                    >
                      <option value="Size 1 (S)">Size 1 (S)</option>
                      <option value="Size 2 (M)">Size 2 (M)</option>
                      <option value="Size 3 (L)">Size 3 (L)</option>
                      <option value="Size 4 (XL)">Size 4 (XL)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-gray-600 block mb-1">
                      {isEn ? 'Preferred Fabric Density' : 'Bobot Kain Pilihan'}
                    </label>
                    <select
                      value={favGsm}
                      onChange={(e) => setFavGsm(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50/50 border border-gray-200 text-xs text-[#1c1b1b] font-semibold focus:outline-none focus:border-[#0056c8]"
                    >
                      <option value="320 GSM Heavyweight">320 GSM French Terry / Heavy Jersey</option>
                      <option value="360 GSM Heavyweight">360 GSM Structured Boxy Knit</option>
                      <option value="420 GSM Tactical Twill">420 GSM Tactical Atelier Twill</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-gray-600 block mb-1">
                      {isEn ? 'Height (cm)' : 'Tinggi (cm)'}
                    </label>
                    <input
                      type="number"
                      value={userHeight}
                      onChange={(e) => setUserHeight(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-gray-50/50 border border-gray-200 text-xs text-[#1c1b1b] font-semibold focus:outline-none focus:border-[#0056c8]"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-gray-600 block mb-1">
                      {isEn ? 'Weight (kg)' : 'Berat (kg)'}
                    </label>
                    <input
                      type="number"
                      value={userWeight}
                      onChange={(e) => setUserWeight(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-gray-50/50 border border-gray-200 text-xs text-[#1c1b1b] font-semibold focus:outline-none focus:border-[#0056c8]"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-gray-600 block mb-1">
                      {isEn ? 'Chest (cm)' : 'Dada (cm)'}
                    </label>
                    <input
                      type="number"
                      value={userChest}
                      onChange={(e) => setUserChest(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-gray-50/50 border border-gray-200 text-xs text-[#1c1b1b] font-semibold focus:outline-none focus:border-[#0056c8]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-gray-600 block mb-1">
                    {isEn ? 'Silhouette Drape Profile' : 'Profil Siluet Drape'}
                  </label>
                  <select
                    value={drapeSilhouette}
                    onChange={(e) => setDrapeSilhouette(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50/50 border border-gray-200 text-xs text-[#1c1b1b] font-semibold focus:outline-none focus:border-[#0056c8]"
                  >
                    <option value="Sculptural Ergonomic">Sculptural Ergonomic (Standard ImmAdNgrh. Cut)</option>
                    <option value="Fluid Oversized">Fluid Oversized (Dropped shoulder, extended hem)</option>
                    <option value="Fitted Atelier">Fitted Atelier (Slightly tapered body outline)</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-[#0056c8] hover:bg-[#0041a3] text-white text-xs font-bold uppercase tracking-wider transition-all btn-spring shadow-md"
                >
                  {t.saveSizing}
                </button>
              </div>
            </form>
          )}

          {/* ================= 4. TAB BANTUAN & CONCIERGE (SUPPORT) ================= */}
          {activeTab === 'support' && (
            <div className="space-y-6 animate-fade-in max-w-2xl">
              <div>
                <h3 className="text-base sm:text-lg font-bold font-display text-[#1c1b1b]">{t.supportTab}</h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  {isEn
                    ? '24/7 dedicated assistance for atelier orders, size exchanges, and custom requests.'
                    : 'Layanan VIP Concierge untuk bantuan ukuran, jadwal potong, dan garansi tukar size.'}
                </p>
              </div>

              {/* Direct Concierge Box */}
              <div className="p-5 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/70 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="w-12 h-12 rounded-2xl bg-[#0056c8] text-white flex items-center justify-center shrink-0 shadow-md">
                    <span className="material-symbols-outlined text-[24px]">support_agent</span>
                  </span>
                  <div>
                    <h4 className="text-sm font-bold text-[#001945]">Atelier Private Concierge</h4>
                    <p className="text-xs text-[#003178] mt-0.5">WhatsApp direct line: 0857 1230 8673 (24 Jam)</p>
                  </div>
                </div>

                <a
                  href="https://wa.me/6285712308673?text=Halo%20Atelier%20ImmAdNgrh,%20saya%20klien%20VIP%20ingin%20berkonsultasi"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-[#0056c8] hover:bg-[#0041a3] text-white text-xs font-bold text-center transition-all btn-spring shadow-xs"
                >
                  {isEn ? 'Chat via WhatsApp' : 'Chat WhatsApp'}
                </a>
              </div>

              {/* FAQ */}
              <div className="p-5 bg-white rounded-2xl border border-gray-200/80 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#1c1b1b]">
                  {isEn ? 'Frequently Asked Questions' : 'Pertanyaan Umum (FAQ)'}
                </h4>

                <div className="space-y-3 text-xs">
                  <details className="p-3 rounded-xl bg-gray-50/70 border border-gray-200/60 cursor-pointer">
                    <summary className="font-bold text-[#1c1b1b]">
                      {isEn ? 'How does the 14-day size exchange work?' : 'Bagaimana prosedur penukaran ukuran 14 hari?'}
                    </summary>
                    <p className="text-gray-500 mt-2 leading-relaxed text-[11px]">
                      {isEn
                        ? 'If the drape or size does not fit your anatomical frame, contact our concierge. We will arrange a free courier pickup and dispatch the revised size.'
                        : 'Jika potongan atau ukuran kurang pas pada postur Anda, hubungi concierge kami. Kurir akan menjemput paket secara gratis dan mengirimkan ukuran pengganti.'}
                    </p>
                  </details>

                  <details className="p-3 rounded-xl bg-gray-50/70 border border-gray-200/60 cursor-pointer">
                    <summary className="font-bold text-[#1c1b1b]">
                      {isEn ? 'What is 320 GSM & 360 GSM Heavyweight fabric?' : 'Apa keunggulan kain 320 GSM & 360 GSM?'}
                    </summary>
                    <p className="text-gray-500 mt-2 leading-relaxed text-[11px]">
                      {isEn
                        ? 'Heavyweight fabric uses double-twisted combed yarns. It delivers permanent structural shape without clinging, maintaining crisp shoulder lines.'
                        : 'Bobot gramasi 320 GSM & 360 GSM memiliki ketebalan berstruktur arsitektural yang tidak mudah kendur dan mempertahankan siluet jatuh yang tegak.'}
                    </p>
                  </details>
                </div>
              </div>
            </div>
          )}

          {/* ================= 5. TAB REDEEM CODE ================= */}
          {activeTab === 'redeem' && (
            <div className="space-y-6 animate-fade-in max-w-2xl">
              <div>
                <h3 className="text-base sm:text-lg font-bold font-display text-[#1c1b1b]">
                  {isEn ? 'Redeem Code & Voucher' : 'Redeem Code & Voucher Diskon'}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  {isEn
                    ? 'Enter the exclusive promotional code released by admin to receive special discounts on your allocations.'
                    : 'Masukkan kode promo eksklusif yang disebar oleh admin untuk mendapatkan potongan harga spesial pada pesanan Anda.'}
                </p>
              </div>

              {/* Redeem Form */}
              <form onSubmit={handleRedeemCode} className="p-5 bg-white rounded-2xl border border-gray-200/80 space-y-4 shadow-2xs">
                <div>
                  <label className="text-xs font-bold text-[#1c1b1b] block mb-1.5">
                    {isEn ? 'Enter Redeem Code' : 'Kode Redeem Admin'}
                  </label>
                  <div className="flex flex-col sm:flex-row gap-2.5">
                    <input
                      type="text"
                      value={redeemInput}
                      onChange={(e) => {
                        setRedeemInput(e.target.value);
                        setRedeemError(null);
                      }}
                      placeholder="isi dengan benar"
                      className="flex-1 px-4 py-3 rounded-xl bg-gray-50/70 border border-gray-200 text-xs font-mono font-bold text-[#1c1b1b] placeholder:text-gray-400 placeholder:font-sans focus:bg-white focus:outline-none focus:border-[#0056c8] transition-all"
                    />
                    <button
                      type="submit"
                      className="px-6 py-3 rounded-xl bg-[#0056c8] hover:bg-[#0041a3] text-white text-xs font-bold uppercase tracking-wider transition-all btn-spring shadow-md shrink-0 flex items-center justify-center gap-2"
                    >
                      <span className="material-symbols-outlined text-[18px]">verified</span>
                      <span>{isEn ? 'Redeem Code' : 'Tukarkan Kode'}</span>
                    </button>
                  </div>
                </div>

                {/* Error Alert */}
                {redeemError && (
                  <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 font-semibold flex items-center gap-2 animate-fade-in">
                    <span className="material-symbols-outlined text-[18px] shrink-0">error</span>
                    <span>{redeemError}</span>
                  </div>
                )}

                {/* Success Alert */}
                {redeemSuccess && (
                  <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 font-semibold flex items-center gap-2 animate-fade-in">
                    <span className="material-symbols-outlined text-[18px] text-emerald-600 shrink-0">check_circle</span>
                    <span>{redeemSuccess}</span>
                  </div>
                )}
              </form>

              {/* Currently Active Redeemed Code Card */}
              {activeRedeemedPromo && (
                <div className="p-5 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl space-y-3 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300">
                      {isEn ? 'Active Voucher' : 'Voucher Aktif Terpasang'}
                    </span>
                    <button
                      type="button"
                      onClick={handleRemoveRedeemedPromo}
                      className="text-xs font-bold text-red-600 hover:text-red-700 hover:underline flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-[16px]">delete</span>
                      <span>{isEn ? 'Remove' : 'Hapus Kode'}</span>
                    </button>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <div>
                      <div className="text-base font-black font-mono text-emerald-950 tracking-wider">
                        {activeRedeemedPromo.code}
                      </div>
                      <div className="text-xs text-emerald-700 mt-0.5 font-bold">
                        {isEn
                          ? `Potongan harga ${activeRedeemedPromo.percent}% (Otomatis Diterapkan)`
                          : `Potongan harga ${activeRedeemedPromo.percent}% (Otomatis Diterapkan saat Checkout)`}
                      </div>
                    </div>

                    <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-black text-sm shrink-0 shadow-sm">
                      -{activeRedeemedPromo.percent}%
                    </div>
                  </div>
                </div>
              )}

              {/* Information Note */}
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200/60 text-xs text-gray-500 space-y-2">
                <div className="font-bold text-[#1c1b1b] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-[#0056c8]">info</span>
                  <span>{isEn ? 'Information' : 'Catatan Penggunaan Kode'}</span>
                </div>
                <p className="leading-relaxed">
                  {isEn
                    ? 'Redeemed codes will be automatically applied to your checkout cart. Voucher discount applies to subtotal amount.'
                    : 'Kode yang berhasil ditukarkan akan otomatis tersimpan di akun Anda dan diterapkan saat melakukan pemesanan.'}
                </p>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ================= MODAL: TRACK SHIPMENT ================= */}
      {selectedOrder && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl border border-gray-100 space-y-4 animate-scale-in">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <span className="text-[10px] font-bold text-[#0056c8] uppercase tracking-wider block">
                  {selectedOrder.courier}
                </span>
                <h4 className="text-base font-bold text-[#1c1b1b]">{selectedOrder.orderNumber}</h4>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500"
              >
                ✕
              </button>
            </div>

            <div className="p-3 bg-gray-50 rounded-xl flex items-center justify-between text-xs">
              <span className="text-gray-500">{t.tracking}:</span>
              <span className="font-mono font-bold text-[#1c1b1b]">{selectedOrder.trackingNumber}</span>
            </div>

            {/* Tracking Steps Timeline */}
            <div className="space-y-4 py-2">
              {[
                { step: 1, label: '1. Cutting & Sewing', desc: 'Pattern drafted & French Terry tension verified' },
                { step: 2, label: '2. QC Inspection', desc: 'Zero-torque drape inspection & seam check' },
                { step: 3, label: '3. In Transit', desc: 'Dispatched via Express Courier VIP' },
                { step: 4, label: '4. Delivered', desc: 'Delivered securely to client destination' },
              ].map((s) => (
                <div key={s.step} className="flex items-start gap-3 relative">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                      selectedOrder.statusStep >= s.step
                        ? 'bg-[#0056c8] text-white shadow-xs'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {selectedOrder.statusStep >= s.step ? '✓' : s.step}
                  </div>
                  <div>
                    <h5
                      className={`text-xs font-bold ${
                        selectedOrder.statusStep >= s.step ? 'text-[#1c1b1b]' : 'text-gray-400'
                      }`}
                    >
                      {s.label}
                    </h5>
                    <p className="text-[11px] text-gray-400">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {selectedOrder.statusStep >= 4 && selectedOrder.status !== 'Selesai' ? (
              <div className="space-y-2 pt-1">
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2 font-medium">
                  <span className="material-symbols-outlined text-[18px] text-emerald-600 shrink-0">mark_email_read</span>
                  <span>{isEn ? 'Garment delivered to client destination. Please confirm order completion.' : 'Pesanan telah sampai di tujuan. Silakan tekan tombol di bawah untuk konfirmasi.'}</span>
                </div>
                <button
                  onClick={() => handleCompleteOrder(selectedOrder.id)}
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider btn-spring flex items-center justify-center gap-2 shadow-md"
                >
                  <span className="material-symbols-outlined text-[18px]">check_circle</span>
                  <span>{isEn ? 'Complete Order & Move to History' : 'Pesanan Selesai'}</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => setSelectedOrder(null)}
                className="w-full py-2.5 rounded-xl bg-[#1c1b1b] text-white text-xs font-bold uppercase tracking-wider btn-spring"
              >
                {isEn ? 'Close Tracking' : 'Tutup Pelacakan'}
              </button>
            )}
          </div>
        </div>
      )}

      {/* ================= MODAL: INVOICE / RECEIPT ================= */}
      {showInvoiceOrder && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-gray-100 space-y-4 animate-scale-in">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <span className="text-[10px] font-bold text-[#0056c8] uppercase tracking-wider block">
                  Atelier ImmAdNgrh.
                </span>
                <h4 className="text-base font-bold text-[#1c1b1b]">Official Allocation Receipt</h4>
              </div>
              <button
                onClick={() => setShowInvoiceOrder(null)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500"
              >
                ✕
              </button>
            </div>

            <div className="p-4 bg-gray-50 rounded-2xl space-y-3 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-500">Order Reference:</span>
                <span className="font-mono font-bold">{showInvoiceOrder.orderNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Date:</span>
                <span>{showInvoiceOrder.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Client:</span>
                <span className="font-bold">{name || currentUser.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Payment:</span>
                <span>{showInvoiceOrder.paymentMethod}</span>
              </div>
            </div>

            <div className="space-y-2 border-b border-gray-100 pb-3">
              {showInvoiceOrder.items.map((it, idx) => (
                <div key={idx} className="flex justify-between text-xs py-1">
                  <div>
                    <span className="font-bold">{it.quantity || 1}x {it.name}</span>
                    <span className="text-gray-400 block text-[11px]">{it.size} • {it.gsm}</span>
                  </div>
                  <span className="font-bold text-[#1c1b1b]">{formatPrice(it.price * (it.quantity || 1))}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center text-sm font-black text-[#1c1b1b]">
              <span>Total Paid:</span>
              <span className="text-[#0056c8] text-base">{formatPrice(showInvoiceOrder.totalAmount)}</span>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => {
                  window.print();
                }}
                className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-800 text-xs font-bold hover:bg-gray-50 btn-spring flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">print</span>
                <span>{isEn ? 'Print / PDF' : 'Cetak / Simpan PDF'}</span>
              </button>
              <button
                onClick={() => setShowInvoiceOrder(null)}
                className="flex-1 py-2.5 rounded-xl bg-[#1c1b1b] hover:bg-[#0056c8] text-white text-xs font-bold uppercase tracking-wider btn-spring"
              >
                {t.close}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL: LOGOUT CONFIRMATION ================= */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-sm w-full shadow-2xl border border-gray-100 space-y-4 animate-scale-in text-center">
            <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto">
              <span className="material-symbols-outlined text-[24px]">logout</span>
            </div>

            <div>
              <h4 className="text-base font-bold text-[#1c1b1b]">
                {isEn ? 'Confirm Sign Out' : 'Konfirmasi Keluar Akun'}
              </h4>
              <p className="text-xs text-gray-500 mt-1">
                {isEn
                  ? 'Are you sure you want to end your VIP client session at ImmAdNgrh. Atelier?'
                  : 'Apakah Anda yakin ingin mengakhiri sesi klien Anda di ImmAdNgrh. Atelier?'}
              </p>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-xs font-bold hover:bg-gray-50"
              >
                {isEn ? 'Stay Logged In' : 'Tetap Masuk'}
              </button>
              <button
                onClick={() => {
                  setShowLogoutConfirm(false);
                  onSignOut();
                }}
                className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold btn-spring"
              >
                {t.signOut}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
