import { createActor } from "@/backend";
import { UserAvatar } from "@/components/UserAvatar";
import { useAuth } from "@/hooks/use-auth";
import {
  useFriendRequests,
  useFriendSuggestions,
  useFriends,
} from "@/hooks/use-backend";
import type { FriendView, UserId } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQueryClient } from "@tanstack/react-query";
import {
  Clock,
  Search,
  UserCheck,
  UserMinus,
  UserPlus,
  Users,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useState } from "react";

type Tab = "requests" | "suggestions" | "friends";

const SKELETON_KEYS = ["sk1", "sk2", "sk3", "sk4", "sk5", "sk6"] as const;

// ── Skeleton Grid ──────────────────────────────────────────────────────────────

function SkeletonGrid() {
  return (
    <ul
      className="grid grid-cols-2 gap-3 list-none p-0 m-0"
      data-ocid="friends.loading_state"
      aria-busy="true"
      aria-label="Loading friends"
    >
      {SKELETON_KEYS.map((k) => (
        <li
          key={k}
          className="bg-white rounded-lg p-3 flex flex-col items-center gap-3 border border-[#CED0D4]"
        >
          <div className="w-20 h-20 rounded-full bg-[#F0F2F5] animate-pulse" />
          <div className="w-3/4 h-3 bg-[#F0F2F5] animate-pulse rounded-full" />
          <div className="w-1/2 h-2.5 bg-[#F0F2F5] animate-pulse rounded-full" />
          <div className="w-full h-8 bg-[#F0F2F5] animate-pulse rounded-md" />
        </li>
      ))}
    </ul>
  );
}

// ── Empty State ────────────────────────────────────────────────────────────────

function EmptyState({
  icon,
  title,
  subtitle,
  ocid,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  ocid: string;
}) {
  return (
    <div
      className="flex flex-col items-center justify-center py-14 gap-3 text-center px-4"
      data-ocid={ocid}
    >
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center"
        style={{ background: "#E4E6EB" }}
      >
        {icon}
      </div>
      <p className="font-semibold text-base" style={{ color: "#050505" }}>
        {title}
      </p>
      <p
        className="text-sm max-w-xs leading-relaxed"
        style={{ color: "#65676B" }}
      >
        {subtitle}
      </p>
    </div>
  );
}

// ── Facebook-style Friend Card ─────────────────────────────────────────────────

interface FriendCardProps {
  friend: FriendView;
  actions: React.ReactNode;
  index: number;
}

function FriendCard({ friend, actions, index }: FriendCardProps) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2, delay: index * 0.04 }}
      className="bg-white rounded-lg border border-[#CED0D4] overflow-hidden flex flex-col list-none"
    >
      {/* Large avatar — Facebook style */}
      <div className="relative">
        <div
          className="w-full aspect-square overflow-hidden"
          style={{ background: "#F0F2F5" }}
        >
          <UserAvatar
            name={friend.username}
            size="xl"
            src={friend.avatar?.getDirectURL()}
            className="w-full h-full rounded-none"
          />
        </div>
      </div>

      {/* Info + actions */}
      <div className="p-3 flex flex-col gap-2">
        <div className="min-w-0">
          <p
            className="font-semibold text-sm truncate"
            style={{ color: "#050505" }}
          >
            {friend.username}
          </p>
          {Number(friend.mutualFriendCount) > 0 && (
            <p className="text-xs mt-0.5" style={{ color: "#65676B" }}>
              <Users className="w-3 h-3 inline mr-0.5 -mt-0.5" />
              {Number(friend.mutualFriendCount)}{" "}
              {Number(friend.mutualFriendCount) === 1
                ? "mutual friend"
                : "mutual friends"}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-1.5">{actions}</div>
      </div>
    </motion.li>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────────

export default function FriendsPage() {
  const { isAuthenticated, signIn } = useAuth();
  const [tab, setTab] = useState<Tab>("requests");
  const [friendSearch, setFriendSearch] = useState("");
  const [pendingIds, setPendingIds] = useState<Set<string>>(new Set());
  const { actor } = useActor(createActor);
  const qc = useQueryClient();

  const { data: requests = [], isLoading: loadingRequests } =
    useFriendRequests();
  const { data: suggestions = [], isLoading: loadingSuggestions } =
    useFriendSuggestions();
  const { data: friends = [], isLoading: loadingFriends } = useFriends();

  const setPending = useCallback((userId: UserId, val: boolean) => {
    setPendingIds((prev) => {
      const next = new Set(prev);
      if (val) next.add(String(userId));
      else next.delete(String(userId));
      return next;
    });
  }, []);

  async function accept(userId: UserId) {
    if (!actor) return;
    setPending(userId, true);
    try {
      await actor.acceptFriendRequest(userId);
      qc.invalidateQueries({ queryKey: ["friend-requests"] });
      qc.invalidateQueries({ queryKey: ["friends"] });
    } finally {
      setPending(userId, false);
    }
  }

  async function reject(userId: UserId) {
    if (!actor) return;
    setPending(userId, true);
    try {
      await actor.rejectFriendRequest(userId);
      qc.invalidateQueries({ queryKey: ["friend-requests"] });
    } finally {
      setPending(userId, false);
    }
  }

  async function sendRequest(userId: UserId) {
    if (!actor) return;
    setPending(userId, true);
    try {
      await actor.sendFriendRequest(userId);
      qc.invalidateQueries({ queryKey: ["friend-suggestions"] });
    } finally {
      setPending(userId, false);
    }
  }

  async function cancelRequest(userId: UserId) {
    if (!actor) return;
    setPending(userId, true);
    try {
      await actor.cancelFriendRequest(userId);
      qc.invalidateQueries({ queryKey: ["friend-suggestions"] });
    } finally {
      setPending(userId, false);
    }
  }

  async function unfriend(userId: UserId) {
    if (!actor) return;
    setPending(userId, true);
    try {
      await actor.unfriend(userId);
      qc.invalidateQueries({ queryKey: ["friends"] });
    } finally {
      setPending(userId, false);
    }
  }

  if (!isAuthenticated) {
    return (
      <div
        className="flex flex-col items-center justify-center py-24 gap-5 px-6"
        style={{ background: "#F0F2F5", minHeight: "100%" }}
      >
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center"
          style={{ background: "#E4E6EB" }}
        >
          <Users className="w-10 h-10" style={{ color: "#65676B" }} />
        </div>
        <div className="text-center">
          <h2 className="text-xl font-bold mb-1" style={{ color: "#050505" }}>
            Sign in to connect
          </h2>
          <p className="text-sm" style={{ color: "#65676B" }}>
            Manage friend requests, find people you know, and more.
          </p>
        </div>
        <button
          type="button"
          onClick={signIn}
          className="px-8 py-2.5 rounded-md font-semibold text-sm text-white transition-opacity hover:opacity-90"
          style={{ background: "#1877F2" }}
          data-ocid="friends.signin_button"
        >
          Sign In
        </button>
      </div>
    );
  }

  const tabs: { id: Tab; label: string; count?: number }[] = [
    {
      id: "requests",
      label: "Friend Requests",
      count: requests.length > 0 ? requests.length : undefined,
    },
    { id: "suggestions", label: "People You May Know" },
    {
      id: "friends",
      label: "All Friends",
      count: friends.length > 0 ? friends.length : undefined,
    },
  ];

  const filteredFriends = friendSearch.trim()
    ? friends.filter((f) =>
        f.username.toLowerCase().includes(friendSearch.toLowerCase()),
      )
    : friends;

  const currentlyLoading =
    (tab === "requests" && loadingRequests) ||
    (tab === "suggestions" && loadingSuggestions) ||
    (tab === "friends" && loadingFriends);

  return (
    <div
      className="min-h-full pb-8"
      style={{ background: "#F0F2F5" }}
      data-ocid="friends.page"
    >
      {/* Page header */}
      <div
        className="sticky top-0 z-10 px-4 py-3 border-b"
        style={{ background: "#FFFFFF", borderColor: "#CED0D4" }}
      >
        <h1 className="font-bold text-2xl" style={{ color: "#050505" }}>
          Friends
        </h1>

        {/* Horizontal scrollable tabs */}
        <div
          className="flex gap-0.5 mt-3 overflow-x-auto"
          role="tablist"
          aria-label="Friends tabs"
          style={{ scrollbarWidth: "none" }}
        >
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={tab === t.id}
              onClick={() => setTab(t.id)}
              data-ocid={`friends.${t.id}_tab`}
              className="flex-shrink-0 px-4 py-2 text-sm font-semibold rounded-full flex items-center gap-1.5 whitespace-nowrap transition-colors"
              style={{
                background: tab === t.id ? "#E7F3FF" : "transparent",
                color: tab === t.id ? "#1877F2" : "#65676B",
              }}
            >
              <span>{t.label}</span>
              {t.count !== undefined && (
                <span
                  className="text-xs min-w-[18px] h-[18px] px-1 flex items-center justify-center rounded-full font-bold"
                  style={{
                    background: tab === t.id ? "#1877F2" : "#E4E6EB",
                    color: tab === t.id ? "#FFFFFF" : "#65676B",
                  }}
                >
                  {t.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Search bar — My Friends tab */}
      <AnimatePresence>
        {tab === "friends" && (
          <motion.div
            key="search-bar"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="px-4 pt-3 overflow-hidden"
          >
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
                style={{ color: "#65676B" }}
              />
              <input
                type="text"
                placeholder="Search friends…"
                value={friendSearch}
                onChange={(e) => setFriendSearch(e.target.value)}
                data-ocid="friends.search_input"
                className="w-full pl-9 pr-4 py-2.5 rounded-full text-sm focus:outline-none"
                style={{
                  background: "#E4E6EB",
                  color: "#050505",
                  border: "none",
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Section title */}
      <div className="px-4 pt-4 pb-2">
        {tab === "requests" && (
          <h2 className="font-bold text-base" style={{ color: "#050505" }}>
            Friend Requests
            {requests.length > 0 && (
              <span
                className="ml-2 font-normal text-sm"
                style={{ color: "#65676B" }}
              >
                · {requests.length}
              </span>
            )}
          </h2>
        )}
        {tab === "suggestions" && (
          <h2 className="font-bold text-base" style={{ color: "#050505" }}>
            People You May Know
          </h2>
        )}
        {tab === "friends" && (
          <h2 className="font-bold text-base" style={{ color: "#050505" }}>
            {friendSearch.trim()
              ? `Results for "${friendSearch}"`
              : "All Friends"}
            {!friendSearch.trim() && friends.length > 0 && (
              <span
                className="ml-2 font-normal text-sm"
                style={{ color: "#65676B" }}
              >
                · {friends.length}
              </span>
            )}
          </h2>
        )}
      </div>

      {/* Content */}
      <div className="px-4">
        {currentlyLoading ? (
          <SkeletonGrid />
        ) : tab === "requests" ? (
          requests.length === 0 ? (
            <EmptyState
              icon={
                <UserPlus className="w-8 h-8" style={{ color: "#65676B" }} />
              }
              title="No friend requests"
              subtitle="When someone sends you a request, it'll appear here."
              ocid="friends.requests_empty_state"
            />
          ) : (
            <ul
              className="grid grid-cols-2 gap-3 list-none p-0 m-0"
              data-ocid="friends.requests_list"
              aria-label="Friend requests"
            >
              <AnimatePresence>
                {requests.map((f, i) => {
                  const busy = pendingIds.has(String(f.userId));
                  return (
                    <FriendCard
                      key={String(f.userId)}
                      friend={f}
                      index={i}
                      actions={
                        <>
                          <button
                            type="button"
                            onClick={() => accept(f.userId)}
                            disabled={busy}
                            data-ocid={`friends.accept_button.${i + 1}`}
                            className="w-full py-2 rounded-md text-sm font-semibold text-white flex items-center justify-center gap-1 disabled:opacity-50 transition-opacity hover:opacity-90"
                            style={{ background: "#1877F2" }}
                          >
                            <UserCheck className="w-4 h-4 flex-shrink-0" />
                            Confirm
                          </button>
                          <button
                            type="button"
                            onClick={() => reject(f.userId)}
                            disabled={busy}
                            data-ocid={`friends.reject_button.${i + 1}`}
                            className="w-full py-2 rounded-md text-sm font-semibold flex items-center justify-center gap-1 disabled:opacity-50 transition-colors hover:opacity-90"
                            style={{ background: "#E4E6EB", color: "#050505" }}
                          >
                            <X className="w-4 h-4 flex-shrink-0" />
                            Delete
                          </button>
                        </>
                      }
                    />
                  );
                })}
              </AnimatePresence>
            </ul>
          )
        ) : tab === "suggestions" ? (
          suggestions.length === 0 ? (
            <EmptyState
              icon={<Users className="w-8 h-8" style={{ color: "#65676B" }} />}
              title="No suggestions right now"
              subtitle="As more people join LinkSphere, you'll see friend suggestions here."
              ocid="friends.suggestions_empty_state"
            />
          ) : (
            <ul
              className="grid grid-cols-2 gap-3 list-none p-0 m-0"
              data-ocid="friends.suggestions_list"
              aria-label="People you may know"
            >
              <AnimatePresence>
                {suggestions.map((f, i) => {
                  const busy = pendingIds.has(String(f.userId));
                  const alreadySent = f.status === "sent";
                  return (
                    <FriendCard
                      key={String(f.userId)}
                      friend={f}
                      index={i}
                      actions={
                        alreadySent ? (
                          <button
                            type="button"
                            onClick={() => cancelRequest(f.userId)}
                            disabled={busy}
                            data-ocid={`friends.cancel_button.${i + 1}`}
                            className="w-full py-2 rounded-md text-sm font-semibold flex items-center justify-center gap-1 disabled:opacity-50 transition-opacity hover:opacity-90"
                            style={{ background: "#E4E6EB", color: "#65676B" }}
                          >
                            <Clock className="w-4 h-4 flex-shrink-0" />
                            Pending
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => sendRequest(f.userId)}
                            disabled={busy}
                            data-ocid={`friends.add_button.${i + 1}`}
                            className="w-full py-2 rounded-md text-sm font-semibold text-white flex items-center justify-center gap-1 disabled:opacity-50 transition-opacity hover:opacity-90"
                            style={{ background: "#1877F2" }}
                          >
                            <UserPlus className="w-4 h-4 flex-shrink-0" />
                            Add Friend
                          </button>
                        )
                      }
                    />
                  );
                })}
              </AnimatePresence>
            </ul>
          )
        ) : filteredFriends.length === 0 ? (
          friendSearch.trim() ? (
            <EmptyState
              icon={<Search className="w-8 h-8" style={{ color: "#65676B" }} />}
              title={`No results for "${friendSearch}"`}
              subtitle="Try a different name or clear your search."
              ocid="friends.search_empty_state"
            />
          ) : (
            <EmptyState
              icon={<Users className="w-8 h-8" style={{ color: "#65676B" }} />}
              title="No friends yet"
              subtitle="Accept friend requests or explore suggestions to start connecting."
              ocid="friends.friends_empty_state"
            />
          )
        ) : (
          <ul
            className="grid grid-cols-2 gap-3 list-none p-0 m-0"
            data-ocid="friends.friends_list"
            aria-label="Your friends"
          >
            <AnimatePresence>
              {filteredFriends.map((f, i) => {
                const busy = pendingIds.has(String(f.userId));
                return (
                  <FriendCard
                    key={String(f.userId)}
                    friend={f}
                    index={i}
                    actions={
                      <button
                        type="button"
                        onClick={() => unfriend(f.userId)}
                        disabled={busy}
                        data-ocid={`friends.unfriend_button.${i + 1}`}
                        className="w-full py-2 rounded-md text-sm font-semibold flex items-center justify-center gap-1 disabled:opacity-50 transition-opacity hover:opacity-90"
                        style={{ background: "#E4E6EB", color: "#050505" }}
                      >
                        <UserMinus className="w-4 h-4 flex-shrink-0" />
                        Unfriend
                      </button>
                    }
                  />
                );
              })}
            </AnimatePresence>
          </ul>
        )}
      </div>
    </div>
  );
}
