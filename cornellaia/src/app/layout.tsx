import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { SITE_URL } from "@/content/seo";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Cornell AI Alignment",
    template: "%s | Cornell AI Alignment",
  },
  description:
    "Cornell AI Alignment is a student community conducting research and outreach to advance safe AI.",
  applicationName: "Cornell AI Alignment",
  openGraph: {
    siteName: "Cornell AI Alignment",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="app-shell page-grid">
        <Header />
        <ScrollToTop />
        {children}
        <Footer />
      </body>
    </html>
  );
}
