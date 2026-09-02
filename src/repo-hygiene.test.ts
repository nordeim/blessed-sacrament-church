import { describe, expect, it } from "vitest";
import { execSync } from "node:child_process";
import { resolve } from "node:path";

/**
 * Round-6 contract (docs/code-review-audit-round6-2026-08-31.md C1): no secret
 * material may be tracked in git. `docs/ssh-key.txt` was committed in 0be0fe8
 * despite the .gitignore entry — ignore rules do not untrack files. This guard
 * fails if the key (or any key-like artifact) ever re-enters the index.
 * Rotation of the leaked key remains a repo-owner action (history keeps it).
 */
const root = resolve(__dirname, "..");

function trackedFiles(): string[] {
  const out = execSync("git ls-files", {
    cwd: root,
    encoding: "utf8",
    maxBuffer: 16 * 1024 * 1024,
  });
  return out.split("\n").filter(Boolean);
}

describe("no secret material is tracked", () => {
  it("does not track docs/ssh-key.txt (round-6 C1)", () => {
    const tracked = trackedFiles();
    expect(tracked).not.toContain("docs/ssh-key.txt");
  });

  it("tracks no key-like files anywhere (pem/key/id_rsa patterns)", () => {
    const suspicious = trackedFiles().filter((f) =>
      /(^|\/)(id_rsa|id_ed25519|id_ecdsa)(\..*)?$|\.pem$|\.key$|ssh-key/i.test(f),
    );
    expect(suspicious).toEqual([]);
  });

  // Round-19 guard (external audit R2-F5): file NAMES are not enough — key
  // MATERIAL can hide in any tracked text file. Scan executable surface
  // (source, config, scripts, data) for PEM private-key headers. docs/ and
  // skills/ prose is exempt: several audit reports and the vendored skill
  // deliberately QUOTE the pattern as documentation (rounds 3/6/16), and a
  // quoted header is not executable secret material — the name-based guard
  // above still rejects any key-shaped FILE anywhere in the tree.
  it("tracks no private-key material in executable surface (audit R2-F5)", () => {
    const offenders: string[] = [];
    for (const file of trackedFiles()) {
      if (/^(docs|skills|e2e)\//.test(file) || /\.md$|\.txt$/.test(file)) continue;
      if (/\.(png|jpg|jpeg|gif|webp|ico|woff2?|ttf|zip|pdf)$/i.test(file)) continue;
      let text: string;
      try {
        text = execSync(`git show "HEAD:${file.replace(/"/g, '\\"')}" 2>/dev/null`, {
          cwd: root,
          encoding: "utf8",
          maxBuffer: 4 * 1024 * 1024,
        });
      } catch {
        continue; // binary or unreadable — name guard above covers these
      }
      if (/-----BEGIN [A-Z ]*PRIVATE KEY-----/.test(text)) offenders.push(file);
    }
    expect(offenders).toEqual([]);
  });
});

describe("no reference copies are tracked", () => {
  // Round-12 guard (audit F-9): the src.orig/ reference copy shipped tracked
  // in git (64 files) even though .gitignore listed it — ignore rules do not
  // untrack, the exact lesson of round-6 C1. Pruned 2026-08-31; this fails if
  // it (or any src.orig path) ever re-enters the index.
  it("does not track the src.orig/ reference copy (audit F-9)", () => {
    const tracked = trackedFiles();
    const leftovers = tracked.filter((f) => f === "src.orig" || f.startsWith("src.orig/"));
    expect(leftovers).toEqual([]);
  });
});

describe("no tracked file matches a .gitignore rule (round-13 M5)", () => {
  // Lesson L14 (round-12 F-9): adding a path to .gitignore does not untrack
  // it. `package-lock.json`, `test-results/.last-run.json` and `docs/*.zip`
  // shipped tracked despite ignore rules. `git check-ignore` fails closed:
  // every tracked file must either be not-ignored or explicitly whitelisted
  // with a leading `!` rule.
  it("intersection of git ls-files and git check-ignore is empty", () => {
    const tracked = trackedFiles();
    // Batch through check-ignore (verbose+non-matching+no-index: without
    // --no-index git never reports tracked files as ignored, which is exactly
    // the blind spot being guarded). git may exit 1 when nothing matches —
    // capture stdout either way.
    let out = "";
    try {
      out = execSync("git check-ignore --stdin --verbose --non-matching --no-index", {
        cwd: root,
        encoding: "utf8",
        input: `${tracked.join("\n")}\n`,
        maxBuffer: 16 * 1024 * 1024,
      });
    } catch (err) {
      out = (err as { stdout?: string }).stdout ?? "";
    }
    // Ignored lines are `<source>:<line>:<pattern>\t<path>`; non-ignored are
    // `::\t<path>`. A tracked file must never appear with a real pattern.
    const violations = out
      .split("\n")
      .filter(Boolean)
      .filter((line) => !line.startsWith("::\t"))
      .map((line) => line.slice(line.indexOf("\t") + 1));
    expect(violations.sort()).toEqual([]);
  });
});
