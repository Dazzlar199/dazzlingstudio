"use client";

import { useState } from "react";

import { StatusBadge } from "@/components/shared/StatusBadge";
import type { OfferInput } from "@/features/demo/repository";
import type { Agency, TalentProfile } from "@/types/domain";

export function TalentReview({ agency, talent, onCreateOffer, onFavorite, onReview }: { agency: Agency; talent: TalentProfile; onCreateOffer: (input: OfferInput) => void; onFavorite: () => void; onReview: () => void }) {
  const verified = agency.verification === "verified";
  const [form, setForm] = useState({ title: "", purpose: "", dueAt: "", message: "" });
  const submit = (event: React.FormEvent) => { event.preventDefault(); if (!verified || !form.title || !form.purpose || !form.dueAt || !form.message) return; onCreateOffer({ talentId: talent.id, title: form.title, purpose: form.purpose, field: talent.fields[0], dueAt: new Date(`${form.dueAt}T09:00:00.000Z`).toISOString(), department: agency.department, message: form.message }); };
  return (
    <div className="talent-review">
      <section className="review-profile"><div className="profile-monogram">{talent.stageName.slice(0, 1)}</div><div><StatusBadge tone={verified ? "positive" : "warning"}>{agency.verification}</StatusBadge><h1>{talent.stageName}</h1><p>{talent.bio}</p><p>{talent.fields.join(" · ")} / {talent.region}</p><div className="review-actions"><button className="button-outline" onClick={onFavorite} type="button">관심 저장</button><button className="button-outline" onClick={onReview} type="button">내부 검토로 이동</button></div></div></section>
      {!verified ? <section className="access-block"><h2>검증 완료 후 열람할 수 있습니다.</h2><p>지원자 보호를 위해 사업자 검증이 완료된 엔터사만 미디어를 열람합니다.</p></section> : <section className="media-audit"><h2>제출 자료 검수</h2>{talent.media.filter((media) => media.kind === "vocal" || media.kind === "dance").map((media) => <article key={media.kind}><strong>{media.kind}</strong><StatusBadge tone={media.source === "file" ? "positive" : "info"}>{media.source === "file" ? "원본 파일 · 분석 연결 가능" : "YouTube · 재생 전용"}</StatusBadge><span>데모 분석 · API 연동 예정</span></article>)}</section>}
      <section className="team-review"><h2>팀 메모와 사람 평가</h2><label>팀 메모<textarea placeholder="확인할 포인트와 다음 행동을 기록하세요." /></label><label>사람 평가<textarea placeholder="자동 점수 없이 담당자의 판단 근거를 기록하세요." /></label></section>
      <form className="offer-form" onSubmit={submit}><h2>오디션 제안</h2><label>제안 제목<input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></label><label>제안 목적<input value={form.purpose} onChange={(e) => setForm({ ...form, purpose: e.target.value })} /></label><label>분야<input disabled value={talent.fields[0]} /></label><label>회신 기한<input type="date" value={form.dueAt} onChange={(e) => setForm({ ...form, dueAt: e.target.value })} /></label><label>담당 부서<input disabled value={agency.department} /></label><label className="form-span">메시지<textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} /></label><button className="button-solid form-span" disabled={!verified} type="submit">오디션 제안 보내기</button></form>
    </div>
  );
}
