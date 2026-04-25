import { EditProfileModal } from "@/components/EditProfileModal";
import { PostCard } from "@/components/PostCard";
import { UserAvatar } from "@/components/UserAvatar";
import { VerifiedBadge } from "@/components/VerifiedBadge";
import { useAuth } from "@/hooks/use-auth";
import { useFriends, usePosts, useProfile } from "@/hooks/use-backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useNavigate } from "@tanstack/react-router";
import {
  Briefcase,
  Camera,
  ChevronDown,
  FileText,
  Globe,
  GraduationCap,
  Heart,
  LogIn,
  LogOut,
  MapPin,
  Pencil,
  Plus,
  ShoppingBag,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { createActor } from "../backend";
import type { FriendView, PostView } from "../types";

// ── Helpers ────────────────────────────────────────────────────────────────────
function timeAgo(ts: bigint): string {
  const ms = Date.now() - Number(ts / 1_000_000n);
  const m = Math.floor(ms / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h`;
  return `${Math.floor(h / 24)}d`;
}

function getDirectUrl(blob: unknown): string | undefined {
  if (!blob) return undefined;
  return (blob as { getDirectURL: () => string }).getDirectURL?.();
}

type ProfileTab = "posts" | "about" | "photos" | "friends";

// ── Guest View ─────────────────────────────────────────────────────────────────
function GuestView({ signIn }: { signIn: () => void }) {
  return (
    <div
      className="flex flex-col items-center justify-center gap-6 py-20 px-6 text-center bg-[#F0F2F5] min-h-[60vh]"
      data-ocid="profile.guest_view"
    >
      <div className="w-24 h-24 rounded-full bg-[#E4E6EB] flex items-center justify-center shadow">
        <svg
          role="img"
          aria-labelledby="guest-icon-title"
          viewBox="0 0 64 64"
          className="w-14 h-14"
        >
          <title id="guest-icon-title">Profile placeholder</title>
          <circle cx="32" cy="26" r="14" fill="#BEC3C9" />
          <ellipse cx="32" cy="52" rx="20" ry="12" fill="#BEC3C9" />
        </svg>
      </div>
      <div className="space-y-2">
        <h2 className="font-bold text-2xl text-[#050505]">
          Welcome to LinkSphere
        </h2>
        <p className="text-sm text-[#65676B] max-w-xs">
          Sign in to see your profile, connect with friends, and share moments.
        </p>
      </div>
      <button
        type="button"
        onClick={signIn}
        data-ocid="profile.signin_button"
        className="flex items-center gap-2 px-6 py-3 rounded-md bg-[#1877F2] text-white font-semibold text-base hover:bg-[#166FE5] transition-colors shadow"
      >
        <LogIn className="w-5 h-5" />
        Log in with Internet Identity
      </button>
    </div>
  );
}

// ── Posts Tab ──────────────────────────────────────────────────────────────────
function PostsTab({ posts }: { posts: PostView[] }) {
  if (!posts.length) {
    return (
      <div
        className="flex flex-col items-center gap-3 py-12 text-center bg-white rounded-lg shadow-sm"
        data-ocid="profile.posts.empty_state"
      >
        <div className="w-16 h-16 rounded-full bg-[#F0F2F5] flex items-center justify-center">
          <Pencil className="w-7 h-7 text-[#65676B]" />
        </div>
        <p className="font-semibold text-[#050505] text-base">No posts yet</p>
        <p className="text-sm text-[#65676B] max-w-xs">
          Share something on the feed and it'll appear here.
        </p>
      </div>
    );
  }
  return (
    <div className="space-y-3">
      {posts.map((post, i) => (
        <PostCard
          key={String(post.id)}
          post={{
            id: String(post.id),
            authorName: post.authorName,
            authorInitials: post.authorName.slice(0, 2).toUpperCase(),
            authorSrc: getDirectUrl(post.authorAvatar),
            time: timeAgo(post.createdAt),
            text: post.text,
            imageSrc: getDirectUrl(post.image),
            likeCount: Number(post.likeCount),
            commentCount: Number(post.commentCount),
            liked: post.likedByMe,
            isOwn: true,
          }}
          index={i}
        />
      ))}
    </div>
  );
}

// ── About Tab ──────────────────────────────────────────────────────────────────
function AboutTab({
  bio,
  onEditProfile,
  isOwn,
}: {
  bio?: string;
  onEditProfile: () => void;
  isOwn: boolean;
}) {
  return (
    <div
      className="bg-white rounded-lg shadow-sm p-4 space-y-4"
      data-ocid="profile.about.section"
    >
      <h3 className="font-bold text-[#050505] text-base">About</h3>

      {bio ? (
        <p className="text-sm text-[#050505] text-center leading-relaxed">
          {bio}
        </p>
      ) : isOwn ? (
        <p className="text-sm text-[#65676B] text-center">
          Add a bio to tell people about yourself.
        </p>
      ) : null}

      <div className="space-y-3 pt-1">
        <div className="flex items-center gap-3 text-sm text-[#65676B]">
          <Briefcase className="w-5 h-5 text-[#65676B] flex-shrink-0" />
          <span>Add work</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-[#65676B]">
          <GraduationCap className="w-5 h-5 text-[#65676B] flex-shrink-0" />
          <span>Add education</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-[#65676B]">
          <MapPin className="w-5 h-5 text-[#65676B] flex-shrink-0" />
          <span>Add location</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-[#65676B]">
          <Heart className="w-5 h-5 text-[#65676B] flex-shrink-0" />
          <span>Add relationship status</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-[#65676B]">
          <Globe className="w-5 h-5 text-[#65676B] flex-shrink-0" />
          <span>Add website</span>
        </div>
      </div>

      {isOwn && (
        <button
          type="button"
          onClick={onEditProfile}
          data-ocid="profile.about.edit_button"
          className="w-full py-2 rounded-md bg-[#E4E6EB] text-[#050505] text-sm font-semibold hover:bg-[#D8DADF] transition-colors"
        >
          Edit details
        </button>
      )}
    </div>
  );
}

// ── Photos Tab ─────────────────────────────────────────────────────────────────
function PhotosTab({ posts }: { posts: PostView[] }) {
  const photoPosts = posts.filter((p) => p.image);
  if (!photoPosts.length) {
    return (
      <div
        className="flex flex-col items-center gap-3 py-12 text-center bg-white rounded-lg shadow-sm"
        data-ocid="profile.photos.empty_state"
      >
        <div className="w-16 h-16 rounded-full bg-[#F0F2F5] flex items-center justify-center">
          <Camera className="w-7 h-7 text-[#65676B]" />
        </div>
        <p className="font-semibold text-[#050505] text-base">No photos yet</p>
        <p className="text-sm text-[#65676B] max-w-xs">
          Photos you share will appear here.
        </p>
      </div>
    );
  }
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-4 border-b border-[#E4E6EB]">
        <h3 className="font-bold text-[#050505] text-base">Photos</h3>
      </div>
      <div className="grid grid-cols-3 gap-0.5 p-0.5">
        {photoPosts.map((post, i) => {
          const src = getDirectUrl(post.image);
          return (
            <div
              key={String(post.id)}
              className="aspect-square overflow-hidden bg-[#F0F2F5]"
              data-ocid={`profile.photo.item.${i + 1}`}
            >
              {src && (
                <img
                  src={src}
                  alt="Post"
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Friends Tab ────────────────────────────────────────────────────────────────
function FriendsTab({ friends }: { friends: FriendView[] }) {
  if (!friends.length) {
    return (
      <div
        className="flex flex-col items-center gap-3 py-12 text-center bg-white rounded-lg shadow-sm"
        data-ocid="profile.friends.empty_state"
      >
        <div className="w-16 h-16 rounded-full bg-[#F0F2F5] flex items-center justify-center">
          <Users className="w-7 h-7 text-[#65676B]" />
        </div>
        <p className="font-semibold text-[#050505] text-base">No friends yet</p>
        <p className="text-sm text-[#65676B] max-w-xs">
          Connect with people you know on the Friends tab.
        </p>
      </div>
    );
  }
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-4 border-b border-[#E4E6EB]">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-[#050505] text-base">Friends</h3>
            <p className="text-sm text-[#65676B]">{friends.length} friends</p>
          </div>
          <button
            type="button"
            className="text-sm font-semibold text-[#1877F2] hover:bg-[#E7F3FF] px-2 py-1 rounded transition-colors"
            data-ocid="profile.friends.see_all_button"
          >
            See all friends
          </button>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-0.5 p-0.5">
        {friends.map((f, i) => {
          const avatarUrl = getDirectUrl(f.avatar);
          return (
            <div
              key={String(f.userId)}
              className="flex flex-col items-center gap-1.5 p-2 hover:bg-[#F0F2F5] rounded-lg transition-colors cursor-pointer"
              data-ocid={`profile.friend.item.${i + 1}`}
            >
              <div className="w-full aspect-square rounded-lg overflow-hidden bg-[#F0F2F5]">
                <UserAvatar
                  name={f.username}
                  src={avatarUrl}
                  size="xl"
                  className="w-full h-full rounded-lg"
                />
              </div>
              <p className="text-xs font-semibold text-[#050505] text-center line-clamp-2 w-full">
                {f.username}
              </p>
              {Number(f.mutualFriendCount) > 0 && (
                <p className="text-[10px] text-[#65676B] text-center">
                  {Number(f.mutualFriendCount)} mutual
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── More Dropdown ──────────────────────────────────────────────────────────────
function MoreMenu({ navigate }: { navigate: ReturnType<typeof useNavigate> }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        data-ocid="profile.more_button"
        aria-label="More options"
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#E4E6EB] text-[#050505] text-sm font-semibold hover:bg-[#D8DADF] transition-colors"
      >
        <ChevronDown className="w-4 h-4" />
      </button>
      {open && (
        <>
          {/* biome-ignore lint/a11y/useKeyWithClickEvents: overlay closes menu */}
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div
            className="absolute right-0 top-10 z-20 bg-white border border-[#CED0D4] rounded-lg shadow-lg py-2 min-w-[180px]"
            data-ocid="profile.more_dropdown"
          >
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                navigate({ to: "/files" });
              }}
              data-ocid="profile.files_link"
              className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-[#050505] hover:bg-[#F0F2F5] transition-colors"
            >
              <FileText className="w-4 h-4 text-[#65676B]" />
              My Files
            </button>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                navigate({ to: "/products" });
              }}
              data-ocid="profile.products_link"
              className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-[#050505] hover:bg-[#F0F2F5] transition-colors"
            >
              <ShoppingBag className="w-4 h-4 text-[#65676B]" />
              Products
            </button>
          </div>
        </>
      )}
    </div>
  );
}

// ── Authenticated Profile ──────────────────────────────────────────────────────
function AuthenticatedProfile({
  principal,
  signOut,
}: {
  principal: string;
  signOut: () => void;
}) {
  const { actor } = useActor(createActor);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<ProfileTab>("posts");
  const [editOpen, setEditOpen] = useState(false);
  const [coverUploading, setCoverUploading] = useState(false);
  const coverInputRef = useRef<HTMLInputElement>(null);

  const { data: profile, isLoading } = useProfile();
  const { data: posts = [] } = usePosts();
  const { data: friends = [] } = useFriends();

  const displayName = isLoading
    ? "Loading…"
    : profile?.username || `User ${principal.slice(0, 6)}`;

  const avatarUrl = getDirectUrl(profile?.avatar);
  const coverUrl = getDirectUrl(profile?.coverPhoto);
  const isVerified = profile?.isVerified ?? false;
  const bio = profile?.bio;

  const handleCoverChange = async (file: File) => {
    if (!actor) return;
    if (file.size > 10 * 1024 * 1024) {
      toast.error("Cover photo must be under 10MB");
      return;
    }
    setCoverUploading(true);
    try {
      const { ExternalBlob } = await import("../backend");
      const bytes = new Uint8Array(await file.arrayBuffer());
      const blob = ExternalBlob.fromBytes(bytes);
      await actor.updateProfileCoverPhoto(blob);
      toast.success("Cover photo updated!");
    } catch {
      toast.error("Failed to update cover photo.");
    } finally {
      setCoverUploading(false);
    }
  };

  const TABS: { id: ProfileTab; label: string }[] = [
    { id: "posts", label: "Posts" },
    { id: "about", label: "About" },
    { id: "photos", label: "Photos" },
    { id: "friends", label: "Friends" },
  ];

  return (
    <>
      <div
        className="bg-[#F0F2F5] min-h-screen"
        data-ocid="profile.authenticated_view"
      >
        {/* ── Profile Header Card ── */}
        <div className="bg-white shadow-sm max-w-[820px] mx-auto">
          {/* Cover Photo */}
          <div className="relative">
            <div className="h-[200px] sm:h-[300px] bg-gradient-to-br from-[#1877F2] to-[#42B72A] overflow-hidden">
              {coverUrl ? (
                <img
                  src={coverUrl}
                  alt="Cover"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#1877F2]/80 to-[#6B3FDB]/60" />
              )}
              {coverUploading && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <p className="text-white text-sm font-semibold">Uploading…</p>
                </div>
              )}
            </div>

            {/* Edit Cover button */}
            <button
              type="button"
              onClick={() => coverInputRef.current?.click()}
              data-ocid="profile.cover_photo_button"
              aria-label="Edit cover photo"
              className="absolute bottom-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white text-[#050505] text-sm font-semibold hover:bg-[#F2F2F2] transition-colors shadow"
            >
              <Camera className="w-4 h-4" />
              Edit cover photo
            </button>
            <input
              ref={coverInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) handleCoverChange(f);
              }}
            />
          </div>

          {/* Avatar + Name + Actions */}
          <div className="px-4 sm:px-6 pb-0">
            {/* Avatar overlapping cover */}
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between -mt-[52px] sm:-mt-[36px] pb-3 gap-3">
              <div className="flex flex-col sm:flex-row sm:items-end gap-3">
                {/* Avatar circle */}
                <div className="relative w-[120px] h-[120px] ring-4 ring-white rounded-full shadow-md flex-shrink-0">
                  <UserAvatar
                    name={displayName}
                    src={avatarUrl}
                    size="xl"
                    className="w-[120px] h-[120px] text-3xl rounded-full"
                  />
                  <button
                    type="button"
                    onClick={() => setEditOpen(true)}
                    aria-label="Change profile picture"
                    data-ocid="profile.avatar_button"
                    className="absolute bottom-1 right-1 w-8 h-8 rounded-full bg-[#E4E6EB] hover:bg-[#D8DADF] flex items-center justify-center shadow transition-colors"
                  >
                    <Camera className="w-4 h-4 text-[#050505]" />
                  </button>
                </div>

                {/* Name + verified + friend count */}
                <div className="pb-1 mt-2 sm:mt-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <h1 className="font-bold text-[22px] sm:text-[28px] text-[#050505] leading-tight">
                      {displayName}
                    </h1>
                    {isVerified && <VerifiedBadge size="md" />}
                  </div>
                  <p className="text-sm text-[#65676B] font-semibold">
                    {friends.length}{" "}
                    {friends.length === 1 ? "friend" : "friends"}
                  </p>
                  {/* Friends avatars row */}
                  {friends.length > 0 && (
                    <div className="flex -space-x-1.5 mt-1">
                      {friends.slice(0, 6).map((f) => (
                        <div
                          key={String(f.userId)}
                          className="w-7 h-7 ring-2 ring-white rounded-full overflow-hidden"
                        >
                          <UserAvatar
                            name={f.username}
                            src={getDirectUrl(f.avatar)}
                            size="sm"
                            className="w-7 h-7"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons Row */}
              <div className="flex items-center gap-2 flex-wrap pb-2">
                <button
                  type="button"
                  onClick={() => setEditOpen(true)}
                  data-ocid="profile.edit_button"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-md bg-[#E4E6EB] text-[#050505] text-sm font-semibold hover:bg-[#D8DADF] transition-colors"
                >
                  <Pencil className="w-4 h-4" />
                  Edit profile
                </button>
                <button
                  type="button"
                  data-ocid="profile.add_story_button"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-md bg-[#E4E6EB] text-[#050505] text-sm font-semibold hover:bg-[#D8DADF] transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add to story
                </button>
                <MoreMenu navigate={navigate} />
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-[#E4E6EB]" />

            {/* Tab navigation */}
            <nav
              className="flex overflow-x-auto scrollbar-none"
              aria-label="Profile tabs"
              data-ocid="profile.tabs"
            >
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  data-ocid={`profile.tab.${tab.id}`}
                  className={`flex-shrink-0 px-4 py-3 text-sm font-semibold transition-colors relative ${
                    activeTab === tab.id
                      ? "text-[#1877F2]"
                      : "text-[#65676B] hover:bg-[#F0F2F5] rounded-md"
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#1877F2] rounded-t-full" />
                  )}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* ── Tab Content ── */}
        <div className="max-w-[820px] mx-auto px-0 sm:px-4 pt-4 pb-20">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.15 }}
          >
            {activeTab === "posts" && (
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Left sidebar */}
                <div className="w-full sm:w-[360px] flex-shrink-0 space-y-3">
                  <AboutTab
                    bio={bio}
                    onEditProfile={() => setEditOpen(true)}
                    isOwn
                  />
                  {friends.length > 0 && (
                    <div className="bg-white rounded-lg shadow-sm p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-bold text-[#050505] text-base">
                          Friends
                        </h3>
                        <button
                          type="button"
                          className="text-sm font-semibold text-[#1877F2] hover:bg-[#E7F3FF] px-2 py-1 rounded transition-colors"
                          data-ocid="profile.sidebar.see_all_friends_button"
                        >
                          See all friends
                        </button>
                      </div>
                      <p className="text-sm text-[#65676B] mb-3">
                        {friends.length} friends
                      </p>
                      <div className="grid grid-cols-3 gap-1">
                        {friends.slice(0, 9).map((f, i) => {
                          const url = getDirectUrl(f.avatar);
                          return (
                            <div
                              key={String(f.userId)}
                              className="flex flex-col gap-1"
                              data-ocid={`profile.sidebar.friend.${i + 1}`}
                            >
                              <div className="aspect-square rounded-md overflow-hidden bg-[#F0F2F5]">
                                <UserAvatar
                                  name={f.username}
                                  src={url}
                                  size="xl"
                                  className="w-full h-full rounded-md"
                                />
                              </div>
                              <p className="text-[11px] font-semibold text-[#050505] truncate">
                                {f.username}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {/* Posts feed */}
                <div className="flex-1 min-w-0 space-y-3">
                  <PostsTab posts={posts} />
                </div>
              </div>
            )}

            {activeTab === "about" && (
              <AboutTab
                bio={bio}
                onEditProfile={() => setEditOpen(true)}
                isOwn
              />
            )}

            {activeTab === "photos" && <PhotosTab posts={posts} />}

            {activeTab === "friends" && <FriendsTab friends={friends} />}
          </motion.div>
        </div>

        {/* Sign out button */}
        <div className="max-w-[820px] mx-auto px-4 pb-8">
          <button
            type="button"
            onClick={signOut}
            data-ocid="profile.signout_button"
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-md border border-[#CED0D4] bg-white text-[#65676B] hover:bg-[#F0F2F5] transition-colors text-sm font-semibold"
          >
            <LogOut className="w-4 h-4" />
            Log out
          </button>
        </div>
      </div>

      {editOpen && (
        <EditProfileModal
          currentName={displayName}
          currentBio={bio}
          currentAvatarUrl={avatarUrl}
          onClose={() => setEditOpen(false)}
        />
      )}
    </>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────
export default function ProfilePage() {
  const { isAuthenticated, principal, signIn, signOut } = useAuth();

  if (!isAuthenticated || !principal) {
    return <GuestView signIn={signIn} />;
  }

  return (
    <div className="min-h-screen bg-[#F0F2F5]" data-ocid="profile.page">
      <AuthenticatedProfile principal={principal} signOut={signOut} />
    </div>
  );
}
