export function createObjectPreview(file: File): { url: string; revoke(): void } {
  const url = URL.createObjectURL(file);
  return { url, revoke: () => URL.revokeObjectURL(url) };
}
