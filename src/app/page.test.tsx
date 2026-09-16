import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { DemoProvider } from "@/features/demo/DemoProvider";

import Home from "./page";

describe("Enter-AX landing", () => {
  it("states the connected AX proposition and exposes both entry points", () => {
    render(
      <DemoProvider>
        <Home />
      </DemoProvider>,
    );

    expect(screen.getByRole("heading", { name: /인재 발견부터 콘텐츠 실행까지/ })).toBeInTheDocument();
    const talentLinks = screen.getAllByRole("link", { name: "오디션 프로필 등록" });
    const agencyLinks = screen.getAllByRole("link", { name: "엔터사 AX 데모" });
    expect(talentLinks).toHaveLength(2);
    expect(agencyLinks).toHaveLength(2);
    talentLinks.forEach((link) => expect(link).toHaveAttribute("href", "/talent/onboarding"));
    agencyLinks.forEach((link) => expect(link).toHaveAttribute("href", "/agency/discover"));
  });
});
