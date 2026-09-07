# Remediation Plan — Round 20 (2026-09-07)

> Executes `docs/code-review-audit-round20-2026-09-07.md` (HEAD `62eaa2d`).
> Method: TDD (Red → Green → Refactor) wherever a test seam exists; surgical
> diffs; no branch (work lands on `main` per task instruction); every step
> re-verified against the five-gate + built-artifact gate.
> Skills applied: `tdd` / `tdd-workflow` (red-green discipline),
> `code-review-checklist` (fix scope), `security-and-hardening` (header
> documentation), `verification-and-review-protocol` (ledger at the end).

## Pre-flight validation (plan ↔ codebase alignment)

Validated against the working tree before execution (all Verified):

- [x] `src/components/Timeline.tsx:49` contains `duration-[1100ms]` (byte-verified; the earlier `duration-s]` read was an output-channel ANSI-stripping artifact — see audit W1). **No Timeline change needed; Cycle 1 removed from this plan.**
- [x] `index.html:13` pins the broken `og:image`; `src/head-metadata-contract.test.ts` pins the same string (red-test seam for H4).
- [x] `src/index.css:1` is `@import "tailwindcss";` (no `source()`); `dist/index.html` exists from the audit build (garbage markers present — red seam for H1).
- [x] `e2e/enhancements-round19.spec.ts:74` presses Tab with no visibility wait (deflake seam M1).
- [x] `e2e/navigation.spec.ts` title says "footer 10 links"; `src/data/nav.ts` `footerNav` has 11 entries (L1 seam).
- [x] `playwright.built.config.ts` comment cites `risen-christ.jesspete.shop` (L2 seam).
- [x] `package.json.allowScripts` + `pnpm-workspace.yaml allowBuilds: esbuild: false` coexist; build currently green (L3 seam).
- [x] Docs drift table (H2) re-confirmed against current files; `docs-contract` test currently green and pins: version 1.7.0, 19 route entries, 3 hooks, lucide-react 1.38.0 — none of these move during remediation.
- [x] No work touches `src/data/**` parish facts → `site.test.ts`, `content.test.ts`, `nav.test.ts` unaffected.
- [x] `design-language-contract.test.ts` / `token-integrity.test.ts` read `src/index.css` for tokens/utilities — the H1 `@import … source("./")` change does not alter tokens; both suites must stay green (checked after fix).

## ToDo (execution order; one commit per cycle)

### Cycle 1 — R20-H4 og:image → deployment host (code + contract, TDD)

- [ ] **RED:** update `src/head-metadata-contract.test.ts` og:image expectation to `https://blessed-sacrament-church.jesspete.shop/images/hero-church.jpg`. Expect fail.
- [ ] **GREEN:** `index.html` og:image → same URL. (`og:url`/`canonical` stay `https://bsc.org.sg/` — production-intent, documented decision in README Deployment.)
- [ ] Verify: `pnpm test` (head-metadata 7/7) + `pnpm build` (singlefile copies the head) green.
- [ ] **Commit:** `fix(seo): point og:image at the deploying host (round-20 H4)`

### Cycle 2 — R20-H1 Tailwind source scoping + regression guard (build, TDD)

- [ ] **RED:** create `src/css-source-contract.test.ts`:
  - source contract (always runs): `src/index.css` matches `/@import "tailwindcss" source\("\.\/"\);/`.
  - dist contract (only when `dist/index.html` exists; skip message "run pnpm build"): extracted CSS block (a) does not contain `font-newsreader`, (b) does not contain `--brand)`, (c) does not contain `bg-violet-600\/10`, (d) CSS block length ≤ 100,000 chars. Expect the source contract to fail.
- [ ] **GREEN:** `src/index.css:1` → `@import "tailwindcss" source("./");`.
- [ ] Rebuild `pnpm build`; record new dist size (expect ≈ 397 kB, CSS ≈ 54 kB); garbage markers absent (Verified via the new contract + manual rule-diff spot-check).
- [ ] Verify: `pnpm test` (incl. token-integrity 2/2 + design-language 12/12 unchanged) + `pnpm test:e2e` + `pnpm test:e2e:built` all green.
- [ ] **Commit:** `fix(build): scope Tailwind auto-content-detection to src/ — stops skills/ scanning (round-20 H1)`

### Cycle 3 — R20-M1 deflake round-19 focus-ring spec (test)

- [ ] Edit `e2e/enhancements-round19.spec.ts` focus test: after `gotoHash`, `await expect(page.locator(".skip-link")).toBeVisible();` before the Tab presses. No assertion weakened.
- [ ] Verify: full `pnpm test:e2e` ×3 consecutive greens (flake evidence).
- [ ] **Commit:** `test(e2e): wait for the skip link before keyboarding the focus-ring contract (round-20 M1)`

### Cycle 4 — R20-L1 + R20-L2 + R20-L3 hygiene

- [ ] `e2e/navigation.spec.ts`: rename "footer 10 links" title → 11 (assertion itself already expects 11 — verify before editing).
- [ ] `playwright.built.config.ts` comment: `risen-christ…` → `blessed-sacrament-church.jesspete.shop`.
- [ ] `package.json`: remove the dead `allowScripts` block (`pnpm-workspace.yaml allowBuilds` is the effective mechanism; build verified green with scripts blocked).
- [ ] Verify: `pnpm lint && pnpm typecheck && pnpm test && pnpm test:e2e && pnpm build` all green (tsconfig include covers package.json? — no, but pnpm typecheck reads it via vite config; run full gate anyway).
- [ ] **Commit:** `chore: round-20 hygiene — e2e title, built-config comment, dead allowScripts (L1–L3)`

### Cycle 5 — R20-H2 re-pin the four docs (docs)

- [ ] **AGENTS.md:** commands table — add `test:e2e:built` row + CSP-hash build step note; fix gate numbers (29 files/182 tests, 67 e2e, built 67); fix harness pin in Quirks (delete the stale 26/149 + 59 generations); structure tree — add `utils/categoryTone.ts` + missing test files, move `categoryTone` description from EventMeta; `public/` row — favicon.svg is the linked icon + `_headers`; index.html row — svg-file favicon + static.cloudflareinsights.com; Conventions "Data:" — 9 interfaces / 12 exports incl. `Sacrament`/`sacraments[6]`; index.css pins — 32 utilities / 10 keyframes incl. `bloom-drift`; Where-to-look-next — add round-20 docs; note deployment URL + host-header gap.
- [ ] **CLAUDE.md:** architecture/tree pins → 42+29+1 = 72 files, 29 files/182 tests, 11 pages, 19 entries/8 aliases/6 groups/15 anchors, primaryNav 7/footerNav 11, 32 utilities + 10 keyframes, version 1.7.0, build size re-measured, 10 spec files/67 tests, hours 6 keys, knownRoutePaths 18, favicon.svg, static.cloudflareinsights.com, e2e table incl. round-19 spec; build commands table — CSP injection + `test:e2e:built` verified rows.
- [ ] **README.md:** badge → 1.7.0; routing row/table → 19 entries incl. `/sacraments`+`/all-sacraments`; testing rows → 29/182 + 10 specs/67; file hierarchy → 72 files; site.ts mass keys (drop `secondCollection`/`monthly`); utils tree + categoryTone; drawer 17 links; sizes re-measured; Deployment — og:image host note + `_headers`-not-honored warning + redeploy provenance step.
- [ ] **SKILL.md:** §0 Volatile Facts Register — full re-pin (version, counts, sizes, routes, nav, drawer 17); §2/§3 harness + gate numbers; §4.3 bloom-drift fossil label removed; §5.2/§5.4/§5.5/§7 — replace pre-backport data layer with BSC current (priests 3, timeline 7 1954–Today, grounds damien-hall/garden, giving 6 with UEN T08CC1234A, images 7 keys, devotions 6, events 6); §8.2 focus ring gold-400; §8/§9/§10/§11/§12/§13/§14/§19/§20 counts and policy inversions; Appendix B — pin the live URL + post-remediation validation; Quick Reference Card — re-pin; remove unframed Toa Payoh fossils (§5.5, §7.1, App B smoke data).
- [ ] Extend `src/docs-contract.test.ts` cheaply: pin `test:e2e:built` script exists; pin `/sacraments` + `/all-sacraments` in App.tsx (already covered by 19-path count? — keep explicit for drift-safety); pin `.skip-link` wait exists in round-19 spec (string check).
- [ ] Verify: `pnpm test` (docs-contract 8→n green) + full gate.
- [ ] **Commit:** `docs: re-pin AGENTS/CLAUDE/README/SKILL to the remediated repo state (round-20 H2)`

### Cycle 6 — R20-H3 + R20-M2 + I1 (documentation-only; owner actions recorded)

- [ ] README Deployment + SKILL Appendix B: host does not honor `_headers` today; owner action list (Cloudflare headers set); redeploy-provenance checklist (rebuild → deploy → live↔dist diff → record hashes).
- [ ] **Commit:** `docs: record host-header owner action + redeploy provenance checklist (round-20 H3/M2)`

### Cycle 7 — Final gate + audit trail

- [ ] Full gate: `pnpm lint && pnpm typecheck && pnpm test && pnpm test:e2e && pnpm build && pnpm test:e2e:built` — all green, numbers recorded in the plan's validation section below.
- [ ] Write `docs/validation-round20-2026-09-07.md` (before/after evidence, ledger).
- [ ] Update AGENTS "Where to look next" + worklog.
- [ ] Commit series on `main`; push via `skills/how-to-git-push-using-ssh-wrapper/scripts/ssh_git_wrapper_v3.py` with the session SSH key.

## Success criteria

1. All 9 backlog items closed or explicitly handed to the owner (H3 redeploy/headers).
2. Five-gate + built gate green, twice consecutively for e2e (flake proof).
3. dist/index.html ≤ ~400 kB and contains zero known-garbage markers.
4. Zero stale pins in the four docs for every claim enumerated in the round-20 drift table (spot-checked via rg).
5. No new branch; no test weakened; every fix has a red→green or evidence trail.
