"use client";
// Diagnostic Client component: registers a window-level `error` listener so
// that uncaught React commit-phase NotFoundError crashes leave a printable
// componentStack-equivalent in console (file:line + the React fiber type that
// was being deleted), instead of just the obfuscated minified stack.
//
// Temporary diagnostic. Remove once the offending unmount path is identified.

import { useEffect } from "react";

export function GlobalErrorCapture() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const handler = (ev: ErrorEvent) => {
      const err = ev.error as Error | undefined;
      if (!err) return;
      if (err.name !== "NotFoundError" || !err.message.includes("removeChild")) {
        return;
      }
      // Try to extract any extra React-attached metadata (React 19 sometimes
      // attaches a `_componentStack` on errors thrown from the reconciler).
      const stack =
        (err as Error & { _componentStack?: string })._componentStack ??
        err.stack ??
        "(no stack)";
      /* eslint-disable no-console */
      console.error("█ removeChild crash captured at window level");
      console.error("File: " + ev.filename + ":" + ev.lineno + ":" + ev.colno);
      console.error("Name: " + err.name);
      console.error("Message: " + err.message);
      console.error("Stack:\n" + stack);
      // Snapshot current <head> children — the hoistable target.
      try {
        const headTags = Array.from(document.head.children).map(
          (n) => n.tagName + (n.id ? "#" + n.id : "") + (n.getAttribute("rel") ? "[" + n.getAttribute("rel") + "]" : ""),
        );
        console.error("Head children: " + headTags.join(" "));
      } catch {
        // ignore
      }
      console.error("█ end capture");
      /* eslint-enable no-console */
    };
    window.addEventListener("error", handler);
    return () => window.removeEventListener("error", handler);
  }, []);
  return null;
}
