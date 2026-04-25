import { createActor } from "@/backend";
import { UserAvatar } from "@/components/UserAvatar";
import { useAuth } from "@/hooks/use-auth";
import { useNotifications } from "@/hooks/use-backend";
import type { NotifType, Notification } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import {
  BadgeCheck,
  Bell,
  CheckCircle2,
  Heart,
  LogIn,
  MessageCircle,
  UserCheck,
  UserPlus,
} from "lucide-react";

// ── Helpers ───────────────────────────────────────────────────────────────────

function timeAgo(ts: bigint): string {
  const diff = Date.now() - Number(ts) / 1_000_000;
  const m = Math.floor(diff / 60000);
  if (m < 1) return "Just now";
  if (m < 60) return `${m}m`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h`;
  const d = Math.floor(h / 24);
  if (d < 7) return `${d}d`;
  return `${Math.floor(d / 7)}w`;
}

function isToday(ts: bigint): boolean {
  const d = new Date(Number(ts) / 1_000_000);
  const now = new Date();
  return (
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate()
  );
}

// ── Notification type metadata — Facebook icon colors ─────────────────────────

function notifMeta(type: NotifType): {
  icon: React.ReactNode;
  bgColor: string;
} {
  switch (type) {
    case "like_post":
      return {
        icon: <Heart className="w-3 h-3" fill="white" />,
        bgColor: "#F02849",
      };
    case "comment_post":
      return {
        icon: (
          <MessageCircle className="w-3 h-3" fill="white" strokeWidth={0} />
        ),
        bgColor: "#1877F2",
      };
    case "friend_request":
      return {
        icon: <UserPlus className="w-3 h-3 text-white" strokeWidth={2} />,
        bgColor: "#1877F2",
      };
    case "friend_accept":
      return {
        icon: <UserCheck className="w-3 h-3 text-white" strokeWidth={2} />,
        bgColor: "#42B72A",
      };
    case "verified_granted":
      return {
        icon: <BadgeCheck className="w-3 h-3 text-white" strokeWidth={2} />,
        bgColor: "#1877F2",
      };
    default:
      return {
        icon: <Bell className="w-3 h-3 text-white" strokeWidth={2} />,
        bgColor: "#65676B",
      };
  }
}

function getNavTarget(notif: Notification): string {
  switch (notif.notifType) {
    case "friend_request":
    case "friend_accept":
      return "/friends";
    case "like_post":
    case "comment_post":
      return "/";
    case "verified_granted":
      return "/profile";
    default:
      return "/";
  }
}

// ── Sub-components ─────────────────────────────────────────────────────────────

function SectionHeader({ label }: { label: string }) {
  return (
    <div className="px-4 pt-4 pb-1">
      <h2 className="font-bold text-lg" style={{ color: "#050505" }}>
        {label}
      </h2>
    </div>
  );
}

function NotifItemSkeleton() {
  return (
    <div className="flex items-center gap-3 px-4 py-2.5">
      <div className="relative flex-shrink-0">
        <div
          className="w-14 h-14 rounded-full animate-pulse"
          style={{ background: "#E4E6EB" }}
        />
        <div
          className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full animate-pulse border-2 border-white"
          style={{ background: "#E4E6EB" }}
        />
      </div>
      <div className="flex-1 min-w-0 space-y-2">
        <div
          className="h-3.5 rounded-full w-4/5 animate-pulse"
          style={{ background: "#E4E6EB" }}
        />
        <div
          className="h-3 rounded-full w-2/5 animate-pulse"
          style={{ background: "#E4E6EB" }}
        />
      </div>
    </div>
  );
}

function NotifItem({
  notif,
  index,
  onRead,
  onNavigate,
}: {
  notif: Notification;
  index: number;
  onRead: (id: bigint) => void;
  onNavigate: (path: string) => void;
}) {
  const meta = notifMeta(notif.notifType);

  function handleClick() {
    if (!notif.isRead) onRead(notif.id);
    onNavigate(getNavTarget(notif));
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors"
      style={{
        background: !notif.isRead ? "#E7F3FF" : "transparent",
      }}
      onMouseEnter={(e) => {
        if (notif.isRead)
          (e.currentTarget as HTMLButtonElement).style.background = "#F2F2F2";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.background = !notif.isRead
          ? "#E7F3FF"
          : "transparent";
      }}
      data-ocid={`notifications.item.${index}`}
    >
      {/* Avatar + type badge */}
      <div className="relative flex-shrink-0">
        <UserAvatar name={notif.actorName} size="lg" />
        <span
          className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full flex items-center justify-center border-2 border-white"
          style={{ background: meta.bgColor }}
        >
          {meta.icon}
        </span>
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <p className="text-sm leading-snug" style={{ color: "#050505" }}>
          <span className="font-semibold">{notif.actorName}</span>{" "}
          <span style={{ color: "#050505" }}>{notif.message}</span>
        </p>
        <p
          className="text-xs mt-0.5 font-medium"
          style={{ color: !notif.isRead ? "#1877F2" : "#65676B" }}
        >
          {timeAgo(notif.createdAt)}
        </p>
      </div>

      {/* Unread blue dot */}
      {!notif.isRead && (
        <span
          className="w-2.5 h-2.5 rounded-full flex-shrink-0"
          style={{ background: "#1877F2" }}
        />
      )}
    </button>
  );
}

function FriendRequestActions({
  notif,
  index,
  onAccept,
  onDecline,
}: {
  notif: Notification;
  index: number;
  onAccept: () => void;
  onDecline: () => void;
}) {
  if (notif.notifType !== "friend_request") return null;
  return (
    <div className="flex gap-2 px-4 pb-2" style={{ paddingLeft: "4.75rem" }}>
      <button
        type="button"
        onClick={onAccept}
        className="flex-1 py-1.5 rounded-md text-sm font-semibold text-white transition-opacity hover:opacity-90"
        style={{ background: "#1877F2" }}
        data-ocid={`notifications.accept_button.${index}`}
      >
        Confirm
      </button>
      <button
        type="button"
        onClick={onDecline}
        className="flex-1 py-1.5 rounded-md text-sm font-semibold transition-opacity hover:opacity-90"
        style={{ background: "#E4E6EB", color: "#050505" }}
        data-ocid={`notifications.decline_button.${index}`}
      >
        Delete
      </button>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function NotificationsPage() {
  const { isAuthenticated, signIn } = useAuth();
  const navigate = useNavigate();
  const { data: notifications = [], isLoading } = useNotifications();
  const { actor } = useActor(createActor);
  const qc = useQueryClient();

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const todayNotifs = notifications.filter((n) => isToday(n.createdAt));
  const earlierNotifs = notifications.filter((n) => !isToday(n.createdAt));

  async function markRead(id: bigint) {
    if (!actor) return;
    await actor.markNotificationRead(id);
    qc.invalidateQueries({ queryKey: ["notifications"] });
  }

  async function markAll() {
    if (!actor) return;
    await actor.markAllNotificationsRead();
    qc.invalidateQueries({ queryKey: ["notifications"] });
  }

  function handleNavigate(path: string) {
    navigate({ to: path as "/" | "/friends" | "/profile" });
  }

  function handleAccept(notif: Notification) {
    if (!actor || !notif.targetId) return;
    actor.acceptFriendRequest(notif.actorId).then(() => {
      qc.invalidateQueries({ queryKey: ["notifications"] });
      qc.invalidateQueries({ queryKey: ["friends"] });
    });
  }

  function handleDecline(notif: Notification) {
    if (!actor) return;
    actor.cancelFriendRequest(notif.actorId).then(() => {
      qc.invalidateQueries({ queryKey: ["notifications"] });
      qc.invalidateQueries({ queryKey: ["friend-requests"] });
    });
  }

  // ── Unauthenticated ──────────────────────────────────────────────────────────
  if (!isAuthenticated) {
    return (
      <div
        className="flex flex-col items-center justify-center py-24 gap-5 px-6 min-h-full"
        style={{ background: "#F0F2F5" }}
        data-ocid="notifications.page"
      >
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center"
          style={{ background: "#E4E6EB" }}
        >
          <Bell className="w-10 h-10" style={{ color: "#65676B" }} />
        </div>
        <div className="text-center">
          <h2 className="text-xl font-bold mb-1" style={{ color: "#050505" }}>
            Sign in to see notifications
          </h2>
          <p className="text-sm" style={{ color: "#65676B" }}>
            You'll see likes, comments, and friend requests here.
          </p>
        </div>
        <button
          type="button"
          onClick={signIn}
          className="px-8 py-2.5 rounded-md font-semibold text-sm text-white flex items-center gap-2 transition-opacity hover:opacity-90"
          style={{ background: "#1877F2" }}
          data-ocid="notifications.signin_button"
        >
          <LogIn className="w-4 h-4" />
          Sign In
        </button>
      </div>
    );
  }

  // ── Main render ──────────────────────────────────────────────────────────────
  return (
    <div
      className="min-h-full"
      style={{ background: "#FFFFFF" }}
      data-ocid="notifications.page"
    >
      {/* Sticky Header */}
      <div
        className="sticky top-0 z-10 border-b"
        style={{ background: "#FFFFFF", borderColor: "#CED0D4" }}
      >
        <div className="flex items-center justify-between px-4 py-3.5">
          <div>
            <h1 className="font-bold text-2xl" style={{ color: "#050505" }}>
              Notifications
            </h1>
            {unreadCount > 0 && (
              <p className="text-xs mt-0.5" style={{ color: "#65676B" }}>
                {unreadCount} new
              </p>
            )}
          </div>
          {unreadCount > 0 && (
            <button
              type="button"
              onClick={markAll}
              className="text-sm font-semibold px-3 py-1.5 rounded-md transition-colors hover:opacity-90"
              style={{ color: "#1877F2" }}
              data-ocid="notifications.mark_all_read_button"
            >
              Mark all as read
            </button>
          )}
        </div>
      </div>

      {/* Loading skeleton */}
      {isLoading ? (
        <div data-ocid="notifications.loading_state">
          <SectionHeader label="New" />
          {[1, 2, 3].map((k) => (
            <NotifItemSkeleton key={k} />
          ))}
          <SectionHeader label="Earlier" />
          {[4, 5, 6].map((k) => (
            <NotifItemSkeleton key={k} />
          ))}
        </div>
      ) : notifications.length === 0 ? (
        /* Empty state */
        <div
          className="flex flex-col items-center justify-center py-20 gap-4 px-6"
          data-ocid="notifications.empty_state"
        >
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center"
            style={{ background: "#F0F2F5" }}
          >
            <Bell
              className="w-12 h-12"
              style={{ color: "#BEC3C9" }}
              strokeWidth={1.25}
            />
          </div>
          <div className="text-center">
            <h3 className="font-bold text-lg mb-1" style={{ color: "#050505" }}>
              No notifications yet
            </h3>
            <p
              className="text-sm leading-relaxed max-w-xs"
              style={{ color: "#65676B" }}
            >
              When someone likes your posts, comments, or sends a friend
              request, you'll see it here.
            </p>
          </div>
          <div className="flex gap-3 mt-1">
            <CheckCircle2 className="w-4 h-4" style={{ color: "#BEC3C9" }} />
            <Heart className="w-4 h-4" style={{ color: "#BEC3C9" }} />
            <MessageCircle className="w-4 h-4" style={{ color: "#BEC3C9" }} />
            <UserPlus className="w-4 h-4" style={{ color: "#BEC3C9" }} />
          </div>
        </div>
      ) : (
        <div data-ocid="notifications.list">
          {/* NEW / TODAY section */}
          {todayNotifs.length > 0 && (
            <section data-ocid="notifications.today_section">
              <SectionHeader label="New" />
              {todayNotifs.map((notif, i) => (
                <div key={String(notif.id)}>
                  <NotifItem
                    notif={notif}
                    index={i + 1}
                    onRead={markRead}
                    onNavigate={handleNavigate}
                  />
                  <FriendRequestActions
                    notif={notif}
                    index={i + 1}
                    onAccept={() => handleAccept(notif)}
                    onDecline={() => handleDecline(notif)}
                  />
                </div>
              ))}
            </section>
          )}

          {/* EARLIER section */}
          {earlierNotifs.length > 0 && (
            <section data-ocid="notifications.earlier_section">
              <SectionHeader label="Earlier" />
              {earlierNotifs.map((notif, i) => (
                <div key={String(notif.id)}>
                  <NotifItem
                    notif={notif}
                    index={todayNotifs.length + i + 1}
                    onRead={markRead}
                    onNavigate={handleNavigate}
                  />
                  <FriendRequestActions
                    notif={notif}
                    index={todayNotifs.length + i + 1}
                    onAccept={() => handleAccept(notif)}
                    onDecline={() => handleDecline(notif)}
                  />
                </div>
              ))}
            </section>
          )}

          <div className="h-4" />
        </div>
      )}
    </div>
  );
}
