import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300"], // Light weight
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={inter.className}>
        {/* Notification Bar */}
        {/* <div className="bg-cornell-red text-white text-center py-2">
          <span>
            Applications are now open for the Intro to AI Safety Fellowship!{" "}
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSfa6OQUipQmUAjODi1I2ygYAeCk1sp112mjUGRtI3MnUdFIgw/viewform?fbzx=-2352693528615737036"
              className="underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Apply here
            </a>{" "}
            by Sunday, February 9, 11:59pm EST.
          </span>
        </div> */}

        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
