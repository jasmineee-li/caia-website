import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Cornell AI Alignment",
  description:
    "Cornell AI Alignment is a student community conducting research and outreach to advance safe AI.",
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
        {children}
        <Footer />
      </body>
    </html>
  );
}
