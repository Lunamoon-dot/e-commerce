import { useParams, Link } from "react-router";
import { ArrowRight, Clock, ChevronRight, Gift, Star, Percent } from "lucide-react";
import { Container, Grid } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data";
import { useState, useEffect } from "react";
import { useReveal } from "@/hooks/useReveal";

const campaigns: Record<string, { title: string; subtitle: string; emoji: string; features: string[]; products: number[] }> = {
  "flash-sale": {
    title: "Flash Sale Cuối Tuần",
    subtitle: "Giảm sốc đến 40% — Số lượng có hạn, nhanh tay kẻo lỡ!",
    emoji: "⚡",
    features: ["Giảm đến 40%", "Miễn phí vận chuyển", "Trả góp 0%"],
    products: [2, 3, 5, 8],
  },
  "combo-sinh-vien": {
    title: "Combo Sinh Viên",
    subtitle: "Trang bị công nghệ cho năm học mới — Tiết kiệm đến 5 triệu",
    emoji: "🎓",
    features: ["Giảm thêm 5%", "Tặng phụ kiện", "Bảo hành mở rộng"],
    products: [1, 3, 4, 5, 11, 12],
  },
  "sale-3-3": {
    title: "Siêu Sale 3.3",
    subtitle: "Ngày hội mua sắm lớn nhất tháng 3 — Deal chỉ từ 890K",
    emoji: "🔥",
    features: ["Deal từ 890K", "Flash voucher mỗi giờ", "Freeship toàn quốc"],
    products: [3, 5, 8, 10, 12],
  },
};

export default function LandingPage() {
  const { slug } = useParams();
  const campaign = campaigns[slug || "flash-sale"] || campaigns["flash-sale"];
  const campaignProducts = products.filter((p) => campaign.products.includes(p.id));
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const revealRef = useReveal();

  useEffect(() => {
    const endDate = new Date();
    endDate.setHours(23, 59, 59, 999);
    const timer = setInterval(() => {
      const diff = endDate.getTime() - Date.now();
      if (diff <= 0) return clearInterval(timer);
      setTimeLeft({
        hours: Math.floor(diff / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div ref={revealRef}>
      {/* Hero — full-width animated */}
      <section className="relative overflow-hidden min-h-[70vh] flex items-center">
        {/* Animated background */}
        <div className="absolute inset-0 gradient-animated opacity-90" />

        {/* Decorative shapes */}
        <div className="absolute top-10 left-10 size-20 rounded-full border-2 border-white/20 animate-spin-slow" />
        <div className="absolute bottom-20 right-20 size-32 rounded-full border border-white/10 animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '30s' }} />
        <div className="absolute top-1/4 right-1/4 size-4 rounded-full bg-white/30 animate-bounce-gentle" />
        <div className="absolute bottom-1/3 left-1/3 size-3 rounded-full bg-white/20 animate-bounce-gentle" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/5 size-6 rotate-45 border border-white/20 animate-float" style={{ animationDelay: '2s' }} />

        {/* Large emoji background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[12rem] opacity-10 animate-pulse-soft select-none pointer-events-none">
          {campaign.emoji}
        </div>

        <Container className="relative z-10 text-white text-center py-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur-sm px-5 py-2 text-sm font-medium mb-8 animate-fade-up border border-white/20">
            <Gift className="size-4 animate-bounce-gentle" />
            Chương trình đặc biệt
          </div>

          <h1 className="text-5xl lg:text-7xl font-extrabold mb-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            {campaign.emoji} {campaign.title}
          </h1>

          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-up" style={{ animationDelay: '0.2s' }}>
            {campaign.subtitle}
          </p>

          {/* Countdown */}
          <div className="flex items-center justify-center gap-4 mb-10 animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <Clock className="size-5 text-white/70" />
            <span className="text-sm font-medium text-white/70">Kết thúc sau:</span>
            <div className="flex gap-2">
              {[
                { val: pad(timeLeft.hours), label: "Giờ" },
                { val: pad(timeLeft.minutes), label: "Phút" },
                { val: pad(timeLeft.seconds), label: "Giây" },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center">
                  <span className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-3 font-mono text-3xl font-bold min-w-[72px] border border-white/20 tabular-nums">
                    {item.val}
                  </span>
                  <span className="text-[10px] text-white/50 mt-1 uppercase tracking-wider">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="flex flex-wrap justify-center gap-3 mb-10 animate-fade-up" style={{ animationDelay: '0.4s' }}>
            {campaign.features.map((feature, i) => (
              <span key={i} className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm border border-white/20">
                {i === 0 ? <Percent className="size-3.5" /> : i === 1 ? <Gift className="size-3.5" /> : <Star className="size-3.5" />}
                {feature}
              </span>
            ))}
          </div>

          <div className="animate-fade-up" style={{ animationDelay: '0.5s' }}>
            <Link to="/products">
              <Button size="xl" variant="secondary" className="rounded-full text-foreground shadow-2xl hover:shadow-xl gap-2 transition-all">
                Mua ngay <ArrowRight className="size-5" />
              </Button>
            </Link>
          </div>
        </Container>
      </section>

      {/* Products */}
      <Container className="py-16">
        <div className="text-center mb-12 reveal">
          <h2 className="text-3xl font-extrabold">Sản phẩm trong chương trình</h2>
          <p className="text-muted-foreground mt-2">{campaignProducts.length} sản phẩm đang giảm giá</p>
        </div>
        <Grid cols={4} gap="lg">
          {campaignProducts.map((product, i) => (
            <div key={product.id} className={`reveal stagger-${i + 1}`}>
              <ProductCard product={product} />
            </div>
          ))}
        </Grid>

        {/* CTA */}
        <div className="reveal text-center mt-12">
          <Link to="/products">
            <Button variant="outline" size="lg" className="rounded-full gap-2">
              Xem tất cả sản phẩm <ChevronRight className="size-4" />
            </Button>
          </Link>
        </div>
      </Container>
    </div>
  );
}
