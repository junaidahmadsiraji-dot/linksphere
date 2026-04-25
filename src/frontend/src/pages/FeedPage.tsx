import { CreatePostModal } from "@/components/CreatePostModal";
import { PostCard, type PostCardData } from "@/components/PostCard";
import { StoryCreatorModal } from "@/components/StoryCreatorModal";
import { StoryViewer } from "@/components/StoryViewer";
import { useAuth } from "@/hooks/use-auth";
import { usePosts, useProfile, useStories } from "@/hooks/use-backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQueryClient } from "@tanstack/react-query";
import { Camera, Plus, Smile, Video } from "lucide-react";
import { useState } from "react";
import { createActor } from "../backend";
import type { PostView, StoryGroup } from "../types";

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatTimeAgo(ts: bigint): string {
  const ms = Number(ts) / 1_000_000;
  const diff = Date.now() - ms;
  if (diff < 60_000) return "Just now";
  if (diff < 3_600_000) return `${Math.floor(diff / 60_000)}m ago`;
  if (diff < 86_400_000) return `${Math.floor(diff / 3_600_000)}h ago`;
  return `${Math.floor(diff / 86_400_000)}d ago`;
}

function postViewToCardData(
  p: PostView,
  myPrincipal: string | null,
): PostCardData {
  return {
    id: p.id.toString(),
    authorName: p.authorName,
    authorInitials: p.authorName.slice(0, 2).toUpperCase(),
    authorSrc:
      p.authorAvatar && typeof p.authorAvatar.getDirectURL === "function"
        ? p.authorAvatar.getDirectURL()
        : undefined,
    authorIsVerified: p.authorIsVerified,
    time: formatTimeAgo(p.createdAt),
    text: p.text,
    imageSrc:
      p.image && typeof p.image.getDirectURL === "function"
        ? p.image.getDirectURL()
        : undefined,
    likeCount: Number(p.likeCount),
    commentCount: Number(p.commentCount),
    liked: p.likedByMe,
    isOwn: myPrincipal ? p.author.toString() === myPrincipal : false,
  };
}

// ── Story ring colors ─────────────────────────────────────────────────────────

const RING_GRADIENTS = [
  ["#F58529", "#DD2A7B"],
  ["#1877F2", "#0099FF"],
  ["#E91E63", "#FF5722"],
  ["#4CAF50", "#00BCD4"],
  ["#9C27B0", "#673AB7"],
  ["#FF9800", "#FF5722"],
];

// ── StoriesRow ────────────────────────────────────────────────────────────────

interface StoriesRowProps {
  groups: StoryGroup[];
  onStoryClick: (index: number) => void;
  onAddStory: () => void;
  isAuthenticated: boolean;
  authorName: string;
  authorSrc?: string;
}

function StoriesRow({
  groups,
  onStoryClick,
  onAddStory,
  isAuthenticated,
  authorName,
  authorSrc,
}: StoriesRowProps) {
  return (
    <div
      className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide"
      data-ocid="feed.stories.row"
      aria-label="Stories"
      style={{ scrollbarWidth: "none" }}
    >
      {/* Your Story bubble */}
      {isAuthenticated && (
        <button
          type="button"
          onClick={onAddStory}
          data-ocid="feed.stories.add_button"
          className="flex flex-col items-center gap-1.5 flex-shrink-0 min-w-[72px]"
          aria-label="Add your story"
        >
          <div className="relative w-14 h-14">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center overflow-hidden font-bold text-white text-base"
              style={{ background: "#1877F2" }}
            >
              {authorSrc ? (
                <img
                  src={authorSrc}
                  alt={authorName}
                  className="w-full h-full object-cover"
                />
              ) : (
                authorName.slice(0, 2).toUpperCase()
              )}
            </div>
            <span
              className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full border-2 border-white flex items-center justify-center"
              style={{ background: "#1877F2" }}
            >
              <Plus className="w-3 h-3 text-white" strokeWidth={3} />
            </span>
          </div>
          <span
            className="text-[11px] font-medium text-center leading-tight max-w-[72px] truncate"
            style={{ color: "#050505" }}
          >
            Your Story
          </span>
        </button>
      )}

      {/* Story bubbles from backend */}
      {groups.map((group, idx) => {
        const [c1, c2] = RING_GRADIENTS[idx % RING_GRADIENTS.length];
        const initials = group.authorName.slice(0, 2).toUpperCase();
        const firstName = group.authorName.split(" ")[0];
        return (
          <button
            type="button"
            key={group.authorId.toString()}
            onClick={() => onStoryClick(idx)}
            data-ocid={`feed.stories.item.${idx + 1}`}
            className="flex flex-col items-center gap-1.5 flex-shrink-0 min-w-[72px]"
            aria-label={`${group.authorName}'s story`}
          >
            <div
              className="w-14 h-14 rounded-full p-[2.5px]"
              style={{ background: `linear-gradient(135deg, ${c1}, ${c2})` }}
            >
              <div
                className="w-full h-full rounded-full border-2 border-white overflow-hidden flex items-center justify-center font-bold text-white text-base"
                style={{ background: "#1877F2" }}
              >
                {initials}
              </div>
            </div>
            <span
              className="text-[11px] font-medium text-center leading-tight max-w-[72px] truncate"
              style={{ color: "#050505" }}
            >
              {firstName}
            </span>
          </button>
        );
      })}
    </div>
  );
}

// ── Post Composer ─────────────────────────────────────────────────────────────

interface PostComposerProps {
  authorName: string;
  authorSrc?: string;
  onOpenCreatePost: () => void;
  onOpenStoryCreator: () => void;
}

function PostComposer({
  authorName,
  authorSrc,
  onOpenCreatePost,
}: PostComposerProps) {
  return (
    <div
      className="rounded-none sm:rounded-lg border-t border-b sm:border bg-white"
      style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.10)" }}
      data-ocid="feed.composer.card"
    >
      {/* Top row: avatar + input */}
      <div className="flex items-center gap-2 px-3 pt-3 pb-2">
        <div
          className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-white text-sm overflow-hidden"
          style={{ background: "#1877F2" }}
        >
          {authorSrc ? (
            <img
              src={authorSrc}
              alt={authorName}
              className="w-full h-full object-cover"
            />
          ) : (
            authorName.slice(0, 2).toUpperCase()
          )}
        </div>
        <button
          type="button"
          onClick={onOpenCreatePost}
          data-ocid="feed.composer.input_button"
          className="flex-1 text-left rounded-full border px-4 py-2.5 text-sm transition-colors hover:bg-gray-50"
          style={{
            background: "#F0F2F5",
            borderColor: "#CED0D4",
            color: "#65676B",
          }}
        >
          What's on your mind?
        </button>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: "#E4E6EB", margin: "0 16px" }} />

      {/* Action buttons */}
      <div className="flex items-center px-1 py-1">
        <button
          type="button"
          onClick={onOpenCreatePost}
          data-ocid="feed.composer.photo_button"
          className="flex flex-1 items-center justify-center gap-2 py-2.5 rounded-lg transition-colors hover:bg-gray-50 text-sm font-semibold"
          style={{ color: "#45BD62" }}
        >
          <Camera className="w-5 h-5" />
          <span className="hidden xs:inline">Photo/Video</span>
        </button>

        <div style={{ width: 1, height: 28, background: "#E4E6EB" }} />

        <button
          type="button"
          onClick={onOpenCreatePost}
          data-ocid="feed.composer.live_button"
          className="flex flex-1 items-center justify-center gap-2 py-2.5 rounded-lg transition-colors hover:bg-gray-50 text-sm font-semibold"
          style={{ color: "#F02849" }}
        >
          <Video className="w-5 h-5" />
          <span className="hidden xs:inline">Live Video</span>
        </button>

        <div style={{ width: 1, height: 28, background: "#E4E6EB" }} />

        <button
          type="button"
          onClick={onOpenCreatePost}
          data-ocid="feed.composer.feeling_button"
          className="flex flex-1 items-center justify-center gap-2 py-2.5 rounded-lg transition-colors hover:bg-gray-50 text-sm font-semibold"
          style={{ color: "#F7B928" }}
        >
          <Smile className="w-5 h-5" />
          <span className="hidden xs:inline">Feeling</span>
        </button>
      </div>
    </div>
  );
}

// ── FeedPage ──────────────────────────────────────────────────────────────────

export default function FeedPage() {
  const { data: backendPosts = [], isLoading } = usePosts();
  const { data: storyGroups = [] } = useStories();
  const { data: profile } = useProfile();
  const { isAuthenticated, principal } = useAuth();
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showStoryCreator, setShowStoryCreator] = useState(false);
  const [viewingStoryGroup, setViewingStoryGroup] = useState<number | null>(
    null,
  );
  // Optimistic local posts (created this session before backend refetch)
  const [localPosts, setLocalPosts] = useState<PostCardData[]>([]);

  const authorName =
    profile?.username ?? (principal ? `User ${principal.slice(0, 6)}` : "You");
  const authorSrc =
    profile?.avatar && typeof profile.avatar.getDirectURL === "function"
      ? profile.avatar.getDirectURL()
      : undefined;

  // Merge: local posts at the top, then backend posts (deduped by id)
  const localIds = new Set(localPosts.map((p) => p.id));
  const backendCards = backendPosts.map((p) =>
    postViewToCardData(p, principal),
  );
  const dedupedBackend = backendCards.filter((p) => !localIds.has(p.id));
  const allPosts: PostCardData[] = [...localPosts, ...dedupedBackend];

  const handleCreatePost = async (text: string, imageFile?: File) => {
    const imagePreview = imageFile
      ? await new Promise<string>((res) => {
          const reader = new FileReader();
          reader.onload = () => res(reader.result as string);
          reader.readAsDataURL(imageFile);
        })
      : undefined;

    const optimistic: PostCardData = {
      id: `local-${Date.now()}`,
      authorName,
      authorInitials: authorName.slice(0, 2).toUpperCase(),
      authorSrc,
      time: "Just now",
      text,
      imageSrc: imagePreview,
      likeCount: 0,
      commentCount: 0,
      liked: false,
      isOwn: true,
    };
    setLocalPosts((prev) => [optimistic, ...prev]);
    // Refresh backend in background
    setTimeout(
      () => queryClient.invalidateQueries({ queryKey: ["posts"] }),
      1500,
    );
  };

  const handleDeletePost = async (postId: string) => {
    if (actor && !postId.startsWith("local-")) {
      await actor.deletePost(BigInt(postId));
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    }
    setLocalPosts((prev) => prev.filter((p) => p.id !== postId));
  };

  const handleLike = async (postId: string) => {
    if (!actor || postId.startsWith("local-")) return;
    await actor.likePost(BigInt(postId));
    queryClient.invalidateQueries({ queryKey: ["posts"] });
  };

  const handleAddComment = async (postId: string, text: string) => {
    if (!actor || postId.startsWith("local-")) return;
    await actor.addComment(BigInt(postId), text);
    queryClient.invalidateQueries({ queryKey: ["posts"] });
  };

  const handleDeleteComment = async (postId: string, commentId: string) => {
    if (!actor || postId.startsWith("local-")) return;
    await actor.deleteComment(BigInt(commentId));
    queryClient.invalidateQueries({ queryKey: ["posts"] });
  };

  return (
    <div
      className="flex flex-col gap-0 max-w-[680px] mx-auto pb-20"
      data-ocid="feed.page"
      style={{ background: "#F0F2F5" }}
    >
      {/* Stories section */}
      <div
        className="rounded-none sm:rounded-lg border-t border-b sm:border bg-white px-3 py-3 mt-0 sm:mt-3"
        style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.10)" }}
        data-ocid="feed.stories.section"
      >
        <StoriesRow
          groups={storyGroups}
          onStoryClick={(idx) => setViewingStoryGroup(idx)}
          onAddStory={() => setShowStoryCreator(true)}
          isAuthenticated={isAuthenticated}
          authorName={authorName}
          authorSrc={authorSrc}
        />
      </div>

      {/* Post composer */}
      {isAuthenticated && (
        <div className="mt-2">
          <PostComposer
            authorName={authorName}
            authorSrc={authorSrc}
            onOpenCreatePost={() => setShowCreateModal(true)}
            onOpenStoryCreator={() => setShowStoryCreator(true)}
          />
        </div>
      )}

      {/* Loading skeleton */}
      {isLoading && allPosts.length === 0 && (
        <div className="mt-2 space-y-2" data-ocid="feed.loading_state">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="bg-white rounded-none sm:rounded-lg"
              style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.10)" }}
            >
              <div className="flex items-center gap-3 p-3">
                <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse flex-shrink-0" />
                <div className="flex-1 space-y-1.5">
                  <div className="h-3.5 rounded bg-gray-200 animate-pulse w-32" />
                  <div className="h-3 rounded bg-gray-200 animate-pulse w-20" />
                </div>
              </div>
              <div className="px-3 pb-3 space-y-2">
                <div className="h-3.5 rounded bg-gray-200 animate-pulse w-full" />
                <div className="h-3.5 rounded bg-gray-200 animate-pulse w-4/5" />
              </div>
              <div className="h-48 bg-gray-100 animate-pulse" />
            </div>
          ))}
        </div>
      )}

      {/* Empty state — no posts */}
      {!isLoading && allPosts.length === 0 && (
        <div
          className="mt-4 mx-3 rounded-xl bg-white p-8 flex flex-col items-center text-center"
          style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.10)" }}
          data-ocid="feed.empty_state"
        >
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
            style={{ background: "#E7F3FF" }}
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              aria-hidden="true"
            >
              <title>No posts</title>
              <path
                d="M28 8H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h24a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2Z"
                fill="#1877F2"
                opacity="0.2"
              />
              <path
                d="M16 13v6M13 16h6"
                stroke="#1877F2"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <h3 className="font-bold text-base mb-1" style={{ color: "#050505" }}>
            No posts yet
          </h3>
          <p className="text-sm mb-4" style={{ color: "#65676B" }}>
            Be the first to share something with the community!
          </p>
          {isAuthenticated && (
            <button
              type="button"
              onClick={() => setShowCreateModal(true)}
              data-ocid="feed.empty_create_button"
              className="px-5 py-2.5 rounded-lg text-sm font-semibold text-white transition-colors hover:opacity-90"
              style={{ background: "#1877F2" }}
            >
              Create Post
            </button>
          )}
        </div>
      )}

      {/* Posts feed */}
      {allPosts.length > 0 && (
        <ul
          className="mt-2 flex flex-col gap-2 list-none p-0"
          data-ocid="feed.list"
        >
          {allPosts.map((post, index) => (
            <li key={post.id}>
              <PostCard
                post={post}
                index={index + 1}
                onLike={handleLike}
                onDelete={handleDeletePost}
                onAddComment={handleAddComment}
                onDeleteComment={handleDeleteComment}
              />
            </li>
          ))}
        </ul>
      )}

      {/* Create post modal */}
      <CreatePostModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreatePost}
        authorName={authorName}
        authorSrc={authorSrc}
      />

      {/* Story creator modal */}
      <StoryCreatorModal
        isOpen={showStoryCreator}
        onClose={() => setShowStoryCreator(false)}
        onCreated={() =>
          queryClient.invalidateQueries({ queryKey: ["stories"] })
        }
        authorName={authorName}
      />

      {/* Story viewer */}
      {viewingStoryGroup !== null && storyGroups.length > 0 && (
        <StoryViewer
          groups={storyGroups}
          startGroupIndex={viewingStoryGroup}
          onClose={() => setViewingStoryGroup(null)}
        />
      )}
    </div>
  );
}
