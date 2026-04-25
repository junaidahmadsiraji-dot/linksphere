import { ExternalBlob, createActor } from "@/backend";
import type { Product } from "@/backend.d";
import { useAdminAuth } from "@/hooks/use-admin-auth";
import { useActor } from "@caffeineai/core-infrastructure";
import {
  AlertTriangle,
  Edit,
  Package,
  Plus,
  Search,
  Trash2,
  X,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const CARD = "oklch(0.15 0.01 282)";
const BD = "oklch(0.2 0.008 282)";
const TEXT = "oklch(0.93 0.01 282)";
const MID = "oklch(0.74 0.01 282)";
const DIM = "oklch(0.54 0.01 282)";
const TEAL = "oklch(0.72 0.26 180)";
const PURPLE = "oklch(0.62 0.22 260)";
const RED = "oklch(0.65 0.19 22)";
const ORANGE = "oklch(0.72 0.22 28)";

type ModalMode = "add" | "edit" | null;

interface ProductForm {
  title: string;
  description: string;
  price: string;
  imageFile: File | null;
  imagePreview: string;
}

interface DeleteConfirm {
  id: bigint;
  title: string;
}

const EMPTY: ProductForm = {
  title: "",
  description: "",
  price: "",
  imageFile: null,
  imagePreview: "",
};

function formatDate(ts: bigint): string {
  return new Date(Number(ts) / 1_000_000).toLocaleDateString("en-BD", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

const inputStyle = {
  background: "oklch(0.13 0.008 282)",
  border: "1px solid oklch(0.2 0.008 282)",
  color: "oklch(0.93 0.01 282)",
  borderRadius: "0.625rem",
  padding: "0.625rem 0.75rem",
  fontSize: "0.875rem",
  width: "100%",
  outline: "none",
};

export default function AdminProductsPage() {
  const { adminToken } = useAdminAuth();
  const { actor } = useActor(createActor);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState<ModalMode>(null);
  const [editTarget, setEditTarget] = useState<Product | null>(null);
  const [form, setForm] = useState<ProductForm>(EMPTY);
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<DeleteConfirm | null>(
    null,
  );
  const [deleting, setDeleting] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const loadProducts = useCallback(async () => {
    if (!actor) return;
    try {
      const result = await actor.listProducts();
      setProducts(result as Product[]);
    } catch {
      toast.error("Failed to load products");
    } finally {
      setIsLoading(false);
    }
  }, [actor]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const filtered = products.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase()),
  );

  function openAdd() {
    setForm(EMPTY);
    setEditTarget(null);
    setModal("add");
  }

  function openEdit(product: Product) {
    setForm({
      title: product.title,
      description: product.description,
      price: product.price.toString(),
      imageFile: null,
      imagePreview: product.image ? product.image.getDirectURL() : "",
    });
    setEditTarget(product);
    setModal("edit");
  }

  async function handleSave() {
    if (!actor || !adminToken) return;
    if (!form.title.trim() || !form.price.trim()) {
      toast.error("Title and price are required");
      return;
    }
    const priceNum = Number.parseFloat(form.price);
    if (Number.isNaN(priceNum) || priceNum < 0) {
      toast.error("Enter a valid price");
      return;
    }
    setSaving(true);
    try {
      let imageBlob: ExternalBlob | undefined = undefined;
      if (form.imageFile) {
        const bytes = new Uint8Array(await form.imageFile.arrayBuffer());
        imageBlob = ExternalBlob.fromBytes(bytes);
      }
      if (modal === "add") {
        await actor.createProduct({
          title: form.title.trim(),
          description: form.description.trim(),
          price: priceNum,
          image: imageBlob,
        });
        toast.success("Product added successfully");
      } else if (modal === "edit" && editTarget) {
        await actor.deleteProduct(editTarget.id);
        await actor.createProduct({
          title: form.title.trim(),
          description: form.description.trim(),
          price: priceNum,
          image: imageBlob,
        });
        toast.success("Product updated");
      }
      await loadProducts();
      setModal(null);
    } catch {
      toast.error("Failed to save product");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!actor || !deleteConfirm) return;
    setDeleting(true);
    try {
      await actor.deleteProduct(deleteConfirm.id);
      toast.success("Product deleted");
      await loadProducts();
    } catch {
      toast.error("Delete failed");
    } finally {
      setDeleting(false);
      setDeleteConfirm(null);
    }
  }

  return (
    <div style={{ minHeight: "100%" }}>
      <div className="p-6 space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h1
              className="text-xl font-bold"
              style={{ color: TEXT, fontFamily: "var(--font-display)" }}
            >
              Products Management
            </h1>
            <p className="text-sm mt-0.5" style={{ color: DIM }}>
              {isLoading ? "Loading..." : `${products.length} products listed`}
            </p>
          </div>
          <button
            type="button"
            onClick={openAdd}
            className="flex items-center gap-2 text-sm px-4 py-2 rounded-xl font-semibold transition-smooth"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.62 0.22 260) 0%, oklch(0.72 0.26 180) 100%)",
              color: "oklch(0.11 0.008 282)",
            }}
            data-ocid="admin.products.add_button"
          >
            <Plus className="w-4 h-4" /> Add Product
          </button>
        </div>

        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
            style={{ color: DIM }}
          />
          <input
            type="text"
            placeholder="Search products by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm outline-none"
            style={{ background: CARD, border: `1px solid ${BD}`, color: TEXT }}
            data-ocid="admin.products.search_input"
          />
        </div>

        <div
          className="rounded-2xl overflow-hidden"
          style={{ border: `1px solid ${BD}` }}
          data-ocid="admin.products.table"
        >
          <table className="data-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price (৳)</th>
                <th>Added</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading
                ? (["sk1", "sk2", "sk3", "sk4"] as const).map((k) => (
                    <tr key={k}>
                      <td colSpan={4}>
                        <div
                          className="h-4 rounded animate-pulse"
                          style={{ background: "oklch(0.22 0.008 282)" }}
                        />
                      </td>
                    </tr>
                  ))
                : filtered.map((product, idx) => (
                    <tr
                      key={product.id.toString()}
                      data-ocid={`admin.products.item.${idx + 1}`}
                    >
                      <td>
                        <div className="flex items-center gap-3">
                          {product.image ? (
                            <img
                              src={product.image.getDirectURL()}
                              alt={product.title}
                              className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                              style={{ border: `1px solid ${BD}` }}
                            />
                          ) : (
                            <div
                              className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                              style={{
                                background: `${ORANGE}20`,
                                color: ORANGE,
                              }}
                            >
                              <Package className="w-5 h-5" />
                            </div>
                          )}
                          <div>
                            <div
                              className="text-sm font-medium"
                              style={{ color: TEXT }}
                            >
                              {product.title}
                            </div>
                            <div
                              className="text-xs truncate max-w-xs"
                              style={{ color: DIM }}
                            >
                              {product.description}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="font-semibold" style={{ color: TEAL }}>
                        ৳{product.price.toLocaleString()}
                      </td>
                      <td style={{ color: DIM }}>
                        {formatDate(product.createdAt)}
                      </td>
                      <td>
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => openEdit(product)}
                            className="p-1.5 rounded-lg transition-smooth"
                            style={{ background: `${PURPLE}18`, color: PURPLE }}
                            aria-label="Edit product"
                            data-ocid={`admin.products.edit_button.${idx + 1}`}
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              setDeleteConfirm({
                                id: product.id,
                                title: product.title,
                              })
                            }
                            className="p-1.5 rounded-lg transition-smooth"
                            style={{
                              background: `${RED}18`,
                              color: "oklch(0.75 0.15 22)",
                            }}
                            aria-label="Delete product"
                            data-ocid={`admin.products.delete_button.${idx + 1}`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
          {!isLoading && filtered.length === 0 && (
            <div
              className="py-14 text-center"
              data-ocid="admin.products.empty_state"
            >
              <Package
                className="w-10 h-10 mx-auto mb-3 opacity-25"
                style={{ color: DIM }}
              />
              <p className="text-sm" style={{ color: DIM }}>
                {search ? "No products match your search" : "No products yet"}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Modal */}
      {modal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.75)" }}
          data-ocid="admin.products.dialog"
        >
          <div
            className="w-full max-w-md rounded-2xl overflow-hidden"
            style={{ background: CARD, border: `1px solid ${BD}` }}
          >
            <div
              className="px-6 py-4 flex items-center justify-between border-b"
              style={{ borderColor: BD }}
            >
              <h3
                className="font-bold"
                style={{ color: TEXT, fontFamily: "var(--font-display)" }}
              >
                {modal === "add" ? "Add New Product" : "Edit Product"}
              </h3>
              <button
                type="button"
                onClick={() => setModal(null)}
                style={{ color: DIM }}
                data-ocid="admin.products.close_button"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              {/* Image upload */}
              <div>
                <span
                  className="text-xs font-medium block mb-1.5"
                  style={{ color: MID }}
                >
                  Product Image (optional)
                </span>
                <button
                  type="button"
                  className="relative rounded-xl overflow-hidden w-full cursor-pointer"
                  style={{
                    background: "oklch(0.13 0.008 282)",
                    border: `2px dashed ${BD}`,
                    height: "100px",
                  }}
                  onClick={() => fileRef.current?.click()}
                  aria-label="Click to upload image"
                  data-ocid="admin.products.upload_button"
                >
                  {form.imagePreview ? (
                    <img
                      src={form.imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full gap-2">
                      <Package
                        className="w-8 h-8 opacity-30"
                        style={{ color: DIM }}
                      />
                      <span className="text-xs" style={{ color: DIM }}>
                        Click to upload image
                      </span>
                    </div>
                  )}
                </button>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f)
                      setForm((prev) => ({
                        ...prev,
                        imageFile: f,
                        imagePreview: URL.createObjectURL(f),
                      }));
                  }}
                />
              </div>
              <div>
                <label
                  className="text-xs font-medium block mb-1.5"
                  style={{ color: MID }}
                  htmlFor="prod-title"
                >
                  Product Name *
                </label>
                <input
                  id="prod-title"
                  type="text"
                  value={form.title}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, title: e.target.value }))
                  }
                  placeholder="e.g. Samsung Galaxy S25 Ultra"
                  style={inputStyle}
                  data-ocid="admin.products.title_input"
                />
              </div>
              <div>
                <label
                  className="text-xs font-medium block mb-1.5"
                  style={{ color: MID }}
                  htmlFor="prod-price"
                >
                  Price (৳) *
                </label>
                <input
                  id="prod-price"
                  type="number"
                  value={form.price}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, price: e.target.value }))
                  }
                  placeholder="e.g. 139999"
                  min="0"
                  style={inputStyle}
                  data-ocid="admin.products.price_input"
                />
              </div>
              <div>
                <label
                  className="text-xs font-medium block mb-1.5"
                  style={{ color: MID }}
                  htmlFor="prod-desc"
                >
                  Description
                </label>
                <textarea
                  id="prod-desc"
                  value={form.description}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, description: e.target.value }))
                  }
                  placeholder="Brief description..."
                  rows={2}
                  style={{ ...inputStyle, resize: "vertical" }}
                  data-ocid="admin.products.description_textarea"
                />
              </div>
            </div>
            <div className="px-6 pb-5 flex items-center gap-3">
              <button
                type="button"
                onClick={() => setModal(null)}
                className="flex-1 py-2.5 rounded-xl text-sm font-medium"
                style={{ background: "oklch(0.22 0.008 282)", color: MID }}
                data-ocid="admin.products.cancel_button"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-smooth"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.62 0.22 260) 0%, oklch(0.72 0.26 180) 100%)",
                  color: "oklch(0.11 0.008 282)",
                  opacity: saving ? 0.7 : 1,
                }}
                data-ocid="admin.products.save_button"
              >
                {saving
                  ? "Saving…"
                  : modal === "add"
                    ? "Add Product"
                    : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {deleteConfirm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.75)" }}
        >
          <div
            className="w-full max-w-sm rounded-2xl p-6"
            style={{ background: CARD, border: `1px solid ${BD}` }}
          >
            <div
              className="p-2 rounded-xl inline-block mb-3"
              style={{ background: `${RED}20`, color: "oklch(0.75 0.15 22)" }}
            >
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h3
              className="font-bold text-base mb-1"
              style={{ color: TEXT, fontFamily: "var(--font-display)" }}
            >
              Delete Product
            </h3>
            <p className="text-sm mb-5" style={{ color: MID }}>
              Delete "{deleteConfirm.title}"? This cannot be undone.
            </p>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 py-2 rounded-xl text-sm font-medium"
                style={{ background: "oklch(0.22 0.008 282)", color: MID }}
                data-ocid="admin.products.delete_cancel_button"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 py-2 rounded-xl text-sm font-semibold transition-smooth"
                style={{
                  background: RED,
                  color: "oklch(0.11 0.008 282)",
                  opacity: deleting ? 0.7 : 1,
                }}
                data-ocid="admin.products.delete_confirm_button"
              >
                {deleting ? "Deleting…" : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
