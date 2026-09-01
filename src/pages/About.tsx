import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { PageHero } from "@/components/PageHero";
import { SafeImage } from "@/components/SafeImage";
import { Emblem } from "@/components/Emblem";
import { site } from "@/data/site";
import { priests, ppcMembers } from "@/data/content";
import { monogram } from "@/utils/monogram";
import { Mail } from "lucide-react";

const pillars = [
  {
    num: "01",
    title: "Prayer",
    desc: "A community centred on the Eucharist, gathering daily for Mass and Adoration.",
  },
  {
    num: "02",
    title: "Formation",
    desc: "Nurturing disciples of all ages through catechesis, scripture study, and retreats.",
  },
  {
    num: "03",
    title: "Service",
    desc: "Reaching out to the poor, the sick, and the marginalised in Queenstown and beyond.",
  },
];

export function About() {
  return (
    <>
      <PageHero
        title="The Household"
        subtitle="Our parish, our priests, and our story of faith in Queenstown since 1958."
        image="/images/hero-church.jpg"
      />

      {/* Vision */}
      <section className="bg-bsc-cream py-16 lg:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <SectionHeading
                eyebrow="Our Vision"
                title={site.vision}
                description="Blessed Sacrament Church is a parish of the Congregation of the Sacred Hearts of Jesus and Mary (SS.CC.), serving the Catholic community of Queenstown since 1958. Our iconic tent-shaped church, granted conservation status in 2005, stands as a beacon of faith in Singapore's first satellite town."
              />
              <div className="mt-8 grid gap-6">
                {pillars.map((p) => (
                  <div key={p.num} className="flex gap-4">
                    <span className="font-display text-4xl font-light text-bsc-sapphire-200">
                      {p.num}
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-semibold text-bsc-sapphire-900">
                        {p.title}
                      </h3>
                      <p className="mt-1 text-bsc-charcoal">{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={150}>
              <div className="relative overflow-hidden rounded-2xl">
                <SafeImage
                  src="/images/hero-church.jpg"
                  alt="The Church of the Blessed Sacrament with its distinctive blue roof"
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Priests */}
      <section className="bg-bsc-parchment py-16 lg:py-24">
        <Container>
          <SectionHeading
            eyebrow="Our Priests"
            title="The SS.C.C. Shepherds"
            description="Serving with the charism of the Congregation of the Sacred Hearts of Jesus and Mary."
            align="center"
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {priests.map((priest, i) => (
              <Reveal key={priest.name} delay={i * 100}>
                <div className="card-tint flex flex-col items-center rounded-2xl border p-6 text-center">
                  <div
                    className="flex h-16 w-16 items-center justify-center rounded-full bg-bsc-sapphire-100 font-display text-xl font-bold text-bsc-sapphire-700"
                    aria-hidden="true"
                  >
                    {monogram(priest.name)}
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold text-bsc-sapphire-900">
                    {priest.name}
                  </h3>
                  <p className="text-sm font-medium text-bsc-sapphire-500">
                    {priest.role}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-bsc-charcoal">
                    {priest.bio}
                  </p>
                  {priest.email && (
                    <a
                      href={`mailto:${priest.email}`}
                      className="mt-4 inline-flex items-center gap-1.5 text-sm text-bsc-sapphire-600 hover:text-bsc-sapphire-800"
                    >
                      <Mail className="h-3.5 w-3.5" />
                      {priest.email}
                    </a>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* PPC */}
      <section className="bg-bsc-cream py-16 lg:py-24">
        <Container>
          <SectionHeading
            eyebrow="Parish Pastoral Council"
            title="Our Parish Leadership"
            description="The PPC works with the parish priest to guide the spiritual and pastoral life of our community."
            align="center"
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ppcMembers.map((member, i) => (
              <Reveal key={member.name + member.role} delay={i * 80}>
                <div className="flex items-center gap-4 rounded-xl border border-bsc-stone bg-bsc-cream p-4">
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-bsc-sapphire-100 font-display text-sm font-bold text-bsc-sapphire-700"
                    aria-hidden="true"
                  >
                    {monogram(member.name)}
                  </div>
                  <div>
                    <p className="font-medium text-bsc-sapphire-900">
                      {member.name}
                    </p>
                    <p className="text-sm text-bsc-charcoal">{member.role}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Emblem band */}
      <section className="bg-bsc-sapphire-950 py-16">
        <Container>
          <div className="flex flex-col items-center text-center">
            <Emblem className="h-20 w-20 text-bsc-gold-400" />
            <p className="mt-6 max-w-xl font-display text-xl italic text-bsc-cream/80">
              &ldquo;Behold the Lamb of God, behold Him who takes away the sins
              of the world.&rdquo;
            </p>
            <p className="mt-3 text-sm text-bsc-cream/50">
              — John 1:29
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
