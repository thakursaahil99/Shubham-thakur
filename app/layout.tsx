import type { Metadata } from "next";
import { Inter, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Background from "@/components/Background";
import Preloader from "@/components/Preloader";
import BackToTop from "@/components/BackToTop";
import Cursor from "@/components/Cursor";
import MotionProvider from "@/components/MotionProvider";
import { siteUrl } from "@/lib/data";

const sans = Inter({ subsets: ["latin"], variable: "--font-sans" });
const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
});
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Shubham Thakur — WordPress Backend Developer",
    template: "%s · Shubham Thakur",
  },
  description:
    "Portfolio of Shubham Thakur — 5+ years of custom WordPress plugins, WooCommerce, hacked-site recovery and speed optimization.",
  keywords: [
    "WordPress developer",
    "PHP developer",
    "WooCommerce",
    "hacked website recovery",
    "malware removal",
    "speed optimization",
    "Upwork freelancer",
    "Shubham Thakur",
  ],
  openGraph: {
    type: "website",
    title: "Shubham Thakur — WordPress Backend Developer",
    description: "Custom WordPress plugins, WooCommerce, hacked-site recovery & speed optimization.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable} ${mono.variable}`}>
      <body className="min-h-screen font-sans">
        <MotionProvider>
          <Preloader />
          <Background />
          <Cursor />
          <BackToTop />
          <Navbar />
          <main className="relative">{children}</main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
