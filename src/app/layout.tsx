import type { Metadata, Viewport } from "next";
import { Instrument_Sans, Newsreader, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { siteConfig } from "@/config/site";

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  display: "swap",
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.seo.siteUrl),
  title: {
    default: siteConfig.seo.defaultTitle,
    template: "%s — Aarohan Legal",
  },
  description: siteConfig.seo.defaultDescription,
  applicationName: "Aarohan Legal",
  authors: [{ name: "Aarohan Legal" }],
  keywords: [
    "Indian legal practice",
    "independent advocate",
    "legal information India",
    "commercial law India",
    "dispute resolution India",
    "arbitration India",
  ],
  robots: {
    index: true,
    follow: true,
    noarchive: false,
    nosnippet: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: siteConfig.seo.defaultTitle,
    description: siteConfig.seo.defaultDescription,
    url: siteConfig.seo.siteUrl,
    siteName: "Aarohan Legal",
    type: "website",
    images: [{ url: siteConfig.seo.ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: siteConfig.seo.twitterCard,
    title: siteConfig.seo.defaultTitle,
    description: siteConfig.seo.defaultDescription,
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/icon.svg" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#F1EEE6",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${instrumentSans.variable} ${newsreader.variable} ${ibmPlexMono.variable} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
