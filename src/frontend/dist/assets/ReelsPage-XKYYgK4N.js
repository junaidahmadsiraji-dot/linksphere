import { c as createLucideIcon, a as useActor, h as useQueryClient, r as reactExports, j as jsxRuntimeExports, F as Film, i as cn, C as CircleCheck, b as ue, E as ExternalBlob, M as MediaType, d as createActor, u as useAuth, k as useReels, l as useLikeReel, m as useSaveReel, n as MessageCircle, U as UserAvatar } from "./index-DpisiOh5.js";
import { S as Sheet, a as SheetContent, b as SheetHeader, c as SheetTitle, d as SheetDescription, e as Separator, L as Label, I as Input, T as Textarea, G as GradientButton } from "./textarea-BCYik3b7.js";
import { I as Image } from "./image-DeZrnu5x.js";
import { X } from "./x-TmiiBXt_.js";
import { U as Upload } from "./upload-CRHUiFwl.js";
import { L as LoaderCircle } from "./loader-circle-Bh0xPio6.js";
import { S as Share2, V as VerifiedBadge } from "./VerifiedBadge-BXLXTE2F.js";
import { P as Plus } from "./plus-B_34AA_x.js";
import { H as Heart } from "./heart-BgYeM2cY.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z", key: "1fy3hk" }]
];
const Bookmark = createLucideIcon("bookmark", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["circle", { cx: "8", cy: "18", r: "4", key: "1fc0mg" }],
  ["path", { d: "M12 18V2l7 4", key: "g04rme" }]
];
const Music2 = createLucideIcon("music-2", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",
      key: "uqj9uw"
    }
  ],
  ["path", { d: "M16 9a5 5 0 0 1 0 6", key: "1q6k2b" }],
  ["path", { d: "M19.364 18.364a9 9 0 0 0 0-12.728", key: "ijwkga" }]
];
const Volume2 = createLucideIcon("volume-2", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",
      key: "uqj9uw"
    }
  ],
  ["line", { x1: "22", x2: "16", y1: "9", y2: "15", key: "1ewh16" }],
  ["line", { x1: "16", x2: "22", y1: "9", y2: "15", key: "5ykzw1" }]
];
const VolumeX = createLucideIcon("volume-x", __iconNode);
const ACCEPT_TYPES = "image/*,video/mp4,video/mov,video/quicktime";
const MAX_SIZE_MB = 100;
function CreateReelModal({ open, onOpenChange }) {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  const [title, setTitle] = reactExports.useState("");
  const [description, setDescription] = reactExports.useState("");
  const [mediaFile, setMediaFile] = reactExports.useState(null);
  const [previewUrl, setPreviewUrl] = reactExports.useState(null);
  const [isVideo, setIsVideo] = reactExports.useState(false);
  const [isDragging, setIsDragging] = reactExports.useState(false);
  const [uploadProgress, setUploadProgress] = reactExports.useState(0);
  const [step, setStep] = reactExports.useState("form");
  const fileInputRef = reactExports.useRef(null);
  const resetForm = () => {
    setTitle("");
    setDescription("");
    setMediaFile(null);
    setPreviewUrl(null);
    setIsVideo(false);
    setUploadProgress(0);
    setStep("form");
  };
  const handleClose = () => {
    if (step === "uploading") return;
    resetForm();
    onOpenChange(false);
  };
  const validateAndSetFile = (file) => {
    const isVid = file.type.startsWith("video/");
    const isImg = file.type.startsWith("image/");
    if (!isVid && !isImg) {
      ue.error("Only images or video files are supported.");
      return;
    }
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      ue.error(`File size must be under ${MAX_SIZE_MB} MB.`);
      return;
    }
    setMediaFile(file);
    setIsVideo(isVid);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(URL.createObjectURL(file));
  };
  const handleInputChange = (e) => {
    var _a;
    const file = (_a = e.target.files) == null ? void 0 : _a[0];
    if (file) validateAndSetFile(file);
    e.target.value = "";
  };
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) validateAndSetFile(file);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      ue.error("Please enter a title.");
      return;
    }
    if (!mediaFile) {
      ue.error("Please select a media file.");
      return;
    }
    if (!actor) {
      ue.error("Not connected. Please log in.");
      return;
    }
    setStep("uploading");
    const progressInterval = setInterval(() => {
      setUploadProgress((p) => Math.min(p + 5, 88));
    }, 200);
    try {
      const bytes = await mediaFile.arrayBuffer();
      const blob = ExternalBlob.fromBytes(
        new Uint8Array(bytes)
      ).withUploadProgress((pct) => setUploadProgress(Math.round(pct)));
      const mediaType = isVideo ? MediaType.video : MediaType.image;
      await actor.createReel({
        title: title.trim(),
        description: description.trim(),
        mediaUrl: blob,
        mediaType
      });
      clearInterval(progressInterval);
      setUploadProgress(100);
      setStep("done");
      qc.invalidateQueries({ queryKey: ["reels"] });
      ue.success("Reel posted!");
      setTimeout(() => {
        resetForm();
        onOpenChange(false);
      }, 1600);
    } catch (err) {
      clearInterval(progressInterval);
      setUploadProgress(0);
      setStep("form");
      ue.error("Upload failed. Please try again.");
      console.error(err);
    }
  };
  const isValid = title.trim().length > 0 && !!mediaFile;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Sheet, { open, onOpenChange: handleClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    SheetContent,
    {
      side: "bottom",
      "data-ocid": "reels.create_dialog",
      className: "rounded-t-3xl max-h-[94dvh] overflow-y-auto px-5 pt-5 pb-10",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-1 rounded-full bg-border mx-auto mb-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetHeader, { className: "text-left mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SheetTitle, { className: "font-display text-xl gradient-text", children: "Create Reel" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetDescription, { className: "text-sm text-muted-foreground", children: [
            "Share a moment — image or video up to ",
            MAX_SIZE_MB,
            " MB."
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "mb-5" }),
        (step === "form" || step === "uploading") && /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", noValidate: true, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "reel-title", className: "text-sm font-semibold", children: [
              "Title ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "reel-title",
                "data-ocid": "reels.title_input",
                placeholder: "e.g. Sunset at Cox's Bazar 🌅",
                value: title,
                onChange: (e) => setTitle(e.target.value),
                maxLength: 100,
                disabled: step === "uploading",
                className: "rounded-xl border-input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "reel-desc", className: "text-sm font-semibold", children: "Description" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Textarea,
              {
                id: "reel-desc",
                "data-ocid": "reels.description_textarea",
                placeholder: "Describe your reel, add hashtags…",
                value: description,
                onChange: (e) => setDescription(e.target.value),
                maxLength: 300,
                rows: 3,
                disabled: step === "uploading",
                className: "rounded-xl border-input resize-none"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-sm font-semibold", children: [
              "Media ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
            ] }),
            previewUrl && mediaFile && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative rounded-2xl overflow-hidden border border-border/60 bg-muted/20 aspect-[9/16] max-h-64", children: [
              isVideo ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "video",
                {
                  src: previewUrl,
                  className: "w-full h-full object-cover",
                  muted: true,
                  playsInline: true,
                  autoPlay: true,
                  loop: true
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: previewUrl,
                  alt: "Preview",
                  className: "w-full h-full object-cover"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-2 left-3 flex items-center gap-1.5", children: [
                isVideo ? /* @__PURE__ */ jsxRuntimeExports.jsx(Film, { className: "w-3.5 h-3.5 text-white/80" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "w-3.5 h-3.5 text-white/80" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/80 text-xs truncate max-w-[180px]", children: mediaFile.name })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    setMediaFile(null);
                    if (previewUrl) URL.revokeObjectURL(previewUrl);
                    setPreviewUrl(null);
                    setIsVideo(false);
                  },
                  className: "absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 flex items-center justify-center text-white hover:bg-black/80 transition-smooth",
                  "aria-label": "Remove media",
                  "data-ocid": "reels.remove_media_button",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5" })
                }
              )
            ] }),
            !previewUrl && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                "data-ocid": "reels.upload_dropzone",
                "aria-label": "Select media file",
                disabled: step === "uploading",
                onDrop: handleDrop,
                onDragOver: (e) => {
                  e.preventDefault();
                  setIsDragging(true);
                },
                onDragLeave: () => setIsDragging(false),
                onClick: () => {
                  var _a;
                  return (_a = fileInputRef.current) == null ? void 0 : _a.click();
                },
                className: cn(
                  "w-full border-2 border-dashed rounded-2xl p-8 flex flex-col items-center gap-3 cursor-pointer transition-smooth",
                  isDragging ? "border-primary bg-primary/8" : "border-border hover:border-primary/50 hover:bg-muted/20",
                  step === "uploading" && "pointer-events-none opacity-50"
                ),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-2xl bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-7 h-7 text-muted-foreground" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground", children: "Tap to select image or video" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: [
                      "JPG, PNG, MP4, MOV · max ",
                      MAX_SIZE_MB,
                      " MB"
                    ] })
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                ref: fileInputRef,
                type: "file",
                accept: ACCEPT_TYPES,
                className: "sr-only",
                onChange: handleInputChange,
                "aria-label": "Media file input"
              }
            )
          ] }),
          step === "uploading" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", "data-ocid": "reels.loading_state", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3.5 h-3.5 animate-spin" }),
                "Uploading reel…"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                uploadProgress,
                "%"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-2 bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "h-full gradient-primary rounded-full transition-all duration-300",
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
                "data-ocid": "reels.cancel_button",
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
                "data-ocid": "reels.submit_button",
                className: "flex-1",
                loading: step === "uploading",
                disabled: !isValid || step === "uploading",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-4 h-4" }),
                  "Post Reel"
                ]
              }
            )
          ] })
        ] }),
        step === "done" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            "data-ocid": "reels.success_state",
            className: "flex flex-col items-center gap-4 py-10 text-center",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full gradient-primary flex items-center justify-center shadow-md", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-8 h-8 text-primary-foreground" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-lg text-foreground", children: "Reel published!" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Your reel is now live on the feed." })
              ] })
            ]
          }
        )
      ]
    }
  ) });
}
function timeAgo(ts) {
  const diff = Date.now() - Number(ts) / 1e6;
  const m = Math.floor(diff / 6e4);
  if (m < 1) return "Just now";
  if (m < 60) return `${m}m`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h`;
  return `${Math.floor(h / 24)}d`;
}
function ReelCard({
  reel,
  idx,
  onLike,
  onSave,
  currentUserId,
  muted,
  onToggleMute
}) {
  const isLiked = currentUserId ? reel.likedBy.some((uid) => {
    var _a;
    return ((_a = uid.toText) == null ? void 0 : _a.call(uid)) === currentUserId;
  }) : false;
  const isSaved = currentUserId ? reel.savedBy.some((uid) => {
    var _a;
    return ((_a = uid.toText) == null ? void 0 : _a.call(uid)) === currentUserId;
  }) : false;
  const mediaUrl = reel.mediaUrl.getDirectURL();
  const isVideo = reel.mediaType === "video";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "relative w-full h-full overflow-hidden snap-start snap-always flex-shrink-0 bg-black",
      "data-ocid": `reels.item.${idx + 1}`,
      children: [
        isVideo ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "video",
          {
            src: mediaUrl,
            autoPlay: true,
            loop: true,
            playsInline: true,
            muted,
            className: "absolute inset-0 w-full h-full object-cover"
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: mediaUrl,
            alt: reel.title,
            className: "absolute inset-0 w-full h-full object-cover",
            loading: "lazy"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-black/40 pointer-events-none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-0 left-0 right-0 flex items-center justify-between px-4 pt-4 pb-2 z-20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "text-white font-bold text-base tracking-tight",
              style: { textShadow: "0 1px 4px rgba(0,0,0,0.6)" },
              children: "Reels"
            }
          ),
          isVideo && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: onToggleMute,
              className: "w-9 h-9 rounded-full bg-black/40 flex items-center justify-center text-white backdrop-blur-sm transition-colors hover:bg-black/60",
              "aria-label": muted ? "Unmute" : "Mute",
              "data-ocid": `reels.mute_button.${idx + 1}`,
              children: muted ? /* @__PURE__ */ jsxRuntimeExports.jsx(VolumeX, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Volume2, { className: "w-4 h-4" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute right-3 bottom-28 flex flex-col items-center gap-5 z-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => onLike(reel.id),
              "data-ocid": `reels.like_button.${idx + 1}`,
              className: "flex flex-col items-center gap-1",
              "aria-label": isLiked ? "Unlike" : "Like",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-11 h-11 rounded-full bg-black/40 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Heart,
                  {
                    className: `w-6 h-6 transition-transform ${isLiked ? "fill-red-500 text-red-500 scale-110" : "text-white"}`,
                    strokeWidth: 1.75
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white text-xs font-semibold tabular-nums drop-shadow", children: reel.likedBy.length })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              "data-ocid": `reels.comment_button.${idx + 1}`,
              className: "flex flex-col items-center gap-1",
              "aria-label": "Comment",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-11 h-11 rounded-full bg-black/40 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-6 h-6 text-white", strokeWidth: 1.75 }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white text-xs font-semibold drop-shadow", children: "0" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => onSave(reel.id),
              "data-ocid": `reels.save_button.${idx + 1}`,
              className: "flex flex-col items-center gap-1",
              "aria-label": isSaved ? "Unsave" : "Save",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: `w-11 h-11 rounded-full flex items-center justify-center ${isSaved ? "bg-yellow-500/30" : "bg-black/40"}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Bookmark,
                    {
                      className: `w-6 h-6 ${isSaved ? "fill-yellow-400 text-yellow-400" : "text-white"}`,
                      strokeWidth: 1.75
                    }
                  )
                }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              "data-ocid": `reels.share_button.${idx + 1}`,
              className: "flex flex-col items-center gap-1",
              "aria-label": "Share",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-11 h-11 rounded-full bg-black/40 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "w-6 h-6 text-white", strokeWidth: 1.75 }) })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-4 left-4 right-20 z-10 space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(UserAvatar, { name: reel.authorName, size: "sm" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-white text-sm font-semibold flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate max-w-[140px]", children: reel.authorName }),
              reel.authorIsVerified && /* @__PURE__ */ jsxRuntimeExports.jsx(VerifiedBadge, { size: "xs" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-white/50 text-xs", children: [
              "· ",
              timeAgo(reel.createdAt)
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-white font-semibold text-[15px] leading-snug line-clamp-2 drop-shadow", children: reel.title }),
          reel.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/75 text-sm leading-snug line-clamp-2", children: reel.description }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Music2, { className: "w-3.5 h-3.5 text-white/60 flex-shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs truncate", children: "Original Audio" })
          ] })
        ] })
      ]
    }
  );
}
function ReelsEmptyState({
  onCreate,
  isAuthenticated
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "h-full w-full snap-start snap-always flex flex-col items-center justify-center gap-6 bg-black px-6",
      "data-ocid": "reels.empty_state",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full bg-white/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Film, { className: "w-10 h-10 text-white/60", strokeWidth: 1.25 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-white font-bold text-xl", children: "No reels yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/50 text-sm max-w-xs leading-relaxed", children: "Be the first to share a reel — a short video or image moment." })
        ] }),
        isAuthenticated && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: onCreate,
            "data-ocid": "reels.create_first_button",
            className: "flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white border border-white/30 hover:bg-white/10 transition-colors",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
              "Create your first reel"
            ]
          }
        )
      ]
    }
  );
}
function ReelsPage() {
  const { isAuthenticated, principal } = useAuth();
  const { data: reels = [], isLoading } = useReels();
  const { mutate: likeReel } = useLikeReel();
  const { mutate: saveReel } = useSaveReel();
  const [showCreate, setShowCreate] = reactExports.useState(false);
  const [muted, setMuted] = reactExports.useState(true);
  const containerRef = reactExports.useRef(null);
  const handleToggleMute = reactExports.useCallback(() => setMuted((m) => !m), []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "relative bg-black",
      style: { height: "calc(100dvh - 3.5rem)" },
      "data-ocid": "reels.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            ref: containerRef,
            className: "h-full overflow-y-scroll snap-y snap-mandatory",
            style: { scrollbarWidth: "none", WebkitOverflowScrolling: "touch" },
            "data-ocid": "reels.feed",
            children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "h-full w-full snap-start snap-always flex flex-col items-center justify-center gap-4",
                "data-ocid": "reels.loading_state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 border-2 border-white/20 border-t-white rounded-full animate-spin" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/50 text-sm", children: "Loading reels…" })
                ]
              }
            ) : reels.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              ReelsEmptyState,
              {
                onCreate: () => setShowCreate(true),
                isAuthenticated
              }
            ) : reels.map((reel, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "h-full w-full snap-start snap-always",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  ReelCard,
                  {
                    reel,
                    idx: i,
                    onLike: likeReel,
                    onSave: saveReel,
                    currentUserId: principal ?? void 0,
                    muted,
                    onToggleMute: handleToggleMute
                  }
                )
              },
              String(reel.id)
            ))
          }
        ),
        isAuthenticated && reels.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setShowCreate(true),
            "data-ocid": "reels.create_button",
            "aria-label": "Create reel",
            className: "absolute top-14 right-4 w-10 h-10 rounded-full flex items-center justify-center shadow-lg z-20 transition-transform hover:scale-105 active:scale-95 bg-white/20 backdrop-blur-sm border border-white/30",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-5 h-5 text-white" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CreateReelModal, { open: showCreate, onOpenChange: setShowCreate })
      ]
    }
  );
}
export {
  ReelsPage as default
};
