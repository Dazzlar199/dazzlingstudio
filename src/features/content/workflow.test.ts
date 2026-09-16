import { expect, it } from "vitest";

import { nextContentStep } from "./workflow";

it("follows the review and approval sequence", () => {
  expect(nextContentStep("source", "continue")).toBe("brief");
  expect(nextContentStep("brief", "continue")).toBe("generating");
  expect(nextContentStep("generating", "continue")).toBe("review");
  expect(nextContentStep("review", "approve")).toBe("approval");
  expect(nextContentStep("approval", "schedule")).toBe("scheduled");
});

it("returns review work to the brief and rejects invalid jumps", () => {
  expect(nextContentStep("review", "request-changes")).toBe("brief");
  expect(() => nextContentStep("brief", "schedule")).toThrow("허용되지 않은 콘텐츠 단계 전환");
});
