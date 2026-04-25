import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, y as ShoppingBag, i as cn, A as useProducts, u as useAuth, a as useActor, h as useQueryClient, D as useMutation, b as ue, E as ExternalBlob, d as createActor } from "./index-DpisiOh5.js";
import { S as Sheet, a as SheetContent, b as SheetHeader, c as SheetTitle, L as Label, I as Input, T as Textarea, G as GradientButton, R as Root, C as Content, f as Close, g as Title, P as Portal, O as Overlay, e as Separator } from "./textarea-BCYik3b7.js";
import { X } from "./x-TmiiBXt_.js";
import { B as Badge, C as Calendar, a as Button, E as EmptyState, S as Skeleton } from "./skeleton-DGn4nlDU.js";
import { T as Trash2 } from "./trash-2-ZUW3Dj86.js";
import { T as Tag } from "./tag-B4FJDfqt.js";
import { P as Plus } from "./plus-B_34AA_x.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 5h6", key: "1vod17" }],
  ["path", { d: "M19 2v6", key: "4bpg5p" }],
  ["path", { d: "M21 11.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7.5", key: "1ue2ih" }],
  ["path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21", key: "1xmnt7" }],
  ["circle", { cx: "9", cy: "9", r: "2", key: "af1f0g" }]
];
const ImagePlus = createLucideIcon("image-plus", __iconNode);
function CreateProductModal({
  open,
  onClose,
  onSubmit,
  isSubmitting
}) {
  const [title, setTitle] = reactExports.useState("");
  const [description, setDescription] = reactExports.useState("");
  const [priceStr, setPriceStr] = reactExports.useState("");
  const [imageFile, setImageFile] = reactExports.useState(null);
  const [imagePreview, setImagePreview] = reactExports.useState(null);
  const [errors, setErrors] = reactExports.useState({});
  const fileRef = reactExports.useRef(null);
  function handleImageChange(e) {
    var _a;
    const file = (_a = e.target.files) == null ? void 0 : _a[0];
    if (!file) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  }
  function validate() {
    const errs = {};
    if (!title.trim()) errs.title = "Title is required";
    if (!description.trim()) errs.description = "Description is required";
    const price = Number.parseFloat(priceStr);
    if (Number.isNaN(price) || price <= 0) errs.price = "Enter a valid price";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    await onSubmit({
      title: title.trim(),
      description: description.trim(),
      price: Number.parseFloat(priceStr),
      imageFile: imageFile ?? void 0
    });
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
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Sheet, { open, onOpenChange: handleClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    SheetContent,
    {
      side: "bottom",
      className: "rounded-t-3xl max-h-[90dvh] overflow-y-auto pb-safe",
      "data-ocid": "products.sheet",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SheetHeader, { className: "mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SheetTitle, { className: "font-display gradient-text text-left", children: "Add Product" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-sm font-medium mb-2 block", children: [
              "Product Image",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "(optional)" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                "data-ocid": "products.upload_button",
                className: "w-full h-32 rounded-xl border-2 border-dashed border-border bg-muted/40 flex flex-col items-center justify-center gap-2 text-muted-foreground hover:border-primary/50 hover:bg-primary/5 transition-smooth overflow-hidden",
                onClick: () => {
                  var _a;
                  return (_a = fileRef.current) == null ? void 0 : _a.click();
                },
                children: imagePreview ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: imagePreview,
                    alt: "Preview",
                    className: "w-full h-full object-cover"
                  }
                ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ImagePlus, { className: "w-8 h-8" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs", children: "Tap to add image" })
                ] })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                ref: fileRef,
                type: "file",
                accept: "image/*",
                className: "hidden",
                onChange: handleImageChange
              }
            ),
            imageFile && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                className: "mt-1 text-xs text-muted-foreground flex items-center gap-1 hover:text-destructive transition-colors",
                onClick: () => {
                  setImageFile(null);
                  setImagePreview(null);
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3 h-3" }),
                  " Remove image"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Label,
              {
                htmlFor: "prod-title",
                className: "text-sm font-medium mb-1 block",
                children: [
                  "Product Title ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "prod-title",
                "data-ocid": "products.input",
                placeholder: "e.g. Samsung Galaxy S24 Ultra",
                value: title,
                onChange: (e) => setTitle(e.target.value),
                onBlur: validate,
                className: errors.title ? "border-destructive" : ""
              }
            ),
            errors.title && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                "data-ocid": "products.field_error",
                className: "text-xs text-destructive mt-1",
                children: errors.title
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Label,
              {
                htmlFor: "prod-price",
                className: "text-sm font-medium mb-1 block",
                children: [
                  "Price (৳) ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "prod-price",
                "data-ocid": "products.price_input",
                type: "number",
                inputMode: "decimal",
                placeholder: "e.g. 25000",
                value: priceStr,
                onChange: (e) => setPriceStr(e.target.value),
                onBlur: validate,
                className: errors.price ? "border-destructive" : ""
              }
            ),
            errors.price && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                "data-ocid": "products.price_field_error",
                className: "text-xs text-destructive mt-1",
                children: errors.price
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Label,
              {
                htmlFor: "prod-desc",
                className: "text-sm font-medium mb-1 block",
                children: [
                  "Description ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Textarea,
              {
                id: "prod-desc",
                "data-ocid": "products.textarea",
                placeholder: "Describe the product — specs, features, condition…",
                rows: 3,
                value: description,
                onChange: (e) => setDescription(e.target.value),
                onBlur: validate,
                className: errors.description ? "border-destructive" : ""
              }
            ),
            errors.description && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                "data-ocid": "products.desc_field_error",
                className: "text-xs text-destructive mt-1",
                children: errors.description
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            GradientButton,
            {
              type: "submit",
              fullWidth: true,
              loading: isSubmitting,
              "data-ocid": "products.submit_button",
              className: "mt-2",
              children: isSubmitting ? "Adding…" : "Add Product"
            }
          )
        ] })
      ]
    }
  ) });
}
function formatPrice$1(price) {
  return `৳${price.toLocaleString("en-IN")}`;
}
function ProductCard({
  product,
  isAdmin,
  index,
  onClick,
  onDelete
}) {
  const imageUrl = product.image ? product.image.url ?? null : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-card rounded-2xl shadow-sm border border-border overflow-hidden transition-smooth hover:shadow-md hover:-translate-y-0.5 relative group",
      "data-ocid": `products.item.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            className: "absolute inset-0 z-0 w-full h-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset rounded-2xl",
            onClick: () => onClick(product),
            "aria-label": `View ${product.title}`
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: cn(
              "h-36 flex items-center justify-center overflow-hidden relative z-0 pointer-events-none",
              imageUrl ? "bg-muted" : "gradient-primary opacity-80"
            ),
            children: imageUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: imageUrl,
                alt: product.title,
                className: "w-full h-full object-cover"
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "w-12 h-12 text-primary-foreground/60" })
          }
        ),
        isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            "data-ocid": `products.delete_button.${index + 1}`,
            className: "absolute top-2 right-2 w-7 h-7 rounded-full bg-destructive/90 text-destructive-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-smooth hover:bg-destructive z-10",
            onClick: (e) => {
              e.stopPropagation();
              onDelete(product.id);
            },
            "aria-label": `Delete ${product.title}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 space-y-2 relative z-0 pointer-events-none", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-sm text-foreground leading-tight line-clamp-2", children: product.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground line-clamp-2", children: product.description }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-primary text-base", children: formatPrice$1(product.price) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "text-[10px] border-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "w-2.5 h-2.5 mr-1" }),
              "Product"
            ] })
          ] })
        ] })
      ]
    }
  );
}
function Dialog({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root, { "data-slot": "dialog", ...props });
}
function DialogPortal({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Portal, { "data-slot": "dialog-portal", ...props });
}
function DialogOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Overlay,
    {
      "data-slot": "dialog-overlay",
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      ),
      ...props
    }
  );
}
function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogPortal, { "data-slot": "dialog-portal", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogOverlay, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Content,
      {
        "data-slot": "dialog-content",
        className: cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className
        ),
        ...props,
        children: [
          children,
          showCloseButton && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Close,
            {
              "data-slot": "dialog-close",
              className: "ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(X, {}),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" })
              ]
            }
          )
        ]
      }
    )
  ] });
}
function DialogHeader({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "dialog-header",
      className: cn("flex flex-col gap-2 text-center sm:text-left", className),
      ...props
    }
  );
}
function DialogTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Title,
    {
      "data-slot": "dialog-title",
      className: cn("text-lg leading-none font-semibold", className),
      ...props
    }
  );
}
function formatPrice(price) {
  return `৳${price.toLocaleString("en-IN")}`;
}
function formatDate(ts) {
  return new Date(Number(ts) / 1e6).toLocaleDateString("bn-BD", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}
function ProductDetailModal({
  product,
  isAdmin,
  onClose,
  onDelete
}) {
  if (!product) return null;
  const imageUrl = product.image ? product.image.url ?? null : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!product, onOpenChange: () => onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    DialogContent,
    {
      className: "max-w-sm w-full rounded-2xl p-0 overflow-hidden",
      "data-ocid": "products.dialog",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            "data-ocid": "products.close_button",
            className: "absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-muted transition-smooth",
            onClick: onClose,
            "aria-label": "Close",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-48 gradient-primary flex items-center justify-center overflow-hidden", children: imageUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: imageUrl,
            alt: product.title,
            className: "w-full h-full object-cover"
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "w-16 h-16 text-primary-foreground/50" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display text-lg text-foreground leading-snug text-left", children: product.title }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-2xl gradient-text", children: formatPrice(product.price) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "gradient-primary text-primary-foreground border-0 text-xs", children: "Best Price" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: product.description }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3.5 h-3.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "Added ",
              formatDate(product.createdAt)
            ] })
          ] }),
          isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              "data-ocid": "products.confirm_button",
              variant: "destructive",
              className: "w-full mt-2",
              onClick: () => {
                onDelete(product.id);
                onClose();
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4 mr-2" }),
                "Delete Product"
              ]
            }
          )
        ] })
      ]
    }
  ) });
}
function ProductSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl border border-border overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-36 w-full rounded-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-3/4 rounded" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-full rounded" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-2/3 rounded" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between pt-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-20 rounded" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-14 rounded" })
      ] })
    ] })
  ] });
}
function ProductsPage() {
  const { data: products, isLoading, error } = useProducts();
  const { isAdmin, isAuthenticated } = useAuth();
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  const [selectedProduct, setSelectedProduct] = reactExports.useState(null);
  const [showCreate, setShowCreate] = reactExports.useState(false);
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Not connected");
      await actor.deleteProduct(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      ue.success("Product deleted");
    },
    onError: () => ue.error("Failed to delete product")
  });
  const createMutation = useMutation({
    mutationFn: async (data) => {
      if (!actor) throw new Error("Not connected");
      let image;
      if (data.imageFile) {
        const bytes = new Uint8Array(await data.imageFile.arrayBuffer());
        image = ExternalBlob.fromBytes(bytes);
      }
      await actor.createProduct({
        title: data.title,
        description: data.description,
        price: data.price,
        image
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setShowCreate(false);
      ue.success("Product added!");
    },
    onError: () => ue.error("Failed to add product")
  });
  const handleDelete = (id) => deleteMutation.mutate(id);
  const handleCreate = async (data) => {
    await createMutation.mutateAsync(data);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "px-3 py-4 space-y-4 max-w-2xl mx-auto pb-24",
      "data-ocid": "products.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-bold text-xl gradient-text flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "w-5 h-5 text-primary" }),
            "Products"
          ] }),
          isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            GradientButton,
            {
              size: "sm",
              "data-ocid": "products.add_button",
              onClick: () => setShowCreate(true),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
                "Add Product"
              ]
            }
          )
        ] }),
        isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "grid grid-cols-2 gap-3",
            "data-ocid": "products.loading_state",
            children: ["a", "b", "c", "d"].map((key) => /* @__PURE__ */ jsxRuntimeExports.jsx(ProductSkeleton, {}, key))
          }
        ),
        error && !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "text-center py-10 text-sm text-destructive",
            "data-ocid": "products.error_state",
            children: "Failed to load products. Please try again."
          }
        ),
        !isLoading && !error && (!products || products.length === 0) && /* @__PURE__ */ jsxRuntimeExports.jsx(
          EmptyState,
          {
            icon: ShoppingBag,
            title: "No products yet",
            description: isAdmin ? "Add your first product to get started." : "Check back soon for new products.",
            action: isAdmin ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              GradientButton,
              {
                size: "sm",
                onClick: () => setShowCreate(true),
                "data-ocid": "products.empty_state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
                  "Add First Product"
                ]
              }
            ) : void 0
          }
        ),
        !isLoading && products && products.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3", "data-ocid": "products.list", children: products.map((product, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          ProductCard,
          {
            product,
            isAdmin,
            index,
            onClick: setSelectedProduct,
            onDelete: handleDelete
          },
          String(product.id)
        )) }),
        !isAuthenticated && !isLoading && products && products.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-xs text-muted-foreground pb-2", children: "Sign in to get personalized recommendations" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ProductDetailModal,
          {
            product: selectedProduct,
            isAdmin,
            onClose: () => setSelectedProduct(null),
            onDelete: handleDelete
          }
        ),
        isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx(
          CreateProductModal,
          {
            open: showCreate,
            onClose: () => setShowCreate(false),
            onSubmit: handleCreate,
            isSubmitting: createMutation.isPending
          }
        )
      ]
    }
  );
}
export {
  ProductsPage as default
};
