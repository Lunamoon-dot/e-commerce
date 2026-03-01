import { Link } from "react-router";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { mockOrders } from "@/data";
import { formatPrice, formatDate } from "@/lib/utils";
import { Package, Eye } from "lucide-react";

const statusMap: Record<string, { label: string; variant: "default" | "warning" | "success" | "destructive" | "secondary" }> = {
  pending: { label: "Chờ xác nhận", variant: "secondary" },
  confirmed: { label: "Đã xác nhận", variant: "default" },
  shipping: { label: "Đang giao", variant: "warning" },
  delivered: { label: "Đã giao", variant: "success" },
  cancelled: { label: "Đã hủy", variant: "destructive" },
};

export default function OrderHistoryPage() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <Container className="py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Vui lòng đăng nhập</h1>
        <Link to="/login"><Button>Đăng nhập</Button></Link>
      </Container>
    );
  }

  return (
    <Container className="py-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
        <Package className="size-8" /> Đơn hàng của tôi
      </h1>

      <div className="space-y-4">
        {mockOrders.map((order) => {
          const status = statusMap[order.status];
          return (
            <div key={order.id} className="rounded-xl border border-border bg-card p-5 hover:shadow-md transition-shadow">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div>
                  <span className="font-mono font-bold text-sm">{order.id}</span>
                  <span className="text-xs text-muted-foreground ml-3">{formatDate(order.createdAt)}</span>
                </div>
                <Badge variant={status.variant}>{status.label}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{order.paymentMethod}</p>
                  <p className="text-lg font-bold text-primary mt-1">{formatPrice(order.total)}</p>
                </div>
                <Button variant="outline" size="sm" className="gap-1">
                  <Eye className="size-4" /> Chi tiết
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </Container>
  );
}
