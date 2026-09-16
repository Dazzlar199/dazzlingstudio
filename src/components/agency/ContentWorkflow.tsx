"use client";

import { useEffect, useState } from "react";
import { StatusBadge } from "@/components/shared/StatusBadge";
import type { ContentJobInput } from "@/features/demo/repository";
import type { ContentAction } from "@/types/domain";

export function ContentWorkflow({ onCreate, onTransition }: { onCreate: (input: ContentJobInput) => string; onTransition: (id: string, action: ContentAction, reason?: string) => void }) {
  const [hydrated, setHydrated] = useState(false);
  const [purpose, setPurpose] = useState("");
  const [channels, setChannels] = useState<Array<"shorts" | "reels" | "tiktok">>(["shorts", "reels"]);
  const [duration, setDuration] = useState<15 | 30 | 60>(30);
  const [tone, setTone] = useState("팬 친화적");
  const [captionStyle, setCaptionStyle] = useState("리듬 강조");
  const [aspectRatio, setAspectRatio] = useState<"9:16" | "1:1" | "16:9">("9:16");
  const [jobId, setJobId] = useState<string | null>(null);
  const clips = [1, 2, 3].map((number) => ({ id: `preview-${number}`, title: `추천 구간 ${number}`, label: "데모 생성물" as const }));

  useEffect(() => setHydrated(true), []);

  function generate(event: React.FormEvent) {
    event.preventDefault();
    if (!purpose.trim()) return;
    const id = onCreate({ title: `${purpose} 숏폼`, purpose, channels, duration, tone, captionStyle, aspectRatio, step: "review", clipCandidates: clips });
    setJobId(id);
  }

  return <div className="content-workflow"><form onSubmit={generate}><header><p>CONTENT AUTOMATION / DEMO</p><h1>홍보 목적을<br />검수 가능한 초안으로.</h1></header><div className="content-brief"><label>홍보 목적<input disabled={!hydrated} value={purpose} onChange={(e) => setPurpose(e.target.value)} placeholder="컴백, 신인 소개, 오디션 홍보" /></label><fieldset><legend>채널</legend>{(["shorts", "reels", "tiktok"] as const).map((channel) => <label key={channel}><input checked={channels.includes(channel)} type="checkbox" onChange={(e) => setChannels(e.target.checked ? [...channels, channel] : channels.filter((item) => item !== channel))} /> {channel}</label>)}</fieldset><label>길이<select value={duration} onChange={(e) => setDuration(Number(e.target.value) as 15 | 30 | 60)}><option value="15">15초</option><option value="30">30초</option><option value="60">60초</option></select></label><label>톤<select value={tone} onChange={(e) => setTone(e.target.value)}><option>공식</option><option>트렌디</option><option>팬 친화적</option></select></label><label>자막 스타일<input value={captionStyle} onChange={(e) => setCaptionStyle(e.target.value)} /></label><label>화면 비율<select value={aspectRatio} onChange={(e) => setAspectRatio(e.target.value as typeof aspectRatio)}><option>9:16</option><option>1:1</option><option>16:9</option></select></label></div><button className="button-solid" disabled={!hydrated || !purpose.trim()} type="submit">데모 초안 만들기</button></form>{jobId ? <section className="content-results"><header><div><StatusBadge tone="warning">실제 렌더링 없음</StatusBadge><h2>추천 구간과 채널별 초안</h2></div><span>사람 검수 필요</span></header><div className="clip-grid">{clips.map((clip, index) => <article aria-label="클립 후보" key={clip.id}><div className="clip-poster"><span>0{index + 1}</span><strong>9:16</strong></div><h3>{clip.title}</h3><StatusBadge tone="info">{clip.label}</StatusBadge></article>)}</div><div className="copy-grid"><article><h3>쇼츠 문구</h3><p>{purpose}, 첫 장면부터 만나보세요. #ENTERAX #DEMO</p></article><article><h3>릴스 문구</h3><p>새로운 움직임이 시작됩니다. 데모 캡션 · API 연동 예정</p></article><article><h3>썸네일 옵션</h3><p>클로즈업 / 타이포 중심 / 무대 전경</p></article></div><div className="content-approval"><button className="button-outline" onClick={() => onTransition(jobId, "request-changes", "담당자 수정 요청")} type="button">수정 요청</button><button className="button-solid" onClick={() => onTransition(jobId, "approve")} type="button">승인</button><button className="button-outline" onClick={() => onTransition(jobId, "schedule")} type="button">예약 배포 데모 완료</button></div></section> : null}</div>;
}
