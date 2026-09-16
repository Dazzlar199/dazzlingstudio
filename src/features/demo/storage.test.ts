import { beforeEach, describe, expect, it } from "vitest";

import { createDemoState, demoState } from "./fixtures";
import { loadDemoState, saveDemoState, STORAGE_KEY } from "./storage";

describe("demo storage", () => {
  beforeEach(() => localStorage.clear());

  it("falls back to a fresh fixture when stored JSON is invalid", () => {
    localStorage.setItem(STORAGE_KEY, "not-json");

    const loaded = loadDemoState();

    expect(loaded).toEqual(demoState);
    expect(loaded).not.toBe(demoState);
  });

  it("falls back when the stored schema version is unknown", () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...demoState, version: 2 }));

    expect(loadDemoState()).toEqual(demoState);
  });

  it("never persists browser object URLs", () => {
    const state = createDemoState();
    state.talents[0].photos.front = "blob:private-preview";
    state.talents[0].media[0].value = "blob:private-preview";

    saveDemoState(state);
    const stored = localStorage.getItem(STORAGE_KEY);

    expect(stored).not.toContain("blob:");
    expect(JSON.parse(stored ?? "{}").talents[0].photos.front).toBe("");
  });
});
