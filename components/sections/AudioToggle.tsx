"use client";
// Client component: owns an <audio> element, fade-in/out volume control,
// localStorage persistence and an animated equalizer SVG. None of this can
// run on the server.

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

const STORAGE_KEY = "pd-audio-on";
const AUDIO_SRC = "/audio/maison-ambient.mp3";
const TARGET_VOLUME = 0.35;
const FADE_IN_MS = 4000;
const FADE_OUT_MS = 600;
const FADE_STEPS = 50;

export function AudioToggle() {
  const t = useTranslations("audio");
  const [playing, setPlaying] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<number | null>(null);

  // Lazy-create the Audio element on the client; respect any prior preference.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const audio = new Audio(AUDIO_SRC);
    audio.loop = true;
    audio.volume = 0;
    audio.preload = "none";
    audioRef.current = audio;
    setReducedMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    );
    return () => {
      if (fadeIntervalRef.current !== null) {
        window.clearInterval(fadeIntervalRef.current);
      }
      audio.pause();
      audio.src = "";
      audioRef.current = null;
    };
  }, []);

  const clearFade = () => {
    if (fadeIntervalRef.current !== null) {
      window.clearInterval(fadeIntervalRef.current);
      fadeIntervalRef.current = null;
    }
  };

  const fadeTo = (target: number, durationMs: number, onDone?: () => void) => {
    const audio = audioRef.current;
    if (!audio) return;
    clearFade();
    const stepMs = durationMs / FADE_STEPS;
    const from = audio.volume;
    let step = 0;
    fadeIntervalRef.current = window.setInterval(() => {
      step += 1;
      const t01 = Math.min(1, step / FADE_STEPS);
      audio.volume = Math.max(0, Math.min(1, from + (target - from) * t01));
      if (step >= FADE_STEPS) {
        clearFade();
        onDone?.();
      }
    }, stepMs);
  };

  const handleToggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!playing) {
      // Browsers require user gesture for play().
      const playPromise = audio.play();
      if (playPromise && typeof playPromise.then === "function") {
        playPromise.catch(() => {
          // Autoplay blocked or missing source — keep UI consistent.
          setPlaying(false);
        });
      }
      setPlaying(true);
      window.localStorage.setItem(STORAGE_KEY, "1");
      fadeTo(TARGET_VOLUME, FADE_IN_MS);
    } else {
      setPlaying(false);
      window.localStorage.setItem(STORAGE_KEY, "0");
      fadeTo(0, FADE_OUT_MS, () => {
        audio.pause();
      });
    }
  };

  // Restore preference (and auto-arm intent) on mount. We do NOT auto-play
  // without a gesture; we just reflect the last toggle state visually.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "1") {
      // Don't auto-play (would be blocked); user must re-tap. Show OFF.
      setPlaying(false);
    }
  }, []);

  const labelOn = t("toggle_on");
  const labelOff = t("toggle_off");

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={playing ? labelOff : labelOn}
      aria-pressed={playing}
      data-audio-toggle
      className="fixed bottom-[var(--space-5)] right-[var(--space-5)] z-50 grid aspect-square w-12 place-items-center border border-[var(--ink-400)] bg-[var(--obsidian-100)] text-[var(--gold-200)] transition-colors hover:text-[var(--gold-100)] focus-visible:outline-2 focus-visible:outline-[var(--gold-200)]"
      style={{ borderRadius: "50%" }}
    >
      <EqualizerIcon playing={playing && !reducedMotion} />
    </button>
  );
}

interface EqualizerIconProps {
  playing: boolean;
}

function EqualizerIcon({ playing }: EqualizerIconProps) {
  // Five bars. When PLAYING each animates independently with CSS keyframes.
  // When OFF the heights collapse to a static low silhouette.
  const idle: ReadonlyArray<number> = [5, 7, 4, 7, 5];
  const durations: ReadonlyArray<string> = ["0.6s", "0.9s", "0.7s", "0.5s", "0.8s"];

  return (
    <svg
      width={22}
      height={22}
      viewBox="0 0 22 22"
      aria-hidden
      style={{ display: "block" }}
    >
      <style>{`
        @keyframes pd-eq {
          0%   { height: 4px; y: 9px; }
          100% { height: 18px; y: 2px; }
        }
      `}</style>
      {idle.map((h, i) => {
        const x = 2 + i * 4;
        const dur = durations[i] ?? "0.7s";
        const baseY = (22 - h) / 2;
        return (
          <rect
            key={i}
            x={x}
            y={playing ? 9 : baseY}
            width={2}
            height={playing ? 4 : h}
            rx={1}
            fill="currentColor"
            style={
              playing
                ? {
                    animation: `pd-eq ${dur} ease-in-out infinite alternate`,
                  }
                : undefined
            }
          />
        );
      })}
    </svg>
  );
}
