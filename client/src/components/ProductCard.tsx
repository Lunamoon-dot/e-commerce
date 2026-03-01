import { Link } from "react-router";
import { ShoppingCart, Heart } from "lucide-react";
import type { Product } from "@/types";
import { formatPrice, cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Rating } from "@/components/Rating";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const { addItem } = useCart();
  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Link
      to={`/product/${product.id}`}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card transition-all duration-500",
        "hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-2 hover:border-primary/20",
        className
      )}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
        <img
          src={product.images[0]}
          alt={product.name}
          className="size-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-105"
          loading="lazy"
        />

        {/* Top gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {discountPercent > 0 && (
            <Badge variant="sale" className="shadow-md backdrop-blur-sm">-{discountPercent}%</Badge>
          )}
          {product.isFlashSale && (
            <Badge variant="destructive" className="animate-pulse-soft shadow-md backdrop-blur-sm">⚡ Flash</Badge>
          )}
        </div>

        {/* Wishlist */}
        <button
          onClick={(e) => { e.preventDefault(); }}
          className="absolute top-3 right-3 size-9 rounded-full bg-white/80 dark:bg-black/60 backdrop-blur-sm shadow-md flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-white dark:hover:bg-black hover:scale-110"
          aria-label="Yêu thích"
        >
          <Heart className="size-4" />
        </button>

        {/* Add to Cart */}
        <div className="absolute inset-x-3 bottom-3 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <button
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-foreground text-background text-sm font-semibold shadow-xl backdrop-blur-sm transition-all hover:bg-foreground/90 active:scale-95 cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              addItem(product);
            }}
          >
            <ShoppingCart className="size-4" />
            Thêm vào giỏ
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold text-primary uppercase tracking-widest">{product.brand}</span>
          <Rating value={product.rating} size="sm" />
        </div>

        <h3 className="text-[13px] font-semibold text-foreground line-clamp-2 leading-snug mt-0.5 group-hover:text-primary transition-colors duration-300">
          {product.name}
        </h3>

        <div className="mt-auto pt-2 flex items-baseline gap-2 border-t border-border/50">
          <span className="text-base font-bold text-foreground">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="text-[11px] text-muted-foreground line-through">{formatPrice(product.originalPrice)}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
