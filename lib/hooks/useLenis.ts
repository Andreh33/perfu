// Module-level singleton for the global Lenis instance.
// Set/cleared by `LenisProvider`. Other modules (ScrollTrigger sync, anchor
// helpers, future Manifesto pin) read from this without React context.

import type Lenis from "lenis";

let instance: Lenis | null = null;

export function setLenis(next: Lenis | null): void {
  instance = next;
}

export function getLenis(): Lenis | null {
  return instance;
}

/** Convenience hook-like accessor (call inside client components only). */
export function useLenis(): Lenis | null {
  return instance;
}
