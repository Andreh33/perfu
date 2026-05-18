"use client";
// Wordmark — splits the string into letters wrapped in spans so each
// letter can lift on hover (translateY -8px, color shift to champagne).
// Used in the Hero. Pure CSS hover, no JS state.

interface Props {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  ariaLabel?: string;
}

export function HeroWordmark({ text, className = "", style, ariaLabel }: Props) {
  const letters = Array.from(text);
  return (
    <span
      aria-label={ariaLabel ?? text}
      role="text"
      className={`hero-wordmark inline-block ${className}`}
      style={style}
    >
      {letters.map((ch, i) => (
        <span
          key={i}
          aria-hidden
          className="hero-letter inline-block"
          style={{ transitionDelay: `${i * 20}ms` }}
        >
          {ch === " " ? " " : ch}
        </span>
      ))}
    </span>
  );
}
