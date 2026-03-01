import { useState } from "react";
import { useNavigate } from "react-router";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import { Lock, CreditCard, Truck, Wallet, ChevronRight, ShieldCheck } from "lucide-react";

export default function CheckoutPage() {
  const { items, subtotal, discount, shipping, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500));
    clearCart();
    navigate("/order-success");
  };

  if (items.length === 0) {
    navigate("/cart");
    return null;
  }

  return (
    <div className="bg-secondary/30">
      <Container className="py-8">
        {/* Progress */}
        <div className="flex items-center justify-center gap-2 mb-10 text-sm">
          {[
            { step: 1, label: "Giỏ hàng", done: true },
            { step: 2, label: "Thanh toán", done: false },
            { step: 3, label: "Hoàn tất", done: false },
          ].map((s, i) => (
            <div key={s.step} className="flex items-center gap-2">
              <div className={`size-8 rounded-full flex items-center justify-center text-xs font-bold ${s.done ? "bg-primary text-primary-foreground" : i === 1 ? "bg-foreground text-background" : "bg-secondary text-muted-foreground"}`}>
                {s.step}
              </div>
              <span className={`hidden sm:block font-medium ${i === 1 ? "text-foreground" : "text-muted-foreground"}`}>{s.label}</span>
              {i < 2 && <ChevronRight className="size-4 text-muted-foreground" />}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1 space-y-6">
              {/* Shipping info */}
              <section className="rounded-2xl border border-border/40 bg-card p-6 space-y-4 shadow-sm">
                <h2 className="text-lg font-extrabold flex items-center gap-2"><Truck className="size-5 text-primary" /> Địa chỉ nhận hàng</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input id="name" label="Họ tên" placeholder="Nguyễn Văn An" required defaultValue="Nguyễn Văn An" />
                  <Input id="phone" label="Số điện thoại" placeholder="0901234567" required defaultValue="0901234567" />
                </div>
                <Input id="email" label="Email" type="email" placeholder="email@example.com" required defaultValue="an.nguyen@gmail.com" />
                <Input id="address" label="Địa chỉ" placeholder="123 Nguyễn Huệ, P. Bến Nghé" required defaultValue="123 Nguyễn Huệ, P. Bến Nghé" />
                <div className="grid sm:grid-cols-3 gap-4">
                  <Input id="ward" label="Phường/Xã" placeholder="Phường Bến Nghé" defaultValue="Phường Bến Nghé" />
                  <Input id="district" label="Quận/Huyện" placeholder="Quận 1" defaultValue="Quận 1" />
                  <Input id="city" label="Tỉnh/Thành phố" placeholder="TP.HCM" defaultValue="TP. Hồ Chí Minh" />
                </div>
              </section>

              {/* Payment */}
              <section className="rounded-2xl border border-border/40 bg-card p-6 space-y-4 shadow-sm">
                <h2 className="text-lg font-extrabold flex items-center gap-2"><CreditCard className="size-5 text-primary" /> Phương thức thanh toán</h2>
                <div className="space-y-3">
                  {[
                    { id: "cod", label: "Thanh toán khi nhận hàng", icon: "💵", desc: "Tiền mặt khi nhận hàng" },
                    { id: "bank", label: "Chuyển khoản ngân hàng", icon: "🏦", desc: "Chuyển khoản tài khoản" },
                    { id: "momo", label: "Ví MoMo", icon: "📱", desc: "Ví điện tử MoMo" },
                    { id: "card", label: "Visa / Mastercard", icon: "💳", desc: "Thẻ quốc tế" },
                  ].map((method) => (
                    <label
                      key={method.id}
                      className={`flex items-center gap-4 rounded-xl border-2 p-4 cursor-pointer transition-all duration-300 ${paymentMethod === method.id ? "border-primary bg-primary-muted shadow-colored" : "border-border/40 hover:border-primary/30"
                        }`}
                    >
                      <input type="radio" name="payment" value={method.id} checked={paymentMethod === method.id} onChange={(e) => setPaymentMethod(e.target.value)} className="accent-primary" />
                      <span className="text-xl">{method.icon}</span>
                      <div>
                        <p className="font-semibold text-sm">{method.label}</p>
                        <p className="text-xs text-muted-foreground">{method.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </section>
            </div>

            {/* Order summary */}
            <div className="w-full lg:w-96">
              <div className="rounded-2xl border border-border/40 bg-card p-6 space-y-4 sticky top-28 shadow-sm">
                <h3 className="font-extrabold flex items-center gap-2"><Wallet className="size-5" /> Đơn hàng ({items.length})</h3>

                <div className="max-h-64 overflow-auto space-y-3 pr-1">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex gap-3">
                      <img src={item.product.images[0]} alt="" className="size-14 rounded-xl object-cover ring-1 ring-border/30" />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold line-clamp-1">{item.product.name}</p>
                        <p className="text-[11px] text-muted-foreground">x{item.quantity}</p>
                        <p className="text-sm font-bold">{formatPrice(item.product.price * item.quantity)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border/40 pt-3 space-y-2.5 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Tạm tính</span><span className="font-medium">{formatPrice(subtotal)}</span></div>
                  {discount > 0 && <div className="flex justify-between text-success"><span>Giảm giá</span><span className="font-medium">-{formatPrice(discount)}</span></div>}
                  <div className="flex justify-between"><span className="text-muted-foreground">Vận chuyển</span><span className="font-medium">{shipping === 0 ? "Miễn phí ✓" : formatPrice(shipping)}</span></div>
                  <div className="border-t border-border/40 pt-3 flex justify-between text-lg font-extrabold">
                    <span>Tổng cộng</span><span>{formatPrice(total)}</span>
                  </div>
                </div>

                <Button type="submit" size="lg" fullWidth className="rounded-xl gap-2 shadow-colored hover:shadow-glow-lg transition-all" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <span className="animate-pulse-soft">Đang xử lý...</span>
                  ) : (
                    <><Lock className="size-4" /> Đặt hàng</>
                  )}
                </Button>
                <p className="text-[11px] text-center text-muted-foreground flex items-center justify-center gap-1"><ShieldCheck className="size-3" /> Thanh toán an toàn & bảo mật</p>
              </div>
            </div>
          </div>
        </form>
      </Container>
    </div>
  );
}
