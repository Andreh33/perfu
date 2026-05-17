# Known issues — discovered during Fase 12 audit, out of scope

## H1 · Home route hydrates into the Next.js error boundary

**Symptom** · After hydration on `/`, the `<html>` element is replaced with `<html id="__next_error__">`. Lighthouse therefore reports `html-has-lang` and `landmark-one-main` failures on this route only (a11y 81 instead of 100), and `errors-in-console` records a `NotFoundError: Failed to execute 'removeChild' on 'Node'` from the React reconciler.

**Suspected cause** · Race between `RouteCurtain` (AnimatePresence) + `LenisProvider` (DOM rewriting) + `Hero3D` (Suspense fallback swap). Reproduces consistently under simulated Slow 4G; sporadic on faster networks.

**Scope** · The brief explicitly forbids changes to Hero, manifesto pinning and cart, so this is filed for a follow-up.

**Recommendation** · Audit `<RouteCurtain>` Suspense boundaries when the Hero suspends.

## H2 · `Hero3D` ships a large client bundle

**Symptom** · LCP on `/` is 6.9 s on Slow 4G mobile. `unused-javascript` and `bootup-time` audits in `docs/lighthouse/home.json` point at the three.js + postprocessing chunk loaded eagerly.

**Recommendation** · Consider `dynamic(() => import(...), { ssr: false })` on the Hero3D module with a still-image fallback for the first viewport, and load the 3D scene only after `requestIdleCallback`. Out of scope for Phase 12.

## H3 · Product page TBT is 5.3 s

**Symptom** · `total-blocking-time` 5,340 ms on `/atelier/layla-noir`. Likely caused by the OlfactoryPyramid client component plus the RelatedProducts cards mounting at the same time.

**Recommendation** · Defer Reviews + RelatedProducts mount behind a `useInView` boundary. Out of scope for Phase 12.

## H4 · Some Unsplash hero images return HTTP 404

**Symptom** · Server log entries:
```
upstream image response failed for https://images.unsplash.com/photo-1612977858420-fc2e0a4d3d3f… 404
```

**Cause** · Several product `editorial` image URLs in `lib/products.ts` point at deleted Unsplash IDs.

**Recommendation** · Refresh the Unsplash IDs or migrate the assets to Vercel Blob. Out of scope for Phase 12.
