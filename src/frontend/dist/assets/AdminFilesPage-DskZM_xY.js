import { N as useAdminAuth, a as useActor, r as reactExports, b as ue, j as jsxRuntimeExports, S as Search, x as FileText, E as ExternalBlob, d as createActor } from "./index-DpisiOh5.js";
import { U as Upload } from "./upload-CRHUiFwl.js";
import { F as FolderOpen } from "./folder-open-QAGqWaXb.js";
import { P as Plus } from "./plus-B_34AA_x.js";
import { D as Download } from "./download-BnSqkAGq.js";
import { T as Trash2 } from "./trash-2-ZUW3Dj86.js";
import { X } from "./x-TmiiBXt_.js";
import { T as TriangleAlert } from "./triangle-alert-DA-oaQjO.js";
const CARD = "oklch(0.15 0.01 282)";
const BD = "oklch(0.2 0.008 282)";
const TEXT = "oklch(0.93 0.01 282)";
const MID = "oklch(0.74 0.01 282)";
const DIM = "oklch(0.54 0.01 282)";
const TEAL = "oklch(0.72 0.26 180)";
const PURPLE = "oklch(0.62 0.22 260)";
const RED = "oklch(0.65 0.19 22)";
const ORANGE = "oklch(0.72 0.22 28)";
function formatDate(ts) {
  return new Date(Number(ts) / 1e6).toLocaleDateString("en-BD", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}
function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
function AdminFilesPage() {
  const { adminToken } = useAdminAuth();
  const { actor } = useActor(createActor);
  const [files, setFiles] = reactExports.useState([]);
  const [isLoading, setIsLoading] = reactExports.useState(true);
  const [search, setSearch] = reactExports.useState("");
  const [showUpload, setShowUpload] = reactExports.useState(false);
  const [form, setForm] = reactExports.useState({
    title: "",
    description: "",
    file: null
  });
  const [uploading, setUploading] = reactExports.useState(false);
  const [uploadProgress, setUploadProgress] = reactExports.useState(0);
  const [deleteConfirm, setDeleteConfirm] = reactExports.useState(
    null
  );
  const [deleting, setDeleting] = reactExports.useState(false);
  const fileRef = reactExports.useRef(null);
  const loadFiles = reactExports.useCallback(async () => {
    if (!actor) return;
    try {
      const result = await actor.listFiles();
      setFiles(result);
    } catch {
      ue.error("Failed to load files");
    } finally {
      setIsLoading(false);
    }
  }, [actor]);
  reactExports.useEffect(() => {
    loadFiles();
  }, [loadFiles]);
  const filtered = files.filter(
    (f) => f.title.toLowerCase().includes(search.toLowerCase()) || f.description.toLowerCase().includes(search.toLowerCase())
  );
  async function handleUpload() {
    if (!actor || !adminToken) return;
    if (!form.title.trim() || !form.file) {
      ue.error("Title and file are required");
      return;
    }
    setUploading(true);
    setUploadProgress(0);
    try {
      const bytes = new Uint8Array(await form.file.arrayBuffer());
      const blob = ExternalBlob.fromBytes(bytes).withUploadProgress((pct) => {
        setUploadProgress(pct);
      });
      await actor.uploadFile({
        title: form.title.trim(),
        description: form.description.trim(),
        blob
      });
      ue.success("File uploaded successfully");
      setForm({ title: "", description: "", file: null });
      setShowUpload(false);
      await loadFiles();
    } catch {
      ue.error("Upload failed. Please try again.");
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  }
  async function handleDelete() {
    if (!actor || !deleteConfirm) return;
    setDeleting(true);
    try {
      await actor.deleteFile(deleteConfirm.id);
      ue.success("File deleted");
      await loadFiles();
    } catch {
      ue.error("Delete failed");
    } finally {
      setDeleting(false);
      setDeleteConfirm(null);
    }
  }
  const inputStyle = {
    background: "oklch(0.13 0.008 282)",
    border: `1px solid ${BD}`,
    color: TEXT,
    borderRadius: "0.625rem",
    padding: "0.625rem 0.75rem",
    fontSize: "0.875rem",
    width: "100%",
    outline: "none"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { minHeight: "100%" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "h1",
            {
              className: "text-xl font-bold",
              style: { color: TEXT, fontFamily: "var(--font-display)" },
              children: "Files Library"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm mt-0.5", style: { color: DIM }, children: isLoading ? "Loading..." : `${files.length} files uploaded` })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => setShowUpload(true),
            className: "flex items-center gap-2 text-sm px-4 py-2 rounded-xl font-semibold transition-smooth",
            style: {
              background: "linear-gradient(135deg, oklch(0.62 0.22 260) 0%, oklch(0.72 0.26 180) 100%)",
              color: "oklch(0.11 0.008 282)"
            },
            "data-ocid": "admin.files.upload_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-4 h-4" }),
              " Upload File"
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
            placeholder: "Search files by name or description...",
            value: search,
            onChange: (e) => setSearch(e.target.value),
            className: "w-full pl-10 pr-4 py-2.5 rounded-xl text-sm outline-none",
            style: { background: CARD, border: `1px solid ${BD}`, color: TEXT },
            "data-ocid": "admin.files.search_input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2.5", "data-ocid": "admin.files.list", children: isLoading ? ["sk1", "sk2", "sk3", "sk4"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "rounded-xl h-20 animate-pulse",
          style: { background: CARD, border: `1px solid ${BD}` }
        },
        k
      )) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "py-14 text-center rounded-xl",
          "data-ocid": "admin.files.empty_state",
          style: { background: CARD, border: `1px solid ${BD}` },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center",
                style: { background: `${ORANGE}20` },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(FolderOpen, { className: "w-7 h-7", style: { color: ORANGE } })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm", style: { color: TEXT }, children: "No files yet" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs mt-1", style: { color: DIM }, children: "Upload PDF books, documents, or guides" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => setShowUpload(true),
                className: "mt-4 flex items-center gap-1.5 text-sm px-4 py-2 rounded-xl mx-auto font-medium",
                style: { background: `${TEAL}18`, color: TEAL },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
                  " Upload First File"
                ]
              }
            )
          ]
        }
      ) : filtered.map((file, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "rounded-xl p-4 flex items-center gap-4",
          "data-ocid": `admin.files.item.${idx + 1}`,
          style: { background: CARD, border: `1px solid ${BD}` },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0",
                style: { background: `${ORANGE}20`, color: ORANGE },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-5 h-5" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "font-medium text-sm truncate",
                  style: { color: TEXT },
                  children: file.title
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "text-xs truncate mt-0.5",
                  style: { color: DIM },
                  children: file.description
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mt-1 flex-wrap", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs", style: { color: TEAL }, children: [
                  "by ",
                  file.uploaderName
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs", style: { color: DIM }, children: [
                  "· ",
                  formatDate(file.uploadedAt)
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "a",
                {
                  href: file.blob.getDirectURL(),
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "p-2 rounded-lg transition-smooth",
                  style: { background: `${PURPLE}18`, color: PURPLE },
                  "aria-label": "Download file",
                  "data-ocid": `admin.files.download_button.${idx + 1}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setDeleteConfirm({ id: file.id, title: file.title }),
                  className: "p-2 rounded-lg transition-smooth",
                  style: {
                    background: `${RED}18`,
                    color: "oklch(0.75 0.15 22)"
                  },
                  "aria-label": "Delete file",
                  "data-ocid": `admin.files.delete_button.${idx + 1}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" })
                }
              )
            ] })
          ]
        },
        file.id.toString()
      )) })
    ] }),
    showUpload && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "fixed inset-0 z-50 flex items-center justify-center p-4",
        style: { background: "rgba(0,0,0,0.75)" },
        "data-ocid": "admin.files.dialog",
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
                        children: "Upload File"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => setShowUpload(false),
                        style: { color: DIM },
                        "data-ocid": "admin.files.close_button",
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
                      children: "File (PDF, DOC, etc.) *"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      className: "rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer transition-smooth w-full",
                      style: {
                        background: form.file ? `${TEAL}10` : "oklch(0.13 0.008 282)",
                        border: form.file ? `2px solid ${TEAL}` : `2px dashed ${BD}`,
                        padding: "1.5rem"
                      },
                      onClick: () => {
                        var _a;
                        return (_a = fileRef.current) == null ? void 0 : _a.click();
                      },
                      "data-ocid": "admin.files.dropzone",
                      "aria-label": "Click to select file",
                      children: form.file ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-8 h-8", style: { color: TEAL } }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: "text-sm font-medium",
                            style: { color: TEAL },
                            children: form.file.name
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs", style: { color: DIM }, children: formatBytes(form.file.size) })
                      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Upload,
                          {
                            className: "w-8 h-8 opacity-30",
                            style: { color: DIM }
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", style: { color: DIM }, children: "Click to select file" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs", style: { color: DIM }, children: "PDF, DOC, PPT, ZIP supported" })
                      ] })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      ref: fileRef,
                      type: "file",
                      className: "hidden",
                      onChange: (e) => {
                        var _a;
                        const f = (_a = e.target.files) == null ? void 0 : _a[0];
                        if (f) setForm((prev) => ({ ...prev, file: f }));
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
                      htmlFor: "file-title",
                      children: "Title *"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      id: "file-title",
                      type: "text",
                      value: form.title,
                      onChange: (e) => setForm((f) => ({ ...f, title: e.target.value })),
                      placeholder: "e.g. HSC Chemistry Guide 2026",
                      style: inputStyle,
                      "data-ocid": "admin.files.title_input"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "label",
                    {
                      className: "text-xs font-medium block mb-1.5",
                      style: { color: MID },
                      htmlFor: "file-desc",
                      children: "Description"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "textarea",
                    {
                      id: "file-desc",
                      value: form.description,
                      onChange: (e) => setForm((f) => ({ ...f, description: e.target.value })),
                      placeholder: "Brief description of the file...",
                      rows: 2,
                      style: { ...inputStyle, resize: "vertical" },
                      "data-ocid": "admin.files.description_textarea"
                    }
                  )
                ] }),
                uploading && uploadProgress > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "flex justify-between text-xs mb-1",
                      style: { color: DIM },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Uploading..." }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                          Math.round(uploadProgress),
                          "%"
                        ] })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "h-1.5 rounded-full overflow-hidden",
                      style: { background: "oklch(0.22 0.008 282)" },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "h-full rounded-full transition-all",
                          style: {
                            width: `${uploadProgress}%`,
                            background: `linear-gradient(90deg, ${PURPLE} 0%, ${TEAL} 100%)`
                          }
                        }
                      )
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 pb-5 flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setShowUpload(false),
                    className: "flex-1 py-2.5 rounded-xl text-sm font-medium",
                    style: { background: "oklch(0.22 0.008 282)", color: MID },
                    "data-ocid": "admin.files.cancel_button",
                    children: "Cancel"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: handleUpload,
                    disabled: uploading,
                    className: "flex-1 py-2.5 rounded-xl text-sm font-semibold transition-smooth",
                    style: {
                      background: "linear-gradient(135deg, oklch(0.62 0.22 260) 0%, oklch(0.72 0.26 180) 100%)",
                      color: "oklch(0.11 0.008 282)",
                      opacity: uploading ? 0.7 : 1
                    },
                    "data-ocid": "admin.files.submit_button",
                    children: uploading ? "Uploading…" : "Upload File"
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
                  children: "Delete File"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm mb-5", style: { color: MID }, children: [
                'Delete "',
                deleteConfirm.title,
                '"? Users who downloaded it keep their copies. This cannot be undone.'
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setDeleteConfirm(null),
                    className: "flex-1 py-2 rounded-xl text-sm font-medium",
                    style: { background: "oklch(0.22 0.008 282)", color: MID },
                    "data-ocid": "admin.files.delete_cancel_button",
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
                    "data-ocid": "admin.files.delete_confirm_button",
                    children: deleting ? "Deleting…" : "Delete File"
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
  AdminFilesPage as default
};
