import { PageHero } from "@/components/PageHero";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { images, ppcMembers, priests } from "@/data/content";
import { site } from "@/data/site";
import { monogram } from "@/utils/monogram";

const pillars = [
  {
    numeral: "01",
    title: "Eucharist",
    body: "Christ’s Body and Blood is the parish’s name and its centre. Daily Mass, adoration, and Corpus Christi keep the tent pitched among us.",
  },
  {
    numeral: "02",
    title: "Evangelise",
    body: "The 2023 mission is not a slogan. It is a sending — from the altar into Queenstown, Alexandra, and Redhill.",
  },
  {
    numeral: "03",
    title: "Sacred Hearts",
    body: "The SS.CC fathers have kept this house since 1958. Damien of Molokai is still the pattern of charity we try to live.",
  },
];

export function About() {
  return (
    <>
      <PageHero
        eyebrow="The parish"
        title="A household of the Sacred Hearts"
        description={site.tagline}
        image={images.glass}
        fallback={images.heroFallback}
      />

      <section className="bg-shrine-cream py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Pray · Form · Go"
            title="Three pillars under one tent"
            description="On Corpus Christi 2023, Fr Johan Wongso named the work: to be an evangelising church with a Eucharistic spirituality."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {pillars.map((pillar, index) => (
              <Reveal key={pillar.title} delay={index * 80}>
                <article className="card-tint rounded-sm border border-shrine-stone bg-shrine-parchment p-8">
                  <p className="font-display text-5xl text-shrine-gold-300/80">{pillar.numeral}</p>
                  <h3 className="mt-4 font-display text-2xl">{pillar.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-shrine-charcoal/85">{pillar.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-shrine-parchment py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Clergy"
            title="The SS.CC fathers"
            description={`${site.congregation} — pastoring Queenstown since 1958.`}
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {priests.map((priest, index) => (
              <Reveal key={priest.name} delay={index * 60}>
                <article className="card-tint flex gap-4 rounded-sm border border-shrine-stone bg-shrine-cream p-6">
                  <span
                    aria-hidden="true"
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-shrine-gold-400 font-display text-sm text-shrine-maroon-700"
                  >
                    {monogram(priest.name)}
                  </span>
                  <div>
                    <h3 className="font-display text-xl">{priest.name}</h3>
                    <p className="mt-1 text-sm text-shrine-charcoal/75">{priest.role}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-shrine-cream py-20 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="The household"
              title="Pastoral staff & council"
              description="The fathers, pastoral associates, and the mission they keep."
            />
            <ul className="mt-10 divide-y divide-shrine-stone border-y border-shrine-stone">
              {ppcMembers.map((member) => (
                <li key={member.role} className="flex items-baseline justify-between gap-4 py-4">
                  <span className="text-sm text-shrine-charcoal/70">{member.role}</span>
                  <span className="text-right font-display text-shrine-maroon-700">{member.name}</span>
                </li>
              ))}
            </ul>
          </div>
          <Reveal delay={100}>
            <div className="rounded-sm border border-shrine-stone bg-shrine-parchment p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-shrine-maroon-500">
                Write to us
              </p>
              <p className="mt-4 font-display text-2xl">The parish office</p>
              <p className="mt-3 text-sm leading-relaxed text-shrine-charcoal/85">
                {site.hours.parishOffice}
              </p>
              <p className="mt-3 text-sm text-shrine-charcoal/85">
                {site.contact.email}
                <br />
                {site.contact.officePhone}
              </p>
              <div className="mt-8">
                <Button to="/worship#visit" variant="secondary">
                  Find us
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
