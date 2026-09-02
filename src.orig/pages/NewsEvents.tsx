import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { EventMeta } from "@/components/EventMeta";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { images, upcomingEvents } from "@/data/content";
import { site } from "@/data/site";

export function NewsEvents() {
  return (
    <>
      <PageHero
        compact
        eyebrow="News & events"
        title="The life of the tent"
        description="Feasts, formation, language Masses, and the monthly rhythm of Sacred Heart."
        image={images.feast}
        fallback={images.heroFallback}
      >
        <Button href={site.facebook} variant="outline-light">
          Parish Facebook
        </Button>
      </PageHero>

      <section className="bg-shrine-cream py-20 sm:py-28">
        <Container className="grid gap-6 lg:grid-cols-2">
          {upcomingEvents.map((event, index) => (
            <Reveal key={event.title} delay={index * 60} className="h-full">
              <article className="card-tint flex h-full flex-col rounded-sm border border-shrine-stone bg-shrine-parchment p-8">
                <EventMeta category={event.category} date={event.date} />
                <h2 className="mt-4 font-display text-2xl">{event.title}</h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-shrine-charcoal/85">
                  {event.summary}
                </p>
                {event.href ? (
                  <a
                    href={event.href}
                    rel="noopener noreferrer"
                    target="_blank"
                    className="link-underline mt-5 inline-flex w-fit items-center gap-1.5 text-sm text-shrine-maroon-600"
                  >
                    Read more
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                ) : null}
              </article>
            </Reveal>
          ))}
        </Container>
      </section>

      <section className="relative overflow-hidden bg-shrine-maroon-950 py-16">
        <div className="bg-gold-bloom bloom-drift pointer-events-none absolute inset-0" />
        <Container className="relative flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <p className="max-w-xl font-display text-2xl text-shrine-cream">
            For weekly notices, follow the parish on Facebook or write to the office.
          </p>
          <Button href={site.facebook} variant="outline-light">
            Follow updates
          </Button>
        </Container>
      </section>
    </>
  );
}
