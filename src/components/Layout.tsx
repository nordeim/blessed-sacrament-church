import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SkipLink } from "@/components/SkipLink";
import { BackToTop } from "@/components/BackToTop";
import { ScrollProgress } from "@/components/ScrollProgress";

export function Layout() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const resolveAnchor = () => {
      const raw = window.location.hash;
      const parts = raw.split("#").filter(Boolean);
      const anchor = parts.length > 1 ? parts[parts.length - 1] : null;
      if (anchor) {
        const el = document.getElementById(anchor);
        if (el) {
          setTimeout(() => {
            el.scrollIntoView({ behavior: "auto" });
          }, 80);
        }
      } else {
        window.scrollTo({ top: 0, behavior: "auto" });
      }
    };
    resolveAnchor();
  }, [pathname, hash]);

  return (
    <div className="flex min-h-screen flex-col">
      <SkipLink />
      <ScrollProgress />
      <Header />
      <main
        id="main-content"
        tabIndex={-1}
        className="flex-1 outline-none"
      >
        <div
          key={pathname}
          data-testid="page-container"
          data-route={pathname}
          className="page-in"
        >
          <Outlet />
        </div>
      </main>
      <BackToTop />
      <Footer />
    </div>
  );
}
