import { useParams, Link } from "react-router";
import { ChevronRight } from "lucide-react";
import { Container, Grid } from "@/components/ui/container";
import { ProductCard } from "@/components/ProductCard";
import { products, categories } from "@/data";

const seoCategories: Record<string, { title: string; description: string; filter: (p: typeof products[0]) => boolean }> = {
  "tai-nghe-gaming-duoi-1-trieu": {
    title: "Tai nghe gaming dưới 1 triệu",
    description: "Tổng hợp tai nghe gaming chất lượng với giá dưới 1 triệu đồng. Âm thanh sống động, micro rõ ràng, phù hợp cho game thủ mới.",
    filter: (p) => p.categorySlug === "tai-nghe" && p.price < 1000000,
  },
  "laptop-do-hoa": {
    title: "Laptop đồ họa chuyên nghiệp",
    description: "Danh sách laptop hiệu năng cao dành cho thiết kế đồ họa, render video và lập trình chuyên nghiệp.",
    filter: (p) => p.categorySlug === "laptop" && p.tags.includes("đồ họa"),
  },
  "phu-kien-ban-chay": {
    title: "Phụ kiện bán chạy nhất",
    description: "Top phụ kiện công nghệ được yêu thích nhất tại TechShop: cáp sạc, ốp lưng, balo laptop, và nhiều hơn nữa.",
    filter: (p) => p.categorySlug === "phu-kien",
  },
};

export default function CategorySEOPage() {
  const { slug } = useParams();
  const seo = seoCategories[slug || ""];

  if (!seo) {
    // Fallback to normal category
    const cat = categories.find((c) => c.slug === slug);
    const catProducts = products.filter((p) => p.categorySlug === slug);

    return (
      <Container className="py-8">
        <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-foreground">Trang chủ</Link>
          <ChevronRight className="size-3" />
          <span className="text-foreground">{cat?.name || slug}</span>
        </nav>
        <h1 className="text-3xl font-bold mb-2">{cat?.name || slug}</h1>
        {cat && <p className="text-muted-foreground mb-8">{cat.description}</p>}
        <Grid cols={4} gap="lg">
          {catProducts.map((product) => (<ProductCard key={product.id} product={product} />))}
        </Grid>
      </Container>
    );
  }

  const filteredProducts = products.filter(seo.filter);

  return (
    <Container className="py-8">
      <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-6">
        <Link to="/" className="hover:text-foreground">Trang chủ</Link>
        <ChevronRight className="size-3" />
        <Link to="/products" className="hover:text-foreground">Sản phẩm</Link>
        <ChevronRight className="size-3" />
        <span className="text-foreground">{seo.title}</span>
      </nav>

      <div className="mb-8">
        <h1 className="text-3xl font-extrabold mb-3">{seo.title}</h1>
        <p className="text-muted-foreground max-w-2xl leading-relaxed">{seo.description}</p>
      </div>

      {filteredProducts.length > 0 ? (
        <Grid cols={4} gap="lg">
          {filteredProducts.map((product) => (<ProductCard key={product.id} product={product} />))}
        </Grid>
      ) : (
        <div className="text-center py-16">
          <p className="text-xl font-semibold text-muted-foreground">Hiện chưa có sản phẩm trong danh mục này</p>
        </div>
      )}
    </Container>
  );
}
