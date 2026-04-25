import { type CommentItem, CommentSection } from "@/components/CommentSection";
import { VerifiedBadge } from "@/components/VerifiedBadge";
import { useAuth } from "@/hooks/use-auth";
import {
  Flag,
  MessageCircle,
  MoreHorizontal,
  Share2,
  ThumbsUp,
  Trash2,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export interface PostCardData {
  id: string;
  authorName: string;
  authorInitials: string;
  authorSrc?: string;
  authorIsVerified?: boolean;
  time: string;
  text: string;
  imageSrc?: string;
  imageCaption?: string;
  likeCount: number;
  commentCount: number;
  liked: boolean;
  isOwn?: boolean;
  sampleComments?: CommentItem[];
}

interface PostCardProps {
  post: PostCardData;
  onLike?: (postId: string) => Promise<void>;
  onDelete?: (postId: string) => Promise<void>;
  onAddComment?: (postId: string, text: string) => Promise<void>;
  onDeleteComment?: (postId: string, commentId: string) => Promise<void>;
  index: number;
}

export function PostCard({
  post,
  onLike,
  onDelete,
  onAddComment,
  onDeleteComment,
  index,
}: PostCardProps) {
  const { isAuthenticated } = useAuth();
  const [liked, setLiked] = useState(post.liked);
  const [likeCount, setLikeCount] = useState(post.likeCount);
  const [commentCount, setCommentCount] = useState(post.commentCount);
  const [showComments, setShowComments] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [isLiking, setIsLiking] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [comments, setComments] = useState<CommentItem[]>(
    post.sampleComments ?? [],
  );
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu on outside click
  useEffect(() => {
    if (!showMenu) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [showMenu]);

  const handleLike = async () => {
    if (!isAuthenticated || isLiking) return;
    setIsLiking(true);
    const newLiked = !liked;
    setLiked(newLiked);
    setLikeCount((prev) => (newLiked ? prev + 1 : Math.max(0, prev - 1)));
    try {
      await onLike?.(post.id);
    } catch {
      setLiked(!newLiked);
      setLikeCount((prev) => (newLiked ? Math.max(0, prev - 1) : prev + 1));
    } finally {
      setIsLiking(false);
    }
  };

  const handleDelete = async () => {
    if (isDeleting) return;
    setIsDeleting(true);
    setShowMenu(false);
    try {
      await onDelete?.(post.id);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleReport = () => {
    setShowMenu(false);
    toast.info("Post reported. Our team will review it.", { duration: 4000 });
  };

  const handleAddComment = async (text: string) => {
    await onAddComment?.(post.id, text);
    const newComment: CommentItem = {
      id: `local-${Date.now()}`,
      authorName: "You",
      authorInitials: "YO",
      text,
      time: "Just now",
      isOwn: true,
    };
    setComments((prev) => [...prev, newComment]);
    setCommentCount((prev) => prev + 1);
  };

  const handleDeleteComment = async (commentId: string) => {
    await onDeleteComment?.(post.id, commentId);
    setComments((prev) => prev.filter((c) => c.id !== commentId));
    setCommentCount((prev) => Math.max(0, prev - 1));
  };

  const handleShare = async () => {
    const url = `${window.location.origin}/?post=${post.id}`;
    const shareData = {
      title: `Post by ${post.authorName}`,
      text: post.text.slice(0, 120),
      url,
    };
    if (navigator.share && navigator.canShare?.(shareData)) {
      try {
        await navigator.share(shareData);
      } catch {
        /* user cancelled */
      }
    } else {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard!");
    }
  };

  const initials = post.authorName.slice(0, 2).toUpperCase();

  return (
    <article
      className="bg-white rounded-none sm:rounded-lg overflow-hidden"
      style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.10)" }}
      data-ocid={`feed.post.item.${index}`}
    >
      {/* Author row */}
      <div className="flex items-center gap-2 px-3 pt-3 pb-2">
        <div
          className="w-10 h-10 rounded-full flex-shrink-0 overflow-hidden flex items-center justify-center font-bold text-white text-sm"
          style={{ background: "#1877F2" }}
        >
          {post.authorSrc ? (
            <img
              src={post.authorSrc}
              alt={post.authorName}
              className="w-full h-full object-cover"
            />
          ) : (
            initials
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1">
            <span
              className="font-bold text-sm leading-tight"
              style={{ color: "#050505" }}
            >
              {post.authorName}
            </span>
            {post.authorIsVerified && <VerifiedBadge size="xs" />}
          </div>
          <p className="text-xs" style={{ color: "#65676B" }}>
            {post.time}
          </p>
        </div>

        {/* 3-dot menu */}
        <div className="relative" ref={menuRef}>
          <button
            type="button"
            onClick={() => setShowMenu((prev) => !prev)}
            data-ocid={`feed.post_menu.${index}`}
            className="w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:bg-gray-100"
            aria-label="Post options"
            style={{ color: "#65676B" }}
          >
            <MoreHorizontal className="w-5 h-5" />
          </button>
          {showMenu && (
            <div
              className="absolute right-0 top-10 z-20 bg-white rounded-xl py-2 min-w-[200px]"
              style={{
                boxShadow: "0 2px 12px rgba(0,0,0,0.18)",
                border: "1px solid #E4E6EB",
              }}
              data-ocid={`feed.post_menu_dropdown.${index}`}
            >
              {post.isOwn ? (
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={isDeleting}
                  data-ocid={`feed.delete_post_button.${index}`}
                  className="flex items-center gap-3 w-full px-4 py-2.5 text-sm font-medium transition-colors hover:bg-gray-100 disabled:opacity-50"
                  style={{ color: "#D93025" }}
                >
                  <Trash2 className="w-4 h-4" />
                  {isDeleting ? "Deleting…" : "Delete post"}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleReport}
                  data-ocid={`feed.report_post_button.${index}`}
                  className="flex items-center gap-3 w-full px-4 py-2.5 text-sm font-medium transition-colors hover:bg-gray-100"
                  style={{ color: "#050505" }}
                >
                  <Flag className="w-4 h-4" />
                  Report post
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Post text */}
      {post.text && (
        <div className="px-3 pb-2">
          <p
            className="text-[15px] leading-relaxed"
            style={{ color: "#050505" }}
          >
            {post.text}
          </p>
        </div>
      )}

      {/* Post image — full bleed */}
      {post.imageSrc && (
        <div
          className="w-full border-t border-b"
          style={{ borderColor: "#E4E6EB" }}
        >
          <img
            src={post.imageSrc}
            alt={post.imageCaption ?? "Post image"}
            className="w-full object-cover"
            style={{ maxHeight: 500 }}
          />
        </div>
      )}

      {/* Reaction / comment counts row */}
      {(likeCount > 0 || commentCount > 0) && (
        <div className="flex items-center justify-between px-3 py-2">
          {likeCount > 0 && (
            <div className="flex items-center gap-1.5">
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center"
                style={{ background: "#1877F2" }}
              >
                <ThumbsUp className="w-2.5 h-2.5 text-white" fill="white" />
              </div>
              <span className="text-sm" style={{ color: "#65676B" }}>
                {likeCount}
              </span>
            </div>
          )}
          {commentCount > 0 && (
            <button
              type="button"
              onClick={() => setShowComments((prev) => !prev)}
              className="text-sm transition-colors hover:underline ml-auto"
              style={{ color: "#65676B" }}
            >
              {commentCount} comment{commentCount !== 1 ? "s" : ""}
            </button>
          )}
        </div>
      )}

      {/* Action bar */}
      <div
        className="flex items-center border-t mx-3"
        style={{ borderColor: "#E4E6EB" }}
      >
        <button
          type="button"
          onClick={handleLike}
          disabled={!isAuthenticated}
          data-ocid={`feed.like_button.${index}`}
          className="flex flex-1 items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-colors hover:bg-gray-100 disabled:cursor-default"
          style={{ color: liked ? "#1877F2" : "#65676B" }}
        >
          <ThumbsUp
            className="w-[18px] h-[18px]"
            fill={liked ? "#1877F2" : "none"}
            strokeWidth={liked ? 0 : 2}
          />
          Like
        </button>

        <button
          type="button"
          onClick={() => setShowComments((prev) => !prev)}
          data-ocid={`feed.comment_button.${index}`}
          className="flex flex-1 items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-colors hover:bg-gray-100"
          style={{ color: "#65676B" }}
        >
          <MessageCircle className="w-[18px] h-[18px]" />
          Comment
        </button>

        <button
          type="button"
          onClick={handleShare}
          data-ocid={`feed.share_button.${index}`}
          className="flex flex-1 items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-colors hover:bg-gray-100"
          style={{ color: "#65676B" }}
          aria-label="Share post"
        >
          <Share2 className="w-[18px] h-[18px]" />
          Share
        </button>
      </div>

      {/* Comment section */}
      {showComments && (
        <div className="border-t mx-0" style={{ borderColor: "#E4E6EB" }}>
          <CommentSection
            postId={post.id}
            comments={comments}
            onAddComment={handleAddComment}
            onDeleteComment={handleDeleteComment}
          />
        </div>
      )}
    </article>
  );
}
