import { Link, useLocation } from "react-router";
import { LayoutDashboard, Package, ShoppingBag, Warehouse, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/admin" },
  { label: "Sản phẩm", icon: Package, path: "/admin/products" },
  { label: "Đơn hàng", icon: ShoppingBag, path: "/admin/orders" },
  { label: "Tồn kho", icon: Warehouse, path: "/admin/inventory" },
];

export function AdminSidebar() {
  const location = useLocation();

  return (
    <aside className="hidden lg:flex w-64 flex-col border-r border-border bg-card">
      <div className="p-6 border-b border-border">
        <Link to="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4">
          <ArrowLeft className="size-4" /> Về trang chủ
        </Link>
        <h2 className="text-lg font-bold">🛠️ Admin Panel</h2>
        <p className="text-xs text-muted-foreground mt-1">Quản lý cửa hàng</p>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
              location.pathname === item.path
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            )}
          >
            <item.icon className="size-5" />
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
