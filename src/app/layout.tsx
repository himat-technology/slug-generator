import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { siteConfig } from "@/lib/config";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const title = `${siteConfig.toolName} | ${siteConfig.siteName}`;
const description = siteConfig.longDescription;
const canonical = siteConfig.siteUrl;

export const metadata: Metadata = {
  metadataBase: new URL(canonical),
  title,
  description,
  applicationName: siteConfig.toolName,
  authors: [{ name: siteConfig.siteName }],
  keywords: [
    "SEO slug generator",
    "URL cleaner",
    "URL slug",
    "batch slug generator",
    "accent stripping",
    "stop words",
    "browser local",
    "privacy first",
  ],
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
  manifest: "/manifest.webmanifest",
  alternates: {
    canonical,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: canonical,
    siteName: siteConfig.siteName,
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
