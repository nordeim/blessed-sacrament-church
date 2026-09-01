export function Emblem({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle cx="60" cy="60" r="56" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
      <circle cx="60" cy="60" r="48" stroke="currentColor" strokeWidth="1" opacity="0.2" />
      <path
        d="M60 20 L60 100 M40 35 Q60 20 80 35 M40 85 Q60 100 80 85"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.5"
      />
      <circle cx="60" cy="60" r="6" fill="currentColor" opacity="0.4" />
    </svg>
  );
}
