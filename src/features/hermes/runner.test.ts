import { expect, it, vi } from "vitest";

import { DemoAgentRunner } from "./runner";

it("returns deterministic demo-only steps without network access", async () => {
  const fetchSpy = vi.spyOn(globalThis, "fetch");
  const result = await new DemoAgentRunner(() => "run-fixed").run({ tenantId: "agency-nova", skill: "daily-briefing", input: {}, requiresApproval: false });
  expect(result.runId).toBe("run-fixed");
  expect(result.output).toMatchObject({ environment: "demo" });
  expect(result.steps.every((step) => step.tool.endsWith(".demo"))).toBe(true);
  expect(fetchSpy).not.toHaveBeenCalled();
});

it("keeps unknown skills out of the compile-time contract", () => {
  const runner = new DemoAgentRunner(() => "run-fixed");
  // @ts-expect-error unknown skills are rejected by AgentRunRequest
  void runner.run({ tenantId: "agency-nova", skill: "unknown", input: {}, requiresApproval: false });
});
