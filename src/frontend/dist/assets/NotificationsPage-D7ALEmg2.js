import { c as createLucideIcon, u as useAuth, t as useNavigate, v as useNotifications, a as useActor, h as useQueryClient, j as jsxRuntimeExports, B as Bell, L as LogIn, C as CircleCheck, n as MessageCircle, U as UserAvatar, d as createActor } from "./index-DpisiOh5.js";
import { H as Heart } from "./heart-BgYeM2cY.js";
import { U as UserPlus } from "./user-plus-zKonSa2p.js";
import { U as UserCheck } from "./user-check-QDUrpVzF.js";
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
      d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",
      key: "3c2336"
    }
  ],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const BadgeCheck = createLucideIcon("badge-check", __iconNode);
function timeAgo(ts) {
  const diff = Date.now() - Number(ts) / 1e6;
  const m = Math.floor(diff / 6e4);
  if (m < 1) return "Just now";
  if (m < 60) return `${m}m`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h`;
  const d = Math.floor(h / 24);
  if (d < 7) return `${d}d`;
  return `${Math.floor(d / 7)}w`;
}
function isToday(ts) {
  const d = new Date(Number(ts) / 1e6);
  const now = /* @__PURE__ */ new Date();
  return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth() && d.getDate() === now.getDate();
}
function notifMeta(type) {
  switch (type) {
    case "like_post":
      return {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "w-3 h-3", fill: "white" }),
        bgColor: "#F02849"
      };
    case "comment_post":
      return {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-3 h-3", fill: "white", strokeWidth: 0 }),
        bgColor: "#1877F2"
      };
    case "friend_request":
      return {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "w-3 h-3 text-white", strokeWidth: 2 }),
        bgColor: "#1877F2"
      };
    case "friend_accept":
      return {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(UserCheck, { className: "w-3 h-3 text-white", strokeWidth: 2 }),
        bgColor: "#42B72A"
      };
    case "verified_granted":
      return {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(BadgeCheck, { className: "w-3 h-3 text-white", strokeWidth: 2 }),
        bgColor: "#1877F2"
      };
    default:
      return {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "w-3 h-3 text-white", strokeWidth: 2 }),
        bgColor: "#65676B"
      };
  }
}
function getNavTarget(notif) {
  switch (notif.notifType) {
    case "friend_request":
    case "friend_accept":
      return "/friends";
    case "like_post":
    case "comment_post":
      return "/";
    case "verified_granted":
      return "/profile";
    default:
      return "/";
  }
}
function SectionHeader({ label }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 pt-4 pb-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-bold text-lg", style: { color: "#050505" }, children: label }) });
}
function NotifItemSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 px-4 py-2.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-shrink-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "w-14 h-14 rounded-full animate-pulse",
          style: { background: "#E4E6EB" }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full animate-pulse border-2 border-white",
          style: { background: "#E4E6EB" }
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "h-3.5 rounded-full w-4/5 animate-pulse",
          style: { background: "#E4E6EB" }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "h-3 rounded-full w-2/5 animate-pulse",
          style: { background: "#E4E6EB" }
        }
      )
    ] })
  ] });
}
function NotifItem({
  notif,
  index,
  onRead,
  onNavigate
}) {
  const meta = notifMeta(notif.notifType);
  function handleClick() {
    if (!notif.isRead) onRead(notif.id);
    onNavigate(getNavTarget(notif));
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      onClick: handleClick,
      className: "w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors",
      style: {
        background: !notif.isRead ? "#E7F3FF" : "transparent"
      },
      onMouseEnter: (e) => {
        if (notif.isRead)
          e.currentTarget.style.background = "#F2F2F2";
      },
      onMouseLeave: (e) => {
        e.currentTarget.style.background = !notif.isRead ? "#E7F3FF" : "transparent";
      },
      "data-ocid": `notifications.item.${index}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(UserAvatar, { name: notif.actorName, size: "lg" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full flex items-center justify-center border-2 border-white",
              style: { background: meta.bgColor },
              children: meta.icon
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm leading-snug", style: { color: "#050505" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: notif.actorName }),
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#050505" }, children: notif.message })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "text-xs mt-0.5 font-medium",
              style: { color: !notif.isRead ? "#1877F2" : "#65676B" },
              children: timeAgo(notif.createdAt)
            }
          )
        ] }),
        !notif.isRead && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "w-2.5 h-2.5 rounded-full flex-shrink-0",
            style: { background: "#1877F2" }
          }
        )
      ]
    }
  );
}
function FriendRequestActions({
  notif,
  index,
  onAccept,
  onDecline
}) {
  if (notif.notifType !== "friend_request") return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 px-4 pb-2", style: { paddingLeft: "4.75rem" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: onAccept,
        className: "flex-1 py-1.5 rounded-md text-sm font-semibold text-white transition-opacity hover:opacity-90",
        style: { background: "#1877F2" },
        "data-ocid": `notifications.accept_button.${index}`,
        children: "Confirm"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: onDecline,
        className: "flex-1 py-1.5 rounded-md text-sm font-semibold transition-opacity hover:opacity-90",
        style: { background: "#E4E6EB", color: "#050505" },
        "data-ocid": `notifications.decline_button.${index}`,
        children: "Delete"
      }
    )
  ] });
}
function NotificationsPage() {
  const { isAuthenticated, signIn } = useAuth();
  const navigate = useNavigate();
  const { data: notifications = [], isLoading } = useNotifications();
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  const unreadCount = notifications.filter((n) => !n.isRead).length;
  const todayNotifs = notifications.filter((n) => isToday(n.createdAt));
  const earlierNotifs = notifications.filter((n) => !isToday(n.createdAt));
  async function markRead(id) {
    if (!actor) return;
    await actor.markNotificationRead(id);
    qc.invalidateQueries({ queryKey: ["notifications"] });
  }
  async function markAll() {
    if (!actor) return;
    await actor.markAllNotificationsRead();
    qc.invalidateQueries({ queryKey: ["notifications"] });
  }
  function handleNavigate(path) {
    navigate({ to: path });
  }
  function handleAccept(notif) {
    if (!actor || !notif.targetId) return;
    actor.acceptFriendRequest(notif.actorId).then(() => {
      qc.invalidateQueries({ queryKey: ["notifications"] });
      qc.invalidateQueries({ queryKey: ["friends"] });
    });
  }
  function handleDecline(notif) {
    if (!actor) return;
    actor.cancelFriendRequest(notif.actorId).then(() => {
      qc.invalidateQueries({ queryKey: ["notifications"] });
      qc.invalidateQueries({ queryKey: ["friend-requests"] });
    });
  }
  if (!isAuthenticated) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center py-24 gap-5 px-6 min-h-full",
        style: { background: "#F0F2F5" },
        "data-ocid": "notifications.page",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-20 h-20 rounded-full flex items-center justify-center",
              style: { background: "#E4E6EB" },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "w-10 h-10", style: { color: "#65676B" } })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold mb-1", style: { color: "#050505" }, children: "Sign in to see notifications" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", style: { color: "#65676B" }, children: "You'll see likes, comments, and friend requests here." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: signIn,
              className: "px-8 py-2.5 rounded-md font-semibold text-sm text-white flex items-center gap-2 transition-opacity hover:opacity-90",
              style: { background: "#1877F2" },
              "data-ocid": "notifications.signin_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "w-4 h-4" }),
                "Sign In"
              ]
            }
          )
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-full",
      style: { background: "#FFFFFF" },
      "data-ocid": "notifications.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "sticky top-0 z-10 border-b",
            style: { background: "#FFFFFF", borderColor: "#CED0D4" },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 py-3.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-bold text-2xl", style: { color: "#050505" }, children: "Notifications" }),
                unreadCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs mt-0.5", style: { color: "#65676B" }, children: [
                  unreadCount,
                  " new"
                ] })
              ] }),
              unreadCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: markAll,
                  className: "text-sm font-semibold px-3 py-1.5 rounded-md transition-colors hover:opacity-90",
                  style: { color: "#1877F2" },
                  "data-ocid": "notifications.mark_all_read_button",
                  children: "Mark all as read"
                }
              )
            ] })
          }
        ),
        isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "notifications.loading_state", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { label: "New" }),
          [1, 2, 3].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(NotifItemSkeleton, {}, k)),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { label: "Earlier" }),
          [4, 5, 6].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(NotifItemSkeleton, {}, k))
        ] }) : notifications.length === 0 ? (
          /* Empty state */
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex flex-col items-center justify-center py-20 gap-4 px-6",
              "data-ocid": "notifications.empty_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "w-24 h-24 rounded-full flex items-center justify-center",
                    style: { background: "#F0F2F5" },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Bell,
                      {
                        className: "w-12 h-12",
                        style: { color: "#BEC3C9" },
                        strokeWidth: 1.25
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-lg mb-1", style: { color: "#050505" }, children: "No notifications yet" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "text-sm leading-relaxed max-w-xs",
                      style: { color: "#65676B" },
                      children: "When someone likes your posts, comments, or sends a friend request, you'll see it here."
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 mt-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4", style: { color: "#BEC3C9" } }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "w-4 h-4", style: { color: "#BEC3C9" } }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-4 h-4", style: { color: "#BEC3C9" } }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "w-4 h-4", style: { color: "#BEC3C9" } })
                ] })
              ]
            }
          )
        ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "notifications.list", children: [
          todayNotifs.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "notifications.today_section", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { label: "New" }),
            todayNotifs.map((notif, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                NotifItem,
                {
                  notif,
                  index: i + 1,
                  onRead: markRead,
                  onNavigate: handleNavigate
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                FriendRequestActions,
                {
                  notif,
                  index: i + 1,
                  onAccept: () => handleAccept(notif),
                  onDecline: () => handleDecline(notif)
                }
              )
            ] }, String(notif.id)))
          ] }),
          earlierNotifs.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "notifications.earlier_section", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { label: "Earlier" }),
            earlierNotifs.map((notif, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                NotifItem,
                {
                  notif,
                  index: todayNotifs.length + i + 1,
                  onRead: markRead,
                  onNavigate: handleNavigate
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                FriendRequestActions,
                {
                  notif,
                  index: todayNotifs.length + i + 1,
                  onAccept: () => handleAccept(notif),
                  onDecline: () => handleDecline(notif)
                }
              )
            ] }, String(notif.id)))
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4" })
        ] })
      ]
    }
  );
}
export {
  NotificationsPage as default
};
