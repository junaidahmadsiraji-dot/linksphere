import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Calendar, ShoppingBag, Trash2, X } from "lucide-react";
import type { Product } from "../types";

function formatPrice(price: number): string {
  return `৳${price.toLocaleString("en-IN")}`;
}

function formatDate(ts: bigint): string {
  return new Date(Number(ts) / 1_000_000).toLocaleDateString("bn-BD", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

interface ProductDetailModalProps {
  product: Product | null;
  isAdmin: boolean;
  onClose: () => void;
  onDelete: (id: bigint) => void;
}

export function ProductDetailModal({
  product,
  isAdmin,
  onClose,
  onDelete,
}: ProductDetailModalProps) {
  if (!product) return null;

  const imageUrl = product.image
    ? ((product.image as { url?: string }).url ?? null)
    : null;

  return (
    <Dialog open={!!product} onOpenChange={() => onClose()}>
      <DialogContent
        className="max-w-sm w-full rounded-2xl p-0 overflow-hidden"
        data-ocid="products.dialog"
      >
        {/* Close button */}
        <button
          type="button"
          data-ocid="products.close_button"
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-muted transition-smooth"
          onClick={onClose}
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Image */}
        <div className="h-48 gradient-primary flex items-center justify-center overflow-hidden">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <ShoppingBag className="w-16 h-16 text-primary-foreground/50" />
          )}
        </div>

        <div className="p-5 space-y-4">
          <DialogHeader>
            <DialogTitle className="font-display text-lg text-foreground leading-snug text-left">
              {product.title}
            </DialogTitle>
          </DialogHeader>

          {/* Price badge */}
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-2xl gradient-text">
              {formatPrice(product.price)}
            </span>
            <Badge className="gradient-primary text-primary-foreground border-0 text-xs">
              Best Price
            </Badge>
          </div>

          <Separator />

          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed">
            {product.description}
          </p>

          {/* Meta */}
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Calendar className="w-3.5 h-3.5" />
            <span>Added {formatDate(product.createdAt)}</span>
          </div>

          {/* Admin actions */}
          {isAdmin && (
            <Button
              data-ocid="products.confirm_button"
              variant="destructive"
              className="w-full mt-2"
              onClick={() => {
                onDelete(product.id);
                onClose();
              }}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Product
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
