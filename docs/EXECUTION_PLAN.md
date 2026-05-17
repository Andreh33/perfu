# PERFUMES DUBAI · EXECUTION PLAN (paralelizable)

> Blueprint de ejecución estructurado en **olas dependientes** con prompts
> auto-contenidos para cada sub-agente. Cada prompt está escrito para ser
> copiado/pegado al `Agent` tool sin modificación. Las referencias `§X.Y`
> apuntan al brief en `../CLAUDE.md` (raíz del proyecto, dos niveles arriba).
>
> **Estado actual:**
> - ✅ Fase 0 completa (commit `chore: project setup with Next 16.2…`)
> - 🟡 Fase 1 parcial: tokens CSS (`app/globals.css`), `lib/cn.ts`,
>   `lib/fonts.ts`, primitives `Button/Container/Section/Text/Link`.
>   **Falta:** `app/layout.tsx` cableado con fonts, página `/_styleguide`,
>   commit.

---

## Reglas globales para todos los sub-agentes

1. **El brief manda.** Lee `D:/PROYECTO/demos/prueba/CLAUDE.md` antes de
   tocar código. Si una referencia `§X.Y` colisiona con tu impulso por
   defecto, gana el brief.
2. **Nivel 3 o nada** (§0). Antes de cada commit pregúntate: ¿lo firmaría
   Resn para Apple? Si no, lo rehaces.
3. **Tokens, no valores hardcoded.** Usa siempre `var(--ink-100)` etc.
   Nada de `#fff`, `text-gray-500`, `shadow-lg` genérico.
4. **Server Components por defecto.** `"use client"` solo donde sea
   estrictamente necesario, con comentario justificando el motivo.
5. **TypeScript strict** + `noUncheckedIndexedAccess`. Nada de `any`.
6. **Sin emojis en UI** salvo easter eggs aprobados explícitamente.
7. **i18n-aware:** todo texto visible pasa por `next-intl`. No hardcodear
   copy en componentes.
8. **a11y:** `aria-label` traducido, focus rings de §10, `lang="ar"` en
   bloques árabes.
9. **Después de tu trabajo, commit local con mensaje descriptivo** (ver
   sección "Commits sugeridos" de cada prompt).
10. **No ejecutes `npm run dev` con background = false** — usa
    `run_in_background: true` para no bloquear la sesión.

---

## Mapa de dependencias

```
                Fase 0 (DONE)
                     │
                Fase 1 (design system)
                     │
        ┌────────────┴────────────┐
       Fase 2 (i18n)         Fase 3 (layout shell)
        └────────────┬────────────┘
                     │
   ┌─────────┬───────┼───────┬─────────┬──────────┬─────────┐
  Fase 4   Fase 5  Fase 6   Fase 7   Fase 9     Fase 11   (otros)
  prelod   hero    manifesto products maison    routes
                            │
                            ├── Fase 8 (product detail · usa products)
                            └── Fase 10 (cart · usa products)
                                │
                                Fase 12 (SEO + a11y · necesita todo)
                                │
                                Fase 13 (review obsesiva)
                                │
                                Fase 14 (deploy)
```

---

## OLA 1 · FOUNDATION (secuencial, ~3 agentes encadenados)

> Estas tres fases bloquean todo lo demás. Ejecuta una tras otra. No paralelo.

### A1 · Cerrar Fase 1 (design system + styleguide)

```
TÍTULO: Cerrar design system Perfumes Dubai (Fase 1)
SCOPE:
- Edita app/layout.tsx para envolver el body con las fontVariables de
  lib/fonts.ts. Conserva metadata mínima por ahora (next-intl lo
  reescribirá en Fase 2). Añade <body className={`${fontVariables}
  font-body bg-[var(--obsidian-400)] text-[var(--ink-100)]`}>.
- Crea app/_styleguide/page.tsx (oculta por nomenclatura `_`) que
  renderice TODOS los tokens y primitives existentes:
  · Paleta cromática (3 columnas: ink/obsidian/gold + accents) con swatches
    de 96×96 mostrando hex y nombre del token.
  · Escala tipográfica completa (text-xs a text-9xl) renderizada en
    Fraunces display, con tracking documentado.
  · Demo de cada variant del Button (primary/gold/outline/ghost) en md y lg.
  · Demo de Text variants (display-xxl, display-l, headline, subhead,
    body-l, body, small-caps, metadata, quote).
  · Demo del Link con underline-draw.
  · Bloque árabe de prueba: "فن العطر، مستخلص من الصحراء والزمن" en
    Noto Naskh display + body Plex Arabic, con dir="rtl" forzado en su
    contenedor.
  · Bloque de spacing tokens (rectángulos visuales para --space-1 a -12).
  · Bloque de easing curves (caja animada por cada curva en loop con
    keyframes CSS de demostración).
- Crea /public/textures/grain-fine.png (ponlo como placeholder: una imagen
  PNG 256×256 de noise blanco/negro opacidad media — puedes generarla con
  un script Node simple usando sharp; si sharp no está, descarga de
  https://images.unsplash.com/photo-1517999144091-3d9dca6d1e43?w=512
  y conviértela; alternativa: deja un PNG vacío y deja TODO documentado).
QA GATE:
- npm run dev arranca sin errores TS.
- Navega a /styleguide (con HEAD a localhost:3000/_styleguide?... O si Next
  bloquea rutas con `_`, renombra a /styleguide y añade noindex via
  metadata.robots = "noindex").
- Verifica las 5 familias de fuentes cargadas en network panel.
- Screenshot con playwright a 1440×900 y guarda en docs/screenshots/
  styleguide-1440.png.
COMMIT: "feat: design system tokens, primitives, typography scale, styleguide"
```

### A2 · Fase 2 — i18n trilingüe + RTL

```
TÍTULO: Configurar next-intl v4 con es/en/ar
SCOPE:
- Lee node_modules/next-intl/dist/types/index.d.ts y el README para confirmar
  API actual antes de usar memoria.
- Crea i18n/routing.ts con locales ['es','en','ar'], defaultLocale 'es',
  localePrefix 'as-needed'.
- Crea i18n/request.ts con getRequestConfig que lee /messages/{locale}.json.
- middleware.ts con createMiddleware(routing) + matcher excluyendo
  api/, _next/, _vercel/, assets estáticos.
- Mueve app/page.tsx, app/layout.tsx a app/[locale]/. El layout.tsx debe:
  · setRequestLocale(locale)
  · const messages = await getMessages()
  · Envolver children en <NextIntlClientProvider messages>
  · <html lang={locale} dir={locale==='ar'?'rtl':'ltr'}>
  · <body> con fontVariables condicionales (notoNaskh+plexArabic solo si
    locale==='ar') usando next/font's preload: false en las demás.
- Crea messages/es.json, en.json, ar.json con un namespace 'common'
  mínimo (nav links, cta hero, eyebrow). Los demás namespaces se rellenan
  en sus fases respectivas.
- Mueve /_styleguide (si existe) a app/[locale]/_styleguide.
- Crea components/layout/LocaleSwitcher.tsx (Client Component) con los
  3 idiomas. Usa useLocale + useRouter + usePathname de next-intl/navigation.
- Documenta en docs/i18n.md cómo añadir un namespace nuevo.
QA GATE:
- /, /en, /ar cargan 200.
- /ar tiene <html dir="rtl">.
- Bloque árabe del styleguide se renderiza con fuente correcta.
- Los 3 idiomas resuelven la copy básica del navbar.
COMMIT: "feat: i18n setup with es/en/ar locales and RTL support"
```

### A3 · Fase 3 — Layout global (Navbar + Footer + Cursor + Lenis)

```
TÍTULO: Layout global premium (Navbar + Footer + Cursor + Lenis)
SCOPE:
- components/layout/Navbar.tsx (Server Component shell + Client
  para scroll listener) según §5.2:
  · Monograma "PD" custom SVG 32×32 con color var(--ink-100), tracking 0.
  · 5 links centrales con next-intl: MAISON · ATELIER · PERFUMEUR ·
    BESPOKE · JOURNAL, separados por bullet •, small-caps tracking 0.16em.
  · Underline-draw en hover (mismo patrón que componentes/ui/Link).
  · Lado derecho: SearchIcon, LocaleSwitcher dropdown (3 puntos verticales),
    AccountIcon, CartIcon con badge.
  · Scrolled state: backdrop-filter blur(24px) + saturate(1.4), border
    bottom rgba(245,241,232,0.06).
  · Aparición con clip-path inset(100% 0 0 0) → inset(0) en 600ms
    --ease-soft-expo al mount.
  · Mobile hamburguesa: 3 líneas asimétricas (grosor 1/2/1px) que abre
    overlay fullscreen con stagger de links via motion.
- components/layout/Footer.tsx según §5.9 (3 bloques: Newsletter,
  Links 4-col, Boutique map). Mapa Dubai SVG custom (silueta estilizada,
  no Google Maps), marker dorado en City Walk. Logo gigante outline
  --text-9xl en stroke 1.5px --ink-400 al cierre. Newsletter Input
  underline-only + flecha→check en submit. NO uses <form action> sin
  endpoint — emula con Server Action que devuelva success.
- components/cursor/CustomCursor.tsx (Client) según §2.5:
  · Lerp 0.18, dos elementos (dot + ring).
  · Detección de [data-cursor="text"|"interactive"|"webgl"] en target.
  · Desactivado en (pointer: coarse). Añade body.classList.add(
    'has-custom-cursor') solo si fine pointer.
  · WebGL state: añade trail de partículas con canvas overlay (deferred —
    placeholder OK por ahora).
- lib/hooks/useLenis.ts + components/layout/LenisProvider.tsx (Client).
  Lenis con duration 1.2, easing var(--ease-pure-cubic) equivalente.
  Sincroniza con GSAP ScrollTrigger.update via gsap.ticker.add.
- Cookie banner minimal RGPD en footer: chip fixed bottom-left con
  "We respect your visit. We don't track." + botón "PERSIST" (oculta y
  guarda en localStorage).
- Mete <Navbar/>, <Footer/>, <CustomCursor/>, <LenisProvider/> en
  app/[locale]/layout.tsx.
- Actualiza messages/*.json con namespace 'navbar' y 'footer'.
QA GATE:
- Navbar visible y posicionado correctamente en home.
- Hover sobre cualquier link dibuja underline.
- Cursor desktop sigue suave (verifica con playwright + mousemove).
- Scroll smooth con Lenis (verifica con event listener temporal).
- Footer renderiza los 3 bloques con tipografía y spacing correctos.
- Idioma árabe: navbar invertido (RTL), monograma a la derecha.
COMMIT: "feat: global layout with navbar, footer, lenis, custom cursor"
```

---

## OLA 2 · COMPONENTES INDEPENDIENTES (paralelo · 6 agentes simultáneos)

> Estos sub-agentes pueden correr a la vez. **Cada uno trabaja en un
> worktree independiente** para evitar conflictos. Recomendado usar
> `Agent` con `isolation: "worktree"`.

### B1 · Fase 4 — Preloader cinemático

```
TÍTULO: Preloader cinemático con SVG stroke animation y carga real
SCOPE: §5.1 íntegro.
- components/preloader/Preloader.tsx (Client, montado vía portal en
  app/[locale]/layout.tsx con z-index 9999).
- Mide carga real con Promise.all de: document.fonts.ready, useTexture.preload
  de las texturas críticas declaradas en lib/preload-manifest.ts, useGLTF.preload
  si hay modelos. Cuenta image hero next/image priority via onLoad.
- SVG stroke animation letra a letra "PERFUMES DUBAI" en outline 1px
  --gold-200, dasharray/dashoffset animado 0→100% en 1800ms --ease-soft-expo,
  stagger 80ms.
- Línea de progreso horizontal 200×1px --gold-200 opacity 0.4 con punto
  luminoso interno que avanza con loadProgress real.
- Label SMALL CAPS dinámico: ASSEMBLING ESSENCE · {pct}% · {currentLabel}
  donde currentLabel rota entre "LOADING SHADERS", "FETCHING TEXTURES",
  "PREPARING SCENE", "COMPOSING" en función de qué promise está pendiente.
- Esquina inferior derecha: badge árabe "صبراً جميلاً" en --ink-300.
- Mínimo 1800ms incluso si carga rápido. Máximo 4500ms — si supera,
  cambia label a "TAKING LONGER · STAY WITH US".
- SALIDA: opacidad/escala del logo (1→0.96, opacity 1→0 en 480ms
  --ease-silk), cortina dorada sube (clip-path inset bottom 100→0 en
  720ms --ease-soft-expo), luego baja desde arriba revelando hero (1100ms).
- Estilos críticos inlined en <style> dentro del Server Component padre.
- Después de salida total: display:none + dispatch CustomEvent
  'preloader:done' para que el hero arranque su entrance.
QA GATE:
- Cold reload: el preloader aparece sin FOUC.
- Progress real (no setTimeout fake) — verifica con throttling 4G en devtools.
- Salida cinematográfica sin glitches.
- Respeta prefers-reduced-motion (transición instantánea).
COMMIT: "feat: cinematic preloader with real asset loading and choreography"
```

### B2 · Fase 5 — Hero WebGL + shader GLSL

```
TÍTULO: Hero con shader FBM gold smoke + tipografía editorial
SCOPE: §5.3 + §6.1 íntegros.
- components/three/Hero3D.tsx (Client, dynamic import con ssr:false desde
  components/sections/Hero.tsx Server Component).
- Canvas R3F con OrthographicCamera fullscreen plane.
- Shader GLSL en components/three/shaders/HeroFog.glsl (o inline en TS
  con glsl tagged template). Implementa exactamente el fragment del §6.1
  con FBM 5 octavas, mouseOffset, gradiente vertical, vignette.
- Implementa snoise (simplex noise 2D) en GLSL — copia la implementación
  estándar de Ashima Arts (Apache 2.0).
- Mouse tracking con useMotionValue + useSpring (motion). Suavidad ~stiffness 80,
  damping 30. Pasa como uniform uMouse normalizado.
- components/three/Postprocessing.tsx con @react-three/postprocessing:
  Bloom (luminanceThreshold 0.85, intensity 0.8, radius 0.6),
  ChromaticAberration ([0.0008, 0.0008]),
  Noise (premultiply false, blendFunction OVERLAY, opacity 0.04),
  Vignette (darkness 0.45, offset 0.5).
- components/sections/Hero.tsx (Server) con LAYOUT §5.3:
  · 100vh, viñeta radial via CSS, noise overlay mix-blend-mode overlay 0.06.
  · Eyebrow small caps "EST. DUBAI · MMXXVI · MAISON DE PARFUM" (i18n).
  · H1 display-xxl Fraunces dos líneas con punto dorado superscript.
  · Subtítulo serif italic display-m en --ink-300 (i18n).
  · CTA "ENTER THE ATELIER →" con flecha bounce horizontal en loop.
  · Texto centra vertical, alineado izquierda margin var(--space-10).
- Entrada animada con GSAP + SplitText (NO uses SplitType externa —
  GSAP 3.13 trae SplitText built-in pero requiere registro de plugin):
  · Eyebrow clip-path 600ms delay 0.
  · H1 línea 1 stagger 120ms por palabra delay 200ms.
  · H1 línea 2 delay 380ms.
  · Subtítulo opacity+translateY 700ms delay 1200ms.
  · CTA delay 1500ms.
- Audio toggle components/sections/AudioToggle.tsx (Client) fixed
  bottom-right 48px:
  · Loop oud + viento desierto en /public/audio/maison-ambient.mp3 (deja
    el archivo como placeholder vacío o nota README — el cliente subirá
    el oficial. Documenta dónde colocarlo).
  · 5 barras verticales SVG que oscilan cuando ON.
  · Fade-in 4s. MUTE por defecto. Persistencia localStorage.
- Reduced motion: shader pausado, imagen fallback estática /public/hero-fallback.jpg
  (placeholder Unsplash documentado).
- Lazy: dynamic import del 3D bundle solo tras LCP (cargar bajo
  IntersectionObserver de threshold 0).
QA GATE:
- 60fps en MacBook M1 baseline (verifica con Performance Monitor).
- Mouse reacciona con suavidad spring, sin jitter.
- Texto entra coreografía correcta y orden.
- Audio toggle persiste reload, mute default verificable.
- Reduced motion respetado.
COMMIT: "feat: hero with FBM gold smoke shader, postprocessing and editorial typography"
```

### B3 · Fase 6 — Manifiesto scroll-pinned

```
TÍTULO: Manifiesto pinned con SplitText + image sequence procedural
SCOPE: §5.4.
- components/sections/Manifesto.tsx (Server shell) + Manifesto.client.tsx.
- GSAP timeline + ScrollTrigger con pin:true por 3-4 viewport heights.
- 4 estados con frases (texto en messages/{locale}.json namespace 'manifesto'):
  1) "We don't sell perfume."  → palabras con clip-path stagger 200ms.
  2) Sale clip-path inset bottom, entra "We bottle memory." con
     "memory" en --gold-200.
  3) Image sequence frame-by-frame de gota cayendo:
     · Intenta primero /public/sequences/drop/drop_001.webp..drop_090.webp.
     · Si no existen (probable), implementa fallback PROCEDURAL: un canvas
       2D que renderiza una gota con física simple (gravity 0.4, drag 0.02,
       trail con motion blur usando globalAlpha decreciente) bindeada al
       scroll progress. Convierte cada paso de progreso 50-75% a posición
       de gota.
     · Frase 3 al lado: "Three thousand years of attar, distilled."
  4) "Worn by those who never explain themselves." sale en fade+clip.
- Image sequence: precarga con Promise.all si hay frames reales; si es
  canvas, no necesita precarga.
- will-change: transform solo durante el pinned scroll (toggle on enter/leave).
- Sincronizar con Lenis (gsap.ticker.add(lenis.raf)).
QA GATE:
- Scroll suave 60fps durante el pin.
- Frases coreografía exacta entrada/salida.
- Canvas gota animada visible y atada al scroll.
- Sin layout shift al entrar/salir del pin.
- Reduced motion: muestra las 4 frases stacked sin pin.
COMMIT: "feat: pinned manifesto with split-text and procedural drop sequence"
```

### B4 · Fase 7 — Datos + catálogo /atelier (sin ficha detallada)

```
TÍTULO: 20 perfumes con copy editorial trilingüe + catálogo grid editorial
SCOPE: §7 + §5.5.
- lib/products.ts: 20 perfumes con shape EXACTO de §7. Lista de nombres
  del brief (Layla Noir, Oud al-Qamar, Rose Damas Vintage, …). Distribución
  6 Oud / 4 Amber-Spicy / 4 Floral / 3 Woody / 3 Fresh-Aquatic. Slug
  kebab-case. Familia y notas reales por nota olfativa. Copy editorial
  4-5 párrafos de 60-80 palabras en EN primero, luego adaptación cultural
  (NO traducción rígida) a ES y AR. NO clichés comerciales. SI prosa
  atmosférica (ver ejemplo del brief sobre Layla Noir).
- lib/perfumers.ts: 6-8 perfumistas ficticios pero verosímiles con nombre,
  bio breve (3 idiomas), photo placeholder Unsplash documentado.
- Constantes lib/families.ts con metadata por familia (color hint, icon
  name, descripción olfativa corta).
- app/[locale]/atelier/page.tsx (Server) con LAYOUT EDITORIAL §5.5:
  · H1 "THE ATELIER" display-l + contador "20 fragrances" small-caps.
  · Filtros laterales sticky desktop / drawer mobile:
    Familia (multi), Género, Intensidad, Precio (slider doble pulgar
    custom dorado — usa @radix-ui/react-slider sin shadcn, restilizado),
    Tamaño, Año.
  · Filtros sincronizados con searchParams (URL state, no client state
    para SSR-friendly).
  · Toggle vista GRID/LIST. Default GRID.
  · Grid asimétrico pattern 6: [L S / S M / M L] (12-col grid).
  · ProductCard según §5.5 con hover 3D (rotate Y 3deg X 1deg perspective
    800px), franja vertical dorada drawing on hover, shimmer dorado tipo
    "brillo" recorre cristal (linear gradient transparent→gold-100 0.4→
    transparent, width 30%, left -30%→130% en 1400ms).
  · Stagger entry 80ms entre cards al entrar viewport.
- components/atelier/ProductCard.tsx (Client por hover 3D).
- components/atelier/Filters.tsx + FilterChip + RangeSlider.
QA GATE:
- 20 productos visibles, copy trilingüe coherente y no robotizado.
- Filtros funcionan vía URL params (verifica navegando con ?family=oud).
- Hover de cards muestra rotate + shimmer + franja dorada.
- 60fps scroll en grid (sin layout thrashing).
- Mobile: drawer filtros se abre con backdrop.
COMMIT: "feat: catalogue with 20 fragrances, editorial grid, URL-state filters"
```

### B5 · Fase 9 — Maison storytelling

```
TÍTULO: Maison editorial con 4 capítulos romanos
SCOPE: §5.7.
- app/[locale]/maison/page.tsx (Server).
- 4 capítulos según brief (I LA RÉCOLTE / II L'ALAMBIC / III LA MACÉRATION /
  IV LA MISE EN FLACON).
- Por capítulo:
  · Marker sticky izquierda con número romano gigante --text-8xl serif y
    nombre en small-caps debajo. Usa position:sticky top:20vh.
  · Imagen hero derecha tratamiento cálido (filter contrast 1.1 saturate
    1.1 + warm overlay rgba(184,147,90,0.08)).
  · 3-4 párrafos editoriales con drop cap en el primer (3 líneas alto,
    --gold-200, Fraunces italic 400).
  · Pull quote a mitad: display-m italic centrado, comillas tipográficas
    dobles correctas (curly).
  · Transición al siguiente: barrido dorado horizontal con
    clip-path inset y delay scroll-driven.
- Copy literario en messages/{locale}.json namespace 'maison'. Prosa
  literaria, no marketing. ES debe sonar como un periodista cultural,
  AR como prosa árabe clásica adaptada.
- Imagen Unsplash placeholder por capítulo con query documentado.
QA GATE:
- Scroll storytelling fluido sin saltos.
- Markers sticky se quedan durante el capítulo y transicionan suave.
- Transición entre capítulos cinematográfica.
- Tipografía drop cap visualmente correcta.
COMMIT: "feat: maison editorial storytelling with 4 chapters"
```

### B6 · Fase 11 — Rutas restantes + microinteracciones

```
TÍTULO: Perfumeur + Bespoke + Boutique + Journal + Concierge + Legal + 404
SCOPE: §11 Fase 11 + §5.10.
- app/[locale]/perfumeur/page.tsx: editorial sobre los 3-4 perfumistas
  destacados (usa lib/perfumers.ts). Layout: photo grande izquierda,
  bio + obras representativas derecha. Hover sobre obra: link a ficha.
- app/[locale]/bespoke/page.tsx: lead capture con form Zod (nombre, email,
  teléfono opcional, preferencias olfativas multi-check, presupuesto,
  mensaje). Server Action que devuelve success — NO envía nada real,
  documenta dónde meter Resend/Mailgun.
- app/[locale]/boutique/page.tsx: dirección física Dubai City Walk,
  horarios, teléfono. Mapa SVG custom de Dubai estilizado (silueta de
  edificios famosos + marker dorado pulsante en City Walk). NO Google Maps.
- app/[locale]/journal/page.tsx: placeholder editorial elegante
  "Coming this winter — MMXXVI" + suscripción al newsletter.
- app/[locale]/concierge/page.tsx: form contacto Zod (nombre, email,
  asunto, mensaje). Server Action mock.
- app/[locale]/legal/{privacy,terms,cookies}/page.tsx: páginas legales
  con copy genérico pero correcto (puede ser español-EU porque empresa
  registrada en UE, mencionar GDPR + transferencia a UAE).
- app/[locale]/not-found.tsx según §5.10: H1 "This fragrance has evaporated."
  + SVG de frasco vacío con líquido bajando en loop.
- View Transitions API para todas las transiciones de ruta: añade
  view-transition-name="route-curtain" a un elemento envolvente fijo en
  layout y CSS @view-transition / ::view-transition-* con cortina dorada
  vertical (clip-path).
- Easter egg: lib/hooks/useScrollVelocity.ts → si velocity > 4000 px/s
  durante 200ms, muestra toast tipográfico fixed center "اصبر · BE PATIENT"
  por 2s con --ease-soft-expo fade.
QA GATE:
- 8 rutas funcionan con i18n (3 locales × 8 = 24 URLs).
- Forms validan con Zod (verifica error states).
- 404 se ve cinemático.
- View Transitions activas al navegar (verifica en devtools Performance).
- Easter egg dispara solo en scroll rápido.
COMMIT: "feat: secondary routes, view transitions, scroll-velocity easter egg"
```

---

## OLA 3 · DEPENDIENTES DE OLA 2 (paralelo · 2 agentes)

> Esperar a que termine Ola 2 (especialmente B4 products).

### C1 · Fase 8 — Ficha de producto + modelo 3D

```
TÍTULO: Ficha de producto con frasco 3D R3F + 6 secciones editoriales
SCOPE: §5.6 + §6.2.
- app/[locale]/atelier/[slug]/page.tsx (Server) con generateStaticParams
  emitiendo todos los slugs × 3 locales.
- generateMetadata: openGraph con imagen dinámica /api/og/[slug],
  twitter:card summary_large_image, structured-data Product schema en
  <script type="application/ld+json">.
- components/three/BottleScene.tsx (Client, dynamic ssr:false):
  · Si lib/products.ts no expone GLB path, GENERA frasco procedural
    componiendo CylinderGeometry + LatheGeometry para silueta. Tapón
    BoxGeometry con BevelGeometry o cylinder rotado.
  · MeshPhysicalMaterial con specs §6.2 (transmission 0.92, ior 1.45,
    iridescence 0.08, etc.).
  · Líquido interior mesh ligeramente más pequeño con
    transmission 0.4 + color liquid_color_hex del perfume.
  · Tapón metallic 0.9 roughness 0.25 color --gold-200.
  · Etiqueta papel: Text3D drei con Fraunces (necesita .json font —
    usa drei `<Text>` con font HTML default si Text3D requiere typeface
    JSON que no tenemos).
  · 3 luces direccionales (key warm, fill cool, rim warm-strong).
  · <Environment preset="studio" /> drei.
  · Rotación auto Y 0.1 rad/s que se PAUSA en hover.
  · OrbitControls limitado: enableZoom false, enablePan false,
    maxPolarAngle/minPolarAngle igual (solo Y).
  · Postprocessing: Bloom selectivo, ChromaticAberration sutil, Noise.
- 6 secciones según §5.6 (A Hero · B Horizontal images · C Narrative ·
  D Pirámide olfativa interactiva · E Ritual · F Related · G Reviews).
- Section B usa GSAP horizontal scroll con pin. 5-7 imágenes Unsplash
  documentadas (queries específicas).
- Section D PirámideOlfactiva.tsx con iconos SVG custom por nota.
  Hover pill = expande descripción olfativa (datos en lib/notes.ts).
- Section G Reviews: 8-12 reviews realistas tipo brief
  (Aisha M. Dubai, Léa B. Paris, Marco V. Milano, etc.) en
  messages/{locale}.json namespace 'reviews.{slug}'.
- Sticky CTA footer "ACQUIRE — €420" cuando hero CTA fuera de viewport.
- /api/og/[slug]/route.tsx con next/og generando imagen 1200×630 con
  fondo gradient noche + dorado, nombre Fraunces grande, familia
  small-caps. NO usar componentes de UI; usa el subset HTML soportado
  por next/og.
QA GATE:
- 5 productos distintos navegables con ficha completa.
- Modelo 3D renderiza con reflejos creíbles.
- Hover sobre nota expande descripción.
- Sticky CTA aparece después del hero.
- OG image dinámica funciona (curl /api/og/layla-noir).
- Performance: ficha LCP < 2.5s (verifica Lighthouse local).
COMMIT: "feat: product page with 3D bottle, olfactory pyramid, reviews and OG"
```

### C2 · Fase 10 — Carrito + Stripe Links

```
TÍTULO: Cart drawer + lógica Stripe Payment Links
SCOPE: §5.8.
- components/cart/CartSheet.tsx usando Sheet de shadcn como base
  estructural (instálalo con `npx shadcn add sheet`), RE-ESTILIZADO
  completo según §5.8.
- lib/store/cart.ts: Zustand store con persist middleware
  (localStorage key 'pd-cart-v1'). Schema Zod en lib/store/cart-schema.ts
  para validar lo leído de localStorage.
- Items shape: { slug, size: 'ml50'|'ml100', quantity }.
- Hooks: useCart() (selectors), addItem, removeItem, updateQty, clear.
- lib/stripe-links.ts: STRIPE_LINKS = { [slug]: { ml50: "", ml100: "" } }
  con TODOS los 20 slots EXPLÍCITAMENTE vacíos. Comentario top:
  "Slots para que el cliente pegue Payment Links de Stripe Dashboard.
  Path: /dashboard/payment-links/create. Crear cada link como Producto >
  Modo: One-time. Set checkout success_url a /es/checkout/success."
- Lógica al click "PROCEED TO CHECKOUT":
  · Si cart.items.length === 1 → window.open(STRIPE_LINKS[slug][size], '_blank').
  · Si > 1 → muestra refined message con botón "MAIL CONCIERGE" que abre
    mailto:concierge@perfumesdubai.com con body pre-rellenado conteniendo
    la lista (nombre, tamaño, cantidad, precio).
- Cart UI según §5.8 íntegro: drawer derecho 480px, items con thumbnail
  64×80, qty buttons - 1 +, remove X, total tabular-nums, CTA dorado
  border-only que llena en hover.
QA GATE:
- Añadir/quitar/cambiar qty actualiza estado y persiste reload.
- 1 producto: click checkout abre nueva pestaña con URL Stripe (aunque
  vacía, verifica que el handler dispara window.open).
- Múltiples: muestra concierge message + mailto correcto.
COMMIT: "feat: cart with stripe payment links and concierge fallback"
```

---

## OLA 4 · QA + DEPLOY (secuencial)

### D1 · Fase 12 — SEO + a11y + perf

```
TÍTULO: SEO completo, OG dinámico, sitemap, a11y audit
SCOPE: §12.
- generateMetadata por ruta (titles editoriales, descriptions <160ch,
  canonical, alternates.languages para los 3 locales).
- /api/og/[slug] ya hecho en C1 — extiende para rutas estáticas
  (home, atelier, maison) con templates similares.
- app/sitemap.ts dinámico con TODAS las rutas × locales (incluye fichas).
- app/robots.ts permisivo + sitemap reference.
- Structured-data Product schema en fichas + Organization schema en home.
- Audit prefers-reduced-motion en cada componente animado (B1-B3
  deberían respetarlo; verifica con devtools emulation).
- Audit focus rings: tab por la home y verifica que cada interactive
  tiene anillo visible 2px --gold-200.
- Audit alt texts: cada <Image> tiene alt descriptivo i18n-aware (no
  "perfume bottle" genérico — debe describir el frasco concreto).
- Audit aria-labels en navbar, footer, cart, navegación.
- Lighthouse mobile audit local (npm run build && start, luego Lighthouse
  CI o devtools). Itera hasta cumplir §9 targets.
QA GATE:
- Lighthouse mobile: perf ≥ 88, a11y ≥ 96, bp ≥ 95, seo ≥ 96.
- Sitemap accesible en /sitemap.xml con todas las URLs.
- Sin warnings de a11y en axe-core devtools.
COMMIT: "feat: seo, og images, sitemap, full a11y and perf audit"
```

### D2 · Fase 13 — Revisión obsesiva

```
TÍTULO: Revisión obsesiva (las 30 preguntas)
SCOPE: §11 Fase 13.
- Recorre el sitio en 3 idiomas, mobile + desktop.
- Verifica una a una las 30 preguntas del brief. Por cada NO, corrige
  antes de seguir.
- Documenta los hallazgos en docs/qa-fase-13.md con tabla:
  | # | Pregunta | Veredicto | Fix aplicado | Commit |
- Pasada de polish:
  · Caza todo `transition-all` y `duration-300` lineal → reemplaza con
    propiedad específica + curva firma.
  · Caza todo `rounded-lg shadow-xl` por defecto → re-estiliza.
  · Caza placeholders Lorem/Coming soon olvidados.
  · Tabular-nums activo en precios.
  · text-wrap balance/pretty en H1-H3 / párrafos.
COMMIT: "chore: obsessive review fixes — polish pass"
```

### D3 · Fase 14 — Deploy

```
TÍTULO: Deploy producción a Vercel
SCOPE: §11 Fase 14.
- git status limpio, commit final con changelog del estado.
- git push origin main.
- Si Vercel CLI no instalado: pídeselo al usuario:
  "Para deploy necesito Vercel CLI: `npm i -g vercel`. Después,
   `vercel login` y `vercel link` desde /perfu."
- vercel --prod (o vercel deploy --prebuilt si ya hicimos build local).
- PIDE AL USUARIO: "Genera token Vercel Blob en vercel.com/dashboard/stores
  → Create Database → Blob. Pégame el token cuando lo tengas para
  configurar BLOB_READ_WRITE_TOKEN en env vars de Vercel."
- Una vez recibido, `vercel env add BLOB_READ_WRITE_TOKEN production`.
- Lighthouse audit en URL prod.
- ENTREGA FINAL (escribe docs/DELIVERY.md con):
  · URL prod, URL repo, commits.
  · Lista 40 Stripe links a crear con path exacto.
  · Lista de imágenes pendientes de foto real.
  · Lista de copy revisable por cliente.
  · Lighthouse scores finales.
  · Link a docs/design-system.md (escríbelo: tokens, escalas, motion,
    accesibilidad, decisiones).
  · README profesional: setup, comandos, arquitectura, decisiones técnicas.
```

---

## Recomendación de dispatch

1. **Ahora mismo, secuencial en esta sesión:** lanzar A1 (cerrar
   Fase 1). El agente trabaja en el repo principal (no worktree —
   sería overkill).
2. **A2 y A3** pueden ser **secuenciales** (modifican layout root,
   conflicto inevitable).
3. **Ola 2 (B1-B6):** dispatch en paralelo, cada uno con
   `isolation: "worktree"`. Después merge manual (todos crean archivos
   nuevos en carpetas distintas, conflictos mínimos esperados solo en
   messages/*.json y app/[locale]/layout.tsx).
4. **Ola 3 (C1, C2):** paralelo después del merge de Ola 2.
5. **Ola 4:** secuencial al final.

Tiempo estimado total con paralelización: **4-6 horas de wall-clock**
(vs ~15-20 horas secuencial). Tokens estimados: ~1.5M-2.5M.

---

## Próximo paso sugerido

Ejecuta este comando para arrancar la Ola 1 (cerrar Fase 1):

```
Agent({
  description: "Cerrar Fase 1 design system",
  subagent_type: "general-purpose",
  prompt: <pega el bloque A1 íntegro aquí>
})
```

O dame luz verde y disparo yo el agente A1 ahora.
