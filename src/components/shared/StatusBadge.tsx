import type { ReactNode } from "react";

export function StatusBadge({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: "neutral" | "positive" | "info" | "warning";
}) {
  return <span className="status-badge" data-tone={tone}>{children}</span>;
}
