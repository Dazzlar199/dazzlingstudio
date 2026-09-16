"use client";

import { CandidateBoard } from "@/components/agency/CandidateBoard";
import { useDemo } from "@/features/demo/DemoProvider";

export default function PipelinePage() {
  const { state, moveCandidate } = useDemo();
  return <main className="pipeline-page"><header><p>AGENCY / PIPELINE</p><h1>후보자 운영 파이프라인</h1><p>단계 변경과 최근 활동이 브라우저 데모 상태에 기록됩니다. 자동 합격·탈락은 없습니다.</p></header><CandidateBoard candidates={state.candidates} talents={state.talents} onMove={moveCandidate} /></main>;
}
