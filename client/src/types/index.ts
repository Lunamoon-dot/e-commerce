export interface Product {
  id: number;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  categorySlug: string;
  brand: string;
  rating: number;
  reviewCount: number;
  description: string;
  specs: Record<string, string>;
  variants: ProductVariant[];
  stock: number;
  isFeatured?: boolean;
  isFlashSale?: boolean;
  flashSaleEnd?: string;
  tags: string[];
}

export interface ProductVariant {
  id: number;
  name: string;
  type: "color" | "size" | "storage";
  value: string;
  priceModifier: number;
  stock: number;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  icon: string;
  description: string;
  productCount: number;
  image: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariants: Record<string, string>;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  subtotal: number;
  shipping: number;
  discount: number;
  status: "pending" | "confirmed" | "shipping" | "delivered" | "cancelled";
  createdAt: string;
  address: Address;
  paymentMethod: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  addresses: Address[];
}

export interface Address {
  id: number;
  name: string;
  phone: string;
  street: string;
  ward: string;
  district: string;
  city: string;
  isDefault: boolean;
}

export interface Review {
  id: number;
  userId: number;
  userName: string;
  avatar: string;
  rating: number;
  comment: string;
  createdAt: string;
  images?: string[];
}

export interface CouponCode {
  code: string;
  discount: number;
  type: "percent" | "fixed";
  minOrder: number;
  maxDiscount?: number;
}

export interface PolicySection {
  title: string;
  content: string[];
}
