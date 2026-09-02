import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

/**
 * Round-19 CSP build contract (external audit R2-F1 — "CSP weakened by
 * 'unsafe-inline'"): the shipped dist/index.html must authenticate its inline
 * scripts with sha256 hashes instead of 'unsafe-inline' in script-src.
 *
 * Mechanics: scripts/inject-csp-hashes.mjs runs after `vite build`, hashes
 * every inline <script> body in dist/index.html and rewrites the meta CSP.
 * Dev is untouched — source index.html keeps 'unsafe-inline' because Vite's
 * react-refresh preamble is an inline script that only exists in dev.
 * style-src keeps 'unsafe-inline' (documented rationale): React style
 * *attributes* (ScrollProgress width, Reveal/drawer animationDelay) are
 * governed by style-attr CSP and cannot be hash-pinned.
 */
const root = resolve(__dirname, "..");
const scriptPath = resolve(root, "scripts/inject-csp-hashes.mjs");

type Extract = (html: string) => string[];
type Rewrite = (html: string, hashes: string[]) => string;
type Hash = (body: string) => string;

const mod = (await import(scriptPath)) as {
  extractInlineScripts: Extract;
  rewriteScriptSrc: Rewrite;
  sha256: Hash;
};

const FIXTURE = `<!doctype html><html><head>
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' https://static.cloudflareinsights.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; connect-src 'self' https://static.cloudflareinsights.com;">
<script type="application/ld+json">{"@context":"https://schema.org","@type":"Church"}</script>
</head><body><div id="root"></div>
<script type="module">console.log("app")</script>
<script src="https://static.cloudflareinsights.com/beacon.js" defer></script>
</body></html>`;

describe("inject-csp-hashes pure helpers", () => {
  it("extracts only inline <script> bodies (module + JSON-LD), not external", () => {
    const bodies = mod.extractInlineScripts(FIXTURE);
    expect(bodies.length).toBe(2);
    expect(bodies[0]).toContain('@context');
    expect(bodies.some((b) => b.includes("console.log"))).toBe(true);
    expect(bodies.some((b) => b.includes("beacon.js"))).toBe(false);
  });

  it("sha256 produces deterministic base64 digests", () => {
    const h1 = mod.sha256("console.log(\"app\")");
    const h2 = mod.sha256("console.log(\"app\")");
    expect(h1).toBe(h2);
    expect(h1).toMatch(/^[A-Za-z0-9+/]{43}=$/);
  });

  it("rewrites script-src with hashes and drops 'unsafe-inline'", () => {
    const bodies = mod.extractInlineScripts(FIXTURE);
    const hashes = bodies.map(mod.sha256);
    const out = mod.rewriteScriptSrc(FIXTURE, hashes);
    const csp = out.match(/content="([^"]*)"/)?.[1] ?? "";
    expect(csp).toContain("'sha256-");
    expect(csp).not.toMatch(/script-src[^;]*'unsafe-inline'/);
    // external beacon origin and the untouched style-src contract survive
    expect(csp).toContain("https://static.cloudflareinsights.com");
    expect(csp).toMatch(/style-src 'self' 'unsafe-inline' https:\/\/fonts\.googleapis\.com/);
  });

  it("leaves the document outside the CSP meta untouched", () => {
    const out = mod.rewriteScriptSrc(FIXTURE, [mod.sha256("x")]);
    expect(out).toContain('<script type="module">console.log("app")</script>');
    expect(out).toContain('"@type":"Church"');
  });
});

describe("build wiring contract", () => {
  const pkg = JSON.parse(readFileSync(resolve(root, "package.json"), "utf8"));

  it("build runs the hash injection after vite build", () => {
    expect(pkg.scripts.build).toBe(
      "vite build && node scripts/inject-csp-hashes.mjs",
    );
  });

  it("source index.html keeps the dev-mode contract ('unsafe-inline' in script-src)", () => {
    const html = readFileSync(resolve(root, "index.html"), "utf8");
    expect(html).toMatch(/script-src 'self' 'unsafe-inline'/);
  });
});
