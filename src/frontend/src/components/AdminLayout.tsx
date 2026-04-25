import { useAdminAuth } from "@/hooks/use-admin-auth";
import { cn } from "@/lib/utils";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  BarChart3,
  CheckCircle2,
  FileText,
  Flag,
  LayoutDashboard,
  LogOut,
  Settings,
  ShoppingBag,
  Users,
} from "lucide-react";
import type { ReactNode } from "react";

interface AdminLayoutProps {
  children: ReactNode;
}

const adminNavItems = [
  {
    to: "/admin",
    label: "Dashboard",
    icon: LayoutDashboard,
    ocid: "admin_nav.dashboard",
    exact: true,
  },
  {
    to: "/admin/users",
    label: "Users",
    icon: Users,
    ocid: "admin_nav.users",
  },
  {
    to: "/admin/posts",
    label: "Posts",
    icon: Flag,
    ocid: "admin_nav.posts",
  },
  {
    to: "/admin/verified",
    label: "Verified",
    icon: CheckCircle2,
    ocid: "admin_nav.verified",
  },
  {
    to: "/admin/products",
    label: "Products",
    icon: ShoppingBag,
    ocid: "admin_nav.products",
  },
  {
    to: "/admin/files",
    label: "Files",
    icon: FileText,
    ocid: "admin_nav.files",
  },
  {
    to: "/admin/analytics",
    label: "Analytics",
    icon: BarChart3,
    ocid: "admin_nav.analytics",
  },
  {
    to: "/admin/settings",
    label: "Settings",
    icon: Settings,
    ocid: "admin_nav.settings",
  },
];

function AdminSidebar() {
  const { adminEmail, adminLogout } = useAdminAuth();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  return (
    <aside
      className="fixed top-0 left-0 h-full w-64 flex flex-col z-30"
      style={{ background: "oklch(0.14 0.008 282)" }}
      data-ocid="admin_sidebar"
    >
      {/* Logo */}
      <div
        className="flex items-center gap-3 px-5 py-5 border-b"
        style={{ borderColor: "oklch(0.2 0.008 282)" }}
      >
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center shadow-md flex-shrink-0"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.72 0.26 180) 0%, oklch(0.62 0.22 260) 100%)",
          }}
        >
          <svg
            viewBox="0 0 32 32"
            className="w-5 h-5"
            fill="white"
            aria-hidden="true"
          >
            <rect x="4" y="4" width="10" height="10" rx="2" opacity="0.9" />
            <rect x="18" y="4" width="10" height="10" rx="2" opacity="0.7" />
            <rect x="4" y="18" width="10" height="10" rx="2" opacity="0.7" />
            <rect x="18" y="18" width="10" height="10" rx="2" opacity="0.9" />
          </svg>
        </div>
        <div>
          <p
            className="font-display font-bold text-base leading-tight"
            style={{ color: "oklch(0.93 0.01 282)" }}
          >
            Siraji
          </p>
          <p
            className="text-[10px] leading-none"
            style={{ color: "oklch(0.64 0.01 282)" }}
          >
            Admin Panel
          </p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-0.5">
        {adminNavItems.map((item) => {
          const isActive = item.exact
            ? currentPath === item.to
            : currentPath.startsWith(item.to);
          return (
            <Link
              key={item.to}
              to={item.to}
              data-ocid={item.ocid}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-smooth",
              )}
              style={
                isActive
                  ? {
                      background: "oklch(0.72 0.26 180 / 0.15)",
                      color: "oklch(0.72 0.26 180)",
                      borderLeft: "3px solid oklch(0.72 0.26 180)",
                    }
                  : {
                      color: "oklch(0.64 0.01 282)",
                    }
              }
            >
              <item.icon
                className="w-4.5 h-4.5 flex-shrink-0"
                strokeWidth={isActive ? 2.5 : 1.75}
                style={{ width: "1.125rem", height: "1.125rem" }}
              />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Admin info + logout */}
      <div
        className="p-4 border-t"
        style={{ borderColor: "oklch(0.2 0.008 282)" }}
      >
        <div className="flex items-center gap-3 mb-3">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
            style={{
              background: "oklch(0.72 0.26 180 / 0.2)",
              color: "oklch(0.72 0.26 180)",
            }}
          >
            {adminEmail ? adminEmail[0].toUpperCase() : "A"}
          </div>
          <div className="flex-1 min-w-0">
            <p
              className="text-xs font-medium truncate"
              style={{ color: "oklch(0.93 0.01 282)" }}
            >
              {adminEmail ?? "Admin"}
            </p>
            <p
              className="text-[10px]"
              style={{ color: "oklch(0.64 0.01 282)" }}
            >
              Administrator
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={adminLogout}
          data-ocid="admin_nav.logout_button"
          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-smooth"
          style={{ color: "oklch(0.64 0.01 282)" }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color =
              "oklch(0.65 0.19 22)";
            (e.currentTarget as HTMLButtonElement).style.background =
              "oklch(0.65 0.19 22 / 0.1)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color =
              "oklch(0.64 0.01 282)";
            (e.currentTarget as HTMLButtonElement).style.background =
              "transparent";
          }}
        >
          <LogOut className="w-4 h-4 flex-shrink-0" />
          Logout
        </button>
      </div>
    </aside>
  );
}

function AdminTopBar() {
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;
  const currentItem = adminNavItems.find((item) =>
    item.exact ? currentPath === item.to : currentPath.startsWith(item.to),
  );

  return (
    <header
      className="h-14 flex items-center justify-between px-6 border-b"
      style={{
        background: "oklch(0.15 0.01 282)",
        borderColor: "oklch(0.2 0.008 282)",
      }}
      data-ocid="admin_topbar"
    >
      <div>
        <h1
          className="font-display font-bold text-base"
          style={{ color: "oklch(0.93 0.01 282)" }}
        >
          {currentItem?.label ?? "Admin"}
        </h1>
        <p className="text-[11px]" style={{ color: "oklch(0.64 0.01 282)" }}>
          LinkSphere Control Center
        </p>
      </div>
      <div className="flex items-center gap-2">
        <span
          className="text-xs px-2 py-1 rounded-full"
          style={{
            background: "oklch(0.72 0.26 180 / 0.15)",
            color: "oklch(0.72 0.26 180)",
          }}
        >
          Live
        </span>
      </div>
    </header>
  );
}

export function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div
      className="admin-dark min-h-screen flex"
      style={{ background: "oklch(0.11 0.008 282)" }}
    >
      <AdminSidebar />
      <div className="flex-1 flex flex-col ml-64">
        <AdminTopBar />
        <main
          className="flex-1 overflow-auto p-6"
          style={{
            background: "oklch(0.11 0.008 282)",
            color: "oklch(0.93 0.01 282)",
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
