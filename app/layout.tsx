import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import JsonLd from "@/components/shared/JsonLd";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "SHYTECH | Premium Event Management & Media Production",
    template: "%s | SHYTECH",
  },
  description:
    "SHYTECH delivers world-class corporate event management, conferences, summits, professional videography, AI video generation, and media production services. Creating experiences people never forget.",
  keywords: [
    "corporate event management",
    "event production company",
    "media production company",
    "content production",
    "conference management",
    "summit production",
    "corporate video production",
    "brand experience agency",
    "live event production",
    "SHYTECH",
  ],
  authors: [{ name: "SHYTECH" }],
  creator: "SHYTECH",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://shytech.agency",
    siteName: "SHYTECH",
    title: "SHYTECH | Premium Event Management & Media Production",
    description:
      "Creating experiences people never forget. From corporate events and conferences to professional videography and AI content production.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SHYTECH - Premium Event Management & Media Production",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SHYTECH | Premium Event Management & Media Production",
    description:
      "Creating experiences people never forget. From corporate events to professional media production.",
    images: ["/og-image.jpg"],
    creator: "@shytech",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  metadataBase: new URL("https://shytech.agency"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${plusJakarta.variable}`}>
      <body className="min-h-screen bg-white text-[#0f172a] antialiased">
        <JsonLd />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
