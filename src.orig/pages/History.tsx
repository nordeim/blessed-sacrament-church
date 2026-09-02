import { PageHero } from "@/components/PageHero";
import { Timeline } from "@/components/Timeline";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { images, lifeTimeline } from "@/data/content";

export function History() {
  return (
    <>
      <PageHero
        eyebrow="Our history"
        title="From a hall in Queenstown to a conserved tent"
        description="1958–2026. Dutch missionaries, Damien of Molokai, a folded blue roof, and a parish that still prays in five languages."
        image={images.hero}
        fallback={images.heroFallback}
      />

      <section className="bg-shrine-cream py-20 sm:py-28">
        <Container className="grid gap-16 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div data-testid="history-story" className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              eyebrow="The story"
              title="Queenstown’s tent of meeting"
              description="A modernist church of fair-faced brick and stained plywood, designed so glass at the roof joints would light the crucifix — and conserved in 2005 so the tent would remain."
            />
            <p className="mt-6 leading-relaxed text-shrine-charcoal/85">
              Fathers van Soest and Tiggeloven slept in the kitchen and the meeting room until the
              presbytery was ready. Circus Malaya gave its takings. Archbishop Olçomendy blessed
              the church on 8 May 1965. The roof still looks like a tent because it is one.
            </p>
          </div>
          <Timeline entries={lifeTimeline} />
        </Container>
      </section>
    </>
  );
}
