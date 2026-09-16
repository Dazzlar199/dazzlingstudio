import type { Gender, TalentField, TalentProfile, Visibility } from "@/types/domain";

export interface TalentFilters {
  field?: TalentField;
  gender?: Gender;
  ageBand?: TalentProfile["ageBand"];
  nationality?: string;
  region?: string;
  media?: "vocal" | "dance";
  directFileOnly?: boolean;
  visibility?: Visibility;
  activity?: "newest" | "recent";
}

export function filterTalents(talents: TalentProfile[], filters: TalentFilters): TalentProfile[] {
  const filtered = talents.filter((talent) => {
    if (filters.field && !talent.fields.includes(filters.field)) return false;
    if (filters.gender && talent.gender !== filters.gender) return false;
    if (filters.ageBand && talent.ageBand !== filters.ageBand) return false;
    if (filters.nationality && talent.nationality !== filters.nationality) return false;
    if (filters.region && talent.region !== filters.region) return false;
    if (filters.visibility && talent.visibility !== filters.visibility) return false;
    if (filters.media && !talent.media.some((media) => media.kind === filters.media)) return false;
    if (filters.directFileOnly && !talent.media.some((media) => media.source === "file")) return false;
    return true;
  });
  return filters.activity ? [...filtered].sort((a, b) => b.recentActivityAt.localeCompare(a.recentActivityAt)) : filtered;
}
