import { StatusBadge } from "@/components/shared/StatusBadge";
import type { AgentJob, AgentJobStatus } from "@/types/domain";

export function AgentJobPanel({ jobs, onTransition }: { jobs: AgentJob[]; onTransition: (id: string, status: AgentJobStatus) => void }) {
  return (
    <section className="agent-jobs">
      <header><div><p>HERMES-READY RUNS</p><h2>에이전트 작업</h2></div><StatusBadge tone="warning">DEMO RUNTIME</StatusBadge></header>
      {jobs.map((job) => (
        <article data-job-id={job.id} key={job.id}>
          <div className="agent-job__main">
            <StatusBadge tone={job.status === "completed" ? "positive" : job.status === "failed" ? "warning" : "info"}>{job.status}</StatusBadge>
            <h3>{job.skill}</h3><p>{job.result}</p>
          </div>
          <dl>
            <div><dt>Tenant</dt><dd>{job.tenantId}</dd></div>
            <div><dt>현재 단계</dt><dd>{job.currentStep}</dd></div>
            <div><dt>사용 도구</dt><dd>{job.tools.join(", ")}</dd></div>
            <div><dt>생성 시각</dt><dd>{job.createdAt.slice(0, 16).replace("T", " ")}</dd></div>
          </dl>
          <div className="agent-job__actions">
            {job.status === "approval-required" ? <><button className="button-solid" onClick={() => onTransition(job.id, "completed")} type="button">승인</button><button className="button-outline" onClick={() => onTransition(job.id, "rejected")} type="button">거절</button></> : null}
            {job.status === "failed" ? <><button className="button-solid" onClick={() => onTransition(job.id, "queued")} type="button">재시도</button><button className="button-outline" onClick={() => onTransition(job.id, "manual")} type="button">수동 처리</button></> : null}
          </div>
        </article>
      ))}
    </section>
  );
}
