import { Link } from "react-router-dom";
import { Container } from "@/components/ui/Container";
import { SocialIcons } from "@/components/SocialIcons";
import { footerNav } from "@/data/nav";
import { site } from "@/data/site";

export function Footer() {
  const explore = footerNav.filter((_, i) => i < 5);
  const involved = footerNav.filter((_, i) => i >= 5 && i < 10);

  return (
    <footer className="bg-bsc-sapphire-950 text-bsc-cream/70">
      <div className="divider-weave-thin" />
      <Container>
        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
          {/* Explore */}
          <div>
            <h3 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider text-bsc-cream">
              Explore
            </h3>
            <ul className="space-y-2.5">
              {explore.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="link-underline text-sm transition-colors hover:text-bsc-cream"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get Involved */}
          <div>
            <h3 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider text-bsc-cream">
              Get Involved
            </h3>
            <ul className="space-y-2.5">
              {involved.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="link-underline text-sm transition-colors hover:text-bsc-cream"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Parish */}
          <div>
            <h3 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider text-bsc-cream">
              Parish
            </h3>
            <address className="not-italic text-sm leading-relaxed">
              <p className="text-bsc-cream">{site.name}</p>
              <p>{site.address.street}</p>
              <p>
                {site.address.city} {site.address.zip}
              </p>
              <p className="mt-3">
                <a
                  href={`tel:${site.contact.officePhone}`}
                  className="transition-colors hover:text-bsc-cream"
                >
                  {site.contact.officePhone}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${site.contact.email}`}
                  className="transition-colors hover:text-bsc-cream"
                >
                  {site.contact.email}
                </a>
              </p>
            </address>
          </div>

          {/* Visit */}
          <div>
            <h3 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider text-bsc-cream">
              Visit
            </h3>
            <p className="text-sm leading-relaxed">
              <span className="text-bsc-cream">Church:</span> {site.hours.church}
            </p>
            <p className="mt-2 text-sm leading-relaxed">
              <span className="text-bsc-cream">Office:</span> {site.hours.office}
            </p>
            <p className="mt-3 text-sm">
              <span className="text-bsc-cream">Nearest MRT:</span>{" "}
              {site.transport.mrt}
            </p>
            <div className="mt-5 flex gap-3">
              <SocialIcons />
            </div>
          </div>
        </div>
      </Container>

      {/* Bottom bar */}
      <div className="border-t border-bsc-cream/10">
        <Container>
          <div className="flex flex-col items-center justify-between gap-3 py-6 sm:flex-row">
            <p className="text-center text-xs text-bsc-cream/40 sm:text-left">
              {site.name} · {site.address.street} · A parish of the Congregation
              of the Sacred Hearts of Jesus and Mary (SS.CC.) since 1958
            </p>
            <p className="text-xs text-bsc-cream/40">
              &copy; {new Date().getFullYear()} {site.shortName}
            </p>
          </div>
        </Container>
      </div>
    </footer>
  );
}
