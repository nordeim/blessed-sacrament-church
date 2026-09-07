import { expect, test } from "@playwright/test";
import { existsSync, readFileSync, statSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

/**
 * Round-20 built-CSS contract (audit R20-H1, dist half).
 *
 * `skills/` is vendored + tracked by policy and quotes Tailwind syntax from
 * other projects. While the CSS import was unscoped, automatic content
 * detection emitted ~1,003 spurious utilities (~80 KB) into the inlined
 * build CSS — e.g. an arbitrary font-weight utility bound to a Newsreader
 * variable, a `(--brand)` variable background, and violet/indigo
 * backgrounds — none of which exist in `src/`.
 *
 * This spec reads `dist/index.html` from disk (no page needed) and fails if
 * any known garbage marker or a size regression reappears. It is the dist
 * half of `src/css-source-contract.test.ts` and lives in `e2e/` because a
 * guard inside `src/` would itself be scanned as a candidate source (the
 * self-defeating-guard trap).
 *
 * Runs only when `dist/index.html` exists (CI order: e2e precedes build;
 * run `pnpm build` first to materialize it — mirrors `test:e2e:built`).
 */
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const distPath = resolve(root, "dist/index.html");
const built = existsSync(distPath) && statSync(distPath).isFile();

const cssBlock = built
  ? (readFileSync(distPath, "utf8").match(/<style[^>]*>([\s\S]*?)<\/style>/)?.[1] ??
    "")
  : "";

// Markers exist ONLY in the vendored skills/ tree (verified round-20:
// zero hits in src/). Safe to spell literally here — e2e/ is outside the
// Tailwind scan scope (source("./")).
const GARBAGE_MARKERS = [
  "font-newsreader",
  "--brand)",
  "bg-violet-600/10",
  "bg-indigo-500/5",
];

test.describe("built CSS source contract (round-20 H1)", () => {
  test.skip(!built, "dist/index.html not built yet — run `pnpm build` first");

  test("inlines no skills/-scanned garbage utilities", () => {
    for (const marker of GARBAGE_MARKERS) {
      expect(cssBlock, `garbage marker leaked into build CSS: ${marker}`).not.toContain(
        marker,
      );
    }
  });

  test("keeps the inlined CSS lean (<= 100,000 chars)", () => {
    // Round-20 baseline after the fix: ~44 KB. Before the fix: ~135 KB.
    expect(cssBlock.length).toBeGreaterThan(0);
    expect(cssBlock.length).toBeLessThanOrEqual(100_000);
  });
});
