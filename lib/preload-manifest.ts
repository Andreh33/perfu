// PERFUMES DUBAI · Critical asset manifest consumed by the cinematic preloader.
//
// The `<Preloader>` (components/preloader/Preloader.tsx) awaits every asset
// listed below before allowing the exit choreography to begin. It uses fetch()
// for images/textures and treats GLTF as a fetch as well — it does NOT decode
// or upload to the GPU; that responsibility belongs to the consumer
// (e.g. R3F's `useTexture.preload(url)` invoked from a sibling client module).
//
// B2 (Hero WebGL) is the next phase that will populate this list with the
// textures and meshes the hero scene needs decoded ahead of paint. To add an
// asset, append an entry like:
//
//   { kind: "texture", url: "/textures/hero-bottle-albedo.ktx2" }
//   { kind: "gltf",    url: "/models/flacon.glb" }
//   { kind: "image",   url: "/hero-fallback.jpg" }
//
// Keep this list short — every entry blocks the curtain reveal. Anything that
// can stream after first paint should NOT live here.

export type CriticalAsset =
  | { kind: "image"; url: string }
  | { kind: "texture"; url: string }
  | { kind: "gltf"; url: string };

export const criticalAssets: ReadonlyArray<CriticalAsset> = [];
