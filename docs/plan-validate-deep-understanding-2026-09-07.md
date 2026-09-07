# Plan — Validate Deep Understanding Against Codebase (Blessed Sacrament Church)

**Date:** 2026-09-07  
**Scope:** Meticulous validation of the four canon docs (`AGENTS.md`, `CLAUDE.md`, `README.md`, `blessed-sacrament-queenstown_SKILL.md`) + `docs/plan-validate-design-comparison-backports-2026-09-07.md` against live source truth in `src/` (BSC) with cross-reference to `../ourladyoflourdes/src` (OLL) for backport context.  
**Workflow:** Meticulous Approach — ANALYZE (this doc) → VALIDATE (owner checkpoint) → IMPLEMENT (verification harness) → VERIFY → DELIVER  
**Current phase:** ANALYZE + PLAN (gate for VALIDATE before any doc or `src/` edit)

---

## 0. Handle Contract — No Single-Letter Ambiguity

| Handle | Path | Identity |
|---|---|---|
| **BSC** | `src/` in this repo (`package.json:name == blessed-sacrament-church`, v1.7.0) | Church of the Blessed Sacrament, 1 Commonwealth Drive S149603, SS.CC since 1958, Tent of Meeting 1965 |
| **OLL** | `/Home1/project/ourladyoflourdes/src` (reference repo, `ourladyoflourdes` v1.0.0) | Church of Our Lady of Lourdes, 50 Ophir Road S188690 |

The prior `src.Site.A` symlink referenced in `plan-validate-design-comparison-backports` does **not exist** as a symlink on this filesystem (`ls -la src.Site.A` → no such file). The authoritative OLL path is the absolute sibling path above. Every validation command below uses this absolute path to avoid mis-routing.

---

## 1. What Meticulous Review Established (Deep Understanding Summary)

### 1.1 Project Identity — Single Sentence

Static, single-file parish SPA for **Church of the Blessed Sacrament, Queenstown** — 1 Commonwealth Drive Singapore 149603 — Tent of Meeting (folded blue roof, Y. Gordon Dowsett, blessed 8 May 1965 by Abp Michel Olçomendy, conserved 2005, TOMR $9.4m 2019–2023), served by SS.CC since 1958, feast Corpus Christi (Sunday after Trinity), mission "A Household of Faith, Hope & Love." — no backend, no DB, no SSR.

### 1.2 Stack Lock (from AGENTS.md + package.json)

| Layer | Locked Version | Load-bearing fact |
|---|---|---|
| `react` / `react-dom` | 19.2.8 | hooks only, StrictMode |
| `vite` / `@vitejs/plugin-react` | 7.3.6 / 5.2.0 | Node ≥20, HMR |
| `tailwindcss` / `@tailwindcss/vite` | 4.3.3 / 4.1.17 | CSS-first `@theme` in `src/index.css`, no `tailwind.config.*` |
| `typescript` | 5.9.3 | `strict` + `noUnusedLocals/Params` + `isolatedModules` |
| `react-router-dom` | 7.18.2 | **HashRouter** is intentional (GH Pages/S3, no SPA fallback) |
| `vite-plugin-singlefile` | 2.3.3 | `dist/index.html` inlined + `dist/images/` publicDir copy |
| `eslint` flat | 9.39.5 | `typescript-eslint 8.28 + react-hooks 5.2 + react-refresh 0.4.19` |
| `vitest` / `jsdom` / `testing-library` | 3.2.6 / 26.1.0 / 16.2.0 | `src/test/setup.ts` harness |
| `playwright` | 1.55.1 chromium | `playwright.config.ts` + `playwright.built.config.ts` |
| `pnpm` | 11.0.0 | `packageManager` + `engines node>=20`, `--frozen-lockfile` |

All deps pinned exact, no `^`. Alias `@` → `src/` synced `vite.config.ts` ↔ `tsconfig.json`.

### 1.3 Architecture & Routing Contract

- `src/App.tsx` is sole route table. Current live file shows **19 Route tags** (18 content paths + `*` NotFound) — see §3.1 for drift vs canon docs.
- 6 canonical IA islands: `/` Home, `/about`, `/history`, `/worship` (with 3 aliases), `/ministries` (with 1 alias), `/sacraments` (with 1 alias), `/news-events` (with 1 alias), `/serve` (with 1 alias), `/give` (with 1 alias), `/faq`, `*` NotFound. BSC currently **adds `/sacraments` canonical** which the older canon docs (at v5.0.0) counted as 17 entries (16 + `*`) without sacraments — this is the first drift to re-pin.
- Hash anchors: `/worship` → `#mass/#confession/#visit`, `/ministries` → `#liturgical/#faith-formation/#pastoral-care/#family-life/#youth/#community`, `/sacraments` → `#infant-baptism/#matrimony/#reconciliation/#eucharist/#confirmation/#anointing` (6 anchors, not 4).
- `Layout.tsx` is double-hash aware (`split #` + `strip /` + `80ms setTimeout` + fallback `window.scrollTo`) and decouples `ScrollProgress` (fixed `h-[3px]` at `z-[60]`). `SkipLink` never rewrites hash.
- `Header.tsx` modal drawer: `role=dialog + aria-modal + tabIndex=-1 + focus trap + focus-restore + outside pointerdown ignoring hamburger + Escape`.

### 1.4 Data Layer (Single Source)

| File | Exports | Count (live) |
|---|---|---|
| `content.ts` | `lifeTimeline` | 7 (1954–Today) |
| | `grounds` | 3 (`main-church/damien-hall/garden`) |
| | `ministries` | 6 (`liturgical/faith-formation/pastoral-care/family-life/youth/community` → Community & Outreach) |
| | `sacraments` | **6** (`infant-baptism/matrimony/reconciliation/eucharist/confirmation/anointing`) — OLL has **4–7** depending on file version (see §3.1) |
| | `faqs` | 6 |
| | `upcomingEvents` | 6 (3 categories Parish/Devotion/Formation/Archdiocese) |
| | `givingOptions` | 6 (PayNow UEN T08CC1234A, Weekend Collection, Cheque, Cash, General Offering, Mass Offerings) |
| | `priests` | 3 (Johan Wongso/William van Soest/Odo Tiggeloven, SS.CC) |
| | `ppcMembers` | 6 (ex-officio + Chair/Vice/Secretary/Treasurer/Member) |
| | `serveRoles` | 4 |
| | `devotions` | 6 |
| `site.ts` | `site as const` | name, address 1 Commonwealth 149603, hours 6 keys, mass 9 keys (sunday×6), contact 6474 0582, transport EW19/EW20, UEN T08CC1234A, socials 3 (facebook/instagram/youtube) |
| `nav.ts` | `primaryNav` | **7** (Home, About{3}, Worship{3}, Ministries{3}, Sacraments{4}, News & Events, Serve) — canon docs pinned **6** |
| | `footerNav` | **11** (incl. Sacraments) — canon docs pinned **10** |

### 1.5 Design System

- `@theme` in `src/index.css`: **33 colors + 2 shadows (35 entries)** including `gold-700 #85641c` + `terracotta-600 #8f5038` + `pine-50/300/terracotta-50/300`. OLL is also 33+2 (Marian palette: `oll-blue-* + gold + rose-* + sage-*`).
- Display: BSC `Fraunces` vs OLL `Cormorant Garamond`; body both `Source Sans 3`.
- Utilities: SKILL v5.0.0 says **31 + 10 keyframes** (round-19 bloom-drift). BSC `src/index.css` and OLL `src/index.css` both confirm prefix family divergence only (`bsc-*` vs `oll-*`), motion package identical.
- Hooks: **3** (`useScrolled` default 12/Header 16, `useScrollProgress` rAF, `useScrollSpy`).
- Utils: **5** (`cn`, `massDay`, `monogram`, `deepLinks`, `categoryTone`).

### 1.6 Backport Comparison Artifact (the fifth doc)

`docs/design-comparison-blessed-sacrament-vs-our-lady-of-lourdes.md` distinguishes verified (diff/grep) from reasoned/unverified, ships §11 verification ledger. Its 7 findings:

1. BSC drawer Escape gap (~50 ms) — Medium, Verified
2. OLL missing clergy/PPC — Medium, Verified
3. OLL missing social — Medium, Verified
4. OLL missing /serve — Low-Medium, Verified
5. BSC missing /sacraments — Low, Verified
6. Both: images no dimensions/modern format — Low, Reasoned
7. Both: gold-on-navy contrast not pixel-measured — Informational, Unverified

`docs/plan-validate-design-comparison-backports-2026-09-07.md` already validated each finding with explicit grep/diff commands, handles, fit, and verdicts (1 = must backport BSC, 2–4 = NO-OP on BSC/handoff to OLL, 5 = VALID but SCOPED "pattern not copy" gated on parish copy, 6–7 = DEFER).

---

## 2. Planned Validation — Check for Alignment & Confirm Project Status

> Plan is read-only: every check is `rg`/`diff`/`cat`/`pnpm` against executable config. If a claim needs rendered pixels, mark Unverified and pay a browser pass.

### 2.1 Stack & Tooling Alignment

| # | Check | Command | Expected on BSC (green) | Confirmed in this session (pre-probe) |
|---|---|---|---|---|
| S1 | Package versions pinned exact | `rg -n '"\^"' package.json` → 0 hits + `cat pnpm-lock.yaml \| head` | 0 hits; `pnpm-lock.yaml` committed | — |
| S2 | Node/pnpm contract | `cat package.json \| grep -E 'packageManager\|engines'` | `pnpm@11.0.0`, `node>=20` | **Confirmed**: `1.7.0 / pnpm@11` |
| S3 | Alias sync | `rg -n "path.resolve.*src" vite.config.ts` vs `rg -n '"@/\*"' tsconfig.json` | Both `@ → src` | — |
| S4 | Tailwind v4 token source | `ls tailwind.config.*` → missing; `rg -n "@theme" src/index.css` → hit | No config file, tokens in `src/index.css` | — |
| S5 | Vite singlefile artifact | `cat vite.config.ts \| grep singlefile` + `ls dist/index.html dist/images/` after build | Inlined + `dist/images/` (9) | — |

### 2.2 Routing & IA Alignment (highest doc-drift risk)

| # | Check | Command | Expected (canon AGENTS/CLAUDE/SKILL v5.0.0) | Live probe result (must re-pin if mismatch) |
|---|---|---|---|---|
| R1 | Route count | `rg -c "path=" src/App.tsx` | **17** (16 + `*`) per SKILL §0 v5.0.0 | **19** (18 + `*`) — **DRIFT**: BSC added `/sacraments` canonical + `/all-sacraments` alias |
| R2 | Alias count | `rg -n "path=" src/App.tsx \| grep aliasOf` count via nav comment | **7** in 5 groups | **8** (adds `/all-sacraments`) — **DRIFT** |
| R3 | Hash anchors | `rg -n "id=\"mass\"\|id=\"confession\"\|id=\"visit\"" src/pages/Worship.tsx` + `rg -n "id=" src/pages/Ministries.tsx` + `rg -n "id=" src/pages/Sacraments.tsx` | 9 (3 worship + 6 ministries) | **15** (3 + 6 + 6 sacraments) — **DRIFT** |
| R4 | knownRoutePaths sync | `diff <(rg -n "path=\"/.*\"" src/App.tsx) <(cat src/utils/deepLinks.ts)` | No drift (guard `deepLinks.test.ts` 7 tests) | — probe shows `deepLinks.ts` lists `sacraments/all-sacraments` — **in sync** |
| R5 | Nav sync | `cat src/data/nav.ts \| grep -c "label:"` for primary vs footer | primary 6 / footer 10 per SKILL §0 | **primary 7 / footer 11** — **DRIFT** (Sacraments added) |
| R6 | HashRouter inviolate | `rg -n "BrowserRouter" src/` → 0 | 0 | — |
| R7 | Layout hash scroll | `rg -n "resolveAnchor\|split.*#\|scrollIntoView" src/components/Layout.tsx` | double-hash + 80ms | — |

**Action:** If VALIDATE approves, re-pin `AGENTS.md` route table, `README.md` table + diagram, `SKILL.md §0` routes/nav rows, and `SKILL.md §5.4` alias/anchor tables in the same commit (fossil-sweep protocol App. G.4).

### 2.3 Data Layer Alignment

| # | Check | Command | Expected | Live probe |
|---|---|---|---|---|
| D1 | priests | `rg -n "priests" src/data/content.ts` | 3 SS.CC | **Confirmed** 3 |
| D2 | ppcMembers | `rg -n "ppcMembers" src/data/content.ts` | 6 | **Confirmed** 6 |
| D3 | sacraments interface | `rg -n "interface Sacrament" src/data/content.ts` | absent per old SKILL §0 | **Present** — `Sacrament` interface + `sacraments[6]` |
| D4 | sacraments count | `rg -n "id: \"infant-baptism\"\|\"matrimony\"\|\"anointing\"\|\"eucharist\"\|\"confirmation\"" src/data/content.ts \| wc -l` | — | **6** BSC vs **4** OLL — BSC richer than OLL's 4 (OLL missing eucharist/confirmation) |
| D5 | serveRoles | `rg -n "serveRoles" src/data/content.ts` on both trees | BSC present, OLL absent per comparison | **Confirmed**: BSC 4, OLL 0 |
| D6 | socials | `rg -n "facebook\|instagram\|youtube" src/data/site.ts` | BSC 3, OLL 0 | **Confirmed**: BSC 3, OLL 0 |
| D7 | grounds/ministries images | `rg -n "imageFallback" src/data/content.ts \| wc -l` | all entries carry fallback | — |
| D8 | site constants | `rg -n "UEN\|1 Commonwealth\|6474 0582\|Corpus Christi" src/data/site.ts` | BSC parish fidelity | — |
| D9 | OLL divergence is intentional | `diff -u src/data/content.ts /Home1/project/ourladyoflourdes/src/data/content.ts \| head -80` | No accidental parish-fact leakage | — |

### 2.4 Design System Alignment

| # | Check | Command | Expected | Live probe |
|---|---|---|---|---|
| T1 | Token budget | `rg -c "^\s*--color-" src/index.css` + `rg -c "^\s*--shadow"` | 33 + 2 = 35 (SKILL §0) | **Confirmed**: BSC 33+2, OLL 33+2 |
| T2 | Token integrity guard | `cat src/token-integrity.test.ts \| head -20` | fails on undefined `bsc-*` class | — |
| T3 | Utilities/frames | `rg -c "\.rise-in\|\.menu-in\|\.drawer" src/index.css` | 31 + 10 per SKILL v5 §4.3 | — |
| T4 | Font split is identity | `rg -n "font-display" src/index.css` vs `cat index.html \| grep -i "google.*fonts"` | BSC Fraunces, OLL Cormorant Garamond | **Confirmed**: BSC Fraunces, OLL Cormorant Garamond |
| T5 | Motion contract | `rg -n "prefers-reduced-motion" src/index.css` | single block disabling all | **Confirmed** identical |
| T6 | Not backporting rose/sage to BSC | `rg -n "oll-rose\|oll-sage" src/index.css` on BSC → 0 | 0 on BSC | **Confirmed** 0 (correct) |

### 2.5 Component & Hook Alignment

| # | Check | Command | Expected | Live probe |
|---|---|---|---|---|
| C1 | Header Escape fix | `rg -n "window\.addEventListener.*keydown" src/components/Header.tsx` | **2** (desktopOpen + mobileOpen) | **Confirmed**: BSC **2**, OLL **2** — gap already closed (BSC has the window-level mobileOpen Esc block with comment "backport from src.Site.A — OLL") |
| C2 | Drawer rendered outside header | `rg -n "drawerRef.*fixed inset-y-0\|Outside.*header" src/components/Header.tsx` | Outside `<header>` (round-18 F1) | — probe shows `fixed inset-y-0 right-0 ...` sibling of header with comment |
| C3 | Sacraments page contract | `ls src/pages/Sacraments.tsx` + `rg -n "useScrollSpy\|Jump to sacrament" src/pages/Sacraments.tsx` | Present after backport | **Confirmed**: BSC Sacraments present, uses `useScrollSpy`, `aria-label="Jump to sacrament"`, `aria-current="true"` |
| C4 | Footer social wiring | `rg -n "SocialIcons" src/components/Footer.tsx` | BSC present, OLL absent | **Confirmed**: BSC imports + renders `<SocialIcons/>`, OLL does not |
| C5 | Hooks count | `ls src/hooks/` | 3 (`useScrolled`, `useScrollProgress`, `useScrollSpy`) | — |
| C6 | Utils count | `ls src/utils/` | 5 (`cn`, `massDay`, `monogram`, `deepLinks`, `categoryTone`) | — |

### 2.6 File Inventory & Test Gate

| # | Check | Command | Expected (SKILL v5.0.0 §0) | Live probe |
|---|---|---|---|---|
| F1 | `src/` file count | `find src -type f \| wc -l` | **63** (41 + 21 + 1) | **72** — drift (+9: Sacraments page + tests + contracts) |
| F2 | `src/**/*.test` count | `find src -type f -name "*.test.*" \| wc -l` | 21 | **29** — drift |
| F3 | `public/images` | `ls public/images \| wc -l` | 9 | — (expect 9) |
| F4 | Gates green | `pnpm lint && pnpm typecheck && pnpm test && pnpm test:e2e && pnpm build` | All green per AGENTS gate | **Confirmed**: lint 0, typecheck 0 (probed); full gate to run in VERIFY |
| F5 | `src.orig/` not in repo | `git log --all -- src.orig \| wc -l` | 0 (never committed) | — |
| F6 | `skills/` tracked | `git ls-files \| grep "skills/" \| wc -l` | >0 | — |
| F7 | No secret leakage | `rg -n "BEGIN.*PRIVATE KEY" src/` → 0 | 0 | — |

### 2.7 Parish-Fidelity Guard

| # | Check | Command | Expected |
|---|---|---|---|
| P1 | No Risen Christ facts in BSC `src/` | `rg -n "91 Toa Payoh\|T08CC4042G\|Grateful.*Faithful\|Velankanni\|HRSM" src/` → 0 | 0 |
| P2 | No OLL facts leaked into BSC | `rg -n "50 Ophir Road\|6294 0624\|colol\.secretariat" src/` → 0 | 0 |
| P3 | No BSC facts leaked into OLL (if OLL touched) | `rg -n "1 Commonwealth\|Damien Hall\|Tent of Meeting" /Home1/project/ourladyoflourdes/src` → depends (OLL should have its own Ophir narrative) | Separate check in OLL handoff |

### 2.8 Backport Findings — Re-Validation Ledger (from `plan-validate-design-comparison-backports` §4)

| Finding | Verdict in that plan | Re-validate command | Current status (pre-probe) |
|---|---|---|---|
| 1 — Drawer Escape gap | **VALID → BSC** (15-line window listener) | `diff src/components/Header.tsx` BSC vs OLL | **ALREADY SHIPPED** on BSC — both files now have identical window-level `mobileOpen` Esc block. Verdict becomes **Verify, not Implement**. |
| 5 — No Sacraments IA on BSC | **VALID but SCOPED** ("pattern not copy", gated on parish copy) | `grep sacraments src/App.tsx` | **ALREADY SHIPPED** on BSC — canonical `/sacraments` + alias `/all-sacraments` + `Sacraments.tsx` 6 entries + nav 7/11. Must audit that copy is BSC-native (check phone `6474 0582`, email `secretariat@bsc.org.sg`, no `6294 0624`). Pre-probe shows BSC details use `+65 6474 0582` / `secretariat@bsc.org.sg` — **pass**. |
| 2 — OLL clergy/PPC gap | **NO-OP on BSC** (handoff to OLL) | `grep priests /Home1/project/ourladyoflourdes/src/data/content.ts` → 0 | **Confirmed** gap on OLL — no priests/ppc interfaces |
| 3 — OLL social gap | **NO-OP on BSC** | `grep facebook /Home1/project/ourladyoflourdes/src/data/site.ts` → 0 | **Confirmed** gap on OLL |
| 4 — OLL /serve gap | **NO-OP on BSC** | `ls /Home1/project/ourladyoflourdes/src/pages/Serve.tsx` → missing | **Confirmed** gap on OLL |
| 6 — Images no dimensions | **DEFER** | `rg "width\|height" src/components/SafeImage.tsx` → 0 on both | **Confirmed** shared, identical impl |
| 7 — Gold-on-navy contrast | **DEFER** | Unverified → needs browser | **Stays deferred** |

---

## 3. What the Live Probes Already Reveal (pre-VERIFY summary)

**Two "must backport" items from the comparison are already on `main`:**

- **Finding 1 (Escape):** BSC `Header.tsx:96–115` now carries the exact window-level `mobileOpen` Esc effect, with comment explicitly citing `backport from src.Site.A — OLL` and the 50 ms setTimeout gap. OLL's version (same lines) is identical modulo `bsc-*` ↔ `oll-*` renames. **No further `src/` diff is needed** — this item moves to *verification only* (assert the E2E `mobile-navigation.spec.ts` covers the no-wait Escape path).
- **Finding 5 (Sacraments):** BSC `App.tsx` grows 17 → 19 routes, `nav.ts` 6→7 primary / 10→11 footer, `content.ts` gains `Sacrament` interface + `sacraments[6]` with BSC-native copy (checked: `6474 0582`, `secretariat@bsc.org.sg`, `reconciliation` before/after Mass times — no OLL `6294 0624` / Tamil-specific phrasing). `pages/Sacraments.tsx` mirrors OLL's `useScrollSpy` jump-nav pattern but with `bsc-*` tokens and BSC voice ("Tent of Meeting", "blue tent"). **No further backport is needed** — this item also moves to *doc re-pin + verification only*.

**Doc drift is now the primary misalignment, not missing features:**

| Doc claim (pre-backport snapshot) | Live reality | Impact |
|---|---|---|
| SKILL §0 v5.0.0: `src 63 (41+21+1)` | `72` (41→? + 29 tests) | All docs that pin file/test counts are stale |
| SKILL §0 / AGENTS: routes 17 (16+`*`), 7 aliases, 9 anchors | routes **19** (18+`*`), **8** aliases, **15** anchors (adds 6 sacrament anchors) | `AGENTS.md`, `README.md`, `SKILL.md §0/§5.4` re-pin required |
| AGENTS: `primaryNav[7]`? actually says 7 but SKILL §0 says 6 — already inconsistent | live `primaryNav` **7**, `footerNav` **11** | fix inter-doc inconsistency at §0 |
| AGENTS: `pnpm test 29 files / 182 tests` vs SKILL §0: `21 / 112` | live `find ... *.test.*` **29** (matches AGENTS) but SKILL §0 stale | reconcile to single §0 source |
| Package version: `1.4.4` (SKILL) vs `1.7.0` (live `package.json`) | **1.7.0** | re-pin |

**Remaining true gaps (handoff, not BSC `src/` diff):** OLL still lacks `priests/ppcMembers` (§2.3 D1–D2), `facebook/instagram/youtube` in `site.ts`, `SocialIcons.tsx`, and `pages/Serve.tsx` + `serveRoles` — per §2.8 these are OLL-side backlog items, correctly **not** backported into BSC.

---

## 4. Validation Methodology — How Alignment Will Be Proven (before any doc/`src/` edit)

| Step | Command | Proves |
|---|---|---|
| Header token-rename isolation | `diff -u src/components/Header.tsx /Home1/project/ourladyoflourdes/src/components/Header.tsx \| grep -E "^[+-].*bsc-\|^[+-].*oll-"` | Only renames differ except the now-identical Esc blocks |
| BSC already has Esc fix | `rg -n "Escape.*mobileOpen\|backport from src.Site.A" src/components/Header.tsx` → hit | Finding 1 is shipped, not missing |
| BSC already has Sacraments | `rg -n "sacraments\|Sacraments" src/App.tsx src/data/nav.ts` → hits; `ls src/pages/Sacraments.tsx` → present | Finding 5 is shipped |
| BSC copy is parish-native | `rg -n "6474 0582\|secretariat@bsc" src/data/content.ts \| wc -l` ≥ 3 and `rg -n "6294 0624\|colol" src/data/content.ts` → 0 | No OLL phone/email leaked |
| Route drift measurement | `rg -n "path=" src/App.tsx \| wc -l` (→ 19) vs canon doc 17 | Doc re-pin scope §2.2 |
| Nav drift | `rg -n "label:" src/data/nav.ts \| grep -c "primaryNav"` etc. | §2.2 R5 |
| Token budget unchanged | `rg -c "^\s*--color-" src/index.css` on both trees (BSC 33, OLL 33) | Rose/sage is OLL extension, not BSC gap |
| SafeImage zero-width | `rg -n "width\|height\|picture\|srcset" src/components/SafeImage.tsx` → 0 | Shared CLS risk identical |
| Live hosts — optional browser pass | `agent-browser open https://blessed-sacrament-church.jesspete.shop/ … 390×844` check drawer geometry + hash anchors + console | Settles Unverified #7 without asserting defect |
| Gate | `pnpm lint && pnpm typecheck && pnpm test && pnpm test:e2e && pnpm build` | Green baseline before doc re-pin |

---

## 5. Risks, Mitigations & Parish-Fidelity Constraints

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Over-counting "backport still needed" when it is already shipped | High if plan is read without the live probes in §3 | Medium — would create a duplicate diff | Re-validate with the §4 commands before opening a branch; treat §3 as the updated ground truth |
| Token-budget drift (adding rose/sage to BSC "for completeness") | Low | Medium — `token-integrity` guard fails | Preserve `bsc-*` 33+2; document why OLL's rose/sage stays on OLL (§2.4 T6) |
| Drawer invariants regress during doc re-pin | Low (no `src/` diff needed) | High if someone re-edits Header | Verification-only: assert Tab/Shift+Tab trap + focus restore + outside-tap still pass in `Header.test.tsx` / `mobile-navigation.spec.ts` |
| Hash anchor collision (`/sacraments#reconciliation` vs `/worship#confession`) | Low | Medium | Already resolved: distinct ids `reconciliation` (sacrament page) vs `confession` (worship page) — verify `rg -n "id=\"reconciliation\"\|id=\"confession\"" src/pages/*.tsx` |
| Doc-only drift creates CI red | Medium (if `docs-contract` asserts old counts) | Medium | Run `pnpm test` after re-pin — `docs-contract` / `public-contract` / `token-integrity` will point to stale numbers; fix them in the same commit |

---

## 6. Sequencing — What Happens in Which Phase

```
Phase 1 — VALIDATE (you are here; no src/ or doc edits yet)
  ✅ Read AGENTS.md / CLAUDE.md / README.md / SKILL.md v5.0.0 + index.css + App.tsx + Header.tsx + data/* on BSC and OLL
  ✅ Prove each backport finding with diff/grep (captured in §2.8 + §3)
  ✅ Surface that Findings 1 & 5 are already on BSC main (pre-probe) — re-scope from "must implement" to "must verify + re-pin"
  ☐ Owner reviews this plan (VALIDATE checkpoint)
       → decision A: approve doc re-pin + verification pass only (no src/ backport diff — recommended)
       → decision B: approve A + expand Sacraments test surface (add E2E sacraments hash-anchor specs)
       → decision C: request different scope (e.g., promote deferred Finding 6 to a SafeImage aspect-ratio spike on both trees)

Phase 2 — IMPLEMENT (only after explicit approval of §2.2/§2.6 drift scope)
  Branch: docs/re-pin-sacraments-escape-validation
  1. Re-pin §0 single source in blessed-sacrament-queenstown_SKILL.md (63→72, 17→19 routes, 7→8 aliases, 9→15 anchors, 21→29 tests, v1.4.4→1.7.0)
  2. Cascade: AGENTS.md routing table + Structure tree, README.md table + diagram, SKILL.md §5.4 alias/anchor tables
  3. Add/extend verification contracts (if B): Header window-Esc no-wait spec, Sacraments jump-nav E2E (4–6 hash-anchor cases incl. double-hash)
  4. Fossil-sweep: rg stale numbers (`rg -n "17.*Route\|63 files\|1\.4\.4" AGENTS.md README.md`) — fix in same commit

Phase 3 — VERIFY
  pnpm lint && pnpm typecheck && pnpm test && pnpm test:e2e && pnpm test:e2e:built && pnpm build
  + rg "6294 0624" zero on BSC (parish-fidelity guard)
  + diff src/components/Header.tsx vs OLL header for token-only divergence
  + optional agent-browser pass (drawer 390×844, hash anchors, console clean)

Phase 4 — DELIVER
  Handoff note to OLL maintainer (the §2.8 rows 2–4 backlog) — either as a linked issue or as docs/handoff-to-ourladyoflourdes-*.md
  No src/ changes on OLL in this repo — OLL work happens in /Home1/project/ourladyoflourdes/ as a separate commit
```

---

## 7. Success Criteria

| Gate | Pass condition |
|---|---|
| VALIDATE | This plan is reviewed; team explicitly chooses A, B, or C for Phase 2 scope |
| Gates | `pnpm lint 0` + `pnpm typecheck 0` + `pnpm test` (whatever count is pinned in §0 — must be green) + `pnpm test:e2e` green + `pnpm test:e2e:built` green + `pnpm build` (`dist/index.html` boots under hash-pinned CSP) |
| Docs | `AGENTS.md` + `README.md` + `SKILL.md §0` agree on routes/aliases/anchors/file-counts/version (docs-contract + public-contract green) |
| Parish fidelity | No OLL phone/email/rouse phrasing appears in BSC `src/` (`rg` guards in §2.7 green) |
| Backport truth | Findings 1 & 5 are marked **Verified Shipped** with evidence in §3; Findings 2–4 are **Handoff to OLL**; Findings 6–7 stay **Deferred** |
| Build | `dist/index.html` size measured before/after doc re-pin (`ls -lh dist/index.html`) — doc-only diff should not change it |

---

## 8. Open Decisions for VALIDATE (do not edit docs/src until answered)

1. **Confirm the "already shipped" re-scoping:** Findings 1 (Escape) and 5 (Sacraments) are on `main` with BSC-native copy. Should Phase 2 be **doc re-pin + verification only** (decision A) rather than a new `src/` backport?
2. **Sacraments test surface:** If A, should we still add a `sacraments` hash-anchor E2E suite (decision B) to guard the 6 new `#anchors` the way `ministries` guards its 6?
3. **OLL handoff ownership:** Does the OLL maintainer want the three deferred items (clergy/PPC, social, /serve) as one handoff doc or three? Preference: one `docs/handoff-to-ourladyoflourdes-*.md` with three checklist items and direct file paths + BSC precedent to copy.

---

## Appendix — File Map Used

```
BSC (this repo)                           OLL (reference)
src/App.tsx                               /Home1/project/ourladyoflourdes/src/App.tsx
src/components/Header.tsx                 /Home1/project/ourladyoflourdes/src/components/Header.tsx
src/components/Footer.tsx                 /Home1/project/ourladyoflourdes/src/components/Footer.tsx
src/components/SafeImage.tsx              /Home1/project/ourladyoflourdes/src/components/SafeImage.tsx
src/components/SocialIcons.tsx            (missing on OLL — correctly)
src/data/content.ts                       /Home1/project/ourladyoflourdes/src/data/content.ts
src/data/site.ts                          /Home1/project/ourladyoflourdes/src/data/site.ts
src/data/nav.ts                           /Home1/project/ourladyoflourdes/src/data/nav.ts
src/index.css                             /Home1/project/ourladyoflourdes/src/index.css
src/pages/Sacraments.tsx                  /Home1/project/ourladyoflourdes/src/pages/Sacraments.tsx
src/pages/Serve.tsx                       /Home1/project/ourladyoflourdes/src/pages/Serve.tsx (missing on OLL — correctly)
src/utils/deepLinks.ts                    /Home1/project/ourladyoflourdes/src/utils/deepLinks.ts
e2e/mobile-navigation.spec.ts             (OLL has fewer specs — comparison §11)
docs/design-comparison-*.md               (artifact under validation)
docs/plan-validate-design-comparison-backports-*.md (prior plan — this doc supersedes its "must implement" scope with the updated live probes in §3)
```

