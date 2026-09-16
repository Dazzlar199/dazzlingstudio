import type { ReactNode } from "react";
import { AppShell } from "@/components/shared/AppShell";

export default function TalentLayout({ children }: { children: ReactNode }) {
  return <AppShell mode="talent">{children}</AppShell>;
}
