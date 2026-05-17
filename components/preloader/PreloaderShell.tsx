// Server Component: emits the preloader's critical chrome (background, logo
// outline, and the @keyframes animation that draws the strokes) directly into
// the SSR'd HTML so the first paint shows the preloader before the Tailwind
// bundle or the client Preloader script have loaded. The interactive
// <Preloader> hydrates on top and takes over progress + exit choreography.
//
// Pattern: progressive hydration. If JS fails to load, the user still sees the
// static brand mark on a black canvas — no broken white flash.

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
@keyframes preloader-fade-in {
  from { opacity: 0; }
  to   { opacity: 1; }
}
[data-preloader-shell] {
  position: fixed;
  inset: 0;
  z-index: 10000;
  background: var(--obsidian-400);
  color: var(--ink-100);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: preloader-fade-in 240ms linear both;
}
[data-preloader-shell] svg { display: block; max-width: min(480px, 80vw); height: auto; }
@media (prefers-reduced-motion: reduce) {
  [data-preloader-shell] svg text { stroke-dashoffset: 0 !important; animation: none !important; }
}
`;

export function PreloaderShell({ copy }: PreloaderShellProps) {
  return (
    <>
      {/* Inline critical CSS — needs to be in the very first paint. */}
      <style
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: CRITICAL_CSS }}
      />
      {/* SSR static frame — replaced once the Client preloader mounts. */}
      <div data-preloader-shell aria-hidden>
        <svg width="480" height="120" viewBox="0 0 480 120" aria-hidden>
          <text
            x="240"
            y="52"
            textAnchor="middle"
            fontFamily="var(--font-display)"
            fontSize="44"
            fontWeight={300}
            letterSpacing="0.12em"
            fill="transparent"
            stroke="var(--gold-200)"
            strokeWidth={1}
          >
            PERFUMES
          </text>
          <text
            x="240"
            y="100"
            textAnchor="middle"
            fontFamily="var(--font-display)"
            fontSize="44"
            fontWeight={300}
            letterSpacing="0.32em"
            fill="transparent"
            stroke="var(--gold-200)"
            strokeWidth={1}
          >
            DUBAI
          </text>
        </svg>
      </div>
      {/* Client component layered on top — when it mounts it covers the shell
          entirely (same z-index, same position) and drives the animation. */}
      <Preloader copy={copy} />
    </>
  );
}
