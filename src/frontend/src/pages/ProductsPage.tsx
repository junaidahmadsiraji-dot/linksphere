import { CreateProductModal } from "@/components/CreateProductModal";
import { ProductCard } from "@/components/ProductCard";
import { ProductDetailModal } from "@/components/ProductDetailModal";
import { EmptyState } from "@/components/ui/EmptyState";
import { GradientButton } from "@/components/ui/GradientButton";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/use-auth";
import { useProducts } from "@/hooks/use-backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { ExternalBlob, createActor } from "../backend";
import type { Product } from "../types";

// ─── Skeleton grid ───────────────────────────────────────────────────────────
function ProductSkeleton() {
  return (
    <div className="bg-card rounded-2xl border border-border overflow-hidden">
      <Skeleton className="h-36 w-full rounded-none" />
      <div className="p-3 space-y-2">
        <Skeleton className="h-4 w-3/4 rounded" />
        <Skeleton className="h-3 w-full rounded" />
        <Skeleton className="h-3 w-2/3 rounded" />
        <div className="flex justify-between pt-1">
          <Skeleton className="h-5 w-20 rounded" />
          <Skeleton className="h-5 w-14 rounded" />
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ProductsPage() {
  const { data: products, isLoading, error } = useProducts();
  const { isAdmin, isAuthenticated } = useAuth();
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showCreate, setShowCreate] = useState(false);

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Not connected");
      await actor.deleteProduct(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product deleted");
    },
    onError: () => toast.error("Failed to delete product"),
  });

  // Create mutation
  const createMutation = useMutation({
    mutationFn: async (data: {
      title: string;
      description: string;
      price: number;
      imageFile?: File;
    }) => {
      if (!actor) throw new Error("Not connected");
      let image: ExternalBlob | undefined;
      if (data.imageFile) {
        const bytes = new Uint8Array(await data.imageFile.arrayBuffer());
        image = ExternalBlob.fromBytes(bytes);
      }
      await actor.createProduct({
        title: data.title,
        description: data.description,
        price: data.price,
        image,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setShowCreate(false);
      toast.success("Product added!");
    },
    onError: () => toast.error("Failed to add product"),
  });

  const handleDelete = (id: bigint) => deleteMutation.mutate(id);
  const handleCreate = async (data: {
    title: string;
    description: string;
    price: number;
    imageFile?: File;
  }) => {
    await createMutation.mutateAsync(data);
  };

  return (
    <div
      className="px-3 py-4 space-y-4 max-w-2xl mx-auto pb-24"
      data-ocid="products.page"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-1">
        <h2 className="font-display font-bold text-xl gradient-text flex items-center gap-2">
          <ShoppingBag className="w-5 h-5 text-primary" />
          Products
        </h2>
        {isAdmin && (
          <GradientButton
            size="sm"
            data-ocid="products.add_button"
            onClick={() => setShowCreate(true)}
          >
            <Plus className="w-4 h-4" />
            Add Product
          </GradientButton>
        )}
      </div>

      {/* Loading skeletons */}
      {isLoading && (
        <div
          className="grid grid-cols-2 gap-3"
          data-ocid="products.loading_state"
        >
          {(["a", "b", "c", "d"] as const).map((key) => (
            <ProductSkeleton key={key} />
          ))}
        </div>
      )}

      {/* Error state */}
      {error && !isLoading && (
        <div
          className="text-center py-10 text-sm text-destructive"
          data-ocid="products.error_state"
        >
          Failed to load products. Please try again.
        </div>
      )}

      {/* Empty state */}
      {!isLoading && !error && (!products || products.length === 0) && (
        <EmptyState
          icon={ShoppingBag}
          title="No products yet"
          description={
            isAdmin
              ? "Add your first product to get started."
              : "Check back soon for new products."
          }
          action={
            isAdmin ? (
              <GradientButton
                size="sm"
                onClick={() => setShowCreate(true)}
                data-ocid="products.empty_state"
              >
                <Plus className="w-4 h-4" />
                Add First Product
              </GradientButton>
            ) : undefined
          }
        />
      )}

      {/* Product grid */}
      {!isLoading && products && products.length > 0 && (
        <div className="grid grid-cols-2 gap-3" data-ocid="products.list">
          {products.map((product, index) => (
            <ProductCard
              key={String(product.id)}
              product={product}
              isAdmin={isAdmin}
              index={index}
              onClick={setSelectedProduct}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* Login nudge for non-authenticated */}
      {!isAuthenticated && !isLoading && products && products.length > 0 && (
        <p className="text-center text-xs text-muted-foreground pb-2">
          Sign in to get personalized recommendations
        </p>
      )}

      {/* Detail modal */}
      <ProductDetailModal
        product={selectedProduct}
        isAdmin={isAdmin}
        onClose={() => setSelectedProduct(null)}
        onDelete={handleDelete}
      />

      {/* Create sheet (admin only) */}
      {isAdmin && (
        <CreateProductModal
          open={showCreate}
          onClose={() => setShowCreate(false)}
          onSubmit={handleCreate}
          isSubmitting={createMutation.isPending}
        />
      )}
    </div>
  );
}
