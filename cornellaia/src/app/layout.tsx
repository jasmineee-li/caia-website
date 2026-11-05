import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { IS_PREVIEW, ogImages, SITE_URL } from "@/content/seo";
import JsonLd from "@/components/JsonLd";
import { SITE_SCHEMA } from "@/content/site-schema";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Cornell AI Alignment",
    template: "%s | Cornell AI Alignment",
  },
  description:
    "Cornell AI Alignment brings students, faculty, and researchers together to help AI align with human intentions and benefit all of humanity.",
  applicationName: "Cornell AI Alignment",
  robots: IS_PREVIEW ? { index: false, follow: false } : {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  openGraph: {
    siteName: "Cornell AI Alignment",
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    title: "Cornell AI Alignment",
    images: ogImages().openGraph,
  },
  twitter: {
    card: "summary_large_image",
    title: "Cornell AI Alignment",
    images: ogImages().twitter,
  },
  alternates: { canonical: SITE_URL },
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/og/icon-512.png", type: "image/png", sizes: "512x512" }],
    apple: [{ url: "/og/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="app-shell page-grid">
        <JsonLd data={SITE_SCHEMA} />
        <Header />
        <ScrollToTop />
        {children}
        <Footer />
      </body>
    </html>
  );
}
