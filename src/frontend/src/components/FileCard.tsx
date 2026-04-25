import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  Calendar,
  Download,
  FileText,
  HardDrive,
  Trash2,
  User,
} from "lucide-react";

export interface FileCardData {
  id: string;
  title: string;
  description: string;
  uploader: string;
  uploadedAt: string;
  size: string;
  type: string;
  downloads: number;
  downloadUrl?: string;
}

interface FileCardProps {
  file: FileCardData;
  isAdmin?: boolean;
  index: number;
  onDelete?: (id: string) => void;
  onDownload?: (file: FileCardData) => void;
}

export function FileCard({
  file,
  isAdmin,
  index,
  onDelete,
  onDownload,
}: FileCardProps) {
  const ocid = index + 1;

  return (
    <Card
      data-ocid={`files.item.${ocid}`}
      className={cn(
        "p-4 flex gap-3 items-start transition-smooth",
        "hover:shadow-elevated border-border/60",
      )}
    >
      {/* PDF icon pill */}
      <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0 shadow-sm">
        <FileText className="w-6 h-6 text-primary-foreground" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 space-y-1.5">
        {/* Title row */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display font-semibold text-sm text-foreground line-clamp-2 leading-snug min-w-0">
            {file.title}
          </h3>
          <Badge
            variant="outline"
            className="text-[10px] shrink-0 border-primary/30 text-primary font-semibold px-1.5 py-0.5"
          >
            {file.type}
          </Badge>
        </div>

        {/* Description */}
        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
          {file.description}
        </p>

        {/* Meta row */}
        <div className="flex items-center flex-wrap gap-x-3 gap-y-1 pt-0.5">
          <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
            <User className="w-3 h-3 shrink-0" />
            <span className="truncate max-w-[100px]">{file.uploader}</span>
          </span>
          <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
            <Calendar className="w-3 h-3 shrink-0" />
            {file.uploadedAt}
          </span>
          <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
            <HardDrive className="w-3 h-3 shrink-0" />
            {file.size}
          </span>
        </div>

        {/* Actions row */}
        <div className="flex items-center justify-between pt-1">
          <span className="text-[11px] text-muted-foreground">
            {file.downloads.toLocaleString()} downloads
          </span>
          <div className="flex items-center gap-2">
            {isAdmin && onDelete && (
              <Button
                variant="ghost"
                size="icon"
                data-ocid={`files.delete_button.${ocid}`}
                className="h-7 w-7 text-destructive hover:bg-destructive/10 hover:text-destructive"
                aria-label="Delete file"
                onClick={() => onDelete(file.id)}
              >
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
            )}
            <button
              type="button"
              data-ocid={`files.download_button.${ocid}`}
              onClick={() => onDownload?.(file)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl gradient-primary text-primary-foreground text-xs font-semibold transition-smooth hover:brightness-110 shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              Download
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
}
