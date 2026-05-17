"use client";
// Client component: pins the section while GSAP translates a horizontal
// strip of editorial images using ScrollTrigger. Needs the DOM and a
// resize listener to recompute strip width — pure layout work, so it must
// run after hydration.

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/cn";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface HorizontalGalleryProps {
  images: ReadonlyArray<string>;
  productName: string;
}

export function HorizontalGallery({
  images,
  productName,
}: HorizontalGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("product.sections");

  useEffect(() => {
    const container = containerRef.current;
    const strip = stripRef.current;
    if (!container || !strip) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      const totalShift = () => strip.scrollWidth - window.innerWidth;
      gsap.to(strip, {
        x: () => -Math.max(0, totalShift()) + "px",
        ease: "none",
        scrollTrigger: {
          trigger: container,
          pin: true,
          scrub: 1,
          end: () => "+=" + Math.max(0, totalShift()),
          invalidateOnRefresh: true,
        },
      });
    }, container);

    return () => ctx.revert();
  }, []);

  if (images.length === 0) return null;

  return (
    <section className="relative bg-[var(--obsidian-300)]">
      <div
        ref={containerRef}
        className="relative h-screen w-full overflow-hidden"
        data-product-gallery
      >
        <div
          ref={stripRef}
          className={cn(
            "absolute inset-y-0 left-0 flex h-full gap-[var(--space-6)]",
            "px-[var(--space-7)] motion-reduce:flex-col motion-reduce:gap-[var(--space-7)] motion-reduce:overflow-y-auto motion-reduce:px-0",
          )}
        >
          {images.map((src, i) => (
            <figure
              key={src}
              className={cn(
                "relative h-full shrink-0 overflow-hidden",
                "w-[70vw] sm:w-[60vw] lg:w-[45vw]",
              )}
            >
              <Image
                src={src}
                alt={`${productName} · editorial ${i + 1}`}
                fill
                sizes="60vw"
                className="object-cover"
                priority={i === 0}
              />
              <figcaption className="absolute bottom-[var(--space-5)] left-[var(--space-5)] z-10">
                <span className="small-caps inline-block bg-[var(--obsidian-400)]/70 px-[var(--space-3)] py-1 text-[var(--text-xs)] tracking-[0.16em] text-[var(--gold-200)] backdrop-blur-sm">
                  {t("gallery_caption", { n: String(i + 1).padStart(2, "0") })}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HorizontalGallery;
