// Server Component: emits ONLY the critical @keyframes CSS used by the
// Preloader's outlined logo (so the stroke-draw can animate before the
// Tailwind bundle loads) and then mounts the Client <Preloader>. The
// Client Preloader is itself SSR'd by React with its `phase="loading"`
// initial render, so the first paint already shows the brand mark on the
// black canvas — no need for a duplicate static shell sibling.
//
// Why no static shell anymore: rendering a static <div data-preloader-shell>
// as a sibling of the <Preloader> caused React 19 to throw NotFoundError
// (`removeChild`) once the Client preloader returned null at exit — both
// divs lived at the same z-index and React's reconciler lost track of which
// node it owned. The Preloader's own SSR'd markup already covers the first
// paint requirement.

import { Preloader } from "./Preloader";

interface PreloaderShellProps {
  copy: {
    assembling: string;
    labels: {
      shaders: string;
      textures: string;
      scene: string;
      composing: string;
      timeout: string;
    };
    arabicBadge: string;
  };
}

const CRITICAL_CSS = `
@keyframes preloader-draw { to { stroke-dashoffset: 0; } }
@media (prefers-reduced-motion: reduce) {
  [data-preloader] svg text { stroke-dashoffset: 0 !important; animation: none !important; }
}
`;

export function PreloaderShell({ copy }: PreloaderShellProps) {
  return (
    <>
      <style
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: CRITICAL_CSS }}
      />
      <Preloader copy={copy} />
    </>
  );
}
