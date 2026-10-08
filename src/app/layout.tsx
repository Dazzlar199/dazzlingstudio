import type { Metadata, Viewport } from "next";

import "./globals.css";

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
  alternateName: "AI특별시",
  url: siteUrl,
  logo: `${siteUrl}/web_image/share_logo.png`,
  description,
  address: { "@type": "PostalAddress", addressCountry: "KR" },
  founder: { "@type": "Person", name: "김찬주", alternateName: "Chan Joo Kim" },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    telephone: "+82-10-2068-9295",
    email: "rlackswn2000@gmail.com",
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
  creator: { "@type": "Organization", name: "Dazzling Studio" },
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
