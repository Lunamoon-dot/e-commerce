import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { ShoppingCart, User, Search, Menu, X, Sun, Moon, ChevronDown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { categories } from "@/data";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showCategories, setShowCategories] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { itemCount } = useCart();
  const { isAuthenticated, user, logout } = useAuth();
  const { resolvedTheme, setTheme } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handle);
    return () => window.removeEventListener("scroll", handle);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-500 ${scrolled
        ? "bg-background/70 backdrop-blur-2xl shadow-lg border-b border-border/50"
        : "bg-transparent border-b border-transparent"
      }`}>
      {/* Promo ticker */}
      <div className="gradient-animated text-white overflow-hidden">
        <div className="container-main py-1.5">
          <div className="flex items-center justify-center gap-2 text-xs font-medium">
            <Sparkles className="size-3 animate-pulse-soft" />
            <span>Miễn phí vận chuyển cho đơn từ 2.000.000₫ • Sử dụng mã <strong className="font-bold">WELCOME10</strong></span>
            <Sparkles className="size-3 animate-pulse-soft" />
          </div>
        </div>
      </div>

      <div className="container-main">
        <div className="flex h-16 items-center gap-3 lg:gap-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="size-10 rounded-2xl bg-gradient-brand flex items-center justify-center shadow-colored transition-transform group-hover:scale-105">
              <span className="text-lg font-black text-white">T</span>
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-extrabold tracking-tight text-foreground">Tech</span>
              <span className="text-xl font-extrabold tracking-tight text-gradient">Shop</span>
            </div>
          </Link>

          {/* Categories */}
          <div className="hidden lg:block relative">
            <Button
              variant="ghost"
              className="gap-1.5 rounded-full text-sm"
              onClick={() => setShowCategories(!showCategories)}
              onBlur={() => setTimeout(() => setShowCategories(false), 200)}
            >
              <Menu className="size-4" /> Danh mục <ChevronDown className="size-3" />
            </Button>
            {showCategories && (
              <div className="absolute top-full left-0 mt-2 w-64 rounded-2xl border border-border bg-popover p-2 shadow-xl animate-scale-in">
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    to={`/products/${cat.slug}`}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm hover:bg-primary-muted transition-all duration-200 group/cat"
                    onClick={() => setShowCategories(false)}
                  >
                    <span className="text-lg transition-transform group-hover/cat:scale-110">{cat.icon}</span>
                    <span className="font-medium">{cat.name}</span>
                    <span className="ml-auto text-xs text-muted-foreground bg-secondary rounded-full px-2 py-0.5">{cat.productCount}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Search */}
          <form onSubmit={handleSearch} className="flex-1 max-w-lg hidden sm:block">
            <div className="relative group">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
              <input
                type="search"
                placeholder="Tìm kiếm sản phẩm, thương hiệu..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 rounded-full border border-border bg-secondary/50 pl-10 pr-4 text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:bg-background focus:border-primary/30 focus:shadow-colored placeholder:text-muted-foreground"
              />
            </div>
          </form>

          {/* Actions */}
          <div className="flex items-center gap-0.5 ml-auto">
            <button
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              className="relative size-10 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-all duration-300 cursor-pointer"
              aria-label="Toggle theme"
            >
              <Sun className={`size-[18px] absolute transition-all duration-500 ${resolvedTheme === 'dark' ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'}`} />
              <Moon className={`size-[18px] absolute transition-all duration-500 ${resolvedTheme === 'light' ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-90 scale-0'}`} />
            </button>

            <Link to="/cart" className="relative group/cart">
              <div className="size-10 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-all duration-300">
                <ShoppingCart className="size-[18px] transition-transform group-hover/cart:scale-110" />
                {itemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 flex items-center justify-center size-[18px] rounded-full bg-sale text-sale-foreground text-[9px] font-bold animate-scale-in ring-2 ring-background">
                    {itemCount}
                  </span>
                )}
              </div>
            </Link>

            {isAuthenticated ? (
              <div className="hidden sm:flex items-center gap-1">
                <Link to="/profile">
                  <div className="flex items-center gap-2 rounded-full px-3 py-1.5 hover:bg-secondary transition-colors">
                    <img src={user?.avatar} alt="" className="size-7 rounded-full ring-2 ring-primary/20" />
                    <span className="text-sm font-medium max-w-[80px] truncate">{user?.name?.split(' ')[0]}</span>
                  </div>
                </Link>
                <button onClick={logout} className="text-xs text-muted-foreground hover:text-foreground px-2 py-1 rounded-full hover:bg-secondary transition-colors cursor-pointer">
                  Đăng xuất
                </button>
              </div>
            ) : (
              <Link to="/login" className="hidden sm:block">
                <Button variant="default" size="sm" className="rounded-full gap-1.5 shadow-colored">
                  <User className="size-3.5" /> Đăng nhập
                </Button>
              </Link>
            )}

            <button
              className="lg:hidden size-10 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors cursor-pointer"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-border bg-background/95 backdrop-blur-xl animate-fade-down">
          <div className="container-main py-5 space-y-4">
            <form onSubmit={handleSearch} className="sm:hidden">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <input
                  type="search"
                  placeholder="Tìm kiếm..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-10 rounded-full border border-border bg-secondary pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
            </form>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((cat, i) => (
                <Link
                  key={cat.id}
                  to={`/products/${cat.slug}`}
                  className={`flex items-center gap-2.5 rounded-xl p-3 text-sm font-medium hover:bg-primary-muted transition-all duration-200 stagger-${i + 1} animate-fade-up`}
                  onClick={() => setMobileOpen(false)}
                >
                  <span className="text-lg">{cat.icon}</span> {cat.name}
                </Link>
              ))}
            </div>
            {!isAuthenticated && (
              <Link to="/login" onClick={() => setMobileOpen(false)}>
                <Button variant="default" fullWidth className="rounded-full mt-2 shadow-colored">
                  Đăng nhập / Đăng ký
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
