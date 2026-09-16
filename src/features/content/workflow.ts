import type { ContentAction, ContentStep } from "@/types/domain";

const transitions: Partial<Record<ContentStep, Partial<Record<ContentAction, ContentStep>>>> = {
  source: { continue: "brief" }, brief: { continue: "generating" }, generating: { continue: "review" },
  review: { approve: "approval", "request-changes": "brief", reject: "brief" }, approval: { schedule: "scheduled", reject: "review" },
};

export function nextContentStep(current: ContentStep, action: ContentAction): ContentStep {
  const next = transitions[current]?.[action];
  if (!next) throw new Error("허용되지 않은 콘텐츠 단계 전환");
  return next;
}
