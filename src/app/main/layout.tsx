import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dazzling Studio - 웹 개발 & 음향 엔지니어링 포트폴리오",
  description:
    "음악과 기술이 만나는 특별한 공간. 웹 개발부터 음향 녹음까지, 풀스택 개발자이자 음향 엔지니어의 듀얼 포트폴리오.",
  keywords: [
    "듀얼 포트폴리오",
    "웹 개발",
    "음향 녹음",
    "풀스택 개발자",
    "음향 엔지니어",
    "Next.js",
    "React",
    "믹싱 마스터링",
    "축가 녹음",
    "AI 통합",
    "레코딩 스튜디오",
    "Dazzlar",
  ],
  openGraph: {
    title: "Dazzling Studio - 웹 개발 & 음향 엔지니어링 포트폴리오",
    description: "음악과 기술이 만나는 특별한 공간",
    url: "https://dazzlar.dev/main",
    siteName: "Dazzling Studio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Dazzling Studio - 웹 개발 & 음향 엔지니어링",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dazzling Studio - 웹 개발 & 음향 엔지니어링 포트폴리오",
    description: "음악과 기술이 만나는 특별한 공간",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://dazzlar.dev/main",
  },
};

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
