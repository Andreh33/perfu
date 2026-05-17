# Perfumes Dubai · Maison Digital

> The art of fragrance, distilled from desert and time.

Digital atelier for a luxury perfume maison based in Dubai. Built as a
Resn-for-Apple level execution of the brief in [`../CLAUDE.md`](../CLAUDE.md).
Trilingual (es / en / ar with full RTL), WebGL hero with custom GLSL shader,
GSAP scroll choreography, R3F 3D product bottles, editorial typography.

---

## Quick start

```powershell
git clone https://github.com/Andreh33/perfu.git
cd perfu
npm install
npm run dev
```

Open <http://localhost:3000>. The default locale (es) has no URL prefix;
`/en` and `/ar` switch language (the latter flips to RTL automatically).

### Scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Turbopack dev server on `:3000`. |
| `npm run build` | Production build (React Compiler + Turbopack). |
| `npm run start` | Production server. |
| `npm run lint` | ESLint 9 with `eslint-config-next`. |
| `npx tsc --noEmit` | TypeScript strict check (`noUncheckedIndexedAccess`, `noImplicitOverride`). |
| `npx playwright install chromium` | One-time browser install for screenshot scripts. |
| `node scripts/screenshot-i18n.mjs` | Capture `/`, `/en`, `/ar` to `docs/screenshots/`. |

---

## Stack

- **Framework**: Next.js 16.2.6 (App Router, Turbopack, React Compiler enabled, View Transitions API).
- **UI**: React 19.2, Tailwind CSS v4 (`@theme inline`), CSS custom properties as the single source of truth for tokens.
- **TypeScript**: 5.7 strict + `noUncheckedIndexedAccess` + `noImplicitOverride`.
- **i18n**: `next-intl@4` (es / en / ar, `localePrefix: "as-needed"`, automatic `dir="rtl"` for AR).
- **3D / WebGL**: `@react-three/fiber@9`, `@react-three/drei@10`, `@react-three/postprocessing@3`, raw GLSL.
- **Animation**: GSAP 3.13 + ScrollTrigger, `motion@12`, Lenis 1.1 smooth scroll sync’d via `gsap.ticker`.
- **State**: Zustand (cart, persisted to localStorage).
- **Forms**: React Server Actions + Zod schemas.
- **Payments**: Stripe Payment Links (slots in `lib/stripe-links.ts`, left empty for the client to fill).
- **Deployment**: Vercel (Fluid Compute by default, Vercel Blob for production assets, Analytics + Speed Insights wired).

Full version list in `package.json`. Tokens, type scale, motion curves,
a11y targets and performance budget in
[`docs/design-system.md`](./docs/design-system.md).

---

## Architecture

```
app/
├── globals.css                        # Tokens + Tailwind v4 theme
├── favicon.ico
└── [locale]/
    ├── layout.tsx                     # NextIntlClientProvider, Lenis, Cursor, Navbar, Footer, CookieBanner, Preloader
    ├── page.tsx                       # Home (Hero WebGL + Manifesto + Featured + Maison teaser + CTA)
    ├── styleguide/                    # QA visual del design system (noindex)
    ├── atelier/
    │   ├── page.tsx                   # Catálogo grid editorial asimétrico
    │   └── [slug]/page.tsx            # Ficha de producto con frasco 3D R3F
    ├── maison/                        # 4 capítulos romanos editoriales
    ├── perfumeur/                     # Editorial sobre los perfumistas
    ├── bespoke/                       # Lead capture form (Zod + Server Action)
    ├── boutique/                      # Mapa Dubai SVG custom + info física
    ├── journal/                       # Placeholder editorial "Coming this winter"
    ├── concierge/                     # Form contacto
    └── legal/{privacy,terms,cookies}/page.tsx
```

- `components/ui/` — primitives genéricos (Button, Container, Section, Text, Link).
- `components/layout/` — Navbar, Footer, LenisProvider, CookieBanner, LocaleSwitcher, CurrencySwitcher, Monogram, DubaiSkyline, MobileMenu, NewsletterForm.
- `components/sections/` — Hero, Manifesto, secciones home.
- `components/preloader/` — Preloader cinemático con carga real.
- `components/cursor/` — CustomCursor con lerp 0.18.
- `components/three/` — Canvas R3F, shaders GLSL, modelos 3D.
- `components/atelier/` — ProductCard, Filters, RangeSlider.
- `components/maison/` — Chapter, ChapterDivider, ChapterReveal.
- `components/cart/` — CartSheet (Fase 10).
- `lib/` — utilidades, data, schemas, hooks.
- `i18n/` — routing, navigation, request config de next-intl.
- `messages/` — `es.json` / `en.json` / `ar.json` agrupados por namespace.
- `app/_actions/` — Server Actions (newsletter, bespoke, concierge).
- `scripts/` — Playwright capture scripts.
- `docs/` — design system, i18n guide, execution plan, screenshots, decisiones.

---

## i18n

Tres idiomas: **español (default, sin prefijo URL), inglés (`/en`), árabe (`/ar`)**.
Detalles en [`docs/i18n.md`](./docs/i18n.md).

- Layout root `app/[locale]/layout.tsx` con `<html lang dir>` dinámico (RTL automático para árabe).
- Traducciones a árabe son **adaptaciones culturales**, no literales.
- Fuentes árabes (Naskh display + Plex Sans Arabic) cargadas condicionalmente.
- Tracking en árabe siempre 0 (letter-spacing en árabe rompe legibilidad).

---

## Variables de entorno

Crea `.env.local` (no commiteado):

```env
# Vercel Blob (assets oficiales — fotos producto, GLB del frasco)
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_...

# Stripe (los Payment Links no requieren keys; solo si activas pagos automatizados)
STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=

# Email transactional (bespoke / concierge / newsletter) — opcional
RESEND_API_KEY=
RESEND_FROM=concierge@perfumesdubai.com

# Analytics
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=
```

En Vercel: `vercel env add BLOB_READ_WRITE_TOKEN production`.

---

## Stripe Payment Links

El brief NO incluye backend de pagos automatizado: cada SKU
(20 perfumes × 2 tamaños = 40 SKUs) se vende via **Stripe Payment Links**.
Los slots se rellenan en `lib/stripe-links.ts` (constante `STRIPE_LINKS`, typed).
Cuando el cliente cree los Payment Links en
<https://dashboard.stripe.com/payment-links>, se pega cada URL en su slot
correspondiente. El carrito redirige cuando hay 1 producto. Multi-item muestra
un fallback con `mailto:concierge@perfumesdubai.com` pre-rellenado.

---

## Deploy a Vercel

```powershell
npm i -g vercel       # una vez
vercel link
vercel                # preview
vercel --prod         # production
```

Recomendado: framework preset Next.js (auto), Node 24 LTS, region `fra1`,
añadir integraciones Vercel Blob + Analytics + Speed Insights.

---

## Performance budget

| Métrica | Target | Max |
| --- | --- | --- |
| Lighthouse Performance (mobile, Slow 4G) | ≥ 88 | — |
| Lighthouse Accessibility | ≥ 96 | — |
| Lighthouse Best Practices | ≥ 95 | — |
| Lighthouse SEO | ≥ 96 | — |
| LCP | < 2.0s | 2.5s |
| INP | < 150ms | 200ms |
| CLS | < 0.05 | 0.1 |

Detalle de técnicas en `docs/design-system.md`.

---

## Decisiones técnicas

- **React Compiler activado** (`reactCompiler: true` top-level en Next 16). Evita `useMemo`/`useCallback` manual en la mayoría de casos.
- **TypeScript con `noUncheckedIndexedAccess`** — accesos por índice devuelven `T | undefined`.
- **`localePrefix: "as-needed"`** — `/` resuelve español; `/en` y `/ar` son explícitos.
- **Sin SplitType externo** — split-by-word del Manifesto a mano con helper `splitWords()`. Cero dependencia extra.
- **Lenis NO en mobile** (`smoothTouch: false`) — scroll nativo es más responsivo.
- **Sin shadcn salvo Sheet/Dialog** como base estructural del Cart. Resto desde primitives propios.
- **Server Components por defecto**. `"use client"` solo donde sea necesario, con comentario justificando.
- **i18n is law**: todo texto visible pasa por `next-intl`.

---

## Brief

El brief creativo íntegro (spec por componente, sección, shader, animación y
QA gate por fase) está en [`../CLAUDE.md`](../CLAUDE.md) (raíz del workspace).

---

## License

Confidencial — proyecto cliente. No redistribuir.
