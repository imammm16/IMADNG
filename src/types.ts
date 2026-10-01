export interface Product {
  id: string;
  name: string;
  price: number;
  priceFormatted: string;
  fabric: string;
  gsm: number;
  color: string;
  category: 'essentials' | 't-shirts' | 'oversized' | 'new';
  tag?: 'BESTSELLER' | 'NEW ARRIVAL' | 'EDITION 04' | 'ATELIER SPEC' | 'CRAFT LOOPWHEEL' | 'ICONIC' | 'RUNWAY' | 'TAILORED' | 'NEW HUE';
  image: string;
  description: string;
  swatches: string[]; // CSS color codes
  availableSizes: string[];
}

export interface CartItem {
  product: Product;
  selectedSize: string;
  quantity: number;
}

export type FilterCategory = 'all' | 't-shirts' | 'oversized' | 'essentials' | 'new';
export type SortOption = 'featured' | 'newest' | 'price-asc' | 'price-desc';
export type ActiveTab = 'home' | 'shop' | 'about';

export interface AiRecommendation {
  recommendedSize: string;
  fitAnalysis: string;
  idealGarment: string;
  textileEngineeringTip: string;
}

export interface OrderItem {
  id: string;
  orderNumber: string;
  date: string;
  totalAmount: number;
  paymentMethod: string;
  status: 'Cutting & Sewing' | 'QC Inspection' | 'In Transit' | 'Delivered' | 'Dipotong & Dijahit' | 'Proses QC' | 'Dalam Pengiriman' | 'Sampai' | 'Selesai';
  statusStep: number;
  courier: string;
  trackingNumber: string;
  shippingAddress?: string;
  items: {
    name: string;
    size: string;
    color: string;
    gsm: string;
    price: number;
    image: string;
    quantity?: number;
  }[];
}

export interface SavedAddress {
  id: string;
  label: string;
  recipient: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  isDefault: boolean;
}
