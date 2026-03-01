import { useState } from "react";
import { useNavigate } from "react-router";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import { ArrowRight, Sparkles } from "lucide-react";

export default function LoginPage() {
  const [tab, setTab] = useState<"login" | "register">("login");
  const [loading, setLoading] = useState(false);
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    await login(fd.get("email") as string, fd.get("password") as string);
    setLoading(false);
    navigate("/");
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    await register(fd.get("name") as string, fd.get("email") as string, fd.get("password") as string);
    setLoading(false);
    navigate("/");
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center py-12">
      {/* Background */}
      <div className="absolute inset-0 mesh-gradient" />
      <div className="orb size-[400px] bg-primary/20 top-[-100px] right-[-100px]" />
      <div className="orb size-[300px] bg-accent/15 bottom-[-50px] left-[-50px]" style={{ animationDelay: '3s' }} />

      <Container className="relative z-10 max-w-md mx-auto">
        <div className="rounded-3xl border border-border/40 bg-card/80 backdrop-blur-xl p-8 shadow-xl animate-scale-up">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center size-16 rounded-2xl bg-gradient-brand mb-4 shadow-colored">
              <span className="text-2xl text-white">🛒</span>
            </div>
            <h1 className="text-2xl font-extrabold">Chào mừng đến TechShop</h1>
            <p className="text-sm text-muted-foreground mt-1.5">Đăng nhập để mua sắm và nhận ưu đãi</p>
          </div>

          {/* Tabs */}
          <div className="flex rounded-2xl bg-secondary p-1 mb-6">
            {[
              { key: "login" as const, label: "Đăng nhập" },
              { key: "register" as const, label: "Đăng ký" },
            ].map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={cn(
                  "flex-1 rounded-xl py-2.5 text-sm font-semibold transition-all duration-300 cursor-pointer",
                  tab === t.key ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {t.label}
              </button>
            ))}
          </div>

          {tab === "login" ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <Input id="login-email" name="email" label="Email" type="email" placeholder="email@example.com" required defaultValue="an.nguyen@gmail.com" />
              <Input id="login-password" name="password" label="Mật khẩu" type="password" placeholder="••••••••" required defaultValue="password123" />
              <Button type="submit" fullWidth size="lg" disabled={loading} className="rounded-xl gap-2 shadow-colored">
                {loading ? "Đang đăng nhập..." : <><ArrowRight className="size-4" /> Đăng nhập</>}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-4">
              <Input id="reg-name" name="name" label="Họ tên" placeholder="Nguyễn Văn An" required />
              <Input id="reg-email" name="email" label="Email" type="email" placeholder="email@example.com" required />
              <Input id="reg-password" name="password" label="Mật khẩu" type="password" placeholder="Tối thiểu 8 ký tự" required />
              <Button type="submit" fullWidth size="lg" disabled={loading} className="rounded-xl gap-2 shadow-colored">
                {loading ? "Đang đăng ký..." : <><Sparkles className="size-4" /> Tạo tài khoản</>}
              </Button>
            </form>
          )}

          <p className="text-center text-[11px] text-muted-foreground mt-6">
            Bằng việc tiếp tục, bạn đồng ý với Điều khoản sử dụng và Chính sách bảo mật của TechShop.
          </p>
        </div>
      </Container>
    </div>
  );
}
