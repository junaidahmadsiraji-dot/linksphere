import { createActor } from "@/backend";
import type { UserProfile } from "@/backend.d";
import { useAdminAuth } from "@/hooks/use-admin-auth";
import { useActor } from "@caffeineai/core-infrastructure";
import {
  AlertTriangle,
  CheckCircle2,
  Search,
  Shield,
  ShieldOff,
  X,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

const CARD = "oklch(0.15 0.01 282)";
const BD = "oklch(0.2 0.008 282)";
const TEXT = "oklch(0.93 0.01 282)";
const MID = "oklch(0.74 0.01 282)";
const DIM = "oklch(0.54 0.01 282)";
const TEAL = "oklch(0.72 0.26 180)";
const PURPLE = "oklch(0.62 0.22 260)";
const RED = "oklch(0.65 0.19 22)";
const BLUE = "#3b82f6";

interface ConfirmDialog {
  type: "grant" | "revoke";
  userId: string;
  username: string;
}

function formatDate(ts: bigint): string {
  return new Date(Number(ts) / 1_000_000).toLocaleDateString("en-BD", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function AdminVerifiedPage() {
  const { adminToken } = useAdminAuth();
  const { actor } = useActor(createActor);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<"verified" | "all">("verified");
  const [confirm, setConfirm] = useState<ConfirmDialog | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  const loadUsers = useCallback(async () => {
    if (!actor || !adminToken) return;
    try {
      const result = await actor.getAllUsers(adminToken, 0n, 200n);
      setUsers(result as UserProfile[]);
    } catch {
      toast.error("Failed to load users");
    } finally {
      setIsLoading(false);
    }
  }, [actor, adminToken]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const verifiedUsers = users.filter((u) => u.isVerified);
  const unverifiedUsers = users.filter((u) => !u.isVerified && !u.isBanned);

  const displayList = (
    tab === "verified" ? verifiedUsers : unverifiedUsers
  ).filter((u) => u.username.toLowerCase().includes(search.toLowerCase()));

  async function handleConfirm() {
    if (!confirm || !actor || !adminToken) return;
    const userId = users.find((u) => u.id.toString() === confirm.userId)?.id;
    if (!userId) return;
    setActionLoading(true);
    try {
      if (confirm.type === "grant") {
        await actor.grantVerifiedTick(adminToken, userId);
        toast.success(`Blue verified tick granted to @${confirm.username}`);
      } else {
        await actor.revokeVerifiedTick(adminToken, userId);
        toast.success(`Verified tick revoked from @${confirm.username}`);
      }
      await loadUsers();
    } catch {
      toast.error("Action failed");
    } finally {
      setActionLoading(false);
      setConfirm(null);
    }
  }

  return (
    <div style={{ minHeight: "100%" }}>
      <div className="p-6 space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1
              className="text-xl font-bold"
              style={{ color: TEXT, fontFamily: "var(--font-display)" }}
            >
              Verified Badges
            </h1>
            <p className="text-sm mt-0.5" style={{ color: DIM }}>
              {isLoading
                ? "Loading..."
                : `${verifiedUsers.length} verified accounts`}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            {
              label: "Total Verified",
              value: verifiedUsers.length,
              accent: BLUE,
              icon: <CheckCircle2 className="w-4 h-4" />,
            },
            {
              label: "Unverified Active",
              value: unverifiedUsers.length,
              accent: TEAL,
              icon: <Shield className="w-4 h-4" />,
            },
            {
              label: "Total Users",
              value: users.length,
              accent: PURPLE,
              icon: <Shield className="w-4 h-4" />,
            },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-xl px-4 py-3 flex items-center gap-3"
              style={{ background: CARD, border: `1px solid ${BD}` }}
            >
              <div
                className="p-1.5 rounded-lg"
                style={{ background: `${s.accent}20`, color: s.accent }}
              >
                {s.icon}
              </div>
              <div>
                <div
                  className="font-bold text-lg"
                  style={{ color: TEXT, fontFamily: "var(--font-display)" }}
                >
                  {s.value}
                </div>
                <div className="text-xs" style={{ color: DIM }}>
                  {s.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs + Search */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div
            className="flex items-center gap-1 p-1 rounded-xl"
            style={{ background: CARD, border: `1px solid ${BD}` }}
          >
            {(
              [
                { id: "verified", label: "Verified Users" },
                { id: "all", label: "Grant Verification" },
              ] as const
            ).map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className="px-4 py-1.5 rounded-lg text-sm font-medium transition-smooth"
                style={
                  tab === t.id
                    ? { background: `${BLUE}20`, color: BLUE }
                    : { color: DIM }
                }
                data-ocid={`admin.verified.tab.${t.id}`}
              >
                {t.label}
              </button>
            ))}
          </div>
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
              style={{ color: DIM }}
            />
            <input
              type="text"
              placeholder={
                tab === "verified"
                  ? "Search verified accounts..."
                  : "Search users to verify..."
              }
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm outline-none"
              style={{
                background: CARD,
                border: `1px solid ${BD}`,
                color: TEXT,
              }}
              data-ocid="admin.verified.search_input"
            />
          </div>
        </div>

        {/* Table */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{ border: `1px solid ${BD}` }}
          data-ocid="admin.verified.table"
        >
          <table className="data-table">
            <thead>
              <tr>
                <th>Account</th>
                <th>{tab === "verified" ? "Verified Since" : "Joined"}</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {isLoading
                ? (["sk1", "sk2", "sk3", "sk4"] as const).map((k) => (
                    <tr key={k}>
                      <td colSpan={4}>
                        <div
                          className="h-4 rounded animate-pulse"
                          style={{ background: "oklch(0.22 0.008 282)" }}
                        />
                      </td>
                    </tr>
                  ))
                : displayList.map((user, idx) => (
                    <tr
                      key={user.id.toString()}
                      data-ocid={`admin.verified.item.${idx + 1}`}
                    >
                      <td>
                        <div className="flex items-center gap-3">
                          <div
                            className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                            style={{ background: `${PURPLE}20`, color: TEAL }}
                          >
                            {user.username[0]?.toUpperCase() ?? "?"}
                          </div>
                          <div>
                            <div
                              className="flex items-center gap-1.5 text-sm font-medium"
                              style={{ color: TEXT }}
                            >
                              {user.username}
                              {user.isVerified && (
                                <CheckCircle2
                                  className="w-3.5 h-3.5"
                                  style={{ color: BLUE }}
                                />
                              )}
                            </div>
                            <div
                              className="text-xs font-mono truncate max-w-[120px]"
                              style={{ color: DIM }}
                            >
                              {user.id.toString().slice(0, 16)}…
                            </div>
                          </div>
                        </div>
                      </td>
                      <td style={{ color: DIM }}>
                        {formatDate(user.createdAt)}
                      </td>
                      <td>
                        <span
                          className="text-xs px-2.5 py-1 rounded-full font-medium"
                          style={{
                            background: user.isVerified
                              ? `${BLUE}20`
                              : "oklch(0.22 0.008 282)",
                            color: user.isVerified ? BLUE : DIM,
                          }}
                        >
                          {user.isVerified ? "Verified" : "Not verified"}
                        </span>
                      </td>
                      <td>
                        {user.isVerified ? (
                          <button
                            type="button"
                            onClick={() =>
                              setConfirm({
                                type: "revoke",
                                userId: user.id.toString(),
                                username: user.username,
                              })
                            }
                            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-smooth font-medium"
                            style={{
                              background: `${RED}18`,
                              color: "oklch(0.75 0.15 22)",
                            }}
                            data-ocid={`admin.verified.revoke_button.${idx + 1}`}
                          >
                            <ShieldOff className="w-3.5 h-3.5" />
                            Revoke
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() =>
                              setConfirm({
                                type: "grant",
                                userId: user.id.toString(),
                                username: user.username,
                              })
                            }
                            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-smooth font-medium"
                            style={{ background: `${BLUE}18`, color: BLUE }}
                            data-ocid={`admin.verified.grant_button.${idx + 1}`}
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Grant Tick
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
          {!isLoading && displayList.length === 0 && (
            <div
              className="py-14 text-center"
              data-ocid="admin.verified.empty_state"
            >
              <CheckCircle2
                className="w-10 h-10 mx-auto mb-3 opacity-25"
                style={{ color: DIM }}
              />
              <p className="text-sm" style={{ color: DIM }}>
                {tab === "verified"
                  ? "No verified accounts yet"
                  : "No users to verify"}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Confirm Dialog */}
      {confirm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.7)" }}
          data-ocid="admin.verified.dialog"
        >
          <div
            className="w-full max-w-sm rounded-2xl p-6"
            style={{ background: CARD, border: `1px solid ${BD}` }}
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className="p-2 rounded-xl"
                style={{
                  background:
                    confirm.type === "grant" ? `${BLUE}20` : `${RED}20`,
                  color:
                    confirm.type === "grant" ? BLUE : "oklch(0.75 0.15 22)",
                }}
              >
                <AlertTriangle className="w-5 h-5" />
              </div>
              <button
                type="button"
                onClick={() => setConfirm(null)}
                style={{ color: DIM }}
                data-ocid="admin.verified.close_button"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <h3
              className="font-bold text-base mb-1"
              style={{ color: TEXT, fontFamily: "var(--font-display)" }}
            >
              {confirm.type === "grant"
                ? "Grant Blue Verified Tick"
                : "Revoke Verified Tick"}
            </h3>
            <p className="text-sm mb-5" style={{ color: MID }}>
              {confirm.type === "grant"
                ? `Grant the blue checkmark to @${confirm.username}? They will appear as verified across LinkSphere.`
                : `Remove the verified badge from @${confirm.username}?`}
            </p>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setConfirm(null)}
                className="flex-1 py-2 rounded-xl text-sm font-medium"
                style={{ background: "oklch(0.22 0.008 282)", color: MID }}
                data-ocid="admin.verified.cancel_button"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                disabled={actionLoading}
                className="flex-1 py-2 rounded-xl text-sm font-medium transition-smooth"
                style={{
                  background: confirm.type === "grant" ? BLUE : RED,
                  color: "white",
                  opacity: actionLoading ? 0.7 : 1,
                }}
                data-ocid="admin.verified.confirm_button"
              >
                {actionLoading
                  ? "Processing…"
                  : confirm.type === "grant"
                    ? "Grant Tick"
                    : "Revoke Tick"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
