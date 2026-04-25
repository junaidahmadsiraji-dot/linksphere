import { createActor } from "@/backend";
import type { UserProfile } from "@/backend.d";
import { useAdminAuth } from "@/hooks/use-admin-auth";
import { useActor } from "@caffeineai/core-infrastructure";
import {
  AlertTriangle,
  CheckCircle2,
  Filter,
  Search,
  Shield,
  ShieldOff,
  Trash2,
  UserCheck,
  UserX,
  Users,
  X,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

type FilterTab = "all" | "verified" | "banned";

interface ConfirmDialog {
  type: "ban" | "unban" | "delete" | "verify" | "revoke";
  userId: string;
  username: string;
}

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

function formatDate(ts: bigint): string {
  return new Date(Number(ts) / 1_000_000).toLocaleDateString("en-BD", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function AdminUsersPage() {
  const { adminToken } = useAdminAuth();
  const { actor } = useActor(createActor);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterTab>("all");
  const [confirm, setConfirm] = useState<ConfirmDialog | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  const loadUsers = useCallback(async () => {
    if (!actor || !adminToken) return;
    try {
      const result = await actor.getAllUsers(adminToken, 0n, 100n);
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

  const filtered = users.filter((u) => {
    const matchesSearch = u.username
      .toLowerCase()
      .includes(search.toLowerCase());
    if (filter === "verified") return matchesSearch && u.isVerified;
    if (filter === "banned") return matchesSearch && u.isBanned;
    return matchesSearch;
  });

  async function handleConfirm() {
    if (!confirm || !actor || !adminToken) return;
    setActionLoading(true);
    const userId = users.find((u) => u.id.toString() === confirm.userId)?.id;
    if (!userId) {
      setActionLoading(false);
      return;
    }
    try {
      switch (confirm.type) {
        case "ban":
          await actor.adminBanUser(adminToken, userId);
          toast.success(`${confirm.username} has been banned`);
          break;
        case "unban":
          await actor.adminUnbanUser(adminToken, userId);
          toast.success(`${confirm.username} has been unbanned`);
          break;
        case "delete":
          await actor.deleteUser(adminToken, userId);
          toast.success(`${confirm.username} deleted`);
          break;
        case "verify":
          await actor.grantVerifiedTick(adminToken, userId);
          toast.success(`Verified tick granted to ${confirm.username}`);
          break;
        case "revoke":
          await actor.revokeVerifiedTick(adminToken, userId);
          toast.success(`Verified tick revoked from ${confirm.username}`);
          break;
      }
      await loadUsers();
    } catch {
      toast.error("Action failed. Please try again.");
    } finally {
      setActionLoading(false);
      setConfirm(null);
    }
  }

  const filterTabs: { id: FilterTab; label: string; count: number }[] = [
    { id: "all", label: "All", count: users.length },
    {
      id: "verified",
      label: "Verified",
      count: users.filter((u) => u.isVerified).length,
    },
    {
      id: "banned",
      label: "Banned",
      count: users.filter((u) => u.isBanned).length,
    },
  ];

  return (
    <div style={{ background: BG, minHeight: "100%" }}>
      <div className="p-6 space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1
              className="text-xl font-bold"
              style={{ color: TEXT, fontFamily: "var(--font-display)" }}
            >
              User Management
            </h1>
            <p className="text-sm mt-0.5" style={{ color: DIM }}>
              {isLoading ? "Loading..." : `${users.length} total users`}
            </p>
          </div>
          <div
            className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-lg"
            style={{ background: `${PURPLE}20`, color: PURPLE }}
          >
            <Users className="w-3.5 h-3.5" />
            {users.length} total
          </div>
        </div>

        {/* Search + Filter */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
              style={{ color: DIM }}
            />
            <input
              type="text"
              placeholder="Search users by username..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm outline-none"
              style={{
                background: CARD,
                border: `1px solid ${BD}`,
                color: TEXT,
              }}
              data-ocid="admin.users.search_input"
            />
          </div>
          <div
            className="flex items-center gap-1 p-1 rounded-xl"
            style={{ background: CARD, border: `1px solid ${BD}` }}
          >
            <Filter className="w-3.5 h-3.5 ml-2" style={{ color: DIM }} />
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilter(tab.id)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-smooth"
                style={
                  filter === tab.id
                    ? { background: `${TEAL}20`, color: TEAL }
                    : { color: DIM }
                }
                data-ocid={`admin.users.filter.${tab.id}`}
              >
                {tab.label}
                <span
                  className="px-1.5 py-0.5 rounded-full text-[10px]"
                  style={{
                    background:
                      filter === tab.id ? `${TEAL}30` : "oklch(0.22 0.008 282)",
                    color: filter === tab.id ? TEAL : DIM,
                  }}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{ border: `1px solid ${BD}` }}
          data-ocid="admin.users.table"
        >
          <table className="data-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Status</th>
                <th>Verified</th>
                <th>Joined</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading
                ? (["sk1", "sk2", "sk3", "sk4", "sk5"] as const).map((k) => (
                    <tr key={k}>
                      <td colSpan={5}>
                        <div
                          className="h-4 rounded animate-pulse"
                          style={{ background: "oklch(0.22 0.008 282)" }}
                        />
                      </td>
                    </tr>
                  ))
                : filtered.map((user, idx) => (
                    <tr
                      key={user.id.toString()}
                      data-ocid={`admin.users.item.${idx + 1}`}
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
                              className="text-sm font-medium flex items-center gap-1.5"
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
                      <td>
                        <span
                          className="text-xs px-2 py-1 rounded-full font-medium"
                          style={{
                            background: user.isBanned
                              ? `${RED}18`
                              : `${GREEN}18`,
                            color: user.isBanned
                              ? "oklch(0.75 0.15 22)"
                              : "oklch(0.72 0.22 150)",
                          }}
                        >
                          {user.isBanned ? "Banned" : "Active"}
                        </span>
                      </td>
                      <td>
                        {user.isVerified ? (
                          <span
                            className="flex items-center gap-1 text-xs"
                            style={{ color: BLUE }}
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                          </span>
                        ) : (
                          <span className="text-xs" style={{ color: DIM }}>
                            —
                          </span>
                        )}
                      </td>
                      <td style={{ color: DIM }}>
                        {formatDate(user.createdAt)}
                      </td>
                      <td>
                        <div className="flex items-center gap-1.5">
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
                              className="p-1.5 rounded-lg transition-smooth"
                              style={{
                                background: "oklch(0.3 0.1 220 / 0.2)",
                                color: BLUE,
                              }}
                              aria-label="Revoke verified"
                              data-ocid={`admin.users.revoke_button.${idx + 1}`}
                            >
                              <ShieldOff className="w-3.5 h-3.5" />
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() =>
                                setConfirm({
                                  type: "verify",
                                  userId: user.id.toString(),
                                  username: user.username,
                                })
                              }
                              className="p-1.5 rounded-lg transition-smooth"
                              style={{
                                background: `${PURPLE}18`,
                                color: PURPLE,
                              }}
                              aria-label="Grant verified"
                              data-ocid={`admin.users.verify_button.${idx + 1}`}
                            >
                              <Shield className="w-3.5 h-3.5" />
                            </button>
                          )}
                          {user.isBanned ? (
                            <button
                              type="button"
                              onClick={() =>
                                setConfirm({
                                  type: "unban",
                                  userId: user.id.toString(),
                                  username: user.username,
                                })
                              }
                              className="p-1.5 rounded-lg transition-smooth"
                              style={{
                                background: `${GREEN}18`,
                                color: "oklch(0.72 0.22 150)",
                              }}
                              aria-label="Unban user"
                              data-ocid={`admin.users.unban_button.${idx + 1}`}
                            >
                              <UserCheck className="w-3.5 h-3.5" />
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() =>
                                setConfirm({
                                  type: "ban",
                                  userId: user.id.toString(),
                                  username: user.username,
                                })
                              }
                              className="p-1.5 rounded-lg transition-smooth"
                              style={{
                                background: `${RED}18`,
                                color: "oklch(0.75 0.15 22)",
                              }}
                              aria-label="Ban user"
                              data-ocid={`admin.users.ban_button.${idx + 1}`}
                            >
                              <UserX className="w-3.5 h-3.5" />
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() =>
                              setConfirm({
                                type: "delete",
                                userId: user.id.toString(),
                                username: user.username,
                              })
                            }
                            className="p-1.5 rounded-lg transition-smooth"
                            style={{
                              background: "oklch(0.22 0.008 282)",
                              color: DIM,
                            }}
                            aria-label="Delete user"
                            data-ocid={`admin.users.delete_button.${idx + 1}`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
          {!isLoading && filtered.length === 0 && (
            <div
              className="py-14 text-center"
              data-ocid="admin.users.empty_state"
            >
              <Users
                className="w-10 h-10 mx-auto mb-3 opacity-25"
                style={{ color: DIM }}
              />
              <p className="text-sm" style={{ color: DIM }}>
                No users found
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Confirmation Dialog */}
      {confirm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.7)" }}
          data-ocid="admin.users.confirm_dialog"
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
                    confirm.type === "delete" || confirm.type === "ban"
                      ? `${RED}20`
                      : `${GREEN}20`,
                  color:
                    confirm.type === "delete" || confirm.type === "ban"
                      ? "oklch(0.75 0.15 22)"
                      : "oklch(0.72 0.22 150)",
                }}
              >
                <AlertTriangle className="w-5 h-5" />
              </div>
              <button
                type="button"
                onClick={() => setConfirm(null)}
                style={{ color: DIM }}
                data-ocid="admin.users.close_button"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <h3
              className="font-bold text-base mb-1"
              style={{ color: TEXT, fontFamily: "var(--font-display)" }}
            >
              {confirm.type === "ban" && "Ban User"}
              {confirm.type === "unban" && "Unban User"}
              {confirm.type === "delete" && "Delete User"}
              {confirm.type === "verify" && "Grant Verified Tick"}
              {confirm.type === "revoke" && "Revoke Verified Tick"}
            </h3>
            <p className="text-sm mb-5" style={{ color: MID }}>
              {confirm.type === "ban" &&
                `Ban @${confirm.username}? They won't be able to post or interact.`}
              {confirm.type === "unban" &&
                `Restore access for @${confirm.username}?`}
              {confirm.type === "delete" &&
                `Permanently delete @${confirm.username}? This cannot be undone.`}
              {confirm.type === "verify" &&
                `Grant the blue verified tick to @${confirm.username}?`}
              {confirm.type === "revoke" &&
                `Remove the verified tick from @${confirm.username}?`}
            </p>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setConfirm(null)}
                className="flex-1 py-2 rounded-xl text-sm font-medium transition-smooth"
                style={{ background: "oklch(0.22 0.008 282)", color: MID }}
                data-ocid="admin.users.cancel_button"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                disabled={actionLoading}
                className="flex-1 py-2 rounded-xl text-sm font-medium transition-smooth"
                style={{
                  background:
                    confirm.type === "delete" || confirm.type === "ban"
                      ? RED
                      : confirm.type === "verify"
                        ? PURPLE
                        : TEAL,
                  color: "oklch(0.11 0.008 282)",
                  opacity: actionLoading ? 0.7 : 1,
                }}
                data-ocid="admin.users.confirm_button"
              >
                {actionLoading ? "Processing…" : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
