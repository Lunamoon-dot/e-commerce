import { useState, useMemo } from "react";
import { useParams } from "react-router";
import { SlidersHorizontal, X, ChevronRight } from "lucide-react";
import { Container, Grid } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "@/components/ProductCard";
import { Pagination } from "@/components/Pagination";
import { useReveal } from "@/hooks/useReveal";
import { products, categories } from "@/data";

const ITEMS_PER_PAGE = 8;

export default function ProductListingPage() {
  const { category } = useParams();
  const [sortBy, setSortBy] = useState("featured");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const revealRef = useReveal();

  const categoryInfo = category ? categories.find((c) => c.slug === category) : null;

  const filteredProducts = useMemo(() => {
    let result = category ? products.filter((p) => p.categorySlug === category) : [...products];
    if (selectedBrands.length > 0) result = result.filter((p) => selectedBrands.includes(p.brand));
    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);
    switch (sortBy) {
      case "price-asc": result.sort((a, b) => a.price - b.price); break;
      case "price-desc": result.sort((a, b) => b.price - a.price); break;
      case "rating": result.sort((a, b) => b.rating - a.rating); break;
      case "newest": result.sort((a, b) => b.id - a.id); break;
    }
    return result;
  }, [category, sortBy, priceRange, selectedBrands]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const pageProducts = filteredProducts.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
  const brands = [...new Set((category ? products.filter((p) => p.categorySlug === category) : products).map((p) => p.brand))];

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) => prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSelectedBrands([]);
    setPriceRange([0, 100000000]);
    setSortBy("featured");
    setCurrentPage(1);
  };

  const hasActiveFilters = selectedBrands.length > 0 || priceRange[0] > 0 || priceRange[1] < 100000000;

  return (
    <div ref={revealRef}>
      {/* Header */}
      <div className="bg-secondary/30 py-8 border-b border-border/40">
        <Container>
          <nav className="flex items-center gap-1.5 text-sm text-muted-foreground mb-3">
            <a href="/" className="hover:text-foreground transition-colors">Trang chủ</a>
            <ChevronRight className="size-3" />
            <span className="text-foreground font-medium">{categoryInfo ? categoryInfo.name : "Tất cả sản phẩm"}</span>
          </nav>
          <h1 className="text-3xl font-extrabold">{categoryInfo ? `${categoryInfo.icon} ${categoryInfo.name}` : "Tất cả sản phẩm"}</h1>
          {categoryInfo && <p className="text-muted-foreground mt-1">{categoryInfo.description}</p>}
          <p className="text-sm text-muted-foreground mt-2">{filteredProducts.length} sản phẩm</p>
        </Container>
      </div>

      <Container className="py-8">
        <div className="flex gap-8">
          {/* Filter sidebar */}
          <aside className={`${showFilters ? "fixed inset-0 z-50 bg-background/95 backdrop-blur-xl p-6 overflow-auto lg:relative lg:inset-auto lg:z-auto lg:p-0 lg:bg-transparent lg:backdrop-blur-none" : "hidden lg:block"} w-full lg:w-60 shrink-0 space-y-6`}>
            <div className="flex items-center justify-between lg:hidden mb-4">
              <h3 className="text-lg font-extrabold">Bộ lọc</h3>
              <Button variant="ghost" size="icon" onClick={() => setShowFilters(false)} className="rounded-full">
                <X className="size-5" />
              </Button>
            </div>

            <div className="rounded-2xl border border-border/40 bg-card p-5 space-y-5">
              <div>
                <h4 className="font-bold text-sm mb-3">Thương hiệu</h4>
                <div className="space-y-2.5">
                  {brands.map((brand) => (
                    <label key={brand} className="flex items-center gap-2.5 cursor-pointer text-sm group">
                      <input type="checkbox" checked={selectedBrands.includes(brand)} onChange={() => toggleBrand(brand)} className="size-4 rounded border-border accent-primary" />
                      <span className="group-hover:text-primary transition-colors">{brand}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="border-t border-border/40 pt-4">
                <h4 className="font-bold text-sm mb-3">Khoảng giá</h4>
                <div className="space-y-2.5">
                  {[
                    [0, 1000000, "Dưới 1 triệu"],
                    [1000000, 5000000, "1 - 5 triệu"],
                    [5000000, 20000000, "5 - 20 triệu"],
                    [20000000, 50000000, "20 - 50 triệu"],
                    [50000000, 100000000, "Trên 50 triệu"],
                  ].map(([min, max, label]) => (
                    <label key={label as string} className="flex items-center gap-2.5 cursor-pointer text-sm group">
                      <input type="radio" name="price" checked={priceRange[0] === min && priceRange[1] === max} onChange={() => { setPriceRange([min as number, max as number]); setCurrentPage(1); }} className="size-4 accent-primary" />
                      <span className="group-hover:text-primary transition-colors">{label as string}</span>
                    </label>
                  ))}
                </div>
              </div>

              {hasActiveFilters && (
                <Button variant="outline" size="sm" fullWidth onClick={clearFilters} className="rounded-xl">
                  Xóa bộ lọc
                </Button>
              )}
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1 space-y-6">
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="lg:hidden gap-1.5 rounded-full" onClick={() => setShowFilters(true)}>
                <SlidersHorizontal className="size-4" /> Bộ lọc
              </Button>
              {hasActiveFilters && (
                <div className="flex items-center gap-2 flex-wrap">
                  {selectedBrands.map((brand) => (
                    <Badge key={brand} variant="secondary" className="gap-1 cursor-pointer rounded-full px-3 hover:bg-destructive/10 hover:text-destructive transition-colors" onClick={() => toggleBrand(brand)}>
                      {brand} <X className="size-3" />
                    </Badge>
                  ))}
                </div>
              )}
              <div className="ml-auto w-44">
                <Select value={sortBy} onChange={(e) => { setSortBy(e.target.value); setCurrentPage(1); }}>
                  <option value="featured">Nổi bật</option>
                  <option value="price-asc">Giá tăng dần</option>
                  <option value="price-desc">Giá giảm dần</option>
                  <option value="rating">Đánh giá cao</option>
                  <option value="newest">Mới nhất</option>
                </Select>
              </div>
            </div>

            {pageProducts.length > 0 ? (
              <Grid cols={3} gap="lg">
                {pageProducts.map((product, i) => (
                  <div key={product.id} className={`reveal stagger-${Math.min(i + 1, 6)}`}>
                    <ProductCard product={product} />
                  </div>
                ))}
              </Grid>
            ) : (
              <div className="text-center py-20">
                <span className="text-5xl block mb-4">🔍</span>
                <p className="text-xl font-extrabold text-muted-foreground mb-2">Không tìm thấy sản phẩm</p>
                <Button variant="outline" className="mt-4 rounded-full" onClick={clearFilters}>Xóa bộ lọc</Button>
              </div>
            )}

            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          </div>
        </div>
      </Container>
    </div>
  );
}
