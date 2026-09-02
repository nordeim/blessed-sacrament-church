import { Link } from "react-router-dom";
import { PageHero } from "@/components/PageHero";
import { SafeImage } from "@/components/SafeImage";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { images, ministries } from "@/data/content";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { cn } from "@/utils/cn";

export function Ministries() {
  const ids = ministries.map((m) => m.id);
  const active = useScrollSpy(ids);

  return (
    <>
      <PageHero
        eyebrow="Ministries"
        title="Forty ways to keep the tent"
        description="Liturgy, formation, care, family, youth, and five language communities — more than forty ministries under one roof."
        image={images.feast}
        fallback={images.heroFallback}
      />

      <nav
        aria-label="Jump to ministry"
        className="sticky top-[4.5rem] z-20 border-b border-shrine-stone bg-shrine-cream/95 backdrop-blur"
      >
        <Container className="flex gap-2 overflow-x-auto py-3">
          {ministries.map((ministry) => (
            <Link
              key={ministry.id}
              to={`/ministries#${ministry.id}`}
              aria-current={active === ministry.id ? "true" : undefined}
              className={cn(
                "shrink-0 rounded-full border px-4 py-1.5 text-sm transition-colors",
                active === ministry.id
                  ? "border-shrine-gold-500 bg-shrine-gold-100 text-shrine-maroon-800"
                  : "border-shrine-stone text-shrine-charcoal/80 hover:border-shrine-gold-400",
              )}
            >
              {ministry.title}
            </Link>
          ))}
        </Container>
      </nav>

      {ministries.map((ministry, index) => (
        <section
          key={ministry.id}
          id={ministry.id}
          className={cn(
            "scroll-mt-28 py-20 sm:py-24",
            index % 2 === 0 ? "bg-shrine-cream" : "bg-shrine-parchment",
          )}
        >
          <Container className="grid items-center gap-10 lg:grid-cols-2">
            <div className={index % 2 === 1 ? "lg:order-2" : undefined}>
              <SectionHeading eyebrow={`0${index + 1}`} title={ministry.title} />
              <p className="mt-6 max-w-xl leading-relaxed text-shrine-charcoal/85">
                {ministry.summary}
              </p>
              <ul className="mt-6 space-y-2 text-sm text-shrine-charcoal/80">
                {ministry.details.map((detail) => (
                  <li key={detail} className="flex gap-2.5">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-shrine-gold-500" />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
            <div className={cn("group overflow-hidden rounded-sm", index % 2 === 1 && "lg:order-1")}>
              <SafeImage
                src={ministry.image}
                fallback={ministry.imageFallback}
                alt={ministry.imageAlt}
                className="img-zoom aspect-[16/10] w-full object-cover"
              />
            </div>
          </Container>
        </section>
      ))}
    </>
  );
}
