import { cn } from "@/utils/cn";

interface EmblemProps {
  className?: string;
}

/** Tent-of-meeting monogram: folded roof over a host. */
export function Emblem({ className }: EmblemProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      aria-hidden="true"
      className={cn("h-10 w-10 shrink-0", className)}
    >
      <path
        d="M8 34 L24 10 L40 34"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <path
        d="M14 34 L24 18 L34 34"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        opacity="0.7"
      />
      <circle cx="24" cy="36" r="5.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="24" cy="36" r="1.6" fill="currentColor" />
    </svg>
  );
}
