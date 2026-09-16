"use client";

import { ContentWorkflow } from "@/components/agency/ContentWorkflow";
import { useDemo } from "@/features/demo/DemoProvider";

export default function ContentPage() {
  const { createContentJob, transitionContentJob } = useDemo();
  return <main className="workspace-page"><ContentWorkflow onCreate={createContentJob} onTransition={transitionContentJob} /></main>;
}
