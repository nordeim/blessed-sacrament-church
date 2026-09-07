# Code Review & Security Audit — Round 20 (2026-09-07)

> Tiered review + security audit of `blessed-sacrament-church` @ HEAD `62eaa2d`
> ("update docs", after `7a3b9ef` "oll backports"). Proves the SPA against its
> documented contracts (AGENTS / CLAUDE / README / SKILL) and against the live
> deployment `https://blessed-sacrament-church.jesspete.shop/`.
> Method: repo skills `code-review-and-audit` (tiered pipeline),
> `code-review` (Standards + Spec axes), `security-and-hardening` (OWASP),
> `webapp-testing` (E2E), `verification-and-review-protocol` (ledger).
> All findings carry evidence; severities follow the repo taxonomy
> (Critical / High / Medium / Low / Informational).

## Summary

| Severity | Count | Findings |
|---|---|---|
| Critical | 0 | — |
| High | 4 | H1 build CSS bloat from Tailwind scanning `skills/` · H2 docs↔code drift cluster (~102 findings) · H3 host serves no security headers (recurring) · H4 `og:image` resolves to an HTML page, not an image |
| Medium | 2 | M1 flaky E2E focus-ring spec · M2 deployed artifact is not reproducible from HEAD (deploy provenance) |
| Low | 4 | L1 stale e2e spec title ("footer 10 links") · L2 stale live-host example in `playwright.built.config.ts` comment · L3 duplicate build-script allowlist mechanisms (`pnpm-workspace.yaml` vs `package.json`) · L4 `apple-touch-icon` absent |
| Informational | 4 | I1 redeploy required after remediation · I2 root-absolute asset paths assume domain-root hosting · I3 no SRI on Google Fonts `<link>` (accepted; CSP mitigates) · I4 meta-CSP cannot express `frame-ancestors` (clickjacking protection depends entirely on H3) |
| Withdrawn | 1 | W1 (was numbered M2): "malformed `duration-s]` class" — **false positive**; see Withdrawn section |

Gate status at audit time (all **Verified** by execution):
`pnpm lint` 0 warnings · `pnpm typecheck` 0 errors · `pnpm test` **29 files / 182 tests** green ·
`pnpm test:e2e` **67 tests / 10 spec files** — 66/67 then 67/67 (M1 flake) ·
`pnpm test:e2e:built` vs `dist/` **67/67** · `pnpm test:e2e:built` vs **live host** **67/67** ·
`pnpm build` green (dist/index.html 476,921 B; 2 inline scripts sha256-pinned).
`pnpm audit --prod`: **no known vulnerabilities**.

---

## High

### R20-H1 — Build pipeline inlines ~1,003 spurious Tailwind utilities (~80 KB) scanned from the vendored `skills/` tree

- **Location:** `src/index.css:1` (`@import "tailwindcss";`) × `.gitignore` note (round-13: `skills/` intentionally tracked) × `vite.config.ts` (`viteSingleFile()` inlines the CSS).
- **Description:** Tailwind v4 automatic content detection scans everything under the project root that is not gitignored/binary. `skills/` holds the 224-skill vendored catalog (tracked by policy), so its markdown/reference files — which quote Tailwind class syntax from *other* projects — are treated as source. Every class-like token in 2,300+ skill files is emitted as a utility into the single CSS payload that `viteSingleFile()` inlines into `dist/index.html`.
- **Evidence (Verified):**
  - `dist/index.html` CSS block = **134,580 B**; the CSS block actually served by the live host = **54,264 B** (same JS bundle, byte-identical: 581 B + 338,832 B blocks).
  - Rule-level diff: **1,003 rules only in dist**, e.g. `.font-\[var\(--font-newsreader\)\]`, `.bg-\(--brand\)`, `.bg-violet-600\/10`, `.bg-indigo-500\/5`, `.proportional-nums`, `.blur-3xl`, `.xl\:grid-cols-4`. None of these strings exist in `src/`; all exist in `skills/nextjs16-full-stack/SKILL.md`, `skills/astro-7-patterns/SKILL.md`, `skills/ui-styling/references/tailwind-utilities.md`, etc.
  - Only 5 "rules only in live" — all CSS-formatting/grouping artifacts, no behavioral difference.
  - DOM-vs-CSS coverage on the live host (all 11 routes + mobile drawer, 376 distinct classes): every class is defined (`welcome-quote` is a JS/E2E hook, no CSS needed) — so the bloat is *pure dead weight*.
- **Impact:** every `pnpm build` ships ~80 KB (17%) of dead CSS to every visitor; violates the single-file artifact economy the docs promise; will grow as `skills/` grows; cache/bandwidth cost on a parish site served from Cloudflare.
- **Severity:** **High** (release economics + correctness of the build contract; no security impact).
- **Recommended fix:** scope auto-detection at the import site — `@import "tailwindcss" source("./");` in `src/index.css` (detection root = `src/`). Add a regression guard: new `src/css-source-contract.test.ts` (a) asserts the scoped import, (b) when `dist/index.html` exists, asserts the built CSS block contains none of the known-garbage markers (`font-newsreader`, `--brand)`, `bg-violet-600\/10`) and stays under a size ceiling. TDD: red (garbage present) → fix → green.
- **Confidence:** Verified.

### R20-H2 — Docs↔code drift cluster: ~102 discrete findings across the four contract docs

- **Location:** `AGENTS.md`, `CLAUDE.md`, `README.md`, `blessed-sacrament-queenstown_SKILL.md`.
- **Description:** the four docs are the repo's agent-facing contract (AGENTS: "Don't document a script until it exists there"; docs-contract test exists to guard this). After `7a3b9ef` ("oll backports", version 1.6.0→1.7.0) and the round-19 guard additions, the docs were never re-pinned. Full finding table was compiled during this audit (doc-audit subagent, ~102 rows: ≈44 High / ≈34 Medium / ≈24 Low). Highest-impact clusters:
  - **SKILL.md** (worst): §0 "Volatile Facts Register" pins 21/112 unit tests, 51/51 e2e, 8 spec files, 63 files (41+21+1), build 466.20 kB, version 1.4.4, 17 Route entries, 7 aliases/5 groups, 9 anchors, primaryNav 6/footerNav 10; §§5.2/5.4/7 describe a pre-backport data layer (priests **5**, timeline **8** "1958–2026", grounds `rosary-garden`, giving **8** "no UEN", images **11 keys**, buses "11041/11049") that matches **neither** BSC data nor this repo's history; §5.5 says the Timeline shows "1969–2026 Toa Payoh milestones" (unframed legacy fossil — violates the repo's own "don't reintroduce Toa Payoh facts" rule); §19 "Color Reference (Complete)" lists 29 of 33 tokens (missing terracotta-50/300, pine-50/300) while claiming byte-for-byte completeness; §10 inverts repo policy ("skills/ is deleted … src.orig/ present" — both wrong); Appendix B/§11 gate pins stale; Quick Reference Card stale end-to-end.
  - **AGENTS.md:** Commands table omits `pnpm test:e2e:built` and the `scripts/inject-csp-hashes.mjs` build step; pre-push gate row pins "test 29/181, test:e2e 69"; Quirks section pins "26 files / 149 tests" + "test:e2e 59" (two more generations of stale numbers in the same file); structure tree omits `src/utils/categoryTone.ts`, `csp-build-contract`, `design-language-contract`, `head-metadata-contract`, `Layout.anchor.test.tsx` while EventMeta is described as exporting `categoryTone` (moved to `utils/`); `public/` row claims "favicon legacy/emoji favicon in index.html" (favicon.svg IS the linked icon; `_headers` omitted); "8 exported interfaces / 10 exports" vs actual 9/12 (`Sacrament`, `sacraments[6]`).
  - **CLAUDE.md:** Architecture pins "41 source + 21 test + 1 setup", "21 files / 112 tests", 17-entry route table (no `/sacraments`), primaryNav 6/footerNav 10, 10 pages, version 1.5.0, "9 spec files … 59", "26 files / 149", build 469.68kB/466.20kB/~468kB (three different pins), hours "(5:" for a 6-key object, `knownRoutePaths` 16 (actual 18), inline-emoji favicon, `cloudflareinsights.com` without the `static.` host.
  - **README.md:** badge 1.4.4; 17 Route entries; 21 files/112 tests; 8 specs/51 tests; src/ 63 files; mass keys `secondCollection`/`monthly` (do not exist); ~466 kB ×2; drawer "13 links" (actual 17).
  - **No doc pins the live deployment URL** (`https://blessed-sacrament-church.jesspete.shop/` — zero `jesspete` hits across all four).
- **Impact:** any future agent (or human) following the docs is misrouted: wrong gate counts, wrong commands, wrong data contracts, wrong parish facts — precisely the failure mode the docs-contract guard was built to prevent.
- **Severity:** **High** (contract integrity; blocks "matches its documented contracts" ship claim).
- **Recommended fix:** re-pin all four docs to measured state **after** the code fixes land (so numbers settle once), add the deployment URL, fix unframed Toa Payoh fossils, complete the §19 color table, extend `src/docs-contract.test.ts` where cheap (e.g. pin `test:e2e:built` script exists, pin `/sacraments` route present in App.tsx — already pinned at 19 paths).
- **Confidence:** Verified (every count re-executed in this session).

### R20-H3 — Live host serves no security headers (recurring H1 from rounds 13/16; now with sharpened impact)

- **Location:** deployment host for `https://blessed-sacrament-church.jesspete.shop/` (Cloudflare). `public/_headers` is shipped in `dist/` but not honored by this host.
- **Evidence (Verified):** `curl -sI https://blessed-sacrament-church.jesspete.shop/` → no `Strict-Transport-Security`, no `X-Content-Type-Options`, no `X-Frame-Options`, no `Referrer-Policy`, no `Permissions-Policy`, no CSP header (CSP arrives only via `<meta http-equiv>`; verified present and sha256-pinned).
- **Impact:** the site can be framed by third parties (meta CSP ignores `frame-ancestors`, so clickjacking protection is absent end-to-end); MIME-sniffing and downgrade protections missing; `dist/_headers` gives false confidence on this host. This is the third consecutive audit reporting it — it cannot be fixed inside the repo.
- **Severity:** **High** (hardening gap on the only production entry point; owner/host action).
- **Recommended fix:** configure response headers at the host (Cloudflare Rules / Worker / `_headers`-supporting Pages deploy): HSTS `max-age=31536000; includeSubDomains`, `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY` (or CSP `frame-ancestors 'none'` as a **header**), `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()` — the exact set already authored in `public/_headers`. Until then, docs must state the gap explicitly instead of implying `_headers` is effective.
- **Confidence:** Verified (live response captured this session).

### R20-H4 — `og:image` points at a URL that redirects to an HTML page; contract test pins the broken URL

- **Location:** `index.html:13` (`og:image` = `https://bsc.org.sg/images/hero-church.jpg`), `src/head-metadata-contract.test.ts` (pins the same string).
- **Evidence (Verified):** `curl -sL https://bsc.org.sg/images/hero-church.jpg` → 301 → `https://bsc.org.sg/` (HTML, 200). The same path on the deployment host returns 200 `image/jpeg`.
- **Impact:** social/messaging crawlers following `og:image` land on a web page, not an image → broken share previews (the round-19 "Two Tents, One Parish" work added the social set; the image leg is dead on arrival).
- **Severity:** **High** (user-visible social sharing is broken; contract test actively enforces the defect).
- **Recommended fix:** repoint `og:image` to the deploying host's absolute image URL (`https://blessed-sacrament-church.jesspete.shop/images/hero-church.jpg`), update the contract test accordingly (TDD: red test first), and document the move-target in README Deployment (when the parish domain goes live, flip it back). `og:url`/`canonical` intentionally remain `https://bsc.org.sg/` (production intent) — documented decision, see I-Note in the remediation plan.
- **Confidence:** Verified.

---

## Medium

### R20-M1 — Flaky E2E: round-19 focus-ring spec fails under parallel load

- **Location:** `e2e/enhancements-round19.spec.ts:74` ("keyboard focus shows the global gold ring").
- **Evidence (Verified):** first full-suite run: 66 passed / 1 failed (screenshot + error-context captured in `test-results/`); the spec passes in isolation; second full run 67/67; live-host run 67/67.
- **Root cause:** `gotoHash()` resolves as soon as the document loads; the two `Tab` presses then race React hydration. If the header hasn't mounted, focus lands elsewhere and the computed outline assertion fails. The spec never waits for a deterministic anchor (the skip link) before keyboarding.
- **Impact:** CI/local gate intermittently red → agents re-run until green (masked regressions, wasted cycles).
- **Severity:** **Medium** (test reliability on the primary gate).
- **Recommended fix (TDD):** before the first Tab, `await expect(page.locator(".skip-link")).toBeVisible()` (and keep the assertion set unchanged). Evidence of fix: 3 consecutive full-suite greens.
- **Confidence:** Verified (reproduced once; mechanism reasoned from spec + harness).

### R20-W1 — WITHDRAWN during verification: the Timeline rail duration was never malformed

> Originally reported as Medium M2 ("malformed `duration-s]` class breaks the rail draw").
> **Withdrawn before any code change.** Root cause of the false report: the
> session's terminal-output channel strips ANSI-like sequences — the substring
> `[1100m` inside `duration-[1100ms]` was eaten in every `rg`/`sed`/`python repr`
> view, rendering it as `duration-s]`. Byte-level verification (`od -c`/`ord()`
> dumps) proves the source at `src/components/Timeline.tsx:49` is
> `duration-[1100ms]` (valid arbitrary Tailwind duration), the built CSS
> defines `.duration-\[1100ms\]`, and the live DOM carries the same class.
> The documented scroll-draw motion contract is intact; no fix required.
> Recorded here (a) to keep the finding register honest, (b) as a standing
> warning for future audits of this repo: **never trust bracket-digit-m
> substrings as seen in terminal output — verify with byte dumps** (the same
> artifact was independently flagged for `branches: [main]` in AGENTS.md and
> the CI workflow, and for `a[href*="give"]` in the round-19 spec).

### R20-M2 — Deployed artifact is not reproducible from HEAD (deploy provenance)

- **Location:** deployment pipeline (outside the repo).
- **Evidence (Verified):** live JS == HEAD-built JS (byte-identical bundles), but live CSS = 54,264 B vs HEAD-built 134,580 B. A HEAD checkout cannot produce the live CSS because `skills/` is present in every checkout of HEAD — the live artifact must have been built from a tree without `skills/` (or an equivalent filter), i.e. **the deployment is not reproducible by the documented command** (`pnpm build`).
- **Impact:** no verified path from source to production; rollback/forward audits ("what exactly is deployed?") cannot be answered by rebuilding; combined with R20-H1 the next deploy will silently add ~80 KB.
- **Severity:** **Medium** (operational; becomes High if the pipeline drifts further).
- **Recommended fix:** after the H1 fix, rebuild and **redeploy from a clean `pnpm build` of HEAD**, then re-verify live↔dist byte-identity (scripted diff) and record the provenance (commit + hash) in the SKILL Appendix B ledger. Owner action for the redeploy itself; repo-side, this audit's fix makes HEAD builds lean and deterministic.
- **Confidence:** Verified for the divergence; the *cause* (skills-absent build tree) is Reasoned, not directly observed.

---

## Low

### R20-L1 — Stale e2e spec title: "footer 10 links" (actual footerNav = 11)

- **Location:** `e2e/navigation.spec.ts` (test title), `src/data/nav.ts` (`footerNav[11]`). Verified count 11. **Fix:** rename the test title (test-behavior contract unchanged). **Confidence:** Verified.

### R20-L2 — `playwright.built.config.ts` comment cites the wrong live host

- **Location:** `playwright.built.config.ts:13` — `E2E_BASE_URL=https://risen-christ.jesspete.shop` (legacy parish). The canonical live host is `blessed-sacrament-church.jesspete.shop`. **Fix:** update the comment. **Confidence:** Verified.

### R20-L3 — Two parallel "allow build scripts" mechanisms disagree

- **Location:** `package.json` (`allowScripts: { "esbuild@0.27.7": true, "esbuild@0.25.12": true }`) vs `pnpm-workspace.yaml` (`allowBuilds: esbuild: false`). pnpm honors the workspace file; esbuild's binary arrives via optional dependencies so the build works (Verified), but the `allowScripts` block is dead config and the two files contradict each other. **Fix:** remove `allowScripts` from package.json (or align both); verify build. **Confidence:** Verified (build green with scripts blocked).

### R20-L4 — No `apple-touch-icon`

- **Location:** `index.html` head. iOS home-screen bookmarks fall back to a screenshot. The round-19 social-metadata pass added og/twitter but not this. **Fix (optional):** add a 180×180 PNG + link tag. **Confidence:** Verified (absent).

---

## Informational

- **R20-I1 — Redeploy required after remediation.** All fixes ship to `dist/` via build; the live host keeps serving the old artifact until the owner redeploys (see M3).
- **R20-I2 — Root-absolute asset paths (`/images/…` in `content.ts`, `/favicon.svg`) assume domain-root hosting** (true for the current host; would break under a GH Pages *project* subpath — docs say "GH Pages / S3", which is only true for user/org pages or a custom domain).
- **R20-I3 — No `integrity` on the Google Fonts stylesheet `<link>`** (fonts.googleapis.com serves dynamic CSS; CSP `style-src`/`font-src` allowlists mitigate; standard practice, noting for completeness).
- **R20-I4 — Meta-tag CSP cannot carry `frame-ancestors`**, so frame protection depends entirely on H3 being fixed at the host. Documented so the dependency is explicit.

## What was checked and found clean (evidence-backed)

- **Secrets:** `git ls-files` shows no key-material files; round-19 material scan passes; `docs/ssh-key.txt` untracked (round-6 C1 fix intact); no tracked-but-ignored files (`git ls-files -i -c` empty).
- **XSS surface:** no `dangerouslySetInnerHTML`/`innerHTML`/`eval` anywhere in `src/`; React auto-escaping intact; external links (`NewsEvents`, `SocialIcons`) carry `rel="noopener noreferrer"`.
- **Dependencies:** `pnpm audit --prod` clean; all pins exact (no `^`); lockfile committed; `--frozen-lockfile` install verified.
- **CSP (build):** dist `script-src` drops `'unsafe-inline'` in favor of two sha256 hashes; `style-src 'unsafe-inline'` has a documented rationale (style *attributes*); `connect-src` allowlists only self + `static.cloudflareinsights.com`; `frame-src` only google.com; `object-src 'none'`; `base-uri 'self'`.
- **Injection:** no SQL/OS surface (static SPA, no backend — by design).
- **A11y (spot, live):** landmarks (banner/nav/main/footer) on all 11 routes; skip link present; focus-visible ring 2px `rgb(212, 173, 66)` live; mobile drawer full-height 844 px with 17 links incl. Give; window-Escape closes it; 67/67 E2E include drawer/modal/focus contracts.
- **Hash routing:** all 7 probed deep links land on-section on the live host; `resolveHashRedirect` covers 18 known paths incl. `/sacraments`, `/all-sacraments`; unknown route → NotFound.
- **Assets:** 9/9 images 200 on live; robots.txt 200; favicon.svg present and linked (round-19 R2-F7 fix intact).

## Verification ledger (V1–V24)

| # | Check | Method | Result |
|---|---|---|---|
| V1 | lint 0 | `pnpm lint` | 0 warnings |
| V2 | typecheck 0 | `pnpm typecheck` | 0 errors |
| V3 | unit 29/182 | `pnpm test` | green (20.6 s) |
| V4 | e2e 67 | `pnpm test:e2e` | 66/67 → 67/67 (M1) |
| V5 | built e2e 67 | `pnpm test:e2e:built` | 67/67 |
| V6 | live e2e 67 | `E2E_BASE_URL=https://blessed-sacrament-church.jesspete.shop pnpm test:e2e:built` | 67/67 |
| V7 | build | `pnpm build` | 476,921 B + 2 sha256 hashes |
| V8 | CSS bloat | python rule-diff live vs dist | 1,003 dist-only rules; 134,580 B vs 54,264 B |
| V9 | JS identity | script-block compare live vs dist | byte-identical (581 + 338,832 B) |
| V10 | garbage provenance | rg skills/ for markers | `font-newsreader`, `--brand`, `bg-violet-600/10` all in skills, none in src |
| V11 | DOM↔CSS coverage | playwright crawl 11 routes + drawer (376 classes) | all defined; `welcome-quote` hook only |
| V12 | live headers | `curl -sI` | no security headers |
| V13 | og:image | `curl -sL bsc.org.sg/images/hero-church.jpg` | 301 → HTML |
| V14 | og:image on live host | `curl` | 200 image |
| V15 | flake repro | full suite ×2 + isolated | fail-once → pass/pass |
| V16 | `duration-s]` | rg + git log -L | present since 4d502c7 |
| V17 | secret scan | git ls-files + round-19 material guard | clean |
| V18 | vuln scan | `pnpm audit --prod` | 0 known |
| V19 | _blank hygiene | rg src | `noopener noreferrer` present |
| V20 | innerHTML/eval | rg src | none |
| V21 | live anchors | playwright, 7 deep links | all on-section |
| V22 | live drawer | playwright 390×844 | 17 links, 844 px, Esc closes |
| V23 | live focus ring | playwright keyboard | 2px rgb(212,173,66) |
| V24 | asset health | curl images/robots/favicon | 200s |

## Remediation backlog (ordered, TDD-first)

| Order | Item | Type | Test-first artifact |
|---|---|---|---|
| 1 | R20-H4 `og:image` → deployment host | code + contract | update `src/head-metadata-contract.test.ts` (red) |
| 2 | R20-H1 scope Tailwind sources + guard | build config | new `src/css-source-contract.test.ts` (red on marker) |
| 3 | R20-M1 deflake focus-ring spec | test | spec waits for `.skip-link` |
| 4 | R20-L1 e2e title 11 links | test | rename assertion title |
| 5 | R20-L2 built-config comment host | comment | n/a |
| 6 | R20-L3 remove dead `allowScripts` | config | build still green |
| 7 | R20-H2 re-pin 4 docs + deployment URL | docs | extend `docs-contract` where cheap |
| 8 | R20-H3 host headers | owner action | documented in README/SKILL + `_headers` kept |
| 9 | R20-M2/I1 rebuild → owner redeploys → live↔dist re-verify | ops | provenance note in SKILL App. B |

*Clean fixes: no test skipped or weakened; the two `it.skip`-style dist-conditional assertions in the new CSS contract run only when `dist/index.html` exists (artifact-dependent by design, message states how to materialize it).*
