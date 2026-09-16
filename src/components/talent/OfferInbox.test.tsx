import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it, vi } from "vitest";

import type { Offer } from "@/types/domain";

import { OfferInbox } from "./OfferInbox";

const offer: Offer = {
  id: "offer-1", agencyId: "agency-1", talentId: "talent-lua", title: "추가 오디션", purpose: "보컬 확인",
  field: "idol", dueAt: "2026-09-30T09:00:00.000Z", department: "신인개발팀", message: "참여를 제안합니다.",
  status: "sent", createdAt: "2026-09-16T09:00:00.000Z", updatedAt: "2026-09-16T09:00:00.000Z",
};

it.each([["제안 수락", "accepted"], ["제안 거절", "declined"], ["추가 정보 요청", "needs-info"]] as const)(
  "confirms %s before changing the offer status",
  async (button, status) => {
    const user = userEvent.setup();
    const onRespond = vi.fn();
    render(<OfferInbox offers={[offer]} onRespond={onRespond} />);
    await user.click(screen.getByRole("button", { name: button }));
    expect(onRespond).not.toHaveBeenCalled();
    await user.click(screen.getByRole("button", { name: "확인" }));
    expect(onRespond).toHaveBeenCalledWith({ offerId: "offer-1", status });
  },
);
