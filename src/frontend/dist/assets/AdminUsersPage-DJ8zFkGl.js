import { c as createLucideIcon, N as useAdminAuth, a as useActor, r as reactExports, b as ue, j as jsxRuntimeExports, s as Users, S as Search, C as CircleCheck, d as createActor } from "./index-DpisiOh5.js";
import { S as ShieldOff } from "./shield-off-CBR3v5Ns.js";
import { S as Shield } from "./shield-cksossvQ.js";
import { U as UserCheck } from "./user-check-QDUrpVzF.js";
import { U as UserX } from "./user-x-C-9U_jXx.js";
import { T as Trash2 } from "./trash-2-ZUW3Dj86.js";
import { T as TriangleAlert } from "./triangle-alert-DA-oaQjO.js";
import { X } from "./x-TmiiBXt_.js";
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
      d: "M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z",
      key: "sc7q7i"
    }
  ]
];
const Funnel = createLucideIcon("funnel", __iconNode);
const BG = "oklch(0.11 0.008 282)";
const CARD = "oklch(0.15 0.01 282)";
const BD = "oklch(0.2 0.008 282)";
const TEXT = "oklch(0.93 0.01 282)";
const MID = "oklch(0.74 0.01 282)";
const DIM = "oklch(0.54 0.01 282)";
const TEAL = "oklch(0.72 0.26 180)";
const PURPLE = "oklch(0.62 0.22 260)";
const RED = "oklch(0.65 0.19 22)";
const GREEN = "oklch(0.68 0.22 150)";
const BLUE = "#3b82f6";
function formatDate(ts) {
  return new Date(Number(ts) / 1e6).toLocaleDateString("en-BD", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}
function AdminUsersPage() {
  const { adminToken } = useAdminAuth();
  const { actor } = useActor(createActor);
  const [users, setUsers] = reactExports.useState([]);
  const [isLoading, setIsLoading] = reactExports.useState(true);
  const [search, setSearch] = reactExports.useState("");
  const [filter, setFilter] = reactExports.useState("all");
  const [confirm, setConfirm] = reactExports.useState(null);
  const [actionLoading, setActionLoading] = reactExports.useState(false);
  const loadUsers = reactExports.useCallback(async () => {
    if (!actor || !adminToken) return;
    try {
      const result = await actor.getAllUsers(adminToken, 0n, 100n);
      setUsers(result);
    } catch {
      ue.error("Failed to load users");
    } finally {
      setIsLoading(false);
    }
  }, [actor, adminToken]);
  reactExports.useEffect(() => {
    loadUsers();
  }, [loadUsers]);
  const filtered = users.filter((u) => {
    const matchesSearch = u.username.toLowerCase().includes(search.toLowerCase());
    if (filter === "verified") return matchesSearch && u.isVerified;
    if (filter === "banned") return matchesSearch && u.isBanned;
    return matchesSearch;
  });
  async function handleConfirm() {
    var _a;
    if (!confirm || !actor || !adminToken) return;
    setActionLoading(true);
    const userId = (_a = users.find((u) => u.id.toString() === confirm.userId)) == null ? void 0 : _a.id;
    if (!userId) {
      setActionLoading(false);
      return;
    }
    try {
      switch (confirm.type) {
        case "ban":
          await actor.adminBanUser(adminToken, userId);
          ue.success(`${confirm.username} has been banned`);
          break;
        case "unban":
          await actor.adminUnbanUser(adminToken, userId);
          ue.success(`${confirm.username} has been unbanned`);
          break;
        case "delete":
          await actor.deleteUser(adminToken, userId);
          ue.success(`${confirm.username} deleted`);
          break;
        case "verify":
          await actor.grantVerifiedTick(adminToken, userId);
          ue.success(`Verified tick granted to ${confirm.username}`);
          break;
        case "revoke":
          await actor.revokeVerifiedTick(adminToken, userId);
          ue.success(`Verified tick revoked from ${confirm.username}`);
          break;
      }
      await loadUsers();
    } catch {
      ue.error("Action failed. Please try again.");
    } finally {
      setActionLoading(false);
      setConfirm(null);
    }
  }
  const filterTabs = [
    { id: "all", label: "All", count: users.length },
    {
      id: "verified",
      label: "Verified",
      count: users.filter((u) => u.isVerified).length
    },
    {
      id: "banned",
      label: "Banned",
      count: users.filter((u) => u.isBanned).length
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { background: BG, minHeight: "100%" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "h1",
            {
              className: "text-xl font-bold",
              style: { color: TEXT, fontFamily: "var(--font-display)" },
              children: "User Management"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm mt-0.5", style: { color: DIM }, children: isLoading ? "Loading..." : `${users.length} total users` })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center gap-2 text-xs px-3 py-1.5 rounded-lg",
            style: { background: `${PURPLE}20`, color: PURPLE },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-3.5 h-3.5" }),
              users.length,
              " total"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
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
              placeholder: "Search users by username...",
              value: search,
              onChange: (e) => setSearch(e.target.value),
              className: "w-full pl-10 pr-4 py-2.5 rounded-xl text-sm outline-none",
              style: {
                background: CARD,
                border: `1px solid ${BD}`,
                color: TEXT
              },
              "data-ocid": "admin.users.search_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center gap-1 p-1 rounded-xl",
            style: { background: CARD, border: `1px solid ${BD}` },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { className: "w-3.5 h-3.5 ml-2", style: { color: DIM } }),
              filterTabs.map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => setFilter(tab.id),
                  className: "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-smooth",
                  style: filter === tab.id ? { background: `${TEAL}20`, color: TEAL } : { color: DIM },
                  "data-ocid": `admin.users.filter.${tab.id}`,
                  children: [
                    tab.label,
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "px-1.5 py-0.5 rounded-full text-[10px]",
                        style: {
                          background: filter === tab.id ? `${TEAL}30` : "oklch(0.22 0.008 282)",
                          color: filter === tab.id ? TEAL : DIM
                        },
                        children: tab.count
                      }
                    )
                  ]
                },
                tab.id
              ))
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "rounded-2xl overflow-hidden",
          style: { border: `1px solid ${BD}` },
          "data-ocid": "admin.users.table",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "data-table", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "User" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Status" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Verified" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Joined" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Actions" })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: isLoading ? ["sk1", "sk2", "sk3", "sk4", "sk5"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 5, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "h-4 rounded animate-pulse",
                  style: { background: "oklch(0.22 0.008 282)" }
                }
              ) }) }, k)) : filtered.map((user, idx) => {
                var _a;
                return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "tr",
                  {
                    "data-ocid": `admin.users.item.${idx + 1}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: "w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0",
                            style: { background: `${PURPLE}20`, color: TEAL },
                            children: ((_a = user.username[0]) == null ? void 0 : _a.toUpperCase()) ?? "?"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "div",
                            {
                              className: "text-sm font-medium flex items-center gap-1.5",
                              style: { color: TEXT },
                              children: [
                                user.username,
                                user.isVerified && /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  CircleCheck,
                                  {
                                    className: "w-3.5 h-3.5",
                                    style: { color: BLUE }
                                  }
                                )
                              ]
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "div",
                            {
                              className: "text-xs font-mono truncate max-w-[120px]",
                              style: { color: DIM },
                              children: [
                                user.id.toString().slice(0, 16),
                                "…"
                              ]
                            }
                          )
                        ] })
                      ] }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "text-xs px-2 py-1 rounded-full font-medium",
                          style: {
                            background: user.isBanned ? `${RED}18` : `${GREEN}18`,
                            color: user.isBanned ? "oklch(0.75 0.15 22)" : "oklch(0.72 0.22 150)"
                          },
                          children: user.isBanned ? "Banned" : "Active"
                        }
                      ) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: user.isVerified ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "span",
                        {
                          className: "flex items-center gap-1 text-xs",
                          style: { color: BLUE },
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5" }),
                            " Verified"
                          ]
                        }
                      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs", style: { color: DIM }, children: "—" }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { color: DIM }, children: formatDate(user.createdAt) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                        user.isVerified ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "button",
                          {
                            type: "button",
                            onClick: () => setConfirm({
                              type: "revoke",
                              userId: user.id.toString(),
                              username: user.username
                            }),
                            className: "p-1.5 rounded-lg transition-smooth",
                            style: {
                              background: "oklch(0.3 0.1 220 / 0.2)",
                              color: BLUE
                            },
                            "aria-label": "Revoke verified",
                            "data-ocid": `admin.users.revoke_button.${idx + 1}`,
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldOff, { className: "w-3.5 h-3.5" })
                          }
                        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "button",
                          {
                            type: "button",
                            onClick: () => setConfirm({
                              type: "verify",
                              userId: user.id.toString(),
                              username: user.username
                            }),
                            className: "p-1.5 rounded-lg transition-smooth",
                            style: {
                              background: `${PURPLE}18`,
                              color: PURPLE
                            },
                            "aria-label": "Grant verified",
                            "data-ocid": `admin.users.verify_button.${idx + 1}`,
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-3.5 h-3.5" })
                          }
                        ),
                        user.isBanned ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "button",
                          {
                            type: "button",
                            onClick: () => setConfirm({
                              type: "unban",
                              userId: user.id.toString(),
                              username: user.username
                            }),
                            className: "p-1.5 rounded-lg transition-smooth",
                            style: {
                              background: `${GREEN}18`,
                              color: "oklch(0.72 0.22 150)"
                            },
                            "aria-label": "Unban user",
                            "data-ocid": `admin.users.unban_button.${idx + 1}`,
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(UserCheck, { className: "w-3.5 h-3.5" })
                          }
                        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "button",
                          {
                            type: "button",
                            onClick: () => setConfirm({
                              type: "ban",
                              userId: user.id.toString(),
                              username: user.username
                            }),
                            className: "p-1.5 rounded-lg transition-smooth",
                            style: {
                              background: `${RED}18`,
                              color: "oklch(0.75 0.15 22)"
                            },
                            "aria-label": "Ban user",
                            "data-ocid": `admin.users.ban_button.${idx + 1}`,
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(UserX, { className: "w-3.5 h-3.5" })
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "button",
                          {
                            type: "button",
                            onClick: () => setConfirm({
                              type: "delete",
                              userId: user.id.toString(),
                              username: user.username
                            }),
                            className: "p-1.5 rounded-lg transition-smooth",
                            style: {
                              background: "oklch(0.22 0.008 282)",
                              color: DIM
                            },
                            "aria-label": "Delete user",
                            "data-ocid": `admin.users.delete_button.${idx + 1}`,
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" })
                          }
                        )
                      ] }) })
                    ]
                  },
                  user.id.toString()
                );
              }) })
            ] }),
            !isLoading && filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "py-14 text-center",
                "data-ocid": "admin.users.empty_state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Users,
                    {
                      className: "w-10 h-10 mx-auto mb-3 opacity-25",
                      style: { color: DIM }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", style: { color: DIM }, children: "No users found" })
                ]
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
        "data-ocid": "admin.users.confirm_dialog",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "w-full max-w-sm rounded-2xl p-6",
            style: { background: CARD, border: `1px solid ${BD}` },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "p-2 rounded-xl",
                    style: {
                      background: confirm.type === "delete" || confirm.type === "ban" ? `${RED}20` : `${GREEN}20`,
                      color: confirm.type === "delete" || confirm.type === "ban" ? "oklch(0.75 0.15 22)" : "oklch(0.72 0.22 150)"
                    },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-5 h-5" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setConfirm(null),
                    style: { color: DIM },
                    "data-ocid": "admin.users.close_button",
                    "aria-label": "Close dialog",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5" })
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "h3",
                {
                  className: "font-bold text-base mb-1",
                  style: { color: TEXT, fontFamily: "var(--font-display)" },
                  children: [
                    confirm.type === "ban" && "Ban User",
                    confirm.type === "unban" && "Unban User",
                    confirm.type === "delete" && "Delete User",
                    confirm.type === "verify" && "Grant Verified Tick",
                    confirm.type === "revoke" && "Revoke Verified Tick"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm mb-5", style: { color: MID }, children: [
                confirm.type === "ban" && `Ban @${confirm.username}? They won't be able to post or interact.`,
                confirm.type === "unban" && `Restore access for @${confirm.username}?`,
                confirm.type === "delete" && `Permanently delete @${confirm.username}? This cannot be undone.`,
                confirm.type === "verify" && `Grant the blue verified tick to @${confirm.username}?`,
                confirm.type === "revoke" && `Remove the verified tick from @${confirm.username}?`
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setConfirm(null),
                    className: "flex-1 py-2 rounded-xl text-sm font-medium transition-smooth",
                    style: { background: "oklch(0.22 0.008 282)", color: MID },
                    "data-ocid": "admin.users.cancel_button",
                    children: "Cancel"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: handleConfirm,
                    disabled: actionLoading,
                    className: "flex-1 py-2 rounded-xl text-sm font-medium transition-smooth",
                    style: {
                      background: confirm.type === "delete" || confirm.type === "ban" ? RED : confirm.type === "verify" ? PURPLE : TEAL,
                      color: "oklch(0.11 0.008 282)",
                      opacity: actionLoading ? 0.7 : 1
                    },
                    "data-ocid": "admin.users.confirm_button",
                    children: actionLoading ? "Processing…" : "Confirm"
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
  AdminUsersPage as default
};
