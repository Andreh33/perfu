import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Skip API routes, internals, Vercel assets, and any path containing a dot
  // (favicons, sitemap.xml, images, etc.) so static files bypass i18n.
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
