import Link from "next/link";

import { StatusBadge } from "@/components/shared/StatusBadge";
import type { TalentProfile } from "@/types/domain";

export function TalentGrid({ talents, favorites, onFavorite }: { talents: TalentProfile[]; favorites: string[]; onFavorite: (id: string) => void }) {
  return <div className="talent-grid">{talents.map((talent, index) => <article className="talent-card" key={talent.id}><div className="talent-card__visual"><span>0{index + 1}</span><strong>{talent.stageName.slice(0, 1)}</strong></div><div className="talent-card__body"><StatusBadge tone={talent.visibility === "public" ? "info" : "positive"}>{talent.visibility === "public" ? "전체 공개" : "엔터사 전용"}</StatusBadge><h2>{talent.stageName}</h2><p>{talent.fields.join(" · ")} / {talent.ageBand} / {talent.region}</p><p>{talent.media.some((media) => media.source === "file") ? "원본 파일 · 분석 연결 가능" : "YouTube · 재생 전용"}</p><div><button className="button-outline" type="button" onClick={() => onFavorite(talent.id)}>{favorites.includes(talent.id) ? "관심 해제" : "관심 저장"}</button><Link className="button-solid" href={`/agency/talent/${talent.id}`}>상세 검수</Link></div></div></article>)}</div>;
}
