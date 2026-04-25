import { c as createLucideIcon, a as useActor, N as useAdminAuth, r as reactExports, b as ue, j as jsxRuntimeExports, S as Search, x as FileText, d as createActor } from "./index-DpisiOh5.js";
import { T as TriangleAlert } from "./triangle-alert-DA-oaQjO.js";
import { I as Image } from "./image-DeZrnu5x.js";
import { T as Trash2 } from "./trash-2-ZUW3Dj86.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M21.801 10A10 10 0 1 1 17 3.335", key: "yps3ct" }],
  ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }]
];
const CircleCheckBig = createLucideIcon("circle-check-big", __iconNode);
var ModerationAction = /* @__PURE__ */ ((ModerationAction2) => {
  ModerationAction2["approve"] = "approve";
  ModerationAction2["delete_"] = "delete";
  return ModerationAction2;
})(ModerationAction || {});
function AdminPostsPage() {
  const { actor } = useActor(createActor);
  const { adminToken } = useAdminAuth();
  const [posts, setPosts] = reactExports.useState([]);
  const [isLoading, setIsLoading] = reactExports.useState(true);
  const [search, setSearch] = reactExports.useState("");
  const [confirm, setConfirm] = reactExports.useState(null);
  const [actionLoading, setActionLoading] = reactExports.useState(null);
  const loadPosts = reactExports.useCallback(async () => {
    if (!actor || !adminToken) return;
    setIsLoading(true);
    try {
      const result = await actor.getFlaggedPosts(adminToken);
      setPosts(result);
    } catch {
      ue.error("Failed to load flagged posts");
    } finally {
      setIsLoading(false);
    }
  }, [actor, adminToken]);
  reactExports.useEffect(() => {
    loadPosts();
  }, [loadPosts]);
  const filtered = posts.filter(
    (p) => p.authorName.toLowerCase().includes(search.toLowerCase()) || p.text.toLowerCase().includes(search.toLowerCase())
  );
  async function executeModeration(dialog) {
    if (!actor || !adminToken) return;
    setActionLoading(dialog.postId);
    try {
      const action = dialog.action === "approve" ? ModerationAction.approve : ModerationAction.delete_;
      await actor.moderatePost(adminToken, dialog.postId, action);
      ue.success(
        dialog.action === "approve" ? `Post by @${dialog.author} approved` : `Post by @${dialog.author} deleted`
      );
      await loadPosts();
    } catch {
      ue.error("Moderation action failed");
    } finally {
      setActionLoading(null);
      setConfirm(null);
    }
  }
  function flagSeverity(count) {
    const n = Number(count);
    if (n >= 10)
      return { bg: "oklch(0.65 0.19 22 / 0.25)", text: "oklch(0.82 0.18 22)" };
    if (n >= 5)
      return { bg: "oklch(0.65 0.19 22 / 0.15)", text: "oklch(0.75 0.15 22)" };
    return { bg: "oklch(0.65 0.19 22 / 0.08)", text: "oklch(0.65 0.14 22)" };
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", "data-ocid": "admin.posts.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "h1",
          {
            className: "text-xl font-bold",
            style: {
              color: "oklch(0.93 0.01 282)",
              fontFamily: "var(--font-display)"
            },
            children: "Post Moderation"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: "text-sm mt-0.5",
            style: { color: "oklch(0.64 0.01 282)" },
            children: isLoading ? "Loading…" : `${posts.length} flagged posts awaiting review`
          }
        )
      ] }),
      posts.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "span",
        {
          className: "flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full font-medium",
          style: {
            background: "oklch(0.65 0.19 22 / 0.15)",
            color: "oklch(0.75 0.15 22)"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-3.5 h-3.5" }),
            posts.length,
            " pending"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Search,
        {
          className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4",
          style: { color: "oklch(0.54 0.01 282)" }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "text",
          placeholder: "Search flagged posts by author or content...",
          value: search,
          onChange: (e) => setSearch(e.target.value),
          className: "w-full pl-10 pr-4 py-2.5 rounded-xl text-sm outline-none",
          style: {
            background: "oklch(0.15 0.01 282)",
            border: "1px solid oklch(0.2 0.008 282)",
            color: "oklch(0.93 0.01 282)"
          },
          "data-ocid": "admin.posts.search_input"
        }
      )
    ] }),
    isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "py-16 flex flex-col items-center gap-3",
        "data-ocid": "admin.posts.loading_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-8 h-8 rounded-full border-2 border-t-transparent animate-spin",
              style: {
                borderColor: "oklch(0.72 0.26 180)",
                borderTopColor: "transparent"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", style: { color: "oklch(0.54 0.01 282)" }, children: "Loading flagged posts…" })
        ]
      }
    ),
    !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      filtered.map((post, idx) => {
        var _a;
        const severity = flagSeverity(post.flagCount);
        const isActing = actionLoading === post.id;
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "rounded-xl p-4",
            "data-ocid": `admin.posts.item.${idx + 1}`,
            style: {
              background: "oklch(0.15 0.01 282)",
              border: "1px solid oklch(0.2 0.008 282)",
              opacity: isActing ? 0.6 : 1,
              transition: "opacity 0.2s"
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5",
                  style: {
                    background: "oklch(0.62 0.22 260 / 0.2)",
                    color: "oklch(0.72 0.26 180)"
                  },
                  children: ((_a = post.authorName[0]) == null ? void 0 : _a.toUpperCase()) ?? "?"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1.5 flex-wrap", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      className: "text-sm font-medium",
                      style: { color: "oklch(0.84 0.01 282)" },
                      children: [
                        "@",
                        post.authorName
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "text-xs",
                      style: { color: "oklch(0.48 0.01 282)" },
                      children: new Date(
                        Number(post.createdAt / 1000000n)
                      ).toLocaleDateString()
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      className: "flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-semibold",
                      style: {
                        background: severity.bg,
                        color: severity.text
                      },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-3 h-3" }),
                        String(post.flagCount),
                        " flags"
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-sm line-clamp-2 mb-2",
                    style: { color: "oklch(0.74 0.01 282)" },
                    children: post.text
                  }
                ),
                post.image && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "inline-flex items-center gap-1.5 text-xs px-2 py-1 rounded-lg mb-2",
                    style: {
                      background: "oklch(0.62 0.22 260 / 0.1)",
                      color: "oklch(0.72 0.22 260)"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "w-3 h-3" }),
                      "Has image attachment"
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-shrink-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    disabled: isActing,
                    onClick: () => setConfirm({
                      postId: post.id,
                      action: "approve",
                      author: post.authorName
                    }),
                    className: "flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-smooth font-medium",
                    style: {
                      background: "oklch(0.68 0.22 150 / 0.15)",
                      color: "oklch(0.72 0.22 150)"
                    },
                    "data-ocid": `admin.posts.approve_button.${idx + 1}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-3.5 h-3.5" }),
                      "Approve"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    disabled: isActing,
                    onClick: () => setConfirm({
                      postId: post.id,
                      action: "delete",
                      author: post.authorName
                    }),
                    className: "flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-smooth font-medium",
                    style: {
                      background: "oklch(0.65 0.19 22 / 0.15)",
                      color: "oklch(0.75 0.15 22)"
                    },
                    "data-ocid": `admin.posts.delete_button.${idx + 1}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" }),
                      "Delete"
                    ]
                  }
                )
              ] })
            ] })
          },
          String(post.id)
        );
      }),
      filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "py-16 text-center rounded-xl",
          "data-ocid": "admin.posts.empty_state",
          style: {
            background: "oklch(0.15 0.01 282)",
            border: "1px solid oklch(0.2 0.008 282)"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              FileText,
              {
                className: "w-10 h-10 mx-auto mb-3 opacity-30",
                style: { color: "oklch(0.64 0.01 282)" }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "font-medium text-sm",
                style: { color: "oklch(0.74 0.01 282)" },
                children: search ? "No matching flagged posts" : "No flagged posts — all clear!"
              }
            ),
            !search && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-xs mt-1",
                style: { color: "oklch(0.44 0.01 282)" },
                children: "The moderation queue is empty"
              }
            )
          ]
        }
      )
    ] }),
    confirm && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "fixed inset-0 z-50 flex items-center justify-center p-4",
        style: { background: "rgba(0,0,0,0.7)" },
        "data-ocid": "admin.posts.dialog",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "w-full max-w-sm rounded-2xl p-6",
            style: {
              background: "oklch(0.17 0.01 282)",
              border: "1px solid oklch(0.25 0.008 282)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "h3",
                {
                  className: "font-semibold mb-2",
                  style: { color: "oklch(0.93 0.01 282)" },
                  children: confirm.action === "approve" ? "Approve Post" : "Delete Post"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-sm mb-5",
                  style: { color: "oklch(0.64 0.01 282)" },
                  children: confirm.action === "approve" ? `This will clear all flags and approve the post by @${confirm.author}.` : `This will permanently delete the post by @${confirm.author}. This cannot be undone.`
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setConfirm(null),
                    className: "flex-1 py-2 rounded-xl text-sm font-medium",
                    style: {
                      background: "oklch(0.22 0.008 282)",
                      color: "oklch(0.74 0.01 282)"
                    },
                    "data-ocid": "admin.posts.cancel_button",
                    children: "Cancel"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => executeModeration(confirm),
                    className: "flex-1 py-2 rounded-xl text-sm font-medium",
                    style: {
                      background: confirm.action === "delete" ? "oklch(0.65 0.19 22)" : "linear-gradient(135deg, oklch(0.62 0.22 260) 0%, oklch(0.72 0.26 180) 100%)",
                      color: "oklch(0.11 0.008 282)"
                    },
                    "data-ocid": "admin.posts.confirm_button",
                    children: confirm.action === "approve" ? "Approve" : "Delete"
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
  AdminPostsPage as default
};
