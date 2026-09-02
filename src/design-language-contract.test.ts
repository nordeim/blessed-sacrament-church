import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

/**
 * Round-19 design-language contract — the audited queenstown×church merge
 * ("Two Tents — Visual & UX Audit", report 1):
 *   T4  global :focus-visible ring (merge-03: queenstown's ring + church's
 *       landmarks)
 *   T7  editorial corner vocabulary (merge-04: sharp corners "are the more
 *       honest material" for a 1965 modernist building) via Tailwind v4
 *       --radius-* overrides
 *   T8  typographic inheritance (kern + liga on body)
 *   T9  motion: bloom-drift on the CTA band, centre-drawn gold hairline,
 *       liturgical rise-in ease, 2.6s timeline halo (motion 8.6 → )
 */
const root = resolve(__dirname, "..");
const css = readFileSync(resolve(root, "src/index.css"), "utf8");

const base = css.slice(css.indexOf("@layer base"));
const theme = css.slice(css.indexOf("@theme"), css.indexOf("}", css.indexOf("@theme")));

describe("T4 — global :focus-visible ring (merge-03)", () => {
  it("declares a global focus-visible outline in @layer base", () => {
    expect(base).toMatch(/:focus-visible\s*\{/);
  });

  it("rings 2px in bsc gold with a 3px offset", () => {
    const rule = base.slice(base.indexOf(":focus-visible"));
    expect(rule).toContain("outline: 2px solid var(--color-bsc-gold-400)");
    expect(rule).toContain("outline-offset: 3px");
  });
});

describe("T7 — editorial corner vocabulary (merge-04)", () => {
  it("overrides the Tailwind radius scale inside @theme", () => {
    expect(theme).toContain("--radius-xs:");
    expect(theme).toContain("--radius-sm:");
    expect(theme).toContain("--radius-md:");
    expect(theme).toContain("--radius-lg:");
    expect(theme).toContain("--radius-xl:");
    expect(theme).toContain("--radius-2xl:");
  });

  it("resolves to the editorial scale (2/2/3/4/4/6 px)", () => {
    const read = (token: string) =>
      theme.match(new RegExp(`--radius-${token}:\\s*([0-9.]+rem)`))?.[1];
    expect(read("xs")).toBe("0.125rem");
    expect(read("sm")).toBe("0.125rem");
    expect(read("md")).toBe("0.1875rem");
    expect(read("lg")).toBe("0.25rem");
    expect(read("xl")).toBe("0.25rem");
    expect(read("2xl")).toBe("0.375rem");
  });
});

describe("T8 — typographic inheritance", () => {
  it("enables kerning and ligatures on body copy", () => {
    const bodyRule = base.slice(base.indexOf("body {"));
    expect(bodyRule).toContain('font-feature-settings: "kern" 1, "liga" 1');
  });
});

describe("T9 — motion: bloom-drift, hairline, liturgical ease", () => {
  it("declares the bloom-drift keyframes (translate3d + scale)", () => {
    expect(css).toContain("@keyframes bloom-drift");
    const kf = css.slice(css.indexOf("@keyframes bloom-drift"));
    expect(kf).toContain("translate3d");
    expect(kf).toContain("scale(1.08)");
  });

  it("declares the .bloom-drift utility (14s alternate, will-change)", () => {
    const util = css.match(/\.bloom-drift\s*\{[^}]*\}/)?.[0];
    expect(util).toBeTruthy();
    expect(util).toContain("bloom-drift 14s ease-in-out infinite alternate");
    expect(util).toContain("will-change: transform");
  });

  it("gold-rule is a centre-drawn 1px hairline (transparent edges)", () => {
    const ruleBlock = css.match(/\.gold-rule::after\s*\{[^}]*\}/)?.[0];
    expect(ruleBlock).toBeTruthy();
    expect(ruleBlock).toContain("height: 1px");
    const grad = css.slice(css.indexOf(".gold-rule::after"));
    expect(grad).toMatch(
      /linear-gradient\([\s\S]*?transparent[\s\S]*?gold[\s\S]*?transparent[\s\S]*?\)/,
    );
  });

  it("rule-draw still animates from scaleX(0) (centre origin)", () => {
    const draw = css.slice(css.indexOf(".rule-draw.gold-rule::after"));
    expect(draw).toContain("transform-origin: center");
    const kf = css.slice(css.indexOf("@keyframes rule-draw"));
    expect(kf).toContain("scaleX(0)");
  });

  it("rise-in uses the liturgical ease cubic-bezier(0.22, 1, 0.36, 1)", () => {
    expect(css).toMatch(/rise-in 0\.8s cubic-bezier\(0\.22,\s*1,\s*0\.36,\s*1\)/);
  });

  it("timeline halo pulses on the 2.6s rhythm", () => {
    expect(css).toMatch(/halo-pulse 2\.6s ease-out infinite/);
  });

  it("reduced-motion flatten list covers bloom-drift", () => {
    const reduced = css.slice(css.lastIndexOf("prefers-reduced-motion"));
    expect(reduced).toContain(".bloom-drift");
  });
});
