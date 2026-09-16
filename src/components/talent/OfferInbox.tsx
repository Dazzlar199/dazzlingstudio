"use client";

import { useState } from "react";

import { StatusBadge } from "@/components/shared/StatusBadge";
import type { Offer, OfferStatus } from "@/types/domain";

type ResponseStatus = Exclude<OfferStatus, "sent">;

const actions: Array<{ label: string; status: ResponseStatus }> = [
  { label: "제안 수락", status: "accepted" },
  { label: "추가 정보 요청", status: "needs-info" },
  { label: "제안 거절", status: "declined" },
];

export function OfferInbox({ offers, onRespond }: { offers: Offer[]; onRespond: (input: { offerId: string; status: ResponseStatus }) => void }) {
  const [pending, setPending] = useState<{ offerId: string; status: ResponseStatus } | null>(null);

  return (
    <div className="offer-inbox">
      {offers.map((offer) => (
        <article className="offer-card" key={offer.id}>
          <header><StatusBadge tone={offer.status === "sent" ? "warning" : "info"}>{offer.status}</StatusBadge><time>{offer.dueAt.slice(0, 10)}까지</time></header>
          <h2>{offer.title}</h2><p>{offer.message}</p>
          <dl><div><dt>목적</dt><dd>{offer.purpose}</dd></div><div><dt>분야</dt><dd>{offer.field}</dd></div><div><dt>담당</dt><dd>{offer.department}</dd></div></dl>
          {offer.status === "sent" ? <div className="offer-actions">{actions.map((action) => <button className={action.status === "accepted" ? "button-solid" : "button-outline"} key={action.status} onClick={() => setPending({ offerId: offer.id, status: action.status })} type="button">{action.label}</button>)}</div> : null}
        </article>
      ))}
      {pending ? (
        <div className="dialog-backdrop" role="presentation">
          <div aria-modal="true" className="confirm-dialog" role="dialog" aria-label="제안 응답 확인">
            <h2>이 응답을 확정할까요?</h2><p>데모 상태가 변경되며 실제 메시지는 발송되지 않습니다.</p>
            <div><button className="button-outline" type="button" onClick={() => setPending(null)}>취소</button><button className="button-solid" type="button" onClick={() => { onRespond(pending); setPending(null); }}>확인</button></div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
