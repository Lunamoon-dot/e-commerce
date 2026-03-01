import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockOrders } from "@/data";
import { formatPrice, formatDate } from "@/lib/utils";
import { ShoppingBag, Eye } from "lucide-react";

const statusConfig: Record<string, { label: string; variant: "default" | "warning" | "success" | "destructive" | "secondary" }> = {
  pending: { label: "Chờ xác nhận", variant: "secondary" },
  confirmed: { label: "Đã xác nhận", variant: "default" },
  shipping: { label: "Đang giao", variant: "warning" },
  delivered: { label: "Đã giao", variant: "success" },
  cancelled: { label: "Đã hủy", variant: "destructive" },
};

export default function AdminOrders() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Đơn hàng</h1>
        <p className="text-muted-foreground mt-1">{mockOrders.length} đơn hàng</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><ShoppingBag className="size-5" /> Danh sách đơn hàng</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="pb-3 font-semibold">Mã đơn</th>
                  <th className="pb-3 font-semibold">Ngày đặt</th>
                  <th className="pb-3 font-semibold">Thanh toán</th>
                  <th className="pb-3 font-semibold">Tổng tiền</th>
                  <th className="pb-3 font-semibold">Trạng thái</th>
                  <th className="pb-3 font-semibold"></th>
                </tr>
              </thead>
              <tbody>
                {mockOrders.map((order) => {
                  const status = statusConfig[order.status];
                  return (
                    <tr key={order.id} className="border-b border-border last:border-0">
                      <td className="py-3 font-mono font-semibold">{order.id}</td>
                      <td className="py-3 text-muted-foreground">{formatDate(order.createdAt)}</td>
                      <td className="py-3 text-muted-foreground">{order.paymentMethod}</td>
                      <td className="py-3 font-semibold">{formatPrice(order.total)}</td>
                      <td className="py-3"><Badge variant={status.variant}>{status.label}</Badge></td>
                      <td className="py-3"><Button variant="ghost" size="icon"><Eye className="size-4" /></Button></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
