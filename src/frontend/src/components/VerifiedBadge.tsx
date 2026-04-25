import { cn } from "@/lib/utils";

interface VerifiedBadgeProps {
  className?: string;
  size?: "xs" | "sm" | "md";
}

const sizeMap = {
  xs: 12,
  sm: 16,
  md: 20,
};

/**
 * Facebook-style blue verified checkmark badge shown next to usernames.
 */
export function VerifiedBadge({ className, size = "sm" }: VerifiedBadgeProps) {
  const px = sizeMap[size];
  const id = `verified-title-${size}`;

  return (
    <svg
      role="img"
      aria-labelledby={id}
      width={px}
      height={px}
      viewBox="0 0 24 24"
      fill="none"
      className={cn("inline-block flex-shrink-0", className)}
    >
      <title id={id}>Verified account</title>
      <circle cx="12" cy="12" r="12" fill="#1877F2" />
      <path
        d="M7 12.5L10.5 16L17 9"
        stroke="white"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
