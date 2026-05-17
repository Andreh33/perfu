"use client";
// Route curtain — passthrough wrapper. The named view-transition-name was
// removed because it interfered with React 19's hydration commit on first
// paint, producing `removeChild` errors when the browser captured a snapshot
// of an SSR-rendered subtree that React was still reconciling. The root-level
// `@view-transition { navigation: auto }` rule in globals.css continues to
// animate the entire root group on client-side navigations using `ease-soft-expo`,
// which is enough for the editorial feel without requiring a named transition.

import type { ReactNode } from "react";

interface RouteCurtainProps {
  children: ReactNode;
}

export function RouteCurtain({ children }: RouteCurtainProps) {
  return <>{children}</>;
}
