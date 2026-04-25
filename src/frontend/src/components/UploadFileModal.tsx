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
import { CheckCircle2, FileText, Upload, X } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { toast } from "sonner";

interface UploadFileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpload?: (data: {
    title: string;
    description: string;
    file: File;
  }) => Promise<void>;
}

type UploadStep = "form" | "uploading" | "done";

export function UploadFileModal({
  open,
  onOpenChange,
  onUpload,
}: UploadFileModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [step, setStep] = useState<UploadStep>("form");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setSelectedFile(null);
    setUploadProgress(0);
    setStep("form");
  };

  const handleClose = () => {
    if (step === "uploading") return; // prevent close while uploading
    resetForm();
    onOpenChange(false);
  };

  const handleFileSelect = (file: File) => {
    if (!file.type.includes("pdf") && !file.name.endsWith(".pdf")) {
      toast.error("Only PDF files are supported.");
      return;
    }
    if (file.size > 50 * 1024 * 1024) {
      toast.error("File size must be under 50 MB.");
      return;
    }
    setSelectedFile(file);
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (!droppedFile) return;
    if (
      !droppedFile.type.includes("pdf") &&
      !droppedFile.name.endsWith(".pdf")
    ) {
      toast.error("Only PDF files are supported.");
      return;
    }
    if (droppedFile.size > 50 * 1024 * 1024) {
      toast.error("File size must be under 50 MB.");
      return;
    }
    setSelectedFile(droppedFile);
  }, []);

  const handleDragOver = (e: React.DragEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const formatBytes = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error("Please enter a title.");
      return;
    }
    if (!selectedFile) {
      toast.error("Please select a PDF file.");
      return;
    }

    setStep("uploading");

    // Simulate progress ticks before actual upload
    const interval = setInterval(() => {
      setUploadProgress((p) => Math.min(p + 8, 85));
    }, 200);

    try {
      if (onUpload) {
        await onUpload({
          title: title.trim(),
          description: description.trim(),
          file: selectedFile,
        });
      } else {
        // Simulated delay for demo
        await new Promise((r) => setTimeout(r, 2000));
      }
      clearInterval(interval);
      setUploadProgress(100);
      setStep("done");
      toast.success("File uploaded successfully!");
      setTimeout(() => {
        resetForm();
        onOpenChange(false);
      }, 1500);
    } catch {
      clearInterval(interval);
      setUploadProgress(0);
      setStep("form");
      toast.error("Upload failed. Please try again.");
    }
  };

  const isValid = title.trim().length > 0 && !!selectedFile;

  return (
    <Sheet open={open} onOpenChange={handleClose}>
      <SheetContent
        side="bottom"
        data-ocid="files.dialog"
        className="rounded-t-3xl max-h-[92dvh] overflow-y-auto px-5 pt-5 pb-8"
      >
        {/* Drag handle */}
        <div className="w-10 h-1 rounded-full bg-border mx-auto mb-4" />

        <SheetHeader className="text-left mb-4">
          <SheetTitle className="font-display text-xl gradient-text">
            Upload PDF
          </SheetTitle>
          <SheetDescription className="text-sm text-muted-foreground">
            Share books, guides, or documents with your community.
          </SheetDescription>
        </SheetHeader>

        <Separator className="mb-5" />

        {/* Step: Form */}
        {(step === "form" || step === "uploading") && (
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* Title */}
            <div className="space-y-1.5">
              <Label htmlFor="file-title" className="text-sm font-semibold">
                Title <span className="text-destructive">*</span>
              </Label>
              <Input
                id="file-title"
                data-ocid="files.title_input"
                placeholder="e.g. Digital Marketing Guide 2026"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={120}
                disabled={step === "uploading"}
                className="rounded-xl border-input"
              />
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <Label
                htmlFor="file-description"
                className="text-sm font-semibold"
              >
                Description
              </Label>
              <Textarea
                id="file-description"
                data-ocid="files.description_textarea"
                placeholder="Short description of the file content…"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                maxLength={400}
                rows={3}
                disabled={step === "uploading"}
                className="rounded-xl border-input resize-none"
              />
            </div>

            {/* Drop zone */}
            <div className="space-y-1.5">
              <Label className="text-sm font-semibold">
                PDF File <span className="text-destructive">*</span>
              </Label>
              <button
                type="button"
                data-ocid="files.dropzone"
                aria-label="Select PDF file"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={() => fileInputRef.current?.click()}
                className={cn(
                  "w-full border-2 border-dashed rounded-2xl p-6 flex flex-col items-center gap-3 cursor-pointer transition-smooth",
                  isDragging
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50 hover:bg-muted/30",
                  step === "uploading" && "pointer-events-none opacity-60",
                )}
              >
                {selectedFile ? (
                  <>
                    <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shadow-sm">
                      <FileText className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-semibold text-foreground line-clamp-1">
                        {selectedFile.name}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {formatBytes(selectedFile.size)}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedFile(null);
                      }}
                      className="flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive transition-colors"
                      aria-label="Remove selected file"
                    >
                      <X className="w-3.5 h-3.5" />
                      Remove
                    </button>
                  </>
                ) : (
                  <>
                    <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
                      <Upload className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-semibold text-foreground">
                        Tap to select PDF
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        or drag & drop here · max 50 MB
                      </p>
                    </div>
                  </>
                )}
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="application/pdf,.pdf"
                className="sr-only"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) handleFileSelect(f);
                  e.target.value = "";
                }}
              />
            </div>

            {/* Progress bar */}
            {step === "uploading" && (
              <div className="space-y-2" data-ocid="files.loading_state">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Uploading…</span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full gradient-primary rounded-full transition-all duration-200"
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
                data-ocid="files.cancel_button"
                className="flex-1"
                onClick={handleClose}
                disabled={step === "uploading"}
              >
                Cancel
              </GradientButton>
              <GradientButton
                type="submit"
                size="md"
                data-ocid="files.submit_button"
                className="flex-1"
                loading={step === "uploading"}
                disabled={!isValid || step === "uploading"}
              >
                <Upload className="w-4 h-4" />
                Upload
              </GradientButton>
            </div>
          </form>
        )}

        {/* Step: Done */}
        {step === "done" && (
          <div
            data-ocid="files.success_state"
            className="flex flex-col items-center gap-4 py-10 text-center"
          >
            <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center shadow-md">
              <CheckCircle2 className="w-8 h-8 text-primary-foreground" />
            </div>
            <div className="space-y-1">
              <h3 className="font-display font-bold text-lg text-foreground">
                Upload complete!
              </h3>
              <p className="text-sm text-muted-foreground">
                Your file is now available for download.
              </p>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
