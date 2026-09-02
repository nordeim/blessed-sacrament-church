import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/utils/cn";
import { useScrolled } from "@/hooks/useScrolled";
import { primaryNav } from "@/data/nav";
import { site } from "@/data/site";
import { Menu, X, ChevronDown } from "lucide-react";

export function Header() {
  const { pathname, hash } = useLocation();
  const isHome = pathname === "/";
  const scrolled = useScrolled(16);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopOpen, setDesktopOpen] = useState<string | null>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const drawerWasOpenRef = useRef(false);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  const solid = scrolled || !isHome || mobileOpen;

  useEffect(() => {
    setMobileOpen(false);
    setDesktopOpen(null);
  }, [pathname, hash]);

  useEffect(() => {
    if (mobileOpen) {
      drawerWasOpenRef.current = true;
      document.body.style.overflow = "hidden";
      setTimeout(() => drawerRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = "";
      if (drawerWasOpenRef.current) {
        hamburgerRef.current?.focus();
        drawerWasOpenRef.current = false;
      }
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleDrawerKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        setDesktopOpen(null);
        return;
      }
      if (e.key !== "Tab") return;
      const drawer = drawerRef.current;
      if (!drawer) return;
      const focusable = drawer.querySelectorAll<HTMLElement>(
        'a[href], button, [tabindex]:not([tabindex="-1"])'
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    },
    []
  );

  useEffect(() => {
    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node;
      if (mobileOpen && drawerRef.current && !drawerRef.current.contains(target)) {
        setMobileOpen(false);
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [mobileOpen]);

  const isActive = (to: string) => {
    if (to.includes("#")) {
      const [path, fragment] = to.split("#");
      return pathname === path && hash === `#${fragment}`;
    }
    return pathname === to;
  };

  const isParentActive = (item: (typeof primaryNav)[number]) => {
    if (!item.children) return pathname === item.to;
    return item.children.some((c) => c.to.split("#")[0] === pathname);
  };

  return (
    <header
      className={cn(
        "fixed left-0 right-0 top-0 z-50 transition-colors duration-300",
        solid
          ? "bg-bsc-sapphire-950/92 backdrop-blur-md"
          : "bg-transparent"
      )}
    >
      {/* Top bar */}
      <div
        className={cn(
          "hidden border-b border-bsc-cream/10 lg:block",
          solid ? "border-bsc-cream/10" : "border-transparent"
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-2 text-xs text-bsc-cream/70">
          <span>
            {site.address.street} · {site.feast.name}
          </span>
          <Link
            to="/give"
            className="link-underline text-bsc-gold-300 hover:text-bsc-gold-200"
          >
            Give
          </Link>
        </div>
      </div>

      {/* Main nav */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 sm:px-8">
        <Link
          to="/"
          className="font-display text-lg font-semibold text-bsc-cream"
        >
          {site.shortName}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {primaryNav.map((item) => {
            if (item.children) {
              const active = isParentActive(item);
              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setDesktopOpen(item.label)}
                  onMouseLeave={() => setDesktopOpen(null)}
                  onFocusCapture={() => setDesktopOpen(item.label)}
                  onBlurCapture={(event) => {
                    const next = event.relatedTarget as HTMLElement | null;
                    if (next && event.currentTarget.contains(next)) return;
                    setDesktopOpen(null);
                  }}
                >
                  <button
                    className={cn(
                      "flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                      active
                        ? "text-bsc-gold-300"
                        : "text-bsc-cream/80 hover:text-bsc-cream"
                    )}
                    aria-expanded={desktopOpen === item.label}
                    aria-current={active ? "true" : undefined}
                    onClickCapture={() => setDesktopOpen(null)}
                  >
                    {item.label}
                    <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                  {desktopOpen === item.label && (
                    <div className="menu-in absolute left-0 top-full z-50 mt-1 w-64 rounded-xl border border-bsc-cream/10 bg-bsc-sapphire-900/98 p-2 shadow-bsc-lg backdrop-blur-md">
                      {item.description && (
                        <p className="px-3 py-2 text-xs text-bsc-cream/50">
                          {item.description}
                        </p>
                      )}
                      {item.children.map((child) => (
                        <Link
                          key={child.to}
                          to={child.to}
                          className={cn(
                            "block rounded-lg px-3 py-2 text-sm transition-colors",
                            isActive(child.to)
                              ? "bg-bsc-sapphire-800 text-bsc-gold-300"
                              : "text-bsc-cream/80 hover:bg-bsc-sapphire-800 hover:text-bsc-cream"
                          )}
                          aria-current={isActive(child.to) ? "page" : undefined}
                          onClick={() => setDesktopOpen(null)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }
            return (
              <Link
                key={item.label}
                to={item.to!}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive(item.to!)
                    ? "text-bsc-gold-300"
                    : "text-bsc-cream/80 hover:text-bsc-cream"
                )}
                aria-current={isActive(item.to!) ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Hamburger */}
        <button
          ref={hamburgerRef}
          onClick={() => setMobileOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          className="flex h-11 w-11 items-center justify-center rounded-md text-bsc-cream lg:hidden"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div
          ref={drawerRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          tabIndex={-1}
          onKeyDown={handleDrawerKeyDown}
          className="drawer-in fixed inset-y-0 right-0 z-50 w-80 max-w-[85vw] overflow-y-auto bg-bsc-sapphire-950 p-6 shadow-bsc-lg lg:hidden"
          onClickCapture={() => setMobileOpen(false)}
        >
          <div className="mb-6 flex items-center justify-between">
            <span className="font-display text-lg font-semibold text-bsc-cream">
              Menu
            </span>
            <button
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
              className="flex h-10 w-10 items-center justify-center rounded-md text-bsc-cream"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav className="space-y-1">
            {primaryNav.map((item, i) => {
              if (item.children) {
                const active = isParentActive(item);
                return (
                  <div key={item.label} className="drawer-item-in" style={{ animationDelay: `${i * 40}ms` }}>
                    <span
                      className={cn(
                        "block px-3 py-2 text-sm font-semibold",
                        active ? "text-bsc-gold-300" : "text-bsc-cream/60"
                      )}
                      aria-current={active ? "page" : undefined}
                    >
                      {item.label}
                    </span>
                    <div className="ml-4 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.to}
                          to={child.to}
                          className={cn(
                            "block rounded-md px-3 py-2 text-sm transition-colors",
                            isActive(child.to)
                              ? "bg-bsc-sapphire-800 text-bsc-gold-300"
                              : "text-bsc-cream/80 hover:bg-bsc-sapphire-800 hover:text-bsc-cream"
                          )}
                          aria-current={isActive(child.to) ? "page" : undefined}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              }
              return (
                <Link
                  key={item.label}
                  to={item.to!}
                  className={cn(
                    "drawer-item-in block rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    isActive(item.to!)
                      ? "bg-bsc-sapphire-800 text-bsc-gold-300"
                      : "text-bsc-cream/80 hover:bg-bsc-sapphire-800 hover:text-bsc-cream"
                  )}
                  style={{ animationDelay: `${i * 40}ms` }}
                  aria-current={isActive(item.to!) ? "page" : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
