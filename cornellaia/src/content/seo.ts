import type { Metadata } from "next";

const FALLBACK_SITE_URL = "https://www.cornell-aia.org";

function normalizeSiteUrl(value: string) {
  if (!value.trim()) {
    return FALLBACK_SITE_URL;
  }

  try {
    const input = value.trim();
    const url = new URL(/^[a-z][a-z\d+.-]*:/i.test(input) ? input : `https://${input}`);
    if (!["https:", "http:"].includes(url.protocol) || url.username || url.password) return FALLBACK_SITE_URL;
    if (["cornell-aia.org", "www.cornell-aia.org"].includes(url.hostname)) return FALLBACK_SITE_URL;
    return url.origin;
  } catch {
    return FALLBACK_SITE_URL;
  }
}

// Deployment-specific Vercel URLs must never become the site's canonical origin.
export const SITE_URL = normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL ?? "");
export const IS_PREVIEW = process.env.VERCEL_ENV === "preview";

/**
 * Share cards are 1200x630 PNG. PNG rather than WebP on purpose: LinkedIn and
 * several other scrapers will not render WebP and fall back to cropping some
 * other image off the page.
 */
export const OG_IMAGE = {
  path: "/og/og-default.png",
  width: 1200,
  height: 630,
  type: "image/png",
  alt: "Cornell AI Alignment",
} as const;

export function ogImages(path: string = OG_IMAGE.path, alt: string = OG_IMAGE.alt) {
  const url = new URL(path, SITE_URL).toString();
  return {
    openGraph: [{ url, secureUrl: url, width: OG_IMAGE.width, height: OG_IMAGE.height, type: OG_IMAGE.type, alt }],
    twitter: [{ url, width: OG_IMAGE.width, height: OG_IMAGE.height, alt }],
  };
}

interface PageMetadataInput {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  /** A page-specific share card, served from /og. Defaults to the site card. */
  image?: string;
  imageAlt?: string;
  /** Keep the page out of search results and the sitemap. */
  noIndex?: boolean;
}

export function createPageMetadata({
  title,
  description,
  path,
  keywords = [],
  image,
  imageAlt,
  noIndex = false,
}: PageMetadataInput): Metadata {
  const url = new URL(path, SITE_URL).toString();
  const socialTitle = `${title} | Cornell AI Alignment`;
  const images = ogImages(image, imageAlt);
  return {
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
    // Root pages do not inherit the title template from their own layout.
    title: { absolute: socialTitle },
    description,
    keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: socialTitle,
      description,
      url,
      siteName: "Cornell AI Alignment",
      type: "website",
      locale: "en_US",
      images: images.openGraph,
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: images.twitter,
    },
  };
}
