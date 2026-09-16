import type { ReactNode } from "react";

export function EmptyState({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="empty-state">
      <p className="status-badge" data-tone="neutral">EMPTY</p>
      <h2>{title}</h2>
      <div>{children}</div>
    </section>
  );
}
