import type { Candidate, PipelineStage, TalentProfile } from "@/types/domain";

const stages: Array<{ id: PipelineStage; label: string }> = [
  { id: "discovered", label: "신규 발견" }, { id: "saved", label: "관심 저장" }, { id: "internal-review", label: "내부 검토" },
  { id: "offer-sent", label: "제안 발송" }, { id: "accepted", label: "지원자 수락" }, { id: "follow-up", label: "미팅·추가 오디션" },
  { id: "final-review", label: "최종 검토" }, { id: "completed", label: "완료" }, { id: "on-hold", label: "보류" },
];

export function CandidateBoard({ candidates, talents, onMove }: { candidates: Candidate[]; talents: TalentProfile[]; onMove: (candidateId: string, stage: PipelineStage) => void }) {
  return <div className="candidate-board">{stages.map((stage) => <section className="pipeline-column" key={stage.id}><header><h2>{stage.label}</h2><span>{candidates.filter((item) => item.stage === stage.id).length}</span></header>{candidates.filter((item) => item.stage === stage.id).map((candidate) => { const talent = talents.find((item) => item.id === candidate.talentId); return <article className="candidate-card" key={candidate.id}><strong>{talent?.stageName ?? "알 수 없음"}</strong><p>{talent?.fields.join(" · ")}</p><dl><div><dt>담당자</dt><dd>{candidate.owner}</dd></div><div><dt>다음 행동</dt><dd>{candidate.nextAction}</dd></div><div><dt>자료</dt><dd>{talent?.media.some((media) => media.source === "file") ? "원본 준비" : "재생 전용"}</dd></div></dl><p>최근 활동 · {candidate.activity.at(-1)?.label}</p><label>{candidate.id} 단계 이동<select aria-label={`${candidate.id} 단계 이동`} value={candidate.stage} onChange={(e) => onMove(candidate.id, e.target.value as PipelineStage)}>{stages.map((option) => <option key={option.id} value={option.id}>{option.label}</option>)}</select></label></article>; })}</section>)}</div>;
}
