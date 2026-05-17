# Accessibility Audit — Fase 12

Date · 2026-05-17
Auditor · Phase 12 agent
Method · axe-core via Lighthouse (mobile preset, slow 4G) + manual review of every interactive component.

## Summary

13 issues reviewed across navigation, layout, product, atelier and form components.
8 issues required code changes; 5 were already correctly handled and only verified.

| # | Component | Issue | Severity | Fix applied |
|---|-----------|-------|----------|-------------|
| 1 | `app/[locale]/layout.tsx` | No skip-to-content link | High | Added visually-hidden `<a href="#main">` that becomes visible on focus, with translated label in `a11y.skip_to_content`. |
| 2 | `app/[locale]/layout.tsx` | `<main>` had no id, so the skip link could not target it | High | Added `id="main"` to the `<main>` element. |
| 3 | `lib/seo/structured-data.ts` + `components/seo/JsonLd.tsx` | No Organization/WebSite schema for assistive crawlers | High | Added typed JSON-LD payloads and a safe renderer. |
| 4 | `app/globals.css` `--ink-400` | `#7a6f5c` vs `#08080a` → 4.05:1 ratio (fails WCAG AA 4.5:1) | High | Nudged token to `#8a7e69` (4.55:1). Visually imperceptible, contractually critical. |
| 5 | `components/atelier/ProductCard.tsx` | Family eyebrow used `--gold-300` (3.6:1) on obsidian | High | Swapped to `--gold-200` (6.1:1) with code comment explaining the choice. |
| 6 | `components/product/ProductHero.tsx` | Perfumer link distinguishable only by color (WCAG 1.4.1) | Medium | Always-on `underline` with gold decoration, hover swaps to lighter gold. |
| 7 | `components/layout/CurrencySwitcher.tsx` | `aria-label="Currency"` but visible text is "EUR" → label-content-name-mismatch | Medium | Composed `aria-label` to `"${label}: ${visibleText}"` so visible content is part of accessible name. |
| 8 | `components/product/Narrative.tsx`, `Ritual.tsx`, `RelatedProducts.tsx`, `Reviews.tsx` and `app/[locale]/atelier/[slug]/page.tsx` (Pyramid block) | Section titles rendered as `<span>` small-caps, so the page heading order skipped from `<h1>` to `<h3>` in product cards | Medium | Promoted section labels to `<h2>` via `as="h2"` prop on the `<Text>` component. Visual styling unchanged. |
| 9 | `app/[locale]/atelier/page.tsx` | Atelier listing had `<h1>` directly above `<h3>` product cards | Medium | Added a visually-hidden `<h2>` between the page heading and the grid so the order reads h1 → h2 → h3. |
| 10 | `components/layout/{DubaiSkyline,Footer}.tsx` + `components/boutique/BoutiqueMap.tsx` | Invalid SVG attribute `height="auto"` produced runtime console errors and broke Lighthouse "errors-in-console" | Medium | Removed attribute, applied `className="h-auto"` instead. |
| 11 | All product-page Arabic inline names | Verified — `lang="ar"` and `dir="rtl"` are already applied (`ProductHero`, `ProductCard`, `Preloader`, `PatienceToast`). | None | No change needed. |
| 12 | All icon-only buttons (Navbar Search/User, CartIconButton, LocaleSwitcher trigger, MobileMenu close, AudioToggle, Filters close) | Verified — every icon button has translated `aria-label`. | None | No change needed. |
| 13 | All `<Image>` and `<img>` instances | Verified — alt text is descriptive (`"${product.names.en} · ${family.label_en} fragrance"`, `"Rose damascena petals gathered at dawn in a wooden basket."`, etc.). The Hero canvas uses `alt=""` because the `<h1>` already conveys section meaning. | None | Added a clarifying comment in `Hero.tsx`. |

## prefers-reduced-motion

Verified across:
- Global CSS wildcard (`*` with `animation-duration: 0.001ms`)
- `body::after` grain opacity drop
- Maison `Chapter`, `ChapterDivider`, `ChapterReveal`, `PullQuote`
- View-transitions group
- AudioToggle equalizer (`reducedMotion` state)
- Hero entrance choreography (state-driven)
- ProductHero rotation/parallax

All animations short-circuit to a static state under reduced motion.

## Keyboard navigation

Manual smoke test:
- Tab traverses Navbar → MobileMenu hamburger → Search → LocaleSwitcher → Account → CartIcon → Skip link reachable as first stop on every page.
- LocaleSwitcher menu opens on Enter/Space, navigates with Arrow keys, closes on Escape (already implemented).
- CurrencySwitcher and Filters drawers honor Escape to close.
- Forms (Bespoke, Concierge, Newsletter) tab in label-input pairs with focus-visible gold outline.

## Lighthouse a11y category — final scores

| Route | A11y |
|-------|------|
| / | 81 (blocked by pre-existing hydration crash, see `known-issues.md`) |
| /atelier | **100** |
| /maison | **100** |
| /atelier/layla-noir | **100** |

Three out of four routes meet the ≥ 96 target. The `/` regression is caused by a Hero/Lenis hydration error documented in `docs/known-issues.md` and explicitly out of Phase 12 scope.
