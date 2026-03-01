import { Package, ShoppingBag, TrendingUp, Users, DollarSign, BarChart3, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { products, mockOrders } from "@/data";
import { formatPrice } from "@/lib/utils";

export default function AdminDashboard() {
  const stats = [
    { label: "Doanh thu", value: formatPrice(109450000), change: "+12.5%", up: true, icon: DollarSign, color: "text-success", bg: "bg-success/10" },
    { label: "Đơn hàng", value: "156", change: "+8.2%", up: true, icon: ShoppingBag, color: "text-primary", bg: "bg-primary-muted" },
    { label: "Khách hàng", value: "2,847", change: "+5.1%", up: true, icon: Users, color: "text-accent", bg: "bg-accent/10" },
    { label: "Tồn kho", value: "1,234", change: "-2.3%", up: false, icon: Package, color: "text-warning", bg: "bg-warning/10" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Tổng quan cửa hàng TechShop</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Card key={i} className="rounded-2xl border-border/40 hover:shadow-md transition-all duration-300">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div className={`rounded-xl ${stat.bg} p-2.5`}>
                  <stat.icon className={`size-5 ${stat.color}`} />
                </div>
                <span className={`inline-flex items-center gap-0.5 text-xs font-bold rounded-full px-2 py-0.5 ${stat.up ? "text-success bg-success/10" : "text-destructive bg-destructive/10"}`}>
                  {stat.up ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
                  {stat.change}
                </span>
              </div>
              <p className="text-2xl font-extrabold mt-4">{stat.value}</p>
              <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent orders */}
        <Card className="rounded-2xl border-border/40">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base font-extrabold"><BarChart3 className="size-5 text-primary" /> Đơn hàng gần đây</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between rounded-xl border border-border/40 p-3.5 hover:bg-secondary/50 transition-colors">
                  <div>
                    <p className="font-mono text-sm font-bold">{order.id}</p>
                    <p className="text-xs text-muted-foreground">{order.createdAt}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sm">{formatPrice(order.total)}</p>
                    <Badge variant={order.status === "delivered" ? "success" : order.status === "shipping" ? "warning" : "secondary"} className="text-[10px]">
                      {order.status === "delivered" ? "Đã giao" : order.status === "shipping" ? "Đang giao" : "Xác nhận"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top products */}
        <Card className="rounded-2xl border-border/40">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base font-extrabold"><TrendingUp className="size-5 text-accent" /> Sản phẩm bán chạy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {products.slice(0, 5).map((product, i) => (
                <div key={product.id} className="flex items-center gap-3 rounded-xl border border-border/40 p-3.5 hover:bg-secondary/50 transition-colors">
                  <span className="text-base font-extrabold text-muted-foreground w-6">#{i + 1}</span>
                  <img src={product.images[0]} alt="" className="size-10 rounded-xl object-cover ring-1 ring-border/30" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold truncate">{product.name}</p>
                    <p className="text-xs text-muted-foreground">{product.brand}</p>
                  </div>
                  <span className="text-sm font-extrabold">{formatPrice(product.price)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
