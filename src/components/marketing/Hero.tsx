import Link from "next/link";

import { StatusBadge } from "@/components/shared/StatusBadge";

export function Hero() {
  return (
    <section className="landing-hero">
      <div className="landing-hero__copy">
        <StatusBadge tone="info">ENTERTAINMENT AX NETWORK</StatusBadge>
        <h1>인재 발견부터<br />콘텐츠 실행까지,<br /><em>하나의 AX 흐름으로.</em></h1>
        <p>지원자의 오디션 프로필, 엔터사의 검수와 컨택, 후보 관리와 홍보 콘텐츠 준비를 끊기지 않는 운영 흐름으로 연결합니다.</p>
        <div className="landing-actions">
          <Link className="button-solid button-large" href="/talent/onboarding">오디션 프로필 등록</Link>
          <Link className="button-outline button-large" href="/agency/discover">엔터사 AX 데모</Link>
        </div>
      </div>
      <div className="hero-signal" aria-label="Enter-AX 연결 구조 미리보기">
        <p className="hero-signal__index">01—07</p>
        <div className="hero-signal__axis" aria-hidden="true">
          <span>TALENT</span><i /><span>CONTACT</span><i /><span>AX</span>
        </div>
        <div className="hero-signal__metric"><strong>HUMAN</strong><span>DECISION REQUIRED</span></div>
      </div>
    </section>
  );
}
