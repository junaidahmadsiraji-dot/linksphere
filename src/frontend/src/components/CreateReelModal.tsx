import { GradientButton } from "@/components/ui/GradientButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQueryClient } from "@tanstack/react-query";
import {
  CheckCircle2,
  Film,
  Image as ImageIcon,
  Loader2,
  Upload,
  X,
} from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { ExternalBlob, MediaType, createActor } from "../backend";

interface CreateReelModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type Step = "form" | "uploading" | "done";

const ACCEPT_TYPES = "image/*,video/mp4,video/mov,video/quicktime";
const MAX_SIZE_MB = 100;

export function CreateReelModal({ open, onOpenChange }: CreateReelModalProps) {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isVideo, setIsVideo] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [step, setStep] = useState<Step>("form");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setMediaFile(null);
    setPreviewUrl(null);
    setIsVideo(false);
    setUploadProgress(0);
    setStep("form");
  };

  const handleClose = () => {
    if (step === "uploading") return;
    resetForm();
    onOpenChange(false);
  };

  const validateAndSetFile = (file: File) => {
    const isVid = file.type.startsWith("video/");
    const isImg = file.type.startsWith("image/");
    if (!isVid && !isImg) {
      toast.error("Only images or video files are supported.");
      return;
    }
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      toast.error(`File size must be under ${MAX_SIZE_MB} MB.`);
      return;
    }
    setMediaFile(file);
    setIsVideo(isVid);

    // Generate preview URL
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) validateAndSetFile(file);
    e.target.value = "";
  };

  const handleDrop = (e: React.DragEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) validateAndSetFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error("Please enter a title.");
      return;
    }
    if (!mediaFile) {
      toast.error("Please select a media file.");
      return;
    }
    if (!actor) {
      toast.error("Not connected. Please log in.");
      return;
    }

    setStep("uploading");
    const progressInterval = setInterval(() => {
      setUploadProgress((p) => Math.min(p + 5, 88));
    }, 200);

    try {
      const bytes = await mediaFile.arrayBuffer();
      const blob = ExternalBlob.fromBytes(
        new Uint8Array(bytes),
      ).withUploadProgress((pct) => setUploadProgress(Math.round(pct)));

      const mediaType: MediaType = isVideo ? MediaType.video : MediaType.image;

      await actor.createReel({
        title: title.trim(),
        description: description.trim(),
        mediaUrl: blob,
        mediaType,
      });

      clearInterval(progressInterval);
      setUploadProgress(100);
      setStep("done");
      qc.invalidateQueries({ queryKey: ["reels"] });
      toast.success("Reel posted!");

      setTimeout(() => {
        resetForm();
        onOpenChange(false);
      }, 1600);
    } catch (err) {
      clearInterval(progressInterval);
      setUploadProgress(0);
      setStep("form");
      toast.error("Upload failed. Please try again.");
      console.error(err);
    }
  };

  const isValid = title.trim().length > 0 && !!mediaFile;

  return (
    <Sheet open={open} onOpenChange={handleClose}>
      <SheetContent
        side="bottom"
        data-ocid="reels.create_dialog"
        className="rounded-t-3xl max-h-[94dvh] overflow-y-auto px-5 pt-5 pb-10"
      >
        {/* Drag handle */}
        <div className="w-10 h-1 rounded-full bg-border mx-auto mb-4" />

        <SheetHeader className="text-left mb-4">
          <SheetTitle className="font-display text-xl gradient-text">
            Create Reel
          </SheetTitle>
          <SheetDescription className="text-sm text-muted-foreground">
            Share a moment — image or video up to {MAX_SIZE_MB} MB.
          </SheetDescription>
        </SheetHeader>

        <Separator className="mb-5" />

        {(step === "form" || step === "uploading") && (
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* Title */}
            <div className="space-y-1.5">
              <Label htmlFor="reel-title" className="text-sm font-semibold">
                Title <span className="text-destructive">*</span>
              </Label>
              <Input
                id="reel-title"
                data-ocid="reels.title_input"
                placeholder="e.g. Sunset at Cox's Bazar 🌅"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={100}
                disabled={step === "uploading"}
                className="rounded-xl border-input"
              />
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <Label htmlFor="reel-desc" className="text-sm font-semibold">
                Description
              </Label>
              <Textarea
                id="reel-desc"
                data-ocid="reels.description_textarea"
                placeholder="Describe your reel, add hashtags…"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                maxLength={300}
                rows={3}
                disabled={step === "uploading"}
                className="rounded-xl border-input resize-none"
              />
            </div>

            {/* Media dropzone */}
            <div className="space-y-1.5">
              <Label className="text-sm font-semibold">
                Media <span className="text-destructive">*</span>
              </Label>

              {/* Preview */}
              {previewUrl && mediaFile && (
                <div className="relative rounded-2xl overflow-hidden border border-border/60 bg-muted/20 aspect-[9/16] max-h-64">
                  {isVideo ? (
                    <video
                      src={previewUrl}
                      className="w-full h-full object-cover"
                      muted
                      playsInline
                      autoPlay
                      loop
                    />
                  ) : (
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-2 left-3 flex items-center gap-1.5">
                    {isVideo ? (
                      <Film className="w-3.5 h-3.5 text-white/80" />
                    ) : (
                      <ImageIcon className="w-3.5 h-3.5 text-white/80" />
                    )}
                    <span className="text-white/80 text-xs truncate max-w-[180px]">
                      {mediaFile.name}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setMediaFile(null);
                      if (previewUrl) URL.revokeObjectURL(previewUrl);
                      setPreviewUrl(null);
                      setIsVideo(false);
                    }}
                    className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 flex items-center justify-center text-white hover:bg-black/80 transition-smooth"
                    aria-label="Remove media"
                    data-ocid="reels.remove_media_button"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {/* Drop zone (shown if no file selected) */}
              {!previewUrl && (
                <button
                  type="button"
                  data-ocid="reels.upload_dropzone"
                  aria-label="Select media file"
                  disabled={step === "uploading"}
                  onDrop={handleDrop}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onClick={() => fileInputRef.current?.click()}
                  className={cn(
                    "w-full border-2 border-dashed rounded-2xl p-8 flex flex-col items-center gap-3 cursor-pointer transition-smooth",
                    isDragging
                      ? "border-primary bg-primary/8"
                      : "border-border hover:border-primary/50 hover:bg-muted/20",
                    step === "uploading" && "pointer-events-none opacity-50",
                  )}
                >
                  <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center">
                    <Upload className="w-7 h-7 text-muted-foreground" />
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-sm text-foreground">
                      Tap to select image or video
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      JPG, PNG, MP4, MOV · max {MAX_SIZE_MB} MB
                    </p>
                  </div>
                </button>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept={ACCEPT_TYPES}
                className="sr-only"
                onChange={handleInputChange}
                aria-label="Media file input"
              />
            </div>

            {/* Upload progress */}
            {step === "uploading" && (
              <div className="space-y-2" data-ocid="reels.loading_state">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    Uploading reel…
                  </span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full gradient-primary rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3 pt-1">
              <GradientButton
                type="button"
                variant="outline"
                size="md"
                data-ocid="reels.cancel_button"
                className="flex-1"
                onClick={handleClose}
                disabled={step === "uploading"}
              >
                Cancel
              </GradientButton>
              <GradientButton
                type="submit"
                size="md"
                data-ocid="reels.submit_button"
                className="flex-1"
                loading={step === "uploading"}
                disabled={!isValid || step === "uploading"}
              >
                <Upload className="w-4 h-4" />
                Post Reel
              </GradientButton>
            </div>
          </form>
        )}

        {/* Done state */}
        {step === "done" && (
          <div
            data-ocid="reels.success_state"
            className="flex flex-col items-center gap-4 py-10 text-center"
          >
            <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center shadow-md">
              <CheckCircle2 className="w-8 h-8 text-primary-foreground" />
            </div>
            <div className="space-y-1">
              <h3 className="font-display font-bold text-lg text-foreground">
                Reel published!
              </h3>
              <p className="text-sm text-muted-foreground">
                Your reel is now live on the feed.
              </p>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
