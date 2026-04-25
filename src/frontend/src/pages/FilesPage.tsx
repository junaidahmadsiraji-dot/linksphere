import { FileCard, type FileCardData } from "@/components/FileCard";
import { UploadFileModal } from "@/components/UploadFileModal";
import { EmptyState } from "@/components/ui/EmptyState";
import { GradientButton } from "@/components/ui/GradientButton";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/use-auth";
import { useFiles } from "@/hooks/use-backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQueryClient } from "@tanstack/react-query";
import { FileText, Upload } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { ExternalBlob, createActor } from "../backend";

// Sample data — shown until the backend is wired
const SAMPLE_FILES: FileCardData[] = [
  {
    id: "1",
    title: "ডিজিটাল মার্কেটিং গাইড ২০২৬",
    description:
      "সোশ্যাল মিডিয়া মার্কেটিং, SEO, এবং কন্টেন্ট স্ট্র্যাটেজি নিয়ে সম্পূর্ণ গাইড। শিক্ষার্থী ও প্রফেশনাল উভয়ের জন্য উপযুক্ত।",
    uploader: "Mehedi Hasan",
    uploadedAt: "2026-04-20",
    size: "3.2 MB",
    type: "PDF",
    downloads: 342,
  },
  {
    id: "2",
    title: "বাংলাদেশের মোবাইল বাজার বিশ্লেষণ",
    description:
      "২০২৬ সালের সেরা মোবাইল ব্র্যান্ড ও দামের তুলনামূলক বিশ্লেষণ। ক্রেতাদের সঠিক সিদ্ধান্ত নিতে সাহায্য করবে।",
    uploader: "Tasnima Akter",
    uploadedAt: "2026-04-18",
    size: "1.8 MB",
    type: "PDF",
    downloads: 198,
  },
  {
    id: "3",
    title: "ফ্রিল্যান্সিং শুরু করার হ্যান্ডবুক",
    description:
      "Upwork, Fiverr ও অন্যান্য প্ল্যাটফর্মে ক্যারিয়ার শুরু করার সম্পূর্ণ নির্দেশিকা। পোর্টফোলিও তৈরি থেকে ক্লায়েন্ট পাওয়া পর্যন্ত।",
    uploader: "Arif Rahman",
    uploadedAt: "2026-04-15",
    size: "5.1 MB",
    type: "PDF",
    downloads: 521,
  },
  {
    id: "4",
    title: "Python প্রোগ্রামিং বেসিক থেকে অ্যাডভান্সড",
    description:
      "বাংলায় Python শেখার সবচেয়ে বিস্তারিত বই। শিক্ষার্থীদের জন্য উপযুক্ত, প্রতিটি অধ্যায়ে প্র্যাকটিক্যাল উদাহরণ রয়েছে।",
    uploader: "Nusrat Jahan",
    uploadedAt: "2026-04-10",
    size: "8.7 MB",
    type: "PDF",
    downloads: 874,
  },
  {
    id: "5",
    title: "গ্রাফিক ডিজাইন মাস্টারক্লাস",
    description:
      "Figma ও Adobe XD ব্যবহার করে প্রফেশনাল ইউআই ডিজাইন শেখার সম্পূর্ণ গাইড। বাস্তব প্রজেক্ট সহ।",
    uploader: "Sabbir Ahmed",
    uploadedAt: "2026-04-05",
    size: "12.4 MB",
    type: "PDF",
    downloads: 265,
  },
];

function FilesSkeletonList() {
  return (
    <div className="space-y-3" data-ocid="files.loading_state">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="bg-card rounded-2xl p-4 flex gap-3 items-start border border-border/60"
        >
          <Skeleton className="w-12 h-12 rounded-xl flex-shrink-0" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-4/5 rounded" />
            <Skeleton className="h-3 w-full rounded" />
            <Skeleton className="h-3 w-2/3 rounded" />
            <div className="flex justify-between items-center pt-1">
              <Skeleton className="h-3 w-24 rounded" />
              <Skeleton className="h-7 w-24 rounded-xl" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function FilesPage() {
  const { data: backendFiles, isLoading } = useFiles();
  const { isAdmin } = useAuth();
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  const [uploadOpen, setUploadOpen] = useState(false);
  const [localFiles, setLocalFiles] = useState<FileCardData[]>(SAMPLE_FILES);

  // Merge backend files when available
  const displayFiles =
    backendFiles && backendFiles.length > 0
      ? backendFiles.map((f) => ({
          id: String(f.id),
          title: f.title,
          description: f.description,
          uploader: f.uploaderName,
          uploadedAt: new Date(Number(f.uploadedAt) / 1_000_000)
            .toISOString()
            .slice(0, 10),
          size: "—",
          type: "PDF",
          downloads: 0,
        }))
      : localFiles;

  const handleDelete = async (id: string) => {
    if (actor && !/^[1-5]$/.test(id)) {
      await actor.deleteFile(BigInt(id));
      queryClient.invalidateQueries({ queryKey: ["files"] });
    }
    setLocalFiles((prev) => prev.filter((f) => f.id !== id));
    toast.success("File deleted.");
  };

  const handleDownload = (file: FileCardData) => {
    if (file.downloadUrl) {
      window.open(file.downloadUrl, "_blank", "noopener");
    } else {
      toast.info(`Downloading "${file.title}"…`);
    }
  };

  const handleUpload = async (data: {
    title: string;
    description: string;
    file: File;
  }) => {
    if (!actor) {
      toast.error("Not connected. Please try again.");
      return;
    }
    try {
      const bytes = new Uint8Array(await data.file.arrayBuffer());
      const blob = ExternalBlob.fromBytes(bytes);
      const record = await actor.uploadFile({
        title: data.title,
        description: data.description,
        blob,
      });
      queryClient.invalidateQueries({ queryKey: ["files"] });
      setLocalFiles((prev) => [
        {
          id: String(record.id),
          title: record.title,
          description: record.description,
          uploader: record.uploaderName,
          uploadedAt: new Date(Number(record.uploadedAt) / 1_000_000)
            .toISOString()
            .slice(0, 10),
          size: `${(bytes.length / 1024 / 1024).toFixed(1)} MB`,
          type: "PDF",
          downloads: 0,
          downloadUrl: record.blob.getDirectURL(),
        },
        ...prev,
      ]);
      setUploadOpen(false);
      toast.success("File uploaded successfully!");
    } catch {
      toast.error("Upload failed. Please try again.");
    }
  };

  return (
    <div
      className="px-3 py-4 space-y-4 max-w-xl mx-auto"
      data-ocid="files.page"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-1">
        <h2 className="font-display font-bold text-xl gradient-text flex items-center gap-2">
          <FileText className="w-5 h-5 text-primary" />
          Files & Books
        </h2>
        {isAdmin && (
          <GradientButton
            size="sm"
            data-ocid="files.upload_button"
            onClick={() => setUploadOpen(true)}
          >
            <Upload className="w-4 h-4" />
            Upload
          </GradientButton>
        )}
      </div>

      {/* Count badge */}
      {!isLoading && displayFiles.length > 0 && (
        <p className="text-xs text-muted-foreground px-1">
          {displayFiles.length} file{displayFiles.length !== 1 ? "s" : ""}{" "}
          available
        </p>
      )}

      {/* Loading skeletons */}
      {isLoading && <FilesSkeletonList />}

      {/* Empty state */}
      {!isLoading && displayFiles.length === 0 && (
        <EmptyState
          icon={FileText}
          title="No files yet"
          description="Admin-uploaded PDFs and documents will appear here."
          action={
            isAdmin ? (
              <GradientButton
                size="md"
                data-ocid="files.empty_state"
                onClick={() => setUploadOpen(true)}
              >
                <Upload className="w-4 h-4" />
                Upload First File
              </GradientButton>
            ) : undefined
          }
        />
      )}

      {/* File list */}
      {!isLoading && displayFiles.length > 0 && (
        <div className="space-y-3" data-ocid="files.list">
          {displayFiles.map((file, i) => (
            <FileCard
              key={file.id}
              file={file}
              index={i}
              isAdmin={isAdmin}
              onDelete={handleDelete}
              onDownload={handleDownload}
            />
          ))}
        </div>
      )}

      {/* Upload modal (admin-only) */}
      {isAdmin && (
        <UploadFileModal
          open={uploadOpen}
          onOpenChange={setUploadOpen}
          onUpload={handleUpload}
        />
      )}
    </div>
  );
}
