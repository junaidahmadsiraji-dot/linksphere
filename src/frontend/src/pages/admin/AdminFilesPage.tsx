import { ExternalBlob, createActor } from "@/backend";
import type { FileRecord } from "@/backend.d";
import { useAdminAuth } from "@/hooks/use-admin-auth";
import { useActor } from "@caffeineai/core-infrastructure";
import {
  AlertTriangle,
  Download,
  FileText,
  FolderOpen,
  Plus,
  Search,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const CARD = "oklch(0.15 0.01 282)";
const BD = "oklch(0.2 0.008 282)";
const TEXT = "oklch(0.93 0.01 282)";
const MID = "oklch(0.74 0.01 282)";
const DIM = "oklch(0.54 0.01 282)";
const TEAL = "oklch(0.72 0.26 180)";
const PURPLE = "oklch(0.62 0.22 260)";
const RED = "oklch(0.65 0.19 22)";
const ORANGE = "oklch(0.72 0.22 28)";

interface UploadForm {
  title: string;
  description: string;
  file: File | null;
}

interface DeleteConfirm {
  id: bigint;
  title: string;
}

function formatDate(ts: bigint): string {
  return new Date(Number(ts) / 1_000_000).toLocaleDateString("en-BD", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function AdminFilesPage() {
  const { adminToken } = useAdminAuth();
  const { actor } = useActor(createActor);
  const [files, setFiles] = useState<FileRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showUpload, setShowUpload] = useState(false);
  const [form, setForm] = useState<UploadForm>({
    title: "",
    description: "",
    file: null,
  });
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [deleteConfirm, setDeleteConfirm] = useState<DeleteConfirm | null>(
    null,
  );
  const [deleting, setDeleting] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const loadFiles = useCallback(async () => {
    if (!actor) return;
    try {
      const result = await actor.listFiles();
      setFiles(result as FileRecord[]);
    } catch {
      toast.error("Failed to load files");
    } finally {
      setIsLoading(false);
    }
  }, [actor]);

  useEffect(() => {
    loadFiles();
  }, [loadFiles]);

  const filtered = files.filter(
    (f) =>
      f.title.toLowerCase().includes(search.toLowerCase()) ||
      f.description.toLowerCase().includes(search.toLowerCase()),
  );

  async function handleUpload() {
    if (!actor || !adminToken) return;
    if (!form.title.trim() || !form.file) {
      toast.error("Title and file are required");
      return;
    }
    setUploading(true);
    setUploadProgress(0);
    try {
      const bytes = new Uint8Array(await form.file.arrayBuffer());
      const blob = ExternalBlob.fromBytes(bytes).withUploadProgress((pct) => {
        setUploadProgress(pct);
      });
      await actor.uploadFile({
        title: form.title.trim(),
        description: form.description.trim(),
        blob,
      });
      toast.success("File uploaded successfully");
      setForm({ title: "", description: "", file: null });
      setShowUpload(false);
      await loadFiles();
    } catch {
      toast.error("Upload failed. Please try again.");
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  }

  async function handleDelete() {
    if (!actor || !deleteConfirm) return;
    setDeleting(true);
    try {
      await actor.deleteFile(deleteConfirm.id);
      toast.success("File deleted");
      await loadFiles();
    } catch {
      toast.error("Delete failed");
    } finally {
      setDeleting(false);
      setDeleteConfirm(null);
    }
  }

  const inputStyle = {
    background: "oklch(0.13 0.008 282)",
    border: `1px solid ${BD}`,
    color: TEXT,
    borderRadius: "0.625rem",
    padding: "0.625rem 0.75rem",
    fontSize: "0.875rem",
    width: "100%",
    outline: "none",
  };

  return (
    <div style={{ minHeight: "100%" }}>
      <div className="p-6 space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h1
              className="text-xl font-bold"
              style={{ color: TEXT, fontFamily: "var(--font-display)" }}
            >
              Files Library
            </h1>
            <p className="text-sm mt-0.5" style={{ color: DIM }}>
              {isLoading ? "Loading..." : `${files.length} files uploaded`}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowUpload(true)}
            className="flex items-center gap-2 text-sm px-4 py-2 rounded-xl font-semibold transition-smooth"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.62 0.22 260) 0%, oklch(0.72 0.26 180) 100%)",
              color: "oklch(0.11 0.008 282)",
            }}
            data-ocid="admin.files.upload_button"
          >
            <Upload className="w-4 h-4" /> Upload File
          </button>
        </div>

        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
            style={{ color: DIM }}
          />
          <input
            type="text"
            placeholder="Search files by name or description..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm outline-none"
            style={{ background: CARD, border: `1px solid ${BD}`, color: TEXT }}
            data-ocid="admin.files.search_input"
          />
        </div>

        <div className="space-y-2.5" data-ocid="admin.files.list">
          {isLoading ? (
            (["sk1", "sk2", "sk3", "sk4"] as const).map((k) => (
              <div
                key={k}
                className="rounded-xl h-20 animate-pulse"
                style={{ background: CARD, border: `1px solid ${BD}` }}
              />
            ))
          ) : filtered.length === 0 ? (
            <div
              className="py-14 text-center rounded-xl"
              data-ocid="admin.files.empty_state"
              style={{ background: CARD, border: `1px solid ${BD}` }}
            >
              <div
                className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center"
                style={{ background: `${ORANGE}20` }}
              >
                <FolderOpen className="w-7 h-7" style={{ color: ORANGE }} />
              </div>
              <p className="font-semibold text-sm" style={{ color: TEXT }}>
                No files yet
              </p>
              <p className="text-xs mt-1" style={{ color: DIM }}>
                Upload PDF books, documents, or guides
              </p>
              <button
                type="button"
                onClick={() => setShowUpload(true)}
                className="mt-4 flex items-center gap-1.5 text-sm px-4 py-2 rounded-xl mx-auto font-medium"
                style={{ background: `${TEAL}18`, color: TEAL }}
              >
                <Plus className="w-4 h-4" /> Upload First File
              </button>
            </div>
          ) : (
            filtered.map((file, idx) => (
              <div
                key={file.id.toString()}
                className="rounded-xl p-4 flex items-center gap-4"
                data-ocid={`admin.files.item.${idx + 1}`}
                style={{ background: CARD, border: `1px solid ${BD}` }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${ORANGE}20`, color: ORANGE }}
                >
                  <FileText className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div
                    className="font-medium text-sm truncate"
                    style={{ color: TEXT }}
                  >
                    {file.title}
                  </div>
                  <div
                    className="text-xs truncate mt-0.5"
                    style={{ color: DIM }}
                  >
                    {file.description}
                  </div>
                  <div className="flex items-center gap-3 mt-1 flex-wrap">
                    <span className="text-xs" style={{ color: TEAL }}>
                      by {file.uploaderName}
                    </span>
                    <span className="text-xs" style={{ color: DIM }}>
                      · {formatDate(file.uploadedAt)}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <a
                    href={file.blob.getDirectURL()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg transition-smooth"
                    style={{ background: `${PURPLE}18`, color: PURPLE }}
                    aria-label="Download file"
                    data-ocid={`admin.files.download_button.${idx + 1}`}
                  >
                    <Download className="w-4 h-4" />
                  </a>
                  <button
                    type="button"
                    onClick={() =>
                      setDeleteConfirm({ id: file.id, title: file.title })
                    }
                    className="p-2 rounded-lg transition-smooth"
                    style={{
                      background: `${RED}18`,
                      color: "oklch(0.75 0.15 22)",
                    }}
                    aria-label="Delete file"
                    data-ocid={`admin.files.delete_button.${idx + 1}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Upload Modal */}
      {showUpload && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.75)" }}
          data-ocid="admin.files.dialog"
        >
          <div
            className="w-full max-w-md rounded-2xl overflow-hidden"
            style={{ background: CARD, border: `1px solid ${BD}` }}
          >
            <div
              className="px-6 py-4 flex items-center justify-between border-b"
              style={{ borderColor: BD }}
            >
              <h3
                className="font-bold"
                style={{ color: TEXT, fontFamily: "var(--font-display)" }}
              >
                Upload File
              </h3>
              <button
                type="button"
                onClick={() => setShowUpload(false)}
                style={{ color: DIM }}
                data-ocid="admin.files.close_button"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              {/* File drop zone */}
              <div>
                <span
                  className="text-xs font-medium block mb-1.5"
                  style={{ color: MID }}
                >
                  File (PDF, DOC, etc.) *
                </span>
                <button
                  type="button"
                  className="rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer transition-smooth w-full"
                  style={{
                    background: form.file
                      ? `${TEAL}10`
                      : "oklch(0.13 0.008 282)",
                    border: form.file
                      ? `2px solid ${TEAL}`
                      : `2px dashed ${BD}`,
                    padding: "1.5rem",
                  }}
                  onClick={() => fileRef.current?.click()}
                  data-ocid="admin.files.dropzone"
                  aria-label="Click to select file"
                >
                  {form.file ? (
                    <>
                      <FileText className="w-8 h-8" style={{ color: TEAL }} />
                      <span
                        className="text-sm font-medium"
                        style={{ color: TEAL }}
                      >
                        {form.file.name}
                      </span>
                      <span className="text-xs" style={{ color: DIM }}>
                        {formatBytes(form.file.size)}
                      </span>
                    </>
                  ) : (
                    <>
                      <Upload
                        className="w-8 h-8 opacity-30"
                        style={{ color: DIM }}
                      />
                      <span className="text-sm" style={{ color: DIM }}>
                        Click to select file
                      </span>
                      <span className="text-xs" style={{ color: DIM }}>
                        PDF, DOC, PPT, ZIP supported
                      </span>
                    </>
                  )}
                </button>
                <input
                  ref={fileRef}
                  type="file"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) setForm((prev) => ({ ...prev, file: f }));
                  }}
                />
              </div>
              <div>
                <label
                  className="text-xs font-medium block mb-1.5"
                  style={{ color: MID }}
                  htmlFor="file-title"
                >
                  Title *
                </label>
                <input
                  id="file-title"
                  type="text"
                  value={form.title}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, title: e.target.value }))
                  }
                  placeholder="e.g. HSC Chemistry Guide 2026"
                  style={inputStyle}
                  data-ocid="admin.files.title_input"
                />
              </div>
              <div>
                <label
                  className="text-xs font-medium block mb-1.5"
                  style={{ color: MID }}
                  htmlFor="file-desc"
                >
                  Description
                </label>
                <textarea
                  id="file-desc"
                  value={form.description}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, description: e.target.value }))
                  }
                  placeholder="Brief description of the file..."
                  rows={2}
                  style={{ ...inputStyle, resize: "vertical" }}
                  data-ocid="admin.files.description_textarea"
                />
              </div>
              {uploading && uploadProgress > 0 && (
                <div>
                  <div
                    className="flex justify-between text-xs mb-1"
                    style={{ color: DIM }}
                  >
                    <span>Uploading...</span>
                    <span>{Math.round(uploadProgress)}%</span>
                  </div>
                  <div
                    className="h-1.5 rounded-full overflow-hidden"
                    style={{ background: "oklch(0.22 0.008 282)" }}
                  >
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${uploadProgress}%`,
                        background: `linear-gradient(90deg, ${PURPLE} 0%, ${TEAL} 100%)`,
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="px-6 pb-5 flex items-center gap-3">
              <button
                type="button"
                onClick={() => setShowUpload(false)}
                className="flex-1 py-2.5 rounded-xl text-sm font-medium"
                style={{ background: "oklch(0.22 0.008 282)", color: MID }}
                data-ocid="admin.files.cancel_button"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleUpload}
                disabled={uploading}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-smooth"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.62 0.22 260) 0%, oklch(0.72 0.26 180) 100%)",
                  color: "oklch(0.11 0.008 282)",
                  opacity: uploading ? 0.7 : 1,
                }}
                data-ocid="admin.files.submit_button"
              >
                {uploading ? "Uploading…" : "Upload File"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {deleteConfirm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.75)" }}
        >
          <div
            className="w-full max-w-sm rounded-2xl p-6"
            style={{ background: CARD, border: `1px solid ${BD}` }}
          >
            <div
              className="p-2 rounded-xl inline-block mb-3"
              style={{ background: `${RED}20`, color: "oklch(0.75 0.15 22)" }}
            >
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h3
              className="font-bold text-base mb-1"
              style={{ color: TEXT, fontFamily: "var(--font-display)" }}
            >
              Delete File
            </h3>
            <p className="text-sm mb-5" style={{ color: MID }}>
              Delete "{deleteConfirm.title}"? Users who downloaded it keep their
              copies. This cannot be undone.
            </p>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 py-2 rounded-xl text-sm font-medium"
                style={{ background: "oklch(0.22 0.008 282)", color: MID }}
                data-ocid="admin.files.delete_cancel_button"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 py-2 rounded-xl text-sm font-semibold transition-smooth"
                style={{
                  background: RED,
                  color: "oklch(0.11 0.008 282)",
                  opacity: deleting ? 0.7 : 1,
                }}
                data-ocid="admin.files.delete_confirm_button"
              >
                {deleting ? "Deleting…" : "Delete File"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
