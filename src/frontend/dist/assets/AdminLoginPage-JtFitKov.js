import { c as createLucideIcon, N as useAdminAuth, t as useNavigate, r as reactExports, j as jsxRuntimeExports, b as ue } from "./index-DpisiOh5.js";
import { S as Shield } from "./shield-cksossvQ.js";
import { M as Mail, L as Lock } from "./mail-UG5Td6Z8.js";
import { E as Eye } from "./eye-B3NM6Osf.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
];
const CircleAlert = createLucideIcon("circle-alert", __iconNode$1);
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
      d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",
      key: "ct8e1f"
    }
  ],
  ["path", { d: "M14.084 14.158a3 3 0 0 1-4.242-4.242", key: "151rxh" }],
  [
    "path",
    {
      d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",
      key: "13bj9a"
    }
  ],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }]
];
const EyeOff = createLucideIcon("eye-off", __iconNode);
function AdminLoginPage() {
  const { adminLogin, isLoggingIn, loginError, isAdminLoggedIn } = useAdminAuth();
  const navigate = useNavigate();
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [showPassword, setShowPassword] = reactExports.useState(false);
  const [localError, setLocalError] = reactExports.useState("");
  const error = localError || loginError || "";
  reactExports.useEffect(() => {
    if (isAdminLoggedIn) {
      navigate({ to: "/admin" });
    }
  }, [isAdminLoggedIn, navigate]);
  async function handleLogin(e) {
    e.preventDefault();
    setLocalError("");
    if (!email.trim() || !password.trim()) {
      setLocalError("Please enter both email and password.");
      return;
    }
    const success = await adminLogin(email, password);
    if (success) {
      ue.success("Welcome back, Admin!");
      navigate({ to: "/admin" });
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "admin-dark min-h-screen flex items-center justify-center relative overflow-hidden",
      style: { background: "oklch(0.11 0.008 282)" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 pointer-events-none",
            style: {
              backgroundImage: "radial-gradient(circle at 20% 20%, oklch(0.62 0.22 260 / 0.12) 0%, transparent 50%), radial-gradient(circle at 80% 80%, oklch(0.72 0.26 180 / 0.10) 0%, transparent 50%)"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 opacity-[0.03] pointer-events-none",
            style: {
              backgroundImage: "linear-gradient(oklch(0.93 0.01 282) 1px, transparent 1px), linear-gradient(90deg, oklch(0.93 0.01 282) 1px, transparent 1px)",
              backgroundSize: "40px 40px"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "relative z-10 w-full max-w-md mx-4",
            "data-ocid": "admin.login.card",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-8", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 shadow-xl",
                    style: {
                      background: "linear-gradient(135deg, oklch(0.62 0.22 260) 0%, oklch(0.72 0.26 180) 100%)"
                    },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Shield,
                      {
                        className: "w-8 h-8",
                        style: { color: "oklch(0.11 0.008 282)" }
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "h1",
                  {
                    className: "text-3xl font-bold tracking-tight",
                    style: {
                      color: "oklch(0.93 0.01 282)",
                      fontFamily: "var(--font-display)"
                    },
                    children: "Siraji Admin"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm", style: { color: "oklch(0.64 0.01 282)" }, children: "LinkSphere Control Panel" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "rounded-2xl p-8 border",
                  style: {
                    background: "oklch(0.15 0.01 282)",
                    borderColor: "oklch(0.2 0.008 282)",
                    boxShadow: "0 25px 50px rgba(0,0,0,0.5), 0 0 0 1px oklch(0.62 0.22 260 / 0.1)"
                  },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleLogin, className: "space-y-5", children: [
                    error && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "flex items-center gap-2.5 rounded-lg px-4 py-3 text-sm",
                        style: {
                          background: "oklch(0.65 0.19 22 / 0.15)",
                          borderLeft: "3px solid oklch(0.65 0.19 22)",
                          color: "oklch(0.85 0.1 22)"
                        },
                        "data-ocid": "admin.login.error_state",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-4 h-4 flex-shrink-0" }),
                          error
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "label",
                        {
                          className: "text-sm font-medium",
                          style: { color: "oklch(0.84 0.01 282)" },
                          htmlFor: "admin-email",
                          children: "Email Address"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Mail,
                          {
                            className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4",
                            style: { color: "oklch(0.64 0.01 282)" }
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "input",
                          {
                            id: "admin-email",
                            type: "email",
                            value: email,
                            onChange: (e) => setEmail(e.target.value),
                            placeholder: "admin@siraji.web",
                            required: true,
                            autoComplete: "email",
                            className: "w-full pl-10 pr-4 py-2.5 rounded-lg text-sm outline-none transition-smooth",
                            style: {
                              background: "oklch(0.11 0.008 282)",
                              border: "1px solid oklch(0.2 0.008 282)",
                              color: "oklch(0.93 0.01 282)"
                            },
                            onFocus: (e) => {
                              e.target.style.borderColor = "oklch(0.62 0.22 260)";
                              e.target.style.boxShadow = "0 0 0 3px oklch(0.62 0.22 260 / 0.15)";
                            },
                            onBlur: (e) => {
                              e.target.style.borderColor = "oklch(0.2 0.008 282)";
                              e.target.style.boxShadow = "none";
                            },
                            "data-ocid": "admin.login.email_input"
                          }
                        )
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "label",
                        {
                          className: "text-sm font-medium",
                          style: { color: "oklch(0.84 0.01 282)" },
                          htmlFor: "admin-password",
                          children: "Password"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Lock,
                          {
                            className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4",
                            style: { color: "oklch(0.64 0.01 282)" }
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "input",
                          {
                            id: "admin-password",
                            type: showPassword ? "text" : "password",
                            value: password,
                            onChange: (e) => setPassword(e.target.value),
                            placeholder: "••••••••",
                            required: true,
                            autoComplete: "current-password",
                            className: "w-full pl-10 pr-10 py-2.5 rounded-lg text-sm outline-none transition-smooth",
                            style: {
                              background: "oklch(0.11 0.008 282)",
                              border: "1px solid oklch(0.2 0.008 282)",
                              color: "oklch(0.93 0.01 282)"
                            },
                            onFocus: (e) => {
                              e.target.style.borderColor = "oklch(0.62 0.22 260)";
                              e.target.style.boxShadow = "0 0 0 3px oklch(0.62 0.22 260 / 0.15)";
                            },
                            onBlur: (e) => {
                              e.target.style.borderColor = "oklch(0.2 0.008 282)";
                              e.target.style.boxShadow = "none";
                            },
                            "data-ocid": "admin.login.password_input"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "button",
                          {
                            type: "button",
                            onClick: () => setShowPassword((p) => !p),
                            className: "absolute right-3 top-1/2 -translate-y-1/2 transition-smooth",
                            style: { color: "oklch(0.64 0.01 282)" },
                            "aria-label": showPassword ? "Hide password" : "Show password",
                            children: showPassword ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4" })
                          }
                        )
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "submit",
                        disabled: isLoggingIn,
                        className: "w-full py-3 rounded-lg font-semibold text-sm tracking-wide transition-smooth relative overflow-hidden mt-2",
                        style: {
                          background: isLoggingIn ? "oklch(0.28 0.008 282)" : "linear-gradient(135deg, oklch(0.62 0.22 260) 0%, oklch(0.72 0.26 180) 100%)",
                          color: isLoggingIn ? "oklch(0.64 0.01 282)" : "oklch(0.11 0.008 282)",
                          cursor: isLoggingIn ? "not-allowed" : "pointer"
                        },
                        "data-ocid": "admin.login.submit_button",
                        children: isLoggingIn ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center justify-center gap-2", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "span",
                            {
                              className: "w-4 h-4 rounded-full border-2 animate-spin",
                              style: {
                                borderColor: "oklch(0.64 0.01 282) oklch(0.64 0.01 282) oklch(0.64 0.01 282) transparent"
                              }
                            }
                          ),
                          "Authenticating…"
                        ] }) : "Sign In to Admin Panel"
                      }
                    )
                  ] })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-center text-xs mt-6",
                  style: { color: "oklch(0.48 0.01 282)" },
                  children: "Siraji Admin · LinkSphere Control Panel · Access restricted to authorized personnel"
                }
              )
            ]
          }
        )
      ]
    }
  );
}
export {
  AdminLoginPage as default
};
