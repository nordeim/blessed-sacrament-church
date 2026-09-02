import { cn } from "@/utils/cn";
import type { EventItem } from "@/data/content";

const categoryTone: Record<EventItem["category"], string> = {
  Parish: "border-shrine-maroon-500 text-shrine-maroon-700",
  Devotion: "border-shrine-gold-700 text-shrine-gold-700",
  Formation: "border-shrine-pine-600 text-shrine-pine-700",
  Archdiocese: "border-shrine-terracotta-600 text-shrine-terracotta-600",
};

interface EventMetaProps {
  category: EventItem["category"];
  date: string;
}

export function EventMeta({ category, date }: EventMetaProps) {
  return (
    <div className="flex flex-wrap items-baseline gap-3">
      <span
        className={cn(
          "inline-flex rounded-full border px-3 py-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.16em]",
          categoryTone[category],
        )}
      >
        {category}
      </span>
      <time className="font-display text-sm text-shrine-charcoal/85">{date}</time>
    </div>
  );
}
