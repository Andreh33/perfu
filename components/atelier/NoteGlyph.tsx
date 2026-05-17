import { getNoteIconPath } from "@/lib/notes";

/**
 * Inline SVG glyph for an olfactive note. Server-rendered; uses
 * currentColor so the caller decides the stroke colour via Tailwind.
 */
export function NoteGlyph({
  name,
  size = 22,
  className,
}: {
  name: string;
  size?: number;
  className?: string;
}): React.JSX.Element {
  const paths = getNoteIconPath(name);
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {paths.map((d, i) => (
        <path key={i} d={d} />
      ))}
    </svg>
  );
}
