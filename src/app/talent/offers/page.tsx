"use client";

import { OfferInbox } from "@/components/talent/OfferInbox";
import { useDemo } from "@/features/demo/DemoProvider";

export default function TalentOffersPage() {
  const { state, respondToOffer } = useDemo();
  return <main className="workspace-page"><header className="workspace-heading"><p>TALENT / OFFERS</p><h1>받은 오디션 제안</h1><p>개인 연락처는 수락 전 공개되지 않으며, 이 데모에서는 외부 메시지를 발송하지 않습니다.</p></header><OfferInbox offers={state.offers} onRespond={({ offerId, status }) => respondToOffer(offerId, status)} /></main>;
}
