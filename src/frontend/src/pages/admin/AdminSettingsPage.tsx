import { createActor } from "@/backend";
import { useAdminAuth } from "@/hooks/use-admin-auth";
import { useActor } from "@caffeineai/core-infrastructure";
import {
  Bell,
  CheckCircle2,
  Globe,
  Lock,
  Mail,
  Plus,
  Settings,
  Shield,
  Trash2,
  UserPlus,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

const CARD = "oklch(0.15 0.01 282)";
const CARD2 = "oklch(0.13 0.009 282)";
const BD = "oklch(0.2 0.008 282)";
const TEXT = "oklch(0.93 0.01 282)";
const MID = "oklch(0.74 0.01 282)";
const DIM = "oklch(0.54 0.01 282)";
const TEAL = "oklch(0.72 0.26 180)";
const PURPLE = "oklch(0.62 0.22 260)";
const RED = "oklch(0.65 0.19 22)";

interface AddAdminForm {
  email: string;
  password: string;
  confirmPassword: string;
}

interface NotifToggle {
  label: string;
  enabled: boolean;
}

interface AppToggle {
  label: string;
  enabled: boolean;
}

const inputStyle = {
  background: "oklch(0.11 0.008 282)",
  border: `1px solid ${BD}`,
  color: TEXT,
  borderRadius: "0.625rem",
  padding: "0.625rem 0.75rem",
  fontSize: "0.875rem",
  width: "100%",
  outline: "none",
};

function SectionHeader({
  icon,
  title,
}: { icon: React.ReactNode; title: string }) {
  return (
    <div
      className="px-5 py-4 border-b"
      style={{ borderColor: BD, background: CARD }}
    >
      <h2
        className="font-semibold text-sm flex items-center gap-2"
        style={{ color: MID }}
      >
        {icon} {title}
      </h2>
    </div>
  );
}

export default function AdminSettingsPage() {
  const { adminEmail, adminToken } = useAdminAuth();
  const { actor } = useActor(createActor);

  // Add admin form
  const [addForm, setAddForm] = useState<AddAdminForm>({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [addLoading, setAddLoading] = useState(false);
  const [admins, setAdmins] = useState<string[]>([]);
  const [adminsLoading, setAdminsLoading] = useState(true);

  // Notification toggles
  const [notifToggles, setNotifToggles] = useState<NotifToggle[]>([
    { label: "New user registrations", enabled: true },
    { label: "Flagged posts alerts", enabled: true },
    { label: "System errors", enabled: true },
    { label: "Weekly reports", enabled: false },
  ]);

  // App toggles
  const [appToggles, setAppToggles] = useState<AppToggle[]>([
    { label: "Allow new registrations", enabled: true },
    { label: "Public post visibility", enabled: true },
    { label: "Story feature", enabled: true },
    { label: "Reels feature", enabled: true },
    { label: "Friend system", enabled: true },
    { label: "Marketplace", enabled: false },
  ]);

  const loadAdmins = useCallback(async () => {
    if (!actor || !adminToken) return;
    try {
      const result = await actor.listAdmins(adminToken);
      setAdmins(result);
    } catch {
      // silently fail — listAdmins may not be available
    } finally {
      setAdminsLoading(false);
    }
  }, [actor, adminToken]);

  useEffect(() => {
    loadAdmins();
  }, [loadAdmins]);

  async function handleAddAdmin(e: React.FormEvent) {
    e.preventDefault();
    if (!actor || !adminToken) return;
    if (!addForm.email.trim() || !addForm.password.trim()) {
      toast.error("Email and password are required");
      return;
    }
    if (addForm.password !== addForm.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (addForm.password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }
    setAddLoading(true);
    try {
      await actor.addAdmin(adminToken, addForm.email.trim(), addForm.password);
      toast.success(`Admin ${addForm.email} added`);
      setAddForm({ email: "", password: "", confirmPassword: "" });
      await loadAdmins();
    } catch {
      toast.error("Failed to add admin");
    } finally {
      setAddLoading(false);
    }
  }

  async function handleRemoveAdmin(email: string) {
    if (!actor || !adminToken) return;
    if (email === adminEmail) {
      toast.error("You cannot remove yourself");
      return;
    }
    try {
      await actor.removeAdmin(adminToken, email);
      toast.success(`Admin ${email} removed`);
      await loadAdmins();
    } catch {
      toast.error("Failed to remove admin");
    }
  }

  return (
    <div style={{ minHeight: "100%" }}>
      <div className="p-6 space-y-6 max-w-2xl">
        <div>
          <h1
            className="text-xl font-bold"
            style={{ color: TEXT, fontFamily: "var(--font-display)" }}
          >
            Admin Settings
          </h1>
          <p className="text-sm mt-0.5" style={{ color: DIM }}>
            Manage your Siraji admin panel and LinkSphere configuration
          </p>
        </div>

        {/* Current Account */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{ border: `1px solid ${BD}` }}
        >
          <SectionHeader
            icon={<Shield className="w-4 h-4" />}
            title="Current Admin Account"
          />
          <div className="p-5 space-y-3" style={{ background: CARD2 }}>
            <div
              className="flex items-center gap-3 p-3 rounded-xl"
              style={{ background: CARD, border: `1px solid ${BD}` }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center font-bold"
                style={{ background: `${PURPLE}20`, color: TEAL }}
              >
                {adminEmail ? adminEmail[0].toUpperCase() : "A"}
              </div>
              <div>
                <p className="text-sm font-medium" style={{ color: TEXT }}>
                  {adminEmail ?? "admin@siraji.web"}
                </p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <CheckCircle2 className="w-3 h-3" style={{ color: TEAL }} />
                  <p className="text-xs" style={{ color: DIM }}>
                    Super Administrator · Active session
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Admin List */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{ border: `1px solid ${BD}` }}
        >
          <SectionHeader
            icon={<UserPlus className="w-4 h-4" />}
            title="Admin Accounts"
          />
          <div className="p-5 space-y-3" style={{ background: CARD2 }}>
            {adminsLoading ? (
              <p className="text-xs" style={{ color: DIM }}>
                Loading admins…
              </p>
            ) : admins.length === 0 ? (
              <p className="text-xs" style={{ color: DIM }}>
                No additional admins
              </p>
            ) : (
              admins
                .filter((a) => a !== adminEmail)
                .map((a) => (
                  <div
                    key={a}
                    className="flex items-center justify-between gap-3 p-3 rounded-xl"
                    style={{ background: CARD, border: `1px solid ${BD}` }}
                  >
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" style={{ color: DIM }} />
                      <span className="text-sm" style={{ color: MID }}>
                        {a}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveAdmin(a)}
                      className="p-1.5 rounded-lg transition-smooth"
                      style={{
                        background: `${RED}18`,
                        color: "oklch(0.75 0.15 22)",
                      }}
                      aria-label={`Remove admin ${a}`}
                      data-ocid="admin.settings.remove_admin_button"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))
            )}
          </div>
        </div>

        {/* Add New Admin */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{ border: `1px solid ${BD}` }}
        >
          <SectionHeader
            icon={<Plus className="w-4 h-4" />}
            title="Add New Admin"
          />
          <form
            onSubmit={handleAddAdmin}
            className="p-5 space-y-4"
            style={{ background: CARD2 }}
          >
            <div>
              <label
                className="text-xs font-medium block mb-1.5"
                style={{ color: MID }}
                htmlFor="new-admin-email"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                  style={{ color: DIM }}
                />
                <input
                  id="new-admin-email"
                  type="email"
                  value={addForm.email}
                  onChange={(e) =>
                    setAddForm((f) => ({ ...f, email: e.target.value }))
                  }
                  placeholder="newadmin@siraji.web"
                  style={{ ...inputStyle, paddingLeft: "2.5rem" }}
                  data-ocid="admin.settings.new_admin_email_input"
                />
              </div>
            </div>
            <div>
              <label
                className="text-xs font-medium block mb-1.5"
                style={{ color: MID }}
                htmlFor="new-admin-password"
              >
                Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                  style={{ color: DIM }}
                />
                <input
                  id="new-admin-password"
                  type="password"
                  value={addForm.password}
                  onChange={(e) =>
                    setAddForm((f) => ({ ...f, password: e.target.value }))
                  }
                  placeholder="Min. 8 characters"
                  style={{ ...inputStyle, paddingLeft: "2.5rem" }}
                  data-ocid="admin.settings.new_admin_password_input"
                />
              </div>
            </div>
            <div>
              <label
                className="text-xs font-medium block mb-1.5"
                style={{ color: MID }}
                htmlFor="new-admin-confirm"
              >
                Confirm Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                  style={{ color: DIM }}
                />
                <input
                  id="new-admin-confirm"
                  type="password"
                  value={addForm.confirmPassword}
                  onChange={(e) =>
                    setAddForm((f) => ({
                      ...f,
                      confirmPassword: e.target.value,
                    }))
                  }
                  placeholder="Repeat password"
                  style={{ ...inputStyle, paddingLeft: "2.5rem" }}
                  data-ocid="admin.settings.new_admin_confirm_input"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={addLoading}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-smooth"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.62 0.22 260) 0%, oklch(0.72 0.26 180) 100%)",
                color: "oklch(0.11 0.008 282)",
                opacity: addLoading ? 0.7 : 1,
              }}
              data-ocid="admin.settings.add_admin_button"
            >
              <UserPlus className="w-4 h-4" />
              {addLoading ? "Adding…" : "Add Admin"}
            </button>
          </form>
        </div>

        {/* App Branding */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{ border: `1px solid ${BD}` }}
        >
          <SectionHeader
            icon={<Settings className="w-4 h-4" />}
            title="App Branding"
          />
          <div className="p-5 space-y-4" style={{ background: CARD2 }}>
            <div>
              <label
                className="text-xs font-medium block mb-1.5"
                style={{ color: MID }}
                htmlFor="app-name"
              >
                App Name
              </label>
              <input
                id="app-name"
                type="text"
                defaultValue="LinkSphere"
                style={inputStyle}
                data-ocid="admin.settings.app_name_input"
              />
            </div>
            <div>
              <label
                className="text-xs font-medium block mb-1.5"
                style={{ color: MID }}
                htmlFor="app-desc"
              >
                App Description
              </label>
              <textarea
                id="app-desc"
                defaultValue="Connect · Share · Discover — Your social universe"
                rows={2}
                style={{ ...inputStyle, resize: "vertical" }}
                data-ocid="admin.settings.app_desc_input"
              />
            </div>
            <button
              type="button"
              onClick={() => toast.success("Branding settings saved")}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-smooth"
              style={{
                background: `${TEAL}20`,
                color: TEAL,
                border: `1px solid ${TEAL}40`,
              }}
              data-ocid="admin.settings.save_branding_button"
            >
              <CheckCircle2 className="w-4 h-4" />
              Save Branding
            </button>
          </div>
        </div>

        {/* Notification Toggles */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{ border: `1px solid ${BD}` }}
        >
          <SectionHeader
            icon={<Bell className="w-4 h-4" />}
            title="Admin Notifications"
          />
          <div className="p-5 space-y-3" style={{ background: CARD2 }}>
            {notifToggles.map((item, idx) => (
              <div
                key={item.label}
                className="flex items-center justify-between"
              >
                <span className="text-sm" style={{ color: MID }}>
                  {item.label}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setNotifToggles((prev) =>
                      prev.map((t, i) =>
                        i === idx ? { ...t, enabled: !t.enabled } : t,
                      ),
                    )
                  }
                  className="w-10 h-5 rounded-full transition-smooth relative flex-shrink-0"
                  style={{
                    background: item.enabled ? TEAL : "oklch(0.28 0.008 282)",
                  }}
                  aria-label={`Toggle ${item.label}`}
                  role="switch"
                  aria-checked={item.enabled}
                  data-ocid={`admin.settings.notif_toggle.${idx + 1}`}
                >
                  <span
                    className="absolute top-0.5 w-4 h-4 rounded-full transition-smooth"
                    style={{
                      background: "oklch(0.98 0 0)",
                      left: item.enabled ? "calc(100% - 1.1rem)" : "0.1rem",
                    }}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* App Settings Toggles */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{ border: `1px solid ${BD}` }}
        >
          <SectionHeader
            icon={<Globe className="w-4 h-4" />}
            title="LinkSphere App Settings"
          />
          <div className="p-5 space-y-3" style={{ background: CARD2 }}>
            {appToggles.map((item, idx) => (
              <div
                key={item.label}
                className="flex items-center justify-between"
              >
                <span className="text-sm" style={{ color: MID }}>
                  {item.label}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setAppToggles((prev) =>
                      prev.map((t, i) =>
                        i === idx ? { ...t, enabled: !t.enabled } : t,
                      ),
                    )
                  }
                  className="w-10 h-5 rounded-full transition-smooth relative flex-shrink-0"
                  style={{
                    background: item.enabled ? PURPLE : "oklch(0.28 0.008 282)",
                  }}
                  aria-label={`Toggle ${item.label}`}
                  role="switch"
                  aria-checked={item.enabled}
                  data-ocid={`admin.settings.app_toggle.${idx + 1}`}
                >
                  <span
                    className="absolute top-0.5 w-4 h-4 rounded-full transition-smooth"
                    style={{
                      background: "oklch(0.98 0 0)",
                      left: item.enabled ? "calc(100% - 1.1rem)" : "0.1rem",
                    }}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
