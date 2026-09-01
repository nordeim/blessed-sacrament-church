import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { PageHero } from "@/components/PageHero";
import { site } from "@/data/site";
import { devotions } from "@/data/content";
import { massDayKey } from "@/utils/massDay";
import { Clock, MapPin, Phone, Mail, Bus, Train } from "lucide-react";

function MassCard({
  title,
  children,
  today,
}: {
  title: string;
  children: React.ReactNode;
  today?: boolean;
}) {
  return (
    <div
      data-testid="mass-card"
      data-today={today ? "true" : undefined}
      className={`relative overflow-hidden rounded-xl border bg-bsc-cream p-5 ${
        today
          ? "border-bsc-gold-400 shadow-bsc"
          : "border-bsc-stone"
      }`}
    >
      {today && (
        <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-bsc-gold-400 to-bsc-gold-600" />
      )}
      <div className="flex items-center justify-between">
        <h3 className="font-display text-lg font-semibold text-bsc-sapphire-900">
          {title}
        </h3>
        {today && (
          <span className="rounded-full bg-bsc-gold-100 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-bsc-gold-700">
            Today
          </span>
        )}
      </div>
      <div className="mt-3 text-bsc-charcoal">{children}</div>
    </div>
  );
}

export function Worship() {
  const todayKey = massDayKey(new Date());

  return (
    <>
      <PageHero
        title="Worship"
        subtitle="Mass, sacraments, and sacred devotions in the heart of Queenstown."
        image="/images/hero-church.jpg"
        variant="light"
      />

      {/* Mass Times */}
      <section id="mass" className="scroll-mt-28 bg-bsc-cream py-16 lg:py-24">
        <Container>
          <SectionHeading
            eyebrow="Mass Times"
            title="Join Us at the Altar"
            description="All are welcome to celebrate the Eucharist with us."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <MassCard
              title="Monday – Friday"
              today={todayKey === "weekdays"}
            >
              <ul className="space-y-1.5 text-sm">
                <li className="flex justify-between">
                  <span>Morning</span>
                  <span className="font-medium">{site.mass.weekdayMorning}</span>
                </li>
                <li className="flex justify-between">
                  <span>Noon</span>
                  <span className="font-medium">{site.mass.weekdayNoon}</span>
                </li>
                <li className="flex justify-between">
                  <span>Evening</span>
                  <span className="font-medium">{site.mass.weekdayEvening}</span>
                </li>
              </ul>
              <p className="mt-3 text-xs text-bsc-charcoal/70 italic">
                {site.mass.note}
              </p>
            </MassCard>

            <MassCard title="Saturday" today={todayKey === "saturday"}>
              <ul className="space-y-1.5 text-sm">
                <li className="flex justify-between">
                  <span>Morning</span>
                  <span className="font-medium">8:30 AM</span>
                </li>
                <li className="flex justify-between">
                  <span>Sunset Mass</span>
                  <span className="font-medium">6:00 PM (English)</span>
                </li>
                <li className="flex justify-between">
                  <span>Tamil Mass</span>
                  <span className="font-medium">7:30 PM (3rd Saturday)</span>
                </li>
              </ul>
            </MassCard>

            <MassCard title="Sunday" today={todayKey === "sunday"}>
              <ul className="space-y-1.5 text-sm">
                {site.mass.sunday.map((s) => (
                  <li key={s.time} className="flex justify-between">
                    <span>{s.time}</span>
                    <span className="font-medium">{s.language}</span>
                  </li>
                ))}
              </ul>
            </MassCard>
          </div>
        </Container>
      </section>

      {/* Confession & Adoration */}
      <section
        id="confession"
        className="scroll-mt-28 bg-bsc-parchment py-16 lg:py-24"
      >
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            <Reveal>
              <SectionHeading
                eyebrow="Sacraments"
                title="Confession & Adoration"
                description="Experience God's mercy in the sacrament of Reconciliation and spend time with our Lord in Eucharistic Adoration."
              />
              <div className="mt-6 space-y-4">
                <div className="rounded-xl border border-bsc-stone bg-bsc-cream p-5">
                  <h3 className="font-display text-lg font-semibold text-bsc-sapphire-900">
                    Confession
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-bsc-charcoal">
                    {site.mass.confession}
                  </p>
                </div>
                <div className="rounded-xl border border-bsc-stone bg-bsc-cream p-5">
                  <h3 className="font-display text-lg font-semibold text-bsc-sapphire-900">
                    Eucharistic Adoration
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-bsc-charcoal">
                    {site.mass.adoration}
                  </p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={150}>
              <SectionHeading
                eyebrow="Devotions"
                title="Regular Devotions"
              />
              <div className="mt-6 space-y-3">
                {devotions.map((d) => (
                  <div
                    key={d.title}
                    className="flex items-start justify-between rounded-xl border border-bsc-stone bg-bsc-cream p-4"
                  >
                    <div>
                      <h4 className="font-medium text-bsc-sapphire-900">
                        {d.title}
                      </h4>
                      <p className="text-sm text-bsc-charcoal">{d.where}</p>
                    </div>
                    <span className="shrink-0 text-sm font-medium text-bsc-sapphire-600">
                      {d.when}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Find Us */}
      <section id="visit" className="scroll-mt-28 bg-bsc-cream py-16 lg:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            <Reveal>
              <SectionHeading
                eyebrow="Find Us"
                title="Visit Blessed Sacrament"
                description="We are located in the heart of Queenstown, Singapore's first satellite town."
              />
              <div className="mt-6 space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-bsc-sapphire-500" />
                  <div>
                    <p className="font-medium text-bsc-sapphire-900">
                      {site.name}
                    </p>
                    <p className="text-bsc-charcoal">{site.address.full}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-5 w-5 shrink-0 text-bsc-sapphire-500" />
                  <div>
                    <p className="font-medium text-bsc-sapphire-900">
                      Church Hours
                    </p>
                    <p className="text-bsc-charcoal">{site.hours.church}</p>
                    <p className="text-sm text-bsc-charcoal/70">
                      Office: {site.hours.office}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-5 w-5 shrink-0 text-bsc-sapphire-500" />
                  <div>
                    <p className="font-medium text-bsc-sapphire-900">Contact</p>
                    <p className="text-bsc-charcoal">
                      {site.contact.officePhone}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-5 w-5 shrink-0 text-bsc-sapphire-500" />
                  <div>
                    <p className="font-medium text-bsc-sapphire-900">Email</p>
                    <p className="text-bsc-charcoal">{site.contact.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Train className="mt-0.5 h-5 w-5 shrink-0 text-bsc-sapphire-500" />
                  <div>
                    <p className="font-medium text-bsc-sapphire-900">MRT</p>
                    <p className="text-bsc-charcoal">{site.transport.mrt}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Bus className="mt-0.5 h-5 w-5 shrink-0 text-bsc-sapphire-500" />
                  <div>
                    <p className="font-medium text-bsc-sapphire-900">Buses</p>
                    <p className="text-bsc-charcoal">{site.transport.buses}</p>
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal delay={150}>
              <div className="overflow-hidden rounded-2xl border border-bsc-stone shadow-bsc">
                <iframe
                  title="Map to Church of the Blessed Sacrament"
                  src={site.mapsEmbedSrc}
                  className="h-80 w-full border-0 sm:h-96"
                  loading="lazy"
                  allowFullScreen
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
