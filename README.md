# Blessed Sacrament Church

![version 1.4.4](https://img.shields.io/badge/version-1.4.4-33100f)
![React](https://img.shields.io/badge/React-19.2.8-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.3.6-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.3.3-06B6D4?logo=tailwindcss&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)
![License Private](https://img.shields.io/badge/license-Private-lightgrey)

> **Static parish site for Blessed Sacrament Church, Queenstown** — 1 Commonwealth Drive, Singapore 149603 — the Tent of Meeting with its folded blue roof by Y. Gordon Dowsett, blessed 8 May 1965 by Archbishop Michel Olçomendy. A conserved house of prayer (URA 2005) served by the Congregation of the Sacred Hearts of Jesus and Mary (SS.CC) since 1965. Ported from [www.bsc.org.sg](https://www.bsc.org.sg/).

A single-file React SPA — warm editorial design (Fraunces + Source Sans 3) on the bespoke `shrine-*` token palette, `HashRouter` for static-host deep-links, and file-backed content (`src/data/*`) with no backend or CMS. Ships as one `dist/index.html` to GitHub Pages or S3. Queenstown's first satellite town still gathers under one blue tent — Damien Hall in 1963, the tent in 1965, a conserved nave in 2005, and the $9.4 m Tent of Meeting Restoration 2019–2023.

## Key Features

Every row below is implemented — no placeholders. Pages are named exports from `src/pages/` and driven by `src/data/nav.ts` + `content.ts` + `site.ts`.

|  | Feature | What it does |
|---|---|---|
| ☀️ | **Home — A tent of meeting** | Hero with `hero-ken-burns` + quick facts (Corpus Christi / Commonwealth EW20 / Tent of Meeting / SS.CC) — `site.feast` (Corpus Christi, Thursday after Trinity), `site.transport` (Commonwealth EW20, buses 11041/11049), and 6.30 p.m. weekday rhythm. Welcome (`site.tagline` To be an evangelising church with a Eucharistic spirituality. + `site.vision` A tent of meeting in Queenstown. + Damien of Molokai → folded blue roof narrative), 3-place grounds preview (`grounds` → Main Church / Adoration Chapel / Father Damien Centre), and 4 featured events from `upcomingEvents` (Corpus Christi feast-first). |
| ⛪ | **About — the household** | Parish mission via 3 ghost-numeral pillars (Eucharist / Evangelise / Sacred Hearts SS.CC), priests (`priests` — 5: Fr Johan Wongso SS.CC Parish Priest, Fr Rusdi Santoso SS.CC, Fr Karolus Kapolok Huar SS.CC, Fr Sambodo Sru Ujianto SS.CC · Chaplain of KKIS, Fr Anthony Hutjes SS.CC Priest in Residence), and household (`ppcMembers` — 6: Parish Priest ex-officio + Pastoral Associate Victor Leong / Chinese Pastoral Associate Catherine Wong / Youth Pastoral Associate Mendoza Alyzza Miclat + mission + congregation). |
| 📜 | **History — 1958–2026** | 8-entry `lifeTimeline` via `Timeline` — Sacred Hearts arrive 1958 (van Soest & Tiggeloven) → Damien Hall 7 Nov 1963 → Tent of Meeting 8 May 1965 (Y. Gordon Dowsett, folded blue roof) → Queenstown fills the pews 1970–1984 (6,000 → 7,000) → Damien Centre 1982 → conserved house 2005–2007 (URA 2005, rebuilt 22 Sep 2007) → TOMR 2019–2023 ($9.4 m, reopened Oct–Nov 2023) → Eucharistic spirituality 2023–2026 (Corpus Christi mission, 5 languages under one tent). |
| 🙏 | **Worship — Mass, mercy & Find Us** | Anchor-linked sections with `scroll-mt-28` + `Layout` hash restore: `#mass` (Mass schedule from `site.mass`: weekdays 8.30 a.m./12.30 p.m./6.30 p.m., Sat 8.30 a.m. + 6.00 p.m. sunset + 7.30 p.m. Tamil 3rd Sat only, 6 Sunday Masses — 7.30 Mandarin / 9.00 English / 11.00 English / 1.00 p.m. Indonesian last Sunday / 3.15 Tagalog (English 3rd Sun) / 5.30 English + note public holidays 8.30 only — the card matching today via `massDayKey` carries a gold top rule + "Today" chip), `#confession` (reconciliation after 8.30 + 15 min before 12.30/6.30, Sat after 8.30 & from 5.45, Sun 7.15/8.45/10.45/5.15 + Adoration Chapel daily 9–21 + 6 `devotions`: Divine Mercy Fri 20.00 / Novena Sat 17.00 / Sacred Heart 1st Fri 19.00 / Immaculate Heart 1st Sat 09.00 / Intercessory 2nd Fri 19.45 / Daily Adoration), `#visit` (1 Commonwealth Drive S149603, parish office Mon–Fri 10–18 / Sat–Sun 9–18 closed 13–14 lunch, MRT Commonwealth EW20 ~15 min walk + buses 11041 Opp/11049, `mapsEmbedSrc` iframe). Aliases: `/mass-times`, `/hours-location`, `/visit` → `/worship`. |
| 🧭 | **Ministries — 6 with jump nav** | Pill-bordered jump nav (`/ministries#<id>`) + alternating `shrine-cream`/`shrine-parchment` sections from `ministries` (6 ids): Liturgical, Faith Formation (catechism/RCIA/Little Shepherds), Pastoral Care (home/hospital/bereavement → `bsc.pastoral@catholic.org.sg`), Family Life (baptism/marriage → `bsc.secretariat@catholic.org.sg`), Youth (associate Mendoza Alyzza Miclat → `bsc.youthpastoral@catholic.org.sg`), Language Communities (Mandarin Sun 7.30, Tamil 3rd Sat 19.30, **Indonesian last Sun 13.00** KKIS / Fr Sambodo, Tagalog 15.15 English on 3rd Sun). Canonical `/ministries`, alias `/ministry`. |
| 📰 | **News & Events** | 6 `upcomingEvents` (`NewsEvents` page, compact `PageHero`): **Corpus Christi** (Thursday after Trinity — feast-first), First Friday Sacred Heart (1st Fri 19.00 + vigil 22.00–05.00), RCIA enquiry (year-round → Easter Vigil), Parish catechism (Sundays in term), KKIS Indonesian community (last Sun 13.00), Archdiocesan news (catholic.sg) — categories `Parish`/`Devotion`/`Formation`/`Archdiocese` with `EventMeta` chips. Canonical `/news-events`, alias `/news-and-events`. |
| 🤝 | **Serve — take a place** | 4 `serveRoles` (Liturgical ministers / Catechists & facilitators / Pastoral care / Hospitality & grounds) with `bsc.pastoral@catholic.org.sg` / `bsc.secretariat@catholic.org.sg`. No section ids. Canonical `/serve`, alias `/volunteer`. |
| 💛 | **Give · FAQ · NotFound** | **Give** — closes with a dark band (office 6474 0582 + WhatsApp 9170 9133 from `site.ts`). 8 `givingOptions` (PayNow via parish office **no UEN published**, General Church Offering, Poor & Needy, Church Maintenance for the 1965 conserved tent, **cheque payable to `Blessed Sacrament Church`**, cash at 1 Commonwealth Drive, Mass offerings, Thanksgiving for TOMR restoration — no HRSM; icons `flame`/`church`/`sprout`/`heart`/`book`/`hand-heart`/`landmark`/`globe`). Alias `/donate`. **FAQ** — 6 questions (Mass times incl. languages, confession windows, how to get there Commonwealth EW20/buses 11041/11049, parking limited, baptism/marriage/Mass intention via `bsc.secretariat@catholic.org.sg` + 6474 0582 + WhatsApp 9170 9133 office-hours-only, office hours Mon–Fri 10–18 / Sat–Sun 9–18 closed 13–14) via `Accordion` (single-open) at `/faq`. **NotFound** — `*` catch-all (404, "This path does not lead to the church"). |

## Architecture

### Tech Stack

| Layer | Technology | Version | Purpose |
|---|---|---|---|
| UI | React | `19.2.8` | Functional components + hooks only |
| Routing | React Router | `7.18.2` | `HashRouter` — 17 `Route` entries (16 content paths + `*` → `NotFound`), 5 alias groups / 7 alias paths, hash anchors `#mass`/`#confession`/`#visit` + 6 ministry ids (`HashRouter` + `Layout` outlet) |
| Build | Vite | `7.3.6` | HMR dev, single-file prod build (+ `@vitejs/plugin-react 5.2.0`) |
| Styling | Tailwind CSS + `@tailwindcss/vite` | `4.3.3` / `4.1.17` | CSS-first `@theme` tokens in `src/index.css` |
| Language | TypeScript | `5.9.3` | `strict` + `noUnusedLocals/Params`, `bundler` mode, `@` alias |
| Icons | lucide-react | `1.38.0` | Header/footer + page iconography |
| Utils | clsx + tailwind-merge | `2.1.1` / `3.6.0` | `cn()` class merging — always merge via `cn()` |
| Bundling | vite-plugin-singlefile | `2.3.3` | Inlines JS+CSS into `dist/index.html` (`public/images/` copied to `dist/images/`) |
| Testing | Vitest + Testing Library + jsdom | `3.2.6` / `16.2.0` / `26.1.0` | `vitest run` — **17 files / 118 tests green** (harness `src/test/setup.ts` restored — F1; BSC fixtures; round-13/14 guard suites included). |
| E2E | Playwright | `1.55.1` | `chromium`, `webServer` → `pnpm exec vite --port 5173 --host 127.0.0.1 --strictPort`, `e2e/` — **8 spec files + helpers — 51 tests green — retargeted to BSC** (A tent of meeting, 1 Commonwealth Drive, Commonwealth EW20); built-artifact pass: `pnpm test:e2e:built` (`playwright.built.config.ts` — `vite preview :4173`, `E2E_BASE_URL` → live host)
| Linting | ESLint flat + typescript-eslint + react-hooks | `9.39.5` / `8.28.0` / `5.2.0` | `eslint . --max-warnings 0`, `eslint.config.js` (ignores `dist`, `skills`, `src.orig`) |
| Fonts | Google Fonts | — | `Fraunces` (display) + `Source Sans 3` (body) via `index.html` |

Versions pinned exact in `package.json` and match `pnpm-lock.yaml` (`--frozen-lockfile` in CI).

**Routing table — `src/App.tsx` (authoritative):**

| Path | Component | Alias / Canonical |
|---|---|---|
| `/` | `Home` | canonical |
| `/about` | `About` | canonical |
| `/history` | `History` | canonical |
| `/worship` | `Worship` | canonical for `/mass-times`, `/hours-location`, `/visit` |
| `/mass-times` | `Worship` | alias → `/worship` |
| `/hours-location` | `Worship` | alias → `/worship` |
| `/visit` | `Worship` | alias → `/worship` |
| `/ministries` | `Ministries` | canonical for `/ministry` |
| `/ministry` | `Ministries` | alias → `/ministries` |
| `/news-events` | `NewsEvents` | canonical for `/news-and-events` |
| `/news-and-events` | `NewsEvents` | alias → `/news-events` |
| `/serve` | `Serve` | canonical for `/volunteer` |
| `/volunteer` | `Serve` | alias → `/serve` |
| `/give` | `Give` | canonical for `/donate` |
| `/donate` | `Give` | alias → `/give` |
| `/faq` | `FAQ` | canonical |
| `*` | `NotFound` | catch-all |

Hash anchors: `/worship#mass`, `/worship#confession`, `/worship#visit` (Worship, via `primaryNav` children + footer) and `/ministries#liturgical` / `#faith-formation` / `#pastoral-care` / `#family-life` / `#youth` / `#mandarin` (Ministries jump nav — `ministries.map → /ministries#<id>`; language communities id is `mandarin` per `content.ts`). Ministries and Worship use `<Link to="/…#id">` to preserve `HashRouter` route; plain `<a href="#id">` would replace the hash and route to `NotFound`.

### System Diagram

```mermaid
flowchart TB
  B[Browser] --> R[HashRouter — src/App.tsx — 17 entries]
  R --> L[Layout — scroll & hash restore — double-hash aware + 80ms + page-in keyed container]
  L --> H[Header — sticky + useScrolled(16) + primaryNav dropdown + mobile modal drawer + Escape]
  L --> P[Pages — 10: Home / About / History / Worship / Ministries / NewsEvents / Serve / Give / FAQ / NotFound]
  L --> F[Footer — 4-col + divider-weave-thin + 2 socials (Facebook/Instagram) + Archdiocese link + site.ts]
  P --> D[src/data — nav.ts + content.ts (1958–2026 Tent of Meeting) + site.ts (1 Commonwealth Drive)]
  H & F & P --> S[Tailwind @theme — src/index.css — shrine-* 26 colors + 2 shadows + gold-700]
  R --> V[Vite 7.3.6 + viteSingleFile 2.3.3]
  V --> O[dist/index.html 392.96kB + dist/images/ — single file + public assets]
  O --> G[GitHub Pages / S3]
```

`HashRouter` is intentional — static hosts have no SPA fallback, so `/#/worship#mass` works without server rewrites.

## File Hierarchy

```
📂 blessed-sacrament-queenstown/
├── 📄 index.html            # lang, viewport, meta description (BSC 1 Commonwealth Drive · Tent of Meeting), CSP `img-src 'self' data: blob:` only, Google Fonts (Fraunces + Source Sans 3), #root + Church JSON-LD (BSC, 149603, +65 6474 0582)
├── 📄 eslint.config.js      # flat config (typescript-eslint 8 + react-hooks 5 + react-refresh) — ignores [dist, node_modules, coverage, playwright-report, test-results, skills, src.orig]
├── 📄 playwright.config.ts  # Playwright 1.55 (chromium, webServer → pnpm exec vite :5173, expect timeout 15s)
├── 📄 playwright.built.config.ts  # Playwright vs the built artifact — vite preview :4173 (or E2E_BASE_URL → live host); catches singlefile dev/build divergence
├── 📄 vite.config.ts        # plugins [react, tailwindcss, viteSingleFile] + alias @→src + test {globals, jsdom, setupFiles: src/test/setup.ts (restored — F1), include: src/**/*.{test,spec}.{ts,tsx}, exclude: e2e/** } + server.watch.ignored [skills/**, dist/**, playwright-report/**, test-results/**, coverage/**, src.orig/**]
├── 📄 tsconfig.json         # ES2020 / ESNext / bundler / strict + noUnusedLocals/noUnusedParameters/noFallthroughCasesInSwitch/isolatedModules/noEmit + include [src, vite.config.ts, eslint.config.js, playwright.config.ts, playwright.built.config.ts] + types [node, vitest/globals] + paths @/*
├── 📄 package.json          # scripts: dev / build / preview / typecheck / lint / test / test:e2e / test:e2e:built / test:watch + pnpm@11.0.0 + engines node>=20 (all deps pinned exact)
├── 📄 pnpm-lock.yaml        # committed — deterministic installs via `pnpm install --frozen-lockfile` (CI)
├── 📂 public/
│   ├── 📂 images/           # 8 files: hero-church.jpg, chapel-interior.jpg, sanctuary.jpg, rosary-garden.jpg, stained-glass.jpg, parish-hall.jpg, cemetery.jpg, feast.jpg (Vite publicDir → dist/images/ — upload alongside dist/index.html); all local — CDN keys hero/naveCdn/courtyardCdn point to local fallbacks
│   └── 📄 _headers          # Cloudflare Pages security headers (HSTS/XCTO/XFO/Referrer-Policy/Permissions-Policy) → dist/_headers — honored only on Cloudflare Pages deploys + favicon.svg (referenced by index.html) + robots.txt (round-13)
├── 📂 src/                  # 58 files — 40 source + 17 tests / 94 tests green + 1 setup (harness restored F1)
│   ├── 📄 App.tsx           # HashRouter + 17 Route entries (16 content paths + * → NotFound; 5 alias groups / 7 alias paths; hash anchors #mass/#confession/#visit + 6 ministry ids)
│   ├── 📄 main.tsx          # StrictMode + createRoot + resolveHashRedirect pre-mount rewrite
│   ├── 📄 index.css         # @theme shrine-* tokens (26 colors incl. gold-700 #85601f + 2 shadows) + @layer base/utilities (28+ utilities: text-balance, bg-adobe-texture, bg-gold-bloom, bg-grain, divider-weave, divider-weave-thin, gold-rule, gold-rule-left, hero-ken-burns, img-zoom, mask-fade-b, reveal, reveal-visible, rise-in + rise-in-d1..d4, menu-in, drawer-in, drawer-item-in, page-in, dot-pulse, card-lift, card-tint, link-underline, skip-link, bloom-drift + 9 keyframes)
│   ├── 📂 components/
│   │   ├── 📄 Layout.tsx    # Outlet + scroll/hash restoration (double-hash aware, split on #, strip /, setTimeout 80ms, fallback window.scrollTo) + ScrollProgress + SkipLink + keyed page-in container
│   │   ├── 📄 Header.tsx    # fixed maroon-950 bar, useScrolled(16), hover/focus-open dropdown (primaryNav; trigger has no click-toggle — keyboard via onFocusCapture), mobile modal drawer (dialog + aria-modal + focus trap + focus restore; closes on in-drawer link, Escape, outside tap), includes top bar Give link
│   │   ├── 📄 Footer.tsx    # 4-col + divider-weave-thin + 2 socials (Facebook/Instagram) + Archdiocese text link + site.ts address 1 Commonwealth Drive
│   │   ├── 📄 PageHero.tsx  # maroon hero primitive (bg-grain + gradients + rise-in)
│   │   ├── 📄 Emblem.tsx    # inline SVG emblem
│   │   ├── 📄 SafeImage.tsx # local fallback (fallback default /images/hero-church.jpg, lazy, onError dataset.fallback guard, optional fetchPriority)
│   │   ├── 📄 SkipLink.tsx  # skip-to-main-content (preventDefault + focus #main-content; never rewrites hash)
│   │   ├── 📄 SocialIcons.tsx # hand-drawn brand glyphs (3 icons)
│   │   ├── 📄 Timeline.tsx  # gradient rail + display-serif years + Reveal — renders lifeTimeline (1958–2026 Tent of Meeting)
│   │   ├── 📄 BackToTop.tsx # threshold 480 + SVG progress ring (stroke-dashoffset via useScrollProgress) + reduced-motion
│   │   ├── 📄 ScrollProgress.tsx # fixed gold rail (scaleX progress, aria-hidden, z-[60])
│   │   └── 📂 ui/           # Button (to/href/button + icon; variants primary|secondary|ghost|outline-light), Container, SectionHeading, Accordion (single-open, inert), Reveal
│   ├── 📂 hooks/            # 3 files — useScrolled + useScrollProgress + useScrollSpy (restored F2A)
│   │   ├── 📄 useScrolled.ts # scrollY > threshold → scrolled boolean (default 12; Header passes 16)
│   │   └── 📄 useScrollProgress.ts # 0..1 progress, rAF-throttled, unscrollable guard
│   ├── 📂 pages/            # Home, About, History, Worship, Ministries, NewsEvents, Serve, Give, FAQ, NotFound (10 files, all named exports)
│   ├── 📂 data/
│   │   ├── 📄 nav.ts        # primaryNav (6 top-level: Home / About{The Parish, Our History, FAQ} / Worship{Mass Times, Confession & Adoration, Find Us} / Ministries{Liturgical, Faith Formation, Pastoral Care} / News & Events / Serve) + footerNav 10 links
│   │   ├── 📄 content.ts    # 8 interfaces + images 11 (all local) + priests 5 (Johan/Rusdi/Karolus/Sambodo/Anthony — SS.CC) + ppcMembers 6 + lifeTimeline 8 (1958–2026) + grounds 3 (main-church/chapel/rosary-garden→Damien Centre) + ministries 6 (liturgical/faith-formation/pastoral-care/family-life/youth/mandarin→Language Communities) + faqs 6 + upcomingEvents 6 (Corpus Christi feast-first, Parish/Devotion/Formation/Archdiocese) + givingOptions 8 (no UEN, cheque Blessed Sacrament Church) + serveRoles 4 + devotions 6
│   │   └── 📄 site.ts       # canonical single source: name Blessed Sacrament Church/shortName BSC Queenstown/chineseName 圣体堂/tagline To be an evangelising church with a Eucharistic spirituality./vision A tent of meeting in Queenstown./congregation SS.CC, address 1 Commonwealth Drive 149603, hours (gates/mainChurch/chapel/reception/parishOffice/adorationRoom), mass (weekdayMorning 8.30+12.30/weekdayEvening 18.30/saturday 8.30+18.00+19.30 Tamil 3rd Sat/sunday×6 incl. Mandarin 7.30 + Indo last Sun 13.00 + Tagalog 15.15/confession/adoration/secondCollection + note public holidays + monthly), contact (6474 0582 / WhatsApp 9170 9133 + bsc.secretariat@catholic.org.sg / pastoral / youth / whatsapp), transport (Commonwealth EW20 ~15 min + buses 11041/11049), feast Corpus Christi Thursday after Trinity, chequePayee Blessed Sacrament Church, socials + parishUpdates/www.bsc.org.sg + sacredHearts + mapsUrl/mapsEmbedSrc — Footer + Worship + About consume it, don't duplicate
│   ├── 📂 utils/            # 4 files — cn + massDay + monogram + deepLinks
│   │   ├── 📄 cn.ts         # twMerge(clsx) — always merge via cn()
│   │   ├── 📄 massDay.ts    # massDayKey(date) — single source for the Worship today-highlight
│   │   ├── 📄 monogram.ts   # monogram(name) — honorific stripping for priest discs
│   │   └── 📄 deepLinks.ts  # knownRoutePaths + resolveHashRedirect — path-style deep links rewrite to hash routes pre-mount + drift guard
│   └── 📂 **/*.test.{ts,tsx} # 17 files (16 restored BSC files / 94 tests + round-13 docs-contract guard) — green
├── 📂 e2e/                  # 8 spec files + helpers.ts — 51 tests green (BSC retargeted F2B): smoke.spec.ts (11) + navigation.spec.ts (8) + ministries.spec.ts (4) + give-faq.spec.ts (4) + enhancements.spec.ts (7) + enhancements-round5.spec.ts (6) + enhancements-round7.spec.ts (8) + deep-links.spec.ts (3)
│   ├── 📄 smoke.spec.ts     # hero + rise-in entrance + Worship/Ministries aliases + hash anchors + NotFound + mobile drawer + event chips + back-to-top (BSC)
│   ├── 📄 navigation.spec.ts# desktop Worship/Ministries dropdown + keyboard + SkipLink + footer 10 links + Give + aria-current (BSC)
│   ├── 📄 ministries.spec.ts# 6 sections + jump nav + imageAlt (BSC)
│   ├── 📄 give-faq.spec.ts  # Give 8 options + FAQ accordion + Worship Find Us + maps (BSC — no UEN)
│   ├── 📄 enhancements.spec.ts + enhancements-round5.spec.ts + enhancements-round7.spec.ts # motion/chip/ring/sticky contracts (BSC)
│   └── 📄 helpers.ts        # gotoHash + expectHash helpers
├── 📄 .github/workflows/ci.yml # CI: lint → typecheck → test → test:e2e → build + artifacts (Node 24, pnpm 11)
├── 📂 docs/                 # historical Risen Christ audits retained for lineage (marked historical) + BSC port docs
│   ├── 📄 prompts.md        # Intent lineage
│   ├── 📄 validation-src-vs-src.orig-2026-08-30.md # (historical — St Mary 10/10 contracts adopted)
│   ├── 📄 ui-ux-remediation-plan-2026-08-28.md # (historical — St Mary Sacred Motion)
│   ├── 📄 code-review-audit-2026-08-28.md  # (historical — St Mary round-2)
│   ├── 📄 code-review-audit-round3-2026-08-30.md # (historical — St Mary round-3)
│   ├── 📄 remediation-plan-round3-2026-08-30.md # (historical — St Mary round-3)
│   └── 📄 remediation-round4-2026-08-30.md # (historical — round-4 L-5 drawer→modal — still applies)
├── 📂 skills/               # vendored reference content (skills-catalog.md + per-skill SKILL.md — tracked; lint/build tooling ignores it, do not import)
├── 📄 CLAUDE.md             # Deep conventions (authoritative — update alongside README)
└── 📄 AGENTS.md             # Compact agent cheat sheet
```

Current audits — **2026-09-01 round-13 (Blessed Sacrament): all gates green — `pnpm lint` 0 + `pnpm typecheck` 0 + `pnpm test` 17 files / 117 tests + `pnpm test:e2e` 51/51 + `pnpm build` 391.57 kB + `pnpm test:e2e:built` 51/51; live host verified (byte-identical deploy 391,565 B, 15-route browser journey, zero console errors). Round-13 tiered audit (`docs/code-review-audit-round13-2026-09-01.md`): C1 leaked deploy key recoverable from git history — **rotate the key**; H1 host-level security headers not served by the current host — add via Cloudflare config; docs/repo drift re-pinned. Round-14 (2026-09-02, `docs/validation-round14-2026-09-02.md` + independent re-validation `docs/validation-round14-addendum-2026-09-02.md`): the M1 build-size claim is **refuted** — clean build is byte-identical 391,565 B, 473,650 B reproduces only without the `@source not "../skills/**"` Tailwind pin (a 420 kB built-artifact budget guard now fails that class in CI); M4/L1 were already remediated in `6e0e991`; docs re-pinned to 17 files / 117 tests; all six gates re-green (lint 0, typecheck 0, test 117, e2e 51/51 dev + built, build 391.57 kB). Round-15 (2026-09-02, `docs/design-enhancement-round15-2026-09-02.md`): visual/UI-UX/motion remediation under the round-15 motion contract — Ken Burns drift on PageHero imagery + retuned hero gradients (photography breathes, bottom-anchored text contrast preserved), History timeline rail draw-in + staggered `Reveal` entries, `bloom-drift` ambient glow on the three dark CTA bands (keyframes 8→9, utilities 27→28), BackToTop lift entrance, Worship confession grid centering, hero fact-row un-wrapped, NewsEvents `Read more` gains an external-link affordance icon; guards extended first (docs-contract 23 checks), 17 files / 118 tests green, e2e 51/51 dev + built, build 392.96 kB.`index.html` already BSC (1 Commonwealth Drive, Corpus Christi, Commonwealth EW20, Fraunces + Source Sans 3, CSP `img-src 'self' data: blob:`). Historical audits (Risen Christ / St Mary) are retained in `docs/` and marked **(historical)** — **2026-08-31 Risen Christ port** lint 0 + typecheck 0 + 35/202 + 51 E2E + 397.52 kB, **round-6 tiered review & security audit** (`docs/code-review-audit-round6-2026-08-31.md`), **round-7 "Honest Light"** (`docs/design-enhancement-round7-2026-08-31.md`), **round-7 audit** (`docs/code-review-audit-round7-2026-08-31.md` + `docs/remediation-plan-round7-2026-08-31.md`), **round-9 built-artifact contract** (`docs/remediation-plan-round9-2026-08-31.md` — `playwright.built.config.ts`), **round-11 live E2E** (`docs/e2e-live-pass-round11-2026-08-31.md`), **round-12 comparative audit** (`docs/UI-UX-Design-Audit_StMaryOfAngels_vs_RisenChrist.md` + `docs/remediation-plan-round12-2026-08-31.md` + `docs/remediation-round12-2026-08-31.md`).

## Quick Start

**Requirements:** Node.js ≥20 (Vite 7), `pnpm` preferred (`npm` works).

```bash
# 1 — Clone
git clone <repo-url> blessed-sacrament-queenstown && cd blessed-sacrament-queenstown

# 2 — Install (deterministic)
pnpm install --frozen-lockfile
# npm is not a drop-in for these exact pins: typescript-eslint 8.28.0's peer
# range predates TypeScript 5.9, so use `npm ci --legacy-peer-deps` if you
# must use npm (pnpm is the supported path).

# 3 — Run (HMR)
pnpm dev
# → Local: http://localhost:5173

# 4 — Production build (single file + public assets)
pnpm build
# → dist/index.html  JS+CSS inlined; dist/images/ copied from public/

# Preview prod build
pnpm preview
# → http://localhost:4173
```

### Verify Setup

```bash
pnpm lint               # eslint flat — expect no output (clean)
pnpm typecheck         # tsc --noEmit — expect no output (clean)
pnpm build              # expect: "✓ built in ~3s" + "Inlining: index-*.js / style-*.css"
ls -lh dist/index.html  # expect: single HTML file ~392.96 kB, no separate assets chunk
ls -lh dist/images/     # expect: 8 images (hero-church + chapel-interior + sanctuary + rosary-garden + stained-glass + parish-hall + cemetery + feast)
pnpm test               # expect: 17 files / 118 tests green (harness src/test/setup.ts restored)
pnpm test:e2e           # expect: 51 tests green (BSC retargeted F2B)
```

| Check | Expected |
|---|---|
| `pnpm dev` | Vite ready on `:5173`, HMR active |
| `pnpm lint` | Exit `0`, no warnings (`--max-warnings 0`) |
| `pnpm typecheck` | Exit `0`, no errors |
| `pnpm test` | **17 files / 118 tests green** (`src/test/setup.ts` restored — F1) |
| `pnpm test:e2e` | **51 tests / 8 spec files green** — BSC retargeted (smoke 11 + navigation 8 + ministries 4 + give-faq 4 + enhancements 7 + enhancements-round5 6 + enhancements-round7 8 + deep-links 3) |
| `pnpm build` | `dist/index.html` ~392.96 kB + `dist/images/` (8 files) + `dist/_headers` |
| `pnpm preview` | Prod preview on `:4173`, alias routes (`/mass-times`, `/ministry`, `/donate`, `/volunteer`…) + hash anchors (`#/worship#mass`, `#/ministries#liturgical`) navigate |

## Design System

Tokens live in `src/index.css` `@theme`. Extend there — never use arbitrary `bg-[#...]`.

| Token | Hex | Usage |
|---|---|---|
| `shrine-cream` | `#faf6ec` | Page background |
| `shrine-parchment` | `#f2e9d6` | Section bands, card fills |
| `shrine-parchment-dark` | `#e7d9b8` | Dark parchment variant |
| `shrine-stone` | `#dccfae` | Borders, dividers |
| `shrine-ink` | `#2a2115` | Primary text |
| `shrine-charcoal` | `#423a2c` | Secondary text |
| `shrine-maroon-50` | `#fbf0ee` | Ghost hover bg |
| `shrine-maroon-500` | `#7c2a25` | Eyebrow, links |
| `shrine-maroon-600` | `#691f1e` | Header icon, secondary button |
| `shrine-maroon-700` | `#55191a` | Display heading |
| `shrine-maroon-800` | `#431315` | Mid-dark maroon |
| `shrine-maroon-900` | `#33100f` | Hero + footer background |
| `shrine-maroon-950` | `#200a0a` | Deepest maroon (header top strip) |
| `shrine-gold-300` | `#e2bf72` | Eyebrow on dark, header accent |
| `shrine-gold-400` | `#d1a955` | Gold mid |
| `shrine-gold-500` | `#c3963f` | Primary button |
| `shrine-gold-600` | `#a67a2e` | Gold hover |
| `shrine-gold-700` | `#85601f` | Deep gold — text on parchment + hover shade |
| `shrine-pine-500` | `#335840` | Pine accent |
| `shrine-pine-600` | `#26402f` | Accent / weave |
| `shrine-terracotta-500` | `#ab5f3c` | Devotion chip border (decorative) |
| `shrine-terracotta-600` | `#8f4c30` | Devotion chip text — AA 5.36:1 on parchment |
| `shadow-shrine` | `0 20px 60px -20px rgba(51,16,15,.45)` | Hero, cards, emblem |
| `shadow-shrine-lg` | `0 40px 90px -30px rgba(51,16,15,.55)` | Elevated cards, header dropdown |

**Typography:** `Fraunces` (display, quote, `font-display` / `h1–h4`) + `Source Sans 3` (body, `font-sans` / `font-body` alias) — loaded in `index.html`, set in `@theme` + `@layer base`. Utilities: `text-balance`, `bg-adobe-texture`, `bg-gold-bloom`, `bg-grain`, `divider-weave` / `divider-weave-thin`, `gold-rule` / `gold-rule-left`, `reveal` / `reveal-visible`, `skip-link`, `mask-fade-b`, `hero-ken-burns` (20s Ken Burns), plus the "Sacred Motion" set: `rise-in` (+ `rise-in-d1..d4` stagger delays) for hero/PageHero entrances, `menu-in` / `drawer-in` / `drawer-item-in` / `page-in` for dropdown/drawer/route entrances, `card-lift` (hover lift + shadow + gold border) for every interactive card, `card-tint` (honest tint) for info cards, `link-underline` (gold underline draws in on hover/focus), `dot-pulse` (timeline halo). All are transform/opacity-only and gated by the global `prefers-reduced-motion` block in `src/index.css`.

## Deployment

Primary artifact `dist/index.html` (~392.96 kB, + `dist/images/` — 8 files, + `dist/_headers`) — no server, no env vars, no rewrites needed. The artifact ships a scoped `Content-Security-Policy` meta (`img-src 'self' data: blob:` only, `object-src 'none'`, `base-uri 'self'`, Google Fonts, `frame-src` Google Maps) + a `Referrer-Policy` meta. `public/_headers` adds the host-level headers a static file cannot set (HSTS, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`) — **on Cloudflare Pages only**. The current host is not assumed to be Pages — those headers are not served on generic static hosts (S3, GH Pages, proxied origins) without an explicit host config. Add the five headers via the host's header config (Cloudflare Transform Rules / `_headers` on Pages / S3 metadata) if the deployment target is not Pages.

CSP (current `index.html`): `img-src 'self' data: blob:` + `script-src 'self' 'unsafe-inline' https://static.cloudflareinsights.com` + `object-src 'none'` + `base-uri 'self'` + `frame-src https://www.google.com` + `style-src https://fonts.googleapis.com`; `<meta name="referrer" content="strict-origin-when-cross-origin">`.

```bash
pnpm build                # produces dist/index.html + dist/images/ (publicDir copy — singlefile inlines JS+CSS, not public/)
# GitHub Pages — push dist/index.html + dist/images/ to gh-pages or serve dist/ as artifact
# S3 / CloudFront — upload dist/index.html as index.html + dist/images/ assets
pnpm preview              # smoke-test before publish
```

Why `HashRouter`: deep-links like `/#/worship#mass` or `/#/ministries#liturgical` resolve without host fallback config (GitHub Pages / S3 have no SPA rewrites). Switching to `BrowserRouter` would require a `404.html` redirect shim. Legacy aliases (`/mass-times`, `/hours-location`, `/visit` → `/worship`; `/ministry` → `/ministries`; etc.) preserve old parish bookmarks. Path-style deep links are rewritten pre-mount via `src/utils/deepLinks.ts` (`resolveHashRedirect`) so a bare `/worship` still lands correctly.

## Contributing

This repo follows the six-phase workflow in `CLAUDE.md` (ANALYZE → PLAN → VALIDATE → IMPLEMENT → VERIFY → DELIVER).

- **TDD:** `RED → GREEN → REFACTOR → Commit` — one cycle per commit; write a failing test before fixing a bug. The Vitest harness is restored (F1) — `pnpm test` (17/118) gates again alongside lint/typecheck/build.
- **Commits:** Conventional Commits — `feat:`, `fix:`, `docs:`, `chore:`, `refactor:`, `style:` — atomic, subject ≤72 chars.
- **Branches:** `feat/<slug>`, `fix/<slug>`, `docs/<slug>` — short-lived (1–3 days), squash-merge.
- **Conventions:** `PascalCase.tsx` for components/pages, `camelCase.ts` for data/utils, `primaryNav` single-source, alias routes preserved, `cn()` for merges, `shrine-*` tokens only (including `shrine-gold-700` `#85601f`).
- **Pre-push gate:** `pnpm lint && pnpm typecheck && pnpm test && pnpm test:e2e && pnpm build` — **all five green** (lint 0 + typecheck 0 + 17/118 + 51/51 + 392.96 kB). CI mirrors this in `.github/workflows/ci.yml` (Node 24, pnpm 11). Sixth built-artifact check: `pnpm test:e2e:built` — vs `vite preview`/live (also green).

> `skills/` is vendored reference content — tracked in full (`0be0fe8`, 2026-08-31; catalog + per-skill `SKILL.md` files); lint/build tooling ignores it — do not import from or lint it. `src.orig/` is **not part of the repository** (the historical 77-file Risen Christ archive lived only in the port session's local worktree); lineage lives in `docs/` + git history. See `AGENTS.md` for the compact cheat sheet.

## Troubleshooting

| Issue | Solution |
|---|---|
| `pnpm dev` port in use (`:5173`) | `pnpm dev -- --port 5174` or kill the other Vite process. |
| `Cannot find module '@/…'` or alias error | Ensure `vite.config.ts` alias `@→src` and `tsconfig.json` `paths {"@/*":["src/*"]}` stay in sync; restart dev server. |
| Hash anchor doesn't scroll (`#/worship#mass` or `#/ministries#liturgical` lands at top) | Target `id` missing — verify `id="mass"` / `id="confession"` / `id="visit"` in `Worship.tsx` or `id="liturgical"` etc. in `Ministries.tsx`; `Layout.tsx` is double-hash aware (`split on #` + strip `/`, `setTimeout 80ms`, fallback `window.scrollTo`). |
| Bare `href="#mass"` routes to NotFound | Use `<Link to="/worship#mass">` (or `/ministries#liturgical`) — plain `#id` replaces the `HashRouter` hash and routes to `*`. |
| `tsc --noEmit` fails on unused var | `noUnusedLocals/Params` is `true` — remove or prefix with `_` only if intentionally unused. |
| External image not loading | `SafeImage` falls back to `fallback` (default `/images/hero-church.jpg`) via `dataset.fallback` guard; current `images.*` are all local (8 images). |
| `pnpm test` finds 0 tests | **Not expected since F1** — the harness (`src/test/setup.ts` + suite) is restored; if Vitest finds nothing, check `vite.config.ts` `test.include`/`exclude` and that `*.test.{ts,tsx}` files exist under `src/`. |
| `pnpm test:e2e` fails | E2E is retargeted to BSC and green; if it fails after content changes, check which BSC assertion drifted (run `pnpm test:e2e:ui` to inspect). The old Risen-copy failure mode (`He is risen` / `Toa Payoh` / UEN) was retired by F2B. |
| `vite.config.ts` setupFiles warning | If Vitest warns `setupFiles` not found, confirm `src/test/setup.ts` exists (it does since F1) — a missing file here means the harness was deleted; restore it before expecting `pnpm test` to collect. |

## License

Private — all rights reserved. © Blessed Sacrament Church, Archdiocese of Singapore. No `LICENSE` file is published.

---

**Docs:** [`blessed-sacrament-queenstown_SKILL.md`](blessed-sacrament-queenstown_SKILL.md) (canonical) · [`risen-christ_SKILL.md`](risen-christ_SKILL.md) (redirect stub → blessed-sacrament-queenstown) · [`rothershrine-v2_SKILL.md`](rothershrine-v2_SKILL.md) (lineage stub) · [`CLAUDE.md`](CLAUDE.md) · [`AGENTS.md`](AGENTS.md) · Live: [www.bsc.org.sg](https://www.bsc.org.sg/) (canonical parish site)
