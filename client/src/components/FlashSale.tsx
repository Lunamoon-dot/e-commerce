import { useState, useEffect } from "react";
import { Link } from "react-router";
import { Zap, Clock, ArrowRight } from "lucide-react";
import { Grid } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data";

export function FlashSale() {
  const flashProducts = products.filter((p) => p.isFlashSale);
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const endDate = new Date();
    endDate.setHours(23, 59, 59, 999);
    const timer = setInterval(() => {
      const diff = endDate.getTime() - Date.now();
      if (diff <= 0) return clearInterval(timer);
      setTimeLeft({
        hours: Math.floor(diff / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");

  if (flashProducts.length === 0) return null;

  return (
    <section className="py-16">
      <div className="rounded-3xl border border-sale/20 bg-sale/[0.03] p-6 lg:p-10 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-sale/10 blur-[80px]" />
        <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-primary/5 blur-[60px]" />

        <div className="relative z-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="size-12 rounded-2xl bg-sale/10 flex items-center justify-center">
                <Zap className="size-6 text-sale animate-pulse-soft" />
              </div>
              <div>
                <h2 className="text-2xl font-extrabold flex items-center gap-2">
                  Flash Sale
                </h2>
                <div className="flex items-center gap-2 mt-1">
                  <Clock className="size-3.5 text-muted-foreground" />
                  <div className="flex gap-1 items-center">
                    {[pad(timeLeft.hours), pad(timeLeft.minutes), pad(timeLeft.seconds)].map((v, i) => (
                      <span key={i}>
                        <span className="bg-foreground text-background text-xs font-mono font-bold px-1.5 py-0.5 rounded-md tabular-nums">{v}</span>
                        {i < 2 && <span className="text-muted-foreground font-bold mx-0.5">:</span>}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <Link to="/sale/flash-sale">
              <Button variant="outline" size="sm" className="rounded-full gap-1 border-sale/30 text-sale hover:bg-sale/10">
                Xem tất cả <ArrowRight className="size-3.5" />
              </Button>
            </Link>
          </div>

          <Grid cols={4} gap="lg">
            {flashProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </Grid>
        </div>
      </div>
    </section>
  );
}
