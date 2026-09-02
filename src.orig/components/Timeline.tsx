import { useEffect, useRef, useState } from "react";
import type { TimelineEntry } from "@/data/content";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/utils/cn";

interface TimelineProps {
  entries: TimelineEntry[];
  className?: string;
}

/**
 * Round-15 scroll choreography: the rail draws downward once the list
 * enters the viewport and each entry rises in with a staggered delay.
 * Transform/opacity only — the global prefers-reduced-motion neutralizer
 * flattens every transition, and the observer short-circuits to the drawn
 * state when reduced motion is requested or IO is unavailable.
 */
export function Timeline({ entries, className }: TimelineProps) {
  const listRef = useRef<HTMLOListElement>(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const node = listRef.current;
    if (!node) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || typeof IntersectionObserver === "undefined") {
      setDrawn(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setDrawn(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -20% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <ol ref={listRef} className={cn("relative space-y-10 pl-8", className)}>
      <span
        data-testid="timeline-rail"
        aria-hidden="true"
        className={cn(
          "absolute bottom-2 left-[7px] top-2 w-px origin-top bg-gradient-to-b from-shrine-maroon-700 via-shrine-gold-400/70 to-shrine-gold-500 transition-transform duration-[1100ms] ease-out",
          drawn ? "scale-y-100" : "scale-y-0",
        )}
      />
      {entries.map((entry, index) => (
        <li key={entry.year} className="relative">
          <span
            className="dot-pulse absolute -left-8 top-1.5 h-3.5 w-3.5 rounded-full border-2 border-shrine-gold-400 bg-shrine-cream"
            aria-hidden="true"
          />
          <Reveal delay={index * 70}>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-shrine-gold-600">
              {entry.year}
            </p>
            <h3 className="mt-1 font-display text-2xl">{entry.title}</h3>
            <p className="mt-2 leading-relaxed text-shrine-charcoal/85">{entry.description}</p>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
