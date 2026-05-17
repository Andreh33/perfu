"use client";

import { useEffect, useRef } from "react";

interface Options {
  /** Trigger threshold in pixels per second. Default: 4000. */
  threshold?: number;
  /** Velocity must stay above the threshold for this long (ms). Default: 200. */
  sustain?: number;
  /** Minimum interval (ms) between two trigger calls. Default: 10 000. */
  throttle?: number;
}

/**
 * Watches window scroll position and calls `onTrigger` when the user scrolls
 * faster than `threshold` (px/s) sustained for `sustain` (ms). Self-throttled
 * to `throttle` ms between two consecutive triggers.
 *
 * No external deps; uses scroll + wheel for parity with Lenis (which moves the
 * scroll position synthetically and still fires `scroll`).
 */
export function useScrollVelocity(
  onTrigger: () => void,
  options: Options = {},
): void {
  const { threshold = 4000, sustain = 200, throttle = 10_000 } = options;

  // Stash the callback in a ref so re-renders do not re-bind listeners.
  const handlerRef = useRef(onTrigger);
  useEffect(() => {
    handlerRef.current = onTrigger;
  }, [onTrigger]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let lastY = window.scrollY;
    let lastT = performance.now();
    // Two independent windows so the slower native-scroll signal cannot
    // reset the wheel-derived window mid-burst (Lenis smooths scrollY so
    // it reports low velocity even when the user is wheeling fast).
    let scrollAboveSince: number | null = null;
    let wheelAboveSince: number | null = null;
    // Initialise to a value that places the first allowed trigger immediately.
    // (If we left this at 0 we would not be able to fire until
    // `performance.now() >= throttle`.)
    let lastTriggerAt = -throttle;

    const trigger = (now: number) => {
      lastTriggerAt = now;
      scrollAboveSince = null;
      wheelAboveSince = null;
      handlerRef.current();
    };

    const onScroll = () => {
      const now = performance.now();
      const y = window.scrollY;
      const dt = now - lastT;
      if (dt <= 0) return;
      const velocity = Math.abs((y - lastY) / dt) * 1000; // px/s
      lastY = y;
      lastT = now;
      if (velocity >= threshold) {
        if (scrollAboveSince === null) scrollAboveSince = now;
        if (
          now - scrollAboveSince >= sustain &&
          now - lastTriggerAt >= throttle
        ) {
          trigger(now);
        }
      } else {
        scrollAboveSince = null;
      }
    };

    // Lenis intercepts native scroll and smooths it, so window.scrollY may
    // lag behind the user's intent. Read wheel deltas directly as a parallel
    // signal — |deltaY| per event * ~60 fps approximates px/s.
    const onWheel = (event: WheelEvent) => {
      const now = performance.now();
      const velocity = Math.abs(event.deltaY) * 60;
      if (velocity >= threshold) {
        if (wheelAboveSince === null) wheelAboveSince = now;
        if (
          now - wheelAboveSince >= sustain &&
          now - lastTriggerAt >= throttle
        ) {
          trigger(now);
        }
      } else {
        // 250 ms quiet window before we accept that the burst is over.
        if (wheelAboveSince !== null && now - wheelAboveSince > 250) {
          wheelAboveSince = null;
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("wheel", onWheel, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", onWheel);
    };
  }, [threshold, sustain, throttle]);
}
