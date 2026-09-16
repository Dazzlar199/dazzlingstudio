"use client";

import { AgentJobPanel } from "@/components/agency/AgentJobPanel";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { useDemo } from "@/features/demo/DemoProvider";

const automations = ["오디션 검수와 담당자 배정", "결재·승인 요청", "일정과 마감 알림", "회의·업무 메모 요약", "보도자료 초안", "A&R 데모곡 인박스 요약", "지연 업무와 누락 경고"];

export default function AxPage() {
  const { state, transitionAgentJob } = useDemo();
  const metrics = [["신규 지원자", state.talents.length], ["검토 대기 영상", 3], ["응답 대기 컨택", state.offers.filter((item) => item.status === "sent").length], ["오늘 마감", 2], ["승인 대기 콘텐츠", 1], ["예약 배포", 0], ["위험·지연", 1]];
  return <main className="ax-page"><header><p>AGENCY / AX COMMAND CENTER</p><h1>회사를 움직이는<br />작업 관제실.</h1><StatusBadge tone="warning">모든 결과는 데모</StatusBadge></header><section className="ax-metrics">{metrics.map(([label, value]) => <article key={label}><span>{label}</span><strong>{value}</strong></article>)}</section><section className="daily-brief"><div><StatusBadge tone="info">DEMO AGENT</StatusBadge><h2>오늘의 AX 브리핑</h2></div><p>신규 지원자 6명 중 원본 파일이 준비된 4명을 먼저 검토할 수 있습니다. 승인 대기 콘텐츠 1건과 응답 기한이 가까운 제안 1건을 확인하세요.</p></section><section className="automation-grid">{automations.map((title, index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><StatusBadge tone={index < 3 ? "info" : "neutral"}>{index < 3 ? "데모" : "API 연동 예정"}</StatusBadge></article>)}</section><AgentJobPanel jobs={state.agentJobs} onTransition={transitionAgentJob} /></main>;
}
