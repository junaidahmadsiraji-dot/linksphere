interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "w-4 h-4 border-2",
  md: "w-8 h-8 border-2",
  lg: "w-12 h-12 border-[3px]",
};

export function LoadingSpinner({
  size = "md",
  className = "",
}: LoadingSpinnerProps) {
  return (
    <div
      className={`${sizeClasses[size]} rounded-full border-muted border-t-primary animate-spin ${className}`}
      role="status"
      aria-label="Loading"
    />
  );
}

export function LoadingScreen() {
  return (
    <div className="flex flex-1 items-center justify-center min-h-[200px]">
      <div className="flex flex-col items-center gap-3">
        <LoadingSpinner size="lg" />
        <p className="text-sm text-muted-foreground animate-fade-in">
          Loading...
        </p>
      </div>
    </div>
  );
}
