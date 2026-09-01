import { cn } from "@/utils/cn";
import type { EventItem } from "@/data/content";

export function categoryTone(category: EventItem["category"]): string {
  switch (category) {
    case "Parish":
      return "text-bsc-sapphire-700 border-bsc-sapphire-300 bg-bsc-sapphire-50";
    case "Devotion":
      return "text-bsc-gold-700 border-bsc-gold-300 bg-bsc-gold-100";
    case "Formation":
      return "text-bsc-pine-600 border-bsc-pine-300 bg-bsc-pine-50";
    case "Archdiocese":
      return "text-bsc-terracotta-600 border-bsc-terracotta-300 bg-bsc-terracotta-50";
    default:
      return "text-bsc-charcoal border-bsc-stone bg-bsc-cream";
  }
}

interface EventMetaProps {
  event: EventItem;
}

export function EventMeta({ event }: EventMetaProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <span
        className={cn(
          "inline-flex rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider",
          categoryTone(event.category)
        )}
      >
        {event.category}
      </span>
      <span className="font-display text-sm font-medium text-bsc-charcoal/85">
        {event.date}
      </span>
    </div>
  );
}
