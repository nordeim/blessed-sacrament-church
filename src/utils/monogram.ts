export function monogram(name: string): string {
  const cleaned = name
    .replace(/^(Fr\.?\s+|Father\s+|Rev\.?\s+|Rev\.?\s+Fr\.?\s+)/i, "")
    .replace(/,\s*SS\.CC\.?$/i, "")
    .trim();
  const parts = cleaned.split(/\s+/);
  if (parts.length === 0) return "";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
