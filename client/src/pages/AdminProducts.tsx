import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { products } from "@/data";
import { formatPrice } from "@/lib/utils";
import { Package, Plus, Pencil } from "lucide-react";

export default function AdminProducts() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Sản phẩm</h1>
          <p className="text-muted-foreground mt-1">{products.length} sản phẩm</p>
        </div>
        <Button className="gap-2"><Plus className="size-4" /> Thêm sản phẩm</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Package className="size-5" /> Danh sách sản phẩm</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="pb-3 font-semibold">Sản phẩm</th>
                  <th className="pb-3 font-semibold">Danh mục</th>
                  <th className="pb-3 font-semibold">Giá</th>
                  <th className="pb-3 font-semibold">Tồn kho</th>
                  <th className="pb-3 font-semibold">Trạng thái</th>
                  <th className="pb-3 font-semibold"></th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b border-border last:border-0">
                    <td className="py-3">
                      <div className="flex items-center gap-3">
                        <img src={product.images[0]} alt="" className="size-10 rounded-lg object-cover" />
                        <div>
                          <p className="font-medium truncate max-w-[200px]">{product.name}</p>
                          <p className="text-xs text-muted-foreground">{product.brand}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 text-muted-foreground">{product.category}</td>
                    <td className="py-3 font-semibold">{formatPrice(product.price)}</td>
                    <td className="py-3">
                      <span className={product.stock < 10 ? "text-destructive font-semibold" : ""}>{product.stock}</span>
                    </td>
                    <td className="py-3">
                      <Badge variant={product.stock > 0 ? "success" : "destructive"}>
                        {product.stock > 0 ? "Còn hàng" : "Hết hàng"}
                      </Badge>
                    </td>
                    <td className="py-3">
                      <Button variant="ghost" size="icon"><Pencil className="size-4" /></Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
