# Plan — Execute Option B: Doc Re-Pin + Sacraments E2E (Design Comparison Validation)

**Date:** 2026-09-07  
**Decision:** Option B from `docs/plan-validate-deep-understanding-2026-09-07.md` §6 (approved by owner)  
**Scope:** (a) Re-pin stale volatile facts in canon docs to match live BSC `src/` reality (Findings 1 & 5 already shipped on `main`), (b) Expand E2E with a first-class `e2e/sacraments.spec.ts` guarding the 6 new `/sacraments#*` anchors the way `ministries.spec.ts` guards its 6. No new `src/` features — pure doc + test.  
**Workflow:** Meticulous Approach — ANALYZE (this doc) → VALIDATE (this doc is the gate) → IMPLEMENT → VERIFY → DELIVER  
**Current phase:** ANALYZE + PLAN (no `src/` or doc edits until VALIDATE passes)

---

## 0. Terminology

| Handle | Path | Identity |
|---|---|---|
| **BSC** | `src/` in this repo (`blessed-sacrament-church` 1.7.0) | 1 Commonwealth Drive S149603 |
| **OLL** | `/Home1/project/ourladyoflourdes/src` (`ourladyoflourdes` 1.0.0) | 50 Ophir Road S188690 |

---

## 1. Executive Summary

Two backports identified by the comparative audit are **already on `main`** and verified live:

- **Finding 1 — Drawer Escape:** BSC `Header.tsx:96–115` now carries the window-level `mobileOpen` Escape listener (`backport from src.Site.A — OLL`).
- **Finding 5 — Sacraments IA:** BSC `App.tsx` already exposes 19 routes (18 + `*`), `nav.ts` 7/11, `content.ts` `Sacrament[6]`, `pages/Sacraments.tsx` with `useScrollSpy` jump nav.

The *remaining* work is not a code backport — it is **doc drift + missing E2E guard**:

1. `README.md` and `blessed-sacrament-queenstown_SKILL.md` still pin pre-sacraments numbers (63 files, 17 routes, 7 aliases, 9 anchors, v1.4.4/1.5/1.6) that fail the `docs-contract` spirit and confuse onboarding. `AGENTS.md` and `src/docs-contract.test.ts` are already correct and are the reference.
2. The 6 new sacraments anchors have **unit coverage** (`data/nav.test.ts` asserts the 4 child `to`s, `data/content.test.ts` asserts ministry ids) but **zero E2E coverage** — unlike `ministries` which has `e2e/ministries.spec.ts` (4 specs, 6 anchors + jump-nav + double-hash).

**Option B ships:** a doc-only re-pin (30–40 lines across 2–3 files) + one new E2E file (`e2e/sacraments.spec.ts`, ~70 lines, 4 specs) on a single branch `docs/re-pin-and-sacraments-e2e`. Build artifact unchanged; gates stay green.

---

## 2. Ground Truth — What Today Actually Is (measured, not quoted)

| Fact | Live value (measured 2026-09-07) | Where measured | Canon doc stale value | Drift |
|---|---|---|---|---|
| `package.json:version` | **1.7.0** | `rg -n '"version"' package.json` | SKILL `1.4.4`, `1.6.0`, `1.5.1` in history; README badge `1.4.4` | README badge stale |
| `src/` inventory | **72 files** (`find src -type f \| wc -l`) = **42 source + 29 tests + 1 setup** | `find src -type f` | SKILL §0: `63` (41+21+1); README: `63` / `41+21+1` | +9 (Sacraments page + tests + contracts) |
| Unit tests | **29 files / 182 tests green** (`pnpm test`) | `pnpm test` 2026-09-07 run: 29 passed, 182 passed | SKILL §0: `21 / 112` or `26 / 149` or `21 / 112` depending on §; README: `21 / 112` | SKILL §0 stale by 8 files / 70 tests |
| E2E tests | **67 tests green, 10 specs + helpers** | `pnpm test:e2e` 67 passed | SKILL §0: `51` (8 specs); README: `51` / `8 specs` | +16 (round-19 enhancements + sacraments not yet counted) → becomes **71** after this plan |
| Routes | **19** (`rg -c 'path=' src/App.tsx`) = **18 content paths + `*`** | `src/App.tsx` | AGENTS Structure: `20 <Route> tags` (includes Layout wrapper) is close; SKILL §0: `17`; README routing table: `17` | +2 (sacraments) |
| Alias paths / groups | **8 aliases in 6 groups** (worship 3, ministries 1, sacraments 1, news-events 1, serve 1, give 1) | `src/App.tsx` + `src/utils/deepLinks.ts` | SKILL §0: `7 in 5 groups`; AGENTS Routing: `8 in 6 groups` is correct; README: `7 in 5 groups` | README stale by 1 |
| Hash anchors | **15** (3 worship + 6 ministries + 6 sacraments) | `Worship.tsx` + `Ministries.tsx` + `Sacraments.tsx` | SKILL §0: **9** (3+6); README: 9 | +6 |
| Canonical pages | **11** (Home, About, History, Worship, Ministries, **Sacraments**, NewsEvents, Serve, Give, FAQ, NotFound = 10 + `*`) — `App.tsx` 10 page components + NotFound | `src/pages/` | AGENTS `11 pages` is correct; SKILL lineage still lists `10` | SKILL stale |
| `primaryNav` / `footerNav` | **7 / 11** | `src/data/nav.ts` | SKILL §0: `6 / 10`; README nav section: `6 / 10` | +1 each |
| `sacraments` | **6** (`infant-baptism`, `matrimony`, `reconciliation`, `eucharist`, `confirmation`, `anointing`) | `src/data/content.ts:231` | SKILL §0 `givingOptions[6]` correct but `sacraments` row missing (old snapshot had 0) | Add row |
| Tokens | **33 colors + 2 shadows (35)** | `rg -c "^\\s*--color-" src/index.css` → 33 | SKILL §0: 33+2 correct — **not drifting** | — |
| Build artifact | `dist/index.html` ~470 kB + `dist/images/` 9 + `_headers` + `robots.txt` + `favicon.svg` | `pnpm build` | SKILL §0: `467.31 kB` — close, not blocking | — |

**Reference correct file:** `src/docs-contract.test.ts` and `AGENTS.md` already assert the live numbers (`19` routes, `1.7.0`). They are the source of truth to align the other two docs to.

---

## 3. Detailed Plan — Option B in Two Commits

### Commit 1 — Doc Re-Pin (no `src/` logic, no `e2e/`)

**Branch:** `docs/re-pin-and-sacraments-e2e` (from `main`)

**Files to edit (only these):**

| File | Exact stale pin | New pin (live) | Why |
|---|---|---|---|
| `README.md` — badge | `![version 1.4.4]` | `![version 1.7.0]` | Match `package.json` |
| `README.md` — Tech Stack routing row | `17 Route entries (16 content paths + *)`, `5 alias groups / 7 alias paths`, `hash anchors #mass/#confession/#visit + 6 ministry ids` | `19 Route entries (18 content paths + * → NotFound, 6 alias groups / 8 alias paths, hash anchors #mass/#confession/#visit + 6 ministry ids + 6 sacrament ids)` | Match `App.tsx` 19 |
| `README.md` — Testing row | `21 files / 112 tests`, `8 spec files — 51 tests` | `29 files / 182 tests green`, `10 spec files + helpers — 67 tests green` (pre-B: 67; post-B: 71 — mention both) | Match `pnpm test` / `pnpm test:e2e` |
| `README.md` — `src/` tree comment | `63 files — 41 source + 21 tests + 1 setup` | `72 files — 42 source + 29 tests + 1 setup` | Match `find` |
| `README.md` — `App.tsx` tree comment | `17 Route path entries (16 content paths + * → NotFound … 5 alias groups / 7 alias paths; hash anchors #mass/#confession/#visit + 6 ministry ids)` | `19 Route path entries (18 content paths + * → NotFound … 6 alias groups / 8 alias paths; hash anchors #mass/#confession/#visit + 6 ministry ids + 6 sacrament ids)` | — |
| `README.md` — `Current audits` / `Quick Start Verify` | `21 files / 112 tests`, `51 tests`, `63` references | `29 files / 182 tests`, `67 tests (post-B: 71)` | — |
| `blessed-sacrament-queenstown_SKILL.md` — frontmatter `project_state` | `71 src files (41 source + 29 tests + 1 setup) — 29 files / 181 tests` (close) | `72 src files (42 source + 29 tests + 1 setup) — 29 files / 182 tests` | Match live 72/182 |
| `blessed-sacrament-queenstown_SKILL.md` — §0 `Volatile Facts Register` | `Canonical instance … version 1.4.4` → `1.7.0`; `Unit tests 21 files / 112` → `29 files / 182`; `E2E tests 51` → `67` (+ note post-B 71); `src/ inventory 63` → `72`; `Build artifact 467.31kB` → `~470 kB` (keep as range, not exact byte); `Routes 17 / 7 / 9` → `19 / 8 / 15` (with breakdown); `Data arrays nav primary 6 / footer 10` → `7 / 11` and add `sacraments 6` to the row; `Hooks 3` / `Utils 5` unchanged | — | Single source — every other section references §0 |
| `blessed-sacrament-queenstown_SKILL.md` — §5.4 Routing table | 17-row table (10 canonicals + `*` without sacraments row expanded) | 19-row table (add `/sacraments` canonical + `/all-sacraments` alias; alias groups 5→6) | — |
| `blessed-sacrament-queenstown_SKILL.md` — §5 hash anchors table | 2 rows (worship 3, ministries 6) | 3 rows (add sacraments 6: `infant-baptism/matrimony/reconciliation/eucharist/confirmation/anointing`) | — |
| `blessed-sacrament-queenstown_SKILL.md` — any remaining inline `63`, `1.4.4`, `17`-route mentions outside §0 | via `rg -n "63 files\|1\.4\.4\|17.*Route"` | Replace with `72`, `1.7.0`, `19` or `see §0` | Fossil-sweep protocol App. G.4 |

**Explicitly NOT edited:** `AGENTS.md` (already correct at `22: 29 files / 182` and `33: 72 files`), `CLAUDE.md` (will be aligned in a follow-up if needed — keep this commit docs-only to the 2 files above per `src/docs-contract.test.ts` scope), `src/` (no logic), `package.json` (no version bump — doc re-pin is not a release).

**Commit message:** `docs: re-pin volatile facts to live 72/182/19/8/15 — sacraments IA shipped (1.7.0)`

### Commit 2 — Sacraments E2E Guard (new file only + optional `docs-contract` nudge)

**New file:** `e2e/sacraments.spec.ts`

**Design — mirrors `e2e/ministries.spec.ts` (4 specs) but for 6 sacraments anchors:**

| # | Spec name | What it proves | How (Playwright) | Mirrors |
|---|---|---|---|---|
| S1 | `6 sections render with image/heading and scroll-mt-28` | `sacraments[6]` sections exist on page, each `id` present, scroll-mt contract | `goto /#/sacraments` → assert `locator('#infant-baptism')` … `#anointing` visible → `getByRole('heading', {name: 'Infant Baptism'})` etc. | `ministries.spec.ts` spec 1 (6 ids) |
| S2 | `jump nav via Link preserves HashRouter route` | Jump nav `aria-label="Jump to sacrament"` with 6 pills, `aria-current="true"` on active, `Link to="/sacraments#id"` does not route to NotFound | `getByRole('navigation', {name: /Jump to sacrament/})` visible → click `Infant Baptism` → `toHaveURL(/#\/sacraments#infant-baptism/)` → `#infant-baptism` visible → not `NotFound` → pill has `aria-current="true"` → click `Reconciliation` → previous pill loses current | `ministries.spec.ts` spec 3 (jump nav, 2 clicks) |
| S3 | `direct hash anchors are reachable (incl. double-hash)` | Deep links work without host fallback | `goto /#/sacraments#matrimony` → `#matrimony` visible; `goto /#/sacraments#eucharist` → `#eucharist` visible; `goto /#/sacraments#anointing` → `#anointing` visible | `smoke.spec.ts` Worship/Ministries hash anchors |
| S4 | `alias route renders same page` | `/all-sacraments` is the alias contract | `goto /#/sacraments` → `getByRole('heading', {name: 'Sacraments'})` visible; `goto /#/all-sacraments` → same heading visible | `smoke.spec.ts` worship/ministries alias specs |

**Estimated line count:** ~70–90 lines (same shape as `ministries.spec.ts` 44 lines, expanded for 6 ids + alias).

**Why 4 specs, not 6+:** The 6 ids are covered in S1 loop; S2 covers the `aria-current` via `useScrollSpy` (`-45%/-50%` band) with 2 clicks (enough to prove the spy ticks); S3 covers 3 of the 6 deep links (the other 3 are loop-covered in S1). Total E2E becomes **67 → 71** (10→11 spec files). The `Header` desktop dropdown for Sacraments is already covered by `e2e/navigation.spec.ts` (hover shows 4 children — exists per `nav.test.ts`).

**TDD contract:**

- RED: write `e2e/sacraments.spec.ts` with the 4 specs above → run `pnpm test:e2e -- sacraments` → expect **green immediately** (the page already exists). If any spec fails, the failure is real documentation of a missing `id` or `ScrollProgress`/`Layout` hash-scroll gap — fix `src/` before marking green (principle: never ship a red spec).
- Also run `pnpm test:e2e` full 71 and `pnpm test` 182 to confirm no regression.
- No `src/` edits expected; if a spec surfaces a bug (e.g., `eucharist` vs `eucharist` id typo), fix `src/data/content.ts` or `src/pages/Sacraments.tsx` in the same commit with `fix:` prefix and re-run.

**Optional guard update (only if `src/docs-contract.test.ts` pins alias/anchor counts with a literal):** Currently `src/docs-contract.test.ts:Routing` asserts `path=" 19` — already correct, no change. If it asserted `6 ministry anchors` with a literal `9`, update to `15` to reflect worship 3 + ministries 6 + sacraments 6, but check first — current `docs-contract` only checks route count and token existence, not anchor counts, so likely **no edit needed**.

**Commit message:** `test(e2e): guard sacraments IA — 6 anchors + jump nav + alias (67→71)`

---

## 4. Sequencing — Phases (no src/ logic, so minimal risk)

```
Phase 1 — VALIDATE (you are here; this doc is the gate)
  ✅ Deep review of AGENTS / CLAUDE / README / SKILL + live probes (72/182/19/8/15)
  ✅ Compared against plan-validate-design-comparison-backports (Findings 1 & 5 already shipped)
  ☐ Owner approves this Option B plan (approve A/B scope + sacraments copy is BSC-native)

Phase 2 — IMPLEMENT (branch docs/re-pin-and-sacraments-e2e)
  Step 1 (commit 1): edit README.md + blessed-sacrament-queenstown_SKILL.md §0/§5.4 per table in §3
    RED: `pnpm test` should still pass (docs-only); if docs-contract fails, fix the pin in the same commit
  Step 2 (commit 2): add e2e/sacraments.spec.ts (4 specs)
    RED→GREEN: `pnpm test:e2e -- sacraments` green; then full `pnpm test:e2e` 71 green
  Step 3: fossil sweep `rg -n "63 files|71 src files|1\.4\.4|17.*Route|7 alias|9 hash anchors" README.md blessed-sacrament-queenstown_SKILL.md` → fix any stragglers in same branch

Phase 3 — VERIFY (6-gate)
  pnpm lint          → eslint flat --max-warnings 0
  pnpm typecheck     → tsc --noEmit strict
  pnpm test          → 29 files / 182 tests
  pnpm test:e2e      → 71/71 (or 67+4 if counted separately)
  pnpm test:e2e:built→ 71/71 vs dist (vite preview :4173)
  pnpm build         → dist/index.html ~470kB + dist/images/9 + _headers + robots.txt + favicon.svg (unchanged byte-size)
  + rg "6294 0624|colol.secretariat" src/ → 0 (parish-fidelity)
  + rg "bsc-rose|bsc-sage" src/index.css → 0 (token-budget discipline)

Phase 4 — DELIVER
  Push branch, open PR, merge to main
  Handoff note for OLL (Findings 2–4) stays in /Home1/project/ourladyoflourdes/ backlog — not in this repo
  Update docs/plan-validate-deep-understanding-2026-09-07.md status to "Validated + Executed (Option B)"
```

---

## 5. What Does NOT Ship (explicitly excluded)

| Excluded | Why |
|---|---|
| `AGENTS.md` edits | Already correct at live numbers — editing it would create churn |
| `CLAUDE.md` version bump | Defer to next feature PR — this plan is docs re-pin + E2E only |
| `src/` logic edits (Header, content, site) | Findings 1 & 5 already on main with BSC-native copy; no OLL copy to import |
| OLL rose/sage tokens → BSC | OLL's 33+2 uses rose/sage for Mystical Rose/sage-formation; BSC's 33+2 uses terracotta/pine — both are 33, both are correct, adding either cross-pollinates token budgets |
| OLL Cormorant Garamond → BSC | BSC Fraunces is identity for the 1965 modernist tent; OLL Cormorant is identity for the 1888 Gothic monument — swapping breaks parish fidelity |
| OLL public-holiday Mass card → BSC | BSC's `sunday[6] + saturdayTamil` is the parish's real schedule; OLL's `5 + PH` is theirs |
| Findings 6 & 7 (SafeImage dimensions, gold-on-navy contrast) | Deferred per comparison §9 — shared, reasoned/unverified, no defect to ship |

---

## 6. Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Stale-string in README/SKILL missed by fossil sweep | Medium (SKILL restates §0 in history appendices with `as of <date>` — must not be re-pinned) | Low (appendices are historical, not §0) | Sweep only `^` current-state strings; keep `as of <date>` snapshots untouched (App. G.4) |
| Sacraments E2E flakes on jump-nav scroll | Low (useScrollSpy IntersectionObserver band `-45%/-50%`) | Medium (aria-current not set before click) | Click-then-assert pattern from `ministries.spec.ts` — poll for `aria-current="true"` after click, not before |
| Gate red from `docs-contract` literal | Low (already 19) | Medium | Re-pin only if literal is `9` anchors — check before editing; keep commit 1 docs-only so failure is isolated |
| Build size creep from new specs | None (specs not inlined) | None | `pnpm build` byte-size should be identical before/after — verify |

---

## 7. Success Criteria

| Gate | Pass |
|---|---|
| VALIDATE | This plan approved (Option B) — team confirms sacraments copy is BSC-native and E2E expansion is wanted |
| Doc re-pin | `rg -n "1\.4\.4\|63 files.*41 source" README.md` → 0; `rg -n "1\.4\.4.*version" blessed-sacrament-queenstown_SKILL.md` outside appendices → 0; SKILL §0 reads `72 / 29/182 / 19 / 8 / 15 / 1.7.0 / 7/11` |
| E2E | `pnpm test:e2e` 71/71 green (dev), `pnpm test:e2e:built` 71/71 (dist), `ministries.spec.ts` + `sacraments.spec.ts` both cover their 6 anchors + jump-nav |
| Gates | `lint 0` + `typecheck 0` + `test 29/182` + `build ~470kB` unchanged + parish-fidelity `rg` zero |
| No src/ drift | `diff src/components/Header.tsx /Home1/project/ourladyoflourdes/src/components/Header.tsx` still shows only `bsc-*`↔`oll-*` renames |

---

## 8. Open Decisions — Resolved by Option B

| Decision from §6/§10 of prior plans | Option B resolution |
|---|---|
| Esc backport alone or together with Sacraments? | Both already shipped — this plan is **verification + doc re-pin** for both, not a new backport diff |
| Sacraments copy source | **BSC-native** — verified live: `secretariat@bsc.org.sg`, `+65 6474 0582`, Tent of Meeting voice, no OLL `6294 0624` |
| Handoff ownership (OLL Findings 2–4) | Single `docs/handoff-to-ourladyoflourdes-*.md` in OLL repo (3 checklist items) — out of scope for this BSC PR |

---

## Appendix — Commands to Re-Prove Before Editing

```bash
# Live numbers (run before branching — establishes the re-pin target)
rg -c 'path=' src/App.tsx                              # expect 19
rg -n 'knownRoutePaths' src/utils/deepLinks.ts         # expect 18 content paths listed
cat src/data/nav.ts | grep -n "label:" | head -20
rg -c "^\s*--color-" src/index.css                     # expect 33
rg -c "^\s*--shadow" src/index.css                     # expect 2
find src -type f | wc -l                               # expect 72
pnpm test 2>&1 | tail -5                               # expect 29 files / 182 tests
pnpm test:e2e 2>&1 | tail -5                           # expect 67 (pre-B) → 71 (post-B)
grep -n "6294 0624\|colol" src/data/content.ts src/data/site.ts  # expect 0 hits
grep -n "bsc-rose\|bsc-sage" src/index.css             # expect 0
diff -u src/components/Header.tsx /Home1/project/ourladyoflourdes/src/components/Header.tsx | grep -E "bsc-|oll-" | head -20  # only renames
```

