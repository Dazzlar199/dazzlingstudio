import type { Metadata, Viewport } from "next";

import { DemoProvider } from "@/features/demo/DemoProvider";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://dazzlingstudio-d423acmci-dazzlars-projects.vercel.app"),
  title: {
    default: "Enter-AX | 엔터테인먼트 AX 운영 플랫폼",
    template: "%s | Enter-AX",
  },
  description: "지원자 등록부터 엔터사의 검수·컨택·사내 AX·홍보 콘텐츠 준비까지 연결하는 인터랙티브 데모입니다.",
  applicationName: "Enter-AX",
  keywords: ["엔터테인먼트 AX", "오디션", "인재 검수", "업무 자동화", "홍보 콘텐츠"],
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0b0d0f",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>
        <DemoProvider>{children}</DemoProvider>
      </body>
    </html>
  );
}
