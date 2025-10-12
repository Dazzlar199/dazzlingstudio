import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "음향 엔지니어링 포트폴리오 | Dazzling Studio - Recording & Music Studio",
  description:
    "전문 음향 녹음, 믹싱, 마스터링 서비스. 축가 녹음, AI 음악 제작, 커버 녹음 전문 스튜디오.",
  keywords: [
    "음향 녹음",
    "축가 녹음",
    "믹싱 마스터링",
    "녹음 스튜디오",
    "음향 엔지니어",
    "레코딩 스튜디오",
    "보컬 녹음",
    "AI 음악 제작",
    "커버 녹음",
    "음악 프로듀싱",
    "사운드 디자인",
    "오디오 믹싱",
    "마스터링",
    "Dazzlar",
  ],
  openGraph: {
    title: "음향 엔지니어링 포트폴리오 | Dazzling Studio - Recording & Music Studio",
    description: "전문 음향 녹음, 믹싱, 마스터링 서비스. 축가 녹음, AI 음악 제작 전문",
    url: "https://dazzlingstudio.vercel.app/music",
    siteName: "Dazzling Studio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Dazzling Studio - 음향 엔지니어링 포트폴리오",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "음향 엔지니어링 포트폴리오 | Dazzling Studio - Recording & Music Studio",
    description: "전문 음향 녹음, 믹싱, 마스터링 서비스. 축가 녹음, AI 음악 제작 전문",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://dazzlingstudio.vercel.app/music",
  },
};

export default function MusicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
