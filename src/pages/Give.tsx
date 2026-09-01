import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { PageHero } from "@/components/PageHero";
import { givingOptions } from "@/data/content";
import { site } from "@/data/site";
import {
  Globe,
  Church,
  BookOpen,
  Heart,
  Flame,
  Sprout,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  globe: Globe,
  church: Church,
  book: BookOpen,
  heart: Heart,
  flame: Flame,
  sprout: Sprout,
};

export function Give() {
  return (
    <>
      <PageHero
        title="Give"
        subtitle="Support the mission and ministries of Blessed Sacrament Church."
        image="/images/hero-church.jpg"
        variant="light"
      />

      <section className="bg-bsc-cream py-16 lg:py-24">
        <Container>
          <SectionHeading
            eyebrow="Ways to Give"
            title="Stewardship & Generosity"
            description="Your generosity sustains our parish, our outreach, and our mission to be a household of faith, hope, and love."
            align="center"
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {givingOptions.map((option, i) => {
              const Icon = iconMap[option.icon] || Heart;
              return (
                <Reveal key={option.title} delay={i * 100}>
                  <div className="card-tint flex h-full flex-col rounded-2xl border p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-bsc-sapphire-100">
                      <Icon className="h-6 w-6 text-bsc-sapphire-600" />
                    </div>
                    <h3 className="mt-4 font-display text-lg font-semibold text-bsc-sapphire-900">
                      {option.title}
                    </h3>
                    <p className="mt-2 flex-1 text-bsc-charcoal">
                      {option.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Contact band */}
      <section className="bg-bsc-parchment py-16 lg:py-24">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <Reveal>
              <h2 className="font-display text-2xl font-semibold text-bsc-sapphire-900">
                Questions About Giving?
              </h2>
              <p className="mt-3 text-bsc-charcoal">
                Contact the parish office for assistance with donations, Mass
                intentions, or planned giving.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Button
                  href={`tel:${site.contact.officePhone}`}
                  variant="primary"
                >
                  Call {site.contact.officePhone}
                </Button>
                <Button
                  href={`mailto:${site.contact.email}`}
                  variant="secondary"
                >
                  Email Us
                </Button>
              </div>
            </Reveal>
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
              <p className="font-display text-xl italic text-bsc-cream/80">
                &ldquo;Each one must give as he has decided in his heart, not
                reluctantly or under compulsion, for God loves a cheerful
                giver.&rdquo;
              </p>
              <p className="mt-3 text-sm text-bsc-cream/50">
                — 2 Corinthians 9:7
              </p>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
