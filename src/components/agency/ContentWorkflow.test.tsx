import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it, vi } from "vitest";

import { ContentWorkflow } from "./ContentWorkflow";

it("creates three clearly labelled demo clip candidates", async () => {
  const user = userEvent.setup();
  render(<ContentWorkflow onCreate={vi.fn().mockReturnValue("content-job-test")} onTransition={vi.fn()} />);
  expect(screen.getByRole("button", { name: "데모 초안 만들기" })).toBeDisabled();
  await user.type(screen.getByLabelText("홍보 목적"), "신인 소개");
  expect(screen.getByRole("button", { name: "데모 초안 만들기" })).toBeEnabled();
  await user.click(screen.getByRole("button", { name: "데모 초안 만들기" }));
  expect(screen.getAllByRole("article", { name: "클립 후보" })).toHaveLength(3);
  expect(screen.getAllByText("데모 생성물")).toHaveLength(3);
  expect(screen.getByText("쇼츠 문구")).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "승인" })).toBeEnabled();
});
