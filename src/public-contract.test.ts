import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

/**
 * Round-16 public-contract guard (audit H1 + M2):
 * - public/_headers must exist and pin the five host-level security headers
 *   (round-13 H1: the live host serves none; meta CSP cannot express them).
 * - public/robots.txt must exist (round-13 artifact lost in this snapshot).
 * - index.html CSP must allowlist the Cloudflare Insights beacon the host
 *   injects (round-16 M2: "script-src … violates CSP" console error on every
 *   live pageview). SKILL §0 documents this CSP as the contract.
 */
const root = resolve(__dirname, "..");
const read = (p: string) => readFileSync(resolve(root, p), "utf8");

describe("public/ deployment artifacts", () => {
  it("ships _headers with the five security headers", () => {
    expect(existsSync(resolve(root, "public/_headers"))).toBe(true);
    const headers = read("public/_headers");
    for (const directive of [
      "Strict-Transport-Security",
      "X-Content-Type-Options",
      "X-Frame-Options",
      "Referrer-Policy",
      "Permissions-Policy",
    ]) {
      expect(headers).toContain(directive);
    }
  });

  it("ships robots.txt", () => {
    expect(existsSync(resolve(root, "public/robots.txt"))).toBe(true);
    expect(read("public/robots.txt")).toContain("User-agent");
  });
});

describe("index.html CSP cloudflare-insights contract", () => {
  const html = read("index.html");
  const csp = html.match(
    /<meta http-equiv="Content-Security-Policy" content="([^"]*)"/,
  )?.[1];

  it("declares a CSP meta tag", () => {
    expect(csp).toBeTruthy();
  });

  it("allowlists the Cloudflare Insights beacon script", () => {
    expect(csp).toContain("script-src");
    expect(csp).toContain("https://static.cloudflareinsights.com");
  });

  it("allowlists the real Cloudflare Insights connect origin (round-19, audit F6)", () => {
    expect(csp).toContain("connect-src");
    // The beacon is served from static.cloudflareinsights.com — the bare
    // domain entry was dead configuration (round-19 audit R2-F6).
    expect(csp).toContain("connect-src 'self' https://static.cloudflareinsights.com");
    expect(csp).not.toContain("https://cloudflareinsights.com");
  });

  it("keeps the existing img-src and frame-src contract", () => {
    expect(csp).toContain("img-src 'self' data: blob:");
    expect(csp).toContain("frame-src https://www.google.com");
  });
});

describe("favicon identity contract (round-19, audit R2-F7 / R1-F7)", () => {
  it("ships a purpose-drawn SVG favicon", () => {
    expect(existsSync(resolve(root, "public/favicon.svg"))).toBe(true);
    const svg = read("public/favicon.svg");
    expect(svg).toContain("<svg");
    // sapphire field + gold mark — the site's own token hexes
    expect(svg).toContain("#0a1122");
    expect(svg).toContain("#d4ad42");
  });

  it("references the SVG from index.html and retires the emoji data-URI", () => {
    const html = read("index.html");
    expect(html).toContain('<link rel="icon" type="image/svg+xml" href="/favicon.svg"');
    expect(html).not.toContain("⛪");
  });
});
