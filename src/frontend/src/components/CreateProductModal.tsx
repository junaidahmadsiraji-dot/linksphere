import { GradientButton } from "@/components/ui/GradientButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { ImagePlus, X } from "lucide-react";
import { useRef, useState } from "react";

interface CreateProductModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: {
    title: string;
    description: string;
    price: number;
    imageFile?: File;
  }) => Promise<void>;
  isSubmitting: boolean;
}

export function CreateProductModal({
  open,
  onClose,
  onSubmit,
  isSubmitting,
}: CreateProductModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priceStr, setPriceStr] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const fileRef = useRef<HTMLInputElement>(null);

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  }

  function validate(): boolean {
    const errs: Record<string, string> = {};
    if (!title.trim()) errs.title = "Title is required";
    if (!description.trim()) errs.description = "Description is required";
    const price = Number.parseFloat(priceStr);
    if (Number.isNaN(price) || price <= 0) errs.price = "Enter a valid price";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    await onSubmit({
      title: title.trim(),
      description: description.trim(),
      price: Number.parseFloat(priceStr),
      imageFile: imageFile ?? undefined,
    });
    // Reset on success
    setTitle("");
    setDescription("");
    setPriceStr("");
    setImageFile(null);
    setImagePreview(null);
    setErrors({});
  }

  function handleClose() {
    if (!isSubmitting) onClose();
  }

  return (
    <Sheet open={open} onOpenChange={handleClose}>
      <SheetContent
        side="bottom"
        className="rounded-t-3xl max-h-[90dvh] overflow-y-auto pb-safe"
        data-ocid="products.sheet"
      >
        <SheetHeader className="mb-4">
          <SheetTitle className="font-display gradient-text text-left">
            Add Product
          </SheetTitle>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Image picker */}
          <div>
            <Label className="text-sm font-medium mb-2 block">
              Product Image{" "}
              <span className="text-muted-foreground">(optional)</span>
            </Label>
            <button
              type="button"
              data-ocid="products.upload_button"
              className="w-full h-32 rounded-xl border-2 border-dashed border-border bg-muted/40 flex flex-col items-center justify-center gap-2 text-muted-foreground hover:border-primary/50 hover:bg-primary/5 transition-smooth overflow-hidden"
              onClick={() => fileRef.current?.click()}
            >
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <>
                  <ImagePlus className="w-8 h-8" />
                  <span className="text-xs">Tap to add image</span>
                </>
              )}
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
            {imageFile && (
              <button
                type="button"
                className="mt-1 text-xs text-muted-foreground flex items-center gap-1 hover:text-destructive transition-colors"
                onClick={() => {
                  setImageFile(null);
                  setImagePreview(null);
                }}
              >
                <X className="w-3 h-3" /> Remove image
              </button>
            )}
          </div>

          {/* Title */}
          <div>
            <Label
              htmlFor="prod-title"
              className="text-sm font-medium mb-1 block"
            >
              Product Title <span className="text-destructive">*</span>
            </Label>
            <Input
              id="prod-title"
              data-ocid="products.input"
              placeholder="e.g. Samsung Galaxy S24 Ultra"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={validate}
              className={errors.title ? "border-destructive" : ""}
            />
            {errors.title && (
              <p
                data-ocid="products.field_error"
                className="text-xs text-destructive mt-1"
              >
                {errors.title}
              </p>
            )}
          </div>

          {/* Price */}
          <div>
            <Label
              htmlFor="prod-price"
              className="text-sm font-medium mb-1 block"
            >
              Price (৳) <span className="text-destructive">*</span>
            </Label>
            <Input
              id="prod-price"
              data-ocid="products.price_input"
              type="number"
              inputMode="decimal"
              placeholder="e.g. 25000"
              value={priceStr}
              onChange={(e) => setPriceStr(e.target.value)}
              onBlur={validate}
              className={errors.price ? "border-destructive" : ""}
            />
            {errors.price && (
              <p
                data-ocid="products.price_field_error"
                className="text-xs text-destructive mt-1"
              >
                {errors.price}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <Label
              htmlFor="prod-desc"
              className="text-sm font-medium mb-1 block"
            >
              Description <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="prod-desc"
              data-ocid="products.textarea"
              placeholder="Describe the product — specs, features, condition…"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onBlur={validate}
              className={errors.description ? "border-destructive" : ""}
            />
            {errors.description && (
              <p
                data-ocid="products.desc_field_error"
                className="text-xs text-destructive mt-1"
              >
                {errors.description}
              </p>
            )}
          </div>

          <GradientButton
            type="submit"
            fullWidth
            loading={isSubmitting}
            data-ocid="products.submit_button"
            className="mt-2"
          >
            {isSubmitting ? "Adding…" : "Add Product"}
          </GradientButton>
        </form>
      </SheetContent>
    </Sheet>
  );
}
