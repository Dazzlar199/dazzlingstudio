"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import { createObjectPreview } from "@/features/talent/media";

const angles = [
  ["front", "정면", "카메라를 눈높이에 두고 얼굴 전체가 보이게 촬영해 주세요."],
  ["left", "왼쪽 측면", "고개만 왼쪽으로 돌리고 어깨선은 편안하게 유지해 주세요."],
  ["right", "오른쪽 측면", "고개만 오른쪽으로 돌리고 필터 없이 촬영해 주세요."],
] as const;

export function PhotoTriptych({ onChange }: { onChange: (key: "front" | "left" | "right", name: string) => void }) {
  const [previews, setPreviews] = useState<Partial<Record<(typeof angles)[number][0], string>>>({});
  const active = useRef<Record<string, { revoke(): void }>>({});

  useEffect(() => () => Object.values(active.current).forEach((preview) => preview.revoke()), []);

  function select(key: "front" | "left" | "right", file?: File) {
    active.current[key]?.revoke();
    if (!file) return;
    const preview = createObjectPreview(file);
    active.current[key] = preview;
    setPreviews((current) => ({ ...current, [key]: preview.url }));
    onChange(key, file.name);
  }

  return (
    <div className="photo-triptych">
      {angles.map(([key, label, guide]) => (
        <label className="photo-input" key={key}>
          <span>{label}</span>
          {previews[key] ? <Image alt={`${label} 로컬 미리보기`} height={500} src={previews[key]} unoptimized width={400} /> : <i aria-hidden="true">+</i>}
          <small>{guide}</small>
          <input accept="image/jpeg,image/png" type="file" onChange={(event) => select(key, event.target.files?.[0])} />
        </label>
      ))}
    </div>
  );
}
