import type {
  AgentJob,
  Candidate,
  DemoState,
  TalentField,
  TalentProfile,
} from "@/types/domain";

const BASE_TIME = "2026-09-16T09:00:00.000Z";

const talentBlueprints: Array<{
  id: string;
  stageName: string;
  birthDate: string;
  region: string;
  fields: TalentField[];
  bio: string;
  vocalSource: "file" | "youtube";
  danceSource: "file" | "youtube";
  visibility: "verified-agencies" | "public";
}> = [
  { id: "talent-lua", stageName: "루아", birthDate: "2004-03-14", region: "서울", fields: ["idol", "vocal"], bio: "서사를 목소리와 움직임으로 전하는 올라운더입니다.", vocalSource: "file", danceSource: "youtube", visibility: "verified-agencies" },
  { id: "talent-min", stageName: "민", birthDate: "2001-08-21", region: "부산", fields: ["dance", "idol"], bio: "선명한 리듬과 팀워크를 중시하는 퍼포머입니다.", vocalSource: "youtube", danceSource: "file", visibility: "public" },
  { id: "talent-hae", stageName: "해온", birthDate: "1998-11-02", region: "서울", fields: ["actor"], bio: "작은 감정의 변화까지 화면에 남기는 배우입니다.", vocalSource: "file", danceSource: "youtube", visibility: "verified-agencies" },
  { id: "talent-sol", stageName: "솔", birthDate: "2003-06-18", region: "인천", fields: ["vocal"], bio: "낮은 음역의 질감과 안정적인 라이브가 강점입니다.", vocalSource: "file", danceSource: "file", visibility: "verified-agencies" },
  { id: "talent-ian", stageName: "이안", birthDate: "2000-01-27", region: "대전", fields: ["model", "actor"], bio: "룩의 의도를 빠르게 해석하는 모델이자 배우입니다.", vocalSource: "youtube", danceSource: "youtube", visibility: "public" },
  { id: "talent-yun", stageName: "윤슬", birthDate: "2005-09-09", region: "광주", fields: ["dance"], bio: "장르의 경계를 넘나드는 즉흥성과 집중력이 강점입니다.", vocalSource: "youtube", danceSource: "file", visibility: "verified-agencies" },
];

const talents: TalentProfile[] = talentBlueprints.map((talent, index) => {
  const front = `/demo/${talent.id}-front.svg`;
  const left = `/demo/${talent.id}-left.svg`;
  const right = `/demo/${talent.id}-right.svg`;
  const vocal = talent.vocalSource === "file" ? `/demo/${talent.id}-vocal.mp4` : "https://youtu.be/dQw4w9WgXcQ";
  const dance = talent.danceSource === "file" ? `/demo/${talent.id}-dance.mp4` : "https://youtu.be/aqz-KE-bpKQ";

  return {
    ...talent,
    gender: index % 2 === 0 ? "woman" : "man",
    nationality: "대한민국",
    socialUrl: "",
    isMinor: false,
    guardianConsent: false,
    openToOffers: true,
    marketingConsent: false,
    photos: { front, left, right },
    vocal: { source: talent.vocalSource, value: vocal },
    dance: { source: talent.danceSource, value: dance },
    ageBand: index === 5 ? "teen" : "20s",
    media: [
      { kind: "photo-front", source: "demo", value: front, analysisEligible: false },
      { kind: "photo-left", source: "demo", value: left, analysisEligible: false },
      { kind: "photo-right", source: "demo", value: right, analysisEligible: false },
      { kind: "vocal", source: talent.vocalSource, value: vocal, analysisEligible: talent.vocalSource === "file" },
      { kind: "dance", source: talent.danceSource, value: dance, analysisEligible: talent.danceSource === "file" },
    ],
    createdAt: `2026-09-${String(10 + index).padStart(2, "0")}T09:00:00.000Z`,
    updatedAt: BASE_TIME,
    recentActivityAt: `2026-09-${String(16 - index).padStart(2, "0")}T09:00:00.000Z`,
  };
});

const candidateStages: Candidate["stage"][] = [
  "discovered",
  "saved",
  "internal-review",
  "offer-sent",
  "accepted",
  "follow-up",
  "final-review",
  "completed",
  "on-hold",
];

const candidates: Candidate[] = candidateStages.map((stage, index) => ({
  id: `candidate-${index + 1}`,
  talentId: talents[index % talents.length].id,
  stage,
  owner: ["지우", "태민", "서윤"][index % 3],
  nextAction: stage === "completed" ? "기록 보관" : "팀 검토 업데이트",
  teamNote: "데모 팀 메모입니다.",
  updatedAt: BASE_TIME,
  activity: [
    { id: `activity-${index + 1}`, label: `${stage} 단계로 이동`, createdAt: BASE_TIME },
  ],
}));

const agentStatuses: AgentJob["status"][] = [
  "queued",
  "running",
  "approval-required",
  "completed",
  "failed",
  "manual",
];

const agentJobs: AgentJob[] = agentStatuses.map((status, index) => ({
  id: `agent-job-${index + 1}`,
  tenantId: "agency-nova",
  skill: (["audition-triage", "daily-briefing", "content-prep"] as const)[index % 3],
  status,
  tools: ["workspace.read.demo", "policy.check.demo"],
  currentStep: status === "failed" ? "데모 도구 응답 확인" : "데모 작업 단계 확인",
  result: status === "completed" ? "데모 결과가 준비되었습니다." : "API 연동 예정",
  requiresApproval: status === "approval-required",
  createdAt: BASE_TIME,
  updatedAt: BASE_TIME,
}));

export const demoState: DemoState = {
  version: 1,
  activeRole: "public",
  activeAgencyId: "agency-nova",
  talents,
  agencies: [
    { id: "agency-nova", name: "노바 엔터테인먼트", department: "신인개발팀", verification: "verified" },
    { id: "agency-orbit", name: "오빗 크리에이티브", department: "캐스팅팀", verification: "verified" },
    { id: "agency-pending", name: "스테이지랩", department: "A&R팀", verification: "pending" },
  ],
  offers: [
    {
      id: "offer-1",
      agencyId: "agency-nova",
      talentId: "talent-lua",
      title: "비공개 추가 오디션",
      purpose: "보컬·퍼포먼스 확인",
      field: "idol",
      dueAt: "2026-09-28T09:00:00.000Z",
      department: "신인개발팀",
      message: "추가 오디션 참여를 제안드립니다.",
      status: "declined",
      createdAt: BASE_TIME,
      updatedAt: BASE_TIME,
    },
    {
      id: "offer-2",
      agencyId: "agency-orbit",
      talentId: "talent-min",
      title: "퍼포먼스 미팅 제안",
      purpose: "프로젝트 적합성 확인",
      field: "dance",
      dueAt: "2026-10-02T09:00:00.000Z",
      department: "캐스팅팀",
      message: "온라인 미팅을 제안드립니다.",
      status: "sent",
      createdAt: BASE_TIME,
      updatedAt: BASE_TIME,
    },
  ],
  candidates,
  favoriteTalentIds: ["talent-min"],
  agentJobs,
  contentJobs: [
    {
      id: "content-job-1",
      title: "신인 공개 숏폼",
      purpose: "신인 소개",
      channels: ["shorts", "reels"],
      duration: 30,
      tone: "팬 친화적",
      captionStyle: "리듬 강조",
      aspectRatio: "9:16",
      step: "review",
      clipCandidates: [1, 2, 3].map((number) => ({
        id: `clip-${number}`,
        title: `추천 구간 ${number}`,
        label: "데모 생성물" as const,
      })),
      createdAt: BASE_TIME,
      updatedAt: BASE_TIME,
    },
  ],
  profileViews: [
    { id: "view-1", talentId: "talent-lua", agencyId: "agency-nova", viewedAt: BASE_TIME },
    { id: "view-2", talentId: "talent-lua", agencyId: "agency-orbit", viewedAt: "2026-09-15T04:00:00.000Z" },
  ],
};

export function createDemoState(): DemoState {
  return structuredClone(demoState);
}
