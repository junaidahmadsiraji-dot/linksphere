import { c as createLucideIcon, u as useAuth, r as reactExports, j as jsxRuntimeExports, a as useActor, E as ExternalBlob, b as ue, d as createActor, e as usePosts, f as useStories, g as useProfile, h as useQueryClient } from "./index-DpisiOh5.js";
import { X } from "./x-TmiiBXt_.js";
import { C as Camera, M as MapPin, P as PostCard } from "./PostCard-CoVsjtIQ.js";
import { T as Tag } from "./tag-B4FJDfqt.js";
import { L as LoaderCircle } from "./loader-circle-Bh0xPio6.js";
import { I as Image } from "./image-DeZrnu5x.js";
import { P as Plus } from "./plus-B_34AA_x.js";
import "./trash-2-ZUW3Dj86.js";
import "./VerifiedBadge-BXLXTE2F.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M8 14s1.5 2 4 2 4-2 4-2", key: "1y1vjs" }],
  ["line", { x1: "9", x2: "9.01", y1: "9", y2: "9", key: "yxxnd0" }],
  ["line", { x1: "15", x2: "15.01", y1: "9", y2: "9", key: "1p4y9e" }]
];
const Smile = createLucideIcon("smile", __iconNode$1);
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
      d: "m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5",
      key: "ftymec"
    }
  ],
  ["rect", { x: "2", y: "6", width: "14", height: "12", rx: "2", key: "158x01" }]
];
const Video = createLucideIcon("video", __iconNode);
function CreatePostModal({
  isOpen,
  onClose,
  onSubmit,
  authorName,
  authorSrc
}) {
  const { isAuthenticated } = useAuth();
  const [text, setText] = reactExports.useState("");
  const [imageFile, setImageFile] = reactExports.useState(null);
  const [imagePreview, setImagePreview] = reactExports.useState(null);
  const [isSubmitting, setIsSubmitting] = reactExports.useState(false);
  const fileInputRef = reactExports.useRef(null);
  if (!isOpen) return null;
  const handleImageChange = (e) => {
    var _a;
    const file = (_a = e.target.files) == null ? void 0 : _a[0];
    if (!file) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };
  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim() || isSubmitting) return;
    setIsSubmitting(true);
    try {
      await onSubmit(text.trim(), imageFile ?? void 0);
      setText("");
      removeImage();
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };
  const initials = authorName.slice(0, 2).toUpperCase();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "dialog",
    {
      open: true,
      className: "fixed inset-0 z-50 flex items-center justify-center w-full h-full max-w-none max-h-none m-0 p-4 border-0",
      style: { background: "rgba(0,0,0,0.50)" },
      "aria-label": "Create post",
      "data-ocid": "feed.create_post.dialog",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "relative w-full max-w-[500px] bg-white rounded-xl overflow-hidden",
          style: { boxShadow: "0 4px 24px rgba(0,0,0,0.28)" },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "relative flex items-center justify-center px-4 py-3 border-b",
                style: { borderColor: "#E4E6EB" },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-bold text-xl", style: { color: "#050505" }, children: "Create post" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: onClose,
                      "data-ocid": "feed.create_post.close_button",
                      className: "absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:bg-gray-100",
                      "aria-label": "Close",
                      style: { background: "#E4E6EB", color: "#050505" },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5" })
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5 px-4 pt-3 pb-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "w-10 h-10 rounded-full flex-shrink-0 overflow-hidden flex items-center justify-center font-bold text-white text-sm",
                    style: { background: "#1877F2" },
                    children: authorSrc ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "img",
                      {
                        src: authorSrc,
                        alt: authorName,
                        className: "w-full h-full object-cover"
                      }
                    ) : initials
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "font-semibold text-sm leading-tight",
                      style: { color: "#050505" },
                      children: authorName
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      className: "flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold mt-0.5 transition-colors hover:opacity-80",
                      style: { background: "#E4E6EB", color: "#050505" },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "svg",
                          {
                            width: "10",
                            height: "10",
                            viewBox: "0 0 10 10",
                            fill: "none",
                            "aria-hidden": "true",
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Public" }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "circle",
                                {
                                  cx: "5",
                                  cy: "5",
                                  r: "4.5",
                                  stroke: "#65676B",
                                  strokeWidth: "1"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "M5 2C3.895 2 3 2.895 3 4s.895 2 2 2 2-.895 2-2-.895-2-2-2Z",
                                  fill: "#65676B"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "M1.5 8c0-1.657 1.567-3 3.5-3s3.5 1.343 3.5 3",
                                  stroke: "#65676B",
                                  strokeWidth: "1",
                                  strokeLinecap: "round"
                                }
                              )
                            ]
                          }
                        ),
                        "Public"
                      ]
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "textarea",
                {
                  value: text,
                  onChange: (e) => setText(e.target.value),
                  placeholder: `What's on your mind, ${authorName.split(" ")[0]}?`,
                  rows: 4,
                  disabled: isSubmitting,
                  "data-ocid": "feed.create_post.textarea",
                  autoFocus: true,
                  className: "w-full resize-none bg-transparent focus:outline-none disabled:opacity-60 leading-relaxed text-xl",
                  style: { color: "#050505" }
                }
              ) }),
              imagePreview && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "mx-4 mb-3 relative rounded-xl overflow-hidden border",
                  style: { borderColor: "#E4E6EB" },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "img",
                      {
                        src: imagePreview,
                        alt: "Preview",
                        className: "w-full object-cover max-h-56"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: removeImage,
                        "data-ocid": "feed.create_post.remove_image",
                        className: "absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:opacity-90",
                        style: {
                          background: "rgba(255,255,255,0.9)",
                          color: "#050505"
                        },
                        "aria-label": "Remove image",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "mx-4 mb-3 rounded-xl border flex items-center justify-between px-3 py-2",
                  style: { borderColor: "#CED0D4" },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "text-sm font-semibold",
                        style: { color: "#050505" },
                        children: "Add to your post"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          onClick: () => {
                            var _a;
                            return (_a = fileInputRef.current) == null ? void 0 : _a.click();
                          },
                          disabled: isSubmitting,
                          "data-ocid": "feed.create_post.upload_button",
                          className: "w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:bg-gray-100 disabled:opacity-50",
                          "aria-label": "Add photo or video",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "w-6 h-6", style: { color: "#45BD62" } })
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          className: "w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:bg-gray-100",
                          "aria-label": "Tag people",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "w-6 h-6", style: { color: "#1877F2" } })
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          className: "w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:bg-gray-100",
                          "aria-label": "Feeling / Activity",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Smile, { className: "w-6 h-6", style: { color: "#F7B928" } })
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          className: "w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:bg-gray-100",
                          "aria-label": "Check in",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-6 h-6", style: { color: "#F02849" } })
                        }
                      )
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  ref: fileInputRef,
                  type: "file",
                  accept: "image/*",
                  onChange: handleImageChange,
                  className: "hidden",
                  "aria-label": "Upload image"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "submit",
                  disabled: !text.trim() || isSubmitting || !isAuthenticated,
                  "data-ocid": "feed.create_post.submit_button",
                  className: "w-full py-2.5 rounded-lg text-sm font-bold transition-colors disabled:opacity-40 flex items-center justify-center gap-2 text-white",
                  style: {
                    background: text.trim() && !isSubmitting && isAuthenticated ? "#1877F2" : "#BEC3C9"
                  },
                  children: isSubmitting ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
                    "Posting…"
                  ] }) : "Post"
                }
              ) })
            ] })
          ]
        }
      )
    }
  );
}
function StoryCreatorModal({
  isOpen,
  onClose,
  onCreated,
  authorName
}) {
  const { isAuthenticated } = useAuth();
  const { actor } = useActor(createActor);
  const [imageFile, setImageFile] = reactExports.useState(null);
  const [imagePreview, setImagePreview] = reactExports.useState(null);
  const [isSubmitting, setIsSubmitting] = reactExports.useState(false);
  const fileInputRef = reactExports.useRef(null);
  if (!isOpen) return null;
  const handleImageChange = (e) => {
    var _a;
    const file = (_a = e.target.files) == null ? void 0 : _a[0];
    if (!file) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };
  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile || isSubmitting || !actor) return;
    setIsSubmitting(true);
    try {
      const arrayBuffer = await imageFile.arrayBuffer();
      const bytes = new Uint8Array(arrayBuffer);
      const image = ExternalBlob.fromBytes(bytes);
      await actor.createStory({ image });
      ue.success("Story posted!");
      removeImage();
      onCreated == null ? void 0 : onCreated();
      onClose();
    } catch {
      ue.error("Failed to post story. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  const initials = authorName.slice(0, 2).toUpperCase();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "dialog",
    {
      open: true,
      className: "fixed inset-0 z-50 flex items-center justify-center w-full h-full max-w-none max-h-none m-0 p-4 border-0",
      style: { background: "rgba(0,0,0,0.50)" },
      "aria-label": "Create story",
      "data-ocid": "stories.creator.dialog",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "relative w-full max-w-[400px] bg-white rounded-xl overflow-hidden",
          style: { boxShadow: "0 4px 24px rgba(0,0,0,0.28)" },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "relative flex items-center justify-center px-4 py-3 border-b",
                style: { borderColor: "#E4E6EB" },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-bold text-xl", style: { color: "#050505" }, children: "Add to Story" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: onClose,
                      "data-ocid": "stories.creator.close_button",
                      className: "absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:bg-gray-100",
                      style: { background: "#E4E6EB", color: "#050505" },
                      "aria-label": "Close",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5" })
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5 px-4 pt-3 pb-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-white text-sm",
                    style: { background: "#1877F2" },
                    children: initials
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm", style: { color: "#050505" }, children: authorName }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs", style: { color: "#65676B" }, children: "Visible for 24 hours" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pb-3", children: [
                imagePreview ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "relative rounded-xl overflow-hidden border",
                    style: { borderColor: "#E4E6EB" },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "img",
                        {
                          src: imagePreview,
                          alt: "Story preview",
                          className: "w-full object-cover max-h-64"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          onClick: removeImage,
                          "data-ocid": "stories.creator.remove_image",
                          className: "absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center transition-colors",
                          style: {
                            background: "rgba(255,255,255,0.9)",
                            color: "#050505"
                          },
                          "aria-label": "Remove image",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
                        }
                      )
                    ]
                  }
                ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => {
                      var _a;
                      return (_a = fileInputRef.current) == null ? void 0 : _a.click();
                    },
                    "data-ocid": "stories.creator.upload_button",
                    className: "w-full border-2 border-dashed rounded-xl py-10 flex flex-col items-center gap-3 transition-colors",
                    style: { borderColor: "#CED0D4", color: "#65676B" },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "w-14 h-14 rounded-full flex items-center justify-center",
                          style: { background: "#E7F3FF" },
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "w-7 h-7", style: { color: "#1877F2" } })
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "p",
                          {
                            className: "font-semibold text-sm",
                            style: { color: "#050505" },
                            children: "Add a photo"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs mt-0.5", style: { color: "#65676B" }, children: "Tap to choose from your device" })
                      ] })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    ref: fileInputRef,
                    type: "file",
                    accept: "image/*",
                    onChange: handleImageChange,
                    className: "hidden",
                    "aria-label": "Upload story image"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 px-4 pb-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: onClose,
                    disabled: isSubmitting,
                    "data-ocid": "stories.creator.cancel_button",
                    className: "flex-1 py-2.5 rounded-lg border text-sm font-semibold transition-colors hover:bg-gray-50 disabled:opacity-50",
                    style: { borderColor: "#CED0D4", color: "#050505" },
                    children: "Cancel"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "submit",
                    disabled: !imageFile || isSubmitting || !isAuthenticated,
                    "data-ocid": "stories.creator.submit_button",
                    className: "flex-1 py-2.5 rounded-lg text-sm font-bold text-white transition-colors disabled:opacity-40 flex items-center justify-center gap-2",
                    style: { background: "#1877F2" },
                    children: isSubmitting ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
                      "Posting…"
                    ] }) : "Share Story"
                  }
                )
              ] })
            ] })
          ]
        }
      )
    }
  );
}
const STORY_DURATION = 5e3;
function StoryViewer({
  groups,
  startGroupIndex,
  onClose
}) {
  const [groupIndex, setGroupIndex] = reactExports.useState(startGroupIndex);
  const [storyIndex, setStoryIndex] = reactExports.useState(0);
  const [progress, setProgress] = reactExports.useState(0);
  const startTimeRef = reactExports.useRef(Date.now());
  const group = groups[groupIndex];
  const story = group == null ? void 0 : group.stories[storyIndex];
  const goNext = reactExports.useCallback(() => {
    const currentGroup = groups[groupIndex];
    if (!currentGroup) return;
    if (storyIndex < currentGroup.stories.length - 1) {
      setStoryIndex((i) => i + 1);
      setProgress(0);
      startTimeRef.current = Date.now();
    } else if (groupIndex < groups.length - 1) {
      setGroupIndex((g) => g + 1);
      setStoryIndex(0);
      setProgress(0);
      startTimeRef.current = Date.now();
    } else {
      onClose();
    }
  }, [groups, groupIndex, storyIndex, onClose]);
  const goPrev = reactExports.useCallback(() => {
    if (storyIndex > 0) {
      setStoryIndex((i) => i - 1);
      setProgress(0);
      startTimeRef.current = Date.now();
    } else if (groupIndex > 0) {
      setGroupIndex((g) => g - 1);
      setStoryIndex(0);
      setProgress(0);
      startTimeRef.current = Date.now();
    }
  }, [groupIndex, storyIndex]);
  reactExports.useEffect(() => {
    startTimeRef.current = Date.now();
    setProgress(0);
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const pct = Math.min(elapsed / STORY_DURATION * 100, 100);
      setProgress(pct);
      if (elapsed >= STORY_DURATION) goNext();
    }, 50);
    return () => clearInterval(timer);
  }, [goNext]);
  reactExports.useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose, goNext, goPrev]);
  if (!group || !story) return null;
  const imageUrl = story.image && typeof story.image.getDirectURL === "function" ? story.image.getDirectURL() : null;
  const initials = group.authorName.slice(0, 2).toUpperCase();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "dialog",
    {
      open: true,
      className: "fixed inset-0 z-50 flex items-center justify-center w-full h-full max-w-none max-h-none m-0 p-0 border-0",
      style: { background: "rgba(0,0,0,0.92)" },
      "aria-label": "Story viewer",
      "data-ocid": "stories.viewer.dialog",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "relative flex flex-col overflow-hidden",
            style: {
              width: "100%",
              maxWidth: 390,
              height: "100%",
              maxHeight: 700,
              background: "#1a1a1a",
              borderRadius: 12
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-3 left-3 right-3 z-10 flex gap-1", children: group.stories.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "flex-1 rounded-full overflow-hidden",
                  style: { height: 3, background: "rgba(255,255,255,0.35)" },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "h-full rounded-full",
                      style: {
                        background: "white",
                        width: i < storyIndex ? "100%" : i === storyIndex ? `${progress}%` : "0%",
                        transition: "none"
                      }
                    }
                  )
                },
                s.id.toString()
              )) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-8 left-3 right-12 z-10 flex items-center gap-2.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "w-9 h-9 rounded-full overflow-hidden flex items-center justify-center font-bold text-white text-xs flex-shrink-0 border-2 border-white",
                    style: { background: "#1877F2" },
                    children: initials
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white text-sm font-semibold leading-tight", children: group.authorName }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/60 text-[11px]", children: new Date(Number(story.createdAt) / 1e6).toLocaleTimeString(
                    [],
                    {
                      hour: "2-digit",
                      minute: "2-digit"
                    }
                  ) })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: onClose,
                  "data-ocid": "stories.viewer.close_button",
                  className: "absolute top-7 right-3 z-20 w-9 h-9 flex items-center justify-center rounded-full transition-colors",
                  style: { background: "rgba(255,255,255,0.15)", color: "white" },
                  "aria-label": "Close story",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "flex-1 flex items-center justify-center",
                  style: { background: "#111" },
                  children: imageUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: imageUrl,
                      alt: `Story by ${group.authorName}`,
                      className: "w-full h-full object-cover"
                    }
                  ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "w-full h-full flex items-center justify-center",
                      style: { background: "#1877F2" },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white text-5xl font-bold", children: group.authorName.slice(0, 1) })
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: goPrev,
                  className: "absolute left-0 top-0 w-1/3 h-full z-10",
                  "aria-label": "Previous story",
                  tabIndex: -1
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: goNext,
                  className: "absolute right-0 top-0 w-2/3 h-full z-10",
                  "aria-label": "Next story",
                  tabIndex: -1
                }
              )
            ]
          }
        ),
        groupIndex > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => {
              setGroupIndex((g) => g - 1);
              setStoryIndex(0);
              setProgress(0);
            },
            "data-ocid": "stories.viewer.prev_group",
            className: "hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full items-center justify-center text-white text-2xl transition-colors z-20",
            style: { background: "rgba(255,255,255,0.15)" },
            "aria-label": "Previous user's story",
            children: "‹"
          }
        ),
        groupIndex < groups.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => {
              setGroupIndex((g) => g + 1);
              setStoryIndex(0);
              setProgress(0);
            },
            "data-ocid": "stories.viewer.next_group",
            className: "hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full items-center justify-center text-white text-2xl transition-colors z-20",
            style: { background: "rgba(255,255,255,0.15)" },
            "aria-label": "Next user's story",
            children: "›"
          }
        )
      ]
    }
  );
}
function formatTimeAgo(ts) {
  const ms = Number(ts) / 1e6;
  const diff = Date.now() - ms;
  if (diff < 6e4) return "Just now";
  if (diff < 36e5) return `${Math.floor(diff / 6e4)}m ago`;
  if (diff < 864e5) return `${Math.floor(diff / 36e5)}h ago`;
  return `${Math.floor(diff / 864e5)}d ago`;
}
function postViewToCardData(p, myPrincipal) {
  return {
    id: p.id.toString(),
    authorName: p.authorName,
    authorInitials: p.authorName.slice(0, 2).toUpperCase(),
    authorSrc: p.authorAvatar && typeof p.authorAvatar.getDirectURL === "function" ? p.authorAvatar.getDirectURL() : void 0,
    authorIsVerified: p.authorIsVerified,
    time: formatTimeAgo(p.createdAt),
    text: p.text,
    imageSrc: p.image && typeof p.image.getDirectURL === "function" ? p.image.getDirectURL() : void 0,
    likeCount: Number(p.likeCount),
    commentCount: Number(p.commentCount),
    liked: p.likedByMe,
    isOwn: myPrincipal ? p.author.toString() === myPrincipal : false
  };
}
const RING_GRADIENTS = [
  ["#F58529", "#DD2A7B"],
  ["#1877F2", "#0099FF"],
  ["#E91E63", "#FF5722"],
  ["#4CAF50", "#00BCD4"],
  ["#9C27B0", "#673AB7"],
  ["#FF9800", "#FF5722"]
];
function StoriesRow({
  groups,
  onStoryClick,
  onAddStory,
  isAuthenticated,
  authorName,
  authorSrc
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex gap-2 overflow-x-auto pb-1 scrollbar-hide",
      "data-ocid": "feed.stories.row",
      "aria-label": "Stories",
      style: { scrollbarWidth: "none" },
      children: [
        isAuthenticated && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: onAddStory,
            "data-ocid": "feed.stories.add_button",
            className: "flex flex-col items-center gap-1.5 flex-shrink-0 min-w-[72px]",
            "aria-label": "Add your story",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-14 h-14", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "w-14 h-14 rounded-full flex items-center justify-center overflow-hidden font-bold text-white text-base",
                    style: { background: "#1877F2" },
                    children: authorSrc ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "img",
                      {
                        src: authorSrc,
                        alt: authorName,
                        className: "w-full h-full object-cover"
                      }
                    ) : authorName.slice(0, 2).toUpperCase()
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full border-2 border-white flex items-center justify-center",
                    style: { background: "#1877F2" },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3 h-3 text-white", strokeWidth: 3 })
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "text-[11px] font-medium text-center leading-tight max-w-[72px] truncate",
                  style: { color: "#050505" },
                  children: "Your Story"
                }
              )
            ]
          }
        ),
        groups.map((group, idx) => {
          const [c1, c2] = RING_GRADIENTS[idx % RING_GRADIENTS.length];
          const initials = group.authorName.slice(0, 2).toUpperCase();
          const firstName = group.authorName.split(" ")[0];
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => onStoryClick(idx),
              "data-ocid": `feed.stories.item.${idx + 1}`,
              className: "flex flex-col items-center gap-1.5 flex-shrink-0 min-w-[72px]",
              "aria-label": `${group.authorName}'s story`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "w-14 h-14 rounded-full p-[2.5px]",
                    style: { background: `linear-gradient(135deg, ${c1}, ${c2})` },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "w-full h-full rounded-full border-2 border-white overflow-hidden flex items-center justify-center font-bold text-white text-base",
                        style: { background: "#1877F2" },
                        children: initials
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "text-[11px] font-medium text-center leading-tight max-w-[72px] truncate",
                    style: { color: "#050505" },
                    children: firstName
                  }
                )
              ]
            },
            group.authorId.toString()
          );
        })
      ]
    }
  );
}
function PostComposer({
  authorName,
  authorSrc,
  onOpenCreatePost
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "rounded-none sm:rounded-lg border-t border-b sm:border bg-white",
      style: { boxShadow: "0 1px 2px rgba(0,0,0,0.10)" },
      "data-ocid": "feed.composer.card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-3 pt-3 pb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-white text-sm overflow-hidden",
              style: { background: "#1877F2" },
              children: authorSrc ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: authorSrc,
                  alt: authorName,
                  className: "w-full h-full object-cover"
                }
              ) : authorName.slice(0, 2).toUpperCase()
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: onOpenCreatePost,
              "data-ocid": "feed.composer.input_button",
              className: "flex-1 text-left rounded-full border px-4 py-2.5 text-sm transition-colors hover:bg-gray-50",
              style: {
                background: "#F0F2F5",
                borderColor: "#CED0D4",
                color: "#65676B"
              },
              children: "What's on your mind?"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { height: 1, background: "#E4E6EB", margin: "0 16px" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center px-1 py-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: onOpenCreatePost,
              "data-ocid": "feed.composer.photo_button",
              className: "flex flex-1 items-center justify-center gap-2 py-2.5 rounded-lg transition-colors hover:bg-gray-50 text-sm font-semibold",
              style: { color: "#45BD62" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "w-5 h-5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden xs:inline", children: "Photo/Video" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { width: 1, height: 28, background: "#E4E6EB" } }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: onOpenCreatePost,
              "data-ocid": "feed.composer.live_button",
              className: "flex flex-1 items-center justify-center gap-2 py-2.5 rounded-lg transition-colors hover:bg-gray-50 text-sm font-semibold",
              style: { color: "#F02849" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Video, { className: "w-5 h-5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden xs:inline", children: "Live Video" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { width: 1, height: 28, background: "#E4E6EB" } }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: onOpenCreatePost,
              "data-ocid": "feed.composer.feeling_button",
              className: "flex flex-1 items-center justify-center gap-2 py-2.5 rounded-lg transition-colors hover:bg-gray-50 text-sm font-semibold",
              style: { color: "#F7B928" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Smile, { className: "w-5 h-5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden xs:inline", children: "Feeling" })
              ]
            }
          )
        ] })
      ]
    }
  );
}
function FeedPage() {
  const { data: backendPosts = [], isLoading } = usePosts();
  const { data: storyGroups = [] } = useStories();
  const { data: profile } = useProfile();
  const { isAuthenticated, principal } = useAuth();
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  const [showCreateModal, setShowCreateModal] = reactExports.useState(false);
  const [showStoryCreator, setShowStoryCreator] = reactExports.useState(false);
  const [viewingStoryGroup, setViewingStoryGroup] = reactExports.useState(
    null
  );
  const [localPosts, setLocalPosts] = reactExports.useState([]);
  const authorName = (profile == null ? void 0 : profile.username) ?? (principal ? `User ${principal.slice(0, 6)}` : "You");
  const authorSrc = (profile == null ? void 0 : profile.avatar) && typeof profile.avatar.getDirectURL === "function" ? profile.avatar.getDirectURL() : void 0;
  const localIds = new Set(localPosts.map((p) => p.id));
  const backendCards = backendPosts.map(
    (p) => postViewToCardData(p, principal)
  );
  const dedupedBackend = backendCards.filter((p) => !localIds.has(p.id));
  const allPosts = [...localPosts, ...dedupedBackend];
  const handleCreatePost = async (text, imageFile) => {
    const imagePreview = imageFile ? await new Promise((res) => {
      const reader = new FileReader();
      reader.onload = () => res(reader.result);
      reader.readAsDataURL(imageFile);
    }) : void 0;
    const optimistic = {
      id: `local-${Date.now()}`,
      authorName,
      authorInitials: authorName.slice(0, 2).toUpperCase(),
      authorSrc,
      time: "Just now",
      text,
      imageSrc: imagePreview,
      likeCount: 0,
      commentCount: 0,
      liked: false,
      isOwn: true
    };
    setLocalPosts((prev) => [optimistic, ...prev]);
    setTimeout(
      () => queryClient.invalidateQueries({ queryKey: ["posts"] }),
      1500
    );
  };
  const handleDeletePost = async (postId) => {
    if (actor && !postId.startsWith("local-")) {
      await actor.deletePost(BigInt(postId));
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    }
    setLocalPosts((prev) => prev.filter((p) => p.id !== postId));
  };
  const handleLike = async (postId) => {
    if (!actor || postId.startsWith("local-")) return;
    await actor.likePost(BigInt(postId));
    queryClient.invalidateQueries({ queryKey: ["posts"] });
  };
  const handleAddComment = async (postId, text) => {
    if (!actor || postId.startsWith("local-")) return;
    await actor.addComment(BigInt(postId), text);
    queryClient.invalidateQueries({ queryKey: ["posts"] });
  };
  const handleDeleteComment = async (postId, commentId) => {
    if (!actor || postId.startsWith("local-")) return;
    await actor.deleteComment(BigInt(commentId));
    queryClient.invalidateQueries({ queryKey: ["posts"] });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col gap-0 max-w-[680px] mx-auto pb-20",
      "data-ocid": "feed.page",
      style: { background: "#F0F2F5" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "rounded-none sm:rounded-lg border-t border-b sm:border bg-white px-3 py-3 mt-0 sm:mt-3",
            style: { boxShadow: "0 1px 2px rgba(0,0,0,0.10)" },
            "data-ocid": "feed.stories.section",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              StoriesRow,
              {
                groups: storyGroups,
                onStoryClick: (idx) => setViewingStoryGroup(idx),
                onAddStory: () => setShowStoryCreator(true),
                isAuthenticated,
                authorName,
                authorSrc
              }
            )
          }
        ),
        isAuthenticated && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          PostComposer,
          {
            authorName,
            authorSrc,
            onOpenCreatePost: () => setShowCreateModal(true),
            onOpenStoryCreator: () => setShowStoryCreator(true)
          }
        ) }),
        isLoading && allPosts.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 space-y-2", "data-ocid": "feed.loading_state", children: [1, 2, 3].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-white rounded-none sm:rounded-lg",
            style: { boxShadow: "0 1px 2px rgba(0,0,0,0.10)" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 p-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-gray-200 animate-pulse flex-shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3.5 rounded bg-gray-200 animate-pulse w-32" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 rounded bg-gray-200 animate-pulse w-20" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-3 pb-3 space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3.5 rounded bg-gray-200 animate-pulse w-full" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3.5 rounded bg-gray-200 animate-pulse w-4/5" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-48 bg-gray-100 animate-pulse" })
            ]
          },
          n
        )) }),
        !isLoading && allPosts.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "mt-4 mx-3 rounded-xl bg-white p-8 flex flex-col items-center text-center",
            style: { boxShadow: "0 1px 2px rgba(0,0,0,0.10)" },
            "data-ocid": "feed.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "w-16 h-16 rounded-full flex items-center justify-center mb-4",
                  style: { background: "#E7F3FF" },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "svg",
                    {
                      width: "32",
                      height: "32",
                      viewBox: "0 0 32 32",
                      fill: "none",
                      "aria-hidden": "true",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "No posts" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "path",
                          {
                            d: "M28 8H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h24a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2Z",
                            fill: "#1877F2",
                            opacity: "0.2"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "path",
                          {
                            d: "M16 13v6M13 16h6",
                            stroke: "#1877F2",
                            strokeWidth: "2",
                            strokeLinecap: "round"
                          }
                        )
                      ]
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-base mb-1", style: { color: "#050505" }, children: "No posts yet" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm mb-4", style: { color: "#65676B" }, children: "Be the first to share something with the community!" }),
              isAuthenticated && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setShowCreateModal(true),
                  "data-ocid": "feed.empty_create_button",
                  className: "px-5 py-2.5 rounded-lg text-sm font-semibold text-white transition-colors hover:opacity-90",
                  style: { background: "#1877F2" },
                  children: "Create Post"
                }
              )
            ]
          }
        ),
        allPosts.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "ul",
          {
            className: "mt-2 flex flex-col gap-2 list-none p-0",
            "data-ocid": "feed.list",
            children: allPosts.map((post, index) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              PostCard,
              {
                post,
                index: index + 1,
                onLike: handleLike,
                onDelete: handleDeletePost,
                onAddComment: handleAddComment,
                onDeleteComment: handleDeleteComment
              }
            ) }, post.id))
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          CreatePostModal,
          {
            isOpen: showCreateModal,
            onClose: () => setShowCreateModal(false),
            onSubmit: handleCreatePost,
            authorName,
            authorSrc
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StoryCreatorModal,
          {
            isOpen: showStoryCreator,
            onClose: () => setShowStoryCreator(false),
            onCreated: () => queryClient.invalidateQueries({ queryKey: ["stories"] }),
            authorName
          }
        ),
        viewingStoryGroup !== null && storyGroups.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
          StoryViewer,
          {
            groups: storyGroups,
            startGroupIndex: viewingStoryGroup,
            onClose: () => setViewingStoryGroup(null)
          }
        )
      ]
    }
  );
}
export {
  FeedPage as default
};
