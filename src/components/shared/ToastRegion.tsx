"use client";

export function ToastRegion({ message }: { message?: string }) {
  return <div aria-live="polite" aria-atomic="true">{message}</div>;
}
