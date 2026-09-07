import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

/**
 * Round-20 CSS source contract (audit R20-H1): Tailwind v4's automatic
 * content detection scans every non-gitignored file under its detection
 * root. `skills/` is tracked by policy (2,300+ files of vendored skill
 * docs quoting Tailwind syntax from OTHER projects), so a bare
 * `@import "tailwindcss";` emitted ~1,003 spurious utilities (~80 KB)
 * into the single-file build. Scoping the import to `src/` fixes it.
 *
 * SOURCE contract (this file, always runs): the import must carry the
 * `source("./")` scope. The built-artifact half of this contract (garbage
 * markers + size ceiling) lives in `e2e/css-source.spec.ts` — it cannot
 * live here: this file is inside the scan scope it guards, and embedding
 * marker strings — even concatenated ones — re-emitted the utilities the
 * guard forbids (the self-defeating-guard trap, documented in the
 * round-20 audit).
 */
const root = resolve(__dirname, "..");

describe("CSS source contract (round-20 H1)", () => {
  it("scopes Tailwind auto-content-detection to src/", () => {
    const css = readFileSync(resolve(root, "src/index.css"), "utf8");
    expect(css.trimStart().startsWith('@import "tailwindcss"')).toBe(true);
    expect(css).toContain('@import "tailwindcss" source("./");');
  });
});
