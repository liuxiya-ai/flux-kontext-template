import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
    default: "AIRender: AI建筑与室内设计渲染平台",
    template: "%s | AIRender"
  },
  description: "AIRender是领先的AI建筑和室内设计渲染平台。瞬间将草图转换为逼真的渲染图，发现设计灵感，轻松进行渲染后修改。",
  keywords: [
    "ai render",
    "ai渲染", 
    "建筑渲染",
    "ai建筑",
    "室内设计ai",
    "建筑可视化",
    "草图转渲染",
    "景观设计ai",
    "建筑师ai",
    "住宅设计", 
    "商业建筑", 
    "景观建筑", 
    "建筑改造"
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
    <html className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

