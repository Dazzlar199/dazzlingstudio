import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it, vi } from "vitest";

import { OnboardingForm } from "./OnboardingForm";

it("keeps registration unavailable before required consent", () => {
  render(<OnboardingForm onSave={vi.fn()} initialStep={4} />);
  expect(screen.getByRole("button", { name: "프로필 등록" })).toBeDisabled();
});

it("shows guardian consent when a minor tries to register", async () => {
  const user = userEvent.setup();
  render(<OnboardingForm onSave={vi.fn()} initialStep={4} />);
  await user.click(screen.getByRole("checkbox", { name: "만 19세 미만" }));
  expect(screen.getByText("법정대리인 동의가 필요합니다.")).toBeInTheDocument();
});

it("rejects a non-YouTube media URL on blur", async () => {
  const user = userEvent.setup();
  const consoleError = vi.spyOn(console, "error").mockImplementation(() => undefined);
  render(<OnboardingForm onSave={vi.fn()} initialStep={3} />);
  await user.click(screen.getByRole("radio", { name: "보컬 YouTube" }));
  expect(consoleError).not.toHaveBeenCalled();
  await user.type(screen.getByLabelText("보컬 YouTube 주소"), "https://example.com/video");
  await user.tab();
  expect(consoleError).not.toHaveBeenCalled();
  expect(screen.getByText("YouTube 주소를 확인해 주세요.")).toBeInTheDocument();
});
