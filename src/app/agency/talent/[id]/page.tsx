"use client";

import { notFound, useParams } from "next/navigation";
import { TalentReview } from "@/components/agency/TalentReview";
import { useDemo } from "@/features/demo/DemoProvider";

export default function TalentDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { state, createOffer, toggleFavorite, moveTalentToReview } = useDemo();
  const talent = state.talents.find((item) => item.id === id);
  const agency = state.agencies.find((item) => item.id === state.activeAgencyId);
  if (!talent || !agency) notFound();
  return <main className="workspace-page"><TalentReview agency={agency} talent={talent} onCreateOffer={createOffer} onFavorite={() => toggleFavorite(talent.id)} onReview={() => moveTalentToReview(talent.id)} /></main>;
}
