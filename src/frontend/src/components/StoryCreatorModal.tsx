import { useAuth } from "@/hooks/use-auth";
import { useActor } from "@caffeineai/core-infrastructure";
import { ImageIcon, Loader2, X } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { ExternalBlob, createActor } from "../backend";

interface StoryCreatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated?: () => void;
  authorName: string;
}

export function StoryCreatorModal({
  isOpen,
  onClose,
  onCreated,
  authorName,
}: StoryCreatorModalProps) {
  const { isAuthenticated } = useAuth();
  const { actor } = useActor(createActor);
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
    if (!imageFile || isSubmitting || !actor) return;
    setIsSubmitting(true);
    try {
      const arrayBuffer = await imageFile.arrayBuffer();
      const bytes = new Uint8Array(arrayBuffer) as Uint8Array<ArrayBuffer>;
      const image = ExternalBlob.fromBytes(bytes);
      await actor.createStory({ image });
      toast.success("Story posted!");
      removeImage();
      onCreated?.();
      onClose();
    } catch {
      toast.error("Failed to post story. Please try again.");
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
      aria-label="Create story"
      data-ocid="stories.creator.dialog"
    >
      <div
        className="relative w-full max-w-[400px] bg-white rounded-xl overflow-hidden"
        style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.28)" }}
      >
        {/* Header */}
        <div
          className="relative flex items-center justify-center px-4 py-3 border-b"
          style={{ borderColor: "#E4E6EB" }}
        >
          <h2 className="font-bold text-xl" style={{ color: "#050505" }}>
            Add to Story
          </h2>
          <button
            type="button"
            onClick={onClose}
            data-ocid="stories.creator.close_button"
            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:bg-gray-100"
            style={{ background: "#E4E6EB", color: "#050505" }}
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Author info */}
          <div className="flex items-center gap-2.5 px-4 pt-3 pb-2">
            <div
              className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-white text-sm"
              style={{ background: "#1877F2" }}
            >
              {initials}
            </div>
            <div>
              <p className="font-semibold text-sm" style={{ color: "#050505" }}>
                {authorName}
              </p>
              <p className="text-xs" style={{ color: "#65676B" }}>
                Visible for 24 hours
              </p>
            </div>
          </div>

          {/* Image picker / preview */}
          <div className="px-4 pb-3">
            {imagePreview ? (
              <div
                className="relative rounded-xl overflow-hidden border"
                style={{ borderColor: "#E4E6EB" }}
              >
                <img
                  src={imagePreview}
                  alt="Story preview"
                  className="w-full object-cover max-h-64"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  data-ocid="stories.creator.remove_image"
                  className="absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                  style={{
                    background: "rgba(255,255,255,0.9)",
                    color: "#050505",
                  }}
                  aria-label="Remove image"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                data-ocid="stories.creator.upload_button"
                className="w-full border-2 border-dashed rounded-xl py-10 flex flex-col items-center gap-3 transition-colors"
                style={{ borderColor: "#CED0D4", color: "#65676B" }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center"
                  style={{ background: "#E7F3FF" }}
                >
                  <ImageIcon className="w-7 h-7" style={{ color: "#1877F2" }} />
                </div>
                <div className="text-center">
                  <p
                    className="font-semibold text-sm"
                    style={{ color: "#050505" }}
                  >
                    Add a photo
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: "#65676B" }}>
                    Tap to choose from your device
                  </p>
                </div>
              </button>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              aria-label="Upload story image"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 px-4 pb-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              data-ocid="stories.creator.cancel_button"
              className="flex-1 py-2.5 rounded-lg border text-sm font-semibold transition-colors hover:bg-gray-50 disabled:opacity-50"
              style={{ borderColor: "#CED0D4", color: "#050505" }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!imageFile || isSubmitting || !isAuthenticated}
              data-ocid="stories.creator.submit_button"
              className="flex-1 py-2.5 rounded-lg text-sm font-bold text-white transition-colors disabled:opacity-40 flex items-center justify-center gap-2"
              style={{ background: "#1877F2" }}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Posting…
                </>
              ) : (
                "Share Story"
              )}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}
