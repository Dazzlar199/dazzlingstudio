import type { TalentFilters as Filters } from "@/features/agency/filters";

export function TalentFilters({ filters, onChange }: { filters: Filters; onChange: (filters: Filters) => void }) {
  return (
    <aside className="talent-filters">
      <header><p>DISCOVERY FILTER</p><h2>탐색 조건</h2></header>
      <label>지원 분야<select value={filters.field ?? ""} onChange={(e) => onChange({ ...filters, field: e.target.value ? e.target.value as Filters["field"] : undefined })}><option value="">전체</option><option value="idol">아이돌</option><option value="vocal">보컬</option><option value="dance">댄스</option><option value="actor">배우</option><option value="model">모델</option></select></label>
      <label>지역<select value={filters.region ?? ""} onChange={(e) => onChange({ ...filters, region: e.target.value || undefined })}><option value="">전체</option>{["서울", "부산", "인천", "대전", "광주"].map((region) => <option key={region}>{region}</option>)}</select></label>
      <label>공개 범위<select value={filters.visibility ?? ""} onChange={(e) => onChange({ ...filters, visibility: e.target.value ? e.target.value as Filters["visibility"] : undefined })}><option value="">전체</option><option value="verified-agencies">엔터사 전용</option><option value="public">전체 공개</option></select></label>
      <label><input checked={filters.directFileOnly ?? false} type="checkbox" onChange={(e) => onChange({ ...filters, directFileOnly: e.target.checked })} /> 원본 파일 보유</label>
      <button className="button-outline" type="button" onClick={() => onChange({})}>필터 초기화</button>
    </aside>
  );
}
