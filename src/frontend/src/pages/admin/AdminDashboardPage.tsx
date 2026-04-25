import { createActor } from "@/backend";
import type { AdminStats as BackendAdminStats } from "@/backend.d";
import { useActor } from "@caffeineai/core-infrastructure";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  Activity,
  AlertTriangle,
  BarChart2,
  Bell,
  ChevronRight,
  Eye,
  FileText,
  FolderOpen,
  Package,
  Settings,
  ShieldCheck,
  TrendingUp,
  UserCheck,
  UserX,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";

interface LocalStats {
  totalUsers: number;
  totalPosts: number;
  totalProducts: number;
  totalFiles: number;
}

type ActivityType = "user" | "post" | "product" | "file" | "verified" | "flag";

interface ActivityItem {
  id: string;
  icon: React.ReactNode;
  text: string;
  time: string;
  type: ActivityType;
}

const SAMPLE_STATS: LocalStats = {
  totalUsers: 1_284,
  totalPosts: 8_471,
  totalProducts: 342,
  totalFiles: 97,
};

const SAMPLE_SECONDARY = {
  flaggedPosts: 14,
  verifiedUsers: 38,
  bannedUsers: 12,
  notifications: 6,
};

const RECENT_ACTIVITY: ActivityItem[] = [
  {
    id: "1",
    icon: <UserCheck className="w-4 h-4" />,
    text: "New user registered: Rafiq Ahmed",
    time: "2 min ago",
    type: "user",
  },
  {
    id: "2",
    icon: <AlertTriangle className="w-4 h-4" />,
    text: "Post flagged for review: 'Breaking news...'",
    time: "15 min ago",
    type: "flag",
  },
  {
    id: "3",
    icon: <ShieldCheck className="w-4 h-4" />,
    text: "Verified tick granted to @tech_bd",
    time: "1 hr ago",
    type: "verified",
  },
  {
    id: "4",
    icon: <Package className="w-4 h-4" />,
    text: "New product added: Samsung Galaxy S25",
    time: "3 hr ago",
    type: "product",
  },
  {
    id: "5",
    icon: <FolderOpen className="w-4 h-4" />,
    text: "PDF uploaded: HSC Chemistry Guide 2026",
    time: "5 hr ago",
    type: "file",
  },
  {
    id: "6",
    icon: <UserX className="w-4 h-4" />,
    text: "User banned for spam: @spammer99",
    time: "Yesterday",
    type: "user",
  },
];

function getActivityColor(type: ActivityType): string {
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
    to: "/admin/users" as const,
    icon: <Users className="w-5 h-5" />,
    accent: "oklch(0.62 0.22 260)",
    ocid: "admin.dashboard.users_button",
  },
  {
    label: "Moderate Posts",
    description: "Review flagged content",
    to: "/admin/posts" as const,
    icon: <FileText className="w-5 h-5" />,
    accent: "oklch(0.72 0.26 180)",
    ocid: "admin.dashboard.posts_button",
  },
  {
    label: "Verified Badges",
    description: "Grant or revoke tick marks",
    to: "/admin/verified" as const,
    icon: <ShieldCheck className="w-5 h-5" />,
    accent: "oklch(0.68 0.22 150)",
    ocid: "admin.dashboard.verified_button",
  },
  {
    label: "Products & Files",
    description: "Upload and manage content",
    to: "/admin/products" as const,
    icon: <Package className="w-5 h-5" />,
    accent: "oklch(0.65 0.22 28)",
    ocid: "admin.dashboard.content_button",
  },
];

export default function AdminDashboardPage() {
  const { actor } = useActor(createActor);
  const navigate = useNavigate();
  const [stats, setStats] = useState<LocalStats>(SAMPLE_STATS);
  const [isLoadingStats, setIsLoadingStats] = useState(true);

  // Auth guard
  useEffect(() => {
    const token = localStorage.getItem("siraji_admin_token");
    if (!token) {
      navigate({ to: "/admin/login" });
    }
  }, [navigate]);

  // Load stats from backend
  useEffect(() => {
    async function loadStats() {
      try {
        const token = localStorage.getItem("siraji_admin_token");
        if (!actor || !token) return;
        const result: BackendAdminStats = await actor.getAdminStats(token);
        if (result) {
          setStats({
            totalUsers: Number(result.totalUsers),
            totalPosts: Number(result.totalPosts),
            totalProducts: Number(result.totalProducts),
            totalFiles: Number(result.totalFiles),
          });
        }
      } catch {
        // keep sample stats on error
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
      icon: <Users className="w-5 h-5" />,
      accent: "oklch(0.62 0.22 260)",
      trend: "+12% this week",
      ocid: "admin.dashboard.stat.users",
    },
    {
      label: "Total Posts",
      value: stats.totalPosts.toLocaleString(),
      icon: <FileText className="w-5 h-5" />,
      accent: "oklch(0.72 0.26 180)",
      trend: "+340 today",
      ocid: "admin.dashboard.stat.posts",
    },
    {
      label: "Total Products",
      value: stats.totalProducts.toLocaleString(),
      icon: <Package className="w-5 h-5" />,
      accent: "oklch(0.65 0.22 28)",
      trend: "+8 this week",
      ocid: "admin.dashboard.stat.products",
    },
    {
      label: "Total Files",
      value: stats.totalFiles.toLocaleString(),
      icon: <FolderOpen className="w-5 h-5" />,
      accent: "oklch(0.68 0.22 150)",
      trend: "+3 this week",
      ocid: "admin.dashboard.stat.files",
    },
  ];

  const secondaryStats = [
    {
      label: "Flagged Posts",
      value: SAMPLE_SECONDARY.flaggedPosts,
      icon: <AlertTriangle className="w-4 h-4" />,
      accent: "oklch(0.65 0.19 22)",
      ocid: "admin.dashboard.stat.flagged",
    },
    {
      label: "Verified Users",
      value: SAMPLE_SECONDARY.verifiedUsers,
      icon: <ShieldCheck className="w-4 h-4" />,
      accent: "oklch(0.68 0.22 220)",
      ocid: "admin.dashboard.stat.verified",
    },
    {
      label: "Banned Users",
      value: SAMPLE_SECONDARY.bannedUsers,
      icon: <UserX className="w-4 h-4" />,
      accent: "oklch(0.65 0.2 22)",
      ocid: "admin.dashboard.stat.banned",
    },
    {
      label: "Notifications",
      value: SAMPLE_SECONDARY.notifications,
      icon: <Bell className="w-4 h-4" />,
      accent: "oklch(0.72 0.25 120)",
      ocid: "admin.dashboard.stat.notifications",
    },
  ];

  return (
    <div
      className="admin-dark min-h-screen"
      style={{ background: "oklch(0.11 0.008 282)" }}
    >
      {/* Top bar */}
      <div
        className="sticky top-0 z-30 px-6 py-4 flex items-center justify-between"
        style={{
          background: "oklch(0.14 0.008 282)",
          borderBottom: "1px solid oklch(0.2 0.008 282)",
        }}
      >
        <div>
          <h1
            className="text-xl font-bold"
            style={{
              color: "oklch(0.93 0.01 282)",
              fontFamily: "var(--font-display)",
            }}
          >
            Dashboard Overview
          </h1>
          <p
            className="text-xs mt-0.5"
            style={{ color: "oklch(0.64 0.01 282)" }}
          >
            Saturday, 25 April 2026
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="relative p-2 rounded-lg transition-smooth"
            style={{
              background: "oklch(0.2 0.008 282)",
              color: "oklch(0.84 0.01 282)",
            }}
            aria-label="Notifications"
            data-ocid="admin.dashboard.notifications_button"
          >
            <Bell className="w-5 h-5" />
            {SAMPLE_SECONDARY.notifications > 0 && (
              <span
                className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center"
                style={{
                  background: "oklch(0.65 0.19 22)",
                  color: "oklch(0.98 0 0)",
                }}
              >
                {SAMPLE_SECONDARY.notifications}
              </span>
            )}
          </button>
          <Link
            to="/admin"
            className="p-2 rounded-lg transition-smooth"
            style={{
              background: "oklch(0.2 0.008 282)",
              color: "oklch(0.84 0.01 282)",
            }}
            aria-label="Settings"
            data-ocid="admin.dashboard.settings_button"
          >
            <Settings className="w-5 h-5" />
          </Link>
        </div>
      </div>

      <div className="p-6 max-w-7xl mx-auto space-y-6">
        {/* Welcome banner */}
        <div
          className="rounded-2xl p-6 relative overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.62 0.22 260 / 0.2) 0%, oklch(0.72 0.26 180 / 0.15) 100%)",
            border: "1px solid oklch(0.62 0.22 260 / 0.3)",
          }}
          data-ocid="admin.dashboard.welcome_banner"
        >
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-1">
              <Activity
                className="w-4 h-4"
                style={{ color: "oklch(0.72 0.26 180)" }}
              />
              <span
                className="text-xs font-medium"
                style={{ color: "oklch(0.72 0.26 180)" }}
              >
                LIVE SYSTEM STATUS
              </span>
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ background: "oklch(0.68 0.22 150)" }}
              />
            </div>
            <h2
              className="text-lg font-bold"
              style={{
                color: "oklch(0.93 0.01 282)",
                fontFamily: "var(--font-display)",
              }}
            >
              Welcome back, Admin
            </h2>
            <p
              className="text-sm mt-0.5"
              style={{ color: "oklch(0.74 0.01 282)" }}
            >
              LinkSphere is running smoothly. {SAMPLE_SECONDARY.flaggedPosts}{" "}
              posts require review.
            </p>
          </div>
          <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-10">
            <BarChart2
              className="w-24 h-24"
              style={{ color: "oklch(0.72 0.26 180)" }}
            />
          </div>
        </div>

        {/* Primary stat cards */}
        <div
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
          data-ocid="admin.dashboard.stats_section"
        >
          {statCards.map((card) => (
            <div
              key={card.label}
              className="stat-card admin-dark"
              data-ocid={card.ocid}
            >
              <div className="flex items-start justify-between mb-3">
                <div
                  className="p-2 rounded-lg"
                  style={{ background: `${card.accent}22`, color: card.accent }}
                >
                  {card.icon}
                </div>
                <TrendingUp
                  className="w-3.5 h-3.5"
                  style={{ color: "oklch(0.68 0.22 150)" }}
                />
              </div>
              <div>
                <div
                  className="text-2xl font-bold"
                  style={{
                    color: isLoadingStats
                      ? "oklch(0.28 0.008 282)"
                      : "oklch(0.93 0.01 282)",
                    fontFamily: "var(--font-display)",
                    transition: "color 0.3s",
                  }}
                >
                  {isLoadingStats ? "—" : card.value}
                </div>
                <div
                  className="text-xs mt-0.5"
                  style={{ color: "oklch(0.64 0.01 282)" }}
                >
                  {card.label}
                </div>
                <div
                  className="text-xs mt-1"
                  style={{ color: "oklch(0.68 0.22 150)" }}
                >
                  {card.trend}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Secondary stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {secondaryStats.map((s) => (
            <div
              key={s.label}
              className="rounded-xl px-4 py-3 flex items-center gap-3"
              style={{
                background: "oklch(0.15 0.01 282)",
                border: "1px solid oklch(0.2 0.008 282)",
              }}
              data-ocid={s.ocid}
            >
              <div
                className="p-1.5 rounded-lg"
                style={{ background: `${s.accent}22`, color: s.accent }}
              >
                {s.icon}
              </div>
              <div>
                <div
                  className="font-bold text-base"
                  style={{ color: "oklch(0.93 0.01 282)" }}
                >
                  {s.value}
                </div>
                <div
                  className="text-xs"
                  style={{ color: "oklch(0.64 0.01 282)" }}
                >
                  {s.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main content: Quick Actions + Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Quick Actions */}
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              background: "oklch(0.15 0.01 282)",
              border: "1px solid oklch(0.2 0.008 282)",
            }}
            data-ocid="admin.dashboard.quick_actions_section"
          >
            <div
              className="px-5 py-4 border-b"
              style={{ borderColor: "oklch(0.2 0.008 282)" }}
            >
              <h3
                className="font-semibold text-sm"
                style={{
                  color: "oklch(0.84 0.01 282)",
                  fontFamily: "var(--font-display)",
                }}
              >
                Quick Actions
              </h3>
              <p
                className="text-xs mt-0.5"
                style={{ color: "oklch(0.54 0.01 282)" }}
              >
                Jump to management sections
              </p>
            </div>
            <div className="p-3 space-y-2">
              {QUICK_ACTIONS.map((action) => (
                <Link
                  key={action.ocid}
                  to={action.to}
                  className="flex items-center gap-4 p-3 rounded-xl transition-smooth group"
                  style={{ color: "oklch(0.84 0.01 282)" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background =
                      "oklch(0.2 0.008 282)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background =
                      "transparent";
                  }}
                  data-ocid={action.ocid}
                >
                  <div
                    className="p-2.5 rounded-xl"
                    style={{
                      background: `${action.accent}20`,
                      color: action.accent,
                    }}
                  >
                    {action.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div
                      className="font-medium text-sm"
                      style={{ color: "oklch(0.93 0.01 282)" }}
                    >
                      {action.label}
                    </div>
                    <div
                      className="text-xs truncate"
                      style={{ color: "oklch(0.54 0.01 282)" }}
                    >
                      {action.description}
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 flex-shrink-0 opacity-40 group-hover:opacity-100 transition-smooth" />
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              background: "oklch(0.15 0.01 282)",
              border: "1px solid oklch(0.2 0.008 282)",
            }}
            data-ocid="admin.dashboard.activity_section"
          >
            <div
              className="px-5 py-4 border-b flex items-center justify-between"
              style={{ borderColor: "oklch(0.2 0.008 282)" }}
            >
              <div>
                <h3
                  className="font-semibold text-sm"
                  style={{
                    color: "oklch(0.84 0.01 282)",
                    fontFamily: "var(--font-display)",
                  }}
                >
                  Recent Activity
                </h3>
                <p
                  className="text-xs mt-0.5"
                  style={{ color: "oklch(0.54 0.01 282)" }}
                >
                  Latest system events
                </p>
              </div>
              <button
                type="button"
                className="text-xs px-3 py-1.5 rounded-lg transition-smooth"
                style={{
                  background: "oklch(0.2 0.008 282)",
                  color: "oklch(0.72 0.26 180)",
                }}
                data-ocid="admin.dashboard.view_all_activity_button"
              >
                <Eye className="w-3.5 h-3.5 inline mr-1" />
                View all
              </button>
            </div>
            <div className="p-3 space-y-1">
              {RECENT_ACTIVITY.map((item, idx) => (
                <div
                  key={item.id}
                  className="flex items-start gap-3 px-3 py-2.5 rounded-xl"
                  data-ocid={`admin.dashboard.activity.item.${idx + 1}`}
                >
                  <div className="flex flex-col items-center mt-0.5">
                    <div
                      className="p-1.5 rounded-lg flex-shrink-0"
                      style={{
                        background: `${getActivityColor(item.type)}20`,
                        color: getActivityColor(item.type),
                      }}
                    >
                      {item.icon}
                    </div>
                    {idx < RECENT_ACTIVITY.length - 1 && (
                      <div
                        className="w-px flex-1 mt-1.5 min-h-[12px]"
                        style={{ background: "oklch(0.22 0.008 282)" }}
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-0 pb-1">
                    <p
                      className="text-xs leading-relaxed"
                      style={{ color: "oklch(0.84 0.01 282)" }}
                    >
                      {item.text}
                    </p>
                    <p
                      className="text-[11px] mt-0.5"
                      style={{ color: "oklch(0.48 0.01 282)" }}
                    >
                      {item.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
