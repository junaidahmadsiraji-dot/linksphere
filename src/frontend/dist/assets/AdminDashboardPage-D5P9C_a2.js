import { c as createLucideIcon, a as useActor, t as useNavigate, r as reactExports, j as jsxRuntimeExports, s as Users, x as FileText, B as Bell, O as Link, P as Settings, d as createActor } from "./index-DpisiOh5.js";
import { P as Package } from "./package-C1uwMONI.js";
import { F as FolderOpen } from "./folder-open-QAGqWaXb.js";
import { C as ChartNoAxesColumn, T as TrendingUp } from "./trending-up-DsEzAdkM.js";
import { E as Eye } from "./eye-B3NM6Osf.js";
import { T as TriangleAlert } from "./triangle-alert-DA-oaQjO.js";
import { U as UserX } from "./user-x-C-9U_jXx.js";
import { U as UserCheck } from "./user-check-QDUrpVzF.js";
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
      d: "M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",
      key: "169zse"
    }
  ]
];
const Activity = createLucideIcon("activity", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]];
const ChevronRight = createLucideIcon("chevron-right", __iconNode$1);
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
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const ShieldCheck = createLucideIcon("shield-check", __iconNode);
const SAMPLE_STATS = {
  totalUsers: 1284,
  totalPosts: 8471,
  totalProducts: 342,
  totalFiles: 97
};
const SAMPLE_SECONDARY = {
  flaggedPosts: 14,
  verifiedUsers: 38,
  bannedUsers: 12,
  notifications: 6
};
const RECENT_ACTIVITY = [
  {
    id: "1",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(UserCheck, { className: "w-4 h-4" }),
    text: "New user registered: Rafiq Ahmed",
    time: "2 min ago",
    type: "user"
  },
  {
    id: "2",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-4 h-4" }),
    text: "Post flagged for review: 'Breaking news...'",
    time: "15 min ago",
    type: "flag"
  },
  {
    id: "3",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-4 h-4" }),
    text: "Verified tick granted to @tech_bd",
    time: "1 hr ago",
    type: "verified"
  },
  {
    id: "4",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-4 h-4" }),
    text: "New product added: Samsung Galaxy S25",
    time: "3 hr ago",
    type: "product"
  },
  {
    id: "5",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FolderOpen, { className: "w-4 h-4" }),
    text: "PDF uploaded: HSC Chemistry Guide 2026",
    time: "5 hr ago",
    type: "file"
  },
  {
    id: "6",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(UserX, { className: "w-4 h-4" }),
    text: "User banned for spam: @spammer99",
    time: "Yesterday",
    type: "user"
  }
];
function getActivityColor(type) {
  switch (type) {
    case "user":
      return "oklch(0.68 0.22 260)";
    case "post":
      return "oklch(0.72 0.24 300)";
    case "product":
      return "oklch(0.68 0.26 180)";
    case "file":
      return "oklch(0.72 0.22 150)";
    case "verified":
      return "oklch(0.72 0.26 220)";
    case "flag":
      return "oklch(0.65 0.19 22)";
  }
}
const QUICK_ACTIONS = [
  {
    label: "Manage Users",
    description: "Ban, verify, view profiles",
    to: "/admin/users",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-5 h-5" }),
    accent: "oklch(0.62 0.22 260)",
    ocid: "admin.dashboard.users_button"
  },
  {
    label: "Moderate Posts",
    description: "Review flagged content",
    to: "/admin/posts",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-5 h-5" }),
    accent: "oklch(0.72 0.26 180)",
    ocid: "admin.dashboard.posts_button"
  },
  {
    label: "Verified Badges",
    description: "Grant or revoke tick marks",
    to: "/admin/verified",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-5 h-5" }),
    accent: "oklch(0.68 0.22 150)",
    ocid: "admin.dashboard.verified_button"
  },
  {
    label: "Products & Files",
    description: "Upload and manage content",
    to: "/admin/products",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-5 h-5" }),
    accent: "oklch(0.65 0.22 28)",
    ocid: "admin.dashboard.content_button"
  }
];
function AdminDashboardPage() {
  const { actor } = useActor(createActor);
  const navigate = useNavigate();
  const [stats, setStats] = reactExports.useState(SAMPLE_STATS);
  const [isLoadingStats, setIsLoadingStats] = reactExports.useState(true);
  reactExports.useEffect(() => {
    const token = localStorage.getItem("siraji_admin_token");
    if (!token) {
      navigate({ to: "/admin/login" });
    }
  }, [navigate]);
  reactExports.useEffect(() => {
    async function loadStats() {
      try {
        const token = localStorage.getItem("siraji_admin_token");
        if (!actor || !token) return;
        const result = await actor.getAdminStats(token);
        if (result) {
          setStats({
            totalUsers: Number(result.totalUsers),
            totalPosts: Number(result.totalPosts),
            totalProducts: Number(result.totalProducts),
            totalFiles: Number(result.totalFiles)
          });
        }
      } catch {
      } finally {
        setIsLoadingStats(false);
      }
    }
    loadStats();
  }, [actor]);
  const statCards = [
    {
      label: "Total Users",
      value: stats.totalUsers.toLocaleString(),
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-5 h-5" }),
      accent: "oklch(0.62 0.22 260)",
      trend: "+12% this week",
      ocid: "admin.dashboard.stat.users"
    },
    {
      label: "Total Posts",
      value: stats.totalPosts.toLocaleString(),
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-5 h-5" }),
      accent: "oklch(0.72 0.26 180)",
      trend: "+340 today",
      ocid: "admin.dashboard.stat.posts"
    },
    {
      label: "Total Products",
      value: stats.totalProducts.toLocaleString(),
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-5 h-5" }),
      accent: "oklch(0.65 0.22 28)",
      trend: "+8 this week",
      ocid: "admin.dashboard.stat.products"
    },
    {
      label: "Total Files",
      value: stats.totalFiles.toLocaleString(),
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FolderOpen, { className: "w-5 h-5" }),
      accent: "oklch(0.68 0.22 150)",
      trend: "+3 this week",
      ocid: "admin.dashboard.stat.files"
    }
  ];
  const secondaryStats = [
    {
      label: "Flagged Posts",
      value: SAMPLE_SECONDARY.flaggedPosts,
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-4 h-4" }),
      accent: "oklch(0.65 0.19 22)",
      ocid: "admin.dashboard.stat.flagged"
    },
    {
      label: "Verified Users",
      value: SAMPLE_SECONDARY.verifiedUsers,
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-4 h-4" }),
      accent: "oklch(0.68 0.22 220)",
      ocid: "admin.dashboard.stat.verified"
    },
    {
      label: "Banned Users",
      value: SAMPLE_SECONDARY.bannedUsers,
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(UserX, { className: "w-4 h-4" }),
      accent: "oklch(0.65 0.2 22)",
      ocid: "admin.dashboard.stat.banned"
    },
    {
      label: "Notifications",
      value: SAMPLE_SECONDARY.notifications,
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "w-4 h-4" }),
      accent: "oklch(0.72 0.25 120)",
      ocid: "admin.dashboard.stat.notifications"
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "admin-dark min-h-screen",
      style: { background: "oklch(0.11 0.008 282)" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "sticky top-0 z-30 px-6 py-4 flex items-center justify-between",
            style: {
              background: "oklch(0.14 0.008 282)",
              borderBottom: "1px solid oklch(0.2 0.008 282)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "h1",
                  {
                    className: "text-xl font-bold",
                    style: {
                      color: "oklch(0.93 0.01 282)",
                      fontFamily: "var(--font-display)"
                    },
                    children: "Dashboard Overview"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-xs mt-0.5",
                    style: { color: "oklch(0.64 0.01 282)" },
                    children: "Saturday, 25 April 2026"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    className: "relative p-2 rounded-lg transition-smooth",
                    style: {
                      background: "oklch(0.2 0.008 282)",
                      color: "oklch(0.84 0.01 282)"
                    },
                    "aria-label": "Notifications",
                    "data-ocid": "admin.dashboard.notifications_button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "w-5 h-5" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "absolute -top-1 -right-1 w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center",
                          style: {
                            background: "oklch(0.65 0.19 22)",
                            color: "oklch(0.98 0 0)"
                          },
                          children: SAMPLE_SECONDARY.notifications
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Link,
                  {
                    to: "/admin",
                    className: "p-2 rounded-lg transition-smooth",
                    style: {
                      background: "oklch(0.2 0.008 282)",
                      color: "oklch(0.84 0.01 282)"
                    },
                    "aria-label": "Settings",
                    "data-ocid": "admin.dashboard.settings_button",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "w-5 h-5" })
                  }
                )
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 max-w-7xl mx-auto space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "rounded-2xl p-6 relative overflow-hidden",
              style: {
                background: "linear-gradient(135deg, oklch(0.62 0.22 260 / 0.2) 0%, oklch(0.72 0.26 180 / 0.15) 100%)",
                border: "1px solid oklch(0.62 0.22 260 / 0.3)"
              },
              "data-ocid": "admin.dashboard.welcome_banner",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Activity,
                      {
                        className: "w-4 h-4",
                        style: { color: "oklch(0.72 0.26 180)" }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "text-xs font-medium",
                        style: { color: "oklch(0.72 0.26 180)" },
                        children: "LIVE SYSTEM STATUS"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "w-2 h-2 rounded-full animate-pulse",
                        style: { background: "oklch(0.68 0.22 150)" }
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "h2",
                    {
                      className: "text-lg font-bold",
                      style: {
                        color: "oklch(0.93 0.01 282)",
                        fontFamily: "var(--font-display)"
                      },
                      children: "Welcome back, Admin"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "p",
                    {
                      className: "text-sm mt-0.5",
                      style: { color: "oklch(0.74 0.01 282)" },
                      children: [
                        "LinkSphere is running smoothly. ",
                        SAMPLE_SECONDARY.flaggedPosts,
                        " ",
                        "posts require review."
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute right-6 top-1/2 -translate-y-1/2 opacity-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  ChartNoAxesColumn,
                  {
                    className: "w-24 h-24",
                    style: { color: "oklch(0.72 0.26 180)" }
                  }
                ) })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "grid grid-cols-2 lg:grid-cols-4 gap-4",
              "data-ocid": "admin.dashboard.stats_section",
              children: statCards.map((card) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "stat-card admin-dark",
                  "data-ocid": card.ocid,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "p-2 rounded-lg",
                          style: { background: `${card.accent}22`, color: card.accent },
                          children: card.icon
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        TrendingUp,
                        {
                          className: "w-3.5 h-3.5",
                          style: { color: "oklch(0.68 0.22 150)" }
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "text-2xl font-bold",
                          style: {
                            color: isLoadingStats ? "oklch(0.28 0.008 282)" : "oklch(0.93 0.01 282)",
                            fontFamily: "var(--font-display)",
                            transition: "color 0.3s"
                          },
                          children: isLoadingStats ? "—" : card.value
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "text-xs mt-0.5",
                          style: { color: "oklch(0.64 0.01 282)" },
                          children: card.label
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "text-xs mt-1",
                          style: { color: "oklch(0.68 0.22 150)" },
                          children: card.trend
                        }
                      )
                    ] })
                  ]
                },
                card.label
              ))
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-3", children: secondaryStats.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "rounded-xl px-4 py-3 flex items-center gap-3",
              style: {
                background: "oklch(0.15 0.01 282)",
                border: "1px solid oklch(0.2 0.008 282)"
              },
              "data-ocid": s.ocid,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "p-1.5 rounded-lg",
                    style: { background: `${s.accent}22`, color: s.accent },
                    children: s.icon
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "font-bold text-base",
                      style: { color: "oklch(0.93 0.01 282)" },
                      children: s.value
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "text-xs",
                      style: { color: "oklch(0.64 0.01 282)" },
                      children: s.label
                    }
                  )
                ] })
              ]
            },
            s.label
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "rounded-2xl overflow-hidden",
                style: {
                  background: "oklch(0.15 0.01 282)",
                  border: "1px solid oklch(0.2 0.008 282)"
                },
                "data-ocid": "admin.dashboard.quick_actions_section",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "px-5 py-4 border-b",
                      style: { borderColor: "oklch(0.2 0.008 282)" },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "h3",
                          {
                            className: "font-semibold text-sm",
                            style: {
                              color: "oklch(0.84 0.01 282)",
                              fontFamily: "var(--font-display)"
                            },
                            children: "Quick Actions"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "p",
                          {
                            className: "text-xs mt-0.5",
                            style: { color: "oklch(0.54 0.01 282)" },
                            children: "Jump to management sections"
                          }
                        )
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 space-y-2", children: QUICK_ACTIONS.map((action) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Link,
                    {
                      to: action.to,
                      className: "flex items-center gap-4 p-3 rounded-xl transition-smooth group",
                      style: { color: "oklch(0.84 0.01 282)" },
                      onMouseEnter: (e) => {
                        e.currentTarget.style.background = "oklch(0.2 0.008 282)";
                      },
                      onMouseLeave: (e) => {
                        e.currentTarget.style.background = "transparent";
                      },
                      "data-ocid": action.ocid,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: "p-2.5 rounded-xl",
                            style: {
                              background: `${action.accent}20`,
                              color: action.accent
                            },
                            children: action.icon
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              className: "font-medium text-sm",
                              style: { color: "oklch(0.93 0.01 282)" },
                              children: action.label
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              className: "text-xs truncate",
                              style: { color: "oklch(0.54 0.01 282)" },
                              children: action.description
                            }
                          )
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4 flex-shrink-0 opacity-40 group-hover:opacity-100 transition-smooth" })
                      ]
                    },
                    action.ocid
                  )) })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "rounded-2xl overflow-hidden",
                style: {
                  background: "oklch(0.15 0.01 282)",
                  border: "1px solid oklch(0.2 0.008 282)"
                },
                "data-ocid": "admin.dashboard.activity_section",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "px-5 py-4 border-b flex items-center justify-between",
                      style: { borderColor: "oklch(0.2 0.008 282)" },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "h3",
                            {
                              className: "font-semibold text-sm",
                              style: {
                                color: "oklch(0.84 0.01 282)",
                                fontFamily: "var(--font-display)"
                              },
                              children: "Recent Activity"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "p",
                            {
                              className: "text-xs mt-0.5",
                              style: { color: "oklch(0.54 0.01 282)" },
                              children: "Latest system events"
                            }
                          )
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "button",
                          {
                            type: "button",
                            className: "text-xs px-3 py-1.5 rounded-lg transition-smooth",
                            style: {
                              background: "oklch(0.2 0.008 282)",
                              color: "oklch(0.72 0.26 180)"
                            },
                            "data-ocid": "admin.dashboard.view_all_activity_button",
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-3.5 h-3.5 inline mr-1" }),
                              "View all"
                            ]
                          }
                        )
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 space-y-1", children: RECENT_ACTIVITY.map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "flex items-start gap-3 px-3 py-2.5 rounded-xl",
                      "data-ocid": `admin.dashboard.activity.item.${idx + 1}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center mt-0.5", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              className: "p-1.5 rounded-lg flex-shrink-0",
                              style: {
                                background: `${getActivityColor(item.type)}20`,
                                color: getActivityColor(item.type)
                              },
                              children: item.icon
                            }
                          ),
                          idx < RECENT_ACTIVITY.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              className: "w-px flex-1 mt-1.5 min-h-[12px]",
                              style: { background: "oklch(0.22 0.008 282)" }
                            }
                          )
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 pb-1", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "p",
                            {
                              className: "text-xs leading-relaxed",
                              style: { color: "oklch(0.84 0.01 282)" },
                              children: item.text
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "p",
                            {
                              className: "text-[11px] mt-0.5",
                              style: { color: "oklch(0.48 0.01 282)" },
                              children: item.time
                            }
                          )
                        ] })
                      ]
                    },
                    item.id
                  )) })
                ]
              }
            )
          ] })
        ] })
      ]
    }
  );
}
export {
  AdminDashboardPage as default
};
