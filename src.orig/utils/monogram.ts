const HONORIFICS = new Set([
  "fr",
  "friar",
  "father",
  "rev",
  "reverend",
  "msgr",
  "monsignor",
  "ofm",
  "ss.cc",
  "sscc",
  "ss.ccs",
  "mr",
  "ms",
  "mrs",
]);

/** "Fr Johan Wongso, SS.CC" → "JW". Strips honorifics and post-nominals. */
export function monogram(name: string): string {
  const cleaned = name
    .replace(/,/g, " ")
    .split(/\s+/)
    .map((part) => part.trim())
    .filter(Boolean)
    .filter((part) => !HONORIFICS.has(part.toLowerCase().replace(/\./g, "")));

  const initials = cleaned
    .filter((part) => /^[A-Za-z]/.test(part))
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

  if (initials) return initials;
  if (cleaned.length === 0) return "";
  const trimmed = name.trim();
  return trimmed ? trimmed.slice(0, 2).toUpperCase() : "";
}
