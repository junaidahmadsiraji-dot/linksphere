import { N as useAdminAuth, a as useActor, r as reactExports, j as jsxRuntimeExports, C as CircleCheck, P as Settings, b as ue, B as Bell, d as createActor } from "./index-DpisiOh5.js";
import { S as Shield } from "./shield-cksossvQ.js";
import { U as UserPlus } from "./user-plus-zKonSa2p.js";
import { M as Mail, L as Lock } from "./mail-UG5Td6Z8.js";
import { T as Trash2 } from "./trash-2-ZUW3Dj86.js";
import { P as Plus } from "./plus-B_34AA_x.js";
import { G as Globe } from "./globe-CxiUXvpW.js";
const CARD = "oklch(0.15 0.01 282)";
const CARD2 = "oklch(0.13 0.009 282)";
const BD = "oklch(0.2 0.008 282)";
const TEXT = "oklch(0.93 0.01 282)";
const MID = "oklch(0.74 0.01 282)";
const DIM = "oklch(0.54 0.01 282)";
const TEAL = "oklch(0.72 0.26 180)";
const PURPLE = "oklch(0.62 0.22 260)";
const RED = "oklch(0.65 0.19 22)";
const inputStyle = {
  background: "oklch(0.11 0.008 282)",
  border: `1px solid ${BD}`,
  color: TEXT,
  borderRadius: "0.625rem",
  padding: "0.625rem 0.75rem",
  fontSize: "0.875rem",
  width: "100%",
  outline: "none"
};
function SectionHeader({
  icon,
  title
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "px-5 py-4 border-b",
      style: { borderColor: BD, background: CARD },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "h2",
        {
          className: "font-semibold text-sm flex items-center gap-2",
          style: { color: MID },
          children: [
            icon,
            " ",
            title
          ]
        }
      )
    }
  );
}
function AdminSettingsPage() {
  const { adminEmail, adminToken } = useAdminAuth();
  const { actor } = useActor(createActor);
  const [addForm, setAddForm] = reactExports.useState({
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [addLoading, setAddLoading] = reactExports.useState(false);
  const [admins, setAdmins] = reactExports.useState([]);
  const [adminsLoading, setAdminsLoading] = reactExports.useState(true);
  const [notifToggles, setNotifToggles] = reactExports.useState([
    { label: "New user registrations", enabled: true },
    { label: "Flagged posts alerts", enabled: true },
    { label: "System errors", enabled: true },
    { label: "Weekly reports", enabled: false }
  ]);
  const [appToggles, setAppToggles] = reactExports.useState([
    { label: "Allow new registrations", enabled: true },
    { label: "Public post visibility", enabled: true },
    { label: "Story feature", enabled: true },
    { label: "Reels feature", enabled: true },
    { label: "Friend system", enabled: true },
    { label: "Marketplace", enabled: false }
  ]);
  const loadAdmins = reactExports.useCallback(async () => {
    if (!actor || !adminToken) return;
    try {
      const result = await actor.listAdmins(adminToken);
      setAdmins(result);
    } catch {
    } finally {
      setAdminsLoading(false);
    }
  }, [actor, adminToken]);
  reactExports.useEffect(() => {
    loadAdmins();
  }, [loadAdmins]);
  async function handleAddAdmin(e) {
    e.preventDefault();
    if (!actor || !adminToken) return;
    if (!addForm.email.trim() || !addForm.password.trim()) {
      ue.error("Email and password are required");
      return;
    }
    if (addForm.password !== addForm.confirmPassword) {
      ue.error("Passwords do not match");
      return;
    }
    if (addForm.password.length < 8) {
      ue.error("Password must be at least 8 characters");
      return;
    }
    setAddLoading(true);
    try {
      await actor.addAdmin(adminToken, addForm.email.trim(), addForm.password);
      ue.success(`Admin ${addForm.email} added`);
      setAddForm({ email: "", password: "", confirmPassword: "" });
      await loadAdmins();
    } catch {
      ue.error("Failed to add admin");
    } finally {
      setAddLoading(false);
    }
  }
  async function handleRemoveAdmin(email) {
    if (!actor || !adminToken) return;
    if (email === adminEmail) {
      ue.error("You cannot remove yourself");
      return;
    }
    try {
      await actor.removeAdmin(adminToken, email);
      ue.success(`Admin ${email} removed`);
      await loadAdmins();
    } catch {
      ue.error("Failed to remove admin");
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { minHeight: "100%" }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-6 max-w-2xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "h1",
        {
          className: "text-xl font-bold",
          style: { color: TEXT, fontFamily: "var(--font-display)" },
          children: "Admin Settings"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm mt-0.5", style: { color: DIM }, children: "Manage your Siraji admin panel and LinkSphere configuration" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "rounded-2xl overflow-hidden",
        style: { border: `1px solid ${BD}` },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SectionHeader,
            {
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-4 h-4" }),
              title: "Current Admin Account"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-5 space-y-3", style: { background: CARD2 }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center gap-3 p-3 rounded-xl",
              style: { background: CARD, border: `1px solid ${BD}` },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "w-10 h-10 rounded-full flex items-center justify-center font-bold",
                    style: { background: `${PURPLE}20`, color: TEAL },
                    children: adminEmail ? adminEmail[0].toUpperCase() : "A"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", style: { color: TEXT }, children: adminEmail ?? "admin@siraji.web" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mt-0.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3 h-3", style: { color: TEAL } }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs", style: { color: DIM }, children: "Super Administrator · Active session" })
                  ] })
                ] })
              ]
            }
          ) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "rounded-2xl overflow-hidden",
        style: { border: `1px solid ${BD}` },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SectionHeader,
            {
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "w-4 h-4" }),
              title: "Admin Accounts"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-5 space-y-3", style: { background: CARD2 }, children: adminsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs", style: { color: DIM }, children: "Loading admins…" }) : admins.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs", style: { color: DIM }, children: "No additional admins" }) : admins.filter((a) => a !== adminEmail).map((a) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center justify-between gap-3 p-3 rounded-xl",
              style: { background: CARD, border: `1px solid ${BD}` },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-4 h-4", style: { color: DIM } }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", style: { color: MID }, children: a })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => handleRemoveAdmin(a),
                    className: "p-1.5 rounded-lg transition-smooth",
                    style: {
                      background: `${RED}18`,
                      color: "oklch(0.75 0.15 22)"
                    },
                    "aria-label": `Remove admin ${a}`,
                    "data-ocid": "admin.settings.remove_admin_button",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" })
                  }
                )
              ]
            },
            a
          )) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "rounded-2xl overflow-hidden",
        style: { border: `1px solid ${BD}` },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SectionHeader,
            {
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
              title: "Add New Admin"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "form",
            {
              onSubmit: handleAddAdmin,
              className: "p-5 space-y-4",
              style: { background: CARD2 },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "label",
                    {
                      className: "text-xs font-medium block mb-1.5",
                      style: { color: MID },
                      htmlFor: "new-admin-email",
                      children: "Email Address"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Mail,
                      {
                        className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4",
                        style: { color: DIM }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        id: "new-admin-email",
                        type: "email",
                        value: addForm.email,
                        onChange: (e) => setAddForm((f) => ({ ...f, email: e.target.value })),
                        placeholder: "newadmin@siraji.web",
                        style: { ...inputStyle, paddingLeft: "2.5rem" },
                        "data-ocid": "admin.settings.new_admin_email_input"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "label",
                    {
                      className: "text-xs font-medium block mb-1.5",
                      style: { color: MID },
                      htmlFor: "new-admin-password",
                      children: "Password"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Lock,
                      {
                        className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4",
                        style: { color: DIM }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        id: "new-admin-password",
                        type: "password",
                        value: addForm.password,
                        onChange: (e) => setAddForm((f) => ({ ...f, password: e.target.value })),
                        placeholder: "Min. 8 characters",
                        style: { ...inputStyle, paddingLeft: "2.5rem" },
                        "data-ocid": "admin.settings.new_admin_password_input"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "label",
                    {
                      className: "text-xs font-medium block mb-1.5",
                      style: { color: MID },
                      htmlFor: "new-admin-confirm",
                      children: "Confirm Password"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Lock,
                      {
                        className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4",
                        style: { color: DIM }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        id: "new-admin-confirm",
                        type: "password",
                        value: addForm.confirmPassword,
                        onChange: (e) => setAddForm((f) => ({
                          ...f,
                          confirmPassword: e.target.value
                        })),
                        placeholder: "Repeat password",
                        style: { ...inputStyle, paddingLeft: "2.5rem" },
                        "data-ocid": "admin.settings.new_admin_confirm_input"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "submit",
                    disabled: addLoading,
                    className: "flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-smooth",
                    style: {
                      background: "linear-gradient(135deg, oklch(0.62 0.22 260) 0%, oklch(0.72 0.26 180) 100%)",
                      color: "oklch(0.11 0.008 282)",
                      opacity: addLoading ? 0.7 : 1
                    },
                    "data-ocid": "admin.settings.add_admin_button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "w-4 h-4" }),
                      addLoading ? "Adding…" : "Add Admin"
                    ]
                  }
                )
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "rounded-2xl overflow-hidden",
        style: { border: `1px solid ${BD}` },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SectionHeader,
            {
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "w-4 h-4" }),
              title: "App Branding"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 space-y-4", style: { background: CARD2 }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "label",
                {
                  className: "text-xs font-medium block mb-1.5",
                  style: { color: MID },
                  htmlFor: "app-name",
                  children: "App Name"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "app-name",
                  type: "text",
                  defaultValue: "LinkSphere",
                  style: inputStyle,
                  "data-ocid": "admin.settings.app_name_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "label",
                {
                  className: "text-xs font-medium block mb-1.5",
                  style: { color: MID },
                  htmlFor: "app-desc",
                  children: "App Description"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "textarea",
                {
                  id: "app-desc",
                  defaultValue: "Connect · Share · Discover — Your social universe",
                  rows: 2,
                  style: { ...inputStyle, resize: "vertical" },
                  "data-ocid": "admin.settings.app_desc_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => ue.success("Branding settings saved"),
                className: "flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-smooth",
                style: {
                  background: `${TEAL}20`,
                  color: TEAL,
                  border: `1px solid ${TEAL}40`
                },
                "data-ocid": "admin.settings.save_branding_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4" }),
                  "Save Branding"
                ]
              }
            )
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "rounded-2xl overflow-hidden",
        style: { border: `1px solid ${BD}` },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SectionHeader,
            {
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "w-4 h-4" }),
              title: "Admin Notifications"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-5 space-y-3", style: { background: CARD2 }, children: notifToggles.map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center justify-between",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", style: { color: MID }, children: item.label }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setNotifToggles(
                      (prev) => prev.map(
                        (t, i) => i === idx ? { ...t, enabled: !t.enabled } : t
                      )
                    ),
                    className: "w-10 h-5 rounded-full transition-smooth relative flex-shrink-0",
                    style: {
                      background: item.enabled ? TEAL : "oklch(0.28 0.008 282)"
                    },
                    "aria-label": `Toggle ${item.label}`,
                    role: "switch",
                    "aria-checked": item.enabled,
                    "data-ocid": `admin.settings.notif_toggle.${idx + 1}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "absolute top-0.5 w-4 h-4 rounded-full transition-smooth",
                        style: {
                          background: "oklch(0.98 0 0)",
                          left: item.enabled ? "calc(100% - 1.1rem)" : "0.1rem"
                        }
                      }
                    )
                  }
                )
              ]
            },
            item.label
          )) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "rounded-2xl overflow-hidden",
        style: { border: `1px solid ${BD}` },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SectionHeader,
            {
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "w-4 h-4" }),
              title: "LinkSphere App Settings"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-5 space-y-3", style: { background: CARD2 }, children: appToggles.map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center justify-between",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", style: { color: MID }, children: item.label }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setAppToggles(
                      (prev) => prev.map(
                        (t, i) => i === idx ? { ...t, enabled: !t.enabled } : t
                      )
                    ),
                    className: "w-10 h-5 rounded-full transition-smooth relative flex-shrink-0",
                    style: {
                      background: item.enabled ? PURPLE : "oklch(0.28 0.008 282)"
                    },
                    "aria-label": `Toggle ${item.label}`,
                    role: "switch",
                    "aria-checked": item.enabled,
                    "data-ocid": `admin.settings.app_toggle.${idx + 1}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "absolute top-0.5 w-4 h-4 rounded-full transition-smooth",
                        style: {
                          background: "oklch(0.98 0 0)",
                          left: item.enabled ? "calc(100% - 1.1rem)" : "0.1rem"
                        }
                      }
                    )
                  }
                )
              ]
            },
            item.label
          )) })
        ]
      }
    )
  ] }) });
}
export {
  AdminSettingsPage as default
};
