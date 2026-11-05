import type { MetadataRoute } from "next";
import { IS_PREVIEW, SITE_URL } from "../content/seo";

/**
 * Every canonical public page, not just the ones in the header. The poster is a
 * print sheet and is noindex, so it stays out. No modification dates: inventing
 * them at build time tells crawlers nothing true.
 */
const PATHS = [
  "/",
  "/research",
  "/events",
  "/news",
  "/team",
  "/resources",
  "/programs/cs1998",
  "/programs/cs1998/fall-2026",
  "/join",
  "/get-involved",
];

export default function sitemap(): MetadataRoute.Sitemap {
  if (IS_PREVIEW) return [];
  return PATHS.map((path) => ({ url: new URL(path, SITE_URL).toString() }));
}
