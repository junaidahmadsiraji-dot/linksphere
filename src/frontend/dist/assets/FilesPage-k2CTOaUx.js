import { c as createLucideIcon, j as jsxRuntimeExports, i as cn, x as FileText, G as User, r as reactExports, b as ue, C as CircleCheck, H as useFiles, u as useAuth, a as useActor, h as useQueryClient, E as ExternalBlob, d as createActor } from "./index-DpisiOh5.js";
import { B as Badge, C as Calendar, a as Button, E as EmptyState, S as Skeleton } from "./skeleton-DGn4nlDU.js";
import { T as Trash2 } from "./trash-2-ZUW3Dj86.js";
import { D as Download } from "./download-BnSqkAGq.js";
import { S as Sheet, a as SheetContent, b as SheetHeader, c as SheetTitle, d as SheetDescription, e as Separator, L as Label, I as Input, T as Textarea, G as GradientButton } from "./textarea-BCYik3b7.js";
import { X } from "./x-TmiiBXt_.js";
import { U as Upload } from "./upload-CRHUiFwl.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["line", { x1: "22", x2: "2", y1: "12", y2: "12", key: "1y58io" }],
  [
    "path",
    {
      d: "M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z",
      key: "oot6mr"
    }
  ],
  ["line", { x1: "6", x2: "6.01", y1: "16", y2: "16", key: "sgf278" }],
  ["line", { x1: "10", x2: "10.01", y1: "16", y2: "16", key: "1l4acy" }]
];
const HardDrive = createLucideIcon("hard-drive", __iconNode);
function Card({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "card",
      className: cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        className
      ),
      ...props
    }
  );
}
function FileCard({
  file,
  isAdmin,
  index,
  onDelete,
  onDownload
}) {
  const ocid = index + 1;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Card,
    {
      "data-ocid": `files.item.${ocid}`,
      className: cn(
        "p-4 flex gap-3 items-start transition-smooth",
        "hover:shadow-elevated border-border/60"
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0 shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-6 h-6 text-primary-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-sm text-foreground line-clamp-2 leading-snug min-w-0", children: file.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "outline",
                className: "text-[10px] shrink-0 border-primary/30 text-primary font-semibold px-1.5 py-0.5",
                children: file.type
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground line-clamp-2 leading-relaxed", children: file.description }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center flex-wrap gap-x-3 gap-y-1 pt-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-[11px] text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-3 h-3 shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate max-w-[100px]", children: file.uploader })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-[11px] text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3 h-3 shrink-0" }),
              file.uploadedAt
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-[11px] text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(HardDrive, { className: "w-3 h-3 shrink-0" }),
              file.size
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[11px] text-muted-foreground", children: [
              file.downloads.toLocaleString(),
              " downloads"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              isAdmin && onDelete && /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "ghost",
                  size: "icon",
                  "data-ocid": `files.delete_button.${ocid}`,
                  className: "h-7 w-7 text-destructive hover:bg-destructive/10 hover:text-destructive",
                  "aria-label": "Delete file",
                  onClick: () => onDelete(file.id),
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  "data-ocid": `files.download_button.${ocid}`,
                  onClick: () => onDownload == null ? void 0 : onDownload(file),
                  className: "flex items-center gap-1.5 px-3 py-1.5 rounded-xl gradient-primary text-primary-foreground text-xs font-semibold transition-smooth hover:brightness-110 shadow-sm",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-3.5 h-3.5" }),
                    "Download"
                  ]
                }
              )
            ] })
          ] })
        ] })
      ]
    }
  );
}
function UploadFileModal({
  open,
  onOpenChange,
  onUpload
}) {
  const [title, setTitle] = reactExports.useState("");
  const [description, setDescription] = reactExports.useState("");
  const [selectedFile, setSelectedFile] = reactExports.useState(null);
  const [isDragging, setIsDragging] = reactExports.useState(false);
  const [uploadProgress, setUploadProgress] = reactExports.useState(0);
  const [step, setStep] = reactExports.useState("form");
  const fileInputRef = reactExports.useRef(null);
  const resetForm = () => {
    setTitle("");
    setDescription("");
    setSelectedFile(null);
    setUploadProgress(0);
    setStep("form");
  };
  const handleClose = () => {
    if (step === "uploading") return;
    resetForm();
    onOpenChange(false);
  };
  const handleFileSelect = (file) => {
    if (!file.type.includes("pdf") && !file.name.endsWith(".pdf")) {
      ue.error("Only PDF files are supported.");
      return;
    }
    if (file.size > 50 * 1024 * 1024) {
      ue.error("File size must be under 50 MB.");
      return;
    }
    setSelectedFile(file);
  };
  const handleDrop = reactExports.useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (!droppedFile) return;
    if (!droppedFile.type.includes("pdf") && !droppedFile.name.endsWith(".pdf")) {
      ue.error("Only PDF files are supported.");
      return;
    }
    if (droppedFile.size > 50 * 1024 * 1024) {
      ue.error("File size must be under 50 MB.");
      return;
    }
    setSelectedFile(droppedFile);
  }, []);
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = () => setIsDragging(false);
  const formatBytes = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      ue.error("Please enter a title.");
      return;
    }
    if (!selectedFile) {
      ue.error("Please select a PDF file.");
      return;
    }
    setStep("uploading");
    const interval = setInterval(() => {
      setUploadProgress((p) => Math.min(p + 8, 85));
    }, 200);
    try {
      if (onUpload) {
        await onUpload({
          title: title.trim(),
          description: description.trim(),
          file: selectedFile
        });
      } else {
        await new Promise((r) => setTimeout(r, 2e3));
      }
      clearInterval(interval);
      setUploadProgress(100);
      setStep("done");
      ue.success("File uploaded successfully!");
      setTimeout(() => {
        resetForm();
        onOpenChange(false);
      }, 1500);
    } catch {
      clearInterval(interval);
      setUploadProgress(0);
      setStep("form");
      ue.error("Upload failed. Please try again.");
    }
  };
  const isValid = title.trim().length > 0 && !!selectedFile;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Sheet, { open, onOpenChange: handleClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    SheetContent,
    {
      side: "bottom",
      "data-ocid": "files.dialog",
      className: "rounded-t-3xl max-h-[92dvh] overflow-y-auto px-5 pt-5 pb-8",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-1 rounded-full bg-border mx-auto mb-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetHeader, { className: "text-left mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SheetTitle, { className: "font-display text-xl gradient-text", children: "Upload PDF" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SheetDescription, { className: "text-sm text-muted-foreground", children: "Share books, guides, or documents with your community." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "mb-5" }),
        (step === "form" || step === "uploading") && /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", noValidate: true, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "file-title", className: "text-sm font-semibold", children: [
              "Title ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "file-title",
                "data-ocid": "files.title_input",
                placeholder: "e.g. Digital Marketing Guide 2026",
                value: title,
                onChange: (e) => setTitle(e.target.value),
                maxLength: 120,
                disabled: step === "uploading",
                className: "rounded-xl border-input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Label,
              {
                htmlFor: "file-description",
                className: "text-sm font-semibold",
                children: "Description"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Textarea,
              {
                id: "file-description",
                "data-ocid": "files.description_textarea",
                placeholder: "Short description of the file content…",
                value: description,
                onChange: (e) => setDescription(e.target.value),
                maxLength: 400,
                rows: 3,
                disabled: step === "uploading",
                className: "rounded-xl border-input resize-none"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-sm font-semibold", children: [
              "PDF File ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                "data-ocid": "files.dropzone",
                "aria-label": "Select PDF file",
                onDrop: handleDrop,
                onDragOver: handleDragOver,
                onDragLeave: handleDragLeave,
                onClick: () => {
                  var _a;
                  return (_a = fileInputRef.current) == null ? void 0 : _a.click();
                },
                className: cn(
                  "w-full border-2 border-dashed rounded-2xl p-6 flex flex-col items-center gap-3 cursor-pointer transition-smooth",
                  isDragging ? "border-primary bg-primary/5" : "border-border hover:border-primary/50 hover:bg-muted/30",
                  step === "uploading" && "pointer-events-none opacity-60"
                ),
                children: selectedFile ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-6 h-6 text-primary-foreground" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground line-clamp-1", children: selectedFile.name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: formatBytes(selectedFile.size) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: (e) => {
                        e.stopPropagation();
                        setSelectedFile(null);
                      },
                      className: "flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive transition-colors",
                      "aria-label": "Remove selected file",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5" }),
                        "Remove"
                      ]
                    }
                  )
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-xl bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-6 h-6 text-muted-foreground" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Tap to select PDF" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "or drag & drop here · max 50 MB" })
                  ] })
                ] })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                ref: fileInputRef,
                type: "file",
                accept: "application/pdf,.pdf",
                className: "sr-only",
                onChange: (e) => {
                  var _a;
                  const f = (_a = e.target.files) == null ? void 0 : _a[0];
                  if (f) handleFileSelect(f);
                  e.target.value = "";
                }
              }
            )
          ] }),
          step === "uploading" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", "data-ocid": "files.loading_state", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Uploading…" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                uploadProgress,
                "%"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-2 bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "h-full gradient-primary rounded-full transition-all duration-200",
                style: { width: `${uploadProgress}%` }
              }
            ) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              GradientButton,
              {
                type: "button",
                variant: "outline",
                size: "md",
                "data-ocid": "files.cancel_button",
                className: "flex-1",
                onClick: handleClose,
                disabled: step === "uploading",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              GradientButton,
              {
                type: "submit",
                size: "md",
                "data-ocid": "files.submit_button",
                className: "flex-1",
                loading: step === "uploading",
                disabled: !isValid || step === "uploading",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-4 h-4" }),
                  "Upload"
                ]
              }
            )
          ] })
        ] }),
        step === "done" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            "data-ocid": "files.success_state",
            className: "flex flex-col items-center gap-4 py-10 text-center",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full gradient-primary flex items-center justify-center shadow-md", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-8 h-8 text-primary-foreground" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-lg text-foreground", children: "Upload complete!" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Your file is now available for download." })
              ] })
            ]
          }
        )
      ]
    }
  ) });
}
const SAMPLE_FILES = [
  {
    id: "1",
    title: "ডিজিটাল মার্কেটিং গাইড ২০২৬",
    description: "সোশ্যাল মিডিয়া মার্কেটিং, SEO, এবং কন্টেন্ট স্ট্র্যাটেজি নিয়ে সম্পূর্ণ গাইড। শিক্ষার্থী ও প্রফেশনাল উভয়ের জন্য উপযুক্ত।",
    uploader: "Mehedi Hasan",
    uploadedAt: "2026-04-20",
    size: "3.2 MB",
    type: "PDF",
    downloads: 342
  },
  {
    id: "2",
    title: "বাংলাদেশের মোবাইল বাজার বিশ্লেষণ",
    description: "২০২৬ সালের সেরা মোবাইল ব্র্যান্ড ও দামের তুলনামূলক বিশ্লেষণ। ক্রেতাদের সঠিক সিদ্ধান্ত নিতে সাহায্য করবে।",
    uploader: "Tasnima Akter",
    uploadedAt: "2026-04-18",
    size: "1.8 MB",
    type: "PDF",
    downloads: 198
  },
  {
    id: "3",
    title: "ফ্রিল্যান্সিং শুরু করার হ্যান্ডবুক",
    description: "Upwork, Fiverr ও অন্যান্য প্ল্যাটফর্মে ক্যারিয়ার শুরু করার সম্পূর্ণ নির্দেশিকা। পোর্টফোলিও তৈরি থেকে ক্লায়েন্ট পাওয়া পর্যন্ত।",
    uploader: "Arif Rahman",
    uploadedAt: "2026-04-15",
    size: "5.1 MB",
    type: "PDF",
    downloads: 521
  },
  {
    id: "4",
    title: "Python প্রোগ্রামিং বেসিক থেকে অ্যাডভান্সড",
    description: "বাংলায় Python শেখার সবচেয়ে বিস্তারিত বই। শিক্ষার্থীদের জন্য উপযুক্ত, প্রতিটি অধ্যায়ে প্র্যাকটিক্যাল উদাহরণ রয়েছে।",
    uploader: "Nusrat Jahan",
    uploadedAt: "2026-04-10",
    size: "8.7 MB",
    type: "PDF",
    downloads: 874
  },
  {
    id: "5",
    title: "গ্রাফিক ডিজাইন মাস্টারক্লাস",
    description: "Figma ও Adobe XD ব্যবহার করে প্রফেশনাল ইউআই ডিজাইন শেখার সম্পূর্ণ গাইড। বাস্তব প্রজেক্ট সহ।",
    uploader: "Sabbir Ahmed",
    uploadedAt: "2026-04-05",
    size: "12.4 MB",
    type: "PDF",
    downloads: 265
  }
];
function FilesSkeletonList() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "files.loading_state", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-card rounded-2xl p-4 flex gap-3 items-start border border-border/60",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-12 h-12 rounded-xl flex-shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-4/5 rounded" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-full rounded" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-2/3 rounded" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center pt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-24 rounded" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-7 w-24 rounded-xl" })
          ] })
        ] })
      ]
    },
    i
  )) });
}
function FilesPage() {
  const { data: backendFiles, isLoading } = useFiles();
  const { isAdmin } = useAuth();
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  const [uploadOpen, setUploadOpen] = reactExports.useState(false);
  const [localFiles, setLocalFiles] = reactExports.useState(SAMPLE_FILES);
  const displayFiles = backendFiles && backendFiles.length > 0 ? backendFiles.map((f) => ({
    id: String(f.id),
    title: f.title,
    description: f.description,
    uploader: f.uploaderName,
    uploadedAt: new Date(Number(f.uploadedAt) / 1e6).toISOString().slice(0, 10),
    size: "—",
    type: "PDF",
    downloads: 0
  })) : localFiles;
  const handleDelete = async (id) => {
    if (actor && !/^[1-5]$/.test(id)) {
      await actor.deleteFile(BigInt(id));
      queryClient.invalidateQueries({ queryKey: ["files"] });
    }
    setLocalFiles((prev) => prev.filter((f) => f.id !== id));
    ue.success("File deleted.");
  };
  const handleDownload = (file) => {
    if (file.downloadUrl) {
      window.open(file.downloadUrl, "_blank", "noopener");
    } else {
      ue.info(`Downloading "${file.title}"…`);
    }
  };
  const handleUpload = async (data) => {
    if (!actor) {
      ue.error("Not connected. Please try again.");
      return;
    }
    try {
      const bytes = new Uint8Array(await data.file.arrayBuffer());
      const blob = ExternalBlob.fromBytes(bytes);
      const record = await actor.uploadFile({
        title: data.title,
        description: data.description,
        blob
      });
      queryClient.invalidateQueries({ queryKey: ["files"] });
      setLocalFiles((prev) => [
        {
          id: String(record.id),
          title: record.title,
          description: record.description,
          uploader: record.uploaderName,
          uploadedAt: new Date(Number(record.uploadedAt) / 1e6).toISOString().slice(0, 10),
          size: `${(bytes.length / 1024 / 1024).toFixed(1)} MB`,
          type: "PDF",
          downloads: 0,
          downloadUrl: record.blob.getDirectURL()
        },
        ...prev
      ]);
      setUploadOpen(false);
      ue.success("File uploaded successfully!");
    } catch {
      ue.error("Upload failed. Please try again.");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "px-3 py-4 space-y-4 max-w-xl mx-auto",
      "data-ocid": "files.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-bold text-xl gradient-text flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-5 h-5 text-primary" }),
            "Files & Books"
          ] }),
          isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            GradientButton,
            {
              size: "sm",
              "data-ocid": "files.upload_button",
              onClick: () => setUploadOpen(true),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-4 h-4" }),
                "Upload"
              ]
            }
          )
        ] }),
        !isLoading && displayFiles.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground px-1", children: [
          displayFiles.length,
          " file",
          displayFiles.length !== 1 ? "s" : "",
          " ",
          "available"
        ] }),
        isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(FilesSkeletonList, {}),
        !isLoading && displayFiles.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
          EmptyState,
          {
            icon: FileText,
            title: "No files yet",
            description: "Admin-uploaded PDFs and documents will appear here.",
            action: isAdmin ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              GradientButton,
              {
                size: "md",
                "data-ocid": "files.empty_state",
                onClick: () => setUploadOpen(true),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-4 h-4" }),
                  "Upload First File"
                ]
              }
            ) : void 0
          }
        ),
        !isLoading && displayFiles.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "files.list", children: displayFiles.map((file, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          FileCard,
          {
            file,
            index: i,
            isAdmin,
            onDelete: handleDelete,
            onDownload: handleDownload
          },
          file.id
        )) }),
        isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx(
          UploadFileModal,
          {
            open: uploadOpen,
            onOpenChange: setUploadOpen,
            onUpload: handleUpload
          }
        )
      ]
    }
  );
}
export {
  FilesPage as default
};
