import { describe, expect, it } from "vitest";

import { parseYouTubeVideoId } from "@/lib/youtube";
import type { TalentDraft } from "@/types/domain";

import { validateTalentDraft } from "./validation";

const completeDraft: TalentDraft = {
  stageName: "루아",
  birthDate: "2004-03-14",
  gender: "woman",
  nationality: "대한민국",
  region: "서울",
  fields: ["idol"],
  bio: "무대 위에서 이야기를 전달하는 퍼포머입니다.",
  socialUrl: "",
  isMinor: false,
  guardianConsent: false,
  visibility: "verified-agencies",
  openToOffers: true,
  marketingConsent: false,
  photos: { front: "front.jpg", left: "left.jpg", right: "right.jpg" },
  vocal: { source: "file", value: "vocal.mp4" },
  dance: { source: "youtube", value: "https://youtu.be/dQw4w9WgXcQ" },
};

describe("validateTalentDraft", () => {
  it("names the missing face-photo angle", () => {
    const errors = validateTalentDraft({
      ...completeDraft,
      photos: { ...completeDraft.photos, left: "" },
    });

    expect(errors.photos).toContain("왼쪽 측면");
  });

  it("requires guardian consent for a minor", () => {
    const errors = validateTalentDraft({
      ...completeDraft,
      isMinor: true,
      guardianConsent: false,
    });

    expect(errors.guardianConsent).toBe("법정대리인 동의가 필요합니다.");
  });

  it("rejects a non-YouTube URL selected as YouTube media", () => {
    const errors = validateTalentDraft({
      ...completeDraft,
      vocal: { source: "youtube", value: "https://example.com/video" },
    });

    expect(errors.vocal).toBe("YouTube 주소를 확인해 주세요.");
  });

  it("accepts a complete adult submission", () => {
    expect(validateTalentDraft(completeDraft)).toEqual({});
  });
});

describe("parseYouTubeVideoId", () => {
  it.each([
    ["https://youtu.be/dQw4w9WgXcQ", "dQw4w9WgXcQ"],
    ["https://www.youtube.com/watch?v=dQw4w9WgXcQ", "dQw4w9WgXcQ"],
    ["https://www.youtube.com/shorts/dQw4w9WgXcQ", "dQw4w9WgXcQ"],
  ])("parses the supported URL %s", (value, expected) => {
    expect(parseYouTubeVideoId(value)).toBe(expected);
  });

  it.each([
    "https://example.com/video",
    "https://www.youtube.com/embed/dQw4w9WgXcQ",
    "https://youtu.be/not-short",
    "not a URL",
  ])("rejects the unsupported value %s", (value) => {
    expect(parseYouTubeVideoId(value)).toBeNull();
  });
});
