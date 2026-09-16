"use client";

import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from "react";

import type { DemoState } from "@/types/domain";

import { createDemoState } from "./fixtures";
import { demoReducer } from "./reducer";
import { createDemoRepository, type DemoRepository } from "./repository";
import { loadDemoState, saveDemoState } from "./storage";

type DemoContextValue = DemoRepository & { state: DemoState };

const DemoContext = createContext<DemoContextValue | null>(null);

export function DemoProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(demoReducer, undefined, createDemoState);
  const didHydrate = useRef(false);

  useEffect(() => {
    dispatch({ type: "demo/hydrated", payload: { state: loadDemoState() } });
  }, []);

  useEffect(() => {
    if (!didHydrate.current) {
      didHydrate.current = true;
      return;
    }
    saveDemoState(state);
  }, [state]);

  const value = useMemo(
    () => ({ state, ...createDemoRepository(state, dispatch) }),
    [state],
  );

  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>;
}

export function useDemo(): DemoContextValue {
  const context = useContext(DemoContext);
  if (!context) throw new Error("useDemo must be used inside DemoProvider");
  return context;
}
