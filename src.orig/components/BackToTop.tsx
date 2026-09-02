import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { cn } from "@/utils/cn";

const THRESHOLD = 480;
const RADIUS = 18;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function BackToTop() {
  const progress = useScrollProgress();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const next = window.scrollY > THRESHOLD;
      setVisible((was) => {
        if (was && !next && document.activeElement instanceof HTMLElement) {
          const button = document.querySelector<HTMLElement>('[data-testid="back-to-top"]');
          if (button && document.activeElement === button) button.blur();
        }
        return next;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTop = () => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      data-testid="back-to-top"
      aria-label="Back to top"
      aria-hidden={visible ? undefined : true}
      tabIndex={visible ? 0 : -1}
      onClick={scrollTop}
      className={cn(
        "fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-shrine-gold-400 bg-shrine-maroon-950 text-shrine-gold-300 shadow-shrine transition-[opacity,transform] duration-300 ease-out",
        visible
          ? "translate-y-0 scale-100 opacity-100"
          : "pointer-events-none translate-y-2 scale-95 opacity-0",
      )}
    >
      <svg
        data-testid="back-to-top-progress"
        className="absolute inset-0 h-full w-full -rotate-90"
        viewBox="0 0 44 44"
        aria-hidden="true"
      >
        <circle
          cx="22"
          cy="22"
          r={RADIUS}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-shrine-cream/15"
        />
        <circle
          data-progress
          cx="22"
          cy="22"
          r={RADIUS}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={CIRCUMFERENCE * (1 - progress)}
          className="text-shrine-gold-400"
        />
      </svg>
      <ArrowUp className="relative h-4 w-4" aria-hidden="true" />
    </button>
  );
}
