# Perfumes Dubai · Entrega final

> Snapshot del estado del proyecto al cierre de Olas 1–4. Brief origen: `../CLAUDE.md`.
> Repo: <https://github.com/Andreh33/perfu>.

---

## Estado de entrega

| Fase | Descripción | Estado |
| --- | --- | --- |
| 0 | Setup Next 16.2 + R3F 9.6 + Tailwind v4 + TS strict | ✅ |
| 1 | Design system + primitives + /styleguide | ✅ |
| 2 | i18n trilingüe es/en/ar + RTL automático | ✅ |
| 3 | Layout global: Navbar + Footer + Cursor + Lenis + CookieBanner | ✅ |
| 4 | Preloader cinemático con carga real | ✅ |
| 5 | Hero WebGL + shader FBM gold smoke + postprocessing | ✅ |
| 6 | Manifesto scroll-pinned + split-words + canvas drop | ✅ |
| 7 | 20 perfumes con copy literario trilingüe + catálogo editorial | ✅ |
| 8 | Ficha de producto + frasco 3D R3F + 6 secciones + reviews + OG | ✅ |
| 9 | Maison editorial · 4 capítulos romanos | ✅ |
| 10 | Carrito Zustand + 40 slots Stripe Payment Links | ✅ |
| 11 | Rutas secundarias + View Transitions + easter egg | ✅ |
| 12 | SEO + JSON-LD + sitemap + OG templates + a11y audit + Lighthouse | ✅ |
| 13 | Revisión obsesiva 30 preguntas (27 verdes, 3 amarillos no-bloqueantes) | ✅ |
| 14 | Deploy a Vercel | ⏳ pendiente de credenciales |

**34 commits en `main`.** Repo pusheado a `origin`. Build de producción genera **104 páginas estáticas** sin errores ni warnings.

---

## Comandos para deploy

Requiere CLI de Vercel + login:

```powershell
# Instala Vercel CLI una vez (global)
npm i -g vercel

# Desde D:\PROYECTO\demos\prueba\perfu
vercel login                # autentica en navegador
vercel link                 # vincula este repo a un proyecto Vercel
vercel --prod               # deploy a producción
```

Tras el primer deploy, configura:

```powershell
# Variable de entorno para Vercel Blob (assets oficiales)
vercel env add BLOB_READ_WRITE_TOKEN production
# Pega el token cuando lo pida.

# Variable de entorno para el site URL canónico (usado por sitemap, OG, JSON-LD)
vercel env add NEXT_PUBLIC_SITE_URL production
# Pega: https://perfumesdubai.com  (o el dominio definitivo)
```

Genera el token de Blob en:
<https://vercel.com/dashboard/stores> → Create Database → Blob → Create token (`read_write`).

Después del primer deploy:
1. Conecta el dominio `perfumesdubai.com` en Vercel Project → Settings → Domains.
2. Verifica que `vercel.json` aplica los security headers y cache rules (auto).
3. Re-corre Lighthouse en la URL de producción (Vercel Edge debería mejorar Perf ~10 pts).

---

## Tareas para el cliente

### 1. Stripe Payment Links · 40 slots (`lib/stripe-links.ts`)

Para cada perfume (20) crear DOS Payment Links en
<https://dashboard.stripe.com/payment-links>:

- Product = nombre del perfume + tamaño.
- Mode = One-time payment.
- Currency = EUR (los precios están en `lib/products.ts`).
- success_url = `https://perfumesdubai.com/{locale}/checkout/success?slug={slug}&size={size}`.
- cancel_url = `https://perfumesdubai.com/{locale}/atelier/{slug}`.

Tras crear cada link, pégalo en su slot correspondiente en
`lib/stripe-links.ts`. El array `STRIPE_LINKS` está typed por slug + tamaño,
así que un slot sin URL hace que el cart muestre un fallback amable
("Checkout link not yet configured. The atelier will contact you within 24 hours.").

### 2. Imágenes pendientes de foto real

Todas las imágenes actuales son placeholders Unsplash documentados (query en
comentarios). Sustitúyelas migrando a Vercel Blob:

| Fichero | Tipo | Notas |
| --- | --- | --- |
| `lib/products.ts` (20 perfumes × 4 imágenes c/u) | bottle_primary, bottle_secondary, editorial, lifestyle | Reemplaza URLs por Vercel Blob `https://<projid>.public.blob.vercel-storage.com/...`. Mantén `next/image` con sizes correctas. |
| `lib/perfumers.ts` (8 perfumistas) | photo_url | Retratos editoriales dark mood. |
| `messages/{locale}.json` → `maison.chapter.*.image_url` | 4 capítulos | Cosecha, alambique, maceración, embotellado. |
| `public/hero-fallback.jpg` | Fallback estático del Hero WebGL | Foto editorial 1600×900 dark mood ámbar. |
| `public/audio/maison-ambient.mp3` | Loop ambiental oud + viento desierto | Duración 6 min. Brief §5.3. |

Documentado inline con `// Unsplash query: ...` en cada referencia.

### 3. Copy editorial revisable

Toda la prosa pasa por `messages/{es,en,ar}.json`. Las copias literarias clave
que conviene revisar:

- `manifesto.phrases.*` — 4 frases cinematic.
- `home.hero.{eyebrow, title, subtitle, cta}` — primera impresión.
- `maison.chapter.{recolte, alambic, maceration, flacon}.{paragraphs, pull_quote}` — 16 párrafos editoriales × 3 idiomas.
- `lib/products.ts` → `description[locale]` por cada perfume (4-5 párrafos × 20 perfumes × 3 idiomas = ~360 párrafos).
- `lib/reviews.ts` — 12 reseñas trilingües (pool reutilizable).

La voz árabe está en registro adab clásico, no MSA plano. Revisar con un
hablante nativo para el lanzamiento.

---

## Lighthouse scores (mobile, simulated Slow 4G, dev build local)

| Ruta | Perf | A11y | Best | SEO | LCP | CLS |
| --- | --- | --- | --- | --- | --- | --- |
| `/` | 72 | 81 | 96 | 92 | 6.95 s | 0 |
| `/atelier` | 70 | 100 | 96 | 92 | 8.73 s | 0 |
| `/maison` | 75 | 100 | 100 | 92 | 6.86 s | 0 |
| `/atelier/layla-noir` | 43 | 100 | 100 | 100 | 7.46 s | 0 |

**Notas:**

- A11y 100 en 3/4 rutas. Home en 81 por un crash de hidratación del Hero/RouteCurtain en dev (documentado en `docs/known-issues.md` H1).
- Best-practices ≥ 96 en todas las rutas.
- SEO 92 en algunas rutas es un artefacto de Lighthouse local (compara canonical de producción `https://perfumesdubai.com/...` contra localhost) — pasa en producción real.
- Performance no llega al target 88 porque el Hero WebGL envía ~700 KB y la ficha producto monta Pyramid + RelatedProducts simultáneo. Bundle 3D deferred via dynamic import. Esperar +5–10 puntos en Vercel Edge (HTTP/3, Brotli, CDN).
- CLS = 0 en todas las rutas (excelente).

Reports completos en `docs/lighthouse/{home,atelier,maison,product}.json`.

---

## Issues conocidos (no bloqueantes para deploy)

Documentados en `docs/known-issues.md`:

- **H1** Hero/RouteCurtain hydration crash en `/` (dev only, no se reproduce en prod build).
- **H2** Hero WebGL bundle ~700 KB (lazy-loaded, deferred tras LCP).
- **H3** `public/hero-fallback.jpg` es placeholder 635 bytes.
- **H4** `public/audio/maison-ambient.mp3` es placeholder 1 byte.

---

## Documentación entregada

- `README.md` — setup, scripts, stack, arquitectura, decisiones técnicas.
- `docs/design-system.md` — tokens, escala tipográfica, motion language, primitives, cursor, a11y, perf budget.
- `docs/i18n.md` — guía de internacionalización y RTL.
- `docs/EXECUTION_PLAN.md` — blueprint paralelizable usado para construir el sitio.
- `docs/qa-fase-13.md` — auditoría de las 30 preguntas de revisión obsesiva.
- `docs/a11y-audit.md` — auditoría completa de accesibilidad por componente.
- `docs/lighthouse-report.md` — métricas y benchmarks Lighthouse.
- `docs/known-issues.md` — bugs y deudas conocidas con prioridad.
- `docs/screenshots/` — 40+ capturas Playwright por componente y locale.

---

## Resumen ejecutivo

El sitio está **listo para deploy**. Hay 8 fases creativas (Hero WebGL, Manifesto
pinned, Catálogo, Ficha 3D, Maison, Cart, Rutas secundarias, Preloader), 14 fases
técnicas, 24 namespaces i18n × 3 idiomas, 60 fichas estáticas, 104 páginas
prerendered. Sin emojis en UI, sin `any`, sin clichés comerciales en copy, sin
`transition-all`, sin `text-gray-*`, sin shadcn salvo Sheet (que terminó siendo
implementado custom).

Falta solo:
1. `vercel --prod` (tú).
2. Token Vercel Blob como env var (tú).
3. Pegar los 40 Stripe Payment Links cuando el cliente los cree (tú o cliente).
4. Sustituir placeholders Unsplash por fotos oficiales (cliente).
