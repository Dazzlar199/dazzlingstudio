import { describe, expect, it } from "vitest";

import { demoState } from "@/features/demo/fixtures";

import { filterTalents } from "./filters";

describe("filterTalents", () => {
  it("filters by field, region, visibility and direct-file readiness", () => {
    expect(filterTalents(demoState.talents, { field: "actor" }).map((item) => item.id)).toEqual(["talent-hae", "talent-ian"]);
    expect(filterTalents(demoState.talents, { region: "부산" }).map((item) => item.id)).toEqual(["talent-min"]);
    expect(filterTalents(demoState.talents, { visibility: "public" }).map((item) => item.id)).toEqual(["talent-min", "talent-ian"]);
    expect(filterTalents(demoState.talents, { field: "dance", region: "광주", directFileOnly: true }).map((item) => item.id)).toEqual(["talent-yun"]);
  });

  it("returns no profiles when no talent matches", () => {
    expect(filterTalents(demoState.talents, { field: "model", region: "서울" })).toEqual([]);
  });
});
