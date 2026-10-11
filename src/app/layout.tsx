import type { Metadata, Viewport } from "next";

import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://dazzlar.dev";
const title = "Dazzlar (AI특별시) | Enter-AX, operations software built on Claude";
const description =
  "Dazzlar (AI특별시) is a one-person software company in Korea, founded in October 2026. It builds Enter-AX: one record per person for K-pop agencies, from audition intake to trainee evaluations and the youth-protection log, with Claude organising the record and people making the decisions.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  applicationName: "Dazzlar",
  keywords: ["Enter-AX", "K-pop", "entertainment agency", "audition", "trainee management", "youth protection", "Claude", "엔터테인먼트", "오디션", "연습생", "청소년보호책임자"],
  authors: [{ name: "Dazzlar" }],
  alternates: { canonical: "/", languages: { en: "/", ko: "/?lang=ko" } },
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: "Dazzlar",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Dazzlar" }],
    type: "website",
  },
  twitter: { card: "summary_large_image", title, description, images: ["/og-image.png"] },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#eef0f4" };

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Dazzlar",
  legalName: "AI특별시",
  alternateName: "AI특별시",
  foundingDate: "2026-10-06",
  url: siteUrl,
  logo: `${siteUrl}/logo.png`,
  description,
  address: { "@type": "PostalAddress", addressCountry: "KR" },
  founder: { "@type": "Person", name: "김찬주", alternateName: "Chan Joo Kim" },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    telephone: "+82-10-2068-9295",
    email: "chanjoo@dazzlar.dev",
    availableLanguage: ["Korean", "English"],
  },
};

const product = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Enter-AX",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description: "Operations platform for K-pop entertainment agencies: audition intake, review pipeline, trainee records and a youth-protection log.",
  creator: { "@type": "Organization", name: "Dazzlar" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        {/* Fonts load at runtime so a build never depends on reaching a font server. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,700&family=JetBrains+Mono:wght@400;500&display=swap"
        />
        <link
          rel="stylesheet"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([organization, product]) }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
