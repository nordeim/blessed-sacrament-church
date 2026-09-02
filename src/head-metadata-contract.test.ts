import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

/**
 * Round-19 head-metadata contract (external audit R2-F2, "Two Tents, One
 * Parish" — SEO & social metadata scored 6.0/10):
 * the served <head> must carry the full social-sharing set the queenstown
 * sibling already ships — og:image (+alt), twitter:card=summary_large_image,
 * twitter:title/description, a canonical link, theme-color matching
 * bsc-sapphire-950 (#0a1122), og:site_name and og:locale.
 * index.html is the contract surface: dev serves it verbatim and
 * vite-plugin-singlefile copies it into dist/index.html.
 */
const root = resolve(__dirname, "..");
const html = readFileSync(resolve(root, "index.html"), "utf8");

describe("round-19 social metadata (audit R2-F2)", () => {
  it("declares og:image pointing at the hero photograph", () => {
    const m = html.match(/<meta property="og:image" content="([^"]+)"/);
    expect(m?.[1]).toBe("https://bsc.org.sg/images/hero-church.jpg");
  });

  it("declares og:image:alt naming the folded blue tent roof", () => {
    const m = html.match(/<meta property="og:image:alt" content="([^"]+)"/);
    expect(m?.[1]).toBeTruthy();
    expect(m?.[1]).toMatch(/tent roof/i);
  });

  it("declares twitter:card summary_large_image", () => {
    expect(html).toContain(
      '<meta name="twitter:card" content="summary_large_image"',
    );
  });

  it("declares twitter:title and twitter:description", () => {
    expect(html).toContain('<meta name="twitter:title"');
    expect(html).toContain('<meta name="twitter:description"');
  });

  it("declares a canonical link to the production URL", () => {
    const m = html.match(/<link rel="canonical" href="([^"]+)"/);
    expect(m?.[1]).toBe("https://bsc.org.sg/");
  });

  it("declares theme-color matching bsc-sapphire-950", () => {
    expect(html).toContain('<meta name="theme-color" content="#0a1122"');
  });

  it("declares og:site_name and og:locale", () => {
    expect(html).toContain('<meta property="og:site_name"');
    expect(html).toContain('<meta property="og:locale" content="en_SG"');
  });
});
