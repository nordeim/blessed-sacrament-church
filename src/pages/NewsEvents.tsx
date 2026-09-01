import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { PageHero } from "@/components/PageHero";
import { EventMeta } from "@/components/EventMeta";
import { upcomingEvents } from "@/data/content";
import { site } from "@/data/site";
import { ArrowRight, Calendar } from "lucide-react";

export function NewsEvents() {
  return (
    <>
      <PageHero
        title="News & Events"
        subtitle="Devotions, formation programmes, and parish celebrations at Blessed Sacrament."
        image="/images/hero-church.jpg"
        variant="light"
        compact
      />

      <section className="bg-bsc-cream py-16 lg:py-24">
        <Container>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {upcomingEvents.map((event, i) => (
              <Reveal key={event.title} delay={i * 100}>
                <article className="card-tint flex h-full flex-col rounded-2xl border p-6">
                  <EventMeta event={event} />
                  <h3 className="mt-4 font-display text-xl font-semibold text-bsc-sapphire-900">
                    {event.title}
                  </h3>
                  <p className="mt-3 flex-1 leading-relaxed text-bsc-charcoal">
                    {event.summary}
                  </p>
                  {event.href && (
                    <a
                      href={event.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-bsc-sapphire-600 hover:text-bsc-sapphire-800"
                    >
                      Learn more <ArrowRight className="h-3.5 w-3.5" />
                    </a>
                  )}
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Closing band */}
      <section className="relative overflow-hidden bg-bsc-sapphire-900 py-16">
        <div className="bg-gold-bloom absolute inset-0" />
        <div className="bg-grain absolute inset-0" />
        <Container className="relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <Calendar className="mx-auto h-10 w-10 text-bsc-gold-400" />
              <h2 className="mt-5 font-display text-2xl font-semibold text-bsc-cream sm:text-3xl">
                Stay Connected
              </h2>
              <p className="mt-3 text-bsc-cream/75">
                Follow us on Facebook and Instagram for the latest parish
                updates, reflections, and event announcements.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Button href={site.facebook} variant="outline-light">
                  Facebook
                </Button>
                <Button href={site.instagram} variant="outline-light">
                  Instagram
                </Button>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
