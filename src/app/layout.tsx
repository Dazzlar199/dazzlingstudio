import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, JetBrains_Mono } from "next/font/google";

import "./globals.css";

const display = Bricolage_Grotesque({ variable: "--font-display", subsets: ["latin"], display: "swap", weight: ["600", "700"] });
const mono = JetBrains_Mono({ variable: "--font-mono", subsets: ["latin"], display: "swap", weight: ["400", "500"] });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://dazzlar.dev";
const title = "Dazzling Studio | Enter-AX, the operations platform for K-pop agencies";
const description =
  "Dazzling Studio builds Enter-AX: one record per person for K-pop agencies, from audition intake to trainee evaluations and the youth-protection log, with Claude organising the record and people making the decisions.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  applicationName: "Dazzling Studio",
  keywords: ["Enter-AX", "K-pop", "entertainment agency", "audition", "trainee management", "youth protection", "Claude", "엔터테인먼트", "오디션", "연습생", "청소년보호책임자"],
  authors: [{ name: "Dazzling Studio" }],
  alternates: { canonical: "/", languages: { en: "/", ko: "/?lang=ko" } },
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: "Dazzling Studio",
    images: [{ url: "/og-image.png", width: 1024, height: 1024, alt: "Dazzling Studio" }],
    type: "website",
  },
  twitter: { card: "summary", title, description, images: ["/og-image.png"] },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#eef0f4" };

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Dazzling Studio",
  url: siteUrl,
  logo: `${siteUrl}/web_image/share_logo.png`,
  description,
  address: { "@type": "PostalAddress", addressCountry: "KR" },
};

const product = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Enter-AX",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description: "Operations platform for K-pop entertainment agencies: audition intake, review pipeline, trainee records and a youth-protection log.",
  creator: { "@type": "Organization", name: "Dazzling Studio" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link
          rel="stylesheet"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([organization, product]) }} />
      </head>
      <body className={`${display.variable} ${mono.variable}`}>{children}</body>
    </html>
  );
}
