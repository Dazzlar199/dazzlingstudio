"use client";

import { useEffect, useState } from "react";

import { validateTalentDraft } from "@/features/talent/validation";
import type { TalentDraft, ValidationErrors } from "@/types/domain";

import { MediaInput } from "./MediaInput";
import { PhotoTriptych } from "./PhotoTriptych";

const steps = ["기본 프로필", "얼굴 사진 3장", "보컬·댄스 자료", "공개 범위와 동의"];
const blankDraft: TalentDraft = {
  stageName: "", birthDate: "", gender: "undisclosed", nationality: "대한민국", region: "", fields: [], bio: "", socialUrl: "",
  isMinor: false, guardianConsent: false, visibility: "verified-agencies", openToOffers: true, marketingConsent: false,
  photos: { front: "", left: "", right: "" }, vocal: { source: "file", value: "" }, dance: { source: "file", value: "" },
};

export function OnboardingForm({ onSave, initialStep = 1 }: { onSave: (draft: TalentDraft) => void; initialStep?: 1 | 2 | 3 | 4 }) {
  const [hydrated, setHydrated] = useState(false);
  const [step, setStep] = useState(initialStep);
  const [draft, setDraft] = useState(blankDraft);
  const [requiredConsent, setRequiredConsent] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});

  useEffect(() => setHydrated(true), []);

  function update<Key extends keyof TalentDraft>(key: Key, value: TalentDraft[Key]) {
    setDraft((current) => ({ ...current, [key]: value }));
  }

  function submit(event: React.FormEvent) {
    event.preventDefault();
    const nextErrors = validateTalentDraft(draft);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0 && requiredConsent) onSave(draft);
  }

  return (
    <form className="onboarding-form" onSubmit={submit}>
      <ol className="onboarding-progress" aria-label="등록 단계">
        {steps.map((label, index) => <li aria-current={step === index + 1 ? "step" : undefined} key={label}><span>0{index + 1}</span>{label}</li>)}
      </ol>
      <section className="onboarding-panel">
        <header><p>STEP 0{step}</p><h1>{steps[step - 1]}</h1></header>
        {step === 1 ? (
          <div className="form-grid">
            <label>이름 또는 활동명<input disabled={!hydrated} value={draft.stageName} onChange={(e) => update("stageName", e.target.value)} /></label>
            <label>생년월일<input disabled={!hydrated} type="date" value={draft.birthDate} onChange={(e) => update("birthDate", e.target.value)} /></label>
            <label>성별<select disabled={!hydrated} value={draft.gender} onChange={(e) => update("gender", e.target.value as TalentDraft["gender"])}><option value="undisclosed">선택 안 함</option><option value="woman">여성</option><option value="man">남성</option><option value="nonbinary">논바이너리</option></select></label>
            <label>국적<input disabled={!hydrated} value={draft.nationality} onChange={(e) => update("nationality", e.target.value)} /></label>
            <label>거주 지역<input disabled={!hydrated} value={draft.region} onChange={(e) => update("region", e.target.value)} /></label>
            <fieldset><legend>지원 분야</legend>{(["idol", "vocal", "dance", "actor", "model"] as const).map((field) => <label key={field}><input disabled={!hydrated} type="checkbox" checked={draft.fields.includes(field)} onChange={(e) => update("fields", e.target.checked ? [...draft.fields, field] : draft.fields.filter((item) => item !== field))} /> {field}</label>)}</fieldset>
            <label className="form-span">자기소개<textarea disabled={!hydrated} value={draft.bio} onChange={(e) => update("bio", e.target.value)} /></label>
            <label className="form-span">SNS 링크 · 선택<input disabled={!hydrated} type="url" value={draft.socialUrl} onChange={(e) => update("socialUrl", e.target.value)} /></label>
          </div>
        ) : null}
        {step === 2 ? <><PhotoTriptych onChange={(key, name) => update("photos", { ...draft.photos, [key]: name })} /><p className="privacy-notice">데모에서는 선택한 파일이 서버로 전송되거나 저장되지 않습니다. 새로고침하면 파일 선택이 사라집니다.</p></> : null}
        {step === 3 ? <><MediaInput kind="보컬" value={draft.vocal} onChange={(value) => update("vocal", value)} /><MediaInput kind="댄스" value={draft.dance} onChange={(value) => update("dance", value)} /><p className="privacy-notice">데모에서는 선택한 파일이 서버로 전송되거나 저장되지 않습니다. 새로고침하면 파일 선택이 사라집니다.</p></> : null}
        {step === 4 ? (
          <div className="consent-stack">
            <fieldset><legend>프로필 공개 범위</legend><label><input checked={draft.visibility === "verified-agencies"} name="visibility" type="radio" onChange={() => update("visibility", "verified-agencies")} /> 검증된 엔터사에만 공개</label><label><input checked={draft.visibility === "public"} name="visibility" type="radio" onChange={() => update("visibility", "public")} /> 전체 공개 포트폴리오 허용</label></fieldset>
            <label><input checked={draft.openToOffers} type="checkbox" onChange={(e) => update("openToOffers", e.target.checked)} /> 엔터사 오디션 제안 수신</label>
            <label><input checked={draft.marketingConsent} type="checkbox" onChange={(e) => update("marketingConsent", e.target.checked)} /> 홍보·마케팅 이용 동의 · 선택</label>
            <label><input checked={draft.isMinor} type="checkbox" onChange={(e) => update("isMinor", e.target.checked)} /> 만 19세 미만</label>
            {draft.isMinor ? <><label><input checked={draft.guardianConsent} type="checkbox" onChange={(e) => update("guardianConsent", e.target.checked)} /> 법정대리인 동의 확인</label>{!draft.guardianConsent ? <p className="field-error">법정대리인 동의가 필요합니다.</p> : null}</> : null}
            <label><input checked={requiredConsent} type="checkbox" onChange={(e) => setRequiredConsent(e.target.checked)} /> 개인정보 처리와 선택한 범위의 프로필 공개에 동의합니다 · 필수</label>
          </div>
        ) : null}
        {Object.values(errors).map((error) => <p className="field-error" key={error}>{error}</p>)}
        <footer className="form-navigation">
          <button className="button-outline" disabled={step === 1} type="button" onClick={() => setStep((current) => Math.max(1, current - 1) as 1 | 2 | 3 | 4)}>이전</button>
          {step < 4 ? <button className="button-solid" type="button" onClick={() => setStep((current) => Math.min(4, current + 1) as 1 | 2 | 3 | 4)}>다음</button> : <button className="button-solid" disabled={!requiredConsent || (draft.isMinor && !draft.guardianConsent)} type="submit">프로필 등록</button>}
        </footer>
      </section>
    </form>
  );
}
