import { Link } from "react-router";
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight, Tag, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import { useState } from "react";

export default function CartPage() {
  const { items, updateQuantity, removeItem, subtotal, discount, shipping, total, applyCoupon, removeCoupon, appliedCoupon } = useCart();
  const [couponInput, setCouponInput] = useState("");
  const [couponError, setCouponError] = useState("");

  const handleApplyCoupon = () => {
    const error = applyCoupon(couponInput);
    if (error) {
      setCouponError(error);
    } else {
      setCouponError("");
      setCouponInput("");
    }
  };

  if (items.length === 0) {
    return (
      <Container className="py-20 text-center">
        <div className="inline-flex items-center justify-center size-24 rounded-full bg-secondary mb-6">
          <ShoppingBag className="size-10 text-muted-foreground" />
        </div>
        <h1 className="text-2xl font-extrabold mb-2">Giỏ hàng trống</h1>
        <p className="text-muted-foreground mb-6">Khám phá sản phẩm và thêm vào giỏ hàng nhé!</p>
        <Link to="/products"><Button size="lg" className="rounded-full gap-2">Tiếp tục mua sắm <ArrowRight className="size-4" /></Button></Link>
      </Container>
    );
  }

  return (
    <Container className="py-8">
      <h1 className="text-3xl font-extrabold mb-8">Giỏ hàng <span className="text-muted-foreground font-medium text-lg">({items.length} sản phẩm)</span></h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart items */}
        <div className="flex-1 space-y-3">
          {items.map((item) => (
            <div key={item.product.id} className="flex gap-4 rounded-2xl border border-border/40 bg-card p-4 hover:shadow-md transition-all duration-300">
              <Link to={`/product/${item.product.id}`} className="shrink-0">
                <img src={item.product.images[0]} alt={item.product.name} className="size-24 rounded-xl object-cover ring-1 ring-border/30" />
              </Link>
              <div className="flex-1 min-w-0">
                <Link to={`/product/${item.product.id}`} className="font-bold text-sm hover:text-primary transition-colors line-clamp-2">{item.product.name}</Link>
                <p className="text-xs text-muted-foreground mt-0.5">{item.product.brand}</p>
                {Object.entries(item.selectedVariants).length > 0 && (
                  <p className="text-[11px] text-muted-foreground mt-1 bg-secondary rounded-full px-2 py-0.5 inline-block">
                    {Object.values(item.selectedVariants).join(" • ")}
                  </p>
                )}
                <div className="flex items-center justify-between mt-3">
                  <span className="text-base font-extrabold">{formatPrice(item.product.price)}</span>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center rounded-xl border border-border/60 bg-secondary/50">
                      <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="p-2 hover:bg-secondary transition-colors rounded-l-xl cursor-pointer">
                        <Minus className="size-3.5" />
                      </button>
                      <span className="w-8 text-center text-sm font-bold tabular-nums">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="p-2 hover:bg-secondary transition-colors rounded-r-xl cursor-pointer">
                        <Plus className="size-3.5" />
                      </button>
                    </div>
                    <button onClick={() => removeItem(item.product.id)} className="text-destructive/60 hover:text-destructive p-1.5 rounded-full hover:bg-destructive/10 transition-all cursor-pointer" aria-label="Xóa">
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order summary */}
        <div className="w-full lg:w-96 space-y-4">
          {/* Coupon */}
          <div className="rounded-2xl border border-border/40 bg-card p-5">
            <h3 className="font-bold text-sm mb-3 flex items-center gap-2"><Tag className="size-4 text-primary" /> Mã giảm giá</h3>
            {appliedCoupon ? (
              <div className="flex items-center justify-between rounded-xl bg-success/10 border border-success/20 p-3">
                <div>
                  <p className="text-sm font-bold text-success">{appliedCoupon.code}</p>
                  <p className="text-xs text-muted-foreground">
                    Giảm {appliedCoupon.type === "percent" ? `${appliedCoupon.discount}%` : formatPrice(appliedCoupon.discount)}
                  </p>
                </div>
                <Button variant="ghost" size="sm" onClick={removeCoupon} className="rounded-full">Xóa</Button>
              </div>
            ) : (
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Nhập mã"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                  className="flex-1 h-10 rounded-xl border border-border/60 bg-secondary/50 px-3 text-sm uppercase focus:outline-none focus:ring-2 focus:ring-primary/30 font-mono"
                />
                <Button size="sm" onClick={handleApplyCoupon} disabled={!couponInput} className="rounded-xl">Áp dụng</Button>
              </div>
            )}
            {couponError && <p className="text-xs text-destructive mt-2">{couponError}</p>}
            <p className="text-[11px] text-muted-foreground mt-2 flex items-center gap-1"><Sparkles className="size-3" /> Thử: WELCOME10, SALE50K, FREESHIP</p>
          </div>

          {/* Summary */}
          <div className="rounded-2xl border border-border/40 bg-card p-5 space-y-3 sticky top-24">
            <h3 className="font-bold text-sm">Tổng đơn hàng</h3>
            <div className="space-y-2.5 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Tạm tính</span><span className="font-medium">{formatPrice(subtotal)}</span></div>
              {discount > 0 && <div className="flex justify-between text-success"><span>Giảm giá</span><span className="font-medium">-{formatPrice(discount)}</span></div>}
              <div className="flex justify-between"><span className="text-muted-foreground">Phí vận chuyển</span><span className="font-medium">{shipping === 0 ? <span className="text-success">Miễn phí ✓</span> : formatPrice(shipping)}</span></div>
              <div className="border-t border-border/40 pt-3 flex justify-between text-lg font-extrabold">
                <span>Tổng cộng</span><span>{formatPrice(total)}</span>
              </div>
            </div>
            <Link to="/checkout">
              <Button size="lg" fullWidth className="rounded-xl gap-2 mt-3 shadow-colored hover:shadow-glow-lg transition-shadow">
                Thanh toán <ArrowRight className="size-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
}
