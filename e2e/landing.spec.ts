import { expect, test } from "@playwright/test";

test("landing exposes both connected Enter-AX entry points", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /인재 발견부터 콘텐츠 실행까지/ })).toBeVisible();
  await expect(page.getByText("AX COMMAND CENTER / DEMO")).toBeVisible();
  await expect(page.getByRole("link", { name: "오디션 프로필 등록" }).first()).toHaveAttribute("href", "/talent/onboarding");
  await expect(page.getByRole("link", { name: "엔터사 AX 데모" }).first()).toHaveAttribute("href", "/agency/discover");
  await expect(page.getByText(/Dazzling Studio/i)).toHaveCount(0);
});
