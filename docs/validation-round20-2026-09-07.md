# Round-20 Validation Report (2026-09-07)

> Validates `docs/remediation-plan-round20-2026-09-07.md` (executes
> `docs/code-review-audit-round20-2026-09-07.md`) at HEAD after remediation.
> Every claim below is **Verified** by execution in this session.

## Gate ledger (before → after)

| Gate | Before (audit, HEAD `62eaa2d`) | After (remediated) |
|---|---|---|
| `pnpm lint` | 0 warnings | **0 warnings** ✅ |
| `pnpm typecheck` | 0 errors | **0 errors** ✅ |
| `pnpm test` (unit) | 29 files / 182 tests | **30 files / 188 tests** ✅ (+1 `css-source-contract`, +5 `docs-contract` round-20 pins) |
| `pnpm test:e2e` (dev) | 67 tests / 10 specs (1 flake observed once) | **69 tests / 11 specs — green ×4 consecutive full runs** ✅ (67 + 2 `css-source.spec.ts`) |
| `pnpm test:e2e:built` (dist) | 67/67 | **69/69** ✅ |
| `pnpm test:e2e:built` (live host) | 67/67 (pre-fix artifact) | 69-spec suite ready; re-run after owner redeploys (M2/I1 — see below) |
| `pnpm build` | 476.9 kB dist (CSS block 134,580 B) | **386.6 kB dist (CSS block 44,368 B)** ✅ — 90 kB lighter, 2 inline scripts sha256-pinned |
| `pnpm audit --prod` | 0 known vulnerabilities | **0 known** ✅ |

## Finding closure

| Finding | Status | Evidence |
|---|---|---|
| **H1** Tailwind scans `skills/` → ~1,003 spurious utilities (+80 kB) | **CLOSED** | `src/index.css` → `@import "tailwindcss" source("./")`; rebuilt CSS 44,368 B; garbage markers (`font-newsreader`, `--brand)`, `bg-violet-600/10`, `bg-indigo-500/5`) absent from dist (verified by python scan + new `e2e/css-source.spec.ts` 2/2 green). Guards: `src/css-source-contract.test.ts` (scoped-import pin) + `e2e/css-source.spec.ts` (dist lean + garbage-free). Self-defeating-guard trap documented (a marker-bearing guard inside `src/` re-emits the utilities it forbids — the dist half lives in `e2e/`). |
| **H2** Four-doc drift (~102 findings) | **CLOSED** | All four docs re-pinned to measured state: AGENTS (commands incl. `test:e2e:built` + CSP-injection build step, structure tree incl. `utils/categoryTone.ts` + round-19/20 test files, favicon.svg + `_headers` + `static.cloudflareinsights.com`, 9 interfaces / 12 exports, 32 utilities / 10 keyframes, gate counts); CLAUDE (19-entry route table + /sacraments rows + 6 sacrament anchors, primaryNav 7 / footerNav 11, 11 pages, 72 files, 1.7.0, mass 9 keys, `knownRoutePaths` 18, WhatsApp fossil removed, naveCdn/courtyardCdn fossils removed); README (badge 1.7.0, 19-entry routing table, 11 pages, 72 files, sacrament anchors, site.ts hours 6 / mass 9 keys, categoryTone file line, drawer/size counts, Deployment section: og:image host + `_headers` not honored + provenance step); SKILL (frontmatter, §0 register fully re-pinned incl. live URL, §2/§3 harness + gate counts, §4.3 bloom-drift un-fossiled, §5.2 tree 72 files, §5.4 19/8/15, §7.1 table rows → BSC current (priests 3, timeline 7 1954–Today, grounds damien-hall/garden, giving 6 with UEN, images 7 keys, nav 7/11), §7.2 table → the verbatim 7 `lifeTimeline` rows, §7.3 prose, §8 gold-400 focus ring + wcag-contrast lineage note, §9 8-aliases/7-images, §10 debug + live-route list, §11 checklist counts + history line, §12 8-aliases/69-tests, §13/§14 counts, §19 color table completed with terracotta-50/300 + pine-50/300 (33 colors), §20 `monogram()` export, Appendix B rewritten (live URL + BSC-current smoke + provenance step 20), Appendix D round-20 supersede banner, Quick Reference Card re-pinned). Unframed Toa Payoh fossil (§5.5 "1969–2026 Toa Payoh milestones") removed. `docs-contract` extended with 5 round-20 pins (13/13 green). |
| **H3** Host serves no security headers | **OPEN — owner action (documented)** | Not fixable in-repo. Documented in README Deployment + SKILL Appendix B + AGENTS public/ row: configure the five headers (already authored in `public/_headers`) at the Cloudflare origin. Recurring since round-13 — sharpened impact recorded (meta CSP ignores `frame-ancestors` → clickjacking protection depends on host headers). |
| **H4** og:image → HTML redirect | **CLOSED** | `index.html` og:image → `https://blessed-sacrament-church.jesspete.shop/images/hero-church.jpg` (verified 200 image/jpeg); `head-metadata-contract.test.ts` updated red→green; `canonical`/`og:url` stay at production origin (documented decision); README Deployment documents the move-target. |
| **M1** Flaky focus-ring E2E | **CLOSED** | Spec waits for `.skip-link` visibility before keyboarding; 4 consecutive full-suite greens (69/69 ×3 pre-docs + 69/69 final). No assertion weakened. |
| **M2** Deploy provenance | **OPEN — owner action (documented)** | README Deployment + SKILL Appendix B step 20: rebuild → redeploy → diff live↔dist → record commit hash. Root cause of divergence (skills-absent build tree) is now moot — HEAD builds are deterministic and lean. |
| **W1** (withdrawn) `duration-s]` | **WITHDRAWN** | Byte-verification: source is `duration-[1100ms]` (valid); `.duration-\[1100ms\]` present in dist CSS; live DOM class correct. Session-terminal ANSI-stripping artifact — recorded as a standing trap warning in the audit. |
| **L1** e2e footer title 10→11 | **CLOSED** | `e2e/navigation.spec.ts` title updated; suite green. |
| **L2** built-config comment host | **CLOSED** | `playwright.built.config.ts` cites the canonical live host. |
| **L3** dead `allowScripts` | **CLOSED** | Removed from `package.json` (`pnpm-workspace.yaml` `allowBuilds` is effective); full gate re-verified. |
| **L4** apple-touch-icon | **OPEN — deferred (Low)** | Optional enhancement; not blocking. Left for a future design pass with a proper 180×180 asset. |

## Commit series (main)

1. `9b31bf0` fix(seo): point og:image at the deploying host (round-20 H4)
2. `c1ba645` fix(build): scope Tailwind auto-content-detection to src/ (round-20 H1)
3. `dd6fac9` test(e2e): wait for the skip link before keyboarding the focus-ring contract (round-20 M1)
4. `fbf05cb` chore: round-20 hygiene — e2e title, built-config comment, dead allowScripts (L1–L3)
5. (this commit) docs: re-pin AGENTS/CLAUDE/README/SKILL + round-20 audit/plan/validation (H2) + docs-contract extension

## Post-remediation measurements

- `dist/index.html` = **386,622 B** (~387 kB); CSS block = **44,368 B**; JS bundle unchanged in content, 2 inline scripts sha256-pinned.
- Unit: **30 test files / 188 tests** green (docs-contract now 13).
- E2E: **11 spec files / 69 tests** green on dev and dist (69/69 ×4 runs total after deflake).
- Live host E2E (pre-fix artifact): 67/67 — behavioral parity of the deployed site confirmed before remediation; redeploy + re-run pending (owner).

## What remains open (owner actions)

1. **H3** — serve the five security headers at the host (Cloudflare Transform Rules or a `_headers`-reading host). Verify with `curl -sI`.
2. **M2/I1** — redeploy the remediated artifact from a clean `pnpm build` of HEAD; re-run the 69-spec suite with `E2E_BASE_URL=https://blessed-sacrament-church.jesspete.shop`; record provenance (commit + live↔dist diff) in SKILL Appendix B.
3. **C1 (carried since round-6)** — rotate the deploy key recoverable from git history.
4. **L4** — optional `apple-touch-icon` asset.
