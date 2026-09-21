import type { MetadataRoute } from "next";
import { NAV_ITEMS } from "../content/navigation";
import { IS_PREVIEW, SITE_URL } from "../content/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  if (IS_PREVIEW) return [];
  // Include canonical public pages only. Do not invent modification dates at build time.
  return NAV_ITEMS.map(({ href }) => ({ url: new URL(href, SITE_URL).toString() }));
}
