import { cn } from "@/utils/cn";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  light = false,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn(align === "center" && "text-center", className)}>
      {eyebrow ? (
        <p
          className={cn(
            "text-xs font-semibold uppercase tracking-[0.28em]",
            light ? "text-shrine-gold-300" : "text-shrine-maroon-500",
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={cn(
          "mt-3 font-display text-3xl text-balance sm:text-4xl",
          light ? "text-shrine-cream" : "text-shrine-maroon-700",
        )}
      >
        {title}
      </h2>
      <div className={cn("gold-rule mt-5 w-24", align === "center" && "mx-auto")} />
      {description ? (
        <p
          className={cn(
            "mt-5 max-w-2xl text-base leading-relaxed",
            light ? "text-shrine-cream/75" : "text-shrine-charcoal/80",
            align === "center" && "mx-auto",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
