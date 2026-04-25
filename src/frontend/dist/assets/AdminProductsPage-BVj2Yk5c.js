import { c as createLucideIcon, N as useAdminAuth, a as useActor, r as reactExports, b as ue, j as jsxRuntimeExports, S as Search, E as ExternalBlob, d as createActor } from "./index-DpisiOh5.js";
import { P as Plus } from "./plus-B_34AA_x.js";
import { P as Package } from "./package-C1uwMONI.js";
import { T as Trash2 } from "./trash-2-ZUW3Dj86.js";
import { X } from "./x-TmiiBXt_.js";
import { T as TriangleAlert } from "./triangle-alert-DA-oaQjO.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7", key: "1m0v6g" }],
  [
    "path",
    {
      d: "M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z",
      key: "ohrbg2"
    }
  ]
];
const SquarePen = createLucideIcon("square-pen", __iconNode);
const CARD = "oklch(0.15 0.01 282)";
const BD = "oklch(0.2 0.008 282)";
const TEXT = "oklch(0.93 0.01 282)";
const MID = "oklch(0.74 0.01 282)";
const DIM = "oklch(0.54 0.01 282)";
const TEAL = "oklch(0.72 0.26 180)";
const PURPLE = "oklch(0.62 0.22 260)";
const RED = "oklch(0.65 0.19 22)";
const ORANGE = "oklch(0.72 0.22 28)";
const EMPTY = {
  title: "",
  description: "",
  price: "",
  imageFile: null,
  imagePreview: ""
};
function formatDate(ts) {
  return new Date(Number(ts) / 1e6).toLocaleDateString("en-BD", {
    year: "numeric",
    month: "short",
    day: "numeric"
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
  outline: "none"
};
function AdminProductsPage() {
  const { adminToken } = useAdminAuth();
  const { actor } = useActor(createActor);
  const [products, setProducts] = reactExports.useState([]);
  const [isLoading, setIsLoading] = reactExports.useState(true);
  const [search, setSearch] = reactExports.useState("");
  const [modal, setModal] = reactExports.useState(null);
  const [editTarget, setEditTarget] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState(EMPTY);
  const [saving, setSaving] = reactExports.useState(false);
  const [deleteConfirm, setDeleteConfirm] = reactExports.useState(
    null
  );
  const [deleting, setDeleting] = reactExports.useState(false);
  const fileRef = reactExports.useRef(null);
  const loadProducts = reactExports.useCallback(async () => {
    if (!actor) return;
    try {
      const result = await actor.listProducts();
      setProducts(result);
    } catch {
      ue.error("Failed to load products");
    } finally {
      setIsLoading(false);
    }
  }, [actor]);
  reactExports.useEffect(() => {
    loadProducts();
  }, [loadProducts]);
  const filtered = products.filter(
    (p) => p.title.toLowerCase().includes(search.toLowerCase())
  );
  function openAdd() {
    setForm(EMPTY);
    setEditTarget(null);
    setModal("add");
  }
  function openEdit(product) {
    setForm({
      title: product.title,
      description: product.description,
      price: product.price.toString(),
      imageFile: null,
      imagePreview: product.image ? product.image.getDirectURL() : ""
    });
    setEditTarget(product);
    setModal("edit");
  }
  async function handleSave() {
    if (!actor || !adminToken) return;
    if (!form.title.trim() || !form.price.trim()) {
      ue.error("Title and price are required");
      return;
    }
    const priceNum = Number.parseFloat(form.price);
    if (Number.isNaN(priceNum) || priceNum < 0) {
      ue.error("Enter a valid price");
      return;
    }
    setSaving(true);
    try {
      let imageBlob = void 0;
      if (form.imageFile) {
        const bytes = new Uint8Array(await form.imageFile.arrayBuffer());
        imageBlob = ExternalBlob.fromBytes(bytes);
      }
      if (modal === "add") {
        await actor.createProduct({
          title: form.title.trim(),
          description: form.description.trim(),
          price: priceNum,
          image: imageBlob
        });
        ue.success("Product added successfully");
      } else if (modal === "edit" && editTarget) {
        await actor.deleteProduct(editTarget.id);
        await actor.createProduct({
          title: form.title.trim(),
          description: form.description.trim(),
          price: priceNum,
          image: imageBlob
        });
        ue.success("Product updated");
      }
      await loadProducts();
      setModal(null);
    } catch {
      ue.error("Failed to save product");
    } finally {
      setSaving(false);
    }
  }
  async function handleDelete() {
    if (!actor || !deleteConfirm) return;
    setDeleting(true);
    try {
      await actor.deleteProduct(deleteConfirm.id);
      ue.success("Product deleted");
      await loadProducts();
    } catch {
      ue.error("Delete failed");
    } finally {
      setDeleting(false);
      setDeleteConfirm(null);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { minHeight: "100%" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "h1",
            {
              className: "text-xl font-bold",
              style: { color: TEXT, fontFamily: "var(--font-display)" },
              children: "Products Management"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm mt-0.5", style: { color: DIM }, children: isLoading ? "Loading..." : `${products.length} products listed` })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: openAdd,
            className: "flex items-center gap-2 text-sm px-4 py-2 rounded-xl font-semibold transition-smooth",
            style: {
              background: "linear-gradient(135deg, oklch(0.62 0.22 260) 0%, oklch(0.72 0.26 180) 100%)",
              color: "oklch(0.11 0.008 282)"
            },
            "data-ocid": "admin.products.add_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
              " Add Product"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Search,
          {
            className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4",
            style: { color: DIM }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            placeholder: "Search products by name...",
            value: search,
            onChange: (e) => setSearch(e.target.value),
            className: "w-full pl-10 pr-4 py-2.5 rounded-xl text-sm outline-none",
            style: { background: CARD, border: `1px solid ${BD}`, color: TEXT },
            "data-ocid": "admin.products.search_input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "rounded-2xl overflow-hidden",
          style: { border: `1px solid ${BD}` },
          "data-ocid": "admin.products.table",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "data-table", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Product" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Price (৳)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Added" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Actions" })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: isLoading ? ["sk1", "sk2", "sk3", "sk4"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 4, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "h-4 rounded animate-pulse",
                  style: { background: "oklch(0.22 0.008 282)" }
                }
              ) }) }, k)) : filtered.map((product, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "tr",
                {
                  "data-ocid": `admin.products.item.${idx + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                      product.image ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "img",
                        {
                          src: product.image.getDirectURL(),
                          alt: product.title,
                          className: "w-10 h-10 rounded-lg object-cover flex-shrink-0",
                          style: { border: `1px solid ${BD}` }
                        }
                      ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0",
                          style: {
                            background: `${ORANGE}20`,
                            color: ORANGE
                          },
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-5 h-5" })
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: "text-sm font-medium",
                            style: { color: TEXT },
                            children: product.title
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: "text-xs truncate max-w-xs",
                            style: { color: DIM },
                            children: product.description
                          }
                        )
                      ] })
                    ] }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "font-semibold", style: { color: TEAL }, children: [
                      "৳",
                      product.price.toLocaleString()
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { color: DIM }, children: formatDate(product.createdAt) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          onClick: () => openEdit(product),
                          className: "p-1.5 rounded-lg transition-smooth",
                          style: { background: `${PURPLE}18`, color: PURPLE },
                          "aria-label": "Edit product",
                          "data-ocid": `admin.products.edit_button.${idx + 1}`,
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(SquarePen, { className: "w-3.5 h-3.5" })
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          onClick: () => setDeleteConfirm({
                            id: product.id,
                            title: product.title
                          }),
                          className: "p-1.5 rounded-lg transition-smooth",
                          style: {
                            background: `${RED}18`,
                            color: "oklch(0.75 0.15 22)"
                          },
                          "aria-label": "Delete product",
                          "data-ocid": `admin.products.delete_button.${idx + 1}`,
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" })
                        }
                      )
                    ] }) })
                  ]
                },
                product.id.toString()
              )) })
            ] }),
            !isLoading && filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "py-14 text-center",
                "data-ocid": "admin.products.empty_state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Package,
                    {
                      className: "w-10 h-10 mx-auto mb-3 opacity-25",
                      style: { color: DIM }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", style: { color: DIM }, children: search ? "No products match your search" : "No products yet" })
                ]
              }
            )
          ]
        }
      )
    ] }),
    modal && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "fixed inset-0 z-50 flex items-center justify-center p-4",
        style: { background: "rgba(0,0,0,0.75)" },
        "data-ocid": "admin.products.dialog",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "w-full max-w-md rounded-2xl overflow-hidden",
            style: { background: CARD, border: `1px solid ${BD}` },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "px-6 py-4 flex items-center justify-between border-b",
                  style: { borderColor: BD },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "h3",
                      {
                        className: "font-bold",
                        style: { color: TEXT, fontFamily: "var(--font-display)" },
                        children: modal === "add" ? "Add New Product" : "Edit Product"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => setModal(null),
                        style: { color: DIM },
                        "data-ocid": "admin.products.close_button",
                        "aria-label": "Close",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5" })
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "text-xs font-medium block mb-1.5",
                      style: { color: MID },
                      children: "Product Image (optional)"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      className: "relative rounded-xl overflow-hidden w-full cursor-pointer",
                      style: {
                        background: "oklch(0.13 0.008 282)",
                        border: `2px dashed ${BD}`,
                        height: "100px"
                      },
                      onClick: () => {
                        var _a;
                        return (_a = fileRef.current) == null ? void 0 : _a.click();
                      },
                      "aria-label": "Click to upload image",
                      "data-ocid": "admin.products.upload_button",
                      children: form.imagePreview ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "img",
                        {
                          src: form.imagePreview,
                          alt: "Preview",
                          className: "w-full h-full object-cover"
                        }
                      ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center h-full gap-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Package,
                          {
                            className: "w-8 h-8 opacity-30",
                            style: { color: DIM }
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs", style: { color: DIM }, children: "Click to upload image" })
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
                      onChange: (e) => {
                        var _a;
                        const f = (_a = e.target.files) == null ? void 0 : _a[0];
                        if (f)
                          setForm((prev) => ({
                            ...prev,
                            imageFile: f,
                            imagePreview: URL.createObjectURL(f)
                          }));
                      }
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "label",
                    {
                      className: "text-xs font-medium block mb-1.5",
                      style: { color: MID },
                      htmlFor: "prod-title",
                      children: "Product Name *"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      id: "prod-title",
                      type: "text",
                      value: form.title,
                      onChange: (e) => setForm((f) => ({ ...f, title: e.target.value })),
                      placeholder: "e.g. Samsung Galaxy S25 Ultra",
                      style: inputStyle,
                      "data-ocid": "admin.products.title_input"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "label",
                    {
                      className: "text-xs font-medium block mb-1.5",
                      style: { color: MID },
                      htmlFor: "prod-price",
                      children: "Price (৳) *"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      id: "prod-price",
                      type: "number",
                      value: form.price,
                      onChange: (e) => setForm((f) => ({ ...f, price: e.target.value })),
                      placeholder: "e.g. 139999",
                      min: "0",
                      style: inputStyle,
                      "data-ocid": "admin.products.price_input"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "label",
                    {
                      className: "text-xs font-medium block mb-1.5",
                      style: { color: MID },
                      htmlFor: "prod-desc",
                      children: "Description"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "textarea",
                    {
                      id: "prod-desc",
                      value: form.description,
                      onChange: (e) => setForm((f) => ({ ...f, description: e.target.value })),
                      placeholder: "Brief description...",
                      rows: 2,
                      style: { ...inputStyle, resize: "vertical" },
                      "data-ocid": "admin.products.description_textarea"
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 pb-5 flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setModal(null),
                    className: "flex-1 py-2.5 rounded-xl text-sm font-medium",
                    style: { background: "oklch(0.22 0.008 282)", color: MID },
                    "data-ocid": "admin.products.cancel_button",
                    children: "Cancel"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: handleSave,
                    disabled: saving,
                    className: "flex-1 py-2.5 rounded-xl text-sm font-semibold transition-smooth",
                    style: {
                      background: "linear-gradient(135deg, oklch(0.62 0.22 260) 0%, oklch(0.72 0.26 180) 100%)",
                      color: "oklch(0.11 0.008 282)",
                      opacity: saving ? 0.7 : 1
                    },
                    "data-ocid": "admin.products.save_button",
                    children: saving ? "Saving…" : modal === "add" ? "Add Product" : "Save Changes"
                  }
                )
              ] })
            ]
          }
        )
      }
    ),
    deleteConfirm && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "fixed inset-0 z-50 flex items-center justify-center p-4",
        style: { background: "rgba(0,0,0,0.75)" },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "w-full max-w-sm rounded-2xl p-6",
            style: { background: CARD, border: `1px solid ${BD}` },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "p-2 rounded-xl inline-block mb-3",
                  style: { background: `${RED}20`, color: "oklch(0.75 0.15 22)" },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-5 h-5" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "h3",
                {
                  className: "font-bold text-base mb-1",
                  style: { color: TEXT, fontFamily: "var(--font-display)" },
                  children: "Delete Product"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm mb-5", style: { color: MID }, children: [
                'Delete "',
                deleteConfirm.title,
                '"? This cannot be undone.'
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setDeleteConfirm(null),
                    className: "flex-1 py-2 rounded-xl text-sm font-medium",
                    style: { background: "oklch(0.22 0.008 282)", color: MID },
                    "data-ocid": "admin.products.delete_cancel_button",
                    children: "Cancel"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: handleDelete,
                    disabled: deleting,
                    className: "flex-1 py-2 rounded-xl text-sm font-semibold transition-smooth",
                    style: {
                      background: RED,
                      color: "oklch(0.11 0.008 282)",
                      opacity: deleting ? 0.7 : 1
                    },
                    "data-ocid": "admin.products.delete_confirm_button",
                    children: deleting ? "Deleting…" : "Delete"
                  }
                )
              ] })
            ]
          }
        )
      }
    )
  ] });
}
export {
  AdminProductsPage as default
};
