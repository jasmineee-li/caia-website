import type { Metadata } from "next";

const FALLBACK_SITE_URL = "https://cornellaia.vercel.app";

function normalizeSiteUrl(value: string) {
  if (!value) {
    return FALLBACK_SITE_URL;
  }

  if (value.startsWith("http://") || value.startsWith("https://")) {
    return value;
  }

  return `https://${value}`;
}

export const SITE_URL = normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL ?? process.env.VERCEL_URL ?? "");

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
  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      url: path,
      siteName: "Cornell AI Alignment",
      type: "website",
      images: [
        {
          url: OG_IMAGE_PATH,
          alt: "Cornell AI Alignment",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE_PATH],
    },
  };
}
