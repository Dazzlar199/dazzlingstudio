import { StatusBadge } from "@/components/shared/StatusBadge";

const jobs = [
  ["오디션 검수 정리", "사람 승인 대기", "warning"],
  ["오늘의 AX 브리핑", "데모 완료", "positive"],
  ["신인 공개 숏폼", "검수 중", "info"],
] as const;

export function ProductProof() {
  return (
    <section className="proof-section" aria-labelledby="proof-title">
      <div className="proof-copy">
        <p>AX COMMAND CENTER / DEMO</p>
        <h2 id="proof-title">에이전트는 실행하고,<br />사람은 결정합니다.</h2>
        <p>Hermes 연결을 고려한 작업 계약으로 실행 단계와 사용 도구, 결과와 승인 상태를 한 화면에서 추적합니다. 외부 발송과 게시는 반드시 사람 승인에서 멈춥니다.</p>
      </div>
      <div className="command-preview">
        <header><span>ENTER—AX / OPS</span><StatusBadge tone="warning">DEMO</StatusBadge></header>
        <div className="command-metrics">
          <p><span>신규 지원자</span><strong>06</strong></p>
          <p><span>검토 대기</span><strong>03</strong></p>
          <p><span>승인 대기</span><strong>02</strong></p>
        </div>
        <div className="command-jobs">
          {jobs.map(([title, status, tone], index) => (
            <article key={title}><span>0{index + 1}</span><strong>{title}</strong><StatusBadge tone={tone}>{status}</StatusBadge></article>
          ))}
        </div>
      </div>
    </section>
  );
}
