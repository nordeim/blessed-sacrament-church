export const knownRoutePaths = [
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
] as const;

export function resolveHashRedirect(
  pathname: string,
  hash: string
): string | null {
  const path = pathname.replace(/\/$/, "");
  if (path === "" || path === "/") return null;
  if (!knownRoutePaths.includes(path as (typeof knownRoutePaths)[number])) {
    return null;
  }
  return "/#" + path + hash;
}
