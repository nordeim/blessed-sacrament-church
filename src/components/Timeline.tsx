import { Reveal } from "@/components/ui/Reveal";
import type { TimelineEntry } from "@/data/content";

interface TimelineProps {
  entries: TimelineEntry[];
}

export function Timeline({ entries }: TimelineProps) {
  return (
    <div className="relative">
      <div
        data-testid="timeline-rail"
        className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-bsc-sapphire-400 via-bsc-sapphire-500 to-bsc-sapphire-700 sm:left-1/2"
      />
      <div className="space-y-12">
        {entries.map((entry, i) => {
          const isLeft = i % 2 === 0;
          return (
            <Reveal key={entry.year} delay={i * 80}>
              <div
                className={`relative flex items-start gap-6 sm:gap-0 ${
                  isLeft ? "sm:flex-row" : "sm:flex-row-reverse"
                }`}
              >
                <div
                  className={`hidden sm:block sm:w-1/2 ${
                    isLeft ? "sm:pr-12 sm:text-right" : "sm:pl-12 sm:text-left"
                  }`}
                >
                  <span className="font-display text-4xl font-bold text-bsc-sapphire-700">
                    {entry.year}
                  </span>
                </div>
                <div className="absolute left-4 top-1 z-10 -translate-x-1/2 sm:left-1/2">
                  <div className="dot-pulse h-4 w-4 rounded-full bg-bsc-gold-400" />
                </div>
                <div
                  className={`pl-10 sm:w-1/2 ${
                    isLeft ? "sm:pl-12 sm:text-left" : "sm:pr-12 sm:text-right"
                  }`}
                >
                  <span className="font-display text-2xl font-bold text-bsc-sapphire-700 sm:hidden">
                    {entry.year}
                  </span>
                  <h3 className="font-display text-xl font-semibold text-bsc-sapphire-900">
                    {entry.title}
                  </h3>
                  <p className="mt-2 text-bsc-charcoal leading-relaxed">
                    {entry.description}
                  </p>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
