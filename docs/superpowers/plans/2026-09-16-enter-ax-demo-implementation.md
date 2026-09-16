# Enter-AX Connected AX Demo Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the existing Dazzling Studio portfolio with a polished, interactive Enter-AX demo covering talent registration, verified-agency discovery and contact, candidate pipeline management, agent approval, and promotional-content automation.

**Architecture:** Keep the existing Next.js 15 App Router deployment base, but replace the portfolio UI with feature modules backed by a typed demo repository. A client-side provider persists serializable demo state to `localStorage`; media `File` objects remain browser-only and are revoked on cleanup. All future integrations sit behind repository and agent-runner interfaces so real authentication, storage, APIs, and Hermes can replace demo adapters without rewriting page components.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS 4, Vitest, React Testing Library, Playwright, Lucide React, Vercel

**Spec:** `docs/superpowers/specs/2026-09-16-enter-ax-demo-design.md`

## Global Constraints

- The first release must not send or persist selected photos or videos to a server.
- YouTube submissions are embedded for playback only and are never downloaded, cached, separated, or analyzed.
- Every simulated AI result must display `데모` or `API 연동 예정`.
- Applicant acceptance and rejection remain human decisions; no automatic ranking or elimination exists.
- External messages, contact details, social publishing, rendering, identity verification, and payments are simulated.
- Default talent visibility is verified agencies only; public portfolio visibility requires a separate explicit choice.
- Mobile-first behavior applies to talent registration and offers; agency tools are desktop-first and usable on tablets.
- Production deployment must not replace the existing Vercel deployment until the Preview has passed all quality gates and the user explicitly approves promotion.
- Preserve the untracked root `기획서.md`; do not add, move, overwrite, or delete it.

---

## File Structure

```text
src/
├── app/
│   ├── agency/
│   │   ├── ax/page.tsx
│   │   ├── content/page.tsx
│   │   ├── discover/page.tsx
│   │   ├── pipeline/page.tsx
│   │   ├── talent/[id]/page.tsx
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── talent/
│   │   ├── offers/page.tsx
│   │   ├── onboarding/page.tsx
│   │   ├── profile/page.tsx
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── error.tsx
│   ├── globals.css
│   ├── layout.tsx
│   ├── not-found.tsx
│   └── page.tsx
├── components/
│   ├── agency/
│   │   ├── AgentJobPanel.tsx
│   │   ├── CandidateBoard.tsx
│   │   ├── ContentWorkflow.tsx
│   │   ├── TalentFilters.tsx
│   │   ├── TalentGrid.tsx
│   │   └── TalentReview.tsx
│   ├── marketing/
│   │   ├── AxFlow.tsx
│   │   ├── Hero.tsx
│   │   └── ProductProof.tsx
│   ├── shared/
│   │   ├── AppShell.tsx
│   │   ├── DemoBadge.tsx
│   │   ├── EmptyState.tsx
│   │   ├── RoleSwitcher.tsx
│   │   ├── StatusBadge.tsx
│   │   └── ToastRegion.tsx
│   └── talent/
│       ├── MediaInput.tsx
│       ├── OfferInbox.tsx
│       ├── OnboardingForm.tsx
│       ├── PhotoTriptych.tsx
│       └── TalentProfileCard.tsx
├── features/
│   ├── agency/
│   │   ├── filters.ts
│   │   └── filters.test.ts
│   ├── content/
│   │   ├── workflow.ts
│   │   └── workflow.test.ts
│   ├── demo/
│   │   ├── DemoProvider.tsx
│   │   ├── fixtures.ts
│   │   ├── reducer.ts
│   │   ├── reducer.test.ts
│   │   ├── repository.ts
│   │   └── storage.ts
│   ├── hermes/
│   │   ├── runner.ts
│   │   └── runner.test.ts
│   └── talent/
│       ├── media.ts
│       ├── media.test.ts
│       ├── validation.ts
│       └── validation.test.ts
├── lib/
│   ├── constants.ts
│   └── youtube.ts
├── test/setup.ts
└── types/domain.ts
e2e/
├── agency-flow.spec.ts
├── landing.spec.ts
└── talent-flow.spec.ts
playwright.config.ts
vitest.config.ts
```

---

### Task 1: Establish the Test Harness and Domain Contracts

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`
- Create: `vitest.config.ts`
- Create: `src/test/setup.ts`
- Create: `src/types/domain.ts`
- Create: `src/features/talent/validation.test.ts`
- Create: `src/features/talent/validation.ts`
- Create: `src/lib/youtube.ts`

**Interfaces:**
- Produces: `TalentProfile`, `TalentMedia`, `Agency`, `Offer`, `Candidate`, `AgentJob`, `ContentJob`, `DemoState`, `Visibility`, `OfferStatus`, `PipelineStage`, `AgentJobStatus`
- Produces: `validateTalentDraft(draft: TalentDraft): ValidationErrors`
- Produces: `parseYouTubeVideoId(value: string): string | null`

- [x] **Step 1: Install the unit-test dependencies and scripts**

Run:

```bash
npm install -D vitest jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

Add these exact scripts to `package.json`:

```json
"typecheck": "tsc --noEmit",
"test": "vitest run",
"test:watch": "vitest",
"check": "npm run typecheck && npm run lint && npm run test && npm run build"
```

- [x] **Step 2: Configure Vitest**

Create `vitest.config.ts`:

```ts
import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
  },
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
});
```

Create `src/test/setup.ts`:

```ts
import "@testing-library/jest-dom/vitest";
```

- [x] **Step 3: Write failing validation tests**

Create `src/features/talent/validation.test.ts` with cases for missing photos, guardian consent, valid file submissions, valid YouTube submissions, and invalid YouTube URLs:

```ts
import { describe, expect, it } from "vitest";
import { parseYouTubeVideoId } from "@/lib/youtube";
import { validateTalentDraft } from "./validation";

const completeDraft = {
  stageName: "루아",
  birthDate: "2004-03-14",
  gender: "woman" as const,
  nationality: "대한민국",
  region: "서울",
  fields: ["idol" as const],
  bio: "무대 위에서 이야기를 전달하는 퍼포머입니다.",
  socialUrl: "",
  isMinor: false,
  guardianConsent: false,
  visibility: "verified-agencies" as const,
  openToOffers: true,
  marketingConsent: false,
  photos: { front: "front.jpg", left: "left.jpg", right: "right.jpg" },
  vocal: { source: "file" as const, value: "vocal.mp4" },
  dance: { source: "youtube" as const, value: "https://youtu.be/dQw4w9WgXcQ" },
};

describe("validateTalentDraft", () => {
  it("requires all three face photos", () => {
    const errors = validateTalentDraft({
      ...completeDraft,
      photos: { ...completeDraft.photos, left: "" },
    });
    expect(errors.photos).toContain("왼쪽 측면");
  });

  it("requires guardian consent for a minor", () => {
    const errors = validateTalentDraft({
      ...completeDraft,
      isMinor: true,
      guardianConsent: false,
    });
    expect(errors.guardianConsent).toBeTruthy();
  });

  it("accepts a complete adult submission", () => {
    expect(validateTalentDraft(completeDraft)).toEqual({});
  });
});

describe("parseYouTubeVideoId", () => {
  it.each([
    ["https://youtu.be/dQw4w9WgXcQ", "dQw4w9WgXcQ"],
    ["https://www.youtube.com/watch?v=dQw4w9WgXcQ", "dQw4w9WgXcQ"],
    ["https://www.youtube.com/shorts/dQw4w9WgXcQ", "dQw4w9WgXcQ"],
  ])("parses %s", (value, expected) => {
    expect(parseYouTubeVideoId(value)).toBe(expected);
  });

  it("rejects non-YouTube URLs", () => {
    expect(parseYouTubeVideoId("https://example.com/video")).toBeNull();
  });
});
```

- [x] **Step 4: Run the tests and verify failure**

Run:

```bash
npm test -- src/features/talent/validation.test.ts
```

Expected: FAIL because `validation.ts`, `youtube.ts`, and the domain types do not exist.

- [x] **Step 5: Define domain types and implement minimal validation**

Create `src/types/domain.ts` with discriminated unions rather than optional flag combinations. Required names:

```ts
export type TalentField = "idol" | "vocal" | "dance" | "actor" | "model";
export type Gender = "woman" | "man" | "nonbinary" | "undisclosed";
export type Visibility = "verified-agencies" | "public";
export type MediaSource = "file" | "youtube" | "demo";
export type OfferStatus = "sent" | "accepted" | "declined" | "needs-info";
export type PipelineStage =
  | "discovered"
  | "saved"
  | "internal-review"
  | "offer-sent"
  | "accepted"
  | "follow-up"
  | "final-review"
  | "completed"
  | "on-hold";
export type AgentJobStatus =
  | "queued"
  | "running"
  | "approval-required"
  | "completed"
  | "rejected"
  | "failed"
  | "manual";

export interface MediaDraft {
  source: "file" | "youtube";
  value: string;
}

export interface TalentDraft {
  stageName: string;
  birthDate: string;
  gender: Gender;
  nationality: string;
  region: string;
  fields: TalentField[];
  bio: string;
  socialUrl: string;
  isMinor: boolean;
  guardianConsent: boolean;
  visibility: Visibility;
  openToOffers: boolean;
  marketingConsent: boolean;
  photos: { front: string; left: string; right: string };
  vocal: MediaDraft;
  dance: MediaDraft;
}

export interface TalentMedia {
  kind: "photo-front" | "photo-left" | "photo-right" | "vocal" | "dance";
  source: MediaSource;
  value: string;
  analysisEligible: boolean;
}

export interface TalentProfile extends TalentDraft {
  id: string;
  ageBand: "teen" | "20s" | "30s";
  media: TalentMedia[];
  createdAt: string;
  updatedAt: string;
  recentActivityAt: string;
}

export interface Agency {
  id: string;
  name: string;
  department: string;
  verification: "verified" | "pending";
}

export interface Offer {
  id: string;
  agencyId: string;
  talentId: string;
  title: string;
  purpose: string;
  field: TalentField;
  dueAt: string;
  department: string;
  message: string;
  status: OfferStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CandidateActivity {
  id: string;
  label: string;
  createdAt: string;
}

export interface Candidate {
  id: string;
  talentId: string;
  stage: PipelineStage;
  owner: string;
  nextAction: string;
  teamNote: string;
  updatedAt: string;
  activity: CandidateActivity[];
}

export interface AgentJob {
  id: string;
  tenantId: string;
  skill: "audition-triage" | "daily-briefing" | "content-prep";
  status: AgentJobStatus;
  tools: string[];
  currentStep: string;
  result: string;
  requiresApproval: boolean;
  createdAt: string;
  updatedAt: string;
}

export type ContentStep = "source" | "brief" | "generating" | "review" | "approval" | "scheduled";
export type ContentAction = "continue" | "request-changes" | "approve" | "reject" | "schedule";

export interface ContentJob {
  id: string;
  title: string;
  purpose: string;
  channels: Array<"shorts" | "reels" | "tiktok">;
  duration: 15 | 30 | 60;
  tone: string;
  captionStyle: string;
  aspectRatio: "9:16" | "1:1" | "16:9";
  step: ContentStep;
  clipCandidates: Array<{ id: string; title: string; label: "데모 생성물" }>;
  rejectionReason?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProfileView {
  id: string;
  talentId: string;
  agencyId: string;
  viewedAt: string;
}

export interface DemoState {
  version: 1;
  activeRole: "public" | "talent" | "agency";
  activeAgencyId: string;
  talents: TalentProfile[];
  agencies: Agency[];
  offers: Offer[];
  candidates: Candidate[];
  favoriteTalentIds: string[];
  agentJobs: AgentJob[];
  contentJobs: ContentJob[];
  profileViews: ProfileView[];
}

export type ValidationErrors = Partial<Record<
  "stageName" | "birthDate" | "gender" | "nationality" | "region" | "fields" | "bio" | "socialUrl" |
  "photos" | "vocal" | "dance" | "guardianConsent" | "visibility",
  string
>>;
```

Implement `validateTalentDraft(draft: TalentDraft): ValidationErrors` and
`parseYouTubeVideoId(value: string): string | null` without network access. The parser must accept only
`youtube.com/watch`, `youtube.com/shorts`, and `youtu.be` URLs whose video ID matches
`[A-Za-z0-9_-]{11}`. Validation must require all profile fields, three photos, vocal and dance media,
guardian consent for minors, and a successfully parsed video ID whenever a media source is `youtube`.

- [x] **Step 6: Run unit tests and quality checks**

Run:

```bash
npm test -- src/features/talent/validation.test.ts
npm run typecheck
```

Expected: PASS.

- [x] **Step 7: Commit**

```bash
git add package.json package-lock.json vitest.config.ts src/test src/types src/features/talent src/lib/youtube.ts
git commit -m "test: establish Enter-AX domain contracts"
```

---

### Task 2: Build the Demo Repository, Reducer, and Persistence Boundary

**Files:**
- Create: `src/features/demo/fixtures.ts`
- Create: `src/features/demo/repository.ts`
- Create: `src/features/demo/reducer.test.ts`
- Create: `src/features/demo/reducer.ts`
- Create: `src/features/demo/storage.ts`
- Create: `src/features/demo/DemoProvider.tsx`

**Interfaces:**
- Consumes: all domain types from Task 1
- Produces: `demoReducer(state: DemoState, action: DemoAction): DemoState`
- Produces: `DemoRepository` with `reset`, `saveTalent`, `toggleFavorite`, `createOffer`, `respondToOffer`, `moveCandidate`, `createAgentJob`, `transitionAgentJob`, and `createContentJob`
- Produces: `useDemo(): DemoRepository & { state: DemoState }`

Define the repository contract exactly:

```ts
export interface OfferInput extends Omit<Offer, "id" | "agencyId" | "status" | "createdAt" | "updatedAt"> {}
export interface AgentJobInput extends Omit<AgentJob, "id" | "createdAt" | "updatedAt"> {}
export interface ContentJobInput extends Omit<ContentJob, "id" | "createdAt" | "updatedAt"> {}

export interface DemoRepository {
  reset(): void;
  setRole(role: DemoState["activeRole"]): void;
  saveTalent(draft: TalentDraft): string;
  updateTalentPreferences(talentId: string, preferences: Pick<TalentDraft, "visibility" | "openToOffers" | "marketingConsent">): void;
  toggleFavorite(talentId: string): void;
  moveTalentToReview(talentId: string): string;
  createOffer(input: OfferInput): string;
  respondToOffer(offerId: string, status: Exclude<OfferStatus, "sent">): void;
  moveCandidate(candidateId: string, stage: PipelineStage): void;
  createAgentJob(input: AgentJobInput): string;
  transitionAgentJob(jobId: string, status: AgentJobStatus): void;
  createContentJob(input: ContentJobInput): string;
  transitionContentJob(jobId: string, action: ContentAction, rejectionReason?: string): void;
}
```

- [x] **Step 1: Write failing reducer tests**

Create `src/features/demo/reducer.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { demoState } from "./fixtures";
import { demoReducer } from "./reducer";

describe("demoReducer", () => {
  it("creates an offer and moves the candidate to offer-sent", () => {
    const next = demoReducer(demoState, {
      type: "offer/created",
      payload: {
        talentId: "talent-lua",
        title: "비공개 추가 오디션 제안",
        purpose: "신인 걸그룹 보컬·퍼포먼스 확인",
        field: "idol",
        dueAt: "2026-09-30T09:00:00.000Z",
        department: "신인개발팀",
        message: "추가 비공개 오디션을 제안드립니다.",
      },
    });
    expect(next.offers.at(-1)?.status).toBe("sent");
    expect(next.candidates.find((item) => item.talentId === "talent-lua")?.stage).toBe("offer-sent");
  });

  it("moves an accepted offer to the accepted pipeline stage", () => {
    const next = demoReducer(demoState, {
      type: "offer/responded",
      payload: { offerId: "offer-1", status: "accepted" },
    });
    expect(next.candidates.find((item) => item.talentId === "talent-lua")?.stage).toBe("accepted");
  });

  it("resets all changes to the original fixtures", () => {
    const changed = demoReducer(demoState, {
      type: "candidate/moved",
      payload: { candidateId: "candidate-1", stage: "completed" },
    });
    expect(demoReducer(changed, { type: "demo/reset" })).toEqual(demoState);
  });
});
```

- [x] **Step 2: Run the reducer test and verify failure**

Run: `npm test -- src/features/demo/reducer.test.ts`

Expected: FAIL because fixtures and reducer do not exist.

- [x] **Step 3: Create coherent fictional fixtures**

`fixtures.ts` must export `demoState` with:

- Six adult fictional talents covering idol, vocal, dance, actor, and model fields.
- Two verified fictional agencies and one verification-pending agency.
- At least two offers, including `offer-1` for `talent-lua`.
- At least one candidate in every visible pipeline group.
- Six agent jobs covering queued, running, approval-required, completed, failed, and manual states.
- One promotional-content job with three clip candidates.
- Profile-view events for the talent dashboard and ISO timestamps for recent-activity sorting.
- No real person, real company, real contact information, or claim of actual measured AI performance.

- [x] **Step 4: Implement the pure reducer and storage versioning**

`storage.ts` must use the key `enter-ax-demo:v1`, verify the stored payload version, and return fixtures when parsing or validation fails. It must never serialize `File`, `Blob`, or object URLs.

`DemoProvider.tsx` must expose the repository methods through context and write serializable state after reducer changes.
The reducer must also cover role changes, privacy/contact-consent withdrawal, favorite saving, movement to
internal review, duplicate active-offer prevention, agent rejection/retry/manual handling, and content-step changes.

- [x] **Step 5: Run tests**

Run:

```bash
npm test -- src/features/demo/reducer.test.ts
npm run typecheck
```

Expected: PASS.

- [x] **Step 6: Commit**

```bash
git add src/features/demo
git commit -m "feat: add typed demo data repository"
```

---

### Task 3: Replace the Portfolio Shell with the Enter-AX Design System

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/app/globals.css`
- Modify: `src/app/error.tsx`
- Modify: `src/app/not-found.tsx`
- Create: `src/components/shared/AppShell.tsx`
- Create: `src/components/shared/DemoBadge.tsx`
- Create: `src/components/shared/RoleSwitcher.tsx`
- Create: `src/components/shared/StatusBadge.tsx`
- Create: `src/components/shared/ToastRegion.tsx`
- Create: `src/components/shared/EmptyState.tsx`
- Create: `src/components/shared/AppShell.test.tsx`
- Delete: `src/contexts/ThemeContext.tsx`
- Delete: `src/types/theme.ts`
- Delete: `src/components/shared/StructuredData.tsx`

**Interfaces:**
- Consumes: `DemoProvider`
- Produces: `AppShell({ mode, children })`, `DemoBadge`, `StatusBadge`, `RoleSwitcher`

- [x] **Step 1: Write a failing shell test**

```tsx
import { render, screen } from "@testing-library/react";
import { AppShell } from "./AppShell";

it("shows brand, demo disclosure, and role switcher", () => {
  render(<AppShell mode="public"><main>본문</main></AppShell>);
  expect(screen.getByText("ENTER—AX")).toBeInTheDocument();
  expect(screen.getByText(/데모 환경/)).toBeInTheDocument();
  expect(screen.getByRole("navigation", { name: "주요 메뉴" })).toBeInTheDocument();
});
```

- [x] **Step 2: Verify test failure**

Run: `npm test -- src/components/shared/AppShell.test.tsx`

Expected: FAIL because `AppShell` does not exist.

- [x] **Step 3: Implement the design tokens and shell**

Use these exact core CSS tokens:

```css
:root {
  --ink: #0b0d0f;
  --charcoal: #171a1f;
  --paper: #f4f1e8;
  --paper-strong: #fffdf7;
  --lime: #c9ff4a;
  --cobalt: #3157ff;
  --signal: #ff5a36;
  --muted: #74786f;
  --line-light: rgba(11, 13, 15, 0.16);
  --line-dark: rgba(255, 255, 255, 0.14);
}
```

Remove the global `* { transition: ... }` rule. Respect `prefers-reduced-motion`. Use visible focus outlines and a skip link. Update metadata to Enter-AX and remove the legacy theme provider and structured-data import.
Wrap the application in `DemoProvider`. `RoleSwitcher` must call `setRole`, provide `지원자 데모로 입장`
and `엔터사 데모로 입장`, and restore the selected role from versioned demo state.

- [x] **Step 4: Run tests and build**

Run:

```bash
npm test -- src/components/shared/AppShell.test.tsx
npm run typecheck
npm run build
```

Expected: PASS.

- [x] **Step 5: Commit**

```bash
git add src/app src/components/shared src/contexts src/types
git commit -m "feat: establish Enter-AX application shell"
```

---

### Task 4: Create the Public Landing and Audience Entry Pages

**Files:**
- Modify: `src/app/page.tsx`
- Create: `src/app/talent/page.tsx`
- Create: `src/app/talent/layout.tsx`
- Create: `src/app/agency/page.tsx`
- Create: `src/app/agency/layout.tsx`
- Create: `src/components/marketing/Hero.tsx`
- Create: `src/components/marketing/AxFlow.tsx`
- Create: `src/components/marketing/ProductProof.tsx`
- Create: `src/app/page.test.tsx`

**Interfaces:**
- Consumes: `AppShell`
- Produces: public CTAs linking to `/talent/onboarding` and `/agency/discover`

- [x] **Step 1: Write the failing landing test**

```tsx
import { render, screen } from "@testing-library/react";
import Home from "./page";

it("states the connected AX proposition and exposes both entry points", () => {
  render(<Home />);
  expect(screen.getByRole("heading", { name: /인재 발견부터 콘텐츠 실행까지/ })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "오디션 프로필 등록" })).toHaveAttribute("href", "/talent/onboarding");
  expect(screen.getByRole("link", { name: "엔터사 AX 데모" })).toHaveAttribute("href", "/agency/discover");
});
```

- [x] **Step 2: Verify test failure**

Run: `npm test -- src/app/page.test.tsx`

Expected: FAIL because the existing page redirects to `/main`.

- [x] **Step 3: Implement editorial landing content**

The landing must include these sections in order:

1. Hero with the headline `인재 발견부터 콘텐츠 실행까지, 하나의 AX 흐름으로.`
2. Split entry for talent and verified agencies.
3. Seven-step connected workflow.
4. AX command-center preview with visible `DEMO` labeling.
5. Privacy and human-approval principles.
6. Final dual CTA.

Do not use invented customer logos, adoption counts, savings percentages, testimonials, or competitive-superiority claims.

- [x] **Step 4: Run tests and build**

Run:

```bash
npm test -- src/app/page.test.tsx
npm run typecheck
npm run build
```

Expected: PASS.

- [x] **Step 5: Commit**

```bash
git add src/app/page.tsx src/app/page.test.tsx src/app/talent src/app/agency src/components/marketing
git commit -m "feat: launch Enter-AX public experience"
```

---

### Task 5: Implement Talent Onboarding with Local Media Previews

**Files:**
- Create: `src/app/talent/onboarding/page.tsx`
- Create: `src/components/talent/OnboardingForm.tsx`
- Create: `src/components/talent/PhotoTriptych.tsx`
- Create: `src/components/talent/MediaInput.tsx`
- Create: `src/components/talent/OnboardingForm.test.tsx`
- Create: `src/features/talent/media.test.ts`
- Create: `src/features/talent/media.ts`

**Interfaces:**
- Consumes: `TalentDraft`, `validateTalentDraft`, `parseYouTubeVideoId`, `useDemo().saveTalent`
- Produces: `createObjectPreview(file: File): { url: string; revoke(): void }`

- [x] **Step 1: Write failing object-URL lifecycle tests**

```ts
import { expect, it, vi } from "vitest";
import { createObjectPreview } from "./media";

it("revokes local preview URLs", () => {
  const create = vi.spyOn(URL, "createObjectURL").mockReturnValue("blob:preview");
  const revoke = vi.spyOn(URL, "revokeObjectURL").mockImplementation(() => undefined);
  const preview = createObjectPreview(new File(["x"], "front.jpg", { type: "image/jpeg" }));
  expect(preview.url).toBe("blob:preview");
  preview.revoke();
  expect(create).toHaveBeenCalledOnce();
  expect(revoke).toHaveBeenCalledWith("blob:preview");
});
```

- [x] **Step 2: Write a failing form test**

Create `src/components/talent/OnboardingForm.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { OnboardingForm } from "./OnboardingForm";

it("blocks submission until required consent is complete", () => {
  render(<OnboardingForm onSave={vi.fn()} />);
  expect(screen.getByRole("button", { name: "프로필 등록" })).toBeDisabled();
});

it("requires guardian consent for a minor", async () => {
  const user = userEvent.setup();
  render(<OnboardingForm onSave={vi.fn()} />);
  await user.click(screen.getByRole("checkbox", { name: "만 19세 미만" }));
  await user.click(screen.getByRole("button", { name: "프로필 등록" }));
  expect(screen.getByText("법정대리인 동의가 필요합니다.")).toBeInTheDocument();
});

it("rejects a non-YouTube media URL", async () => {
  const user = userEvent.setup();
  render(<OnboardingForm onSave={vi.fn()} initialStep={3} />);
  await user.click(screen.getByRole("radio", { name: "보컬 YouTube" }));
  await user.type(screen.getByLabelText("보컬 YouTube 주소"), "https://example.com/video");
  await user.tab();
  expect(screen.getByText("YouTube 주소를 확인해 주세요.")).toBeInTheDocument();
});
```

- [x] **Step 3: Run the targeted tests and verify failure**

Run:

```bash
npm test -- src/features/talent/media.test.ts src/components/talent/OnboardingForm.test.tsx
```

Expected: FAIL because media and form modules do not exist.

- [x] **Step 4: Implement the four-step registration experience**

Steps must be:

1. 기본 프로필
2. 얼굴 사진 3장
3. 보컬·댄스 자료
4. 공개 범위와 동의

Use a visible progress indicator, persist only text and enum choices, and display this exact notice near file inputs:

> 데모에서는 선택한 파일이 서버로 전송되거나 저장되지 않습니다. 새로고침하면 파일 선택이 사라집니다.

For YouTube, render only the official iframe from the parsed video ID. For direct files, render `<video controls>` using an object URL and revoke it when replaced or unmounted.
The basic profile step must include the optional SNS URL and gender fields. Validate file MIME types as
`image/jpeg`, `image/png`, `video/mp4`, or `video/webm`, show the accepted formats in the field help text,
and reject other types before preview creation.

- [x] **Step 5: Run tests and build**

Run:

```bash
npm test -- src/features/talent src/components/talent/OnboardingForm.test.tsx
npm run typecheck
npm run build
```

Expected: PASS.

- [x] **Step 6: Commit**

```bash
git add src/app/talent/onboarding src/components/talent src/features/talent
git commit -m "feat: add privacy-first audition onboarding"
```

---

### Task 6: Implement Talent Profile and Offer Responses

**Files:**
- Create: `src/app/talent/profile/page.tsx`
- Create: `src/app/talent/offers/page.tsx`
- Create: `src/components/talent/TalentProfileCard.tsx`
- Create: `src/components/talent/OfferInbox.tsx`
- Create: `src/components/talent/OfferInbox.test.tsx`

**Interfaces:**
- Consumes: `useDemo().state`, `useDemo().respondToOffer`, `useDemo().updateTalentPreferences`
- Produces: accessible offer actions for `accepted`, `declined`, and `needs-info`

- [x] **Step 1: Write the failing offer-response test**

Create `src/components/talent/OfferInbox.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it, vi } from "vitest";
import { OfferInbox } from "./OfferInbox";

const offer = {
  id: "offer-1", agencyId: "agency-1", talentId: "talent-lua", title: "추가 오디션",
  purpose: "보컬 확인", field: "idol" as const, dueAt: "2026-09-30T09:00:00.000Z",
  department: "신인개발팀", message: "참여를 제안합니다.", status: "sent" as const,
  createdAt: "2026-09-16T09:00:00.000Z", updatedAt: "2026-09-16T09:00:00.000Z",
};

it.each([
  ["제안 수락", "accepted"],
  ["제안 거절", "declined"],
  ["추가 정보 요청", "needs-info"],
] as const)("confirms %s before changing status", async (button, status) => {
  const user = userEvent.setup();
  const onRespond = vi.fn();
  render(<OfferInbox offers={[offer]} onRespond={onRespond} />);
  await user.click(screen.getByRole("button", { name: button }));
  await user.click(screen.getByRole("button", { name: "확인" }));
  expect(onRespond).toHaveBeenCalledWith({ offerId: "offer-1", status });
});
```

- [x] **Step 2: Verify test failure**

Run: `npm test -- src/components/talent/OfferInbox.test.tsx`

Expected: FAIL because `OfferInbox` does not exist.

- [x] **Step 3: Implement profile privacy controls and offer inbox**

The profile page must display:

- `검증된 엔터사 전용` as the default privacy status.
- A separate public-portfolio switch.
- A separate marketing-consent switch that is off in the fixture.
- A list of fictional agency-view events.
- The no-server-storage demo disclosure.
- A `제안 수신 철회` control that sets `openToOffers` to false without changing portfolio visibility.

Offer responses must require confirmation in an in-page dialog and update the demo repository only after confirmation.

- [x] **Step 4: Run tests and build**

Run:

```bash
npm test -- src/components/talent/OfferInbox.test.tsx src/features/demo/reducer.test.ts
npm run typecheck
npm run build
```

Expected: PASS.

- [x] **Step 5: Commit**

```bash
git add src/app/talent/profile src/app/talent/offers src/components/talent
git commit -m "feat: add talent privacy and offer controls"
```

---

### Task 7: Implement Agency Discovery, Review, and Contact Requests

**Files:**
- Create: `src/features/agency/filters.test.ts`
- Create: `src/features/agency/filters.ts`
- Create: `src/app/agency/discover/page.tsx`
- Create: `src/app/agency/talent/[id]/page.tsx`
- Create: `src/components/agency/TalentFilters.tsx`
- Create: `src/components/agency/TalentGrid.tsx`
- Create: `src/components/agency/TalentReview.tsx`
- Create: `src/components/agency/TalentReview.test.tsx`

**Interfaces:**
- Consumes: `TalentProfile[]`, `useDemo().toggleFavorite`, `useDemo().createOffer`
- Produces: `filterTalents(talents: TalentProfile[], filters: TalentFilters): TalentProfile[]`

```ts
export interface TalentFilters {
  field?: TalentField;
  gender?: Gender;
  ageBand?: TalentProfile["ageBand"];
  nationality?: string;
  region?: string;
  media?: "vocal" | "dance";
  directFileOnly?: boolean;
  visibility?: Visibility;
  activity?: "newest" | "recent";
}
```

- [x] **Step 1: Write failing filter tests**

Create `src/features/agency/filters.test.ts` and build two minimal `TalentProfile` fixtures, one
Seoul/idol/public with direct-file vocal media and one Busan/dance/verified-agencies with YouTube
media. Assert the exact result IDs for `{ field: "idol" }`, `{ region: "부산" }`,
`{ gender: "woman" }`, `{ ageBand: "20s" }`, `{ nationality: "대한민국" }`, `{ media: "vocal" }`,
`{ directFileOnly: true }`, `{ visibility: "public" }`, `{ activity: "newest" }`, the combined filter
`{ field: "dance", region: "부산" }`, and `{ field: "actor" }` returning `[]`:

```ts
expect(filterTalents(talents, { field: "idol" }).map(({ id }) => id)).toEqual(["talent-seoul"]);
expect(filterTalents(talents, { region: "부산" }).map(({ id }) => id)).toEqual(["talent-busan"]);
expect(filterTalents(talents, { media: "vocal" }).map(({ id }) => id)).toEqual(["talent-seoul"]);
expect(filterTalents(talents, { directFileOnly: true }).map(({ id }) => id)).toEqual(["talent-seoul"]);
expect(filterTalents(talents, { visibility: "public" }).map(({ id }) => id)).toEqual(["talent-seoul"]);
expect(filterTalents(talents, { field: "dance", region: "부산" }).map(({ id }) => id)).toEqual(["talent-busan"]);
expect(filterTalents(talents, { field: "actor" })).toEqual([]);
```

- [x] **Step 2: Write a failing contact-request test**

Create `src/components/agency/TalentReview.test.tsx`. Use `demoState.talents[0]` and the verified
agency fixture; fill fields labeled `제안 제목`, `제안 목적`, `분야`, `회신 기한`, `담당 부서`,
and `메시지`, then assert `onCreateOffer` receives those six values plus the talent ID. In a second
test pass the pending agency and assert both `검증 완료 후 열람할 수 있습니다.` and a disabled
`오디션 제안 보내기` button:

```tsx
expect(onCreateOffer).toHaveBeenCalledWith(expect.objectContaining({
  talentId: "talent-lua",
  title: "비공개 추가 오디션",
  purpose: "보컬·퍼포먼스 확인",
  field: "idol",
  department: "신인개발팀",
  message: "참여를 제안합니다.",
}));
expect(screen.getByRole("button", { name: "오디션 제안 보내기" })).toBeDisabled();
```

- [x] **Step 3: Verify tests fail**

Run:

```bash
npm test -- src/features/agency/filters.test.ts src/components/agency/TalentReview.test.tsx
```

Expected: FAIL because filters and agency components do not exist.

- [x] **Step 4: Implement discovery and detail pages**

Talent cards must show field, age band, region, media-source status, and privacy status rather than only a portrait. The review page must distinguish `원본 파일 · 분석 연결 가능`, `YouTube · 재생 전용`, and `데모 분석`.

The review page must also provide editable team note and human evaluation fields, plus `관심 저장` and
`내부 검토로 이동` actions. These actions append human-readable activity entries and never produce an
automatic talent score or recommendation.

The offer form must not contain or reveal personal contact information. Duplicate offers must link to the existing offer status instead of creating a second active request.

- [x] **Step 5: Run tests and build**

Run:

```bash
npm test -- src/features/agency src/components/agency/TalentReview.test.tsx
npm run typecheck
npm run build
```

Expected: PASS.

- [x] **Step 6: Commit**

```bash
git add src/features/agency src/app/agency/discover src/app/agency/talent src/components/agency
git commit -m "feat: add verified-agency talent discovery"
```

---

### Task 8: Implement the Candidate Pipeline

**Files:**
- Create: `src/app/agency/pipeline/page.tsx`
- Create: `src/components/agency/CandidateBoard.tsx`
- Create: `src/components/agency/CandidateBoard.test.tsx`

**Interfaces:**
- Consumes: `Candidate[]`, `TalentProfile[]`, `useDemo().moveCandidate`
- Produces: keyboard-accessible and pointer-accessible stage movement

- [ ] **Step 1: Write the failing pipeline test**

Create `src/components/agency/CandidateBoard.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it, vi } from "vitest";
import { CandidateBoard } from "./CandidateBoard";
import { demoState } from "@/features/demo/fixtures";

it("moves a candidate with the accessible stage menu", async () => {
  const user = userEvent.setup();
  const onMove = vi.fn();
  render(<CandidateBoard candidates={demoState.candidates} talents={demoState.talents} onMove={onMove} />);
  expect(screen.getByRole("heading", { name: "발굴" })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "내부 검토" })).toBeInTheDocument();
  await user.selectOptions(screen.getByLabelText("candidate-1 단계 이동"), "internal-review");
  expect(onMove).toHaveBeenCalledWith("candidate-1", "internal-review");
  expect(screen.getByText(/최근 활동/)).toBeInTheDocument();
});
```

- [ ] **Step 2: Verify test failure**

Run: `npm test -- src/components/agency/CandidateBoard.test.tsx`

Expected: FAIL because `CandidateBoard` does not exist.

- [ ] **Step 3: Implement the board with an accessible fallback**

Pointer drag-and-drop may be added without an external library, but every card must also have an explicit stage menu. On narrow screens, render grouped cards vertically rather than a horizontally scrolling table.

Each card must show talent name, field, owner, latest activity, next action, team note, and media readiness.
Changing owner, team note, or stage must append an activity entry. Do not display private contact data.

- [ ] **Step 4: Run tests and build**

Run:

```bash
npm test -- src/components/agency/CandidateBoard.test.tsx src/features/demo/reducer.test.ts
npm run typecheck
npm run build
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/app/agency/pipeline src/components/agency/CandidateBoard.tsx src/components/agency/CandidateBoard.test.tsx
git commit -m "feat: add candidate review pipeline"
```

---

### Task 9: Implement the Hermes-Ready Agent Job Contract and AX Command Center

**Files:**
- Create: `src/features/hermes/runner.test.ts`
- Create: `src/features/hermes/runner.ts`
- Create: `src/app/agency/ax/page.tsx`
- Create: `src/components/agency/AgentJobPanel.tsx`
- Create: `src/components/agency/AgentJobPanel.test.tsx`

**Interfaces:**
- Consumes: `AgentJob`, `AgentJobStatus`, `useDemo().createAgentJob`, `useDemo().transitionAgentJob`
- Produces: `AgentRunner` and `DemoAgentRunner`

Define the future integration seam exactly:

```ts
export interface AgentRunRequest {
  tenantId: string;
  skill: "audition-triage" | "daily-briefing" | "content-prep";
  input: Record<string, unknown>;
  requiresApproval: boolean;
}

export interface AgentRunResult {
  runId: string;
  status: AgentJobStatus;
  steps: Array<{ label: string; tool: string; status: "waiting" | "running" | "done" | "failed" }>;
  output: Record<string, unknown>;
}

export interface AgentRunner {
  run(request: AgentRunRequest): Promise<AgentRunResult>;
}
```

- [ ] **Step 1: Write failing runner tests**

Create `src/features/hermes/runner.test.ts`:

```ts
import { describe, expect, it, vi } from "vitest";
import { DemoAgentRunner } from "./runner";

describe("DemoAgentRunner", () => {
  it("returns deterministic demo-only steps without network access", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    const runner = new DemoAgentRunner(() => "run-fixed");
    const result = await runner.run({
      tenantId: "agency-nova", skill: "daily-briefing", input: {}, requiresApproval: false,
    });
    expect(result.runId).toBe("run-fixed");
    expect(result.output).toMatchObject({ environment: "demo" });
    expect(result.steps.every((step) => step.tool.endsWith(".demo"))).toBe(true);
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("keeps unknown skills out of the contract", () => {
    const runner = new DemoAgentRunner(() => "run-fixed");
    // @ts-expect-error unknown skills are rejected at compile time
    void runner.run({ tenantId: "agency-nova", skill: "unknown", input: {}, requiresApproval: false });
  });
});
```

- [ ] **Step 2: Write a failing approval test**

Create `src/components/agency/AgentJobPanel.test.tsx`:

```tsx
it.each([
  ["approval-required", "승인", "completed"],
  ["failed", "수동 처리", "manual"],
] as const)("moves %s with %s", async (status, action, next) => {
  const user = userEvent.setup();
  const onTransition = vi.fn();
  const job = { ...demoState.agentJobs[0], id: `job-${status}`, status };
  render(<AgentJobPanel jobs={[job]} onTransition={onTransition} />);
  await user.click(screen.getByRole("button", { name: action }));
  expect(onTransition).toHaveBeenCalledWith(job.id, next);
});
```

- [ ] **Step 3: Verify test failure**

Run:

```bash
npm test -- src/features/hermes/runner.test.ts src/components/agency/AgentJobPanel.test.tsx
```

Expected: FAIL because the runner and panel do not exist.

- [ ] **Step 4: Implement the Command Center**

Include operational totals, `오늘의 AX 브리핑`, automation cards, and agent jobs. Every job must show tenant, skill, created time, used tools, current step, result, approval status, and error/retry action. Simulated steps must use fictional tool labels such as `media.inspect.demo` rather than real API claims.

External-send and publish actions must stop at `사람 승인 대기` in the demo.
Approval-required jobs must provide `승인` and `거절`; failed jobs must provide `재시도` and `수동 처리`.
The detail view must display fictional approval/audit entries, and must never show secrets or API keys.

- [ ] **Step 5: Run tests and build**

Run:

```bash
npm test -- src/features/hermes src/components/agency/AgentJobPanel.test.tsx
npm run typecheck
npm run build
```

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/features/hermes src/app/agency/ax src/components/agency/AgentJobPanel.tsx src/components/agency/AgentJobPanel.test.tsx
git commit -m "feat: add Hermes-ready AX command center"
```

---

### Task 10: Implement the Promotional Content Workflow

**Files:**
- Create: `src/features/content/workflow.test.ts`
- Create: `src/features/content/workflow.ts`
- Create: `src/app/agency/content/page.tsx`
- Create: `src/components/agency/ContentWorkflow.tsx`
- Create: `src/components/agency/ContentWorkflow.test.tsx`

**Interfaces:**
- Consumes: `ContentJob`, `useDemo().createContentJob`, `useDemo().transitionContentJob`
- Produces: `nextContentStep(current: ContentStep, action: ContentAction): ContentStep`

```ts
// Imported from @/types/domain:
// type ContentAction = "continue" | "request-changes" | "approve" | "reject" | "schedule";
```

- [ ] **Step 1: Write failing workflow-state tests**

Create `src/features/content/workflow.test.ts`:

```ts
import { expect, it } from "vitest";
import { nextContentStep } from "./workflow";

it("follows the review and approval sequence", () => {
  expect(nextContentStep("source", "continue")).toBe("brief");
  expect(nextContentStep("brief", "continue")).toBe("generating");
  expect(nextContentStep("generating", "continue")).toBe("review");
  expect(nextContentStep("review", "approve")).toBe("approval");
  expect(nextContentStep("approval", "schedule")).toBe("scheduled");
});

it("returns review work to the brief", () => {
  expect(nextContentStep("review", "request-changes")).toBe("brief");
});

it("rejects invalid transitions", () => {
  expect(() => nextContentStep("brief", "schedule")).toThrow("허용되지 않은 콘텐츠 단계 전환");
});
```

- [ ] **Step 2: Write a failing component test**

Create `src/components/agency/ContentWorkflow.test.tsx`. Fill inputs by their visible Korean labels,
select `쇼츠` and `릴스`, choose `30초` and `9:16`, and submit `데모 초안 만들기`. Assert exactly
three items with the accessible name `클립 후보`, both `쇼츠 문구` and `릴스 문구`, at least one
`썸네일 옵션`, the `데모 생성물` disclosure, and buttons named `수정 요청` and `승인`:

```tsx
expect(screen.getAllByRole("article", { name: "클립 후보" })).toHaveLength(3);
expect(screen.getByText("쇼츠 문구")).toBeInTheDocument();
expect(screen.getByText("릴스 문구")).toBeInTheDocument();
expect(screen.getByText("썸네일 옵션")).toBeInTheDocument();
expect(screen.getByText("데모 생성물")).toBeInTheDocument();
expect(screen.getByRole("button", { name: "수정 요청" })).toBeEnabled();
expect(screen.getByRole("button", { name: "승인" })).toBeEnabled();
```

- [ ] **Step 3: Verify test failure**

Run:

```bash
npm test -- src/features/content/workflow.test.ts src/components/agency/ContentWorkflow.test.tsx
```

Expected: FAIL because workflow modules do not exist.

- [ ] **Step 4: Implement the demo workflow**

Use bundled lightweight demo posters and CSS timeline previews; do not render new videos. The final action must read `예약 배포 데모 완료` rather than claiming content was posted. Provide an edit path back to the brief and a rejection path that records a reason.

- [ ] **Step 5: Run tests and build**

Run:

```bash
npm test -- src/features/content src/components/agency/ContentWorkflow.test.tsx
npm run typecheck
npm run build
```

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/features/content src/app/agency/content src/components/agency/ContentWorkflow.tsx src/components/agency/ContentWorkflow.test.tsx
git commit -m "feat: add promotional content automation demo"
```

---

### Task 11: Add End-to-End Coverage and Remove the Legacy Portfolio

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`
- Create: `playwright.config.ts`
- Create: `e2e/landing.spec.ts`
- Create: `e2e/talent-flow.spec.ts`
- Create: `e2e/agency-flow.spec.ts`
- Delete: `src/app/main/**`
- Delete: `src/app/dev/**`
- Delete: `src/app/music/**`
- Delete: `src/app/api/chat/**`
- Delete: `src/components/audio/**`
- Delete: `src/components/webdev/**`
- Delete: `src/components/shared/AIConsultant.tsx`
- Delete: `src/components/shared/BackgroundMusic.tsx`
- Delete: `src/components/shared/LazyImage.tsx`
- Delete: `src/components/shared/ModeSelector.tsx`
- Delete: `src/components/shared/ModeSelectorNew.tsx`
- Delete: `src/utils/prompts.ts`
- Delete: `music/**`
- Delete: legacy portfolio media under `public/music/**`, `public/studio_main/**`, and `public/web_image/**`
- Modify: `README.md`
- Modify: `public/manifest.json`
- Modify: `public/robots.txt`
- Modify: `public/sitemap.xml`

**Interfaces:**
- Consumes: all completed user flows
- Produces: deployable, portfolio-free Enter-AX repository

- [ ] **Step 1: Install Playwright and its Chromium runtime**

Run:

```bash
npm install -D @playwright/test
npx playwright install chromium
```

Add scripts:

```json
"test:e2e": "playwright test",
"check:full": "npm run check && npm run test:e2e"
```

- [ ] **Step 2: Configure Playwright**

Create `playwright.config.ts` with `baseURL: "http://127.0.0.1:3000"`, Chromium desktop plus Pixel 7 and iPad Pro projects, retries set to `1` in CI and `0` locally, trace retained on first retry, and a `webServer` running `npm run dev`.

- [ ] **Step 3: Write end-to-end tests before cleanup**

`landing.spec.ts` must verify the hero, both entry links, the demo disclosure, and the absence of Dazzling Studio text.

`talent-flow.spec.ts` must complete the text fields, use small generated in-test files for all three photos and one media file, add a YouTube link for the other media type, complete consent, submit, and respond to an offer.

`agency-flow.spec.ts` must filter talent, open a profile, favorite it, create an offer, move a candidate, approve an agent job, retry a failed job, and complete the content workflow.

- [ ] **Step 4: Run E2E and confirm the expected failures**

Run: `npm run test:e2e`

Expected: at least the landing legacy-text assertion fails until old routes, metadata, and navigation are fully removed.

- [ ] **Step 5: Remove all legacy portfolio code and assets**

Use `git rm` only on the listed tracked paths. Do not touch `기획서.md`. Replace README content with Enter-AX purpose, demo limitations, local commands, test commands, data boundary, future Hermes boundary, and Vercel Preview process.

Update sitemap routes to only the routes in the design spec. Update the manifest name, short name, description, colors, and icons to Enter-AX.

- [ ] **Step 6: Run the full quality gate**

Run:

```bash
npm run check:full
```

Expected: typecheck, lint, unit tests, production build, and all Playwright projects PASS.

- [ ] **Step 7: Inspect responsive screenshots and console output**

Run the app and verify `/`, `/talent/onboarding`, `/agency/discover`, `/agency/pipeline`, `/agency/ax`, and `/agency/content` at 390×844, 1024×1366, and 1440×1000. Confirm no horizontal overflow, overlapping controls, unreadable contrast, uncaught console errors, or broken internal links.

- [ ] **Step 8: Commit**

```bash
git add package.json package-lock.json playwright.config.ts e2e README.md public src
git commit -m "test: verify Enter-AX end-to-end experience"
```

---

### Task 12: Produce and Verify the Vercel Preview

**Files:**
- Modify only if verification requires it: `vercel.json`

**Interfaces:**
- Consumes: a passing Task 11 repository
- Produces: a Vercel Preview URL; does not promote to Production

- [ ] **Step 1: Verify the branch and clean scope**

Run:

```bash
git status --short --branch
git log --oneline --decorate origin/main..HEAD
```

Expected: only the untracked user-owned `기획서.md` may remain; all application changes are committed on the feature branch.

- [ ] **Step 2: Run the full gate one final time**

Run: `npm run check:full`

Expected: PASS with fresh output.

- [ ] **Step 3: Push the feature branch**

Run:

```bash
git push -u origin enter-ax-design
```

Expected: the remote branch is created without modifying `main`.

- [ ] **Step 4: Create a Vercel Preview deployment**

Use the available Vercel MCP or the already linked GitHub integration to deploy `enter-ax-design` as Preview. Do not use a Production promotion command. If authentication is required, stop at the login handoff and request the user to complete it.

- [ ] **Step 5: Verify the Preview**

On the Preview URL, rerun the landing, talent, agency, AX, and content workflows. Check response headers, all internal routes, mobile and desktop layouts, and browser console errors.

- [ ] **Step 6: Hand off the Preview for approval**

Report the Preview URL, exact verification commands and results, any remaining demo limitations, and the commit SHA. Production promotion is a separate explicitly approved action after this checkpoint.
