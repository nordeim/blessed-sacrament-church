# Plan — Validate Design Comparison & Backport Suggestions (Blessed Sacrament vs Our Lady of Lourdes)

**Date:** 2026-09-07  
**Scope:** Meticulous validation of `docs/design-comparison-blessed-sacrament-vs-our-lady-of-lourdes.md` backport recommendations against source truth in both codebases.  
**Workflow:** Meticulous Approach — ANALYZE → PLAN → VALIDATE → IMPLEMENT → VERIFY → DELIVER  
**Current phase:** ANALYZE + PLAN (this document is the gate for VALIDATE)

---

## 0. Terminology — Do Not Confuse the Two Label Systems

The comparison document (`design-comparison-*.md:9–14`) labels:

- **Doc Site A = BSC** (`nordeim/blessed-sacrament-church`, `bsc-*` tokens, Fraunces, 1 Commonwealth Drive)
- **Doc Site B = OLL** (`nordeim/ourladyoflourdes`, `oll-*` tokens, Cormorant Garamond, 50 Ophir Road)

The task prompt for *this* plan inverts the labels via the filesystem contract:

- **Instruction Site B = BSC** — the working tree under `src/` (this repo, `package.json:name == blessed-sacrament-church`)
- **Instruction Site A = OLL** — the reference tree under `src.Site.A -> ../ourladyoflourdes/src` (symlink, `src.Site.A/App.tsx` imports `Sacraments`)

Both label systems describe the same two codebases; only the letters are swapped. To avoid a whole class of mis-routing errors, **this plan abandons single-letter labels** and uses explicit handles everywhere:

| Handle | Repo / Path | Doc label | Instruction label | Canonical identity |
|---|---|---|---|---|
| **BSC** | `src/` (this repo) | Doc Site A | Instruction Site B | `Church of the Blessed Sacrament`, 1 Commonwealth Drive S149603 |
| **OLL** | `src.Site.A -> ../ourladyoflourdes/src` | Doc Site B | Instruction Site A | `Church of Our Lady of Lourdes`, 50 Ophir Road S188690 |

Where the comparison doc says "back-port OLL → BSC", that is **OLL (`src.Site.A`) → BSC (`src/`)** in this plan's terms — and the verification command is always `diff src/... src.Site.A/...` with direction made explicit.

Failure mode avoided: applying a "For OLL" recommendation to `src/` instead of to the symlink, or vice versa. Every validation step below names the target handle, not a letter.

---

## 1. Executive Summary

`design-comparison-blessed-sacrament-vs-our-lady-of-lourdes.md` is the strongest comparison artifact produced for this family to date: it (a) distinguishes verified (diff/grep) from reasoned/unverified (typographic judgement, no screenshot renderer) and (b) ships a proper verification ledger (§11). It identifies **one confirmed a11y regression on BSC, three content gaps on OLL, one missing IA destination on BSC, and two shared performance risks** — yielding 4–5 backport candidates.

The super-sensitive check is whether each candidate is *sound* (would survive a grounded audit), *fitting* (respects the parish identity and the `bsc-*` / `oll-*` design contract), and *non-breaking* (single-file deploy, HashRouter, strict TS, E2E green). Three candidates clear that bar cleanly; two need scoping; two should be deferred.

---

## 2. Ground Truth — What the Four Canon Docs Actually Establish (so the plan cannot drift)

This section is the prerequisite demanded by the task: a meticulous read of the four canon docs and the constraints they impose on any backport.

### 2.1 `AGENTS.md` — the 60-second cheat sheet

Seven aliases exist (7 alias paths in 5 canonical groups), HashRouter is load-bearing (`/#/worship#mass` without `404.html`), Tailwind v4 tokens live only in `src/index.css` `@theme` (33 colors incl. `gold-700 #85641c` + `terracotta-600 #8f5038` + `pine-50/300` + `terracotta-50/300` = 35 entries; `token-integrity.test.ts` guards them), and the pre-push gate is `lint && typecheck && test && test:e2e && build` with a sixth `test:e2e:built` check against `dist/`. The "Don't" list explicitly forbids switching HashRouter, introducing one-off hex colors, or re-introducing the wrong parish's facts.

**Implication for backports:** any new color must be a named `@theme` token; any new route must preserve the 7-alias contract and use `<Link to=...>` (never bare `href="#id"` under HashRouter); any new image must be local (`SafeImage` with `fallback`) — no ad-hoc CDN allowlist.

### 2.2 `CLAUDE.md` — the deep workflow

Restates the six-phase discipline (VALIDATE gate is non-negotiable), the single-file artifact (`dist/index.html` + `dist/images/`, `viteSingleFile` inlines JS+CSS, `publicDir` is copied), the strict TS flags (`noUnusedLocals/Params` will fail the gate on dead code), and the full component inventory (Header is a **modal drawer**: `role=dialog + aria-modal + focus-trap + focusRestore + outside pointerdown that ignores the hamburger + Escape`; `ScrollProgress` is decoupled from Header; `BackToTop` is hash-safe). Also codifies that `skills/` is tracked vendored content (do not import) and `src.orig/` is local-only (not in repo).

**Implication:** drawer changes must preserve the three close paths (`Escape`, outside tap, in-drawer link) and the two focus invariants (drawer gains focus on open via `setTimeout 50ms`; hamburger regains it on close). Adding a second `window:keydown` listener is allowed only if it is additive and cleaned up.

### 2.3 `README.md` — the visitor-facing contract

Re-pins the token table (cream `#f8f5ef`, parchment `#efe8d8`, ink `#1e2330`, sapphire `50…950` with `700 #1f366e`, `gold 700 #85641c`, `terracotta-600 #8f5038`), the routing table (17 entries = 16 content paths + `*`), the hash anchors (`worship → #mass/#confession/#visit`, `ministries → 6 ids ending in community/Community & Outreach`), and the historical lineage (Rother → St Joseph BT → St Mary of the Angels → Risen Christ (local-only `src.orig/`) → BSC).

**Implication:** a new `/sacraments` canonical with four anchors must join, not collide with, `worship#confession` (which is reconciliation-within-Worship vs. reconciliation-as-sacrament — different IA intent, different URL).

### 2.4 `blessed-sacrament-queenstown_SKILL.md` v5.0.0 — the complete distillate

Canonical §0 volatile-facts register is the single source; every mutable number elsewhere must reference §0. The register pins: `src 63 files (41+21+1)`, `public/images 9 files`, `build 467kB` (JS+CSS inlined, shadow `#85641c` gold-700 retained), `hooks 3` (`useScrolled/useScrollProgress/useScrollSpy`), `utils 5` (`cn/massDay/monogram/deepLinks/categoryTone`), `routes 17 entries / 7 alias paths / 9 hash anchors`, `colors 33 + shadows 2 = 35`, `CSP img-src 'self' data: blob:` only. The skill also codifies the fossil-sweep protocol (Appendix G.4) that any future doc must run.

**Implication:** any backport that changes file counts, route counts, token counts, or build size must re-pin §0 in the same commit — no drifting duplicates of the old numbers.

---

## 3. Shared Foundation — Verified vs. Unverified (why this comparison is more trustworthy than prior audits)

| Claim in §2 of the comparison | Verification in this plan | Status |
|---|---|---|
| "Every file exists on both sides with the same name and role; differences are token names / copy / a handful of structural additions" | `diff -rq src/ src.Site.A` shows identical inventory except: BSC `Serve.tsx` vs OLL `Sacraments.tsx`; BSC `SocialIcons.tsx` present, OLL absent; BSC `hooks/useScrollSpy` + utils present on both, etc. Structural add is exactly the 4 extra OLL routes. | **Verified** — justifies treating divergences as intentional, not two independent designs |
| "Identical CSP/build tooling (`inject-csp-hashes.mjs`)" | `ls scripts/inject-csp-hashes.mjs` present in BSC; grep `script-src` sha256-pin in BSC `dist/index.html` confirmed round-19. OLL repo carries the same script. | **Verified** |
| "Single `@media (prefers-reduced-motion: reduce)` block disables every custom animation" | `grep -n "prefers-reduced-motion" src/index.css` identical on both sides; both disable `hero-ken-burns`, `rise-in`, `menu-in`, `drawer-in`, `hero-fade`, `rule-draw`, `bloom-drift`. | **Verified** |
| "Layout claims corroborated from compiled Tailwind + JSX, not from rendered screenshots" | Doc states this explicitly in its banner + §11 ledger ("Not available — no headless-browser tool"). | **Acknowledged unverified** — plan therefore requires a browser pass before closing any visual claim (gold-on-navy contrast, layout shift) |

---

## 4. Backport Candidates — Line-by-Line Validation Plan

Each candidate is unpacked to: (a) exact location in both trees, (b) how to prove it (grep/diff/E2E), (c) fit for BSC parish identity, (d) backport verdict and TDD contract, (e) risks.

### 4.1 Finding 1 — Mobile drawer ignores Escape in the ~50 ms focus window (Doc §6, §9 #1)

**Doc claim:** BSC `Header.tsx` drawer closes on Escape *only* once the drawer has self-focused (`setTimeout 50ms`), so Esc in the gap is lost. OLL adds a window-level `keydown` listener that closes the drawer immediately.

**Source proof (already executed in this session):**

```bash
# BSC (src/) — only the desktop-dropdown listener exists
grep -n "window.addEventListener.*keydown" src/components/Header.tsx
# → one hit, guarded by `if (!desktopOpen) return` — no mobileOpen listener

# OLL (src.Site.A) — two listeners, second is the mobile fix
grep -n "window.addEventListener.*keydown" src.Site.A/components/Header.tsx
# → two hits: first for desktopOpen, second for mobileOpen with exact comment:
#   "Escape closes the mobile drawer from anywhere on the page. The drawer's
#    own handleDrawerKeyDown only fires once the drawer has self-focused
#    (a 50 ms setTimeout) … this window-level listener mirrors the desktopOpen
#    contract above."

diff -u src/components/Header.tsx src.Site.A/components/Header.tsx
# → the +15-line useEffect([mobileOpen]) is the only logic delta (rest is token renames bsc-* -> oll-*)
```

Header anatomy on BSC (`src/components/Header.tsx:1–160`): `mobileOpen` state, `drawerRef` (`role=dialog`, `aria-modal`, `tabIndex=-1`), `handleDrawerKeyDown` (Escape + Tab trap), `useEffect([mobileOpen])` that runs `setTimeout(() => drawerRef.current?.focus(), 50)` and locks `body.overflow`, `useEffect([mobileOpen])` outside-tap guard that ignores `hamburgerRef`, `useEffect([desktopOpen])` window Esc. **No `useEffect([mobileOpen])` window Esc** — the gap is real, not a reading error.

**Fit:** Pure a11y — identical pastoral tone on both parishes, no copy dependency, no token dependency. Falls under `CLAUDE.md` foundational principle "Accessibility is doctrinal (WCAG AAA intent)". The doc's severity Medium is appropriate (keyboard/assistive-tech users + E2E `navigation.spec.ts` at `390×844` explicitly opens the drawer then presses Escape without waiting for focus).

**Verdict: VALID backport → BSC (`src/`).**

- **Target:** `src/components/Header.tsx` in BSC.
- **Change:** add a second `useEffect([mobileOpen]) window:keydown` listener that closes `mobileOpen` + `desktopOpen` on `e.key === "Escape"`, mirroring OLL's exact contract. No other file changes.
- **Guard:** must not break the three existing close paths; must clean up on unmount / when `mobileOpen` flips false; must not interfere with the drawer-trap `handleDrawerKeyDown` (the window listener fires first; the drawer listener is a no-op once `mobileOpen` is false).
- **TDD contract:**
  - Unit: `src/components/Header.test.tsx` — add one test: open drawer (click hamburger), immediately dispatch `new KeyboardEvent("keydown", { key: "Escape" })` on `window` *without* awaiting drawer focus, assert `role="dialog"` gone and focus returns to the hamburger (`drawerWasOpenRef` path). OLL already carries the sibling test — copy its shape, retarget tokens.
  - E2E: extend `e2e/navigation.spec.ts` or `e2e/mobile-navigation.spec.ts` with one spec: at `390×844`, open drawer → press Escape without wait → assert drawer hidden (`toBeHidden`) and focus on `[aria-label="Close menu"]`/`[aria-label="Open menu"]`. This is the spec that surfaced the gap on OLL — replicate it on BSC.
  - No `AGENTS.md`/`README.md` token changes; re-pin no numbers.
- **Risk:** None. Additive, 15 lines, precedent exists verbatim in the sibling repo. Must use `window.addEventListener` (not `document`) to mirror OLL; both bubble Esc from the drawer, but `window` guarantees capture even if focus is on `body`.

### 4.2 Finding 5 — No dedicated Sacraments IA on BSC (Doc §7, §9 #5, §10 "For Blessed Sacrament #2")

**Doc claim:** OLL has a first-class `/sacraments` page (`src.Site.A/pages/Sacraments.tsx`, 7 `sacrament` entries with anchors `#infant-baptism`, `#matrimony`, `#reconciliation`, `#anointing` …), deep-linkable, task-oriented. BSC folds sacrament content into `/worship#confession` prose and `/faq` Q5 ("How do I arrange a baptism or wedding?").

**Source proof:**

```bash
# BSC routes — no sacraments
grep -rn "sacraments\|Sacraments" src/App.tsx src/data/nav.ts src/data/content.ts
# → zero hits

# OLL routes — canonical + 3 aliases ((App.tsx diff already captured)
grep -n "sacraments" ../ourladyoflourdes/src/App.tsx ../ourladyoflourdes/src/data/content.ts
# → App.tsx: canonical `/sacraments` + alias `/all-sacraments`
# → content.ts: `export const sacraments: Sacrament[]` 7 entries (infant-baptism … anointing)
# → nav.ts: primaryNav Sacraments dropdown (4 children, deep links), footerNav Sacraments

# BSC worship content that would be duplicated
grep -n "Baptism\|Matrimony\|Anointing\|Reconciliation" src/data/content.ts src/pages/Worship.tsx
# → faqs[4] Q5 answer: "contact parish office +65 6474 0582 / secretariat@bsc.org.sg at least six months…"
# → worship#confession: reconciliation after 8:30 etc. (but no sacramental theology copy)
```

**Fit — nuanced, parish-specific:**

- BSC *does* have sacramental need (SS.CC parish: baptism/marriage are asked via `secretariat@bsc.org.sg` + 6-month lead time per FAQ). The upside — deep-linkable `/sacraments#infant-baptism` that printed bulletins can cite — is real and matches the `aliasOf` pattern BSC already uses for `/mass-times` etc.
- Risk of **duplication vs. complement**: OLL's 7 sacraments are heavily Tamil/English specific (e.g., homebound communion). Blindly copying OLL's copy into BSC would import the wrong parish's phone number (`+65 6294 0624`), email (`colol.secretariat@catholic.org.sg`), and pastoral framing ("Two tongues" vs BSC's "A Household of Faith, Hope & Love." + "To be a vibrant Eucharistic community…").
- The BSC history also matters: the parish's *own* sacramental arc is the Tent of Meeting narrative (1965 cruciform plan, 2023 TOMR, Corpus Christi feast Sunday after Trinity). A sacraments page must feel continuous with that, not grafted.

**Verdict: VALID but SCOPED — backport the *pattern*, not the *copy* — and only after VALIDATE checkpoint approval.**

- **Target if approved:** `src/data/content.ts` (new `Sacrament` interface + `sacraments[]` 4–6 entries — infant baptism, matrimony, reconciliation, anointing — with BSC-specific details: `+65 6474 0582`, `secretariat@bsc.org.sg`, `UEN T08CC1234A` where relevant for stipends, 6-month marriage lead time already in FAQ), `src/pages/Sacraments.tsx` (copy OLL's `useScrollSpy`-driven jump nav pattern — `sticky top-[60px]`, `aria-label="Jump to sacrament"`, `aria-current="true"` pill, alternating cream/parchment bands — but with `bsc-*` tokens, Fraunces headings, and BSC voice), `src/App.tsx` (canonical `/sacraments` + one alias `/all-sacraments` to mirror OLL's alias discipline), `src/data/nav.ts` (add `Sacraments` `NavItem` with 3–4 children + description, add `Sacraments` to `footerNav` — BSC currently `footerNav 10`, becomes 11, re-pin §0), `src/data/site.ts` unchanged.
- **TDD contract (if scoped):**
  - Unit: `src/data/content.test.ts` — assert `sacraments` length 4–6, each entry has `id/title/summary/description/details[]`, ids match nav children.
  - Unit: `src/pages/Sacraments.test.tsx` — renders jump nav with `aria-label`, each `Link to="/sacraments#id"` lands on a section with matching `id`, `useScrollSpy` highlights the active pill (reuse OLL's test shape).
  - E2E: `e2e/sacraments.spec.ts` — goto `/sacraments`, assert hero + 4+ sections, click `#matrimony` pill → hash + scroll, reload with `#matrimony` → correct section visible. Also verify `/#/sacraments#anointing` via HashRouter double-hash path.
  - Docs: re-pin route counts — `AGENTS.md` 17→18 entries, 7→8 alias paths, 9→13 hash anchors (4 new); `README.md` routing table; `SKILL.md §0` routes row; `SKILL.md §5.4` alias table and anchor table.
- **Effort:** ~1 day, but **parish-copy dependency is the gate**: need the priest/BSC office to confirm sacrament preparation copy before this ships; otherwise the page reads as placeholder ministry prose. Do not ship with OLL's Tamil-specific details stashed under BSC's blue tent — that would be a parish-fidelity violation (`CLAUDE.md` rule 1).
- **Alternative if VALIDATE declines scope:** defer to a "Sacraments IA spike" (design the IA and draft copy in `docs/`, no `src/` change) rather than forcing a whole new canonical route now.

### 4.3 Findings 2–4 — OLL content gaps: clergy/PPC, social, /serve (Doc §7, §9 #2–#4)

These are **"For OLL" recommendations whose home is `src.Site.A` (the symlink), not `src/`**. The task prompt says to validate "against the respective codebase" — so the validation target is OLL, and **no `src/` change in this repo is the correct outcome** for these three:

| # | Gap | OLL location | BSC location (for contrast) | Verified |
|---|---|---|---|---|
| 2 | No named clergy/PPC roster | `src.Site.A/data/content.ts:1` — `grep priests\|ppc` returns only `sacraments` (OLL has zero `Priest`/`PpcMember` interfaces) | `src/data/content.ts:45,52,57,76` — `Priest` interface + 3 priests (Johan Wongso/William van Soest/Odo Tiggeloven) + 6 PPC | **Confirmed gap on OLL** |
| 3 | No social links/icons | `src.Site.A/data/site.ts` — no `facebook/instagram/youtube`; `src.Site.A/components/Footer.tsx` — no `SocialIcons` import, no `site.*` social refs | `src/data/site.ts:60–62` — 3 socials wired, `src/components/SocialIcons.tsx` exists, `Footer.tsx` renders `<SocialIcons />` | **Confirmed gap on OLL** |
| 4 | No dedicated volunteering page | `src.Site.A/pages/` listing: no `Serve.tsx`; `src.Site.A/data/content.ts` — no `serveRoles`; `src.Site.A/App.tsx` — no `/serve` route | `src/pages/Serve.tsx` + `src/data/content.ts:334 serveRoles[4]` + `/serve` canonical + `/volunteer` alias | **Confirmed gap on OLL** |

**Fit:** All three are additive on OLL and mesh with OLL's generous IAM (the parish *does* have clergy — Frs at Ophir Road — and *does* have public social handles that could be wired). The comparison doc is careful to say these are *not defects* but unpopulated schema slots — the `content.ts`/`site.ts` shape is shared and simply wasn't filled on the OLL side.

**Verdict for this repo (BSC): NO-OP — do not backport OLL's gaps into BSC.** BSC already has these destinations and they are correct; adding OLL's Tamil-specific clergy copy into BSC would be the wrong parish's facts. The actionable artifact for these three is a **handoff note to the OLL maintainer**, reproduced in §5.3 below, not a diff in `src/`.

If the team wants a symmetry check inside BSC, the *inverse* audit is: run the same grep on BSC for OLL strengths — BSC has no `/sacraments` (Finding 5) which is the mirror case; that is the only symmetry item worth a diff on this side, already covered in §4.2.

### 4.4 Findings 6 & 7 — Shared performance/a11y notes (Doc §8–§9 #6–#7)

**Finding 6 — "Images lack explicit dimensions / modern formats" (Low, Reasoned):**

- **Source proof — identical `SafeImage` on both sides:**

  ```tsx
  // src/components/SafeImage.tsx (BSC) vs src.Site.A/components/SafeImage.tsx (OLL)
  // — diff is zero (modulo file identity). Both render:
  <img src={current} alt={alt} loading={loading} fetchPriority={fetchPriority} … />
  // — no width/height, no <picture>, no srcset. All 9 BSC images and OLL's
  // 9 are plain .jpg via public/images/ -> dist/images/ (viteSingleFile copies
  // publicDir, does not inline).
  ```

  The risk (CLS on slow connections) is real but **unmeasured** — the doc explicitly withholds a Lighthouse/CLS number (§11 "Not available — no headless-browser tool") and marks this `Reasoned`. No regression test guards it today.

- **Fit vs. constraint:** Adding `width`/`height` (or an aspect-ratio wrapper) would remove the CLS risk but bakes intrinsic sizes into a design that currently uses `img-zoom` drift inside `group` cards — the wrapper must be chosen so as not to clip the zoom. AVIF/WebP with JPG fallback is sensible but doubles the `public/images/` asset count and requires a `<picture>` refactor of `SafeImage` — low urgency for a 9-image, single-file parish site; higher urgency if the image set grows.

- **Verdict: DEFER — shared, valid, but not a backport in the window-level-Esc sense.** Track as a post-sacraments item. If taken up, it must be a *shared* change applied to both trees (BSC `src/` + OLL `src.Site.A`) with the same `SafeImage` contract, and it needs an E2E CLS guard (e.g., assert `img.naturalWidth > 0` after load in `e2e/enhancements.spec.ts`).

**Finding 7 — "Small gold-on-navy text contrast not measured against rendered pixels" (Informational, Unverified):**

- Tokens involved: `bsc-sapphire-950 #0a1122` / `oll-blue-950 #0a1428` vs `gold-300 #dfc06a` / `gold-400 #d4ad42` at `text-xs` eyebrow/dropdown active states. Doc flags it explicitly Unverified, low risk (mid-value gold on near-black navy typically >7:1). No `axe` scan exists in either repo to settle it.

- **Verdict: DEFER to the next a11y sweep.** Add an automated `axe` or `wcag-contrast` check (the harness previously had `wcag-contrast.test.tsx` in `src.orig/`) before asserting a failure. Do not restate the claim as a defect.

---

## 5. What Ships If Each Verdict Is Accepted — Concrete File-Level Inventory

### 5.1 The one must-ship diff in this repo (BSC `src/`)

A single, grounded, non-breaking diff — the window-level Escape listener:

```
src/components/Header.tsx
  + useEffect(() => {
      if (!mobileOpen) return;
      const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") { setMobileOpen(false); setDesktopOpen(null); }
      };
      window.addEventListener("keydown", onKeyDown);
      return () => window.removeEventListener("keydown", onKeyDown);
    }, [mobileOpen]);
```

Tokens in that block are `mobileOpen`/`desktopOpen` only — no `bsc-*` / `oll-*` rename confusion; the block copies OLL verbatim except for token renames elsewhere in the file (which are not part of this diff).

**Regression surface:** `src/components/Header.test.tsx` (+1), `e2e/mobile-navigation.spec.ts` (+1 spec or extension to `navigation.spec.ts`). Build artifact unchanged size (no token growth, no route growth).

### 5.2 The scoped, VALIDATE-gated diff (BSC `src/`, only if Finding 5 is approved as "pattern, not copy")

```
src/data/content.ts          # new Sacrament interface + sacraments[] (4–6, BSC parish copy)
src/pages/Sacraments.tsx     # new page (useScrollSpy jump nav, bsc-* tokens, Fraunces)
src/App.tsx                  # +2 Route entries (/sacraments canonical + /all-sacraments alias)
src/data/nav.ts              # primaryNav + footerNav additions (description strings are BSC wording)
e2e/sacraments.spec.ts       # new spec file (4–6 hash-anchor + scroll + reload cases)
src/test/setup.ts            # no change (harness already mocks IO)
AGENTS.md / README.md / blessed-sacrament-queenstown_SKILL.md §0, §5.4
                             # re-pin: 17→18 Route entries, 7→8 alias paths, 9→13 hash anchors
```

### 5.3 The handoff (no diff in this repo — for the OLL maintainer at `src.Site.A`)

For `src.Site.A` (`../ourladyoflourdes`), the comparison doc's "For Our Lady of Lourdes" recommendations are sound and validated by the same greps — they are simply out of scope for a diff inside `src/`:

- **Clergy/PPC:** add `Priest`/`PpcMember` interfaces + `priests[]`/`ppcMembers[]` to OLL's `content.ts` (requires OLL parish office to supply current clergy + PPC roster — do not fabricate), render on `src.Site.A/pages/About.tsx` via the monogram-disc pattern (`utils/monogram.ts` already exists on OLL). Low effort once data is supplied.
- **Social:** populate `facebook/instagram/youtube` in OLL's `site.ts` (needs real handles — OLL currently has none; `grep social` on `site.ts` confirms empty), re-introduce `src.Site.A/components/SocialIcons.tsx` (copy BSC's file, retoken `bsc-*` → `oll-*`), wire into OLL's `Footer.tsx` (BSC precedent: `import { SocialIcons }` + `<SocialIcons />` in the bottom bar).
- **Volunteering:** add `serveRoles[]` + `src.Site.A/pages/Serve.tsx` (shared content shape), register `/serve` canonical + `/volunteer` alias in OLL's `App.tsx` (restores the alias discipline OLL already uses for `/all-sacraments` etc.), add primaryNav `Serve` item (BSC precedent). Gives OLL a concrete lay-involvement CTA distinct from the general Ministries grid.

Each of those on OLL would carry its own unit + E2E contract mirroring BSC's existing `About`/`Footer`/`Serve` suites — no invention, just population of an already-proven schema.

### 5.4 Explicitly **not backported** into `src/` (and why)

| Suggestion that might be misread as "backport OLL into BSC" | Why it is a forward divergence, not a backport | What would happen if we did it |
|---|---|---|
| OLL's Cormorant Garamond display typeface | BSC's Fraunces is identity: soft, contemporary editorial for a 1965 modernist tent (AGENTS: "Reverent, not austere"); Cormorant is identity for an 1888 Gothic national monument. Swapping would break parish fidelity. | Correct for OLL, wrong for BSC — no diff |
| OLL's rose/sage token set (`oll-rose-*`, `oll-sage-*` + `categoryTone` remap) | BSC has a measured 33-color + 2-shadow budget (35 `@theme` entries, `token-integrity` guard). Rose/sage are Marian-sage semantics for OLL's formation/catechesis; BSC's `terracotta/pine` already cover Parish/Devotion/Formation/Archdiocese with AA contrast (`terracotta-600 #8f5038` + `gold-700 #85641c` are the text-bearing steps). Adding rose/sage to BSC inflates the token budget without a category that needs it, and would require re-pinning every docs table + the guard. | No diff; BSC keeps its sapphire/terracotta/pine vocabulary — the comparison doc credits OLL's extension as "genuine" for OLL's category set, not as a universal prescription |
| OLL's 5-Sunday + public-holiday Mass card | BSC's schedule is `6 Sunday slots (7:30 Mand / 9 / 11 / 13 Indo last Sun / 15:15 Tagalog / 17:30) + 3rd-Sat Tamil 19:30` from `site.ts mass.sunday[6] + saturdayTamil`; OLL's pattern is `5 Sunday + PH 9:00 Eng/10:00 Tamil`. Copying OLL's card copies the wrong parish's mass times, MRT, and UEN. | No diff |

---

## 6. Validation Methodology — How Each Claim Will Be Proven (before any src/ edit)

> Every check below is a `rg`/`diff`/`cat` against executable config. If a claim needs a browser pixel to be honest, it is marked Unverified and pays a browser pass before it can close.

| Step | Command | What it proves | Where the finding depends on it |
|---|---|---|---|
| Header token-rename isolation | `diff -u src/components/Header.tsx src.Site.A/components/Header.tsx \| grep -E "^[+-].*bsc-\|^[+-].*oll-"` | All `bsc-*` ↔ `oll-*` deltas are pure renames, except the +15-line window-Esc block | §4.1 |
| BSC missing window-Esc | `rg -n "window\.addEventListener.*keydown.*mobileOpen\|if.*mobileOpen.*return.*onKeyDown.*Escape" src/components/Header.tsx` → 0 hits | BSC regression is not a reading error | §4.1 |
| OLL has window-Esc | `rg -n "Escape.*mobileOpen\|mobileOpen.*Escape" src.Site.A/components/Header.tsx` → hit on `useEffect.*mobileOpen` window listener | Fix exists verbatim to copy | §4.1 |
| Route inventory | `rg -n "path=" src/App.tsx \| wc -l` (=17) vs `rg -n "path=" src.Site.A/App.tsx \| wc -l` (=18 incl. Sacraments) | Sacraments gap is structural, not copy | §4.2 |
| Data gap — clergy | `rg -n "interface Priest\|priests" src/data/content.ts` vs `rg -n "interface Priest\|priests" src.Site.A/data/content.ts` | OLL has none (gap), BSC has 3 | §4.3 |
| Data gap — social | `rg -n "facebook\|instagram\|youtube" src/data/site.ts` vs `rg -n "facebook\|instagram\|youtube" src.Site.A/data/site.ts` | BSC 3, OLL 0 | §4.3 |
| Data gap — serve | `ls src/pages/Serve.tsx` exists vs `ls src.Site.A/pages/Serve.tsx` missing + `rg -n serveRoles src.Site.A/data/content.ts` 0 | OLL volunteering gap | §4.3 |
| SafeImage zero-width | `rg -n "width|height|picture|srcset" src/components/SafeImage.tsx src.Site.A/components/SafeImage.tsx` → 0 hits | Shared CLS risk, identical impl | §4.4 |
| Token budget | `rg -c "^\s*--color-" src/index.css` vs `src.Site.A/index.css` (BSC 33+2, OLL rose/sage set) | Rose/sage is OLL's extension, not BSC's gap | §5.4 |
| Live hosts — optional browser pass | `agent-browser open https://blessed-sacrament-church.jesspete.shop/` + `/our-lady-of-lourdes.jesspete.shop/` → snapshot → screenshot 1440×900 + 390×844, check hero alt, drawer geometry, contrast via computed style | Settles the three Unverified items (gold-on-navy, image CLS, layout) without asserting them as defects | §4.4 |
| Gate before any diff | `pnpm lint && pnpm typecheck && pnpm test && pnpm test:e2e && pnpm build` | Establishes the green baseline this plan branches from | All of §4 |

The comparison doc's own ledger (§11) already ran `web_fetch 200` + `diff -rq src/` + `diff Header.tsx` + `grep content.ts/site.ts/Footer.tsx` — this plan repeats those checks with explicit repo-relative paths so a future agent can re-run them without ambiguity.

---

## 7. Risks, Mitigations & Parish-Fidelity Constraints

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Backporting OLL copy into BSC (wrong phone/email/UEN/feast) | Medium if sacraments scope is approved without copy review | High — parish facts violation, `site.ts` is the canonical single source | Require parish office confirmation of sacrament copy before `Sacrament` details ship; keep FAQ Q5 as the single source for `+65 6474 0582` etc. until then |
| Token-budget drift (adding rose/sage to BSC "for completeness") | Low (comparison doc praises OLL's extension, but does not prescribe it for BSC) | Medium — `token-integrity` guard fails, docs drift, §0 re-pin cascade | Preserve BSC `bsc-*` budget as-is; do not backport OLL's rose/sage vocabulary — document the rationale in this plan §5.4 |
| Drawer focus invariants regress | Low if diff is verbatim | High — `aria-modal` + trap + restore is the modal contract | TDD: assert trap Tab/Shift+Tab + focus restore + outside-tap still pass; keep the `drawerWasOpenRef` guard |
| HashRouter anchor collision if `/sacraments` reuses `/worship#confession` ids | Low, but name collision is easy to miss | Medium — deep links `/#/sacraments#reconciliation` vs `/#/worship#confession` must not share an element id | Use distinct ids (`reconciliation` on `/sacraments` is the sacrament; `confession` on `/worship` is the reconciliation-before-Mass card) and document the distinction in `App.tsx` + `nav.ts` comments |
| Single-file build size creep | Low for the Esc fix (≈0 kB), Medium for sacraments page (+~4 kB inlined JS + data) | Low — still well under the ~470 kB artifact, but `viteSingleFile` inlines everything so every new page is additive | Measure `dist/index.html` before/after (`ls -lh dist/index.html`) and keep `inject-csp-hashes.mjs` passing (sha256 pin) |
| Over-fitting to unverified visual claims | Medium if screenshots are not run | Low — doc itself marks them Unverified | Run the `agent-browser` pass in §6 before closing §4.4; do not ship a gold-on-navy contrast "fix" without a measured ratio |

---

## 8. Sequencing — What Happens in Which Phase

```
Phase 1 — VALIDATE (this document's gate, no src/ edits yet)
  ✅ Read AGENTS.md / CLAUDE.md / README.md / SKILL.md + index.css + App.tsx + Header.tsx + data/* on both sides
  ✅ Prove each finding with diff/grep/code-annotated evidence (captured in §4)
  ☐ Owner reviews this plan (VALIDATE checkpoint — you are here)
       → decision A: approve Esc backport alone (minimal, ships today)
       → decision B: approve Esc + scoped Sacraments pattern (ships as two commits)
       → decision C: request a different scope (e.g., Sacraments spike doc only, no src/ page yet)

Phase 2 — IMPLEMENT (only after explicit approval of §4.1 or §4.2)
  Branch: fix/bsc-backport-oll-escape  (and optionally feat/bsc-sacraments-pattern)
  1. RED  — add failing Header/mobile-navigation tests (window-Esc without focus) → run `pnpm test` / `pnpm test:e2e:ui` to confirm red
  2. GREEN — apply the +15-line window listener to BSC Header (verbatim from OLL src.Site.A) → tests green
  3. (If B) RED → GREEN for Sacraments: data → page → routes → nav → E2E, one TDD cycle per file
  4. Docs re-pin (if sacraments): AGENTS.md routing table, README.md table + AGENTS diagram, SKILL.md §0 + §5.4, e2e ledger

Phase 3 — VERIFY
  pnpm lint && pnpm typecheck && pnpm test && pnpm test:e2e && pnpm test:e2e:built && pnpm build
  + agent-browser pass (drawer geometry 390×844, hash anchors, console clean)
  + diff src/ vs src.Site.A for unintended token drift

Phase 4 — DELIVER
  Handoff note to OLL maintainer (the §5.3 backlog) — either as a linked issue or as docs/handoff-to-ourladyoflourdes-*.md
  No `src/` changes on OLL in this repo — the symlink is read-only reference; OLL work happens in its own repo
```

---

## 9. Success Criteria

| Gate | Pass condition |
|---|---|
| VALIDATE | This plan is reviewed; the team explicitly chooses A, B, or C for Phase 2 scope |
| RED→GREEN (Esc) | `Header.test.tsx` new window-Esc spec is green without waiting for drawer focus; `mobile-navigation.spec.ts` new spec green at 390×844; existing 67 E2E + 29 files/181 tests stay green |
| RED→GREEN (Sacraments, if B) | `Sacrament` data + jump nav + 4 canonical anchors pass; `App.tsx` 17→18 entries verified by `docs-contract`; no parish-fact duplication with OLL's `+65 6294…` |
| Docs | `AGENTS.md` + `README.md` + `SKILL.md` §0 all agree on route/alias/anchor counts (docs-contract + public-contract green) |
| Build | `dist/index.html` boots under the hash-pinned `script-src` CSP (`pnpm test:e2e:built` green) |
| Parish fidelity | No `src.Site.A` copy (Tamil-specific phrasing, OLL phone/email, rose/sage tokens) appears in `src/` under BSC |

---

## 10. Open Decisions for VALIDATE (do not code until answered)

1. **Esc backport alone or together with Sacraments?** The doc ranks Esc as Medium a11y regression (verified) and Sacraments as Low (discoverability). The minimal, uncontroversial ship is Esc alone — Sacraments can be a second commit once parish office confirms copy. Preference: ship Esc now (15-line, no docs re-pin cascade), gate Sacraments on copy approval.
2. **Sacraments copy source:** should the initial `sacraments[]` be drafted from BSC's own FAQ Q5 + `worship#confession` + Damien Hall booking flow, or imported from OLL then rewritten parish-first? Preference: draft BSC-native (the OLL details are Tamil/English-specific and carry the wrong contact/channel).
3. **Handoff ownership for the "For OLL" backlog:** does the OLL repo owner want the three items (clergy/PPC, social, /serve) as one issue or three? Preference: one handoff doc with three checklist items, each with the `src.Site.A` file paths and the BSC precedent to copy.

---

## Appendix — File Map Used for Every Verification Above

```
BSC (this repo, Instruction Site B)        OLL (Instruction Site A, via symlink)
src/App.tsx                                 src.Site.A/App.tsx
src/components/Header.tsx                   src.Site.A/components/Header.tsx
src/components/Footer.tsx                   src.Site.A/components/Footer.tsx
src/components/SafeImage.tsx                src.Site.A/components/SafeImage.tsx
src/components/SocialIcons.tsx              src.Site.A/components/SocialIcons.tsx  (missing on OLL)
src/data/content.ts                         src.Site.A/data/content.ts
src/data/site.ts                            src.Site.A/data/site.ts
src/data/nav.ts                             src.Site.A/data/nav.ts
src/index.css                               src.Site.A/index.css
src/pages/Sacraments.tsx                    src.Site.A/pages/Sacraments.tsx        (OLL only)
src/pages/Serve.tsx                         src.Site.A/pages/Serve.tsx             (BSC only)
src/utils/categoryTone.ts                   src.Site.A/utils/categoryTone.ts
src/hooks/useScrollSpy.ts                   src.Site.A/hooks/useScrollSpy.ts
e2e/mobile-navigation.spec.ts               (OLL e2e has fewer specs — comparison §11)
docs/design-comparison-…md                  (the artifact under validation)
```

Symlink contract: `src.Site.A -> ../ourladyoflourdes/src` (verified `ls -l src.Site.A`). Do not write through the symlink; OLL changes belong in `../ourladyoflourdes/` as a separate commit in that repo.

