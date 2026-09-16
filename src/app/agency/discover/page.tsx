"use client";

import { useMemo, useState } from "react";
import { TalentFilters } from "@/components/agency/TalentFilters";
import { TalentGrid } from "@/components/agency/TalentGrid";
import { filterTalents, type TalentFilters as FilterState } from "@/features/agency/filters";
import { useDemo } from "@/features/demo/DemoProvider";

export default function DiscoverPage() {
  const { state, toggleFavorite } = useDemo();
  const [filters, setFilters] = useState<FilterState>({});
  const talents = useMemo(() => filterTalents(state.talents, filters), [state.talents, filters]);
  return <main className="agency-discover"><TalentFilters filters={filters} onChange={setFilters} /><section className="discovery-results"><header><p>VERIFIED AGENCY VIEW</p><h1>인재 탐색</h1><span>{talents.length} profiles</span></header><TalentGrid talents={talents} favorites={state.favoriteTalentIds} onFavorite={toggleFavorite} /></section></main>;
}
