"use client";

// Client because Radix Slider is interactive (drag, focus, keyboard).
import * as Slider from "@radix-ui/react-slider";
import { cn } from "@/lib/cn";

export function RangeSlider({
  min,
  max,
  step = 10,
  value,
  onChange,
  formatValue,
  ariaLabelMin,
  ariaLabelMax,
}: {
  min: number;
  max: number;
  step?: number;
  value: [number, number];
  onChange: (next: [number, number]) => void;
  formatValue: (n: number) => string;
  ariaLabelMin: string;
  ariaLabelMax: string;
}): React.JSX.Element {
  return (
    <div className="flex flex-col gap-[var(--space-3)]">
      <Slider.Root
        className={cn(
          "relative flex h-6 w-full touch-none items-center select-none",
        )}
        min={min}
        max={max}
        step={step}
        value={[value[0], value[1]]}
        onValueChange={(next) => {
          const [a, b] = next;
          if (typeof a === "number" && typeof b === "number") {
            onChange([a, b]);
          }
        }}
        minStepsBetweenThumbs={1}
      >
        <Slider.Track className="relative h-px w-full grow bg-[var(--ink-500)]">
          <Slider.Range className="absolute h-px bg-[var(--gold-200)]" />
        </Slider.Track>
        <Slider.Thumb
          aria-label={ariaLabelMin}
          className="block h-3 w-3 rounded-full border border-[var(--gold-100)] bg-[var(--gold-200)] outline-none transition-transform duration-[var(--duration-quick)] ease-[var(--ease-soft-expo)] hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--gold-100)]"
        />
        <Slider.Thumb
          aria-label={ariaLabelMax}
          className="block h-3 w-3 rounded-full border border-[var(--gold-100)] bg-[var(--gold-200)] outline-none transition-transform duration-[var(--duration-quick)] ease-[var(--ease-soft-expo)] hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--gold-100)]"
        />
      </Slider.Root>
      <div className="flex items-center justify-between font-mono text-[var(--text-xs)] tabular-nums text-[var(--ink-300)]">
        <span>{formatValue(value[0])}</span>
        <span>{formatValue(value[1])}</span>
      </div>
    </div>
  );
}
