import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { PageHero } from "@/components/PageHero";
import { serveRoles } from "@/data/content";
import { site } from "@/data/site";
import { Heart, ArrowRight } from "lucide-react";

export function Serve() {
  return (
    <>
      <PageHero
        title="Serve"
        subtitle="Take your place in our parish community. Your gifts are needed."
        image="/images/hero-church.jpg"
        variant="light"
      />

      <section className="bg-bsc-cream py-16 lg:py-24">
        <Container>
          <SectionHeading
            eyebrow="Opportunities"
            title="How Will You Serve?"
            description="From the altar to the margins, there is a place for everyone in the Body of Christ."
            align="center"
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {serveRoles.map((role, i) => (
              <Reveal key={role.title} delay={i * 100}>
                <div className="card-tint flex h-full flex-col rounded-2xl border p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-bsc-sapphire-100">
                    <Heart className="h-6 w-6 text-bsc-sapphire-600" />
                  </div>
                  <h3 className="mt-4 font-display text-xl font-semibold text-bsc-sapphire-900">
                    {role.title}
                  </h3>
                  <p className="mt-2 flex-1 leading-relaxed text-bsc-charcoal">
                    {role.summary}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-bsc-parchment py-16 lg:py-24">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <Reveal>
              <h2 className="font-display text-3xl font-semibold text-bsc-sapphire-900">
                Ready to Get Started?
              </h2>
              <p className="mt-4 text-bsc-charcoal">
                Speak with any ministry leader after Mass, or contact the parish
                office to learn more about how you can serve.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Button
                  href={`mailto:${site.contact.connectEmail}`}
                  variant="primary"
                  icon={ArrowRight}
                >
                  Contact Us
                </Button>
                <Button to="/ministries" variant="secondary">
                  Explore Ministries
                </Button>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
