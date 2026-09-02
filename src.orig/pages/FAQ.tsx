import { PageHero } from "@/components/PageHero";
import { Accordion } from "@/components/ui/Accordion";
import { Container } from "@/components/ui/Container";
import { faqs, images } from "@/data/content";

export function FAQ() {
  return (
    <>
      <PageHero
        compact
        eyebrow="FAQ"
        title="Questions the office hears most"
        description="Mass, confession, how to arrive, parking, sacraments, and office hours."
        image={images.chapel}
        fallback={images.heroFallback}
        variant="light"
      />
      <section className="bg-shrine-cream py-20 sm:py-28">
        <Container className="max-w-3xl">
          <Accordion items={faqs} />
        </Container>
      </section>
    </>
  );
}
