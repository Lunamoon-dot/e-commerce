import { useState } from "react";
import { useParams, Link } from "react-router";
import { ShoppingCart, Heart, ChevronRight, Minus, Plus, Truck, Shield, RotateCcw, Check, Star } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Rating } from "@/components/Rating";
import { useCart } from "@/context/CartContext";
import { useReveal } from "@/hooks/useReveal";
import { products, reviews } from "@/data";
import { formatPrice, formatDate, cn } from "@/lib/utils";

export default function ProductDetailPage() {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));
  const { addItem } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
  const [addedToCart, setAddedToCart] = useState(false);
  const revealRef = useReveal();

  if (!product) {
    return (
      <Container className="py-24 text-center flex flex-col items-center justify-center">
        <span className="text-6xl block mb-6" aria-hidden="true">🔍</span>
        <h1 className="text-3xl font-bold mb-3 tracking-tight text-foreground">Sản phẩm không tồn tại</h1>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto text-balance">
          Sản phẩm này có thể đã bị xóa hoặc không tồn tại trong hệ thống của chúng tôi.
        </p>
        <Button asChild className="rounded-full px-8">
          <Link to="/products">Quay lại cửa hàng</Link>
        </Button>
      </Container>
    );
  }

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const variantGroups = product.variants.reduce((acc, v) => {
    if (!acc[v.type]) acc[v.type] = [];
    acc[v.type].push(v);
    return acc;
  }, {} as Record<string, typeof product.variants>);

  const variantLabels: Record<string, string> = { color: "Màu sắc", size: "Kích thước", storage: "Bộ nhớ" };

  const handleAddToCart = () => {
    addItem(product, quantity, selectedVariants);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <main ref={revealRef} className="pb-20">
      <Container className="py-10">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-muted-foreground mb-10 flex-wrap">
          <Link 
            to="/" 
            className="hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
          >
            Trang chủ
          </Link>
          <ChevronRight className="size-3.5 opacity-50" aria-hidden="true" />
          <Link 
            to="/products" 
            className="hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
          >
            Sản phẩm
          </Link>
          <ChevronRight className="size-3.5 opacity-50" aria-hidden="true" />
          <Link 
            to={`/products/${product.categorySlug}`} 
            className="hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
          >
            {product.category}
          </Link>
          <ChevronRight className="size-3.5 opacity-50" aria-hidden="true" />
          <span className="text-foreground font-medium truncate max-w-[240px]" aria-current="page">
            {product.name}
          </span>
        </nav>

        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-20 items-start">
          {/* Images Gallery */}
          <section aria-label="Product Images" className="space-y-6 reveal sticky top-24">
            <div className="relative aspect-[4/5] sm:aspect-square rounded-3xl overflow-hidden bg-secondary/30 border border-border/20 shadow-sm flex items-center justify-center p-8">
              <img 
                src={product.images[selectedImage]} 
                alt={product.name} 
                className="w-full h-full object-contain mix-blend-multiply transition-transform duration-700 ease-out hover:scale-[1.03]" 
                loading="eager"
                fetchpriority="high"
              />
              {discountPercent > 0 && (
                <Badge variant="sale" className="absolute top-5 left-5 text-xs font-semibold tracking-wide shadow-sm px-3 py-1 bg-destructive text-destructive-foreground border-none">
                  -{discountPercent}%
                </Badge>
              )}
            </div>
            
            {product.images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-2 -mx-2 px-2 scrollbar-none" role="tablist" aria-label="Image thumbnails">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    role="tab"
                    aria-selected={i === selectedImage}
                    aria-label={`View image ${i + 1}`}
                    onClick={() => setSelectedImage(i)}
                    className={cn(
                      "size-20 sm:size-24 shrink-0 rounded-2xl overflow-hidden border bg-secondary/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                      i === selectedImage 
                        ? "border-primary ring-1 ring-primary/20 shadow-sm" 
                        : "border-border/30 opacity-70 hover:opacity-100 hover:border-border/60"
                    )}
                  >
                    <img 
                      src={img} 
                      alt={`Thumbnail ${i + 1}`} 
                      className="size-full object-contain mix-blend-multiply p-2" 
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            )}
          </section>

          {/* Product Info */}
          <section aria-label="Product Information" className="space-y-8 reveal">
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  {product.brand}
                </p>
                <div className="flex items-center gap-2">
                  <Rating value={product.rating} showValue count={product.reviewCount} />
                  <span className="text-muted-foreground/40" aria-hidden="true">•</span>
                  <span className="text-xs font-medium text-muted-foreground">
                    Đã bán <span className="tabular-nums">{product.reviewCount * 3}+</span>
                  </span>
                </div>
              </div>
              
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground text-pretty leading-[1.15]">
                {product.name}
              </h1>
            </div>

            {/* Price */}
            <div className="flex items-end gap-3 pb-6 border-b border-border/30">
              <span className="text-4xl font-bold tracking-tight text-foreground tabular-nums">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-lg text-muted-foreground line-through decoration-muted-foreground/40 tabular-nums">
                    {formatPrice(product.originalPrice)}
                  </span>
                </div>
              )}
            </div>

            {/* Variants */}
            <div className="space-y-6 py-2">
              {Object.entries(variantGroups).map(([type, variants]) => (
                <div key={type} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-foreground">{variantLabels[type] || type}</p>
                    {selectedVariants[type] && (
                      <span className="text-xs text-muted-foreground">
                        Đã chọn: <span className="font-medium text-foreground">
                          {variants.find(v => v.value === selectedVariants[type])?.name}
                        </span>
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2.5" role="radiogroup" aria-label={`Select ${variantLabels[type] || type}`}>
                    {variants.map((v) => {
                      const isSelected = selectedVariants[type] === v.value;
                      return (
                        <button
                          key={v.id}
                          role="radio"
                          aria-checked={isSelected}
                          onClick={() => setSelectedVariants((prev) => ({ ...prev, [type]: v.value }))}
                          className={cn(
                            "relative flex items-center justify-center px-4 py-2.5 rounded-xl border text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                            isSelected
                              ? "border-primary bg-primary/5 text-primary"
                              : "border-border/40 text-muted-foreground hover:text-foreground hover:border-border/80 hover:bg-secondary/30 bg-transparent"
                          )}
                        >
                          {type === "color" && (
                            <span 
                              className="inline-block size-3.5 rounded-full mr-2.5 border border-border/50 shadow-sm" 
                              style={{ backgroundColor: v.value }} 
                              aria-hidden="true"
                            />
                          )}
                          <span>{v.name}</span>
                          {v.priceModifier > 0 && (
                            <span className="text-xs ml-1.5 opacity-70 tabular-nums">
                              +{formatPrice(v.priceModifier)}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="space-y-5 pt-6 border-t border-border/30">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-foreground">Số lượng</p>
                <p className="text-xs text-muted-foreground">
                  Còn <strong className="font-medium text-foreground tabular-nums">{product.stock}</strong> sản phẩm
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center justify-between rounded-xl border border-border/40 bg-secondary/10 w-full sm:w-[140px] h-14 shrink-0 focus-within:ring-2 focus-within:ring-ring focus-within:border-primary/50 transition-colors">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))} 
                    className="flex-1 flex justify-center items-center h-full text-muted-foreground hover:text-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus-visible:outline-none rounded-l-xl" 
                    aria-label="Giảm số lượng"
                    disabled={quantity <= 1}
                  >
                    <Minus className="size-4" />
                  </button>
                  <span className="w-10 text-center font-semibold text-foreground tabular-nums select-none">
                    {quantity}
                  </span>
                  <button 
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))} 
                    className="flex-1 flex justify-center items-center h-full text-muted-foreground hover:text-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus-visible:outline-none rounded-r-xl" 
                    aria-label="Tăng số lượng"
                    disabled={quantity >= product.stock}
                  >
                    <Plus className="size-4" />
                  </button>
                </div>
                
                <div className="flex gap-3 w-full">
                  <Button
                    size="lg"
                    className={cn(
                      "flex-1 rounded-xl h-14 text-base font-semibold shadow-sm transition-colors",
                      addedToCart 
                        ? "bg-green-600 hover:bg-green-700 text-white" 
                        : ""
                    )}
                    onClick={handleAddToCart}
                  >
                    {addedToCart ? (
                      <span className="flex items-center gap-2">
                        <Check className="size-5" /> Đã thêm vào giỏ
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <ShoppingCart className="size-5" /> Thêm vào giỏ hàng
                      </span>
                    )}
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="size-14 rounded-xl shrink-0 border-border/40 hover:bg-secondary/50 hover:text-primary transition-colors text-muted-foreground" 
                    aria-label="Thêm vào danh sách yêu thích"
                  >
                    <Heart className="size-5" />
                  </Button>
                </div>
              </div>
              
              {/* Screen reader announcement for cart */}
              <div aria-live="polite" className="sr-only">
                {addedToCart ? `Đã thêm ${quantity} ${product.name} vào giỏ hàng` : ""}
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-6 mt-6 border-t border-border/30">
              {[
                { icon: Truck, text: "Giao hàng nhanh", sub: "Từ 1-3 ngày" },
                { icon: Shield, text: "Bảo hành", sub: "Chính hãng 100%" },
                { icon: RotateCcw, text: "Đổi trả", sub: "Miễn phí 30 ngày" },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-start gap-2 p-4 rounded-2xl bg-secondary/20 border border-border/20 transition-colors hover:bg-secondary/40">
                  <div className="p-2 rounded-xl bg-background border border-border/30 shadow-sm text-foreground">
                    <item.icon className="size-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{item.text}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Description + Specs */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 mt-24">
          <section className="lg:col-span-7 reveal" aria-labelledby="desc-heading">
            <h2 id="desc-heading" className="text-2xl font-bold mb-8 tracking-tight">Chi tiết sản phẩm</h2>
            <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none text-muted-foreground leading-[1.8]">
              <p className="whitespace-pre-line text-pretty">
                {product.description || "Chưa có mô tả chi tiết cho sản phẩm này…"}
              </p>
            </div>
          </section>
          
          <section className="lg:col-span-5 reveal" aria-labelledby="specs-heading">
            <div className="sticky top-24">
              <h2 id="specs-heading" className="text-2xl font-bold mb-8 tracking-tight">Thông số kỹ thuật</h2>
              <div className="rounded-2xl border border-border/20 bg-card overflow-hidden shadow-sm">
                <dl className="divide-y divide-border/10 m-0">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <div key={key} className="flex px-6 py-4 transition-colors hover:bg-secondary/10">
                      <dt className="w-1/3 shrink-0 text-sm font-medium text-muted-foreground">{key}</dt>
                      <dd className="w-2/3 text-sm font-medium text-foreground text-right">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </section>
        </div>

        {/* Reviews */}
        <section className="mt-24 reveal max-w-4xl mx-auto" aria-labelledby="reviews-heading">
          <div className="flex items-end justify-between mb-10 border-b border-border/30 pb-6">
            <div>
              <h2 id="reviews-heading" className="text-2xl font-bold tracking-tight mb-2">Đánh giá khách hàng</h2>
              <div className="flex items-center gap-3">
                <Rating value={product.rating} showValue count={product.reviewCount} />
                <span className="text-sm text-muted-foreground">({reviews.length} nhận xét)</span>
              </div>
            </div>
            <Button variant="outline" className="hidden sm:flex rounded-xl font-medium">
              Viết đánh giá
            </Button>
          </div>
          
          {reviews.length > 0 ? (
            <div className="space-y-6">
              {reviews.map((review) => (
                <article key={review.id} className="p-6 rounded-2xl bg-card border border-border/20 shadow-sm transition-shadow hover:shadow-md">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-full overflow-hidden bg-secondary border border-border/40 shrink-0">
                        <img 
                          src={review.avatar} 
                          alt="" 
                          className="size-full object-cover" 
                          loading="lazy" 
                          aria-hidden="true" 
                        />
                      </div>
                      <div>
                        <h3 className="font-medium text-sm text-foreground">{review.userName}</h3>
                        <p className="text-xs text-muted-foreground mt-0.5 tabular-nums">
                          {formatDate(review.createdAt)}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-0.5" aria-label={`Đánh giá ${review.rating} sao`}>
                      {Array.from({ length: 5 }, (_, i) => (
                        <Star 
                          key={i} 
                          className={cn(
                            "size-3.5", 
                            i < review.rating ? "text-amber-500 fill-amber-500" : "text-border fill-transparent"
                          )} 
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed text-pretty">
                    {review.comment}
                  </p>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 px-4 rounded-2xl border border-dashed border-border/40 bg-secondary/5">
              <p className="text-muted-foreground text-sm">Chưa có đánh giá nào cho sản phẩm này.</p>
              <Button variant="outline" className="mt-4 sm:hidden rounded-xl">
                Viết đánh giá đầu tiên
              </Button>
            </div>
          )}
        </section>
      </Container>
    </main>
  );
}
