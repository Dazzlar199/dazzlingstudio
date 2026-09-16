import { StatusBadge } from "@/components/shared/StatusBadge";
import type { TalentProfile } from "@/types/domain";

export function TalentProfileCard({ talent }: { talent: TalentProfile }) {
  return (
    <article className="talent-profile-card">
      <div className="profile-monogram" aria-hidden="true">{talent.stageName.slice(0, 1)}</div>
      <div><StatusBadge tone="positive">{talent.visibility === "public" ? "전체 공개" : "검증된 엔터사 전용"}</StatusBadge><h2>{talent.stageName}</h2><p>{talent.bio}</p><p>{talent.fields.join(" · ")} / {talent.region} / {talent.ageBand}</p></div>
    </article>
  );
}
