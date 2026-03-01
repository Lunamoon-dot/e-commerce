import { useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import { Container, Grid } from "@/components/ui/container";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data";
import { Search } from "lucide-react";

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [localQuery, setLocalQuery] = useState(query);

  const results = useMemo(() => {
    if (!query) return [];
    const q = query.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    );
  }, [query]);

  return (
    <Container className="py-8">
      <div className="max-w-2xl mx-auto mb-8">
        <form className="relative" onSubmit={(e) => { e.preventDefault(); window.location.href = `/search?q=${encodeURIComponent(localQuery)}`; }}>
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
          <input
            type="search"
            value={localQuery}
            onChange={(e) => setLocalQuery(e.target.value)}
            placeholder="Tìm kiếm sản phẩm..."
            className="w-full h-14 rounded-2xl border border-border bg-card pl-12 pr-4 text-lg focus:outline-none focus:ring-2 focus:ring-ring shadow-sm"
            autoFocus
          />
        </form>
      </div>

      {query && (
        <p className="text-muted-foreground mb-6">
          Tìm thấy <strong className="text-foreground">{results.length}</strong> kết quả cho "<strong className="text-foreground">{query}</strong>"
        </p>
      )}

      {results.length > 0 ? (
        <Grid cols={4} gap="lg">
          {results.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Grid>
      ) : query ? (
        <div className="text-center py-16">
          <span className="text-5xl block mb-4">🔍</span>
          <h2 className="text-xl font-bold mb-2">Không tìm thấy sản phẩm</h2>
          <p className="text-muted-foreground">Thử tìm kiếm với từ khóa khác</p>
        </div>
      ) : (
        <div className="text-center py-16">
          <span className="text-5xl block mb-4">🔍</span>
          <h2 className="text-xl font-bold">Tìm kiếm sản phẩm</h2>
          <p className="text-muted-foreground mt-2">Nhập từ khóa để bắt đầu tìm kiếm</p>
        </div>
      )}
    </Container>
  );
}
