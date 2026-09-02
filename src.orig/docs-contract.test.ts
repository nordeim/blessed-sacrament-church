import { describe, expect, it } from "vitest";
import { execSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, resolve } from "node:path";

/**
 * Round-13 docs-contract guard (restores the round-6 drift guard class that
 * F1 did not carry forward — audit I4). Two layers:
 *
 * 1. Code invariants — the volatile facts every doc must agree with, read
 *    straight from the repo (files, tokens, hooks, routes, e2e inventory).
 * 2. Doc contracts — surgical string checks against AGENTS/CLAUDE/README/
 *    SKILL current-state claims, so the round-13 drift class (src.orig
 *    "present", skills "deleted", 0/0 harness, 25 colors, wrong footer
 *    socials, stale anchors) fails CI instead of shipping.
 *
 * Historical, as-of-labeled appendix statements are out of scope: these
 * checks pin only unambiguous current-state strings.
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

  it("has 40 source files, 17 test files (16 restored + this guard), and the harness", () => {
    // 16 test files were restored by F1; this docs-contract guard is the 17th.
    expect(sources).toHaveLength(40);
    expect(tests).toHaveLength(17);
    expect(existsSync(join(root, "src/test/setup.ts"))).toBe(true);
  });

  it("has exactly 3 hooks including the restored useScrollSpy", () => {
    expect(hooks.sort()).toEqual([
      "src/hooks/useScrollProgress.ts",
      "src/hooks/useScrollSpy.ts",
      "src/hooks/useScrolled.ts",
    ]);
  });
});

describe("code invariants — design tokens (src/index.css)", () => {
  const css = read("src/index.css");
  const colorCount = (css.match(/^\s*--color-shrine-/gm) ?? []).length;
  const shadowCount = (css.match(/^\s*--shadow-shrine/gm) ?? []).length;
  const keyframes = (css.match(/@keyframes ([a-z-]+)/g) ?? []).map((k) => k.replace("@keyframes ", ""));

  it("declares 26 colors + 2 shadows (including both AA text steps)", () => {
    expect(colorCount).toBe(26);
    expect(shadowCount).toBe(2);
    expect(css).toContain("--color-shrine-gold-700: #85601f");
    expect(css).toContain("--color-shrine-terracotta-600: #8f4c30");
  });

  it("declares the 9 keyframes", () => {
    expect(keyframes.sort()).toEqual(
      [
        "bloom-drift",
        "drawer-in",
        "drawer-item-in",
        "gold-rule-draw",
        "halo-pulse",
        "hero-ken-burns",
        "menu-in",
        "page-in",
        "rise-in",
      ].sort(),
    );
  });
});

describe("code invariants — round-15 motion contract", () => {
  /**
   * Round-15 visual/motion remediation (docs/design-enhancement-round15-2026-09-02.md):
   * page heroes drift, dark bands breathe, the history rail draws in,
   * and BackToTop enters with the lift idiom. Transform/opacity only —
   * the global prefers-reduced-motion neutralizer covers every effect.
   */
  it("carries the round-15 motion contract", () => {
    const pageHero = read("src/components/PageHero.tsx");
    expect(pageHero).toContain("hero-ken-burns");

    for (const page of ["src/pages/Home.tsx", "src/pages/NewsEvents.tsx", "src/pages/Give.tsx"]) {
      expect(read(page)).toContain("bloom-drift");
    }

    const timeline = read("src/components/Timeline.tsx");
    expect(timeline).toContain("scale-y-0");
    expect(timeline).toContain("origin-top");
    expect(timeline).toContain("Reveal");
    expect(timeline).toContain("prefers-reduced-motion");

    const backToTop = read("src/components/BackToTop.tsx");
    expect(backToTop).toContain("opacity,transform");
    expect(backToTop).toContain("translate-y-2");
  });
});

describe("code invariants — routing + data", () => {
  it("App.tsx keeps the 17-entry route table (16 paths + wildcard + Layout wrapper)", () => {
    const app = read("src/App.tsx");
    expect((app.match(/<Route\b/g) ?? []).length).toBe(18);
    expect((app.match(/path="/g) ?? []).length).toBe(17);
    expect(app).toContain('path="*"');
  });

  it("ministries keep `mandarin` as the sixth id (Language Communities)", () => {
    const content = read("src/data/content.ts");
    expect(content).toMatch(/id: "mandarin"/);
    expect(content).toContain("Language Communities");
  });
});

describe("code invariants — package + e2e", () => {
  it("pins package version 1.4.4 and lucide-react 1.38.0", () => {
    const pkg = JSON.parse(read("package.json")) as {
      version: string;
      dependencies: Record<string, string>;
      scripts: Record<string, string>;
    };
    expect(pkg.version).toBe("1.4.4");
    expect(pkg.dependencies["lucide-react"]).toBe("1.38.0");
    expect(pkg.scripts["test:e2e:built"]).toBeDefined();
  });

  it("keeps 8 e2e spec files totalling 51 tests", () => {
    const specs = walk("e2e").filter((f) => f.endsWith(".spec.ts"));
    expect(specs).toHaveLength(8);
    const total = specs.reduce(
      (sum, f) => sum + (read(f).match(/\b(test|it)\(/g) ?? []).length,
      0,
    );
    expect(total).toBe(51);
  });
});

describe("code invariants — repo layout", () => {
  it("does not ship src.orig/ (local-only port-session artifact, never committed)", () => {
    // src.orig may exist on disk locally (ignored) but must never be tracked —
    // .gitignore does not untrack, so check the index (mirrors repo-hygiene).
    const tracked = execSync("git ls-files src.orig", { cwd: root, encoding: "utf8" }).trim();
    expect(tracked).toBe("");
  });

  it("ships the vendored skills/ catalog, ignored by lint tooling", () => {
    expect(existsSync(join(root, "skills/skills-catalog.md"))).toBe(true);
    expect(read("eslint.config.js")).toContain('"skills"');
  });

  it("ships public/robots.txt (round-13 L7)", () => {
    expect(existsSync(join(root, "public/robots.txt"))).toBe(true);
  });
});

describe("code invariants — built artifact budget (round-14 M1 class)", () => {
  it("keeps the single-file bundle under the 420 kB budget when dist/ exists", () => {
    const dist = join(root, "dist/index.html");
    // Fresh clone / CI test phase runs before `pnpm build` — nothing to check.
    if (!existsSync(dist)) return;
    // Round-13/14 evidence (docs/validation-round14-addendum-2026-09-02.md §2):
    // the clean build is byte-stable at 391,565 B; deleting the
    // `@source not "../skills/**"` pin in src/index.css re-emits tree-shaken
    // utilities from the vendored skills/ scan and bloats the bundle to
    // 473,650 B (+82 kB). The 420 kB budget flags exactly that class while
    // tolerating legitimate content growth.
    expect(statSync(dist).size).toBeLessThan(420 * 1024);
  });
});

describe("code invariants — footer social contract", () => {
  it("Footer renders exactly 2 social icons and no whatsapp/ss.cc/parish-update links", () => {
    const footer = read("src/components/Footer.tsx");
    const socialBlock = footer.slice(footer.indexOf("const social = ["), footer.indexOf("] as const"));
    expect((socialBlock.match(/\{ href:/g) ?? []).length).toBe(2);
    expect(socialBlock).toContain("Facebook");
    expect(socialBlock).toContain("Instagram");
    expect(footer).not.toMatch(/site\.(whatsapp|sacredHearts|parishUpdates)/);
  });

  it("SocialIcons exports Facebook + Instagram only (no YouTube)", () => {
    const icons = read("src/components/SocialIcons.tsx");
    expect(icons).toContain("FacebookIcon");
    expect(icons).toContain("InstagramIcon");
    expect(icons).not.toContain("YouTube");
  });
});

describe("doc contracts — AGENTS.md", () => {
  const agents = () => read("AGENTS.md");

  it("describes the restored scrollspy, not the absent-hook state", () => {
    expect(agents()).toContain("useScrollSpy");
    expect(agents()).not.toContain("useScrollSpy ABSENT");
  });

  it("pins the green E2E state (no stale-Risen / CI-red claims)", () => {
    expect(agents()).not.toContain("STALE (assert Risen Christ copy)");
    expect(agents()).not.toContain("currently red on BSC");
  });

  it("uses the real ministry anchor (#mandarin) and real footer contract", () => {
    expect(agents()).not.toContain("#language-communities");
    expect(agents()).not.toContain("Facebook/Instagram/YouTube");
  });

  it("does not claim src.orig is present in the repo", () => {
    expect(agents()).not.toContain("PRESENT — 77 files");
    expect(agents()).not.toContain("src.orig/              # PRESENT");
  });
});

describe("doc contracts — CLAUDE.md / README.md / SKILL frontmatter", () => {
  it("CLAUDE.md pins the green gate (no 0/0 harness-missing claim)", () => {
    const claude = read("CLAUDE.md");
    expect(claude).toContain("17 files / 118 tests");
    expect(claude).not.toContain("0 files / 0 tests — harness missing");
  });

  it("README.md pins the green gates (unit + BSC E2E)", () => {
    const readme = read("README.md");
    expect(readme).toContain("17 files / 118 tests");
    expect(readme).not.toContain("stale Risen Christ copy will fail");
  });

  it("SKILL frontmatter pins the re-verified state", () => {
    const skill = read("blessed-sacrament-queenstown_SKILL.md");
    const frontmatter = skill.slice(0, skill.indexOf("---", 4));
    expect(frontmatter).toContain("project_state:");
    expect(frontmatter).not.toContain("0 tests");
    expect(frontmatter).toContain("17 files / 118 tests");
  });

  it("README/SKILL pin the restored scrollspy (no stale 2-hook claims — round-14 M2)", () => {
    const readme = read("README.md");
    const skill = read("blessed-sacrament-queenstown_SKILL.md");
    expect(readme).toContain("useScrollSpy");
    expect(readme).not.toContain("no useScrollSpy");
    expect(skill).toContain("Three hooks");
    expect(skill).not.toContain("NO `useScrollSpy`");
  });
});
