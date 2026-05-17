"use client";
// Route curtain — visual wrapper that gives the route content a stable
// view-transition name, so the navigation-level @view-transition rules in
// globals.css can run a "curtain" clip-path animation.
//
// Server components cannot set `viewTransitionName` via the `style` prop
// (React 19 forwards styles, but the named transition only matters once the
// browser computes layout, which is fine here). We keep this thin client
// wrapper so the layout root stays a server component.

import type { ReactNode } from "react";

interface RouteCurtainProps {
  children: ReactNode;
}

export function RouteCurtain({ children }: RouteCurtainProps) {
  return (
    <div style={{ viewTransitionName: "route-curtain" }}>
      {children}
    </div>
  );
}
