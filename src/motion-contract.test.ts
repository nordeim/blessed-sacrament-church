import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

/**
 * Motion & scrim contract — round 17 ("Light on the Tent"), extended round 19
 * ("The Merge"): bloom-drift joins the vocabulary (keyframes 9 → 10) and the
 * token budget stays 33 colors + 2 shadows.
 */

const root = resolve(__dirname, "..");
const css = readFileSync(resolve(root, "src/index.css"), "utf8");

const keyframes = (css.match(/@keyframes ([a-z-]+)/g) ?? []).map((k) =>
  k.replace("@keyframes ", ""),
);

describe("round-17 scrim utilities", () => {
  it("declares .scrim-hero and .scrim-page gradient scrims", () => {
    expect(css).toContain(".scrim-hero");
    expect(css).toContain(".scrim-page");
  });

  it("scrims are bottom-heavy (last stop darkest) so hero text keeps contrast", () => {
    const hero = css.slice(css.indexOf(".scrim-hero"), css.indexOf(".scrim-page"));
    const stops = hero.match(/rgba\([^)]*\)/g) ?? [];
    expect(stops.length).toBeGreaterThanOrEqual(3);
    const alphas = stops.map((s) => Number(s.match(/,\s*([0-9.]+)\)/)?.[1]));
    expect(alphas[alphas.length - 1]).toBeGreaterThan(alphas[0]);
  });
});

describe("round-17 motion utilities", () => {
  it("declares .hero-fade and .rule-draw", () => {
    expect(css).toContain(".hero-fade");
    expect(css).toContain(".rule-draw");
  });

  it("adds hero-fade and rule-draw keyframes (10 total — bloom-drift joins in round 19)", () => {
    expect(keyframes).toContain("hero-fade");
    expect(keyframes).toContain("rule-draw");
    expect(keyframes).toContain("bloom-drift");
    expect(keyframes.length).toBe(10);
  });

  it("rule-draw starts collapsed (scaleX(0)) and animates the gold rule", () => {
    const block = css.slice(css.indexOf("rule-draw"));
    expect(block).toContain("scaleX(0)");
    expect(block).toMatch(/rule-draw\s+0\.\d+s/);
  });
});

describe("reduced-motion coverage", () => {
  it("disables hero-fade and rule-draw under prefers-reduced-motion", () => {
    const reduceBlocks = css.match(
      /@media \(prefers-reduced-motion: reduce\)[\s\S]*?\n {2}\}/g,
    ) ?? [];
    const joined = reduceBlocks.join("\n");
    expect(joined).toContain("hero-fade");
    expect(joined).toContain("rule-draw");
  });

  it("rule-draw forces the drawn state (scaleX(1)) under reduced motion", () => {
    const reduceBlocks = css.match(
      /@media \(prefers-reduced-motion: reduce\)[\s\S]*?\n {2}\}/g,
    ) ?? [];
    const joined = reduceBlocks.join("\n");
    expect(/\.rule-draw[\s\S]*?scaleX\(1\)/.test(joined)).toBe(true);
  });
});

describe("token budget unchanged", () => {
  it("keeps 33 bsc-* colors + 2 shadows (docs-contract + SKILL §0 stay true)", () => {
    const colorCount = (css.match(/^\s*--color-bsc-/gm) ?? []).length;
    const shadowCount = (css.match(/^\s*--shadow-bsc/gm) ?? []).length;
    expect(colorCount).toBe(33);
    expect(shadowCount).toBe(2);
  });
});
