import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { PageHero } from "@/components/PageHero";
import { Timeline } from "@/components/Timeline";
import { lifeTimeline } from "@/data/content";

export function History() {
  return (
    <>
      <PageHero
        title="Our History"
        subtitle="From a hilltop request in 1954 to a conserved landmark in Queenstown — the story of Blessed Sacrament Church."
        image="/images/hero-church.jpg"
      />

      <section className="bg-bsc-cream py-16 lg:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_2fr]">
            <Reveal>
              <div
                data-testid="history-story"
                className="lg:sticky lg:top-28 lg:self-start"
              >
                <SectionHeading
                  eyebrow="Timeline"
                  title="1954 – Today"
                  description="The Congregation of the Sacred Hearts of Jesus and Mary has served Queenstown for over six decades, building a community of faith around the Eucharist."
                />
              </div>
            </Reveal>
            <Timeline entries={lifeTimeline} />
          </div>
        </Container>
      </section>
    </>
  );
}
