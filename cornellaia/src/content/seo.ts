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

const OG_IMAGE_PATH = "/Title5.webp";

interface PageMetadataInput {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
}

export function createPageMetadata({
  title,
  description,
  path,
  keywords = [],
}: PageMetadataInput): Metadata {
  const url = new URL(path, SITE_URL).toString();
  const socialTitle = `${title} | Cornell AI Alignment`;
  return {
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
      images: [
        {
          url: new URL(OG_IMAGE_PATH, SITE_URL).toString(),
          width: 2560,
          height: 1440,
          type: "image/webp",
          alt: "Cornell AI Alignment",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [{ url: new URL(OG_IMAGE_PATH, SITE_URL).toString(), alt: "Cornell AI Alignment" }],
    },
  };
}
