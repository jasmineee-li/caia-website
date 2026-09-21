import type { MetadataRoute } from "next";
import { IS_PREVIEW, SITE_URL } from "../content/seo";

export default function robots(): MetadataRoute.Robots {
  // Crawlers must be able to read the preview's noindex metadata.
  // Blocking crawling here would prevent them from seeing that directive.
  if (IS_PREVIEW) return { rules: { userAgent: "*", allow: "/" } };
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
