import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientBody from "./ClientBody";
import { Analytics } from "@/components/Analytics";
import SessionProvider from "@/components/providers/SessionProvider";
import { GoogleOneTap } from "@/components/GoogleOneTap";
import { GoogleOneTapTrigger } from "@/components/GoogleOneTapTrigger";
import { StructuredData } from "@/components/StructuredData";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "AIRender: The AI Architecture & Interior Design Render Platform",
    template: "%s | AIRender"
  },
  description: "AIRender is the leading AI platform for architectural and interior design renders. Instantly transform sketches to realistic renderings, find design inspiration, and effortlessly perform post-render modifications.",
  keywords: [
    "ai render",
    "architectural rendering",
    "ai architecture",
    "interior design ai",
    "architectural visualization",
    "sketch to render",
    "landscape design ai",
    "ai for architects",
    "Residential Design", 
    "Commercial Buildings", 
    "Landscape Architecture", 
    "Architectural Renovation"
  ],
  authors: [{ name: "AIRender Team" }],
  creator: "AIRender",
  publisher: "AIRender",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://fluxkontext.space'),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <StructuredData />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SessionProvider>
          <ClientBody>
            {children}
          </ClientBody>
          <GoogleOneTap />
          <GoogleOneTapTrigger />
          <Analytics />
        </SessionProvider>
      </body>
    </html>
  );
}

