import { expect, it, vi } from "vitest";

import { createObjectPreview } from "./media";

it("revokes the exact local preview URL", () => {
  const create = vi.spyOn(URL, "createObjectURL").mockReturnValue("blob:preview");
  const revoke = vi.spyOn(URL, "revokeObjectURL").mockImplementation(() => undefined);
  const preview = createObjectPreview(new File(["x"], "front.jpg", { type: "image/jpeg" }));

  expect(preview.url).toBe("blob:preview");
  preview.revoke();
  expect(create).toHaveBeenCalledOnce();
  expect(revoke).toHaveBeenCalledWith("blob:preview");
});
