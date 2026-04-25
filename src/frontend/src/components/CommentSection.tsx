import { UserAvatar } from "@/components/UserAvatar";
import { useAuth } from "@/hooks/use-auth";
import { Send, Trash2 } from "lucide-react";
import { useState } from "react";

export interface CommentItem {
  id: string;
  authorName: string;
  authorInitials: string;
  text: string;
  time: string;
  isOwn: boolean;
}

interface CommentSectionProps {
  postId: string;
  comments: CommentItem[];
  onAddComment: (text: string) => Promise<void>;
  onDeleteComment: (commentId: string) => Promise<void>;
}

export function CommentSection({
  postId,
  comments,
  onAddComment,
  onDeleteComment,
}: CommentSectionProps) {
  const { isAuthenticated } = useAuth();
  const [inputText, setInputText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isSubmitting) return;
    setIsSubmitting(true);
    try {
      await onAddComment(inputText.trim());
      setInputText("");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (commentId: string) => {
    setDeletingId(commentId);
    try {
      await onDeleteComment(commentId);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div
      className="border-t border-border/50 bg-muted/30 px-4 py-3 space-y-3"
      data-ocid={`feed.comments.${postId}`}
    >
      {/* Comments list */}
      {comments.length > 0 && (
        <div className="space-y-2.5" data-ocid={`feed.comment_list.${postId}`}>
          {comments.map((comment, index) => (
            <div
              key={comment.id}
              className="flex gap-2.5 items-start group"
              data-ocid={`feed.comment.${index + 1}`}
            >
              <UserAvatar name={comment.authorName} size="sm" />
              <div className="flex-1 min-w-0">
                <div className="bg-card rounded-xl px-3 py-2 inline-block max-w-full">
                  <p className="text-xs font-semibold text-foreground font-display">
                    {comment.authorName}
                  </p>
                  <p className="text-sm text-foreground break-words">
                    {comment.text}
                  </p>
                </div>
                <p className="text-xs text-muted-foreground mt-1 ml-1">
                  {comment.time}
                </p>
              </div>
              {comment.isOwn && (
                <button
                  type="button"
                  onClick={() => handleDelete(comment.id)}
                  disabled={deletingId === comment.id}
                  data-ocid={`feed.delete_comment_button.${index + 1}`}
                  className="opacity-0 group-hover:opacity-100 p-1.5 rounded-full text-destructive hover:bg-destructive/10 transition-smooth disabled:opacity-40 mt-1 flex-shrink-0"
                  aria-label="Delete comment"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Comment input */}
      {isAuthenticated && (
        <form
          onSubmit={handleSubmit}
          className="flex gap-2 items-center"
          data-ocid={`feed.comment_form.${postId}`}
        >
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Write a comment..."
              disabled={isSubmitting}
              data-ocid={`feed.comment_input.${postId}`}
              className="w-full bg-card border border-input rounded-full px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-smooth disabled:opacity-60"
            />
          </div>
          <button
            type="submit"
            disabled={!inputText.trim() || isSubmitting}
            data-ocid={`feed.comment_submit.${postId}`}
            className="w-9 h-9 rounded-full gradient-primary flex items-center justify-center text-primary-foreground disabled:opacity-40 transition-smooth hover:opacity-90 flex-shrink-0"
            aria-label="Send comment"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      )}

      {!isAuthenticated && comments.length === 0 && (
        <p
          className="text-xs text-muted-foreground text-center py-1"
          data-ocid={`feed.comments_empty.${postId}`}
        >
          Sign in to join the conversation
        </p>
      )}
    </div>
  );
}
