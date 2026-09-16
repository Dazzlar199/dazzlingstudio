import type { AgentJobStatus, AgentSkill } from "@/types/domain";

export interface AgentRunRequest { tenantId: string; skill: AgentSkill; input: Record<string, unknown>; requiresApproval: boolean; }
export interface AgentRunResult { runId: string; status: AgentJobStatus; steps: Array<{ label: string; tool: string; status: "waiting" | "running" | "done" | "failed" }>; output: Record<string, unknown>; }
export interface AgentRunner { run(request: AgentRunRequest): Promise<AgentRunResult>; }

const labels: Record<AgentSkill, string[]> = {
  "audition-triage": ["새 지원 자료 확인", "담당자용 요약 준비", "사람 검토 대기"],
  "daily-briefing": ["운영 현황 읽기", "지연 항목 분류", "브리핑 작성"],
  "content-prep": ["콘텐츠 입력 확인", "채널별 초안 준비", "승인 대기"],
};

export class DemoAgentRunner implements AgentRunner {
  constructor(private readonly createId: () => string = () => `demo-${Date.now()}`) {}
  async run(request: AgentRunRequest): Promise<AgentRunResult> {
    const skillLabels = labels[request.skill] ?? [];
    return {
      runId: this.createId(), status: request.requiresApproval ? "approval-required" : "completed",
      steps: skillLabels.map((label, index) => ({ label, tool: `${request.skill}.${index + 1}.demo`, status: "done" as const })),
      output: { environment: "demo", tenantId: request.tenantId, disclosure: "API 연동 예정" },
    };
  }
}
