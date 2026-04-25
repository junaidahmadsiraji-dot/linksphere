import { N as useAdminAuth, a as useActor, r as reactExports, b as ue, j as jsxRuntimeExports, C as CircleCheck, S as Search, d as createActor } from "./index-DpisiOh5.js";
import { S as Shield } from "./shield-cksossvQ.js";
import { S as ShieldOff } from "./shield-off-CBR3v5Ns.js";
import { T as TriangleAlert } from "./triangle-alert-DA-oaQjO.js";
import { X } from "./x-TmiiBXt_.js";
const CARD = "oklch(0.15 0.01 282)";
const BD = "oklch(0.2 0.008 282)";
const TEXT = "oklch(0.93 0.01 282)";
const MID = "oklch(0.74 0.01 282)";
const DIM = "oklch(0.54 0.01 282)";
const TEAL = "oklch(0.72 0.26 180)";
const PURPLE = "oklch(0.62 0.22 260)";
const RED = "oklch(0.65 0.19 22)";
const BLUE = "#3b82f6";
function formatDate(ts) {
  return new Date(Number(ts) / 1e6).toLocaleDateString("en-BD", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}
function AdminVerifiedPage() {
  const { adminToken } = useAdminAuth();
  const { actor } = useActor(createActor);
  const [users, setUsers] = reactExports.useState([]);
  const [isLoading, setIsLoading] = reactExports.useState(true);
  const [search, setSearch] = reactExports.useState("");
  const [tab, setTab] = reactExports.useState("verified");
  const [confirm, setConfirm] = reactExports.useState(null);
  const [actionLoading, setActionLoading] = reactExports.useState(false);
  const loadUsers = reactExports.useCallback(async () => {
    if (!actor || !adminToken) return;
    try {
      const result = await actor.getAllUsers(adminToken, 0n, 200n);
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
  const verifiedUsers = users.filter((u) => u.isVerified);
  const unverifiedUsers = users.filter((u) => !u.isVerified && !u.isBanned);
  const displayList = (tab === "verified" ? verifiedUsers : unverifiedUsers).filter((u) => u.username.toLowerCase().includes(search.toLowerCase()));
  async function handleConfirm() {
    var _a;
    if (!confirm || !actor || !adminToken) return;
    const userId = (_a = users.find((u) => u.id.toString() === confirm.userId)) == null ? void 0 : _a.id;
    if (!userId) return;
    setActionLoading(true);
    try {
      if (confirm.type === "grant") {
        await actor.grantVerifiedTick(adminToken, userId);
        ue.success(`Blue verified tick granted to @${confirm.username}`);
      } else {
        await actor.revokeVerifiedTick(adminToken, userId);
        ue.success(`Verified tick revoked from @${confirm.username}`);
      }
      await loadUsers();
    } catch {
      ue.error("Action failed");
    } finally {
      setActionLoading(false);
      setConfirm(null);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { minHeight: "100%" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "h1",
          {
            className: "text-xl font-bold",
            style: { color: TEXT, fontFamily: "var(--font-display)" },
            children: "Verified Badges"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm mt-0.5", style: { color: DIM }, children: isLoading ? "Loading..." : `${verifiedUsers.length} verified accounts` })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-3", children: [
        {
          label: "Total Verified",
          value: verifiedUsers.length,
          accent: BLUE,
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4" })
        },
        {
          label: "Unverified Active",
          value: unverifiedUsers.length,
          accent: TEAL,
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-4 h-4" })
        },
        {
          label: "Total Users",
          value: users.length,
          accent: PURPLE,
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-4 h-4" })
        }
      ].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "rounded-xl px-4 py-3 flex items-center gap-3",
          style: { background: CARD, border: `1px solid ${BD}` },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "p-1.5 rounded-lg",
                style: { background: `${s.accent}20`, color: s.accent },
                children: s.icon
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "font-bold text-lg",
                  style: { color: TEXT, fontFamily: "var(--font-display)" },
                  children: s.value
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs", style: { color: DIM }, children: s.label })
            ] })
          ]
        },
        s.label
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "flex items-center gap-1 p-1 rounded-xl",
            style: { background: CARD, border: `1px solid ${BD}` },
            children: [
              { id: "verified", label: "Verified Users" },
              { id: "all", label: "Grant Verification" }
            ].map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setTab(t.id),
                className: "px-4 py-1.5 rounded-lg text-sm font-medium transition-smooth",
                style: tab === t.id ? { background: `${BLUE}20`, color: BLUE } : { color: DIM },
                "data-ocid": `admin.verified.tab.${t.id}`,
                children: t.label
              },
              t.id
            ))
          }
        ),
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
              placeholder: tab === "verified" ? "Search verified accounts..." : "Search users to verify...",
              value: search,
              onChange: (e) => setSearch(e.target.value),
              className: "w-full pl-10 pr-4 py-2.5 rounded-xl text-sm outline-none",
              style: {
                background: CARD,
                border: `1px solid ${BD}`,
                color: TEXT
              },
              "data-ocid": "admin.verified.search_input"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "rounded-2xl overflow-hidden",
          style: { border: `1px solid ${BD}` },
          "data-ocid": "admin.verified.table",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "data-table", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Account" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: tab === "verified" ? "Verified Since" : "Joined" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Status" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Action" })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: isLoading ? ["sk1", "sk2", "sk3", "sk4"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 4, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "h-4 rounded animate-pulse",
                  style: { background: "oklch(0.22 0.008 282)" }
                }
              ) }) }, k)) : displayList.map((user, idx) => {
                var _a;
                return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "tr",
                  {
                    "data-ocid": `admin.verified.item.${idx + 1}`,
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
                              className: "flex items-center gap-1.5 text-sm font-medium",
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
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { color: DIM }, children: formatDate(user.createdAt) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "text-xs px-2.5 py-1 rounded-full font-medium",
                          style: {
                            background: user.isVerified ? `${BLUE}20` : "oklch(0.22 0.008 282)",
                            color: user.isVerified ? BLUE : DIM
                          },
                          children: user.isVerified ? "Verified" : "Not verified"
                        }
                      ) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: user.isVerified ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "button",
                        {
                          type: "button",
                          onClick: () => setConfirm({
                            type: "revoke",
                            userId: user.id.toString(),
                            username: user.username
                          }),
                          className: "flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-smooth font-medium",
                          style: {
                            background: `${RED}18`,
                            color: "oklch(0.75 0.15 22)"
                          },
                          "data-ocid": `admin.verified.revoke_button.${idx + 1}`,
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldOff, { className: "w-3.5 h-3.5" }),
                            "Revoke"
                          ]
                        }
                      ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "button",
                        {
                          type: "button",
                          onClick: () => setConfirm({
                            type: "grant",
                            userId: user.id.toString(),
                            username: user.username
                          }),
                          className: "flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-smooth font-medium",
                          style: { background: `${BLUE}18`, color: BLUE },
                          "data-ocid": `admin.verified.grant_button.${idx + 1}`,
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5" }),
                            "Grant Tick"
                          ]
                        }
                      ) })
                    ]
                  },
                  user.id.toString()
                );
              }) })
            ] }),
            !isLoading && displayList.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "py-14 text-center",
                "data-ocid": "admin.verified.empty_state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    CircleCheck,
                    {
                      className: "w-10 h-10 mx-auto mb-3 opacity-25",
                      style: { color: DIM }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", style: { color: DIM }, children: tab === "verified" ? "No verified accounts yet" : "No users to verify" })
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
        "data-ocid": "admin.verified.dialog",
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
                      background: confirm.type === "grant" ? `${BLUE}20` : `${RED}20`,
                      color: confirm.type === "grant" ? BLUE : "oklch(0.75 0.15 22)"
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
                    "data-ocid": "admin.verified.close_button",
                    "aria-label": "Close",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5" })
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "h3",
                {
                  className: "font-bold text-base mb-1",
                  style: { color: TEXT, fontFamily: "var(--font-display)" },
                  children: confirm.type === "grant" ? "Grant Blue Verified Tick" : "Revoke Verified Tick"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm mb-5", style: { color: MID }, children: confirm.type === "grant" ? `Grant the blue checkmark to @${confirm.username}? They will appear as verified across LinkSphere.` : `Remove the verified badge from @${confirm.username}?` }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setConfirm(null),
                    className: "flex-1 py-2 rounded-xl text-sm font-medium",
                    style: { background: "oklch(0.22 0.008 282)", color: MID },
                    "data-ocid": "admin.verified.cancel_button",
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
                      background: confirm.type === "grant" ? BLUE : RED,
                      color: "white",
                      opacity: actionLoading ? 0.7 : 1
                    },
                    "data-ocid": "admin.verified.confirm_button",
                    children: actionLoading ? "Processing…" : confirm.type === "grant" ? "Grant Tick" : "Revoke Tick"
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
  AdminVerifiedPage as default
};
