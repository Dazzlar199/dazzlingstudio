import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it, vi } from "vitest";

import { demoState } from "@/features/demo/fixtures";

import { AgentJobPanel } from "./AgentJobPanel";

it.each([["approval-required", "승인", "completed"], ["failed", "수동 처리", "manual"]] as const)("moves %s with %s", async (status, action, next) => {
  const user = userEvent.setup();
  const onTransition = vi.fn();
  const job = { ...demoState.agentJobs[0], id: `job-${status}`, status };
  render(<AgentJobPanel jobs={[job]} onTransition={onTransition} />);
  await user.click(screen.getByRole("button", { name: action }));
  expect(onTransition).toHaveBeenCalledWith(job.id, next);
});
