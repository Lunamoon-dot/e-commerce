import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingProps {
  value: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  count?: number;
}

const sizeMap = { sm: "size-3.5", md: "size-4", lg: "size-5" };

export function Rating({ value, max = 5, size = "md", showValue, count }: RatingProps) {
  return (
    <div className="inline-flex items-center gap-1">
      <div className="flex">
        {Array.from({ length: max }, (_, i) => (
          <Star
            key={i}
            className={cn(
              sizeMap[size],
              i < Math.floor(value)
                ? "fill-warning text-warning"
                : i < value
                  ? "fill-warning/50 text-warning"
                  : "fill-muted text-muted"
            )}
          />
        ))}
      </div>
      {showValue && <span className="text-sm font-medium text-foreground">{value}</span>}
      {count !== undefined && <span className="text-xs text-muted-foreground">({count})</span>}
    </div>
  );
}
