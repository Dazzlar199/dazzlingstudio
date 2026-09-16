"use client";

import { TalentProfileCard } from "@/components/talent/TalentProfileCard";
import { useDemo } from "@/features/demo/DemoProvider";

export default function TalentProfilePage() {
  const { state, updateTalentPreferences } = useDemo();
  const talent = state.talents[0];
  const views = state.profileViews.filter((view) => view.talentId === talent.id);
  const update = (preferences: Partial<Pick<typeof talent, "visibility" | "openToOffers" | "marketingConsent">>) => updateTalentPreferences(talent.id, { visibility: talent.visibility, openToOffers: talent.openToOffers, marketingConsent: talent.marketingConsent, ...preferences });

  return (
    <main className="workspace-page">
      <header className="workspace-heading"><p>TALENT / PRIVACY</p><h1>내 프로필과 공개 범위</h1><p>데모 파일은 서버에 저장되지 않습니다. 공개와 제안 수신은 각각 따로 철회할 수 있습니다.</p></header>
      <TalentProfileCard talent={talent} />
      <section className="preference-panel"><h2>공개·이용 설정</h2><label><input checked={talent.visibility === "public"} type="checkbox" onChange={(e) => update({ visibility: e.target.checked ? "public" : "verified-agencies" })} /> 전체 공개 포트폴리오 허용</label><label><input checked={talent.openToOffers} type="checkbox" onChange={(e) => update({ openToOffers: e.target.checked })} /> 엔터사 오디션 제안 수신</label><label><input checked={talent.marketingConsent} type="checkbox" onChange={(e) => update({ marketingConsent: e.target.checked })} /> 홍보·마케팅 이용 동의</label>{talent.openToOffers ? <button className="button-outline" type="button" onClick={() => update({ openToOffers: false })}>제안 수신 철회</button> : null}</section>
      <section className="view-history"><h2>엔터사 열람 이력 · 데모</h2>{views.map((view) => <p key={view.id}>{state.agencies.find((agency) => agency.id === view.agencyId)?.name} <time>{view.viewedAt.slice(0, 10)}</time></p>)}</section>
    </main>
  );
}
