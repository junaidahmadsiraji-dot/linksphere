import { createActor } from "@/backend";
import type { PostView } from "@/backend.d";
import { ModerationAction } from "@/backend.d";
import { useAdminAuth } from "@/hooks/use-admin-auth";
import { useActor } from "@caffeineai/core-infrastructure";
import {
  AlertTriangle,
  CheckCircle,
  FileText,
  Image,
  Search,
  Trash2,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

interface ConfirmDialog {
  postId: bigint;
  action: "approve" | "delete";
  author: string;
}

export default function AdminPostsPage() {
  const { actor } = useActor(createActor);
  const { adminToken } = useAdminAuth();

  const [posts, setPosts] = useState<PostView[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [confirm, setConfirm] = useState<ConfirmDialog | null>(null);
  const [actionLoading, setActionLoading] = useState<bigint | null>(null);

  const loadPosts = useCallback(async () => {
    if (!actor || !adminToken) return;
    setIsLoading(true);
    try {
      const result = await actor.getFlaggedPosts(adminToken);
      setPosts(result as PostView[]);
    } catch {
      toast.error("Failed to load flagged posts");
    } finally {
      setIsLoading(false);
    }
  }, [actor, adminToken]);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  const filtered = posts.filter(
    (p) =>
      p.authorName.toLowerCase().includes(search.toLowerCase()) ||
      p.text.toLowerCase().includes(search.toLowerCase()),
  );

  async function executeModeration(dialog: ConfirmDialog) {
    if (!actor || !adminToken) return;
    setActionLoading(dialog.postId);
    try {
      const action =
        dialog.action === "approve"
          ? ModerationAction.approve
          : ModerationAction.delete_;
      await actor.moderatePost(adminToken, dialog.postId, action);
      toast.success(
        dialog.action === "approve"
          ? `Post by @${dialog.author} approved`
          : `Post by @${dialog.author} deleted`,
      );
      await loadPosts();
    } catch {
      toast.error("Moderation action failed");
    } finally {
      setActionLoading(null);
      setConfirm(null);
    }
  }

  function flagSeverity(count: bigint): { bg: string; text: string } {
    const n = Number(count);
    if (n >= 10)
      return { bg: "oklch(0.65 0.19 22 / 0.25)", text: "oklch(0.82 0.18 22)" };
    if (n >= 5)
      return { bg: "oklch(0.65 0.19 22 / 0.15)", text: "oklch(0.75 0.15 22)" };
    return { bg: "oklch(0.65 0.19 22 / 0.08)", text: "oklch(0.65 0.14 22)" };
  }

  return (
    <div className="space-y-5" data-ocid="admin.posts.page">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1
            className="text-xl font-bold"
            style={{
              color: "oklch(0.93 0.01 282)",
              fontFamily: "var(--font-display)",
            }}
          >
            Post Moderation
          </h1>
          <p
            className="text-sm mt-0.5"
            style={{ color: "oklch(0.64 0.01 282)" }}
          >
            {isLoading
              ? "Loading…"
              : `${posts.length} flagged posts awaiting review`}
          </p>
        </div>
        {posts.length > 0 && (
          <span
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full font-medium"
            style={{
              background: "oklch(0.65 0.19 22 / 0.15)",
              color: "oklch(0.75 0.15 22)",
            }}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            {posts.length} pending
          </span>
        )}
      </div>

      {/* Search */}
      <div className="relative">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
          style={{ color: "oklch(0.54 0.01 282)" }}
        />
        <input
          type="text"
          placeholder="Search flagged posts by author or content..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm outline-none"
          style={{
            background: "oklch(0.15 0.01 282)",
            border: "1px solid oklch(0.2 0.008 282)",
            color: "oklch(0.93 0.01 282)",
          }}
          data-ocid="admin.posts.search_input"
        />
      </div>

      {/* Loading */}
      {isLoading && (
        <div
          className="py-16 flex flex-col items-center gap-3"
          data-ocid="admin.posts.loading_state"
        >
          <div
            className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
            style={{
              borderColor: "oklch(0.72 0.26 180)",
              borderTopColor: "transparent",
            }}
          />
          <p className="text-sm" style={{ color: "oklch(0.54 0.01 282)" }}>
            Loading flagged posts…
          </p>
        </div>
      )}

      {/* Posts list */}
      {!isLoading && (
        <div className="space-y-3">
          {filtered.map((post, idx) => {
            const severity = flagSeverity(post.flagCount);
            const isActing = actionLoading === post.id;
            return (
              <div
                key={String(post.id)}
                className="rounded-xl p-4"
                data-ocid={`admin.posts.item.${idx + 1}`}
                style={{
                  background: "oklch(0.15 0.01 282)",
                  border: "1px solid oklch(0.2 0.008 282)",
                  opacity: isActing ? 0.6 : 1,
                  transition: "opacity 0.2s",
                }}
              >
                <div className="flex items-start gap-4">
                  {/* Avatar */}
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5"
                    style={{
                      background: "oklch(0.62 0.22 260 / 0.2)",
                      color: "oklch(0.72 0.26 180)",
                    }}
                  >
                    {post.authorName[0]?.toUpperCase() ?? "?"}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <span
                        className="text-sm font-medium"
                        style={{ color: "oklch(0.84 0.01 282)" }}
                      >
                        @{post.authorName}
                      </span>
                      <span
                        className="text-xs"
                        style={{ color: "oklch(0.48 0.01 282)" }}
                      >
                        {new Date(
                          Number(post.createdAt / 1_000_000n),
                        ).toLocaleDateString()}
                      </span>
                      <span
                        className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-semibold"
                        style={{
                          background: severity.bg,
                          color: severity.text,
                        }}
                      >
                        <AlertTriangle className="w-3 h-3" />
                        {String(post.flagCount)} flags
                      </span>
                    </div>

                    <p
                      className="text-sm line-clamp-2 mb-2"
                      style={{ color: "oklch(0.74 0.01 282)" }}
                    >
                      {post.text}
                    </p>

                    {post.image && (
                      <div
                        className="inline-flex items-center gap-1.5 text-xs px-2 py-1 rounded-lg mb-2"
                        style={{
                          background: "oklch(0.62 0.22 260 / 0.1)",
                          color: "oklch(0.72 0.22 260)",
                        }}
                      >
                        <Image className="w-3 h-3" />
                        Has image attachment
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      type="button"
                      disabled={isActing}
                      onClick={() =>
                        setConfirm({
                          postId: post.id,
                          action: "approve",
                          author: post.authorName,
                        })
                      }
                      className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-smooth font-medium"
                      style={{
                        background: "oklch(0.68 0.22 150 / 0.15)",
                        color: "oklch(0.72 0.22 150)",
                      }}
                      data-ocid={`admin.posts.approve_button.${idx + 1}`}
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                      Approve
                    </button>
                    <button
                      type="button"
                      disabled={isActing}
                      onClick={() =>
                        setConfirm({
                          postId: post.id,
                          action: "delete",
                          author: post.authorName,
                        })
                      }
                      className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-smooth font-medium"
                      style={{
                        background: "oklch(0.65 0.19 22 / 0.15)",
                        color: "oklch(0.75 0.15 22)",
                      }}
                      data-ocid={`admin.posts.delete_button.${idx + 1}`}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          {filtered.length === 0 && (
            <div
              className="py-16 text-center rounded-xl"
              data-ocid="admin.posts.empty_state"
              style={{
                background: "oklch(0.15 0.01 282)",
                border: "1px solid oklch(0.2 0.008 282)",
              }}
            >
              <FileText
                className="w-10 h-10 mx-auto mb-3 opacity-30"
                style={{ color: "oklch(0.64 0.01 282)" }}
              />
              <p
                className="font-medium text-sm"
                style={{ color: "oklch(0.74 0.01 282)" }}
              >
                {search
                  ? "No matching flagged posts"
                  : "No flagged posts — all clear!"}
              </p>
              {!search && (
                <p
                  className="text-xs mt-1"
                  style={{ color: "oklch(0.44 0.01 282)" }}
                >
                  The moderation queue is empty
                </p>
              )}
            </div>
          )}
        </div>
      )}

      {/* Confirm Dialog */}
      {confirm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.7)" }}
          data-ocid="admin.posts.dialog"
        >
          <div
            className="w-full max-w-sm rounded-2xl p-6"
            style={{
              background: "oklch(0.17 0.01 282)",
              border: "1px solid oklch(0.25 0.008 282)",
            }}
          >
            <h3
              className="font-semibold mb-2"
              style={{ color: "oklch(0.93 0.01 282)" }}
            >
              {confirm.action === "approve" ? "Approve Post" : "Delete Post"}
            </h3>
            <p
              className="text-sm mb-5"
              style={{ color: "oklch(0.64 0.01 282)" }}
            >
              {confirm.action === "approve"
                ? `This will clear all flags and approve the post by @${confirm.author}.`
                : `This will permanently delete the post by @${confirm.author}. This cannot be undone.`}
            </p>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setConfirm(null)}
                className="flex-1 py-2 rounded-xl text-sm font-medium"
                style={{
                  background: "oklch(0.22 0.008 282)",
                  color: "oklch(0.74 0.01 282)",
                }}
                data-ocid="admin.posts.cancel_button"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => executeModeration(confirm)}
                className="flex-1 py-2 rounded-xl text-sm font-medium"
                style={{
                  background:
                    confirm.action === "delete"
                      ? "oklch(0.65 0.19 22)"
                      : "linear-gradient(135deg, oklch(0.62 0.22 260) 0%, oklch(0.72 0.26 180) 100%)",
                  color: "oklch(0.11 0.008 282)",
                }}
                data-ocid="admin.posts.confirm_button"
              >
                {confirm.action === "approve" ? "Approve" : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
