import type { Metadata } from "next";
import {
  Inter,
  JetBrains_Mono,
  Orbitron,
  Poppins,
  Nunito_Sans,
  Space_Grotesk,
} from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700", "900"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Dazzlar - Dazzling Music & AI CONTENTS STUDIO",
  description:
    "음악과 기술이 만나는 특별한 공간. 전문 음향 녹음 스튜디오와 웹 개발 서비스를 제공합니다.",
  keywords: [
    "음향 녹음",
    "축가 녹음",
    "믹싱 마스터링",
    "웹 개발",
    "풀스택 개발",
    "Next.js",
    "React",
    "스튜디오",
    "Dazzlar",
  ],
  authors: [{ name: "Dazzlar Studio" }],
  creator: "Dazzlar",
  publisher: "Dazzlar Studio",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Dazzlar - Dazzling Music & AI CONTENTS STUDIO",
    description: "음악과 기술이 만나는 특별한 공간",
    url: "https://dazzlar.studio",
    siteName: "Dazzlar Studio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Dazzlar Studio - 음악과 기술의 만남",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dazzlar - Dazzling Music & AI CONTENTS STUDIO",
    description: "음악과 기술이 만나는 특별한 공간",
    images: ["/og-image.jpg"],
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#8B5CF6" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
      </head>
      <body
        className={`${inter.variable} ${jetBrainsMono.variable} ${orbitron.variable} ${poppins.variable} ${nunitoSans.variable} ${spaceGrotesk.variable} antialiased min-h-screen`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
