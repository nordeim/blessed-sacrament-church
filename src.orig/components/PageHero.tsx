import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { SafeImage } from "@/components/SafeImage";
import { cn } from "@/utils/cn";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description?: string;
  image: string;
  fallback?: string;
  children?: ReactNode;
  compact?: boolean;
  variant?: "dusk" | "light";
}

export function PageHero({
  eyebrow,
  title,
  description,
  image,
  fallback,
  children,
  compact = false,
  variant = "dusk",
}: PageHeroProps) {
  const isLight = variant === "light";

  return (
    <section
      className={cn(
        "relative isolate overflow-hidden bg-shrine-maroon-950",
        compact ? "min-h-[42vh]" : "min-h-[56vh]",
      )}
    >
      <div className="absolute inset-0">
        <SafeImage
          src={image}
          fallback={fallback ?? image}
          alt=""
          className={cn(
            "hero-ken-burns h-full w-full object-cover",
            isLight ? "opacity-70" : "opacity-80",
          )}
          loading="eager"
          fetchPriority="high"
        />
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-b",
            isLight
              ? "from-shrine-maroon-950/40 via-shrine-maroon-950/50 to-shrine-maroon-950"
              : "from-shrine-maroon-950/35 via-shrine-maroon-950/50 to-shrine-maroon-950",
          )}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-shrine-maroon-950/55 via-shrine-maroon-950/15 to-transparent" />
        <div className="bg-grain pointer-events-none absolute inset-0" />
      </div>
      <Container className={cn("relative flex flex-col justify-end pb-14 pt-32", compact && "pb-10 pt-28")}>
        <p className="rise-in text-xs font-semibold uppercase tracking-[0.32em] text-shrine-gold-300">
          {eyebrow}
        </p>
        <h1 className="rise-in rise-in-d1 mt-3 max-w-3xl font-display text-4xl text-shrine-cream text-balance sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {description ? (
          <p className="rise-in rise-in-d2 mt-5 max-w-2xl text-lg leading-relaxed text-shrine-cream/80">
            {description}
          </p>
        ) : null}
        {children ? <div className="rise-in rise-in-d3 mt-8">{children}</div> : null}
      </Container>
    </section>
  );
}
