// Catch-all that forces the locale layout to wrap our cinematic 404
// (per next-intl recommendation for `localePrefix: "as-needed"`).
import { notFound } from "next/navigation";

export default function CatchAllPage(): never {
  notFound();
}
