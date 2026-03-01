import { Link } from "react-router";
import { CheckCircle2, Package, ArrowRight, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export default function OrderSuccessPage() {
  const orderId = `ORD-${Date.now().toString(36).toUpperCase()}`;

  return (
    <div className="relative min-h-[80vh] flex items-center">
      <div className="absolute inset-0 mesh-gradient" />

      <Container className="relative z-10 max-w-lg mx-auto text-center py-16">
        <div className="animate-scale-up">
          {/* Confetti-like circles */}
          <div className="relative inline-block mb-8">
            <div className="size-20 rounded-full bg-success/10 flex items-center justify-center">
              <CheckCircle2 className="size-10 text-success" />
            </div>
            <div className="absolute -top-2 -right-2 size-5 rounded-full bg-primary/20 animate-bounce-gentle" />
            <div className="absolute -bottom-1 -left-3 size-4 rounded-full bg-accent/20 animate-bounce-gentle" style={{ animationDelay: '0.5s' }} />
            <div className="absolute top-0 -left-5 size-3 rounded-full bg-warning/20 animate-bounce-gentle" style={{ animationDelay: '1s' }} />
          </div>

          <h1 className="text-3xl font-extrabold mb-3">Đặt hàng thành công! 🎉</h1>
          <p className="text-muted-foreground mb-8 leading-relaxed">Cảm ơn bạn đã mua hàng tại TechShop. Đơn hàng đang được xử lý.</p>

          <div className="rounded-2xl border border-border/40 bg-card p-6 text-left space-y-4 mb-8 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Mã đơn hàng</span>
              <span className="font-mono font-extrabold text-primary">{orderId}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Trạng thái</span>
              <span className="inline-flex items-center gap-1.5 text-sm font-bold text-warning">
                <Package className="size-4" /> Đang xử lý
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Dự kiến giao</span>
              <span className="text-sm font-bold">3-5 ngày làm việc</span>
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 text-sm text-muted-foreground bg-secondary rounded-full px-4 py-2 mb-8">
            <Sparkles className="size-3.5 text-primary" />
            Email xác nhận đã được gửi đến hộp thư của bạn
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/orders">
              <Button variant="outline" size="lg" className="rounded-full gap-2">
                <Package className="size-4" /> Theo dõi đơn hàng
              </Button>
            </Link>
            <Link to="/products">
              <Button size="lg" className="rounded-full gap-2 shadow-colored">
                Tiếp tục mua sắm <ArrowRight className="size-4" />
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
