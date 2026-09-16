import { parseYouTubeVideoId } from "@/lib/youtube";
import type { MediaDraft, TalentDraft, ValidationErrors } from "@/types/domain";

function validateMedia(media: MediaDraft): string | undefined {
  if (!media.value.trim()) return "자료를 추가해 주세요.";
  if (media.source === "youtube" && !parseYouTubeVideoId(media.value)) {
    return "YouTube 주소를 확인해 주세요.";
  }
  return undefined;
}

export function validateTalentDraft(draft: TalentDraft): ValidationErrors {
  const errors: ValidationErrors = {};

  if (!draft.stageName.trim()) errors.stageName = "이름 또는 활동명을 입력해 주세요.";
  if (!draft.birthDate) errors.birthDate = "생년월일을 입력해 주세요.";
  if (!draft.gender) errors.gender = "성별을 선택해 주세요.";
  if (!draft.nationality.trim()) errors.nationality = "국적을 입력해 주세요.";
  if (!draft.region.trim()) errors.region = "거주 지역을 입력해 주세요.";
  if (draft.fields.length === 0) errors.fields = "지원 분야를 선택해 주세요.";
  if (!draft.bio.trim()) errors.bio = "자기소개를 입력해 주세요.";

  const missingPhotos = [
    ["front", "정면"],
    ["left", "왼쪽 측면"],
    ["right", "오른쪽 측면"],
  ].filter(([key]) => !draft.photos[key as keyof TalentDraft["photos"]]);
  if (missingPhotos.length > 0) {
    errors.photos = `${missingPhotos.map(([, label]) => label).join(", ")} 사진을 추가해 주세요.`;
  }

  errors.vocal = validateMedia(draft.vocal);
  errors.dance = validateMedia(draft.dance);
  if (!errors.vocal) delete errors.vocal;
  if (!errors.dance) delete errors.dance;

  if (draft.isMinor && !draft.guardianConsent) {
    errors.guardianConsent = "법정대리인 동의가 필요합니다.";
  }

  return errors;
}
