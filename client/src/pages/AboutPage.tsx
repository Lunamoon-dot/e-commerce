import { Container } from "@/components/ui/container";
import { Users, Award, Zap, Heart } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";

export default function AboutPage() {
  const revealRef = useReveal();

  return (
    <div ref={revealRef}>
      {/* Hero */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 mesh-gradient" />
        <div className="orb size-[400px] bg-primary/20 top-[-100px] right-[-50px]" />
        <div className="orb size-[300px] bg-accent/15 bottom-[-80px] left-[-30px]" style={{ animationDelay: '3s' }} />

        <Container className="relative z-10 text-center max-w-3xl mx-auto">
          <h1 className="text-5xl lg:text-6xl font-extrabold mb-5 animate-fade-up">
            Về <span className="text-gradient">TechShop</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed animate-fade-up" style={{ animationDelay: '0.1s' }}>
            Cửa hàng công nghệ hàng đầu Việt Nam — Mang đến trải nghiệm mua sắm tuyệt vời với sản phẩm chính hãng và dịch vụ tận tâm.
          </p>
        </Container>
      </section>

      <Container>
        {/* Stats */}
        <section className="relative -mt-8 z-20 reveal">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { value: "50K+", label: "Khách hàng", icon: Users, color: "text-primary" },
              { value: "2,000+", label: "Sản phẩm", icon: Award, color: "text-accent" },
              { value: "99%", label: "Hài lòng", icon: Heart, color: "text-sale" },
              { value: "24/7", label: "Hỗ trợ", icon: Zap, color: "text-warning" },
            ].map((stat, i) => (
              <div key={i} className={`reveal stagger-${i + 1} text-center rounded-2xl border border-border/40 bg-card p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300`}>
                <stat.icon className={`size-7 ${stat.color} mx-auto mb-3`} />
                <p className="text-3xl font-extrabold text-gradient">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Story */}
        <section className="py-20 reveal">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs font-bold text-primary uppercase tracking-[0.2em] mb-3">Câu chuyện</p>
              <h2 className="text-3xl font-extrabold mb-6">Hành trình từ một cửa hàng nhỏ</h2>
              <div className="space-y-4 text-muted-foreground leading-[1.8]">
                <p>
                  Được thành lập vào năm 2020, TechShop bắt đầu từ một cửa hàng nhỏ tại TP. Hồ Chí Minh với sứ mệnh mang công nghệ đến gần hơn với mọi người Việt Nam.
                </p>
                <p>
                  Chúng tôi tin rằng mỗi người đều xứng đáng được sử dụng sản phẩm công nghệ chất lượng với giá cả hợp lý. Đó là lý do TechShop luôn nỗ lực tìm kiếm những deal tốt nhất.
                </p>
                <p>
                  Sau 6 năm phát triển, TechShop đã phục vụ hơn 50,000 khách hàng trên toàn quốc với hệ thống logistics nhanh chóng và đội ngũ hỗ trợ chuyên nghiệp.
                </p>
              </div>
            </div>
            <div className="rounded-3xl overflow-hidden shadow-xl ring-1 ring-border/30">
              <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=85" alt="Team" className="w-full aspect-[4/3] object-cover" />
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="pb-20 reveal">
          <div className="text-center mb-10">
            <p className="text-xs font-bold text-primary uppercase tracking-[0.2em] mb-3">Cam kết</p>
            <h2 className="text-3xl font-extrabold">Giá trị cốt lõi</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { icon: "🎯", title: "Chính hãng 100%", desc: "Cam kết sản phẩm chính hãng, nguồn gốc rõ ràng, bảo hành đầy đủ" },
              { icon: "💡", title: "Giá tốt nhất", desc: "Luôn cập nhật giá cạnh tranh nhất thị trường, deal hấp dẫn mỗi ngày" },
              { icon: "❤️", title: "Khách hàng là số 1", desc: "Mọi quyết định đều vì trải nghiệm mua sắm tốt nhất cho bạn" },
            ].map((v, i) => (
              <div key={i} className={`reveal stagger-${i + 1} rounded-2xl border border-border/40 bg-card p-8 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300`}>
                <span className="text-5xl block mb-4">{v.icon}</span>
                <h3 className="font-extrabold text-lg mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </Container>
    </div>
  );
}
