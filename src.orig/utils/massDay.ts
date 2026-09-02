export type MassDayKey = "weekdays" | "saturday" | "sunday";

/** Maps Date#getDay() 0 → sunday / 6 → saturday / rest → weekdays. */
export function massDayKey(date: Date): MassDayKey {
  const day = date.getDay();
  if (day === 0) return "sunday";
  if (day === 6) return "saturday";
  return "weekdays";
}
