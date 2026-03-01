import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { Link } from "react-router";
import { MapPin, Package } from "lucide-react";

export default function ProfilePage() {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return (
      <Container className="py-20 text-center">
        <span className="text-5xl block mb-4">👤</span>
        <h1 className="text-2xl font-extrabold mb-4">Vui lòng đăng nhập</h1>
        <Link to="/login"><Button className="rounded-full">Đăng nhập</Button></Link>
      </Container>
    );
  }

  return (
    <Container className="py-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-extrabold mb-8">Tài khoản của tôi</h1>

      <div className="space-y-6">
        <div className="rounded-2xl border border-border/40 bg-card p-6 shadow-sm">
          <div className="flex items-center gap-4 mb-6">
            <img src={user.avatar} alt={user.name} className="size-20 rounded-full ring-4 ring-primary/10 shadow-colored" />
            <div>
              <h2 className="text-xl font-extrabold">{user.name}</h2>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <Input id="profile-name" label="Họ tên" defaultValue={user.name} />
            <Input id="profile-email" label="Email" defaultValue={user.email} />
            <Input id="profile-phone" label="Số điện thoại" defaultValue={user.phone} />
          </div>
          <Button className="mt-4 rounded-xl shadow-colored">Lưu thay đổi</Button>
        </div>

        <div className="rounded-2xl border border-border/40 bg-card p-6 shadow-sm">
          <h3 className="text-lg font-extrabold mb-4 flex items-center gap-2"><MapPin className="size-5 text-primary" /> Địa chỉ</h3>
          <div className="space-y-3">
            {user.addresses.map((addr) => (
              <div key={addr.id} className={`rounded-xl border-2 p-4 transition-all ${addr.isDefault ? "border-primary/50 bg-primary-muted" : "border-border/40"}`}>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-sm">{addr.name} — {addr.phone}</span>
                  {addr.isDefault && <span className="text-[11px] font-bold text-primary bg-primary-muted px-2.5 py-0.5 rounded-full border border-primary/20">Mặc định</span>}
                </div>
                <p className="text-sm text-muted-foreground">{addr.street}, {addr.ward}, {addr.district}, {addr.city}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <Link to="/orders" className="flex items-center gap-3 rounded-2xl border border-border/40 bg-card p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
            <div className="size-12 rounded-xl bg-primary-muted flex items-center justify-center">
              <Package className="size-5 text-primary" />
            </div>
            <div>
              <p className="font-bold">Đơn hàng của tôi</p>
              <p className="text-xs text-muted-foreground">Xem lịch sử đơn hàng</p>
            </div>
          </Link>
          <Link to="/policy/doi-tra" className="flex items-center gap-3 rounded-2xl border border-border/40 bg-card p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
            <div className="size-12 rounded-xl bg-accent/10 flex items-center justify-center">
              <span className="text-xl">🔄</span>
            </div>
            <div>
              <p className="font-bold">Đổi trả hàng</p>
              <p className="text-xs text-muted-foreground">Chính sách đổi trả</p>
            </div>
          </Link>
        </div>
      </div>
    </Container>
  );
}
