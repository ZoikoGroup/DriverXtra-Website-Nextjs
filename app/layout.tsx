import type { Metadata } from "next";
import { Barlow_Condensed, Inter } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SiteLoader from "@/components/layout/SiteLoader";
import RouteProgress from "@/components/layout/RouteProgress";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-barlow-condensed",
  display: "swap",
});

export const metadata: Metadata = {
  title: "DriverXtra — Global Automotive Commerce Infrastructure",
  description:
    "Buy and sell vehicles, find parts, compare finance and insurance, and book automotive services — all in one governed global marketplace.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${barlowCondensed.variable}`}
      // Cleared by SiteLoader once the intro finishes; scroll animations wait for it.
      data-loading="true"
      suppressHydrationWarning
    >
      <body>
        {/* Without JavaScript the loader could never lift, so hide it and show content */}
        <noscript>
          <style>{`.dx-loader{display:none}.reveal{opacity:1;transform:none}`}</style>
        </noscript>
        <SiteLoader />
        <RouteProgress />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
