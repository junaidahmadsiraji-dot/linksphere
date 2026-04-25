import { useAuth } from "@/hooks/use-auth";
import { Camera, Loader2, MapPin, Smile, Tag, X } from "lucide-react";
import { useRef, useState } from "react";

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (text: string, imageFile?: File) => Promise<void>;
  authorName: string;
  authorSrc?: string;
}

export function CreatePostModal({
  isOpen,
  onClose,
  onSubmit,
  authorName,
  authorSrc,
}: CreatePostModalProps) {
  const { isAuthenticated } = useAuth();
  const [text, setText] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || isSubmitting) return;
    setIsSubmitting(true);
    try {
      await onSubmit(text.trim(), imageFile ?? undefined);
      setText("");
      removeImage();
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  const initials = authorName.slice(0, 2).toUpperCase();

  return (
    <dialog
      open
      className="fixed inset-0 z-50 flex items-center justify-center w-full h-full max-w-none max-h-none m-0 p-4 border-0"
      style={{ background: "rgba(0,0,0,0.50)" }}
      aria-label="Create post"
      data-ocid="feed.create_post.dialog"
    >
      {/* Modal container */}
      <div
        className="relative w-full max-w-[500px] bg-white rounded-xl overflow-hidden"
        style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.28)" }}
      >
        {/* Header */}
        <div
          className="relative flex items-center justify-center px-4 py-3 border-b"
          style={{ borderColor: "#E4E6EB" }}
        >
          <h2 className="font-bold text-xl" style={{ color: "#050505" }}>
            Create post
          </h2>
          <button
            type="button"
            onClick={onClose}
            data-ocid="feed.create_post.close_button"
            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:bg-gray-100"
            aria-label="Close"
            style={{ background: "#E4E6EB", color: "#050505" }}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Author row */}
          <div className="flex items-center gap-2.5 px-4 pt-3 pb-1">
            <div
              className="w-10 h-10 rounded-full flex-shrink-0 overflow-hidden flex items-center justify-center font-bold text-white text-sm"
              style={{ background: "#1877F2" }}
            >
              {authorSrc ? (
                <img
                  src={authorSrc}
                  alt={authorName}
                  className="w-full h-full object-cover"
                />
              ) : (
                initials
              )}
            </div>
            <div>
              <p
                className="font-semibold text-sm leading-tight"
                style={{ color: "#050505" }}
              >
                {authorName}
              </p>
              <button
                type="button"
                className="flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold mt-0.5 transition-colors hover:opacity-80"
                style={{ background: "#E4E6EB", color: "#050505" }}
              >
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  aria-hidden="true"
                >
                  <title>Public</title>
                  <circle
                    cx="5"
                    cy="5"
                    r="4.5"
                    stroke="#65676B"
                    strokeWidth="1"
                  />
                  <path
                    d="M5 2C3.895 2 3 2.895 3 4s.895 2 2 2 2-.895 2-2-.895-2-2-2Z"
                    fill="#65676B"
                  />
                  <path
                    d="M1.5 8c0-1.657 1.567-3 3.5-3s3.5 1.343 3.5 3"
                    stroke="#65676B"
                    strokeWidth="1"
                    strokeLinecap="round"
                  />
                </svg>
                Public
              </button>
            </div>
          </div>

          {/* Text area */}
          <div className="px-4 py-2">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={`What's on your mind, ${authorName.split(" ")[0]}?`}
              rows={4}
              disabled={isSubmitting}
              data-ocid="feed.create_post.textarea"
              // biome-ignore lint/a11y/noAutofocus: UX-intentional focus for modal
              autoFocus
              className="w-full resize-none bg-transparent focus:outline-none disabled:opacity-60 leading-relaxed text-xl"
              style={{ color: "#050505" }}
            />
          </div>

          {/* Image preview */}
          {imagePreview && (
            <div
              className="mx-4 mb-3 relative rounded-xl overflow-hidden border"
              style={{ borderColor: "#E4E6EB" }}
            >
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full object-cover max-h-56"
              />
              <button
                type="button"
                onClick={removeImage}
                data-ocid="feed.create_post.remove_image"
                className="absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:opacity-90"
                style={{
                  background: "rgba(255,255,255,0.9)",
                  color: "#050505",
                }}
                aria-label="Remove image"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Add to your post row */}
          <div
            className="mx-4 mb-3 rounded-xl border flex items-center justify-between px-3 py-2"
            style={{ borderColor: "#CED0D4" }}
          >
            <span
              className="text-sm font-semibold"
              style={{ color: "#050505" }}
            >
              Add to your post
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isSubmitting}
                data-ocid="feed.create_post.upload_button"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:bg-gray-100 disabled:opacity-50"
                aria-label="Add photo or video"
              >
                <Camera className="w-6 h-6" style={{ color: "#45BD62" }} />
              </button>
              <button
                type="button"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:bg-gray-100"
                aria-label="Tag people"
              >
                <Tag className="w-6 h-6" style={{ color: "#1877F2" }} />
              </button>
              <button
                type="button"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:bg-gray-100"
                aria-label="Feeling / Activity"
              >
                <Smile className="w-6 h-6" style={{ color: "#F7B928" }} />
              </button>
              <button
                type="button"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:bg-gray-100"
                aria-label="Check in"
              >
                <MapPin className="w-6 h-6" style={{ color: "#F02849" }} />
              </button>
            </div>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            aria-label="Upload image"
          />

          {/* Post button */}
          <div className="px-4 pb-4">
            <button
              type="submit"
              disabled={!text.trim() || isSubmitting || !isAuthenticated}
              data-ocid="feed.create_post.submit_button"
              className="w-full py-2.5 rounded-lg text-sm font-bold transition-colors disabled:opacity-40 flex items-center justify-center gap-2 text-white"
              style={{
                background:
                  text.trim() && !isSubmitting && isAuthenticated
                    ? "#1877F2"
                    : "#BEC3C9",
              }}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Posting…
                </>
              ) : (
                "Post"
              )}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}
