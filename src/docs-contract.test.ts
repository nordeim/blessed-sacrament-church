import { describe, expect, it } from "vitest";
import { execSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, resolve } from "node:path";

/**
 * Docs-contract guard — pins code invariants the 4 docs must agree with,
 * read straight from the repo. Current-state strings only; historical
 * appendix statements are out of scope.
 */

const root = resolve(__dirname, "..");
const read = (p: string) => readFileSync(join(root, p), "utf8");

function walk(dir: string, out: string[] = []): string[] {
  for (const entry of readdirSync(join(root, dir))) {
    const rel = `${dir}/${entry}`;
    const full = join(root, rel);
    if (statSync(full).isDirectory()) walk(rel, out);
    else out.push(rel);
  }
  return out;
}

describe("code invariants — src/ inventory", () => {
  const all = walk("src");
  const tests = all.filter((f) => /\.test\.(ts|tsx)$/.test(f));
  const sources = all.filter((f) => !/\.test\.(ts|tsx)$/.test(f) && !f.startsWith("src/test/"));
  const hooks = sources.filter((f) => f.startsWith("src/hooks/") && f.endsWith(".ts"));

  it("has source files, test files, and the harness", () => {
    expect(sources.length).toBeGreaterThan(0);
    expect(tests.length).toBeGreaterThan(0);
    expect(existsSync(join(root, "src/test/setup.ts"))).toBe(true);
  });

  it("has exactly 3 hooks including useScrollSpy", () => {
    expect(hooks.sort()).toEqual([
      "src/hooks/useScrollProgress.ts",
      "src/hooks/useScrollSpy.ts",
      "src/hooks/useScrolled.ts",
    ]);
  });
});

describe("code invariants — design tokens (src/index.css)", () => {
  const css = read("src/index.css");
  const colorCount = (css.match(/^\s*--color-bsc-/gm) ?? []).length;
  const shadowCount = (css.match(/^\s*--shadow-bsc/gm) ?? []).length;
  const keyframes = (css.match(/@keyframes ([a-z-]+)/g) ?? []).map((k) => k.replace("@keyframes ", ""));

  it("declares bsc-* colors + 2 shadows", () => {
    expect(colorCount).toBeGreaterThan(20);
    expect(shadowCount).toBe(2);
  });

  it("declares keyframes including rise-in and hero-ken-burns", () => {
    expect(keyframes).toContain("rise-in");
    expect(keyframes).toContain("hero-ken-burns");
    expect(keyframes).toContain("halo-pulse");
  });
});

describe("code invariants — routing", () => {
  it("App.tsx keeps the 17-entry route table", () => {
    const app = read("src/App.tsx");
    expect((app.match(/path="/g) ?? []).length).toBe(17);
    expect(app).toContain('path="*"');
  });
});

describe("code invariants — package", () => {
  it("pins package version and lucide-react", () => {
    const pkg = JSON.parse(read("package.json")) as {
      version: string;
      dependencies: Record<string, string>;
    };
    expect(pkg.version).toBe("1.4.4");
    expect(pkg.dependencies["lucide-react"]).toBe("1.38.0");
  });
});

describe("code invariants — repo layout", () => {
  it("does not track src.orig/ in git index", () => {
    const tracked = execSync("git ls-files src.orig", { cwd: root, encoding: "utf8" }).trim();
    expect(tracked).toBe("");
  });
});

describe("code invariants — footer social contract", () => {
  it("SocialIcons uses custom SVG icons (Facebook + Instagram)", () => {
    const icons = read("src/components/SocialIcons.tsx");
    expect(icons).toContain("FacebookIcon");
    expect(icons).toContain("InstagramIcon");
  });
});
