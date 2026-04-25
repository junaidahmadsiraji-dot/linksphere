import { AlertCircle } from "lucide-react";

interface ErrorMessageProps {
  title?: string;
  message?: string;
  className?: string;
}

export function ErrorMessage({
  title = "Something went wrong",
  message = "Please try again later.",
  className = "",
}: ErrorMessageProps) {
  return (
    <div
      data-ocid="error_state"
      className={`flex items-start gap-3 p-4 rounded-xl bg-destructive/10 border border-destructive/20 ${className}`}
    >
      <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
      <div className="min-w-0">
        <p className="text-sm font-semibold text-destructive">{title}</p>
        <p className="text-xs text-destructive/80 mt-0.5">{message}</p>
      </div>
    </div>
  );
}
