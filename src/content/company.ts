export type Lang = "en" | "ko";

export const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "chanjoo@dazzlar.dev";

export const company = {
  name: "AI특별시",
  brand: "Dazzlar",
  representative: { ko: "김찬주", en: "Chan Joo Kim" },
  phone: { display: "010-2068-9295", tel: "+821020689295" },
} as const;
export const productUrl = process.env.NEXT_PUBLIC_ENTER_AX_URL || "";
export const kakaoUrl = "http://pf.kakao.com/_gxgbxcn/chat";

export const months = ["APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT"] as const;

export type LaneKey = "audition" | "evaluation" | "protection" | "claude";

export interface Clip {
  /** 1-based month column the clip starts in. */
  start: number;
  span?: number;
  label: Record<Lang, string>;
  flagged?: boolean;
}

export const lanes: Array<{ key: LaneKey; name: Record<Lang, string>; clips: Clip[] }> = [
  {
    key: "audition",
    name: { en: "Audition", ko: "오디션" },
    clips: [
      { start: 1, label: { en: "Application received", ko: "지원서 접수" } },
      { start: 2, label: { en: "In-person audition", ko: "실기 오디션" } },
      { start: 3, label: { en: "Accepted", ko: "합격" } },
    ],
  },
  {
    key: "evaluation",
    name: { en: "Evaluations", ko: "월별 평가" },
    clips: [
      { start: 4, label: { en: "2 entries", ko: "기록 2건" } },
      { start: 5, label: { en: "3 entries", ko: "기록 3건" } },
      { start: 6, label: { en: "3 entries", ko: "기록 3건" } },
      { start: 7, label: { en: "2 entries", ko: "기록 2건" } },
    ],
  },
  {
    key: "protection",
    name: { en: "Protection log", ko: "보호 기록" },
    clips: [
      { start: 3, label: { en: "Guardian notice", ko: "보호자 고지" } },
      { start: 4, span: 2, label: { en: "Weekly hours logged", ko: "주간 시간 기록" } },
      { start: 6, label: { en: "Week over reference", ko: "참고 기준 초과 주" }, flagged: true },
      { start: 7, label: { en: "Counselling", ko: "상담 연계" } },
    ],
  },
  {
    key: "claude",
    name: { en: "Claude", ko: "Claude" },
    clips: [{ start: 7, label: { en: "Growth summary, draft for staff", ko: "성장 기록 정리 · 담당자 검토용" } }],
  },
];

const blog = "https://the-cyclopedia.com/";

/** Mini apps built for Apps in Toss. Screens are real captures from each app. */
export const apps: Array<{ key: string; name: Record<Lang, string>; line: Record<Lang, string>; log: string }> = [
  { key: "water", name: { en: "Water Tracker", ko: "물마시기" }, line: { en: "A one-screen log for the day's water.", ko: "화면 하나로 끝나는 물 기록." }, log: `${blog}toss-miniapp-water-tracker-build-log/` },
  { key: "cardpace", name: { en: "Card Pace", ko: "카드값 페이스" }, line: { en: "Paces this month's card spending, day by day.", ko: "이번 달 카드값을 날마다 페이스로." }, log: `${blog}toss-miniapp-card-pace-build-log/` },
  { key: "lotto", name: { en: "Lotto Generator", ko: "로또 번호 생성기" }, line: { en: "Draws numbers, keeps them, checks Saturday's result.", ko: "뽑고, 보관하고, 토요일 결과와 맞춰 봅니다." }, log: `${blog}toss-miniapp-lotto-generator-build-log/` },
  { key: "gemmine", name: { en: "Gem Mine", ko: "보석 광산" }, line: { en: "A tile-tapping mining game with charms and a smelter.", ko: "타일을 눌러 보석을 캐는 게임." }, log: `${blog}toss-miniapp-gem-mine-build-log/` },
  { key: "ledger", name: { en: "Gift Ledger", ko: "경조사 봉투장부" }, line: { en: "Records wedding and condolence gifts for next time.", ko: "축의금·부의금을 적어 두고 다시 찾습니다." }, log: `${blog}toss-miniapp-event-ledger-build-log/` },
  { key: "currency", name: { en: "Currency Calculator", ko: "환율 계산기" }, line: { en: "Reference conversion with the rate's timestamp shown.", ko: "환율 기준시각을 드러낸 참고 환산." }, log: `${blog}toss-miniapp-currency-calculator-build-log/` },
  { key: "kpass", name: { en: "K-Pass Refund", ko: "K패스 환급 계산기" }, line: { en: "Compares two transit refund rules and counts rides.", ko: "두 가지 환급 기준을 비교하고 탑승을 셉니다." }, log: `${blog}toss-miniapp-kpass-calculator-build-log/` },
  { key: "weather", name: { en: "Weather Outfit", ko: "날씨 코디" }, line: { en: "Outfits for today's temperature, school or casual.", ko: "오늘 기온에 맞는 교복·사복 옷차림." }, log: `${blog}toss-miniapp-weather-outfit-build-log/` },
  { key: "interest", name: { en: "Interest Calculator", ko: "이자 계산기" }, line: { en: "Monthly repayment, and what a 1%p move changes.", ko: "월 상환액과 금리 1%p의 차이." }, log: `${blog}toss-miniapp-interest-calculator-build-log/` },
  { key: "decision", name: { en: "Decision God", ko: "결정의 신" }, line: { en: "A daily card and five tools for small choices.", ko: "오늘의 한 수와 다섯 가지 결정 도구." }, log: `${blog}toss-miniapp-decision-god-build-log/` },
  { key: "weight", name: { en: "Weight Diary", ko: "체중 다이어리" }, line: { en: "Quick entry with 7- and 30-day trends.", ko: "빠른 기록과 7일·30일 흐름." }, log: `${blog}toss-miniapp-weight-diary-build-log/` },
];

/** Published write-ups on how the work is done. Titles are the posts' own; the posts are in Korean. */
export const methodLogs: Array<{ title: Record<Lang, string>; href: string }> = [
  { title: { en: "Automating a blog with Claude Code", ko: "Claude Code로 블로그 자동화하기" }, href: `${blog}claude-code-blog-automation-case/` },
  { title: { en: "An AI harness for building mini apps", ko: "AI 하네스 - 미니앱 제작에 적용한 방법" }, href: `${blog}ai-harness-apps-in-toss/` },
  { title: { en: "Subagents: splitting roles to verify work", ko: "서브에이전트 - 역할을 나눠 검증하는 방법" }, href: `${blog}ai-subagents-division-of-work/` },
  { title: { en: "Agent skills: turning repeated work into procedure", ko: "에이전트 스킬 - 반복 작업을 절차로 묶는 방법" }, href: `${blog}agent-skills-explained/` },
  { title: { en: "Context engineering: designing what the AI reads", ko: "컨텍스트 엔지니어링 - AI가 읽는 양을 설계하는 방법" }, href: `${blog}context-engineering-for-ai-agents/` },
  { title: { en: "Auto Mode in Claude Code", ko: "오토 모드(Auto Mode) - 승인 대신 분류기가 검사하는 구조" }, href: `${blog}claude-code-auto-mode-explained/` },
];

export const copy = {
  en: {
    nav: { product: "Enter-AX", claude: "Claude", work: "Work", logs: "Build logs", studio: "Company", contact: "Contact" },
    switchLabel: "한국어",
    eyebrow: "Dazzlar · AI특별시 · Korea",
    title: "Operations software built on Claude. People still make the decisions.",
    lede: "Dazzlar is a one-person software company in Korea. Our product is Enter-AX, an operations platform for K-pop entertainment agencies that carries each person's record from the audition application through monthly trainee evaluations and the youth-protection log Korean law now asks agencies to keep.",
    primaryCta: "See what it does",
    contactCta: "Talk to us",
    productCta: "Open Enter-AX",
    sessionCaption: "An illustrative record. Each lane is a kind of entry Enter-AX keeps. Entries are added in order and never edited afterwards.",
    todayLabel: "today",
    whyTitle: "Why this exists",
    why: [
      {
        figure: "120,000",
        figureLabel: "submissions to one global audition",
        head: "The audience is global. The intake is still an inbox.",
        body: "HYBE and Geffen's Dream Academy audition drew about 120,000 submissions. Many agencies still take applications by email and web forms, and a large share of the people applying are minors sending personal data and video.",
        source: { label: "Music Business Worldwide", href: "https://www.musicbusinessworldwide.com/after-120000-submissions-hybe-and-geffen-unveil-20-artists-to-compete-for-a-spot-in-new-global-girl-group" },
      },
      {
        figure: "1 Aug 2025",
        figureLabel: "youth protection officer duty in force",
        head: "Agencies now have to keep evidence of how minors are treated.",
        body: "Since 1 August 2025, Korean law requires an agency to designate a youth protection officer who manages minors' working hours, handles rights-violation reports, reviews contracts, and keeps records proving it. The ministry can ask to see them.",
        source: { label: "Popular Culture and Arts Industry Development Act, Art. 21-2", href: "https://casenote.kr/법령/대중문화예술산업발전법/제21조의2" },
      },
      {
        figure: "Monthly",
        figureLabel: "evaluations, each one a decision point",
        head: "Monthly evaluations decide who continues.",
        body: "Enter-AX keeps each evaluator's entry exactly as it was written, month by month, next to the application the person came in with. When a decision is made, there is a record behind it.",
      },
    ],
    productTitle: "What Enter-AX does",
    productStatus: "Enter-AX is a working prototype. We are preparing our first agency pilots.",
    features: [
      { lane: "audition", head: "Private audition intake", body: "Each agency issues its own intake link. Photos, audio and video go straight to private storage. Applications from children under 14 are blocked until guardian verification is connected." },
      { lane: "audition", head: "A review pipeline people run", body: "Applications move through stages. Each reviewer's scores and notes are kept as separate entries. Nothing is passed or rejected automatically." },
      { lane: "evaluation", head: "A trainee record that continues from the application", body: "When someone is accepted, their application becomes the first page of a trainee record. Monthly evaluations are added by each evaluator and cannot be changed later." },
      { lane: "protection", head: "A youth-protection log", body: "Weekly hours checked against the statutory reference for the trainee's age, guardian notices, counselling, reports and contract reviews, kept in order as evidence." },
    ],
    shots: [
      { src: "/enter-ax/pipeline.png", alt: "Enter-AX candidate pipeline with applicants grouped by review stage", caption: "Review pipeline" },
      { src: "/enter-ax/workflow.png", alt: "Enter-AX workflow editor paused at a casting lead approval step", caption: "A workflow paused for a person's approval" },
    ],
    shotsNote: "Prototype screens with sample data.",
    claudeTitle: "Claude reads and organises. People decide.",
    claudeLede: "Enter-AX uses Claude, from Anthropic. It is part of what agency staff use, not an internal tool.",
    doesTitle: "What Claude does",
    does: [
      "Reads months of evaluator comments on a trainee and sets out what changed, where evaluators disagree, and what to check next.",
      "Drafts feedback for staff to review before it reaches the trainee.",
      "Breaks an agency's planning document into goals, risks, missing information and next actions.",
      "Prepares reviewer checklists and summaries inside agency workflows, which stop for a person's approval before anything is shared.",
    ],
    neverTitle: "What Claude never does",
    never: [
      "Score, rank, pass or reject anyone, or advise on debut and contracts.",
      "Comment on appearance, body or weight.",
      "Interpret signs of injury, sleep loss or verbal abuse in the comments. It points staff to the entry instead.",
      "Receive contact details or the protection log. For trainee summaries, names, birth dates and evaluator names are removed first.",
    ],
    sessionTitle: "Record · sample trainee",
    sessionRange: "Apr – Oct 2026",
    laneTag: { audition: "Audition", evaluation: "Evaluations", protection: "Protection log", claude: "Claude" },
    productKicker: "Prototype",
    mock: {
      label: "Illustrative output",
      title: "Growth summary",
      meta: "Jul – Oct · 10 entries · draft for staff",
      attentionTitle: "Needs a person",
      attention: "A September entry mentions ankle pain during practice.",
      changedTitle: "What changed",
      changed: [["Vocal", "High notes steadier since August."], ["Dance", "Timing on the chorus still drifts."]],
      differTitle: "Where evaluators differ",
      differ: "Evaluator A and B read stage presence differently in September.",
      draftTitle: "Feedback draft",
      draft: "Your high notes have become noticeably steadier over the last two months. Next month, let's work on the chorus timing together.",
    },
    workTitle: "Everything here was built with Claude.",
    workLede: "Enter-AX is the product, and Claude is part of it. The rest are businesses we run ourselves with Claude Code. They are how one person builds and keeps this much running, and what we learn running them goes back into the product.",
    stackLabel: "What we make",
    appsKicker: "Claude Code · mini apps",
    appsTitle: "Mini apps for Apps in Toss",
    appsBody: "Small utilities for the mini-app platform inside the Toss app. Each starts from a shared template, and a harness hands Claude Code only the files a task needs. Every app has a public build log.",
    appsHint: "Scroll sideways",
    logCta: "Build log",
    blogKicker: "Claude Code · publishing",
    blogTitle: "A publishing engine for the-cyclopedia.com",
    blogBody: "A Korean blog recording how a non-developer builds with AI. Each post passes a guard for things that must not be published, an SEO check and a fact-checking subagent that compares its figures with the source files. It reaches WordPress as a draft and a person publishes it.",
    blogCta: "Visit the blog",
    storeKicker: "Claude Code · commerce",
    storeTitle: "An agent workspace for an online store",
    storeBody: "Happiness, a vegan food consignment store. Channel rules for Naver Smart Store, Coupang and Toss Shopping, product-name checks and pricing rules live in documents the agents read before drafting a listing. Product facts come only from the supplier's official information.",
    rulesTitle: "The same three rules everywhere",
    rules: [
      ["Sources first", "Claude works from written sources. A figure that cannot be traced to one is left out."],
      ["Checks before output", "Guards, tests and a separate checking agent run before anything goes out."],
      ["A person approves", "Publishing a post, registering a product or changing a price stops for approval first."],
    ],
    logsTitle: "We write down how it was built.",
    logsLede: "Every mini app and every method we rely on has a write-up on the-cyclopedia.com, with the screens, the key code and the reasons behind each choice. The posts are in Korean.",
    logsApps: "Mini app build logs",
    logsMethod: "How we work with Claude",
    factsTitle: "Company",
    facts: [["Legal name", "AI특별시"], ["Brand", "Dazzlar"], ["Founder", "Chan Joo Kim (김찬주)"], ["Founded", "6 October 2026"], ["Product", "Enter-AX"], ["Team", "Solo founder"], ["Based in", "Republic of Korea"]],
    studioTitle: "A company of one, founded in October 2026.",
    studioBody: "AI특별시 was founded on 6 October 2026 by Chan Joo Kim (김찬주) and builds software under the name Dazzlar. The founder ran a recording studio for seven years before starting the company, which is where the problem behind Enter-AX comes from, and is not a developer by training. The company is one person working with Claude.",
    contactTitle: "Running an agency's casting or training team?",
    contactBody: "We are looking for a small number of agencies to pilot Enter-AX with. Tell us how you take applications and keep trainee records today.",
    representativeLabel: "Representative",
    footer: "Dazzlar",
  },
  ko: {
    nav: { product: "Enter-AX", claude: "Claude", work: "만든 것들", logs: "제작기", studio: "회사", contact: "문의" },
    switchLabel: "English",
    eyebrow: "Dazzlar · AI특별시 · Korea",
    title: "Claude 위에서 돌아가는 운영 소프트웨어. 결정은 사람이 합니다.",
    lede: "Dazzlar는 한국의 1인 소프트웨어 회사입니다. 제품은 K-pop 기획사를 위한 운영 플랫폼 Enter-AX입니다. 오디션 지원서에서 시작해 연습생의 월별 평가, 그리고 이제 법이 기획사에 요구하는 청소년 보호 기록까지 한 사람의 기록으로 이어 갑니다.",
    primaryCta: "무엇을 하는지 보기",
    contactCta: "문의하기",
    productCta: "Enter-AX 열기",
    sessionCaption: "예시 기록입니다. 각 줄은 Enter-AX가 보관하는 기록의 종류입니다. 기록은 순서대로 추가되고 이후에는 수정되지 않습니다.",
    todayLabel: "오늘",
    whyTitle: "왜 만드는가",
    why: [
      {
        figure: "120,000",
        figureLabel: "한 글로벌 오디션의 접수 건수",
        head: "무대는 세계로 넓어졌는데, 접수는 여전히 메일함입니다.",
        body: "HYBE와 Geffen의 드림아카데미 오디션에는 약 12만 건이 접수됐습니다. 많은 기획사가 지금도 이메일과 설문 폼으로 지원을 받고, 지원자 중 상당수는 개인정보와 영상을 보내는 미성년자입니다.",
        source: { label: "Music Business Worldwide", href: "https://www.musicbusinessworldwide.com/after-120000-submissions-hybe-and-geffen-unveil-20-artists-to-compete-for-a-spot-in-new-global-girl-group" },
      },
      {
        figure: "2025.08.01",
        figureLabel: "청소년보호책임자 의무 시행",
        head: "기획사는 이제 청소년을 어떻게 보호했는지 증빙을 남겨야 합니다.",
        body: "2025년 8월 1일부터 기획사는 청소년보호책임자를 지정해야 합니다. 책임자는 청소년의 용역 제공 시간을 관리하고, 권익 침해 신고를 처리하고, 계약을 검토하고, 그 수행을 증빙할 자료를 보관해야 합니다. 문체부는 자료 제출을 요구할 수 있습니다.",
        source: { label: "대중문화예술산업발전법 제21조의2", href: "https://casenote.kr/법령/대중문화예술산업발전법/제21조의2" },
      },
      {
        figure: "매달",
        figureLabel: "평가, 매번이 결정의 순간",
        head: "누가 계속 남는지는 월말평가가 정합니다.",
        body: "Enter-AX는 평가자가 남긴 기록을 쓴 그대로, 달마다, 그 사람이 처음 낸 지원서 옆에 보관합니다. 결정이 내려질 때 그 뒤에 기록이 남습니다.",
      },
    ],
    productTitle: "Enter-AX가 하는 일",
    productStatus: "Enter-AX는 동작하는 프로토타입입니다. 첫 기획사 파일럿을 준비하고 있습니다.",
    features: [
      { lane: "audition", head: "비공개 오디션 접수", body: "기획사마다 전용 접수 링크를 발급합니다. 사진·음원·영상은 비공개 저장소로 바로 올라갑니다. 만 14세 미만의 지원은 보호자 확인이 연결되기 전까지 받지 않습니다." },
      { lane: "audition", head: "사람이 진행하는 심사", body: "지원서는 단계별로 이동합니다. 심사자마다 점수와 메모가 따로 남습니다. 자동으로 합격하거나 탈락하는 일은 없습니다." },
      { lane: "evaluation", head: "지원서에서 이어지는 연습생 기록", body: "합격하면 지원서가 연습생 기록의 첫 장이 됩니다. 월별 평가는 평가자마다 추가하고 나중에 고칠 수 없습니다." },
      { lane: "protection", head: "청소년 보호 기록", body: "나이에 따른 법정 참고 기준과 대조한 주간 시간, 보호자 고지, 상담, 신고와 조치, 계약 검토를 증빙으로 순서대로 보관합니다." },
    ],
    shots: [
      { src: "/enter-ax/pipeline.png", alt: "심사 단계별로 지원자가 정리된 Enter-AX 파이프라인 화면", caption: "심사 파이프라인" },
      { src: "/enter-ax/workflow.png", alt: "캐스팅 리드 승인 단계에서 멈춘 Enter-AX 워크플로 화면", caption: "담당자 승인에서 멈춘 워크플로" },
    ],
    shotsNote: "샘플 데이터가 담긴 프로토타입 화면입니다.",
    claudeTitle: "Claude가 읽고 정리하고, 사람이 결정합니다.",
    claudeLede: "Enter-AX는 Anthropic의 Claude를 씁니다. 내부 업무 도구가 아니라 기획사 직원이 쓰는 제품 기능의 일부입니다.",
    doesTitle: "Claude가 하는 일",
    does: [
      "연습생에 대해 평가자들이 몇 달간 남긴 의견을 읽고, 무엇이 달라졌는지, 평가자끼리 어디서 다르게 봤는지, 다음에 무엇을 확인할지 정리합니다.",
      "연습생에게 전달하기 전에 담당자가 검토할 피드백 초안을 씁니다.",
      "기획 문서를 목표, 리스크, 빠진 정보, 다음 액션으로 나눕니다.",
      "기획사 워크플로 안에서 심사자용 확인 항목과 요약을 만듭니다. 공유 전에는 담당자 승인에서 멈춥니다.",
    ],
    neverTitle: "Claude가 하지 않는 일",
    never: [
      "점수, 순위, 합격·불합격을 매기거나 데뷔와 계약에 대해 조언하지 않습니다.",
      "외모, 체형, 체중을 언급하지 않습니다.",
      "의견에 적힌 부상, 수면 부족, 폭언의 신호를 해석하지 않습니다. 담당자가 그 기록을 보도록 알립니다.",
      "연락처와 보호 기록은 전달되지 않습니다. 연습생 기록 정리에서는 이름, 생년월일, 평가자 이름을 먼저 지웁니다.",
    ],
    sessionTitle: "기록 · 예시 연습생",
    sessionRange: "2026년 4월 – 10월",
    laneTag: { audition: "오디션", evaluation: "월별 평가", protection: "보호 기록", claude: "Claude" },
    productKicker: "프로토타입",
    mock: {
      label: "예시 결과",
      title: "성장 기록 정리",
      meta: "7월 – 10월 · 기록 10건 · 담당자 검토용 초안",
      attentionTitle: "담당자가 직접 확인할 기록",
      attention: "9월 기록에 연습 중 발목 통증 언급이 있습니다.",
      changedTitle: "달라진 점",
      changed: [["보컬", "8월 이후 고음이 안정됐습니다."], ["댄스", "후렴 구간의 박자가 아직 밀립니다."]],
      differTitle: "평가자 간 다르게 본 지점",
      differ: "9월 무대 표현을 평가자 A와 B가 다르게 봤습니다.",
      draftTitle: "피드백 초안",
      draft: "지난 두 달 동안 고음이 눈에 띄게 안정되었습니다. 다음 달에는 후렴 구간의 박자를 함께 맞춰 보겠습니다.",
    },
    workTitle: "여기 있는 것은 모두 Claude로 만들었습니다.",
    workLede: "Enter-AX는 제품이고 Claude가 그 안에서 일합니다. 나머지는 Claude Code로 직접 운영하는 사업들입니다. 한 사람이 이만큼을 만들고 굴릴 수 있는 방식이고, 여기서 배운 것은 다시 제품으로 들어갑니다.",
    stackLabel: "만드는 것들",
    appsKicker: "Claude Code · 미니앱",
    appsTitle: "앱인토스 미니앱",
    appsBody: "토스 앱 안의 미니앱 플랫폼에 올리는 작은 도구들입니다. 모두 공통 템플릿에서 시작하고, 하네스가 작업에 필요한 파일만 Claude Code에 넘깁니다. 앱마다 제작기가 공개되어 있습니다.",
    appsHint: "옆으로 넘겨 보기",
    logCta: "제작기",
    blogKicker: "Claude Code · 발행",
    blogTitle: "the-cyclopedia.com 발행 엔진",
    blogBody: "개발자가 아닌 사람이 AI로 만드는 과정을 기록하는 블로그입니다. 글마다 공개 금지 항목 검사, SEO 점검, 수치를 원본 파일과 대조하는 검증 에이전트를 거칩니다. 워드프레스에는 임시글로 올라가고 발행은 사람이 합니다.",
    blogCta: "블로그 보기",
    storeKicker: "Claude Code · 커머스",
    storeTitle: "온라인 스토어 에이전트 작업 공간",
    storeBody: "비건 식품 위탁판매 스토어 해피니스입니다. 스마트스토어·쿠팡·토스쇼핑의 채널 규칙, 상품명 검사, 가격 규칙을 문서로 두고 에이전트가 상품 초안을 쓰기 전에 읽습니다. 상품 사실 정보는 공급처 공식 정보만 씁니다.",
    rulesTitle: "어디서나 같은 세 가지 규칙",
    rules: [
      ["원본 먼저", "Claude는 적힌 원본을 근거로 일합니다. 원본에서 확인하지 못한 수치는 뺍니다."],
      ["내보내기 전 점검", "가드, 테스트, 별도의 검증 에이전트가 먼저 돕니다."],
      ["사람이 승인", "글 발행, 상품 등록, 가격 변경은 승인 앞에서 멈춥니다."],
    ],
    logsTitle: "어떻게 만들었는지 적어 둡니다.",
    logsLede: "미니앱 하나하나와 저희가 쓰는 방법마다 the-cyclopedia.com에 글이 있습니다. 화면, 핵심 코드, 그렇게 정한 이유를 담았습니다.",
    logsApps: "미니앱 제작기",
    logsMethod: "Claude와 일하는 방법",
    factsTitle: "회사 정보",
    facts: [["상호", "AI특별시"], ["브랜드", "Dazzlar"], ["대표", "김찬주"], ["설립", "2026년 10월 6일"], ["제품", "Enter-AX"], ["팀", "1인 창업"], ["소재", "대한민국"]],
    studioTitle: "2026년 10월에 시작한 1인 회사.",
    studioBody: "AI특별시는 2026년 10월 6일 김찬주가 설립했고, Dazzlar라는 이름으로 소프트웨어를 만듭니다. 회사를 시작하기 전 7년간 녹음 스튜디오를 운영했고, Enter-AX가 푸는 문제는 거기서 나왔습니다. 개발자 출신이 아닙니다. 회사는 Claude와 함께 일하는 한 사람입니다.",
    contactTitle: "기획사의 캐스팅팀이나 트레이닝팀을 운영하고 계신가요?",
    contactBody: "Enter-AX를 함께 시험할 기획사를 소수로 찾고 있습니다. 지금 지원을 어떻게 받고 연습생 기록을 어떻게 남기는지 알려 주세요.",
    representativeLabel: "대표",
    footer: "Dazzlar",
  },
} as const;
