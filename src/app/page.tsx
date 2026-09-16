import Link from "next/link";

import { AxFlow } from "@/components/marketing/AxFlow";
import { Hero } from "@/components/marketing/Hero";
import { ProductProof } from "@/components/marketing/ProductProof";
import { AppShell } from "@/components/shared/AppShell";

export default function Home() {
  return (
    <AppShell mode="public">
      <main>
        <Hero />
        <section className="audience-split" aria-label="서비스 진입 선택">
          <article>
            <p>FOR TALENT</p><h2>나를 보여주는 방식도<br />내가 정합니다.</h2>
            <ul><li>얼굴 사진 정면·좌·우 독립 등록</li><li>보컬·댄스 파일 또는 YouTube</li><li>기본값은 검증된 엔터사 전용</li></ul>
            <Link href="/talent/onboarding">지원자 데모 시작 →</Link>
          </article>
          <article>
            <p>FOR AGENCY</p><h2>검수 다음의 업무까지<br />한 흐름에서 봅니다.</h2>
            <ul><li>조건별 인재 탐색과 자료 검수</li><li>컨택 제안과 후보 파이프라인</li><li>Hermes-ready AX 작업 관제</li></ul>
            <Link href="/agency/discover">엔터사 데모 시작 →</Link>
          </article>
        </section>
        <AxFlow />
        <ProductProof />
        <section className="principles-section" aria-labelledby="principles-title">
          <div><p>OPERATING PRINCIPLES</p><h2 id="principles-title">사람을 평가하는 자동화가 아니라,<br />사람의 일을 돕는 AX.</h2></div>
          <ul>
            <li><strong>01</strong><span>지원자 기본 공개 범위는 검증된 엔터사 전용</span></li>
            <li><strong>02</strong><span>YouTube는 재생 전용, 다운로드·분리 분석 없음</span></li>
            <li><strong>03</strong><span>자동 합격·탈락과 외모 점수화 없음</span></li>
            <li><strong>04</strong><span>외부 발송·게시·상태 변경 전 사람 승인</span></li>
          </ul>
        </section>
        <section className="final-cta">
          <p>NEXT MOVE</p><h2>지원과 운영 사이의<br />끊어진 흐름을 연결하세요.</h2>
          <div className="landing-actions">
            <Link className="button-solid button-large" href="/talent/onboarding">오디션 프로필 등록</Link>
            <Link className="button-outline button-large" href="/agency/discover">엔터사 AX 데모</Link>
          </div>
        </section>
      </main>
    </AppShell>
  );
}
