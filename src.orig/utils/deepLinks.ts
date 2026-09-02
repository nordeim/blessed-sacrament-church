/**
 * Path-style deep links silently rendered Home under HashRouter.
 * Rewrite known path routes to their hash equivalents before React mounts.
 */
export const knownRoutePaths: readonly string[] = [
  "/",
  "/about",
  "/history",
  "/worship",
  "/mass-times",
  "/hours-location",
  "/visit",
  "/ministries",
  "/ministry",
  "/news-events",
  "/news-and-events",
  "/serve",
  "/volunteer",
  "/give",
  "/donate",
  "/faq",
];

export function resolveHashRedirect(pathname: string, hash: string): string | null {
  if (hash && hash !== "#") return null;

  const clean =
    pathname.length > 1 && pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;

  if (clean === "" || clean === "/") return null;
  if (!knownRoutePaths.includes(clean)) return null;

  return `/#${clean}`;
}
