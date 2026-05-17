# Perfumes Dubai · Design System

> Documentación del sistema de diseño. Resn-para-Apple, nivel 3. Si alguna decisión
> aquí no encaja con el brief (`CLAUDE.md`), gana el brief.

---

## Filosofía

Lujo silencioso. Negro cálido, marfil envejecido, dorado mate. La marca no grita,
susurra. El vacío es elegancia. Cada animación tiene asimetría intencionada (curvas
distintas entrando y saliendo). Tipografía como héroe: Fraunces variable optical-size
para titulares, Inter para el cuerpo, Naskh + Plex para árabe.

---

## Tokens cromáticos

Defininidos en `app/globals.css` como CSS custom properties y expuestos a Tailwind v4
via `@theme inline`. Cualquier valor cromático fuera de esta tabla es bug.

### Ink (texto sobre fondo oscuro)

| Token | Hex | Uso |
| --- | --- | --- |
| `--ink-100` | `#F5F1E8` | Texto principal sobre obsidian |
| `--ink-200` | `#E8DFC9` | Subtítulos, secundario cálido |
| `--ink-300` | `#B8A98C` | Metadata, captions, terciario |
| `--ink-400` | `#7A6F5C` | Texto secundario apagado, líneas finas |
| `--ink-500` | `#4A4438` | Sepia profundo, separadores |

### Obsidian (fondos)

| Token | Hex | Uso |
| --- | --- | --- |
| `--obsidian-100` | `#1F1F1D` | Cards elevadas |
| `--obsidian-200` | `#18181A` | Bandas intermedias |
| `--obsidian-300` | `#0F0F11` | Layer profunda |
| `--obsidian-400` | `#08080A` | Fondo body. NUNCA `#000` |

### Gold (acento de marca)

| Token | Hex | Uso |
| --- | --- | --- |
| `--gold-100` | `#D4B677` | Highlights, hover claro |
| `--gold-200` | `#B8935A` | Color firma · CTAs · markers |
| `--gold-300` | `#8E6E3F` | Sombras dorado, drop-cap, familia oud |
| `--gold-400` | `#5C4628` | Dorado quemado, detalles muy sutiles |

### Accents (notas olfativas)

| Token | Hex | Uso |
| --- | --- | --- |
| `--accent-rose` | `#C9928A` | Notas rosa / florales |
| `--accent-amber` | `#C4945C` | Notas ámbar / especiadas |
| `--accent-jade` | `#5C7A6F` | Notas verdes / acuáticas |

**Regla absoluta**: prohibido `#FFFFFF`, `#000000`, `text-gray-*`, gradientes
morado/rosa/azul. Si necesitas un tono nuevo, lo añades como token aquí primero.

---

## Tipografía

### Familias

| Familia | Font | Uso |
| --- | --- | --- |
| Display | **Fraunces** variable (opsz + SOFT) | Headlines, hero, pull quotes |
| Body | **Inter** variable | Cuerpo, labels, navegación |
| Mono | **JetBrains Mono** | Edition numbers, metadata técnica, precios |
| Arabic Display | **Noto Naskh Arabic** | Headlines árabes |
| Arabic Body | **IBM Plex Sans Arabic** | Cuerpo árabe |

Carga vía `lib/fonts.ts` con `next/font/google`. Variables CSS exportadas
(`--font-fraunces`, `--font-inter`, etc.) y mapeadas en `globals.css` a
`--font-display`, `--font-body`, `--font-mono`, `--font-arabic-display`,
`--font-arabic-body`.

### Escala modular · Major Third (1.250) · base 16px

| Token | rem | px | Uso |
| --- | --- | --- | --- |
| `--text-xs` | 0.640 | 10.24 | small-caps metadata |
| `--text-sm` | 0.800 | 12.80 | labels small-caps |
| `--text-base` | 1.000 | 16.00 | body |
| `--text-md` | 1.250 | 20.00 | body large |
| `--text-lg` | 1.563 | 25.00 | subhead |
| `--text-xl` | 1.953 | 31.25 | H4 |
| `--text-2xl` | 2.441 | 39.06 | H3 |
| `--text-3xl` | 3.052 | 48.83 | H2 |
| `--text-4xl` | 3.815 | 61.04 | H1 |
| `--text-5xl` | 4.768 | 76.29 | Hero secondary |
| `--text-6xl` | 5.960 | 95.37 | Hero primary |
| `--text-7xl` | 7.451 | 119.21 | Display L |
| `--text-8xl` | 9.313 | 149.01 | Display XL |
| `--text-9xl` | 11.642 | 186.27 | Display XXL hero |

### Reglas tipográficas no negociables

- Line-height en displays (`text-6xl+`): **0.88–0.92**. Nunca más.
- Line-height en body: **1.55–1.65**.
- Tracking en displays: `-0.04em` (text-9xl), `-0.02em` (H1), `0` (body).
- Tracking en small-caps: `0.12em` (labels), `0.16em` (navbar / eyebrows).
- Anchos máximos: `65ch` body editorial, `50ch` quote, sin límite en displays.
- `text-wrap: balance` en H1-H3.
- `text-wrap: pretty` en párrafos largos.
- `font-variant-numeric: tabular-nums` en precios.
- Ligaduras activas (`liga`, `dlig`, `calt`) en Fraunces.
- Drop caps en primer párrafo de fichas largas (3 líneas alto, `--gold-200`, Fraunces italic 400). Skipear en RTL (la API `::first-letter` no se comporta igual en árabe).

### Árabe — reglas específicas

- Line-height: `1.6` (los caracteres árabes necesitan más respiración vertical).
- Tracking: **siempre 0**. Letter-spacing en árabe lo rompe.
- En RTL, `text-transform: uppercase` se cancela en `.small-caps`.
- Las traducciones son **adaptaciones culturales**, NO literales. Para árabe
  buscar registro próximo al adab clásico, no MSA plano.

---

## Spacing · escala fibonacci-like · base 8

| Token | px |
| --- | --- |
| `--space-1` | 4 |
| `--space-2` | 8 |
| `--space-3` | 12 |
| `--space-4` | 16 |
| `--space-5` | 24 |
| `--space-6` | 40 |
| `--space-7` | 64 |
| `--space-8` | 96 |
| `--space-9` | 128 |
| `--space-10` | 160 |
| `--space-11` | 224 |
| `--space-12` | 320 |

Padding de secciones full-width: `--space-9` a `--space-11` vertical desktop,
`--space-7` mobile. El aire es lujo.

---

## Motion language

### Curvas firma

| Token | Bezier | Uso |
| --- | --- | --- |
| `--ease-pure-cubic` | `0.65, 0, 0.35, 1` | Baseline neutro |
| `--ease-soft-expo` | `0.16, 1, 0.3, 1` | Aparición editorial |
| `--ease-firm-back` | `0.34, 1.56, 0.64, 1` | CTAs, reveals con bounce sutil |
| `--ease-silk` | `0.83, 0, 0.17, 1` | Hover frascos, transformaciones largas |
| `--ease-tide` | `0.45, 0, 0.55, 1` | WebGL loops |

### Duraciones

| Token | ms |
| --- | --- |
| `--duration-instant` | 120 |
| `--duration-quick` | 280 |
| `--duration-medium` | 560 |
| `--duration-slow` | 1100 |
| `--duration-cinematic` | 1800 |

### Principios

1. **Anticipación**: todo movimiento que entra escala desde `0.96 → 1.0`, no desde `0`.
2. **Follow-through**: todo movimiento que sale tiene micro-oscilación final de 8-12px.
3. **Asymmetric easing**: nunca usar la misma curva entrando y saliendo.
4. **Stagger consistente**: 60–80ms entre elementos en grids, 120ms entre líneas de texto.
5. **Choreography por jerarquía**: el elemento de mayor jerarquía visual entra primero y sale último.
6. **Prohibido**: `transition-all`, `duration-300` lineal. Siempre propiedad específica + curva firma.

---

## Primitives

Ubicación: `components/ui/`.

### `<Button>`

Variants: `primary` (gold filled), `gold` (outline gold), `outline` (outline ink),
`ghost`. Sizes: `sm`, `md`, `lg`. Padding por size. Sin `rounded-lg shadow-xl`
default — los bordes son rectos por defecto.

### `<Container>`

Widths: `narrow` (840), `default` (1280), `wide` (1560), `full` (sin límite).
Padding horizontal: `--space-5` mobile / `--space-7` desktop.

### `<Section>`

Spacing: `tight`, `default`, `spacious`, `cinematic`. Tones: `void` (obsidian-400),
`elevated` (obsidian-200), `ink` (marfil con texto obsidian, raro).

### `<Text>`

Variants: `display-xxl`, `display-xl`, `display-l`, `display-m`, `headline`, `subhead`,
`body-l`, `body`, `body-s`, `label`, `small-caps`, `metadata`, `quote`.
Tones: `primary`, `secondary`, `muted`, `gold`, `dim`. Prop `italic` boolean.
Prop `as` para elegir elemento HTML.

### `<Link>`

Wrapper de `next-intl/navigation` con underline drawing-on-hover via
`scaleX(0) → scaleX(1)` origen izquierda. Variants: `default`, `gold`, `subtle`.

---

## Custom cursor (`components/cursor/CustomCursor.tsx`)

- Dot 8px `var(--gold-200)` opacity 0.6.
- Ring 8px expande a 48px opacity 0.12 en hover de `[data-cursor="interactive"]` o `a/button`.
- Sobre `[data-cursor="text"]` o `input/textarea`: dot se convierte en barra vertical 2×24px.
- Lerp factor: **0.18** (suave pero responsivo).
- Click: contrae a 6px con micro-vibración `--ease-firm-back`.
- Desactivado en `(pointer: coarse)`.
- Body recibe class `has-custom-cursor` que aplica `cursor: none` global.

---

## Lenis smooth scroll (`components/layout/LenisProvider.tsx`)

- `duration: 1.2`, easing `(t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))`.
- Sincronizado con `gsap.ticker` (necesario para ScrollTrigger en Manifesto y futuras secciones pinned).
- Respeta `prefers-reduced-motion`: si activo, no instancia Lenis.
- Hook helper `useLenis()` en `lib/hooks/useLenis.ts` (singleton).

---

## Preloader (`components/preloader/`)

- Mide carga real con `Promise.all` de `document.fonts.ready` + `criticalAssets` de `lib/preload-manifest.ts`.
- Min 1800ms · max 4500ms.
- SVG stroke draw letra a letra del logo "PERFUMES DUBAI" en outline `--gold-200`.
- Línea de progreso 200×1px con punto luminoso interno bindeado al `loadProgress` real.
- Label SMALL CAPS rotativo: `ASSEMBLING ESSENCE · {pct}% · {LABEL}` donde label depende del rango de carga.
- Badge árabe esquina inferior derecha `صبراً جميلاً`.
- Exit choreography: logo escala 1→0.96 fade out, cortina dorada sube clip-path 720ms, baja revelando 1100ms.
- Dispatch `CustomEvent('preloader:done')` al final para que el Hero arranque su entrance.
- Reduced motion: bypass directo en 200ms.

---

## A11y (WCAG 2.2 AA mínimo, AAA en texto)

- Contraste mínimo 4.5:1 body, 7:1 texto crítico.
- Focus rings: `outline: 2px solid var(--gold-200); outline-offset: 4px;` — visibles pero estéticos.
- Skip-to-content link absolute top sr-only.
- Navegación 100% por teclado. Cada acción mouse tiene equivalente keyboard.
- ARIA labels traducidos por idioma.
- `prefers-reduced-motion`: reduce duraciones a 30%, quita parallax e image sequences, shader Hero a imagen estática equivalente.
- Alt texts descriptivos, NO genéricos ("perfume bottle"). Describir el frasco concreto.
- `lang="ar"` correcto en bloques árabes para lectores de pantalla.

---

## Performance budget

| Métrica | Target | Max |
| --- | --- | --- |
| Lighthouse Performance (mobile) | ≥ 88 | — |
| Lighthouse Accessibility | ≥ 96 | — |
| Lighthouse Best Practices | ≥ 95 | — |
| Lighthouse SEO | ≥ 96 | — |
| LCP | < 2.0s | 2.5s |
| INP | < 150ms | 200ms |
| CLS | < 0.05 | 0.1 |
| TTFB | < 600ms | — |
| Initial JS gzipped | < 180KB | — |
| LCP route critical CSS inlined | < 14KB | — |
| WebGL bundle deferred | < 320KB | — |

### Técnicas obligatorias

- React Server Components por defecto. `"use client"` con comentario justificando.
- Streaming SSR con Suspense.
- `next/image` con `sizes` correctas por breakpoint.
- `next/font` con `display: swap` + subset solo de caracteres usados.
- Dynamic imports para Hero WebGL (cargado tras LCP).
- `loading="lazy"` + `decoding="async"` en imágenes below fold.
- Imágenes AVIF con fallback WebP.

---

## Stack

```
next@^16.2.6 · react@^19.2 · tailwindcss@^4
typescript@^5.7 (strict + noUncheckedIndexedAccess)
react-compiler (babel-plugin-react-compiler)

@react-three/fiber@^9.6 · @react-three/drei@^10 · @react-three/postprocessing@^3
gsap@^3.13 + @gsap/react · motion@^12 · lenis@^1.1

next-intl@^4 (es/en/ar)
@vercel/blob · @vercel/analytics · @vercel/speed-insights
clsx · tailwind-merge · class-variance-authority
lucide-react · sonner · zod · zustand
```

---

## Decisiones técnicas registradas

1. **`reactCompiler: true`** activado en `next.config.ts` (top-level en Next 16, no `experimental`).
2. **TypeScript con `noUncheckedIndexedAccess`** — los arrays devuelven `T | undefined`. Acostúmbrate a verificar.
3. **`localePrefix: "as-needed"`** — la default (es) no lleva prefijo en URL. `/en` y `/ar` sí.
4. **Sin SplitType externo** — el split-by-word del Manifesto se hace a mano con un helper `splitWords()`. Cero dependencia adicional, control total.
5. **Lenis NO en mobile (`smoothTouch: false`)** — scroll nativo táctil es más responsivo.
6. **`middleware.ts` mantenido** — Next 16 lo deprecó a favor de `proxy.ts`, pero el brief y el ecosistema next-intl v4 lo siguen recomendando. Migrable más adelante.
7. **`@view-transition` API estable** activada en `experimental.viewTransition: true`.
8. **Sin shadcn/ui salvo `Sheet` y `Dialog`** como base estructural del Cart (Fase 10). Todo lo demás se construye desde primitives.
9. **`grain-fine.png` placeholder 1×1 transparente** — el body::after está documentado en globals como TODO. Sustituir por noise 256×256 real antes de release.

---

## Cómo añadir cosas sin romper el sistema

- **Color nuevo**: añadir token a `app/globals.css` `:root` y a `@theme inline`. Usar siempre `var(--token)`, nunca el hex directo.
- **Tipografía nueva**: añadir al scale (`--text-Nxl`) y crear variant en `<Text>`. NO inventar valores ad-hoc.
- **Animación nueva**: usar una de las 5 curvas firma. Si necesitas otra, justificarla y añadirla al token.
- **Componente nuevo**: si es interactivo, añadir `data-cursor="interactive"`. Si es texto editable, `data-cursor="text"`.
- **Ruta nueva**: 
  1. `app/[locale]/{ruta}/page.tsx` Server Component async con `setRequestLocale`.
  2. Añadir copy a `messages/{es,en,ar}.json` en su propio namespace.
  3. `generateMetadata` con title/description traducidos.
- **Idioma nuevo**: añadir a `i18n/routing.ts` `locales` y crear `messages/{new}.json`. Si requiere fonts no latinas/árabes, añadir a `lib/fonts.ts` y al CSS variables.
