import { expect, test } from "@playwright/test";

test("agency can discover talent and open a verified review", async ({ page }) => {
  await page.goto("/agency/discover");
  await page.getByLabel("지원 분야").selectOption("actor");
  await expect(page.getByText("해온")).toBeVisible();
  await page.getByRole("link", { name: "상세 검수" }).first().click();
  await expect(page).toHaveURL(/\/agency\/talent\/talent-hae$/);
  await expect(page.getByRole("heading", { name: "해온", level: 1 })).toBeVisible();
  await expect(page.getByText(/원본 파일 · 분석 연결 가능|YouTube · 재생 전용/).first()).toBeVisible();
  await page.getByRole("button", { name: "관심 저장" }).click();
  await page.getByLabel("제안 제목").fill("카메라 테스트 제안");
  await page.getByLabel("제안 목적").fill("배우 프로젝트 적합성 확인");
  await page.getByLabel("회신 기한").fill("2026-10-10");
  await page.getByLabel("메시지").fill("비공개 추가 오디션 참여를 제안드립니다.");
  await page.getByRole("button", { name: "오디션 제안 보내기" }).click();
  await page.goto("/agency/discover");
  await expect(page.getByRole("button", { name: "관심 해제" }).first()).toBeVisible();
  await page.goto("/talent/offers");
  await expect(page.getByRole("heading", { name: "카메라 테스트 제안" })).toBeVisible();
});

test("agency can move pipeline and approve agent work", async ({ page }) => {
  await page.goto("/agency/pipeline");
  await page.getByLabel("candidate-1 단계 이동").selectOption("internal-review");
  await page.goto("/agency/ax");
  await page.getByRole("button", { name: "승인" }).first().click();
  await expect(page.getByText("completed").first()).toBeVisible();
  const failedJob = page.locator('[data-job-id="agent-job-5"]');
  await failedJob.getByRole("button", { name: "재시도" }).click();
  await expect(failedJob.getByText("queued", { exact: true })).toBeVisible();
});

test("agency can prepare promotional content candidates", async ({ page }) => {
  await page.goto("/agency/content");
  await page.getByLabel("홍보 목적").fill("신인 소개");
  await page.getByRole("button", { name: "데모 초안 만들기" }).click();
  await expect(page.getByRole("article", { name: "클립 후보" })).toHaveCount(3);
  await expect(page.getByText("데모 생성물")).toHaveCount(3);
});
