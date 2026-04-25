import { useAdminAuth } from "@/hooks/use-admin-auth";
import { useNavigate } from "@tanstack/react-router";
import { AlertCircle, Eye, EyeOff, Lock, Mail, Shield } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function AdminLoginPage() {
  const { adminLogin, isLoggingIn, loginError, isAdminLoggedIn } =
    useAdminAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState("");

  const error = localError || loginError || "";

  useEffect(() => {
    if (isAdminLoggedIn) {
      navigate({ to: "/admin" });
    }
  }, [isAdminLoggedIn, navigate]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLocalError("");
    if (!email.trim() || !password.trim()) {
      setLocalError("Please enter both email and password.");
      return;
    }
    const success = await adminLogin(email, password);
    if (success) {
      toast.success("Welcome back, Admin!");
      navigate({ to: "/admin" });
    }
  }

  return (
    <div
      className="admin-dark min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: "oklch(0.11 0.008 282)" }}
    >
      {/* Ambient background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, oklch(0.62 0.22 260 / 0.12) 0%, transparent 50%), radial-gradient(circle at 80% 80%, oklch(0.72 0.26 180 / 0.10) 0%, transparent 50%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(oklch(0.93 0.01 282) 1px, transparent 1px), linear-gradient(90deg, oklch(0.93 0.01 282) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Card */}
      <div
        className="relative z-10 w-full max-w-md mx-4"
        data-ocid="admin.login.card"
      >
        <div className="text-center mb-8">
          <div
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 shadow-xl"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.62 0.22 260) 0%, oklch(0.72 0.26 180) 100%)",
            }}
          >
            <Shield
              className="w-8 h-8"
              style={{ color: "oklch(0.11 0.008 282)" }}
            />
          </div>
          <h1
            className="text-3xl font-bold tracking-tight"
            style={{
              color: "oklch(0.93 0.01 282)",
              fontFamily: "var(--font-display)",
            }}
          >
            Siraji Admin
          </h1>
          <p className="mt-1 text-sm" style={{ color: "oklch(0.64 0.01 282)" }}>
            LinkSphere Control Panel
          </p>
        </div>

        <div
          className="rounded-2xl p-8 border"
          style={{
            background: "oklch(0.15 0.01 282)",
            borderColor: "oklch(0.2 0.008 282)",
            boxShadow:
              "0 25px 50px rgba(0,0,0,0.5), 0 0 0 1px oklch(0.62 0.22 260 / 0.1)",
          }}
        >
          <form onSubmit={handleLogin} className="space-y-5">
            {error && (
              <div
                className="flex items-center gap-2.5 rounded-lg px-4 py-3 text-sm"
                style={{
                  background: "oklch(0.65 0.19 22 / 0.15)",
                  borderLeft: "3px solid oklch(0.65 0.19 22)",
                  color: "oklch(0.85 0.1 22)",
                }}
                data-ocid="admin.login.error_state"
              >
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {error}
              </div>
            )}

            <div className="space-y-1.5">
              <label
                className="text-sm font-medium"
                style={{ color: "oklch(0.84 0.01 282)" }}
                htmlFor="admin-email"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                  style={{ color: "oklch(0.64 0.01 282)" }}
                />
                <input
                  id="admin-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@siraji.web"
                  required
                  autoComplete="email"
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg text-sm outline-none transition-smooth"
                  style={{
                    background: "oklch(0.11 0.008 282)",
                    border: "1px solid oklch(0.2 0.008 282)",
                    color: "oklch(0.93 0.01 282)",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "oklch(0.62 0.22 260)";
                    e.target.style.boxShadow =
                      "0 0 0 3px oklch(0.62 0.22 260 / 0.15)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "oklch(0.2 0.008 282)";
                    e.target.style.boxShadow = "none";
                  }}
                  data-ocid="admin.login.email_input"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label
                className="text-sm font-medium"
                style={{ color: "oklch(0.84 0.01 282)" }}
                htmlFor="admin-password"
              >
                Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                  style={{ color: "oklch(0.64 0.01 282)" }}
                />
                <input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                  className="w-full pl-10 pr-10 py-2.5 rounded-lg text-sm outline-none transition-smooth"
                  style={{
                    background: "oklch(0.11 0.008 282)",
                    border: "1px solid oklch(0.2 0.008 282)",
                    color: "oklch(0.93 0.01 282)",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "oklch(0.62 0.22 260)";
                    e.target.style.boxShadow =
                      "0 0 0 3px oklch(0.62 0.22 260 / 0.15)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "oklch(0.2 0.008 282)";
                    e.target.style.boxShadow = "none";
                  }}
                  data-ocid="admin.login.password_input"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 transition-smooth"
                  style={{ color: "oklch(0.64 0.01 282)" }}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-3 rounded-lg font-semibold text-sm tracking-wide transition-smooth relative overflow-hidden mt-2"
              style={{
                background: isLoggingIn
                  ? "oklch(0.28 0.008 282)"
                  : "linear-gradient(135deg, oklch(0.62 0.22 260) 0%, oklch(0.72 0.26 180) 100%)",
                color: isLoggingIn
                  ? "oklch(0.64 0.01 282)"
                  : "oklch(0.11 0.008 282)",
                cursor: isLoggingIn ? "not-allowed" : "pointer",
              }}
              data-ocid="admin.login.submit_button"
            >
              {isLoggingIn ? (
                <span className="flex items-center justify-center gap-2">
                  <span
                    className="w-4 h-4 rounded-full border-2 animate-spin"
                    style={{
                      borderColor:
                        "oklch(0.64 0.01 282) oklch(0.64 0.01 282) oklch(0.64 0.01 282) transparent",
                    }}
                  />
                  Authenticating…
                </span>
              ) : (
                "Sign In to Admin Panel"
              )}
            </button>
          </form>
        </div>

        <p
          className="text-center text-xs mt-6"
          style={{ color: "oklch(0.48 0.01 282)" }}
        >
          Siraji Admin · LinkSphere Control Panel · Access restricted to
          authorized personnel
        </p>
      </div>
    </div>
  );
}
