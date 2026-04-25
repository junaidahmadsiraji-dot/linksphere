import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ShoppingBag, Tag, Trash2 } from "lucide-react";
import type { Product } from "../types";

function formatPrice(price: number): string {
  return `৳${price.toLocaleString("en-IN")}`;
}

interface ProductCardProps {
  product: Product;
  isAdmin: boolean;
  index: number;
  onClick: (product: Product) => void;
  onDelete: (id: bigint) => void;
}

export function ProductCard({
  product,
  isAdmin,
  index,
  onClick,
  onDelete,
}: ProductCardProps) {
  const imageUrl = product.image
    ? ((product.image as { url?: string }).url ?? null)
    : null;

  return (
    <div
      className="bg-card rounded-2xl shadow-sm border border-border overflow-hidden transition-smooth hover:shadow-md hover:-translate-y-0.5 relative group"
      data-ocid={`products.item.${index + 1}`}
    >
      {/* Clickable overlay covers card (except delete button) */}
      <button
        type="button"
        className="absolute inset-0 z-0 w-full h-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset rounded-2xl"
        onClick={() => onClick(product)}
        aria-label={`View ${product.title}`}
      />

      {/* Image */}
      <div
        className={cn(
          "h-36 flex items-center justify-center overflow-hidden relative z-0 pointer-events-none",
          imageUrl ? "bg-muted" : "gradient-primary opacity-80",
        )}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={product.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <ShoppingBag className="w-12 h-12 text-primary-foreground/60" />
        )}
      </div>

      {/* Admin delete button */}
      {isAdmin && (
        <button
          type="button"
          data-ocid={`products.delete_button.${index + 1}`}
          className="absolute top-2 right-2 w-7 h-7 rounded-full bg-destructive/90 text-destructive-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-smooth hover:bg-destructive z-10"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(product.id);
          }}
          aria-label={`Delete ${product.title}`}
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      )}

      <div className="p-3 space-y-2 relative z-0 pointer-events-none">
        <h3 className="font-display font-semibold text-sm text-foreground leading-tight line-clamp-2">
          {product.title}
        </h3>

        <p className="text-xs text-muted-foreground line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between pt-1">
          <span className="font-display font-bold text-primary text-base">
            {formatPrice(product.price)}
          </span>
          <Badge variant="outline" className="text-[10px] border-border">
            <Tag className="w-2.5 h-2.5 mr-1" />
            Product
          </Badge>
        </div>
      </div>
    </div>
  );
}
