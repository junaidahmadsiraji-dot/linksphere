import { UserAvatar } from "@/components/UserAvatar";
import { useAuth } from "@/hooks/use-auth";
import { useNotifications } from "@/hooks/use-backend";
import { cn } from "@/lib/utils";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  Bell,
  Film,
  Home,
  LogIn,
  LogOut,
  MessageCircle,
  Search,
  User,
  Users,
} from "lucide-react";
import type { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const navItems = [
  { to: "/", label: "Home", icon: Home, ocid: "nav.feed" },
  { to: "/reels", label: "Reels", icon: Film, ocid: "nav.reels" },
  { to: "/friends", label: "Friends", icon: Users, ocid: "nav.friends" },
  {
    to: "/notifications",
    label: "Notifications",
    icon: Bell,
    ocid: "nav.notifications",
  },
  { to: "/profile", label: "Profile", icon: User, ocid: "nav.profile" },
];

/** Facebook "f" wordmark SVG */
function FbLogo() {
  return (
    <svg
      viewBox="0 0 36 36"
      className="w-10 h-10 flex-shrink-0"
      role="img"
      aria-labelledby="fb-logo-title"
    >
      <title id="fb-logo-title">LinkSphere</title>
      <circle cx="18" cy="18" r="18" fill="#1877F2" />
      <path
        d="M20.5 19.5H23l.75-3H20.5v-1.5c0-.82.4-1.5 1.5-1.5H24V11.1A15.4 15.4 0 0 0 21.3 11c-2.7 0-4.3 1.6-4.3 4.5V16.5H14v3h3V27h3.5V19.5z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

function NotifBadge() {
  const { data: notifs = [] } = useNotifications();
  const unread = notifs.filter((n) => !n.isRead).length;
  if (!unread) return null;
  return (
    <span
      className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-bold text-white flex items-center justify-center"
      style={{ background: "#E41E3F" }}
    >
      {unread > 99 ? "99+" : unread}
    </span>
  );
}

function Header() {
  const { isAuthenticated, principal, signIn, signOut } = useAuth();

  return (
    <header
      className="sticky top-0 z-40 shadow-elevated"
      style={{ background: "#1877F2" }}
      data-ocid="header"
    >
      <div className="flex items-center gap-2 px-3 h-14 max-w-screen-xl mx-auto">
        {/* Left: Logo */}
        <Link
          to="/"
          className="flex items-center gap-1.5 flex-shrink-0 mr-1"
          data-ocid="header.logo_link"
          aria-label="LinkSphere home"
        >
          <FbLogo />
          <span className="hidden lg:block font-display font-bold text-white text-xl tracking-tight leading-none">
            LinkSphere
          </span>
        </Link>

        {/* Center: Search bar */}
        <div className="flex-1 max-w-[240px] sm:max-w-xs">
          <div
            className="flex items-center gap-2 px-3 py-2 rounded-full"
            style={{ background: "rgba(255,255,255,0.15)" }}
          >
            <Search className="w-4 h-4 text-white/80 flex-shrink-0" />
            <input
              type="search"
              placeholder="Search LinkSphere"
              className="bg-transparent text-white placeholder-white/70 text-sm outline-none w-full"
              data-ocid="header.search_input"
              aria-label="Search LinkSphere"
            />
          </div>
        </div>

        {/* Right: action icons */}
        <div className="flex items-center gap-1.5 ml-auto">
          {/* Messenger */}
          <button
            type="button"
            className="fb-icon-btn w-10 h-10"
            aria-label="Messenger"
            data-ocid="header.messenger_button"
            style={{ background: "rgba(255,255,255,0.15)" }}
          >
            <MessageCircle className="w-5 h-5 text-white" />
          </button>

          {/* Notification bell */}
          <button
            type="button"
            className="fb-icon-btn w-10 h-10 relative"
            aria-label="Notifications"
            data-ocid="header.notification_button"
            style={{ background: "rgba(255,255,255,0.15)" }}
          >
            <Bell className="w-5 h-5 text-white" />
            <NotifBadge />
          </button>

          {/* Auth area */}
          {isAuthenticated && principal ? (
            <div className="flex items-center gap-1.5">
              <Link to="/profile" data-ocid="header.profile_link">
                <div
                  className="w-10 h-10 rounded-full border-2 border-white/60 flex items-center justify-center overflow-hidden cursor-pointer hover:border-white transition-colors"
                  aria-label="My profile"
                >
                  <UserAvatar name={principal.slice(0, 6)} size="sm" />
                </div>
              </Link>
              <button
                type="button"
                onClick={signOut}
                aria-label="Sign out"
                data-ocid="header.signout_button"
                className="fb-icon-btn w-10 h-10 hidden sm:flex"
                style={{ background: "rgba(255,255,255,0.15)" }}
              >
                <LogOut className="w-4 h-4 text-white" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={signIn}
              data-ocid="header.signin_button"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold transition-colors"
              style={{ background: "#FFFFFF", color: "#1877F2" }}
            >
              <LogIn className="w-4 h-4" />
              <span className="hidden sm:inline">Log In</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

function BottomNav() {
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 border-t md:hidden"
      style={{
        background: "#FFFFFF",
        borderColor: "#CED0D4",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
      data-ocid="bottom_nav"
    >
      <ul className="flex items-stretch h-14">
        {navItems.map((item) => {
          const isActive =
            item.to === "/"
              ? currentPath === "/"
              : currentPath.startsWith(item.to);
          return (
            <li key={item.to} className="flex-1">
              <Link
                to={item.to}
                data-ocid={item.ocid}
                className={cn(
                  "flex flex-col items-center justify-center h-full w-full gap-0.5 relative transition-colors",
                  isActive ? "" : "",
                )}
                style={{ color: isActive ? "#1877F2" : "#65676B" }}
                aria-label={item.label}
                aria-current={isActive ? "page" : undefined}
              >
                {isActive && (
                  <span
                    className="absolute top-0 left-0 right-0 h-[3px] rounded-b"
                    style={{ background: "#1877F2" }}
                    aria-hidden="true"
                  />
                )}
                <span className="relative">
                  <item.icon
                    className="w-6 h-6"
                    strokeWidth={isActive ? 2.5 : 1.75}
                  />
                  {item.to === "/notifications" && <NotifBadge />}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function SideNav() {
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  return (
    <aside
      className="hidden md:flex flex-col w-72 shrink-0 sticky top-14 self-start h-[calc(100vh-3.5rem)] overflow-y-auto border-r"
      style={{ background: "#FFFFFF", borderColor: "#CED0D4" }}
      data-ocid="side_nav"
    >
      <nav className="flex flex-col gap-1 p-2 pt-3">
        {navItems.map((item) => {
          const isActive =
            item.to === "/"
              ? currentPath === "/"
              : currentPath.startsWith(item.to);
          return (
            <Link
              key={item.to}
              to={item.to}
              data-ocid={`sidenav.${item.ocid.split(".")[1]}`}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors font-body text-sm font-medium"
              style={{
                background: isActive ? "#E7F3FF" : "transparent",
                color: isActive ? "#1877F2" : "#050505",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLAnchorElement).style.background =
                    "#F2F2F2";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLAnchorElement).style.background =
                    "transparent";
                }
              }}
              aria-current={isActive ? "page" : undefined}
            >
              <span className="relative flex-shrink-0">
                <item.icon
                  className="w-5 h-5"
                  strokeWidth={isActive ? 2.5 : 1.75}
                />
                {item.to === "/notifications" && <NotifBadge />}
              </span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto p-4 border-t" style={{ borderColor: "#CED0D4" }}>
        <p className="text-xs text-center" style={{ color: "#65676B" }}>
          © {new Date().getFullYear()}{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
            style={{ color: "#1877F2" }}
          >
            caffeine.ai
          </a>
        </p>
      </div>
    </aside>
  );
}

export function Layout({ children }: LayoutProps) {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "#F0F2F5" }}
    >
      <Header />

      <div className="flex flex-1 max-w-screen-xl mx-auto w-full">
        <SideNav />
        <main className="flex-1 min-w-0 pb-20 md:pb-6">{children}</main>
      </div>

      <BottomNav />

      {/* Mobile footer */}
      <div
        className="md:hidden text-center py-2 pb-20 border-t"
        style={{ background: "#FFFFFF", borderColor: "#CED0D4" }}
      >
        <p className="text-xs" style={{ color: "#65676B" }}>
          © {new Date().getFullYear()}{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
            style={{ color: "#1877F2" }}
          >
            caffeine.ai
          </a>
        </p>
      </div>
    </div>
  );
}
