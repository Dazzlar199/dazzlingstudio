import type { ReactNode } from "react";
import { AppShell } from "@/components/shared/AppShell";

export default function AgencyLayout({ children }: { children: ReactNode }) {
  return <AppShell mode="agency">{children}</AppShell>;
}
