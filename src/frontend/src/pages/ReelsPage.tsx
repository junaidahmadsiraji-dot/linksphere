import { CreateReelModal } from "@/components/CreateReelModal";
import { UserAvatar } from "@/components/UserAvatar";
import { VerifiedBadge } from "@/components/VerifiedBadge";
import { useAuth } from "@/hooks/use-auth";
import { useLikeReel, useReels, useSaveReel } from "@/hooks/use-backend";
import type { Reel } from "@/types";
import {
  Bookmark,
  Film,
  Heart,
  MessageCircle,
  Music2,
  Plus,
  Share2,
  Volume2,
  VolumeX,
} from "lucide-react";
import { useCallback, useRef, useState } from "react";

// ── Helpers ───────────────────────────────────────────────────────────────────

function timeAgo(ts: bigint): string {
  const diff = Date.now() - Number(ts) / 1_000_000;
  const m = Math.floor(diff / 60000);
  if (m < 1) return "Just now";
  if (m < 60) return `${m}m`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h`;
  return `${Math.floor(h / 24)}d`;
}

// ── ReelCard ──────────────────────────────────────────────────────────────────

function ReelCard({
  reel,
  idx,
  onLike,
  onSave,
  currentUserId,
  muted,
  onToggleMute,
}: {
  reel: Reel;
  idx: number;
  onLike: (id: bigint) => void;
  onSave: (id: bigint) => void;
  currentUserId?: string;
  muted: boolean;
  onToggleMute: () => void;
}) {
  const isLiked = currentUserId
    ? reel.likedBy.some((uid) => uid.toText?.() === currentUserId)
    : false;
  const isSaved = currentUserId
    ? reel.savedBy.some((uid) => uid.toText?.() === currentUserId)
    : false;

  const mediaUrl = reel.mediaUrl.getDirectURL();
  const isVideo = reel.mediaType === "video";

  return (
    <div
      className="relative w-full h-full overflow-hidden snap-start snap-always flex-shrink-0 bg-black"
      data-ocid={`reels.item.${idx + 1}`}
    >
      {/* Media */}
      {isVideo ? (
        <video
          src={mediaUrl}
          autoPlay
          loop
          playsInline
          muted={muted}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <img
          src={mediaUrl}
          alt={reel.title}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
      )}

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-black/40 pointer-events-none" />

      {/* Top header: logo + mute */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 pt-4 pb-2 z-20">
        <span
          className="text-white font-bold text-base tracking-tight"
          style={{ textShadow: "0 1px 4px rgba(0,0,0,0.6)" }}
        >
          Reels
        </span>
        {isVideo && (
          <button
            type="button"
            onClick={onToggleMute}
            className="w-9 h-9 rounded-full bg-black/40 flex items-center justify-center text-white backdrop-blur-sm transition-colors hover:bg-black/60"
            aria-label={muted ? "Unmute" : "Mute"}
            data-ocid={`reels.mute_button.${idx + 1}`}
          >
            {muted ? (
              <VolumeX className="w-4 h-4" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </button>
        )}
      </div>

      {/* Right-side action column */}
      <div className="absolute right-3 bottom-28 flex flex-col items-center gap-5 z-10">
        {/* Like */}
        <button
          type="button"
          onClick={() => onLike(reel.id)}
          data-ocid={`reels.like_button.${idx + 1}`}
          className="flex flex-col items-center gap-1"
          aria-label={isLiked ? "Unlike" : "Like"}
        >
          <div className="w-11 h-11 rounded-full bg-black/40 flex items-center justify-center">
            <Heart
              className={`w-6 h-6 transition-transform ${isLiked ? "fill-red-500 text-red-500 scale-110" : "text-white"}`}
              strokeWidth={1.75}
            />
          </div>
          <span className="text-white text-xs font-semibold tabular-nums drop-shadow">
            {reel.likedBy.length}
          </span>
        </button>

        {/* Comment */}
        <button
          type="button"
          data-ocid={`reels.comment_button.${idx + 1}`}
          className="flex flex-col items-center gap-1"
          aria-label="Comment"
        >
          <div className="w-11 h-11 rounded-full bg-black/40 flex items-center justify-center">
            <MessageCircle className="w-6 h-6 text-white" strokeWidth={1.75} />
          </div>
          <span className="text-white text-xs font-semibold drop-shadow">
            0
          </span>
        </button>

        {/* Save */}
        <button
          type="button"
          onClick={() => onSave(reel.id)}
          data-ocid={`reels.save_button.${idx + 1}`}
          className="flex flex-col items-center gap-1"
          aria-label={isSaved ? "Unsave" : "Save"}
        >
          <div
            className={`w-11 h-11 rounded-full flex items-center justify-center ${isSaved ? "bg-yellow-500/30" : "bg-black/40"}`}
          >
            <Bookmark
              className={`w-6 h-6 ${isSaved ? "fill-yellow-400 text-yellow-400" : "text-white"}`}
              strokeWidth={1.75}
            />
          </div>
        </button>

        {/* Share */}
        <button
          type="button"
          data-ocid={`reels.share_button.${idx + 1}`}
          className="flex flex-col items-center gap-1"
          aria-label="Share"
        >
          <div className="w-11 h-11 rounded-full bg-black/40 flex items-center justify-center">
            <Share2 className="w-6 h-6 text-white" strokeWidth={1.75} />
          </div>
        </button>
      </div>

      {/* Bottom: author + info */}
      <div className="absolute bottom-4 left-4 right-20 z-10 space-y-1.5">
        {/* Author row */}
        <div className="flex items-center gap-2">
          <UserAvatar name={reel.authorName} size="sm" />
          <p className="text-white text-sm font-semibold flex items-center gap-1">
            <span className="truncate max-w-[140px]">{reel.authorName}</span>
            {reel.authorIsVerified && <VerifiedBadge size="xs" />}
          </p>
          <span className="text-white/50 text-xs">
            · {timeAgo(reel.createdAt)}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-white font-semibold text-[15px] leading-snug line-clamp-2 drop-shadow">
          {reel.title}
        </h3>

        {/* Description */}
        {reel.description && (
          <p className="text-white/75 text-sm leading-snug line-clamp-2">
            {reel.description}
          </p>
        )}

        {/* Song */}
        <div className="flex items-center gap-1.5">
          <Music2 className="w-3.5 h-3.5 text-white/60 flex-shrink-0" />
          <span className="text-white/60 text-xs truncate">Original Audio</span>
        </div>
      </div>
    </div>
  );
}

// ── Empty State ───────────────────────────────────────────────────────────────

function ReelsEmptyState({
  onCreate,
  isAuthenticated,
}: { onCreate: () => void; isAuthenticated: boolean }) {
  return (
    <div
      className="h-full w-full snap-start snap-always flex flex-col items-center justify-center gap-6 bg-black px-6"
      data-ocid="reels.empty_state"
    >
      <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center">
        <Film className="w-10 h-10 text-white/60" strokeWidth={1.25} />
      </div>
      <div className="text-center space-y-2">
        <h3 className="text-white font-bold text-xl">No reels yet</h3>
        <p className="text-white/50 text-sm max-w-xs leading-relaxed">
          Be the first to share a reel — a short video or image moment.
        </p>
      </div>
      {isAuthenticated && (
        <button
          type="button"
          onClick={onCreate}
          data-ocid="reels.create_first_button"
          className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white border border-white/30 hover:bg-white/10 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Create your first reel
        </button>
      )}
    </div>
  );
}

// ── ReelsPage ─────────────────────────────────────────────────────────────────

export default function ReelsPage() {
  const { isAuthenticated, principal } = useAuth();
  const { data: reels = [], isLoading } = useReels();
  const { mutate: likeReel } = useLikeReel();
  const { mutate: saveReel } = useSaveReel();
  const [showCreate, setShowCreate] = useState(false);
  const [muted, setMuted] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleToggleMute = useCallback(() => setMuted((m) => !m), []);

  return (
    <div
      className="relative bg-black"
      style={{ height: "calc(100dvh - 3.5rem)" }}
      data-ocid="reels.page"
    >
      {/* Vertical snap scroll container */}
      <div
        ref={containerRef}
        className="h-full overflow-y-scroll snap-y snap-mandatory"
        style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}
        data-ocid="reels.feed"
      >
        {isLoading ? (
          <div
            className="h-full w-full snap-start snap-always flex flex-col items-center justify-center gap-4"
            data-ocid="reels.loading_state"
          >
            <div className="w-10 h-10 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            <p className="text-white/50 text-sm">Loading reels…</p>
          </div>
        ) : reels.length === 0 ? (
          <ReelsEmptyState
            onCreate={() => setShowCreate(true)}
            isAuthenticated={isAuthenticated}
          />
        ) : (
          reels.map((reel, i) => (
            <div
              key={String(reel.id)}
              className="h-full w-full snap-start snap-always"
            >
              <ReelCard
                reel={reel}
                idx={i}
                onLike={likeReel}
                onSave={saveReel}
                currentUserId={principal ?? undefined}
                muted={muted}
                onToggleMute={handleToggleMute}
              />
            </div>
          ))
        )}
      </div>

      {/* Create reel FAB (authenticated only, shown when there are reels) */}
      {isAuthenticated && reels.length > 0 && (
        <button
          type="button"
          onClick={() => setShowCreate(true)}
          data-ocid="reels.create_button"
          aria-label="Create reel"
          className="absolute top-14 right-4 w-10 h-10 rounded-full flex items-center justify-center shadow-lg z-20 transition-transform hover:scale-105 active:scale-95 bg-white/20 backdrop-blur-sm border border-white/30"
        >
          <Plus className="w-5 h-5 text-white" />
        </button>
      )}

      {/* Create reel modal */}
      <CreateReelModal open={showCreate} onOpenChange={setShowCreate} />
    </div>
  );
}
