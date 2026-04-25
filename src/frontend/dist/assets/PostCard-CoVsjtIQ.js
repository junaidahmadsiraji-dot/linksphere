import { c as createLucideIcon, u as useAuth, r as reactExports, j as jsxRuntimeExports, U as UserAvatar, z as Flag, n as MessageCircle, b as ue } from "./index-DpisiOh5.js";
import { T as Trash2 } from "./trash-2-ZUW3Dj86.js";
import { V as VerifiedBadge, S as Share2 } from "./VerifiedBadge-BXLXTE2F.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  [
    "path",
    {
      d: "M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z",
      key: "1tc9qg"
    }
  ],
  ["circle", { cx: "12", cy: "13", r: "3", key: "1vg3eu" }]
];
const Camera = createLucideIcon("camera", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["circle", { cx: "12", cy: "12", r: "1", key: "41hilf" }],
  ["circle", { cx: "19", cy: "12", r: "1", key: "1wjl8i" }],
  ["circle", { cx: "5", cy: "12", r: "1", key: "1pcz8c" }]
];
const Ellipsis = createLucideIcon("ellipsis", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
      key: "1r0f0z"
    }
  ],
  ["circle", { cx: "12", cy: "10", r: "3", key: "ilqhr7" }]
];
const MapPin = createLucideIcon("map-pin", __iconNode$2);
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
      d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
      key: "1ffxy3"
    }
  ],
  ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }]
];
const Send = createLucideIcon("send", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M7 10v12", key: "1qc93n" }],
  [
    "path",
    {
      d: "M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z",
      key: "emmmcr"
    }
  ]
];
const ThumbsUp = createLucideIcon("thumbs-up", __iconNode);
function CommentSection({
  postId,
  comments,
  onAddComment,
  onDeleteComment
}) {
  const { isAuthenticated } = useAuth();
  const [inputText, setInputText] = reactExports.useState("");
  const [isSubmitting, setIsSubmitting] = reactExports.useState(false);
  const [deletingId, setDeletingId] = reactExports.useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputText.trim() || isSubmitting) return;
    setIsSubmitting(true);
    try {
      await onAddComment(inputText.trim());
      setInputText("");
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleDelete = async (commentId) => {
    setDeletingId(commentId);
    try {
      await onDeleteComment(commentId);
    } finally {
      setDeletingId(null);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "border-t border-border/50 bg-muted/30 px-4 py-3 space-y-3",
      "data-ocid": `feed.comments.${postId}`,
      children: [
        comments.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2.5", "data-ocid": `feed.comment_list.${postId}`, children: comments.map((comment, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex gap-2.5 items-start group",
            "data-ocid": `feed.comment.${index + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(UserAvatar, { name: comment.authorName, size: "sm" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-xl px-3 py-2 inline-block max-w-full", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-foreground font-display", children: comment.authorName }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground break-words", children: comment.text })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1 ml-1", children: comment.time })
              ] }),
              comment.isOwn && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => handleDelete(comment.id),
                  disabled: deletingId === comment.id,
                  "data-ocid": `feed.delete_comment_button.${index + 1}`,
                  className: "opacity-0 group-hover:opacity-100 p-1.5 rounded-full text-destructive hover:bg-destructive/10 transition-smooth disabled:opacity-40 mt-1 flex-shrink-0",
                  "aria-label": "Delete comment",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" })
                }
              )
            ]
          },
          comment.id
        )) }),
        isAuthenticated && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "form",
          {
            onSubmit: handleSubmit,
            className: "flex gap-2 items-center",
            "data-ocid": `feed.comment_form.${postId}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 relative", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "text",
                  value: inputText,
                  onChange: (e) => setInputText(e.target.value),
                  placeholder: "Write a comment...",
                  disabled: isSubmitting,
                  "data-ocid": `feed.comment_input.${postId}`,
                  className: "w-full bg-card border border-input rounded-full px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-smooth disabled:opacity-60"
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "submit",
                  disabled: !inputText.trim() || isSubmitting,
                  "data-ocid": `feed.comment_submit.${postId}`,
                  className: "w-9 h-9 rounded-full gradient-primary flex items-center justify-center text-primary-foreground disabled:opacity-40 transition-smooth hover:opacity-90 flex-shrink-0",
                  "aria-label": "Send comment",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "w-3.5 h-3.5" })
                }
              )
            ]
          }
        ),
        !isAuthenticated && comments.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: "text-xs text-muted-foreground text-center py-1",
            "data-ocid": `feed.comments_empty.${postId}`,
            children: "Sign in to join the conversation"
          }
        )
      ]
    }
  );
}
function PostCard({
  post,
  onLike,
  onDelete,
  onAddComment,
  onDeleteComment,
  index
}) {
  const { isAuthenticated } = useAuth();
  const [liked, setLiked] = reactExports.useState(post.liked);
  const [likeCount, setLikeCount] = reactExports.useState(post.likeCount);
  const [commentCount, setCommentCount] = reactExports.useState(post.commentCount);
  const [showComments, setShowComments] = reactExports.useState(false);
  const [showMenu, setShowMenu] = reactExports.useState(false);
  const [isLiking, setIsLiking] = reactExports.useState(false);
  const [isDeleting, setIsDeleting] = reactExports.useState(false);
  const [comments, setComments] = reactExports.useState(
    post.sampleComments ?? []
  );
  const menuRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (!showMenu) return;
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [showMenu]);
  const handleLike = async () => {
    if (!isAuthenticated || isLiking) return;
    setIsLiking(true);
    const newLiked = !liked;
    setLiked(newLiked);
    setLikeCount((prev) => newLiked ? prev + 1 : Math.max(0, prev - 1));
    try {
      await (onLike == null ? void 0 : onLike(post.id));
    } catch {
      setLiked(!newLiked);
      setLikeCount((prev) => newLiked ? Math.max(0, prev - 1) : prev + 1);
    } finally {
      setIsLiking(false);
    }
  };
  const handleDelete = async () => {
    if (isDeleting) return;
    setIsDeleting(true);
    setShowMenu(false);
    try {
      await (onDelete == null ? void 0 : onDelete(post.id));
    } finally {
      setIsDeleting(false);
    }
  };
  const handleReport = () => {
    setShowMenu(false);
    ue.info("Post reported. Our team will review it.", { duration: 4e3 });
  };
  const handleAddComment = async (text) => {
    await (onAddComment == null ? void 0 : onAddComment(post.id, text));
    const newComment = {
      id: `local-${Date.now()}`,
      authorName: "You",
      authorInitials: "YO",
      text,
      time: "Just now",
      isOwn: true
    };
    setComments((prev) => [...prev, newComment]);
    setCommentCount((prev) => prev + 1);
  };
  const handleDeleteComment = async (commentId) => {
    await (onDeleteComment == null ? void 0 : onDeleteComment(post.id, commentId));
    setComments((prev) => prev.filter((c) => c.id !== commentId));
    setCommentCount((prev) => Math.max(0, prev - 1));
  };
  const handleShare = async () => {
    var _a;
    const url = `${window.location.origin}/?post=${post.id}`;
    const shareData = {
      title: `Post by ${post.authorName}`,
      text: post.text.slice(0, 120),
      url
    };
    if (navigator.share && ((_a = navigator.canShare) == null ? void 0 : _a.call(navigator, shareData))) {
      try {
        await navigator.share(shareData);
      } catch {
      }
    } else {
      await navigator.clipboard.writeText(url);
      ue.success("Link copied to clipboard!");
    }
  };
  const initials = post.authorName.slice(0, 2).toUpperCase();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "article",
    {
      className: "bg-white rounded-none sm:rounded-lg overflow-hidden",
      style: { boxShadow: "0 1px 2px rgba(0,0,0,0.10)" },
      "data-ocid": `feed.post.item.${index}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-3 pt-3 pb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-10 h-10 rounded-full flex-shrink-0 overflow-hidden flex items-center justify-center font-bold text-white text-sm",
              style: { background: "#1877F2" },
              children: post.authorSrc ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: post.authorSrc,
                  alt: post.authorName,
                  className: "w-full h-full object-cover"
                }
              ) : initials
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "font-bold text-sm leading-tight",
                  style: { color: "#050505" },
                  children: post.authorName
                }
              ),
              post.authorIsVerified && /* @__PURE__ */ jsxRuntimeExports.jsx(VerifiedBadge, { size: "xs" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs", style: { color: "#65676B" }, children: post.time })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", ref: menuRef, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setShowMenu((prev) => !prev),
                "data-ocid": `feed.post_menu.${index}`,
                className: "w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:bg-gray-100",
                "aria-label": "Post options",
                style: { color: "#65676B" },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Ellipsis, { className: "w-5 h-5" })
              }
            ),
            showMenu && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "absolute right-0 top-10 z-20 bg-white rounded-xl py-2 min-w-[200px]",
                style: {
                  boxShadow: "0 2px 12px rgba(0,0,0,0.18)",
                  border: "1px solid #E4E6EB"
                },
                "data-ocid": `feed.post_menu_dropdown.${index}`,
                children: post.isOwn ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: handleDelete,
                    disabled: isDeleting,
                    "data-ocid": `feed.delete_post_button.${index}`,
                    className: "flex items-center gap-3 w-full px-4 py-2.5 text-sm font-medium transition-colors hover:bg-gray-100 disabled:opacity-50",
                    style: { color: "#D93025" },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" }),
                      isDeleting ? "Deleting…" : "Delete post"
                    ]
                  }
                ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: handleReport,
                    "data-ocid": `feed.report_post_button.${index}`,
                    className: "flex items-center gap-3 w-full px-4 py-2.5 text-sm font-medium transition-colors hover:bg-gray-100",
                    style: { color: "#050505" },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Flag, { className: "w-4 h-4" }),
                      "Report post"
                    ]
                  }
                )
              }
            )
          ] })
        ] }),
        post.text && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-3 pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: "text-[15px] leading-relaxed",
            style: { color: "#050505" },
            children: post.text
          }
        ) }),
        post.imageSrc && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "w-full border-t border-b",
            style: { borderColor: "#E4E6EB" },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: post.imageSrc,
                alt: post.imageCaption ?? "Post image",
                className: "w-full object-cover",
                style: { maxHeight: 500 }
              }
            )
          }
        ),
        (likeCount > 0 || commentCount > 0) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-3 py-2", children: [
          likeCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "w-5 h-5 rounded-full flex items-center justify-center",
                style: { background: "#1877F2" },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(ThumbsUp, { className: "w-2.5 h-2.5 text-white", fill: "white" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", style: { color: "#65676B" }, children: likeCount })
          ] }),
          commentCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => setShowComments((prev) => !prev),
              className: "text-sm transition-colors hover:underline ml-auto",
              style: { color: "#65676B" },
              children: [
                commentCount,
                " comment",
                commentCount !== 1 ? "s" : ""
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center border-t mx-3",
            style: { borderColor: "#E4E6EB" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: handleLike,
                  disabled: !isAuthenticated,
                  "data-ocid": `feed.like_button.${index}`,
                  className: "flex flex-1 items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-colors hover:bg-gray-100 disabled:cursor-default",
                  style: { color: liked ? "#1877F2" : "#65676B" },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      ThumbsUp,
                      {
                        className: "w-[18px] h-[18px]",
                        fill: liked ? "#1877F2" : "none",
                        strokeWidth: liked ? 0 : 2
                      }
                    ),
                    "Like"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => setShowComments((prev) => !prev),
                  "data-ocid": `feed.comment_button.${index}`,
                  className: "flex flex-1 items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-colors hover:bg-gray-100",
                  style: { color: "#65676B" },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-[18px] h-[18px]" }),
                    "Comment"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: handleShare,
                  "data-ocid": `feed.share_button.${index}`,
                  className: "flex flex-1 items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-colors hover:bg-gray-100",
                  style: { color: "#65676B" },
                  "aria-label": "Share post",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "w-[18px] h-[18px]" }),
                    "Share"
                  ]
                }
              )
            ]
          }
        ),
        showComments && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t mx-0", style: { borderColor: "#E4E6EB" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          CommentSection,
          {
            postId: post.id,
            comments,
            onAddComment: handleAddComment,
            onDeleteComment: handleDeleteComment
          }
        ) })
      ]
    }
  );
}
export {
  Camera as C,
  MapPin as M,
  PostCard as P
};
