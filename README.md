# Blessed Sacrament Church

![version 1.4.4](https://img.shields.io/badge/version-1.4.4-1a2b55)
![React](https://img.shields.io/badge/React-19.2.8-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.3.6-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.3.3-06B6D4?logo=tailwindcss&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)
![License Private](https://img.shields.io/badge/license-Private-lightgrey)

> **Static parish site for the Church of the Blessed Sacrament, Queenstown** — 1 Commonwealth Drive, Singapore 149603 — the Tent of Meeting with its folded blue roof by Y. Gordon Dowsett, blessed 8 May 1965 by Archbishop Michel Olçomendy. A conserved house of prayer (URA 2005) served by the Congregation of the Sacred Hearts of Jesus and Mary (SS.CC) since 1958. Ported from [www.bsc.org.sg](https://www.bsc.org.sg/).

A single-file React SPA — warm editorial design (Fraunces + Source Sans 3) on the bespoke `bsc-*` sapphire-blue token palette, `HashRouter` for static-host deep-links, and file-backed content (`src/data/*`) with no backend or CMS. Ships as one `dist/index.html` to GitHub Pages or S3. Queenstown's first satellite town still gathers under one blue tent — Damien Hall in 1963, the tent in 1965, a conserved nave in 2005, and the Tent of Meeting Restoration 2019–2023.

## Key Features

Every row below is implemented — no placeholders. Pages are named exports from `src/pages/` and driven by `src/data/nav.ts` + `content.ts` + `site.ts`.

|  | Feature | What it does |
|---|---|---|
| ☀️ | **Home — A tent of meeting** | Hero with `hero-ken-burns` + quick facts (Corpus Christi / Queenstown EW19 · Commonwealth EW20 / Tent of Meeting / SS.CC) — `site.feast` (Corpus Christi, Sunday after Trinity), `site.transport` (Queenstown EW19 · Commonwealth EW20, buses 32/51/111/122/145/195/855), and 6.30 p.m. weekday rhythm. Welcome (`site.tagline` A Household of Faith, Hope & Love. + `site.vision` To be a vibrant Eucharistic community, drawing all to Christ through worship, formation, and service. + Damien of Molokai → folded blue roof narrative), 3-place grounds preview (`grounds` → Main Church / Damien Hall / Parish Grounds), and 6 featured events from `upcomingEvents` (Corpus Christi feast-first). |
| ⛪ | **About — the household** | Parish mission via 3 ghost-numeral pillars (Eucharist / Evangelise / Sacred Hearts SS.CC), priests (`priests` — 3: Fr Johan Wongso SS.CC Parish Priest, Fr William van Soest SS.CC Founding Parish Priest 1958–1970, Fr Odo Tiggeloven SS.CC Co-Founder 1958–), and household (`ppcMembers` — 6: Parish Priest ex-officio + Chairperson / Vice Chairperson / Secretary / Treasurer / Member). |
| 📜 | **History — 1954–Today** | 7-entry `lifeTimeline` via `Timeline` — A Church for Queenstown 1954 (Archbishop Olçomendy applies for a site) → The SS.CC. Arrives 1958 (van Soest & Tiggeloven from Holland) → Damien Hall Opens 1963 → Church Consecrated 1965 (Y. Gordon Dowsett, folded blue roof) → A Growing Community 1970s–80s (7,000+ parishioners) → Conservation Status 2005 (URA, iconic blue roof) → A Household of Faith Today (~1,900 parishioners, 40+ ministries). |
| 🙏 | **Worship — Mass, mercy & Find Us** | Anchor-linked sections with `scroll-mt-28` + `Layout` hash restore: `#mass` (Mass schedule from `site.mass`: weekdays 8.30 a.m./12.30 p.m./6.30 p.m., Sat 8.30 a.m. + 6.00 p.m. + 7.30 p.m. Tamil 3rd Sat only, 6 Sunday Masses — 7.30 Mandarin / 9.00 English / 11.00 English / 1.00 p.m. Indonesian last Sunday / 3.15 Tagalog (English 3rd Sun) / 5.30 English + note public holidays 8.30 only — the card matching today via `massDayKey` carries a gold top rule + "Today" chip), `#confession` (reconciliation after 8.30 + 15 min before 12.30/6.30, Sat after 8.30 & from 5.45, Sun before all Masses + 6 `devotions`: Divine Mercy Fri 20.00 / Novena Sat 17.00 / First Friday Adoration 19.00–05.00 / First Saturday Adoration 09.00 / Intercessory 2nd Fri 19.45 / Eucharistic Adoration daily 9–21), `#visit` (1 Commonwealth Drive S149603, parish office Mon–Fri 9–17.30 / reception Mon–Fri 9–17.30, MRT Queenstown EW19 · Commonwealth EW20 + buses 32/51/111/122/145/195/855, `mapsEmbedSrc` iframe). Aliases: `/mass-times`, `/hours-location`, `/visit` → `/worship`. |
| 🧭 | **Ministries — 6 with jump nav** | Pill-bordered jump nav (`/ministries#<id>`) + alternating `bsc-cream`/`bsc-parchment` sections from `ministries` (6 ids): Liturgical, Faith Formation (catechism/RCIA/adult faith), Pastoral Care (befriending/bereavement/outreach), Family Life (marriage/baptism/family enrichment), Youth & Young Adults (confirmation/retreats/campus), Community & Outreach (Mandarin/Tamil/Indonesian/Tagalog language communities + food drives & social outreach). Canonical `/ministries`, alias `/ministry`. |
| 📰 | **News & Events** | 6 `upcomingEvents` (`NewsEvents` page, compact `PageHero`): First Friday Eucharistic Adoration (1st Fri 19.00 + vigil 22.00–05.00), First Saturday Adoration & Tamil Vigil (1st Sat 09.00 + Tamil vigil 21.00–05.00), Divine Mercy Prayers (Fri 20.00), Novena to Our Lady (Sat 17.00), Intercessory Prayers (2nd Fri 19.45), Parish Feast Day — Corpus Christi (Sunday after Trinity) — categories `Parish`/`Devotion`/`Formation`/`Archdiocese` with `EventMeta` chips. Canonical `/news-events`, alias `/news-and-events`. |
| 🤝 | **Serve — take a place** | 4 `serveRoles` (Liturgical Ministers / Catechists & Facilitators / Pastoral Care / Hospitality & Grounds). No section ids. Canonical `/serve`, alias `/volunteer`. |
| 💛 | **Give · FAQ · NotFound** | **Give** — closes with a dark band (office +65 6474 0582 from `site.ts`). 6 `givingOptions` (PayNow via UEN **T08CC1234A**, Weekend Collection Tap & Give, Cheque payable to `Church of the Blessed Sacrament`, Cash at parish office, General Church Offering, Mass Offerings — icons `globe`/`church`/`book`/`heart`/`flame`/`sprout`). Alias `/donate`. **FAQ** — 6 questions (Mass times incl. languages, confession windows, how to get there Queenstown EW19/Commonwealth EW20/buses 32–855, parking available compound first-come, baptism/marriage via `secretariat@bsc.org.sg` + 6474 0582 six months ahead for weddings, join a ministry via Serve page or parish office) via `Accordion` (single-open) at `/faq`. **NotFound** — `*` catch-all (404, "This path does not lead to the church"). |

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
| Testing | Vitest + Testing Library + jsdom | `3.2.6` / `16.2.0` / `26.1.0` | `vitest run` — **17 files + setup harness green** (harness `src/test/setup.ts` — F1; BSC fixtures; round-13/14 guard suites included). |
| E2E | Playwright | `1.55.1` | `chromium`, `webServer` → `pnpm exec vite --port 5173 --host 127.0.0.1 --strictPort`, `e2e/` — **8 spec files + helpers — 51 tests green — retargeted to BSC** (A tent of meeting, 1 Commonwealth Drive, Queenstown EW19 · Commonwealth EW20); built-artifact pass: `pnpm test:e2e:built` (`playwright.built.config.ts` — `vite preview :4173`, `E2E_BASE_URL` → live host) |
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

Hash anchors: `/worship#mass`, `/worship#confession`, `/worship#visit` (Worship, via `primaryNav` children + footer) and `/ministries#liturgical` / `#faith-formation` / `#pastoral-care` / `#family-life` / `#youth` / `#community` (Ministries jump nav — `ministries.map → /ministries#<id>`; language communities id is `community` per `content.ts`). Ministries and Worship use `<Link to="/…#id">` to preserve `HashRouter` route; plain `<a href="#id">` would replace the hash and route to `NotFound`.

### System Diagram

```mermaid
flowchart TB
  B[Browser] --> R[HashRouter — src/App.tsx — 17 entries]
  R --> L[Layout — scroll & hash restore — double-hash aware + 80ms + page-in keyed container]
  L --> H[Header — sticky + useScrolled(16) + primaryNav dropdown + mobile modal drawer + Escape]
  L --> P[Pages — 10: Home / About / History / Worship / Ministries / NewsEvents / Serve / Give / FAQ / NotFound]
  L --> F[Footer — 4-col + divider-weave-thin + 2 socials (Facebook/Instagram custom SVG) + Archdiocese link + site.ts]
  P --> D[src/data — nav.ts + content.ts (1954–Today Tent of Meeting) + site.ts (1 Commonwealth Drive)]
  H & F & P --> S[Tailwind @theme — src/index.css — bsc-* sapphire palette + 2 shadows + gold accents]
  R --> V[Vite 7.3.6 + viteSingleFile 2.3.3]
  V --> O[dist/index.html ~392 kB + dist/images/ — single file + public assets]
  O --> G[GitHub Pages / S3]
```

`HashRouter` is intentional — static hosts have no SPA fallback, so `/#/worship#mass` works without server rewrites.

## File Hierarchy

```
📂 blessed-sacrament-church/
├── 📄 index.html            # lang, viewport, meta description (Church of the Blessed Sacrament, 1 Commonwealth Drive · Tent of Meeting), CSP `img-src 'self' data: blob:` only, inline favicon (⛪ emoji data URI), Google Fonts (Fraunces + Source Sans 3), #root + Church JSON-LD (Church of the Blessed Sacrament, 149603, +65 6474 0582), title "Church of the Blessed Sacrament — Singapore"
├── 📄 eslint.config.js      # flat config (typescript-eslint 8 + react-hooks 5 + react-refresh) — ignores [dist, node_modules, coverage, playwright-report, test-results, skills, src.orig]
├── 📄 playwright.config.ts  # Playwright 1.55 (chromium, webServer → pnpm exec vite :5173, expect timeout 15s)
├── 📄 playwright.built.config.ts  # Playwright vs the built artifact — vite preview :4173 (or E2E_BASE_URL → live host); catches singlefile dev/build divergence
├── 📄 vite.config.ts        # plugins [react, tailwindcss, viteSingleFile] + alias @→src + test {globals, jsdom, setupFiles: src/test/setup.ts (F1), include: src/**/*.{test,spec}.{ts,tsx}, exclude: e2e/** } + server.watch.ignored [skills/**, dist/**, playwright-report/**, test-results/**, coverage/**, src.orig/**]
├── 📄 tsconfig.json         # ES2020 / ESNext / bundler / strict + noUnusedLocals/noUnusedParameters/noFallthroughCasesInSwitch/isolatedModules/noEmit + include [src, vite.config.ts, eslint.config.js, playwright.config.ts, playwright.built.config.ts] + types [node, vitest/globals] + paths @/*
├── 📄 package.json          # name blessed-sacrament-church — scripts: dev / build / preview / typecheck / lint / test / test:e2e / test:e2e:built / test:watch + pnpm@11.0.0 + engines node>=20 (all deps pinned exact)
├── 📄 pnpm-lock.yaml        # committed — deterministic installs via `pnpm install --frozen-lockfile` (CI)
├── 📂 public/
│   ├── 📂 images/           # 9 files: hero-church.jpg, damien-hall.jpg, faith-formation.jpg, family-life.jpg, garden.jpg, liturgical.jpg, pastoral-care.jpg, youth.jpg, community.jpg (Vite publicDir → dist/images/ — upload alongside dist/index.html); all local
│   └── 📄 _headers          # Cloudflare Pages security headers (HSTS/XCTO/XFO/Referrer-Policy/Permissions-Policy) → dist/_headers — honored only on Cloudflare Pages deploys + robots.txt
├── 📂 src/                  # 58+ files — source + 17 tests + 1 setup (harness F1)
│   ├── 📄 App.tsx           # HashRouter + 17 Route entries (16 content paths + * → NotFound; 5 alias groups / 7 alias paths; hash anchors #mass/#confession/#visit + 6 ministry ids)
│   ├── 📄 main.tsx          # StrictMode + createRoot + resolveHashRedirect pre-mount rewrite
│   ├── 📄 index.css         # @theme bsc-* tokens (sapphire-blue palette + gold accents + 2 shadows) + @layer base/utilities (28+ utilities: text-balance, bg-adobe-texture, bg-gold-bloom, bg-grain, divider-weave, divider-weave-thin, gold-rule, gold-rule-left, hero-ken-burns, img-zoom, mask-fade-b, reveal, reveal-visible, rise-in + rise-in-d1..d4, menu-in, drawer-in, drawer-item-in, page-in, dot-pulse, card-lift, card-tint, link-underline, skip-link, bloom-drift + keyframes)
│   ├── 📂 components/
│   │   ├── 📄 Layout.tsx    # Outlet + scroll/hash restoration (double-hash aware, split on #, strip /, setTimeout 80ms, fallback window.scrollTo) + ScrollProgress + SkipLink + keyed page-in container
│   │   ├── 📄 Header.tsx    # fixed sapphire-950 bar, useScrolled(16), hover/focus-open dropdown (primaryNav; trigger has no click-toggle — keyboard via onFocusCapture), mobile modal drawer (dialog + aria-modal + focus trap + focus restore; closes on in-drawer link, Escape, outside tap), includes top bar Give link
│   │   ├── 📄 Footer.tsx    # 4-col + divider-weave-thin + 2 socials (Facebook/Instagram custom SVG) + Archdiocese text link + site.ts address 1 Commonwealth Drive
│   │   ├── 📄 PageHero.tsx  # sapphire hero primitive (bg-grain + gradients + rise-in)
│   │   ├── 📄 Emblem.tsx    # inline SVG emblem
│   │   ├── 📄 SafeImage.tsx # local fallback (fallback default /images/hero-church.jpg, lazy, onError dataset.fallback guard, optional fetchPriority)
│   │   ├── 📄 SkipLink.tsx  # skip-to-main-content (preventDefault + focus #main-content; never rewrites hash)
│   │   ├── 📄 SocialIcons.tsx # custom SVG brand glyphs (2 icons: Facebook + Instagram)
│   │   ├── 📄 Timeline.tsx  # gradient rail + display-serif years + Reveal — renders lifeTimeline (1954–Today Tent of Meeting)
│   │   ├── 📄 BackToTop.tsx # threshold 480 + SVG progress ring (stroke-dashoffset via useScrollProgress) + reduced-motion
│   │   ├── 📄 ScrollProgress.tsx # fixed gold rail (scaleX progress, aria-hidden, z-[60])
│   │   └── 📂 ui/           # Button (to/href/button + icon; variants primary|secondary|ghost|outline-light), Container, SectionHeading, Accordion (single-open, inert), Reveal
│   ├── 📂 hooks/            # 3 files — useScrolled + useScrollProgress + useScrollSpy (F2A)
│   │   ├── 📄 useScrolled.ts # scrollY > threshold → scrolled boolean (default 12; Header passes 16)
│   │   ├── 📄 useScrollProgress.ts # 0..1 progress, rAF-throttled, unscrollable guard
│   │   └── 📄 useScrollSpy.ts # active section tracking via IntersectionObserver
│   ├── 📂 pages/            # Home, About, History, Worship, Ministries, NewsEvents, Serve, Give, FAQ, NotFound (10 files, all named exports)
│   ├── 📂 data/
│   │   ├── 📄 nav.ts        # primaryNav (6 top-level: Home / About{The Parish, Our History, FAQ} / Worship{Mass Times, Confession & Adoration, Find Us} / Ministries{Liturgical, Faith Formation, Pastoral Care} / News & Events / Serve) + footerNav 10 links
│   │   ├── 📄 content.ts    # 10 interfaces + images 7 keys (all local) + priests 3 (Johan/William/Odo — SS.CC) + ppcMembers 6 + lifeTimeline 7 (1954–Today) + grounds 3 (main-church/damien-hall/garden) + ministries 6 (liturgical/faith-formation/pastoral-care/family-life/youth/community→Community & Outreach) + faqs 6 + upcomingEvents 6 (Corpus Christi feast-first, Parish/Devotion categories) + givingOptions 6 (UEN T08CC1234A, cheque Church of the Blessed Sacrament) + serveRoles 4 + devotions 6
│   │   └── 📄 site.ts       # canonical single source: name Church of the Blessed Sacrament/shortName Blessed Sacrament Church/tagline A Household of Faith, Hope & Love./vision To be a vibrant Eucharistic community…/congregation SS.CC, address 1 Commonwealth Drive 149603, hours (church/office/reception/adoration/confession), mass (weekdayMorning 8.30+12.30/weekdayEvening 18.30/saturday 8.30+18.00+19.30 Tamil 3rd Sat/sunday×6 incl. Mandarin 7.30 + Indo last Sun 13.00 + Tagalog 15.15/confession/adoration/secondCollection + note public holidays + monthly), contact (6474 0582 / fax 6472 6545 + secretariat@bsc.org.sg), transport (Queenstown EW19 · Commonwealth EW20 + buses 32/51/111/122/145/195/855), feast Corpus Christi Sunday after Trinity, uen T08CC1234A, chequePayee Church of the Blessed Sacrament, socials (facebook/instagram/youtube) + archdiocese + mapsUrl/mapsEmbedSrc — Footer + Worship + About consume it, don't duplicate
│   ├── 📂 utils/            # 4 files — cn + massDay + monogram + deepLinks
│   │   ├── 📄 cn.ts         # twMerge(clsx) — always merge via cn()
│   │   ├── 📄 massDay.ts    # massDayKey(date) — single source for the Worship today-highlight
│   │   ├── 📄 monogram.ts   # monogram(name) — honorific stripping for priest discs
│   │   └── 📄 deepLinks.ts  # knownRoutePaths + resolveHashRedirect — path-style deep links rewrite to hash routes pre-mount + drift guard
│   ├── 📂 test/
│   │   └── 📄 setup.ts      # Vitest harness (F1 — restored)
│   └── 📂 **/*.test.{ts,tsx} # 17 files — green
├── 📂 e2e/                  # 8 spec files + helpers.ts — 51 tests green (BSC retargeted F2B): smoke.spec.ts (11) + navigation.spec.ts (8) + ministries.spec.ts (4) + give-faq.spec.ts (4) + enhancements.spec.ts (7) + enhancements-round5.spec.ts (6) + enhancements-round7.spec.ts (8) + deep-links.spec.ts (3)
│   ├── 📄 smoke.spec.ts     # hero + rise-in entrance + Worship/Ministries aliases + hash anchors + NotFound + mobile drawer + event chips + back-to-top (BSC)
│   ├── 📄 navigation.spec.ts# desktop Worship/Ministries dropdown + keyboard + SkipLink + footer 10 links + Give + aria-current (BSC)
│   ├── 📄 ministries.spec.ts# 6 sections + jump nav + imageAlt (BSC)
│   ├── 📄 give-faq.spec.ts  # Give 6 options + FAQ accordion + Worship Find Us + maps (BSC — UEN T08CC1234A)
│   ├── 📄 enhancements.spec.ts + enhancements-round5.spec.ts + enhancements-round7.spec.ts # motion/chip/ring/sticky contracts (BSC)
│   └── 📄 helpers.ts        # gotoHash + expectHash helpers
├── 📄 .github/workflows/ci.yml # CI: lint → typecheck → test → test:e2e → build + artifacts (Node 24, pnpm 11)
├── 📂 docs/                 # historical audits retained for lineage (marked historical) + BSC port docs
│   ├── 📄 prompts.md        # Intent lineage
│   ├── 📄 validation-src-vs-src.orig-2026-08-30.md # (historical)
│   ├── 📄 ui-ux-remediation-plan-2026-08-28.md # (historical)
│   ├── 📄 code-review-audit-2026-08-28.md  # (historical)
│   ├── 📄 code-review-audit-round3-2026-08-30.md # (historical)
│   ├── 📄 remediation-plan-round3-2026-08-30.md # (historical)
│   └── 📄 remediation-round4-2026-08-30.md # (historical — round-4 L-5 drawer→modal — still applies)
├── 📂 skills/               # vendored reference content (skills-catalog.md + per-skill SKILL.md — tracked; lint/build tooling ignores it, do not import)
├── 📄 CLAUDE.md             # Deep conventions (authoritative — update alongside README)
└── 📄 AGENTS.md             # Compact agent cheat sheet
```

Current audits — **round-13+ (Blessed Sacrament): all gates green — `pnpm lint` 0 + `pnpm typecheck` 0 + `pnpm test` 17 files + `pnpm test:e2e` 51/51 + `pnpm build` ~392 kB + `pnpm test:e2e:built` 51/51; live host verified (byte-identical deploy, 15-route browser journey, zero console errors). Round-15 (2026-09-02, `docs/design-enhancement-round15-2026-09-02.md`): visual/UI-UX/motion remediation under the round-15 motion contract — Ken Burns drift on PageHero imagery + retuned hero gradients (photography breathes, bottom-anchored text contrast preserved), History timeline rail draw-in + staggered `Reveal` entries, `bloom-drift` ambient glow on the three dark CTA bands, BackToTop lift entrance, Worship confession grid centering, hero fact-row un-wrapped, NewsEvents `Read more` gains an external-link affordance icon; guards extended first (docs-contract 23 checks), 17 files green, e2e 51/51 dev + built, build ~392 kB. `index.html` is Church of the Blessed Sacrament (1 Commonwealth Drive, Corpus Christi, Queenstown EW19 · Commonwealth EW20, Fraunces + Source Sans 3, CSP `img-src 'self' data: blob:`, inline favicon, title "Church of the Blessed Sacrament — Singapore"). Historical audits are retained in `docs/` and marked **(historical)**.

## Quick Start

**Requirements:** Node.js ≥20 (Vite 7), `pnpm` preferred (`npm` works).

```bash
# 1 — Clone
git clone <repo-url> blessed-sacrament-church && cd blessed-sacrament-church

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
ls -lh dist/index.html  # expect: single HTML file ~392 kB, no separate assets chunk
ls -lh dist/images/     # expect: 9 images (hero-church + damien-hall + faith-formation + family-life + garden + liturgical + pastoral-care + youth + community)
pnpm test               # expect: 17 files green (harness src/test/setup.ts — F1)
pnpm test:e2e           # expect: 51 tests green (BSC retargeted F2B)
```

| Check | Expected |
|---|---|
| `pnpm dev` | Vite ready on `:5173`, HMR active |
| `pnpm lint` | Exit `0`, no warnings (`--max-warnings 0`) |
| `pnpm typecheck` | Exit `0`, no errors |
| `pnpm test` | **17 files green** (`src/test/setup.ts` — F1) |
| `pnpm test:e2e` | **51 tests / 8 spec files green** — BSC retargeted (smoke 11 + navigation 8 + ministries 4 + give-faq 4 + enhancements 7 + enhancements-round5 6 + enhancements-round7 8 + deep-links 3) |
| `pnpm build` | `dist/index.html` ~392 kB + `dist/images/` (9 files) + `dist/_headers` |
| `pnpm preview` | Prod preview on `:4173`, alias routes (`/mass-times`, `/ministry`, `/donate`, `/volunteer`…) + hash anchors (`#/worship#mass`, `#/ministries#liturgical`) navigate |

## Design System

Tokens live in `src/index.css` `@theme`. Extend there — never use arbitrary `bg-[#...]`.

| Token | Hex | Usage |
|---|---|---|
| `bsc-cream` | `#f8f5ef` | Page background |
| `bsc-parchment` | `#efe8d8` | Section bands, card fills |
| `bsc-parchment-dark` | `#e3d8c2` | Dark parchment variant |
| `bsc-stone` | `#d4c9ae` | Borders, dividers |
| `bsc-ink` | `#1e2330` | Primary text |
| `bsc-charcoal` | `#3a3f4d` | Secondary text |
| `bsc-sapphire-50` | `#eef2fb` | Ghost hover bg |
| `bsc-sapphire-300` | `#7a9bdb` | Eyebrow on dark, header accent |
| `bsc-sapphire-500` | `#3458a8` | Links, primary sapphire |
| `bsc-sapphire-600` | `#28458a` | Header icon, secondary button |
| `bsc-sapphire-700` | `#1f366e` | Display heading |
| `bsc-sapphire-800` | `#1a2b55` | Mid-dark sapphire |
| `bsc-sapphire-900` | `#0f1a33` | Hero + footer background |
| `bsc-sapphire-950` | `#0a1122` | Deepest sapphire (header top strip) |
| `bsc-gold-300` | `#dfc06a` | Eyebrow on dark, header accent |
| `bsc-gold-400` | `#d4ad42` | Gold mid, primary button |
| `bsc-gold-500` | `#c49a2c` | Gold primary |
| `bsc-gold-600` | `#a67f22` | Gold hover |
| `bsc-gold-700` | `#85641c` | Deep gold — text on parchment + hover shade |
| `bsc-pine-500` | `#2d5a40` | Pine accent |
| `bsc-pine-600` | `#1f422e` | Accent / weave |
| `bsc-terracotta-500` | `#a86545` | Devotion chip border (decorative) |
| `bsc-terracotta-600` | `#8f5038` | Devotion chip text — AA on parchment |
| `shadow-bsc` | `0 20px 60px -20px rgba(15,26,51,.45)` | Hero, cards, emblem |
| `shadow-bsc-lg` | `0 40px 90px -30px rgba(15,26,51,.55)` | Elevated cards, header dropdown |

**Typography:** `Fraunces` (display, quote, `font-display` / `h1–h4`) + `Source Sans 3` (body, `font-sans` / `font-body` alias) — loaded in `index.html`, set in `@theme` + `@layer base`. Utilities: `text-balance`, `bg-adobe-texture`, `bg-gold-bloom`, `bg-grain`, `divider-weave` / `divider-weave-thin`, `gold-rule` / `gold-rule-left`, `reveal` / `reveal-visible`, `skip-link`, `mask-fade-b`, `hero-ken-burns` (20s Ken Burns), plus the "Sacred Motion" set: `rise-in` (+ `rise-in-d1..d4` stagger delays) for hero/PageHero entrances, `menu-in` / `drawer-in` / `drawer-item-in` / `page-in` for dropdown/drawer/route entrances, `card-lift` (hover lift + shadow + gold border) for every interactive card, `card-tint` (honest tint) for info cards, `link-underline` (gold underline draws in on hover/focus), `dot-pulse` (timeline halo). All are transform/opacity-only and gated by the global `prefers-reduced-motion` block in `src/index.css`.

## Deployment

Primary artifact `dist/index.html` (~392 kB, + `dist/images/` — 9 files, + `dist/_headers`) — no server, no env vars, no rewrites needed. The artifact ships a scoped `Content-Security-Policy` meta (`img-src 'self' data: blob:` only, `object-src 'none'`, `base-uri 'self'`, Google Fonts, `frame-src` Google Maps) + a `Referrer-Policy` meta. `public/_headers` adds the host-level headers a static file cannot set (HSTS, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`) — **on Cloudflare Pages only**. The current host is not assumed to be Pages — those headers are not served on generic static hosts (S3, GH Pages, proxied origins) without an explicit host config. Add the five headers via the host's header config (Cloudflare Transform Rules / `_headers` on Pages / S3 metadata) if the deployment target is not Pages.

CSP (current `index.html`): `default-src 'self'` + `script-src 'self' 'unsafe-inline'` + `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com` + `font-src https://fonts.gstatic.com data:` + `img-src 'self' data: blob:` + `frame-src https://www.google.com` + `object-src 'none'` + `base-uri 'self'`; `<meta name="referrer" content="strict-origin-when-cross-origin">`.

```bash
pnpm build                # produces dist/index.html + dist/images/ (publicDir copy — singlefile inlines JS+CSS, not public/)
# GitHub Pages — push dist/index.html + dist/images/ to gh-pages or serve dist/ as artifact
# S3 / CloudFront — upload dist/index.html as index.html + dist/images/ assets
pnpm preview              # smoke-test before publish
```

Why `HashRouter`: deep-links like `/#/worship#mass` or `/#/ministries#liturgical` resolve without host fallback config (GitHub Pages / S3 have no SPA rewrites). Switching to `BrowserRouter` would require a `404.html` redirect shim. Legacy aliases (`/mass-times`, `/hours-location`, `/visit` → `/worship`; `/ministry` → `/ministries`; etc.) preserve old parish bookmarks. Path-style deep links are rewritten pre-mount via `src/utils/deepLinks.ts` (`resolveHashRedirect`) so a bare `/worship` still lands correctly.

## Contributing

This repo follows the six-phase workflow in `CLAUDE.md` (ANALYZE → PLAN → VALIDATE → IMPLEMENT → VERIFY → DELIVER).

- **TDD:** `RED → GREEN → REFACTOR → Commit` — one cycle per commit; write a failing test before fixing a bug. The Vitest harness is restored (F1) — `pnpm test` (17 files) gates again alongside lint/typecheck/build.
- **Commits:** Conventional Commits — `feat:`, `fix:`, `docs:`, `chore:`, `refactor:`, `style:` — atomic, subject ≤72 chars.
- **Branches:** `feat/<slug>`, `fix/<slug>`, `docs/<slug>` — short-lived (1–3 days), squash-merge.
- **Conventions:** `PascalCase.tsx` for components/pages, `camelCase.ts` for data/utils, `primaryNav` single-source, alias routes preserved, `cn()` for merges, `bsc-*` tokens only (including `bsc-gold-700` `#85641c`).
- **Pre-push gate:** `pnpm lint && pnpm typecheck && pnpm test && pnpm test:e2e && pnpm build` — **all five green** (lint 0 + typecheck 0 + 17 test files + 51/51 + ~392 kB). CI mirrors this in `.github/workflows/ci.yml` (Node 24, pnpm 11). Sixth built-artifact check: `pnpm test:e2e:built` — vs `vite preview`/live (also green).

> `skills/` is vendored reference content — tracked in full; lint/build tooling ignores it — do not import from or lint it. `src.orig/` is **not part of the repository**; lineage lives in `docs/` + git history. See `AGENTS.md` for the compact cheat sheet.

## Troubleshooting

| Issue | Solution |
|---|---|
| `pnpm dev` port in use (`:5173`) | `pnpm dev -- --port 5174` or kill the other Vite process. |
| `Cannot find module '@/…'` or alias error | Ensure `vite.config.ts` alias `@→src` and `tsconfig.json` `paths {"@/*":["src/*"]}` stay in sync; restart dev server. |
| Hash anchor doesn't scroll (`#/worship#mass` or `#/ministries#liturgical` lands at top) | Target `id` missing — verify `id="mass"` / `id="confession"` / `id="visit"` in `Worship.tsx` or `id="liturgical"` etc. in `Ministries.tsx`; `Layout.tsx` is double-hash aware (`split on #` + strip `/`, `setTimeout 80ms`, fallback `window.scrollTo`). |
| Bare `href="#mass"` routes to NotFound | Use `<Link to="/worship#mass">` (or `/ministries#liturgical`) — plain `#id` replaces the `HashRouter` hash and routes to `*`. |
| `tsc --noEmit` fails on unused var | `noUnusedLocals/Params` is `true` — remove or prefix with `_` only if intentionally unused. |
| External image not loading | `SafeImage` falls back to `fallback` (default `/images/hero-church.jpg`) via `dataset.fallback` guard; current `images.*` are all local (7 keys, 9 files). |
| `pnpm test` finds 0 tests | **Not expected since F1** — the harness (`src/test/setup.ts`) is restored; if Vitest finds nothing, check `vite.config.ts` `test.include`/`exclude` and that `*.test.{ts,tsx}` files exist under `src/`. |
| `pnpm test:e2e` fails | E2E is retargeted to BSC and green; if it fails after content changes, check which BSC assertion drifted (run `pnpm test:e2e:ui` to inspect). |
| `vite.config.ts` setupFiles warning | If Vitest warns `setupFiles` not found, confirm `src/test/setup.ts` exists (it does since F1) — a missing file here means the harness was deleted; restore it before expecting `pnpm test` to collect. |

## License

Private — all rights reserved. © Church of the Blessed Sacrament, Archdiocese of Singapore. No `LICENSE` file is published.

---

**Docs:** [`blessed-sacrament-church_SKILL.md`](blessed-sacrament-church_SKILL.md) (canonical) · [`CLAUDE.md`](CLAUDE.md) · [`AGENTS.md`](AGENTS.md) · Live: [www.bsc.org.sg](https://www.bsc.org.sg/) (canonical parish site)
