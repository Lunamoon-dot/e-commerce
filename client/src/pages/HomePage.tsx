import { Link } from "react-router";
import { ArrowRight, Truck, Shield, Headphones, CreditCard, ChevronRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container, Grid } from "@/components/ui/container";
import { ProductCard } from "@/components/ProductCard";
import { FlashSale } from "@/components/FlashSale";
import { products, categories } from "@/data";
import { useReveal } from "@/hooks/useReveal";

export default function HomePage() {
  const featuredProducts = products.filter((p) => p.isFeatured);
  const revealRef = useReveal();

  return (
    <div ref={revealRef}>
      {/* Hero */}
      <section className="relative overflow-hidden min-h-[85vh] flex items-center">
        {/* Animated orbs */}
        <div className="orb size-[500px] bg-primary/30 top-[-100px] left-[-100px]" />
        <div className="orb size-[400px] bg-accent/20 bottom-[-80px] right-[-60px]" style={{ animationDelay: '2s' }} />
        <div className="orb size-[300px] bg-gradient-mid/20 top-[30%] right-[20%]" style={{ animationDelay: '4s' }} />

        {/* Mesh background */}
        <div className="absolute inset-0 mesh-gradient" />

        {/* Noise texture */}
        <div className="absolute inset-0 opacity-[0.015] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI2EpIi8+PC9zdmc+')]" />

        <Container className="relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 py-12">
            {/* Left content */}
            <div className="flex-1 space-y-8 text-center lg:text-left">
              <div className="reveal inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-sm font-medium shadow-sm">
                <Zap className="size-4 text-primary animate-bounce-gentle" />
                <span>Sale tháng 3 — Giảm đến <strong className="text-primary">30%</strong></span>
              </div>

              <h1 className="reveal stagger-1 text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight">
                Công nghệ{" "}
                <span className="text-gradient relative">
                  đỉnh cao
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                    <path d="M2 8C50 2 100 2 150 6C200 10 250 4 298 8" stroke="url(#underline-grad)" strokeWidth="3" strokeLinecap="round" />
                    <defs><linearGradient id="underline-grad" x1="0" y1="0" x2="300" y2="0"><stop stopColor="var(--color-primary)" /><stop offset="1" stopColor="var(--color-accent)" /></linearGradient></defs>
                  </svg>
                </span>
                <br />
                <span className="text-muted-foreground font-medium text-4xl sm:text-5xl lg:text-[3.5rem]">
                  Giá cả tốt nhất
                </span>
              </h1>

              <p className="reveal stagger-2 text-lg text-muted-foreground max-w-lg mx-auto lg:mx-0 leading-relaxed">
                Khám phá hàng ngàn sản phẩm chính hãng. Giao hàng nhanh chóng, bảo hành chu đáo, giá không đâu tốt hơn.
              </p>

              <div className="reveal stagger-3 flex flex-wrap gap-3 justify-center lg:justify-start">
                <Link to="/products">
                  <Button size="xl" className="rounded-full gap-2 shadow-colored hover:shadow-glow-lg transition-shadow duration-500">
                    Khám phá ngay <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link to="/sale/flash-sale">
                  <Button variant="outline" size="xl" className="rounded-full gap-2">
                    ⚡ Flash Sale
                  </Button>
                </Link>
              </div>

              {/* Social proof */}
              <div className="reveal stagger-4 flex items-center gap-6 justify-center lg:justify-start pt-4">
                <div className="flex -space-x-2">
                  {[1, 3, 5, 9].map((i) => (
                    <img key={i} src={`https://i.pravatar.cc/32?img=${i}`} alt="" className="size-8 rounded-full ring-2 ring-background" />
                  ))}
                </div>
                <div className="text-sm">
                  <span className="font-bold text-foreground">50,000+</span>{" "}
                  <span className="text-muted-foreground">khách hàng hài lòng</span>
                </div>
              </div>
            </div>

            {/* Right — hero image */}
            <div className="flex-1 relative reveal stagger-3">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl ring-1 ring-border/50">
                <img
                  src="https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=700&q=85"
                  alt="Tech products"
                  className="w-full aspect-[4/3] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-accent/10" />
              </div>

              {/* Floating cards */}
              <div className="absolute -bottom-6 -left-6 glass-heavy rounded-2xl p-4 shadow-xl animate-float hidden sm:flex items-center gap-3">
                <div className="size-10 rounded-xl bg-gradient-brand flex items-center justify-center">
                  <span className="text-white text-lg">🎉</span>
                </div>
                <div>
                  <p className="text-sm font-bold">2,000+ sản phẩm</p>
                  <p className="text-xs text-muted-foreground">Chính hãng 100%</p>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 glass-heavy rounded-2xl px-4 py-3 shadow-xl animate-float hidden md:block" style={{ animationDelay: '3s' }}>
                <p className="text-sm font-bold text-success flex items-center gap-1">
                  <span className="size-2 rounded-full bg-success animate-pulse-soft" /> Đang giảm giá
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Trust badges — redesigned as floating bar */}
      <section className="relative -mt-6 z-20">
        <Container>
          <div className="reveal rounded-2xl glass-heavy shadow-xl p-1">
            <div className="grid grid-cols-2 lg:grid-cols-4">
              {[
                { icon: Truck, title: "Miễn phí ship", desc: "Đơn từ 2 triệu", color: "text-primary" },
                { icon: Shield, title: "Bảo hành chính hãng", desc: "12-24 tháng", color: "text-success" },
                { icon: Headphones, title: "Hỗ trợ 24/7", desc: "Luôn sẵn sàng", color: "text-accent" },
                { icon: CreditCard, title: "Thanh toán an toàn", desc: "Đa dạng hình thức", color: "text-warning" },
              ].map((item, i) => (
                <div key={i} className={`flex items-center gap-3 p-5 ${i > 0 ? 'border-l border-border/50' : ''}`}>
                  <div className="shrink-0 size-11 rounded-xl bg-secondary flex items-center justify-center">
                    <item.icon className={`size-5 ${item.color}`} />
                  </div>
                  <div>
                    <p className="text-sm font-bold">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <Container>
        {/* Categories */}
        <section className="py-16 reveal">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-extrabold">Danh mục sản phẩm</h2>
              <p className="text-muted-foreground mt-2">Tìm đúng thứ bạn cần</p>
            </div>
            <Link to="/products" className="text-sm text-primary font-semibold hover:underline flex items-center gap-1 group">
              Tất cả <ChevronRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {categories.map((cat, i) => (
              <Link
                key={cat.id}
                to={`/products/${cat.slug}`}
                className={`reveal stagger-${i + 1} group flex flex-col items-center gap-3 rounded-2xl border border-border/40 bg-card p-5 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 hover:-translate-y-1`}
              >
                <span className="text-3xl transition-transform duration-300 group-hover:scale-125 group-hover:rotate-6">{cat.icon}</span>
                <span className="text-xs font-semibold text-center">{cat.name}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Flash sale */}
        <div className="reveal">
          <FlashSale />
        </div>

        {/* Featured products */}
        <section className="py-16 reveal">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-extrabold">Sản phẩm nổi bật</h2>
              <p className="text-muted-foreground mt-2">Được yêu thích nhất tuần này</p>
            </div>
            <Link to="/products" className="text-sm text-primary font-semibold hover:underline flex items-center gap-1 group">
              Xem tất cả <ChevronRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <Grid cols={4} gap="lg">
            {featuredProducts.map((product, i) => (
              <div key={product.id} className={`reveal stagger-${i + 1}`}>
                <ProductCard product={product} />
              </div>
            ))}
          </Grid>
        </section>

        {/* CTA */}
        <section className="py-16 reveal">
          <div className="relative rounded-3xl overflow-hidden">
            <div className="gradient-animated p-10 lg:p-16 text-center text-white relative">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-white/10 -translate-y-1/2 translate-x-1/3 blur-2xl" />
              <div className="absolute bottom-0 left-0 w-56 h-56 rounded-full bg-white/5 translate-y-1/3 -translate-x-1/4 blur-xl" />

              <div className="relative z-10 max-w-xl mx-auto">
                <p className="text-white/70 text-sm font-medium uppercase tracking-widest mb-4">Ưu đãi đặc biệt</p>
                <h2 className="text-3xl lg:text-4xl font-extrabold mb-4">
                  Nhận ngay giảm giá <span className="underline decoration-wavy decoration-2 underline-offset-8">10%</span>
                </h2>
                <p className="text-white/70 mb-8 leading-relaxed">
                  Đăng ký tài khoản và sử dụng mã <code className="bg-white/20 rounded-lg px-2 py-0.5 font-mono font-bold">WELCOME10</code> cho đơn hàng đầu tiên.
                </p>
                <Link to="/login">
                  <Button size="xl" variant="secondary" className="rounded-full text-foreground shadow-xl hover:shadow-2xl transition-all">
                    Bắt đầu mua sắm <ArrowRight className="size-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
}
