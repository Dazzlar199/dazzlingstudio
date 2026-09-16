"use client";

import Link from "next/link";
import { useState } from "react";

import { OnboardingForm } from "@/components/talent/OnboardingForm";
import { useDemo } from "@/features/demo/DemoProvider";

export default function TalentOnboardingPage() {
  const { saveTalent } = useDemo();
  const [saved, setSaved] = useState(false);

  if (saved) return <main className="entry-page"><p className="entry-page__eyebrow">DEMO PROFILE READY</p><h1>프로필 흐름이<br />준비됐습니다.</h1><p>선택한 파일은 서버에 저장되지 않았습니다. 샘플 프로필 화면에서 공개 범위를 확인할 수 있습니다.</p><Link className="button-solid" href="/talent/profile">내 프로필 보기</Link></main>;
  return <main><OnboardingForm onSave={(draft) => { saveTalent(draft); setSaved(true); }} /></main>;
}
