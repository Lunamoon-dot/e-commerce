import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { CartItem, Product, CouponCode } from "@/types";
import { coupons } from "@/data";

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity?: number, variants?: Record<string, string>) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => string | null;
  removeCoupon: () => void;
  appliedCoupon: CouponCode | null;
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [appliedCoupon, setAppliedCoupon] = useState<CouponCode | null>(null);

  const addItem = useCallback((product: Product, quantity = 1, variants: Record<string, string> = {}) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity, selectedVariants: variants }];
    });
  }, []);

  const removeItem = useCallback((productId: number) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: number, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((item) => item.product.id !== productId));
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    setAppliedCoupon(null);
  }, []);

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = subtotal >= 2000000 ? 0 : 30000;

  const discount = appliedCoupon
    ? appliedCoupon.type === "percent"
      ? Math.min(subtotal * (appliedCoupon.discount / 100), appliedCoupon.maxDiscount || Infinity)
      : appliedCoupon.discount
    : 0;

  const total = Math.max(0, subtotal - discount + shipping);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const applyCoupon = useCallback((code: string): string | null => {
    const coupon = coupons.find((c) => c.code === code.toUpperCase());
    if (!coupon) return "Mã giảm giá không hợp lệ";
    if (subtotal < coupon.minOrder) return `Đơn hàng tối thiểu ${coupon.minOrder.toLocaleString("vi-VN")}₫`;
    setAppliedCoupon(coupon);
    return null;
  }, [subtotal]);

  const removeCoupon = useCallback(() => setAppliedCoupon(null), []);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, applyCoupon, removeCoupon, appliedCoupon, subtotal, discount, shipping, total, itemCount }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}
