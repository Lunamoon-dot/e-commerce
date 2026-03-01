import { Link } from "react-router";
import { Mail, ArrowRight, ChevronRight } from "lucide-react";

const footerLinks = [
  {
    title: "Mua sắm",
    links: [
      { label: "Tất cả sản phẩm", to: "/products" },
      { label: "Flash Sale", to: "/sale/flash-sale" },
      { label: "Sản phẩm mới", to: "/products" },
      { label: "Bán chạy", to: "/products" },
    ],
  },
  {
    title: "Hỗ trợ",
    links: [
      { label: "Đổi trả hàng", to: "/policy/doi-tra" },
      { label: "Bảo hành", to: "/policy/bao-hanh" },
      { label: "Vận chuyển", to: "/policy/van-chuyen" },
      { label: "Liên hệ", to: "/contact" },
    ],
  },
  {
    title: "Về chúng tôi",
    links: [
      { label: "Giới thiệu", to: "/about" },
      { label: "Tuyển dụng", to: "/about" },
      { label: "Đối tác", to: "/about" },
      { label: "Blog", to: "/about" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/50 backdrop-blur-sm">
      {/* Newsletter */}
      <div className="border-b border-border">
        <div className="container-main py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-extrabold">Nhận ưu đãi độc quyền</h3>
              <p className="text-sm text-muted-foreground mt-1">Đăng ký để nhận deal hấp dẫn mỗi tuần</p>
            </div>
            <form className="flex gap-2 w-full max-w-sm" onSubmit={(e) => e.preventDefault()}>
              <div className="relative flex-1">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <input
                  type="email"
                  placeholder="Email của bạn"
                  className="w-full h-11 rounded-full border border-border bg-background pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/30"
                />
              </div>
              <button type="submit" className="shrink-0 h-11 px-5 rounded-full bg-gradient-brand text-white text-sm font-semibold shadow-colored hover:shadow-glow-lg transition-all cursor-pointer">
                <ArrowRight className="size-4" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Links */}
      <div className="container-main py-10">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="size-10 rounded-2xl bg-gradient-brand flex items-center justify-center shadow-colored">
                <span className="text-lg font-black text-white">T</span>
              </div>
              <div>
                <span className="text-xl font-extrabold">Tech</span>
                <span className="text-xl font-extrabold text-gradient">Shop</span>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Cửa hàng công nghệ hàng đầu Việt Nam. Sản phẩm chính hãng, giá tốt nhất, giao hàng nhanh chóng.
            </p>
            <div className="flex gap-3 mt-5">
              {["f", "in", "yt", "tt"].map((s) => (
                <a key={s} href="#" className="size-9 rounded-full bg-secondary flex items-center justify-center text-xs font-bold text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                  {s}
                </a>
              ))}
            </div>
          </div>

          {footerLinks.map((group) => (
            <div key={group.title}>
              <h4 className="font-bold text-sm mb-4">{group.title}</h4>
              <ul className="space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 group/link transition-colors">
                      <ChevronRight className="size-3 opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-border">
        <div className="container-main py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <span>© 2026 TechShop. All rights reserved.</span>
          <div className="flex items-center gap-4">
            {["Visa", "Master", "MoMo", "ZaloPay"].map((m) => (
              <span key={m} className="bg-secondary rounded-md px-2.5 py-1 font-medium text-[10px]">{m}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
