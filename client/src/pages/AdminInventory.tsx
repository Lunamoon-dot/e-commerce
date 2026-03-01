import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { products } from "@/data";
import { Warehouse } from "lucide-react";

export default function AdminInventory() {
  const sortedByStock = [...products].sort((a, b) => a.stock - b.stock);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Tồn kho</h1>
        <p className="text-muted-foreground mt-1">Quản lý số lượng tồn kho</p>
      </div>

      {/* Alerts */}
      <div className="grid sm:grid-cols-3 gap-4">
        <Card className="border-destructive/50 bg-destructive/5">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-destructive">{products.filter((p) => p.stock < 10).length}</p>
            <p className="text-sm text-muted-foreground">Sắp hết hàng</p>
          </CardContent>
        </Card>
        <Card className="border-warning/50 bg-warning/5">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-warning">{products.filter((p) => p.stock >= 10 && p.stock < 30).length}</p>
            <p className="text-sm text-muted-foreground">Tồn kho thấp</p>
          </CardContent>
        </Card>
        <Card className="border-success/50 bg-success/5">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-success">{products.filter((p) => p.stock >= 30).length}</p>
            <p className="text-sm text-muted-foreground">Đủ hàng</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Warehouse className="size-5" /> Chi tiết tồn kho</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="pb-3 font-semibold">Sản phẩm</th>
                  <th className="pb-3 font-semibold">Danh mục</th>
                  <th className="pb-3 font-semibold">Tồn kho</th>
                  <th className="pb-3 font-semibold">Trạng thái</th>
                  <th className="pb-3 font-semibold">Mức tồn</th>
                </tr>
              </thead>
              <tbody>
                {sortedByStock.map((product) => {
                  const stockLevel = product.stock < 10 ? "danger" : product.stock < 30 ? "low" : "ok";
                  return (
                    <tr key={product.id} className="border-b border-border last:border-0">
                      <td className="py-3">
                        <div className="flex items-center gap-3">
                          <img src={product.images[0]} alt="" className="size-10 rounded-lg object-cover" />
                          <span className="font-medium truncate max-w-[200px]">{product.name}</span>
                        </div>
                      </td>
                      <td className="py-3 text-muted-foreground">{product.category}</td>
                      <td className="py-3 font-bold">{product.stock}</td>
                      <td className="py-3">
                        <Badge variant={stockLevel === "danger" ? "destructive" : stockLevel === "low" ? "warning" : "success"}>
                          {stockLevel === "danger" ? "Sắp hết" : stockLevel === "low" ? "Thấp" : "Đủ hàng"}
                        </Badge>
                      </td>
                      <td className="py-3">
                        <div className="w-24 h-2 rounded-full bg-secondary overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all ${stockLevel === "danger" ? "bg-destructive" : stockLevel === "low" ? "bg-warning" : "bg-success"
                              }`}
                            style={{ width: `${Math.min(100, (product.stock / 100) * 100)}%` }}
                          />
                        </div>
                      </td>
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
