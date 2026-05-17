import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

/**
 * Typed navigation helpers bound to the app routing config.
 * Use these in place of `next/link` / `next/navigation` so locale
 * prefixes stay consistent.
 */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
