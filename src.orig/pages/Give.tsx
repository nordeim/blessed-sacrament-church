import {
  BookOpen,
  Building2,
  Church,
  Flame,
  Globe,
  Heart,
  HeartHandshake,
  Sprout,
  type LucideIcon,
} from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { givingOptions, images, type GivingOption } from "@/data/content";
import { site } from "@/data/site";

const icons: Record<GivingOption["icon"], LucideIcon> = {
  flame: Flame,
  church: Church,
  sprout: Sprout,
  heart: Heart,
  book: BookOpen,
  "hand-heart": HeartHandshake,
  landmark: Building2,
  globe: Globe,
};

export function Give() {
  return (
    <>
      <PageHero
        eyebrow="Give"
        title="Keep the tent standing"
        description="Offerings received at the parish office, by cheque payable to Blessed Sacrament Church, or via PayNow arranged with the secretariat."
        image={images.glass}
        fallback={images.heroFallback}
      />

      <section className="bg-shrine-cream py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Ways to give"
            title="Eight paths of thanksgiving"
            description="The office issues receipts. For PayNow, ask the secretariat for the parish UEN so the gift is recorded correctly."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {givingOptions.map((option, index) => {
              const Icon = icons[option.icon];
              return (
                <Reveal key={option.name} delay={index * 50} className="h-full">
                  <article className="card-tint h-full rounded-sm border border-shrine-stone bg-shrine-parchment p-6">
                    <Icon className="h-5 w-5 text-shrine-gold-600" aria-hidden="true" />
                    <h3 className="mt-4 font-display text-xl">{option.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-shrine-charcoal/80">
                      {option.description}
                    </p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-shrine-maroon-950 py-20">
        <div className="bg-gold-bloom bloom-drift pointer-events-none absolute inset-0" />
        <Container className="relative grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-shrine-gold-300">
              A house of prayer
            </p>
            <h2 className="mt-3 font-display text-3xl text-shrine-cream sm:text-4xl">
              The office is open six days, and the chapel seven.
            </h2>
            <p className="mt-4 max-w-lg text-shrine-cream/75">{site.hours.parishOffice}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href={`mailto:${site.contact.email}`}>Write the office</Button>
            <Button to="/worship#visit" variant="outline-light">
              Visit
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
