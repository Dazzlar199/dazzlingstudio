import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "웹 개발 포트폴리오 | Dazzlar - Full Stack Developer",
  description:
    "React, Next.js, TypeScript를 활용한 풀스택 웹 개발 포트폴리오. AI 통합, 반응형 웹사이트, 모바일 앱 개발 전문.",
  keywords: [
    "웹 개발",
    "풀스택 개발",
    "Next.js 개발자",
    "React 개발자",
    "TypeScript",
    "프론트엔드 개발",
    "백엔드 개발",
    "AI 통합",
    "반응형 웹",
    "모바일 앱 개발",
    "웹 포트폴리오",
    "개발자 포트폴리오",
    "Dazzlar",
  ],
  openGraph: {
    title: "웹 개발 포트폴리오 | Dazzlar - Full Stack Developer",
    description: "React, Next.js, TypeScript를 활용한 풀스택 웹 개발 포트폴리오",
    url: "https://dazzlingstudio.vercel.app/dev",
    siteName: "Dazzlar Studio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Dazzlar - 웹 개발 포트폴리오",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "웹 개발 포트폴리오 | Dazzlar - Full Stack Developer",
    description: "React, Next.js, TypeScript를 활용한 풀스택 웹 개발 포트폴리오",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://dazzlingstudio.vercel.app/dev",
  },
};

export default function DevLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
